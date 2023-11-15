/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Imported just for types.
// eslint-disable-next-line no-unused-vars
const {Environment} = require('nunjucks');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const {findByUrl} = require('../../_data/lib/find');
const {exportFile} = require('../utils/exportFile');
const {getImage} = require('../utils/getImage');
const {getAndRewriteVideoAssets} = require('../utils/getVideo');
const {
  pluck,
  insert,
  MULTI_LINE_CODE_PATTERN,
  MULTI_LINE_CODE_PLACEHOLDER,
  INLINE_CODE_PATTERN,
  INLINE_CODE_PLACEHOLDER,
} = require('../utils/pluckInsert');
const authorValues = yaml.load(
  fs.readFileSync('./site/_data/i18n/authors.yaml', 'utf-8')
);

const URLS_PATH = path.join(__dirname, '../../../urls.csv');

const NESTED_MULTI_LINE_CODE_PATTERN = new RegExp(
  '<div( .*)?>[\\s\\S]*?<\\/div>',
  'gi'
);

const RAW_SHORTCODE_PATTERN = /{% raw %}(.*?){% endraw %}/gm;
const RAW_PLACEHOLDER = 'RAW_PLACEHOLDER';

let urls = null;

/**
 * Used to keep track of old URLs and their potential new URLs.
 */
const exportUrls = new Map();

function getExportDetails(url) {
  if (!urls) {
    // URLs are lazily loaded from the CSV and then mapped to an object for easier lookup
    const urlsCsv = fs.readFileSync(URLS_PATH, 'utf-8');
    const {data: rows} = Papa.parse(urlsCsv);

    urls = {};
    for (const row of rows) {
      urls[row[2]] = row[5] || row[2];
    }
  }

  // Determine a export path for the page, to dissolve the flat-file structure that
  // is currently used for web.dev
  const originalUrl = path.parse(url);
  const articleName = originalUrl.name;

  let exportPath = originalUrl.dir;
  // Make sure exportPath has a trailing slash, to safely append path segments
  if (!exportPath.endsWith('/')) {
    exportPath = `${exportPath}/`;
  }

  if (urls) {
    // Remove language prefix from exportPath for lookup
    const languagePrefix = exportPath.split('/')[1];
    // The map contains the articleName, so pluck it back in
    const fullPath = `${exportPath.replace(`/${languagePrefix}/`, '/')}${articleName}/`;
    console.log(fullPath, urls[fullPath], exportPath);
    exportPath = urls[fullPath]
      ? `/${languagePrefix}${urls[fullPath]}`
      : exportPath;

    if (fullPath.includes('blog') && !exportPath.includes('blog')) {
      // Should not
      console.log('-- should not be in blog:', fullPath, exportPath);
    }

    if (!fullPath.includes('blog') && exportPath.includes('blog')) {
      // Should not
      console.log('-- should be in blog:', fullPath, exportPath);
    }

    // Pluck article name back out
    exportPath = exportPath.replace(new RegExp(articleName + '/$'), '');
  }

  return {articleName, exportPath};
}

async function transform(ctx, markdown) {
  // Pluck out code snippets to not accidentally alter code examples
  const codeBlocks = [];
  markdown = pluck(
    codeBlocks,
    MULTI_LINE_CODE_PATTERN,
    MULTI_LINE_CODE_PLACEHOLDER,
    markdown
  );
  const inlineCode = [];
  markdown = pluck(
    inlineCode,
    INLINE_CODE_PATTERN,
    INLINE_CODE_PLACEHOLDER,
    markdown
  );

  markdown = await getAndRewriteVideoAssets(ctx, markdown);

  // Remove the float-left and float-right classes as they are not used on web.dev
  // as of 06/23 both are not used literally so it's safe to omit a complex regex
  markdown = markdown.replace(
    /<figure class="float-(left|right)">/g,
    '<figure>'
  );

  // Add the webdev-caption class to all figcaptions - as of 06/23, no figcaption as other
  // custom classes, so a simple replace is enough
  markdown = markdown.replace(
    /<figcaption>/g,
    '<figcaption class="dcc-caption">'
  );

  // Remove the screenshot class from figure elements as it has no effect on web.dev,
  // but would have on DevSite
  markdown = markdown.replace(/<figure class="screenshot">/g, '<figure>');

  // Rewrite the switcher class - as of 06/23 this class is not used with other classes,
  // so a simple replace is enough
  markdown = markdown.replace(/class="switcher"/g, 'class="dcc-switcher"');

  // Rewrite nested code blocks to <pre> blocks, as they are not rendered by DevSite
  markdown = markdown.replace(NESTED_MULTI_LINE_CODE_PATTERN, match => {
    return match.replace(
      new RegExp(`${MULTI_LINE_CODE_PLACEHOLDER}_(\\d+)`, 'g'),
      (_, index) => {
        let codeBlock = codeBlocks[index];
        codeBlock = codeBlock.replace(
          /```(.*?)$\n/gm,
          '<pre class="prettyprint lang-$1">{% htmlescape %}\n'
        );
        codeBlock = codeBlock.replace(/^```$/gm, '{% endhtmlescape %}</pre>');
        return codeBlock;
      }
    );
  });

  // Put remaining code blocks and snippets back into the transformed content
  markdown = insert(codeBlocks, MULTI_LINE_CODE_PLACEHOLDER, markdown);
  markdown = insert(inlineCode, INLINE_CODE_PLACEHOLDER, markdown);

  // Replace raw shortcodes with their verbatim DevSite equivalent
  markdown = markdown.replace(/{% raw %}/g, '{% verbatim %}');
  markdown = markdown.replace(/{% endraw %}/g, '{% endverbatim %}');

  return markdown;
}

let njkEnv = null;

async function renderTemplate(njk, ctx) {
  return await new Promise(resolve => {
    njkEnv.renderString(njk, ctx, (err, result) => {
      if (err) {
        resolve('Could not render template: ' + err);
        return;
      }

      resolve(result);
    });
  });
}

/**
 * Renders content with Nunjucks instance configured in .eleventy.
 * This emulates pre-processing of the actual page content.
 *
 * @this {{env: Environment, ctx: Object}}
 */
async function Export() {
  // Need to re-retrieve the page from the collections.all array (which findByUrl uses)
  // as the page object from the context does not have the source content and environment.
  const page = findByUrl(this.ctx.collections.all, this.ctx.page.url);

  let pageUrl = this.ctx.page.url;
  const inputPath = this.ctx.page.inputPath;

  // The nunjucks env is not available in the context, so we need to dig it out
  // from 11ty internals
  njkEnv =
    njkEnv || page.template._extensionMap._engineManager.engineCache.njk.njkEnv;

  const source = page?.template?.frontMatter?.content;
  if (!source) {
    return '';
  }

  // If the file rendered is not a markdown file, do not try to do
  // anything with it
  const ext = page?.template?.parsed?.ext;
  if (ext !== '.md') {
    return '';
  }

  const tags = page?.template?.frontMatter?.data.tags || [];
  const authors = page?.template?.frontMatter?.data.authors;
  let frontMatter = {
    project_path: '/_project.yaml',
    book_path: '/_book.yaml',
  };

  if (
    inputPath.includes('privacy-sandbox') ||
    (inputPath.includes('blog') && tags.includes('privacy')) ||
    inputPath.includes('docs/privacy-sandbox')
  ) {
    frontMatter = {
      project_path: '/privacy-sandbox/_project.yaml',
      book_path: '/privacy-sandbox/_book.yaml',
    };
  }

  if (inputPath.includes('blog') && tags.includes('privacy')) {
    pageUrl = pageUrl.replace('/blog/', '/privacy-sandbox/blog/');
  }

  if (inputPath.includes('docs/privacy-sandbox')) {
    pageUrl = pageUrl.replace('docs/privacy-sandbox', 'privacy-sandbox/docs');
  }

  if (authors) {
    frontMatter.author_name = authorValues[authors[0]].title.en;
  }

  // Set the refresh
  const date = page?.template?.frontMatter?.data.date;
  let updatedAt = page?.template?.frontMatter?.data.updated_at;
  if (!updatedAt) {
    updatedAt = page?.template?.frontMatter?.data.date;
  }

  if (updatedAt) {
    frontMatter.refresh_date = new Date(updatedAt).toISOString().split('T')[0];
  }

  let description = page?.template?.frontMatter?.data.description;
  if (description) {
    // Remove new lines in the description as it breaks DevSite's crude front matter parsing
    description = description.replace(/\n/g, ' ');
    frontMatter.description = description.trim();
  }

  const api = page?.template?.frontMatter?.data.api;
  if (api) {
    frontMatter.api = api;
    frontMatter.layout = page?.template?.frontMatter?.data.layout;
  }

  let transformedSource = source;

  // Raw shortcodes gone from the rendered template, but their content would still infer with DevSite.
  // Hence we need to pluck them out and re-insert them too.
  const rawShortcodes = [];
  transformedSource = pluck(
    rawShortcodes,
    RAW_SHORTCODE_PATTERN,
    RAW_PLACEHOLDER,
    transformedSource
  );

  const {exportPath, articleName} = getExportDetails(pageUrl);

  // Add the export path to the exportUrls map, so we can construct a redirect map
  const exportUrl = `${exportPath}${articleName}`;
  exportUrls.set(pageUrl, exportUrl);

  const ctx = Object.assign({}, this.ctx, {
    export: true,
    exportPath,
    exportName: articleName,
    exportUrl,
    pageUrl,
    inputPath,
  });

  let thumbnail = page?.template?.frontMatter?.data.thumbnail;
  let thumbnailPath;
  if (thumbnail) {
    const thumbnailType = thumbnail.split('.').pop();
    thumbnailPath = path.join(
      exportPath,
      `${articleName}/image/thumbnail.${thumbnailType}`
    );
    thumbnail = await getImage(thumbnail);
    await exportFile(ctx, thumbnail, thumbnailPath);
    frontMatter.image_path = `image/thumbnail.${thumbnailType}`;
  }

  // Convert the front matter object into a string. Do it manually
  // as the frontmatter paser used on DevSite is fairly primitive
  frontMatter = Object.entries(frontMatter)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  let markdown = await renderTemplate(transformedSource, ctx);

  // Put raw shortcodes back into the transformed content, they get then rewritten
  // to DevSite compatible `{% verbatim %}` tags in the transform method
  markdown = insert(rawShortcodes, RAW_PLACEHOLDER, markdown);

  const transformedMarkdown = await transform(ctx, markdown);

  const title = this.ctx.title;
  const template = `${frontMatter}

{% import "/_macros.html" as macros %}

# ${title}${this.ctx.subhead ? `\n\n${this.ctx.subhead}` : ''}
${
  authors
    ? `
{{ macros.Authors(${JSON.stringify(authors)}) }}
`
    : ''
}`;

  const renderedPage = template + transformedMarkdown;
  await exportFile(ctx, renderedPage);
  return renderedPage;
}

module.exports = {
  Export,
  exportUrls,
  pluck,
  insert,
  getExportDetails,
  renderTemplate,
};

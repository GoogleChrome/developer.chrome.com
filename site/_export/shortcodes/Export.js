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
const {exportExtensionReference} = require('../utils/exportExtensionReference');
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
const EXTENSION_URLS_PATH = path.join(__dirname, '../../../extension-urls.csv');

const NESTED_MULTI_LINE_CODE_PATTERN = new RegExp(
  '<div( .*)?>[\\s\\S]*?<\\/div>',
  'gi'
);

const RAW_SHORTCODE_PATTERN = /{% raw %}(.*?){% endraw %}/gm;
const RAW_PLACEHOLDER = 'RAW_PLACEHOLDER';

let urls = null;
const redirectUrls = {};

/**
 * Holds all articles in arrays, keyed by the directory they are in - that's either
 * the project name or the subdirectory of the project.
 */
const tocs = {}

async function updateToCs(exportPath, articleName, title) {
  const pathParts = path.normalize(exportPath).split(path.sep);
  // Remove the first slash and language from the path
  pathParts.shift();
  pathParts.shift();

  const tocPath = pathParts.join('/');
  const toc = tocs[tocPath] || [];
  toc.push({
    title,
    path: path.normalize(`/${tocPath}/${articleName}`),
  });

  tocs[tocPath] = toc;
  await exportFile({}, yaml.dump({toc}, {lineWidth: -1, noArrayIndent: true}), `en/${tocPath}/_export_toc.yaml`);
}

function mapCsvUrlsToObjects(path) {
  // URLs are lazily loaded from the CSV and then mapped to an object for easier lookup
  const urlsCsv = fs.readFileSync(path, 'utf-8');
  const {data: rows} = Papa.parse(urlsCsv);

  // Extension URL CSV has an extra column so the pointer needs to be moved by a column
  let pointer = 0;
  if (path === EXTENSION_URLS_PATH) {
    pointer++;
  }

  const urls = {};
  for (const row of rows) {
    // Remove the language prefix from the source URL
    const sourceUrl = row[2 + pointer].replace('/en/', '/');
    urls[sourceUrl] = row[5 + pointer] || sourceUrl;

    const redirectUrl = row[6 + pointer];
    if (redirectUrl) {
      redirectUrls[sourceUrl] = redirectUrl;
    }
  }

  return urls;
}

function getExportDetails(url) {
  if (!urls) {
    urls = {
      ...mapCsvUrlsToObjects(URLS_PATH),
      ...mapCsvUrlsToObjects(EXTENSION_URLS_PATH),
    };
  }

  // Determine a export path for the page, to dissolve the flat-file structure that
  // is currently used for web.dev
  const originalUrl = path.parse(url);
  let articleName = originalUrl.name;

  let exportPath = originalUrl.dir;
  // Make sure exportPath has a trailing slash, to safely append path segments
  if (!exportPath.endsWith('/')) {
    exportPath = `${exportPath}/`;
  }

  if (urls) {
    // Remove language prefix from exportPath for lookup
    const exportPathParts = exportPath.split('/');
    const languagePrefix = exportPathParts[1];
    // The map contains the articleName, so pluck it back in
    // but not the language, so throw it out
    const fullPath = `${exportPath.replace(
      `/${languagePrefix}/`,
      '/'
    )}${articleName}/`;

    // Check if there is a new URL for the page and early exit,
    // if there is a redirect URL
    const newPath = urls[fullPath];
    if (newPath) {
      articleName = path.parse(newPath).name;
      exportPath = `/${languagePrefix}/${newPath}`;
    }

    // Pluck article name back out
    exportPath = exportPath.replace(new RegExp(articleName + '/?$'), '');
  }

  return {articleName, exportPath};
}

/**
 * Parses the project name from a url like /en/docs/privacy-sandbox/, /en/docs/chrome
 * or /en/docs/lighthouse and returns DevSite paths for project and book
 * @param {string} url
 * @param {string[]} tags
 */
function getProjectAndBookPaths(url, tags) {
  // Privacy Sandbox is special, as it may have not the same project path format
  if (
    url.includes('privacy-sandbox') ||
    (url.includes('blog') && tags.includes('privacy')) ||
    url.includes('docs/privacy-sandbox')
  ) {
    return {
      project_path: '/privacy-sandbox/_project.yaml',
      book_path: '/privacy-sandbox/_book.yaml',
    };
  }

  const pathParts = url.split('/');
  const type = pathParts[2];
  // Only set project for docs documents
  if (type === 'docs') {
    const projectName = pathParts[3];
    return {
      project_path: `/docs/${projectName}/_project.yaml`,
      book_path: `/docs/${projectName}/_book.yaml`,
    };
  }

  return {
    project_path: '/_project.yaml',
    book_path: '/_book.yaml',
  };
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
  // Start the frontmatter with the project and book paths
  let frontMatter = getProjectAndBookPaths(pageUrl, tags);

  // Rewrite Privacy Sandbox paths to have them isolated in their own project.
  // This is a temporary measure until we have a proper Privacy Sandbox location
  if (inputPath.includes('blog') && tags.includes('privacy')) {
    pageUrl = pageUrl.replace('/blog/', '/privacy-sandbox/blog/');
  }
  if (inputPath.includes('docs/privacy-sandbox')) {
    pageUrl = pageUrl.replace('docs/privacy-sandbox', 'privacy-sandbox/docs');
  }

  if (authors) {
    frontMatter.author_name = authorValues[authors[0]].title.en;
  }

  // Set the refresh date
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
  // Check if the page has a redirect URL and early exit if it does
  const redirectUrl = redirectUrls[pageUrl.replace('/en/', '/')];
  if (redirectUrl) {
    console.log('Skipping redirect page', pageUrl, '->', redirectUrl);
    return '';
  };

  const ctx = Object.assign({}, this.ctx, {
    export: true,
    exportPath,
    articleName,
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

  if (api) {
    await exportExtensionReference(ctx, api, frontMatter, transformedMarkdown);
    return '';
  }

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
  await updateToCs(exportPath, articleName, title);
  return '';
}

module.exports = {
  Export,
  pluck,
  insert,
  getExportDetails,
  renderTemplate,
};

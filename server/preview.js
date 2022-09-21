/*
 * Copyright 2022 Google LLC
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

const Eleventy = require('@11ty/eleventy');
const path = require('path');
const toMarkdown = require('@sanity/block-content-to-markdown');
const sanity = require('../sanity_utils/sanityClient.js');
const client = require('../sanity_utils/sanityClient.js');
const serializers = require('../sanity_utils/serializers');

const querySanity = async function (slug) {
  const query = `*[_type == "post" && slug.current == '${slug}']`;
  const result = await sanity.fetch(query);
  if (result.length === 1) {
    return result[0];
  }
  return result;
};

const formatDoc = async function (doc) {
  return {
    // TODO: Better date formatting
    date: doc.publishedAt.split('T')[0],
    title: doc.title,
    slug: doc.slug.current,
  };
};

const formatBody = async function (body) {
  const out = await toMarkdown(body, {
    serializers,
    ...client.config(),
  });
  return out;
};

const ignorePatterns = [
  'site/es/**/*',
  'site/pt/**/*',
  'site/ko/**/*',
  'site/zh/**/*',
  'site/ru/**/*',
  'site/ja/**/*',
  'site/fr/**/*',
  'site/de/**/*',
  'site/**/docs/',
  'site/**/blog/',
  'site/**/articles/',
  'site/**/authors/',
  'site/**/tags/',
  'site/**/releases/',
  'site/**/workbox/',
];

const previewHandler = async (req, res, next) => {
  process.env.ELEVENTY_IGNORE_EXTENSIONS = 'true';
  // TODO: Add locales support. Defaults to 'en' at the moment.
  // TODO: add noindex / norobots header
  // TODO: Add /preview template to eleventyignore.
  // TODO: right now it supports only 1 content type.
  const inputPath = path.join('./site/en/', 'preview', 'index.njk');

  // TODO: support full path and not only slug.
  // TODO: user-provided: sanitize input!
  const slug = req.params[0].split('/').pop();

  const doc = await querySanity(slug);
  if (!doc || !doc?.body) {
    next();
    return;
  }

  const post = await formatDoc(doc);
  const body = await formatBody(doc.body);

  try {
    const elev = new Eleventy(inputPath, 'dist', {
      configPath: '.eleventy.js',
      inputDir: './site',
      config: function (eleventyConfig) {
        eleventyConfig.addGlobalData('isPreview', true);
        eleventyConfig.addGlobalData('previewSource', 'sanity');
        eleventyConfig.addGlobalData('post', post);
        eleventyConfig.addGlobalData('content', body);
        eleventyConfig.addGlobalData('date', post.date);

        ignorePatterns.forEach(entry => {
          eleventyConfig.ignores.add(entry);
        });
      },
    });
    const out = await elev.toJSON();

    // Preview for this path was not found.
    if (!out.length || !out[0]?.content) {
      next();
      return;
    }

    res.send(out[0].content);
  } catch (e) {
    console.error(e);
    next();
    return;
  }
};

module.exports = {previewHandler};

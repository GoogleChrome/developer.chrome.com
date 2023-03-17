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
const matter = require('gray-matter');
const {EleventyRenderPlugin} = require('@11ty/eleventy');

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
  'site/**/articles/',
  'site/**/authors/',
  'site/**/tags/',
  'site/**/releases/',
  'site/**/workbox/',
];

const supportedLayouts = ['layouts/blog-post.njk', 'layouts/doc-post.njk'];

const renderHandler = async (req, res) => {
  process.env.ELEVENTY_IGNORE_EXTENSIONS = 'true';
  const defaultParsedFm = {
    data: {
      layout: 'layouts/blog-post.njk',
      date: new Date().toISOString().split('T')[0],
      title: 'Test title TBD',
      desciption: 'Test description TBD',
      authors: ['rachelandrew'],
    },
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  };

  let /** @type {any} */ fm = {};
  try {
    fm = !req.body.fm ? defaultParsedFm : matter(req.body.fm);
  } catch (e) {
    return res.status(400).send(`FrontMatter malformed: ${e}`);
  }
  if (!supportedLayouts.includes(fm.data.layout)) {
    return res.status(400).send(`Unsupported layout: ${fm.data.layout}`);
  }

  const inputPath = path.join('./site/en/preview', fm.data.layout);
  const postDate = fm.data?.date?.toISOString ? fm.data.date : new Date();
  fm.date = postDate.toISOString().split('T')[0];

  try {
    const elev = new Eleventy(inputPath, 'dist', {
      configPath: '.eleventy.js',
      inputDir: './site',
      config: function (eleventyConfig) {
        eleventyConfig.addPlugin(EleventyRenderPlugin);
        eleventyConfig.addGlobalData('fm', fm.data);
        eleventyConfig.addGlobalData('body', fm.content);
        eleventyConfig.addGlobalData('date', fm.date);

        eleventyConfig.addAsyncShortcode('render', async function (str) {
          const {renderTemplate} = eleventyConfig.javascriptFunctions;
          // Ignore ts complaining about the magical 'this' that comes from 11ty
          // @ts-ignore
          const r = renderTemplate.bind(this);
          // @ts-ignore
          const out = await r(str, 'njk, md', this.ctx);
          return out;
        });

        ignorePatterns.forEach(entry => {
          eleventyConfig.ignores.add(entry);
        });
      },
    });

    const out = await elev.toJSON();
    if (!out.length || !out[0]?.content) {
      return res.status(400).send('Render failed - template not found');
    }
    return res.send(out[0].content);
  } catch (e) {
    return res.status(400).send(`Render failed. Details:\n ${e}`);
  }
};

module.exports = {renderHandler};

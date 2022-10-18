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
const yaml = require('js-yaml');
const xss = require('xss').filterXSS;
const {EleventyRenderPlugin} = require('@11ty/eleventy');
const {OAuth2Client} = require('google-auth-library');

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

const CLIENT_ID =
  '636061184119-c4pof3b538r4ibs8bt6g8qdfth958nc9.apps.googleusercontent.com';
const authClient = new OAuth2Client(CLIENT_ID);

async function verifyLogin(token) {
  const ticket = await authClient.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload && payload['sub']; // userid
}

/**
 * Escapes and formats frontmatter provided by user to 11ty format.
 * @param {string} inputFm Frontmatter string
 */
const parseFrontmatter = inputFm => {
  const /** @type {any} */ parsedFm = yaml.load(inputFm) || {};
  const date = parsedFm.date?.toISOString ? parsedFm.date : new Date();
  return {
    layout: xss(parsedFm.layout) || 'layouts/blog-post.njk',
    date: date.toISOString().split('T')[0],
    title: xss(parsedFm.title) || 'Test title TBD',
    desciption: xss(parsedFm.description) || 'Test description TBD',
    authors: parsedFm.authors?.map(author => xss(author)) || ['rachelandrew'],
  };
};

const renderHandler = async (req, res) => {
  // Check sign in
  try {
    const userId = await verifyLogin(req.body.t);
    if (!userId) {
      return res.sendStatus(401);
    }
  } catch (e) {
    return res.sendStatus(401);
  }

  process.env.ELEVENTY_IGNORE_EXTENSIONS = 'true';

  let fm = {};
  try {
    fm = parseFrontmatter(req.body.fm);
  } catch (e) {
    return res.status(400).send(`FrontMatter malformed: ${e}`);
  }
  if (!supportedLayouts.includes(fm.layout)) {
    return res.status(400).send(`Unsupported layout: ${fm.layout}`);
  }
  const body = xss(req.body.md);
  const inputPath = path.join('./site/en/preview', fm.layout);

  try {
    const elev = new Eleventy(inputPath, 'dist', {
      configPath: '.eleventy.js',
      inputDir: './site',
      config: function (eleventyConfig) {
        eleventyConfig.addPlugin(EleventyRenderPlugin);
        eleventyConfig.addGlobalData('fm', fm);
        eleventyConfig.addGlobalData('body', body);
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

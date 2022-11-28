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

const fs = require('fs/promises');
const path = require('path');

const cheerio = require('cheerio');

/**
 * The path to where the 11ty test setup outputs built pages
 */
const distPath = path.resolve(path.join(__dirname, 'fixtures/dist'));

/**
 * Already lodeded pages keyed by URL, looked up by getPageUrl
 * to minimize file system calls
 */
const pageCache = {};

/**
 * Creates a cheerio DOM from a page by passing the URL path.
 * Either tries to load the mark-up from the filesystem or looks
 * it up in a module-wide page cache
 * @param {string} urlPath For example, en/shortcodes/aside.html
 */
async function getPageByUrl(urlPath) {
  if (!urlPath.endsWith('/index.html')) {
    urlPath = `${urlPath}/index.html`;
  }

  if (urlPath in pageCache) {
    return pageCache[urlPath];
  }

  const file = await fs.readFile(path.join(distPath, urlPath));
  const $ = cheerio.load(file);

  pageCache[urlPath] = $;

  return $;
}

module.exports = {
  getPageByUrl,
  distPath,
};

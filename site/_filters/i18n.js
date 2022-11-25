/*
 * Copyright 2020 Google LLC
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

const yaml = require('js-yaml');
const get = require('lodash.get');
const fs = require('fs');
const path = require('path');

const defaultLocale = 'en';

/**
 * Recursively walk a directory and create an object out of the file tree.
 * For example: _data/i18n/foo/bar/baz.yml would produce:
 * {foo: {bar: baz: { ... }}}
 * @param {string} dir A directory
 * @return {object}
 */
const walk = dir => {
  const results = {};
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    file = path.join(dir, file);
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results[name] = walk(file);
    } else {
      /* Is a file */
      if (ext === '.yaml' || ext === '.yml') {
        results[name] = yaml.load(fs.readFileSync(file, 'utf-8'));
      }
    }
  });
  return results;
};

// Scan the _data/i18n directory and create a nested i18n data object
const data = {i18n: walk(path.join(__dirname, '..', '_data', 'i18n'))};

/**
 * Flattens the i18n yaml object to contain only translations from given locale.
 * @param {Object} obj Object with i18n translations (from _data/i18n).
 * @param {string} locale A locale prefix (example: 'en', 'pl')
 * @return {Object|string}
 */
const getTranslation = function (obj, locale) {
  const out = {};
  for (const prop in obj) {
    if (typeof obj[prop] === 'string') {
      return obj[locale] ?? obj[defaultLocale];
    } else {
      out[prop] = getTranslation(obj[prop], locale);
    }
  }
  return out;
};

/**
 * Looks for the i18n string that matches the path and locale.
 * @param {string} pth A dot separated path
 * @param {string} locale A locale prefix (example: 'en', 'pl')
 * @return {string}
 */
const i18n = (pth, locale = 'en') => {
  try {
    return getTranslation(get(data, pth), locale);
  } catch (err) {
    throw new Error(`Could not find i18n result for ${pth}`);
  }
};

module.exports = {defaultLocale, i18n};

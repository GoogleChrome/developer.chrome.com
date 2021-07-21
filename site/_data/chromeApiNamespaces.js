/*
 * Copyright 2021 Google LLC
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

/**
 * @fileoverview This fetches and builds easily renderable type information from the NPM package
 * "chrome-types".
 *
 * This uses Eleventy's helper but directly accesses its cache objects. See here:
 *   https://www.11ty.dev/docs/plugins/cache/#manually-store-your-own-data-in-the-cache
 */

require('dotenv').config();

// TODO(samthor): This is in package.json and installed yet ESLint complains it does not exist.
// eslint-disable-next-line node/no-missing-require
const chromeTypesHelpers = require('chrome-types-helpers');
const {fetchFromCache} = require('./lib/cache');

const LATEST_VERSION_JSON =
  'https://unpkg.com/chrome-types@latest/history.json';

/**
 * @return {Promise<{[name: string]: chromeTypesHelpers.Namespace}>}
 */
module.exports = async () => {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return {};
  }

  // This fetches the latest pubilshed historic version data, which is automaticaly published from
  // https://github.com/GoogleChrome/chrome-types in a GitHub action.
  /** @type {chromeTypesHelpers.VersionDataFile} */
  const data = await fetchFromCache(LATEST_VERSION_JSON);

  const {symbols} = data;

  const out = await chromeTypesHelpers.prepareNamespaces({symbols});
  return out.namespaces;
};

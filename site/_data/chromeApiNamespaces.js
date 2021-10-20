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

const path = require('path');
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
const typedoc = require('typedoc');

module.exports = () => {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return {};
  }

  const chromeTypesFile = path.join(
    __dirname,
    '../../external/data/chrome-types.json'
  );

  /** @type {{[namespace: string]: typedoc.JSONOutput.DeclarationReflection}} */
  const parsed = JSON.parse(fs.readFileSync(chromeTypesFile, 'utf-8'));

  return parsed;
};

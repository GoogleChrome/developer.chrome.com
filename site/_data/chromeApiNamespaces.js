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
const {AssetCache} = require('@11ty/eleventy-cache-assets');
const {build} = require('../../tools/types/build.js');

/**
 * Bump this value if the parser changes, so folks' caches are invalidated.
 */
const typesRevision = '2021-03-05';

/**
 * Building the JSON types is reasonably expensive. Don't do this often. When deploying to prod,
 * there will never be cache, so it will always be fresh.
 */
const typesExipry = '7d';

/**
 * @return {Promise<{[name: string]: RenderNamespace}>}
 */
module.exports = async () => {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return {};
  }
  const asset = new AssetCache('generated_types_info#' + typesRevision);
  if (asset.isCacheValid(typesExipry)) {
    return asset.getCachedValue();
  }

  const types = await build();
  await asset.save(types, 'json');
  return types;
};

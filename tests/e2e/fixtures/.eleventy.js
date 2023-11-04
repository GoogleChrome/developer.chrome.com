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

const originalConfig = require('../../../.eleventy.js');

module.exports = (eleventyConfig) => {
  // First apply the original project config in order to load
  // all shortcodes, filters, initialize collections, ...
  const config = originalConfig(eleventyConfig);

  // Only then adapt settings for the test environment
  return Object.assign({}, config, {
    dir: {
      includes: '../../../../site/_includes',
      data: '../../../../site/_data',
      input: './site',
      output: './dist'
    }
  });
}
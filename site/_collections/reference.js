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

/**
 * Returns a list of pages which we have documentation for and which have an API. We need this to
 * generate a TOC on /docs/extensions/reference/.
 * *
 * @param {EleventyCollectionObject} collections
 * @returns {EleventyCollectionItem[]}
 */
module.exports = collections => {
  const out = collections
    .getFilteredByGlob('./site/en/docs/extensions/reference/**/index.md')
    .filter(raw => {
      const {
        template: {inputPath},
        data: {api, namespace},
      } = raw;

      // This can happen if e.g., a Chrome namespace is removed and we still have a reference page
      // for it.
      if (api && !namespace) {
        console.warn(
          `Reference page with 'api: ${api}' does not have source data, check types flow:`,
          inputPath
        );
      }
      return Boolean(namespace);
    })
    .slice();
  out.sort(({data: {api: a}}, {data: {api: b}}) => a.localeCompare(b));
  return out;
};

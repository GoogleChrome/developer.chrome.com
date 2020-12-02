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
 * Returns a list of pages which we have documentation for. We need this to
 * generate a TOC on /docs/extensions/reference/.
 *
 * TODO(samthor): Split into apps/extensions and locale (eventually).
 *
 * @param {EleventyCollectionObject} collections
 * @returns {EleventyCollectionItem[]}
 */
module.exports = collections => {
  return collections.getFilteredByGlob(
    './site/en/docs/extensions/reference/**/index.md'
  );
};

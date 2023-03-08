/*
 * Copyright 2023 Google LLC
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

const pageIds = new Set();

/**
 * Builds a key from the given id and the page URL and verifies
 * it is unique across the page for a production build
 * @param {string} id of the section
 * @this {any} The eleventy context
 * @return {string} unique id for the section
 */
function ensureUniqueHrefInProduction(id) {
  // Incremental builds (e.g. `npm run dev`) can not check for uniqueness
  // as they create the same ID for every run which would trigger an error.
  if (process.env.ELEVENTY_ENV !== 'production') {
    return id;
  }

  const key = `${this.ctx.page.url}#${id}`;

  if (!pageIds.has(key)) {
    pageIds.add(key);

    return id;
  }

  throw new Error(
    `There is another element with the ID ${id} on the page ${this.ctx.page.url}. Please make sure all IDs are unique.`
  );
}

module.exports = {
  ensureUniqueHrefInProduction,
};

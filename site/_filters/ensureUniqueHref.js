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

/**
 * @fileoverview This makes sure the ids of page sections are unique
 *
 * This follows a couple of rules:
 *   - we store each section id in an array
 *   - if the section id is already in the array, counts its occurences and makes the id unique using that number
 *   - otherwise just returns the id we passed to the filter
 *
 */

const pageIds = [];

/**
 * @param {string} id of the section
 * @this {any} The eleventy context
 * @return {string} unique id for the section
 */

function ensureUniqueHref(id) {
  const key = `${this.ctx.page.url}#${id}`;

  if (!pageIds.includes(key)) {
    pageIds.push(key);

    return id;
  }

  throw new Error(
    `There is another element with the ID ${id} on the page ${this.ctx.page.url}. Please make sure all IDs are unique.`
  );
}

module.exports = {
  ensureUniqueHref,
};

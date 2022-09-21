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
 * Reusable hooks for generating single pages for collections, e.g. authors.
 */

const addPagination = require('../_utils/add-pagination');
const filterByLocale = require('../_filters/filter-by-locale');

/**
 * @param {VirtualCollectionItem[]} items
 * @param {string} [locale]
 * @return {PaginatedPage[]}
 */
const individual = (items, locale) => {
  /** @type PaginatedPage[] */
  let paginated = [];
  for (const item of items) {
    if (item.elements?.length > 0) {
      paginated = paginated.concat(
        addPagination(filterByLocale(item.elements, locale), item)
      );
    }
  }
  return paginated;
};

module.exports = {
  individual,
};

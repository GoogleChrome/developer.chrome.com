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
 * @file Generates 11ty data file for paginated tag pages (the individual tags).
 * Sets the paginated element's title to the page's data title as well as paginating
 * all of the tag's posts.
 */

const addPagination = require('./add-pagination');
const {i18n} = require('../_filters/i18n');

/**
 * @param {string} locale
 * @return {EleventyData}
 */
module.exports = locale => ({
  eleventyComputed: {
    title: data => data.paged.title,
  },
  pagination: {
    /**
     * @param {Tag[]} tags
     * @return {PaginatedPage[]}
     */
    before: tags => {
      /** @type PaginatedPage[] */
      let paginated = [];

      for (const tag of tags) {
        const posts = tag.posts[locale];
        if (posts.length > 0) {
          paginated = paginated.concat(
            addPagination(posts, locale + '/tags/' + tag.key, {
              title: tag.isGeneratedTag ? tag.title : i18n(tag.title, locale),
            })
          );
        }
      }

      return paginated;
    },
  },
});

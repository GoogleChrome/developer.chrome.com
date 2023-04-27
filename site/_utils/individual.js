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

const path = require('path');
const fs = require('fs');

const addPagination = require('../_utils/add-pagination');
const filterByLocale = require('../_filters/filter-by-locale');
const {defaultLocale} = require('../_data/site.json');

const authorsDataFile = path.join(
  __dirname,
  '../../external/data/external-posts.json'
);
const authorsFeeds = JSON.parse(fs.readFileSync(authorsDataFile, 'utf-8'));

/**
 * @param {VirtualCollectionItem[]} items
 * @param {string} [locale]
 * @return {PaginatedPage[]}
 */
const individual = (items, locale) => {
  /** @type PaginatedPage[] */
  let paginated = [];
  for (const item in items) {
    const authorKey = items[item].key;
    const authorFeeds = authorsFeeds.find(authorFeeds => {
      return Object.keys(authorFeeds)[0] === authorKey;
    });

    if (authorFeeds) {
      const feeds = authorFeeds[authorKey];
      items[item] = items[item] || {};

      feeds.forEach(feed => {
        const element = {
          title: feed.title,
          description: feed.summary,
          source: feed.source,
          locale: defaultLocale,
          date: new Date(feed.date),
          url: feed.url,
        };
        (items[item].elements = items[item].elements || []).push(element);
      });
    }

    if (items[item].elements?.length > 0) {
      const posts = filterByLocale(items[item].elements, locale);
      paginated = paginated.concat(addPagination(posts, items[item]));
    }
  }
  return paginated;
};

module.exports = {
  individual,
};

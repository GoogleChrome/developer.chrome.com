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
const {isExternalLink} = require('../_data/helpers.js');

const authorsDataFile = path.join(
  __dirname,
  '../../external/data/external-posts.json'
);
const authorsFeeds = JSON.parse(fs.readFileSync(authorsDataFile, 'utf-8'));
const availableFilters = [];
let availableSources;
let availableTypes;

/**
 * @param {object[]} availableList
 * @return {void}
 */
const addAvailableItem = (availableList, item) => {
  if (!availableList.length) {
    availableList.push(item);
    return;
  }

  const itemsFiltered = availableList.filter(availableItem => {
    return availableItem.value === item.value;
  });

  if (!itemsFiltered.length) {
    availableList.push(item);
  }
};

/**
 * @param {string} url
 * @return {PostTypes}
 */
const getFeedType = url => {
  if (isExternalLink(url)) {
    addAvailableItem(availableTypes, {name: 'RSS feed', value: 'rssFeed'});
    return 'rssFeed';
  }

  const pathnameList = url.split('/');
  if (pathnameList.includes('articles')) {
    addAvailableItem(availableTypes, {name: 'Articles', value: 'article'});
    return 'article';
  }

  addAvailableItem(availableTypes, {name: 'Blogs', value: 'blogPost'});
  return 'blogPost';
};

/**
 * @param {string} source
 */
const addAvailableSource = source => {
  let sourceTitle = source;

  if (source === 'webdev') {
    sourceTitle = 'web.dev';
  } else if (source === 'dcc') {
    sourceTitle = 'developer.chrome.com';
  }

  addAvailableItem(availableSources, {name: sourceTitle, value: source});
};

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
    const authorsFeedsObj = Object.assign({}, ...authorsFeeds);
    const feeds = authorsFeedsObj[authorKey];

    availableSources = [];
    availableTypes = [];

    if (feeds) {
      items[item] = items[item] || {};
      for (const feed of feeds) {
        const element = {
          title: feed.title,
          description: feed.summary,
          source: feed.source,
          locale: defaultLocale,
          type: getFeedType(feed.url),
          date: new Date(feed.date),
          url: feed.url,
        };

        if (!items[item].elements) {
          items[item].elements = [];
        }

        items[item].elements.push(element);

        addAvailableSource(feed.source);
      }
    }

    if (items[item].elements?.length > 0) {
      for (const element of items[item].elements) {
        element.type = getFeedType(element.url);
      }

      const posts = filterByLocale(items[item].elements, locale);
      paginated = paginated.concat(addPagination(posts, items[item]));

      const internalSource = 'dcc';
      addAvailableSource(internalSource);
    }

    availableFilters.push({
      key: authorKey,
      sources: availableSources,
      types: availableTypes,
    });
  }
  return paginated;
};

module.exports = {
  availableFilters,
  individual,
};

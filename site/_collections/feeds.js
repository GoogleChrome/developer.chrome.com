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
 * Returns an array of `FeedsCollectionItem` to generate the RSS feeds.
 *
 * @param {EleventyCollectionObject} collection
 * @returns {FeedsCollection} Key value pair of tag name with `FeedsCollectionItem`.
 */
module.exports = collection => {
  /** @type FeedsCollection */
  const feeds = {};
  const tags = ['devtools'];

  for (const tag of tags) {
    const items = collection.getFilteredByTag(tag).reverse();
    if (items.length) {
      feeds[tag] = {
        permalink: `/feeds/${tag}.xml`,
        items,
      };
    }
  }

  const allItems = collection.getAllSorted().reverse();
  if (allItems.length) {
    feeds['all'] = {permalink: '/feeds/all.xml', items: allItems};
  }

  return feeds;
};

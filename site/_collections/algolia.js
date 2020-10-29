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

const removeMarkdown = require('remove-markdown');
const {generateSrc} = require('../_shortcodes/img');

/**
 * @param {EleventyCollectionObject} collections
 * @returns {AlgoliaCollectionItem[]}
 */
module.exports = collections => {
  const allSorted = collections.getAllSorted();
  /** @type {AlgoliaCollectionItem[]} */
  const algoliaCollectionItems = [];

  for (const item of allSorted) {
    if (item.data.disable_algolia) {
      continue;
    }

    if (item.data.tags && typeof item.data.tags === 'string') {
      item.data.tags = [item.data.tags];
    }

    algoliaCollectionItems.push({
      title: item.data.title,
      description: item.data.description,
      content: removeMarkdown(item.template.frontMatter.content),
      url: item.url,
      tags: item.data.tags || [],
      locale: item.data.locale,
      photo: item.data.hero && generateSrc(item.data.hero),
    });
  }
  return algoliaCollectionItems;
};

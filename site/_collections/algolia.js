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
 * @fileoverview Collection of indexable posts rewritten to our expected format
 * for indexing via Algolia.
 */

const {createHash} = require('crypto');
const striptags = require('striptags');
const {generateImgixSrc} = require('../_shortcodes/Img');
const {stripDefaultLocale} = require('../_filters/urls');
const {
  getChromeApiNamespacePaths,
} = require('../_utils/getChromeApiNamespacePaths');

/**
 * Shrink the size of the given fulltext to fit within a certain limit, at the
 * nearest found newline character.
 *
 * @param {string} content
 * @param {number} [limit]
 * @return {string}
 */
function limitText(content, limit = 7500) {
  if (content.length <= limit) {
    return content;
  }

  // Find the nearest prior newline to the 10k limit.
  let newlineIndex = content.lastIndexOf('\n', limit);
  if (newlineIndex === -1) {
    newlineIndex = limit;
  }
  return content.slice(0, newlineIndex);
}

/**
 * @param {EleventyCollectionObject} collections
 * @returns {AlgoliaCollectionItem[]}
 */
const algoliaCollection = collections => {
  const toIndex = collections.getAllSorted().filter(item => {
    const {data} = item;

    // Filter out pages we don't want to index. This includes drafts, which we
    // always filter (even in dev, since we're not really indexing here).
    if (
      data.disable_algolia ||
      data.noindex ||
      data.draft ||
      (data.permalink === false && Boolean(data.isVirtualItem) === false)
    ) {
      return false;
    }

    return true;
  });

  return toIndex.map(item => {
    let image = item.data.thumbnail ?? item.data.hero;
    if (image) {
      image = generateImgixSrc(image, {w: 100, auto: 'format'});
    }

    const url = item.data.deepLink || item.url;

    /** @type {AlgoliaCollectionItem} */
    const algoliaCollectionItem = {
      title: item.data.title,
      description: item.data.description,
      content: undefined,
      url: stripDefaultLocale(url),
      tags: [item.data.tags ?? []].flat(),
      locale: item.data.locale,
      image,
      objectID: createHash('md5').update(url).digest('hex'),
    };

    // The item is dumped to JSON, but we can't get at the underlying post's
    // templateContent until the rendering state of 11ty: the templateContent
    // prop itself is a getter.
    // (templateContent returns the final rendered HTML for this page, not
    // including the layout).
    // So, define our own getter which will work at that later point.
    Object.defineProperty(algoliaCollectionItem, 'content', {
      get() {
        // Strip HTML tags and limit to a sensible size for indexing.
        // As stated above, there's no more Markdown in this content.
        const text = striptags(item.templateContent ?? '');
        return limitText(text);
      },
      enumerable: true,
    });

    // Add API types to algolia doc to allow fully qualified searches,
    // like chrome.webRequest.onBeforeSendHeaders instead of just being
    // able to search onBeforeSendHeaders which also appears in the content
    if (item.data.api && item.data.chromeApiNamespaces[item.data.api]) {
      const apiNamespace = item.data.chromeApiNamespaces[item.data.api];
      const apiNamespacePaths = getChromeApiNamespacePaths(apiNamespace);
      algoliaCollectionItem.apiNamespacePaths = apiNamespacePaths;
    }

    if (item.data.type) {
      algoliaCollectionItem.type = item.data.type;
    }

    return algoliaCollectionItem;
  });
};

module.exports = algoliaCollection;

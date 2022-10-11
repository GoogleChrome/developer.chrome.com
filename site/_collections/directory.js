/*
 * Copyright 2022 Google LLC
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
 * @file Creates a collection for a directory under a specific locale
 * while using the same path in the default locale as a fallback.
 * For example used to show localized (or original) blog articles
 * alongside untranslated ones.
 */

const path = require('path');
const {filterOutDrafts} = require('../_utils/drafts');
const {sortCollectionByDate} = require('../_utils/sort');

const defaultLocale = 'en';

/**
 *
 * @param {EleventyCollectionItem[]} baseCollection
 * @param {EleventyCollectionObject} localeCollection
 * @returns {EleventyCollectionItem[]}
 */
function mergeCollections(baseCollection, localeCollection) {
  // Otherwise walk through the English collection while looking
  // for matches in the locale collection and if it's a match, replace.
  // Beware: this works as long as there is no page that only exists in
  // a non-english language and fileSlugs match across collections
  let localeIndex = 0;
  let collection = [];
  for (let index = 0; index < baseCollection.length; index++) {
    const item = baseCollection[index];
    const localizedItem = localeCollection[localeIndex];

    if (item.fileSlug === localizedItem.fileSlug) {
      collection.push(localeCollection[localeIndex]);
      localeIndex++;
    } else {
      collection.push(baseCollection[index]);
    }

    // If there are no items left to potentially localize then simply
    // append the rest of the articles and stop
    if (localeIndex === localeCollection.length) {
      collection = collection.concat(baseCollection.slice(index + 1));
      break;
    }
  }

  // Bring the collection back into 11ty's natural order,
  // which is by date, newest first
  return collection.sort(sortCollectionByDate);
}

function add(config, locale, dir) {
  config.addCollection(`${dir}-${locale}`, collections => {
    const baseCollection = collections
      .getFilteredByGlob(
        path.join('.', 'site', defaultLocale, dir, '*', '*.md')
      )
      .filter(filterOutDrafts)
      .sort(sortCollectionByDate);

    // Test case: if we're running inside of Percy then don't care
    // about translations. Just show the first six posts.
    if (process.env.PERCY_BRANCH) {
      return baseCollection.slice(baseCollection.length - 6);
    }

    // If we are building the collection for the default locale,
    // there also is no need to compare with English itself
    if (locale === defaultLocale) {
      return baseCollection;
    }

    const localeCollection = collections
      .getFilteredByGlob(path.join('.', 'site', locale, dir, '*', '*.md'))
      .filter(filterOutDrafts)
      .sort(sortCollectionByDate);

    // If there aren't any translations for that directory there is no
    // sense in trying to merge them, just return the English articles then
    if (localeCollection.length === 0) {
      return baseCollection;
    }

    const collection = mergeCollections(baseCollection, localeCollection);

    return collection;
  });
}

module.exports = {mergeCollections, add};

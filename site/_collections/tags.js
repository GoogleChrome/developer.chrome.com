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

const {locales} = require('../_data/site.json');
const {filterOutDrafts} = require('../_utils/drafts');
const YAML = require('js-yaml');
const path = require('path');
const fs = require('fs');

// There is a tag 'example' used for example, demo and testing
// content, which should not get a tags-individual.njk page rendered,
// and not be listed on the tags overview page
const EXAMPLE_TAG_ID = 'example';

/**
 * Returns an object with the keys being supported tags and the object
 * having the i18n name for the tag, the posts for a tag, and the tag's key.
 *
 * See also: ./types/site/_collections/tags.d.ts
 *
 * @param {EleventyCollectionObject} collections Eleventy collection object
 * @return {Tags}
 */
module.exports = function (collections) {
  /** @type Tags */
  const tags = {};

  const allSorted = collections
    .getAllSorted()
    .reverse()
    .filter(filterOutDrafts);

  // The i18n for this file exposes top-level object keys of valid tags.
  const supportedTags = /** @type {{[tag: string]: unknown}} */ (
    YAML.load(
      fs.readFileSync(path.join(__dirname, '../_data/i18n/tags.yml'), 'utf-8')
    )
  );

  /**
   * Iterates over every post in order to place them in the proper tag collections.
   * It does this by going through all of the tags and checking if they are
   * a supported tag. Not all tags that are processed are supported tags though.
   * The only other type of tags allowed that are not "supported tags" are chrome versions.
   * Such as: `chrome-86`.
   *
   * As it goes through each tag of a post it will check an object that holds all the posts
   * belonging to a tag.
   *
   * This function uses named loops in order to skip unsupported tags, to skip posts with no tags,
   * and to sort and place all the tags in one loop rather than using 11ty's `collections.getFilteredByTag()`,
   * which will cause us to loop over all of the posts many times.
   */
  allSortedForLoop: for (const item of allSorted) {
    // If there are no tags or the tags isn't a string or array, skip the post.
    /** @type {string[]} */
    let allTags = [item.data.tags ?? []].flat();
    if (!allTags.length) {
      delete item.data.tags;
      continue allSortedForLoop;
    }

    // rewrite chromeX to chrome-X
    const chromeXRegex = /^chrome(\d+)$/;
    allTags = allTags.map(tag => {
      chromeXRegex.lastIndex = 0;
      const match = tag.match(chromeXRegex);
      if (match) {
        return `chrome-${match[1]}`;
      }

      return tag;
    });

    // Ensure that tags on the front matter is an array.
    item.data.tags = allTags;

    // Handles posts that are also a Chrome release, `chrome-*`, therefore there are no supported tags.
    // Iterates through all possibilities as some posts may apply to many Chrome releases.
    const chromeTags = allTags.filter(tag => tag.startsWith('chrome-'));
    while (chromeTags.length) {
      const chromeTag = /** @type {string} */ (chromeTags.shift());
      const release = +chromeTag.substr('chrome-'.length);

      /**
       * Creates the sub-object for a chrome release if it does not exist in the `tags` const above.
       */
      if (!tags[chromeTag]) {
        tags[chromeTag] = {
          key: chromeTag,
          /**
           * Generates an object with every key being a locale
           * and the value an empty array for posts to be put into.
           *
           * ```JSON
           * {
           *  "posts": {
           *   "en": [],
           *   "es": [],
           *  }
           * }
           * ```
           */
          posts: locales.reduce((o, key) => ({...o, [key]: []}), {}),
          title: 'i18n.tags.chrome',

          /**
           * For Chrome releases, use a literal string title (don't translate "Chrome xx").
           */
          overrideTitle: chromeTag.replace('chrome-', 'Chrome '),
          /**
           * This is the numeric Chrome release for this tag.
           */
          release,
          url: `/tags/${chromeTag}/`,
        };
      }
      tags[chromeTag].posts[item.data.locale].push(item);
    }

    // Handle all of the supported tags for a post.
    postsTagsForLoop: for (const postsTag of allTags) {
      // If a tag isn't supported, skip over it in the `postsTagsForLoop`.
      if (!(postsTag in supportedTags) || postsTag === EXAMPLE_TAG_ID) {
        continue postsTagsForLoop;
      }

      /**
       * Creates the sub-object for a tag if it does not exist in the `tags` const above.
       */
      if (!tags[postsTag]) {
        tags[postsTag] = {
          key: postsTag,
          /**
           * Generates an object with every key being a locale
           * and the value an empty array for posts to be put into.
           *
           * ```JSON
           * {
           *  "posts": {
           *   "en": [],
           *   "es": [],
           *  }
           * }
           * ```
           */
          posts: locales.reduce((o, key) => ({...o, [key]: []}), {}),
          /**
           * Sets the title to the i18n value for the tag.
           */
          title: 'i18n.tags.' + postsTag,
          url: `/tags/${postsTag}/`,
        };
      }
      tags[postsTag].posts[item.data.locale].push(item);
    }
  }

  return tags;
};

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
const supportedTags = require('../_data/supportedTags.json');
const {drafts} = require('../_utils/drafts');

/**
 * Returns an object with the keys being supported tags and the object
 * having the i18n name for the tag, the posts for a tag, and the tag's key.
 *
 * @see ./types/site/_collections/tags.d.ts
 *
 * @param {EleventyCollectionObject} collections Eleventy collection object
 * @return {Tags}
 */
module.exports = function (collections) {
  /** @type Tags */
  const tags = {};

  const allSorted = collections.getAllSorted().reverse().filter(drafts);

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
    if (
      !item.data.tags ||
      (typeof item.data.tags !== 'string' && !Array.isArray(item.data.tags))
    ) {
      continue allSortedForLoop;
    }
    // If tags is a string, turn it into an array.
    if (typeof item.data.tags === 'string') {
      item.data.tags = [item.data.tags];
    }
    /** @type {string[]} */
    const allTags = item.data.tags;

    // Handles posts that are also a Chrome release, `chrome-*`, therefore there are no supported tags.
    // Iterates through all possibilities as some posts may apply to many Chrome releases.
    const chromeTags = allTags.filter(tag => /^chrome-\d+$/.test(tag));
    while (chromeTags.length) {
      const chromeTag = /** @type {string} */ (chromeTags.shift());

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
          title: chromeTag.replace('chrome-', 'Chrome '),
          /**
           * This is a flag so we know this tag was generated tag, not a supported tag.
           * Because there aren't any i18n titles for Chrome releases this
           * tells files like `site/_utils/tag-11tydata.js` to not use the `i18n`
           * function to get the title, and just use the title as is.
           */
          isGeneratedTag: true,
        };
      }
      tags[chromeTag].posts[item.data.locale].push(item);
    }

    // Handle all of the supported tags for a post.
    postsTagsForLoop: for (const postsTag of allTags) {
      // If a tag isn't supported, skip over it in the `postsTagsForLoop`.
      if (!supportedTags[postsTag]) {
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
          title: supportedTags[postsTag].title,
          /**
           * This is a flag so we know this tag is a supported tag, not a generated tag.
           * This is important for files like `site/_utils/tag-11tydata.js` to know
           * to use the `i18n` function.
           */
          isGeneratedTag: false,
        };
      }
      tags[postsTag].posts[item.data.locale].push(item);
    }
  }

  return tags;
};

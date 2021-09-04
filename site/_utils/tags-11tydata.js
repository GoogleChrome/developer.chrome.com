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
 * @file Generates 11ty data file for the top-level tags page. Filters out tags
 * with no posts as well as sorts the elements as needed.
 */

const {i18n} = require('../_filters/i18n');

/**
 * @param {string} locale
 * @return {EleventyData}
 */
module.exports = locale => ({
  eleventyComputed: {
    /**
     * Generates tags for the current named releases: Stable, Beta, and so on. Ordered by earliest
     * release first (i.e., 'Stable' > 'Beta' > 'Dev' > 'Canary').
     */
    namedChromeReleaseTags: data => {
      const rawChannels = data.chrome.channels;

      /** @type {Tags} */
      const rawTags = data.collections.tags;

      const all = [];

      for (const [name, data] of Object.entries(rawChannels)) {
        // name = 'stable', 'beta' etc
        const release = data.mstone;
        if (typeof release !== 'number') {
          throw new Error(`exepected release number, was: ${release}`);
        }

        // If there's no posts for this named release, skip.
        const key = `chrome-${release}`;
        const tag = rawTags[key];
        if (!tag?.posts[locale].length) {
          continue;
        }

        all.push({
          key: `chrome-${release}`,
          posts: tag.posts[locale],
          title: i18n('i18n.common.release_' + name, locale),
          release,
        });
      }

      // Sort lowest release first.
      all.sort(({release: a}, {release: b}) => a - b);

      return all;
    },

    chromeReleaseTags: data => {
      /** @type {Tags} */
      const rawTags = data.collections.tags;

      // Create an array of tags releated to releases.
      const all = Object.values(rawTags)
        .filter(tag => tag.release)
        .map(tag => {
          const release = /** @type {number} */ (tag.release);
          return {
            key: tag.key,
            posts: tag.posts[locale] ?? [],
            title: `Chrome ${release}`,
            release,
          };
        });

      // Sort highest release first.
      all.sort(({release: a}, {release: b}) => b - a);

      // Only return if there's locale-valid posts.
      return all.filter(tag => tag.posts.length);
    },

    displayTags: data => {
      /** @type {Tags} */
      const rawTags = data.collections.tags;

      // Create an array of tags unrelated to releases.
      const all = Object.values(rawTags)
        .filter(tag => !tag.release)
        .map(tag => {
          return {
            key: tag.key,
            posts: tag.posts[locale] ?? [],
            title: i18n(tag.title, locale),
          };
        });

      // Sort lexiographically by name.
      all.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );

      // Only return if there's locale-valid posts.
      return all.filter(tag => tag.posts.length);
    },
  },
});

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
 * @return {Partial<EleventyData>}
 */
module.exports = locale => ({
  eleventyComputed: {
    /**
     * Generates tags for the stable release and higher. Ordered by earliest release first (i.e.,
     * 'Stable' > 'Beta' > 'Dev' > 'Canary'). Only names 'Stable' and 'Beta'.
     */
    currentChromeReleaseTags: data => {
      const out = (data.releaseTags || []).filter(({isCurrent}) => isCurrent);
      out.reverse();
      return out;
    },

    /**
     * Return tag information for any Chrome release prior to the current stable.
     */
    historicChromeReleaseTags: data => {
      return (data.releaseTags || []).filter(({isCurrent}) => !isCurrent);
    },

    releaseTags: data => {
      /** @type {{[name: string]: ChromeReleaseData}} */
      const rawChannels = data.chrome.channels;

      /** @type {Tags} */
      const rawTags = data.collections.tags;

      // Create an array of tags releated to releases.
      const out = Object.values(rawTags)
        .filter(tag => tag.release)
        .map(tag => {
          const release = /** @type {number} */ (tag.release);
          let title = `Chrome ${release}`;

          // Only name 'stable' and 'beta' releases.
          if (rawChannels.stable.mstone === release) {
            title = i18n('i18n.common.release_stable', locale);
          } else if (rawChannels.beta?.mstone === release) {
            title = i18n('i18n.common.release_beta', locale);
          }

          return {
            key: tag.key,
            posts: tag.posts[locale] ?? [],
            title,
            release,
            isCurrent: release >= rawChannels.stable.mstone,
          };
        });

      // Sort highest release first.
      out.sort(({release: a}, {release: b}) => b - a);

      return out;
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

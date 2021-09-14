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

const {defaultLocale} = require('../_data/site.json');
const {i18n} = require('../_filters/i18n');
const {filterOutDrafts} = require('../_utils/drafts');

const MAX_POSTS = 10;

/**
 * @param {EleventyData} data
 */
function tagsForData(data) {
  let tags = [data.tags ?? []].flat();

  // Don't create a feed for every 'chrome-xx' post, just create a single 'chrome' feed.
  tags = tags.map(tag => {
    if (tag.startsWith('chrome-')) {
      return 'chrome';
    }
    return tag;
  });

  const s = new Set(tags);
  return [...s];
}

/**
 * Returns an array of `FeedsCollectionItem` to generate the RSS feeds.
 *
 * @param {EleventyCollectionObject} collection
 * @returns {FeedsCollection} Key value pair of tag name with `FeedsCollectionItem`.
 */
module.exports = collection => {
  const posts = collection
    .getAllSorted()
    .reverse()
    .filter(i => i.data.locale === defaultLocale && filterOutDrafts(i))
    .filter(item => {
      if (item.data.noindex || item.data.permalink === false) {
        return false;
      }
      return true;
    });

  /** @type FeedsCollection */
  const tagsFeeds = {};

  /** @type {EleventyCollectionItem[]} */
  const blog = [];

  for (const post of posts) {
    // If post is a blog post, push it into blog array.
    if (post.data.type === 'blogPost' && blog.length < MAX_POSTS) {
      blog.push(post);
    }

    const postTags = tagsForData(post.data);

    for (const tag of postTags) {
      // If tag does not exist in feeds yet, create FeedsCollectionItem
      if (!tagsFeeds[tag]) {
        tagsFeeds[tag] = {
          items: [],
          permalink: `/feeds/${tag}.xml`,
          title: i18n(`i18n.tags.${tag}`),
          url: `/tags/${tag}`,
        };
      }

      if (tagsFeeds[tag].items.length < MAX_POSTS) {
        tagsFeeds[tag].items.push(post);
      }
    }
  }

  // We write these feeds out in their own object so it's obvious that they will "win" over any
  // tagged feeds of the same name.
  /** @type {FeedsCollection} */
  const specialFeeds = {
    blog: {
      items: blog,
      permalink: '/feeds/blog.xml',
      title: i18n('i18n.common.blog'),
      url: '/blog',
    },
    all: {
      items: posts.slice(0, MAX_POSTS),
      permalink: '/feeds/all.xml',
    },
  };

  return {...tagsFeeds, ...specialFeeds};
};

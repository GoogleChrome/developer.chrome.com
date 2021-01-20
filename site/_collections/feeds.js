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

/**
 * Returns an array of `FeedsCollectionItem` to generate the RSS feeds.
 *
 * @param {EleventyCollectionObject} collection
 * @returns {FeedsCollection} Key value pair of tag name with `FeedsCollectionItem`.
 */
module.exports = collection => {
  const MAX_POSTS = 10;
  const posts = collection
    .getAllSorted()
    .reverse()
    .filter(i => i.data.locale === defaultLocale);
  const tags = ['devtools'];
  /** @type FeedsCollection */
  const feeds = {};
  const blog = [];

  for (const post of posts) {
    // If post is a blog post, push it into blog array.
    if (post.data.type === 'blogPost' && blog.length < MAX_POSTS) {
      blog.push(post);
    }

    // Check if post belongs to supported tags
    for (const tag of tags) {
      let postTags = [];

      if (Array.isArray(post.data.tags)) {
        postTags = post.data.tags;
        // If tags is a string, turn it into an array.
      } else if (typeof post.data.tags === 'string') {
        postTags.push(post.data.tags);
      }

      if (postTags.includes(tag)) {
        // If tag does not exist in feeds yet, create FeedsCollectionItem
        if (!feeds[tag]) {
          feeds[tag] = {
            items: [],
            permalink: `/feeds/${tag}.xml`,
            title: i18n(`i18n.tags.${tag}`),
            url: `/tags/${tag}`,
          };
        }

        if (feeds[tag].items.length < MAX_POSTS) {
          feeds[tag].items.push(post);
        }
      }
    }
  }

  if (blog.length) {
    feeds['blog'] = {
      items: blog,
      permalink: '/feeds/blog.xml',
      title: i18n('i18n.common.blog'),
      url: '/blog',
    };
  }

  if (posts.length) {
    feeds['all'] = {
      items: posts.slice(0, MAX_POSTS),
      permalink: '/feeds/all.xml',
    };
  }

  return feeds;
};

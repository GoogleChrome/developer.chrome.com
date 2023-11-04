/*
 * Copyright 2021 Google LLC
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
 * Reusable hooks for generating single pages for collections, e.g. authors.
 */

const path = require('path');
const fs = require('fs');

const filterByLocale = require('../_filters/filter-by-locale');
const {defaultLocale} = require('../_data/site.json');
const {isExternalLink} = require('../_data/helpers.js');

const externalPosts = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../external/data/external-posts.json'),
    'utf-8'
  )
);

const DEFAULT_SOURCE = 'developer.chrome.com';

/**
 * @param {string} url
 * @return {string}
 */
const getPostType = url => {
  if (isExternalLink(url)) {
    return 'external';
  }

  // url might be false in a production environment, if
  // the post is not yet published.
  if (url) {
    const pathnameList = url.split('/');
    if (pathnameList.includes('articles')) {
      return 'article';
    }
  }

  return 'blogPost';
};

/**
 * @param {VirtualCollectionItem[]} authors
 * @param {string} [locale]
 * @return {VirtualCollectionItem[]}
 */
const individual = (authors, locale) => {
  const authorsWithExternalPosts = [];
  for (const author of authors) {
    author.sources = new Set();
    author.postTypes = new Set();

    if (author.elements?.length > 0) {
      author.sources.add(DEFAULT_SOURCE);
      for (const element of author.elements) {
        const postType = getPostType(element.url);
        element.source = DEFAULT_SOURCE;
        element.type = postType;
      }
    }

    const authorExternalPosts = externalPosts[author.key];
    if (authorExternalPosts) {
      for (const externalPost of authorExternalPosts) {
        const postType = getPostType(externalPost.url);
        author.postTypes.add(postType);

        author.sources.add(externalPost.source);

        // Prepare a structure that is compatible with the existing
        // `author.posts` structure, coming from 11ty data.
        const postDetails = {
          title: externalPost.title,
          description: externalPost.summary,
          source: externalPost.source,
          // Assume all external posts are in English.
          locale: defaultLocale,
          type: postType,
          date: new Date(externalPost.date),
          url: externalPost.url,
        };

        if (!author.elements) {
          author.elements = [];
        }

        author.elements.push(postDetails);
      }
    }

    // This not just filters by locale but also sorts by date.
    author.elements = filterByLocale(author.elements, locale);

    // Convert sources and types to arrays, to make them easier to work with
    // in Nunjucks.
    author.sources = Array.from(author.sources);
    author.postTypes = Array.from(author.postTypes);

    authorsWithExternalPosts.push(author);
  }

  return authorsWithExternalPosts;
};

module.exports = {
  individual,
};

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
 * @fileoverview Collection of authors associated with posts they've written.
 */

const authorsData = require('../_data/authorsData.json');
const site = require('../_data/site.json');
const {i18n} = require('../_filters/i18n');

// There is an author 'example' used for example, demo and testing
// content, which should not get a author-individual.njk page rendered
const EXAMPLE_AUTHOR_ID = 'example';

/**
 * @param {EleventyCollectionObject} collections
 * @returns {Authors | {}}
 */
module.exports = collections => {
  const items = collections.getAllSorted();
  // Enhance each author in authorsData with posts they have written.
  const authors = {};
  items.reduce((authors, item) => {
    if (item.data.authors?.length) {
      item.data.authors.forEach(authorId => {
        if (authorsData[authorId] && authorId !== EXAMPLE_AUTHOR_ID) {
          authors[authorId] = authors[authorId] || {};
          authors[
            authorId
          ].description = `i18n.authors.${authorId}.description`;
          authors[authorId].title = `i18n.authors.${authorId}.title`;
          authors[authorId].key = authorId;
          authors[authorId].url = `/authors/${authorId}/`;
          authors[authorId].rss = `/authors/${authorId}/feed.xml`;

          authors[authorId].image =
            authorsData[authorId].image || site.defaultAvatarImg;
          authors[authorId].homepage = authorsData[authorId].homepage;
          authors[authorId].twitter = authorsData[authorId].twitter;
          authors[authorId].github = authorsData[authorId].github;
          authors[authorId].glitch = authorsData[authorId].glitch;
          authors[authorId].mastodon = authorsData[authorId].mastodon;
          authors[authorId].linkedin = authorsData[authorId].linkedin;
          authors[authorId].webdev = authorsData[authorId].webdev;
          authors[authorId].featuredPost = authorsData[authorId].featuredPost;

          try {
            authors[authorId].bio = i18n(`i18n.authors.${authorId}.bio`);
          } catch (err) {
            // There are some authors which has no bio key.
            // Thus, return an empty string in the case of no i18n result.
            authors[authorId].bio = '';
          }

          const element = {
            title: item.data.title,
            description: item.data.description,
            // If there is only one author, don't show it in the list, as it's
            // the one the author page is for
            authors: item.data.authors?.length === 1 ? [] : item.data.authors,
            date: item.date,
            updated: item.data.updated,
            tags: item.data.tags,
            locale: item.data.locale || 'en',
            url: item.url,
          };
          element.thumbnail = item.data.thumbnail || item.data.hero;
          (authors[authorId].elements = authors[authorId].elements || []).push(
            element
          );
        }
      });
    }
    return authors;
  }, authors);

  return authors;
};

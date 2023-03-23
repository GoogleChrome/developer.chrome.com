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
 * A filter to remove draft pages. We allow drafts to appear in a dev
 * environment, but omit them from collections in a production environment.
 *
 * This is purely here as a convenience so drafts still get included in dev.
 *
 * @param {EleventyCollectionItem} item
 * @return {boolean}
 */
const filterOutDrafts = item => {
  if (process.env.NODE_ENV === 'production') {
    return !item.data.draft;
  }
  return true; // include everything in non-prod
};

/**
 * Checks if the provided date is later than current date and time.
 *
 * @param {Date=} postDate Date to be compared.
 * @param {Date?} now Used to override the current date and time e.g. in tests.
 * @return {boolean} True if the date is in the future.
 */
function isScheduledForFuture(postDate, now = new Date()) {
  if (!(now instanceof Date)) {
    throw new Error('argument <now> must be a Date object.');
  }
  postDate = postDate ? new Date(postDate) : new Date();
  return postDate.getTime() > now.getTime();
}

/**
 * Checks if the post is in the publishable state: it is not a draft nor
 * scheduled for future.
 *
 * @param {EleventyData} data 11ty data available for a given post.
 * @return {boolean} True if the post is publishable.
 */
function isPublished(data) {
  return !(data.draft || isScheduledForFuture(data.page?.date));
}

module.exports = {filterOutDrafts, isScheduledForFuture, isPublished};

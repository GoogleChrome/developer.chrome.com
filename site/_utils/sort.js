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
 * @file Holds small functions that can be used to sort Eleventy collections
 */

/**
 * Sorts a collection alphabetically by its item's file slug
 * @param {EleventyCollectionItem} a
 * @param {EleventyCollectionItem} b
 */
function sortCollectionByFileSlug(a, b) {
  return a.fileSlug.localeCompare(b.fileSlug);
}

/**
 * Sorts a collection by date (from new to old) which is also
 * 11ty's default sorting
 * @param {EleventyCollectionItem} a
 * @param {EleventyCollectionItem} b
 */
function sortCollectionByDate(a, b) {
  return b.date.getTime() - a.date.getTime();
}

module.exports = {
  sortCollectionByFileSlug,
  sortCollectionByDate,
};

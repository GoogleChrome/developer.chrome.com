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
 * Shortens a string to (roughly) the desired length, without breaking
 * mid-word.
 *
 * @param {string} string
 * @param {number} desiredLength
 * @returns {string}
 */
const truncateString = (string, desiredLength) => {
  let closestSpace = (string + ' ').lastIndexOf(' ', desiredLength);

  if (closestSpace === -1) {
    closestSpace = string.indexOf(' ');
  }

  return string.substring(0, closestSpace);
};

module.exports = truncateString;

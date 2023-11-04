/*
 * Copyright 2023 Google LLC
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
 * Simple utility that returns a proper boolean value from a string,
 * usually coming from a environment variable or frontmatter value
 * @param {string|undefined|boolean} value
 */
function isTruthy(value) {
  if (typeof value === 'string') {
    value = value.toLowerCase();
  }

  if (value === '0' || value === 'false') return false;
  return !!value;
}

module.exports = {isTruthy};

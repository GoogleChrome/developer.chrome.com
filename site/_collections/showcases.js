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
 * @fileoverview Collection of authors associated with posts they've written.
 */
const memoize = require('../_js/utils/memoize');
const showcasesItems = require('../_data/fuguShowcase.json');

/**
 * @returns {FuguShowcase[]}
 */
const fuguShowcase = memoize(() => {
  return showcasesItems;
});

module.exports = {fuguShowcase};

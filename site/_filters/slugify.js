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

const uslug = require('uslug');

/**
 * Slugify a string using uslug.
 * We already use uslug with markdown-it-anchors to slugify markdown headings.
 * This filter just exposes that same ability to our nunjucks templates.
 * @param {string} s A string to slugify.
 * @return {string}
 */
const slugify = s => uslug(s);

module.exports = {slugify};

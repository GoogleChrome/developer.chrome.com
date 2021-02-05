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
 * Renders a wrapper element around whatever is passed in and places each
 * item into their own column.
 * @param {string} content A string of markdown
 */
const Columns = content => {
  // prettier-ignore
  // The funky whitespace here is intentional.
  // We need to have newlines between the ${content} so the markdown parser
  // will kick in again.
  // And because the content might be a <pre> element, which renders whitespace,
  // we need to make sure it's not indented in any way.
  return `<div class="columns">

${content}

</div>`;
};

const Column = content => {
  return `<div class="columns__column">${content}</div>`;
};

module.exports = {Columns, Column};

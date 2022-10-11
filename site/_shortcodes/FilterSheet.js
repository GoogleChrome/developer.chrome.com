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

const {html} = require('common-tags');
const {i18n} = require('../_filters/i18n');

/**
 * Renders a filter sheet
 *
 * @param {String} content
 *
 * @returns {string}
 */
function FilterSheet(content) {
  return html`
    <div class="filter-sheet display-flex direction-column">
      <p class="filter-sheet__title type--xsmall weight-medium case-upper">
        ${i18n('i18n.filter-sheet.filter_by')}
      </p>

      ${content}
    </div>
  `;
}

/**
 * Renders a FilterSheet section
 *
 * @param {String} content
 * @param {String} title
 *
 * @returns {String}
 */
function FilterSheetSection(content, title) {
  return html`
    <section class="gap-bottom-500">
      <p class="type--h5 weight-medium gap-bottom-200">${title}</p>

      ${content}
    </section>
  `;
}

/**
 * Renders the FilterSheet buttons
 *
 * @param {String} content
 *
 * @returns {String}
 */
function FilterSheetButtons(content) {
  return html`
    <div
      class="filter-sheet__buttons display-flex align-center justify-content-end"
    >
      ${content}
    </div>
  `;
}

module.exports = {FilterSheet, FilterSheetSection, FilterSheetButtons};

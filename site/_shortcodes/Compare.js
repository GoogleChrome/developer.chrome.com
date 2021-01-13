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

const {i18n} = require('../_filters/i18n');

/**
 * @param {string} content
 * @param {string} type
 * @param {string} labelOverride
 */
function Compare(content, type, labelOverride) {
  // If you use a regular JavaScript function, instead of an arrow function,
  // eleventy will give you access to the page data via `this.page`.
  // https://www.11ty.dev/docs/languages/nunjucks/#access-to-page-data-values
  // @ts-ignore
  const locale = this.page?.locale || 'en';

  if (!type) {
    throw new Error(
      "Can't create Compare component without a type. Did you forget to pass the type as a string?"
    );
  }

  let label;
  if (labelOverride) {
    label = i18n(`i18n.common.compare_${labelOverride}`, locale);
  } else {
    label = i18n(`i18n.common.compare_${type}`, locale);
  }

  // The funky whitespace here is intentional.
  // We need to have newlines between the ${content} so the markdown parser
  // will kick in again.
  // And because the content might be a <pre> element, which renders whitespace,
  // we need to make sure it's not indented in any way.
  return `<div class="compare pad-left-300" data-type="${type}">

<p class="compare__label pad-bottom-200">
  ${label}
</p>

${content}
  
</div>`;
}

/**
 * @param {string} content
 */
function CompareCaption(content) {
  return `<div class="compare__caption">

${content}

</div>`;
}

module.exports = {Compare, CompareCaption};

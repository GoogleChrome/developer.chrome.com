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
 * @fileoverview Renders markdown.
 */

const md = require('markdown-it')();

/**
 * Render content as markdown.
 *
 * @param {string?} content
 * @return {string|null}
 * @this {any}
 */
function render(content) {
  return content && md.render(content);
}

/**
 * Render content as inline markdown.
 *
 * @param {string?} content
 * @return {string|null}
 * @this {any}
 */
function renderInline(content) {
  return content && md.renderInline(content);
}

module.exports = {render, renderInline};

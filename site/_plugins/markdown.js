/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const markdown = require('markdown-it');
const uslug = require('uslug');

const md = markdown({
  html: true,
})
  // Let folks author definition lists using markdown syntax.
  .use(require('markdown-it-deflist'))
  // Let folks customize markdown output with attributes (id, class, data-*)
  .use(require('markdown-it-attrs'), {
    leftDelimiter: '{:',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', /^data-.*$/],
  })
  // Automatically add anchors to headings
  .use(require('markdown-it-anchor'), {
    slugify: s => uslug(s),
    level: 2,
    permalink: true,
    permalinkClass: 'heading-link',
    permalinkSymbol: '#',
  })
  // Disable indented code blocks.
  // We only support fenced code blocks.
  .disable('code');

module.exports = md;

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

const {html} = require('common-tags');

/**
 * Generates HTML for an IFrame as a string.
 *
 * @param {IFrameArgs} args Named arguments
 * @return {string}
 */
const IFrame = args => {
  /** @type IFrameArgs */
  const iframeArgs = {
    style: 'height: 100%; width: 100%; border: 0;',
    title: 'IFrame content',
    ...args,
    loading: 'lazy',
  };

  if (!iframeArgs.src) {
    throw new Error('No `src` provided to IFrame shortcode.');
  }

  const attributes = Object.keys(iframeArgs).reduce((combined, key) => {
    const value = iframeArgs[key];
    if (value === true) {
      combined += ` ${key}`;
    } else if (value !== false && value !== null && value !== undefined) {
      combined += ` ${key}="${value}"`;
    }
    return combined;
  }, '');

  return html`<iframe${attributes}></iframe>`.replace(/\s\s+/g, ' ');
};

module.exports = {IFrame};

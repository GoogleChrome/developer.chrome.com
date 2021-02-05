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
const {escape, stringify} = require('querystring');
const {IFrame} = require('./IFrame');

/**
 * Validates allow sources are an array and lower case.
 * If allow sources are a string, it will be split by the `;` character.
 *
 * @param {string|string[]} s
 * @returns {string[]}
 */
function expandAllowSource(s) {
  if (typeof s === 'string') {
    s = s.split(/;\s*/g);
  }
  return s.map(a => a.toLowerCase());
}

/**
 * Generates HTML for a Glitch embed as a string.
 *
 * @param {GlitchArgs} args  Named arguments
 * @return {string}
 */
const Glitch = args => {
  const defaultAllow = [
    'camera',
    'clipboard-read',
    'clipboard-write',
    'encrypted-media',
    'geolocation',
    'microphone',
    'midi',
  ];

  /** @type GlitchProps */
  const glitchProps = {
    allow: [],
    height: 420,
    path: '',
    previewSize: 100,
    ...args,
  };

  if (!glitchProps.id) {
    throw new Error('No `id` provided to Glitch shortcode.');
  }
  const url = 'https://glitch.com/embed/#!/embed/' + escape(glitchProps.id);
  const queryParams = {
    attributionHidden: 'true',
    sidebarCollapsed: 'true',
  };

  if (glitchProps.path) {
    queryParams.path = glitchProps.path;
  }
  if (typeof glitchProps.previewSize === 'number') {
    queryParams.previewSize = glitchProps.previewSize;
  }

  const allow = Array.from(
    new Set([...defaultAllow, ...expandAllowSource(glitchProps.allow)])
  ).join('; ');

  const src = `${url}?${stringify(queryParams)}`;

  return html`
    <div style="height: ${glitchProps.height}px; width: 100%;">
      ${IFrame({src, title: `${escape(glitchProps.id)} on Glitch`, allow})}
    </div>
  `.replace(/\s\s+/g, ' ');
};

module.exports = {Glitch};

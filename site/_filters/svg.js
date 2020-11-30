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

// We use an incrementing count of SVG to ensure unique IDs. We could also hash
// the contents as duplicate SVGs share styles, but this is easier.
let svgIndex = 0;

/**
 * This rewrites SVGs so we can safely inline them into our pages, as well as
 * adding an optional className.
 *
 * The basic issue is that SVGs use "#foo" references for clip-paths and so on,
 * however, when inlined these become global. We rewrite all IDs so they're
 * unique.
 *
 * @param {string} raw
 * @param {string} className
 * @return {string}
 */
const updateSvgForInclude = (raw, className = '') => {
  if (!raw) {
    return '';
  }

  const localIndex = ++svgIndex;
  const suffix = '_' + localIndex.toString(36);

  className = (className || '').trim();
  if (className) {
    raw = raw.replace('<svg', `<svg class="${className}"`);
  }

  // Replace id="bar"
  raw = raw.replace(/\bid="(.+?)"/g, (_, id) => {
    return `id="${id}${suffix}"`;
  });

  // Replace href="#bar" (this will also work on xlink:href=...)
  raw = raw.replace(/\bhref="#(.+?)"/g, (_, id) => {
    return `href="#${id}${suffix}"`;
  });

  // Replace url(#bar)
  raw = raw.replace(/\burl\(#(.+?)\)/g, (_, id) => {
    return `url(#${id}${suffix})`;
  });

  return raw;
};

module.exports = {updateSvgForInclude};

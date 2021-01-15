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

const path = require('path');
const fs = require('fs');

/** @type {{[page: string]: {segments: number, all: string[]}}} */
let globalOptions = {};

/**
 * @param {string} base
 * @param {string} all
 * @return {string}
 */
const normalizeBase = (base, all) => {
  base = base.toLowerCase();
  base = base.replace(/[^a-z0-9]/g, '');

  // Special-cases.
  if (all === 'en/docs/extensions/mv2' || all === 'en/docs/extensions/mv3') {
    base = 'mv-';
  } else if (all === 'en/docs/apps' || all === 'en/docs/extensions') {
    base = 'extensions-';
  }

  return base;
};

/**
 * @param {string} url
 * @param {number} limit
 * @return {string[]}
 */
const splitAllOptions = (url, limit = 4) => {
  if (url.endsWith('/index.html')) {
    url = url.slice(0, -'/index.html'.length);
  } else if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  const output = [];
  let current = url;
  const parts = [];

  for (; limit >= 0; --limit) {
    if (current === '.' || path.dirname(current) === current) {
      break; // at top-level, abandon
    }

    const base = normalizeBase(path.basename(current), current);
    parts.unshift(base);
    current = path.dirname(current);

    output.push(parts.join('/'));
  }

  return output;
};

/**
 * @param {string} url
 * @param {{[right: string]: string}} output
 * @return {string|undefined}
 */
const matchOutput = (url, output) => {
  const options = splitAllOptions(url);
  for (const option of options) {
    if (option in output) {
      return output[option];
    }
  }
  return undefined;
};

const updateUniqueSet = outputPath => {
  if (!outputPath.startsWith('dist/')) {
    return;
  }
  outputPath = outputPath.substr(5);

  const options = splitAllOptions(outputPath);
  for (let i = 0; i < options.length; ++i) {
    const key = options[i];
    if (!(key in globalOptions)) {
      globalOptions[key] = {all: [], segments: i + 1};
    }
    globalOptions[key].all.push(outputPath);
  }
};

/**
 * @param {string} content
 * @param {string} outputPath
 * @return {string}
 */
const uniquePageResolver = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    updateUniqueSet(outputPath);
  }
  return content;
};

const uniquePageResolverAnnounce = () => {
  /** @type {{[right: string]: string}} */
  const output = {};

  /** @type {{[page: string]: number}} */
  const bestPageResolve = {};

  for (let segments = 1; segments < 100; ++segments) {
    const foundForSegment = [];

    for (const base of Object.keys(globalOptions)) {
      const check = globalOptions[base];

      if (check.segments !== segments) {
        continue;
      }

      if (check.all.length === 1) {
        const only = check.all[0];
        if (!(only in bestPageResolve)) {
          bestPageResolve[only] = segments;
          delete globalOptions[base];
          foundForSegment.push({base, url: only});

          output[base] = only;
        }
      }
    }

    // TODO: Remove logging once we're happy.
    foundForSegment.sort(({base: a}, {base: b}) => a.localeCompare(b));
    if (foundForSegment.length) {
      console.warn(`segments(${segments}): ${foundForSegment.length}`);
      for (const choice of foundForSegment) {
        console.warn(`- ${choice.base}: ${choice.url}`);
      }
      console.warn('');
    }

    // If we've found all possible segments, bail out now, otherwise we'll just
    // do this up to 100 times to fin uniques.
    if (!Object.keys(globalOptions).length) {
      break;
    }
  }

  // This is the generated redirects file used by the server.
  fs.writeFileSync(
    'dist/unique-redirect.json',
    JSON.stringify(output, undefined, 2)
  );

  // Reset in case Eleventy ius reused.
  globalOptions = {};
};

module.exports = {uniquePageResolver, uniquePageResolverAnnounce, matchOutput};

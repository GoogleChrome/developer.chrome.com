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

// This is a global which lets us accumulate possible unique pages as Eleventy builds.
/** @type {{[page: string]: {segments: number, allPages: string[]}}} */
let globalOptions = {};

/**
 * Returns the normalized basename of the given path. For an argument like
 * "foo/bar/test-bar/zing-helloThere", this would return "zinghellothere".
 *
 * By removing special characters and capitals, we can more easily match 404s.
 *
 * @param {string} p
 * @return {string}
 */
const getNormalizedBase = p => {
  let base = path.basename(p);
  base = base.toLowerCase();
  base = base.replace(/[^a-z0-9]/g, '');
  return base;
};

/**
 * Given a pathname, return a number of suffixes of increasing length.
 *
 * For an argument like "hello/there/test/index.html", this will strip "/index.html" and return an
 * array of ["test", "there/test", "hello/there/test"].
 *
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

    const base = getNormalizedBase(current);
    parts.unshift(base);
    current = path.dirname(current);

    output.push(parts.join('/'));
  }

  return output;
};

/**
 * Given a candidate URL and the parsed, generated JSON output from this resolver, attempt to find
 * a suitable page to redirect to.
 *
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

/**
 * Internal method that accumulates each HTML page as it is built by Eleventy.
 *
 * TODO(samthor): This does not deal with i18n, and "en" will be included as a prefix for every URL.
 *
 * @param {string} outputPath
 */
const updateUniqueSet = outputPath => {
  if (!outputPath.startsWith('dist/')) {
    return;
  }
  outputPath = outputPath.substr('dist/'.length);

  const options = splitAllOptions(outputPath);
  for (let i = 0; i < options.length; ++i) {
    const key = options[i];
    if (!(key in globalOptions)) {
      globalOptions[key] = {allPages: [], segments: i + 1};
    }
    globalOptions[key].allPages.push(outputPath);
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

/**
 * Called on Eleventy finishing its build. This processes all accumulated pages and finds uniques.
 */
const uniquePageResolverAnnounce = () => {
  /** @type {{[right: string]: string}} */
  const output = {};

  // This stores pages we've already matched at lower segment counts.
  /** @type {Set<string>} */
  const pagesAlreadyDone = new Set();

  // TODO(samthor): Just find single segments for now.
  for (let segments = 1; segments <= 1; ++segments) {
    const foundForSegment = [];

    // We have a segment length, iterate over all segments of the given length (e.g., 1 = "page",
    // 2 = "foo/page", ...).
    for (const base of Object.keys(globalOptions)) {
      const {segments: checkSegments, allPages} = globalOptions[base];
      if (segments !== checkSegments) {
        continue;
      }

      delete globalOptions[base]; // we never revisit this node again
      if (allPages.length !== 1) {
        continue; // skip, there's more than one page this unique segment can match
      }

      const onlyPage = allPages[0];
      if (pagesAlreadyDone.has(onlyPage)) {
        continue; // we already found a shorter way to match this page
      }
      pagesAlreadyDone.add(onlyPage);

      output[base] = onlyPage;

      // nb. This is just for logging.
      foundForSegment.push({base, url: onlyPage});
    }

    // TODO(samthor): Remove logging once we're happy.
    foundForSegment.sort(({base: a}, {base: b}) => a.localeCompare(b));
    if (foundForSegment.length) {
      console.warn(`segments(${segments}): ${foundForSegment.length}`);
      for (const choice of foundForSegment) {
        console.warn(`- ${choice.base}: ${choice.url}`);
      }
      console.warn('');
    }

    // If we've found all possible segments, bail out now, otherwise we'll just
    // do this up to 100 times to find uniques.
    if (!Object.keys(globalOptions).length) {
      break;
    }
  }

  // This is the generated redirects file used by the server.
  fs.writeFileSync(
    'dist/unique-redirect.json',
    JSON.stringify(output, undefined, 2)
  );

  // Reset in case Eleventy is reused.
  globalOptions = {};
};

module.exports = {uniquePageResolver, uniquePageResolverAnnounce, matchOutput};

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

const {doRedirect} = require('../../env');
const redirectsYaml = require('redirects-yaml');
const YAML = require('js-yaml');
const fs = require('fs');
const path = require('path');

// Included for types only.
// eslint-disable-next-line no-unused-vars
const express = require('express');

/**
 * @param {redirectsYaml.RedirectLine[]} redirects
 * @param {string[]=} staticPaths
 */
function buildCheckHandlerInternal(redirects, staticPaths = undefined) {
  let checker = () => true;
  if (staticPaths) {
    // Ensure that staticPath is never blank (this ensures it's always ".").
    const alwaysStaticPaths = staticPaths.map(staticPath => staticPath || '.');

    checker = s => {
      for (const staticPath of alwaysStaticPaths) {
        // This is passed the folder name, not "/index.html". We just assume that any folder that
        // exists can be redirected to.
        const check = path.join(staticPath, s);
        if (fs.existsSync(check)) {
          return true;
        }
      }
      return false;
    };
  }

  return redirectsYaml.buildHandlers(redirects, checker);
}

/**
 * Builds HTTP middleware that serves redirects for a redirects.yaml
 * configuration file.
 *
 * @param {string} filename to load configuration from
 * @param {string[]=} staticPaths to check if content exists
 * @param {number=} code to use
 * @return {express.RequestHandler}
 */
function buildRedirectHandler(filename, staticPaths = undefined, code = 301) {
  const raw = YAML.load(fs.readFileSync(filename, 'utf-8'));
  const {redirects} =
    /** @type {{ redirects: redirectsYaml.RedirectLine[] }} */ (raw);

  const handler = buildCheckHandlerInternal(redirects, staticPaths);

  /** @type {express.RequestHandler} */
  return (req, res, next) => {
    const target = handler(req.url);
    if (target !== null && target !== req.url) {
      return doRedirect(res, target, code);
    }

    // If we didn't match normally but the URL contains a dot, then check it again with those
    // replaced with underscores. There are various bad links to APIs with ".", when the generated
    // pages actually use "_".
    if (req.url.includes('.')) {
      let update = req.url.replace(/\./g, '_');
      if (update.endsWith('_html')) {
        update = update.slice(0, -5) + '.html';
      }
      const target = handler(update);
      if (target !== null && target !== req.url) {
        return doRedirect(res, target, code);
      }
    }

    return next();
  };
}

module.exports = {
  buildCheckHandlerInternal,
  buildRedirectHandler,
};

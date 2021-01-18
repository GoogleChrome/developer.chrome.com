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

const fs = require('fs');
const {matchOutput} = require('../site/_transforms/unique-page-resolver');

// Included for types only.
// eslint-disable-next-line no-unused-vars
const express = require('express');

/**
 * Builds HTTP middleware that serves redirects for a unique-redirect.json
 * configuration file.
 *
 * @param {string[]=} staticPaths to check if content exists
 * @param {number=} code to use
 * @return {express.RequestHandler}
 */
function buildUniqueRedirectHandler(staticPaths, code = 301) {
  /** @type {{[right: string]: url}} */
  let raw;

  try {
    raw = JSON.parse(fs.readFileSync('dist/unique-redirect.json'));
  } catch (e) {
    console.warn('could not load unique-redirect:', e);
    return (req, res, next) => next();
  }

  return (req, res, next) => {
    let match = matchOutput(req.url, raw);
    if (match) {
      // TODO(samthor): "match" always starts with "en/", remove for now.
      if (match.startsWith('en/')) {
        match = match.substr('en/'.length);
      }
      match = `/${match}`;
      return res.redirect(code, match);
    }
    return next();
  };
}

module.exports = {
  buildUniqueRedirectHandler,
};

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

// Included for types only.
// eslint-disable-next-line no-unused-vars
const express = require('express');

const path = require('path');
const fs = require('fs');

const {doRedirect} = require('./env');
const {defaultLocale} = require('../site/_filters/i18n');

const ROOT_DIR = 'dist';

/**
 * @param {string} originalPath The full URL path, which might include an i18n
 * prefix.
 * @param {string} [rootDir] The root for static files. Defaults to 'dist'.
 * @param {string} [locale] The locale to used. Defaults to 'en'.
 * @returns {string|null} The full URL path with the i18n prefix removed, if
 * that would return valid HTML, or null if there is no valid HTML at that
 * location either.
 **/
const getNonLocalizedURL = (
  originalPath,
  rootDir = ROOT_DIR,
  locale = defaultLocale
) => {
  // E.g. '/ja/docs/privacy-sandbox/chips/' is split to
  // ['ja', 'docs', 'privacy-sandbox', 'chips', '']
  const pathParts = originalPath.substring(1).split('/');

  if (pathParts[0] === locale) {
    // If the default prefix is already at the start of the path, return early.
    return null;
  }

  // If pathParts does not already include a locale prefix, chances are that
  // assigning 'en' as the first item will result in a path that doesn't exist.
  // That's okay for our purposes.
  pathParts[0] = locale;

  // Normalize by removing a possible trailing 'index.html'.
  if (pathParts[pathParts.length - 1] === 'index.html') {
    pathParts[pathParts.length - 1] = '';
  }

  const possibleIndexPath = path.join(rootDir, ...pathParts, 'index.html');
  try {
    // This throws if the path is invalid, and returns undefined if it's valid.
    // (existsSync() is deprecated.)
    fs.accessSync(possibleIndexPath);
    // Setting the first item to '' will remove the default locale prefix from
    // the URL we redirect to, while ensuring the URL starts with '/'.
    pathParts[0] = '';
    // If there's at least one valid string, join it with '/' and redirect.
    if (pathParts.some(part => part !== '')) {
      return pathParts.join('/');
    }
  } catch (err) {
    // There was no index.html at the default locale path.
  }

  // If we get here, return null to indicate there's no non-localized URL.
  return null;
};

/**
 * @type {express.RequestHandler}
 */
const notFoundHandler = (req, res, next) => {
  // Instead of returning a 404, check to see if the request could be fulfilled
  // by redirecting to the same URL without a locale prefix.
  // See https://github.com/GoogleChrome/developer.chrome.com/issues/2398
  const nonLocalizedURL = getNonLocalizedURL(req.path);
  if (nonLocalizedURL !== null) {
    // Use a 302 redirect here, since there might be a localized version of this
    // URL at some point in the future.
    return doRedirect(res, nonLocalizedURL, 302);
  }

  // Otherwise, we have a 404, not a redirect.
  res.status(404);
  res.setHeader('Cache-Control', 'max-age=0,must-revalidate,public');

  const extMatch = /(\.[^.]*)$/.exec(req.url);
  if (extMatch && extMatch[1] !== '.html') {
    // If this had an extension and it was not ".html", don't send any bytes.
    // Pages without extensions don't match here.
    res.end();
    return;
  }

  const locale = req.url.split(path.sep)[1];

  // Send the 404 for the current locale, or the default if we can't find it.
  let root = path.join(ROOT_DIR, defaultLocale);
  const toSend = path.join(ROOT_DIR, locale, '404', 'index.html');
  if (fs.existsSync(toSend)) {
    root = path.join(ROOT_DIR, locale);
  }
  res.sendFile('404/index.html', {root}, err => err && next(err));
};

module.exports = {getNonLocalizedURL, notFoundHandler};

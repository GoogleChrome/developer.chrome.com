/*
 * Copyright 2022 Google LLC
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

const Negotiator = require('negotiator');

const {doRedirect} = require('./env');
const {defaultLocale, locales} = require('../site/_data/site.json');

/**
 * List of parent directories this handler simply skips in
 * order to save time, as that's language unspecific content
 */
const ignoredPathPrefixes = [
  '_static',
  'fonts',
  'images',
  'js',
  'css',
  'feeds',
];

/**
 * @type {express.RequestHandler}
 */
const languageRedirectHandler = (req, res, next) => {
  const pathParts = req.path.substring(1).split('/');
  const pathPrefix = pathParts[0];
  // If the request path is a root level path, is one of the known locales
  // or any directory that does not contain pages, let express.static take over
  if (
    pathParts.length === 1 ||
    locales.includes(pathPrefix) ||
    ignoredPathPrefixes.includes(pathPrefix)
  ) {
    return next();
  }

  const negotiator = new Negotiator(req);
  const preferredLanguage = negotiator.language();

  // If the preferred language is the default language,
  // none is set (meaning *) or the path prefix already
  // matches the preferred language just go ahead
  if (
    preferredLanguage === defaultLocale ||
    preferredLanguage === '*' ||
    preferredLanguage === pathPrefix
  ) {
    return next();
  }

  return doRedirect(res, path.join('/', preferredLanguage, ...pathParts));
};

module.exports = {languageRedirectHandler};

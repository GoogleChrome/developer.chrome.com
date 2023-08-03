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

const {siteDomain} = require('./env');

/**
 * We don't support other serving locations other than "developer.chrome.com".
 *
 * This is a stop-gap until Google's infrastructure can be updated so that it
 * no longer serves the underlying App Engine instance on other locations.
 *
 * (Note: this doesn't run during local dev, only when deployed to App Engine).
 *
 * @type {express.RequestHandler}
 */
const domainRedirectHandler = (req, res, next) => {
  if (req.hostname === siteDomain) {
    return next();
  }

  // Ignore the appspot.com suffix, in case we want to hit the appid directly.
  if (req.hostname.endsWith('.appspot.com')) {
    return next();
  }

  // Don't forward POST or anything odd.
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.sendStatus(405);
    res.end();
    return;
  }

  let url = req.url;

  // Special-case "code.google.com", which has a "/chrome/" prefix.
  if (req.hostname === 'code.google.com') {
    const stripPrefix = '/chrome';

    // We don't see requests for a URL without a slash, they all arrive with one.
    if (url.startsWith(stripPrefix + '/')) {
      url = url.substr(stripPrefix.length);
    }
  }

  const u = new URL(url, `https://${siteDomain}`);
  return res.redirect(u.toString(), 301);
};

module.exports = domainRedirectHandler;

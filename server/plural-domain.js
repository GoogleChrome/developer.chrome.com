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

const INVALID_HOSTNAME = 'developers.chrome.com';
const RESULT_HOSTNAME = 'developer.chrome.com';

/**
 * We no longer support the "plural" domain developers.chrome.com. For now,
 * the redirect happens in this Express server, in the long term we should
 * set up a redirect with Google infrastructure.
 *
 * @type {express.RequestHandler}
 */
const pluralDomainRedirectHandler = (req, res, next) => {
  if (req.hostname !== INVALID_HOSTNAME) {
    return next();
  }

  if (!['GET', 'HEAD'].includes(req.method)) {
    // Don't forward POST or anything odd.
    res.sendStatus(405);
    return res.end();
  }

  const u = new URL(req.url, `https://${RESULT_HOSTNAME}`);
  return res.redirect(u.toString(), 301);
};

module.exports = pluralDomainRedirectHandler;

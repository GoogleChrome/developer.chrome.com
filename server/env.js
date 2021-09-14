/*
 * Copyright 2021 Google LLC
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

/**
 * Is this App Engine in production?
 */
const isGAEProd = Boolean(process.env.GAE_APPLICATION);

/**
 * The domain being served.
 */
const siteDomain = 'developer.chrome.com';

/**
 * @param {express.Response} res
 * @param {number} code
 * @param {string} target
 */
function doRedirect(res, target, code = 301) {
  // Don't cache redirects in dev, as this causes personal dev pain.
  if (!isGAEProd) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
  }
  res.redirect(code, target);
}

module.exports = {isGAEProd, doRedirect, siteDomain};

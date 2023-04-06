/*
 * Copyright 2023 Google LLC
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

const {defaultLocale} = require('../../../site/_filters/i18n');

const ROOT_DIR = path.join(__dirname, '../../../dist');

/**
 *
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @type {express.ErrorRequestHandler}
 */
const internalServerErrorHandler = (err, req, res) => {
  const locale = req.url.split(path.sep)[1];

  // Properly log all errors to the console, including the stack trace
  // in order to have them debuggable in production. Downgrade known/uncritical
  // errors to warnings, to not trigger alerts.
  if (err.name === 'RangeNotSatisfiableError') {
    console.warn('[Warning]', err.name, req.url, req.headers);
    // No need to send a 500 page for this error, as it's usually a bot or a browser-issued
    // request, whose response is not shown to the user. res.sendFile would also fail.
    res.status(416).send('Requsted range not satisfiable.');
    return;
  } else {
    console.error('[Error]', err.name, err.stack, req.url, req.headers);
  }

  // Send the 500 page for the current locale, or the default if we can't find it.
  let root = path.join(ROOT_DIR, defaultLocale);
  const toSend = path.join(ROOT_DIR, locale, '500', 'index.html');
  if (fs.existsSync(toSend)) {
    root = path.join(ROOT_DIR, locale);
  }
  res.sendFile('500/index.html', {root}, e => {
    // For faulty deploys it might be that the 500 page is not available, that's critical
    // and requires immediate action.
    console.error('[Critical error]', err, e, req.url);
    res.send('Something went wrong.');
  });
};

module.exports = {internalServerErrorHandler};

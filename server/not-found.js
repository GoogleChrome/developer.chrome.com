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

/**
 * @type {express.RequestHandler}
 */
const notFoundHandler = (req, res, next) => {
  res.status(404);
  res.setHeader('Cache-Control', 'max-age=0,must-revalidate,public');

  const extMatch = /(\.[^.]*)$/.exec(req.url);
  if (extMatch && extMatch[1] !== '.html') {
    // If this had an extension and it was not ".html", don't send any bytes.
    // Pages without extensions don't match here.
    return res.end();
  }

  const locale = req.url.split(path.sep)[1];

  // Send the 404 for the current locale, or English if we can't find it.
  let root = 'dist/en';
  const toSend = path.join('dist', locale, '404', 'index.html');
  if (fs.existsSync(toSend)) {
    root = path.join('dist', locale);
  }
  res.sendFile('404/index.html', {root}, err => err && next(err));
};

module.exports = {notFoundHandler};

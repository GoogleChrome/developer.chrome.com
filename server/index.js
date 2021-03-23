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

const isGAEProd = Boolean(process.env.GAE_APPLICATION);

const express = require('express');
const compression = require('compression');
const {notFoundHandler} = require('./not-found');
const {buildRedirectHandler} = require('./redirect');
const {buildUniqueRedirectHandler} = require('./unique-redirect');
const pluralDomainRedirectHandler = require('./plural-domain');

const app = express();

// The site serves from both roots. We pass this to our redirects handler to
// see whether redirects will be successful.
const staticPaths = ['dist', 'dist/en'];

const redirectHandler = buildRedirectHandler('redirects.yaml', staticPaths);
const uniqueRedirectHandler = buildUniqueRedirectHandler(staticPaths);

// If we see content from /fonts/, then cache it forever.
// If this ends up 404'ing, we invalidate the Cache-Control header in notFoundHandler.
const immutableRootMatch = /^\/fonts\//;
const immutableRootHandler = (req, res, next) => {
  if (immutableRootMatch.test(req.url)) {
    res.setHeader('Cache-Control', 'max-age=31536000,immutable');
  }
  next();
};

const cspHandler = (req, res, next) => {
  // TODO(samthor): This is an unsuitable policy but included as a start.
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "object-src 'none'; " +
      "script-src 'self' 'unsafe-inline' https://www.google-analytics.com; " +
      "base-uri 'none'; " +
      'report-uri https://csp.withgoogle.com/csp/chrome-apps-doc'
  );
  next();
};

const handlers = [
  pluralDomainRedirectHandler,
  cspHandler,
  immutableRootHandler,
  ...staticPaths.map(staticPath => express.static(staticPath)),
  redirectHandler,
  uniqueRedirectHandler,
  notFoundHandler,
];

if (!isGAEProd) {
  handlers.unshift(compression());
}

app.use(...handlers);

const listener = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line
  console.log('The server is listening on port ' + listener.address().port);
});

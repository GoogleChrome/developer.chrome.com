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

const {isGAEProd} = require('./env');
const express = require('express');
const path = require('path');
const compression = require('compression');
const proxy = require('express-http-proxy');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const {notFoundHandler} = require('./not-found');
const {previewHandler} = require('./preview');
const {buildRedirectHandler} = require('./redirect');
const {buildUniqueRedirectHandler} = require('./unique-redirect');
const unknownDomainRedirectHandler = require('./unknown-domain');
const healthCheckHandler = require('./health-check');

const app = express();

// The site serves from both roots. We pass this to our redirects handler to
// see whether redirects will be successful.
const staticPaths = ['dist', 'dist/en'];

const redirectHandler = buildRedirectHandler('redirects.yaml', staticPaths);
const uniqueRedirectHandler = buildUniqueRedirectHandler();

// If we see content from /fonts/, then cache it forever.
// If this ends up 404'ing, we invalidate the Cache-Control header in notFoundHandler.
const immutableRootMatch = /^\/fonts\//;
const immutableRootHandler = (req, res, next) => {
  console.log('Immutable handler', req.url)
  if (immutableRootMatch.test(req.url)) {
    res.setHeader('Cache-Control', 'max-age=31536000,immutable');
  }
  next();
};

const cspHandler = (_req, res, next) => {
  console.log('CSP handler', _req.url)
  // TODO(samthor): This is an unsuitable policy but included as a start.
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "object-src 'none'; " +
      "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://cdnjs.cloudflare.com https://www.gstatic.com https://www.google.com https://*.firebaseio.com;" +
      "base-uri 'none'; " +
      "frame-ancestors 'self'; " +
      'report-uri https://csp.withgoogle.com/csp/chrome-apps-doc'
  );
  // nb. This is superceded by 'frame-ancestors' above, but retain while that
  // policy is "Report-Only".
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
};

const handlers = [
  cspHandler, //sets header
  immutableRootHandler, //sets fonts header
  ...staticPaths.map(staticPath => express.static(staticPath)),
  redirectHandler,
  uniqueRedirectHandler,
  healthCheckHandler,
  notFoundHandler,
];

if (isGAEProd) {
  // In production, ensure we're being served from the canonical domain.
  handlers.unshift(unknownDomainRedirectHandler);
} else {
  // In production, the GFEs do gzip compression for us. Just set up for dev
  // so that audits are happy.
  handlers.unshift(compression());
}

const proxyFilter = function (pathname, req) {
  // TODO: Proxy only e.g. blog.
  const isHtml =
    // Pretty url
    !path.extname(pathname) ||
    // Ends in .html
    path.extname(pathname) === '.html';
  return isHtml && req.method === 'GET';
};

const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

const bucketName = 'web-dev-staging_cloudbuild';
const fileName = 'dist/en/blog/storage-partitioning-dev-trial/index.html';

const storageHandler = async (_req, res, next) => {
  console.log('Storage handler', _req.url);
  console.log(__dirname);

  const destFileName = 'dist/en/blog/storage-partitioning-dev-trial/index.html';

  const contents = await storage.bucket(bucketName).file(fileName).download();



  console.log(
    `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
  );
  res.send(contents.toString());

  // next();
};

app.use('/', storageHandler);

// https://storage.cloud.google.com/web-dev-staging_cloudbuild/dist/en/blog/storage-partitioning-dev-trial/index.html

// app.use('/', createProxyMiddleware(proxyFilter, {
//   target: 'https://storage.cloud.google.com/web-dev-staging_cloudbuild/dist/en',
//   // target: 'https://storage.googleapis.com/web-dev-staging_cloudbuild/dist/en/',
//   changeOrigin: true,
//   pathRewrite: function (pathname, req) {
//     // TODO: rewrite /en/
//     if (!path.extname(pathname)) {
//       return path.join(pathname, 'index.html');
//     }
//     return pathname;
//   },
//   onProxyRes: (proxyRes, req, res) => {
//     console.log('responseInterceptor');
//     console.log(proxyRes.rawHeaders, proxyRes.statusCode);
//     return

//     // const response = responseBuffer.toString('utf8'); // convert buffer to string
//     // return response.replace('Hello', 'Goodbye'); // manipulate response and return the result
//   },

// }));
// https://storage.googleapis.com/web-dev-staging_cloudbuild/dist/en/blog/12/index.html

app.get('/**/preview', previewHandler);
app.use(...handlers);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('The server is listening at:', listener.address());
});

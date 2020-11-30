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
const {build: buildRedirectHandler} = require('./redirect');

const app = express();

const redirectHandler = buildRedirectHandler('redirects.yaml');

const handlers = [
  express.static('dist'),
  express.static('dist/en'),
  redirectHandler,
  notFoundHandler,
];

if (!isGAEProd) {
  handlers.unshift(compression());
}

app.use(...handlers);

// Direct all requests to the static dir

const listener = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line
  console.log('The server is listening on port ' + listener.address().port);
});

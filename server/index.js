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
const compression = require('compression');
const {renderHandler} = require('./render');

const unknownDomainRedirectHandler = require('./unknown-domain');

const handlers = require('./handlers');

const app = express();

if (isGAEProd) {
  // In production, ensure we're being served from the canonical domain.
  handlers.unshift(unknownDomainRedirectHandler);
} else {
  // In production, the GFEs do gzip compression for us. Just set up for dev
  // so that audits are happy.
  handlers.unshift(compression());
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/_render', renderHandler);

app.use(...handlers);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('The server is listening at:', listener.address());
});

module.exports = app;

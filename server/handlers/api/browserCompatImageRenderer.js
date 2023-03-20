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

/**
 * @fileoverview Proxies requests to a Cloud Storage bucket. Either to a
 * configured folder by default or one specified via subdomain
 */

// eslint-disable-next-line no-unused-vars
const express = require('express');
const BrowserCompat =
  require('webdev-infra/shortcodes/BrowserCompat').BrowserCompat.bind({
    ctx: {locale: 'en'},
  });

/**
 * @type {express.RequestHandler}
 */
async function browserCompatImageRenderer(req, res) {
  const featureId = req.body.featureId;
  const shortcode = BrowserCompat(featureId);

  res.setHeader('content-type', 'text/html');
  res.send(shortcode);
}

module.exports = {browserCompatImageRenderer};

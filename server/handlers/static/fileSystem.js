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
 * @fileoverview Serves the built pages and assets from
 * the local file system. The directory used depends on the
 * given environment
 */

const express = require('express');

const {buildRedirectHandler} = require('../redirects/redirect');
const {buildUniqueRedirectHandler} = require('../redirects/uniqueRedirect');

function getStaticPaths() {
  if (process.env.NODE_ENV === 'test') {
    return ['tests/server/fixtures', 'tests/server/fixtures/en'];
  }

  return ['dist', 'dist/en'];
}

function buildFileSystemHandler() {
  const router = express.Router();
  const staticPaths = getStaticPaths();
  for (const staticPath of staticPaths) {
    router.use(express.static(staticPath));
  }

  // If serving from file system, redirect handlers that
  // rely on file system look ups can also be built
  router.use(buildRedirectHandler('redirects.yaml', staticPaths));
  router.use(buildUniqueRedirectHandler());

  return router;
}

module.exports = {buildFileSystemHandler};

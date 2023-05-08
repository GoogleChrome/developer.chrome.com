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
 * @fileoverview Determines the environment the app was started
 * in and returns either the Google Cloud Storage handler (for staging)
 * or the local filesystem handler in all other cases
 */

const {buildFileSystemHandler} = require('./fileSystem');
const {bucketHandler} = require('./bucket');

function buildStaticHandler() {
  if (process.env.GOOGLE_CLOUD_PROJECT === 'dcc-staging') {
    return bucketHandler;
  }

  return buildFileSystemHandler();
}

module.exports = {buildStaticHandler};

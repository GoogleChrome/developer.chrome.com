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
 * @fileoverview Reads the current active commit from the configured
 * Cloud Storage bucket, searches the bucket for a directory named after
 * the commit and then proxies requests into that directory
 */

// eslint-disable-next-line no-unused-vars
const express = require('express');
const path = require('path');
const {Storage} = require('@google-cloud/storage');

/**
 * The name of the bucket to use. Needs to be accessible by the App Engine app.
 */
const bucketName = process.env.DCC_STATIC_BUCKET || 'static-dcc-staging';

/**
 * The time in milliseconds the router checks if there is a new active commit.
 */
const commitRefreshTimeout =
  parseInt(process.env.DCC_STATIC_BUCKET_REFRESH || '') || 60 * 1000;

/**
 * Used to identify subdomain requests to app engine
 */
const subDomainPostfix = `-dot-${process.env.GOOGLE_CLOUD_PROJECT}.uc.r.appspot.com`;

/**
 * The first seven chars of a SHA1 commit that has been deployed to the bucket.
 */
let activeCommit = null;

const storage = new Storage();

/**
 *
 * @param {boolean} refresh True if called by the check interval
 * @returns The SHA1 of the current active commit
 */
async function getActiveCommit(refresh = false) {
  if (!activeCommit || refresh) {
    const contents = await storage
      .bucket(bucketName)
      .file('activeCommit.txt')
      .download();
    activeCommit = contents.toString().trim();
  } else {
    return activeCommit;
  }

  // Schedule a refresh of the active commit to allow updating
  // the delivered content without a server/instance restart
  setTimeout(() => {
    getActiveCommit(true);
  }, commitRefreshTimeout);

  return activeCommit;
}

/**
 * @type {express.RequestHandler}
 */
async function bucketHandler(req, res, next) {
  let activeCommit = await getActiveCommit();
  let filePath = req.path;

  // Check if the user requested another commit. This allows uers to do
  // requests to $commitHash-dot-dcc-staging.uc.r.appspot.com to overwrite
  // the current active commit and access any other commit in the bucket
  const host = req.get('host');
  if (host && host.includes(subDomainPostfix)) {
    activeCommit = host.replace(subDomainPostfix, '');
  }

  // If the requested path does not end in an extension, assume
  // it is an HTML file, and append .html
  if (!filePath.match(/\.\w{2,5}$/)) {
    filePath = path.join(filePath, 'index.html');
  }

  // TODO: For production, lookup if the file exists in
  // the commit manifest, before trying to stream it

  try {
    const file = await storage
      .bucket(bucketName)
      .file(path.join(activeCommit, filePath));

    const [metadata] = await file.getMetadata();

    res.setHeader('content-type', metadata.contentType);
    file.createReadStream().pipe(res);
  } catch (e) {
    console.error('Could not serve', filePath);
    return next();
  }
}

module.exports = {bucketHandler};

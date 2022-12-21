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
const path = require('path');
const {Storage} = require('@google-cloud/storage');

/**
 * The name of the bucket to use. Needs to be accessible by the App Engine app.
 */
const bucketName = process.env.DCC_STATIC_BUCKET || 'static-dcc-staging';

/**
 * Name of the folder that is served by the instance, if no other folder
 * is specified by subdomain
 */
const defaultFolder = 'main';

/**
 * Used to identify subdomain requests to app engine that request another static build
 */
const subDomainPostfix = `-dot-${process.env.GOOGLE_CLOUD_PROJECT}.uc.r.appspot.com`;

const storage = new Storage();

/**
 * @type {express.RequestHandler}
 */
async function bucketHandler(req, res) {
  let filePath = req.path;
  let folder = defaultFolder;

  // Check if the user requested another folder. This allows uers to do
  // requests to $folderName-[app|static]-dot-dcc-staging.uc.r.appspot.com to overwrite
  // the default folder and access any other folder in the bucket
  const host = req.get('host');
  if (host && host.includes(subDomainPostfix)) {
    folder = host
      .replace(subDomainPostfix, '')
      .replace('-app', '')
      .replace('-static', '');
  }

  // If the requested path does not end in an extension, assume
  // it is an HTML file, and append .html
  if (!filePath.match(/\.\w{2,5}$/)) {
    filePath = path.join(filePath, 'index.html');
  }

  try {
    const file = await storage
      .bucket(bucketName)
      .file(path.join(folder, filePath));

    const [metadata] = await file.getMetadata();

    res.setHeader('content-type', metadata.contentType);
    file.createReadStream().pipe(res);
  } catch (e) {
    console.error('Could not serve', filePath);
    res.send(`Could not send ${filePath} due to ${e}.`);
  }
}

module.exports = {bucketHandler};

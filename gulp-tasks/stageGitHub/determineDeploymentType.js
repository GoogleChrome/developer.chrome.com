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
 * @fileoverview Gets a list of changed files by looking at the currently
 * checked out commit in Google Cloud Build and either outputs 'static'
 * or 'app', depending on the defined globs which are matched against
 * the list of changed files.
 */

const micromatch = require('micromatch');
const fs = require('fs/promises');
const path = require('path');

const {requestGitHubApi} = require('./lib/gitHubApi');
const {isGoogleCloudBuild} = require('./lib/isGoogleCloudBuild');

const APP_GLOB = ['package.json', 'server/**/*.js'];
const STATIC_GLOB = ['site/**/*'];

const OUTPUT_APP_BUILD = 'app';
const OUTPUT_STATIC_BUILD = 'static';

const DEPLOYMENT_TYPE_PATH = path.join(__dirname, 'tmp', 'deploymentType.txt');

async function determineDeploymentType() {
  isGoogleCloudBuild();

  const prNumber = process.env.PR_NUMBER;
  let {data: changedFiles} = await requestGitHubApi(
    'GET',
    `pulls/${prNumber}/files?per_page=100`
  );
  changedFiles = changedFiles.map(file => {
    return file.filename;
  });

  // Then check if any of the changed files either matches
  // the APP_GLOB or the STATIC_GLOB, to determine the build
  // type. Or return nothing - that would mean nothing chaged
  // that altered the build output
  let output = '';
  if (micromatch(changedFiles, APP_GLOB).length) {
    output = OUTPUT_APP_BUILD;
  } else if (micromatch(changedFiles, STATIC_GLOB).length) {
    output = OUTPUT_STATIC_BUILD;
  }

  // There is no way to pass data between build steps on
  // Google Cloud Build, except the file system as of 12/2022. See:
  // https://cloud.google.com/build/docs/configuring-builds/pass-data-between-steps
  await fs.writeFile(DEPLOYMENT_TYPE_PATH, output, {encoding: 'utf-8'});
  console.log(`Wrote deployment type (${output}) to`, DEPLOYMENT_TYPE_PATH);
}

module.exports = {
  determineDeploymentType,
  DEPLOYMENT_TYPE_PATH,
};

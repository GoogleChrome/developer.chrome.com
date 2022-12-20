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

const APP_GLOB = ['package.json', 'server/**/*.js'];
const STATIC_GLOB = ['site/**/*'];

const OUTPUT_APP_BUILD = 'app';
const OUTPUT_STATIC_BUILD = 'static';

async function determineDeploymentType() {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const {execa} = await import('execa');

  const branchName = process.env.BRANCH_NAME;
  if (!branchName) {
    console.warn(
      'This task is inteded to run on Google Cloud Build, which exports $BRANCH_NAME. ' +
        'Use npm run stage:personal locally instead.'
    );
    return;
  }

  const {stdout: gitLog} = await execa('git', [
    'log',
    '--name-only',
    '--pretty=format:',
    branchName,
    '--not',
    'origin/main',
  ]);

  let changedFiles = new Set();
  for (const entry of gitLog.split('\n')) {
    if (!entry) {
      continue;
    }

    changedFiles.add(entry);
  }

  changedFiles = Array.from(changedFiles);

  // Then check if any of the changed files either matches
  // the APP_GLOB or the STATIC_GLOB, to determine the build
  // type. Or return nothing - that would mean nothing chaged
  // that altered the build output
  let output = '';
  if (micromatch(changedFiles, APP_GLOB)) {
    output = OUTPUT_APP_BUILD;
  } else if (micromatch(changedFiles, STATIC_GLOB)) {
    output = OUTPUT_STATIC_BUILD;
  }

  // There is no way to pass data between build steps on
  // Google Cloud Build, except the file system as of 12/2022. See:
  // https://cloud.google.com/build/docs/configuring-builds/pass-data-between-steps
  await fs.writeFile('./deploymentType.txt', output, {encoding: 'utf-8'});
  console.log(output);
  return output;
}

module.exports = {
  determineDeploymentType,
  OUTPUT_APP_BUILD,
  OUTPUT_STATIC_BUILD,
};

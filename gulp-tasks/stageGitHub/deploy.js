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

const {
  determineDeploymentType,
  OUTPUT_APP_BUILD,
  OUTPUT_STATIC_BUILD,
} = require('./determineDeploymentType.js');

async function deploy() {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const {execa, execaCommand} = await import('execa');

  const prNumber = process.env._PR_NUMBER;
  if (!prNumber) {
    console.warn(
      'This task is inteded to run on Google Cloud Build, which exports $_PR_NUMBER. ' +
        'Use npm run stage:personal locally instead.'
    );
    return;
  }

  const deploymentType = await determineDeploymentType();
  if (!deploymentType) {
    throw Error('Could not determine deployment type.');
  }

  let build = Promise.resolve();
  if (deploymentType === OUTPUT_APP_BUILD) {
    build = execa('gcloud', [
      'app',
      'deploy',
      '--version',
      `pr-${prNumber}-app`,
      '--no-promote',
      '--project',
      'dcc-staging',
    ]);
  } else if (deploymentType === OUTPUT_STATIC_BUILD) {
    build = execaCommand(
      [
        'cp -rf dist/en/* dist/',
        'rm -rf dist/en',
        `gsutil -q -m cp -r dist gs://static-dcc-staging/pr-${prNumber}`,
      ].join(' && ')
    );
  }

  build.stdout.pipe(process.stdout);
  await build;
}

module.exports = {deploy};

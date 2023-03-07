/*
 * Copyright 2023 Google LLC
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
 * @fileoverview Posts a comment to the PR, that the deployment has started.
 */

const {isGoogleCloudBuild} = require('./lib/isGoogleCloudBuild');
const {getDeploymentType} = require('./lib/getDeploymentType');
const {updateStickyComment} = require('./lib/updateStickyComment');

async function buildStaticSite() {
  isGoogleCloudBuild();
  const prNumber = process.env.PR_NUMBER;
  const commitSha = process.env.COMMIT_SHA;

  const deploymentType = await getDeploymentType();
  if (!deploymentType) {
    return;
  }

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const exaca = await import('execa');
  try {
    const build = exaca.execaCommand('npm run production');
    build.stderr.pipe(process.stderr);
    build.stdout.pipe(process.stdout);

    await build;
  } catch (e) {
    // Google Cloud Build has no proper way to react to failing steps, hence
    // the comment already needs to be updated here, before failing the entire job
    await updateStickyComment(
      prNumber,
      `:x: Failed to build (${deploymentType}) the site for commit ${commitSha}. ` +
        'Building the site (`npm run production`) failed with the following error output:' +
        '\n\n' +
        '```\n' +
        e.stderr +
        '\n```\n' +
        'Check the `Stage (dcc-staging)` check status for more details.'
    );

    throw e;
  }
}

module.exports = {
  buildStaticSite,
};

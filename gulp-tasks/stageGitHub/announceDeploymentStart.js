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

const {updateStickyComment} = require('./lib/updateStickyComment');
const {isGoogleCloudBuild} = require('./lib/isGoogleCloudBuild');
const {getDeploymentType} = require('./lib/getDeploymentType');

async function announceDeploymentStart() {
  isGoogleCloudBuild();
  const prNumber = process.env.PR_NUMBER;
  const commitSha = process.env.COMMIT_SHA;

  const deploymentType = await getDeploymentType();
  if (!deploymentType) {
    // There are PRs that don't need a deployment, e.g. PRs that only
    // change workflow configs. In that case, we don't want to post a comment.
    return;
  }

  await updateStickyComment(
    prNumber,
    `:rocket: Creating preview for commit ${commitSha} (${deploymentType}) ...`
  );
}

module.exports = {
  announceDeploymentStart,
};

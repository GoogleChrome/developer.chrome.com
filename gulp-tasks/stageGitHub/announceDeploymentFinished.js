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
 * @fileoverview Updates the GitHub comment that is used to announce the
 * staging build status.
 */

const {requestGitHubApi} = require('./lib/gitHubApi');
const {getDeploymentType} = require('./lib/getDeploymentType');
const {isGoogleCloudBuild} = require('./lib/isGoogleCloudBuild');
const {updateStickyComment} = require('./lib/updateStickyComment');

async function getChangedPages(prNumber, baseUrl) {
  const {data: changedFiles} = await requestGitHubApi(
    'GET',
    `pulls/${prNumber}/files?per_page=100`
  );
  const changedPages = changedFiles
    .filter(file => {
      const filePath = file.filename;
      return filePath.startsWith('site/') && filePath.endsWith('index.md');
    })
    .map(file => {
      const filePath = file.filename;
      return `- ${baseUrl}${filePath
        .replace('site/', '')
        .replace(/^en\//, '')
        .replace(/index.md$/, '')}`;
    });

  if (changedPages.length) {
    return (
      '\n\n' +
      'The following pages likely changed with this PR:\n' +
      changedPages.join('\n')
    );
  }

  return '';
}

async function announceDeploymentFinished() {
  isGoogleCloudBuild();

  const prNumber = process.env.PR_NUMBER;
  const commitSha = process.env.COMMIT_SHA;
  const deploymentType = await getDeploymentType();

  if (!deploymentType) {
    await updateStickyComment(
      prNumber,
      `:zzz: Nothing to preview for commit ${commitSha}.`
    );
    return;
  }

  const baseUrl = `https://pr-${prNumber}-${deploymentType}-dot-dcc-staging.uc.r.appspot.com/`;
  const changedPages = await getChangedPages(prNumber, baseUrl);

  await updateStickyComment(
    prNumber,
    `:white_check_mark: Preview (${deploymentType}) for commit ${commitSha} available at ${baseUrl}.` +
      changedPages
  );
}

module.exports = {
  announceDeploymentFinished,
};

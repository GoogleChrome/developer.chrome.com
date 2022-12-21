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
 * @fileoverview Uses the check information from Google Cloud Build
 * and the details of the PR to create a helpful comment to the PR
 * that is posted by a following action
 */

const fs = require('fs/promises');
const path = require('path');

const {fetchGitHubApi} = require('./lib/fetchGitHubApi');

const {CHECK_DETAILS_PATH} = require('./awaitGoogleCloudBuild');
const {DEPLOYMENT_TYPE_PATH} = require('./determineDeploymentType');

/**
 * Path where the announcement is written to, for the following
 * action to pick-up
 */
const ANNOUNCEMENT_PATH = path.join(__dirname, 'tmp', 'announcement.md');

async function buildAnnouncementComment() {
  const prNumber = process.env.PR_NUMBER;
  const commit = process.env.GITHUB_SHA;

  if (!prNumber) {
    console.warn(
      'This task is inteded to run on GitHub Actions which exports $PR_NUMBER.' +
        'Use npm run stage:personal locally instead.'
    );
    return;
  }

  let announcement = '';

  const check = JSON.parse(await fs.readFile(CHECK_DETAILS_PATH));

  const startedAt = new Date(check.started_at);
  const completedAt = new Date(check.completed_at);

  const duration =
    Math.abs(startedAt.getTime() - completedAt.getTime()) / 1000 / 60;

  const status = check.status;
  const conclusion = check.conclusion;

  if (status !== 'completed' && conclusion !== 'success') {
    announcement =
      `Staging build started at ${check.started_at} did not succeed.` +
      `Status is ${status}, conclusion is ${conclusion} ` +
      `after ${duration.toFixed(
        2
      )} minutes. Please ping engineering for assistance ` +
      `or [see logs for details](${check.html_url}).`;
  } else {
    announcement =
      `Staging build for commit ${commit} ` +
      `started at ${check.started_at} completed after ${duration.toFixed(
        2
      )} minutes.`;

    const deploymentType = await fs.readFile(DEPLOYMENT_TYPE_PATH);
    const baseUrl = `https://pr-${prNumber}-${deploymentType}-dot-dcc-staging.uc.r.appspot.com/`;

    announcement += '\n\n' + `**${baseUrl}**`;

    const changedFiles = await fetchGitHubApi(
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
      announcement +=
        '\n\n' +
        'The following pages likely changed with this PR:\n' +
        changedPages.join('\n');
    }
  }

  await fs.writeFile(ANNOUNCEMENT_PATH, announcement, {
    encoding: 'utf-8',
  });
  console.log('Wrote details to', ANNOUNCEMENT_PATH);
}

module.exports = {
  buildAnnouncementComment,
};

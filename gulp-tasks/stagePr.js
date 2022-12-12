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
 * @fileoverview Sends a request to a Cloud Build webhook
 * to create a build for the specified commit. Only meant to be run
 * on GitHub actions.
 */

const {default: fetch} = require('node-fetch');
const fs = require('fs/promises');

const TRIGGER_NAME_STATIC_BUILD = 'Static';
const TRIGGER_NAME_APP_BUILD = 'App';

const CHECK_NAME_STATIC_BUILD = 'Static (dcc-staging)';
const CHECK_NAME_APP_BUILD = 'App (dcc-staging)';

/**
 * A full static build takes around 5m30s to 6m as of 12/2022
 */
const INITIAL_WAIT_STATIC_BUILD = 3 * 60 * 1000;
/**
 * Building an instance takes 36m30s to 8min as of 12/2022.
 * It takes longer depending on the amount of changed pages
 */
const INITIAL_WAIT_APP_BUILD = 8 * 60 * 1000;

/**
 * Returns a promise that resolves after the specified amount of time
 * @param {number} timeout Milliseconds the Promise is blocking
 */
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

/**
 * Sends a request to the Google Cloud Build Webhook API to trigger
 * a job with the specified name for the specified commit
 * @param {string} commit The full commit hash like e1d46d0aa61c14e3972f07e3cbf918424c186056
 * @param {string} triggerName Either TRIGGER_NAME_STATIC_BUILD or TRIGGER_NAME_APP_BUILD
 */
async function requestBuild(commit, triggerName) {
  console.log(`Requesting staging build for commit ${commit}`);

  const request = await fetch(
    `https://cloudbuild.googleapis.com/v1/projects/dcc-staging/triggers/Webhook:webhook?key=${process.env.CLOUD_BUILD_KEY}&secret=${process.env.CLOUD_BUILD_SECRET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        COMMIT_SHA: commit,
        _TRIGGER_NAME: triggerName,
      }),
    }
  );

  await request.json();
  console.log('Requested staging build.');
}

/**
 * Sends an authenticated request to the GitHub API
 * @param {string} endpoint
 * @returns {Promise<{[key: string]: any}>}
 */
async function fetchGitHubApi(endpoint) {
  const request = await fetch(`https://api.github.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = await request.json();
  return data;
}

/**
 * Tries to find a check with the specified name on the specified
 * commit, using the GitHub Checks API
 * @param {string} commit A full commit hash like e1d46d0aa61c14e3972f07e3cbf918424c186056
 * @param {string} checkName Either CHECK_NAME_STATIC_BUILD or CHECK_NAME_APP_BUILD
 * @returns {Promise<{[key: string]: any}>}
 */
async function findBuild(commit, checkName) {
  console.log(`Fetching checks for commit ${commit} ...`);
  let build = null;
  try {
    const checks = await fetchGitHubApi(
      `repos/GoogleChrome/developer.chrome.com/commits/${commit}/check-runs`
    );
    build = checks.check_runs.find(run => {
      return run.name === checkName;
    });
  } catch (e) {
    console.error(`Could not fetch checks for ${commit}.`);
  }

  return build;
}

/**
 * Waits for the specified amount of time before starting to repeatedly
 * query the GitHub Checks API for the completion status of the specified
 * check
 * @param {string} checkId A numeric check ID like 10036698893
 * @param {number} initialTimeout Either INITIAL_WAIT_STATIC/APP_BUILD
 * @returns {Promise<{[key: string]: any}>}
 */
async function waitForCloudBuild(checkId, initialTimeout) {
  console.log(
    `Waiting ${
      initialTimeout / 1000
    }s for Cloud Build (${checkId}) to finish ...`
  );
  await wait(initialTimeout);
  const build = await fetchGitHubApi(
    `repos/GoogleChrome/developer.chrome.com/check-runs/${checkId}`
  );

  if (build.status === 'completed') {
    return build;
  }

  // If the build has not completed yet, then just query again in 30s
  return waitForCloudBuild(checkId, 30 * 1000);
}

/**
 * Parses a list of changed files from the env variables CHANGED_STATIC_FILES
 * and CHANGED_APP_FILES which are filled by the dorny/paths-filter during
 * the job run. The output of this action are stringified JS values, hence
 * the dirty undefined check.
 * @returns {{app: string[], static: string[]}}
 */
function getChangedFiles() {
  const changedFiles = {static: [], app: []};

  const staticFiles = process.env.CHANGED_STATIC_FILES;
  if (staticFiles && staticFiles !== 'undefined') {
    changedFiles.static = JSON.parse(staticFiles);
  }

  const appFiles = process.env.CHANGED_APP_FILES;
  if (appFiles && appFiles !== 'undefined') {
    changedFiles.app = JSON.parse(appFiles);
  }

  return changedFiles;
}

/**
 *
 * @param {string} commit A full commit hash like e1d46d0aa61c14e3972f07e3cbf918424c186056
 * @param {ReturnType<getChangedFiles>} changedFiles The files changed in this PR
 * @param {Awaited<ReturnType<waitForCloudBuild>>} build Build details returned from thE Checks API
 * @returns {string} A short message containing all information about the job
 */
function createAnnouncement(commit, changedFiles, build) {
  console.log(commit, changedFiles, build);
  const startedAt = new Date(build.started_at);
  const completedAt = new Date(build.completed_at);
  const duration =
    Math.abs(startedAt.getTime() - completedAt.getTime()) / 1000 / 60;

  const status = build.status;
  const conclusion = build.conclusion;
  if (status !== 'completed' && conclusion !== 'success') {
    return (
      `Staging build (${build.name}) did not succeed.` +
      'Please ping engineering for assistance.'
    );
  }

  const shortCommitSha = commit.substring(0, 7);
  const baseUrl = `https://${shortCommitSha}-dot-dcc-staging.uc.r.appspot.com/`;

  let announcement =
    `Staging build (${build.name}) for commit ${commit} ` +
    `started at ${startedAt.toString()} completed after ${duration.toFixed(
      2
    )} minutes.` +
    '\n\n' +
    `**${baseUrl}**`;

  const changedPages = [];
  if (changedFiles.static) {
    for (const path of changedFiles.static) {
      if (!path.includes('index.md')) {
        continue;
      }

      const cleanPath = path.replace('site/', '').replace('index.md', '');
      changedPages.push(`- ${baseUrl}${cleanPath}`);
    }
  }

  if (changedPages.length) {
    announcement +=
      '\n\n' +
      'The following pages likely changed with this PR:\n' +
      changedPages.join('\n');
  }

  return announcement;
}

async function stagePr() {
  if (!process.env.GITHUB_ACTION || !process.env.COMMIT_SHA) {
    console.warn(
      'This task is inteded to run on GitHub actions. Use npm run stage:personal locally instead.'
    );
    return;
  }

  const commit = process.env.COMMIT_SHA;
  const changedFiles = getChangedFiles();

  let triggerName = TRIGGER_NAME_STATIC_BUILD;
  let checkName = CHECK_NAME_STATIC_BUILD;
  let initialWait = INITIAL_WAIT_STATIC_BUILD;

  // If any of the app files changed trigger a full app build instead
  if (changedFiles.app && changedFiles.app.length) {
    triggerName = TRIGGER_NAME_APP_BUILD;
    checkName = CHECK_NAME_APP_BUILD;
    initialWait = INITIAL_WAIT_APP_BUILD;
  }

  try {
    await requestBuild(commit, triggerName);
  } catch (e) {
    throw Error('Failed to request staging build.');
  }

  // Wait for 30 seconds, for the webhook to create the actual
  // build and Cloud Build propagate the status back to GitHub.
  // This can take up to 1m30s - wait for 2m to have room to wiggle
  // and as the build takes a while anyway
  console.log('Waiting for Cloud Build job to start ...');
  await wait(2 * 60 * 1000);

  let build = await findBuild(commit, checkName);
  if (!build) {
    throw Error('Can not find Cloud Build job. Has it started?');
  }

  try {
    build = await waitForCloudBuild(build.id, initialWait);
  } catch (e) {
    console.log(build);
    throw Error('Can not determine Cloud Build job status.');
  }

  const announcement = createAnnouncement(commit, changedFiles, build);
  // Passing output from logs is deprecated and streaming to the
  // output environment variable would require logs to be less verbose
  // https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
  await fs.writeFile('announcement.md', announcement, {encoding: 'utf-8'});

  console.log('Staging build finished.');
}

module.exports = stagePr;

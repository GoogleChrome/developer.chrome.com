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

const CHECK_NAME = 'Stage (dcc-staging)';

/**
 * How long the task waits initially before starting to poll,
 * as the build takes at least 5 minutes as of 12/2022
 */
const INITIAL_WAIT = 4.5 * 60 * 1000;

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
 * @returns {Promise<{[key: string]: any}>}
 */
async function findCheck(commit) {
  console.log(`Fetching checks for commit ${commit} ...`);
  let build = null;
  try {
    const checks = await fetchGitHubApi(
      `repos/GoogleChrome/developer.chrome.com/commits/${commit}/check-runs`
    );
    build = checks.check_runs.find(run => {
      return run.name === CHECK_NAME;
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
async function pollCheck(checkId, initialTimeout) {
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

  // If the build has not completed yet, then just query again in 60s
  return pollCheck(checkId, 60 * 1000);
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
 * @param {{[key: string]: any}} check Build details returned from the Checks API
 * @returns {string} A short message containing all information about the job
 */
function createAnnouncement(commit, check) {
  const changedFiles = getChangedFiles();
  console.log(commit, changedFiles, check);
  const startedAt = new Date(check.started_at);
  const completedAt = new Date(check.completed_at);
  const duration =
    Math.abs(startedAt.getTime() - completedAt.getTime()) / 1000 / 60;

  const status = check.status;
  const conclusion = check.conclusion;
  if (status !== 'completed' && conclusion !== 'success') {
    return (
      `Staging build (${check.name}) did not succeed.` +
      'Please ping engineering for assistance.'
    );
  }

  const shortCommitSha = commit.substring(0, 7);
  const baseUrl = `https://${shortCommitSha}-dot-dcc-staging.uc.r.appspot.com/`;

  let announcement =
    `Staging build (${check.name}) for commit ${commit} ` +
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

async function awaitGoogleCloudBuild() {
  if (!process.env.GITHUB_ACTION || !process.env.COMMIT_SHA) {
    console.warn(
      'This task is inteded to run on GitHub actions. Use npm run stage:personal locally instead.'
    );
    return;
  }

  const commit = process.env.COMMIT_SHA;

  // Wait for the webhook to create the actual
  // build and Cloud Build propagate the status back to GitHub.
  // This can take up to 1m30s - wait for 2m to have room to wiggle
  // and as the build takes a while anyway
  console.log('Waiting for Cloud Build job to start ...');
  await wait(INITIAL_WAIT);

  let check = await findCheck(commit);
  if (!check) {
    throw Error('Can not find Cloud Build job. Has it started?');
  }

  try {
    check = await pollCheck(check.id);
  } catch (e) {
    console.log(check);
    throw Error('Can not determine Cloud Build check status.');
  }

  console.log('Cloud Build completed.');

  const announcement = createAnnouncement(commit, check);
  // Passing output from logs is deprecated and streaming to the
  // output environment variable would require logs to be less verbose
  // https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
  await fs.writeFile('announcement.md', announcement, {encoding: 'utf-8'});

  console.log('Staging build finished.');
}

module.exports = {awaitGoogleCloudBuild};

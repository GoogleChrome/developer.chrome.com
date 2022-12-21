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
 * @fileoverview Repeatedly queries the GitHub API for the check result
 * of the check defined in CHECK_NAME and writes the check result to
 * the file system afterwards
 */

const fs = require('fs/promises');
const path = require('path');

const {fetchGitHubApi} = require('./lib/fetchGitHubApi');

/**
 * The name of the check to look for in the API response
 */
const CHECK_NAME = 'Stage (dcc-staging)';

/**
 * Path where the check details are persisted for following tasks
 */
const CHECK_DETAILS_PATH = path.join(__dirname, 'tmp', 'check.json');

/**
 * How long the task waits initially before starting to poll,
 * as the build takes at least 5 minutes as of 12/2022
 */
const INITIAL_WAIT = 3.5 * 60 * 1000;

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
 * Tries to find a check with the specified name on the specified
 * commit, using the GitHub Checks API
 * @param {string} commit A full commit hash like e1d46d0aa61c14e3972f07e3cbf918424c186056
 * @returns {Promise<{[key: string]: any}>}
 */
async function findCheck(commit) {
  console.log(`Fetching checks for commit ${commit} ...`);
  let build = null;
  try {
    const checks = await fetchGitHubApi(`commits/${commit}/check-runs`);
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
  const build = await fetchGitHubApi(`check-runs/${checkId}`);

  if (build.status === 'completed') {
    return build;
  }

  // If the build has not completed yet, then just query again in 60s
  return pollCheck(checkId, 60 * 1000);
}

async function awaitGoogleCloudBuild() {
  if (!process.env.GITHUB_ACTION || !process.env.PR_HEAD_COMMIT_SHA) {
    console.warn(
      'This task is inteded to run on GitHub actions. Use npm run stage:personal locally instead.'
    );
    return;
  }

  const commit = process.env.PR_HEAD_COMMIT_SHA;

  // Give the build some time ahead, as it takes at least 5min anyway
  console.log(`Waiting for Cloud Build job to start on commit ${commit} ...`);
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
  await fs.writeFile(CHECK_DETAILS_PATH, JSON.stringify(check), {
    encoding: 'utf-8',
  });
  console.log('Wrote details to', CHECK_DETAILS_PATH);
}

module.exports = {awaitGoogleCloudBuild, CHECK_DETAILS_PATH};

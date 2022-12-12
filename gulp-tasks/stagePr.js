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

const TRIGGER_NAME_STATIC_BUILD = 'Static';
const TRIGGER_NAME_APP_BUILD = 'App';

const CHECK_NAME_STATIC_BUILD = 'Static (dcc-staging)';
const CHECK_NAME_APP_BUILD = 'App (dcc-staging)';

/**
 * A full static build takes around 5m30s to 6m as of 12/2022
 */
const INITIAL_WAIT_STATIC_BUILD = 4 * 60 * 1000;
/**
 * Building an instance takes 36m30s to 8min as of 12/2022.
 * It takes longer depending on the amount of changed pages
 */
const INITIAL_WAIT_APP_BUILD = 8 * 60 * 1000;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

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

async function fetchGitHubApi(endpoint) {
  const request = await fetch(`https://api.github.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = await request.json();
  return data;
}

async function findBuild(checkName) {
  console.log(`Fetching checks for commit ${process.env.COMMIT_SHA} ...`);
  let build = null;
  try {
    const checks = await fetchGitHubApi(
      `repos/GoogleChrome/developer.chrome.com/commits/${process.env.COMMIT_SHA}/check-runs`
    );
    build = checks.check_runs.find(run => {
      return run.name === checkName;
    });
  } catch (e) {
    console.error('Could not fetch checks.');
  }

  return build;
}

async function waitForCloudBuild(checkId, timeout) {
  console.log(
    `Waiting ${timeout / 1000}s for Cloud Build (${checkId}) to finish ...`
  );
  await wait(timeout);
  const build = await fetchGitHubApi(
    `repos/GoogleChrome/developer.chrome.com/check-runs/${checkId}`
  );

  if (build.status === 'completed') {
    return build;
  }

  // If the build has not completed yet, then just query again in 60s
  return waitForCloudBuild(checkId, 60 * 1000);
}

async function stagePr() {
  if (!process.env.GITHUB_ACTION) {
    console.warn(
      'This task is inteded to run on GitHub actions. Use npm run stage:personal locally instead.'
    );
    return;
  }

  console.log('Changed files');
  console.log(process.env.CHANGED_APP_FILES);
  console.log(process.env.CHANGED_SERVER_FILES);

  let triggerName = TRIGGER_NAME_STATIC_BUILD;
  let checkName = CHECK_NAME_STATIC_BUILD;
  let initialWait = INITIAL_WAIT_STATIC_BUILD;
  // TODO: Check what files changed
  if (process.env.GITHUB_ACTION) {
    triggerName = TRIGGER_NAME_APP_BUILD;
    checkName = CHECK_NAME_APP_BUILD;
    initialWait = INITIAL_WAIT_APP_BUILD;
  }

  try {
    await requestBuild(process.env.COMMIT_SHA, triggerName);
  } catch (e) {
    throw Error('Failed to request staging build.');
  }

  // Wait for 30 seconds, for the webhook to create the actual
  // build and Cloud Build propagate the status back to GitHub.
  // This can take up to 1m30s - wait for 2m30s to have room to wiggle
  // and as the build takes a while anyway
  console.log('Waiting for Cloud Build job to start ...');
  await wait(2.5 * 60 * 1000);

  const build = await findBuild(checkName);
  if (!build) {
    throw Error('Can not find Cloud Build job. Has it started?');
  }

  try {
    await waitForCloudBuild(build.id, initialWait);
  } catch (e) {
    console.log(build);
    throw Error('Can not determine Cloud Build job status.');
  }

  console.log('Staging build finished.');
  // TODO: Post comment to PR.
}

module.exports = stagePr;

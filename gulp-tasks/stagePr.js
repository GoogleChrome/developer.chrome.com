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

async function stagePr() {
  if (!process.env.GITHUB_ACTION) {
    console.warn(
      'This task is inteded to run on GitHub actions. Use npm run stage:personal locally instead.'
    );
    return;
  }

  console.log(
    `Triggering staging build for ${process.env.COMMIT_SHA} (${process.env.GITHUB_SHA})`
  );

  try {
    const build = await fetch(
      `https://cloudbuild.googleapis.com/v1/projects/dcc-staging/triggers/Webhook:webhook?key=${process.env.CLOUD_BUILD_KEY}&secret=${process.env.CLOUD_BUILD_SECRET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          COMMIT_SHA: process.env.COMMIT_SHA,
        }),
      }
    );

    console.log('Build requested', await build.json());
  } catch (e) {
    throw Error('Could not create staging build.');
  }

  console.log('Waiting for Cloud Build job to start ...');
  // Wait for 30 seconds, for the webhook to create the actual
  // build and Cloud Build propagate the status back to GitHub
  await new Promise(resolve => {
    setTimeout(resolve, 30 * 1000);
  });

  const checks = await fetch(
    `https://api.github.com/repos/GoogleChrome/developer.chrome.com/commits/${process.env.COMMIT_SHA}/check-suites`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  console.log(await checks.json());
}

module.exports = stagePr;

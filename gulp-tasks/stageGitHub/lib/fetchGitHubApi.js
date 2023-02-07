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
 * @fileoverview Sends a request to the REST API for the
 * GoogleChrome/developers.chrome.com repo
 */

const {default: fetch} = require('node-fetch');

/**
 * Sends an authenticated request to the GitHub API
 * @param {string} endpoint
 * @returns {Promise<{[key: string]: any}>}
 */
async function fetchGitHubApi(endpoint, userOptions = {}) {
  const token = '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';

  if (!token) {
    throw new Error(
      'GitHub is not authenticated, process.env.GITHUB_TOKEN is not set.'
    );
  }

  // This is a value like https://github.com/GoogleChrome/developer.chrome.com, which
  // can be used to construct the proper API URL. It is good to keep this dynamic, if
  // the repo is moved or forked.
  const headRepoUrl = process.env.HEAD_REPO_URL;
  const orgRepo = headRepoUrl.replace('https://github.com/', '');
  const url = `https://api.github.com/repos/${orgRepo}/${endpoint}`;

  console.log('Requesting GitHub API', url);

  const options = Object.assign(
    {},
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
    userOptions
  );

  const request = await fetch(url, options);

  const data = await request.json();
  console.log('GitHub API response', data);

  return data;
}

module.exports = {fetchGitHubApi};

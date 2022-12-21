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
async function fetchGitHubApi(endpoint) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      'GitHub is not authenticated, process.env.GITHUB_TOKEN is not set.'
    );
  }

  const url = `https://api.github.com/repos/GoogleChrome/developer.chrome.com/${endpoint}`;
  console.log('Requesting GitHub API', url);

  const request = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = await request.json();
  return data;
}

module.exports = {fetchGitHubApi};

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
 * @fileoverview Creates an API client which communicates with the GitHub app,
 * configured via environment variables. Usually the Chrome DevRel Infra app
 */

const {App} = require('octokit');

const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
const GITHUB_APP_KEY = process.env.GITHUB_APP_KEY;
const GITHUB_APP_INSTALLATION_ID = process.env.GITHUB_APP_INSTALLATION_ID;

const REPO_OWNER = 'GoogleChrome';
const REPO_NAME = 'developer.chrome.com';

const app = new App({
  appId: GITHUB_APP_ID,
  privateKey: GITHUB_APP_KEY,
});

let client = null;

/**
 * Either initializes a new GitHub API client or returns the existing one.
 * @returns {Promise<import('octokit').Octokit>}
 */
async function getGitHubApiClient() {
  if (!client) {
    client = await app.getInstallationOctokit(GITHUB_APP_INSTALLATION_ID);
  }

  return client;
}

/**
 * Wraps the GitHub API client to make requests to a predefined repo.
 * @param {string} method
 * @param {string} endpoint
 * @param {*} options
 * @returns
 */
async function requestGitHubApi(method, endpoint, options = {}) {
  const client = await getGitHubApiClient();
  const response = await client.request(
    `${method} /repos/${REPO_OWNER}/${REPO_NAME}/${endpoint}`,
    options
  );
  return response;
}

module.exports = {getGitHubApiClient, requestGitHubApi};

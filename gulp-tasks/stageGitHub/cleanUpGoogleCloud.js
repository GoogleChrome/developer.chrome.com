/*
 * Copyright 2023 Google LLC
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
 * @fileoverview Queries the Cloud Storage Bucket for currently deployed
 * PRs, checks if there is a corresponding App Engine version (for full deploys)
 * and then checks if the matching PR is still open on GitHub and otherwise
 * removes the remains.
 */

const {Storage} = require('@google-cloud/storage');
const {VersionsClient} = require('@google-cloud/appengine-admin');

const {requestGitHubApi} = require('./lib/gitHubApi');

/**
 * The bucket where static files are deployed
 */
const BUCKET_NAME = 'static-dcc-staging';

/**
 * The project ID of the App Engine project
 */
const PROJECT_ID = 'dcc-staging';

/** This folder contains the base version of the site and should
 * never be deleted.
 */
const FALLBACK_DIRECTORY = 'main/';

/**
 * The version name of the default App Engine version, which should
 * never be cleaned up (but also can't and would make the job fail it tried)
 */
const FALLBACK_VERSION = 'main';

const storage = new Storage();
const versionsClient = new VersionsClient();

/**
 * Reads all files from the root of a Google Cloud Storage bucket
 * and returns the PR numbers of the deployed PRs.
 * @returns {Promise<Array<number>>} [4124, 4125, 4126] for example
 */
async function getDeployedPullRequestsFromStorage() {
  // eslint-disable-next-line no-unused-vars
  const [files, nextQuery, apiResponse] = await storage
    .bucket(BUCKET_NAME)
    .getFiles({autoPaginate: false, delimiter: '/', prefix: ''});

  const pullRequests = [];
  // The prefixes (read: folder names) created by the Cloud Build job
  // are in the form of pr-{number}, so they need to be cleaned up
  for (const prefix of apiResponse.prefixes) {
    if (prefix === FALLBACK_DIRECTORY) {
      continue;
    }
    const prNumber = prefix.replace('pr-', '').replace('/', '');
    pullRequests.push(parseInt(prNumber));
  }

  return pullRequests;
}

/**
 * Fetches the open pull requests from GitHub and
 * maps the API response to only get the pull request numbers.
 * @returns {Promise<Array<number>>} [4124, 4125, 4126] for example
 */
async function getOpenPullRequestsFromGitHub() {
  try {
    // Note: this doesn't paginate, which should be okay as the job runs periodically
    // and overflown items will be picked up with the next run and PRs will always be opened
    // in a slower rate than the job runs.
    const apiResponse = await requestGitHubApi(
      'GET',
      'pulls?state=open&per_page=100'
    );
    const pullRequests = apiResponse.data.map(item => item.number);
    return pullRequests;
  } catch (e) {
    console.error(e);
    throw new Error('Could not fetch open pull requests from GitHub.');
  }
}

/**
 * Loops over a list of PRs and removes their remains from
 * the Cloud Storage bucket.
 * @param {Array<number>} prNumbers A list of deployed PRs
 */
async function cleanUpCloudStorage(prNumbers) {
  console.log('Starting to clean up Cloud Storage bucket ...');
  // Promise.all is intentionally not used here, as deleteFiles
  // already internally batches HTTP requests and GCS actually requires
  // a single request for every single object/file to be deleted
  for (const prNumber of prNumbers) {
    const prefix = `pr-${prNumber}/`;
    console.log(`Removing files with prefix ${prefix} ...`);
    // Be patient: as of 01/2023, cleaning up one version can take up
    // to 3 minutes following the constraints mentioned above.
    await storage.bucket(BUCKET_NAME).deleteFiles({prefix});
  }

  console.log('Done cleaning up Cloud Storage bucket!');
}

/**
 * Queries the App Engine API for all versions of the default service
 * and maps their IDs to match PR numbers
 * @returns {Promise<Array<number>>} [4124, 4125, 4126] for example
 */
async function getAppEngineVersions() {
  console.log('Fetching App Engine versions ...');

  const [apiResponse] = await versionsClient.listVersions({
    parent: `apps/${PROJECT_ID}/services/default`,
  });

  // IDs for AppEngine versions are in the format of pr-{number}-app.
  // To be comparable to the raw PR numbers they need to be cleaned up
  const prNumbers = [];
  for (const version of apiResponse) {
    if (version.id === FALLBACK_VERSION) {
      continue;
    }
    prNumbers.push(parseInt(version.id.replace('pr-', '').replace('-app', '')));
  }

  return prNumbers;
}

/**
 *
 * @param {Array<number>} appEngineVersions [4124] for example
 * @param {Array<number>} staleDeployments [4124, 4125, 4126] for example
 */
async function cleanUpAppEngineVersions(appEngineVersions, staleDeployments) {
  for (const prNumber of appEngineVersions) {
    if (!staleDeployments.includes(prNumber)) {
      continue;
    }

    console.log(`Removing App Engine version for PR ${prNumber} ...`);
    const [operation] = await versionsClient.deleteVersion({
      name: `apps/${PROJECT_ID}/services/default/versions/pr-${prNumber}-app`,
    });
    await operation.promise();
  }
}

async function cleanUpGoogleCloud() {
  const deployedPullRequests = await getDeployedPullRequestsFromStorage();
  const openPullRequests = await getOpenPullRequestsFromGitHub();
  console.log(
    `Currently ${deployedPullRequests.length} PRs are deployed, with ${openPullRequests.length} PRs open.`
  );

  // Holding the deployed PR numbers against the ones still open identifies
  // the ones that have been closed and which remains can be cleaned up
  const staleDeployments = deployedPullRequests.filter(
    pr => !openPullRequests.includes(pr)
  );
  console.log(`There are ${staleDeployments.length} stale deployments.`);
  if (staleDeployments.length === 0) {
    return;
  }

  await cleanUpCloudStorage(staleDeployments);
  const appEngineVersions = await getAppEngineVersions();
  // There is a posibility that there are only static deployments
  // and no instances except the default one, then we can exit early
  if (appEngineVersions.length === 1) {
    console.log('No app deployments found.');
    return;
  }

  await cleanUpAppEngineVersions(appEngineVersions, staleDeployments);
}

module.exports = {
  cleanUpGoogleCloud,
};

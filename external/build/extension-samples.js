/**
 * @fileoverview Fetches chrome extension samples list from GitHub artifacts
 * and writes to storage.
 * https://github.com/GoogleChrome/chrome-extensions-samples
 */

const {
  getGitHubApiClient,
} = require('../../gulp-tasks/stageGitHub/lib/gitHubApi.js');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const REPO_OWNER = 'GoogleChrome';
const REPO_NAME = 'chrome-extensions-samples';

async function run() {
  const client = await getGitHubApiClient();

  const response = await client.request(
    `GET /repos/${REPO_OWNER}/${REPO_NAME}/actions/artifacts`
  );

  if (response.status !== 200) {
    throw new Error(
      `Could not fetch artifacts. Status code: ${response.status}`
    );
  }

  const artifacts = response.data.artifacts.filter(
    artifact => artifact.name === 'extension-samples.json' && !artifact.expired
  );

  if (!artifacts.length) {
    throw new Error('No artifacts found.');
  }

  const sortedArtifacts = artifacts.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const latestArtifactId = sortedArtifacts[0].id;

  const artifactResponse = await client.request(
    `GET /repos/${REPO_OWNER}/${REPO_NAME}/actions/artifacts/${latestArtifactId}/zip`
  );

  if (artifactResponse.status !== 200) {
    throw new Error(
      `Could not fetch artifact data. Status code: ${artifactResponse.status}`
    );
  }

  const zip = new AdmZip(Buffer.from(artifactResponse.data));

  const zipEntries = zip
    .getEntries()
    .filter(entry => entry.entryName === 'extension-samples.json')
    .map(entry => entry.getData());

  fs.writeFileSync(
    path.join(__dirname, '../data/extension-samples.json'),
    zipEntries[0]
  );
}

run();

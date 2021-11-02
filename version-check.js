/**
 * @fileoverview This file compares the current commit SHA against the one
 * of the deployed site. If they are different then another Cloud Build task
 * is kicked off ('deploy.yml').
 */

const {default: fetch} = require('node-fetch');
const {ErrorReporting} = require('@google-cloud/error-reporting');
const getVersion = require('./tools/version');
const {CloudBuildClient} = require('@google-cloud/cloudbuild');

const client = new CloudBuildClient();
const errors = new ErrorReporting();
const ERROR_MESSAGE = 'NOT FOUND';

// This is the trigger ID of "deploy-public" for "chrome-apps-doc".
const deployTriggerId = 'eefc1e51-0e94-48e1-a1be-76da08f9a0b6';

/**
 * @returns {Promise<string>}
 */
const getDeployedVersion = () => {
  return fetch('https://developer.chrome.com/site-version')
    .then(res => (res.ok ? res.text() : ERROR_MESSAGE))
    .catch(() => ERROR_MESSAGE);
};

(async () => {
  const deployedVersion = await getDeployedVersion();
  const currentVersion = getVersion();

  console.log(`Current version: ${currentVersion}`);
  console.log(`Deployed version: ${deployedVersion}`);

  if (deployedVersion === ERROR_MESSAGE) {
    errors.report('Deployed commit SHA not found');
  }

  if (deployedVersion === currentVersion) {
    console.log(
      'The current and deployed versions are the same, not continuing build.'
    );
    return;
  }

  console.log(
    'The current and deployed versions are different, kicking off deploy build.'
  );

  // Check if there are any existing builds.
  const ret = client.listBuildsAsync({
    projectId: process.env.PROJECT_ID,
    pageSize: 1,
    filter: `trigger_id="${deployTriggerId}" AND (status="WORKING" OR status="QUEUED")`,
  });
  let activeBuild = false;
  // eslint-disable-next-line no-unused-vars
  for await (const _build of ret) {
    activeBuild = true;
    break;
  }
  if (activeBuild) {
    console.log(
      'There is a current active or queued build. Not starting another.'
    );
    return;
  }

  try {
    // This just waits for the build to be kicked off, not for its completion (it
    // returns a LROperation).
    await client.runBuildTrigger({
      projectId: process.env.PROJECT_ID,
      triggerId: deployTriggerId,
    });
  } catch (e) {
    errors.report(e);
  }
})();

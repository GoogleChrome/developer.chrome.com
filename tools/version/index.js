const fs = require('fs');
const {execSync} = require('child_process');

/**
 * Gets the HEAD SHA of the git repo plus the contents of /external/data/.hash, either generated
 * or synchronized from the external data repo.
 */
module.exports = () => {
  const gitHash = execSync('git rev-parse HEAD').toString().trim();
  let externalHash;
  try {
    externalHash = fs.readFileSync('external/data/.hash', 'utf-8').trim();
  } catch (e) {
    console.error(
      'Could not load external/data/.hash: has "npm run sync-external" been run?'
    );
    throw e;
  }

  return `${gitHash}:${externalHash}`;
};

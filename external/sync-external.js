/**
 * @fileoverview Synchronizes the last known good state from shared storage.
 *
 * This doesn't use the @google-cloud library, as it always uses your local credentials. We can
 * actually fetch these files anonymously via a single JSON API. See its reference:
 *   https://cloud.google.com/storage/docs/json_api/v1/objects/list
 */

const fs = require('fs');
const path = require('path');
const syncTestdata = require('./lib/sync-testdata');
const {default: fetch} = require('node-fetch');

// The bucket to synchronize. It's not filtered, and the bucket is public, owned by the internal
// Google project "chrome-gcs-uploader".
const bucketName = 'external-dcc-data';

/**
 * Write the contents of the specified bucket to the target folder. Clobbers existing files but
 * does not clear existing unmatched files.
 *
 * @param {string} bucketName
 * @param {string} target
 * @return {Promise<string[]>}
 */
async function syncBucket(bucketName, target) {
  const u = new URL(
    `https://storage.googleapis.com/storage/v1/b/${bucketName}/o`
  );
  u.searchParams.set('maxResults', '1000');

  const allObjectsRequest = await fetch(u);
  if (!allObjectsRequest.ok) {
    throw new Error(
      `couldn't get ${bucketName}: ${allObjectsRequest.statusText}`
    );
  }

  /**
   * @type {{
   *   kind: string,
   *   nextPageToken?: string,
   *   items: {name: string, mediaLink: string}[],
   * }}
   */
  const allFiles = await allObjectsRequest.json();

  if (allFiles.kind !== 'storage#objects') {
    throw new Error(`got unexpected response kind: ${allFiles.kind}`);
  }
  if (allFiles.nextPageToken) {
    // The page limit is 1000, and we currently have maybe O(10) files.
    throw new Error(
      'TODO: we have too many files in sync-external storage, implement pagination'
    );
  }

  const work = allFiles.items.map(async file => {
    const response = await fetch(file.mediaLink);
    if (!response.ok) {
      throw new Error(
        `couldn't fetch file ${file.name}: ${response.statusText}`
      );
    }
    const buffer = await response.buffer();

    const targetFile = path.join(target, file.name);

    const targetDir = path.dirname(targetFile);
    await fs.promises.mkdir(targetDir, {recursive: true});
    await fs.promises.writeFile(targetFile, buffer);

    return file.name;
  });

  return Promise.all(work);
}

async function run() {
  const target = path.join(__dirname, 'data');

  // Since this is an explicit call to synchronize this data, clobber the local build flag: if the
  // user had previously run a local build, they'll now automatically sync when using `npm run dev`.
  try {
    fs.rmSync(path.join(__dirname, 'local-build-flag'));
    console.info('! Removing local build flag, will sync external data.');
  } catch (e) {
    // ignore
  }

  const filenames = await syncBucket(bucketName, target);
  console.info('! Synchronized external state from Cloud Storage:', filenames);

  // If this is a CI build, we clobber synchronized data with anything found in "fallback/".
  if (process.env.CI) {
    const all = await syncTestdata();
    console.info('! Preparing CI run, copied:', all);
  }
}

run();

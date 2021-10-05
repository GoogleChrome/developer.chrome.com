/**
 * @fileoverview Synchronizes the last known good state from shared storage.
 *
 * TODO(samthor): Can we replace this with a `gcloud` or even a basic `wget` command?
 */

const storageApi = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

// The bucket to synchronize. It's not filtered, and the bucket is public, owned by the internal
// Google project "chrome-gcs-uploader".
const bucketName = 'external-dcc-data';

// This uses Application Default Credentials, but we just use it for synchronizing a public
// bucket so it shouldn't need any special permissions.
const storage = new storageApi.Storage();

/**
 * Write the contents of the specified bucket to the target folder. Clobbers existing files but
 * does not clear existing unmatched files.
 *
 * @param {string} bucketName
 * @param {string} target
 * @return {Promise<string[]>}
 */
async function syncBucket(bucketName, target) {
  const bucket = storage.bucket(bucketName);
  fs.mkdirSync(target, {recursive: true});

  /** @type {Promise<string>[]} */
  const work = [];

  /** @type {(file: storageApi.File) => void} */
  const handleFile = file => {
    const {name} = file;
    const targetFile = path.join(target, name);

    // Create the target folder, in case the data is nested.
    fs.mkdirSync(path.dirname(targetFile), {recursive: true});

    work.push(
      // TODO: can we not sync a file if its timestamp is the same?
      new Promise((resolve, reject) => {
        const readable = file.createReadStream();
        stream.pipeline(readable, fs.createWriteStream(targetFile), e => {
          e ? reject(e) : resolve(name);
        });
      })
    );
  };

  /** @type {Promise<void>} */
  const streamPromise = new Promise((resolve, reject) => {
    bucket
      .getFilesStream()
      .on('error', reject)
      .on('data', handleFile)
      .on('end', resolve);
  });

  await streamPromise;
  const filenames = await Promise.all(work);
  return filenames;
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
    // TODO(samthor): This just copies top-level files for now.
    const fallbackTarget = path.join(__dirname, 'fallback');
    const all = fs.readdirSync(fallbackTarget);
    for (const f of all) {
      fs.copyFileSync(path.join(fallbackTarget, f), path.join(target, f));
    }
    console.info('! Preparing CI run, copied:', all);
  }
}

run();

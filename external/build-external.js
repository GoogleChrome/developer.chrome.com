/**
 * @fileoverview Builds all external sources. This clears the data/ folder here
 * and allows all scripts in build/ to write new files there.
 *
 * This is intended for use by Cloud Build, or by site devs doing local work.
 */

// nb. This is important; we load dotenv here and pass environment down.
// It's safe to call this inside the build scripts too, but we run them with
// cwd=data/, so it can't find the env.
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');
const crypto = require('crypto');

async function run() {
  let errors = 0;

  const scripts = glob.sync('build/*.js', {cwd: __dirname});
  scripts.sort(); // run in alphabetical order

  const dataTarget = path.join(__dirname, 'data');
  fs.rmSync(dataTarget, {recursive: true});
  fs.mkdirSync(dataTarget, {recursive: true});

  /** @type {childProcess.CommonExecOptions} */
  const options = {cwd: dataTarget, stdio: 'inherit'};

  for (const script of scripts) {
    const r = path.join(__dirname, script);
    console.info('> Running', r);
    try {
      childProcess.execFileSync('node', [r], options);
    } catch (e) {
      // We don't log the error here, as we're already getting STDERR piped above.
      console.warn(`! Failed to execute "${script}" (${e.status})`);
      ++errors;
    }
  }

  // Determine the hash for everything in data/.
  const h = crypto.createHash('sha256');
  const allFiles = glob.sync('data/**/*', {cwd: __dirname});
  if (!allFiles.length) {
    throw new Error('no files generated, cowardly refusing to hash');
  }

  // Sort allFiles, in case glob.sync is inconsistent.
  allFiles.sort();

  for (const f of allFiles) {
    const p = path.join(__dirname, f);
    const bytes = fs.readFileSync(p);
    h.update(bytes);
  }
  const digest = h.digest('hex');
  console.info(`@ Generated digest=${digest} for ${allFiles.length} files`);
  fs.writeFileSync(path.join(__dirname, 'data/.hash'), digest);

  // If there were any errors, return with a non-zero status code anyway.
  if (errors) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  // Mark this local environment as being build-only, so it won't automatically sync.
  const payload =
    '// This file blocks synchronizing local data, because you ran `npm run build-external`.\n' +
    '// Delete it to bring back automatic sync when you run `npm run dev`.';
  fs.writeFileSync(path.join(__dirname, 'local-build-flag'), payload);
}

run();

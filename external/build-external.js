/**
 * @fileoverview Builds all external sources. This clears the data/ folder here
 * and runs all scripts in build/, which can write new files there.
 *
 * This is intended for use by Cloud Build, or by site devs doing local work.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');
const crypto = require('crypto');
const syncTestdata = require('./lib/sync-testdata');

async function run() {
  let errors = 0;

  const scripts = glob.sync('build/*.js', {cwd: __dirname});
  scripts.sort(); // run in alphabetical order

  const projectRoot = path.join(__dirname, '..');

  const dataTarget = path.join(__dirname, 'data');
  fs.rmSync(dataTarget, {recursive: true, force: true});
  fs.mkdirSync(dataTarget, {recursive: true});

  // If this is a CI build, we start with everything found in "fallback/". It won't win, but it
  // will be used in cases where credentials and such aren't available.
  if (process.env.CI) {
    const all = await syncTestdata();
    console.info('! Using fallback before build in CI, copied:', all);
  }

  /** @type {childProcess.ExecFileSyncOptions} */
  const options = {cwd: projectRoot, stdio: 'inherit'};

  for (const script of scripts) {
    const r = path.join(__dirname, script);
    console.info('> Running', r);
    try {
      childProcess.execFileSync('node', [r], options);
    } catch (e) {
      const withStatus = /** @type {{status: any}} */ (e);

      // We don't log the error here, as we're already getting STDERR piped above.
      console.warn(`! Failed to execute "${script}" (${withStatus.status})`);
      ++errors;
    }
  }

  // Determine the hash for everything in data/.
  const hash = crypto.createHash('sha256');
  const allFiles = glob.sync('data/**/*', {cwd: __dirname});
  if (!allFiles.length) {
    throw new Error('no files generated, cowardly refusing to hash');
  }

  // Sort allFiles, in case glob.sync is inconsistent.
  allFiles.sort();

  for (const f of allFiles) {
    const p = path.join(__dirname, f);
    const bytes = fs.readFileSync(p);
    hash.update(bytes);
  }
  const digest = hash.digest('hex');
  console.info(
    `@ Generated digest=${digest} for ${allFiles.length} files:`,
    allFiles
  );
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

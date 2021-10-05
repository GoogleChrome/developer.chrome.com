/**
 * @fileoverview
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// Synchronize remote data at most once every 12 hours.
const syncThresholdMs = 12 * 60 * 60 * 1000;

async function run() {
  if (fs.existsSync(path.join(__dirname, 'local-build-flag'))) {
    console.info(
      '! Not synchronizing external data, previous local build found.' +
        'Run `npm run sync-external` to clear it.'
    );
    return;
  }

  try {
    const stat = fs.statSync(path.join(__dirname, 'data'));
    const since = +new Date() - stat.mtimeMs;
    if (since < syncThresholdMs) {
      // Don't log at all, just don't synchronize.
      return;
    }
  } catch (e) {
    // The folder probably doesn't exist. Sync.
  }

  const out = childProcess.spawnSync('npm run sync-external', {
    shell: true,
    stdio: 'inherit',
  });
  if (out.status) {
    throw new Error(`could not sync, non-zero status: ${out.status}`);
  }
}

run();

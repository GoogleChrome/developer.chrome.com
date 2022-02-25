/**
 * @fileoverview This is run as part of `npm run dev`, and will synchronize the latest external
 * data at most once every ~12 hours. (This takes a few seconds and it shouldn't block devs who
 * don't care from getting their work done.)
 *
 * This will NOT synchronize if a previous local build was completed, and will warn as such. This
 * prevents local changes from being automatically clobbered.
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// See if the synchronized data is more than this old. If so, we run "sync-external".
const syncThresholdHours = 6;
const syncThresholdMs = syncThresholdHours * 60 * 60 * 1000;

async function run() {
  if (fs.existsSync(path.join(__dirname, 'local-build-flag'))) {
    console.info(
      '! Not synchronizing external data, previous local build found.' +
        'Run `npm run sync-external` to clear it.'
    );
    return;
  }

  let mtimeMs = 0;
  try {
    const stat = fs.statSync(path.join(__dirname, 'data'));
    mtimeMs = stat.mtimeMs;
  } catch (e) {
    // The folder probably doesn't exist.
  }
  const since = +new Date() - mtimeMs;
  if (since < syncThresholdMs) {
    // Don't log at all, and don't synchronize, the data is recent enough.
    return;
  }

  const out = childProcess.spawnSync('npm run sync-external', {
    shell: true,
    stdio: 'inherit',
  });
  if (out.status) {
    if (mtimeMs) {
      // There is a folder here so it probably has valid data. Don't throw, but error, perhaps
      // we're offline.
      console.warn(
        '! Cannot synchronize, but old historic data exists in "/external/data/". ' +
          'Run `npm run sync-external` to try again.'
      );
      return;
    }

    // We have no data, so throw.
    throw new Error(
      'Could not sync external data into "/external/data/", ' +
        `non-zero status: ${out.status}`
    );
  }
}

run();

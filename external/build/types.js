/**
 * @fileoverview Fetches and preprocesses types from Chrome sources.
 */

const dtsParse = require('./lib/dts-parse.js');
const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

/**
 * @param {string} targetDir
 */
async function fetchAndParse(targetDir) {
  /** @type {childProcess.CommonExecOptions} */
  const options = {cwd: targetDir, stdio: 'inherit'};

  childProcess.execFileSync('npm', ['install', 'chrome-types@beta'], options);
  console.warn('fetched chrome-types@beta', targetDir);

  const p = path.join(targetDir, 'node_modules/chrome-types/_all.d.ts');
  const defs = await dtsParse(p);

  const targetFile = path.join(__dirname, '../data/chrome-types.json');
  fs.writeFileSync(targetFile, JSON.stringify(defs, undefined, 2));
}

async function run() {
  const t = tmp.dirSync();
  try {
    await fetchAndParse(t.name);
  } finally {
    fs.rmSync(t.name, {recursive: true});
  }
}

run();

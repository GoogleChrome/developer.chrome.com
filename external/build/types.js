/**
 * @fileoverview Fetches and preprocesses types from Chrome sources.
 */

const dtsParse = require('./lib/dts-parse.js');
const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const chromeTypesTag = 'latest';

/**
 * @param {string} targetDir
 */
async function fetchAndPrepare(targetDir) {
  const packageName = `chrome-types@${chromeTypesTag}`;

  /** @type {childProcess.ExecFileSyncOptions} */
  const options = {cwd: targetDir, stdio: 'inherit'};

  childProcess.execFileSync('npm', ['install', packageName], options);
  const packageDir = path.join(targetDir, 'node_modules/chrome-types');

  /** @type {{version: string}} */
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(packageDir, 'package.json'), 'utf-8')
  );
  console.warn('fetched', packageName, targetDir, packageJson.version);
  return path.join(packageDir, '_all.d.ts');
}

/**
 * @param {string} targetFile
 */
async function parse(targetFile) {
  const defs = await dtsParse({sources: [targetFile]});

  const outputFile = path.join(__dirname, '../data/chrome-types.json');
  fs.writeFileSync(outputFile, JSON.stringify(defs, undefined, 2));
}

async function run() {
  const t = tmp.dirSync();
  try {
    if (process.argv.length === 2) {
      // Normal fetch, get from npm.
      const targetFile = await fetchAndPrepare(t.name);
      await parse(targetFile);
    } else if (process.argv.length === 3) {
      // Supports reading an arbitrary types file. Copy to our working folder first.
      const file = process.argv[2];
      const targetFile = path.join(t.name, '_all.d.ts');
      fs.copyFileSync(file, targetFile);
      console.warn('working on', path.join(t.name, '_all.d.ts'));
      await parse(path.join(t.name, '_all.d.ts'));
    } else {
      throw new Error('invalid usage: ./types.js <path_to_dts>');
    }
  } finally {
    fs.rmSync(t.name, {recursive: true});
  }
}

run();

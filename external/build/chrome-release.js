/**
 * @fileoverview Fetches Chrome release data and writes to storage.
 */

const buildVersionInformation = require('./lib/chrome-release.js');
const fs = require('fs');
const path = require('path');

async function run() {
  const versionInformation = await buildVersionInformation();

  const targetFile = path.join(__dirname, '../data/chrome-release.json');
  fs.writeFileSync(targetFile, JSON.stringify(versionInformation));
}

run();

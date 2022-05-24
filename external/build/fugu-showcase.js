/**
 * @fileoverview Fetches the most recent tweet from ChromiumDev and writes to storage.
 */

require('dotenv').config();

const {default: fetch} = require('node-fetch');
const fs = require('fs');
const path = require('path');
const url =
  'https://sheets.googleapis.com/v4/spreadsheets/1S_Apr0HavFCO7H9hKcRjIUrgoT7MFRg4uBm7aWSoaYo/values/Sheet2?key=AIzaSyCkROWBarEOJ9hQJggyrlUFulOFA4h6AW0&alt=json';

// TEMP: This is roughly a copy of https://github.com/tomayac/fugu-showcase/blob/dfc36868e81588add849df4aabb12e8dba5b2d89/index.mjs#L54
async function run() {
  if (process.env.CI) {
    return; // do nothing, the fallback data will win
  }

  const r = await fetch(url);

  if (!r.ok) {
    throw new Error(`Could not fetch fugu entries, status: ${r.status}`);
  }

  const json = await r.json();

  if (json['errors']) {
    const error = json['errors'][0];
    throw new Error(`${error.code}: ${error.message}`);
  }

  const values = json.values;
  const data = values.map(row => {
    return {
      timestamp: new Date(row[0]),
      appURL: row[1],
      sourceURL: row[2] || null,
      usedAPIs: row[3].split(', ').map(api => {
        return {
          name: api.replace(/\(https.*\)/g, '').trim(),
          url: api.replace(/.*?\((https.*)\)/g, '$1'),
        };
      }),
      // screenshot: `${fileNamifyURL(row[1])}.${SCREENSHOT_OPTIONS.type}`,
    };
  });

  const targetFile = path.join(__dirname, '../data/fugu-showcase.json');
  fs.writeFileSync(targetFile, JSON.stringify(data, null, 2));
}

run();

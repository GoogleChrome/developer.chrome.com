/**
 * @fileoverview Fetches the Fugu Projects following the data process described
 * in https://github.com/GoogleChromeLabs/fugu-showcase#data-flow.
 */

require('dotenv').config();

const {default: fetch} = require('node-fetch');
const fs = require('fs');
const path = require('path');
const {unfurl} = require('unfurl.js');

const SPREADSHEET_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1S_Apr0HavFCO7H9hKcRjIUrgoT7MFRg4uBm7aWSoaYo/values/Sheet2?key=AIzaSyCkROWBarEOJ9hQJggyrlUFulOFA4h6AW0&alt=json';

async function run() {
  if (process.env.CI) {
    return; // do nothing, the fallback data will win
  }
  try {
    const response = await fetch(SPREADSHEET_URL);
    if (!response.ok) {
      throw new Error(
        `Could not fetch Fugu entries. Status code was: ${response.status}.`
      );
    }
    const json = await response.json();
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
        screenshot: '',
      };
    });

    await Promise.all(
      data.map(async item => {
        return unfurl(item.appURL, {oembed: false, compress: true})
          .then(meta => {
            item.meta = meta;
            item.title =
              meta.open_graph?.title ||
              meta.twitter_card?.title ||
              meta.title ||
              new URL(item.appURL).hostname;
            item.description =
              meta.open_graph?.description ||
              meta.twitter_card?.description ||
              meta.description ||
              '';
          })
          .catch(err => {
            console.warn(err);
            item.meta = {};
            item.title = new URL(item.appURL).hostname;
            item.description = '';
          });
      })
    );

    const targetFile = path.join(__dirname, '../data/fugu-showcase.json');
    fs.writeFileSync(targetFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

run();

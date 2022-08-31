/**
 * @fileoverview Fetches the Fugu Projects following the data process described
 * in https://github.com/GoogleChromeLabs/fugu-showcase#data-flow.
 */

require('dotenv').config();

const {default: fetch} = require('node-fetch');
const path = require('path');
const {unfurl} = require('unfurl.js');
const sharp = require('sharp');
const fs = require('fs').promises;

const SPREADSHEET_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1S_Apr0HavFCO7H9hKcRjIUrgoT7MFRg4uBm7aWSoaYo/values/Sheet2?key=AIzaSyCkROWBarEOJ9hQJggyrlUFulOFA4h6AW0&alt=json';

const SCREENSHOT_OPTIONS = {
  width: 1280,
  height: 800,
  overwrite: true,
  delay: 2,
  type: 'webp',
};

async function limit(tasks, concurrency) {
  const results = [];

  async function runTasks(tasksIterator) {
    for (const [index, task] of tasksIterator) {
      try {
        results[index] = await task();
      } catch (error) {
        // @ts-ignore
        results[index] = new Error(`Failed with: ${error.message}`);
      }
    }
  }

  const workers = new Array(concurrency).fill(tasks.entries()).map(runTasks);
  await Promise.allSettled(workers);
  return results;
}

const createScreenshots = async (data, overrideType = null) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const captureWebsite = (await import('capture-website')).default;
  let items = data.map(item => [item.appURL, item.screenshot]);
  const length = items.length;
  if (!overrideType) {
    items = items.concat(items);
  }
  const tasks = items.map(([url, filename], i) => {
    return () => {
      SCREENSHOT_OPTIONS.type = overrideType || SCREENSHOT_OPTIONS.type;
      SCREENSHOT_OPTIONS.darkMode = i >= length;
      filename = SCREENSHOT_OPTIONS.darkMode
        ? filename.replace(
            new RegExp(`(.${SCREENSHOT_OPTIONS.type}$)`),
            '-dark$1'
          )
        : filename;
      if (!SCREENSHOT_OPTIONS.darkMode) {
        data[i].screenshot = filename;
      } else {
        data[i - length].screenshotDark = filename;
      }
      // @ts-ignore
      return captureWebsite.buffer(url, SCREENSHOT_OPTIONS).then(buffer => {
        const fileLocation = 'site/en/fugu-showcase';
        if (!overrideType) {
          return sharp(buffer)
            .resize({
              width: SCREENSHOT_OPTIONS.width / 2,
              height: SCREENSHOT_OPTIONS.height / 2,
            })
            .toBuffer()
            .then(data => {
              return fs
                .writeFile(path.resolve(fileLocation, filename), data)
                .then(() =>
                  console.log(`Successfully created \`${filename}\`.`)
                );
            })
            .catch(err => console.error(err));
        }
        return fs
          .writeFile(path.resolve(fileLocation, filename), buffer)
          .then(() => console.log(`Successfully created \`${filename}\`.`));
      });
    };
  });
  await limit(tasks, 5);
};

async function run() {
  if (process.env.CI) {
    return; // do nothing, the fallback data will win
  }
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const fileNamifyURL = (await import('filenamify-url')).default;
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
        isElectronApp: row[4].toLowerCase() === 'yes',
        screenshot: `${fileNamifyURL(row[1])}.${
          SCREENSHOT_OPTIONS.type
        }`.replace(/#/g, ''),
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
    await fs.writeFile(targetFile, JSON.stringify(data, null, 2));
    createScreenshots(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

run();

/**
 * @fileoverview Fetches the most recent tweet from ChromiumDev and writes to storage.
 */

require('dotenv').config();

const {default: fetch} = require('node-fetch');
const fs = require('fs');
const path = require('path');

const tweetCount = 1;
const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=113713261&count=${tweetCount}&include_rts=false&exclude_replies=true&tweet_mode=extended&include_ext_alt_text=true`;

async function run() {
  // Temporarily disable Twitter feeds fetch.
  return;
  // eslint-disable-next-line no-unreachable
  if (!process.env.TWITTER_BEARER) {
    if (process.env.CI) {
      return; // do nothing, the fallback data will win
    }
    throw new Error('No `TWITTER_BEARER` environment var for production');
  }

  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
    },
  });

  if (!r.ok) {
    throw new Error(`Could not fetch tweets, status: ${r.status}`);
  }

  const json = await r.json();

  if (json['errors']) {
    const error = json['errors'][0];
    throw new Error(`${error.code}: ${error.message}`);
  }

  const targetFile = path.join(__dirname, '../data/tweets.json');
  fs.writeFileSync(targetFile, JSON.stringify(json));
}

run();

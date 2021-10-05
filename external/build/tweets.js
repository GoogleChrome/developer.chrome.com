const fetch = require('node-fetch');
const fs = require('fs');

const tweetCount = 1;
const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=113713261&count=${tweetCount}&include_rts=false&exclude_replies=true&tweet_mode=extended&include_ext_alt_text=true`;

async function run() {
  if (!process.env.TWITTER_BEARER) {
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

  fs.writeFileSync('tweets.json', JSON.stringify(json));
}

run();

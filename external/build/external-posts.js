/**
 * @fileoverview Fetch the RSS feeds.
 */

const fs = require('fs');
const path = require('path');
const {rssFeeds} = require('webdev-infra/utils/rss-feeds');

async function run() {
  const raw = fs.readFileSync('./site/_data/authorsData.json', 'utf8');
  const authorsData = JSON.parse(raw);
  const feeds = {};

  for (const author in authorsData) {
    if (authorsData[author].external) {
      feeds[author] = authorsData[author].external;
    }
  }

  const authorsFeeds = await rssFeeds(feeds);

  fs.writeFileSync(
    path.join(__dirname, '../data/external-posts.json'),
    JSON.stringify(authorsFeeds)
  );
}

run();

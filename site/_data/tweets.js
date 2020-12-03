require('dotenv').config();
const CacheAsset = require('@11ty/eleventy-cache-assets');

const url =
  'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=113713261&count=5';

/**
 * @return {Promise<TwitterTweet[]>}
 */
module.exports = async () => {
  return process.env.TWITTER_BEARER
    ? await CacheAsset(url, {
        duration: '1h',
        type: 'json',
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
          },
        },
      })
    : require('./tweets-sample.json');
};

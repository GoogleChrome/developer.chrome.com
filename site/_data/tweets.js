const escapeStringRegexp = require('escape-string-regexp');
const fs = require('fs');
const path = require('path');

/**
 * Insert media (images/videos) into a tweet.
 * Currently only supports a single image.
 * @param {TwitterTweet} tweet
 */
const formatMedia = tweet => {
  const {media} = tweet.extended_entities || [];

  if (!media || !media.length) {
    return;
  }

  for (const item of media) {
    // For any piece of media in a tweet, twitter will add a placeholder url
    // which just redirects back to the tweet itself.
    //
    // For example, a tweet that looks like:
    // "Hello World!"
    // "[foo.jpg]"
    //
    // Will get turned into:
    // "Hello World!"
    // "https://t.co/8p5w09RLK3"
    //
    // We can use this url placeholder to insert an image or video
    // at the correct location in the tweet string.
    const pattern = escapeStringRegexp(`${item.url}`);
    const re = new RegExp(pattern, 'g');

    if (item.type === 'photo') {
      const dimensions = item.sizes.small;
      tweet.formatted_text = tweet.formatted_text.replace(
        re,
        `<img class="gap-top-300 rounded-100" src="${item.media_url_https}?name=small" width="${dimensions.w}" height="${dimensions.h}" alt="${item.ext_alt_text}" />`
      );
      // Break after the first photo. We don't want to try to emulate twitter's
      // multi-photo mosaic layout.
      break;
    }
  }
};

/**
 * Turn mention strings into links.
 * @param {TwitterTweet} tweet
 */
const formatMentions = tweet => {
  const {user_mentions: mentions} = tweet.entities || [];

  if (!mentions || !mentions.length) {
    return;
  }

  for (const mention of mentions) {
    const pattern = escapeStringRegexp(`@${mention.screen_name}`);
    const re = new RegExp(pattern, 'g');
    tweet.formatted_text = tweet.formatted_text.replace(
      re,
      `<a class="link no-visited decoration-none" href="https://twitter.com/${mention.screen_name}">${pattern}</a>`
    );
  }
};

/**
 * Turn url strings into links.
 * @param {TwitterTweet} tweet
 */
const formatUrls = tweet => {
  const {urls} = tweet.entities || [];

  if (!urls || !urls.length) {
    return;
  }

  for (const url of urls) {
    const pattern = escapeStringRegexp(url.url);
    const re = new RegExp(pattern, 'g');
    tweet.formatted_text = tweet.formatted_text.replace(
      re,
      `<a class="link no-visited decoration-none" href="${url.url}">${url.display_url}</a>`
    );
  }
};

/**
 * Turn hashtag strings into links.
 * @param {TwitterTweet} tweet
 */
const formatHashtags = tweet => {
  const {hashtags} = tweet.entities || [];

  if (!hashtags || !hashtags.length) {
    return;
  }

  for (const hashtag of hashtags) {
    const pattern = escapeStringRegexp(`#${hashtag.text}`);
    const re = new RegExp(pattern, 'g');
    tweet.formatted_text = tweet.formatted_text.replace(
      re,
      `<a class="link no-visited decoration-none" href="https://twitter.com/hashtag/${hashtag.text}">${pattern}</a>`
    );
  }
};

/**
 *
 * @param {TwitterTweet} tweet
 */
const formatEntities = tweet => {
  tweet.tweet_url = `https://twitter.com/ChromiumDev/status/${tweet.id_str}`;
  // Make a copy of the full_text for us to work with.
  // Use the same snake case style as the rest of the tweet object.
  // !!! Important !!!
  // The text is displayed with whitespace: pre-wrap so adding or
  // removing any whitespace will affect how the tweet is rendered.
  tweet.formatted_text = tweet.full_text;
  formatHashtags(tweet);
  formatUrls(tweet);
  formatMentions(tweet);
  formatMedia(tweet);
};

/**
 * @return {Promise<TwitterTweet[]>}
 */
module.exports = async () => {
  let tweets = [];
  try {
    const tweetsFile = path.join(__dirname, '../../external/data/tweets.json');
    tweets = /** @type {TwitterTweet[]} */ (
      JSON.parse(fs.readFileSync(tweetsFile, 'utf-8'))
    );
  } catch (e) {
    console.warn(
      'Error reading tweets.json. Maybe it does not exist? See https://github.com/GoogleChrome/developer.chrome.com/pull/6384'
    );
  }

  // Remove polls
  tweets = tweets.filter(tweet => !tweet.entities.polls);

  // Format tweet entities such as hashtags, mentions, photos, etc.
  tweets.forEach(formatEntities);
  return tweets;
};

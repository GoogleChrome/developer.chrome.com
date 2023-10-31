const cheerio = require('cheerio');
const {locales} = require('../_data/site.json');
const {prettyUrls} = require('./pretty-urls');
const {tables} = require('./tables');

/**
 * @param {string} content
 * @param {string} outputPath
 * @return {Promise<string>}
 */
const domTransformer = async (content, outputPath) => {
  // Make sure we're not interacting with something weird that has
  // permalink set to false or undefined.
  if (!outputPath || typeof outputPath !== 'string') {
    return content;
  }

  // Turn the page into a cheerio object to make it queryable.
  // This uses https://github.com/fb55/htmlparser2 instead of the default parse5.
  const $ = cheerio.load(content, {_useHtmlParser2: true});

  // Grab the locale for the page. This is used by various transforms.
  const locale = $('html').attr('lang');

  // If we have a path that contains something other than
  // a locale that is supported just return early.
  if (!locale || !locales.includes(locale)) {
    return content;
  }

  // Pipe the page through transforms.
  // These transforms mutate the cheerio object.
  prettyUrls($, locale);
  tables($);

  // Return the final html.
  return $.html();
};

// async-transforms can only operate on the default export.
module.exports = domTransformer;

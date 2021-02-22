const cheerio = require('cheerio');
const ISO6391 = require('iso-639-1');
const {prettyUrls} = require('./pretty-urls');
const {tables} = require('./tables');
const {processInlineJs} = require('./process-inline-js');

/**
 * @param {string} content
 * @param {string} outputPath
 * @return {string}
 */
const domTransformer = (content, outputPath) => {
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

  // If we have a path that contains something other than a locale just return
  // early.
  // @ts-ignore: validate() exists but ts fails to pick it up.
  if (!locale || !ISO6391.validate(locale)) {
    return content;
  }

  // Pipe the page through transforms.
  // These transforms mutate the cheerio object.
  prettyUrls($, outputPath, locale);
  tables($);
  processInlineJs($);

  // Return the final html.
  return $.html();
};

// async-transforms can only operate on the default export.
module.exports = domTransformer;

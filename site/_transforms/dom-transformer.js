const cheerio = require('cheerio');
const ISO6391 = require('iso-639-1');
const {asides} = require('./asides');
const {prettyUrls} = require('./pretty-urls');
const {tables} = require('./tables');

const domTransformer = (content, outputPath) => {
  // Make sure we're not interacting with something weird that has
  // permalink set to false or undefined.
  if (!outputPath || typeof outputPath !== 'string') {
    return content;
  }

  // Turn the page into a cheerio object to make it queryable.
  const $ = cheerio.load(content);

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
  asides($, locale);
  prettyUrls($, outputPath, locale);
  tables($);

  // Return the final html.
  return $.html();
};

module.exports = {domTransformer};

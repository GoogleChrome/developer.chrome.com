const path = require('path');
const cheerio = require('cheerio');
const ISO6391 = require('iso-639-1');

/**
 * Converts /en/... urls to /...,
 * and /... urls to locale-specific ones.
 * Which url style to use is inferred from the outputPath's locale.
 * @param {string} content The target HTML file including "dist"
 * @return {string} The updated HTML content for the page
 */

const prettyUrls = (content, outputPath) => {
  // Make sure we're not interacting with something weird that has
  // permalink set to false or undefined or...
  if (!outputPath || typeof outputPath !== 'string') {
    return content;
  }

  // outputPath is in the format "dist/en/foo/index.html"
  const locale = outputPath.split(path.sep)[1];

  // If we have a path that contains something other than a locale just return
  // early.
  // @ts-ignore: validate() does exist but ts fails to pick it up.
  if (!ISO6391.validate(locale)) {
    console.warn('Found invalid locale:', outputPath);
    return content;
  }

  // We use cheerio to parse the page.
  // cheerio can be quiet slow so if we're writing more transforms in the future
  // that use cheerio then we should combine them into a single transform.
  const $ = cheerio.load(content);
  const $links = $('a');
  $links.each((_, elem) => {
    const $link = $(elem);

    let href = $link.attr('href');

    if (!href) {
      throw new Error(`Found a link in ${outputPath} with a missing href.`);
    }

    // Ignore external links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      return;
    }

    // Ensure href ends in a trailing slash.
    href = path.join(href, '/');

    // For English urls we strip the locale prefix.
    // /en/foo/bar/ becomes /foo/bar/
    const englishLocale = 'en';
    if (href.startsWith(`/${englishLocale}/`)) {
      href = href.substring(`/${englishLocale}`.length);
    }

    if (locale !== englishLocale) {
      // For all other locales we ensure that urls begin with the locale prefix.
      // /foo/bar becomes /es/foo/bar
      // We do this because content (blog posts, docs) will always use
      // unprefixed absolute urls.
      if (!href.startsWith(`/${locale}/`)) {
        href = path.join('/', locale, href);
      }
    }

    $link.attr('href', href);
  });
  return $.html();
};

module.exports = {prettyUrls};

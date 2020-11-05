const path = require('path');

/**
 * Converts /en/... urls to /...,
 * and /... urls to locale-specific ones.
 * Which url style to use is inferred from the outputPath's locale.
 * @param {cheerio.Selector} $ A cheerio representation of the page. This object will be
 * modified in place.
 */
const prettyUrls = ($, outputPath, locale) => {
  const $links = $('a');
  $links.each((_, elem) => {
    const $link = $(elem);

    let href = $link.attr('href');

    if (!href) {
      console.warn(`Found a link in ${outputPath} with a missing href.`);
      return;
    }

    // Ignore external/internal/mailto, and relative links
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      !path.isAbsolute(href)
    ) {
      return;
    }

    // Ensure href ends in a trailing slash *unless* it contains a hash anchor.
    // Example: /en/docs/foo/#bar
    // If we add a trailing slash to the end of a hash anchor it will break it.
    if (href.indexOf('#') === -1) {
      href = path.join(href, '/');
    }

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
};

module.exports = {prettyUrls};

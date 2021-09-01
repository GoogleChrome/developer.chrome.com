const path = require('path');
const {defaultLocale} = require('../_data/site.json');

const fakeOrigin = `https://fake-does-not-exist-${Math.random()}.localhost`;

/**
 * Converts /en/... urls to /...,
 * and /... urls to locale-specific ones.
 * Which url style to use is inferred from the outputPath's locale.
 * @param {cheerio.Selector} $ A cheerio representation of the page. This object will be
 * modified in place.
 * @param {string} outputPath The destination for the file.
 * @param {string} locale The locale for the file.
 */
const prettyUrls = ($, outputPath, locale) => {
  /** @type {(href: string|undefined) => string|undefined} */
  const prettyHref = href => {
    if (!href) {
      return;
    }

    // Fix URLs targeting the same scheme.
    if (href.startsWith('//')) {
      href = `https:${href}`;
    }

    // If constructing a new URL puts us on a new origin, skip it.
    const checkExternalOrigin = new URL(href, fakeOrigin);
    if (checkExternalOrigin.origin !== fakeOrigin) {
      return;
    }

    // Ignore internal and relative links.
    if (href.startsWith('#') || !path.isAbsolute(href)) {
      return;
    }

    // Ensure href ends in a trailing slash *unless* it contains a hash anchor
    // or file extension.
    // Example: /en/docs/foo/#bar
    // Example: /feeds/all.xml
    //
    // If we add a trailing slash to the end of either of these it will break it.
    if (href.indexOf('#') === -1 && !path.extname(href)) {
      href = path.join(href, '/');
    }

    // For English urls we strip the locale prefix.
    // /en/foo/bar/ becomes /foo/bar/
    if (href.startsWith(`/${defaultLocale}/`)) {
      href = href.substring(`/${defaultLocale}`.length);
    }

    if (locale !== defaultLocale) {
      // For all other locales we ensure that urls begin with the locale prefix.
      // /foo/bar becomes /es/foo/bar
      // We do this because content (blog posts, docs) will always use
      // unprefixed absolute urls.
      if (!href.startsWith(`/${locale}/`)) {
        href = path.join('/', locale, href);
      }
    }

    return href;
  };

  // Update "a[href]".
  const $links = $('a');
  $links.each((_, elem) => {
    const $link = $(elem);

    const href = $link.attr('href');
    if (!href && !$link.attr('id')) {
      console.warn(
        `Found <a> in ${outputPath} with no href/id (text=\`${$link.text()}\`)`
      );
      return;
    }

    const update = prettyHref(href);
    if (update) {
      $link.attr('href', update);
    }
  });

  // Update "option[href]", which is used on the tags page.
  const $optionHref = $('option[href]');
  $optionHref.each((_, elem) => {
    const $opt = $(elem);
    const update = prettyHref($opt.attr('href'));
    if (update) {
      $opt.attr('href', update);
    }
  });
};

module.exports = {prettyUrls};

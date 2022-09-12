const { findByUrl } = require('../_data/lib/find');
const { getLocalizedPaths, stripLocale } = require('../_filters/urls');

/**
 * Outputs a list of <a href> tags with alternate language versions
 * for the given url.
 * @param {string} url Current page url
 * @param {EleventyCollectionObject} collections Eleventy collections object
 * @param {string} locale current locale
 */
function Partial(path, collections, locale = 'en') {
  return path;
}

module.exports = { Partial };

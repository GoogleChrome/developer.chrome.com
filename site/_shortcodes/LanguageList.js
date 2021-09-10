const {findByUrl} = require('../_data/lib/find');
const {getLocalizedPaths} = require('../_filters/urls');
const path = require('path');

/**
 * A map of supported language codes to their full names.
 * @const
 */
 const languageNames = {
  en: 'English',
  pl: 'Polski',
  es: 'Español',
  ko: '한국어',
  zh: '中文',
  ru: 'Pусский',
  pt: 'Português',
  ja: '日本語',
};

/**
 * Outputs a list of <link hreflang=""> tags with alternate language versions
 * for the given url.
 * @param {string} url Current page url
 * @param {object} site Site object from _data/site.json
 * @param {EleventyCollectionObject} collections Eleventy collections object
 */
function LanguageList(url, locales, collections, locale = 'en') {
  if (!url) {
    return;
  }
  const hreflangs = getLocalizedPaths(url, locales).filter(hreflang =>
    findByUrl(collections.all, hreflang[0])
  );
  const links = hreflangs
    // eslint-disable-next-line no-unused-vars
    .filter(([_, code]) => code !== locale)
    .map(hreflang => {
      return `<a href="${hreflang[0]}">${languageNames[hreflang[1]]}
        (${hreflang[1]})</a>`;
    });
  return links.length > 1 ? links.join(',') : '';
}

module.exports = {LanguageList};

const {findByUrl} = require('../_data/lib/find');
const {getLocalizedPaths, stripLocale} = require('../_filters/urls');
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
 * @param {object} site Site object
 * @param {EleventyCollectionObject} collections Eleventy collections object
 * @param {string} locale current locale
 */
function LanguageList(url, site, collections, locale = 'en') {
  if (!url) {
    return;
  }

  const cleanUrl = stripLocale(url);
  const hreflangs = getLocalizedPaths(cleanUrl, site.locales).filter(hreflang =>
    findByUrl(collections.all, hreflang[0])
  );
  const links = hreflangs
    // eslint-disable-next-line no-unused-vars
    .filter(([_, code]) => code !== locale)
    .map(([urlPath, code]) => {
      return `<a href="${path.join(site.url, urlPath)}">${languageNames[code]}
        (${code})</a>`;
    });

  let html = '';

  if (links.length) {
    html = `<span class="language-list">Translated to:
    ${links.join(',')}</span>`;
  }
  return html;
}

module.exports = {LanguageList};

const {findByUrl} = require('../_data/lib/find');
const {getLocalizedPaths, stripLocale} = require('../_filters/urls');
const path = require('path');

/**
 * A map of supported language codes to their full names.
 * @const
 */
const languageNames = {
  en: 'English',
  es: 'Español',
  ko: '한국어',
  zh: '中文',
  ru: 'Pусский',
  pt: 'Português',
  ja: '日本語',
};

/**
 * Outputs a list of <a href> tags with alternate language versions
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
  const hreflangs = getLocalizedPaths(cleanUrl, site.locales).filter(
    ([urlPath]) => findByUrl(collections.all, urlPath)
  );
  const links = hreflangs
    .filter(([, code]) => code !== locale)
    .map(([urlPath, code]) => {
      return `<a translate="no" lang="${code}"
        href="${path.join(site.url, urlPath)}">
        ${languageNames[code]}</a>`;
    });

  let html = '';

  if (links.length) {
    html = `<span class="language-list">Translated to:
    ${links.join(', ')}</span>`;
  }
  return html;
}

module.exports = {LanguageList};

const {findByUrl} = require('../_data/lib/find');
const {getLocalizedPaths, stripLocale} = require('../_filters/urls');

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
  fr: 'Français',
  de: 'Deutsch',
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

  // getLocalizedPath also implicitly strips any locale prefix, but get the clean URL here first
  // anyway: we want all options, and this makes it clearer to future readers.
  const cleanUrl = stripLocale(url);
  const hreflangs = getLocalizedPaths(cleanUrl, site.locales).filter(
    ([urlPath]) => findByUrl(collections.all, urlPath)
  );
  const links = hreflangs
    .filter(([, code]) => code !== locale)
    .map(([urlPath, code]) => {
      return `<a translate="no" lang="${code}" href="${urlPath}">${languageNames[code]}</a>`;
    });

  return links.join(', ');
}

module.exports = {LanguageList};

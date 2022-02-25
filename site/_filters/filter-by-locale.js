const {defaultLocale} = require('../_data/site.json');

/**
 * Filters Front Matter data that have the same locale attribute as requested.
 * @param {FrontMatterData[]} fMData An array of Front Matter data.
 * @param {string} [locale] Target locale.
 * @return {FrontMatterData[]}
 */
module.exports = function filterByLocale(fMData, locale = defaultLocale) {
  /** @type {Map<string, FrontMatterData>} */
  const filteredFrontMatter = new Map();
  for (const element of fMData) {
    if (element.locale === locale) {
      // If we find the element with the right locale, this will always win.
      filteredFrontMatter.set(element.url, element);
    } else if (
      !filteredFrontMatter.has(element.url) &&
      [locale, defaultLocale].includes(element.locale)
    ) {
      // If we don't have a better language, accept one from the default locale.
      filteredFrontMatter.set(element.url, element);
    }
  }
  return Array.from(filteredFrontMatter.values()).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
};

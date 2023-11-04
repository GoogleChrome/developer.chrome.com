const path = require('path');

const urlCacheKey = Symbol('find-cache-url');
const pathCacheKey = Symbol('find-cache-path');

const {defaultLocale} = require('../../_data/site.json');

/**
 * Builds and uses a cache to ensure fast lookup of Eleventy pages by
 * a specified key.
 *
 * @param {EleventyCollectionItem[]} collection
 * @param {typeof urlCacheKey | typeof pathCacheKey} cacheKey
 * @param {keyof EleventyCollectionItem} key
 * Should either be "url" or "filePathStem" or any other key
 * available on a collection item
 * @param {string} needle
 * Either a URL path, including locale prefix,
 * or a file path to the source document
 * @return {EleventyCollectionItem|undefined}
 */
const internalFind = (collection, cacheKey, key, needle) => {
  let cache = collection[cacheKey];
  if (cache === undefined) {
    cache = new Map();
    for (const entry of collection) {
      if (entry[key]) {
        cache.set(entry[key], entry);
      }
    }
    collection[cacheKey] = cache;
  }

  return cache.get(needle);
};

/**
 *
 * @param {EleventyCollectionItem[]} collection
 * @param {string} url
 * A URL as built by 11ty from the permalink key, locale prefix is optional.
 * @param {string} locale One of the available locales, like en, es, ...
 * @return {EleventyCollectionItem|undefined}
 */
const findByUrl = (collection, url, locale = '') => {
  if (path.extname(url)) {
    throw new Error(`Page urls should not end in file extensions: ${url}`);
  }

  // Ensure urls are always absolute. This is because eleventy's collection
  // urls are always absolute so if we try to match against a relative url
  // we'll always miss.
  if (!path.isAbsolute(url)) {
    url = path.join('/', url);
  }

  // Ensure urls end with a trailing slash. Again, this is because all of
  // eleventy's collection urls end in a trailing slash.
  url = path.join(url, '/');

  // Make sure language paths are absolute (ja becomes /ja).
  // These don't need to end in a trailing slash because they'll be prepended
  // to the url which already starts with a trailing slash.
  // e.g. /ja/docs/extensions/
  if (locale && !path.isAbsolute(locale)) {
    locale = path.join('/', locale);
  }

  let urlToFind = path.join(locale, url).replace(/\\/g, '/');
  const result = internalFind(collection, urlCacheKey, 'url', urlToFind);
  // If something has been found or nothing has been found while
  // not specifying a locale, end here. If a locale has been defined
  // we want to try searching again with the default locale
  if (result || !locale) {
    return result;
  }

  urlToFind = path.join('/', defaultLocale, url);
  return internalFind(collection, urlCacheKey, 'url', urlToFind);
};

const findByProjectKey = (collection, projectKey, locale) => {
  if (!projectKey || !locale) {
    return undefined;
  }
  const urlToFind = path.join('/', locale, '/docs/', projectKey, '/');
  return internalFind(collection, urlCacheKey, 'url', urlToFind);
};

/**
 *
 * @param {EleventyCollectionItem[]} collection
 * @param {string} filePathStem
 * The filePathStem as exposed on the collection item. The relative path
 * to the source document's parent directory
 * @param {string} locale One of the available locales, like en, es, ...
 * @return {EleventyCollectionItem|undefined}
 */
const findByFilePath = (collection, filePathStem, locale = defaultLocale) => {
  if (path.extname(filePathStem)) {
    throw new Error(`Paths should not end in file extensions: ${filePathStem}`);
  }

  // Ensure paths are always absolute. This is because 11ty file path stems
  // paths are always absolute so if we try to match against a relative path
  // it will always miss.
  if (!path.isAbsolute(filePathStem)) {
    filePathStem = path.join('/', filePathStem);
  }

  // Make sure language paths are absolute (ja becomes /ja).
  // These don't need to end in a trailing slash because they'll be prepended
  // to the path which already starts with a trailing slash.
  // e.g. /ja/docs/extensions/
  if (!path.isAbsolute(locale)) {
    locale = path.join('/', locale);
  }

  let filePathToFind = path.join(locale, filePathStem);
  const result = internalFind(
    collection,
    pathCacheKey,
    'filePathStem',
    filePathToFind
  );

  // If something has been found or nothing has been found while
  // not specifying a locale, end here. If a locale has been defined
  // we want to try searching again with the default locale
  if (result || !locale) {
    return result;
  }

  filePathToFind = path.join('/', defaultLocale, filePathStem);
  return internalFind(collection, pathCacheKey, 'filePathStem', filePathToFind);
};

module.exports = {findByUrl, findByProjectKey, findByFilePath};

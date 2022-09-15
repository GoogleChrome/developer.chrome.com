const path = require('path');

const urlCacheKey = Symbol('find-cache-url');
const pathCacheKey = Symbol('find-cache-path');

const defaultLocale = 'en';

/**
 * Builds and uses a cache to ensure fast lookup of Eleventy pages by
 * a specified key.
 *
 * @param {EleventyCollectionItem[]} collection
 * @param {unique symbol} cacheKey
 * @param {string} key
 * @param {string} needle
 * @return {EleventyCollectionItem|undefined}
 */
const internalFind = (collection, cacheKey, key, needle) => {
  let cache = collection[cacheKey];
  if (cache === undefined) {
    cache = {};
    for (const entry of collection) {
      if (entry[key]) {
        cache[entry[key]] = entry;
      }
    }
    collection[cacheKey] = cache;
  }

  if (needle in cache) {
    return cache[needle];
  }

  // Otherwise, be slow, since we think this is probably pretty rare.
  const result = collection.find(item => item[key] === needle);
  if (result) {
    return result;
  }

  return undefined;
};

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

  const urlToFind = path.join(locale, url);
  return internalFind(collection, urlCacheKey, 'url', urlToFind);
};

const findByProjectKey = (collection, projectKey, locale) => {
  if (!projectKey || !locale) {
    return undefined;
  }
  const urlToFind = path.join('/', locale, '/docs/', projectKey, '/');
  return internalFind(collection, urlCacheKey, 'url', urlToFind);
};

const findByFilePath = (collection, filePath, locale = '') => {
  if (path.extname(filePath)) {
    throw new Error(`Paths should not end in file extensions: ${filePath}`);
  }

  ('/en/_partials/extensions/mv2-legacy-page');

  // Ensure urls are always absolute. This is because eleventy's collection
  // urls are always absolute so if we try to match against a relative url
  // we'll always miss.
  if (!path.isAbsolute(filePath)) {
    filePath = path.join('/', filePath);
  }

  // Make sure language paths are absolute (ja becomes /ja).
  // These don't need to end in a trailing slash because they'll be prepended
  // to the url which already starts with a trailing slash.
  // e.g. /ja/docs/extensions/
  if (locale && !path.isAbsolute(locale)) {
    locale = path.join('/', locale);
  }

  let filePathToFind = path.join(locale, filePath);
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

  filePathToFind = path.join('/', defaultLocale, filePath);
  return internalFind(collection, pathCacheKey, 'filePathStem', filePathToFind);
};

module.exports = {findByUrl, findByProjectKey, findByFilePath};

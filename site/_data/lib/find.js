const path = require('path');

const cacheKey = Symbol('find-cache');
const alreadyNotifiedKey = Symbol('already-notified');

/**
 * Builds and uses a cache to ensure fast lookup of Eleventy pages.
 *
 * @param {EleventyCollectionItem[]} collection
 * @param {string} urlToFind
 * @return {EleventyCollectionItem|undefined}
 */
const internalFind = (collection, urlToFind) => {
  /** @type {{[url: string]: EleventyCollectionItem}} */
  let cache = collection[cacheKey];
  if (cache === undefined) {
    cache = {};
    for (const entry of collection) {
      if (entry.url) {
        cache[entry.url] = entry;
      }
    }
    collection[cacheKey] = cache;
  }

  if (urlToFind in cache) {
    return cache[urlToFind];
  }

  // Otherwise, be slow, since we think this is probably pretty rare.
  const result = collection.find(item => item.url === urlToFind);
  if (result) {
    return result;
  }

  /** @type {Set<string>} */
  let notifiedCache = collection[alreadyNotifiedKey];
  if (notifiedCache === undefined) {
    notifiedCache = new Set();
    collection[alreadyNotifiedKey] = notifiedCache;
  }

  // If this is the first time we've looked up this URL, notify the user.
  if (!notifiedCache.has(urlToFind)) {
    console.warn('Could not find URL:', urlToFind);
    notifiedCache.add(urlToFind);
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
  return internalFind(collection, urlToFind);
};

const findByProjectKey = (collection, projectKey, locale) => {
  if (!projectKey || !locale) {
    return undefined;
  }
  const urlToFind = path.join('/', locale, '/docs/', projectKey, '/');
  return internalFind(collection, urlToFind);
};

module.exports = {findByUrl, findByProjectKey};

/**
 * @fileoverview Provides a simple wrapper around eleventy-cache-assets which lets us insert values
 * for tests.
 */

const Cache = require('@11ty/eleventy-cache-assets');

let cacheForTest = null;

/**
 * @param {string} url
 * @param {string=} duration
 * @return {!Promise<Object>}
 */
async function fetchFromCache(url, duration = '1d') {
  if (cacheForTest) {
    if (cacheForTest[url]) {
      return cacheForTest[url];
    }
    throw new Error('network not available in test');
  }

  return Cache(url, {
    duration,
    type: 'json',
  });
}

/**
 * @param {string} url
 * @param {?Object} value
 */
function setCacheForTest(url, value) {
  if (cacheForTest) {
    cacheForTest[url] = value;
  }
}

/**
 * @param {boolean} testEnabled
 */
function setTestEnabled(testEnabled) {
  if (testEnabled) {
    cacheForTest = {};
  } else {
    cacheForTest = null;
  }
}

module.exports = {
  fetchFromCache,
  setCacheForTest,
  setTestEnabled,
};

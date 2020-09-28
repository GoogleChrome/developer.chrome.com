const path = require('path');

const findByUrl = (collection, url, locale = '') => {
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
  // to the url which already ends in a trailing slash.
  // e.g. /ja/docs/extensions/
  if (locale && !path.isAbsolute(locale)) {
    locale = path.join('/', locale);
  }

  return collection.find(item => item.url === path.join(locale, url));
};

module.exports = {findByUrl};

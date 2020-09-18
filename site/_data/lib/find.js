const path = require('path');

const findByUrl = (collection, url, lang = '') => {
  // Ensure urls end with a trailing slash
  if (!url.endsWith('/')) {
    url += '/';
  }

  // Make sure language paths are absolute (ja becomes /ja)
  if (lang && !path.isAbsolute(lang)) {
    lang = `/${lang}`;
  }

  return collection.find(item => item.url === path.join(lang, url));
};

module.exports = {findByUrl};

const path = require('path');
const {defaultLocale} = require('../_data/site.json');

const absolute = url => {
  if (!path.isAbsolute(url)) {
    url = path.join('/', url);
  }
  return url;
};

const trailingSlash = url => {
  if (!url.endsWith('/')) {
    url = path.join(url, '/');
  }
  return url;
};

const leadingAndTrailingSlash = url => {
  return trailingSlash(absolute(url));
};

const stripDefaultLocale = url => {
  if (typeof url !== 'string') {
    return url; // shows up for `permalink: false`
  }
  if (url.startsWith(`/${defaultLocale}/`)) {
    url = url.substring(`/${defaultLocale}`.length);
  }
  return url;
};

module.exports = {
  absolute,
  trailingSlash,
  leadingAndTrailingSlash,
  stripDefaultLocale,
};

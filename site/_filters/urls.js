const path = require('path');

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

module.exports = {absolute, trailingSlash, leadingAndTrailingSlash};

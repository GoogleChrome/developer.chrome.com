const path = require('path');

const absolute = url => {
  if (!path.isAbsolute(url)) {
    url = path.join('/', url);
  }
  return url;
};

module.exports = {absolute};

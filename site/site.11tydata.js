const {sep, resolve, join} = require('path');

module.exports = {
  eleventyComputed: {
    // Gives every page a `parent` property which is useful for things like
    // generating breadcrumbs.
    parent: data => {
      const url = data.page.url;
      // ignore /en/ or /en-US/ as these will always be
      // the homepage which has no parent.
      if (url.split(sep).length <= 3) {
        return;
      }

      // go up one directory
      // /en/foo/bar/ becomes /en/foo/
      return join(resolve(url, '..'), '/');
    },
  },
};

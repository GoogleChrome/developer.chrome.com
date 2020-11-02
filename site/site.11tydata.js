const {sep, resolve, join} = require('path');

// Matches e.g. "/es/docs/blah/".
const projectKeyRe = /\/\w{2,}\/docs\/(\w+)\//;

module.exports = {
  eleventyComputed: {
    // Gives every page a `parent` property which is useful for things like
    // generating breadcrumbs.
    parent: data => {
      const {url} = data.page;
      if (!url) {
        return;
      }
      // ignore /en/ or /en-US/ as these will always be
      // the homepage which has no parent.
      if (url.split(sep).length <= 3) {
        return;
      }

      // go up one directory
      // /en/foo/bar/ becomes /en/foo/
      return join(resolve(url, '..'), '/');
    },

    // Give some pages a project_key.
    project_key: data => {
      const {url} = data.page;
      if (!url) {
        return;
      }

      const m = projectKeyRe.exec(url);
      if (!m) {
        return;
      }

      return m[1];
    },
  },
};

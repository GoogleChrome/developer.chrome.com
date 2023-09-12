const {isPublished} = require('./_utils/drafts');
const {isTruthy} = require('./_utils/isTruthy');

// Matches e.g. "/es/docs/blah/" or "/en/docs/foo-bar_zing/".
const projectKeyRe = /\/\w{2,}\/docs\/([_-\w]+)\//;

module.exports = {
  eleventyComputed: {
    /**
     * Adds support for drafts.
     * If a page has `draft: true` in its YAML frontmatter
     * or is scheduled for future, then this snippet will
     * set its permalink to false and the page will not be output in
     * production builds. For preview builds this behaviour is
     * overriden by setting the `CI` variable to true
     *
     * For dev builds we will render the page with a warning that it's a draft.
     */
    permalink: data => {
      if (process.env.NODE_ENV !== 'production' || isTruthy(process.env.CI)) {
        return data.permalink;
      } else {
        return isPublished(data) ? data.permalink : false;
      }
    },
    eleventyExcludeFromCollections: data => {
      if (process.env.NODE_ENV !== 'production' || isTruthy(process.env.CI)) {
        return data.permalink;
      } else {
        return isPublished(data) ? data.permalink : false;
      }
    },
    // Give some pages a project_key.
    project_key: data => {
      if (data.project_key) {
        return data.project_key;
      }

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

// Matches e.g. "/es/docs/blah/" or "/en/docs/foo-bar_zing/".
const projectKeyRe = /\/\w{2,}\/docs\/([_-\w]+)\//;

module.exports = {
  eleventyComputed: {
    /**
     * Adds support for drafts.
     * If a page has `draft: true` in its YAML frontmatter then this snippet
     * will set its permalink to false and the page will not be output in
     * production builds.
     *
     * For dev builds we will render the page with a warning that it's a draft.
     */
    permalink: data => {
      if (process.env.NODE_ENV !== 'production') {
        return data.permalink;
      } else {
        return data.draft ? false : data.permalink;
      }
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

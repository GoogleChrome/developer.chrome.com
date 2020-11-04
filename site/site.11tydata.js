// Matches e.g. "/es/docs/blah/" or "/en/docs/foo-bar_zing/".
const projectKeyRe = /\/\w{2,}\/docs\/([_-\w]+)\//;

module.exports = {
  eleventyComputed: {
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

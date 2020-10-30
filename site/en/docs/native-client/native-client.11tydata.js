module.exports = {
  // Used to fetch project data from _data/docs/[project_key]
  project_key: 'native-client',

  // Used to display the project name on its landing page and in the side-nav
  project_name: 'Native Client',

  eleventyComputed: {
    layout: data => {
      // If the page has specified its own layout, use it.
      if (data.layout) {
        return data.layout;
      }

      // Otherwise, set guides to use the doc-post layout.
      // Set API Reference to use the native-client-reference layout.
      const regex = new RegExp(/\/pepper_.*\/(c|cpp)\//);
      if (regex.test(data.page.url)) {
        return 'layouts/native-client-reference.njk';
      } else {
        return 'layouts/doc-post.njk';
      }
    },
  },
};

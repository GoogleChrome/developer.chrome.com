module.exports = {
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

const yaml = require("js-yaml");

// Filters
const {absolute} = require('./site/_filters/absolute');

// Plugins
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const optimizeHtmlPlugin = require('./site/_plugins/optimize-html');

// Collections
const blogCollection = require('./site/_collections/blog');
const feedsCollection = require('./site/_collections/feeds');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  // We do this so we can have gulp put compiled css into our _includes/css
  // directory. We want to .gitignore this compiled css, but we want elventy
  // to use it for its build.
  config.setUseGitIgnore(false);

  // Merge eleventy's data cascade. This means directory data files will
  // cascade down to any child directories.
  config.setDataDeepMerge(true);

  // Make .yml files work in the _data directory.
  config.addDataExtension('yml', contents => yaml.safeLoad(contents));

  // Add plugins
  config.addPlugin(rssPlugin);

  // Add collections
  config.addCollection('blog', blogCollection);
  config.addCollection('feeds', feedsCollection);

  // Add filters
  config.addFilter('absolute', absolute);

  // Only minify HTML and inline CSS if we are in production because it slows
  // builds _right_ down
  if (isProduction) {
    config.addPlugin(optimizeHtmlPlugin);
  }

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'site',
      output: 'dist',
    },
  };
};

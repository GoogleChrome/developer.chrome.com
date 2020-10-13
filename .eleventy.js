const yaml = require('js-yaml');

// Filters
const {absolute, trailingSlash, leadingAndTrailingSlash} = require('./site/_filters/urls');
const {i18n} = require('./site/_filters/i18n');

// Shortcodes
const {img} = require('./site/_shortcodes/img');
const {video} = require('./site/_shortcodes/video');

// Transforms
const {prettyUrls} = require('./site/_transforms/pretty-urls');

// Plugins
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const optimizeHtmlPlugin = require('./site/_plugins/optimize-html');

// Supported locales
const locales = require('./site/_data/site').locales;

// Collections
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
  locales.forEach(locale => config.addCollection(`blog-${locale}`, collections => {
    return collections.getFilteredByGlob(`./site/${locale}/blog/*/*.md`).reverse();
  }));
  config.addCollection('feeds', feedsCollection);

  // Add filters
  config.addFilter('absolute', absolute);
  config.addFilter('trailingSlash', trailingSlash);
  config.addFilter('leadingAndTrailingSlash', leadingAndTrailingSlash);
  config.addFilter('i18n', i18n);

  // Add shortcodes
  config.addShortcode('img', img);
  config.addShortcode('video', video);

  // Add transforms
  config.addTransform('prettyUrls', prettyUrls);

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

// Collections
const blogCollection = require('./site/_collections/blog');

// Transforms
const htmlMinTransform = require('./site/_transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  // We do this so we can have gulp put compiled css into our _includes/css
  // directory. We want to .gitignore this compiled css, but we want elventy
  // to use it for its build.
  config.setUseGitIgnore(false);

  // Add collections
  config.addCollection('blog', blogCollection);

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
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

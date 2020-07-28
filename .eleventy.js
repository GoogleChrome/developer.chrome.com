// Transforms
const htmlMinTransform = require('./site/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  // Tell eleventy to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Tell eleventy to copy our images over
  config.addPassthroughCopy("site/images");

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
      output: 'dist'
    }
  };
};
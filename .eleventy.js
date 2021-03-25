const yaml = require('js-yaml');
const {drafts} = require('./site/_utils/drafts');

// Filters
const {
  absolute,
  trailingSlash,
  leadingAndTrailingSlash,
  stripDefaultLocale,
} = require('./site/_filters/urls');
const {i18n} = require('./site/_filters/i18n');
const {githubLink} = require('./site/_filters/github-link');
const {namespaceToPath} = require('./site/_filters/namespace');
const {minifyJs} = require('./site/_filters/minify-js');
const {updateSvgForInclude} = require('./site/_filters/svg');
const {slugify} = require('./site/_filters/slugify');
const {toc} = require('./site/_filters/toc');

// Shortcodes
const {Details} = require('./site/_shortcodes/Details');
const {DetailsSummary} = require('./site/_shortcodes/DetailsSummary');
const {IFrame} = require('./site/_shortcodes/IFrame');
const {Glitch} = require('./site/_shortcodes/Glitch');
const {Img} = require('./site/_shortcodes/Img');
const {Video} = require('./site/_shortcodes/Video');
const {YouTube} = require('./site/_shortcodes/YouTube');
const {Columns, Column} = require('./site/_shortcodes/Columns');
const {Compare, CompareCaption} = require('./site/_shortcodes/Compare');
const {Aside} = require('./site/_shortcodes/Aside');

// Transforms
const {domTransformer} = require('./site/_transforms/dom-transformer-pool');
const {purifyCss} = require('./site/_transforms/purify-css');
const {minifyHtml} = require('./site/_transforms/minify-html');

// Plugins
const md = require('./site/_plugins/markdown');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Supported locales
const locales = require('./site/_data/site').locales;

// Collections
const algoliaCollection = require('./site/_collections/algolia');
const feedsCollection = require('./site/_collections/feeds');
const tagsCollection = require('./site/_collections/tags');
const extensionsReferenceCollection = require('./site/_collections/reference');

// Create a helpful environment flags
const isProduction = process.env.NODE_ENV === 'production';

module.exports = eleventyConfig => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  // We do this so we can have gulp put compiled css into our _includes/css
  // directory. We want to .gitignore this compiled css, but we want elventy
  // to use it for its build.
  eleventyConfig.setUseGitIgnore(false);

  // Merge eleventy's data cascade. This means directory data files will
  // cascade down to any child directories.
  eleventyConfig.setDataDeepMerge(true);

  // Copy binary assets over to the dist/ directory.
  // images should ideally be uploaded to our CDN but if, for whatever reason,
  // they can't be, then this passthrough copy will pick them up.
  eleventyConfig.addPassthroughCopy('site/en/**/*.{jpg,jpeg,png,webp,gif}');

  // Make .yml files work in the _data directory.
  eleventyConfig.addDataExtension('yml', contents => yaml.safeLoad(contents));

  // Configure markdown-it plugins
  eleventyConfig.setLibrary('md', md);

  // Add plugins
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add collections
  locales.forEach(locale => eleventyConfig.addCollection(`blog-${locale}`, collections => {
    let blogCollection = collections.getFilteredByGlob(`./site/${locale}/blog/*/*.md`).filter(drafts).reverse();
    // If we're running inside of Percy then just show the first six blog posts.
    if (process.env.PERCY_BRANCH) {
      blogCollection = blogCollection.slice(blogCollection.length - 6);
    }
    return blogCollection;
  }));
  eleventyConfig.addCollection('algolia', algoliaCollection);
  eleventyConfig.addCollection('feeds', feedsCollection);
  eleventyConfig.addCollection('tags', tagsCollection);
  eleventyConfig.addCollection('reference', extensionsReferenceCollection);

  // Add filters
  eleventyConfig.addFilter('absolute', absolute);
  eleventyConfig.addFilter('trailingSlash', trailingSlash);
  eleventyConfig.addFilter('leadingAndTrailingSlash', leadingAndTrailingSlash);
  eleventyConfig.addFilter('stripDefaultLocale', stripDefaultLocale);
  eleventyConfig.addFilter('i18n', i18n);
  eleventyConfig.addFilter('githubLink', githubLink);
  eleventyConfig.addFilter('namespaceToPath', namespaceToPath);
  eleventyConfig.addNunjucksAsyncFilter('minifyJs', minifyJs);
  eleventyConfig.addFilter('updateSvgForInclude', updateSvgForInclude);
  eleventyConfig.addFilter('slugify', slugify);
  eleventyConfig.addFilter('toc', toc);

  // Add shortcodes
  eleventyConfig.addShortcode('IFrame', IFrame);
  eleventyConfig.addShortcode('Glitch', Glitch);
  eleventyConfig.addShortcode('Img', Img);
  eleventyConfig.addShortcode('Video', Video);
  eleventyConfig.addShortcode('YouTube', YouTube);
  eleventyConfig.addPairedShortcode('Details', Details);
  eleventyConfig.addPairedShortcode('DetailsSummary', DetailsSummary);
  eleventyConfig.addPairedShortcode('Columns', Columns);
  eleventyConfig.addPairedShortcode('Column', Column);
  eleventyConfig.addPairedShortcode('Compare', Compare);
  eleventyConfig.addPairedShortcode('CompareCaption', CompareCaption);
  eleventyConfig.addPairedShortcode('Aside', Aside);

  // Add transforms
  eleventyConfig.addTransform('domTransformer', domTransformer);

  // Only minify HTML and inline CSS if we are in production because it slows
  // builds _right_ down.
  //
  // !!! Important !!!
  // These transforms should _always_ go last because they look at the final
  // HTML for the page and inline CSS / minify.
  if (isProduction) {
    eleventyConfig.addTransform('purifyCss', purifyCss);
    eleventyConfig.addTransform('minifyHtml', minifyHtml);
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

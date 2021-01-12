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
const {namespaceToPath} = require('./site/_filters/namespace');
const {minifyJs} = require('./site/_filters/minify-js');
const {updateSvgForInclude} = require('./site/_filters/svg');
const {slugify} = require('./site/_filters/slugify');
const {toc} = require('./site/_filters/toc');

// Shortcodes
const {iframe} = require('./site/_shortcodes/iframe');
const {glitch} = require('./site/_shortcodes/glitch');
const {img} = require('./site/_shortcodes/img');
const {video} = require('./site/_shortcodes/video');
const {youtube} = require('./site/_shortcodes/youtube');
const {columns} = require('./site/_shortcodes/columns');

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
const isCI = true || process.env.CI;

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
  eleventyConfig.addPassthroughCopy('site/en/**/*.{jpg,jpeg,png,webp}');

  // Make .yml files work in the _data directory.
  eleventyConfig.addDataExtension('yml', contents => yaml.safeLoad(contents));

  // Configure markdown-it plugins
  eleventyConfig.setLibrary('md', md);

  // Add plugins
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add collections
  locales.forEach(locale => eleventyConfig.addCollection(`blog-${locale}`, collections => {
    const blogCollection = collections.getFilteredByGlob(`./site/${locale}/blog/*/*.md`).filter(drafts).reverse();
    return isCI ? blogCollection.slice(blogCollection.length - 6) : blogCollection;
  }));
  eleventyConfig.addCollection('algolia', algoliaCollection);
  eleventyConfig.addCollection('feeds', feedsCollection);
  eleventyConfig.addCollection('tags', tagsCollection);
  eleventyConfig.addCollection('reference', extensionsReferenceCollection);

  // Add static collections
  // These are generated as a postinstall step as computation is slow
  eleventyConfig.addCollection('types', () => require('./site/_collections/types'));

  // Add filters
  eleventyConfig.addFilter('absolute', absolute);
  eleventyConfig.addFilter('trailingSlash', trailingSlash);
  eleventyConfig.addFilter('leadingAndTrailingSlash', leadingAndTrailingSlash);
  eleventyConfig.addFilter('stripDefaultLocale', stripDefaultLocale);
  eleventyConfig.addFilter('i18n', i18n);
  eleventyConfig.addFilter('namespaceToPath', namespaceToPath);
  eleventyConfig.addNunjucksAsyncFilter('minifyJs', minifyJs);
  eleventyConfig.addFilter('updateSvgForInclude', updateSvgForInclude);
  eleventyConfig.addFilter('slugify', slugify);
  eleventyConfig.addFilter('toc', toc);

  // Add shortcodes
  eleventyConfig.addShortcode('iframe', iframe);
  eleventyConfig.addShortcode('glitch', glitch);
  eleventyConfig.addShortcode('img', img);
  eleventyConfig.addShortcode('video', video);
  eleventyConfig.addShortcode('youtube', youtube);
  eleventyConfig.addPairedShortcode('columns', columns);

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

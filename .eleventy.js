const yaml = require('js-yaml');
const path = require('path');

// Filters
const {
  absolute,
  trailingSlash,
  leadingAndTrailingSlash,
  stripDefaultLocale,
} = require('./site/_filters/urls');
const embededDoc = require('./site/_filters/docs');
const {i18n} = require('./site/_filters/i18n');
const {githubLink} = require('./site/_filters/github-link');
const {namespaceToPath} = require('./site/_filters/namespace');
const mdFilters = require('./site/_filters/md');
const {slugify} = require('./site/_filters/slugify');
const {ensureUniqueHrefInProduction} = require('./site/_filters/ensureUniqueHrefInProduction');
const {toc} = require('./site/_filters/toc');
const {updateSvgForInclude} = require('webdev-infra/filters/svg');
const {minifyHtml} = require('webdev-infra/filters/minifyHtml');

// Shortcodes
const {Blockquote} = require('webdev-infra/shortcodes/Blockquote');
const {InlineCss} = require('webdev-infra/shortcodes/InlineCss');
const {Codepen} = require('webdev-infra/shortcodes/Codepen');
const {Details} = require('./site/_shortcodes/Details');
const {DetailsSummary} = require('./site/_shortcodes/DetailsSummary');
const {Empty} = require('./site/_shortcodes/Empty');
const {IFrame} = require('./site/_shortcodes/IFrame');
const {Glitch} = require('./site/_shortcodes/Glitch');
const {AndroidBrowserSupportTable} = require('./site/_shortcodes/AndroidBrowserSupportTable');
const {Hreflang} = require('./site/_shortcodes/Hreflang');
const {Img} = require('./site/_shortcodes/Img');
const {Label} = require('./site/_shortcodes/Label');
const {Video} = require('./site/_shortcodes/Video');
const {YouTube} = require('webdev-infra/shortcodes/YouTube');
const {Columns, Column} = require('./site/_shortcodes/Columns');
const {Compare, CompareCaption} = require('./site/_shortcodes/Compare');
const {Aside} = require('./site/_shortcodes/Aside');
const includeRaw = require('./site/_shortcodes/includeRaw');
const {LanguageList} = require('./site/_shortcodes/LanguageList');
const {Partial} = require('./site/_shortcodes/Partial');
const {ChromeDate} = require('./site/_shortcodes/ChromeDate');
const {BrowserCompat} = require('webdev-infra/shortcodes/BrowserCompat');

// Transforms
const {domTransformer} = require('./site/_transforms/dom-transformer-pool');
const {InlineCssTransform} = require('webdev-infra/transforms/inlineCss');
const {MinifyHtmlTransform} = require('webdev-infra/transforms/minifyHtml');

// Plugins
const md = require('./site/_plugins/markdown');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Supported locales
const locales = require('./site/_data/site.json').locales;

// Collections
const algoliaCollection = require('./site/_collections/algolia');
const authors = require('./site/_collections/authors');
const feedsCollection = require('./site/_collections/feeds');
const tagsCollection = require('./site/_collections/tags');
const directoryCollection = require('./site/_collections/directory');
const extensionsReferenceCollection = require('./site/_collections/reference');
const { pastEvents, currentEvents, eventTags } = require('./site/_collections/events');

// Create a helpful environment flags
const isProduction = process.env.NODE_ENV === 'production';

module.exports = eleventyConfig => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  // We do this so we can have gulp put compiled css into our _includes/css
  // directory. We want to .gitignore this compiled css, but we want eleventy
  // to use it for its build.
  eleventyConfig.setUseGitIgnore(false);

  // Watch our external data in case it is synchronized or rebuilt.
  eleventyConfig.addWatchTarget('./external/data/');

  // Merge eleventy's data cascade. This means directory data files will
  // cascade down to any child directories.
  eleventyConfig.setDataDeepMerge(true);

  // Copy binary assets over to the dist/ directory.
  // images should ideally be uploaded to our CDN but if, for whatever reason,
  // they can't be, then this passthrough copy will pick them up.
  eleventyConfig.addPassthroughCopy('site/en/**/*.{jpg,jpeg,png,webp,gif}');

  // Make .yml files work in the _data directory.
  eleventyConfig.addDataExtension('yml', contents => yaml.load(contents));

  // Configure markdown-it plugins
  eleventyConfig.setLibrary('md', md);

  // Add plugins
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add collections
  locales.forEach(locale => {
    directoryCollection.add(eleventyConfig, locale, 'blog');
    directoryCollection.add(eleventyConfig, locale, 'articles');
  });
  eleventyConfig.addCollection('algolia', algoliaCollection);
  eleventyConfig.addCollection('authors', authors);
  eleventyConfig.addCollection('feeds', feedsCollection);
  eleventyConfig.addCollection('tags', tagsCollection);
  eleventyConfig.addCollection('reference', extensionsReferenceCollection);
  eleventyConfig.addCollection('partials', (collections) => {
    return collections
        .getFilteredByGlob('./site/*/_partials/**/*')
  });
  eleventyConfig.addCollection('currentEvents', currentEvents);
  eleventyConfig.addCollection('pastEvents', pastEvents);
  eleventyConfig.addCollection('eventTags', eventTags);

  // Add filters
  eleventyConfig.addFilter('absolute', absolute);
  eleventyConfig.addFilter('embededDoc', embededDoc);
  eleventyConfig.addFilter('trailingSlash', trailingSlash);
  eleventyConfig.addFilter('leadingAndTrailingSlash', leadingAndTrailingSlash);
  eleventyConfig.addFilter('stripDefaultLocale', stripDefaultLocale);
  eleventyConfig.addFilter('i18n', i18n);
  eleventyConfig.addFilter('githubLink', githubLink);
  eleventyConfig.addFilter('md', mdFilters.render);
  eleventyConfig.addFilter('mdInline', mdFilters.renderInline);
  eleventyConfig.addFilter('namespaceToPath', namespaceToPath);
  eleventyConfig.addFilter('updateSvgForInclude', updateSvgForInclude);
  eleventyConfig.addFilter('slugify', slugify);
  eleventyConfig.addFilter('toc', toc);
  eleventyConfig.addFilter('ensureUniqueHrefInProduction', ensureUniqueHrefInProduction);
  eleventyConfig.addFilter('typeof', x => typeof x);
  eleventyConfig.addNunjucksAsyncFilter('minifyHtml', minifyHtml);

  // Add shortcodes
  eleventyConfig.addShortcode('AndroidBrowserSupportTable', AndroidBrowserSupportTable);
  eleventyConfig.addShortcode('InlineCss', InlineCss);
  eleventyConfig.addShortcode('Codepen', Codepen);
  eleventyConfig.addShortcode('IFrame', IFrame);
  eleventyConfig.addShortcode('Glitch', Glitch);
  eleventyConfig.addShortcode('Hreflang', Hreflang);
  eleventyConfig.addShortcode('Img', Img);
  eleventyConfig.addShortcode('Video', Video);
  eleventyConfig.addShortcode('YouTube', YouTube);
  eleventyConfig.addShortcode('includeRaw', includeRaw);
  eleventyConfig.addPairedShortcode('Blockquote', Blockquote);
  eleventyConfig.addPairedShortcode('Details', Details);
  eleventyConfig.addPairedShortcode('DetailsSummary', DetailsSummary);
  eleventyConfig.addPairedShortcode('Columns', Columns);
  eleventyConfig.addPairedShortcode('Column', Column);
  eleventyConfig.addPairedShortcode('Compare', Compare);
  eleventyConfig.addPairedShortcode('CompareCaption', CompareCaption);
  eleventyConfig.addPairedShortcode('Aside', Aside);
  eleventyConfig.addPairedShortcode('Label', Label);
  eleventyConfig.addShortcode('LanguageList', LanguageList);
  eleventyConfig.addShortcode('BrowserCompat', BrowserCompat);
  eleventyConfig.addNunjucksAsyncShortcode('Partial', Partial);
  eleventyConfig.addShortcode('ChromeDate', ChromeDate);

  // Empty shortcodes. They are added for backward compatibility with web.dev.
  // They will not render any html, but will prevent the build from failing.
  eleventyConfig.addShortcode('Widget', Empty);
  eleventyConfig.addShortcode('CodePattern', Empty);

  // Add transforms
  eleventyConfig.addTransform('domTransformer', domTransformer);

  // Only minify HTML and inline CSS if we are in production because it slows
  // builds _right_ down.
  //
  // !!! Important !!!
  // These transforms should _always_ go last because they look at the final
  // HTML for the page and inline CSS / minify.
  if (isProduction) {
    eleventyConfig.addTransform('inlineCss', (new InlineCssTransform()).configure({
      cssBasePath: path.join(__dirname, 'dist'),
      jsPaths: [
        // split forces forward slashes on Windows which are necessary
        // for fast-glob.
        path.join(__dirname, 'dist/js/**/*.js').split(path.sep).join('/')
      ],
      pool: true,
      insert: (content, result) => {
        return content.replace('</head>', `<style>${result}</style></head>`)
      }
    }));

    eleventyConfig.addTransform('minifyHtml', (new MinifyHtmlTransform()).configure({}));
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

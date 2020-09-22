const path = require('path');
const i18nDirectory = 'i18n';

/**
 * An i18n helper to be used with Eleventy's eleventyComputed data feature.
 * Localized content lives in the /i18n/ directory (e.g. /i18n/es/) but we
 * don't want the urls to contain "i18n" so this function removes them.
 * Importantly, it does so at the permalink level so it defines both where
 * the files get output to (e.g. /dist/es) and it defines what that post's
 * `url` is. This last point is important because we often loop through
 * Eleventy collections and use the urls from the posts that we find.
 * @param {Object} data An eleventy file data object.
 * @return {string} A permalink without the i18n prefix.
 */
const permalink = data => {
  // data.permalink could be false so explicity check that it's not an
  // empty string.
  if (data.permalink !== '') {
    // If needed, we can use this conditional to modify the permalink for
    // pages that define their permalink in their YAML.
    // We might do this if we need to do some i18n magic to the permalink.
    // For now we'll just return the permalink that's defined in the YAML.
    return data.permalink;
  }

  const extension = path.extname(data.page.inputPath);
  let permalink = data.page.filePathStem.split(path.sep);
  const idx = permalink.indexOf(i18nDirectory);
  if (idx !== -1) {
    // Drop the i18n directory.
    permalink = path.join('/', permalink.slice(idx + 1).join(path.sep));
    // If the input file is markdown or nunjucks, then the output should be html.
    // For anything else (json, etc) use its provided extension.
    if (extension === '.md' || extension === '.njk') {
      permalink += '.html';
    } else {
      permalink += extension;
    }
  } else {
    throw new Error(
      `Could not find i18n prefix for file ${data.page.inputPath}`
    );
  }

  return permalink;
};

module.exports = {permalink};

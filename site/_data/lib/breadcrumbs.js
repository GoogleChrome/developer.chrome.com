/**
 * @fileoverview Generates breadcrumbs from a current EleventyData object.
 */

const path = require('path');
const {findByUrl} = require('./find');
const {i18n} = require('../../_filters/i18n');
const tocIndex = require('../../_data/docs/tocIndex');

// Show at most this many breadcrumbs.
const BREADCRUMBS_MAX_LENGTH = 3;

/**
 * Helper to build breadcrumbs. Aggregates data until the specified length.
 */
class BreadcrumbBuilder {
  /**
   * @param {function(string): EleventyCollectionItem|undefined} find
   * @param {number=} maxLength
   */
  constructor(find, maxLength = 0) {
    this._find = find;
    this._maxLength = maxLength;

    /** @type {Breadcrumb[]} */
    this._output = [];
  }

  get done() {
    return this._maxLength && this.length >= this._maxLength;
  }

  get length() {
    return this._output.length;
  }

  /**
   * @param {string} url to insert into breadcrumbs
   * @param {string=} locale to prepend to URL
   * @return {EleventyCollectionItem|undefined}
   */
  pushPage(url, locale) {
    if (this.done) {
      return;
    }
    if (locale) {
      url = path.join('/', locale, '/', url);
    }
    const post = this._find(url);
    if (post) {
      this.push({title: post.data.title, url});
    }
    return post;
  }

  /**
   * @param {{url?: string, title?: string}} breadcrumb to insert
   * @param {string=} locale to prepend to URL
   */
  push({url, title}, locale) {
    if (this.done || !title) {
      return;
    }
    if (url && locale) {
      url = path.join('/', locale, '/', url);
    }
    this._output.push({url, title});
  }

  /**
   * @param {string} absoluteUrl to calculate breadcrumbs relative to
   * @return {Breadcrumb[]}
   */
  build(absoluteUrl) {
    return this._output.map(({url, title}) => {
      if (url) {
        const relativeUrl = path.relative(absoluteUrl, url);
        return {url: relativeUrl, title};
      }
      return {title};
    });
  }
}

/**
 * Generates the list of breadcrumbs for a given page (provided via Eleventy
 * context). Does not limit the output array size.
 *
 * The passed forUrl should look like "/LOCALE/path/to/URL".
 *
 * This is exported for testing.
 *
 * @param {string} forUrl
 * @param {BreadcrumbBuilder} builder
 * @param {AllProjectIndex} tocIndex
 */
const buildAllBreadcrumbs = (forUrl, builder, tocIndex) => {
  forUrl = path.join(forUrl, '/');
  const sourceParts = forUrl.split(path.sep);
  const locale = sourceParts[1];
  let pos = 3;

  const insertFromIndex = projectIndex => {
    // Skip the language prefix and do a reverse search for this path inside the
    // TOC. For example, with a TOC that contains:
    //  sections:
    //    - url: /docs/_example/foo
    // Looking up a URL "/docs/_example/foo/bar/" will match the parent key.
    // This basically ensures the site doesn't have completely orphaned nodes,
    // if folks don't include them in the complete TOC.
    let cand = '';
    for (let j = sourceParts.length - 1; j >= pos; --j) {
      cand = path.sep + sourceParts.slice(2, j).join(path.sep) + path.sep;
      if (cand in projectIndex) {
        pos = j; // resume from later
        break;
      }
    }

    // The index contains i18n keys, so look them up for our current language
    // and insert into the breadcrumb array.
    const suffix = projectIndex[cand] ?? [];
    suffix.forEach(part => {
      if (part.url) {
        // It's possible for the TOC to contain URLs that contain other URLs.
        if (builder.pushPage(part.url, locale)) {
          return;
        }
      }
      const breadcrumb = {
        title: i18n(part.title, locale),
        url: part.url,
      };
      builder.push(breadcrumb, locale);
    });
  };

  // We start at the 3rd index: "/en/foo". This skips including a breadcrumb
  // for the top-level link.
  while (pos < sourceParts.length - 1) {
    const merged = sourceParts.slice(0, pos).join(path.sep);
    const post = builder.pushPage(merged);
    ++pos;

    // This is part of a project which has a TOC. Load our index to find this
    // page, which will give us the path components to include in breadcrumbs.
    if (post?.data.project_key) {
      const projectKey = post.data.project_key;
      insertFromIndex(tocIndex[projectKey] ?? {});
    }
  }

  // Finally, optionally insert ourself. This currenly just happens for entries
  // under the locale (first segment), e.g. "/en/docs/" for Documentation.
  // Arguably, we shouldn't show breadcrumbs at all on these pages, but well,
  // here we are just in case.
  const insertSelf = sourceParts.length > 3 && builder.length === 0;
  if (insertSelf) {
    builder.pushPage(forUrl);
  }
};

/**
 * @param {string} forUrl
 * @param {EleventyCollectionObject} collections
 * @return {Breadcrumb[]}
 */
const buildBreadcrumbs = (forUrl, collections) => {
  if (!forUrl) {
    return [];
  }

  const findHelper = url => findByUrl(collections.all, url);
  const builder = new BreadcrumbBuilder(findHelper, BREADCRUMBS_MAX_LENGTH);

  buildAllBreadcrumbs(forUrl, builder, tocIndex);
  return builder.build(forUrl);
};

module.exports = {BreadcrumbBuilder, buildBreadcrumbs, buildAllBreadcrumbs};

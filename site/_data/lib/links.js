const path = require('path');

/**
 * Returns back some attributes based on whether the link is active or a parent
 * of an active item.
 *
 * @param {string} itemUrl The link in question
 * @param {string} pageUrl The page context
 * @return {string|undefined} The attributes or empty
 */
function getLinkActiveState(itemUrl, pageUrl) {
  if (!itemUrl || !pageUrl) {
    return;
  }

  // This shouldn't happen in practice (11ty always gives us URLs with trailing
  // slashes) but add this for sanity.
  itemUrl = path.join(itemUrl, '/');
  pageUrl = path.join(pageUrl, '/');

  if (itemUrl === pageUrl) {
    return ' data-state="active" aria-current="page"';
  } else if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
    // TODO(samthor): This creates no styles on its own right now.
    return ' data-state="active"';
  }
  return;
}

/**
 * @type {{
 *   sections?: Section[],
 *   url?: string,
 *   parent: SectionLinkItem|undefined,
 *   active: boolean,
 * }}
 */
// eslint-disable-next-line no-unused-vars
let SectionLinkItem;

/**
 * Expands all sections for display in the TOC. This also finds the best match
 * for the passed pageUrl, including partial matches (useful for generated
 * pages).
 *
 * @param {Section[]} sections
 * @param {string} pageUrl
 * @param {string} locale
 * @return {SectionLinkItem[]|undefined}
 */
function expandSections(sections, pageUrl, locale) {
  if (!pageUrl) {
    return;
  }

  /** @type {SectionLinkItem|undefined} */
  let target;
  let matchLength = 0;

  const internalExpand = curr => {
    if (curr.url) {
      const check = path.join('/', locale, '/', curr.url, '/');
      if (check === pageUrl) {
        target = curr;
        matchLength = pageUrl.length;
      }

      // If we don't have an exact match, update the best match.
      if (check.length > matchLength && matchLength < pageUrl.length) {
        if (pageUrl.startsWith(check)) {
          matchLength = check.length;
          target = curr;
        }
      }
    }

    for (const section of curr.sections ?? []) {
      section.parent = curr;
      internalExpand(section);
    }
  };

  // We clone the input sections so they're not modified for the next page.
  /** @type {SectionLinkItem[]} */
  const clone = JSON.parse(JSON.stringify(sections));
  for (const section of clone) {
    internalExpand(section);
  }

  // mark the chain as active. This is the only reason we need parent.
  while (target) {
    target.active = true;
    target = target.parent;
  }

  return clone;
}

/**
 * Checks if a link starts with a protocol and returns true if it does.
 * @param {string} link
 * @return {boolean}
 */
const isExternalLink = link => /^https?:\/\//.test(link);

module.exports = {
  getLinkActiveState,
  expandSections,
  isExternalLink,
};

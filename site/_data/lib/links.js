/**
 * Returns back some attributes based on whether the
 * link is active or a parent of an active item
 *
 * @param {String} itemUrl The link in question
 * @param {String} pageUrl The page context
 * @returns {String} The attributes or empty
 */
function getLinkActiveState(itemUrl, pageUrl) {
  if (itemUrl === pageUrl) {
    return ' data-state="active" aria-current="page"';
  }

  if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
    return ' data-state="active"';
  }
}

module.exports = {
  getLinkActiveState,
};

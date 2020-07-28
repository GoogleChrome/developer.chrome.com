/**
 * Returns back some attributes based on whether the
 * link is active or a parent of an active item.
 * It's recommended that both arguments use trailing slashes.
 * This will prevent /x from appearing to be a parent of /xy/
 *
 * @param {string} itemUrl The link in question
 * @param {string} pageUrl The page context
 * @returns {string} The attributes or empty
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

/**
 * @fileoverview This makes sure the ids of page sections are unique
 *
 * This follows a couple of rules:
 *   - we store each section id in an array
 *   - if the section id is already in the array, counts its occurences and makes the id unique using that number
 *   - otherwise just returns the id we passed to the filter
 *
 */

const pageIds = [];

/**
 * @param {string} id of the section
 * @param {string} url of the page
 * @return {string} unique id for the section
 */

function ensureUniqueHref(id, url) {
  const idUrl = `${url}#${id}`;

  if (pageIds.includes(idUrl)) {
    const count = pageIds.filter(item => {
      return item === idUrl;
    }).length;

    pageIds.push(idUrl);

    return `${id}-${count}`;
  }

  pageIds.push(idUrl);
  return id;
}

module.exports = {
  ensureUniqueHref,
};

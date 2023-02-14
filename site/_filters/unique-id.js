/**
 * @fileoverview This makes sure the ids of landing pages sections are unique within the page
 *
 * This follows a couple of rules:
 *   - we store each section id in an array
 *   - if the section id is already in the array, counts its occurences and makes the id unique using that number
 *   - otherwise just returns the id we passed to the filter
 *
 */

//initialise a global array to keep track of used ids
const pageIds = [];

/**
 * @param {string} id of the section
 * @param {string} url of the page
 * @return {string} unique id for the section
 */

function uniqueId(id, url) {
  // compose the url that points directly to that section
  const idUrl = `${url}#${id}`;

  // check if the id has already been used on that page
  if (pageIds.includes(idUrl)) {
    // counts how many times that id has been used
    const count = pageIds.filter(item => {
      return item === idUrl;
    }).length;

    //adds this section id to the array
    pageIds.push(idUrl);

    // returns a unique id
    return `${id}-${count}`;
  } else {
    //adds this section id to the array
    pageIds.push(idUrl);

    // returns a unique id
    return id;
  }
}

module.exports = {
  uniqueId,
};

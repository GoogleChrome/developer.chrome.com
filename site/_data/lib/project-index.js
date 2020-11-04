const path = require('path');

/**
 * @param {Section[]} sections
 * @return {ProjectIndex}
 */
const buildProjectIndex = sections => {
  /**
   * @type {ProjectIndex}
   */
  const index = {};

  /**
   * @param {Section} section
   * @param {...ProjectIndexEntry} chain
   */
  const recurse = (section, ...chain) => {
    if (section.url) {
      const url = path.join(section.url, '/');
      index[url] = chain;
    }
    if (!section.sections?.length) {
      return;
    }

    // Clone the relevant properties rather than holding onto a larger object.
    const next = {
      url: section.url,
      title: section.title,
    };
    section.sections.forEach(s => recurse(s, ...chain, next));
  };

  for (const section of sections) {
    recurse(section);
  }

  return index;
};

module.exports = {buildProjectIndex};

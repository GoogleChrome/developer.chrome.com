const path = require('path');

/**
 * Converts relative paths in section yaml files into nested paths.
 *
 * If your yaml looks like this:
 *    - url: hello
 *      sections:
 *      - url: world
 *
 * Calling `sectionify(myYaml, '/docs/extension')` will return:
 *
 *    {
 *     url: /docs/extensions/hello
 *     sections: [
 *       { url: /docs/extensions/hello/world }
 *     ]
 *    }
 *
 * @param {Section[]} array An array of section objects whose paths will be updated.
 * @param {string} parent An absolute parent path to nest all child paths under.
 * @return {Section[]}
 */
const sectionify = (array, parent) => {
  const out = /** @type {Section[]} */ ([]);

  if (!path.isAbsolute(parent)) {
    throw new Error('parent argument must be an absolute path.');
  }

  for (const child of array) {
    const node = /** @type {Section} */ ({});
    let url = child.url;
    // If the url is an absolute path, or starts with http(s)://
    // then use the url as is.
    // Otherwise, combine the url with its parent to create a nested path.
    if (!path.isAbsolute(url) && !url.match(/^https?:\/\//)) {
      url = path.join(parent, child.url);
    }

    node.url = url;

    if (child.sections && child.sections.length) {
      node.sections = sectionify(child.sections, url);
    }

    out.push(node);
  }

  return out;
};

module.exports = {sectionify};

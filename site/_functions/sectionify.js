const path = require('path');
const yaml = require('require-yml');

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
    if (path.isAbsolute(url)) {
      // Ensure absolute paths end in a trailing slash
      url = path.join(url, '/');
    } else if (url.match(/^https?:\/\//)) {
      // no-op for paths that start with a protocol.
      // We assume these are external links.
    } else {
      url = path.join(parent, child.url, '/');
    }

    node.url = url;

    if (child.sections && child.sections.length) {
      node.sections = sectionify(child.sections, url);
    }

    out.push(node);
  }

  return out;
};

/**
 * Takes a path to section data and grabs the matching yaml. Returns section
 * info with properly nested url paths.
 * @param {string} sectionPath The location in the _data directory to find the
 * section information. This argument will double as the url prefix sent to
 * the sectionify() function.
 * @param {string} pathOverride Only used for testing. This override will look
 * for a specific file path and ignore sectionPath.
 * @return {Section[]}
 */
const getSections = (sectionPath, pathOverride = '') => {
  let sections;
  if (pathOverride) {
    sections = yaml(pathOverride);
  } else {
    /* istanbul ignore next */
    sections = yaml(path.join(__dirname, '../_data', `${sectionPath}.yml`));
  }
  return sectionify(sections, sectionPath);
};

module.exports = {sectionify, getSections};

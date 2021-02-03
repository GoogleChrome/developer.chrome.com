const types = require('../../../../_collections/types.json');
const striptags = require('striptags');

const indexedTypes = {};
for (const type of types) {
  const {shortName} = type;
  indexedTypes[shortName] = type;
}

/**
 * Strips HTML tags and newlines for use as a meta attribute.
 *
 * @param {string|undefined} raw
 * @return {string}
 */
function stripForMeta(raw) {
  if (!raw) {
    return '';
  }
  let work = striptags(raw);
  work = work.replace(/\n/g, ' ');
  work = work.replace(/\s+/g, ' ');
  return work;
}

/**
 * Finds the RenderNamespace for the specified API.
 *
 * @param {{api: string}} param
 * @return {RenderNamespace|undefined}
 */
function namespaceForData({api}) {
  if (!api) {
    return undefined;
  }
  if (api in indexedTypes) {
    return indexedTypes[api];
  }
  throw new Error(
    `cannot build, reference "api: ${api}" ` +
      'is missing from types (run `npm run types`?)'
  );
}

module.exports = {
  eleventyComputed: {
    namespace: data => {
      return namespaceForData(data);
    },

    layout: data => {
      if (data.layout) {
        return data.layout; // don't clobber existing values
      }

      // Otherwise, if we're a namespace, use a predefined layout.
      const namespace = namespaceForData(data);
      if (namespace) {
        return 'layouts/namespace-reference.njk';
      }
      return data.layout;
    },

    title: data => {
      const namespace = namespaceForData(data);

      // We can't use ?? here, as `data.title` is the empty string if missing.
      return data.title || namespace?.fullName || '?';
    },

    description: data => {
      if (!data.api || data.description) {
        return data.description;
      }
      const namespace = namespaceForData(data);
      return stripForMeta(namespace?.comment);
    },
  },
};

const striptags = require('striptags');

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
 * @param {{api: string, chromeApiNamespaces: {[name: string]: RenderNamespace}}} data
 * @return {RenderNamespace=}
 */
function namespaceForData(data) {
  const {api, chromeApiNamespaces} = data;
  if (!api) {
    return undefined;
  } else if (api in chromeApiNamespaces) {
    return chromeApiNamespaces[api];
  }

  // This can be called several times by Eleventy. The first time it's called it's unlikely that
  // the namespace data is available yet, so we can't warn here if it's missing.
  return undefined;
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
      return data.title || namespace?.name || '?';
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

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
  }

  const canonicalApi = `chrome.${api}`;
  if (canonicalApi in chromeApiNamespaces) {
    return chromeApiNamespaces[canonicalApi];
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

    /**
     * Finds all permissions, both specified in the .d.ts and any additional permissions
     * specified here inside the front matter.
     *
     * @return {string[]}
     */
    permissions: data => {
      const extraPermissions = data.extra_permissions ?? [];
      const namespacePermissions = data.namespace?.permissions ?? [];

      const all = new Set([...extraPermissions, ...namespacePermissions]);
      const out = [...all];
      out.sort();
      return out;
    },

    /**
     * @return {string}
     */
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

    /**
     * @return {string}
     */
    title: data => {
      const namespace = namespaceForData(data);

      // We can't use ?? here, as `data.title` is the empty string if missing.
      return data.title || namespace?.fullName || '?';
    },

    /**
     * @return {string}
     */
    description: data => {
      if (!data.api || data.description) {
        return data.description;
      }
      const namespace = namespaceForData(data);
      return stripForMeta(namespace?.comment);
    },
  },
};

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
 * @param {{api: string, chromeApiNamespaces: {[name: string]: any}}} data
 * @return {any=}
 */
function namespaceForData(data) {
  const {api, chromeApiNamespaces} = data;
  if (!api) {
    return undefined;
  }

  // This can be called several times by Eleventy because the data gets resolved in an odd order.
  // It's fine to return undefined here, and we don't want to log (since it'll be spammy), and
  // we'll be called again if we previously returned undefined.
  return chromeApiNamespaces[api];
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
      if (data.api) {
        return 'layouts/namespace-reference.njk';
      }

      // Every item in this folder should either be displaying an API (and have `data.api` set) or
      // have a specific layout override, so throw otherwise.
      throw new Error(`API reference page has no data.layout: ${data.layout}`);
    },

    /**
     * @return {string}
     */
    title: data => {
      const namespace = namespaceForData(data);
      if (data.title) {
        return data.title;
      }
      return namespace?.name ?? '?';
    },

    /**
     * @return {string}
     */
    description: data => {
      if (!data.api || data.description) {
        return data.description;
      }
      const namespace = namespaceForData(data);
      return stripForMeta(namespace?.description);
    },
  },
};

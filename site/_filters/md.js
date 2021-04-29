/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This renders Markdown found inside the Chrome types data. It specifically cares
 * about types as it resolves `{@link ...}` references found inside comments.
 */

const md = require('markdown-it')();

const linkMatch = /{@link (\S+?)(|\s+.+?)}/g;

/**
 * Resolves a reference to another type from within Chrome APIs extensions docs.
 *
 * Refs are sourced directly from code, and may appear as e.g., "events.Event" or "lastError".
 *
 * @param {string} ref
 * @return {string|undefined}
 * @this {any}
 */
function modelToHref(ref) {
  const namespace = this.ctx.namespace;
  if (namespace === undefined) {
    // This occurs on pages like the top-level reference page which has no specific current API.
    // We could link through to the sub-pages from the description notices.
    return undefined;
  }

  const parts = ref.split('.');
  let property = namespace.all[parts[0]];
  let otherNamespace;

  if (!property) {
    // If we can't resolve this locally, then try to match it against another namespace.
    const {chromeApiNamespaces} = this.ctx;
    if (!chromeApiNamespaces) {
      return;
    }
    otherNamespace = chromeApiNamespaces[parts[0]];
    if (!otherNamespace) {
      return;
    }
    property = otherNamespace.all[parts[1]];
    if (!property) {
      return;
    }
  }

  /** @type {string} */
  let prefix;
  if (property.type.key === 'function') {
    prefix = 'method';
  } else if (
    property.type.key === 'ref' &&
    property.type.name === 'events.Event'
  ) {
    prefix = 'event';
  } else if (property.isType) {
    prefix = 'type';
  } else {
    prefix = 'property';
  }

  let href = otherNamespace
    ? `../${otherNamespace.name.replace(/\./g, '_')}/`
    : '';
  href += `#${prefix}-${property.name}`;

  return href;
}

function updateAtLink(content, resolver) {
  return content.replace(linkMatch, (_, link, text) => {
    if (!text) {
      text = `\`${link}\``;
    }

    const href = resolver(link);
    if (href) {
      return `[${text}](${href})`;
    }
    return text;
  });
}

/**
 * Render content as markdown. Does not incorporate any site-specific Markdown behavior.
 *
 * @param {string?} content
 * @return {string|undefined}
 * @this {any}
 */
function render(content) {
  if (!content) {
    return;
  }

  const resolver = modelToHref.bind(this);
  content = updateAtLink(content, resolver);
  return md.render(content);
}

/**
 * Render content as inline markdown. Does not incorporate any site-specific Markdown behavior.
 *
 * @param {string?} content
 * @return {string|undefined}
 * @this {any}
 */
function renderInline(content) {
  if (!content) {
    return;
  }

  const resolver = modelToHref.bind(this);
  content = updateAtLink(content, resolver);
  return md.renderInline(content);
}

module.exports = {render, renderInline, modelToHref};

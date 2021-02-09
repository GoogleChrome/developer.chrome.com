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

const typedocModels = require('typedoc/dist/lib/models');
const {
  resolveLink,
  closest,
  fullName,
} = require('chrome-types-helpers/lib/types');

const rk = typedocModels.ReflectionKind;

/**
 * These prefixes were used as the left-most component of a suffix to indicate that this actually
 * points at a real type. (Notably, on the 2012-2020 site, these often didn't resolve for complex
 * types).
 */
const historicResolvedPrefixes = ['type', 'event', 'property', 'type'];

/**
 *
 */
class CommentHelper {
  /**
   * @param {typedocModels.Reflection} owner
   */
  constructor(owner) {
    this._owner = owner;
    this._namespace = closest(owner, cand => cand.kind === rk.Namespace);
  }

  /**
   * @param {string} name
   * @return {typedocModels.Reflection|void}
   */
  resolveLink(name) {
    return resolveLink(this._owner, name);
  }

  /**
   * @param {typedocModels.Reflection} resolved
   * @return {string}
   */
  generateHref(resolved) {
    // TODO(samthor): This should really be done at a much later point, perhaps on site generation.

    const namespace = closest(resolved, cand => cand.kind === rk.Namespace);
    if (!namespace) {
      throw new Error(`could not find namespace for: ${fullName(resolved)}`);
    }

    const name = fullName(resolved);
    const namespaceName = fullName(namespace);
    if (!namespaceName.startsWith('chrome.')) {
      throw new Error(`got non-chrome namespace: ${name}`);
    }

    const slug = namespaceName.substr('chrome.'.length).replace(/\./g, '_');
    const leftPart = `/docs/extensions/reference/${slug}`;
    if (namespaceName === name) {
      return leftPart;
    }

    // Otherwise, generate an ID based on the type of the thing we're linking to, plus a path.
    // This matches the syntax used on the Chrome Developers site since 2012+.
    let mode = 'type';
    if (resolved.kind === rk.Function || resolved.kind === rk.Method) {
      mode = 'method';
    } else if (resolved.kind === rk.Variable || resolved.kind === rk.Property) {
      mode = 'property';

      // Events are just properties that have an instanceof chrome.event.Events.
      if (
        resolved instanceof typedocModels.DeclarationReflection &&
        resolved.type instanceof typedocModels.ReferenceType &&
        resolved.type.name === 'chrome.events.Event'
      ) {
        mode = 'event';
      }
    }

    const rest = name.substr(namespaceName.length).replace(/\./g, '-');
    return `${leftPart}/#${mode}${rest}`;
  }

  /**
   * @param {string} href
   * @return {typedocModels.Reflection|string}
   */
  resolveExistingHref(href) {
    let returnUnchanged = false;

    if (href.startsWith('/') || href.startsWith('../')) {
      returnUnchanged = true;
    }
    try {
      new URL(href);
      returnUnchanged = true;
    } catch (e) {
      // ignore
    }

    if (returnUnchanged) {
      const u = new URL(href, 'https://developer.chrome.com');
      if (u.protocol === 'http:') {
        // Force all clickable links to https:.
        u.protocol = 'https:';
      } else if (u.protocol !== 'https:') {
        return href; // not sure what this is
      }
      if (u.hostname !== 'developer.chrome.com') {
        return u.toString();
      }

      const extensionsUrlRe = /^\/(extensions|apps)\/([.a-zA-Z0-9_]+)(\.html)?(\/)?$/;
      const m = extensionsUrlRe.exec(u.pathname);
      if (!m) {
        // We didn't match a known URL, but at least get rid of the domain part.
        return u.pathname + u.search;
      }

      href = m[1] + u.search;
    }

    // TODO(samthor): Rather than trying to resolve bad hrefs here, we should do this as part of
    // chrome-types: it's the source data which is bad (direct links when they should {@link ...}).

    // eslint-disable-next-line prefer-const
    let [left, suffix = ''] = href.split('#');
    const rawSuffix = suffix ? `#${suffix}` : '';

    // Remove a trailing "/", ".html" or ".html/".
    left = left.replace(/(\.html)?\/?/, '');

    // Try to resolve the linked namespace. Pages look like "app_window"; try to resolve them.
    const name = left.replace(/_/g, '.');
    const resolvedNamespace = name ? this.resolveLink(name) : this._owner;

    // This isn't a matching namespace. Treat as URL go up twice; this puts it in general docs,
    // outside of reference code.
    if (!resolvedNamespace) {
      return `../../${left}/${rawSuffix}`;
    }

    if (!suffix) {
      return resolvedNamespace;
    }

    const parts = suffix.split('-');
    if (!historicResolvedPrefixes.includes(parts[0])) {
      // This wasn't intended to link to another type; include the link verbatim as it links
      // to an expected heading in the related namespace.
      if (resolvedNamespace === this._namespace) {
        return rawSuffix;
      }
      return `../${left}/${rawSuffix}`;
    }

    parts.shift(); // remove 0th, it's always "type-" or "property-"
    const cand = resolveLink(resolvedNamespace, parts.join('.'));
    if (cand) {
      return cand;
    }
    // As of Feb 2021, this actually doesn't occur in the types, but it would represent a
    // <a href="#type-Bar"> where Bar does not exist. Give up and reference the whole namespace.
    return resolvedNamespace;
  }
}

module.exports = {CommentHelper};

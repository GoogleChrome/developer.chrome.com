/*
 * Copyright 2020 Google LLC
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

const assert = require('assert');
const markdown = require('markdown-it');
const typedocModels = require('typedoc/dist/lib/models');

const rk = typedocModels.ReflectionKind;

const knownMagicNames = ['__call', '__type', '__index'];

const md = markdown({
  html: true,
  xhtmlOut: true,
});

/**
 * @param {typedocModels.DeclarationReflection} reflection
 * @param {typedocModels.ReflectionKind=} kindMask
 * @return {{[name: string]: typedocModels.DeclarationReflection}} short name mapped to reflection
 */
function exportedChildren(reflection, kindMask = 0) {
  /** @type {{[name: string]: typedocModels.DeclarationReflection}} */
  const all = {};

  for (const cand of reflection.children ?? []) {
    const {name} = cand;
    if (!(cand.kind & kindMask)) {
      continue;
    }
    all[name] = cand;
  }

  return all;
}

/**
 * @param {typedocModels.Comment|string|undefined} comment
 * @param {typedocModels.Reflection} owner
 * @param {boolean} ensureParagraphs
 * @return {string}
 */
function extractComment(comment, owner, ensureParagraphs = true) {
  let raw = '';

  if (!comment) {
    // do nothing
  } else if (typeof comment === 'string') {
    raw = comment;
  } else {
    // TypeDoc generates both a shortText and text field, which are the same parts of the comment,
    // but otensibly split on the first paragraph. Merge them before we render with Markdown.
    raw = (comment?.shortText ?? '') + '\n\n' + (comment?.text ?? '');
  }

  raw = raw.replace(/\{@link\s+([^}\s]+)\s*(.*?)}/gs, (_, id, note) => {
    const resolved = resolveLink(id, owner);

    const generated = generateHtmlLink(owner, resolved);
    if (generated === null) {
      return note ? note : `<code>${id}</code>`;
    }

    const {name, link} = generated;
    const inner = note ? note : `<code>${name}</code>`;
    return `<a href="${link}">${inner}</a>`;
  });

  // TODO(samthor): This should relavatize any found URLs, especially for i18n.

  if (ensureParagraphs) {
    return md.render(raw);
  }

  // We use this to get a short @deprecated message. It can technically be longer, but strip newlines
  // and remove the expected <p></p> wrapper if found.
  raw = raw.replace(/\n{2,}/gms, '\n');
  let out = md.render(raw);
  out = out.replace(/^<p>(.*)<\/p>$/gms, (_, inner) => {
    if (inner.includes('<p>')) {
      throw new Error(`could not generate inner comment, extra <p>: ${inner}`);
    }
    return inner;
  });
  return out;
}

/**
 * @param {RenderType|undefined} a
 * @param {RenderType|undefined} b
 * @return {boolean}
 */
function deepStrictEqual(a, b) {
  try {
    // @ts-ignore
    assert.deepStrictEqual(a, b);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Generates a HTML link from the given Reflection to the target Reflection, in the format expected
 * by the Chrome Developers site. All chrome.foo namespaces are in peer folders, so relative links
 * are required (e.g., from API 'foo' to 'bar', you would link '../bar/').
 *
 * @param {typedocModels.Reflection} from
 * @param {typedocModels.Reflection|undefined} to
 * @return {{link: string, name: string}?}
 */
function generateHtmlLink(from, to) {
  if (to === undefined) {
    return null;
  }

  // We're never linking _from_ a specific type; just modify 'from'.
  from = getNamespace(from);
  const fromName = fullName(from);

  const toNamespace = getNamespace(to);
  const toNamespaceName = fullName(toNamespace);

  // This should never happen, but sanity-check that we're both in the chrome. namespace.
  if (
    !fromName.startsWith('chrome.') ||
    !toNamespaceName.startsWith('chrome.')
  ) {
    return null;
  }

  let htmlPrefix = '';
  const shortNamespaceName = toNamespaceName.substr('chrome.'.length);
  if (from !== toNamespace) {
    const segment = shortNamespaceName.replace('.', '_');
    htmlPrefix = `../${segment}/`;
  }

  // This is a direct link to the namespace. Hooray!
  if (to === toNamespace) {
    return {link: htmlPrefix, name: shortNamespaceName};
  }

  // Otherwise, generate an ID based on the type of the thing we're linking to, plus a path.
  // This matches the syntax used on the Chrome Developers site since 2012+.
  let type = 'type';
  if (to.kind === rk.Function) {
    type = 'method';
  } else if (to.kind === rk.Variable) {
    type = 'property';

    // Events are just properties that have an instanceof chrome.event.Events.
    if (
      to instanceof typedocModels.DeclarationReflection &&
      to.type instanceof typedocModels.ReferenceType &&
      to.type.reflection &&
      fullName(to.type.reflection) === 'chrome.events.Event'
    ) {
      type = 'event';
    }
  }

  const toName = fullName(to);

  // This is the name of the targe type without "chrome.foo" prefixing it.
  const innerShortName = toName.substr(toNamespaceName.length + 1);
  const rest = innerShortName.replace('.', '-');

  const name = htmlPrefix ? toName.substr('chrome.'.length) : innerShortName;
  return {link: `${htmlPrefix}#${type}-${rest}`, name};
}

/**
 * Given an ambiguous "foo.Bar" syntax, resolve the closest type which matches it.
 *
 * @param {string} id
 * @param {typedocModels.Reflection} reflection
 * @return {typedocModels.Reflection|undefined}
 */
function resolveLink(id, reflection) {
  const idParts = id.split('.');

  /** @type {typedocModels.Reflection|undefined} */
  let r = reflection;

  while (r) {
    // TODO(samthor): This doesn't deal with _-prefixed things.

    /** @type {typedocModels.Reflection|undefined} */
    let cand = r;
    let i = 0;
    while (i < idParts.length && cand) {
      cand = cand?.getChildByName(idParts[i]);
      ++i;
    }
    if (cand) {
      return cand;
    }

    r = r.parent;
  }

  // Couldn't resolve this one.
  return undefined;
}

/**
 * Find the closest Namespace to the passed reflection.
 *
 * @param {typedocModels.Reflection} reflection
 * @return {typedocModels.Reflection}
 */
function getNamespace(reflection) {
  while (reflection.kind !== rk.Module) {
    if (reflection.kind === rk.Namespace) {
      return reflection;
    }
    if (!reflection.parent) {
      break;
    }
    reflection = reflection.parent;
  }
  return reflection;
}

/**
 * Generates the FQDN for this reflection.
 *
 * This is improved over TypeDoc's generation:
 *   - hides internal __call etc types
 *   - doesn't include the module/filename
 *
 * It's only useful for names within a specific project or module. Notably this works for Chrome
 * and friends because they declare a new global namespace, "chrome".
 *
 * @param {typedocModels.Reflection} reflection
 * @return {string}
 */
function fullName(reflection) {
  /** @type {typedocModels.Reflection|undefined} */
  let r = reflection;

  const parts = [];
  while (r && r.kind !== rk.Module && r.kind !== rk.Project) {
    const {parent} = r;

    // Insert "~" when this looks at the type or call bridge. This only happens when we record
    // the properties of a type or arguments to a function. Chrome's docs historically don't report
    // this information, instead only providing information on top-level types.
    if (r.name.startsWith('__')) {
      if (!knownMagicNames.includes(r.name)) {
        throw new Error(
          `unknown magic: ${r.name}, ${reflection.getFullName()}`
        );
      }
      if (parts.length && parts[0] !== '~') {
        parts.unshift('~');
      }
    } else {
      // If we have a node with a leading "_", see if there's a matching parent without it.
      // This solves our awkward approach to escaping, which exports e.g., the real type
      // "_debugger" under a friendly alias "debugger".
      if (/^_\w/.test(r.name)) {
        const checkName = r.name.slice(1);
        const check = r.parent?.getChildByName(checkName);
        r = check ?? r;
      }

      if (r.name.length) {
        parts.unshift(r.name);
      }
    }

    // If this is the _type_ of a CallSignature, then skip over it (duplicate name).
    if (
      r.kind === rk.CallSignature &&
      (parent?.kind === rk.Function || parent?.kind === rk.Method)
    ) {
      if (r.name !== parent.name) {
        throw new TypeError(
          `signature did not match function: ${r.name} vs ${parent.name}`
        );
      }
      r = parent.parent;
      continue;
    }

    r = r.parent;
  }

  // We insert `~` instead of magic names, but it ends up being displayed as `.~.`. Fix that and
  // use the property delimiter of '.'.
  return parts.join('.').replace(/\.~\./g, '.').replace(/^\./, '');
}

/**
 * Enumerates through an entire |RenderNamespace|.
 *
 * @param {RenderNamespace} namespace
 * @param {(rb: RenderBase, parent: RenderBase) => void} callback
 */
function enumerateAllRenderNamespace(namespace, callback) {
  /** @type {Set<RenderBase>} */
  const seen = new Set([namespace]);

  const all = [
    namespace.types,
    namespace.properties,
    namespace.methods,
    namespace.events,
  ]
    .flat()
    .map(rb => {
      return {parent: /** @type {RenderBase} */ (namespace), rb};
    });

  for (let i = 0; i < all.length; ++i) {
    const {rb, parent} = all[i];
    if (seen.has(rb)) {
      continue;
    }
    seen.add(rb);

    callback(rb, parent);

    const rawExtra = /** @type {RenderType[]} */ ([
      rb.elementType,
      rb.properties,
      rb.options,
      rb.parameters,
    ]
      .flat()
      .filter(Boolean));

    // TODO(samthor): We give the template in e.g. "chrome.event.Events" a name, but it's not
    // included in the version data. Remove it for now.
    for (const rt of rb.referenceTemplates ?? []) {
      rawExtra.push(...(rt.parameters ?? []));
    }

    const extra = rawExtra.map(child => {
      return {parent: rb, rb: child};
    });
    all.push(...extra);
  }
}

module.exports = {
  exportedChildren,
  extractComment,
  deepStrictEqual,
  fullName,
  generateHtmlLink,
  enumerateAllRenderNamespace,
};

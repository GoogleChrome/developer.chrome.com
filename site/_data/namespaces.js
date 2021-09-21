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

const typedoc = require('typedoc');
const fs = require('fs');
const path = require('path');

const namespacesCachePath = path.join(__dirname, 'namespaces-source.json');

/**
 * @typedef {{
 *   title: string,
 *   key: string,
 *   contents: typedoc.JSONOutput.DeclarationReflection[],
 * }}
 * @type {never}
 */
// eslint-disable-next-line no-unused-vars
let GenericNamespaceRenderGroupType;

/**
 * @typedef {{
 *   name: string,
 *   permalink: string,
 *   reflection: typedoc.JSONOutput.DeclarationReflection,
 *   groups: GenericNamespaceRenderGroupType[],
 * }}
 * @type {never}
 */
// eslint-disable-next-line no-unused-vars
let GenericNamespaceRenderType;

/**
 * @return {Promise<GenericNamespaceRenderType[]>}
 */
async function buildNamespaces() {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return [];
  }

  /** @type {typedoc.JSONOutput.DeclarationReflection[]} */
  let namespaces = [];
  try {
    namespaces = JSON.parse(fs.readFileSync(namespacesCachePath, 'utf-8'));
  } catch (e) {
    console.warn('Namespaces data not available, try running `TODO`...');
  }

  return namespaces.map(api => {
    const lastPart = path.basename(api.name);
    return {
      name: lastPart,
      permalink: `en/docs/tools/reference/${lastPart}/`,
      reflection: api,
      groups: splitToStandardGroups(api),
    };
  });
}

/**
 * This splits into standard groups like "classes", "types" and so on, that are displayed on our reference pages.
 *
 * TODO: TypeDoc actually has a notion of "groups" but we're ignoring it?
 *
 * TODO: for chrome types we split out "events", which are just vars but magical ✨
 *
 * @param {typedoc.JSONOutput.DeclarationReflection} node
 * @return {GenericNamespaceRenderGroupType[]}
 */
function splitToStandardGroups(node) {
  if (node.kind !== typedoc.ReflectionKind.Module) {
    throw new Error(
      `invalid source, expected module at top-level, got: ${node.kindString}`
    );
  }

  /** @type {GenericNamespaceRenderGroupType[]} */
  const groups = [];

  /** @type {(title: string, key: string) => ((node: typedoc.JSONOutput.DeclarationReflection) => void)} */
  const defineGroupAdder = (title, key) => {
    /** @type {GenericNamespaceRenderGroupType} */
    const group = {title, key, contents: []};
    groups.push(group);
    return node => group.contents.push(node);
  };

  const classAdd = defineGroupAdder('Classes', 'class');
  const propertyAdd = defineGroupAdder('Properties', 'property');
  const methodAdd = defineGroupAdder('Methods', 'method');

  for (const child of node.children ?? []) {
    switch (child.kind) {
      case typedoc.ReflectionKind.Class:
        classAdd(child);
        break;
      case typedoc.ReflectionKind.Function:
        // To TypeDoc, a Method is always something on an interface/class, but we use it to mean
        // part of the namespace/module.
        methodAdd(child);
        break;
      case typedoc.ReflectionKind.Variable:
        propertyAdd(child);
        break;
      default:
        console.warn('skipping child', child.name, child.kindString);
    }
  }

  // Only return groups that actually have something.
  return groups.filter(({contents}) => contents.length);
}

module.exports = buildNamespaces;

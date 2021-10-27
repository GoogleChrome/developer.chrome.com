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
 * @fileoverview This fetches and builds easily renderable type information from the NPM package
 * "chrome-types".
 *
 * This uses Eleventy's helper but directly accesses its cache objects. See here:
 *   https://www.11ty.dev/docs/plugins/cache/#manually-store-your-own-data-in-the-cache
 */

const path = require('path');
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
const typedoc = require('typedoc');

/**
 * @param {typedoc.JSONOutput.DeclarationReflection} root
 * @return {RenderGroup[]}
 */
function buildGroupsForRoot(root) {
  /** @type {RenderGroup[]} */
  const groups = [];

  /** @type {(title: string, prefix: string) => ((node: typedoc.JSONOutput.DeclarationReflection) => void)} */
  const defineGroupAdder = (title, prefix) => {
    /** @type {RenderGroup} */
    const group = {title, prefix, contents: []};
    groups.push(group);
    return node => group.contents.push(node);
  };

  const typesAdd = defineGroupAdder('Types', 'type');
  const propertyAdd = defineGroupAdder('Properties', 'property');
  const methodAdd = defineGroupAdder('Methods', 'method');
  const eventAdd = defineGroupAdder('Events', 'event');
  const otherAdd = defineGroupAdder('Other', 'other');

  const extendedRoot = /** @type {ExtendedReflection} */ (root);

  for (const child of Object.values(extendedRoot._type?.properties ?? {})) {
    const extended = /** @type {ExtendedReflection} */ (child);

    if (extended._event) {
      eventAdd(child);
      continue;
    }

    switch (extended.kind) {
      case typedoc.ReflectionKind.Class:
      case typedoc.ReflectionKind.Interface:
      case typedoc.ReflectionKind.TypeAlias:
      case typedoc.ReflectionKind.TypeLiteral:
        typesAdd(extended);
        break;
      case typedoc.ReflectionKind.Function:
        // To TypeDoc, a Method is always something on an interface/class, but we use it to mean
        // part of the namespace/module.
        methodAdd(extended);
        break;
      case typedoc.ReflectionKind.Variable:
        propertyAdd(child);
        break;
      default:
        otherAdd(child);
    }
  }

  for (const {contents} of groups) {
    contents.sort(({name: a}, {name: b}) => a.localeCompare(b));
  }

  // Only return groups that actually have contents.
  return groups.filter(({contents}) => contents.length);
}

module.exports = () => {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return {};
  }

  const chromeTypesFile = path.join(
    __dirname,
    '../../external/data/chrome-types.json'
  );

  /** @type {{[namespace: string]: ExtendedReflection}} */
  const parsed = JSON.parse(fs.readFileSync(chromeTypesFile, 'utf-8'));

  /** @type {{[namespace: string]: RenderNamespace}} */
  const withGroups = {};

  for (const [namespace, declaration] of Object.entries(parsed)) {
    withGroups[namespace] = {
      shortName: namespace,
      name: declaration._name,
      root: declaration,
      groups: buildGroupsForRoot(declaration),
    };
  }

  return withGroups;
};

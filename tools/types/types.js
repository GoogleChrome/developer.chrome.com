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

const {
  exportedChildren,
  generateTypeDocObjectOptions,
} = require('chrome-types-helpers/lib/types');
const typedocModels = require('typedoc/dist/lib/models/index.js');
const path = require('path');
const {declarationToType, prepareBase} = require('./converter.js');

/**
 * Finds all exported namespaces prefixed with "chrome." inside the passed project, and flattens
 * into a returned object.
 *
 * @param {typedocModels.ProjectReflection} project
 * @return {{[name: string]: typedocModels.DeclarationReflection}}
 */
function extractPublicChromeNamespaces(project) {
  /** @type {{[name: string]: typedocModels.DeclarationReflection}} */
  const out = {};

  /**
   * @param {typedocModels.DeclarationReflection} namespace
   * @param {string} prefix
   * @return {boolean} whether this was the terminal
   */
  const findContainedNamespaces = (namespace, prefix) => {
    const deep = exportedChildren(
      namespace,
      typedocModels.ReflectionKind.Namespace
    );
    if (Object.keys(deep).length === 0) {
      return true;
    }

    for (const name in deep) {
      const reflection = deep[name];
      const key = `${prefix}.${name}`;

      // Record this only if it was a terminal namespace and did not contain further nodes.
      if (findContainedNamespaces(reflection, key)) {
        out[key] = reflection;
      }
    }
    return false;
  };

  const chromeNamespace =
    /** @type {typedocModels.DeclarationReflection|undefined} */
    (project.getChildByName('chrome'));
  if (!chromeNamespace) {
    console.warn('project had children', project.children);
    throw new TypeError('expected module to contain `chrome`');
  }
  findContainedNamespaces(chromeNamespace, 'chrome');

  return out;
}

/**
 * @param {string} typesPath
 * @return {RenderNamespace[]}
 */
function parseChromeTypesFile(typesPath) {
  // TODO(samthor): We need to use TypeDoc in just the right way.
  const entryPoints = [typesPath];
  const projectReflection = generateTypeDocObjectOptions(
    entryPoints,
    {entryPoints},
    {declaration: true}
  );

  // Generate namespaces in isolation (e.g. `chrome.management` and so on).
  const namespaces = extractPublicChromeNamespaces(projectReflection);
  const flat = [];
  for (const fullName in namespaces) {
    const reflection = namespaces[fullName];
    if (!fullName.startsWith('chrome.')) {
      throw new Error(`got non-chrome namespace: ${fullName}`);
    }

    /** @type {RenderNamespace} */
    const renderNamespace = {
      shortName: fullName.substr('chrome.'.length),
      types: [],
      properties: [],
      methods: [],
      events: [],
      source: path.basename(typesPath),
    };
    prepareBase(renderNamespace, reflection);
    flat.push(renderNamespace);

    const permissions = [];
    const platforms = [];
    const tags = reflection?.comment?.tags ?? [];
    tags.forEach(({tagName, text}) => {
      switch (tagName) {
        case 'chrome-permission':
          permissions.push(text.trim());
          break;
        case 'chrome-platform':
          platforms.push(text.trim());
          break;
      }
    });
    if (permissions.length) {
      renderNamespace.permissions = permissions;
    }
    if (platforms.length) {
      renderNamespace.platforms = platforms;
    }

    // Extract types/properties/methods by finding different kinds of children from the namespace's
    // DeclarationReflection.
    const groups = [
      {
        target: renderNamespace.types,
        mask:
          typedocModels.ReflectionKind.Enum |
          typedocModels.ReflectionKind.TypeLiteral |
          typedocModels.ReflectionKind.TypeAlias |
          typedocModels.ReflectionKind.Interface,
      },
      {
        target: renderNamespace.methods,
        mask: typedocModels.ReflectionKind.Function,
      },
      {
        target: renderNamespace.properties,
        mask:
          typedocModels.ReflectionKind.Property |
          typedocModels.ReflectionKind.Variable,
      },
    ];
    for (const {target, mask} of groups) {
      const all = exportedChildren(reflection, mask);
      for (const name in all) {
        const rt = declarationToType(all[name]);
        target.push(rt);
      }
    }

    // Events are just properties that have an instanceof chrome.events.Events. Extract them and
    // include them separately.
    renderNamespace.properties = renderNamespace.properties.filter(property => {
      if (property.referenceType === 'events.Event') {
        renderNamespace.events.push(property);
        return false;
      }
      return true;
    });
  }

  // Returns as an already sorted Array.
  flat.sort(({shortName: a}, {shortName: b}) => a.localeCompare(b));
  return flat;
}

module.exports = {parseChromeTypesFile};

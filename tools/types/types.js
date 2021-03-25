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

/**
 * @fileoverview This converts from TypeDoc's JSON format to an internal representation for
 * display.
 */

const typedoc = require('typedoc');
const {LogLevel: TypeDocLogLevel} = require('typedoc/dist/lib/utils');
const {extractComment, exportedChildren} = require('./helpers');
const {declarationToType} = require('./converter');

/**
 * Generates the TypeDoc internal representation for the passed source. This invokes typedoc's
 * Application bundle and throws on failures.
 *
 * @param {string} source
 * @return {typedoc.ProjectReflection}
 */
function generateTypeDocProject(source) {
  const a = new typedoc.Application();
  a.bootstrap({
    entryPoints: [source],

    logger(message, level) {
      switch (level) {
        case TypeDocLogLevel.Warn:
        case TypeDocLogLevel.Error:
          throw new Error(`could not convert types: ${message}`);
      }
    },
  });
  a.options.setCompilerOptions([source], {declaration: true}, undefined);
  const reflection = a.convert();
  if (!reflection) {
    throw new Error('could not convert types, null return value');
  }
  return reflection;
}

/**
 * Finds all exported namespaces prefixed with "chrome." inside the passed project, and flattens
 * into a returned object.
 *
 * (If a namespace is exported under many names, it will appear many times, but this doesn't happen
 * in Chrome's types.)
 *
 * @param {typedoc.ProjectReflection} typesData
 * @return {{[name: string]: typedoc.DeclarationReflection}}
 */
function extractPublicChromeNamespaces(typesData) {
  /** @type {{[name: string]: typedoc.DeclarationReflection}} */
  const out = {};

  /**
   * @param {typedoc.DeclarationReflection} namespace
   * @param {string} prefix
   * @return {boolean} whether this was the terminal
   */
  const findContainedNamespaces = (namespace, prefix) => {
    const deep = exportedChildren(namespace, typedoc.ReflectionKind.Namespace);
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

  // Awkwardly extract the top-level "chrome" namespace.
  const chromeNamespace =
    /** @type {typedoc.DeclarationReflection|undefined} */
    (typesData.getChildByName('chrome'));
  if (!chromeNamespace) {
    throw new TypeError('expected module to contain `chrome`');
  }
  findContainedNamespaces(chromeNamespace, 'chrome');

  return out;
}

/**
 * @param {string} source
 * @param {string} fullName
 * @param {typedoc.DeclarationReflection} reflection
 * @return {RenderNamespace}
 */
function renderNamespaceFromNamespace(source, fullName, reflection) {
  const [, ...rest] = fullName.split('.');
  const shortName = rest.join('.');

  const permissions = [];
  const platforms = [];

  /** @type {RenderNamespace["channel"]} */
  let channel = 'stable';

  let minManifestVersion = 0;
  let maxManifestVersion = 0;

  const tags = reflection?.comment?.tags ?? [];
  tags.forEach(({tagName, text}) => {
    switch (tagName) {
      case 'beta':
        channel = 'beta';
        break;
      case 'alpha':
        channel = 'dev';
        break;
      case 'chrome-permission':
        permissions.push(text);
        break;
      case 'chrome-platform':
        platforms.push(text);
        break;
      case 'chrome-manifest-min':
        minManifestVersion = +text || 0;
        break;
      case 'chrome-manifest-max':
        maxManifestVersion = +text || 0;
        break;
    }
  });

  /** @type {RenderNamespace} */
  const renderNamespace = {
    name: shortName,
    fullName,
    comment: extractComment(reflection.comment, reflection),
    types: [],
    properties: [],
    methods: [],
    events: [],
    source,
    channel,
  };

  if (minManifestVersion) {
    renderNamespace.minManifestVersion = minManifestVersion;
  }
  if (maxManifestVersion) {
    renderNamespace.maxManifestVersion = maxManifestVersion;
  }

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
        typedoc.ReflectionKind.Enum |
        typedoc.ReflectionKind.TypeLiteral |
        typedoc.ReflectionKind.TypeAlias |
        typedoc.ReflectionKind.Interface,
    },
    {
      target: renderNamespace.methods,
      mask: typedoc.ReflectionKind.Function,
    },
    {
      target: renderNamespace.properties,
      mask: typedoc.ReflectionKind.Property | typedoc.ReflectionKind.Variable,
    },
  ];
  for (const {target, mask} of groups) {
    const all = exportedChildren(reflection, mask);
    for (const name in all) {
      const rt = declarationToType(all[name]);
      rt.name = name;
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

  return renderNamespace;
}

module.exports = {
  extractPublicChromeNamespaces,
  generateTypeDocProject,
  renderNamespaceFromNamespace,
};

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
const path = require('path');

const {LogLevel: TypeDocLogLevel} = require('typedoc/dist/lib/utils');

// TypeDoc doesn't export some of its internal types at the top-level, so just bring in the models.
// These are technically disused and just here for types inside JS comments.
// eslint-disable-next-line no-unused-vars
const typedocModels = require('typedoc/dist/lib/models');

/**
 * Generates the typedoc document of the specific .d.ts file.
 *
 * @param {string} source
 * @return {!typedoc.ProjectReflection}
 */
function generateTypeDocObject(source) {
  const a = new typedoc.Application();
  a.bootstrap({
    includeDeclarations: true,
    // TODO(samthor): TypeDoc tries to consume all types in this project, but we only want to load
    // the specific .d.ts file. We can't exclude */** as this catches the .d.ts we want.
    exclude: ['**/node_modules/**'],
    entryPoint: source,

    logger(message, level) {
      switch (level) {
        case TypeDocLogLevel.Warn:
        case TypeDocLogLevel.Error:
          throw new Error(`could not convert types: ${message}`);
      }
      console.info(message);
    },
  });

  const reflection = a.convert([source]);
  if (!reflection) {
    throw new Error('could not convert types, null return value');
  }
  return reflection;
}

/**
 * @param {!typedoc.ProjectReflection} typesData
 * @return {!typedoc.DeclarationReflection[]}
 */
function extractChromeNamespaces(typesData) {
  const {children: toplevelChildren = []} = typesData;
  if (toplevelChildren.length !== 1 || toplevelChildren[0].kind !== 1) {
    throw new TypeError('expected single top-level module');
  }

  const toplevel = toplevelChildren[0];

  const chromeNamespace =
    /** @type {typedoc.DeclarationReflection|undefined} */
    (toplevel.getChildByName('chrome'));
  if (!chromeNamespace) {
    throw new TypeError('expected module to contain `chrome`');
  }

  return chromeNamespace.children || [];
}

/**
 * @param {!typedocModels.Comment|undefined} comment
 * @return {string}
 */
function extractComment(comment) {
  if (comment) {
    return comment.shortText || comment.text || '';
  }
  return '';
}

/**
 * @param {!typedocModels.Type|undefined} raw
 * @return {string}
 */
function parseType(raw) {
  const {type} = raw || {type: ''};

  switch (type) {
    case 'intrinsic':
      return type['name'];
  }

  // TODO: do something sensible
  return '?';
}

/**
 * @param {!typedoc.DeclarationReflection} raw
 * @param {string} namespace
 */
function parseFunction(raw, namespace) {
  const {signatures = [], name} = raw;

  // This extracts the signature with the most parameters. This is an awkward mismatch between
  // TypeScript and Chrome's internal types: Chrome supports optional _middle_ arguments but TS
  // does not; so methods get expanded to all possible combinations.
  // For now, just grab the longest one.
  // TODO(samthor): Find missing parameters and mark them as optional when rendering.
  let bestParametersLength = 0;
  let bestSignature = signatures[0];
  signatures.forEach(signature => {
    const {parameters = []} = signature;
    if (parameters.length > bestParametersLength) {
      bestParametersLength = parameters.length;
      bestSignature = signature;
    }
  });

  const {comment, type: returnType, parameters = []} = bestSignature;

  const processedParameters = parameters.map(({name, type}) => ({
    name,
    type: parseType(type),
  }));

  const joinedParameters = processedParameters.map(({name}) => name).join(', ');
  const processedSignature = `${namespace}.${name}(${joinedParameters})`;

  return {
    name,
    signature: processedSignature,
    parameters: processedParameters,
    comment: extractComment(comment),
    returnType: parseType(returnType),
  };
}

module.exports = () => {
  const typesPath = path.join(__dirname, '../../types/chrome/test.d.ts');
  const typesData = generateTypeDocObject(typesPath);

  const namespaces = {};

  const namespacesArray = extractChromeNamespaces(typesData);
  namespacesArray.forEach(namespace => {
    if (namespace.kind !== 2) {
      return;
    }

    // Strip leading "_", to fix "_debugger".
    let {name} = namespace;
    name = name.replace(/^_*/, '');

    const {children = [], comment} = namespace;
    const out = {
      name,
      title: `chrome.${name}`,
      comment: extractComment(comment),
      types: /** @type {object[]} */ ([]),
      methods: /** @type {object[]} */ ([]),

      // TODO(samthor): We don't yet have this information.
      updated: '2020-01-01',
      release: 38,
    };

    for (const child of children) {
      switch (child.kind) {
        case typedoc.ReflectionKind.Function:
          out.methods.push(parseFunction(child, `chrome.${name}`));
          break;

        case typedoc.ReflectionKind.Enum:
          out.types.push({name: child.name});
          // TODO(samthor): Include enum type.
          break;

        case typedoc.ReflectionKind.Interface:
          out.types.push({name: child.name});
          // TODO(samthor): Properties are in 'children'.
          break;
      }
    }

    namespaces[name] = out;
  });

  // Returns as an already sorted Array.
  const flat = Object.values(namespaces);
  flat.sort(({name: a}, {name: b}) => a.localeCompare(b));
  return flat;
};

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

  return (chromeNamespace.children || []).filter(
    ({kind}) => kind === typedoc.ReflectionKind.Namespace
  );
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
 * @param {!typedocModels.DeclarationReflection} declaration
 * @return {RenderType}
 */
function buildDeclarationRenderType(declaration) {
  /** @type {RenderType} */
  const out = {
    name: declaration.name,
    type: '?',
  };
  if (declaration.comment) {
    out.comment = extractComment(declaration.comment);
  }

  if (declaration.type) {
    const out = buildRenderType(declaration.type, declaration.name);
    if (declaration.flags.hasFlag(typedoc.ReflectionFlag.Optional)) {
      out.optional = true;
    }
    return out;
  }

  switch (declaration.kind) {
    case typedoc.ReflectionKind.Function:
      Object.assign(out, parseFunction(declaration));
      out.type = 'function';
      break;

    case typedoc.ReflectionKind.Variable:
    case typedoc.ReflectionKind.Property: {
      const propertyType = buildRenderType(declaration.type, declaration.name);
      if (declaration.flags.hasFlag(typedoc.ReflectionFlag.Optional)) {
        propertyType.optional = true;
      }
      return propertyType;
    }

    case typedoc.ReflectionKind.TypeAlias:
      if (declaration.type) {
        const referenceType = /** @type {typedocModels.ReferenceType} */ (declaration.type);
        out.type = referenceType.name;
      }
      break;

    case typedoc.ReflectionKind.TypeLiteral:
      if (declaration.signatures) {
        // This is probably a callback.
        Object.assign(out, parseFunction(declaration));
        out.type = 'function';
        return out;
      }
      break;

    case typedoc.ReflectionKind.Namespace:
    case typedoc.ReflectionKind.Interface:
      break;

    default:
      // TODO(samthor): handle other types.
      return out;
  }

  // At this point, we are an interface, namespace or literal. Something with properties.

  out.properties = (declaration.children || []).map(x =>
    buildDeclarationRenderType(x)
  );
  out.type =
    declaration.kind === typedoc.ReflectionKind.Namespace
      ? 'namespace'
      : 'object';

  return out;
}

/**
 * @param {!typedocModels.Type|undefined} type
 * @param {string=} name
 * @return {RenderType}
 */
function buildRenderType(type, name = '') {
  if (!type) {
    return {
      name,
      type: '?',
    };
  }

  switch (type.type) {
    case 'intrinsic': {
      const intrinsicType = /** @type {typedocModels.IntrinsicType} */ (type);
      return {
        name,
        type: intrinsicType.name,
      };
    }

    case 'reflection': {
      const reflectionType = /** @type {typedocModels.ReflectionType} */ (type);
      const {declaration} = reflectionType;
      const out = buildDeclarationRenderType(declaration);
      if (name) {
        out.name = name; // don't use type name from reflection, it's often __type
      }
      return out;
    }

    case 'reference': {
      const referenceType = /** @type {typedocModels.ReferenceType} */ (type);
      return {
        name,
        type: referenceType.name,
      };
    }

    case 'array': {
      const arrayType = /** @type {typedocModels.ArrayType} */ (type);
      const {type: elementType} = buildRenderType(arrayType.elementType);
      return {
        name,
        type: `${elementType}[]`,
      };
    }

    case 'stringLiteral': {
      const stringLiteralType = /** @type {typedocModels.StringLiteralType} */ (type);
      return {
        name,
        type: JSON.stringify(stringLiteralType.value),
      };
    }

    case 'union': {
      // This can be a bunch of things, including an enum.
      const unionType = /** @type {typedocModels.UnionType} */ (type);

      let onlyLiterals = true;
      for (const contained of unionType.types) {
        if (!(contained instanceof typedocModels.StringLiteralType)) {
          onlyLiterals = false;
          break;
        }
      }

      if (onlyLiterals) {
        return {
          name,
          type: 'enum',
          options: unionType.types.map(contained => {
            const {type} = buildRenderType(contained);
            return type;
          }),
        };
      }
      // TODO(samthor): Catch other union types.
      return {
        name,
        type: '?:' + type.type,
      };
    }

    default: {
      // TODO(samthor): Catch other types, including intersection and templated types.
      return {
        name,
        type: '?:' + type.type,
      };
    }
  }
}

/**
 * @param {!typedoc.DeclarationReflection} raw
 * @return {{parameters: RenderType[], returnType?: RenderType}}
 */
function parseFunction(raw) {
  const {signatures = []} = raw;

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

  const {
    type: sourceReturnType,
    parameters: sourceParameters = [],
  } = bestSignature;

  const parameters = sourceParameters.map(({name, type}) =>
    buildRenderType(type, name)
  );

  let returnType;
  if (sourceReturnType) {
    returnType = buildRenderType(sourceReturnType, 'return');

    // Methods return void, but we don't include it in the docs.
    if (returnType.type === 'void') {
      returnType = undefined;
    }
  }

  return {
    parameters,
    returnType,
  };
}

/**
 * @return {RenderNamespace[]}
 */
module.exports = () => {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return [];
  }

  const typesPath = path.join(__dirname, '../../types/chrome/test.d.ts');
  const typesData = generateTypeDocObject(typesPath);

  const namespaces = extractChromeNamespaces(typesData).map(raw => {
    const type = buildDeclarationRenderType(raw);

    // Strip leading "_", to fix "_debugger".
    type.name = type.name.replace(/^_*/, '');
    const permalinkPath = type.name.replace(/\./g, '_');

    /** @type {!RenderNamespace} */
    const namespace = {
      // TODO(samthor): support sub-namespaces
      name: 'chrome.' + type.name,
      shortName: type.name,
      permalink: permalinkPath,
      comment: type.comment,
      updated: '2020-01-01',
      release: 38,
      methods: [],
      types: [],
    };

    (type.properties || []).forEach(property => {
      switch (property.type) {
        case 'function':
          namespace.methods.push(property);
          break;
        case 'enum':
        case 'object':
          namespace.types.push(property);
          break;
      }
    });

    return namespace;
  });

  // Returns as an already sorted Array.
  namespaces.sort(({name: a}, {name: b}) => a.localeCompare(b));
  return namespaces;
};

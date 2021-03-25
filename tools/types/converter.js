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

const typedoc = require('typedoc');
const typedocModels = require('typedoc/dist/lib/models');
const {
  extractComment,
  deepStrictEqual,
  fullName,
  generateHtmlLink,
} = require('./helpers');

/**
 * @param {typedocModels.DeclarationReflection} declaration
 * @return {RenderType}
 */
function declarationToType(declaration) {
  let {type} = declaration;
  if (!type) {
    type = new typedocModels.ReflectionType(declaration);
  }
  const out = buildRenderType(type, undefined, declaration);
  updateWithComment(out, declaration.comment, declaration);

  if (declaration.flags.hasFlag(typedoc.ReflectionFlag.Optional)) {
    out.optional = true;
  }
  return out;
}

/**
 * @param {RenderType} renderType
 * @param {typedocModels.Comment|undefined} commentModel
 * @param {typedocModels.DeclarationReflection} owner
 */
function updateWithComment(renderType, commentModel, owner) {
  if (commentModel === undefined) {
    return;
  }
  const comment = extractComment(commentModel, owner);
  if (comment) {
    renderType.comment = comment;
  }
  const deprecatedTag = commentModel.getTag('deprecated');
  if (deprecatedTag) {
    renderType.deprecatedComment = extractComment(
      deprecatedTag.text,
      owner,
      false
    );
  }
}

/**
 * Internal helper to map this declaration to a RenderType. Does not add comments or optional flag.
 *
 * @param {typedocModels.ReflectionType} reflectionType
 * @return {RenderType|undefined}
 */
function internalBuildDeclarationRenderType(reflectionType) {
  const {declaration} = reflectionType;
  if (declaration.type) {
    return buildRenderType(declaration.type, undefined, declaration);
  } else if (declaration.signatures?.length) {
    return internalBuildFunctionRenderType(declaration);
  }

  // This will either be "type" for a top-level interface type, or "object" for an inline object
  // literal.
  /** @type {RenderTypeType} */
  let objectLikeType;

  switch (declaration.kind) {
    case typedoc.ReflectionKind.TypeLiteral:
      objectLikeType = 'object';
      break;

    case typedoc.ReflectionKind.Interface:
      objectLikeType = 'type';
      break;

    default: {
      return;
    }
  }

  const properties = (declaration.children ?? []).map(child => {
    const rt = declarationToType(child);
    rt.name = child.name;
    return rt;
  });

  /** @type {RenderType} */
  const out = {
    type: objectLikeType,
    properties,
  };
  updateWithComment(out, declaration.comment, declaration);

  if (declaration.flags.hasFlag(typedoc.ReflectionFlag.Optional)) {
    out.optional = true;
  }

  // Look for templated types <T>. This doesn't handle extends or anything.
  if (declaration.typeParameters?.length) {
    out.templates = declaration.typeParameters.map(({name}) => name);
  }

  return maybeBuildArrayRenderType(out) || out;
}

/**
 * Maybe converts an object type into an array type.
 *
 * @param {RenderType} cand
 * @return {RenderType|undefined}
 */
function maybeBuildArrayRenderType(cand) {
  // If this is a normal class or interface type, return early.
  if (cand.type !== 'object' || !cand.properties || !cand.properties.length) {
    return;
  }

  // Otherwise, see if this is a type that looks like `{0: T, 1: T, ...}`. This is actually an
  // array with a min/max length.
  const check = cand.properties.slice();
  const elementType = JSON.parse(JSON.stringify(check[0])); // clone
  let length = 0;

  for (;;) {
    const index = check.findIndex(({name}) => name === `${length}`);
    if (index === -1) {
      break;
    }
    const checkElementType = check.splice(index, 1)[0];
    elementType.name = checkElementType.name; // keep name for compare
    if (!deepStrictEqual(elementType, checkElementType)) {
      return;
    }
    ++length;
  }
  if (check.length) {
    return;
  }

  delete elementType.name;
  return {
    type: 'array',
    elementType,
    minLength: length,
    maxLength: length,
  };
}

/**
 * Generates a RenderType from a DeclarationReflection that is a function, and has at least one
 * signature.
 *
 * Note that this uses the best signature and adds its comment.
 *
 * @param {typedoc.DeclarationReflection} raw
 * @return {RenderType}
 */
function internalBuildFunctionRenderType(raw) {
  const {signatures = []} = raw;

  // This extracts the signature with the most AND least parameters. This is an awkward mismatch
  // between TSDoc (not to mention JSDoc) and Chrome's internal types: Chrome supports optional
  // _middle_ arguments but this isn't representable anywhere.

  // Instead, we fan out a number of signatures and here just grab the longest _and_ shortest one:
  // if the parameters in longest aren't in the shortest, they're assumed to be optional.
  // This assumes that all signatures have the same return type.

  let bestSignature = signatures[0];

  /** @type {typedocModels.ParameterReflection[]} */
  let leastParameters = bestSignature?.parameters ?? [];
  let bestParameters = leastParameters;

  signatures.forEach(signature => {
    const {parameters = []} = signature;
    if (parameters.length > bestParameters.length) {
      bestParameters = parameters;
      bestSignature = signature;
    } else if (parameters.length < leastParameters.length) {
      leastParameters = parameters;
    }
  });

  const {type: sourceReturnType} = bestSignature;
  const requiredParameterNames = new Set(leastParameters.map(({name}) => name));

  const parameters = bestParameters.map(reflection => {
    if (!reflection.type) {
      throw new TypeError('got signature paramater without type');
    }
    const rt = buildRenderType(reflection.type, undefined, raw);
    rt.optional = rt.optional || !requiredParameterNames.has(reflection.name);
    rt.name = reflection.name;

    updateWithComment(rt, reflection.comment, raw);

    // TODO(samthor): We don't include default values, although Chrome doesn't seem
    // to have any internally.
    return rt;
  });

  /** @type {RenderType} */
  const out = {
    type: 'function',
    parameters,
  };
  updateWithComment(out, bestSignature.comment, raw);

  // Set the returnType property of RenderType if valid and not void.
  if (sourceReturnType) {
    const returnType = buildRenderType(sourceReturnType, undefined, raw);
    returnType.name = 'returns';

    // The return type comment is awkwardly on the Comment object.
    const returnComment = extractComment(bestSignature.comment?.returns, raw);
    if (returnComment) {
      returnType.comment = returnComment;
    }

    // Methods return void, but we don't include it in the docs.
    if (returnType.primitiveType !== 'void') {
      out.returnType = returnType;
    }
  }

  return out;
}

/**
 * @param {typedocModels.Type} type
 * @param {typedocModels.Type|undefined} parentType
 * @param {typedocModels.Reflection} owner
 * @return {RenderType}
 */
function buildRenderType(type, parentType, owner) {
  switch (type.type) {
    case 'array': {
      const arrayType = /** @type {typedocModels.ArrayType} */ (type);
      return {
        type: 'array',
        elementType: buildRenderType(arrayType.elementType, type, owner),
      };
    }

    case 'reflection': {
      const reflectionType = /** @type {typedocModels.ReflectionType} */ (type);
      const out = internalBuildDeclarationRenderType(reflectionType);
      if (out) {
        return out;
      }
      break;
    }

    case 'tuple': {
      const tupleType = /** @type {typedocModels.TupleType} */ (type);
      const [first, ...rest] = tupleType.elements;

      // We just support tuples of the same type. This is basically an array of a maximum length.
      const invalid = rest.some(check => !check.equals(first));
      if (!first || invalid) {
        break;
      }

      return {
        type: 'array',
        elementType: buildRenderType(first, type, owner),
        minLength: tupleType.elements.length,
        maxLength: tupleType.elements.length,
      };
    }

    case 'intersection': {
      const out = parseIntersectionType(
        /** @type {typedocModels.IntersectionType} */ (type),
        owner
      );
      if (out) {
        return out;
      }
      break;
    }

    case 'reference': {
      const referenceType = /** @type {typedocModels.ReferenceType} */ (type);
      let name;
      if (referenceType.reflection) {
        name = fullName(referenceType.reflection);
      } else {
        ({name} = referenceType);
      }

      /** @type {RenderType} */
      const out = {
        type: 'reference',
        referenceType: name,
      };

      const generated = generateHtmlLink(owner, referenceType.reflection);
      if (generated) {
        out.referenceType = generated.name;
        out.referenceLink = generated.link;
      }

      // Insert <Foo> reference data.
      if (referenceType.typeArguments?.length) {
        out.referenceTemplates = referenceType.typeArguments.map(t =>
          buildRenderType(t, undefined, owner)
        );
      }

      // TODO(samthor): special-case 'chrome.event.Event' which has some generated issues.
      // Call the referenceType (i.e., event.Event<Function>) 'listener', and remove any return
      // type as these have snuck into the generated .d.ts.
      if (name === 'chrome.events.Event') {
        if (out.referenceTemplates?.length !== 1) {
          throw new Error('got chrome.events.Events without listener');
        }
        const only = out.referenceTemplates[0];
        only.name = 'listener';
        delete only.returnType;
      }

      return out;
    }

    case 'union': {
      // This can be a bunch of things, including an enum.
      const unionType = /** @type {typedocModels.UnionType} */ (type);
      const options = unionType.types.map(c => buildRenderType(c, type, owner));

      // Look for optional options (union of something and undefined).
      if (options.length === 2) {
        const filtered = options.filter(
          ({primitiveType}) => primitiveType !== 'undefined'
        );
        if (filtered.length === 1) {
          const t = filtered[0];
          t.optional = true;
          return t;
        }
      }

      // We only present enums if they contain primitive values (e.g., a choice of strings).
      const isEnum = !options.some(({type}) => type !== 'primitive');
      return {
        type: 'union',
        isEnum,
        options,
      };
    }

    case 'intrinsic': {
      const intrinsicType = /** @type {typedocModels.IntrinsicType} */ (type);
      return {
        type: 'primitive',
        primitiveType: intrinsicType.name,
      };
    }

    case 'literal': {
      const literalType = /** @type {typedocModels.LiteralType} */ (type);

      // If we're not contained by a union but our owner is a TypeAlias then this is just an enum
      // type with a single possible string option.
      if (
        parentType?.type !== 'union' &&
        owner.kind === typedocModels.ReflectionKind.TypeAlias
      ) {
        const unionType = new typedocModels.UnionType([type]);
        return buildRenderType(unionType, parentType, owner);
      }

      return {
        type: 'primitive',
        primitiveType: typeof literalType.value,
        literalValue: JSON.stringify(literalType.value),
      };
    }

    case 'typeParameter': {
      const typeParameterType = /** @type {typedocModels.TypeParameterType} */ (type);
      return {
        type: 'reference',
        referenceType: typeParameterType.name,
      };
    }
  }

  console.warn('got unknown type', type);
  return {type: '?'};
}

/**
 * Attempts to tease out a sensible RenderType from typedoc's intersection type. There is only a
 * few of these in Chrome's types and we match them all.
 *
 * @param {typedocModels.IntersectionType} intersectionType
 * @param {typedocModels.Reflection} owner
 * @return {RenderType|null}
 */
function parseIntersectionType(intersectionType, owner) {
  const checkArray = internalParseArray(intersectionType, owner);
  if (checkArray) {
    // This is an array (probably with min/max).
    return checkArray;
  }

  const checkRefProperties = internalParseRefProperties(
    intersectionType,
    owner
  );
  if (checkRefProperties) {
    // This is a reference but which also has static properties (chrome.storage).
    return checkRefProperties;
  }

  return null;
}

/**
 * @param {typedocModels.IntersectionType} intersectionType
 * @param {typedocModels.Reflection} owner
 * @return {RenderType|null}
 */
function internalParseArray(intersectionType, owner) {
  const [a, b, ...rest] = intersectionType.types;
  if (rest.length) {
    return null;
  }

  const typeA = buildRenderType(a, undefined, owner);
  const typeB = buildRenderType(b, undefined, owner);
  if (
    typeA?.type !== 'array' ||
    typeB?.type !== 'array' ||
    !deepStrictEqual(typeA.elementType, typeB.elementType)
  ) {
    return null;
  }

  /** @type {RenderType} */
  const out = {
    type: 'array',
    elementType: typeA.elementType,
  };

  const minLength = Math.max(typeA.minLength ?? 0, typeB.minLength ?? 0);
  if (minLength) {
    out.minLength = minLength;
  }

  const maxLength = Math.min(typeA.maxLength ?? 0, typeB.maxLength ?? 0);
  if (maxLength) {
    out.maxLength = maxLength;
  }

  return out;
}

/**
 * @param {typedocModels.IntersectionType} intersectionType
 * @param {typedocModels.Reflection} owner
 * @return {RenderType|null}
 */
function internalParseRefProperties(intersectionType, owner) {
  const [a, b, ...rest] = intersectionType.types;
  if (rest.length) {
    return null;
  }

  if (
    !(
      a instanceof typedocModels.ReferenceType &&
      b instanceof typedocModels.ReflectionType
    )
  ) {
    return null;
  }
  const referenceType = a;
  const reflectionType = b;

  const properties = buildRenderType(reflectionType, undefined, owner);
  if (properties.type !== 'object') {
    return null;
  }

  const t = buildRenderType(referenceType, undefined, owner);
  t.properties = properties.properties;
  return t;
}

module.exports = {declarationToType, buildRenderType};

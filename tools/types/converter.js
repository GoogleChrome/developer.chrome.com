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

const typedocModels = require('typedoc/dist/lib/models');
const {
  matchEnum,
  matchUnifiedFunction,
  matchArrayType,
  matchTypeLiteral,
  formatComment,
  formatCommentLine,
  isOptional,
  fullName,
  matchOptionalType,
} = require('chrome-types-helpers/lib/types');
const {CommentHelper} = require('./comment');
const {uniqueVersionDataFor} = require('./version.js');

/**
 * Updates the passed RenderBase with version and comment information.
 *
 * @param {RenderBase} base
 * @param {typedocModels.Reflection} reflection
 */
function prepareBase(base, reflection) {
  if (isOptional(reflection)) {
    base.optional = true;
  }

  const helper = new CommentHelper(reflection);
  const comment = formatComment(reflection.comment, helper);
  if (comment) {
    base.comment = comment;
  }
  base.name = reflection.name;
  base.fullName = fullName(reflection);

  const data = uniqueVersionDataFor(base.fullName) ?? {};

  const deprecatedTag = reflection.comment?.getTag('deprecated');
  if (deprecatedTag) {
    data.deprecatedComment = formatCommentLine(deprecatedTag.text, helper);
    data.deprecated = data.deprecated ?? -1;
  }

  if (reflection.comment?.hasTag('beta')) {
    data.channel = 'beta';
  } else if (reflection.comment?.hasTag('alpha')) {
    data.channel = 'dev';
  }

  if (Object.keys(data).length) {
    base.version = data;
  }
}

/**
 * Convert a Reflection to a RenderType.
 *
 * @param {typedocModels.Reflection} reflection
 * @return {RenderType}
 */
function declarationToType(reflection) {
  const out = internalDeclarationToType(reflection);
  prepareBase(out, reflection);
  return out;
}

/**
 * @param {typedocModels.Reflection} reflection
 * @return {RenderType}
 */
function internalDeclarationToType(reflection) {
  const matchedEnum = matchEnum(reflection);
  if (matchedEnum) {
    const options = matchedEnum.map(value => {
      return /** @type {RenderType} */ ({
        type: 'primitive',
        primitiveType: typeof value,
        literalValue: JSON.stringify(value),
      });
    });
    return {
      type: 'union',
      isEnum: true,
      options,
    };
  }

  // Match function type.
  const out = internalMaybeBuildFunction(reflection, true);
  if (out) {
    return out;
  }

  // Match interface types.
  if (
    reflection.kind === typedocModels.ReflectionKind.Interface &&
    reflection instanceof typedocModels.DeclarationReflection
  ) {
    const properties = (reflection.children ?? []).map(child => {
      const rt = declarationToType(child);
      rt.name = child.name;
      return rt;
    });

    /** @type {RenderType} */
    const out = {
      type: 'type',
      properties,
    };

    // Look for templated types <T> and store their names.
    if (reflection.typeParameters?.length) {
      out.templates = reflection.typeParameters.map(({name}) => name);
    }

    return out;
  }

  // Match all other types. This calls out to types which can be inlined, too.
  if (
    (reflection instanceof typedocModels.DeclarationReflection ||
      reflection instanceof typedocModels.ParameterReflection) &&
    reflection.type
  ) {
    const out = internalTypeRenderType(reflection.type);
    if (out) {
      return out;
    }
  }

  throw new Error(
    `got unknown typedoc.DeclarationReflection: ${reflection.kindString}`
  );
}

/**
 * Convert a Type to a RenderType.
 *
 * @param {typedocModels.Type} type
 * @return {RenderType}
 */
function internalTypeRenderType(type) {
  const matchedOptionalType = matchOptionalType(type);
  if (matchedOptionalType) {
    const out = internalTypeRenderType(matchedOptionalType);
    out.optional = true;
    return out;
  }

  const matchedArrayType = matchArrayType(type);
  if (matchedArrayType) {
    /** @type {RenderType} */
    const out = {
      type: 'array',
      elementType: internalTypeRenderType(matchedArrayType.elementType),
    };
    if (matchedArrayType.min) {
      out.minLength = matchedArrayType.min;
    }
    if (matchedArrayType.max) {
      out.maxLength = matchedArrayType.max;
    }
    return out;
  }

  // Functions are always reflections as they define new types, although they can apper anywhere.
  if (type.type === 'reflection') {
    const reflectionType = /** @type {typedocModels.ReflectionType} */ (type);
    const out = internalMaybeBuildFunction(reflectionType.declaration, false);
    if (out) {
      return out;
    }
  }

  const matchedTypeLiteral = matchTypeLiteral(type);
  if (matchedTypeLiteral) {
    const raw = matchedTypeLiteral.properties ?? {};
    const properties = Object.values(raw).map(r => declarationToType(r));

    // This is a Chrome special-case: properties intersected with a reference.
    if (matchedTypeLiteral.root) {
      const out = internalTypeRenderType(matchedTypeLiteral.root);
      if (out.properties) {
        throw new Error(
          `got typeLiteral combo with existing properties: ${Object.keys(
            out.properties
          )}`
        );
      }
      out.properties = properties;
      return out;
    }

    // Otherwise, this is just a regular old object literal.
    return {
      type: 'object',
      properties,
    };
  }

  switch (type.type) {
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

      // Insert Reference<Arg> reference data.
      if (referenceType.typeArguments?.length) {
        out.referenceTemplates = referenceType.typeArguments.map(t =>
          reentrantTypeParser(t)
        );
      }

      // TODO(samthor): special-case a reference to 'chrome.event.Event'. Call the referenceType
      // (i.e., chrome.event.Event<Function>) 'listener'.
      if (name === 'chrome.events.Event') {
        if (out.referenceTemplates?.length !== 1) {
          throw new Error('got chrome.events.Events without listener');
        }
        const only = out.referenceTemplates[0];
        only.name = 'listener';
      }

      return out;
    }

    case 'union': {
      // This is a variable which can be one of many things (but is not a type or enum).
      const unionType = /** @type {typedocModels.UnionType} */ (type);
      const options = unionType.types.map(c => internalTypeRenderType(c));
      return {
        type: 'union',
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

  throw new Error(`got unknown typedoc.Type: ${type.type}`);
}

/**
 * @param {typedocModels.Reflection} reflection
 * @param {boolean} allowManySignatures
 * @return {RenderType=}
 */
function internalMaybeBuildFunction(reflection, allowManySignatures) {
  if (!(reflection instanceof typedocModels.DeclarationReflection)) {
    return;
  }
  if ((reflection.signatures?.length ?? 0) > 1 && !allowManySignatures) {
    throw new TypeError(`invalid signatures: ${reflection.signatures?.length}`);
  }

  const matchedUnifiedFunction = matchUnifiedFunction(reflection);
  if (!matchedUnifiedFunction) {
    return;
  }

  const parameters = matchedUnifiedFunction.parameters.map(
    ({reflection, optional}) => {
      const rt = declarationToType(reflection);
      if (optional) {
        rt.optional = true;
      }
      return rt;
    }
  );

  // Convert the return type to a RenderType.
  const returnType = internalTypeRenderType(matchedUnifiedFunction.returnType);
  const returnTypeComment = formatComment(
    matchedUnifiedFunction.signature.comment?.returns ?? '',
    new CommentHelper(reflection)
  );
  if (returnTypeComment) {
    returnType.comment = returnTypeComment;
  }

  return {
    type: 'function',
    parameters,
    returnType,
  };
}

/**
 * Converts a Type to a RenderType, but treats it as a DeclarationReflection (with comments et al)
 * if possible.
 *
 * @param {typedocModels.Type} type
 * @return {RenderType}
 */
function reentrantTypeParser(type) {
  if (type.type === 'reflection') {
    const reflectionType = /** @type {typedocModels.ReflectionType} */ (type);
    return declarationToType(reflectionType.declaration);
  }
  return internalTypeRenderType(type);
}

module.exports = {prepareBase, declarationToType};

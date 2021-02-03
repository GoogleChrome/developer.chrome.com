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
} = require('webdev-infra/lib/types');
const {CommentHelper} = require('./comment');

/**
 * @param {typedocModels.Reflection} reflection
 * @return {RenderType}
 */
function declarationToType(reflection) {
  const rt = internalReflectionRenderType(reflection);
  if (isOptional(reflection)) {
    rt.optional = true;
  }

  const helper = new CommentHelper(reflection);
  const comment = formatComment(reflection.comment, helper);
  if (comment) {
    rt.comment = comment;
  }

  const deprecatedTag = reflection.comment?.getTag('deprecated');
  if (deprecatedTag) {
    rt.deprecated = formatCommentLine(deprecatedTag.text, helper);
  }

  return rt;
}

/**
 * Convert a Reflection to a RenderType.
 *
 * @param {typedocModels.Reflection} reflection
 * @return {RenderType}
 */
function internalReflectionRenderType(reflection) {
  const matchedEnum = matchEnum(reflection);
  if (matchedEnum) {
    const options = matchedEnum.map(value => {
      return /** @type {RenderType} */ ({
        type: 'primitive',
        primitiveType: typeof value,
        literalValue: `${value}`,
      });
    });
    return {
      type: 'union',
      isEnum: true,
      options,
    };
  }

  const matchedUnifiedFunction = matchUnifiedFunction(reflection);
  if (matchedUnifiedFunction) {
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
    const returnType = internalTypeRenderType(
      matchedUnifiedFunction.returnType
    );
    const returnTypeComment = formatCommentLine(
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
          internalTypeRenderType(t)
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
        literalValue: `${literalType.value}`,
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

module.exports = {declarationToType};

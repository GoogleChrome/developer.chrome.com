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

// TypeDoc doesn't export some of its internal types at the top-level, so just bring in the models.
// These are technically disused and just here for types inside JS comments.
// eslint-disable-next-line no-unused-vars
const typedocModels = require('typedoc/dist/lib/models');

const {extractComment} = require('./helpers');

/**
 * @param {!typedocModels.DeclarationReflection} declaration
 * @return {RenderType}
 */
function declarationToType(declaration) {
  const out = internalDeclarationToType(declaration);

  const comment = extractComment(declaration.comment);
  if (comment) {
    out.comment = comment;
  }
  if (declaration.flags.hasFlag(typedoc.ReflectionFlag.Optional)) {
    out.optional = true;
  }

  return out;
}

/**
 * Internal helper to map this declaration to a RenderType. Does not add comments or optional flag.
 *
 * @param {!typedocModels.DeclarationReflection} declaration
 * @return {RenderType}
 */
function internalDeclarationToType(declaration) {
  // TODO(samthor): Restore functions and general types.
  if (declaration.type) {
    return buildRenderType(declaration.type);
    // } else if (declaration.signatures?.length) {
    //   return buildFunctionRenderType(declaration);
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
      // TODO(samthor): handle other types.
      return {type: '?'};
    }
  }

  const properties = (declaration.children ?? []).map(child => {
    const rt = declarationToType(child);
    rt.name = child.name;
    return rt;
  });
  return {type: objectLikeType, properties};
}

/**
 * @param {typedocModels.Type} type
 * @return {RenderType}
 */
function buildRenderType(type) {
  switch (type.type) {
    case 'reflection': {
      const reflectionType = /** @type {typedocModels.ReflectionType} */ (type);
      const {declaration} = reflectionType;
      return declarationToType(declaration);
    }

    case 'reference': {
      const referenceType = /** @type {typedocModels.ReferenceType} */ (type);
      // TODO(samthor): referencetype is not scoped
      /** @type {RenderType} */
      const out = {
        type: 'reference',
        referenceType: referenceType.name,
        referenceLink: true,
      };
      return out;
    }

    case 'array': {
      const arrayType = /** @type {typedocModels.ArrayType} */ (type);
      return {
        type: 'array',
        elementType: buildRenderType(arrayType.elementType),
      };
    }

    case 'intrinsic': {
      const intrinsicType = /** @type {typedocModels.IntrinsicType} */ (type);
      return {
        type: 'primitive',
        primitiveType: intrinsicType.type,
      };
    }
  }

  return {type: '?'};
}

module.exports = {declarationToType};

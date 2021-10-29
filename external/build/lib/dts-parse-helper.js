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
const ts = typedoc.TypeScript;

/**
 * TypeDoc, by default, ignores most JSDoc that exists prior to a parameter node. e.g.:
 *
 * ```js
 * function foo(
 *
 *   /**
 *    * Hello!
 *    *
 *    * @since Foo
 *    *\/
 *    bar: number,
 *
 * );
 * ```
 *
 * This helper catches parameter creation and inserts the comments onto the
 * {@link typedoc.ParameterReflection}. This is done in two passes: one listens for createParameter,
 * and the other listens for the end step to apply the extra tags (otherwise TypeDoc can clobber
 * us).
 *
 * Note that we do NOT apply to parameters which are call signatures, as TypeDoc handles these
 * (and only these) properly.
 */
class InsertMissingTagsHelper {
  /**
   * @param {typedoc.Converter} converter
   */
  constructor(converter) {
    converter.on(
      typedoc.Converter.EVENT_CREATE_PARAMETER,
      this.onCreateParameter.bind(this)
    );
    converter.on(typedoc.Converter.EVENT_END, this.onEnd.bind(this));

    /** @type {Map<typedoc.ParameterReflection, typedoc.Comment>} */
    this.pendingUpdates = new Map();
  }

  /**
   * @param {typedoc.Context} _context
   * @param {typedoc.ParameterReflection} param
   * @param {typedoc.TypeScript.Node} node
   */
  onCreateParameter(_context, param, node) {
    // We do a gross cast here as the `jsDoc` property does exist here but it's not obvious what
    // type from TypeScript has it.
    const {jsDoc} = /** @type {{jsDoc?: typedoc.TypeScript.JSDoc[]}} */ (
      /** @type {any} */ (node)
    );
    if (!jsDoc?.length) {
      return;
    }

    // This returns all jsDoc nodes _before_ this parameter. It's possible for this to be one or
    // more, but we just care about the last one (closest to the node).
    const jsDocNode = jsDoc[jsDoc.length - 1];

    // Get all tags and convert to TypeDoc's CommentTag format.
    const tags = Array.from(jsDocNode.tags ?? []).map(raw => {
      return new typedoc.CommentTag(
        raw.tagName.escapedText.toString(),
        getParamNameFromTag(raw),
        ts.getTextOfJSDocComment(raw.comment)
      );
    });

    // Get the raw comment text.
    // TODO(samthor): This isn't used. We just insert the tags.
    ts.getTextOfJSDocComment(jsDocNode.comment);

    // Don't add @param, since TypeDoc *can* do this on its own.
    const tagsWithoutParam = tags.filter(tag => tag.tagName !== 'param');
    if (!tagsWithoutParam.length) {
      return;
    }

    const extraComment = new typedoc.Comment();
    extraComment.tags = tagsWithoutParam;
    this.pendingUpdates.set(param, extraComment);
  }

  /**
   * @param {typedoc.Context} context
   */
  onEnd(context) {
    context.logger.info(`Applying ${this.pendingUpdates.size} extra comments`);

    for (const [param, extraComment] of this.pendingUpdates) {
      // Skip call signatures, which TypeDoc correctly already annotates with comments.
      // Notably it annotates the _signatures_, not the top-level declaration, which is correct
      // (since the top-level represents 1-n signatures).
      if (
        param.type?.type === 'reflection' &&
        param.type.declaration?.signatures
      ) {
        continue;
      }

      param.comment = mergeComment(param.comment, extraComment);
    }
    this.pendingUpdates.clear();
  }
}

/**
 * If this tag is a "@param" or "@property", then extract its name from `@param bar`.
 *
 * This does not extract its (optional) type, e.g., JSDoc like `@param {number} foo`.
 *
 * @param {typedoc.TypeScript.JSDocTag} tag
 * @return {string|undefined}
 */
function getParamNameFromTag(tag) {
  if (
    tag.kind !== ts.SyntaxKind.JSDocParameterTag &&
    tag.kind !== ts.SyntaxKind.JSDocPropertyTag
  ) {
    return undefined;
  }

  const paramTag = /** @type {typedoc.TypeScript.JSDocParameterTag} */ (tag);
  if (paramTag.name.kind !== ts.SyntaxKind.Identifier) {
    throw new Error(`got non-identifier for @param: ${paramTag}`);
  }

  const identifier = /** @type {typedoc.TypeScript.Identifier} */ (
    paramTag.name
  );
  return identifier.escapedText.toString();
}

/**
 * Merges two comments from typedoc. May return `a` or `b` unchanged.
 *
 * TODO: only returns the text from "a" if merging two nodes.
 *
 * @param {typedoc.Comment|undefined} a
 * @param {typedoc.Comment|undefined} b
 * @return {typedoc.Comment|undefined}
 */
function mergeComment(a, b) {
  if (!a && !b) {
    return undefined;
  } else if (!a) {
    return b;
  } else if (!b) {
    return a;
  }

  const merged = new typedoc.Comment();
  merged.tags.push(...a.tags, ...b.tags);

  // TODO: just grabs "a" comment
  merged.shortText = a.shortText;
  merged.text = a.text;

  return merged;
}

module.exports = {
  InsertMissingTagsHelper,
};

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

const assert = require('assert');
const typedoc = require('typedoc');
const typedocModels = require('typedoc/dist/lib/models');

/**
 * @param {typedoc.DeclarationReflection} reflection
 * @param {typedoc.ReflectionKind=} kindMask
 * @return {{[name: string]: typedoc.DeclarationReflection}}
 */
function exportedChildren(reflection, kindMask = 0) {
  /** @type {{[name: string]: typedoc.DeclarationReflection}} */
  const all = {};

  for (let cand of reflection.children ?? []) {
    if (!cand.flags.hasFlag(typedoc.ReflectionFlag.Exported)) {
      continue;
    }
    const {name} = cand;

    if (cand.kind === typedoc.ReflectionKind.Reference) {
      const reference = /** @type {typedoc.ReferenceReflection} */ (cand);
      const target = reference.getTargetReflection();
      if (!(target instanceof typedocModels.DeclarationReflection)) {
        continue;
      }
      cand = target;
    }

    if (!(cand.kind & kindMask)) {
      continue;
    }
    all[name] = cand;
  }

  return all;
}

/**
 * @param {typedocModels.Comment|undefined} comment
 * @return {string}
 */
function extractComment(comment) {
  if (comment) {
    return comment.shortText || comment.text || '';
  }
  return '';
}

/**
 * @param {RenderType|undefined} a
 * @param {RenderType|undefined} b
 * @return {boolean}
 */
function deepStrictEqual(a, b) {
  try {
    // @ts-ignore
    assert.deepStrictEqual(a, b);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = {exportedChildren, extractComment, deepStrictEqual};

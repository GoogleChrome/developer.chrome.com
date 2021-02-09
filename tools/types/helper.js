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

// eslint-disable-next-line no-unused-vars
const typedocModels = require('typedoc/dist/lib/models');
const {fullName} = require('chrome-types-helpers/lib/types');

/**
 * @param {typedocModels.Reflection} from
 * @param {typedocModels.Reflection} to
 * @return {string}
 */
function relativeLink(from, to) {
  const fromParts = fullName(from).split('.');
  const toParts = fullName(to).split('.');

  const limit = Math.min(fromParts.length, toParts.length);
  let i = 0;
  for (; i < limit; ++i) {
    if (fromParts[i] !== toParts[i]) {
      break;
    }
  }

  // If for some reason we're referencing ourself, always include the last part.
  i = Math.min(toParts.length - 1, i);
  return toParts.slice(i).join('.');
}

/**
 * @param {RenderType} type
 * @param {(rt: RenderType) => void} callback
 */
function traverseAll(type, callback) {
  callback(type);
  [
    type.referenceTemplates,
    type.elementType,
    type.properties,
    type.options,
    type.parameters,
    type.returnType,
  ]
    .flat()
    .filter(Boolean)
    .forEach(rt => traverseAll(/** @type {RenderType} */ (rt), callback));
}

module.exports = {relativeLink, traverseAll};

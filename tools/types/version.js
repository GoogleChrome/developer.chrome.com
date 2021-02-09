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

const versionData = /** @type {{[fullName: string]: RawVersionDataValue}} */ (require('../../node_modules/chrome-types/version-data.json')
  .symbols);

/**
 * @param {string} fullName
 * @return {VersionData}
 */
function uniqueVersionDataFor(fullName) {
  const self = versionData[fullName];
  if (!self) {
    // This happens if a new API is introduced without an update to its version-data, like
    // for in-development APIs.
    return {unknown: true};
  }

  const parentFullName = fullName.replace(/\.[^.]*$/, '');
  const parent = versionData[parentFullName] ?? {};

  /** @type {VersionData} */
  const out = {};
  for (const key in self) {
    if (parent[key] === self[key]) {
      continue;
    }
    if (key === 'release') {
      // TODO(samthor): Source file has the wrong key.
      out.channel = self['release'];
    } else {
      out[key] = self[key];
    }
  }

  return out;
}

module.exports = {uniqueVersionDataFor};

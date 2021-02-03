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

const versionData = /** @type {{[fullName: string]: RawVersionDataValue}} */ (require('./version-data.json'));

/**
 * @param {string} fullName
 * @return {VersionData=}
 */
function uniqueVersionDataFor(fullName) {
  const self = versionData[fullName];
  if (!self) {
    return;
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
  return Object.keys(out).length ? out : undefined;
}

module.exports = {uniqueVersionDataFor};

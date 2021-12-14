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

/**
 * Returns the docs object for a given object.
 *
 * @param {string} projectKey The docs project key (aka path).
 * @param {TODO} docs Docs data object to search.
 * @return {import("webdev-infra/types").TODOObject}
 */
const embededDoc = (projectKey, docs = {}) => {
  return projectKey
    .split('/')
    .reduce((prev, curr) => (prev && prev[curr] ? prev[curr] : prev), docs);
};

module.exports = embededDoc;

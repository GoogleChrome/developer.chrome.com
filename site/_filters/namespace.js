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

/**
 * Converts a namespace name like "chrome.foo.bar" into a path segment like "foo_bar". Throws if
 * namespace does not start with "chrome.", as this is all the site currently supports.
 *
 * @param {string} namespace
 * @return {string}
 */
function namespaceToPath(namespace) {
  if (!namespace.startsWith('chrome.')) {
    throw new Error(`can't work with non-chrome. namespace: ${namespace}`);
  }
  return namespace.substr(7).replace(/\./g, '_');
}

module.exports = {namespaceToPath};

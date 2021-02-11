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

const chromeTypesRepoURL = 'https://unpkg.com/chrome-types@latest/';

require('dotenv').config();
const fs = require('fs');
const {
  generateTypeDocProject,
  extractPublicChromeNamespaces,
  renderNamespaceFromNamespace,
} = require('./types');
const fetch = require('node-fetch');
const tmp = require('tmp');

// We create render types for both the regular types and platform apps.
const sourceFiles = ['index.d.ts', 'platform_app.d.ts'];

/**
 * @return {Promise<{[name: string]: RenderNamespace}>}
 */
async function build() {
  /** @type {{[name: string]: RenderNamespace}} */
  const out = {};

  for (const sourceFile of sourceFiles) {
    const u = new URL(sourceFile, chromeTypesRepoURL);
    console.warn(`Fetching ${u}...`);

    // For some reason, VSCode doesn't think `fetch` is callable.
    // @ts-ignore
    const request = await fetch(u);
    const raw = await request.text();

    // Write the file to a temporary location and parse it as TypeDoc only works on real files.
    let project;
    const f = tmp.fileSync({postfix: '.d.ts'});
    try {
      fs.writeFileSync(f.name, raw);
      project = generateTypeDocProject(f.name);
    } finally {
      f.removeCallback();
    }

    const namespaces = extractPublicChromeNamespaces(project);
    console.warn(`Got ${Object.keys(namespaces).length} namespaces`);

    for (const name in namespaces) {
      // FIXME(samthor): One of the Extensions APIs references this type incorrectly, so it is
      // incorrectly included in the Extension APIs. Pretend it's an apps type only.
      if (name === 'chrome.usb' && sourceFile === 'index.d.ts') {
        continue;
      }
      if (name in out) {
        continue;
      }

      const namespace = namespaces[name];
      const rn = renderNamespaceFromNamespace(sourceFile, name, namespace);

      // Store the output as "accessibilityFeatures", not "chrome.accessibilityFeatures".
      out[rn.shortName] = rn;
    }
  }

  const count = Object.keys(out).length;
  console.warn(`Built render types (union total ${count} namespaces)`);
  return out;
}

module.exports = {build};

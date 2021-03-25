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

const chromeTypesRepoBase = 'https://unpkg.com/chrome-types@latest/';

require('dotenv').config();
const fs = require('fs');
const {
  generateTypeDocProject,
  extractPublicChromeNamespaces,
  renderNamespaceFromNamespace,
} = require('./types');
const fetch = require('node-fetch');
const tmp = require('tmp');
const {enumerateAllRenderNamespace} = require('./helpers');

// We create render types for both the regular types and platform apps.
// The order here is important: the namespaces in earlier files win.
const sourceFiles = ['index.d.ts', 'platform_app.d.ts'];

/**
 * @param {string} part
 */
function safeFetch(part) {
  const u = new URL(part, chromeTypesRepoBase);
  console.warn(`Fetching ${u}...`);
  // @ts-ignore TypeScript doesn't think `fetch` is callable
  return /** @type {Promise<Response>} */ (fetch(u));
}

/**
 * @return {Promise<{[name: string]: RenderNamespace}>}
 */
async function build() {
  const sourceFilesData = sourceFiles.map(async part => {
    const request = await safeFetch(part);
    const raw = await request.text();
    return {raw, sourceFile: part};
  });

  const versionDataRequest = await safeFetch('version-data.json');
  const versionData = await versionDataRequest.json();
  console.warn(
    'Got version data for Chrome',
    versionData.version,
    'with',
    Object.keys(versionData.symbols).length,
    'symbols'
  );

  /** @type {{[name: string]: RenderNamespace}} */
  const out = {};

  for (const dataPromise of sourceFilesData) {
    const {raw, sourceFile} = await dataPromise;

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

      // Store the output as "chrome.accessibilityFeatures", to match the source data.
      out[name] = rn;
    }
  }

  /**
   * Builds a set of partial version data for this node (i.e., only the differences from the
   * parent).
   *
   * @param {RenderBase} base
   * @param {string} parentFullName
   */
  const buildPartialVersionData = (base, parentFullName = '') => {
    if (!base.fullName) {
      throw new Error('operates only on base with name');
    }
    const selfRawData = versionData.symbols[base.fullName];
    if (!selfRawData) {
      // TODO(samthor): The raw data is not including all subpaths properly. Properties of
      // function arguments seem to be flattened.
      // see e.g.: chrome.input.ime.setCandidateWindowProperties.parameters.properties
      // Once this is resolved, this should be listed as `{unknown: true}`.
      return; // skip
    }

    const parentRawData = versionData.symbols[parentFullName] ?? {};
    base.version = {};

    for (const key in selfRawData) {
      if (parentRawData[key] === selfRawData[key]) {
        continue;
      }
      base.version[key] = selfRawData[key];
    }

    // if (Object.keys(base.version).length) {
    //   console.warn(base.fullName, base.version);
    // }
  };

  // Enumerate through all final namespaces and add version data.
  for (const name in out) {
    const rn = out[name];

    // Build version data for both the namespace itself and all its children.
    buildPartialVersionData(rn);
    enumerateAllRenderNamespace(rn, (base, parent) => {
      if (base.fullName) {
        return;
      }
      if (!base.name || !parent.fullName) {
        // This happens in e.g. options of unions or enums. Ignore.
        return;
      }
      base.fullName = parent.fullName + '.' + base.name;
      buildPartialVersionData(base, parent.fullName);
    });
  }

  const count = Object.keys(out).length;
  console.warn(`Built render types (union total ${count} namespaces)`);
  return out;
}

module.exports = {build};

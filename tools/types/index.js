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

// TODO(samthor): When we build for App Engine, we don't actually want to run
// this file. Just check for an environment variable we see only there.
if (process.env.GOOGLE_RUNTIME) {
  try {
    require('dotenv');
    require('typescript');
  } catch (e) {
    console.warn('Refusing to build types with GOOGLE_RUNTIME', e);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }
}

const isProduction = process.env.NODE_ENV === 'production';

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const {performance} = require('perf_hooks');
const {parseChromeTypesFile} = require('./types');

// We create render types for both the regular types and platform apps.
const sourceFiles = ['index.d.ts', 'platform_app.d.ts'];

// TODO(samthor): One of the Extensions APIs references this type incorrectly, so it's in
// incorrectly included in the Extension APIs. Pretend it's an apps type only.
const extensionBlacklist = ['usb'];

const start = performance.now();

/** @type {RenderNamespace[]} */
const typesRender = [];
for (const sourceFile of sourceFiles) {
  const p = require.resolve(path.join('chrome-types', sourceFile));

  // Add namespaces that we don't already have (platform_app.d.ts contains namespaces to support
  // itself in isolation, so we remove them).
  let part = parseChromeTypesFile(p);
  part = part.filter(namespace => {
    if (
      sourceFile === 'index.d.ts' &&
      extensionBlacklist.includes(namespace.shortName)
    ) {
      return false;
    }
    const previous = typesRender.find(
      existingNamespace => existingNamespace.fullName === namespace.fullName
    );
    return previous === undefined;
  });

  typesRender.push(...part);
}

typesRender.sort(({shortName: a}, {shortName: b}) => a.localeCompare(b));

// In dev, emit this as formatted JS for ease-of-debugging.
const out = JSON.stringify(
  typesRender,
  undefined,
  isProduction ? undefined : 2
);

const duration = performance.now() - start;
console.warn(
  `Built render types (${typesRender.length} namespaces)`,
  `in ${duration.toFixed(2)}ms`
);

// We write the file here rather than using the > operator, as shell will zero
// the file while this long process runs, and a running instance of 11ty may
// see an empty file.
const outputPath = path.join(__dirname, '../../site/_collections/types.json');
fs.writeFileSync(outputPath, out);

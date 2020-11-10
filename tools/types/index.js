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

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const {performance} = require('perf_hooks');

const isProduction = process.env.NODE_ENV === 'production';
const typesPath = path.join(__dirname, '../../types/chrome/test.d.ts');
const renderTypesPath = path.join(
  __dirname,
  '../../site/_collections/types.json'
);

const start = performance.now();

const buildTypes = require('./types');
const typesRender = buildTypes(typesPath);

// In dev, emit this as formatted JS for ease-of-debugging.
const out = JSON.stringify(
  typesRender,
  undefined,
  isProduction ? undefined : 2
);

const duration = performance.now() - start;
console.warn(`Built render types in ${duration.toFixed(2)}ms`);

// We write the file here rather than using the > operator, as shell will zero
// the file while this long process runs, and a running instance of 11ty may
// see an empty file.
fs.writeFileSync(renderTypesPath, out);

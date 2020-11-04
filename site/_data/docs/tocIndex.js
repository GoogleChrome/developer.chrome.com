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
 * @fileoverview Exports a dictionary of projectKey, which itself contains a
 * dictionary of URL to path within that project's TOC.
 */

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const {buildProjectIndex} = require('../lib/project-index');

/**
 * @type {AllProjectIndex}
 */
const tocIndex = {};
const all = glob.sync('*/toc.y{a,}ml', {cwd: __dirname});

for (const result of all) {
  const data = yaml.safeLoad(fs.readFileSync(path.join(__dirname, result)));
  const projectKey = path.dirname(result);
  tocIndex[projectKey] = buildProjectIndex(data);
}

module.exports = tocIndex;

/*
 * Copyright 2023 Google LLC
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
 * @fileoverview Fetches the most recent Fugu Showcase data from
 * https://googlechromelabs.github.io/fugu-showcase/
 */

require('dotenv').config();

const {default: fetch} = require('node-fetch');
const fs = require('fs');
const path = require('path');

const url = 'https://googlechromelabs.github.io/fugu-showcase/data/data.json';

async function run() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Could not fetch Fugu Showcase data. Status code: ${response.status}`
    );
  }

  const json = await response.json();

  if (json['errors']) {
    const error = json['errors'][0];
    throw new Error(`${error.code}: ${error.message}`);
  }

  const targetFile = path.join(__dirname, '../data/fugu-showcase.json');
  fs.writeFileSync(targetFile, JSON.stringify(json));
}

run();

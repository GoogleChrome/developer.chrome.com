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

const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const fuguFile = path.join(__dirname, '../../_data/fuguShowcase.json');
  const fuguItems = /** @type {FuguProject[]} */ (
    JSON.parse(fs.readFileSync(fuguFile, 'utf-8'))
  );

  const availableAPIs = new Set();
  fuguItems.forEach(item => {
    item.usedAPIs.forEach(api => {
      availableAPIs.add(api.name);
    });
  });

  return {
    fuguItems,
    availableApis: Array.from(availableAPIs.keys()).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    ),
  };
};

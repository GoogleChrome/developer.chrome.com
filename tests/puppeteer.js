/*
 * Copyright 2022 Google LLC
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

const fs = require('fs/promises');
const path = require('path');
const distPath = path.resolve(path.join(__dirname, '/dist'));

const puppeteer = require('puppeteer');

const withPage = async (t, run) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await run(t, page);
  } finally {
    await page.close();
    await browser.close();
  }
};

const addPageScript = async (page, script) => {
  const file = path.join(distPath, `/js/${script}`);

  const content = await fs.readFile(file, 'utf-8');

  await page.addScriptTag({
    type: 'module',
    content: content,
  });
};

module.exports = {
  withPage,
  addPageScript,
};

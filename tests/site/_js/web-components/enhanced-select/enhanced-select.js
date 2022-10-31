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

const test = require('ava');
const {withPage, addPageScript} = require('../../../../puppeteer');
const {html} = require('common-tags');

test(
  'enhanced-select: has expected # of options',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    const numOptions = await page.evaluate(() => {
      return document.querySelectorAll('li').length;
    });

    t.is(numOptions, 2);
  }
);

test('enhanced-select: can preset value', withPage, async (t, page) => {
  await page.setContent(html`
    <enhanced-select>
      <select name="test">
        <option value="1">One</option>
        <option value="2" selected>Two</option>
        <option value="3">Three</option>
      </select>
    </enhanced-select>
  `);

  await addPageScript(page, '_enhanced-select.js');

  const value = await page.evaluate(() => {
    return document.querySelector('enhanced-select').getAttribute('value');
  });

  t.deepEqual(JSON.parse(value), ['2']);
});

test(
  'enhanced-select: sets value and emits on selection',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    const massSelect = await page.$('enhanced-select li:last-child');
    await massSelect.click();

    const value = await page.evaluate(() => {
      return document.querySelector('enhanced-select').getAttribute('value');
    });

    //todo - detect event

    t.deepEqual(JSON.parse(value), ['2']);
  }
);

test('enhanced-select: supports multiselect', withPage, async (t, page) => {
  t.is(1, 2);
});

test('enhanced-select: supports tab navigation', withPage, async (t, page) => {
  t.is(1, 2);
});

test(
  'enhanced-select: supports keyboard navigation',
  withPage,
  async (t, page) => {
    t.is(1, 2);
  }
);

test(
  'enhanced-select: interfaces with forms as expected',
  withPage,
  async (t, page) => {
    t.is(1, 2);
  }
);

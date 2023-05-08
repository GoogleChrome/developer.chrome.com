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
  'checkbox group: can restrict the number of items shown',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <checkbox-group
        show="4"
        i18n='{"select_all":"Select all","reset":"Reset"}'
      >
        <label><input type="checkbox" /> Option 1</label>
        <label><input type="checkbox" /> Option 2</label>
        <label><input type="checkbox" disabled /> Option 3</label>
        <label><input type="checkbox" /> Option 4</label>
        <label><input type="checkbox" /> Option 5</label>
        <label><input type="checkbox" /> Option 6</label>
      </checkbox-group>
    `);

    await addPageScript(page, '_checkbox-group.js');

    const numRendered = await page.evaluate(() => {
      return document.querySelectorAll('input').length;
    });

    t.is(numRendered, 4);
  }
);

test('checkbox group: can show more', withPage, async (t, page) => {
  await page.setContent(html`
    <checkbox-group show="2" i18n='{"select_all":"Select all","reset":"Reset"}'>
      <label><input type="checkbox" /> Option 1</label>
      <label><input type="checkbox" /> Option 2</label>
      <label><input type="checkbox" /> Option 3</label>
      <label><input type="checkbox" /> Option 4</label>
    </checkbox-group>
  `);

  await addPageScript(page, '_checkbox-group.js');

  const showMore = await page.$('.checkbox-group__show-more');
  await showMore.click();

  const numRendered = await page.evaluate(() => {
    return document.querySelectorAll('input').length;
  });

  const isMoreButtonRendered = await page.evaluate(() => {
    return Boolean(document.querySelector('.checkbox-group__show-more'));
  });

  t.is(numRendered, 4);
  t.is(isMoreButtonRendered, false);
});

test('checkbox group: can select all', withPage, async (t, page) => {
  await page.setContent(html`
    <checkbox-group i18n='{"select_all":"Select all","reset":"Reset"}'>
      <label><input type="checkbox" /> Option 1</label>
      <label><input type="checkbox" /> Option 2</label>
      <label><input type="checkbox" /> Option 3</label>
      <label><input type="checkbox" /> Option 4</label>
    </checkbox-group>
  `);

  await addPageScript(page, '_checkbox-group.js');

  const massSelect = await page.$('.checkbox-group__mass-select');
  await massSelect.click();

  const numChecked = await page.evaluate(() => {
    return document.querySelectorAll('input:checked').length;
  });

  t.is(numChecked, 4);
});

test(
  'checkbox group: select all shows and selects hidden items',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <checkbox-group
        show="2"
        i18n='{"select_all":"Select all","reset":"Reset"}'
      >
        <label><input type="checkbox" /> Option 1</label>
        <label><input type="checkbox" /> Option 2</label>
        <label><input type="checkbox" /> Option 3</label>
        <label><input type="checkbox" /> Option 4</label>
        <label><input type="checkbox" /> Option 5</label>
        <label><input type="checkbox" /> Option 6</label>
      </checkbox-group>
    `);

    await addPageScript(page, '_checkbox-group.js');

    const massSelect = await page.$('.checkbox-group__mass-select');
    await massSelect.click();

    const numChecked = await page.evaluate(() => {
      return document.querySelectorAll('input:checked').length;
    });

    t.is(numChecked, 6);
  }
);

test('checkbox group: can deselect all', withPage, async (t, page) => {
  await page.setContent(html`
    <checkbox-group i18n='{"select_all":"Select all","reset":"Reset"}'>
      <label><input type="checkbox" /> Option 1</label>
      <label><input type="checkbox" /> Option 2</label>
    </checkbox-group>
  `);

  await addPageScript(page, '_checkbox-group.js');

  const massSelect = await page.$('.checkbox-group__mass-select');

  await massSelect.click();
  await massSelect.click();

  const numChecked = await page.evaluate(() => {
    return document.querySelectorAll('input:checked').length;
  });

  t.is(numChecked, 0);
});

test('checkbox group: shows all if show > total', withPage, async (t, page) => {
  await page.setContent(html`
    <checkbox-group show="4" i18n='{"select_all":"Select all","reset":"Reset"}'>
      <label><input type="checkbox" /> Option 1</label>
      <label><input type="checkbox" /> Option 2</label>
    </checkbox-group>
  `);

  await addPageScript(page, '_checkbox-group.js');

  const numRendered = await page.evaluate(() => {
    return document.querySelectorAll('input').length;
  });

  t.is(numRendered, 2);
});

test('checkbox group: i18n works as expected', withPage, async (t, page) => {
  await page.setContent(html`
    <checkbox-group show="1" i18n='{"select_all":"ABC","reset":"XYZ"}'>
      <label><input type="checkbox" /> Option 1</label>
      <label><input type="checkbox" /> Option 2</label>
    </checkbox-group>
  `);

  await addPageScript(page, '_checkbox-group.js');

  const buttonText = await page.evaluate(() => {
    return document.querySelector('.checkbox-group__mass-select').innerText;
  });

  t.is(buttonText, 'ABC');
});

test(
  'checkbox group: can select all with keyboard',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <checkbox-group show="4" i18n='{"select_all":"ABC","reset":"XYZ"}'>
        <label><input type="checkbox" /> Option 1</label>
        <label><input type="checkbox" /> Option 2</label>
        <label><input type="checkbox" /> Option 3</label>
        <label><input type="checkbox" /> Option 4</label>
      </checkbox-group>
    `);

    await addPageScript(page, '_checkbox-group.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const numChecked = await page.evaluate(() => {
      return document.querySelectorAll('input:checked').length;
    });

    t.is(numChecked, 4);
  }
);

test(
  'checkbox group: can show more with keyboard',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <checkbox-group show="4" i18n='{"select_all":"ABC","reset":"XYZ"}'>
        <label><input type="checkbox" /> Option 1</label>
        <label><input type="checkbox" /> Option 2</label>
        <label><input type="checkbox" /> Option 3</label>
        <label><input type="checkbox" /> Option 4</label>
        <label><input type="checkbox" /> Option 5</label>
        <label><input type="checkbox" /> Option 6</label>
      </checkbox-group>
    `);

    await addPageScript(page, '_checkbox-group.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const numRendered = await page.evaluate(() => {
      return document.querySelectorAll('input').length;
    });

    t.is(numRendered, 6);
  }
);

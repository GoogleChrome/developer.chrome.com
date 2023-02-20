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

    let dispatchedChangeEvent = false;

    await page.exposeFunction('onCustomEvent', async () => {
      dispatchedChangeEvent = true;
    });

    await page.evaluate(() => {
      document
        .querySelector('enhanced-select')
        .addEventListener('change', () => window.onCustomEvent());
    });

    await massSelect.click();

    const value = await page.evaluate(() => {
      return document.querySelector('enhanced-select').getAttribute('value');
    });

    t.deepEqual(JSON.parse(value), ['2']);
    t.is(dispatchedChangeEvent, true);
  }
);

test('enhanced-select: supports multiselect', withPage, async (t, page) => {
  await page.setContent(html`
    <enhanced-select>
      <select name="test" multiple>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </enhanced-select>
  `);

  await addPageScript(page, '_enhanced-select.js');

  const firstOption = await page.$('enhanced-select li:first-child');
  const lastOption = await page.$('enhanced-select li:last-child');

  await lastOption.click();
  await firstOption.click();

  const value = await page.evaluate(() => {
    return document.querySelector('enhanced-select').getAttribute('value');
  });

  t.deepEqual(JSON.parse(value), ['1', '3']);
});

test(
  'enhanced-select: calling setValue directly behaves as expected',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test" multiple>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    const lastOption = await page.$('enhanced-select li:last-child');
    await lastOption.click();

    const initialValue = await page.evaluate(() => {
      return document.querySelector('enhanced-select').value;
    });

    t.deepEqual(initialValue, ['3']);

    await page.evaluate(() => {
      document.querySelector('enhanced-select').setValue([]);
    });

    const resetValue = await page.evaluate(() => {
      return document.querySelector('enhanced-select').value;
    });

    t.deepEqual(resetValue, []);

    const firstOption = await page.$('enhanced-select li:first-child');
    await firstOption.click();

    const finalValue = await page.evaluate(() => {
      return document.querySelector('enhanced-select').value;
    });

    t.deepEqual(finalValue, ['1']);
  }
);

test(
  'enhanced-select: can be opened/closed with keyboard',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test" multiple>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const open1 = await page.evaluate(() => {
      return document.querySelector('enhanced-select').open;
    });

    await page.keyboard.press('Escape');

    const open2 = await page.evaluate(() => {
      return document.querySelector('enhanced-select').open;
    });

    t.is(open1, true);
    t.is(open2, false);
  }
);

test('enhanced-select: supports tab navigation', withPage, async (t, page) => {
  await page.setContent(html`
    <enhanced-select>
      <select name="test" multiple>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </enhanced-select>
  `);

  await addPageScript(page, '_enhanced-select.js');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  const activeOpt = await page.evaluate(() => {
    return document.querySelector('enhanced-select').focusedIndex;
  });

  t.is(activeOpt, 2);
});

test(
  'enhanced-select: closes after tabbing through to next element',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test" multiple>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const open = await page.evaluate(() => {
      return document.querySelector('enhanced-select').open;
    });

    t.is(open, false);
  }
);

test(
  'enhanced-select: supports arrow navigation',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test" multiple>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const activeOpt = await page.evaluate(() => {
      return document.querySelector('enhanced-select').focusedIndex;
    });

    t.is(activeOpt, 1);
  }
);

test(
  'enhanced-select: supports pgup/down selection',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test" multiple>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('PageDown');

    const activeOpt1 = await page.evaluate(() => {
      return document.querySelector('enhanced-select').focusedIndex;
    });

    await page.keyboard.press('PageUp');

    const activeOpt2 = await page.evaluate(() => {
      return document.querySelector('enhanced-select').focusedIndex;
    });

    t.is(activeOpt1, 2);
    t.is(activeOpt2, 0);
  }
);

test(
  'enhanced-select: supports keyboard selection',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <enhanced-select>
        <select name="test" multiple>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </enhanced-select>
    `);

    await addPageScript(page, '_enhanced-select.js');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.evaluate(() => {
      return document.querySelector('enhanced-select').getAttribute('value');
    });

    t.deepEqual(JSON.parse(value), ['2']);
  }
);

test(
  'enhanced-select: interfaces with forms as expected',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <form>
        <enhanced-select>
          <select name="test" multiple>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </enhanced-select>
      </form>
    `);

    await addPageScript(page, '_enhanced-select.js');

    const firstOption = await page.$('enhanced-select li:first-child');
    await firstOption.click();

    const formData = await page.evaluate(() => {
      return new FormData(document.querySelector('form')).getAll('test');
    });

    t.deepEqual(formData, ['1']);
  }
);

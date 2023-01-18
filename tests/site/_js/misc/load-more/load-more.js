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
  'load-more: adds new items to dom as expected',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <div id="container1"></div>
      <button id="button1">Load more</button>
    `);

    await addPageScript(page, '_load-more.js');

    const button = await page.$('#button1');
    await button.click();

    const numItems1 = await page.evaluate(() => {
      return document.querySelectorAll('#container1 div').length;
    });

    await button.click();

    const numItems2 = await page.evaluate(() => {
      return document.querySelectorAll('#container1 div').length;
    });

    t.is(numItems1, 5);
    t.is(numItems2, 10);
  }
);

test('load-more: calculates offset as expected', withPage, async (t, page) => {
  await page.setContent(html`
    <div id="container1"></div>
    <button id="button1">Load more</button>
  `);

  await addPageScript(page, '_load-more.js');

  const button = await page.$('#button1');
  await button.click();

  const offset1 = await page.evaluate(() => {
    return window.instance1.currentOffset();
  });

  await button.click();

  const offset2 = await page.evaluate(() => {
    return window.instance1.currentOffset();
  });

  t.is(offset1, 5);
  t.is(offset2, 10);
});

test(
  'load-more: hides the button if no further items are available',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <div id="container1"></div>
      <button id="button1">Load more</button>
    `);

    await addPageScript(page, '_load-more.js');

    const button = await page.$('#button1');
    await button.click();
    await button.click();
    await button.click();

    const hidden = await page.evaluate(() => {
      return document.querySelector('button').hasAttribute('hidden');
    });

    t.is(hidden, true);
  }
);

test(
  'load-more: fetches total from dom if not passed as param',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <div id="container2" total-items="6"></div>
      <button id="button2">Load more</button>
    `);

    await addPageScript(page, '_load-more.js');

    const button = await page.$('#button2');
    await button.click();
    await button.click();

    const totalItems = await page.evaluate(() => {
      return window.instance2.total();
    });

    t.is(totalItems, 6);
  }
);

test(
  'load-more: throws if total not passed via either dom or param',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <div id="container2"></div>
      <button id="button2">Load more</button>
    `);

    await addPageScript(page, '_load-more.js');

    const error = await page.evaluate(() => {
      return window.instance2Error;
    });

    t.is(error, 'Missing total: please pass via attribute or params');
  }
);

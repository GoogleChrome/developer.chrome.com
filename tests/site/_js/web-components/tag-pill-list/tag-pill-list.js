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

const test = require('ava');
const {withPage, addPageScript} = require('../../../../puppeteer');

test('tag-pill-list: renders expected items', withPage, async (t, page) => {
  const data = [
    {
      key: 'googlers',
      value: 'adamsilverstein',
    },
    {
      key: 'locations',
      value: 'Amsterdam, Netherlands',
    },
    {
      key: 'topics',
      value: 'Advanced Apps and Project Fugu',
    },
  ];

  await page.setContent(`<tag-pill-list items='${JSON.stringify(data)}' />`);

  await addPageScript(page, '_tag-pill-list.js');

  const items = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.tag-pill')).map(e => ({
      label: e.innerText.trim(),
      key: e.dataset.key,
      value: e.dataset.value,
    }));
  });

  t.is(items[0].label, 'adamsilverstein');
  t.is(items[0].key, 'googlers');
  t.is(items[0].value, 'adamsilverstein');

  t.is(items[1].label, 'Amsterdam, Netherlands');
  t.is(items[1].key, 'locations');
  t.is(items[1].value, 'Amsterdam, Netherlands');

  t.is(items[2].label, 'Advanced Apps and Project Fugu');
  t.is(items[2].key, 'topics');
  t.is(items[2].value, 'Advanced Apps and Project Fugu');
});

test('tag-pill-list: items is reactive', withPage, async (t, page) => {
  const data = [
    {
      key: 'googlers',
      value: 'adamsilverstein',
    },
    {
      key: 'locations',
      value: 'Amsterdam, Netherlands',
    },
    {
      key: 'topics',
      value: 'Advanced Apps and Project Fugu',
    },
  ];

  await page.setContent(`<tag-pill-list items='${JSON.stringify(data)}' />`);

  await addPageScript(page, '_tag-pill-list.js');

  const initialItemCount = await page.evaluate(() => {
    return document.querySelectorAll('.tag-pill').length;
  });

  await page.evaluate(() => {
    const tagPillList = document.querySelector('tag-pill-list');

    tagPillList.items = [
      {
        key: 'googlers',
        value: 'adamsilverstein',
      },
    ];
  });

  const itemCount = await page.evaluate(() => {
    return document.querySelectorAll('.tag-pill').length;
  });

  t.is(initialItemCount, 3);
  t.is(itemCount, 1);
});

test(
  'tag-pill-list: fires removal event on click',
  withPage,
  async (t, page) => {
    const data = [
      {
        key: 'googlers',
        value: 'adamsilverstein',
      },
      {
        key: 'locations',
        value: 'Amsterdam, Netherlands',
      },
    ];

    await page.setContent(
      `<tag-pill-list items='${JSON.stringify(data)}'></tag-pill-list>`
    );

    await addPageScript(page, '_tag-pill-list.js');

    let dispatchedEvent = false;

    await page.exposeFunction('onCustomEvent', async () => {
      dispatchedEvent = true;
    });

    await page.evaluate(() => {
      document
        .querySelector('tag-pill-list')
        .addEventListener('removed-pill', () => window.onCustomEvent());
    });

    const firstPill = await page.$('.tag-pill:first-child');
    await firstPill.click();

    t.is(dispatchedEvent, true);
  }
);

test('tag-pill-list: can remove items', withPage, async (t, page) => {
  const data = [
    {
      key: 'googlers',
      value: 'adamsilverstein',
    },
    {
      key: 'locations',
      value: 'Amsterdam, Netherlands',
    },
  ];

  await page.setContent(
    `<tag-pill-list items='${JSON.stringify(data)}'></tag-pill-list>`
  );

  await addPageScript(page, '_tag-pill-list.js');

  const firstPill = await page.$('.tag-pill:first-child');
  await firstPill.click();

  const itemCount = await page.evaluate(() => {
    return document.querySelectorAll('.tag-pill').length;
  });

  t.is(itemCount, 1);
});

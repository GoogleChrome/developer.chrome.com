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

test('load-more: can load additional items', withPage, async (t, page) => {
  await page.setContent(html`
    <load-more
      total="6"
      i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
    >
      <div class="load-more__item">Initial item</div>
      <div class="load-more__item">Initial item</div>
      <div class="load-more__item">Initial item</div>
    </load-more>
  `);

  await addPageScript(page, '_load-more.js');

  await page.evaluate(() => {
    const items = [
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Loaded item</div>',
      '<div class="load-more__item">Loaded item</div>',
      '<div class="load-more__item">Loaded item</div>',
    ];

    document.querySelector('load-more').fetchItems = (skip, take) => {
      return {
        items: items.slice(skip, take + skip),
      };
    };
  });

  const button = await page.$('button');
  await button.click();

  const numItems = await page.evaluate(() => {
    return document.querySelectorAll('.load-more__item').length;
  });

  t.is(numItems, 6);
});

test('load-more: hides button on last page', withPage, async (t, page) => {
  await page.setContent(html`
    <load-more
      total="2"
      i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
    >
      <div class="load-more__item">Initial item</div>
    </load-more>
  `);

  await addPageScript(page, '_load-more.js');

  await page.evaluate(() => {
    const items = [
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Loaded item</div>',
    ];

    document.querySelector('load-more').fetchItems = (skip, take) => {
      return {
        items: items.slice(skip, take + skip),
      };
    };
  });

  const button = await page.$('button');
  await button.click();

  const haveButton = await page.evaluate(() => {
    return document.querySelectorAll('button').length > 0;
  });

  t.is(haveButton, false);
});

test(
  'load-more: supports custom number of items per load',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <load-more
        total="5"
        take="1"
        i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
      >
        <div class="load-more__item">Initial item</div>
        <div class="load-more__item">Initial item</div>
      </load-more>
    `);

    await addPageScript(page, '_load-more.js');

    await page.evaluate(() => {
      const all = [
        '<div class="load-more__item">Initial item</div>',
        '<div class="load-more__item">Initial item</div>',
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item</div>',
      ];

      document.querySelector('load-more').fetchItems = (skip, take) => {
        return {
          items: all.slice(skip, take + skip),
        };
      };
    });

    const button = await page.$('button');
    await button.click();

    const numItems = await page.evaluate(() => {
      return document.querySelectorAll('.load-more__item').length;
    });

    t.is(numItems, 3);

    await button.click();

    const updatedNumItems = await page.evaluate(() => {
      return document.querySelectorAll('.load-more__item').length;
    });

    t.is(updatedNumItems, 4);
  }
);

test('load-more: can be restarted', withPage, async (t, page) => {
  await page.setContent(html`
    <load-more
      total="3"
      take="1"
      i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
    >
      <div class="load-more__item" id="1">Initial item</div>
    </load-more>
  `);

  await addPageScript(page, '_load-more.js');

  await page.evaluate(() => {
    const all = [
      '<div class="load-more__item" id="1">Initial item</div>',
      '<div class="load-more__item" id="2">Loaded item</div>',
      '<div class="load-more__item" id="3">Loaded item</div>',
    ];

    document.querySelector('load-more').fetchItems = (skip, take) => {
      return {
        items: all.slice(skip, take + skip),
      };
    };
  });

  const button = await page.$('button');
  await button.click();

  const numItems = await page.evaluate(() => {
    return document.querySelectorAll('.load-more__item').length;
  });

  t.is(numItems, 2);

  await page.evaluate(() => {
    document.querySelector('load-more').restart();
  });

  const updatedNumItems = await page.evaluate(() => {
    return document.querySelectorAll('.load-more__item').length;
  });

  t.is(updatedNumItems, 1);
});

test(
  'load-more: works as expected without initial items',
  withPage,
  async (t, page) => {
    await page.setContent(html`
      <load-more
        total="5"
        take="2"
        i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
      ></load-more>
    `);

    await addPageScript(page, '_load-more.js');

    await page.evaluate(() => {
      const all = [
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item</div>',
      ];

      document.querySelector('load-more').fetchItems = (skip, take) => {
        return {
          items: all.slice(skip, take + skip),
        };
      };
    });

    const button = await page.$('button');
    await button.click();

    const numItems = await page.evaluate(() => {
      return document.querySelectorAll('.load-more__item').length;
    });

    t.is(numItems, 2);

    await button.click();

    const updatedNumItems = await page.evaluate(() => {
      return document.querySelectorAll('.load-more__item').length;
    });

    t.is(updatedNumItems, 4);
  }
);

test('load-more: handles errors gracefully', withPage, async (t, page) => {
  await page.setContent(html`
    <load-more
      total="5"
      take="2"
      i18n='{"buttonLabel":"","errorMessage":"An error occured","errorLinkLabel":"","noResultsMessage":""}'
    ></load-more>
  `);

  await addPageScript(page, '_load-more.js');

  await page.evaluate(() => {
    document.querySelector('load-more').fetchItems = () => {
      throw Error('Unable to fetch items');
    };
  });

  const button = await page.$('button');
  await button.click();

  const errorText = await page.evaluate(() => {
    return document.querySelector('.load-more__error').innerText;
  });

  t.is(errorText, 'An error occured');
});

test('load-more: handles no matches gracefully', withPage, async (t, page) => {
  await page.setContent(html`
    <load-more
      total="5"
      take="5"
      i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":"No results found"}'
    ></load-more>
  `);

  await addPageScript(page, '_load-more.js');

  await page.evaluate(() => {
    document.querySelector('load-more').fetchItems = () => {
      return {
        items: [],
      };
    };
  });

  const button = await page.$('button');
  await button.click();

  const message = await page.evaluate(() => {
    return document.querySelector('.load-more__noResults').innerText;
  });

  t.is(message, 'No results found');
});

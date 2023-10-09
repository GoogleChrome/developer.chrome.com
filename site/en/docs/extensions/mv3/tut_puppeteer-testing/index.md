---
layout: "layouts/doc-post.njk"
title: "Tutorial: Testing Chrome Extensions with Puppeteer"
seoTitle: "Tutorial: Testing Chrome Extensions with Puppeteer"
date: 2023-10-09
description: How to write an automated test for Chrome Etensions in Puppeteer.
---

_For general advice on testing extensions, see
[Automated testing for Chrome Extensions][automated-testing]._

[Puppeteer][puppeteer] provides a framework for building automated tests of websites, which also
includes the ability to test Chrome Extensions. These are high-level integration tests that test the
functionality of a website or extension once it has been built into the final product.

## Before you start

Clone or download the [chrome-extensions-samples][samples-repo] repository. We'll use the history
API demo in `api-samples/history/showHistory` as our test extension.

You'll also need to install [Node.JS][node] which is the runtime Puppeteer is built on.

## Writing your test

### Step 1: Start your Node.JS project

We need to set up a basic Node.JS project. In a new folder, create a `package.json` file with the
following:

```js
{
  "name": "puppeteer-demo",
  "version": "1.0"
}
```

Similar to an extension's manifest.json file, this file is required by all Node projects.

### Step 2: Install Puppeteer

Run `npm install puppeteer` to add Puppeteer as a dependency. It will be automatically added to your
`package.json` file.

### Step 3: Create an entry point

In a new file called `index.js`, add the following:

```js
const puppeteer = require('puppeteer');

const EXTENSION_PATH = '../../api-samples/history/showHistory';
const EXTENSION_ID = 'jkomgjfbbjocikdmilgaehbfpllalmia';

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`
    ]
  });
}

run();
```

Run `node index.js` and you should see Chrome open with your extension loaded.

### Step 4: Add an alias

To make running the tests easier, add an alias to your `package.json` file:

```js
{
  "name": "puppeteer-demo",
  "version": "1.0",
  "dependencies": {
    "puppeteer": "^21.3.6"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

You can now use `npm start` to run your test suite.

### Step 6: Open the popup

Let's open the popup in a new page. We need to do this because Puppeteer does not support accessing
an extension popup from the popup window. Add the following code:

```js
const page = await browser.newPage();
await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
```

The method `browser.newPage()` actually supports an optional URL parameter, but unfortunately this
does not support URLs with the `chrome-extension://` scheme. Consequently, we first open a page and
then call `page.goto()` to navigate.

### Step 7: Assert the current state

Let's assert something, so that our test can fail if the extension isn't behaving as expected. We
know that our popup should show recently visited pages, so let's check that we see one:

```js
const list = await page.$('ul');
const children = await list.$$('li');

if (children.length !== 1) {
  throw new Error('Unexpected number of list elements!');
}
```

You may want to use an assertion library or test framework for simplifying code like this. Popular
libraries include [assert][assert] and [mocha][mocha].

### Step 8: Close the browser

When you've finished testing, run the following to close the browser:

```js
await browser.close();
```

You can see the [full project][full-project] in our chrome-extensions-samples repository.

## Next Steps

After mastering the basics, try building a test suite for your own extension. The Puppeteer [API reference][api-reference] contains more information about what's possible - there are many capabilities not described here.

[automated-testing]: /docs/extensions/mv3/automated-testing
[puppeteer]: https://github.com/puppeteer/puppeteer
[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
[node]: https://nodejs.org/
[mocha]: https://www.npmjs.com/package/mocha
[assert]: https://www.npmjs.com/package/assert
[full-project]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.puppeteer
[api-reference]: https://pptr.dev/api
[consistent-id]: /docs/extensions/mv3/automated-testing/#setting-an-extension-id

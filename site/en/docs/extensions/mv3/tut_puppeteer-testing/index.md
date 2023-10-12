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
includes the ability to test Chrome Extensions. These are high-level end-to-end tests that test the
functionality of a website or extension once it has been built into the final product. In this
tutorial, we demonstrate how to write a basic test for an extension from our samples repository.

## Before you start {: #prereq }

Clone or download the [chrome-extensions-samples][samples-repo] repository. We'll use the history
API demo in `api-samples/history/showHistory` as our test extension.

You'll also need to install [Node.JS][node] which is the runtime Puppeteer is built on.

## Writing your test {: #write-test }

### Step 1: Start your Node.JS project {: #step-1 }

We need to set up a basic Node.JS project. In a new folder, create a `package.json` file with the
following:

{% Label %}pacakge.json:{% endLabel %}

```js
{
  "name": "puppeteer-demo",
  "version": "1.0"
}
```

Similar to an extension's `manifest.json` file, this file is required by all Node projects.

### Step 2: Install Puppeteer and Jest {: #step-2 }

Run `npm install puppeteer jest` to add Puppeteer and Jest as dependencies. They will be
automatically added to your `package.json` file.

It is possible to write standalone Puppeteer tests, but we'll use Jest as a test runner to provide
some additional structure to our code.

### Step 3: Create an entry point {: #step-3 }

Create a new file called `index.test.js` and add the following code:

{% Aside %}
Jest adds `beforeEach` and `afterEach` to our environment when running the tests, so we do not need
to import them. However, you may need to configure [ESLint][eslint] or [TypeScript][typescript]
accordingly.
{% endAside %}

{% Label %}index.test.js:{% endLabel %}

```js
const puppeteer = require('puppeteer');

const EXTENSION_PATH = '../../api-samples/history/showHistory';
const EXTENSION_ID = 'jkomgjfbbjocikdmilgaehbfpllalmia';

let browser;

beforeEach(async () => {
  // TODO: Launch the browser.
});

afterEach(async () => {
  // TODO: Close the browser.
});
```

### Step 4: Launch the browser {: #step-4 }

{% Aside %}
In this example, `headless` is set to `false`. This causes the browser window to be visible while
the tests are running which can be helpful during development. Outside of development, consider
setting it to `'new'` which uses Chrome's [new headless mode][new-headless].
{% endAside %}

Update `beforeEach` and `afterEach` to launch and close the browser. When running many tests, you
may wish to consider using the same browser. However, this is generally discouraged as it reduces
the isolation between your tests and may cause one test to impact the outcome of another.

{% Label %}index.test.js:{% endLabel %}

```js
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`
    ]
  });
});

afterEach(async () => {
  await browser.close();
  browser = undefined;
});
```

### Step 5: Add an alias {: #step-5 }

To make running the tests easier, add an alias to your `package.json` file:

{% Label %}package.json:{% endLabel %}

```js
{
  "name": "puppeteer-demo",
  "version": "1.0",
  "dependencies": {
    "puppeteer": "^21.3.6"
  },
  "scripts": {
    "start": "jest ."
  }
}
```

This will run all files ending in `.test.js` in the current directory.

### Step 6: Open the popup {: #step-6 }

Let's add a basic test that opens the popup in a new page. We need to do this because Puppeteer
does not support accessing an extension popup from the popup window. Add the following code:

{% Label %}index.test.js:{% endLabel %}

```js
test('popup renders correctly', async () => {
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
});
```

### Step 7: Assert the current state {: #step-7 }

Let's assert something, so that our test can fail if the extension isn't behaving as expected. We
know that our popup should show recently visited pages, so let's check that we see one:

{% Label %}index.test.js:{% endLabel %}

```js
test('popup renders correctly', async () => {
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);

  const list = await page.$('ul');
  const children = await list.$$('li');

  expect(children.length).toBe(1);
});
```

### Step 8: Run your test {: #step-8 }

To run the test, use `npm start`. You should see output indicating that your test passed.

You can see the [full project][full-project] in our chrome-extensions-samples repository.

## Next Steps {: #next-steps }

After mastering the basics, try building a test suite for your own extension. The Puppeteer
[API reference][api-reference] contains more information about what's possible - there are many
capabilities not described here.

[automated-testing]: /docs/extensions/mv3/automated-testing
[puppeteer]: https://github.com/puppeteer/puppeteer
[samples-repo]: https://github.com/GoogleChrome/chrome-extensions-samples
[node]: https://nodejs.org/
[new-headless]: https://developer.chrome.com/articles/new-headless/
[full-project]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.puppeteer
[api-reference]: https://pptr.dev/api
[consistent-id]: /docs/extensions/mv3/automated-testing/#setting-an-extension-id
[eslint]: https://www.npmjs.com/package/eslint-plugin-jest
[typescript]: https://jestjs.io/docs/getting-started#type-definitions

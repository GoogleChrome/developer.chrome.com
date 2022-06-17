---
layout: 'layouts/doc-post.njk'
title: Debugging Puppeteer
description: >
  Some tips to help solve common problems.
date: 2018-01-11
updated: 2022-06-16

---

## Turn off headless mode

Sometimes it's useful to see what the browser is displaying. Instead of launching in headless mode, launch a full version of the browser using `headless: false`:

```javascript
const browser = await puppeteer.launch({ headless: false });
```

## Slow it down

The `slowMo` option slows down Puppeteer operations by the specified amount of milliseconds. It's another way to help see what's going on.

```javascript
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250, // slow down by 250ms
});
```

## Capture console output

You can listen for the `console` event. This is also handy when debugging code in `page.evaluate()`:

```javascript
page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

await page.evaluate(() => console.log(`url is ${location.href}`));
```

## Use debugger in application code browser

There are two execution context: node.js that is running test code, and the browser running application code being tested. This lets you debug code in the application code browser; the code inside `evaluate()`.

## Use `{devtools: true}` when launching Puppeteer


const browser = await puppeteer.launch({ devtools: true });
Change default test timeout:

jest: jest.setTimeout(100000);

jasmine: jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

mocha: this.timeout(100000); (don't forget to change test to use function and not '=>')

Add an evaluate statement with debugger inside / add debugger to an existing evaluate statement:


await page.evaluate(() => {
  debugger;
});
The test will now stop executing in the above evaluate statement, and chromium will stop in debug mode.

Use debugger in node.js

This will let you debug test code. For example, you can step over await page.click() in the node.js script and see the click happen in the application code browser.

Note that you won't be able to run await page.click() in DevTools console due to this Chromium bug. So if you want to try something out, you have to add it to your test file.

Add debugger; to your test, eg:


debugger;
await page.click('a[target=_blank]');
Set headless to false

Run node --inspect-brk, eg node --inspect-brk node_modules/.bin/jest tests

In Chrome open chrome://inspect/#devices and click inspect

In the newly opened test browser, type F8 to resume test execution

Now your debugger will be hit and you can debug in the test browser

Enable verbose logging - internal DevTools protocol traffic will be logged via the debug module under the puppeteer namespace.


 # Basic verbose logging
 env DEBUG="puppeteer:*" node script.js

 # Protocol traffic can be rather noisy. This example filters out all Network domain messages
 env DEBUG="puppeteer:*" env DEBUG_COLORS=true node script.js 2>&1 | grep -v '"Network'
Debug your Puppeteer (node) code easily, using ndb

npm install -g ndb (or even better, use npx!)

add a debugger to your Puppeteer (node) code

add ndb (or npx ndb) before your test command. For example:

ndb jest or ndb mocha (or npx ndb jest / npx ndb mocha)

debug your test inside chromium like a boss!


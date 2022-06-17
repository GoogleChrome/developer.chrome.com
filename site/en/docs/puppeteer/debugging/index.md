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

Use `{devtools: true}` when launching Puppeteer

```javascript
const browser = await puppeteer.launch({ devtools: true });
```

Change default test timeout

- **jest:** `jest.setTimeout(100000);`
- **jasmine:** `jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;`
- **mocha:** `this.timeout(100000);` (don't forget to change test to use [function and not '=>'](https://stackoverflow.com/a/23492442))

Add an evaluate statement with debugger inside or add debugger to an existing evaluate statement:

```javascript
await page.evaluate(() => {
  debugger;
});
```

The test will now stop executing in the above evaluate statement, and chromium will stop in debug mode.

## Use debugger in node.js

This will let you debug test code. For example, you can step over `await page.click()` in the node.js script and see the click happen in the application code browser.

Note that you won't be able to run `await page.click()` in DevTools console due to [this Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=833928). So if you want to try something out, you have to add it to your test file.

1. Add debugger; to your test, for example:
```javascript
debugger;
await page.click('a[target=_blank]');
```
2. Set headless to false.

3. Run node `--inspect-brk`, for example, `node --inspect-brk node_modules/.bin/jest tests`.

4. In Chrome open `chrome://inspect/#devices` and click `inspect`.

5. In the newly opened test browser, type `F8` to resume test execution.

6. Now your debugger will be hit and you can debug in the test browser

## Enable verbose logging

Internal DevTools protocol traffic will be logged via the debug module under the puppeteer namespace.

```javascript
# Basic verbose logging
env DEBUG="puppeteer:*" node script.js

# Protocol traffic can be rather noisy. This example filters out all Network domain messages
env DEBUG="puppeteer:*" env DEBUG_COLORS=true node script.js 2>&1 | grep -v '"Network'
```

## Debug your Puppeteer (node) code 

Use [ndb](https://github.com/GoogleChromeLabs/ndb):

- `npm install -g ndb` (or use [npx](https://github.com/zkat/npx)).
- Add a debugger to your Puppeteer (node) code.
- Add `ndb` (or `npx ndb`) before your test command. For example:
  `ndb jest` or `ndb mocha` (or `npx ndb jest` / `npx ndb mocha`).
- debug your test inside chromium like a boss!


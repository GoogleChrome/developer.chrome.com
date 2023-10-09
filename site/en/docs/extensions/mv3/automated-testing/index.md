---
layout: "layouts/doc-post.njk"
title: "Automated testing for Chrome Extensions"
seoTitle: "Automated testing for Chrome Extensions"
date: 2023-10-09
description: How to write automated tests for extensions.
---

Automated testing tools provide a great way to regularly test a large amount of your extension's
functionality. This can be useful to ensure key functionality is working and as a way to avoid
regressions between releases.

## Unit testing

[Unit testing][unit-testing] allows small sections of code to be tested in isolation from the rest
of your extension, and outside of the browser.

Code written without using extension APIs can be tested as normal, using a framework such as
[Jest][jest]. To make code easier to test this way, consider using techniques such as
[dependency injection][dependency-injection] which can help to remove dependencies on the chrome
namespace in your lower level implementation.

If you need to test code which includes extension APIs, consider using mocks.

### Example: Using mocks with Jest

Create a `jest.config.js` file, which declares a setup file that will run before all tests:

```js
module.exports = {
  setupFiles: ['<rootDir>/mock-extension-apis.js']
};
```

In `mock-extension-apis.js`, add implementations for the specific functions you expect to call:

```js
global.chrome = {
  tabs: {
    query: async () => { throw new Error("Unimplemented.") };
  }
};
```

Then, use jest.spy to mock a return value in a test:

```js
test("getActiveTabId returns active tab ID", async () => {
  jest.spyOn(chrome.tabs, "query").mockResolvedValue([{
    id: 3,
    active: true,
    currentWindow: true
  }]);
  expect(await getActiveTabId()).toBe(3);
});
```

## Integration testing

[Integration testing][integration-testing] involves an extension package being built and loaded into
a browser. A testing tool communicates with the browser to automate interactions and test the same
flows that a user would go through.

See [Testing Chrome Extensions with Puppeteer][tutorial] for a tutorial.

### Libraries

Extensions are supported by a range of integration testing libraries.

| Library                | Guidance                                                                                                                              |
|------------------------|:-------------------------------------------------------------------------------------------------------------------------------------:|
| Puppeteer / Playwright | See Chrome Extensions ([Puppeteer][puppeteer-testing] / [Playwright][playwright-testing]).                                            |
| Selenium               | Use the [ChromeOptions][selenium-chromeoptions] object to load extensions. More information is available [here][selenium-extensions]. |
| WebDriverIO            | See [Web Extension Testing][webdriverio-testing].                                                                                     |

### Headless Chrome

When running tests as part of an automated workflow, it is often necessary to load your extension on a machine that does not have a screen. Chrome's [new headless][new-headless] mode allows Chrome to be run in an unattended environment like this. Simply start Chrome with the `--headless=new` flag (headless currently defaults to "old", which does not support loading extensions). Depending on the automation tool you choose there may be a setting which adds the flag for you automatically.

### Setting an extension ID

It is often desirable to have a fixed extension ID in tests. This makes a number of common tasks easier such as allow-listing the extension's origin on a server it needs to communicate with, or opening extension pages within tests. To do this, follow the steps under [Keeping a consistent extension ID][consistent-id].

### Testing extension pages

Extension pages can be accessed using their corresponding URL, e.g `chrome-extension://<id>/index.html`. Use the normal navigation methods available in your automation tool of choice to navigate to these URLs.

### Testing an extension popup

Opening an extension popup in the context of another page is not currently possible. Instead, open the popup's URL in a new tab. If your popup uses the active tab, consider implementing an override where a tab ID can be passed explicitly to your popup. For example:

```js
const URL_PARAMS  = new URLSearchParams(window.location.search);

async function getActiveTab() {
  // Open popup.html?tab=5 to use tab ID 5, etc.
  if (URL_PARAMS.has("tab")) {
    return parseInt(URL_PARAMS.get("tab"));
  }

  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  return tabs[0];
}
```

### Inspecting extension state

It is generally best practice to avoid accessing internal state in an integration test, and instead you should base your tests on what is visible to the user. However, it can sometimes be desirable to directly access data from the extension. In these cases, consider executing code in the context of an extension page.

In Puppeteer:

```js
const workerTarget = await browser.waitForTarget(
  target => target.type() === 'service_worker'
);
const worker = await workerTarget.worker();

const value = await worker.evaluate(() => {
  chrome.storage.local.get('foo');
});
```

In Selenium:

```js
// Selenium doesn't allow us to access the background page, so we need to open an extension page we can execute the code in
await driver.get('chrome-extension://<id>/popup.html');
await driver.executeAsyncScript(
  'const callback = arguments[arguments.length - 1];' +
  'chrome.storage.local.get(\'foo\').then(callback);'
);
```

[unit-testing]: https://wikipedia.org/wiki/Unit_testing
[jest]: https://jestjs.io/
[dependency-injection]: https://wikipedia.org/wiki/Dependency_injection
[integration-testing]: https://wikipedia.org/wiki/Integration_testing
[puppeteer-testing]: https://pptr.dev/guides/chrome-extensions
[playwright-testing]: https://playwright.dev/docs/chrome-extensions
[selenium-chromeoptions]: https://www.selenium.dev/documentation/webdriver/browsers/chrome/
[selenium-extensions]: https://chromedriver.chromium.org/extensions
[webdriverio-testing]: https://webdriver.io/docs/extension-testing/web-extensions/
[new-headless]: /articles/new-headless/
[consistent-id]: /docs/extensions/mv3/manifest/key/#keep-consistent-id
[tutorial]: /docs/extensions/mv3/tut_puppeteer-testing/

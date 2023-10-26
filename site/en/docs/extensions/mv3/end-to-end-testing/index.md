---
layout: "layouts/doc-post.njk"
title: "End-to-end testing for Chrome Extensions"
seoTitle: "End-to-end testing Chrome Extensions"
date: 2023-10-12
description: How to write end-to-end tests for extensions.
---

End-to-end testing involves an extension package being built and loaded into a browser. A testing
tool communicates with the browser to automate interactions and test the same flows that a user
would go through. A library that supports end-to-end testing will generally provide ways of
controlling the browser, simulating user input and observing the current state of any open pages.

See [Testing Chrome Extensions with Puppeteer][tutorial] for a tutorial and [Unit testing][unit-testing] for details on writing unit tests for Chrome extensions.

## Using browser testing libraries {: #libraries }

Extensions are supported by a range of testing libraries.

| Library                | Guidance                                                                                                                              |
|:------------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| Puppeteer / Playwright | See Chrome Extensions ([Puppeteer][puppeteer-testing] / [Playwright][playwright-testing]).                                            |
| Selenium               | Use the [ChromeOptions][selenium-chromeoptions] object to load extensions. More information is available [here][selenium-extensions]. |
| WebDriverIO            | See [Web Extension Testing][webdriverio-testing].                                                                                     |

## Running tests in headless Chrome {: #headless }

When running tests as part of an automated workflow, it is often necessary to load your extension on
a machine that does not have a screen. Chrome's [new headless][new-headless] mode allows Chrome to
be run in an unattended environment like this. Start Chrome using the `--headless=new` flag
(headless currently defaults to "old", which does not support loading extensions). Depending on the
automation tool you choose, there may be a setting that adds the flag for you automatically.

## Setting an extension ID {: #set-extension-id }

It is often desirable to have a fixed extension ID in tests. This makes many common tasks easier such as allow-listing the extension's origin on a server it needs to communicate with, or opening extension pages within tests. To do this, follow the steps under [Keeping a consistent extension ID][consistent-id].

## Testing extension pages {: #extension-pages }

Extension pages can be accessed using their corresponding URL, e.g `chrome-extension://<id>/index.html`. Use the normal navigation methods available in your automation tool of choice to navigate to these URLs.

## Testing an extension popup {: #extension-popup }

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

## Inspecting extension state {: #inspect-state }

To avoid test failures when you change the internal behavior of your extension, it is generally best
practice to avoid accessing internal state in an integration test. Instead, you should base your
tests on what is visible to the user. However, it can sometimes be desirable to directly access data
from the extension. In these cases, consider executing code in the context of an extension page.

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
// Selenium doesn't allow us to access the service worker, so we need to open an extension page where we can execute the code
await driver.get('chrome-extension://<id>/popup.html');
await driver.executeAsyncScript(
  'const callback = arguments[arguments.length - 1];' +
  'chrome.storage.local.get(\'foo\').then(callback);'
);
```

[puppeteer-testing]: https://pptr.dev/guides/chrome-extensions
[playwright-testing]: https://playwright.dev/docs/chrome-extensions
[selenium-chromeoptions]: https://www.selenium.dev/documentation/webdriver/browsers/chrome/
[selenium-extensions]: https://chromedriver.chromium.org/extensions
[webdriverio-testing]: https://webdriver.io/docs/extension-testing/web-extensions/
[new-headless]: /articles/new-headless/
[consistent-id]: /docs/extensions/mv3/manifest/key/#keep-consistent-id
[tutorial]: /docs/extensions/mv3/tut_puppeteer-testing/
[unit-testing]: /docs/extensions/mv3/unit-testing


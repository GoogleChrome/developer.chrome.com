---
title: 'WebDriver BiDi: 2023 status update'
description: >
  This article gives an overview of what’s new in WebDriver BiDi in 2023.
layout: layouts/blog-post.njk
authors:
  - mathiasbynens
date: 2023-05-09
updated: 2023-05-11
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nrI18Gn6bcbje10UnJBj.jpg'
alt: ''
tags:
  - test-automation
  - devtools
---

{% YouTube id='6oXic6dcn9w', startTime='550' %}

This article gives an overview of what’s new in WebDriver BiDi in 2023.

## What is WebDriver BiDi?

WebDriver is a browser automation protocol, defined as a W3C standard, with implementations in ChromeDriver, GeckoDriver, and WebKitDriver.

Chromium also has its own proprietary browser automation protocol: the Chrome DevTools Protocol, or CDP.

There are some fundamental differences between these two protocols: WebDriver is an interoperable standard, but the protocol is less efficient and lacks features that CDP has. In contrast, CDP is more efficient and powerful, but less interoperable.

That’s why in 2020, [the W3C Browser Testing and Tools Working Group](https://www.w3.org/groups/wg/browser-tools-testing) began work on [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), a new standard browser automation protocol that bridges the gap between the WebDriver Classic and CDP protocols. The best of both worlds! Read [A look back in time: the evolution of test automation](/blog/test-automation-evolution/) and [WebDriver BiDi — the future of cross-browser automation](/articles/webdriver-bidi/) for more background.

The WebDriver BiDi effort involves standardization work, the creation of Web Platform Tests, and implementations for different browser engines.

## Where are we now?

In 2022, both [Chrome/ChromeDriver 106](https://crbug.com/chromedriver/4016) and [Firefox 102](https://bugzilla.mozilla.org/show_bug.cgi?id=1753997) shipped support for the WebDriver BiDi standard.

Since then, WebDriver BiDi gained adoption in popular frameworks, addressing top developer pain points by unlocking highly requested features such as [logging support](https://www.selenium.dev/documentation/webdriver/bidirectional/bidirectional_w3c/log/).

### Logging powered by WebDriver BiDi

A common use case is to automatically verify that a web page loads without any console logs, warnings, or errors and without any uncaught JavaScript exceptions. Another use case is that you may wish to write an automated test to check that a web page logs a warning or throws an exception when intended. These problems can’t be solved using WebDriver Classic because [it’s not bidirectional](/blog/test-automation-evolution/#what-are-the-low-level-controls). WebDriver BiDi now makes this possible.

Here’s an example implementation of the second use case using [Selenium](https://www.selenium.dev/)’s JavaScript language bindings:

```js
import * as assert from 'node:assert';
import { Builder, LogInspector } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().enableBidi())
  .build();

const inspector = await LogInspector(driver);
await inspector.onConsoleEntry((entry) => {
  console.log(`Console message received: [${
    entry.type}][${entry.level}] ${entry.text}`);
});

await driver.get('https://www.selenium.dev/selenium/web/bidi/logEntryAdded.html');
await driver.findElement({ id: 'consoleLog' }).click();

await driver.quit();
```

Here’s an example using [Puppeteer’s experimental WebDriver BiDi support](https://puppeteer.github.io/ispuppeteerwebdriverbidiready/):


```js
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  protocol: 'webDriverBiDi',
  headless: 'new',
});

const context = await browser.createIncognitoBrowserContext();
const page = await context.newPage();

page.on('console', (message) => {
  console.log(`Console message received: [${
    message.type()
  }] ${message.text()}`);
});

await page.goto(`https://www.selenium.dev/selenium/web/bidi/logEntryAdded.html`);
await page.evaluate(() => {
  document.querySelector('#consoleLog').click();
});

await browser.close();
```

The same functionality is available via other abstractions such as [WebdriverIO](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/#webdriver-bidi-support).

### A shared public roadmap

We’re still fleshing out the WebDriver BiDi specification in collaboration with other browser vendors and industry stakeholders who participate in the W3C Working Group. The group recently agreed on [a shared roadmap](https://github.com/w3c/webdriver-bidi/blob/HEAD/roadmap.md), aligning the upcoming specification and implementation work around clear user-facing end-to-end use cases.

### Interoperability

As the Working Group collectively specifies more features, we also create [Web Platform Tests](https://github.com/web-platform-tests/wpt/tree/master/webdriver/tests/bidi) for the WebDriver BiDi protocol. This shared test suite helps us verify correctness and interoperability of implementations. You can view the latest test results for various browsers on [the WPT Dashboard](https://wpt.fyi/results/webdriver/tests/bidi).

## Supporting WebDriver BiDi: How can you help?

Are you excited about the future of browser automation with WebDriver BiDi? Here’s how you can show your support:

- Be an **early tester and adopter** and help shape the future of WebDriver BiDi.
- **Spread the word!** Share the project on social media using the hashtag `#WebDriverBiDi`.
- **Ask for support.** File a feature request or check with your favorite tools on their plans for adopting WebDriver BiDi.
- **Participate in [the spec discussions](https://github.com/w3c/webdriver-bidi/issues).**

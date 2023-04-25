---
layout: 'layouts/doc-post.njk'
title: Puppeteer quick start
description: >
  Install and run Puppeteer.
date: 2018-01-11
updated: 2022-06-16

---

## Installation

To use Puppeteer in your project, run:

```shell
npm i puppeteer
# or "yarn add puppeteer"
```

{% Aside %}
When you install Puppeteer, it downloads a recent version of Chromium (~170MB Mac, ~282MB Linux, ~280MB Win) that is guaranteed to work with the API. To skip the download, download into another path, or download a different browser, see Environment variables.
{% endAside %}

### puppeteer-core

Since version 1.7.0 we publish the `puppeteer-core` package, a version of Puppeteer that doesn't download any browser by default.

```shell
npm i puppeteer-core
# or "yarn add puppeteer-core"
```

`puppeteer-core` is intended to be a lightweight version of Puppeteer for launching an existing browser installation or for connecting to a remote one. Be sure that the version of puppeteer-core you install is compatible with the browser you intend to connect to.

See [puppeteer vs puppeteer-core](https://pptr.dev/#puppeteer-core).

## Usage

Puppeteer follows the latest [maintenance LTS](https://github.com/nodejs/Release#release-schedule) version of Node.

{% Aside %}
Prior to v1.18.1, Puppeteer required at least Node v6.4.0. Versions from v1.18.1 to v2.1.0 rely on Node 8.9.0+. Starting from v3.0.0 Puppeteer starts to rely on Node 10.18.1+. All examples below use async/await which is only supported in Node v7.6.0 or greater.
{% endAside %}

Puppeteer will be familiar to people using other browser testing frameworks. You create an instance of `Browser`, open pages, and then manipulate them with [Puppeteer's API](https://pptr.dev/api).

**Example:** navigating to `https://example.com` and saving a screenshot as example.png:

Save file as `example.js`.

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
```

Puppeteer sets an initial page size to 800×600px, which defines the screenshot size. The page size can be customized with [Page.setViewport()](https://pptr.dev/api/puppeteer.page.setviewport/).

**Example:** create a PDF.

Save file as `hn.js`.

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({ path: 'hn.pdf', format: 'a4' });

  await browser.close();
})();
```

Execute script on the command line:

```shell
node hn.js
```

See [Page.pdf()](https://pptr.dev/api/puppeteer.pdfoptions) for more information about creating pdfs.

**Example:** evaluate script in the context of the page

Save file as `get-dimensions.js`:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
})();
```

Execute script on the command line:

```shell
node get-dimensions.js
```

See [Evaluate JavaScript](https://pptr.dev/guides/evaluate-javascript) for more information on evaluate and related methods such as `evaluateOnNewDocument` and `exposeFunction`.

## Default runtime settings

### Uses Headless mode

Puppeteer launches Chromium in [headless mode](/blog/headless-chrome/). To launch a full version of Chromium, set the [`headless`](https://pptr.dev/api/puppeteer.puppeteerlaunchoptions) option when launching a browser:

```shell
const browser = await puppeteer.launch({ headless: false }); // default is true
```

### Runs a bundled version of Chromium

By default, Puppeteer downloads and uses a specific version of Chromium so its API is guaranteed to work out of the box. To use Puppeteer with a different version of Chrome or Chromium, pass in the executable's path when creating a `Browser` instance:

```shell
const browser = await puppeteer.launch({ executablePath: '/path/to/Chrome' });
```

You can also use Puppeteer with Firefox Nightly (experimental support). See [`Puppeteer.launch()`](https://pptr.dev/api/puppeteer.puppeteerlaunchoptions) for more information.

See [this article](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [This article](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.

### Creates a fresh user profile

Puppeteer creates its own browser user profile which it cleans up on every run.

## Next steps

* Learn more about [Headless Chrome](/blog/headless-chrome/).
* Look over the [examples](/docs/puppeteer/examples).

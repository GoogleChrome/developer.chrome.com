---
layout: 'layouts/blog-post.njk'
title: 'Chrome’s Headless mode gets an upgrade: introducing `--headless=new`'
description: >
  Chrome’s Headless mode just got a whole lot better! This article presents an overview of recent engineering efforts to make Headless more useful for developers by bringing Headless closer to Chrome’s regular “headful” mode.
subhead: >
  Chrome’s Headless mode just got a whole lot better!
date: 2023-02-22
updated: 2023-02-23
authors:
  - mathiasbynens
  - peterkvitek
tags:
  - automation
  - headless
  - chrome-112
hero: 'image/C47gYyWYVMMhDmtYSLOWazuyePF2/4aFaaP1sKJYHK7V4CaDg.png'
alt: ''
---

Chrome’s Headless mode just got a whole lot better! This article presents an overview of recent engineering efforts to make Headless more useful for developers by bringing Headless closer to Chrome’s regular “headful” mode.

## Background

[Back in 2017](/blog/headless-chrome/), Chrome 59 introduced the so-called Headless mode, which lets you run the browser in an unattended environment without any visible UI. Essentially, running Chrome without chrome!

Headless mode is a popular choice for browser automation through projects like [Puppeteer](/docs/puppeteer/) or [ChromeDriver](https://chromedriver.chromium.org/). Here’s a minimal command-line example of using Headless mode to create a PDF file of a given URL:

```sh
chrome --headless --print-to-pdf https://developer.chrome.com/
```

## What’s new in Headless?

Before we dive into the recent Headless improvements, it’s important to understand how the “old” Headless worked. The command-line snippet we showed earlier uses the `--headless` command-line flag, suggesting that Headless is just a mode of operation of the regular Chrome browser. Perhaps surprisingly, this wasn’t actually true. Technically, **the old Headless was [a separate, alternate browser implementation](https://source.chromium.org/chromium/chromium/src/+/main:headless/;drc=c67febd82ae3e18ac8db1397f4ccfa87b0da2ffc)** that happened to be shipped as part of the same Chrome binary. It doesn’t share any of the Chrome browser code in [`//chrome`](https://source.chromium.org/chromium/chromium/src/+/main:chrome/).

As you might imagine, implementing and maintaining this separate Headless browser came with a lot of engineering overhead — but that wasn’t the only problem. Because Headless was a separate implementation, it had its own bugs and features that weren’t present in headful Chrome. This created a confusing situation where any automated browser test might pass in headful mode but fail in Headless mode, or vice versa — a major pain point for automation engineers. It also excluded any automated testing that relied on having a browser extension installed, for example. The same goes for any other browser-level functionality: unless Headless had its own, separate implementation of it, it wasn’t supported.

In 2021, the Chrome team set out to solve this problem, and unify Headless and headful modes once and for all.

{% Img src="image/ZQjEes3OsyYCDLE5837FjNRQ1Gw2/K9FXq7WkolxhfVmYCnAO.svg", alt="The new Chrome Headless is no longer a separate browser implementation, and now instead shares code with Chrome.", width="500", height="516" %}

We’re excited to announce that the new Headless mode is now available in Chrome 112! In this mode, Chrome creates but doesn’t display any platform windows. All other functionality, existing and future, is available with no limitations.

## Try out the new Headless

To try the new Headless mode, pass the `--headless=new` command-line flag:

```sh
chrome --headless=new
```

For now, the old Headless mode is still available via:

```sh
chrome --headless=old
```

Currently, passing the `--headless` command-line flag without an explicit value still activates the old Headless mode — but we plan to change this default to new Headless over time.

We plan to completely remove the old Headless from the Chrome binary and stop supporting this mode in Puppeteer later this year. As part of this removal, we’ll make the old Headless available as a separate standalone binary for those users who can’t upgrade yet.

### New Headless in Puppeteer

To opt in to the new Headless mode in Puppeteer:

```js
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  // `headless: true` (default) enables old Headless;
  // `headless: 'new'` enables new Headless;
  // `headless: false` enables “headful” mode.
});

const page = await browser.newPage();
await page.goto('https://developer.chrome.com/');

// …

await browser.close();
```

### New Headless in Selenium-WebDriver

To use the new Headless mode in Selenium-WebDriver:

```js
const driver = await env
  .builder()
  .setChromeOptions(options.addArguments('--headless=new'))
  .build();

await driver.get('https://developer.chrome.com/');

// …

await driver.quit();
```


See [the Selenium team’s blog post](https://www.selenium.dev/blog/2023/headless-is-going-away/#what-are-the-two-headless-modes) for more information, including examples using other language bindings.

### Headless-specific command-line flags

The following command-line flags are available for the new Headless mode.

#### `--dump-dom`

The `--dump-dom` flag prints the serialized DOM of the target page to stdout. Here’s an example:

```sh
chrome --headless=new --dump-dom https://developer.chrome.com/
```

Note that this is different from simply printing the HTML source code (which you might do with `curl`). To bring you the output of `--dump-dom`, Chrome first parses the HTML code into a DOM, executes any `<script>` that might alter the DOM, and then turns that DOM back into a serialized string of HTML.

#### `--screenshot`

The `--screenshot` flag takes a screenshot of the target page and saves it as `screenshot.png` in the current working directory. It’s especially useful in combination with the `--window-size` flag. Here’s an example:

```sh
chrome --headless=new --screenshot --window-size=412,892 https://developer.chrome.com/
```

#### `--print-to-pdf`

The `--print-to-pdf` flag saves the target page as a PDF named `output.pdf` in the current working directory. Here’s an example:

```sh
chrome --headless=new --print-to-pdf https://developer.chrome.com/
```

Optionally, you can add the `--no-pdf-header-footer` flag to omit the print header (with the current date and time) and footer (with the URL and the page number).

```sh
chrome --headless=new --print-to-pdf --no-pdf-header-footer https://developer.chrome.com/
```

{% Aside %}
The functionality behind the `--no-pdf-header-footer` flag was previously available via the `--print-to-pdf-no-header` flag. Depending on which Chrome version you’re using, you might need to fall back to the old flag name.
{% endAside %}

#### `--timeout`

The `--timeout` flag specifies the delay in milliseconds after which the page’s content is captured by `--dump-dom`, `--screenshot`, and `--print-to-pdf`. When neither `--timeout` nor `--virtual-time-budget` (see below) are specified, the page content is captured as soon as the page is loaded.

To illustrate its use, consider [this demo page which increments, logs, and displays a counter every second](https://mathiasbynens.be/demo/time) using `setTimeout(fn, 1000)`. Here’s the relevant code:

```html
<output>0</output>
<script>
  const element = document.querySelector('output');
  let counter = 0;
  setInterval(() => {
    counter++;
    console.log(counter);
    element.textContent = counter;
  }, 1_000);
</script>
```

After one second, the page contains “1”; after two seconds, “2”, and so on. Here’s how you’d capture the page’s state after 5 seconds and save it as a PDF:

```sh
chrome --headless=new --print-to-pdf --timeout=5000 https://mathiasbynens.be/demo/time
```

The `--timeout=5000` flag tells Chrome to wait for 5 seconds before printing the PDF. Thus, this process takes at least 5 seconds to run.

#### `--virtual-time-budget`

The `--virtual-time-budget` enables time travel! Well, to some extent. Virtual Time acts as a “fast-forward” for any time-dependent code (for example, `setTimeout`/`setInterval`). It forces the browser to execute any of the page’s code as fast as possible while making the page believe that the time actually goes by.

`--virtual-time-budget` is most commonly used as a replacement for `--timeout`, like this:

```sh
chrome --headless=new --print-to-pdf --virtual-time-budget=5000 https://mathiasbynens.be/demo/time
```

This produces the same result as the previous example with `--timeout`. The difference is that, with `--virtual-time-budget`, the process takes very little real time — just about the same time as if there was no timeout specified at all. The difference becomes more obvious with larger values:

```sh
chrome --headless=new --print-to-pdf --virtual-time-budget=42000 https://mathiasbynens.be/demo/time
```

With `--timeout=42000`, it would take at least 42 seconds before the PDF gets printed. With `--virtual-time-budget=42000`, it barely takes longer than the previous example.

## Debugging

Because Chrome is effectively invisible in Headless mode, it might sound tricky to figure out what’s going on in case of issues. Luckily, it’s possible to debug Headless Chrome in a way that’s very similar to headful Chrome. The trick is to launch Chrome in Headless mode with the `--remote-debugging-port` command-line flag.

```sh
chrome --headless=new --remote-debugging-port=0 https://developer.chrome.com/
```

This prints a unique WebSocket URL to stdout, for example:

```txt
DevTools listening on ws://127.0.0.1:60926/devtools/browser/b4bd6eaa-b7c8-4319-8212-225097472fd9
```

In a regular headful Chrome instance, we can then use [Chrome DevTools remote debugging](/docs/devtools/remote-debugging/) to connect to the Headless target and inspect it. To do so, go to `chrome://inspect`, click the **Configure…** button, and enter the IP address and port number from the WebSocket URL. In the above example, I entered `127.0.0.1:60926`. Click **Done** and you should see a Remote Target appear with all its tabs and other targets listed below. Click **inspect** and you now have access to Chrome DevTools inspecting the remote Headless target, **including a live view of the page**!

{% Img src="image/ZQjEes3OsyYCDLE5837FjNRQ1Gw2/GDP1l2VF3lV67bxNzskn.png", alt="Chrome DevTools can inspect a remote Headless target page", width="800", height="515" %}

{% Aside %}
This live view currently only implements touch events, similar to [mobile device emulation in Chrome DevTools](/docs/devtools/device-mode/). If you’re interested in mouse events as well, star [Chromium issue #1410433](https://bugs.chromium.org/p/chromium/issues/detail?id=1410433).
{% endAside %}

## Feedback

We look forward to hearing your feedback about the new Headless mode. If you run into any issues, please [report them](https://bugs.chromium.org/p/chromium/issues/entry?components=Internals%3EHeadless).

---
title: 'Chrome for Testing: reliable downloads for browser automation'
description: >
  Chrome for Testing is a new Chrome flavor that specifically targets web app testing and automation use cases.
layout: layouts/blog-post.njk
authors:
  - mathiasbynens
date: 2023-06-12
updated: 2023-06-13
hero: 'image/ZQjEes3OsyYCDLE5837FjNRQ1Gw2/Wn5kQQRVssFAHozIWDX3.svg'
alt: ''
tags:
  - test-automation
  - devtools
---

Today we’re happy to announce _Chrome for Testing_, a new Chrome flavor that specifically targets web app testing and automation use cases. This article explains why the Chrome team felt this was needed, and walks through concrete examples where Chrome for Testing might benefit you as a developer.

{% Aside %}
Chrome for Testing has been created purely for browser automation and testing purposes, and is not suitable for daily browsing.
{% endAside %}

## Background

Browser testing is a vital component of creating a high-quality web experience, regardless of whether it is done manually or automatically. At the same time, setting up an adequate browser testing environment is notoriously difficult, so much so that it’s [consistently](https://mdn.dev/archives/insights/reports/mdn-web-developer-needs-assessment-2020.html#technologies-web-testing) [reported](https://mdn.dev/archives/insights/reports/mdn-web-testing-report-2021.html) as a top web developer pain point. Today, we’re announcing a change that hopefully eases some of this pain.

## Auto-update: great for users, painful for developers

One of Chrome’s most notable features is its ability to auto-update. **Users** are happy to know they’re running an up-to-date and secure browser version including modern Web Platform features, browser features, and bug fixes at all times.

However, as a **developer** running a suite of end-to-end tests you might have an entirely different perspective:

- You want consistent, reproducible results across repeated test runs—but this may not happen if the browser executable or binary decides to update itself in between two runs.
- You want to pin a specific browser version and check that version number into your source code repository, so that you can check out old commits and branches and re-run the tests against the browser binary from that point in time.

None of this is possible with an auto-updating browser binary. As a result, you may not want to use your regular Chrome installation for automated testing. This is the fundamental mismatch between what’s good for regular browser users versus what’s good for developers doing automated testing.

## Versioned browser binaries

Auto-update aside, you might also have found it hard to find a Chrome binary with a specific version. Google intentionally doesn’t make versioned Chrome downloads available, since users shouldn’t have to care about version numbers—they should always get updated to the latest version as soon as possible. This is great for users, but painful for developers needing to reproduce a bug report in an older Chrome version.

A more specific example of this problem is when you want to use ChromeDriver for browser automation. Not only do you have to download a Chrome binary somehow, you also need a correspondingly-versioned ChromeDriver binary to ensure the two binaries are compatible.

Due to there being no good way to solve these issues, we know that many developers download [Chromium (not Chrome) binaries](https://www.chromium.org/getting-involved/download-chromium/) instead, although this approach has some flaws. First, these Chromium binaries are not reliably available across all platforms. Second, they are built and published separately from the Chrome release process, making it impossible to map their versions back to real user-facing Chrome releases. Third, Chromium is different from Chrome.

## The solution: Chrome for Testing

Designed to solve these problems, Chrome for Testing is a dedicated flavor of Chrome targeting the testing use case, without auto-update, integrated into the Chrome release process, made available for every Chrome release. A versioned binary that’s as close to regular Chrome as possible without negatively affecting the testing use case.

{% Img src="image/ZQjEes3OsyYCDLE5837FjNRQ1Gw2/Wn5kQQRVssFAHozIWDX3.svg", alt="", width="128", height="128" %}

To create Chrome for Testing, we’ve landed [changes to the Chromium and Chrome codebases](https://goo.gle/chrome-for-testing) and set up infrastructure to build and upload these binaries to a publicly available bucket in lockstep with the Chrome release process across all channels (Stable, Beta, Dev, and Canary).

The infrastructure around Chrome for Testing unlocks interesting opportunities beyond Chrome itself. For example, the difficulties we previously mentioned around finding a matching Chrome and [ChromeDriver](https://chromedriver.chromium.org/) binary can be completely eliminated by [integrating the ChromeDriver release process into the Chrome for Testing infrastructure](https://groups.google.com/g/chromedriver-users/c/clpipqvOGjE). In addition to solving this user-facing pain point, this also aligns ChromeDriver releases with Chrome’s, and eliminates the manual ChromeDriver release process.

## How can I get Chrome for Testing binaries?

The easiest way to download Chrome for Testing binaries for your platform is by using [our `@puppeteer/browsers` command-line utility](https://pptr.dev/browsers-api), available via `npm`. Here are some examples:

```sh
# Download the latest available Chrome for Testing binary corresponding to the Stable channel.
npx @puppeteer/browsers install chrome@stable

# Download a specific Chrome for Testing version.
npx @puppeteer/browsers install chrome@116.0.5793.0

# Download the latest available ChromeDriver version corresponding to the Canary channel.
npx @puppeteer/browsers install chromedriver@canary

# Download a specific ChromeDriver version.
npx @puppeteer/browsers install chromedriver@116.0.5793.0
```

If you prefer to build your own automated scripts for downloading these binaries, we’ve got you covered. We offer [JSON API endpoints](https://github.com/GoogleChromeLabs/chrome-for-testing#json-api-endpoints) with the latest available versions per Chrome release channel (Stable, Beta, Dev, Canary). To get a quick overview of the latest status, consult [the Chrome for Testing availability dashboard](https://googlechromelabs.github.io/chrome-for-testing/).

{% Aside %}
We intentionally do not list Chrome for Testing on [the Google Chrome download page](https://www.google.com/chrome/), because it is not meant to be used for regular browsing by regular users.
{% endAside %}

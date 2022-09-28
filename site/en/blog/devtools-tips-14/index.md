---
title: >
  DevTools Tips: Edit, debug, and export user flow recordings
description: >
  Use the Recorder panel and its extensions to edit, debug, and export user flow recordings.
layout: 'layouts/blog-post.njk'
date: 2022-09-28
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Z803aISqYoFWBAI3kG5H.png'
alt: >
  DevTools Tips hero logo
tags:
  - test
  - devtools
  - devtools-tips
---

The DevTools **Recorder** panel lets you capture user actions on your page, replay, share, and export them to a variety of formats you can use in your CI/CD.

The **Recorder** panel is in active development and has recently added new features to help you edit, debug, and export recordings.

{% YouTube id='LBgzmqzp7ew' %}

With the **Recorder** panel, you can:

- Slow down the replay, set breakpoints, pause, resume, or advance the execution one step at a time.
- When paused, interact with the page or switch to other panels for further inspection.
- Add steps that the Recorder doesn't automatically capture. For example, mouse hover that pollutes recordings otherwise.
- Configure steps, for example, add timeouts, conditions, and assertions.
- Export the recordings in various formats such as JSON, [@puppeteer/replay script](https://github.com/puppeteer/replay), and [Puppeteer script](/docs/puppeteer/overview/).

Additionally, you can add more export formats using the following third-party Chrome extensions:

- [Cypress extension](https://chrome.google.com/webstore/detail/cypress-chrome-recorder/fellcphjglholofndfmmjmheedhomgin) lets you export JSON user flows as [Cypress test script](https://github.com/cypress-io/cypress-recorder-extension). [Cypress](https://cypress.io) is a front end testing tool built for the modern web.
- [WebPageTest extension](https://chrome.google.com/webstore/detail/webpagetest-recorder-exte/eklpnjohdjknellndlnepihjnhpaimok) lets you export user flows from the Recorder directly as [WebPageTest Custom scripts](https://docs.webpagetest.org/scripting/) to measure site's performance. See [Converting user flows to WebPageTest custom scripts](https://blog.webpagetest.org/posts/introducing-the-new-webpagetest-recorder-chrome-extension/) to learn more.
- [Nightwatch extension](https://chrome.google.com/webstore/detail/nightwatch-chrome-recorde/nhbccjfogdgkahamfohokdhcnemjafjk/) lets you export JSON user flows as [Nightwatch test script](https://github.com/nightwatchjs/nightwatch-recorder-extension). [Nightwatch](https://nightwatchjs.org/) is an end-to-end testing solution for web applications and websites.
- [Testing Library extension](https://chrome.google.com/webstore/detail/testing-library-recorder/pnobfbfcnoeealajjgnpeodbkkhgiici) lets you export JSON user flows as [Testing Library script](https://github.com/nickmccurdy/testing-library-recorder-extension). [Testing Library](https://testing-library.com/) has simple and complete testing utilities that encourage good testing practices.
- [WebdriverIO extension](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en&authuser=1) lets you export JSON user flows as [WebdriverIO test script](https://github.com/webdriverio/recorder-extension). [WebdriverIO](https://webdriver.io/) is an end-to-end testing solution for web, mobile and IoT applications and websites.

For more information:

- To learn the basics, see [Record, replay, and measure user flows](/docs/devtools/recorder/).
- For a complete list of features, see [Recorder features reference](/docs/devtools/recorder/reference/).
- To create an extension yourself, see [Create a Chrome extension for Recorder](https://github.com/puppeteer/replay#others).

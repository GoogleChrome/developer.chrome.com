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

Additionally, you can add more export formats using Chrome extensions for the **Recorder** panel. At the time of writing, you can add extensions for the following tools: [Cypress](https://chrome.google.com/webstore/detail/cypress-chrome-recorder/fellcphjglholofndfmmjmheedhomgin), [WebPageTest](https://chrome.google.com/webstore/detail/webpagetest-recorder-exte/eklpnjohdjknellndlnepihjnhpaimok), [Nightwatch](https://chrome.google.com/webstore/detail/nightwatch-chrome-recorde/nhbccjfogdgkahamfohokdhcnemjafjk/), [Testing Library](https://chrome.google.com/webstore/detail/testing-library-recorder/pnobfbfcnoeealajjgnpeodbkkhgiici), and [WebdriverIO](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en&authuser=1). Check out [the full list of extensions](https://github.com/puppeteer/replay#others).

For more information:

- To learn the basics, see [Record, replay, and measure user flows](/docs/devtools/recorder/).
- For a complete list of features, see [Recorder features reference](/docs/devtools/recorder/reference/).
- To create an extension yourself, see [Create a Chrome extension for Recorder](https://github.com/puppeteer/replay#others).

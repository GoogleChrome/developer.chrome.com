---
layout: 'layouts/doc-post.njk'
title: Page transitions don't feel like they block on the network
description: |
  Learn how to make transitions between web pages feel responsive,
  even on a slow network.
date: 2019-05-04
updated: 2019-09-19
---

Quick page transitions are key to how users perceive the performance of your
[Progressive Web App (PWA)](https://web.dev/progressive-web-apps/#make-it-installable).
Transitions should feel snappy, even on a slow network.

## Recommendations

To find slow page transitions,
navigate your web app using a simulated slow network. To do that in Chrome:

[comment]: <> (The first two list items arefr om a shortcode from web.dev, but it was not translated from English for any language.)
1. Press <code><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd></code> (or <code><kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd></code> on Mac) to open DevTools.
2. Click the **Network** tab.
3. In the **Throttling** drop-down list, select **Slow 3G**.

Every time you tap a link or button in the app,
check that the page responds immediately in one of two ways:

- The page transitions immediately to the next screen and shows a loading screen
  while waiting for content from the network.
- The page shows a loading indicator while the app waits for a response from the network.

If you're working on a client-rendered single-page app,
transition the user to the next page immediately and show a
[skeleton screen](http://hannahatkin.com/skeleton-screens/).
Make sure to immediately show any content that's already available,
such as the page title or thumbnail,
while the rest of the content loads.

{% Partial 'lighthouse-pwa/scoring.njk' %}

## Resources

- [Source code for **Page transitions don't feel like they block on the network** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/manual/pwa-page-transitions.js)
- [Skeleton Screen](http://hannahatkin.com/skeleton-screens/)

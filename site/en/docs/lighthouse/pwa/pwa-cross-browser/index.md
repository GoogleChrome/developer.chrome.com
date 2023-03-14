---
layout: 'layouts/doc-post.njk'
title: Site works cross-browser
description: |
  Learn how to use Workbox to make sure your web page works across browsers.
date: 2019-05-04
updated: 2019-09-19
---

To reach the most users, sites should work on every major browser.

## Recommendations

Test your site in Chrome, Edge, Firefox, and Safari, and
fix any issues that appear in each browser.

If your page is a [Progressive Web App](https://web.dev/progressive-web-apps/#make-it-installable),
consider using [Workbox](/docs/workbox/),
a high-level [service worker](https://web.dev/service-workers-cache-storage/) toolkit.
Workbox is developed against a cross-browser test suite, and when possible,
automatically falls back to alternative implementations
of features that are missing from certain browsers:

- The [`workbox-broadcast-cache-update`](/docs/workbox/modules/workbox-broadcast-update/)
  module uses the [Broadcast Channel API](https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API)
  if possible and falls back to a
  [`postMessage()`](https://developer.mozilla.org/docs/Web/API/Window/postMessage)
  implementation.
- The [`workbox-background-sync`](https://developer.mozilla.org/docs/Web/API/Window/postMessage)
  module uses the [Background Sync API](/docs/workbox/reference/workbox-background-sync/)
  if possible and falls back to retrying queued events
  each time the service worker starts up.

Learn more in [Workbox: your high-level service worker toolkit](/docs/workbox/).

{% Partial 'lighthouse-pwa/scoring.njk' %}

## Resources

[Source code for **Site works cross-browser** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/manual/pwa-cross-browser.js)

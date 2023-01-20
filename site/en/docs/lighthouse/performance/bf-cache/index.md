---
layout: 'layouts/doc-post.njk'
title: Ensure the page can be restored from the back/forward cache
description: How to use Lighthouse to test if a page can be restored from the back/forward cache.
date: 2023-01-12
tags:
  - performance
---

## Background

The back/forward cache (bfcache) stores a snapshot of the page in memory for when the page is restored from the navigation history. This significantly speeds up return navigations to the page, however some browser APIs (e.g. unload listeners) can cause the bfcache to fail and the page will be loaded normally.

## How Lighthouse detects bfcache failures

### Standalone Navigations

At the end of a standalone navigation, Lighthouse will navigate away and attempt to restore the page from the navigation history to detect if the bfcache is being used.

### User Flows

{% Aside 'caution' %}
Puppeteer disables the bfcache by default due to a [bug where the page freezes](https://github.com/puppeteer/puppeteer/issues/8197). Puppeteer scripts won’t restore the page from bfcache even if real users would see the page restored from bfcache.
{% endAside %}

Lighthouse will not actively test the bfcache in navigation when running a user flow. This is because navigating away and back to the page at the end of every navigation does not reflect most user experiences on the page.

However, you can still test bfcache usage in timespan mode by including a history navigation as part of the user journey. For example:

```js
const flow = await startFlow(page);

// This navigation will not test the bfcache
// because it is part of a user flow.
await flow.navigate('https://example.com');

// This timespan will try to restore the page from the bfcache.
// Problems restoring from the bfcache are surfaced in this report.
await flow.startTimespan();
await page.goto('https://example2.com');
await page.goBack();
await flow.endTimespan();
```

## Understanding bfcache failures

If the page could not be restored from bfcache for any reason, the audit will fail. Lighthouse will list any reasons that the bfcache could not be used, along with the frame(s) that caused the issue. Failure reasons can be one of three types:

 - **Actionable**: You can fix these issues to enable caching.
 - **Pending Support**: Chrome doesn't support these features yet, so they prevent caching. However, once supported, Chrome removes these limitations.
 - **Not Actionable**: You can't fix these issues on this page. Something that is outside the page's control prevents caching.

{% Img src="image/9B7J9oWjgsWbuE84mmxDaY37Wpw2/tiTu6vUDnOIlUdqIipiR.png", alt="Example result from the Lighthouse back/forward cache audit", width="783", height="354" %}

## Resources

 - [Back/forward cache](https://web.dev/bfcache/)
 - [Test bfcache in DevTools](/docs/devtools/application/back-forward-cache/)
 - [Source code for the bfcache audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/bf-cache.js)


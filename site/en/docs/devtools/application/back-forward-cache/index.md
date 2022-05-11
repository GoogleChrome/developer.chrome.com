---
layout: "layouts/doc-post.njk"
title: "Test back/forward cache"
authors:
  - sofiayem
date: 2022-05-04
#updated: YYYY-MM-DD
description: "Ensure your pages are optimized for back/forward caching."
tags:
  - test
  - find-issues
---

This guide shows you how to use [Chrome DevTools][1] to do the following:

- Test if you optimized your page for instant loads when using the browser's back and forward buttons.
- Identify issues that may prevent your page from being eligible for this type of caching.

Back/forward cache (or bfcache) is a browser optimization that enables instant back and forward navigation. For more information, see [Back/forward cache](https://web.dev/bfcache/).

{% Aside 'gotchas' %}
Back/forward cache differs from browser [cache][2] and [HTTP cache][3].

To inspect [cache][2] data, follow the steps in [View cache data](/docs/devtools/storage/cache/).

To inspect [HTTP cache][3] data, open the **Size** column of the **Network Log**. See [Log network activity][4].
{% endAside %}

## Test back/forward cache {: #test-bfcache }

To test back/forward cache, follow these steps:

1. On your page, [open DevTools](/docs/devtools/open/), then navigate to **Application** > **Cache** > **Back/forward cache**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Rbo260mBWwD4MieKEJIn.png", alt="Back/forward cache tab", width="800", height="405" %}

1. Click **Test back/forward cache**. Chrome automatically takes you to `chrome://terms/` and back to your page.
    
    Alternatively, you can click the browser's back and forward buttons.

If the back/forward cache works for your page with no issues, you'll see the following message:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kf5vmtKRZpe4SMV4Gp8G.png", alt="Successfully served from back/forward cache", width="800", height="405" %}

Otherwise, you'll see a list of issues explained in the next section.

## Identify and resolve issues that may prevent caching {: #identify-issues }

If your page isn't eligible for back/forward caching, the **Back/forward cache** tab shows you a list with three types of causes:

<div class="elevation--2" style="margin-top: 20px; margin-bottom: 20px;">
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NJA0g2CuAfmihkuOomyQ.png", alt="Not eligible for back/forward cache", width="800", height="583" %}</div>

- **Actionable**. You can fix these issues to enable caching. For example, [stop using `unload` events](https://web.dev/bfcache/#never-use-the-unload-event).
- **Pending Support**. Chrome doesn't support these features yet, so they prevent caching. However, once supported, Chrome removes these limitations.
- **Not Actionable**. You can't fix these issues on this page. Something that is outside the page's control prevents caching.

[1]: /docs/devtools
[2]: https://developer.mozilla.org/docs/Web/API/Cache
[3]: https://developer.mozilla.org/docs/Web/HTTP/Caching
[4]: /docs/devtools/network#load

---
layout: 'layouts/blog-post.njk'
title: Exploring a back/forward cache for Chrome
description: >
  bfcache creates a cache allowing for instant navigations to previously-visited pages.
date: 2017-09-13
updated: 2021-05-25
hero: 'image/C47gYyWYVMMhDmtYSLOWazuyePF2/JUvwOe6kvoE8Ut1Vh2Jg.png'
alt: >
  Laptop and mobile phone
authors:
  - addyosmani
---

On the Chrome team, we are exploring a new **[back/forward cache](https://www.chromestatus.com/feature/5815270035685376)** to cache pages in-memory (preserving JavaScript & DOM state) when the user navigates away. This is definitely not a trivial endeavor but if it succeeds it will make **navigating back and forth** _very_ fast.

A back/forward cache (bfcache) caches whole pages (including the JavaScript heap) when navigating away from a page, so that the full state of the page can be restored when the user navigates back. Think of it as **pausing** a page when you leave it and **playing** it when you return.

Below is a first-look of an **early prototype** of back/forward cache in action on desktop:

{% YouTube id="eusKoHPAWtU" %}

We also have a preview of the back/forward cache working on Chrome for Android:

{% YouTube id="cuPsdRckkF0" %}

We estimate this change could **improve performance up to 19% of all navigations** for mobile Chrome. You can find more detail about this feature in the [bfcache explainer](https://docs.google.com/document/d/1mrgp7XzR16rd1xqFYOJgC1IP0NPLZFaRU5Ukj3-TlLw/edit#heading=h.d9wqdzopmdcf).

There is medium cross-browser interop risk with this change. Both [Firefox](https://developer.mozilla.org/docs/Archive/Misc_top_level/Working_with_BFCache) and [Safari](https://webkit.org/blog/427/webkit-page-cache-i-the-basics/) already have back-forward cache implementations that are subtly different. Chrome is opting not to use WebKit’s implementation of bfcache due to incompatibility with Chrome’s multiprocess architecture.

Our formal intent-to-implement for the back-forward cache is on [blink-dev](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/OVROmzNUng0/1gTmi-I3EQAJ) for anyone wishing to contribute to the discussions.

_Thanks to Arthur Sonzogni, Alexander Timin, Kenji Baheux and Sami for their help putting together our prototype videos._

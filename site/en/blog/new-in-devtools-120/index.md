---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 120)"
authors:
  - sofiayem
date: 2023-11-01
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/C5z0hHEPjBwgsXg2WG0t.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-120
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

<!-- $contentStart -->

## Third-party cookie phaseout {: #3pc }

If your site uses third-party cookies, it's time to take action as we approach their deprecation. For more information, see [Preparing for the end of third-party cookies](https://developer.chrome.com/blog/cookie-countdown-2023oct/).

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="24", height="24" %} **Include third-party cookie issues** checkbox has been enabled by default for all Chrome users, so the **Issues** panel now warns you about the cookies that will be affected by the upcoming deprecation and phaseout of third-party cookies.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DjvhUFzFqSA2x1RndzLO.png", alt="A warning about the upcoming third-party cookie deprecation in the Issues panel.", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5656fa6c28f29257f6d8b02df8d799dc19b4eaa #}

Chromium issue: [1466310](https://crbug.com/1466310).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}


---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 118)"
authors:
  - sofiayem
date: 2023-09-07
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oM7ywmnxgVDuegxueVbK.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-118
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='e8tl_yp5BQg' %}

<!-- $contentStart -->

## Enhanced search {: #search }

[**Search**](/docs/devtools/search/) results now show an entry per all the matches it found in a line of code. Previously, it showed only the first match per line of code. The new behaviour is especially useful when you search across minified files. When you click a search result, it opens the file in the editor and now scrolls the match into view not only vertically but also horizontally.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/f5Yu4fSECIVDllWkpEZs.png", alt="The before and after making search show all the matches per line.", width="800", height="424" %}

Additionally, **Search** got a speed boost. See the before (left) and after (right) comparison in the next video.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/FyExrp5BLiGRHAT3OK4C.mp4", width="800", height="481", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

Finally, **Search** now supports [ignore listing](/docs/devtools/settings/ignore-list/) and won't show you results from ignored files.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bede301d455d921e66ba4052e8d3512e01d34bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2da188c6a7b519a30f2f43e114e78ac4c818e0cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1cfe38799440fe5d58d9387a4009cfdae2deced2 #}

Chromium issues: [1468875](https://crbug.com/1468875), [1472019](https://crbug.com/1472019).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}


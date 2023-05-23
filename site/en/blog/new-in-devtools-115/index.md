---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 115)"
authors:
  - sofiayem
date: 2023-05-29
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fy7JKyzJt0EPZd1g8hwl.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-115
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='CrSmjooOEiE' %}

<!-- $contentStart -->

##  New CSS subgrid badge in the Elements panel {: #subgrid }

The **Elements** panel gets a new `subgrid` badge for [nested grids](https://developer.mozilla.org/docs/Web/CSS/CSS_Grid_Layout/Subgrid).

To inspect and debug a nested grid, click the badge. It toggles an overlay that shows columns, rows, and their numbers on top of the element in the viewport.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YdYYo1t21cwTUVEW2bgS.png", alt="The subgrid badge and the overlay in the viewport.", width="800", height="549" %}

For the list of all badges in the **Elements** panel, see the [Badges reference](/docs/devtools/elements/badges/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b64a1595f831021d41a4849376ef16d4a4ddf201 #}

Chromium issue: [1442536](https://crbug.com/1442536).

##  {: #content-script }

##  {: #breakpoint }

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

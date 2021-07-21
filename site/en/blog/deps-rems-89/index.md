---
title: Deprecations and removals in Chrome 89
description: >
  A round up of the deprecations and removals in Chrome 89 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-01-28
alt: >
  Deprecations and removals hero logo
tags:
  - deprecations
  - removals
  - chrome-89
---

{% include 'partials/see-all-dep-rem.md' %}

Chrome 89 beta was released on January 28, 2021 and is expected to become the
stable version in the first week of March 2021.

## Remove prefixed events for <link rel=prerender>

The legacy prefixed events (webkitprerenderstart, webkitprerenderstop,
webkitprerenderload, and webkitprerenderdomcontentloaded) dispatched on `<link
rel=prerender>` are now removed from Chrome.

[Chrome Platform Status](https://www.chromestatus.com/feature/4925917174431744)

## Stop cloning sessionStorage for windows opened with noopener

When a window is opened with noopener, Chrome will no longer clone the
sessionStorage of its opener; it will instead start an empty sessionStorage
namespace. This brings Chrome in conformance with the HTML specification.

[Chrome Platform Status](https://www.chromestatus.com/feature/5679997870145536) &#124;
[Chromium Bug](https://crbug.com/771959)

{% include 'partials/deprecations-policy.md' %}

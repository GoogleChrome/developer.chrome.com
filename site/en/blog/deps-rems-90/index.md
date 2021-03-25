---
title: Deprecations and removals in Chrome 90
description: >
  A round up of the deprecations and removals in Chrome 90 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-03-11
alt: >
  Deprecations and removals hero logo
tags:
  - deprecations
  - removals
  - chrome-90
---

{% include 'partials/see-all-dep-rem.md' %}

Chrome 90 beta was released on March 11, 2021 and is expected to become the
stable version in mid April, 2021.

## Remove Content Security Policy directive 'plugin-types'

The
[`'plugin-types'` directive allows developers to restrict](https://www.chromestatus.com/feature/5742693948850176)
which types of plugin can be loaded via `<embed>` or `<object>` html elements. This
allowed developers to block Flash in their pages. Since Flash support has been
discontinued, there is no longer any need for this policy directive.

## Remove WebRTC RTP data channels

Chrome has
[removed support for the non-standard RTP data channels](https://www.chromestatus.com/feature/6485681910054912)
in WebRTC. Users should use the standard SCTP-based data channels instead.

## Return empty for navigator.plugins and navigator.mimeTypes

Chrome
[now returns empty for `navigator.plugins` and `navigator.mimeTypes`](https://www.chromestatus.com/feature/5741884322349056).
With the removal of Flash, there is no longer the need to return anything for
these properties.   
  

{% include 'partials/deprecations-policy.md' %}

---
title: Deprecations and removals in Chrome 92
description: >
  A round up of the deprecations and removals in Chrome 92 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-08-16
updated: 2021-09-23
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/se3HDm9LSpP3WwWj3xpN.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-92
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 92 beta was released on June 3, 2021 and is expected to become the
stable version in late July, 2021.

## Payment handlers for standardized payment method identifiers

This feature, which enabled web-based payment handlers to receive `paymentrequest`
events with non-URL, but standardized payment method identifiers, such as
`"basic-card"` or `"tokenized-card"`, [has been
removed](https://www.chromestatus.com/feature/5717324021628928).

{% Partial 'deprecations-policy.md' %}

---
title: Deprecations and removals in Chrome 96
description: >
  A round up of the deprecations and removals in Chrome 96 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-10-21
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/boSvmtUKOiJE0teUcvS4.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-96
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 96 beta was released on October 21, 2021 and is expected to become the
stable version in late November, 2021.

## The "basic-card" method of PaymentRequest API

The PaymentRequest API has [deprecated the basic card payment
method](https://blog.chromium.org/2021/10/sunsetting-basic-card-payment-method-in.html). Its usage is low
and declining. It underperforms when compared to other payment methods in
time-to-checkout and completion rate. Developers can switch to other payment
methods as an alternative. Examples include Google Pay, Apple Pay, and Samsung
Pay.

### Removal timeline

**Chrome 96**

The basic-card method is deprecated in the Reporting API.

**Chrome 100**

The basic-card method will be removed.

{% Partial 'deprecations-policy.md' %}

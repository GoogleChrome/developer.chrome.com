---
title: Deprecations and removals in Chrome 101
description: >
  A round up of the deprecations and removals in Chrome 101 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-03-31
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/GLywh0GpxQEByxtmCaVY.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-101
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 101 beta was released on March 31, 2022 and is expected to become the
stable version in late April, 2022.

## Reduce user agent string information

Chrome is [reducing the amount of information the User-Agent string exposes](https://www.chromestatus.com/feature/5704553745874944) in HTTP requests as well as in navigator.userAgent, navigator.appVersion, and navigator.platform. We're doing this to prevent the user agent string from being used for passive user fingerprinting. To join the origin trial, see [its entry on Chrome Origin Trials](/origintrials/#/view_trial/-7123568710593282047).

## Remove WebSQL in third-party contexts

[WebSQL in third-party contexts is now removed](https://www.chromestatus.com/feature/5684870116278272). The Web SQL Database standard was first proposed in April 2009 and abandoned in November 2010. Gecko never implemented this feature and WebKit deprecated it in 2019. The W3C encourages [Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) and [Indexed Database](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) for those needing alternatives.

Developers should expect that WebSQL itself will be deprecated and removed when usage is low enough.

{% Partial 'deprecations-policy.md' %}

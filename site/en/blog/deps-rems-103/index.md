---
title: Deprecations and removals in Chrome 103
description: >
  A round up of the deprecations and removals in Chrome 103 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-05-26
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/e4rTEZiq12OlwkvB9WQH.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-103
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 103 beta was released on May 26, 2022 and is expected to become the
stable version in late June, 2022.

## Block external protocol in sandboxed iframes

Sandboxed iframes are not blocked from opening external applications. Currently, developers sandbox untrusted content and block user navigation. Blocking probably should have also included links to external apps or to the Play store. [This has now been fixed](https://chromestatus.com/feature/5680742077038592).

Sites that need navigation can add the following values to the `<iframe>` element's sandbox property:

* `allow-popups`
* `allow-top-navigation`
* `allow-top-navigation-with-user-activation`

## Remove Battery Status API on insecure origins

The Battery Status API is [no longer supported on insecure contexts](https://chromestatus.com/feature/4878376799043584), specifically HTTP pages and HTTPS iframes embedded in HTTP pages. This is being removed in accordance with our policy of [deprecating powerful features on insecure origins](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins), This also follows [a spec change](https://github.com/w3c/battery/issues/15).

## Remove <param> element

Given the removal of plugins from the web platform, and the relative lack of use of `<param>`, it is being [removed from the web platform](https://chromestatus.com/feature/6283184588193792).

{% Partial 'deprecations-policy.md' %}

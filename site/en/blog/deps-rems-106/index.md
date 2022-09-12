---
title: Deprecations and removals in Chrome 106
description: >
  A round up of the deprecations and removals in Chrome 106 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-09-01
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/EnYQIPXPy4yW6YavyMZu.png'
alt: >
  Deprecations and removals hero logo
tags:
  - deprecations-removals
  - chrome-106
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 106 beta was released on September 1, 2022 and is expected to become the stable version in late September, 2022.

## Remove non-ASCII characters in cookie domain attributes

To align with the latest spec ([RFC 6265bis](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis/#section-5.5)), [Chromium now rejects](https://www.chromestatus.com/feature/5534966262792192) cookies with a `Domain` attribute that contains non-ASCII characters (for example, `éxample.com`).

Support for IDN domain attributes in cookies has been long unspecified, with Chromium, Safari, and Firefox all behaving differently. This change standardizes Firefox's behavior of rejecting cookies with non-ASCII domain attributes.

Since Chromium has previously accepted non-ASCII characters and tried to convert them to normalized punycode for storage, we will now apply stricter rules and require valid ASCII (punycode if applicable) domain attributes.

## Remove HTTP/2 push

Chrome has [removed the ability](https://www.chromestatus.com/feature/6302414934114304) to receive, keep in memory, and use HTTP/2 push streams sent by the server. See [Removing HTTP/2 Server Push from Chrome](/blog/removing-push/) for details and suggested alternative APIs.

## Remove Persistent Quota

The `window.PERSISTENT` quota type in `webkitRequestFileSystem()` [is now deprecated](https://www.chromestatus.com/feature/5176235376246784).

Support for the `PERSISTENT` quota type contributes some amount of complexity to the quota system, but `webkitRequestFileSystem()` is the only consumer, and it's a form of storage that never caught on and is very seldom used.

{% Partial 'deprecations-policy.md' %}

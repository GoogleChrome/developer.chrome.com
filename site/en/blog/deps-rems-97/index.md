---
title: Deprecations and removals in Chrome 97
description: >
  A round up of the deprecations and removals in Chrome 97 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-11-22
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/8hNVkXWdaC9NGJ5Pg0HT.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-97
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 97 beta was released on November 18, 2021 and is expected to become the
stable version in late December, 2021.

## Remove SDES key exchange for WebRTC

The SDES key exchange mechanism for WebRTC has been declared a MUST NOT in the
relevant IETF standards since 2013. The SDES specification has been declared
historic by the IETF. Its usage in Chrome has declined significantly over the
recent year. Consequently [it is
removed](https://www.chromestatus.com/feature/5695324321480704) as of Chrome
97.

## Remove WebSQL in third-party contexts

[WebSQL in third-party contexts is now removed](https://www.chromestatus.com/feature/5684870116278272).
The Web SQL Database standard was first proposed in April 2009 and abandoned in
November 2010. Gecko never implemented this feature and WebKit deprecated it in
2019. The W3C encourages
[Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
and
[Indexed Database](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
for those needing alternatives.

## Remove SDP Plan B

The Session Description Protocol (SDP) used to establish a session in WebRTC has
been implemented with two different dialects in Chromium: Unified Plan and Plan
B. Plan B is not cross-browser compatible and [is hereby
removed](https://www.chromestatus.com/features/5823036655665152).

{% Partial 'deprecations-policy.md' %}

---
title: Deprecations and removals in Chrome 98
description: >
  A round up of the deprecations and removals in Chrome 98 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-01-10
updated: 2022-01-10
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/3E1SceeUNR31sVXAH1zI.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-98
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 98 beta was released on January 6, 2022 and is expected to become the
stable version in early February, 2022.

## Remove SDES key exchange for WebRTC

The SDES key exchange mechanism for WebRTC has been declared a MUST NOT in the
relevant IETF standards since 2013. Its usage in Chrome has declined
significantly over the last year. [SDES is
removed](https://chromestatus.com/features/5695324321480704) because it is a
security problem. It exposes session keys to Javascript, which means that
entities with access to the negotiation exchange, or with the ability to subvert
the Javascript, can decrypt the media sent over the connection.

{% Partial 'deprecations-policy.md' %}

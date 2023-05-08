---
title: Deprecations and removals in Chrome 93
description: >
  A round up of the deprecations and removals in Chrome 93 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-08-29
updated: 2021-09-23
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/wzKRtZO1LCra0FDRk1jY.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-93
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 93 beta was released on July 29, 2021 and is expected to become the
stable version in late August, 2021.

## Block ports 989 and 990

[Connections to HTTP, HTTPS or FTP servers on ports 989 and 990 now
fail](https://www.chromestatus.com/feature/5678858554572800). These ports are
used by the FTPS protocol, which has never been implemented in Chrome. However,
FTPS servers can be attacked in a cross-protocol attack by malicious web pages
using carefully-crafted HTTPS requests. This is a mitigation for the [ALPACA
attack](https://alpaca-attack.com/).

## Remove 3DES in TLS

Chrome has [now removed support for the
TLS_RSA_WITH_3DES_EDE_CBC_SHA](https://www.chromestatus.com/feature/6678134168485888)
cipher suite. TLS_RSA_WITH_3DES_EDE_CBC_SHA is a remnant of the SSL 2.0 and SSL
3.0 era. 3DES in transport layer security (TLS) is vulnerable to the [Sweet32
attack](https://sweet32.info/). Being a CBC cipher suite, it is also vulnerable
to the [Lucky Thirteen](https://en.wikipedia.org/wiki/Lucky_Thirteen_attack)
attack. The first replacement AES cipher suites were defined for TLS in RFC3268,
published around 19 years ago, and there have been several iterations since.

## WebAssembly cross-origin module sharing

WebAssembly module sharing between cross-origin but same-site environments [will
be deprecated](https://chromestatus.com/feature/5650158039597056) to allow agent
clusters to be scoped to origins long term. This follows a WebAssembly
specification change, which has an impact on the platform as well.

{% Partial 'deprecations-policy.md' %}

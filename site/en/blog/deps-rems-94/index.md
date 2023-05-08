---
title: Deprecations and removals in Chrome 94
description: >
  A round up of the deprecations and removals in Chrome 94 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-08-27
updated: 2021-09-23
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/tKe2sOWOxDnporptQrKX.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-94
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 94 beta was released on August 26, 2021 and is expected to become the
stable version in late September, 2021.

## Deprecate and Remove WebSQL in Third-Party Contexts

[WebSQL in third-party contexts is now deprecated](https://www.chromestatus.com/feature/5684870116278272).
Removal is expected in Chrome 97. The Web SQL Database standard was first
proposed in April 2009 and abandoned in November 2010. Gecko never implemented
this feature and WebKit deprecated this feature in 2019. The W3C encourages
[Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
and
[Indexed Database](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
for those needing alternatives.

Developers should expect that WebSQL itself will be deprecated and removed when
usage is low enough.

## Restrict Private Network Requests for Subresources to Secure Contexts

Private network requests for subresources [may now only be initiated from a
secure context](https://chromestatus.com/feature/5436853517811712). Private
network requests are those initiated from a public network, targeting a private
network. Examples include internet to intranet requests and intranet loopbacks.

This is a first step towards fully implementing [Private Network
Access](https://wicg.github.io/private-network-access/). Servers running inside
local networks, or on a user's device, expose powerful capabilities to the web
in ways that can be quite dangerous. Private Network Access proposes a set of
changes to limit the impact of requests to these servers by ensuring that the
servers are opting-into any communication with external entities.

For this opt-in to have any meaning, the servers need to be able to ensure that
the client origin is authenticated. To that end, only secure contexts are
empowered to make external requests.

{% Partial 'deprecations-policy.md' %}

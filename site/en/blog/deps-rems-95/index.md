---
title: Deprecations and removals in Chrome 95
description: >
  A round up of the deprecations and removals in Chrome 95 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-09-23
tags:
  - deprecations
  - removals
  - chrome-95
---

{% include 'partials/see-all-dep-rem.md' %}

Chrome 95 beta was released on September 23, 2021 and is expected to become the
stable version in late October, 2021.

## FTP Support Removed

Chrome is [removing support for FTP
URLs](https://www.chromestatus.com/feature/6246151319715840). Use of FTP in the
browser is sufficiently low that it is no longer viable to invest in improving
the existing FTP client. In addition, more capable FTP clients are available on
all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Currently navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 later resulted in dropping support for
accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed entirely
in Google Chrome 76. In Chrome 86 FTP support was turned off for pre-release
channels (Canary and Beta) and experimentally turned off for one percent of
stable users, though it could be reenabled via the command line. In Chrome 87 it
was turned off for fifty percent of users but could also be enabled through the
command line. Since Chrome 88, it was only available through a deprecation trial
and is now disabled.

## Support for URLs with non-IPv4 Hostnames Ending in Numbers

Most hostnames that aren't valid IPv4 addresses, but end in numbers are treated
as valid, and looked up via DNS (e.g., `http://foo.127.1/`). Per the Public
Suffix List spec, the eTLD+1 of the hostname in that URL should be `127.1`. If
that is ever fed back into a URL, `http://127.1/` is mapped to
`http://127.0.0.1/` by the URL spec, which seems potentially dangerous.
`127.0.0.0.1` could also potentially be used to confuse users.
[URLs with these hostnames are now rejected](https://www.chromestatus.com/feature/5679790780579840).

## WebAssembly Cross-Origin Module Sharing

[Chrome now deprecates sharing WebAssembly modules](https://www.chromestatus.com/feature/5650158039597056)
between cross-origin, but same-site environments to
[allow agent clusters to be scoped to origins long term](https://developer.chrome.com/blog/wasm-module-sharing-restricted-to-same-origin/).

{% include 'partials/deprecations-policy.md' %}

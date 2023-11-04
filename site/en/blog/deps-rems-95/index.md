---
title: Deprecations and removals in Chrome 95
description: >
  A round up of the deprecations and removals in Chrome 95 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-09-23
updated: 2021-09-24
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/0GrO9wVaQsRjPJQP9fc0.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-95
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 95 beta was released on September 23, 2021 and is expected to become the
stable version in late October, 2021.

## FTP support removed

Chrome is [removing support for FTP
URLs](https://www.chromestatus.com/feature/6246151319715840). Use of FTP in the
browser is sufficiently low that it is no longer viable to invest in improving
the existing FTP client. In addition, more capable FTP clients are available on
all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Currently navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 and later resulted in dropping support for
accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed entirely
in Google Chrome 76. In Chrome 86 FTP support was turned off for pre-release
channels (Canary and Beta) and experimentally turned off for one percent of
stable users, though it could be reenabled via the command line. In Chrome 87 it
was turned off for fifty percent of users but could also be enabled through the
command line. Since Chrome 88, it was only available through a deprecation trial
and is now disabled.

## Support for URLs with non-IPv4 hostnames ending in numbers

Most hostnames that aren't valid IPv4 addresses, but end in numbers are treated
as valid, and looked up via DNS (for example, `http://foo.127.1/`). Per the Public
Suffix List spec, the eTLD+1 of the hostname in that URL should be `127.1`. If
that is ever fed back into a URL, `http://127.1/` is mapped to
`http://127.0.0.1/` by the URL spec, which seems potentially dangerous.
`127.0.0.0.1` could also potentially be used to confuse users.
[URLs with these hostnames are now rejected](https://www.chromestatus.com/feature/5679790780579840).

## WebAssembly cross-origin module sharing

[Chrome now deprecates sharing WebAssembly modules](https://www.chromestatus.com/feature/5650158039597056)
between cross-origin, but same-site environments to
[allow agent clusters to be scoped to origins long term](/blog/wasm-module-sharing-restricted-to-same-origin/).

## Deprecate U2F API (Cryptotoken)

Chrome's legacy U2F API for interacting with security keys is deprecated. It
will be disabled by default in Chrome 98.

Affected sites should migrate to the [Web Authentication
API](https://developer.mozilla.org/docs/Web/API/Web_Authentication_API).
Credentials that were originally registered via the U2F API can be challenged
via web authentication. USB security keys that are supported by the U2F API are
also supported by the Web Authentication API. U2F security keys themselves are
not deprecated and will continue to work.

U2F is Chrome's original security key API. It allows sites to register public
key credentials on USB security keys and challenge them for building
phishing-resistant two-factor authentication systems. U2F never became an open
web standard and was subsumed by the Web Authentication API (launched in Chrome
67). Chrome never directly supported the FIDO U2F JavaScript API, but rather
shipped a component extension called cryptotoken, which exposes an equivalent
`chrome.runtime.sendMessage()` method. U2F and Cryptotoken are firmly in
maintenance mode and we have encouraged sites to migrate to the Web
Authentication API for the last two years.

The following timeline is currently planned for deprecation and removal:

### Chrome 95

Beta as of September 23, 2021. The following changes were implemented:

+   Logged a deprecation notice in the DevTools console for every request.

### Chrome 96

Beta expected in late October 2021, stable in November. The following changes
were implemented:

+   Gated U2F API requests behind a user permission prompt.

The permission prompt can be suppressed by enrolling in the [U2FSecurityKeyAPI
deprecation trial](/origintrials/#/view_trial/-6366963973195038719)
or enabling the [U2fSecurityKeyApiEnabled](https://chromeenterprise.google/policies/#U2fSecurityKeyApiEnabled)
enterprise policy.

### Chrome 98

Beta expected in early January 2022, stable in February. The U2F API will be
disabled by default. Only sites enrolled in the [deprecation
trial](/origintrials/#/view_trial/-6366963973195038719)
or enterprises that turned on the
[U2fSecurityKeyApiEnabled](https://chromeenterprise.google/policies/#U2fSecurityKeyApiEnabled)
policy will be able to use U2F at this point.

### Chrome 103

Beta expected in late May 2022, stable in late June. The deprecation trial will
end on July 26, 2022.

### Chrome 104

Beta expected in late June 2022, stable in early August. The  U2F API will
be fully removed.

{% Partial 'deprecations-policy.md' %}

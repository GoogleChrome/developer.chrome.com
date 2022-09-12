---
title: Deprecations and removals in Chrome 104
description: >
  A round up of the deprecations and removals in Chrome 104 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-06-23
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/r2jZ0eCtd4KDjgEYu3BC.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-104
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 104 beta was released on June 23, 2022 and is expected to become the
stable version in early August, 2022.

## Block third-party contexts navigating to filesystem URLs

iframes can [no longer navigate to filesystem URLs](https://chromestatus.com/feature/5816343679991808). Top frame support for navigating to filesystem URLs was dropped in Chrome 68.

## Remove non-standard client hint mode

Four client hints (`dpr`, `width`, `viewport-width`, and `device-memory`) have a default allowlist of `self` but behave as though they have a default allowlist of `*` on Android, contrary to the spec. [This is now fixed](https://www.chromestatus.com/feature/5694492182052864), increasing privacy on Android by requiring explicit delegation of these hints.

## Remove U2F API (cryptotoken)

Chrome's legacy U2F API for interacting with security keys [is no longer supported](https://www.chromestatus.com/feature/5759004926017536). U2F security keys themselves are not deprecated and will continue to work.

Affected sites should migrate to the [Web Authentication API](https://developer.mozilla.org/docs/Web/API/Web_Authentication_API). Credentials that were originally registered via the U2F API can be challenged via web authentication. USB security keys that are supported by the U2F API are also supported by the Web Authentication API.

U2F is Chrome's original security key API. It allows sites to register public key credentials on USB security keys and challenge them for building phishing-resistant two-factor authentication systems. U2F never became an open web standard and was subsumed by the Web Authentication API (launched in Chrome 67). Chrome never directly supported the FIDO U2F JavaScript API, but rather shipped a component extension called cryptotoken, which exposes an equivalent `chrome.runtime.sendMessage()` method. U2F and Cryptotoken are firmly in maintenance mode and have encouraged sites to migrate to the Web Authentication API for the last two years.

{% Partial 'deprecations-policy.md' %}

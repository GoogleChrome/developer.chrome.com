---
layout: 'layouts/blog-post.njk'
title: "Secure popup interactions with `restrict-properties`"
subhead: >
  Get cross-origin isolation and XS-Leaks protection while interacting with popups.
description: >
  Get cross-origin isolation and XS-Leaks protection while interacting with popups. 
date: 2023-08-04
origin_trial:
  url: /origintrials/#/view_trial/1827335548805578753
hero:
    image/O2RNUyVSLubjvENAT3e7JSdqSOx1/QC14LcaYBMQfE48YGQBk.webp
alt: A soap bubble.
authors:
  - agektmr
  - hemeryar
  - maudn
tags:
  - security
  - origin-trials
---

A new value for
[Cross-Origin Opener Policy (COOP)](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)
is available: `restrict-properties`. It brings in security benefits and makes
it easier to adopt [cross-origin isolation](https://web.dev/coop-coep/) while
allowing your site to interact with third-party popups for payments,
authentication, or other use cases.

You can experiment with `restrict-properties` starting in [Chrome
116](https://chromiumdash.appspot.com/schedule), by participating in the [origin
trial](#origin-trial).

## Why use `restrict-properties`

`restrict-properties` has two main use cases: prevent [XS-Leaks](https://xsleaks.dev/) without breakage, and [cross-origin isolate](https://web.dev/why-coop-coep/) your site.

### Prevent XS-Leaks without breakage

By default, any website can open your application in a popup and get a
reference to it.

A malicious website can use this to their advantage to perform attacks such as
[XS-Leaks](https://xsleaks.dev/).
To mitigate this risk, you can use the `Cross-Origin-Opener-Policy` (COOP) header.

Up until now, your options for `Cross-Origin-Opener-Policy` were limited. You
could either:
* Set `same-origin,` which blocks all cross-origin interactions with popups. 
* Set `same-origin-allow-popups`, which blocks all cross-origin interactions
that open your site in a popup.
* Set `unsafe-none`, which allows all cross-origin interactions with popups.

This made it impossible for websites that need to be opened in a popup and to
interact with their opener to enforce COOP. This left key use cases like single
sign-on and payments unprotected from XS-Leaks.

`Cross-Origin-Opener-Policy: restrict-properties` solves this.

With `restrict-properties`, properties that can be used for frame counting and
other XS-Leak attacks are not available — but basic communication between
windows via `postMessage` and `closed` is allowed.

This improves a site's security while maintaining key use cases. For example:
* If you provide a service in a popup, setting `Cross-Origin-Opener-Policy:
restrict-properties` will protect yourself against a range of XS-Leak attacks.
You can still open all pages that you could previously open.
* If you need to access a cross-origin popup, setting
`Cross-Origin-Opener-Policy: restrict-properties` will similarly protect
your site from iframe counting. You will be able to open the same set of
popups that you can open today.
* If both the opener and openee set the header, and the pages are cross-origin, it behaves similarly
to one of them having set the header. If they are same-origin, full access is
granted.

### Cross-origin isolate your site

#### Why we need cross-origin isolation

Some web APIs increase the risk of side-channel attacks like
[Spectre](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)). To
mitigate that risk, browsers offer an opt-in-based isolated environment called
[cross-origin isolation](https://web.dev/coop-coep/). With a cross-origin
isolated state, the webpage can use privileged features including
[SharedArrayBuffer](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer),
[performance.measureUserAgentSpecificMemory()](https://web.dev/monitor-total-page-memory-usage/)
and
[high-precision timers](/blog/cross-origin-isolated-hr-timers/)
with better resolution, while isolating the origin from others unless they are
opted in.

Up until now, to use these APIs, you had to set `Cross-Origin-Opener-Policy:
same-origin`. However, this would break any cross-origin popup flow you might
need, such as single sign-on and Payments.

`Cross-Origin-Opener-Policy: restrict-properties` can now be used instead of
`Cross-Origin-Opener-Policy: same-origin` to enable cross-origin isolation.
Instead of severing the opener relationship, it merely restricts it to the
minimal communication subset of `window.postMessage()` and `window.closed`.

You will be able to enable cross-origin isolation with the following two
headers:

```http
Cross-Origin-Opener-Policy: restrict-properties
Cross-Origin-Embedder-Policy: require-corp
```

or

```http
Cross-Origin-Opener-Policy: restrict-properties
Cross-Origin-Embedder-Policy: credentialless
```

Learn more about `credentialless` at
[Load cross-origin resources without CORP headers using `COEP: credentialless`](/blog/coep-credentialless-origin-trial/)

## Demo

Try various header options in this demo:
[https://cross-origin-isolation.glitch.me](https://cross-origin-isolation.glitch.me)

## Experiment with the origin trial {: #origin-trial}

To experiment with `Cross-Origin-Opener-Policy: restrict-properties`, opt
into the
[origin trial](/origintrials/#/view_trial/1827335548805578753).

{% Aside %} 
Review
[instructions](/docs/web-platform/origin-trials/#take-part-in-an-origin-trial)
on how to participate in an origin trial.
{% endAside %}

## Browser support

`Cross-Origin-Opener-Policy: restrict-properties` is currently only supported
in Chrome. Other browsers are
[actively engaged in the discussion for standardization](https://github.com/whatwg/html/issues/6364).

## FAQ

### My website needs to communicate with same-origin popups, should I use COOP: restrict-properties to enable cross-origin isolation?

Setting `COOP: restrict-properties` on both the popup and your main page will
not cause restrictions. Setting it either only on the popup or only on the main
page will prevent any access to properties other than `postMessage` and `closed`
across the opener, even if they are same-origin.

### Is the set of allowed properties fixed?`
`window.postMessage` and `window.closed` are suspected (via feedback and
metrics) to be sufficient for the majority of workflows, but we're still
considering opening it to other properties. If you have a use case that cannot
be solved using only `postMessage` and `closed`, please reach out here:
[https://groups.google.com/a/chromium.org/g/blink-dev/c/JBTWXSHE8M0/m/fP4eXvFzAAAJ](https://groups.google.com/a/chromium.org/g/blink-dev/c/JBTWXSHE8M0/m/fP4eXvFzAAAJ)

## Resources

- [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
- [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
- [A guide to enable cross-origin isolation](https://web.dev/cross-origin-isolation-guide/)
- [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](/blog/enabling-shared-array-buffer/)
- [Load cross-origin resources without CORP headers using `COEP: credentialless` - Chrome Developers](/blog/coep-credentialless-origin-trial/)
- [Anonymous iframe origin trial: Easily embed iframes in COEP environments - Chrome Developers](/blog/anonymous-iframe-origin-trial/)
---
layout: 'layouts/blog-post.njk'
title: "Iframe credentialless: Easily embed iframes in COEP environments"
description: >
  Iframe credentialless is implemented in Chrome 110.  It provides developers a way to load documents in third-party iframes using a new and ephemeral context. In return, they are no longer subject to the COEP embedding rules. 
  Developers using COEP can now embed third party iframes that do not use COEP themselves.
subhead: >
  Developers using COEP can now embed third party iframes that do not use COEP themselves.
date: 2023-01-12
authors:
  - arthursonzogni
hero: image/udVScdcCFAdRjZwFdLk2jWAFQyr1/unmhfaD1hmGZfa8DF04f.jpg
alt: A photo of a person sitting on a bench.  
tags:
  - privacy
  - security
---

Iframe credentialless is enabled by default from Chrome version 110. It solves the most common complaint developers working with [Cross-Origin-Embedder-Policy (COEP)](https://web.dev/security-headers/#coep) have: embedding third-party iframes that do not set COEP.

{% Aside %}  
It was previously available as an origin trial from version 106 to 108, and known as [anonymous iframe](/blog/anonymous-iframe-origin-trial/).
{% endAside %}

## Why we need COEP

Some web APIs increase the risk of side-channel attacks such as [Spectre](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)). To mitigate that risk, browsers offer an opt-in-based isolated environment called [cross-origin isolation](https://web.dev/coop-coep/), which requires deploying COEP. [Cross-origin isolation](https://web.dev/coop-coep/) allows websites to use privileged features including [`SharedArrayBuffer`](/blog/enabling-shared-array-buffer/), [`performance.measureUserAgentSpecificMemory()`](https://web.dev/monitor-total-page-memory-usage/), and [high-precision timers with better resolution](/blog/cross-origin-isolated-hr-timers/).

To enable cross-origin isolation, websites must send the following HTTP headers: 
 
```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

[COEP:credentialless](/blog/coep-credentialless-origin-trial/) can also be used as an alternative to `require-corp`. See the [documentation](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) for further details.

## Challenges with enabling COEP

While cross-origin isolation brings webpages better security and the ability to enable powerful features, deploying COEP can be [difficult](https://web.dev/cross-origin-isolation-guide/). One of the biggest challenges is that all cross-origin iframes must deploy COEP and [CORP](https://web.dev/security-headers/#corp). Iframes without those headers will not be loaded by the browser.

## Iframe credentialless to the rescue

We're introducing `<iframe credentialless>` to help embed third-party iframes that don't set COEP. By adding the `credentialless` attribute to the `<iframe>` element, the iframe is loaded from a different, empty context. In particular, it is loaded without cookies. This allows for removing the COEP restriction.

Example:  

```html
<iframe credentialless src="https://example.com">
```

This iframe is created in [a new ephemeral context](https://developer.mozilla.org/docs/Web/Security/IFrame_credentialless#the_solution_%E2%80%94_iframe_credentialless) and doesn't have access to any of the cookies associated with the top level website. Instead, it starts with an empty cookie jar. Likewise, storage APIs such as [LocalStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage), [CacheStorage](https://developer.mozilla.org/docs/Web/API/CacheStorage), [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API), and so on, load and store data in the new ephemeral partition. The partition is scoped to both the current top-level document and the origin of the iframe. All this storage is cleared once the top-level document is unloaded.

Credentialless iframes are not subject to COEP embedding rules. They are still secure: because they are loaded from a new empty context everytime, they should not contain personalized data, which is what attackers are after. If an iframe contains only public data, then it is not valuable to an attacker.

## Demo

You can check out a [demo of a credentialless iframe](https://iframe-credentialless.glitch.me/).

## FAQ

### Will this feature be adopted by other browsers?

-  Mozilla Request for position: [Pending](https://github.com/mozilla/standards-positions/issues/628)
-  Webkit Request for position: [No signal](https://lists.webkit.org/pipermail/webkit-dev/2022-April/032205.html)
-  [W3C TAG](https://www.w3.org/2001/tag/) Request for position: [satisfied](https://github.com/w3ctag/design-reviews/issues/639)

### Is an `<iframe>` nested inside an `<iframe credentialless>` credentialless?

Yes. It is inherited. Once an iframe is credentialless, that applies to all iframes in the whole subtree even without a `credentialless` attribute.

### Are pop-ups created from `<iframe credentialless>` credentialless as well?

Pop-ups are opened as if `noopener` was set. They are created in a new regular top-level context and are not credentialless. They can't communicate with the credentialless iframe.

### How to detect the document has been embedded in a credentialless iframe?

`window.credentialless` is true inside a credentialless iframe and false otherwise. Its value is `undefined` in a web browser that does not support `<iframe credentialless>`.

## Resources

-  [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
-  [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
-  [A guide to enable cross-origin isolation](https://web.dev/cross-origin-isolation-guide/)
-  [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](/blog/enabling-shared-array-buffer/)
-  [Load cross-origin resources without CORP headers using `COEP: credentialless`](/blog/coep-credentialless-origin-trial/)
-  [IFrame credentialless - Web security | MDN](https://developer.mozilla.org/docs/Web/Security/IFrame_credentialless)

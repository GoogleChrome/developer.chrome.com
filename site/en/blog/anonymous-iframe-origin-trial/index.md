---
layout: 'layouts/blog-post.njk'
title: "Anonymous iframe origin trial: Easily embed iframes in COEP environments"
description: >
  Developers using COEP can now embed third party iframes that do not use COEP themselves.
  Anonymous iframe origin trial is available for testing in Chrome from version 106 to 108.
subhead: >
  Developers using COEP can now embed third party iframes that do not use COEP themselves.
date: 2022-09-01
authors:
  - arthursonzogni
tags:
  - privacy
  - security
---

{% Aside %}
Anonymous iframe has been renamed to iframe credentialless. It is enabled by default starting from Chrome version 110.
You can see the [announcement](/blog/iframe-credentialless) for further details.
 
`<iframe anonymous></iframe>` is renamed `<iframe credentialless></iframe>`.
`window.isAnonymouslyFramed` is renamed `window.credentialless`.
{% endAside %}

## Why we need COEP

Some web APIs increase the risk of side-channel attacks such as
[Spectre](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)). To
mitigate that risk, browsers offer an opt-in-based isolated environment called
[cross-origin isolation](https://web.dev/coop-coep/), which, among other things,
requires deploying COEP. This allows websites to use privileged features
including
[`SharedArrayBuffer`](/blog/enabling-shared-array-buffer/),
[`performance.measureUserAgentSpecificMemory()`](https://web.dev/monitor-total-page-memory-usage/),
and
[high-precision timers with better resolution](/blog/cross-origin-isolated-hr-timers/).

To enable cross-origin isolation, websites must send the following two HTTP
headers:

{% Aside %}
The header value `require-corp` below is not a typo. COEP does require CORP for third-party resources to opt-in.
{% endAside %}

```text
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```
{% Aside %}
[`COEP:credentialless`](/blog/coep-credentialless-origin-trial/#credentialless-to-the-rescue) can also be used as an alternative to `require-corp`.
{% endAside %}

## Challenges with enabling COEP

While cross-origin isolation brings webpages better security and the ability to
enable powerful features, deploying COEP can be
[difficult](https://web.dev/cross-origin-isolation-guide/). One of the biggest
challenges is that all cross-origin iframes must also deploy COEP and CORP.
Iframes without those headers will not be loaded by the browser.

The iframes are usually served by a third party for whom it may not be easy to
deploy COEP.

## Anonymous iframe to the rescue

That's where anonymous iframe comes in. By adding the `anonymous` attribute to
the `<iframe>` element, the iframe is loaded from a different, ephemeral storage
partition and it isn't subject to COEP restrictions anymore.

Example:

```html
<iframe anonymous src="https://example.com">
```

Iframe is created in a new ephemeral context and doesn't have access to any of
the cookies associated with the top level website. It starts from an empty
cookie jar. Likewise, storage APIs such as
[`LocalStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage),
[`CacheStorage`](https://developer.mozilla.org/docs/Web/API/CacheStorage),
[`IndexedDB`](https://developer.mozilla.org/docs/Web/API/IndexedDB_API), and so
on, are loading and storing data in the new ephemeral partition. The partition
is scoped to the current top-level document and origin of the iframe. Storage
will be cleared once the top-level document is unloaded.

Anonymous iframes are not subject to COEP embedding rules. This is still
secure, because they are loaded from a new empty context everytime. They will be
loaded without their data being personalized. They contain only public data,
which is not valuable to an attacker.

## Demo

You can check out an anonymous iframe at:
[https://anonymous-iframe.glitch.me/](https://anonymous-iframe.glitch.me/)

## Register for an origin trial

To ensure that Anonymous iframes are helping developers adopt cross origin
isolation, we are making them available in Chrome from version 106 to 108 as an
origin trial.

Register for the origin trial to enable your website to use Anonymous
iframes:

1.  [Request a token](/origintrials/#/view_trial/2518638091606949889)
    for your origin.
1.  Use the token in one of the following ways:
    -  In your HTML:      
        ```html
        <meta http-equiv="Origin-Trial" content="TOKEN_GOES_HERE">
        ```
    -  In your Javascript:
        ```js
          const meta = document.createElement('meta');
          meta.httpEquiv = 'Origin-Trial';
          meta.content = 'TOKEN_GOES_HERE';
          document.head.append(meta);
        ```
    -  In the HTTP headers:
        ```text
        Origin-Trial: TOKEN_GOES_HERE
        ```
1.  Add an anonymous iframe to your page:
      ```html
      <iframe anonymous src="https://example.com">
      ```

If you have any feedback on this feature, file an issue in the [GitHub
repository](https://github.com/WICG/anonymous-iframe).

## Third party origin trial

The origin trial is also available to third party scripts. It means it can be
enabled by scripts embedded on the page.

Leran more about how to
[register for a third-party origin trial](/docs/web-platform/third-party-origin-trials/#register-for-a-third-party-origin-trial).


## FAQ

### Will this feature be adopted by other browsers?

-   Mozilla Request for position:
    [Pending](https://github.com/mozilla/standards-positions/issues/628)
-   Webkit Request for position:
    [No signal](https://github.com/WebKit/standards-positions/issues/45)
-   [W3C TAG](https://www.w3.org/2001/tag/) Request for position:
    [satisfied](https://github.com/w3ctag/design-reviews/issues/639)

### Are iframes nested inside `<iframe anonymous>` anonymous?

Yes. It is inherited. Once an iframe is anonymous, that applies to all iframes
in the whole subtree even without an `anonymous` attribute.

### Are pop-ups created from `<iframe anonymous>` anonymous too?

Pop-ups are opened as if `noopener` was set. They are created from a new
regular top-level context and are not anonymous. They can't communicate with the
anonymous iframe.

## Resources

-   [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
-   [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
-   [A guide to enable cross-origin isolation](https://web.dev/cross-origin-isolation-guide/)
-   [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](/blog/enabling-shared-array-buffer/)
-   [Load cross-origin resources without CORP headers using `COEP: credentialless`](/blog/coep-credentialless-origin-trial/)

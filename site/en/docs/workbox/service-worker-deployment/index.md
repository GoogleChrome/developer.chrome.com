---
layout: "layouts/doc-post.njk"
title: Expectations around service worker deployment
date: 2021-10-20
description: >
  Understanding the effect a service worker has on a website once deployed.
---

Deploying a service worker may change a website's behaviors in unanticipated ways.
Because Workbox makes it easy to write and deploy a service worker,
it can be easier to miss some of the effects a service worker has on a website once deployed.

This doesn't mean that using Workbox results in bad outcomes,
only that the convenience it offers may make it easier to stumble into some pitfalls if one isn't aware of what comes with deploying a service worker.

## Precaching pitfalls

[Precaching](/docs/workbox/caching-strategies-overview/#cache-only)
has been covered previously in these docs without fully covering how the practice can backfire.
You may hit problems if you apply precaching to too many assets,
or if the service worker is registered before the page has a chance to finish loading critical assets.

Since the default behavior of `workbox-webpack-plugin`
is to instruct the service worker to automatically precache generated assets,
this can be problematic in a way that's easy to miss, since the barrier to adoption is low.

<figure>
    {% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/UGxOEOnTfgGK0arofNpV.png", alt="Terminal output.", width="800", height="131" %}

    <figcaption>
    Terminal output from <code>workbox-webpack-plugin.</code>
    In this example, it precaches 14 assets in the current project totaling 352 kilobytes by default.</figcaption>
</figure>

When a service worker precaches assets during installation,
one or more network requests kick off simultaneously.
This has the potential to be problematic for the user experience if not timed right.
Even if the timing is spot-on, it can still end up wasting data if the amount of precached assets isn't limited somehow.

### It's all in the timing

If a service worker precaches anything, then the time at which it's registered matters.
Service workers are often registered using inline `<script>` elements.
This means HTML parsers may discover service worker registration code before the page's critical assets have loaded.

This is a problem. A service worker should ideally be performance-neutral in the worst of cases,
not make performance worse. Do users a favor and
[register a service worker when the page's `load` event fires](https://web.dev/service-workers-registration/).
This reduces the chance that precaching will interfere with loading a page's critical assets,
which in turn means the page can get interactive faster without having to contend with network requests for assets that may not be needed until later anyway.

### Be considerate of data usage

Regardless of timing, precaching involves dispatching network requests.
If a manifest of assets to precache isn't carefully curated, the result may be some amount of waste.

Wasted data is a potential tradeoff of precaching,
but not everyone has access to fast internet or even unlimited data plans!
When precaching, consider cutting out especially large assets and rely on runtime caching to capture them rather than making costly assumptions.

## Service worker startup can delay network requests

Service workers run in a separate process from the rest of a website's code.
This process starts and stops frequently.
When a service worker needs to handle a fetch event after being inactive,
the browser first needs to spend time starting up the service worker.
This extra overhead before a request can be handled is small compared to the benefit of serving a response from the cache instead of the network.

When using strategies that can't serve from the cache,
and has to go to the network&mdash;in particular when handling
[navigation requests](https://web.dev/handling-navigation-requests/)&mdash;[bootup time always adds some delay](https://web.dev/navigation-preload/#the-problem).
Depending on device capabilities and/or CPU pressure,
a navigation request can experience a noticeable delay due to slow service worker boot-ups.
Deploying a service worker without awareness of this delay means that users could experience an unintentional performance hit.

This problem has been solved with [Navigation Preload](https://web.dev/navigation-preload/#the-solution),
but [it isn't supported in all browsers yet](https://caniuse.com/mdn-api_navigationpreloadmanager_enable).
However, it's use is worth considering,
and it's covered [later in this documentation](/docs/workbox/navigation-preload).

## Cache-first strategies can backfire

Caching strategies that consult the cache first&mdash;or _only_ consult the cache&mdash;are great for both offline access and performance.
However, they tend to cause issues in some select cases.

### Runtime caching of unversioned static assets

Bundlers typically version static assets with a content-based hash in the file name (for example, `styles.a4edf38c.css`).
In service workers that use caching strategies which consult the cache first for static assets,
and use a network-first strategy for page markup,
there shouldn't be caching issues since updated assets are referenced in markup which is always retrieved from the network.

Problems arise in situations when unversioned static assets are cached during runtime using these strategies.
If a website's functionality is provided by `app.js` and a cache-first runtime strategy is used,
then `app.js` is updated later without a change in its file name,
the initially cached version continues to be served from the cache rather than updated.

The solution is to use a strategy that consults the network for updates,
like network-first or stale-while-revalidate.
Alternatively, build tools can generate a precache manifest for those assets,
since Workbox's precaching logic will keep them up to date.

Regardless, strongly consider versioning static assets, whether by a hash in the asset name, or in the query string.
This will avoid issues with stale assets in service workers that use cache-first runtime strategies for static assets.

### Mind storage quotas

It's common to roll out service worker updates from time to time,
and when updates get rolled out, old caches with expired names _usually_ get pruned during the new service worker's activation.

However, some service worker iterations are long-lived,
or cache names might not get updated in new updates.
When this happens, old static assets can pile up in caches as updates to them are rolled out.
Browsers set storage quotas, and limits can vary. That's a good reason to be mindful of them!

Workbox does a good job of mitigating these issues,
but storage quotas can still be exceeded.
You can achieve finer control of caches with the
[workbox-expiration module](/docs/workbox/modules/workbox-expiration).

## Have no fear

Deploying a service worker is no small thing.
Yet, it shouldn't be a scary feat with a bit of planning and mindfulness of what deploying a service worker with Workbox entails.
As you continue, this documentation will help you to navigate these concerns with care and confidence.

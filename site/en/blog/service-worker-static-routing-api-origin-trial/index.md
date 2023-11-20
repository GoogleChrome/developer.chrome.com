---
layout: 'layouts/blog-post.njk'
title: Service Worker Static Routing API Origin Trial
description: |
  Learn about the first phase of the Service Worker Static Routing—now in an Origin Trial—a new API for declaratively specifying how routes should be handled (or not) by your Service Worker.
authors:
  - brendankenny
date: 2023-11-10
hero: 'image/MtjnObpuceYe3ijODN3a79WrxLU2/r0jFyrDEH1gy1hCYnVb1.jpg'
alt: >
  A stock photo of a card catalog.
tags:
  - service-worker
  - origin-trials
  - javascript
  - performance
---

Service workers are a powerful tool for allowing websites to work offline and create specialized caching rules for themselves. A service worker `fetch` handler sees every request from a page it controls, and can decide if it wants to serve a response to it from the service worker cache, or even rewrite the URL to fetch a different response entirely—for instance, based on local user preferences.

However, there can be a performance cost to service workers when a page is loaded for the first time in a while and the controlling service worker isn't currently running. Since all fetches need to happen through the service worker, the browser has to wait for the service worker to start up and run to know what content to load. This startup cost can be small, but significant, for developers using service workers to improve performance through caching strategies.

[Navigation preload](https://web.dev/blog/navigation-preload) is one approach to solving the problem—allowing navigation requests to be made over the network in parallel to service worker startup—but it's limited to initial navigation requests and still includes the service worker in the critical path. Since navigation preload launched, there have been multiple efforts to develop a more general solution to the problem space, including ways for some requests to not be blocked on service worker startup at all.

## The Service Worker Static Routing API

Starting in Chrome 116, the experimental Service Worker Static Routing API is available for testing the first step to such a solution. When a service worker is installed, it can use the Service Worker Static Routing API to declaratively state how certain resource paths should be fetched.

In the initial version of the API, paths can be declared to always be served from the network, not the service worker. When a controlled URL is later loaded, the browser can start fetching resources from those paths before the service worker has finished starting. This removes the service worker from the paths that you know don't need a service worker.

To use the API, the service worker calls `event.registerRouter` on the `install` event with a set of rules:

```js
self.addEventListener('install', event => {
  if (event.registerRouter) {
    // Go straight to the network and bypass invoking "fetch" handlers for all
    // same-origin URLs that start with '/form/'.
    event.registerRouter([{
      condition: {
        urlPattern: {pathname: '/form/*'},
      },
      source: 'network',
    }]);
  }
});
```

Each rule generally has two properties:

- `condition`: specifies when the rule applies using the [URL Pattern API](https://developer.mozilla.org/docs/Web/API/URL_Pattern_API) to match resource paths. The property can take a `URLPattern` instance, or the equivalent plain object that is compatible with being passed into the [`URLPattern` constructor](https://developer.mozilla.org/docs/Web/API/URLPattern/URLPattern) (for instance, either `new URLPattern({pathname: '*.jpg'})` or just `{pathname: '*.jpg'}`).


   The flexibility of URL Patterns means that the rule can match something as simple as any resource under a path, to very specific and detailed conditions. The patterns should generally be familiar to users of popular routing libraries.


- `source`: specifies how the resources matching `condition` will be loaded. Today, only the `'network'` value is supported (bypassing the service worker to load the resource over the network directly), but the plan is to [expand this to other values](https://github.com/WICG/service-worker-static-routing-api/blob/main/final-form.md#:~:text=enum%20RouterSourceEnum%20%7B%20%22network%22%2C%20%22cache%22%2C%20%22fetch%2Devent%22%2C%20%22race%2Dnetwork%2Dand%2Dfetch%2Dhandler%22%20%7D%3B) in the future.

## Use cases

As explained, the initial version of the API is essentially an escape hatch from service worker control for some paths. Where this will make sense to use is going to be dependent on how you use your service worker and how users traverse your site.

One example might be if your site uses a [cache-first strategy](https://web.dev/articles/offline-cookbook#cache-falling-back-to-network) (falling back to network), but there's some content that's so rarely visited that there's little to no value in it ever hitting the cache (like archived content or RSS feeds). Restricting these paths to be fetched from the network only _can_ be set up in the service worker, but the service worker still has to start up and run to decide how to handle those requests.

The static routing API, in contrast, bypasses the service worker completely with a few declarative lines:

```js
self.addEventListener('install', event => {
  if (event.registerRouter) {
    event.registerRouter([{
      condition: {
        urlPattern: {pathname: '/feeds/*.xml'},
      },
      source: 'network',
    }, {
      condition: {
        urlPattern: {pathname: '/archives/*'},
      },
      source: 'network',
    }]);
  }
});
```

As the Service Worker Static Routing API evolves, the plan is for this configuration to get more flexible and support more scenarios, like declaratively racing a network fetch and service worker startup. See [the spec explainer's exploration of a potential "final form" of the API](https://github.com/WICG/service-worker-static-routing-api/blob/main/final-form.md) for more details.

## Trying out the Service Worker Static Routing API

The Service Worker Static Routing API is available in Chrome starting in version 116 behind [an origin trial](/origintrials/#/view_trial/1458040379361198081), which allows developers to test out the API on their site with real users to measure the effect. See ["Get started with origin trials"](/docs/web-platform/origin-trials/) for background information on origin trials.

{% Aside 'important' %}
  Unlike other origin trials you may have tried before, this origin trial will only work by putting the origin trial token in an HTTP header (<code>Origin-Trial: TOKEN_GOES_HERE</code>) <em>served on the service worker script</em>. It will not work in a <code>&lt;meta&gt;</code> element with the <code>http-equiv</code> attribute, or as a header on a page's HTML document.
{% endAside %}

For local testing, the Service Worker Static Routing API can be enabled with a flag at `chrome://flags/#service-worker-static-router`, or by running Chrome from the command like with `--enable-features=ServiceWorkerStaticRouter`.

## Feedback and future directions

The Service Worker Static Routing API is actively being developed and still being shaped. If it seems like it could be useful for you, please try it out via [the origin trial](/origintrials/#/view_trial/1458040379361198081) and [provide feedback on the API, implementation, and available functionality](https://github.com/WICG/service-worker-static-routing-api/issues).

_Hero image from [Unsplash](https://unsplash.com/), by [Jan Antonin Kolar](https://unsplash.com/@jankolar)._

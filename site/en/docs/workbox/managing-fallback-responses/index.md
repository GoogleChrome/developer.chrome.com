---
layout: "layouts/doc-post.njk"
title: Managing fallback responses
date: 2021-12-07
description: >
  Sometimes users encounter network failures or go offline. Learn how to adapt to those situations and provide a fallback response.
---

{% YouTube id='M7gQg9JojGE' %}

In certain situations, you may want a fallback response cached in case the user is offline. Implementing a fallback is an alternative to caching behaviors that strategies like network-first or stale-while-revalidate provide.

A fallback is a generic, one-size-fits-all response that's a better placeholder than what the browser would provide by default when a request fails. Some examples are:

- An alternative to the "missing image" placeholder.
- An HTML alternative to the standard "no network connection available" page.

## Offline page only

If all you need to do is provide a custom offline HTML page, but nothing else, here's a baseline recipe you can follow:

```js
import {offlineFallback} from 'workbox-recipes';
import {setDefaultHandler} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

setDefaultHandler(new NetworkOnly());

offlineFallback();
```

The above code uses `setDefaultHandler` to use a network-only strategy as the default for all routes. It then runs the `offlineFallback` recipe to serve the offline fallback in case an error occurs. The recipe assumes your offline fallback HTML file will be [named `offline.html`](/docs/workbox/reference/workbox-recipes/#method-offlineFallback) and served from the root of your web server.

## Comprehensive fallbacks

Whenever a network failure or cache miss occurs, the caching strategies offered by `workbox-strategies` will reject consistently. This promotes the pattern of setting a global "catch" handler to deal with any failures in a single handler function, allowing you to offer different fallbacks for different [`request.destination`](https://developer.mozilla.org/docs/Web/API/Request/destination) values.

The following example uses the `warmStrategyCache` recipe from `workbox-recipes` and sets a catch handler to serve items cached ahead of time in the runtime cache. However, precaching fallbacks may be a better fit for your application:

```js
import {warmStrategyCache} from 'workbox-recipes';
import {setDefaultHandler, setCatchHandler} from 'workbox-routing';
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';

// Fallback assets to cache
const FALLBACK_HTML_URL = '/offline.html';
const FALLBACK_IMAGE_URL = '/images/image-not-found.jpg';
const FALLBACK_STRATEGY = new CacheFirst();

// Warm the runtime cache with a list of asset URLs
warmStrategyCache({
  urls: [FALLBACK_HTML_URL, FALLBACK_IMAGE_URL],
  strategy: FALLBACK_STRATEGY,
});

// Use a stale-while-revalidate strategy to handle requests by default.
setDefaultHandler(new StaleWhileRevalidate());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(async ({request}) => {
  // The warmStrategyCache recipe is used to add the fallback assets ahead of
  // time to the runtime cache, and are served in the event of an error below.
  // Use `event`, `request`, and `url` to figure out how to respond, or
  // use request.destination to match requests for specific resource types.
  switch (request.destination) {
    case 'document':
      return FALLBACK_STRATEGY.handle({event, request: FALLBACK_HTML_URL});

    case 'image':
      return FALLBACK_STRATEGY.handle({event, request: FALLBACK_IMAGE_URL});

    default:
      // If we don't have a fallback, return an error response.
      return Response.error();
  }
});
```

In this next, fallback responses are precached using [`injectManifest`](/docs/workbox/precaching-with-workbox/#precaching-with-injectmanifest) with Workbox's build tools, and served as a fallback in the event of an error with the `matchPrecache` method.

```js
import {matchPrecache, precacheAndRoute} from 'workbox-precaching';
import {setDefaultHandler, setCatchHandler} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

// Optional: use the injectManifest mode of one of the Workbox
// build tools to precache a list of URLs, including fallbacks.
precacheAndRoute(self.__WB_MANIFEST);

// Use a stale-while-revalidate strategy to handle requests by default.
setDefaultHandler(new StaleWhileRevalidate());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(async ({request}) => {
  // Fallback assets are precached when the service worker is installed, and are
  // served in the event of an error below. Use `event`, `request`, and `url` to
  // figure out how to respond, or use request.destination to match requests for
  // specific resource types.
  switch (request.destination) {
    case 'document':
      // FALLBACK_HTML_URL must be defined as a precached URL for this to work:
      return matchPrecache(FALLBACK_HTML_URL);

    case 'image':
      // FALLBACK_IMAGE_URL must be defined as a precached URL for this to work:
      return matchPrecache(FALLBACK_IMAGE_URL);

    default:
      // If we don't have a fallback, return an error response.
      return Response.error();
  }
});
```

An example use case for the second fallback setup is if a page was cached ahead of time, but images (or other assets) requested by the page were not. The page can still be read from the cache when the user is offline, but fallback placeholders or alternate functionality can be provided if a network error occurs.

## Warming the runtime cache

Workbox maintains separate caches for precaching and runtime caches, and there may be situations where you want to cache something ahead of time without relying on precaching, since updates to the precache manifest will require you to deploy an updated service worker.

To prime the runtime cache ahead of time with assets, you can do using so using the `warmStrategyCache` recipe from [`workbox-recipes`](/docs/workbox/modules/workbox-recipes/). Under the hood, this strategy calls [`Cache.addAll`](https://developer.mozilla.org/docs/Web/API/Cache/addAll) in a service worker's `install` event.

```js
import {warmStrategyCache} from 'workbox-recipes';
import {CacheFirst} from 'workbox-strategies';

// This can be any strategy, CacheFirst used as an example.
const strategy = new CacheFirst();
const urls = [
  '/offline.html',
];

warmStrategyCache({urls, strategy});
```

## Conclusion

Managing fallback responses for failed requests takes a bit of work, but with a bit of advance planning, you can set up your web app to provide some level of content and functionality when the user is offline.

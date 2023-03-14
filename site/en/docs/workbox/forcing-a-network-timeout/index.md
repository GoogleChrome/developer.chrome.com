---
layout: "layouts/doc-post.njk"
title: Forcing a network timeout
date: 2021-12-07
description: >
  Learn how to force a network timeout in the presence of a slow network connection, and how to get the timing right.
---

There are times when you have a network connection, but that connection is either too slow, or your connection [is lying to you that you're online](https://web.dev/performance-poor-connectivity/#lie-fi). In such situations where a service worker is in the mix, a network-first caching strategy may take too long to get a response from the network, or the request will hang&mdash;and loading spinners will spin endlessly&mdash;until you get an error page.

Whatever the situation is, there are instances in which falling back to the last cached response for an asset or page after a certain period of time would be preferable&mdash;yet another problem that Workbox can help with.

## Using `networkTimeoutSeconds`

Forcing a timeout for network requests can be done when using the [`NetworkFirst`](/docs/workbox/reference/workbox-strategies/#type-NetworkFirst) or [`NetworkOnly`](/docs/workbox/reference/workbox-strategies/#type-NetworkOnly) strategies. These strategies offer a `networkTimeoutSeconds` option, which specifies the number of seconds the service worker should wait for the network response to arrive before it bails out and returns the last cached version of it:

```js
// sw.js
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute, NavigationRoute } from 'workbox-routing';

// Only wait for three seconds before returning the last
// cached version of the requested page.
const navigationRoute = new NavigationRoute(new NetworkFirst({
  networkTimeoutSeconds: 3,
  cacheName: 'navigations'
}));

registerRoute(navigationRoute);
```

The above code instructs your service worker to bail out on any network-first navigation request and use the last cached version after three seconds. When used with navigation requests, this guarantees access to the last cached response of any previously visited page.

However, what if the page you're accessing doesn't have an older response in the cache? In cases like that, you can establish a fallback response to a generic offline HTML page:

```js
import {registerRoute, NavigationRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

// Hardcode the fallback cache name and the offline
// HTML fallback's URL for failed responses
const FALLBACK_CACHE_NAME = 'offline-fallback';
const FALLBACK_HTML = '/offline.html';

// Cache the fallback HTML during installation.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(FALLBACK_CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML)),
  );
});

// Apply a network-only strategy to navigation requests.
// If offline, or if more than five seconds pass before there's a
// network response, fall back to the cached offline HTML.
const networkWithFallbackStrategy = new NetworkOnly({
  networkTimeoutSeconds: 5,
  plugins: [
    {
      handlerDidError: async () => {
        return await caches.match(FALLBACK_HTML, {
          cacheName: FALLBACK_CACHE_NAME,
        });
      },
    },
  ],
});

// Register the route to handle all navigations.
registerRoute(new NavigationRoute(networkWithFallbackStrategy));
```

This works because when you use `networkTimeoutSeconds` in a `NetworkFirst` strategy, your handler will return an error response if the timeout occurs and there isn't a cache match for the URL. If that happens, the `handlerDidError` Workbox plugin can provide a generic response as a fallback.

## How long is too long to wait?

When forcing a timeout for requests&mdash;particularly navigation requests&mdash;you want to strike the right balance between not letting the user wait for too long and not timing out too quickly. Wait too long, and you might risk users on slow connections bouncing before the timeout occurs. Timeout too fast, and you may end up unnecessarily serving stale content from the cache.

The right answer is "it depends". If you're running a site such as a blog and don't update content too often, the right answer is probably to err on the side of not waiting _too_ much, as whatever is in the cache is probably "fresh" enough. However, for more interactive websites and web apps, it may be best to wait a bit longer and avoid serving stale data from the service worker cache too eagerly.

If you're recording metrics [in the field](https://web.dev/how-to-measure-speed/#lab-data-vs-field-data), look at the **75th percentile** of [Time to First Byte (TTFB)](https://web.dev/ttfb/) and [First Contentful Paint (FCP)](https://web.dev/fcp/) scores to get a sense of where longer wait times for navigation requests might be among your user base. That may give you insight as to where to draw the line.

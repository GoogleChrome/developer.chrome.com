---
layout: "layouts/doc-post.njk"
title: Caching resources during runtime
date: 2021-12-07
description: >
  Learn how to handle caching resources during runtime, including cross-origin resources.
---

{% YouTube id='BO9fplbCTuQ' %}

Some assets in your web application may be infrequently used, very large, or vary based on the user's device (such as responsive images) or language. These are instances where [precaching may be an anti-pattern](/docs/workbox/precaching-dos-and-donts/), and you should rely on runtime caching instead.

In Workbox, you can handle runtime caching for assets using the [`workbox-routing` module](/docs/workbox/modules/workbox-routing/) to match routes, and handle caching strategies for them with the [`workbox-strategies` module](/docs/workbox/modules/workbox-strategies/).

## Caching strategies

You can handle most routes for assets with one of the built in caching strategies. [They're covered in detail earlier in this documentation](/docs/workbox/caching-strategies-overview/), but here are a few worth recapping:

- [**Stale While Revalidate**](/docs/workbox/reference/workbox-strategies/#type-StaleWhileRevalidate) uses a cached response for a request if it's available and updates the cache in the background with a response from the network. Therefore, if the asset isn't cached, it will wait for the network response and use that. It's a fairly safe strategy, as it regularly updates cache entries that rely on it. The downside is that it always requests an asset from the network in the background.
- [**Network First**](/docs/workbox/reference/workbox-strategies/#type-NetworkFirst) tries to get a response from the network first. If a response is received, it passes that response to the browser and saves it to a cache. If the network request fails, the last cached response will be used, enabling offline access to the asset.
- [**Cache First**](/docs/workbox/reference/workbox-strategies/#type-CacheFirst) checks the cache for a response first and uses it if available. If the request isn't in the cache, the network is used and any valid response is added to the cache before being passed to the browser.
- [**Network Only**](/docs/workbox/reference/workbox-strategies/#type-NetworkOnly) forces the response to come from the network.
- [**Cache Only**](/docs/workbox/reference/workbox-strategies/#type-CacheOnly) forces the response to come from the cache.

You can apply these strategies to select requests using methods offered by `workbox-routing`.

## Applying caching strategies with route matching

`workbox-routing` exposes a [`registerRoute` method](/docs/workbox/reference/workbox-routing/#method-registerRoute) to match routes and handle them with a caching strategy. `registerRoute` accepts a [`Route` object](/docs/workbox/reference/workbox-routing/#type-Route) that in turn accepts two arguments:

1. A string, [regular expression](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions), or [a match callback](/docs/workbox/reference/workbox-core/#method-RouteMatchCallback) to specify route matching criteria.
2. A handler for the route&mdash;typically a strategy provided by `workbox-strategies`.

Match callbacks are preferred to match routes, as they provide a context object that includes [the `Request` object](https://developer.mozilla.org/docs/Web/API/Request), the request URL string, the fetch event, and a boolean of whether the request is a same-origin request.

The handler then handles the matched route. In the following example, a new route is created that matches same-origin image requests coming, applying the [cache first, falling back to network strategy](/docs/workbox/caching-strategies-overview/#cache-first-falling-back-to-network).

```js
// sw.js
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// A new route that matches same-origin image requests and handles
// them with the cache-first, falling back to network strategy:
const imageRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.destination === 'image'
}, new CacheFirst());

// Register the new route
registerRoute(imageRoute);
```

{% Aside %}
The [`request.destination`](https://developer.mozilla.org/docs/Web/API/Request/destination) property of the `Request` object is an excellent way to match requests for specific content types, as it side-steps the pitfalls of matching requests for assets based on their file extension.
{% endAside %}

## Using multiple caches

Workbox allows you to bucket cached responses into separate `Cache` instances using the `cacheName` option available in the bundled strategies.

In the following example, images use a stale-while-revalidate strategy, whereas CSS and JavaScript assets use a cache-first falling back to network strategy. The route for each asset places responses into separate caches, by adding the `cacheName` property.

```js
// sw.js
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Handle images:
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image'
}, new StaleWhileRevalidate({
  cacheName: 'images'
}));

// Handle scripts:
const scriptsRoute = new Route(({ request }) => {
  return request.destination === 'script';
}, new CacheFirst({
  cacheName: 'scripts'
}));

// Handle styles:
const stylesRoute = new Route(({ request }) => {
  return request.destination === 'style';
}, new CacheFirst({
  cacheName: 'styles'
}));

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);
```

<figure>
{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/L3j9W8kXFzZEGt8CUEgp.png", alt="A screenshot of a list of Cache instances in the application tab of Chrome's DevTools. There are three distinct caches shown: one named 'scripts', another named 'styles', and the last one is named 'images'.", width="800", height="378" %}
  <figcaption>
    The Cache storage viewer in the Application panel of Chrome DevTools. Responses for different asset types are stored in separate caches.
  </figcaption>
</figure>

## Setting an expiry for cache entries

Be aware of storage quotas when managing service worker cache(s). [`ExpirationPlugin`](/docs/workbox/reference/workbox-expiration/#type-ExpirationPlugin) simplifies cache maintenance and is exposed by `workbox-expiration`. To use it, specify it in the configuration for a caching strategy:

```js
// sw.js
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Evict image cache entries older thirty days:
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image';
}, new CacheFirst({
  cacheName: 'images',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 30,
    })
  ]
}));

// Evict the least-used script cache entries when
// the cache has more than 50 entries:
const scriptsRoute = new Route(({ request }) => {
  return request.destination === 'script';
}, new CacheFirst({
  cacheName: 'scripts',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 50,
    })
  ]
}));

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
```

{% Aside 'gotchas' %}
`ExpirationPlugin` can only be used with registered routes using a strategy that has a configured `cacheName`
{% endAside %}

Complying with storage quotas can be complicated. It's good practice to consider users who may be experiencing storage pressure, or want to make the most efficient use of their storage. Workbox's `ExpirationPlugin` pairs can help in achieving that goal.

## Cross-origin considerations

The interaction between your service worker and cross-origin assets is considerably different than with same-origin assets. Cross-Origin Resource Sharing (CORS) is complicated, and that complexity extends to how you handle cross-origin resources in a service worker.

{% Aside %}
Read Jake Archibald's [How to win at CORS](https://jakearchibald.com/2021/cors/) guide for an excellent interactive explainer on how CORS works.
{% endAside %}

### Opaque responses

When making a cross-origin request in [`no-cors` mode](https://fetch.spec.whatwg.org/#concept-request-mode), the response can be stored in a service worker cache and even be used directly by the browser. However, the response body _itself_ can't be read via JavaScript. This is known as an [_opaque response_](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque).

Opaque responses are a security measure intended to prevent the inspection of a cross-origin asset. You can still make requests for cross-origin assets and even cache them, you just can't read the response body or even read its [status code](https://developer.mozilla.org/docs/Web/HTTP/Status)!

{% Aside %}
You can learn more about opaque responses in this [Stack Overflow Q&A](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses).
{% endAside %}

#### Remember to opt into CORS mode

Even if you load cross-origin assets that _do_ set permissive CORS headers that allow you read responses, the body of cross-origin response may still be opaque. For example, the following HTML will trigger `no-cors` requests that will lead to opaque responses regardless of what CORS headers are set:

```html
<link rel="stylesheet" href="https://example.com/path/to/style.css">
<img src="https://example.com/path/to/image.png">
```

To explicitly trigger a [`cors` request](https://fetch.spec.whatwg.org/#concept-request-mode) that will yield a non-opaque response, you need to explicitly opt-in to CORS mode by adding the [`crossorigin` attribute](https://developer.mozilla.org/docs/Web/HTML/CORS_settings_attributes) to your HTML:

```html
<link crossorigin="anonymous" rel="stylesheet" href="https://example.com/path/to/style.css">
<img crossorigin="anonymous" src="https://example.com/path/to/image.png">
```

This is important to remember when routes in your service worker cache subresources loaded at runtime.

### Workbox may not cache opaque responses

By default, Workbox takes a cautious approach to caching opaque responses. As it's impossible to examine the response code for opaque responses, caching an error response can result in a persistently broken experience if a cache-first or cache-only strategy is used.

If you need to cache an opaque response in Workbox, you should use a network-first or stale-while-validate strategy to handle it. Yes, this means that the asset will still be requested from the network every time, but it ensures that failed responses won't persist, and will eventually be replaced by usable responses.

If you use another caching strategy and an opaque response is returned, Workbox will warn you that the response wasn't cached when in [development mode](/docs/workbox/troubleshooting-and-logging/).
### Force caching of opaque responses
If you are _absolutely certain_ that you want to cache an opaque response using a cache-first or cache only strategy, you can force Workbox to do so with the [`workbox-cacheable-response` module](/docs/workbox/modules/workbox-cacheable-response/):

```js
import {Route, registerRoute} from 'workbox-routing';
import {NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

const cdnRoute = new Route(({url}) => {
  return url === 'https://cdn.google.com/example-script.min.js';
}, new CacheFirst({
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    })
  ]
}))

registerRoute(cdnRoute);
```

{% Aside 'warning' %}
Reminder: _Be absolutely sure_ you want to handle opaque responses with a cache-first or cache only strategy. It can result in a persistently broken experience, requiring you to explicitly [clear your caches](https://developer.mozilla.org/docs/Web/API/Cache/delete) or deploy an updated service worker that uses a network-first strategy for cross-origin requests to fix the problem.
{% endAside %}

### Opaque Responses and the `navigator.storage` API

To avoid leakage of cross-domain information, there's significant padding added to the size of an opaque response used for calculating storage quota limits. This affects how the [`navigator.storage` API](/blog/estimating-available-storage-space/) reports storage quotas.

This padding varies by browser, but for Chrome, the minimum size that any single cached opaque response contributes to the overall storage used is [approximately 7 megabytes](https://bugs.chromium.org/p/chromium/issues/detail?id=796060#c17). You should keep this in mind when determining how many opaque responses you want to cache, since you could easily exceed storage quotas much sooner than you'd otherwise expect.

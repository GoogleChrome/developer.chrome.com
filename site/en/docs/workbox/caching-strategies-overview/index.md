---
layout: "layouts/doc-post.njk"
title: Strategies for service worker caching
date: 2021-09-24
description: >
  An overview of caching in service workers.
---

{% YouTube id='ZCVgDKjtgl0' %}

Until now, there have only been mentions and tiny code snippets of the
[`Cache` interface](https://developer.mozilla.org/docs/Web/API/Cache).
To use service workers effectively, it's necessary to adopt one or more caching strategies,
which requires a bit of familiarity with the `Cache` interface.

A caching strategy is an interaction between a service worker's `fetch` event and the `Cache` interface.
How a caching strategy is written depends;
for example, it may be preferable to handle requests for static assets differently than documents,
and this affects how a caching strategy is composed.

Before we get into the strategies themselves,
let's take a second to talk about what the  `Cache` interface isn't, what it is,
and a quick rundown of some of the methods it offers to manage service worker caches.

## The `Cache` interface versus the HTTP cache

If you haven't worked with the `Cache` interface before,
it might be tempting to think of it as the same as,
or at least related to the HTTP cache. This is not the case.

- The `Cache` interface is a caching mechanism entirely separate from the HTTP cache.
- Whatever [`Cache-Control`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control)
configuration you use to influence the HTTP cache has no influence on what assets get stored in the `Cache` interface.

It helps to think of browser caches as layered.
The HTTP cache is a low-level cache driven by key-value pairs with directives expressed in HTTP headers.

By contrast, the `Cache` interface is a high-level cache driven by a JavaScript API.
This offers more flexibility than when using relatively simplistic HTTP key-value pairs,
and is one half of what makes caching strategies possible.
Some important API methods around service worker caches are:

- [`CacheStorage.open`](https://developer.mozilla.org/docs/Web/API/CacheStorage/open)
to create a new `Cache` instance.
- [`Cache.add`](https://developer.mozilla.org/docs/Web/API/Cache/add)
and [`Cache.put`](https://developer.mozilla.org/docs/Web/API/Cache/put)
to store network responses in a service worker cache.
- [`Cache.match`](https://developer.mozilla.org/docs/Web/API/Cache/match)
to locate a cached response in a `Cache` instance.
- [`Cache.delete`](https://developer.mozilla.org/docs/Web/API/Cache/delete)
to remove a cached response from a `Cache` instance.

These are just a few. There are other useful methods,
but these are the basic ones you'll see used later on in this guide.

## The humble `fetch` event

The other half of a caching strategy is the service worker's
[`fetch` event](https://developer.mozilla.org/docs/Web/API/FetchEvent).
So far in this documentation, you've heard a bit about "intercepting network requests",
and the `fetch` event inside of a service worker is where this happens:

```js
// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName));
});

self.addEventListener('fetch', async (event) => {
  // Is this a request for an image?
  if (event.request.destination === 'image') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Respond with the image from the cache or from the network
      return cache.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
          // Add the network response to the cache for future visits.
          // Note: we need to make a copy of the response to save it in
          // the cache and use the original as the request response.
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});
```

This is a toy example&mdash;and
[one you can see in action for yourself](https://service-worker-fetch-event-example.glitch.me/)&mdash;but
it's one that offers a glimpse into what service workers can do.
The above code does the following:

1. Inspect the request's `destination` property to see if this is an image request.
2. If the image is in the service worker cache, serve it from there.
If not, fetch the image from the network,
store the response in the cache, and return the network response.
3. All other requests are passed through the service worker with no interaction with the cache.

A fetch's `event` object contains a
[`request` property](https://developer.mozilla.org/docs/Web/API/FetchEvent/request)
which some useful bits of information to help you identify the type of each request:

- [`url`](https://developer.mozilla.org/docs/Web/API/Request/url),
which is the URL for the network request currently being handled by the `fetch` event.
- [`method`](https://developer.mozilla.org/docs/Web/API/Request/method),
which is the request method (e.g., `GET` or `POST`).
- [`mode`](https://developer.mozilla.org/docs/Web/API/Request/mode),
which describes the request's mode.
A value of `'navigate'` is often used to distinguish requests for HTML documents from other requests.
- [`destination`](https://developer.mozilla.org/docs/Web/API/Request/destination),
which describes the type of content being requested in a way that avoids using the requested asset's file extension.

Once again, asynchrony is the name of the game.
You'll recall that the `install` event offers an
[`event.waitUntil`](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil)
method that takes a promise, and waits for it to resolve before continuing on to activation.
The `fetch` event offers a similar
[`event.respondWith` method](https://developer.mozilla.org/docs/Web/API/FetchEvent/respondWith)
that you can use to return the result of an asynchronous
[`fetch` request](https://developer.mozilla.org/docs/Web/API/Fetch_API)
or a response returned by the `Cache` interface's
[`match` method](https://developer.mozilla.org/docs/Web/API/Cache/match).


## Caching strategies

Now that you've got a little familiarity with `Cache` instances and the `fetch` event handler,
you're ready to dive into some service worker caching strategies.
While the possibilities are practically endless,
this guide will stick with the strategies that ship with Workbox,
so you can get a sense of what goes on in Workbox's internals.

### Cache only

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/50fNQ7L8b8V5uqQM94LH.png",
alt="Shows flow from page, to service worker, to cache.",
width="800", height="395" %}

Let's start with a simple caching strategy we'll call "Cache Only".
It's just that: when the service worker is in control of the page,
matching requests will only ever go to the cache.
This means that any cached assets will need to be precached in order to be available for the pattern to work,
and that those assets will never be updated in the cache until the service worker is updated.

```js
// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

// Assets to precache
const precachedAssets = [
  '/possum1.jpg',
  '/possum2.jpg',
  '/possum3.jpg',
  '/possum4.jpg'
];

self.addEventListener('install', (event) => {
  // Precache assets on install
  event.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll(precachedAssets);
  }));
});

self.addEventListener('fetch', (event) => {
  // Is this one of our precached assets?
  const url = new URL(event.request.url);
  const isPrecachedRequest = precachedAssets.includes(url.pathname);

  if (isPrecachedRequest) {
    // Grab the precached asset from the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request.url);
    }));
  } else {
    // Go to the network
    return;
  }
});
```

Above, an array of assets is precached at install time.
When the service worker handles fetches,
we check if the request URL handled by the `fetch` event is in the array of precached assets.
If so, we grab the resource from the cache, and skip the network.
Other requests pass through to the network,
and only the network.
To see this strategy in action,
[check out this demo](https://service-worker-cache-only.glitch.me/) with your console open.

### Network only

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/rJDbZlO4qk4eoY6M038e.png",
alt="Shows flow from page, to service worker, to network.",
width="800", height="272" %}

The opposite of "Cache Only" is "Network Only",
where a request is passed through a service worker to the network without any interaction with the service worker cache.
This is a good strategy for ensuring content freshness (think markup),
but the tradeoff is that it will never work when the user is offline.

Ensuring a request passes through to the network just means you don't call `event.respondWith` for a matching request.
If you want to be explicit,
you can slap an empty `return;` in your `fetch` event callback for requests you want to pass through to the network.
This is what happens in the "Cache Only" strategy demo for requests that aren't precached.

### Cache first, falling back to network

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/zc7Es0hAWpIHDFQOr9e2.png",
alt="Shows flow from page, to service worker, to cache, then to network if not in the cache.",
width="800", height="272" %}

This strategy is where things get a little more involved.
For matching requests, the process goes like this:

1. The request hits the cache. If the asset is in the cache, serve it from there.
2. If the request is _not_ in the cache, go to the network.
3. Once the network request finishes, add it to the cache,
then return the response from the network.

Here's an example of this strategy, which you can test out in
[a live demo](https://service-worker-cache-then-network.glitch.me/):

```js
// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});
```

Though this example covers just images,
this is a great strategy to apply to all static assets (such as CSS, JavaScript, images, and fonts),
especially hash-versioned ones.
It offers a speed boost for immutable assets by side-stepping any content freshness checks with the server the HTTP cache may kick off.
More importantly, any cached assets will be available offline.

### Network first, falling back to cache

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/b9msVkRsi6uLLu3bXT6t.png",
alt="Shows flow from page, to service worker, to network, then to cache if network not available.",
width="800", height="272" %}

If you were to flip "Cache first, network second" on its head,
you end up with the "Network first, cache second" strategy, which is what it sounds like:

1. You go to the network first for a request, and place the response in the cache.
2. If you're offline at a later point,
you fall back to the latest version of that response in the cache.

This strategy is great for HTML or API requests when,
while online, you want the most recent version of a resource,
yet want to give offline access to the most recent available version.
Here's what that might look like when applied to requests for HTML:

```js
// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a navigation request
  if (event.request.mode === 'navigate') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());

        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
  } else {
    return;
  }
});
```

You can try this out [in a demo](https://service-worker-network-then-cache.glitch.me/).
First, go to the page. You may need to reload before the HTML response is placed in the cache.
Then in your developer tools,
[simulate an offline connection](https://developers.google.com/web/ilt/pwa/tools-for-pwa-developers#simulate_offline_behavior),
and reload again.
The last available version will be served instantly from the cache.

In situations where offline capability is important,
but you need to balance that capability with access to the most recent version of a bit of markup or API data,
"Network first, cache second"
is a solid strategy that achieves that goal.

### Stale-while-revalidate

{% Img src="image/ZDZVuXt6QqfXtxkpXcPGfnygYjd2/0OlRjNLcX4I8ZwgGSKZB.png",
alt="Shows flow from page, to service worker, to cache, then from network to cache.",
width="800", height="272" %}

Of the strategies we've covered so far, "Stale-while-revalidate" is the most complex.
It's similar to the last two strategies in some ways,
but the procedure prioritizes speed of access for a resource,
while also keeping it up to date in the background. This strategy goes something like:

1. On the first request for an asset, fetch it from the network,
place it in the cache, and return the network response.
2. On subsequent requests, serve the asset from the cache first, then "in the background,"
re-request it from the network and update the asset's cache entry.
3. For requests after that,
you'll receive the last version fetched from the network that was placed in the cache in the prior step.

This is an excellent strategy for things that are _sort_ of important to keep up to date,
but are not crucial.
Think of stuff like avatars for a social media site.
They get updated when users get around to doing so,
but the latest version isn't strictly necessary on every request.

```js
// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});
```

You can see this in action in
[yet another live demo](https://service-worker-stale-while-revalidate.glitch.me/),
particularly if you pay attention to the network tab in your browser's developer tools,
and its `CacheStorage` viewer (if your browser's developer tools has such a tool).

## Onward to Workbox!

This document wraps up our review of service worker's API,
as well as related APIs,
which means you've learned enough about how to directly use service workers to start tinkering with Workbox!

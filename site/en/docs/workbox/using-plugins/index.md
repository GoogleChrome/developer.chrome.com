---
layout: 'layouts/doc-post.njk'
title: Using plugins
date: 2022-02-02
description: >
  While Workbox offers a lot of off-the-shelf utility, there may be times when you need to extend it to satisfy your application requirements. That's where Workbox's plugin architecture can come in handy.
---

{% YouTube id='jR9-aDWZeSE' %}

When using Workbox, you might want to manipulate a request and a response as it's being fetched or cached. Workbox plugins allow you to add additional behaviors to your service worker with minimal extra boilerplate. They can be packaged up and reused in your own projects, or released publicly for others to use as well.

Workbox provides a number of plugins out of the box available for us, and&mdash;if you're the crafty sort&mdash;you can write custom plugins tailored to your application's requirements.

## Available Workbox plugins

Workbox offers the following official plugins for use in your service worker:

- [`BackgroundSyncPlugin`](/docs/workbox/reference/workbox-background-sync/#type-BackgroundSyncPlugin): If a network request should fail, this plugin allows you to add it to a background sync queue to be requested again when the next [sync event](https://developer.mozilla.org/docs/Web/API/SyncEvent) is triggered.
- [`BroadcastUpdatePlugin`](/docs/workbox/reference/workbox-broadcast-update/#type-BroadcastUpdatePlugin): Allows you to dispatch a message on a Broadcast Channel or via `postMessage()` whenever a cache is updated.
- [`CacheableResponsePlugin`](/docs/workbox/reference/workbox-cacheable-response/#type-CacheableResponsePlugin): Only cache requests that meet specific criteria.
- [`ExpirationPlugin`](/docs/workbox/reference/workbox-expiration/#type-ExpirationPlugin): Manages the number and maximum age of items in a cache.
- [`RangeRequestsPlugin`](/docs/workbox/reference/workbox-range-requests/#type-RangeRequestsPlugin): Respond to requests that include a [`Range` HTTP request header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Range).

Workbox plugins&mdash;whether they be one of the plugins listed above, or a custom plugin&mdash;are used with a [Workbox strategy](/docs/workbox/modules/workbox-strategies/) by adding an instance of the plugin to the strategy's [`plugins` property](/docs/workbox/reference/workbox-strategies/#property-StrategyOptions-plugins):

```js
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
```

## Methods for custom plugins

A Workbox plugin needs to implement one or more callback functions. When you add a plugin to a Strategy, the callback functions are automatically run at the right time. The [Strategy](/docs/workbox/reference/workbox-strategies/#type-Strategy) passes your callback function relevant information about the current request and/or response, giving your plugin the context it needs to take action. The following callback functions are supported:

- [`cacheWillUpdate`](/docs/workbox/reference/workbox-core/#method-CacheWillUpdateCallback): Called before a [`Response`](https://developer.mozilla.org/docs/Web/API/Response) is used to update a cache. In this method, the response can be changed before it's added to the cache, or you can return `null` to avoid updating the cache entirely.
- [`cacheDidUpdate`](/docs/workbox/reference/workbox-core/#method-CacheDidUpdateCallback): Called when a new entry is added to a cache or if an existing entry is updated. Plugins that use this method may be useful when you want to perform an action after a cache update.
- [`cacheKeyWillBeUsed`](/docs/workbox/reference/workbox-core/#method-CacheKeyWillBeUsedCallback): Called before a request is used as a cache key. This occurs for both cache lookups (when `mode` is `'read'`) and cache writes (when `mode` is `'write'`). This callback is handy if you need to override or normalize URLs prior to using them to access caches.
- [`cachedResponseWillBeUsed`](/docs/workbox/reference/workbox-core/#method-CachedResponseWillBeUsedCallback): This is called just before a response from a cache is used, which allows you to examine that response. At this point in time, you could either return a different response, or return `null`.
- [`requestWillFetch`](/docs/workbox/reference/workbox-core/#method-RequestWillFetchCallback): Called whenever a request is about to go to the network. Useful when you need to change the [`Request`](https://developer.mozilla.org/docs/Web/API/Request) just before it goes to the network.
- [`fetchDidFail`](/docs/workbox/reference/workbox-core/#method-FetchDidFailCallback): Called when a network request fails, most likely due to an absence of network connectivity, and will not fire when the browser has a network connection, but receives an error (for example, `404 Not Found`).
- [`fetchDidSucceed`](/docs/workbox/reference/workbox-core/#method-FetchDidSucceedCallback): Called whenever a network request succeeds, regardless of the HTTP response code.
- [`handlerWillStart`](/docs/workbox/reference/workbox-core/#method-HandlerWillStartCallback): Called before any handler logic starts running, which is useful if you need to set the initial handler state. For example, if you wanted to know how long the handler took to generate a response, you could make a note of the start time in this callback.
- [`handlerWillRespond`](/docs/workbox/reference/workbox-core/#method-HandlerWillRespondCallback): Called before the strategy's [`handle()` method](/docs/workbox/reference/workbox-strategies/#method-CacheFirst-handle) returns a response, which is helpful if you need to modify a response before returning it to a [`RouteHandler`](/docs/workbox/reference/workbox-core/#type-RouteHandler) or other custom logic.
- [`handlerDidRespond`](/docs/workbox/reference/workbox-core/#method-HandlerDidRespondCallback): Called after the strategy's [`handle()` method](/docs/workbox/reference/workbox-strategies/#method-CacheFirst-handle) returns a response. This is when it might be useful to record any final response details (for example, after changes made by other plugins).
- [`handlerDidComplete`](/docs/workbox/reference/workbox-core/#method-HandlerDidCompleteCallback): Called after all [extend lifetime promises](https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises) added to the event from the invocation of the strategy have settled. This is helpful if you need to report on any data that needs to wait until the handler is done in order to calculate stuff like cache hit status, cache latency, network latency, and other useful information.
- [`handlerDidError`](/docs/workbox/reference/workbox-core/#method-HandlerDidErrorCallback): Called if the handler can't provide a valid response from from _any_ source, which is the optimal time to provide some sort of fallback response as an alternative to failing outright.

All of these callback are [`async`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function), and therefore will require `await` to be used whenever a cache or fetch event reaches the relevant point for the callback concerned.

{% Aside %}
When some of the callbacks are invoked, the body of the `request` parameter _may_ have already been read, depending on the ordering of cache and network operations in your strategy. If you need to make use of the request's body from within your callback code, you can [use a `requestWillFetch` callback](https://github.com/GoogleChrome/workbox/issues/3075#issuecomment-1115261299) to store a [`clone()`](https://developer.mozilla.org/docs/Web/API/Request/clone) of the request in the `state` parameter. This cloned request will then be available for use in other callbacks run after the request is sent to the network.
{% endAside %}

If a plugin used all of the above callbacks, this would be the resulting code:

```js
const myPlugin = {
  cacheWillUpdate: async ({request, response, event, state}) => {
    // Return `response`, a different `Response` object, or `null`.
    return response;
  },
  cacheDidUpdate: async ({
    cacheName,
    request,
    oldResponse,
    newResponse,
    event,
    state,
  }) => {
    // No return expected
    // Note: `newResponse.bodyUsed` is `true` when this is called,
    // meaning the body has already been read. If you need access to
    // the body of the fresh response, use a technique like:
    // const freshResponse = await caches.match(request, {cacheName});
  },
  cacheKeyWillBeUsed: async ({request, mode, params, event, state}) => {
    // `request` is the `Request` object that would otherwise be used as the cache key.
    // `mode` is either 'read' or 'write'.
    // Return either a string, or a `Request` whose `url` property will be used as the cache key.
    // Returning the original `request` will make this a no-op.
    return request;
  },
  cachedResponseWillBeUsed: async ({
    cacheName,
    request,
    matchOptions,
    cachedResponse,
    event,
    state,
  }) => {
    // Return `cachedResponse`, a different `Response` object, or null.
    return cachedResponse;
  },
  requestWillFetch: async ({request, event, state}) => {
    // Return `request` or a different `Request` object.
    return request;
  },
  fetchDidFail: async ({originalRequest, request, error, event, state}) => {
    // No return expected.
    // Note: `originalRequest` is the browser's request, `request` is the
    // request after being passed through plugins with
    // `requestWillFetch` callbacks, and `error` is the exception that caused
    // the underlying `fetch()` to fail.
  },
  fetchDidSucceed: async ({request, response, event, state}) => {
    // Return `response` to use the network response as-is,
    // or alternatively create and return a new `Response` object.
    return response;
  },
  handlerWillStart: async ({request, event, state}) => {
    // No return expected.
    // Can set initial handler state here.
  },
  handlerWillRespond: async ({request, response, event, state}) => {
    // Return `response` or a different `Response` object.
    return response;
  },
  handlerDidRespond: async ({request, response, event, state}) => {
    // No return expected.
    // Can record final response details here.
  },
  handlerDidComplete: async ({request, response, error, event, state}) => {
    // No return expected.
    // Can report any data here.
  },
  handlerDidError: async ({request, event, error, state}) => {
    // Return a `Response` to use as a fallback, or `null`.
    return fallbackResponse;
  },
};
```

{% Aside %}
All callbacks starting with `handler` are new in Workbox starting from version 6. If you're creating a [custom strategy](/docs/workbox/modules/workbox-strategies/#custom-strategies), you don't need to worry about invoking any of the above callbacks yourself, as it's all handled by the [`Strategy` base class](/docs/workbox/reference/workbox-strategies/#type-Strategy).
{% endAside %}

The `event` object available in the callbacks listed above is the original event that triggered the fetch or cache action. Sometimes, there will _not_ be an original event, so your code should check if it exists before referencing it.

{% Aside %}
The `event` object you pass to the [`handle()` method](/docs/workbox/reference/workbox-strategies/#method-CacheFirst-handle) of a strategy will be passed to a plugin's callbacks.
{% endAside %}

All plugin callbacks are also passed a `state` object, which is unique to a particular plugin and the strategy it invokes. This means you can write plugins where one callback can conditionally perform a task based on what another callback in the same plugin did (for example, compute the difference between running `requestWillFetch()` and `fetchDidSucceed()` or `fetchDidFail()`).

## Third-party plugins

If you develop a plugin and you think it has use outside of your project, we encourage you to publish it as a module! Below is a short list of community-provided Workbox plugins:

- [`cloudinary-workbox-plugin`](https://www.npmjs.com/package/cloudinary-workbox-plugin), which [dynamically rewrites](https://blog.fullstacktraining.com/a-cloudinary-plugin-for-workbox/) requests for Cloudinary-hosted images based on the [current connection speed](https://developer.mozilla.org/docs/Web/API/Network_Information_API).
- [`workbox-plugin-firebase-auth`](https://www.npmjs.com/package/workbox-plugin-firebase-auth) helps with managing the `Authorization: Bearer` for outgoing requests that need [Firebase authentication](https://firebase.google.com/docs/reference/js/v8/firebase.User#getidtoken).

You may be able to [find more community-provided Workbox plugins](https://www.npmjs.com/search?q=keywords:workbox-plugin) by searching in npm's repository.

Finally, if you've built a Workbox plugin that you'd like to share, add the `workbox-plugin` [keyword](https://docs.npmjs.com/files/package.json#keywords) when you publish it. If you do, let us know on Twitter [@WorkboxJS](https://twitter.com/workboxjs)!

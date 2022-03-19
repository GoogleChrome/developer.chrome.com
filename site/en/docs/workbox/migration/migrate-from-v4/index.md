---
layout: 'layouts/doc-post.njk'
title: Migrate from Workbox v4 to v5
date: 2019-12-18
updated: 2020-01-30
description: >
  A guide to migrating from Workbox v4 to v5.
---

This guide is focused on breaking changes introduced in Workbox v5, with examples of what changes you'd need to make when upgrading from Workbox v4.

## Breaking Changes

### Plugin Classes Renamed

A number of Workbox v4 packages included classes named `Plugin`. In v5, those classes have been renamed to follow the pattern package identifier + `Plugin`:

- `BackgroundSyncPlugin`
- `BroadcastUpdatePlugin`
- `CacheableResponsePlugin`
- `ExpirationPlugin`
- `RangeRequestsPlugin`

This renaming applies whether you're using the classes via module imports or via the `workbox.*` namespaces.

### Default Precache Manifest Replacement Point

Previously, when using one of the build tools in "inject manifest" mode, your source service worker file was checked for the presence of `precacheAndRoute([])`, with that empty array **`[]`** used as a placeholder for the point at which the precache manifest was injected.

In Workbox v5, the replacement logic has changed, and now `self.__WB_MANIFEST` is used by default as the injection point.

```js
// v4:
precacheAndRoute([]);

// v5:
precacheAndRoute(self.__WB_MANIFEST);
```

As outlined in [this discussion](https://github.com/GoogleChrome/workbox/issues/2059#issue-448294745), we believe this change provides a simpler experience, while simultaneously giving developers more control over how the injected manifest is used within custom service worker code. If needed, you can change this replacement string via the `injectionPoint` configuration option.

### Navigation route changes

Two options that were previously supported for navigation routes, `blacklist` and `whitelist` have been renamed `denylist` and `allowlist`.

`workbox-routing` previously supported a method, `registerNavigationRoute()`, that, under the hood, did two things:

1. Detected whether or not a given `fetch` event had a [`mode` of `'navigate'`](https://fetch.spec.whatwg.org/#concept-request-mode).
2. If so, responded to that request using the contents of a previously cached, hardcoded URL, regardless of the URL being navigated to.

This is a common pattern to use when implementing the [App Shell architecture](/docs/workbox/app-shell-model/).

The second step, generating a response by reading from the cache, falls outside of what we see as the responsibilities of `workbox-routing`. Instead, we see it as functionality that should be part of `workbox-precaching`, via a new method, `createHandlerBoundToURL()`. This new method can work hand-in-hand with the existing `NavigationRoute` class in `workbox-routing` to accomplish the same logic.

If you're using the `navigateFallback` option in one of the build tool's "generate SW" mode, then the switchover will happen automatically. If you previously configured either the `navigateFallbackBlacklist` or `navigateFallbackWhitelist` options, change those to `navigateFallbackDenylist` or `navigateFallbackAllowlist`, respectively.

If you're using "inject manifest" mode or just writing the service worker yourself, and your Workbox v4 service worker calls `registerNavigationRoute()` directly, then you'll have to make a change to your code to get the equivalent behavior.

```js
// v4:
import {getCacheKeyForURL} from 'workbox-precaching';
import {registerNavigationRoute} from 'workbox-routing';

const appShellCacheKey = getCacheKeyForURL('/app-shell.html');
registerNavigationRoute(appShellCacheKey, {
  whitelist: [...],
  blacklist: [...],
});

// v5:
import {createHandlerBoundToURL} from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';

const handler = createHandlerBoundToURL('/app-shell.html');
const navigationRoute = new NavigationRoute(handler, {
  allowlist: [...],
  denylist: [...],
});
registerRoute(navigationRoute);
```

You no longer need to call `getCacheKeyForURL()`, as `createHandlerBoundToURL()` will take care of that for you.

### Removal of makeRequest() from workbox-strategies

Calling `makeRequest()` is mostly equivalent to calling `handle()` on one of the `workbox-strategy` classes. The differences between the two methods were so slight that keeping both around did not make sense. Developers who called `makeRequest()` should be able to switch to using `handle()` without any further change:

```js
// v4:
const strategy = new StaleWhileRevalidate({...});
const response = await strategy.makeRequest({event, request});

// v5:
const strategy = new StaleWhileRevalidate({...});
const response = await strategy.handle({event, request});
```

In v5, `handle()` treats `request` as a required parameter, and will not fall back to using `event.request`. Make sure that you pass in a valid request when calling `handle()`.

### workbox-broadcast-update Always Uses `postMessage()`

In v4, the `workbox-broadcast-update` library would default to using the [Broadcast Channel API](https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API) for sending messages when it was supported, and fall back to using [`postMessage()`](https://developer.mozilla.org/docs/Web/API/Worker/postMessage) only when Broadcast Channel wasn't supported.

We realized that having to listen for two potential sources of incoming messages made writing client-side code overly complicated. Additionally, on some browsers, `postMessage()` calls from the service worker sent to client pages are automatically buffered until a `message` event listener is set up. There is no buffering with the Broadcast Channel API, and broadcasted messages are just dropped if sent before a client page is ready to receive them.

Because of those reasons, we've changed `workbox-broadcast-update` to always use `postMessage()` in v5. Messages are sent one-by-one to all client pages within scope of the current service worker.

To accommodate this new behavior, you can remove any code you had in client pages that created `BroadcastChannel` instances, and instead, set up a `message` event listener on `navigator.serviceWorker`:

```js
// v4:
const updatesChannel = new BroadcastChannel('api-updates');
updatesChannel.addEventListener('message', event => {
  const {cacheName, updatedUrl} = event.data.payload;
  // ... your code here ...
});

// v5:
// This listener should be added as early as possible in your page's lifespan
// to ensure that messages are properly buffered.
navigator.serviceWorker.addEventListener('message', event => {
  // Optional: ensure the message came from workbox-broadcast-update
  if (event.meta === 'workbox-broadcast-update') {
    const {cacheName, updatedUrl} = event.data.payload;
    // ... your code here ...
  }
});
```

[`workbox-window`](/docs/workbox/modules/workbox-window/) users should not need to make any changes, as its internal logic has been updated to listen for `postMessage()` calls.

### Build Tools Require Node.js v8 or Higher

Node.js versions prior to v8 are no longer supported for `workbox-webpack-plugin`, `workbox-build`, or `workbox-cli`. If you're running a Node.js version prior to 8, update your runtime to a [supported version](https://nodejs.org/en/about/releases/).

### workbox-webpack-plugin Requires webpack v4 or Higher

If you're using `workbox-webpack-plugin`, [update your webpack setup](https://webpack.js.org/migrate/4/) to use at least webpack v4.

### Build Tool Option Overhaul

A number of `workbox-build`, `workbox-cli`, and `workbox-webpack-plugin` configuration parameters are no longer supported. For instance, `generateSW` will always create a local Workbox runtime bundle for you, so the `importWorkboxFrom` option no longer makes sense.

Consult the relevant tool's documentation for the lists of supported options.

### Removal of generateSWString from workbox-build

The `generateSWString` mode has been removed from `workbox-build`. We expect the impact of this to be minimal, as it was primarily used internally by `workbox-webpack-plugin`.

## Optional Changes

### Using Module Imports

While this change is a) optional and b) technically was possible when using Workbox v4, the biggest change that we anticipate while moving to v5 is a model where you create your own bundled service worker by importing Workbox's modules. This approach is an alternative to calling `importScripts('/path/to/workbox-sw.js')` at the top of your service worker, and using Workbox via the `workbox.*` namespace.

If you're using one of the build tools (`workbox-webpack-plugin`, `workbox-build`, `workbox-cli`) in "generate SW" mode, then this change will happen for you automatically. All of those tools will output a local, custom bundle of the Workbox runtime alongside the actual code necessary to implement your service worker logic. In this scenario, there is no longer any dependency on [`workbox-sw`](/docs/workbox/modules/workbox-sw/) or the CDN copy of Workbox. Depending on the value of your `inlineWorkboxRuntime` configuration, the Workbox runtime will either be split into a separate file that should be deployed alongside your service worker (when set to `false`, which is the default), or included inline along with the service worker logic (when set to `true`).

If you're using the build tools in "inject manifest" mode, or if you're not using Workbox's build tools at all, you can learn more about creating your own Workbox runtime bundle in the existing [Using Bundlers (webpack/Rollup) with Workbox](/docs/workbox/the-ways-of-workbox/#using-a-bundler) guide.

The documentation and examples for v5 are written assuming the module imports syntax, though the `workbox.*` namespace will continue to be supported in Workbox v5.

### Reading Precached Responses

Some developers need to read precached responses directly from the cache, instead of implicitly using them via the `precacheAndRoute()` method. A common pattern in v4 would be to first get the cache key specific to the current version of a precached resource, and then pass in that key along with the precache's cache name to `caches.match()` to get the `Response`.

To simplify this process, `workbox-precaching` in v5 supports a new, equivalent method, `matchPrecache()`:

```js
// v4:
import {cacheNames} from 'workbox-core';
import {getCacheKeyForURL} from 'workbox-precaching';

const cachedResponse = await caches.match(
  getCacheKeyForURL(`/somethingPrecached`),
  {
    cacheName: cacheNames.precache,
  }
);

// v5:
import {matchPrecache} from 'workbox-precaching';

const cachedResponse = await matchPrecache(`/somethingPrecached`);
```

### TypeScript Adoption

In v5, the Workbox runtime libraries are written in [TypeScript](https://www.typescriptlang.org/). While we will continue to publish transpiled JavaScript modules and bundles to accommodate developers who have not adopted TypeScript, if you are using TypeScript, you should benefit from accurate, always up-to-date type information directly from the Workbox project.

## Example Migration

[This commit](https://github.com/GoogleChromeLabs/so-pwa/commit/b1ecae0bc12b923506b4199dcabf4f15ca2a924e)
illustrates is a fairly involved migration, with inline commentary. It uses Rollup to include a
custom Workbox runtime in the final service worker instead of loading the runtime from the CDN.

While it doesn't cover every breaking change, here's the [before](https://github.com/jeffposnick/jeffposnick.github.io/blob/ed13f6fc9feb60ee88434ccd3d53160d23ddac45/src/service-worker.js) and [after](https://github.com/jeffposnick/jeffposnick.github.io/blob/fedbdf87dc8ee26b66f0e12e2649d92b7a853d79/src/service-worker.ts) of upgrading one service worker file from v4 to v5, including a switch to TypeScript.

## Getting Help

We anticipate most migrations to be straightforward. If you run into issues not covered in this guide, let us know by [opening an issue](https://github.com/GoogleChrome/workbox/issues/new) on GitHub.

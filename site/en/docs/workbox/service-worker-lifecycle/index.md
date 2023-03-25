---
layout: "layouts/doc-post.njk"
title: A service worker's life
date: 2021-09-24
description: >
  Understanding the way that service workers behave to make offline applications possible.
---

It's hard to know what service workers are doing without understanding their lifecycle.
Their inner workings will seem opaque, even arbitrary.
It helps to remember that&mdash;like any other browser API&mdash;service worker behaviors are well-defined,
specified, and make offline applications possible,
while also facilitating updates without disrupting the user experience.

Before diving into Workbox,
it's important to understand the service worker lifecycle so that what Workbox does makes sense.

## Defining terms

Before getting into the service worker lifecycle,
it's worth defining some terms around how that lifecycle operates.

### Control and scope

The idea of _control_ is crucial to understanding how service workers operate.
A page described as being _controlled_ by a service worker is a page that allows a service worker to intercept network requests on its behalf.
The service worker is present _and_ able to do work for the page within a given scope.

### Scope

A service worker's _scope_ is determined by its location on a web server.
If a service worker runs on a page located at `/subdir/index.html`, and is located at `/subdir/sw.js`,
the service worker's scope is `/subdir/`.
To see the concept of scope in action, check out this example:

1. Navigate to
[https://service-worker-scope-viewer.glitch.me/subdir/index.html](https://service-worker-scope-viewer.glitch.me/subdir/index.html).
A message will appear that says no service worker is controlling the page.
However, that page registers a service worker from `https://service-worker-scope-viewer.glitch.me/subdir/sw.js`.
2. Reload the page. Because the service worker has been registered and is now active,
it's controlling the page.
A form containing the service worker's scope,
current state, and its URL will be visible.
Note: having to reload the page has nothing to do with scope,
but rather the service worker lifecycle, which will be explained later on.
3. Now Navigate to [https://service-worker-scope-viewer.glitch.me/index.html](https://service-worker-scope-viewer.glitch.me/index.html).
Even though a service worker was registered on this origin,
there's still a message saying there is no current service worker.
That's because this page is not within the registered service worker's scope.

Scope limits what pages the service worker _controls_.
In this example, that means the service worker loaded from `/subdir/sw.js` can only control pages located in `/subdir/` or its subtree.

{% Aside %}
Note: Regardless of scope, a service worker controlling a page can still intercept _any_ network requests,
including those for cross-origin assets.
Scope limits which _pages_ are controlled by a service worker,
not which _requests_ it can intercept.
{% endAside %}

The above is how scoping works by default,
but the maximum allowed scope can be overridden by setting the
[`Service-Worker-Allowed`](https://w3c.github.io/ServiceWorker/#service-worker-script-response) response header,
as well as passing a
[`scope` option](https://developer.mozilla.org/docs/Web/API/ServiceWorkerRegistration/scope) to the `register` method.

Unless there's a very good reason to limit service worker scope to a subset of an origin,
load a service worker from the root directory of the web server so that its scope is as broad as possible,
and don't worry about the `Service-Worker-Allowed` header. It's a lot simpler for everyone that way.

### Client

When it's said that a service worker is controlling a page, it's really controlling a client.
A client is any open page whose URL falls within the scope of that service worker.
Specifically, these are instances of a [`WindowClient`](https://developer.mozilla.org/docs/Web/API/WindowClient).

## The lifecycle of a new service worker

In order for a service worker to control a page,
it must first be brought into existence, so to speak.
Let's begin with what happens when a brand new service worker is deployed for a website with no active service worker.

### Registration

Registration is the initial step of the service worker lifecycle:

```html
<!-- In index.html, for example: -->
<script>
  // Don't register the service worker
  // until the page has fully loaded
  window.addEventListener('load', () => {
    // Is service worker available?
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered!');
      }).catch((error) => {
        console.warn('Error registering service worker:');
        console.warn(error);
      });
    }
  });
</script>
```

This code runs on the main thread and does the following:

1. Because the user's first visit to a website occurs without a registered service worker,
wait until the page is fully loaded before registering one.
This avoids bandwidth contention if the service worker precaches anything.
2. [Though service worker is well-supported](https://caniuse.com/serviceworkers),
a quick check helps to avoid errors in browsers where it isn't supported.
3. When the page is fully loaded, and if service worker is supported, register `/sw.js`.

Some key things to understand are:

- Service workers are
[only available over HTTPS or localhost](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features).
- If a service worker's contents contain syntax errors,
registration fails and the service worker is discarded.
- Reminder: service workers operate within a scope.
Here, the scope is the entire origin, as it was loaded from the root directory.
- When registration begins, the service worker state is set to `'installing'`.

Once registration finishes, installation begins.

### Installation

A service worker fires its
[`install`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/install_event) event after registration.
`install` is only called once per service worker, and won't fire again until it's updated.
A callback for the `install` event can be registered in the worker's scope with `addEventListener`:

```js
// /sw.js
self.addEventListener('install', (event) => {
  const cacheKey = 'MyFancyCacheName_v1';

  event.waitUntil(caches.open(cacheKey).then((cache) => {
    // Add all the assets in the array to the 'MyFancyCacheName_v1'
    // `Cache` instance for later use.
    return cache.addAll([
      '/css/global.bc7b80b7.css',
      '/css/home.fe5d0b23.css',
      '/js/home.d3cc4ba4.js',
      '/js/jquery.43ca4933.js'
    ]);
  }));
});
```

This creates a new `Cache` instance and precaches assets.
We'll have plenty of opportunities to talk about precaching later,
so let's focus on the role of
[`event.waitUntil`](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil). `event.waitUntil` accepts a promise,
and waits until that promise has been resolved.
In this example, that promise does two asynchronous things:

1. Creates a new `Cache` instance named `'MyFancyCache_v1'`.
2. After the cache is created,
an array of asset URLs are precached using its asynchronous
[`addAll` method](https://developer.mozilla.org/docs/Web/API/Cache/addAll).

Installation fails if the promise(s) passed to `event.waitUntil` are
[rejected](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject).
If this happens, the service worker is discarded.

If the promises [resolve](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve),
installation succeeds and the service worker's state will change to `'installed'` and will then activate.

### Activation

If registration and installation succeed,
the service worker activates, and its state becomes `'activating'`
Work can be done during activation in the service worker's
[`activate` event](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/activate_event).
A typical task in this event is to prune old caches,
but for a brand new service worker,
this isn't relevant for the moment,
and will be expanded on when we talk about service worker updates.

For new service workers, `activate` fires immediately after `install` is successful.
Once activation finishes,
the service worker's state becomes `'activated'`.
Notice that, by default,
the new service worker won't begin controlling the page until the next navigation or page refresh.

## Handling service worker updates

Once the first service worker is deployed,
it'll likely need to be updated later.
For example, an update may be required if changes occur in request handling or precaching logic.

### When updates happen

Browsers will check for updates to a service worker when:

- The user navigates to a page within the service worker's scope.
- [`navigator.serviceWorker.register()`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerContainer/register)
is called with a URL different from the currently installed service worker&mdash;[but don't change a service worker's URL](https://web.dev/service-worker-lifecycle/#avoid-url-change)!
- [`navigator.serviceWorker.register()`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerContainer/register)
is called with the same URL as the installed service worker,
but with a different scope.
Again, avoid this by keeping the scope at the root of an origin if possible.
- When events such as `'push'` or `'sync'`
have been triggered within the last 24 hours&mdash;but don't worry about these events yet.

### How updates happen

Knowing _when_ the browser updates a service worker is important,
but so is the "how". Assuming a service worker's URL or scope is unchanged,
a currently installed service worker only updates to a new version if its contents have changed.

{% Aside %}
Tip: If a refresher on the installation and activation phases is needed,
now would be the time to re-read that section.
{% endAside %}

Browsers detect changes in a couple of ways:

- Any byte-for-byte changes to scripts requested by
[`importScripts`](https://developer.mozilla.org/docs/Web/API/WorkerGlobalScope/importScripts), if applicable.
- Any changes in the service worker's top-level code,
which affects the fingerprint the browser has generated of it.

The browser does a lot of heavy lifting here.
To ensure the browser has all it needs to reliably detect changes to a service worker's contents,
don't tell the HTTP cache to hold onto it, and don't change its file name.
The browser automatically performs update checks when there's a navigation to a new page within a service worker's scope.

### Manually triggering update checks

Concerning updates, registration logic generally shouldn't change.
Yet, one exception might be if sessions on a website are long-lived.
This can happen in single page applications where
[navigation requests](https://web.dev/handling-navigation-requests/) are rare,
since the application typically encounters one navigation request at the start of the application's lifecycle.
In such situations, a manual update can be triggered on the main thread:

```js
navigator.serviceWorker.ready.then((registration) => {
  registration.update();
});
```

For traditional websites,
or in any case where user sessions aren't long-lived,
triggering manual updates is probably not necessary.

### Installation

When using a bundler to generate static assets,
those assets will contain hashes in their name,
such as `framework.3defa9d2.js`.
Suppose some of those assets are precached for offline access later.
This would require a service worker update to precache updated assets:

```js
self.addEventListener('install', (event) => {
  const cacheKey = 'MyFancyCacheName_v2';

  event.waitUntil(caches.open(cacheKey).then((cache) => {
    // Add all the assets in the array to the 'MyFancyCacheName_v2'
    // `Cache` instance for later use.
    return cache.addAll([
      '/css/global.ced4aef2.css',
      '/css/home.cbe409ad.css',
      '/js/home.109defa4.js',
      '/js/jquery.38caf32d.js'
    ]);
  }));
});
```

Two things are different from the first `install` event example from earlier:

1. A new `Cache` instance with a key of `'MyFancyCacheName_v2'` is created.
2. The precached asset names have changed.

{% Aside %}
Note: Maintaining `Cache` instances is hard.
That's a good enough reason to use Workbox,
as it handles cache updates incrementally instead of deleting caches entirely for every update.
{% endAside %}

One thing to note is that an updated service worker gets installed alongside the previous one.
This means the old service worker is still in control of any open pages, and following installation,
the new one enters a waiting state until it's activated.

By default, a new service worker will activate when no clients are being controlled by the old one.
This occurs when all open tabs for the relevant website are closed.

{% Aside %}
Tip: You can speed up activation of updated service workers by calling
[`self.skipWaiting`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting),
but this may be a bad idea.
The old service worker may have handled fetches during page startup,
but the new service worker then takes control later on.
This can break
[stuff like lazily-loaded subresources](https://dev.to/jeffposnick/paying-attention-while-loading-lazily-45ef)
until the next navigation request.
{% endAside %}

### Activation

When an updated service worker is installed and the waiting phase ends,
it activates, and the old service worker is discarded.
A common task to perform in an updated service worker's `activate` event is to prune old caches.
Remove old caches by getting the keys for all open `Cache` instances with
[`caches.keys`](https://developer.mozilla.org/docs/Web/API/CacheStorage/keys)
and deleting caches that aren't in a defined allow list with
[`caches.delete`](https://developer.mozilla.org/docs/Web/API/CacheStorage/delete):

```js
self.addEventListener('activate', (event) => {
  // Specify allowed cache keys
  const cacheAllowList = ['MyFancyCacheName_v2'];

  // Get all the currently active `Cache` instances.
  event.waitUntil(caches.keys().then((keys) => {
    // Delete all caches that aren't in the allow list:
    return Promise.all(keys.map((key) => {
      if (!cacheAllowList.includes(key)) {
        return caches.delete(key);
      }
    }));
  }));
});
```

Old caches don't tidy themselves.
We need to do that ourselves or risk exceeding
[storage quotas](https://developer.mozilla.org/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria).
Since `'MyFancyCacheName_v1'` from the first service worker is out of date,
the cache allow list is updated to specify `'MyFancyCacheName_v2'`,
which deletes caches with a different name.

The `activate` event will finish after the old cache is removed.
At this point, the new service worker will take control of the page,
finally replacing the old one!

## The lifecycle goes ever on

Whether Workbox is used to handle service worker deployment and updates,
or the Service Worker API is used directly,
it pays to understand the service worker lifecycle.
With that understanding, service worker behaviors should seem more logical than mysterious.

For those interested in a deeper dive into this subject,
it's worth checking out
[this article by Jake Archibald](https://web.dev/service-worker-lifecycle/).
 There's tons of nuance in how the whole dance around the service lifecycle goes,
 but it _is_ knowable, and that knowledge will go far when using Workbox.

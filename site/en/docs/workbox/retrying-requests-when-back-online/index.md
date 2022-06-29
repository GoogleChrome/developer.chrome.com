---
layout: "layouts/doc-post.njk"
title: Retrying requests when back online
date: 2021-12-07
description: >
  Sometimes users go offline. Learn how to adapt, and help them resume requests when they eventually go back online.
---

When you make requests of a web server, failure is a possibility. It could be because the user has lost connectivity, or the remote server is down.

While this documentation has focused mostly on handling `GET` requests in a service worker, other methods such as `POST`, `PUT`, or `DELETE` may come into play. These methods are often used to communicate with backend APIs to provide data for a web app. When these requests fail in the absence of a service worker, they must be retried manually by the user when back online&mdash;and that's not something users may always remember to do.

If this describes your application&mdash;and if a service worker is in the mix&mdash;you'd ideally want to retry sending failed requests when the user is back online. The [BackgroundSync API](https://wicg.github.io/BackgroundSync/spec/) offers a solution to this problem. When a service worker detects a failed network request, it can register to receive a [`sync` event](https://developer.mozilla.org/docs/Web/API/SyncEvent) when the browser detects that connectivity has returned. The `sync` event can be delivered even if the user has navigated away from the page that registered it, making it more effective than other methods of retrying failed requests.

Workbox abstracts this API with the [`workbox-background-sync` module](/docs/workbox/modules/workbox-background-sync/), which makes the BackgroundSync API easier to use with other Workbox modules. It also implements a fallback strategy for browsers that don't support BackgroundSync yet.

## Basic usage

The `BackgroundSyncPlugin` is exported from the `workbox-background-sync` module, and can be used to queue up failed requests and retry them when future `sync` events fire:

```js
import {BackgroundSyncPlugin} from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  /\/api\/.*\/*.json/,
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  // An optional third parameter specifies the request method
  'POST'
);
```

Here, `BackgroundSyncPlugin` is applied to a route matching POST requests to an API route that retrieves JSON data. If the user is offline, `BackgroundSyncPlugin` will retry the request when the user is back online, but only for up to a day.

[comment]: <> (TODO: update the using-plugins link when that doc is migrated)
{% Aside 'warning' %}
Because `BackgroundSyncPlugin` hooks into the [`FetchDidFail` plugin's callback](/docs/workbox/using-plugins/), failed requests must be the result of a network failure. Requests that result in a [400](https://developer.mozilla.org/docs/Web/HTTP/Status#client_error_responses) or [500-level error status](https://developer.mozilla.org/docs/Web/HTTP/Status#server_error_responses) will not be retried. To retry requests resulting in these types of failures, try [adding a `FetchDidSucceed` plugin to your strategy](https://github.com/GoogleChrome/workbox/issues/2599#issuecomment-900304969).
{% endAside %}

## Advanced usage

`workbox-background-sync` also provides a `Queue` class, which you can instantiate and add failed requests to. As is also the case with `BackgroundSyncPlugin`, the failed requests are stored in [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) and tried when the browser thinks connectivity is restored.

### Creating a queue

To create a queue, instantiate a `Queue` object with a string representing the queue name:

```js
import {Queue} from 'workbox-background-sync';

const queue = new Queue('myQueueName');
```

The queue name is used as part of the tag name that's created by the [`register()`](https://wicg.github.io/BackgroundSync/spec/#dom-syncmanager-register) method provided by the global [`SyncManager`](/docs/workbox/modules/workbox-background-sync/#:~:text=by%20the%20global-,SyncManager,-.%20It%27s%20also%20used). It's also the name used for the [Object Store](https://developer.mozilla.org/docs/Web/API/IDBObjectStore) provided by the IndexedDB database.

{% Aside %}
While it's not crucial to know these details, it's handy to know that they're the reason the queue name must be unique to your origin.
{% endAside %}

### Adding requests to the queue
After creating the the `Queue` instance, you can add failed requests to it using its `pushRequest()` method:

```js
import {Queue} from 'workbox-background-sync';

const queue = new Queue('myQueueName');

self.addEventListener('fetch', (event) => {
  // Add in your own criteria here to return early if this
  // isn't a request that should use background sync.
  if (event.request.method !== 'POST') {
    return;
  }

  const bgSyncLogic = async () => {
    try {
      const response = await fetch(event.request.clone());
      return response;
    } catch (error) {
      await queue.pushRequest({request: event.request});
      return error;
    }
  };

  event.respondWith(bgSyncLogic());
});
```

Once added to the queue, the requests automatically retry when the service worker receives the `sync` event because the browser thinks the network is available again. Browsers that don't support the BackgroundSync API will retry the request every time the service worker starts up, which is a less effective way to retry a failed request, but a fallback of sorts.

### Testing `workbox-background-sync`

Testing Background Sync behavior can be tricky, but it can be done in Chrome DevTools. The current best approach goes something like this:

1. Load up a page that registers your service worker.
2. Turn off your computer's network connection or turn off your web server. **Don't use the offline toggle in Chrome DevTools!** The offline checkbox only affects requests from the page, but service worker requests will continue to go through.
3. Make network requests that should be queued with `workbox-background-sync`. You can check the requests that have been queued by looking in `Chrome DevTools > Application > IndexedDB > workbox-background-sync > requests`.
4. Now either restore network connectivity or turn your web server back on.
5. Force an early `sync` event by going to `Chrome DevTools > Application > Service Workers`. Enter the tag name of `workbox-background-sync:<your queue name>`, where `<your queue name>` is the name of the queue you set.
6. Click the "Sync" button.  
   {% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/F5vZHQZ4EX5hRQPnSJ7Q.png", alt="A screenshot of the background sync utility in the application panel of Chrome's DevTools. The sync event is specified for a queue of 'myQueueName' for the 'workbox-background-sync' module.", width="800", height="351" %}
7. You should now see previously failed network requests retried and go through. As a result, the IndexedDB store should be empty, since the requests have been successfully replayed.

## Conclusion

Using `workbox-background-sync` to retry failed network requests can be a great way to improve the user experience and reliability of your app, such as allowing users to resubmit failed API requests so that they don't lose the data wanted to send to your API. It can also be used to fill in gaps in your own data, such as analytics. In fact, the [`workbox-google-analytics` module](/docs/workbox/modules/workbox-google-analytics/) uses `workbox-background-sync` under the hood to retry failed requests to send data to Google Analytics.

Whatever your use case, `workbox-background-sync` simplifies this kind of task, improving your developer experience and giving you more opportunities to improve your web application's user experience and functionality.

---
layout: 'layouts/doc-post.njk'
title: The extension service worker lifecycle
subhead: 
description: Extension service workers respond to both standard service worker events and events in extension namespaces. They are presented together because often one type follows another during an extension's use.
date: 2023-05-01
---

Extension service workers respond to both the [standard service worker events](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope#events) and to events in extension namespaces. They are presented together because often one type follows another during an extension's use.

## Installation

Installation occurs when the user installs or updates a service worker from the Chrome Web Store or when they [load or update an unpacked extension](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) using the `chrome://extensions` page. Three events occur in the order below. 

### ServiceWorkerRegistration.install

The first event fired during installation is  a web service worker's [install](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/install_event) event.

### chrome.runtime.onInstalled

Next is the extension's [`onInstalled`](/docs/extensions/reference/runtime/#event-onInstalled) event, which is fired when the extension (not the service worker) is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. Use this
event to set a state or for one-time initialization, such as a [context menu](/docs/extensions/reference/contextMenus/).

```js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});
```
### ServiceWorkerRegistration.active

Finally, the  service worker's [activate](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/activate_event) event is fired. Note that unlike web service workers, this event is fired immediately after installation of an extension because there is nothing comparable to a page reload in an extension.

## Extension startup {: #startup }

When a user or incognito profile starts, the [`chrome.runtime.onStartup`](/docs/extensions/reference/runtime/#event-onStartup) event fires but no service worker events are invoked.

## Idle and shutdown {: #idle-shutdown }

Extension service workers are dormant unless an event fires. If the service worker has a handler for the fired event, it wakes up, executes it, then goes back to being idle. If the service worker is idle for at least 30 seconds it shuts down. You should design your service worker to be resilient against unexpected termination, since not all activity keeps the service worker alive. For example, this can interrupt a service worker [`fetch()`](https://developer.mozilla.org/docs/Web/API/fetch) call if the response takes more than 30 seconds to arrive.

Any new events and calls to extension APIs reset the idle timer the moment they're fired. For example, when a service worker receives a [`chrome.bookmarks.onCreated`](/docs/extensions/reference/bookmarks/#event-onCreated) event, the 30 second timeout is reset. The same is true when calling an extension API such as [`chrome.storage.local.get()`](/docs/extensions/reference/storage/#property-local) which also resets the 30 second timeout. As with web service workers, extension service workers have no shutdown or deactivation events.

Before Chrome 110, only running event handlers caused the idle time to reset. Any events that were queued, but for which a handler had not been called would not cause a reset. Also, extension service workers had a maximum lifetime of five minutes before Chrome shut them down. These behaviors caused service workers to shut down at unexpected times.

Though Chrome 110 changed this you should not keep your service worker alive indefinitely, though you can. (We don't consider this a good programming practice.) You should test your extensions to ensure that they're not doing this unintentionally.

Though it's difficult to catch in a code review, we suggest you guard against it as best you can.

For all of these reasons, you need to guard against unexpected termination of the service worker.

### Persist data rather than using global variables {: #persist-data }

Any global variables you set will be lost if the service worker shuts down. Instead of using global variables, save values to storage. Your options are listed below. Note that the Web Storage API is not available for extension service workers.

[chrome.storage API](/docs/extensions/reference/storage/)
: An extension API that offers multiple types of storage; local, session, managed (domain), and sync. This API stores JSON objects identified and retrieved with developer-defined keys. This type of storage will not be removed when a user clears the web cache.

[IndexedDB API](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
: A low-level API for client-side storage of structured data, including files and blobs. This API provides primitives for creating transactional data storage and retrieval. Although this API is often too complicated for simple use cases, a number of [third-party](https://developer.mozilla.org/docs/Web/API/IndexedDB_API#see_also) storage solutions are built on top of it.

[CacheStorage API](https://developer.mozilla.org/docs/Web/API/CacheStorage)
: A persistent storage mechanism for Request and Response object pairs. This API was designed specifically for web service workers and is used to retrieve data from an endpoint. There are a variety of ways to use this API depending on whether and how critical it is that users see up-to-date data. For more information, see [The Offline Cookbook](​​https://web.dev/offline-cookbook). Unless you're specifically proxying network requests via the fetch handler, you should use `chrome.storage`.

## Be careful with timeouts {: #timeouts }

If an operation takes more than 30 seconds to complete, the service worker can shut down. An example is the `fetch()` call described above. The fetch fails if the service worker shuts down before the [`response`](https://developer.mozilla.org/docs/Web/API/Response) is received.

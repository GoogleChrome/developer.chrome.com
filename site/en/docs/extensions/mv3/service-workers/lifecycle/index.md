---
layout: 'layouts/doc-post.njk'
title: The service worker lifecycle
subhead: TBD
description: Extension service workers don't require a reload to be active. 
date: 2023-03-29
---

Extension service workers respond to both the [standard service worker events](/docs/Web/API/ServiceWorkerGlobalScope#events) and to events in the [`chrome.runtime`](/docs/extensions/reference/runtime/) namespace. They are presented together because one type follows another during an extension's use.

{% Aside %}
If you're already familiar with service workers, please read [Extension service worker basics](/docs/extensions/service-workers/basics) before reading further. 
{% endAside %}

## Installation

Installation occurs when the user installs or updates a service worker from the Chrome Web Store or when they load or update an unpacked extension using the `chrome://extensions` page. Three events occur in the order below. 

### ServiceWorkerRegistration.install

The first event fired during installation is  a web service worker's [install](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/install_event) event.

### chrome.runtime.onInstalled

Next is the extension's `oninstalled` event, which is fired when the extension (not the service worker) is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. Use this
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

Finally, the  service worker's [activate](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/activate_event) event is fired. Note that unlike web service workers, this event is fired on the first load of an extension because there is nothing comparable to a page reload in an extension.

## Startup

When a user or incognito profile starts, the [`chrome.runtime.onStartup`](/docs/extensions/reference/runtime/#event-onStartup) event fires but no service worker events are invoked.

## Idle and shutdown

Extension service workers are dormant unless an event fires. If the service worker has a handler for the fired event, it wakes up, executes it, then goes back to being idle. If the service worker is idle for at least 30 seconds it shuts down. Note that this can interrupt a service worker `fetch()` call if the response takes more than 30 seconds to arrive. Any new events reset the idle timer the moment they're fired. As with web service workers, extension service workers have no shutdown or deactivation events.

Before Chrome 110, only running event handlers caused the idle time to reset. Any events that were queued, but for which a handler had not been called would not cause a reset. Extension service workers had a maximum lifetime of five minutes before Chrome shut them down. These behaviors cause service workers to shut down at unexpected times.

Though Chrome 110 changed this you should not keep your service worker alive indefinitely, though you can. (We don't consider this a good programming practice.) You should test your extensions to ensure that they're not doing this unintentionally.

Though it's difficult to catch in a code review, we suggest you guard against it as best you can.

For all of these reasons, you need to guard against unexpected termination of the service worker.
Persist data rather than using global variables
Any global variables you set will be lost if the service worker shuts down. Instead of using global variables, save values to storage. Your options are listed below. Note that the Web Storage API is not available for extension service workers.

[`chrome.storage` API](/docs/extensions/reference/storage/)
: An extension API that offers multiple types of storage; local, session, managed (domain), and sync. This API stores JSON objects identified and retrieved with developer-defined keys. This type of storage will not be removed when a user clears the web cache.

[IndexedDB API](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
: A low-level API for client-side storage of structured data, including files and blobs. This API provides primitives for creating transactional data storage and retrieval. Although this API is often too complicated for simple use cases, a number of [third-party](https://developer.mozilla.org/docs/Web/API/IndexedDB_API#see_also) storage solutions are built on top of it.

[CacheStorage API](https://developer.mozilla.org/docs/Web/API/CacheStorage)
: A persistent storage mechanism for Request and Response object pairs. This API was designed specifically for web service workers and is used to retrieve data from an endpoint. There are a variety of ways to use this API depending on whether and how critical it is that users see up-to-date data. For more information, see [The Offline Cookbook](​​https://web.dev/offline-cookbook). We recommend using chrome.storage over the cache API for extensions.
Be careful with timeouts
If an operation takes more than 30 seconds to complete, the service worker can shut down. An example is the `fetch()` call described above. The fetch fails if the service worker shuts down befor the [`response`](https://developer.mozilla.org/docs/Web/API/Response) is received. 

Guard against long-running operations failing by implementing a timeout mechanism. You can use either [`setTimeout()`](https://developer.mozilla.org/docs/Web/API/setTimeout) or the [`setInterval()`](https://developer.mozilla.org/docs/Web/API/setInterval) methods for this. Be aware that these methods also have a 30 second time limit. Usually the intent is not to keep something alive indefinitely, but to inform the user that something has gone wrong. Using these methods with an interval less than 30 seconds will allow you to do that. In cases where you need more than thirty seconds, use the [Alarms](/docs/extensions/reference/alarms/) API.

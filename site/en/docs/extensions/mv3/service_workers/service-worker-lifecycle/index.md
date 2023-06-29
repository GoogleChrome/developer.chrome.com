---
layout: 'layouts/doc-post.njk'
title: The extension service worker lifecycle
subhead: 
description: Extension service workers respond to both standard service worker events and events in extension namespaces. They are presented together because often one type follows another during an extension's use.
date: 2023-05-02
updated: 2023-06-27
---

Extension service workers respond to both the [standard service worker events](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope#events) and to events in extension namespaces. They are presented together because often one type follows another during an extension's use.

## Installation

Installation occurs when the user installs or updates a service worker from the Chrome Web Store or when they [load or update an unpacked extension](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) using the `chrome://extensions` page. Three events occur in the order below. 

### ServiceWorkerRegistration.install {: #install }

The first event fired during installation is a web service worker's [install](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/install_event) event.

### chrome.runtime.onInstalled {: #oninstalled }

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
### ServiceWorkerRegistration.active {: #active }

Finally, the  service worker's [activate](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/activate_event) event is fired. Note that unlike web service workers, this event is fired immediately after installation of an extension because there is nothing comparable to a page reload in an extension.

## Extension startup {: #startup }

When a user profile starts, the [`chrome.runtime.onStartup`](/docs/extensions/reference/runtime/#event-onStartup) event fires but no service worker events are invoked.

## Idle and shutdown {: #idle-shutdown }

Normally, Chrome terminates a service worker when one of the following conditions is met:

-   After 30 seconds of inactivity. Receiving an event or calling an extension API resets this timer.
-   When a single request, such as an event or API call, takes longer than 5 minutes to process.
-   When a [fetch()](https://developer.mozilla.org/docs/Web/API/fetch) response takes more than 30 seconds to arrive.

Events and calls to extension APIs reset these timers, and if the service worker has gone dormant, an incoming event will revive them. Nevertheless, you should design your service worker to be resilient against unexpected termination.

To optimize the resource consumption of your extension, avoid keeping your service worker alive indefinitely if possible. Test your extensions to ensure that you're not doing this unintentionally.

### Persist data rather than using global variables {: #persist-data }

Any global variables you set will be lost if the service worker shuts down. Instead of using global variables, save values to storage. Your options are listed below. Note that the Web Storage API is not available for extension service workers.

[chrome.storage API](/docs/extensions/reference/storage/)
: An extension API that offers multiple types of storage; local, session, managed (domain), and sync. This API stores JSON objects identified and retrieved with developer-defined keys. This type of storage will not be removed when a user clears the web cache.

[IndexedDB API](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
: A low-level API for client-side storage of structured data, including files and blobs. This API provides primitives for creating transactional data storage and retrieval. Although this API is often too complicated for simple use cases, a number of [third-party](https://developer.mozilla.org/docs/Web/API/IndexedDB_API#see_also) storage solutions are built on top of it.

[CacheStorage API](https://developer.mozilla.org/docs/Web/API/CacheStorage)
: A persistent storage mechanism for Request and Response object pairs. This API was designed specifically for web service workers and is used to retrieve data from an endpoint. There are a variety of ways to use this API depending on whether and how critical it is that users see up-to-date data. For more information, see [The Offline Cookbook](​​https://web.dev/offline-cookbook). Unless you're specifically proxying network requests via the fetch handler, you should use `chrome.storage`.

### Choose a minimum Chrome version {: #timeouts }

Since the release of Manifest V3, we've made several improvements to service worker lifetimes. This means that if your Manifest V3 extension supports earlier versions of Chrome, there are conditions you will need to be aware of. If these conditions do not affect your extension, you can move on from this section. If they do, consider specifying a [minimum Chrome version](/docs/extensions/mv3/manifest/minimum_chrome_version/) in your manifest.

#### Chrome 116

Chrome 116 introduced the following service worker lifetime improvements:

* Active [`WebSocket`](https://developer.mozilla.org/docs/Web/API/WebSockets_API) connections now extend extension service worker lifetimes. Sending or receiving messages across a `WebSocket` in an extension service worker resets the service worker's idle timer.

* Additional extension APIs are allowed to go past the five-minute timeout period for extension service workers. These APIs display a user prompt and thus may reasonably take longer than five minutes to resolve. These include [`desktopCapture.chooseDesktopMedia()`](/docs/extensions/reference/desktopCapture/#method-chooseDesktopMedia), [`identity.launchWebAuthFlow()`](/docs/extensions/reference/identity/#method-launchWebAuthFlow), [`management.uninstall()`](/docs/extensions/reference/management/#method-uninstall), and [`permissions.request()`](/docs/extensions/reference/permissions/#method-request).


#### Chrome 114

Sending a message using [long-lived messaging](/docs/extensions/mv3/messaging/#connect) keeps the service worker alive. Previously, opening a port reset the timers, but sending a message would not. Opening a port no longer resets the timers.

#### Chrome 110

Extension API calls reset the timers. Before this, only running event handlers would keep a service worker alive. Any events that were queued, but for which a handler had not been called would not cause a reset.

#### Chrome 109

Messages sent from an offscreen document reset the timers.

#### Chrome 105

Connecting to a native messaging host using [`chrome.runtime.connectNative()`](/docs/extensions/reference/runtime/#method-connectNative) will keep a service worker alive. If the host process crashes or is shut down, the port is closed and the service worker will terminate after timers complete. Guard against this by calling `chrome.runtime.connectNative()` in the port's onDisconnect event handler.

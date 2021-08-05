---
layout: "layouts/doc-post.njk"
title: "Manage events with service workers"
date: 2012-09-17
updated: 2018-05-01
description: How to respond to browser triggers (events) from a Chrome Extension background script.
---

Extensions are event-based programs used to modify or enhance the Chrome browsing experience. Events
are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab.
Extensions monitor these events using scripts in their background
[service worker](/docs/extensions/mv3/migrating_to_service_workers), which then react
with specified instructions.

A background service worker is loaded when it is needed, and unloaded when it goes idle. Some examples of
events include:

- The extension is first installed or updated to a new version.
- The background page was listening for an event, and the event is dispatched.
- A content script or other extension [sends a message.][1]
- Another view in the extension, such as a popup, calls [`runtime.getBackgroundPage`][2].

Once it has been loaded, a service worker keeps running as long as it is performing an action,
such as calling a Chrome API or issuing a network request. Additionally, the service worker won't
unload until all visible views and all message ports are closed.

{% Aside %}
Opening a view doesn't cause the service worker to load, but only prevents it from closing once loaded.
{% endAside %}

Effective background scripts stay dormant until an event they are listening for fires, react with
specified instructions, then unload.

## Register background scripts {: #manifest }

Extensions register their background service workers in the [manifest][3] under the `"background"` field. This field
uses the `"service_worker"` key, which specifies a single JavaScript file.

```json/3-6
{
  "name": "Awesome Test Extension",
  ...
  "background": {
    "service_worker": "background.js"
  },
  ...
}
```

## Initialize the extension {: #initialization }

Listen to the [`runtime.onInstalled`][6] event to initialize an extension on installation. Use this
event to set a state or for one-time initialization, such as a [context menu][7].

```js
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});
```

## Set up listeners {: #listeners }

Structure background scripts around events the extension depends on. Defining functionally relevant
events allows background scripts to lie dormant until those events are fired and prevents the
extension from missing important triggers.

Listeners must be registered synchronously from the start of the page.

```js
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function() {
  // do something
});
```

Do not register listeners asynchronously, as they will not be properly triggered.

```js
chrome.runtime.onInstalled.addListener(function() {
  // ERROR! Events must be registered synchronously from the start of
  // the page.
  chrome.bookmarks.onCreated.addListener(function() {
    // do something
  });
});
```

Extensions can remove listeners from their background scripts by calling `removeListener`. If all
listeners for an event are removed, Chrome will no longer load the extension's background script for
that event.

```js
chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    chrome.runtime.onMessage.removeListener(event);
});
```

## Filter events {: #filters }

Use APIs that support [event filters][8] to restrict listeners to the cases the extension cares
about. If an extension is listening for the [`tabs.onUpdated`][9] event, try using the
[`webNavigation.onCompleted`][10] event with filters instead, as the tabs API does not support
filters.

```js
chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://www.google.com/'}]});
```

## React to listeners {: #react }

Listeners exist to trigger functionality once an event has fired. To react to an event, structure
the desired reaction inside of the listener event.

```js
chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message.data == "setAlarm") {
    chrome.alarms.create({delayInMinutes: 5})
  } else if (message.data == "runLogic") {
    chrome.scripting.executeScript({file: 'logic.js'});
  } else if (message.data == "changeColor") {
    chrome.scripting.executeScript(
        {code: 'document.body.style.backgroundColor="orange"'});
  };
});
```

## Unload background scripts {: #unloading }

Data should be persisted periodically so that important information is not lost if an extension
crashes without receiving `onSuspend`. Use the [storage][11] API to assist with this.

```js
chrome.storage.local.set({variable: variableInformation});
```

If an extension uses [message passing][12], ensure all ports are closed. The background script will
not unload until all message ports have shut. Listening to the [runtime.Port.onDisconnect][13] event
will give insight to when open ports are closing. Manually close them with
[runtime.Port.disconnect][14].

```js
chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == 'hello') {
    sendResponse({greeting: 'welcome!'})
  } else if (message == 'goodbye') {
    chrome.runtime.Port.disconnect();
  }
});
```

The lifetime of a background service worker is observable by monitoring when an entry for the extension
appears and disappears from Chrome's task manager.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/occ8HD81vNq2zboXIbiu.png",
       alt="Chrome with an extension's popup open.", height="623", width="730" %}

Open the task manager by clicking the Chrome Menu, hovering over more tools and selecting "Task
Manager".

Service workers unload on their own after a few seconds of inactivity. If any last minute cleanup
is required, listen to the [`runtime.onSuspend`][15] event.

```js
chrome.runtime.onSuspend.addListener(function() {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({text: ""});
});
```

However, persisting data should be prefered over relying on [`runtime.onSuspend`][16]. It doesn't
allow for as much cleanup as may be needed and will not help in case of a crash.

[1]: /docs/extensions/mv3/messaging
[2]: /docs/extensions/runtime#method-getBackgroundPage
[3]: /docs/extensions/mv3/manifest/
[4]: /docs/extensions/webRequest
[5]: /docs/extensions/mv3/background_migration
[6]: /docs/extensions/reference/runtime#event-onInstalled
[7]: /docs/extensions/reference/contextMenus
[8]: /docs/extensions/reference/events#filtered
[9]: /docs/extensions/reference/extensions/tabs#event-onUpdated
[10]: /docs/extensions/reference/webNavigation#event-onCompleted
[11]: /docs/extensions/reference/storage
[12]: /docs/extensions/mv3/messaging
[13]: /docs/extensions/reference/runtime#property-Port-onDisconnect
[14]: /docs/extensions/reference/runtime#property-Port-disconnect
[15]: /docs/extensions/reference/runtime#event-onSuspend
[16]: /docs/extensions/reference/runtime#event-onSuspend

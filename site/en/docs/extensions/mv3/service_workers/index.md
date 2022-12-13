---
layout: "layouts/doc-post.njk"
title: "Manage events with service workers"
seoTitle: "Chrome Extensions: Manage events with service workers"
date: 2012-09-17
updated: 2018-05-01
description: How to respond to browser triggers (events) from a Chrome Extension service worker.
---

Extensions are event-based programs used to modify or enhance the Chrome browsing experience. Events
are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab.
Extensions monitor these events using scripts in their background [service
worker][doc-sw-migration], which then react with specified instructions.

A background service worker is loaded when it is needed, and unloaded when it goes idle. Some
examples include:

- The extension is first installed or updated to a new version.
- The background page was listening for an event, and the event is dispatched.
- A content script or other extension [sends a message.][1]
- Another view in the extension, such as a popup, calls [`runtime.getBackgroundPage`][2].

Once it has been loaded, an extension's service worker generally keeps running as long as it is
performing an action, such as calling a Chrome API or issuing a network request.

{% Aside %}

Opening a view doesn't cause the service worker to load, but only prevents it from closing once
loaded.

{% endAside %}

Effective background scripts stay dormant until an event they are listening for fires, react with
specified instructions, then unload.

## Register the service worker {: #manifest }

Extensions register their service worker in the [manifest][3] under the `"background"`
field. This field uses the `"service_worker"` key, which specifies a single JavaScript file.

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

You can optionally specify an extra field of `"type": "module"` to include the service worker as an
ES Module, which allows you to `import` further code. See [ES modules in service workers][sw-module]
for more information. For example:

```json/2-2
  "background": {
    "service_worker": "background.js",
    "type": "module"
  }
```

## Initialize the extension {: #initialization }

Listen to the [`runtime.onInstalled`][6] event to initialize an extension on installation. Use this
event to set a state or for one-time initialization, such as a [context menu][7].

```js
chrome.runtime.onInstalled.addListener(() => {
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
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"],
  });
});

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(() => {
  // do something
});
```

Do not register listeners asynchronously, as they will not be properly triggered.

```js
chrome.runtime.onInstalled.addListener(() => {
  // ERROR! Events must be registered synchronously from the start of
  // the page.
  chrome.bookmarks.onCreated.addListener(() => {
    // do something
  });
});
```

Extensions can remove listeners from their background scripts by calling `removeListener`. If all
listeners for an event are removed, Chrome will no longer load the extension's background script for
that event.

```js
chrome.runtime.onMessage.addListener((message, sender, reply) => {
  chrome.runtime.onMessage.removeListener(event);
});
```

## Filter events {: #filters }

Use APIs that support [event filters][8] to restrict listeners to the cases the extension cares
about. If an extension is listening for the [`tabs.onUpdated`][9] event, try using the
[`webNavigation.onCompleted`][10] event with filters instead, as the tabs API does not support
filters.

```js
const filter = {
  url: [
    {
      urlMatches: 'https://www.google.com/',
    },
  ],
};

chrome.webNavigation.onCompleted.addListener(() => {
  console.info("The user has loaded my favorite website!");
}, filter);
```

## React to listeners {: #react }

Listeners exist to trigger functionality once an event has fired. To react to an event, structure
the desired reaction inside of the listener event.

```js
chrome.runtime.onMessage.addListener((message, callback) => {
  const tabId = getForegroundTabId();
  if (message.data === "setAlarm") {
    chrome.alarms.create({delayInMinutes: 5})
  } else if (message.data === "runLogic") {
    chrome.scripting.executeScript({file: 'logic.js', tabId});
  } else if (message.data === "changeColor") {
    chrome.scripting.executeScript(
        {func: () => document.body.style.backgroundColor="orange", tabId});
  };
});
```

## Unload background scripts {: #unloading }

Unlike [event pages in Manifest V2][event-page-unload], extension service workers do not receive a `runtime.onSuspend` event before they are stopped. This is because documents have [`unload`][mdn-unload] and [`beforeUnload`][mdn-beforeunload] events, but web workers (and by extension service workers) do not have an equivalent event.

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

[doc-sw-migration]: /docs/extensions/mv3/migrating_to_service_workers
[event-page-unload]: https://developer.chrome.com/docs/extensions/mv2/background_pages/
[mdn-beforeunload]: https://developer.mozilla.org/docs/Web/API/Window/beforeunload_event
[mdn-unload]: https://developer.mozilla.org/docs/Web/API/Window/unload_event
[sw-module]: https://web.dev/es-modules-in-sw/

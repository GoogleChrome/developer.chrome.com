---
layout: 'layouts/doc-post.njk'
title: "Migrating from background pages to service workers"
date: 2020-07-29
updated: 2020-10-06
description: >
  How to migrate your Chrome Extension from background pages to service workers,
  which is a prerequisite for using Manifest V3.
---

*Background pages* have been a fundamental component of the Chrome Extension platform since its
introduction. To put it simply, background pages provide extension authors with an environment that
lives independent of any other window or tab. This allows extensions to observe and take action in
response to events.

In Manifest V3, the Chrome extension platform moves from background pages to *service workers*. As
stated in [Service Workers: an Introduction][2], a "service worker is a script that your browser
runs in the background, separate from a web page, opening the door to features that don't need a web
page or user interaction." This is the technology that enables native-like experiences such as push
notifications, rich offline support, background sync, and "Add to Home Screen" on the open web.
Service workers were inspired in part by background pages in Chrome Extensions, but they iterate and
improve on this model by tuning it for web-scale.

When migrating to this new background context, you'll need to keep two main things in mind. First,
service workers are terminated when not in use and restarted when needed (similar to event pages).
Second, service workers don't have access to DOM. We'll explore how to adapt to these challenges in
the [Thinking with Events][3] and [Working with Workers][4] sections below, respectively. If you
already use an event page, skip straight to the second section.

## Thinking with events {: #events }

Like event pages, service workers are a special execution environment that are started to handle
events they're interested in and are terminated when they're no longer needed. The following
sections provide recommendations for writing code in an ephemeral, evented execution context.

{% Aside %}

Several of these concepts are covered in [Migrate to Event Driven Background Scripts][eventbgscripts].

{% endAside %}

## Top-level event listeners {: #event_listeners }

In order for Chrome to successfully dispatch events to the appropriate listeners, extensions must
register listeners in the first turn of the event loop. The most straightforward way to achieve this
is to move event registration to the top-level of your service worker script.

The below snippet shows how an existing extension initializes its browser action listener in a
persistent background page.

```js
//// background.js
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });

  // Listener is registered asynchronously
  chrome.action.onClicked.addListener(handleActionClick);
});
```

While this approach works in a persistent background page, it is not guaranteed to work in a service
worker due to the asynchronous nature of the [Storage APIs][storage]. When a service worker is
terminated, so are the event listeners associated with it. And since events are dispatched when a
service worker starts, asynchronously registering events results in them being dropped because
there's no listener registered when it is first spun up.

To address this, move the event listener registration to the top level of your script. This ensures
that Chrome will be able to immediately find and invoke your action's click handler, even if your
extension hasn't finished executing its async startup logic.

```js
//// background.js
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });
});

// Listener is registered on startup
chrome.action.onClicked.addListener(handleActionClick);
```

{% Aside %}
In Manifest V3 the `chrome.browserAction` and `chrome.pageAction` APIs are consolidated
into a single chrome.action API.
{% endAside %}

### Persisting state with storage APIs {: #state }

One of the main things to get used to when adopting service workers is that they are short-lived
execution environments. In more practical terms, an extension's service worker will start up, do
some work, and get terminated repeatedly throughout a user's browser session. This poses a challenge
to extension developers accustomed to long-lived background pages as application data is not
immediately available in global variables.

This example is taken from a simple manifest version 2 extension that receives a name value from a
content script and persists it in a global variable for later use.

```js
//// background.js
let name = undefined;

chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (msg.type === "set-name") {
    name = msg.name;
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { name });
});
```

If we port this code directly to a service worker, it's possible that the service worker will be
terminated between when the name is set and the user clicks the browser action. If this happens, the
set name will have been lost and name variable will again be undefined.

We can fix this bug by treating the [Storage APIs][storage] as our source of truth.

```js
//// background.js
chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    chrome.storage.local.set({ name });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(["name"], ({ name }) => {
    chrome.tabs.sendMessage(tab.id, { name });
  });
});
```

{% Aside %}
In Manifest V3 the chrome.browserAction and chrome.pageAction APIs are consolidated
into a single chrome.action API.
{% endAside %}

### Moving from timers to alarms {: #alarms }

It's common for web developers to perform delayed or periodic operations using the `setTimeout` or
`setInterval` methods. These APIs can fail in service workers, though, because the scheduler will
cancel the timers when the service worker is terminated.

```js
//// background.js
const TIMEOUT = 3 * 60 * 1000; // 3 minutes in milliseconds
window.setTimeout(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
}, TIMEOUT);
```

Instead, we can use the [Alarms API][alarms]. Like other listeners, alarm listeners should be
registered in the top level of your script.

```js
//// background.js
chrome.alarms.create({ delayInMinutes: 3 });

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
});
```

## Working with workers {: #workers }

[Service workers][5] are a specialized kind of [web worker][6], which are quite different from the
web pages most web developers are used to working with. On a typical web page (or extension
background page), the global execution context for JavaScript is a [Window][7]. This object exposes
the capabilities that web developers are used to working with: window, element, IndexedDB, cookie,
localStorage, fetch, etc. The [global scope for service worker][8] is significantly more limited and
doesn't have many of these features. Most notably, service workers don't have access to the DOM.

The following sections cover some of the major use cases impacted by the move to service workers and
recommendations on how to adapt.

### Parsing and traversing with XML/HTML {: #documents }

Since service workers don't have access to DOM, it's not possible for an extension's service worker
to access the [DOMParser][9] API or create iframes to parse and traverse documents. Extension
developers have two ways to work around this limitation: create a new tab or use a library. Which
you choose will depend on your use case.

Libraries such as [jsdom][10] can be used to emulate a typical browser window environment, complete
with DOMParser, event propagation, and other capabilities like requestAnimationFrame. Lighter weight
alternatives like [undom][11] provide just enough DOM to power many frontend frameworks and
libraries.

Extensions that need a full native browser environment can use the [chrome.windows.create()][12] and
[chrome.tabs.create()][13] APIs from inside a service worker. Additionally, an extension's popup
still provides a full (temporary) window environment.

### Audio/video playback and capture {: #audio_vidio }

It's not currently possible to play or capture media directly in a service worker. In order for a
Manifest V3 extension to leverage the web's media playback and capture capabilities, the extension
will need to create a window environment using either [chrome.windows.create()][12] or
[chrome.tabs.create()][13]. Once created, the extension can use [message passing][16] to coordinate
between the playback document and service worker.

### Rendering to a canvas {: #canvas }

In some cases developers use background pages to render content for display in other contexts or to
create and cache assets. While service workers don't have access to DOM and therefore cannot use
`<canvas>` elements, service workers do have access to the [OffscreenCanvas API][17].

```js
//// background.js
function buildCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
```

In the above block we're constructing a canvas element and painting the entire canvas turquoise. To
migrate to offscreen canvas, replace `document.createElement('canvas')` with `new
OffscreenCanvas(width, height)`.

```js
//// background.js
function buildCanvas(width, height) {
  const canvas = new OffscreenCanvas(width, height);
  return canvas;
}
```

For additional guidance on working with OffscreenCanvas, see [OffscreenCanvas—Speed up Your Canvas
Operations with a Web Worker][18].

[2]: https://developers.google.com/web/fundamentals/primers/service-workers/
[3]: #events
[4]: #workers
[5]: https://developers.google.com/web/ilt/pwa/introduction-to-service-worker
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Worker
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[8]: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope
[9]: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
[10]: https://github.com/jsdom/jsdom
[11]: https://github.com/developit/undom
[12]: /docs/extensions/reference/windows#method-create
[13]: /docs/extensions/reference/tabs#method-create
[16]: /docs/extensions/mv3/messaging
[17]: https://html.spec.whatwg.org/multipage/canvas.html#the-offscreencanvas-interface
[18]: https://developers.google.com/web/updates/2018/08/offscreen-canvas
[action]: /docs/extensions/reference/action/
[alarms]: /docs/extensions/reference/alarms/
[eventbgscripts]: /docs/extensions/mv3/background_migration/
[storage]: /docs/extensions/reference/storage/

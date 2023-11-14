---
layout: 'layouts/doc-post.njk'
title: Migrate to a service worker
subhead: 'Replacing background or event pages with a service worker'
description: 'A service worker enables extensions to run only when needed, saving resources.'
date: 2023-03-09
updated: 2023-08-28
---

{% Partial 'extensions/mv3-support.md' %}

A service worker replaces the extension's background or event page to ensure that background code stays off the main thread. This enables extensions to run only when needed, saving resources.

Background pages have been a fundamental component of extensions since their introduction. To put it simply, background pages provide an environment that lives independent of any other window or tab. This allows extensions to observe and act in response to events.

This page describes tasks for converting background pages to extension service workers. For more information on extension service workers generally, see the tutorial [Handle events with service workers](/docs/extensions/mv3/getstarted/tut-quick-reference/) and the section [About extension service workers](/docs/extensions/mv3/service_workers/).

## Differences between background scripts and extension service workers {: #differences-with-sws }

In some contexts you'll see extension service workers called 'background scripts'. Although extension service workers do run in the background, calling them background scripts is somewhat misleading by implying identical capabilities. The differences are described below.

### Changes from background pages {: #changes-over-bg }

Service workers has a number of differences with background pages.

- They function off the main thread, meaning they don't interfere with extension content.
- They have special capabilities such as intercepting fetch events on the extension's origin, such as those from a toolbar popup.
- They can communicate and interact with other contexts via the [Clients interface](https://developer.mozilla.org/docs/Web/API/Clients).

### Changes you'll need to make

You'll need to make a few code adjustments to account for differences between the way background scripts and service workers function. To start with, the way a service worker is specified in the manifest file is different from how background scripts are specified. Additionally:

- Because they can't access the DOM or the `window` interface, you'll need to move such calls to a different API or into an offscreen document.
- Event listeners should not be registered in response to returned promises or inside event callbacks.
- Since they're not backward compatible with `XMLHttpRequest()` you'll need to replace calls to this interface with calls to [`fetch()`](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch).
- Since they terminate when not in use, you'll need to persist application states rather than rely on global variables. Terminating service workers can also end timers before they have completed. You'll need to replace them with alarms.

This page describes these tasks in detail.

## Update the "background" field in the manifest {: #update-bg-field }

In Manifest V3, background pages are replaced by a *service worker*. The manifest changes are listed below.

- Replace `"background.scripts"` with `"background.service_worker"` in the `manifest.json`. Note that the `"service_worker"` field takes a string, not an array of strings.
- Remove `"background.persistent"` from the `manifest.json`.

Migrating to a service worker (in other words, replacing the `"background.page"`) will be dealt with in the [next section](/docs/extensions/migrating/to-service-workers/).

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
{
  ...
  "background": {
    "scripts": [
      "backgroundContextMenus.js",
      "backgroundOauth.js"
    ],
    "persistent": false
  },
  ...
}
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
{
  ...
  "background": {
    "service_worker": "service_worker.js",
    "type": "module"
  }
  ...
}
```

{% endCompare %}
</div>

The `"service_worker"` field takes a single string. You will only need the `"type"` field if you use [ES modules](https://web.dev/articles/es-modules-in-sw#static_imports_only) (using the [`import`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) keyword). Its value will always be `"module"`. For more information, see [Extension service worker basics](/docs/extensions/mv3/service_workers/basics/#import-scripts)

## Move DOM and window calls to an offscreen document {: #move-dom-and-window }

Some extensions need access to the DOM and window objects without visually opening a new window or tab. The [Offscreen API](/docs/extensions/reference/offscreen/) supports these use cases by opening and closing undisplayed documents packaged with extension, without disrupting the user experience. Except for message passing, offscreen documents do not share APIs with other extension contexts, but function as full web pages for extensions to interact with.

To use the Offscreen API, create an offscreen document from the service worker.

```js
chrome.offscreen.createDocument({
  url: chrome.runtime.getURL('offscreen.html'),
  reasons: ['CLIPBOARD'],
  justification: 'testing the offscreen API',
});
```

In the offscreen document perform any action you would previously have run in a background script. For example, you could copy text selected on the host page.

```js
let textEl = document.querySelector('#text');
textEl.value = data;
textEl.select();
document.execCommand('copy');
```

Communicate between offscreen documents and extension service workers using [message passing](/docs/extensions/mv3/messaging/).

## Convert localStorage to another type {: #convert-localstorage }

The web platform's [`Storage`](https://developer.mozilla.org/docs/Web/API/Storage) interface (accessible from `window.localStorage`) cannot be used in a service worker. To address this do one of two things. First, you can replace it with calls to another storage mechanism. The [`chrome.storage.local`](/docs/extensions/reference/storage/#property-local) namespace will serve most use cases, but [other options](/docs/extensions/mv3/service_workers/service-worker-lifecycle/#persist-data) are available.

You can also move its calls to an [offscreen document](/docs/extensions/reference/offscreen/). For example, to migrate data previously stored in `localStorage` to another mechanism:

1. Create an offscreen document with a conversion routine and a [`runtime.onMessage`](/docs/extensions/reference/runtime/#event-onMessage) handler.
1. Add a conversion routine to the offscreen document.
1. In the extension service worker check [`chrome.storage`](/docs/extensions/reference/storage/) for your data.
1. If your data isn't found, [create](/docs/extensions/reference/offscreen/#method-createDocument) an offscreen document and call [`runtime.sendMessage()`](/docs/extensions/reference/runtime/#method-sendMessage) to start the conversion routine.
1. In the `runtime.onMessage` handler that you added to the offscreen document, call the conversion routine.

There are also some nuances with how web storage APIs work in extensions. Learn more in [Storage and Cookies][storage-and-cookies].

## Register listeners synchronously {: #register-listeners }

Registering a listener asynchronously (for example inside a promise or callback) is not guaranteed to work in Manifest V3. Consider the following code.

```js/2
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.browserAction.setBadgeText({ text: badgeText });
  chrome.browserAction.onClicked.addListener(handleActionClick);
});
```

This works with a persistent background page because the page is constantly running and never reinitialized. In Manifest V3, the service worker will be reinitialized when the event is dispatched. This means that when the event fires, the listeners will not be registered (since they are added asynchronously), and the event will be missed.

Instead, move the event listener registration to the top level of your script. This ensures that Chrome will be able to immediately find and invoke your action's click handler, even if your extension hasn't finished executing its startup logic.

```js/0
chrome.action.onClicked.addListener(handleActionClick);

chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });
});
```

## Replace XMLHttpRequest() with global fetch() {: #replace-xmlhttprequest }

`XMLHttpRequest()` can't be called from a service worker, extension or otherwise. Replace calls from your background script to `XMLHttpRequest()` with calls to [global `fetch()`](https://developer.mozilla.org/docs/Web/API/fetch).

{% Compare 'worse', 'XMLHttpRequest()' %}
```javascript
const xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.readyState);

xhr.open('GET', '/api', true);
console.log('OPENED', xhr.readyState);

xhr.onload = () => {
    console.log('DONE', xhr.readyState);
};
xhr.send(null);
```
{% endCompare %}

{% Compare 'better', 'fetch()' %}
```js
const response = await fetch('https://www.example.com/greeting.json'')
console.log(response.statusText);
```
{% endCompare %}

{% Aside 'important' %}
If you previously used `XMLHttpRequest()` or `fetch()` to retrieve executable code, you can no longer do so. All executable code must be part of your extension package. For more information, see [Improve extension security](/docs/extensions/migrating/improve-security).
{% endAside %}

## Persist states {: #persist-states }

Service workers are ephemeral, which means they'll likely start, run, and terminate repeatedly during a user's browser session. It also means that data is not immediately available in global variables since the previous context was torn down. To get around this, use storage APIs as the source of truth. An example will show how to do this.

The following example uses a global variable to store a name. In a service worker, this variable could be reset multiple times over the course of a user's browser session.

{% Compare 'worse', 'Manifest V2 background script' %}
```js
let savedName = undefined;

chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    savedName = name;
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { name: savedName });
});
```
{% endCompare %}

For Manifest V3, replace the global variable with a call to [Storage API](/docs/extensions/reference/storage/).

{% Compare 'better', 'Manifest V3 service worker' %}
```js
chrome.runtime.onMessage.addListener(({ type, name }) => {
  if (type === "set-name") {
    chrome.storage.local.set({ name });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const { name } = await chrome.storage.local.get(["name"]);
  chrome.tabs.sendMessage(tab.id, { name });
});
```
{% endCompare %}

## Convert timers to alarms {: #convert-timers }

It's common to use delayed or periodic operations using the `setTimeout()` or `setInterval()` methods. These APIs can fail in service workers, though, because the timers are canceled whenever the service worker is terminated.

{% Compare 'worse', 'Manifest V2 background script' %}
```js
// 3 minutes in milliseconds
const TIMEOUT = 3 * 60 * 1000;
setTimeout(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
}, TIMEOUT);
```
{% endCompare %}

Instead, use the [Alarms API](/docs/extensions/reference/alarms/). As with other listeners, alarm listeners should be registered in the top level of your script.

{% Compare 'better', 'Manifest V3 service worker' %}
```js
async function startAlarm(name, duration) {
  await chrome.alarms.create(name, { delayInMinutes: 3 });
}

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setIcon({
    path: getRandomIconPath(),
  });
});
```
{% endCompare %}

## Keep the service worker alive {: #keep-sw-alive }

Service workers are by definition event-driven and will terminate on inactivity. This way Chrome can optimize performance and memory consumption of your extension. Learn more in our [service worker lifecycle documentation](/docs/extensions/mv3/service_workers/service-worker-lifecycle/#idle-shutdown). Exceptional cases might require additional measures to ensure that a service worker stays alive for a longer time.

### Keep a service worker alive until a long-running operation is finished

During long running service worker operations that don't call extension APIs, the service worker might shut down mid operation. Examples include:

* A [`fetch()` request](https://developer.mozilla.org/docs/Web/API/Fetch_API) potentially taking longer than longer than five minutes (e.g. a large download on a potentially poor connection). 
* A complex asynchronous calculation taking more than 30 seconds.

To extend the service worker lifetime in these cases, you can periodically call a trivial extension API to reset the timeout counter. 
Please note, that this is only reserved for exceptional cases and in most situations there is usually a better, platform idiomatic, way to achieve the same result.

The following example shows a `waitUntil()` helper function that keeps your service worker alive until a given promise resolves:

```js
async function waitUntil(promise) = {
  const keepAlive = setInterval(chrome.runtime.getPlatformInfo, 25 * 1000);
  try {
    await promise;
  } finally {
    clearInterval(keepAlive);
  }
}

waitUntil(someExpensiveCalculation());
```

{% Aside 'important' %}
An official API similar to `waitUntil()` is currently being discussed in the WECG. For more detail, see the [discussion on GitHub](https://github.com/w3c/webextensions/issues/416).
{% endAside %}

### Keep a service worker alive continuously

In rare cases, it is necessary to extend the lifetime indefinitely. We have identified enterprise and education as the biggest use cases, and we specifically allow this there, but we do not support this in general. In these exceptional circumstances, keeping a service worker alive can be achieved by periodically calling a trivial extension API. It is important to note that this recommendation only applies to extensions running on managed devices for enterprise or education use cases. It is not allowed in other cases and the Chrome extension team reserves the right to take action against those extensions in the future. 

Use the following code snippet to keep your service worker alive:

```js
/**
 * Tracks when a service worker was last alive and extends the service worker
 * lifetime by writing the current time to extension storage every 20 seconds.
 * You should still prepare for unexpected termination - for example, if the
 * extension process crashes or your extension is manually stopped at
 * chrome://serviceworker-internals. 
 */
let heartbeatInterval;

async function runHeartbeat() {
  await chrome.storage.local.set({ 'last-heartbeat': new Date().getTime() });
}

/**
 * Starts the heartbeat interval which keeps the service worker alive. Call
 * this sparingly when you are doing work which requires persistence, and call
 * stopHeartbeat once that work is complete.
 */
async function startHeartbeat() {
  // Run the heartbeat once at service worker startup.
  runHeartbeat().then(() => {
    // Then again every 20 seconds.
    heartbeatInterval = setInterval(runHeartbeat, 20 * 1000);
  });
}

async function stopHeartbeat() {
  clearInterval(heartbeatInterval);
}

/**
 * Returns the last heartbeat stored in extension storage, or undefined if
 * the heartbeat has never run before.
 */
async function getLastHeartbeat() {
  return (await chrome.storage.local.get('last-heartbeat'))['last-heartbeat'];
}
```

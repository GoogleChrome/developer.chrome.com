---
layout: 'layouts/doc-post.njk'
title: Upgrade to a service worker
subhead: 'Replacing background or event pages with a service worker'
description: 'A service worker replaces background or event pages to ensure that background code stays off the main thread. This enables extensions to run only when needed, saving resources.'
date: 2023-02-28
---

A service worker replaces the extension's background or event page to ensure that background code stays off the main thread. This enables extensions to run only when needed, saving resources. 

*Background pages* have been a fundamental component of extensions since their introduction. To put it simply, background pages provide an environment that lives independent of any other window or tab. This allows extensions to observe and act in response to events.

## Differences between background scripts and extension service workers {: #differences-with-sws }

In some contexts you'll see extension service workers called 'background scripts'. Although extension service workers do run in the background, calling them background scripts is somewhat misleading by implying identical capabilities. The differences are described below.

### Improvements over background pages {: #improvements-over-bg }

Service workers provide a number of improvements over background pages.

- They're lighter weight, making them more performant.
- They have special capabilities such as intercepting fetch events on the extension's origin, such as those from a toolbar popup.
- They can communicate and interact with other contexts via the [Clients interface](https://developer.mozilla.org/docs/Web/API/Clients)

### Adjustments

You'll need to make a few code adjustments to account for differences between the way background scripts and service workers function. To start with, the way a service worker is specified in the manifest file is different from how background scripts are specified. Additionally:

- Because they can't access the DOM or the `window` interface, you'll need to move such calls to a different API or into an offscreen document.
- Event listeners should not be registered in response to returned promises or inside event callbacks.
- Since they're not backward compatible with `XMLHttpRequest` you'll need to replace calls to this interface with calls to [`fetch()`][mdn-fetch].
- Since they terminate when not in use, you'll need to persist application states rather than rely on global variables. Terminating service workers can also end timers before they have completed. You'll need to replace them with alarms.

This page describes these tasks in detail.

## Update the "background" field in the manifest {: #update-bg-field }

In Manifest V3, background pages are replaced by a *service worker*. The manifest changes are listed below. 

- Replace `"background.scripts"` with `"background.service_worker"` in the `manifest.json`. Note that the `"service_worker"` field takes a string, not an array of strings.
- Remove `"background.persistent"` from the `manifest.json`.

Replacing items in `"background.page"` will be dealt with in a later section.

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

The `"service_worker"` field takes a single string.  To use additional scripts in your service worker, use [importScripts](https://developer.mozilla.org/docs/Web/API/WorkerGlobalScope/importScripts) or you can declare the service worker as an [ES Module](https://web.dev/es-modules-in-sw/#static-imports-only) by specifying `"type": "module"` to use the [`import` keyword](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import).

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

Communicate between offscreen documents and extension service workers using  [message passing](/docs/extensions/mv3/messaging/).

## Register listeners synchronously {: #register-listeners }

Registering a listener asynchronously (for example inside a promise or callback) is not guaranteed to work in Manifest V3. Consider the following code.

```js/2
chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.browserAction.setBadgeText({ text: badgeText });
  chrome.browserAction.onClicked.addListener(handleActionClick);
});
``` 

This works with a persistent background page because the page is constantly running and never reinitialized. In MV3, the service worker will be reinitialized when the event is dispatched. This means that when the event fires, the listeners will not be registered (since they are added asynchronously), and the event will be missed.

Instead, move the event listener registration to the top level of your script. This ensures that Chrome will be able to immediately find and invoke your action's click handler, even if your extension hasn't finished executing its startup logic.

```js/0
chrome.action.onClicked.addListener(handleActionClick);

chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });
});
```

## Replace XMLHttpRequest() with global fetch() {: #replace-xmlhttprequest }

`XMLHttpRequest()` can't be called from a service worker, extension or otherwise. Replace calls from your background script to `XMLHttpRequest()` with calls to [global `fetch()`](https://developer.mozilla.org/docs/Web/API/fetch). 


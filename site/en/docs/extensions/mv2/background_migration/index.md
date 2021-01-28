---
layout: "layouts/doc-post.njk"
title: "Migrate to event-driven background scripts"
date: 2018-04-23
#updated: YYYY-MM-DD
description: >
  How to migrate a persistent background script to an event-based, non-persistent
  model to improve the performance of your Chrome Extension.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Implementing non-persistent background scripts will greatly reduce the resource cost of your
extension. Most extension functionality can be supported by an event based background script. Only
under [rare circumstances][1] should an extension have a persistent background, as they constantly
consume system resources and can cause a strain on lower-powered devices.

Enhance an extension's performance by migrating a persistent background script to an event-based
non-persistent model.

## Designate persistence as false {: #persistence }

Locate the `"background"` key in the extension [manifest][2] file, then add or update the
`"persistent"` field to false.

```json/3-6
{
  "name": "My extension",
  ...
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  ...
}
```

The same applies to background scripts that rely on an HTML file.

```json/3-6
{
  "name": "My extension",
  ...
  "background": {
    "page": "background.html",
    "persistent": false
  },
  ...
}
```

## Surface event listeners {: #listeners }

Listeners must be at the top-level to activate the background script if an important event is
triggered. Registered listeners may need to be restructred to a synchronous pattern. Structuring
listeners, as below, will not allow them to be invoked because they are not registered
synchronously.

```js
chrome.storage.local.get('runtimeEvents', function (events) {
  for (let event of events)
    chrome.runtime[event].addListener(listener);
});
```

Instead, keep listeners at top-level and unnested.

```js
chrome.runtime.onStartup.addListener(function() {
  // run startup function
})
```

## Record state changes in storage {: #storage }

Use the [storage API][3] to set and return states and values. Use `local.set` to update on the local
machine.

```js
  chrome.storage.local.set({ variable: variableInformation });
```

Use `local.get` to grab the value of that variable.

```js
chrome.storage.local.get(['variable'], function(result) {
  let awesomeVariable = result.variable;
  // Do something with awesomeVariable
});
```

## Transform timers into alarms {: #timers }

DOM-based timers, such as `window.setTimeout()` or `window.setInterval()`, are not honored in
non-persistent background scripts if they trigger when the event page is dormant.

```js
let timeout = 1000 * 60 * 3;  // 3 minutes in milliseconds
window.setTimeout(function() {
  alert('Hello, world!');
}, timeout);
```

Instead, use the [alarms API][4].

```js
chrome.alarms.create({delayInMinutes: 3.0})
```

Then add a listener.

```js
chrome.alarms.onAlarm.addListener(function() {
  alert("Hello, world!")
});
```

## Update calls for background script functions {: #backgroundFunctions }

If using [`extension.getBackgroundPage`][5] to call a function from the background page, update to
[`runtime.getBackgroundPage`][6]. The newer method activates the non-persistent script before
returning it.

```js
function backgroundFunction() {
  alert('Background, reporting for duty!')
}
```

```js
document.getElementById('target').addEventListener('click', function(){
  chrome.extension.getBackgroundPage().backgroundFunction();
});
```

This method won't work if the background script is inactive, which is the default state for a
non-persistent script. The newer method includes a callback function to ensure the background script
has loaded.

```js
document.getElementById('target').addEventListener('click', function() {
  chrome.runtime.getBackgroundPage(function(backgroundPage){
    backgroundPage.backgroundFunction()
  })
});
```

[1]: /docs/extensions/mv2/background_pages#persistentWarning
[2]: /docs/extensions/reference/tabs
[3]: /docs/extensions/reference/storage
[4]: /docs/extensions/reference/alarms
[5]: /docs/extensions/reference/extension#method-getBackgroundPage
[6]: /docs/extensions/reference/runtime#method-getBackgroundPage

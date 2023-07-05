---
layout: 'layouts/doc-post.njk'
title: Update your code
subhead: 'Updates that are unrelated to other issues'
description: 'The first of three sections describing changes needed for code that is not part of the extension service worker.'
date: 2023-03-09
updated: 2023-04-17
---

{% Partial 'extensions/mv3-support.md' %}

This is the first of three sections describing changes needed for code that is not part of the extension service worker. This section is for required code changes that are unrelated to other issues. The next two sections cover [replacing blocking web requests](/docs/extensions/migrating/blocking-web-requests) and [improving security](/docs/extensions/migrating/improve-security).

## Replace tabs.executeScript() with scripting.executeScript() {: #replace-executescript }

In Manifest V3, `executeScript()` moves from the `tabs` API to the [`scripting`](/docs/extensions/reference/scripting/) API. This requires changes to permissions in the manifest file in addition to actual code changes.

For the `executeScript()` method you need:

* The `"scripting"` permission.
* Either host permissions or the `"activeTab"` permission.

The `scripting.executeScript()` method is similar to how it worked with `tabs.executeScript()`. There are a few differences.

* While the old method could only take a single file, the new method can take an array of files. 
* You also pass a [`ScriptInjection`](/docs/extensions/reference/scripting/#type-ScriptInjection) object instead of [`InjectDetails`](/docs/extensions/reference/extensionTypes/#type-InjectDetails). There are multiple differences between the two. For example, the `tabId` is now passed as a member of `ScriptInjection.target` instead of as a method argument.

The example shows how to do this.

{% Compare 'worse', 'Manifest V2' %}
```json
async function getCurrentTab() {/* ... */}
let tab = await getCurrentTab();

chrome.tabs.executeScript(
  tab.id,
  {
    file: 'content-script.js'
  }
);
```

{% CompareCaption %}
In a background script file.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
async function getCurrentTab()
let tab = await getCurrentTab();

chrome.scripting.executeScript({
  target: {tabId: tab.id},
  files: ['content-script.js']
});
```

{% CompareCaption %}
In the extension service worker.
{% endCompareCaption %}

{% endCompare %}

## Replace tabs.insertCSS() and tabs.removeCSS() with scripting.insertCSS() and scripting.removeCSS() {: #replace-insertcss-removecss }

In Manifest V3, `insertCSS()` and `removeCSS()` move from the `tabs` API to the [`scripting` API](/docs/extensions/reference/scripting/). This requires changes to permissions in the manifest file in addition to code changes:

* The `"scripting"` permission.
* Either host permissions or the `"activeTab"` permission.

The functions on the `scripting` API are similar to the functions on `tabs`. There are a few differences.

* When calling these methods, you pass a [`CSSInjection`](/docs/extensions/reference/scripting/#type-CSSInjection) object instead of `InjectDetails`.
* The `tabId` is now passed as a member of `CSSInjection.target` instead of as a method argument.

The example shows how to do this for `insertCSS()`. The procedure for `removeCSS()` is the same.

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```js
chrome.tabs.insertCSS(tabId, injectDetails, () => {
  // callback code
});
```

{% CompareCaption %}
In a background script file.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```js
const insertPromise = await chrome.scripting.insertCSS({
  files: ["style.css"],
  target: { tabId: tab.id }
});
// Remaining code. 
```

{% CompareCaption %}
In the extension service worker.
{% endCompareCaption %}

{% endCompare %}
</div>

## Replace Browser Actions and Page Actions with Actions {: #replace-browser-page-actions }

Browser actions and page actions were separate concepts in Manifest V2. Though they started with distinct roles, the differences between them decreased over time. In Manifest V3, these concepts are consolidated into the [Action](/docs/extensions/reference/action/) API. This requires changes in your `manifest.json` and extension code that is different from what you would have put in your Manifest V2 background script.

Actions in Manifest V3 most closely resemble browser actions; however, the `action` API does not provide `hide()` and `show()` as `pageAction` did. If you still need page actions, you can either [emulate them using declarative content](/docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent) or call `enable()` or `disable()` with a tab ID. 

### Replace "browser_action" and "page_action" with "action" 

In the `manifest.json` replace the `"browser_action"` and `"page_action"` fields with the `"action"` field. Consult the reference for [information on the `"action"` field](/docs/extensions/reference/action/).

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
{
  ...
  "page_action": { ... },
  "browser_action": {
    "default_popup": "popup.html"
   }
  ...
}
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
{
  ...
  "action": {
    "default_popup": "popup.html"
  }

  ...
}
```

{% endCompare %}
</div>

### Replace the browserAction and pageAction APIs with the action API

Where your Manifest V2 used the `browserAction` and `pageAction` APIs, you should now use the `action` API.

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```js
chrome.browserAction.onClicked.addListener(tab => { ... });
chrome.pageAction.onClicked.addListener(tab => { ... });
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```js
chrome.action.onClicked.addListener(tab => { ... });
```

{% endCompare %}
</div>

## Replace functions that expect a Manifest V2 background context {: #replace-mv2-function }

Other extension contexts can only interact with extension service workers using [message passing](/docs/extensions/mv3/messaging/). Consequently, you'll need to replace calls that expect a background context, specifically:

* `chrome.runtime.getBackgroundPage()`
* `chrome.extension.getBackgroundPage()`
* `chrome.extension.getExtensionTabs()`

Your extension scripts should use message passing to communicate between a service worker and other parts of your extension. Currently that entails using `sendMessage()` and implementing `chrome.runtime.onMessage` in your extension service worker. Long term, you should plan to replace these calls with [`postMessage()`](https://developer.mozilla.org//docs/Web/API/Client/postMessage) and a service worker's [message event handler](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/message_event).

## Replace unsupported APIs {: #replace-unsupported-apis }

The methods and properties listed below need to change in Manifest V3. 

| Manifest V2 method or property        | Replace with                                         |
|---------------------------------------|------------------------------------------------------|
| `chrome.extension.connect()`          | `chrome.runtime.connect()`                           |
| `chrome.extension.connectNative()`    | `chrome.runtime.connectNative()`                     |
| `chrome.extension.getExtensionTabs()` | `chrome.extension.getViews()`                        |
| `chrome.extension.getURL()`           | `chrome.runtime.getURL()`                            |
| `chrome.extension.lastError`          | Where methods return promises, use `promise.catch()` |
| `chrome.extension.onConnect`          | `chrome.runtime.onConnect`                           |
| `chrome.extension.onConnectExternal`  | `chrome.runtime.onConnectExternal`                   |
| `chrome.extension.onMessage`          | `chrome.runtime.onMessage`                           |
| `chrome.extension.onRequest`          | `chrome.runtime.onRequest`                           |
| `chrome.extension.onRequestExternal`  | `chrome.runtime.onMessageExternal`                   |
| `chrome.extension.sendMessage()`      | `chrome.runtime.sendMessage()`                       |
| `chrome.extension.sendNativeMessage()` | `chrome.runtime.sendNativeMessage()`                  |
| `chrome.extension.sendRequest()`      | `chrome.runtime.sendMessage()`                       |
| `chrome.runtime.onSuspend` (background scripts) | Not supported in extension service workers. Use the [`beforeunload`](https://developer.mozilla.org/docs/Web/API/Window/beforeunload_event) document event instead. |
| `chrome.tabs.getAllInWindow()`        | `chrome.tabs.query()`                                |
| `chrome.tabs.getSelected()`           | `chrome.tabs.query()`                                |
| `chrome.tabs.onActiveChanged`         | `chrome.tabs.onActivated`                            |
| `chrome.tabs.onHighlightChanged`      | `chrome.tabs.onHighlighted`                          |
| `chrome.tabs.onSelectionChanged`      | `chrome.tabs.onActivated`                            |
| `chrome.tabs.sendRequest()`           | `chrome.runtime.sendMessage()`                       |
| `chrome.tabs.Tab.selected`            | `chrome.tabs.Tab.highlighted`                        |

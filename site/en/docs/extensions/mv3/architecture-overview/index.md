---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
date: 2012-09-18
updated: 2022-03-25
description: A high-level explanation of the software architecture of Chrome Extensions.
---

Extensions are zipped bundles of HTML, CSS, JavaScript, images, and other files used in the web
platform, that customize the Google Chrome browsing experience. Extensions are built using web
technology and can use the same APIs the browser provides to the open web.

Extensions have a wide range of functional possibilities. They can modify web content users see and
interact with or extend and change the behavior of the browser itself.

Consider extensions the gateway to making the Chrome browser the most personalized browser.

## Extension files {: #files }

Extensions vary in types of files and amount of directories, but they are all required to have a
[manifest][docs-manifest].

### The manifest {: #manifest }

The manifest file, titled `manifest.json`, gives the browser information about the extension, such
as the most important files and the capabilities the extension might use.

```json
{
  "name": "My Extension",
  "description": "A nice little demo extension.",
  "version": "2.1",
  "manifest_version": 3,
  "icons": {
    "16": "icon_16.png",
    "48": "icon_48.png",
    "128": "icon_128.png"
  },
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "host_permissions": ["*://*.example.com/*"],
  "action": {
    "default_icon": "icon_16.png",
    "default_popup": "popup.html"
  }
}
```

### Toolbar icon {: #icons }

Extensions must have an icon that sits in the browser toolbar. Toolbar icons allow easy access and
keep users aware of which extensions are installed. Most users will interact with an extension that
uses a [popup][docs-popup] by clicking on the icon, like in the [Getting Started
example][sample-getting-started].

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ku5Z8MMssgw6MKctpJVI.png", alt="Getting started
Popup", width="187", height="153" %}

<!-- TODO: Show examples of the MV3 getting started tutorial extensions -->

### Referencing extension files {: #ref-files }

#### Relative URLs {: #relative-urls }

Just as HTML pages on the web can include files on the same site with relative URLs, extensions
pages can also reference assets in the extension using relative paths.

```html
<img src="images/my_image.png">
```

#### Absolute URL {: #absolute-urls }

To access a file in a content script, you can use the [`chrome.runtime.getURL()`][api-get-url]
method. 

``` js
let image = chrome.runtime.getURL("images/my_image.png")
```

It will return an absolute URL for the asset in your extension, that looks like this:

```text
chrome-extension://EXTENSION_ID/RELATIVE_PATH
```

The <code><var>EXTENSION_ID</var></code> is a unique identifier that the browser generates. You can
view these IDs in the Extension management page **chrome://extensions**. The
<code><var>RELATIVE_PATH</var></code> is the file path relative to the extension's top folder.

{% Aside 'caution' %}

All assets accessed by content scripts must be declared as a
[`web_accessible_resource`][docs-web-acc-res] in the manifest.

{% endAside %}

## Architecture {: #arch }

An extension's architecture will depend on its functionality, but many robust extensions will
include multiple components:

- [Manifest][docs-manifest]
- [Background Script][section-bg]
- [UI Elements][section-ui]
- [Content Script][section-cs]
- [Options Page][section-options]

### Background service worker {: #background_script }

The [background service worker][docs-service-worker] is the extension's event handler; it contains
listeners for browser events that are important to the extension. It lies dormant until an event is
fired then performs the instructed logic; it is only loaded when it is needed and unloaded when it
goes idle.

### UI elements {: #pages }

An extension's user interface should be purposeful and minimal. The UI should customize or enhance
the browsing experience without distracting from it. 

The following is a list of most common UI examples:

- An [action click][docs-click] event.
- A [popup][docs-popup].
- A [context menu][docs-context-menu].
- An [omnibox][docs-omnibox]
- A [keyboard shortcut][docs-commands].
- Desktop [notifications][api-notif].
- [Text-to-speech][api-tts].
- Inject a custom UI [into a page][docs-content-scripts].
- [Override Chrome pages][docs-override] (History page, New Tab, or Bookmarks).
- Open a dedicated [tab][api-create-tab] or [window][api-window-create].

See [Design the UI][docs-ui] for UI and design guidelines for Chrome Extensions.  

### Content scripts {: #contentScripts }

[Content scripts][docs-content-scripts] allow extensions to inject script into a page in order to
read and modify its contents. The content script contains JavaScript that executes in the contexts
of a page that has been loaded into the browser.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CNDAVsTnJeSskIXVnSQV.png", alt="A browser window with
a page action and a content script", height="316", width="388" %}

Content scripts can communicate with their parent extension by exchanging [messages][docs-messages]
and storing values using the [storage][api-storage] API.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/466ftDp0EXB4E1XeaGh0.png", alt="Shows a communication
path between the content script and the parent extension", height="316", width="388" %}

### Options page {: #optionsPage }

Just as extensions allow users to customize the Chrome browser, the [options page][docs-options]
enables customization of the extension. Options can be used to enable features and allow users to
choose what functionality is relevant to their needs.

Users can access the options page via [direct link][docs-link-options] or in the context menu of the
extension toolbar. The following is an example of the Google Dictionary extension. 

{% Columns %}

{% Column %}

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Mz7GV76tFkzxRlb7Pq6e.png", alt="Options page link in UI", width="800", height="299" %}
  <figcaption>
    Link to Options page.
  </figcaption>
</figure>

{% endColumn %}

{% Column %}

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/BM11QeGCThsUNTlsZbAe.png", alt="Context Menu Options page", width="357", height="222" %}

  <figcaption>
    Options page in extension's context menu.
  </figcaption>
</figure>

{% endColumn %}

{% endColumns %}

## Using Chrome APIs {: #apis }

In addition to having access to the same [web APIs][mdn-web-apis] as web pages, extensions can also
use [extension-specific APIs][api-reference] that create tight integration with the browser.
Extensions and webpages can both access the standard `window.open()` method to open a URL, but
extensions can specify which window that URL should be displayed in by using
[chrome.tabs.create()][api-tabs-create] instead.

### Asynchronous vs. synchronous methods {: #sync }

#### Callbacks

Most Chrome API methods are asynchronous: they return immediately without waiting for the operation
to finish. If an extension needs to know the outcome of an asynchronous operation it can pass a
callback function into the method. The callback is executed later, potentially much later, after the
method returns.

A method is asynchronous when the callback parameter is available in its signature.

```js
// Signature for an asynchronous method
chrome.tabs.query(object queryInfo, function callback)
```

If the extension needed to navigate the user's currently selected tab to a new URL, it would need to
get the current tab's ID and then update that tab's address to the new URL.


If the [tabs.query][api-tabs-query] method were synchronous, it may look something like below.

{% Compare 'worse' %}
```js
var tab = chrome.tabs.query(queryOptions); //WRONG!!!
chrome.tabs.update(tab.id, {url:newUrl});
someOtherFunction();
```
{% CompareCaption %}

This approach will fail because `query()` is asynchronous. It returns without waiting for the work
to complete, and does not return a value.

{% endCompareCaption %}

{% endCompare %}

To correctly query a tab and update its URL the extension must use the callback parameter.

{% Compare 'better' %}
```js
chrome.tabs.query(queryOptions, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: newUrl});
});
someOtherFunction();
```

{% endCompare %}

In the above code, the lines are executed in the following order: 1, 4, 2. The callback function
specified to `query()` is called and then executes line 2, but only after information about the
currently selected tab is available. This happens sometime after `query()` returns. Although
`update()` is asynchronous the code doesn't use a callback parameter, since the extension doesn't do
anything with the results of the update.


#### Promises

With the introduction of Manifest V3, many extension API methods now return promises. Not all
methods in extensions APIs support promises. You can verify whether a method supports promises by
checking its API reference page. See [Using promises][docs-promises] to learn more.

```js
// Promise
chrome.tabs.query(queryOptions).then((tabs) => {
  chrome.tabs.update(tabs[0].id, {url: newUrl});
  someOtherFunction();
});

// async-await
async function queryTab() {
  let tabs = await chrome.tabs.query(queryOptions});
  chrome.tabs.update(tabs[0].id, {url: newUrl});
  someOtherFunction();
}

```

#### Synchronous methods

```js
// Synchronous methods have no callback option and returns a type of string
string chrome.runtime.getURL()
```

This method synchronously returns the URL as a `string` and performs no other asynchronous work.

### More details {: #chrome-more }

For more information, explore the [Chrome API reference docs][api-reference].

## Communication between pages {: #pageComm }

Different components in an extension can communicate with each other using [message
passing][docs-messages]. Either side can listen for messages sent from the other end, and respond on
the same channel. Additionally, all components of the extension can access values stored using the
[storage][api-storage] API.

## Saving data and incognito mode {: #incognito }

Extensions can save data using the [storage][api-storage] API, or by making server requests that
result in saving data. When the extension needs to save something, first consider if it's from an
incognito window. By default, extensions don't run in incognito windows.

_Incognito mode_ promises that the window will leave no tracks. When dealing with data from
incognito windows, extensions should honor this promise. If an extension normally saves browsing
history, don't save history from incognito windows. However, extensions can store setting
preferences from any window, incognito or not.

To detect whether a window is in incognito mode, check the `incognito` property of the relevant
[tabs.Tab][api-tab] or [windows.Window][api-window] object.

```js
function saveTabData(tab) {
  if (tab.incognito) {
    return;
  } else {
    chrome.storage.local.set({data: tab.url});
  }
}
```

## Take the next step {: #next-steps }

After reading the overview and completing the [Getting Started][docs-get-started] tutorial, you
should be ready to start writing your own extensions! Dive deeper into the world of custom Chrome
with the following resources:

- Learn about how to debug Extensions in the [debugging tutorial][docs-debugging].
- Chrome Extensions have access to powerful APIs above and beyond what's available on the open web.
  The [chrome.\* APIs documentation][api-reference] will walk through each API.
- The [developer's guide][docs-dev-guide] has dozens of additional links to pieces of documentation
  relevant to advanced extension creation.

[api-action]: /docs/extensions/reference/action/
[api-create-tab]: /docs/extensions/reference/tabs#method-create
[api-dec-content]: /docs/extensions/reference/declarativeContent
[api-get-url]: /docs/extensions/reference/runtime#method-getURL
[api-notif]: /docs/extensions/reference/notifications/
[api-reference]: /docs/extensions/reference
[api-storage]: /docs/extensions/reference/storage
[api-tab]: /docs/extensions/reference/tabs#type-Tab
[api-tabs-query]: /docs/extensions/reference/tabs#method-query
[api-tts]: /docs/extensions/reference/tts/
[api-window-create]: /docs/extensions/reference/windows/#method-create
[docs-click]: /docs/extensions/mv3/user_interface/#click-event
[docs-commands]: /docs/extensions/mv3/user_interface/#commands
[docs-content-scripts]: /docs/extensions/mv3/content_scripts
[docs-context-menu]: /docs/extensions/mv3/user_interface/#context_menu
[docs-debugging]: /docs/extensions/mv3/tut_debugging
[docs-dev-guide]: /docs/extensions/mv3/devguide
[docs-get-started]: /docs/extensions/mv3/getstarted
[docs-key]: /docs/extensions/mv3/manifest/key/
[docs-link-options]: /docs/extensions/mv3/options/#linking
[docs-manifest]: /docs/extensions/mv3/manifest
[docs-messages]: /docs/extensions/mv3/messaging
[docs-omnibox]: /docs/extensions/mv3/user_interface/#omnibox
[docs-options]: /docs/extensions/mv3/options
[docs-override]: /docs/extensions/mv3/override/
[docs-popup]: /docs/extensions/mv3/user_interface#popup
[docs-promises]: /docs/extensions/mv3/promises/
[docs-service-worker]: /docs/extensions/mv3/service_workers
[docs-ui]: /docs/extensions/mv3/user_interface
[docs-web-acc-res]: /docs/extensions/mv3/manifest/web_accessible_resources/
[mdn-web-apis]: https://developer.mozilla.org/en-US/docs/Web/API
[sample-getting-started]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/getting-started
[section-bg]: #background_script
[section-cs]: #contentScripts
[section-options]: #optionsPage
[section-ui]: #pages

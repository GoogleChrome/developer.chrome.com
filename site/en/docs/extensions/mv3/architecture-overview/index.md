---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
date: 2012-09-18
updated: 2022-05-13
description: A high-level explanation of the software architecture of Chrome Extensions.
subhead: A high-level explanation of the components and structure of a Chrome Extension.
---

Extensions are zipped bundles of HTML, CSS, JavaScript, images, and other files used in the web
platform. Extensions can modify web content that users see and interact with. They can also extend
and change the behavior of the browser itself. 

This page briefly describes the files that could form part of an extension, how to access these
files, how to use Chrome APIs, how extension files communicate, and how to store
data.

## Architecture {: #arch }

An extension's architecture will depend on its functionality, but all extensions must have a
[manifest][section-manifest]. The following are other components an extension can include: 

- [Service worker][section-bg]
- [Toolbar icon][section-icons]
- [UI elements][section-ui]
- [Content script][section-cs]
- [Options page][section-options]

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
uses a [popup][docs-popup] by clicking the icon, like in the [getting started
example][sample-getting-started].

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ku5Z8MMssgw6MKctpJVI.png", alt="Getting started
popup", width="187", height="153" %}
<!-- TODO: Show examples of the MV3 getting started tutorial extensions -->

### Service worker {: #background_script }

The extension service worker is the extension's event handler; it contains listeners for browser
events that are important to the extension. It lies dormant until an event is fired then performs
the instructed logic; it is only loaded when it is needed and unloaded when it goes idle. The
service worker has access to all the [Chrome APIs][section-apis], as long it declares the
required permissions in the `manifest.json`.

See [Manage events with service workers][docs-service-worker] to learn more. 

### Content scripts {: #contentScripts }

Content scripts allow extensions to inject logic into a page in order to read and modify its
contents. A content script contains JavaScript that executes in the context of a page that has
been loaded into the browser.

Content scripts can communicate with their parent extension by exchanging [messages][docs-messages]
and storing values using the [storage][api-storage] API.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/466ftDp0EXB4E1XeaGh0.png", alt="Shows a communication
path between the content script and the parent extension", height="316", width="388" %}

See [Understanding content scripts][docs-content-scripts] to learn more.

### UI elements {: #pages }

An extension's user interface should be purposeful and minimal. The UI should customize or enhance
the browsing experience without distracting from it. 

The following is a list of the most common UI examples:

- An [action click][docs-click] event.
- A [popup][docs-popup].
- A [context menu][docs-context-menu].
- An [omnibox][docs-omnibox].
- A [keyboard shortcut][docs-commands].
- Desktop [notifications][api-notif].
- [Text-to-speech][api-tts].
- A custom UI injected [into a page][docs-content-scripts].

See [Design the UI of a Chrome extension][docs-ui], to learn more.

### Options page {: #optionsPage }

Just as extensions allow users to customize the Chrome browser, the options page enables
customization of the extension. Options can be used to enable features and allow users to choose
what functionality is relevant to their needs.

Users can access the options page via [direct link][docs-link-options] or in the context menu of the
extension toolbar. The following is an example of the Google Dictionary extension. 

{% Columns %}

{% Column %}

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Mz7GV76tFkzxRlb7Pq6e.png", 
alt="Options page link in the UI", width="800", height="299" %}
  <figcaption>
    Link to the Options page.
  </figcaption>
</figure>

{% endColumn %}

{% Column %}

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/BM11QeGCThsUNTlsZbAe.png", 
alt="Context Menu Options page", width="357", height="222" %}

  <figcaption>
    Options page in the extension's context menu.
  </figcaption>
</figure>

{% endColumn %}

{% endColumns %}

See [Give users options][docs-options] to learn more.

### Additional HTML files {: #html-files}

You can display other HTML files present in the extension that are not declared in the manifest.
These HTML files can access the same [Chrome APIs][section-apis] as the popup or other extension
files. 

You can open these pages using the web api [window.open()][mdn-window-open], the Chrome APIs
[windows.create()][api-window-create], or [tabs.create()][api-create-tab].

## Extension files {: #files }

### Referencing extension files {: #ref-files }

Just as HTML pages on the web can include files on the same site with _relative URLs_, **extension
pages** can also reference extension assets using relative paths.

```html
<img src="images/my_image.png">
```

To access an extension file from a **content script**, you can call
[`chrome.runtime.getURL()`][api-get-url] to get the _absolute URL_ of your extension asset.

``` js
let image = chrome.runtime.getURL("images/my_image.png")
```

To access an extension file from a **website**, you will have to construct the URL as follows:

```text
chrome-extension://EXTENSION_ID/RELATIVE_PATH
```

You can find the <code><var>EXTENSION_ID</var></code> in the Extension management page
**chrome://extensions**. The <code><var>RELATIVE_PATH</var></code> is the file path relative to the
extension's top folder.

{% Aside 'key-term' %}

The **extension ID** is a 32-character alpha string that identifies an extension in the browser and
on the Chrome Web Store.

{% endAside %}

During development, a new ID is generated when an [_unpacked extension_][docs-unpacked] is loaded,
unless the `"key"` property is [set in the manifest][docs-key].

{% Aside 'caution' %}

All assets that content scripts and websites want to access must be declared under
[`web_accessible_resources`][section-web-res] key in the manifest.

{% endAside %}

### Web-accesible resources {: #web-resources }

Web-accessible resources are files (images, HTML, CSS, Javascript) inside an extension that can be
accessed by a content script, web pages, or other extensions. 

You can declare which resources are exposed and to what origins in the
manifest:

```json
{
  ...
  "web_accessible_resources": [
    {
      "resources": [ "images/*.png" ],
      "matches": [ "https://example.com/*" ]
    }
  ],
  ...
}
```

See [Web-accesible resources][docs-web-acc-res] for usage information.

## Using Chrome APIs {: #apis }

In addition to having access to the same [web APIs][mdn-web-apis] as web pages, extensions can also
use [extension-specific APIs][api-reference] that create tight integration with the browser. For
example, both extensions and webpages can access the standard [`window.open()`][mdn-window-open]
method to open a URL, but extensions can specify which window that URL should be displayed in by
using [chrome.tabs.create()][api-create-tab] instead.

For more information, explore the [Chrome API reference docs][api-reference].

### Asynchronous vs. synchronous methods {: #async-sync }

#### Callbacks {: #callbacks }

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
let tab = chrome.tabs.query(queryOptions); //WRONG!!!
chrome.tabs.update(tab.id, {url:newUrl});
someOtherFunction();
```
{% CompareCaption %}

This approach will fail because `query()` is **asynchronous**. It returns without waiting for the
work to complete, and does not return a value.

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

#### Promises {: #async }

With the introduction of Manifest V3, many extension API methods now return promises. Not all
methods in extensions APIs support promises. You can verify whether a method supports promises by
checking its API reference page.

```js
// Promise
chrome.tabs.query(queryOptions)
.then((tabs) => {
  chrome.tabs.update(tabs[0].id, {url: newUrl});
  someOtherFunction();
});

// async-await
async function queryTab() {
  let tabs = await chrome.tabs.query(queryOptions);
  chrome.tabs.update(tabs[0].id, {url: newUrl});
  someOtherFunction();
}
```

See [Using promises][docs-promises] to learn more.

#### Synchronous methods {: #sync }

```js
// Synchronous methods have no callback
const imgUrl = chrome.runtime.getURL("images/icon.png")
```

This method synchronously returns the URL as a `string` and performs no other asynchronous work.

## Communication between pages {: #pageComm }

Different components in an extension can communicate with each other using [message
passing][docs-messages]. Either side can listen for messages sent from the other end, and respond on
the same channel. 

## Saving data {: #data}

The chrome storage API has been optimized to meet the specific storage needs of extensions. For
example, whenever data is updated, you can use the `onChanged()` event to track these changes. All
extension components have access to this API. An extension can also store data using the web API
[indexedDB][mdn-indexeddb].

See [storage API][api-storage] for usage and examples.

## Incognito mode {: #incognito}

Extensions don't run in incognito windows unless the user manually allows it in the extension's
settings page. By default, normal and incognito windows run in a single shared process. However,
extensions can run incognito windows in their own separate process or not support incognito windows
at all. You can specify this behavior in the ["incognito"][manifest-incognito] key in the manifest.

See [Saving data in incognito mode][incognito-data] to understand how to protect user privacy.

## Take the next step {: #next-steps }

After reading the overview and completing the [Getting started][docs-get-started] tutorial, you
should be ready to start writing your own extensions! Dive deeper into the world of custom Chrome
with the following resources:

- Learn how to debug Extensions in the [debugging tutorial][docs-debugging].
- Chrome Extensions have access to powerful APIs above and beyond what's available on the open web.
  The [chrome APIs documentation][api-reference] will walk through each API.
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
[docs-ext-pages]: /docs/extensions/mv3/user_interface/#pages
[docs-get-started]: /docs/extensions/mv3/getstarted
[docs-key]: /docs/extensions/mv3/tut_oauth/#keep-consistent-id
[docs-link-options]: /docs/extensions/mv3/options/#linking
[docs-manifest]: /docs/extensions/mv3/manifest
[docs-messages]: /docs/extensions/mv3/messaging
[docs-omnibox]: /docs/extensions/mv3/user_interface/#omnibox
[docs-options]: /docs/extensions/mv3/options
[docs-popup]: /docs/extensions/mv3/user_interface#popup
[docs-promises]: /docs/extensions/mv3/promises/
[docs-service-worker]: /docs/extensions/mv3/service_workers
[docs-ui]: /docs/extensions/mv3/user_interface
[docs-unpacked]: /docs/extensions/mv3/getstarted/#unpacked
[docs-web-acc-res]: /docs/extensions/mv3/manifest/web_accessible_resources/
[mdn-web-apis]: https://developer.mozilla.org/docs/Web/API
[mdn-indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[mdn-window-open]: https://developer.mozilla.org/docs/Web/API/Window/open
[sample-getting-started]:
    https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/getting-started
[section-apis]: #apis
[section-bg]: #background_script
[section-cs]: #contentScripts
[section-icons]: #icons
[section-manifest]: #manifest
[section-options]: #optionsPage
[section-ui]: #pages
[section-web-res]: #web-resources
[incognito-data]: /docs/extensions/mv3/user_privacy/#data-incognito
[manifest-incognito]: /docs/extensions/mv3/manifest/incognito/

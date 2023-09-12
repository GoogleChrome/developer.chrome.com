---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
seoTitle: "MV2 - Architecture overview [Deprecated]"
date: 2012-09-18
updated: 2018-06-07
description: A high-level explanation of the software architecture of Chrome Extensions.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Architecture overview](/docs/extensions/mv3/architecture-overview) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

Extensions are zipped bundles of HTML, CSS, JavaScript, images, and other files used in the web
platform, that customize the Google Chrome browsing experience. Extensions are built using web
technology and can use the same APIs the browser provides to the open web.

Extensions have a wide range of functional possibilities. They can modify web content users see and
interact with or extend and change the behavior of the browser itself.

Consider extensions the gateway to making the Chrome browser the most personalized browser.

## Extension files {: #files }

Extensions vary in types of files and amount of directories, but they are all required to have a
[manifest][docs-manifest]. Some basic, but useful, extensions may consist of just the manifest and
its toolbar icon.

The manifest file, titled `manifest.json`, gives the browser information about the extension, such
as the most important files and the capabilities the extension might use.

```json
{
  "name": "My Extension",
  "version": "2.1",
  "description": "Gets information from Google.",
  "icons": {
    "128": "icon_16.png",
    "128": "icon_32.png",
    "128": "icon_48.png",
    "128": "icon_128.png"
  },
  "background": {
    "persistent": false,
    "scripts": ["background_script.js"]
  },
  "permissions": ["https://*.google.com/", "activeTab"],
  "browser_action": {
    "default_icon": "icon_16.png",
    "default_popup": "popup.html"
  }
}
```

Extensions must have an icon that sits in the browser toolbar. Toolbar icons allow easy access and
keep users aware of which extensions are installed. Most users will interact with an extension that
uses a [popup][doc-ui-popup] by clicking on the icon.

This [Google Mail Checker extension][sample-mail-checker] uses a [browser action][api-action]:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mG1Uyd3uzcP7sSyKXWkh.png",
       alt="A screenshot of the Google Mail Checker extension", height="79", width="90" %}

This [Mappy extension][sample-mappy] uses a [page action][api-page-action] and [content
script][section-content-scripts]:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LrHTrkZVBN96DqNQjtyF.png",
       alt="A screenshot of the Mappy extension", height="103", width="90" %}

### Referring to files {: #relative-urls }

An extension's files can be referred to by using a relative URL, just as files in an ordinary HTML
page.

```html
<img src="images/my_image.png">
```

Additionally, each file can also be accessed using an absolute URL.

```text
chrome-extension://EXTENSION_ID/PATH_TO_FILE
```

In the absolute URL, the <var>EXTENSION_ID</var> is a unique identifier that the extension system
generates for each extension. The IDs for all loaded extensions can be viewed by going to the URL
**chrome://extensions**. The <var>PATH_TO_FILE</var> is the location of the file under the
extension's top folder; it matches the relative URL.

While working on an unpacked extension the extension ID can change. Specifically, the ID of an
unpacked extension will change if the extension is loaded from a different directory; the ID will
change again when the extension is packaged. If an extension's code relies on an absolute URL, it
can use the [`chrome.runtime.getURL()`][api-runtime-geturl] method to avoid hardcoding the ID during
development.

## Architecture {: #arch }

An extension's architecture will depend on its functionality, but many robust extensions will
include multiple components:

- [Manifest][doc-manifest]
- [Background Script][section-background]
- [UI Elements][section-ui-elements]
- [Content Script][section-content-scripts]
- [Options Page][section-options-page]

### Background script {: #background_script }

The [background script][doc-background-page] is the extension's event handler; it contains listeners
for browser events that are important to the extension. It lies dormant until an event is fired then
performs the instructed logic. An effective background script is only loaded when it is needed and
unloaded when it goes idle.

### UI elements {: #pages }

An [extension's user interface][doc-ui] should be purposeful and minimal. The UI should customize or
enhance the browsing experience without distracting from it. Most extensions have a [browser
action][api-browser-action] or [page action][api-page-action], but can contain other forms of UI,
such as [context menus][api-context-menus], use of the [omnibox][api-omnibox], or creation of a
[keyboard shortcut][api-commands].

Extension UI pages, such as a [popup][doc-ui-popup], can contain ordinary HTML pages with JavaScript
logic. Extensions can also call [tabs.create][api-tabs-create] or `window.open()` to display
additional HTML files present in the extension.

An extension using a page action and a popup can use the [declarative
content][api-declarative-content] API to set rules in the background script for when the popup is
available to users. When the conditions are met, the background script communicates with the popup
to make it's icon clickable to users.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/8oLwFaq0VFIQtw4mcA91.png",
       alt="A browser window containing a page action displaying a popup", height="316", width="325" %}

### Content scripts {: #contentScripts }

Extensions that read or write to web pages utilize a [content script][doc-content-scripts]. The
content script contains JavaScript that executes in the contexts of a page that has been loaded into
the browser. Content scripts read and modify the DOM of web pages the browser visits.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CNDAVsTnJeSskIXVnSQV.png",
       alt="A browser window with a page action and a content script", height="316", width="388" %}

Content scripts can communicate with their parent extension by exchanging [messages][doc-messaging]
and storing values using the [storage][api-storage] API.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/466ftDp0EXB4E1XeaGh0.png",
       alt="Shows a communication path between the content script and the parent extension", height="316", width="388" %}

### Options page {: #optionsPage }

Just as extensions allow users to customize the Chrome browser, the [options page][doc-options-page]
enables customization of the extension. Options can be used to enable features and allow users to
choose what functionality is relevant to their needs.

## Using Chrome APIs {: #apis }

In addition to having access to the same APIs as web pages, extensions can also use
[extension-specific APIs][api-index] that create tight integration with the browser. Extensions and
webpages can both access the standard `window.open()` method to open a URL, but extensions can
specify which window that URL should be displayed in by using the Chrome API
[tabs.create][api-tabs-create] method instead.

### Asynchronous vs. synchronous methods {: #sync }

Most Chrome API methods are asynchronous: they return immediately without waiting for the operation
to finish. If an extension needs to know the outcome of an asynchronous operation it can pass a
callback function into the method. The callback is executed later, potentially much later, after the
method returns.

If the extension needed to navigate the user's currently selected tab to a new URL, it would need to
get the current tab's ID and then update that tab's address to the new URL.

If the [tabs.query][api-tabs-query] method were synchronous, it may look something like below.

```js
//THIS CODE DOESN'T WORK
var tab = chrome.tabs.query({'active': true}); //WRONG!!!
chrome.tabs.update(tab.id, {url:newUrl});
someOtherFunction();
```

This approach will fail because `query()` is asynchronous. It returns without waiting for the work
to complete, and does not return a value. A method is asynchronous when the callback parameter is
available in its signature.

```js
// Signature for an asynchronous method
chrome.tabs.query(object queryInfo, function callback)
```

To correctly query a tab and update its URL the extension must use the callback parameter.

```js
//THIS CODE WORKS
chrome.tabs.query({'active': true}, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: newUrl});
});
someOtherFunction();
```

In the above code, the lines are executed in the following order: 1, 4, 2. The callback function
specified to `query()` is called and then executes line 2, but only after information about the
currently selected tab is available. This happens sometime after `query()` returns. Although
`update()` is asynchronous the code doesn't use a callback parameter, since the extension doesn't do
anything with the results of the update.

```js
// Synchronous methods have no callback option and returns a type of string
string chrome.runtime.getURL()
```

This method synchronously returns the URL as a `string` and performs no other asynchronous work.

### More details {: #chrome-more }

For more information, explore the [Chrome API reference docs][api-index] and watch the following
video.

## Communication between pages {: #pageComm }

Different components in an extension often need to communicate with each other. Different HTML pages
can find each other by using the [`chrome.extension`][api-extension] methods, such as `getViews()`
and `getBackgroundPage()`. Once a page has a reference to other extension pages the first one can
invoke functions on the other pages and manipulate their DOMs. Additionally, all components of the
extension can access values stored using the [storage][api-storage] API and communicate through
[message passing][doc-messaging].

## Saving data and incognito mode {: #incognito }

Extensions can save data using the [storage][api-storage] API, the HTML5 [web storage
API][spec-webstoreage] , or by making server requests that result in saving data. When the extension
needs to save something, first consider if it's from an incognito window. By default, extensions
don't run in incognito windows.

_Incognito mode_ promises that the window will leave no tracks. When dealing with data from
incognito windows, extensions should honor this promise. If an extension normally saves browsing
history, don't save history from incognito windows. However, extensions can store setting
preferences from any window, incognito or not.

To detect whether a window is in incognito mode, check the `incognito` property of the relevant
[tabs.Tab][api-tabs-tab] or [windows.Window][api-windows-window] object.

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

After reading the overview and completing the [Getting Started][doc-get-started] tutorial,
developers should be ready to start writing their own extensions! Dive deeper into the world of
custom Chrome with the following resources.

- Learn about the options available for debugging Extensions in the [debugging
  tutorial][doc-debugging].
- Chrome Extensions have access to powerful APIs above and beyond what's available on the open web.
  The [chrome.\* APIs documentation][api-index] will walk through each API.
- The [extension development overview][doc-devguide] has dozens of additional links to pieces of
  documentation relevant to advanced extension creation.

[api-action]: /docs/extensions/reference/action
[api-browser-action]: /docs/extensions/reference/browserAction
[api-commands]: /docs/extensions/reference/commands
[api-context-menus]: /docs/extensions/reference/contextMenus
[api-declarative-content]: /docs/extensions/reference/declarativeContent
[api-extension]: /docs/extensions/reference/extension
[api-index]: /docs/extensions/reference
[api-omnibox]: /docs/extensions/reference/omnibox
[api-page-action]: /docs/extensions/reference/pageAction
[api-runtime-geturl]: /docs/extensions/reference/runtime/#method-getURL
[api-storage]: /docs/extensions/reference/storage
[api-tabs-create]: /docs/extensions/reference/tabs#method-create
[api-tabs-query]: /docs/extensions/reference/tabs#method-query
[api-tabs-tab]: /docs/extensions/reference/tabs#type-Tab
[api-windows-window]: /docs/extensions/reference/windows#type-Window
[doc-background-page]: /docs/extensions/mv2/background_pages
[doc-content-scripts]: /docs/extensions/mv2/content_scripts
[doc-debugging]: /docs/extensions/mv2/tut_debugging
[doc-devguide]: /docs/extensions/mv2/devguide
[doc-get-started]: /docs/extensions/mv2/getstarted
[doc-manifest]: /docs/extensions/mv2/manifest/
[doc-manifest]: /docs/extensions/mv2/tabs
[doc-messaging]: /docs/extensions/mv2/messaging
[doc-options-page]: /docs/extensions/mv2/options
[doc-ui-popup]: /docs/extensions/mv2/user_interface/#popup
[doc-ui]: /docs/extensions/mv2/user_interface/
[sample-mail-checker]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/_archive/mv2/extensions/gmail
[sample-mappy]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/_archive/mv2/extensions/mappy
[section-background]: #background_script
[section-content-scripts]: #contentScripts
[section-options-page]: #optionsPage
[section-ui-elements]: #pages
[spec-webstoreage]: https://html.spec.whatwg.org/multipage/webstorage.html


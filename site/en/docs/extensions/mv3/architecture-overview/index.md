---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
date: 2012-09-18
updated: 2022-11-02
description: A high-level explanation of the software architecture of Chrome Extensions.
subhead: A high-level explanation of the components and structure of a Chrome Extension.
---

## Overview

This page briefly describes the structure of a Chrome extension, the role of each part and how they
interact. Implementation details for each section are outside the scope of this article. 

This article assumes you are familiar with Chrome extension development. If not, we recommend reading [What extensions are][tbd-link] and [Extensions 101][tdb-link].

## TBD

An extension is composed of different "parts". We will talk about each one, and what their role is in an extension.

## The manifest {: #manifest }

The manifest is the only required file because it provides the browser with a blueprint it can follow to ___ your extension. Without it, the browser wouldn't be able to "interpret" your extension.
For example:

- It uses all the unique/personable information about the extension, like it's name, description of what it does, the version number it's currently on, what icons to use across different xyz, etc to display this information in different places like the browser window, Chrome Web Store listing and the Extensions page (chrome://).
- It let's the browser know which permissions the extension needs to use Chrome APIs, through specific API related keys and permissions.
- It knows which are file to run on the page, which is the service worker that will run in the background, which files to 

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

### Service worker {: #background_script }

The extension service worker is the extension's event handler; it contains listeners for browser
events that are important to the extension. It lies dormant until an event is fired then performs
the instructed logic; it is only loaded when it is needed and unloaded when it goes idle. The
service worker has access to all the [Chrome APIs][section-apis], as long as it declares the
required permissions in the `manifest.json`.

An extension can only have a single service worker. To import further code, the service worker can be declared as an [ES Module][webdev-imports] by specifying `"type": "module"` in the manifest `"background"`.

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

See [Give users options][docs-options] to learn more.

### Additional HTML files {: #html-files}

An extension can also have other HTML files that are not declared in the manifest. All extension HTML files can access the [Chrome APIs][section-apis] and can use script tags including Javascript files, but cannot declare inline JavaScript.

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


```

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


[api-reference]: /docs/extensions/reference
[api-storage]: /docs/extensions/reference/storage
[doc-content-scripts]: /docs/extensions/mv3/content_scripts
[doc-dev-guide]: /docs/extensions/mv3/devguide
[doc-ext-101]: /docs/extensions/mv3/getstarted/extensions-101
[doc-ext-pages]: /docs/extensions/mv3/user_interface/#pages
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-messages]: /docs/extensions/mv3/messaging
[doc-options]: /docs/extensions/mv3/options
[doc-overview]: /docs/extensions/mv3/overview
[doc-popup]: /docs/extensions/mv3/user_interface#popup
[doc-service-worker]: /docs/extensions/mv3/service_workers
[doc-ui]: /docs/extensions/mv3/user_interface
[doc-web-acc-res]: /docs/extensions/mv3/manifest/web_accessible_resources/
[manifest-incognito]: /docs/extensions/mv3/manifest/incognito/

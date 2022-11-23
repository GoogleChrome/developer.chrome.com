---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
date: 2012-09-18
updated: 2022-11-02
description: A high-level explanation of the architecture of Chrome Extensions.
subhead: A high-level explanation of the structure of a Chrome Extension.
---

## Overview

An extension is composed of different parts. This page describes the structure of a Chrome extension, the characteristics of each component and what they use to interact. Implementation details are out of the scope of this article. However, each section includes links to articles that contain code samples and further details.

This article assumes you are familiar with Chrome extension development. If not, we recommend reading first [What are extensions?][doc-overview] and [Extensions 101][doc-ext-101].

## Parts of a Chrome extension

### The manifest {: #manifest }

The manifest is the configuration file of a Chrome extension. It is a required JSON file that must be located at the root of the project. It provides the browser with a blueprint of the extension, with important information like:

- The name of the extension, a description of what it does, the current version number, and what icons to use.
- What Chrome APIs the extension requires by declaring API-related keys and a list of permissions.
- Which file is the extension service worker, the popup HTML file, the content scripts, the sites to inject them into, etc. 

The [Manifest keys][doc-manifest] article contains the complete list of default and optional keys. For copy-paste-ready code samples see [Manifest examples][doc-manifest-examples].

### The service worker {: #background_script }

The extension service worker is the event manager of a Chrome extension. It is a script that runs in the background within the context of the browser. Its main role is to listen and respond to browser events; it lies dormant until a browser event is fired and then performs the instructed logic. It listens for browser events such as creating a new tab, adding a new bookmark, installing the extension, clicking on the extension action (toolbar icon), etc.

It has access to all the [Chrome APIs][api-reference], but as a service worker, it doesn't have access to the global window object nor all the standard DOM APIs provided by that object. Also, it cannot interact directly with the content of a website.

To learn more about the extension service worker works, see [Manage events][doc-sw]. 

### Content scripts {: #content-scripts }

Content scripts allow Chrome extensions to interact and modify the pages in the browser. For
example, they can insert a new element on the page, modify the style of a website, modify
a websites' [DOM][mdn-dom] elements, etc. 

Content Scripts share the same origin as the host page and they have access to a limited number of [Chrome APIs][api-reference].

To learn about the different ways to inject a content scripts, see [Understanding content scripts][docs-content-scripts].

### HTML pages

A Chrome extension can include various HTML pages, but none are required.  All extension HTML files can access the [Chrome APIs][section-apis]. They can use script tags to include Javascript files, but cannot declare inline JavaScript. The following are the most common pages:

[The popup][doc-popup]
: The popup is one way a user can interact with the extension. The popup is displayed when a user clicks on the icon toolbar. The popup closes automatically when user navigates away.

[The options page][doc-options]
: The options page allows users to customize the settings of the extension. Users can access the options page in several ways (learn more in [Finding the options page][doc-tbd]).

HTML pages not declared in the manifest
: These pages can be used to onboard users, display an HTML page in a content script iframe, blah blah blah among other.

Other HTML pages include [override Chrome pages][doc-tbd], [sandbox pages][doc-tbd], 

### Other assets

An extension can include icons and fonts. The icons must be declared in the manifest and the fonts must be included in the extension package.

## How these parts interact

### Sending messages

Many times content scripts need information from the extension service worker or the popup needs to send data to the extension service worker. For these cases, either side can listen for messages sent from the other end, and respond on the same channel. You can send a one-time requests or have long-lived connections for exchanging multiple messages.

For more information on how to send these messages, see [Message passing][doc-messages].

### Using the Storage API

The chrome platform provides extensions with an optimized [Storage API][api-storage] that all extension components can access. It includes four separate storage areas for specific use-cases and an event listener that tracks whenever data is updated. For example, when you save changes in the popup, the extension service worker can respond with specified logic.

See [storage API][api-storage] for usage and examples.

### Sharing files


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
[doc-manifest-examples]: /docs/extensions/mv3/manifest#manifest-examples
[doc-messages]: /docs/extensions/mv3/messaging
[doc-options]: /docs/extensions/mv3/options
[doc-sw]: /docs/extensions/mv3/service-worker
[doc-overview]: /docs/extensions/mv3/overview
[doc-popup]: /docs/extensions/mv3/user_interface#popup
[doc-service-worker]: /docs/extensions/mv3/service_workers
[doc-ui]: /docs/extensions/mv3/user_interface
[doc-web-acc-res]: /docs/extensions/mv3/manifest/web_accessible_resources/
[manifest-incognito]: /docs/extensions/mv3/manifest/incognito/
[mdn-dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model

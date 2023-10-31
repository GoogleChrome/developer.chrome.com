---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
seoTitle: "Chrome Extensions architecture overview"
date: 2012-09-18
updated: 2023-05-30
description: A high-level explanation of the architecture of Chrome Extensions.
subhead: A high-level explanation of the structure of a Chrome Extension.
anchorRedirects:
  view_page: /docs/extensions/mv3/options/#view_page
  files: /docs/extensions/mv3/content_scripts/#files
---

## Overview {: #overview }

A Chrome extension is composed of different parts. This page describes the structure of an extension, the role each part plays, and how they work together. It does not describe the code-level details of how to write an extension.

If you are not familiar with Chrome extension development, we recommend first reading [Extensions 101][doc-ext-101] and [Development Basics][doc-dev-basics].

## The structure of a Chrome extension {: #arch }

The following sections describe the files that compose a Chrome extension. Here's an example of a Chrome Extension file structure:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Txq5CxeXjQz7i4wmP8zO.png", alt="An example of a Chrome Extension directory structure", width="400", height="1189" %}
  <figcaption>
  An example of a Chrome extension file structure
  </figcaption>
</figure>

### The manifest {: #manifest }

The manifest (`manifest.json`) is the configuration file of a Chrome extension. It is a required JSON file that must be located at the [root of the project][dev-basics-structure]. It provides the browser with a blueprint of the extension, with important information such as:

- The name of the extension, a description of what it does, the current version number, and what icons to use.
- The [Chrome API][api-ref] keys and [permissions][doc-perms] that the extension needs.
- The files assigned as the extension service worker, the popup HTML file, the options page, the content scripts, etc.

The [Manifest keys][doc-manifest] article contains the complete list of default and optional keys. For ready to use code samples, check out the [Manifest examples][doc-manifest-examples].

### The extension service worker {: #background_script }

An extension service worker (`service-worker.js`) is an event-based script that the browser runs in the background. It is often used to process data, coordinate tasks in different parts of an extension, and as an extension's event manager. For example, the service worker can listen for and react to events when the extension is first installed, a new tab is created, a new bookmark is added, the extension toolbar icon is clicked, etc.

A service worker can access all the [Extension APIs][api-ref], but as a type of [Worker][mdn-worker] it can't use the DOM APIs that a document's global Window object provides. It also runs in its own environment, so it cannot directly modify a web page's content.

See [Handling events in the extension service worker][doc-sw] for more details. 

### Content scripts {: #content-scripts }

Extensions use content scripts (`content-script.js`) to inject code into host pages. They allow the extension to interact with and modify pages in the browser. For example, they can insert a new element on the page, change the style of a website, modify the [DOM][mdn-dom] elements, etc. 

{% Aside 'key-term' %}
*Host pages* are the websites that a content script interacts with. An extension can choose which websites a content script should run on by specifying [match patterns][doc-match].
{% endAside %}

Content Scripts share access to the same DOM tree as the host page but run in a separate JavaScript environment (the extension's [isolated world][cs-isolated]). They also have access to a limited number of [Chrome APIs][api-ref]. See [Understanding content scripts][doc-content-scripts] for more details.

### Extension HTML pages {: #html-files }

An extension can have different HTML pages depending on the design. All extension HTML files can use the [Chrome APIs][api-ref], but cannot include inline Javascript; they must point to a JavaScript file. The two most common HTML pages are:

[The popup][doc-popup]
: Many extensions use a popup (`popup.html`) to provide functionality, such as displaying a list of tabs, or additional information regarding the current tab. Users can easily find it by clicking on the extension toolbar icon. When the user navigates away it will automatically close.

[The options page][doc-options]
: The options page (`options.html`) provides a way for users to customize an extension, such as choosing which sites the extension will run on. Users can access the options page in several ways as described in [Finding the options page][doc-options-view].

[Side panels][api-sidepanel]
: A side panel (`sidepanel.html`) can be used to assist users throughout their browsing journey. Users can find extension side panels by navigating to Chrome's side panel UI or by clicking the extension toolbar icon. Side panels can be configured to only be displayed on specific sites.

Other extension HTML pages include [Chrome override pages][doc-override], [sandbox pages][doc-sandbox] or any custom page included for a specific purpose like onboarding the user.

### Other assets {: #assets }

An extension can include many types of resources, such as images and fonts, but only the [extension icons][manifest-icons] are required for extensions hosted in the [Chrome Web Store][cws]. Also, [Chrome Web Store policy][cws-mv3-req] requires that extensions include all code that the extension executes in the extension's package.

## How they work together {: #interact }

In this section, we will describe how these extension components communicate, store data, and share access to resources.

### Sending messages {: #pageComm }

Many times content scripts, or other extension pages, need to send or receive information from the extension service worker. In these cases, either side can listen for messages sent from the other end, and respond on the same channel. Extensions can send a one-time request or establish a long-lived connection to support multiple messages.

See [Message passing][doc-messages] for more details.

### Storing data {: #data }

Chrome provides extensions with a specialized [Storage API][api-storage], available to all extension
components. It includes four separate storage areas for specific use cases and an event listener
that tracks whenever data is updated. For example, when you save changes in the popup, the extension
service worker can respond with specified logic.

See [Storage API][api-storage] for usage and code samples.

### Referencing extension resources {: #ref-files }

Extension HTML pages can use the same tags as a regular HTML page to add an extension asset. Content
scripts can also access extension resources, such as images and fonts, but require extra steps
which are described in [Accessing extension files in Content Scripts][doc-ref].

## Take the next step {: #next-steps }

Now that you have completed the [Getting Started guides][doc-gs] and understand the structure of a Chrome extension, you are ready to dive deeper with the following resources:

- Learn about the [UI elements][doc-ui] you can use in a Chrome extension.
- Browse a complete list of [Chrome extension capabilities][doc-dev-guide].
- Discover best practices for building [secure extensions][doc-secure] that respect [user privacy][doc-privacy]. 

[api-ref]: /docs/extensions/reference
[api-sidepanel]: /docs/extensions/reference/sidePanel
[api-storage]: /docs/extensions/reference/storage
[cs-isolated]: /docs/extensions/mv3/content_scripts/#isolated_world
[cws-mv3-req]: /docs/webstore/program-policies/mv3-requirements/
[cws]: https://chrome.google.com/webstore/
[dev-basics-structure]: /docs/extensions/mv3/getstarted/development-basics/#structure
[doc-content-scripts]: /docs/extensions/mv3/content_scripts
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-dev-guide]: /docs/extensions/mv3/devguide
[doc-ext-101]: /docs/extensions/mv3/getstarted/extensions-101
[doc-gs]: /docs/extensions/mv3/getstarted
[doc-manifest-examples]: /docs/extensions/mv3/manifest#manifest-examples
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match]: /docs/extensions/mv3/match_patterns/
[doc-messages]: /docs/extensions/mv3/messaging
[doc-options-view]: /docs/extensions/mv3/options#view_page
[doc-options]: /docs/extensions/mv3/options
[doc-override]: /docs/extensions/mv3/override
[doc-overview]: /docs/extensions/mv3/overview
[doc-perms]: /docs/extensions/mv3/declare_permissions/
[doc-popup]: /docs/extensions/mv3/user_interface#popup
[doc-privacy]: /docs/extensions/mv3/user_privacy/
[doc-ref]: /docs/extensions/mv3/content_scripts/#files
[doc-sandbox]: /docs/extensions/mv3/manifest/sandbox/
[doc-secure]: /docs/extensions/mv3/security/
[doc-sw]: /docs/extensions/mv3/service_workers/
[doc-ui]: /docs/extensions/mv3/user_interface
[manifest-icons]: /docs/extensions/mv3/manifest/icons/
[mdn-dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[mdn-worker]: https://developer.mozilla.org/docs/Web/API/Worker
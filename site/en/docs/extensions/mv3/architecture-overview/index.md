---
layout: "layouts/doc-post.njk"
title: "Architecture overview"
date: 2012-09-18
updated: 2022-12-16
description: A high-level explanation of the architecture of Chrome Extensions.
subhead: A high-level explanation of the structure of a Chrome Extension.
---

## Overview {: #overview }

A Chrome extension is composed of different parts. This page describes the structure of an extension, the role each part plays and how they work together. Implementation details are out of the scope of this article.

If you are not familiar with Chrome extension development, we recommend first reading [Extensions 101][doc-ext-101] and [Development Basics][doc-dev-basics].

## The structure of a Chrome extension {: #architecture }

### The manifest {: #manifest }

The manifest is the configuration file of a Chrome extension. It is a required JSON file that must be located at the root of the project. It provides the browser with a blueprint of the extension, with important information such as:

- The name of the extension, a description of what it does, the current version number, and what icons to use.
- The [Chrome APIs][api-ref] keys and [permissions][doc-perms] that the extension needs.
- The files assigned as the extension service worker, the popup HTML file, the options page, the content scripts, etc.

The [Manifest keys][doc-manifest] article contains the complete list of default and optional keys. For copy-paste-ready code samples, check out the [Manifest examples][doc-manifest-examples].

### The service worker {: #background_script }

The extension service worker is the event manager of a Chrome extension. It is a script that runs in the background within the context of the browser. It monitors and responds to events in the browser. For example, when a new tab is created, a new bookmark is added, the extension is installed, the extension toolbar icon is clicked, etc.

It can access all the [Chrome APIs][api-ref], but as a service worker, it can't use the DOM APIs that the global window object provides. It also cannot modify the page's content.

See [Handling events in the extension service worker][doc-sw] for more details. 

### Content scripts {: #content-scripts }

Extensions use content scripts to inject code into host pages. They allow the extension to interact with and modify the pages in the browser. For example, they can insert a new element on the page, change the style of a website, modify the [DOM][mdn-dom] elements, etc. 

Content Scripts share the same origin as their host page and they have access to a limited number of [Chrome APIs][api-ref]. See [Understanding content scripts][doc-content-scripts] for more details.

### Extension HTML pages {: #html-files }

An extension can have different HTML pages depending on the design. All extension HTML files can use the [Chrome APIs][api-ref], but cannot include inline Javascript; they must point to a JavaScript file. The two most common HTML pages are:

[The popup][doc-popup]
: Many extensions use a popup to provide functionality. Users can easily find it by clicking on the extension toolbar icon. When the user navigates away it will automatically close.

[The options page][doc-options]
: The options page provides a way for users to customize an extension. Users can access the options page in several ways as described in [Finding the options page][doc-options-view].

Other extension HTML pages include [Chrome override pages][doc-override], [sandbox pages][doc-sandbox] or any custom page included for a specific purpose like onboarding the user.

### Other assets {: #}

An extension can include many types of resources, but only the [extension icons][manifest-icons] are required. All assets, including images and fonts, must be part of the extension package.

## How they work together {: #interact }

In this section, we will describe how these extension components communicate, store data, and share access to resources.

### Sending messages {: #pageComm }

Many times content scripts, or other extension pages, need to send or receive information from the extension service worker. In these cases, either side can listen for messages sent from the other end, and respond on the same channel. Extensions can send a one-time request or establish a long-lived connection to support multiple messages.

See [Message passing][doc-messages] for more details.

### Storing data {: #data }

Chrome provides extensions with an optimized [Storage API][api-storage] available to all extension components. It includes four separate storage areas for specific use cases and an event listener that tracks whenever data is updated. For example, when you save changes in the popup, the extension service worker can respond with specified logic.

See [Storage API][api-storage] for usage and code samples.

### Referencing extension resources {: #ref-files }

Extension HTML pages can use the same tags as a regular HTML page to add an extension asset, but all resources must be included in the extension bundle. Content Scripts can also access extension resources but require some extra steps described in [Accessing extension files in Content Scripts][doc-ref].

## Take the next step {: #next-steps }

Now that you have completed the [Getting Started guides][doc-gs] and understand the structure of a Chrome extension, you are ready to dive deeper with the following resources:

- Learn about the [UI elements][doc-ui] you can use in a Chrome extension.
- Browse through a complete list of [Chrome extension capabilities][doc-dev-guide].
- Discover best practices for building [secure extensions][doc-secure] that respect [user privacy][doc-privacy]. 

[api-ref]: /docs/extensions/reference
[api-storage]: /docs/extensions/reference/storage
[doc-content-scripts]: /docs/extensions/mv3/content_scripts
[doc-dev-guide]: /docs/extensions/mv3/devguide
[doc-ext-101]: /docs/extensions/mv3/getstarted/extensions-101
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-manifest-examples]: /docs/extensions/mv3/manifest#manifest-examples
[doc-manifest]: /docs/extensions/mv3/manifest
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

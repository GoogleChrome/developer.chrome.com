---
layout: 'layouts/doc-post.njk'
title: 'Extensions 101'
subhead: 'Explore basic concepts of Chrome Extension development.'
description: 'Explore basic concepts of Chrome Extension development.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

Chrome extensions enhance the browsing experience by adding features and functionality to Chrome. This page will briefly introduce extension development concepts and provide [beginner tutorials][section-tutorials] to start your extension development journey. 

## Web technologies {: #web-tech }

Extensions are written with the same web technologies used to create a web application:

* [HTML][mdn-html] is used as a content markup language.
* [CSS](https://web.dev/learn/css/) is used for styling.
* [JavaScript][mdn-js] is used for scripting and logic.
* Extensions can use all the [JavaScript APIs][js-apis] that the browser provides.

<!-- Should we use https://developer.chrome.com/docs/extensions/api_other/ or https://developer.mozilla.org/en-US/docs/Web/API -->

Before moving forward, we recommend you become familiar with these technologies.

## Chrome extension APIs {: #chrome-apis }

What makes extensions more powerful than a web app is their access to various [Chrome APIs][doc-apis]. The following are just a few examples of what extensions can do with these APIs:

* Change the functionality or behavior of a website. 
* Allow users to collect and organize information across websites.
* Add functionality to the Chrome Dev Tools.

For a complete list of APIs, see the [Extension development Overview][doc-dev-overview].

## Extension files {: #extension-files }

Below is a short explanation of the most frequently used extension components:

[The Manifest][doc-manifest]
: The manifest is the only required file. It is a JSON file that records important metadata, defines resources, declares permissions, and identifies which files to run in the background and what files to run on the page.

[The service worker][doc-service-worker]
: The extension service worker handles and listens for browser events, such as navigating to a new page, removing a bookmark, or closing a tab. As a service worker, It lies dormant until an event is fired and then reacts with specified instructions. It can access all the [Chrome APIs][doc-apis], but it cannot directly access the content of web pages; that’s the job of content scripts.

[Content scripts][doc-content-scripts]
: Content scripts can execute Javascript in the context of a web page. They can also read and modify the [DOM][mdn-dom]. Content Scripts can only use a subset of the [Chrome APIs](https://developer.chrome.com/docs/extensions/reference/), but can indirectly access the rest by exchanging messages with the extension service worker.

<!-- Not sure if to include the extension action or extension icons -->
[The extension action][doc-ui-action]
: The extension action controls the toolbar button of the extension. When the user invokes the extension action, it can either display a popup or execute the extension’s primary functionality.  

- Visit [Extensions Architecture][doc-arch] for an overview on extension components.
- Explore [Designing the user interface][doc-ui] for UI and design guidelines for Chrome Extensions.

## Developing your extension {: #development }

Even though web applications and extensions share the same technologies, the developer experience for creating a Chrome extension is different. See [Extension Development Basics](doc-dev-basics) to create a basic Hello World extension and become familiar with the extension development workflow.

## Choosing your extension features {: #quality }

When you are deciding which features your extension will support, make sure your extension fulfills a [single purpose][doc-single-purpose] that is narrowly defined and easy to understand.

## Distributing your extension {: #distribution }

You can register a developer account with the Chrome Web Store to host and distribute your extension. One thing to keep in mind, is that extensions must adhere to the [Chrome Web Store developer policies][doc-cws-policy]. 

Visit [Publish in the Chrome Web Store][doc-cws-publish] to learn how to publish your extension.

## Ready to start building? {: #building }

Choose any of the following step-by-step beginner tutorials to begin your Chrome extension development exploration. 

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |
| [Tabs Manager][tut-tabs-man]     | To create a popup that manages browser tabs.                           |

As a bonus, these tutorials were designed to improve your experience when reading the Chrome Extension and Chrome Web store documentation.


[mdn-js]: https://developer.mozilla.org/docs/Learn/JavaScript
[mdn-html]: https://developer.mozilla.org/docs/Learn/html
[section-tutorials]: #building
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-single-purpose]: /docs/webstore/program_policies/#single-purpose
[doc-service-worker]: /docs/extensions/mv3/service_workers/
[doc-content-scripts]: /docs/extensions/mv3/content_scripts/
[doc-ui-action]: /docs/extensions/mv3/user_interface/#action
[js-apis]: /docs/extensions/api_other/
[doc-apis]: /docs/extensions/reference/
[doc-dev-overview]: /docs/extensions/mv3/devguide
[mdn-dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[tut-reading-time]: https://google.com
[tut-focus-mode]: https://google.com
[tut-tabs-man]: https://google.com
[doc-cws-policy]: /docs/webstore/program_policies/
[doc-cws-publish]: /docs/webstore/publish/
[doc-arch]: /docs/extensions/mv3/architecture-overview/
[doc-ui]: /docs/extensions/mv3/user_interface/
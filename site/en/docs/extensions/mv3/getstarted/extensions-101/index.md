---
layout: 'layouts/doc-post.njk'
title: 'Extensions 101'
subhead: 'Explore basic concepts of Chrome Extension development.'
description: 'Explore basic concepts of Chrome Extension development.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

Chrome extensions enhance the browsing experience by adding features and functionality to Chrome.
This page introduces extension development concepts and provides links to step-by-step
[beginner tutorials][section-tutorials]. 

## Web technologies {: #web-tech }

Extensions are written with the same web technologies used to create web applications:

* [HTML][mdn-html] is used as a content markup language.
* [CSS](https://web.dev/learn/css/) is used for styling.
* [JavaScript][mdn-js] is used for scripting and logic.
* Extensions can use all the [JavaScript APIs][js-apis] that the browser provides.

<!-- Should we use https://developer.chrome.com/docs/extensions/api_other/ or https://developer.mozilla.org/en-US/docs/Web/API -->

Before moving forward, we recommend you become familiar with these technologies.

## Chrome extension APIs {: #chrome-apis }

What makes extensions more powerful than a web app is their access to various [Chrome
APIs][doc-apis]. The following are just a few examples of what extensions can do with these APIs:

* Change the functionality or behavior of a website. 
* Allow users to collect and organize information across websites.
* Add features to the Chrome Dev Tools.

For a complete list of APIs, see the [Extension development Overview][doc-dev-overview].

## Extension files {: #extension-files }

The following are the most frequently used extension files:

[The Manifest][doc-manifest]
: The manifest is the only required file. It is a [JSON][mdn-json] file that records important
metadata, defines resources, declares permissions, and identifies which files to run in the
background and what files to run on the page.

[The service worker][doc-service-worker]
: The extension service worker handles and listens for browser events, such as navigating to a new
page, removing a bookmark, or closing a tab. It can access all the [Chrome APIs][doc-apis], but it
cannot directly access the content of web pages; that’s the job of content scripts.

[Content scripts][doc-content-scripts]
: Content scripts can execute Javascript in the context of a web page. They can also read and modify
the [DOM][mdn-dom]. Content Scripts can only use a subset of the [Chrome APIs][doc-reference], but
can indirectly access the rest by exchanging messages with the extension service worker.

Extension popup and other pages
: An extension can include various html files: a [popup][doc-popup], an [options page][doc-options]
and [other html pages][doc-ext-pages]. All these pages can use [Chrome APIs][doc-apis].

Visit [Extensions Architecture][doc-arch] for a more in-depth description and [Designing the
user interface][doc-ui] for UI and design guidelines for Chrome Extensions.

## Developing your extension {: #development }

Even though web applications and extensions share the same technologies, the developer experience
for creating an extension is different. Check out [Development Basics][doc-dev-basics] to
create a _Hello World_ extension and familiarize yourself with the extension development workflow.

## Designing your extension features {: #quality }

When you start designing your extension and choosing which features to support, make sure it
fulfills a [single purpose][doc-single-purpose] that is narrowly defined and easy to understand.
This will allow your extension to be distributed through the Chrome Web Store.

{% Details %}
{% DetailsSummary %}

**What exactly does "single purpose" mean?**

{% endDetailsSummary %}

"Single purpose" can refer to one of two aspects of an extension:

1. An extension can have a single purpose limited to a narrow _focus area_ or _subject matter_. For
example, "news headlines", "weather", "comparison shopping").

2. Or, an extension can have a single purpose limited to a narrow _browser function_. For example,
"new tab page", "tab management", or "search provider".

Regardless of the extension's purpose, the experience provided by the extension must respect the
user's other settings and preferences.

See [Extension quality guidelines][doc-single-purpose] for additional details.

{% endDetails %}

## Distributing your extension {: #distribution }

You can register a developer account with the [Chrome Web Store][chrome-web-store] to host and distribute your
extension. One thing to keep in mind, is that extensions must adhere to the [Chrome Web Store
developer policies][doc-cws-policy]. 

Visit [Publish in the Chrome Web Store][doc-cws-publish] to learn how to publish your extension.

## 🚀 Ready to start building? {: #building }

Choose any of the following step-by-step beginner tutorials to kick-off your Chrome extension
development journey. 

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager]     | To create a popup that manages browser tabs.                           |

As a bonus, these tutorials were designed to improve your experience when reading the Chrome Extension and Chrome Web store documentation.


[chrome-web-store]: https://chrome.google.com/webstore/
[doc-apis]: /docs/extensions/reference/
[doc-arch]: /docs/extensions/mv3/architecture-overview/
[doc-content-scripts]: /docs/extensions/mv3/content_scripts/
[doc-cws-policy]: /docs/webstore/program_policies/
[doc-cws-publish]: /docs/webstore/publish/
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-dev-overview]: /docs/extensions/mv3/devguide
[doc-ext-pages]: /docs/extensions/mv3/user_interface/
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-options]: /docs/extensions/mv3/user_interface/
[doc-popup]: /docs/extensions/mv3/user_interface/
[doc-reference]: /docs/extensions/reference/
[doc-service-worker]: /docs/extensions/mv3/service_workers/
[doc-single-purpose]: /docs/extensions/mv3/single_purpose/
[doc-single-purpose]: /docs/webstore/program_policies/#single-purpose
[doc-ui]: /docs/extensions/mv3/user_interface/
[js-apis]: /docs/extensions/api_other/
[mdn-dom]: https://developer.mozilla.org/d`ocs/Web/API/Document_Object_Model
[mdn-html]: https://developer.mozilla.org/docs/Learn/html
[mdn-js]: https://developer.mozilla.org/docs/Learn/JavaScript
[mdn-json]: https://developer.mozilla.org/docs/Glossary/JSON
[section-tutorials]: #building
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
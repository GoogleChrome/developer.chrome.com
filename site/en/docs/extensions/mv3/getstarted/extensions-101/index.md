---
layout: 'layouts/doc-post.njk'
title: 'Extensions 101'
seoTitle: 'Chrome Extensions 101'
subhead: 'Explore basic concepts of Chrome extension development.'
description: 'Explore basic concepts of Chrome extension development.'
date: 2022-10-04
# updated: 2022-06-13
---

This page describes what an extension is and provides a brief introduction to Chrome extension development. It also includes links to [beginner tutorials][section-tutorials].

## What are extensions? {: #overview }

Chrome extensions enhance the browsing experience by adding features and functionality to the Chrome
browser, providing things like:

- Productivity tools.
- Web page content enrichment.
- Information aggregation.

These are just a few examples of the many things that extensions can do. Visit the [Chrome Web
Store][chrome-web-store] to see thousands of examples of published extensions.

## Web technologies {: #web-tech }

Extensions are written with the same web technologies used to create web applications:

- [HTML][web-dev-html] is used as a content markup language.
- [CSS][web-dev-css] is used for styling.
- [JavaScript][mdn-js] is used for scripting and logic.

Before moving forward, we recommend that you become familiar with these technologies.

## Chrome extension APIs {: #chrome-apis }

Extensions can use all the [JavaScript APIs](https://developer.mozilla.org/docs/Web/API) that the
browser provides. What makes extensions more powerful than a web app is their access to [Chrome
APIs][doc-apis]. The following are just a few examples of what extensions can do:

- Change the functionality or behavior of a website. 
- Allow users to collect and organize information across websites.
- Add features to Chrome DevTools.

See [Extension development overview][doc-dev-overview] for a complete list of API capabilities.

## Extension files {: #extension-files }

Extensions contain different files, depending on the functionality provided. The following are some
of the most frequently used files:

The manifest 
: The extension's [manifest][doc-manifest] is the only required file that **must** have a specific
file name: `manifest.json` . It also has to be located in the extension's root directory. The
manifest records important metadata, defines resources, declares permissions, and identifies which
files to run in the background and on the page.

The service worker 
: The extension [service worker][doc-service-worker] handles and listens for browser events. There
are many types of events, such as navigating to a new page, removing a bookmark, or closing a tab.
It can use all the [Chrome APIs][doc-apis], but it cannot interact directly with the content of web
pages; that’s the job of content scripts.

Content scripts 
: [Content scripts][doc-content-scripts] execute Javascript in the context of a web page. They
can also read and modify the [DOM][mdn-dom] of the pages they're injected into. Content Scripts can
only use a subset of the [Chrome APIs][doc-reference] but can indirectly access the rest by
exchanging messages with the extension service worker.

The popup and other pages 
: An extension can include various HTML files, such as a [popup][doc-popup], an [options
page][doc-options], and [other HTML pages][doc-ext-pages]. All these pages have access to [Chrome
APIs][doc-apis].

Visit [Extensions Architecture][doc-arch] and [Designing the user interface][doc-ui] to dive deeper.

{% Details %}
{% DetailsSummary %}
💡 **Do all extensions have a popup?**
{% endDetailsSummary %}

Many extensions use a popup to customize the user experience, however this is _not_ required.
For example, the [reading time][tut-reading-time] and [focus mode][tut-focus-mode] extension
tutorials do not include a popup.

{% endDetails %}

## Developing your extension {: #development }

Even though web applications and extensions share many of the same technologies, the extension development
experience is different. Check out [Development Basics][doc-dev-basics] to create a "Hello,
Extensions" example and familiarize yourself with the extension development workflow.

## Designing your extension features {: #quality }

When you start designing your extension and choosing which features to support, make sure it
fulfills a [single purpose][doc-single-purpose] that is narrowly defined and easy to understand.
This will allow your extension to be distributed through the Chrome Web Store.

{% Details %} {% DetailsSummary %}

**💡 What exactly does "single purpose" mean?**

{% endDetailsSummary %}

"Single purpose" can refer to one of two aspects of an extension:

1. An extension can have a single purpose limited to a narrow _focus area_ or _subject matter_. For
example, "news headlines", "weather", "comparison shopping".

2. Or, an extension can have a single purpose limited to a narrow _browser function_. For example,
"new tab page", "tab management", or "search provider".

Regardless of the extension's purpose, the experience provided by the extension must respect the
user's other settings and preferences.

See [Extension quality guidelines][doc-single-purpose] for additional details.

{% endDetails %}

## Distributing your extension {: #distribution }

You can set up a developer account with the [Chrome Web Store][chrome-web-store] to host and
distribute your extension. Bear in mind that extensions must adhere to the [developer program
policies][doc-cws-policy].

See [Publish in the Chrome Web Store][doc-cws-publish] to learn how to distribute your extension.



{% Details %} 
{% DetailsSummary %}

**What if I only want to distribute the extension within my organization?**

{% endDetailsSummary %}

Some organizations use enterprise policies to install extensions on their user's devices. These
extensions may either be fetched from the Chrome Web Store or hosted on the organization's web
servers.
Read about both in [Enterprise publishing options][doc-cws-enterprise].

{% endDetails %}

## 🚀 Ready to start building? {: #building }

Choose any of the following tutorials to begin your extension learning journey. 

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager]     | To create a popup that manages browser tabs.                           |

As a bonus, these tutorials were designed to improve your experience when reading the Chrome
extension and Chrome Web store documentation:

- Reading time adds the expected reading time to each documentation articles.
- Focus mode changes the style of the page to help you concentrate on the documentation content.
- Tabs manager allows you to organize your extension documentation tabs.


[chrome-web-store]: https://chrome.google.com/webstore/
[doc-apis]: /docs/extensions/reference/
[doc-arch]: /docs/extensions/mv3/architecture-overview/
[doc-content-scripts]: /docs/extensions/mv3/content_scripts/
[doc-cws-enterprise]: /docs/webstore/cws-enterprise/
[doc-cws-policy]: /docs/webstore/program-policies/
[doc-cws-publish]: /docs/webstore/publish/
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-dev-overview]: /docs/extensions/mv3/devguide
[doc-ext-pages]: /docs/extensions/mv3/architecture-overview/#html-files
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-options]: /docs/extensions/mv3/options/
[doc-popup]: /docs/extensions/mv3/user_interface/#popup
[doc-reference]: /docs/extensions/reference/
[doc-service-worker]: /docs/extensions/mv3/service_workers/
[doc-single-purpose]: /docs/extensions/mv3/single_purpose/
[doc-ui]: /docs/extensions/mv3/user_interface/
[js-apis]: /docs/extensions/api_other/
[mdn-dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[mdn-js]: https://developer.mozilla.org/docs/Learn/JavaScript
[mdn-json]: https://developer.mozilla.org/docs/Glossary/JSON
[section-tutorials]: #building
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
[web-dev-css]: https://web.dev/learn/css/
[web-dev-html]: https://web.dev/learn/html/


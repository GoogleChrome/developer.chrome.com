---
layout: 'layouts/doc-post.njk'
title: 'Reading time'
subhead: 'Learn how to insert an element on specific pages.'
description: 'Learn how to insert an element on specific pages.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial outlines how to build an extension to add the expected reading to all Chrome extension and Chrome web store documentation pages. 

In this guide, we’re going to cover the following concepts:

- What is the extension manifest
- Which icons should an extension include
- How do content scripts work
- What is a match pattern

You can download the complete source code for this project on [link][gh-reading-time].

## Before you start {: #prereq }

If you have not already, make sure you check out [Development Basics][doc-dev-basics], which covers what to expect during the development of an extension.

This is what the final file structure of this project will look like: 

```text
└── Reading time/
    ├── manifest.json
    ├── scripts/
    │   └── content.js
    └── images/
        ├── icon-16.png
        ├── icon-32.png
        ├── icon-48.png
        └── icon-128.png
```

## Build the extension {: #build }

### Step 1: Add the extension information {: #step-1 }

The `manifest.json` is the only required extension file. It contains important information about the extension; we will continue adding more fields as we go along. For now, create a `manifest.json` file in the root of the project and add the following code to specify the name, description, and version number of the extension:

```json
{
 "manifest_version": 3,
 "name": "Reading time",
 "description": "Add the reading time to the Chrome Extension documentation",
 "version": "1.0"
}
```

{% Details %}
{% DetailsSummary %}
👆 **Learn more about the manifest**
{% endDetailsSummary %}

- The metadata is displayed in the extension manager and the Chrome Web Store listing.
- The manifest [JSON][mdn-json] file does not support comments in the Chrome Web Store.
- The `manifest.json` must always go at the **root** of the project.  


{% endDetails %}

### Step 2: Provide the icons {: #step-2 }

Although [icons][doc-icons] are optional during development, we recommend you include them. They are used in the extension management page, the permissions warning, the Chrome web store, and favicon. Declare the icons in the manifest JSON by adding the following code.


```json
 ...
 "icons": {
   "16": "images/icon-16.png",
   "32": "images/icon-32.png",
   "48": "images/icon-48.png",
   "128": "images/icon-128.png"
 }
 ...
```


ASIDE: Learn more about icon design and best practices.

### Step 3: Declare the content scripts {: #step-3 }

Extensions can run scripts that read and modify the content of the pages. These are called _content scripts_. Add the following code to the manifest.json to load a content script called `content.js`. You can choose which sites this script will be injected into by adding one or more match patterns to an array in the “match” field.


```json
 ...
 "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
  ...
```


ASIDE: Match patterns consist of three parts &lt;scheme>://&lt;host>&lt;path>. They can contain '`*`' characters. Learn more about Match Patterns here.

When the user installs your extension, the browser will let them know which sites your extension will be running on. In this example, the user would see the following permission warning:

_Did you know about relative paths in the manifest?_

All files should be relative to the manifest file and start with a letter, not with a leading “/” or “./”.

### Step 4: Calculate and insert reading time {: #step-4 }

Content scripts use the standard [Document Object Model][w3-dom] (DOM) to read details of the web pages and make changes. Add a folder called **scripts** and in it a file called `content.js`.

Add the following code to find the element that contains the `article` element. Then, create an element that will contain how long it should take to read the content of the article. 


```js
const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
```


ASIDE TIP: [Viewing the DOM][dev-dom] explains how to inspect the DOM  to find out which element you want to query using the Chrome devtools.


## Test that it works {: #try-out }

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development Basics][doc-dev-basics].

### Open an extension documentation {: #open-sites }

Here are a few pages you can open to see how long they will take to read. 

* [Welcome to the Chrome Extension documentation][doc-welcome]
* [Using promises][doc-promises]
* [Understanding Content Scripts][doc-cs]

It should look like this:

<!-- SCREENSHOT -->

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to support any of the following features:

- Add another **match pattern** in the manifest.json to support other [chrome developer][dev-chrome] pages, like the [devtool][devtools] or [workbox][workbox].
- Add a new content script that calculates the reading time on any of your favorite blogs or documentation sites. 

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. 

Continue developing your skills by completing any of the following:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager]     | To create a popup that manages browser tabs.                           |

[dev-chrome]: https://developer.chrome.com/docs/
[devtools]: https://developer.chrome.com/docs/devtools/
[doc-cs]: /docs/extensions/mv3/content_scripts/
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-icons]: /docs/extensions/mv3/manifest/icons/
[doc-promises]: /docs/extensions/mv3/promises/
[tut-focus-mode]: /docs/extensions/mv3/getstarted/focus-mode
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tabs-manager
[doc-welcome]:/docs/extensions/mv3/
[gh-reading-time]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/reading-time
[w3-dom]: https://www.w3.org/TR/DOM-Level-2-HTML/
[workbox]: https://developer.chrome.com/docs/workbox/
[devtools-dom]: https://developer.chrome.com/docs/devtools/dom/
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
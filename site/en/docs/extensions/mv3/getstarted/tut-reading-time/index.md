---
layout: 'layouts/doc-post.njk'
title: 'Reading time'
description: 'Insert an element on a specific set of pages.'
subhead: 'Create your first extension by inserting an element on specific sites.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial build an extension that adds the expected reading time to Chrome
extension and Chrome web store documentation pages. 

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VczSGe8eh0Xv7nTXxhxg.png", 
alt="Reading time extension in the extension Welcome page", width="500", height="116", class="screenshot" %}
  <figcaption>
  Reading time extension on Chrome extension welcome page. 
  </figcaption>
</figure>

In this guide, we’re going to cover the following concepts:

- The extension manifest.
- Recommended icon sizes for extensions.
- Injecting a content script.
- Using match patterns.

## Before you start {: #prereq }

If you have not already, check out [Development Basics][doc-dev-basics] to learn what to expect
during the development of an extension.

The following is the final file structure of this project: 

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

If you rather download the complete source code, it is available on [Github][github-reading-time].

## Build the extension {: #build }

<!-- TODO: Add friendly intro -->

### Step 1: Add information about the extension {: #step-1 }

The manifest JSON file is the only required extension file. It contains important information about
the extension. We'll start by adding the extensions metadata. Create a `manifest.json` file in the
_root_ of the project and add the following code:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles",
  ...
}
```

<!-- Explain more these fields -->

{% Details %}
{% DetailsSummary %}
💡 **Other facts about the extension Manifest**
{% endDetailsSummary %}

- It must be located at the **root** of the project.  
- It only supports comments (`//`) during development, not in the Chrome Web Store.
- The metadata is displayed in the Extension manager and the Chrome Web Store.

{% endDetails %}

### Step 2: Provide the icons {: #step-2 }

So, why do we need icons? Although [icons][doc-icons] are optional during development, we recommend
include them since they will appear in places like the extension management page, the Chrome web
store listing, and others. 

Create an `images` folder and place the icons inside. You can download the icons
on [Github][github-rt-icons]. Add the following code to declare the icons in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
  ...
}
```

We recommend using PNG files, but other file formats are allowed, except for SVG files. Need help
designing your extension icons? Check out the [icon guidelines and best practices][cws-icons].

{% Details %}
{% DetailsSummary %}
💡 **Where do all these icons sizes appear?**
{% endDetailsSummary %}

| Icon Size | Icon Use                                               |
|-----------|--------------------------------------------------------|
| 16x16     | Favicon on the extension's pages and context menu icon.|
| 32x32     | Windows computers often require this size.             |
| 48x48     | Displays on the extension management page.             |
| 128x128   | Displays on installation and in the Chrome Web Store.  |

{% endDetails %}

### Step 3: Declare the content script {: #step-3 }

Extensions can run scripts that read and modify the content of the pages. These are called _content
scripts_. But before we can start writing code, we need to register it. Add the following code to
the `manifest.json` to load a content script called `content.js`.

{% Label %}manifest.json:{% endLabel %}

```json
{
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
}
```

You can choose which sites the script will be injected into by adding one or more match patterns to
an array in the `“matches”` field. Match patterns consist of three parts `<scheme>://<host><path>`.
They can contain '`*`' characters. For more details, see [Match Patterns][doc-match].

When the user installs your extension, the browser will let them know which sites your extension
will be running on. In this example, the user would see the following permission warning:

<!-- Add screenshot with permission warning -->

{% Details %}
{% DetailsSummary %}
💡 **A note on file paths in the manifest**
{% endDetailsSummary %}

All files included in the manifest should be _relative_ to the manifest file and start with the file name,
not with a leading `/` or `./`. 

For instance, if `content.js` was not in a folder, it would be registered like this:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "content_scripts": [
        {
          "js": ["content.js"],
          ...
        }
      ]
}
```

{% endDetails %}

### Step 4: Calculate and insert the reading time {: #step-4 }

Content scripts use the standard [Document Object Model][mdn-dom] (DOM) to read details of the web
pages and make changes. 

Create a new folder called **scripts**. Within it add a file called `content.js`. The following code
first checks if the page contains the `article` element. Then, it counts all the words within the
article and creates an paragraph that displays the total reading time.

{% Label %}content.js:{% endLabel %}

```js
const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
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

{% Details %}
{% DetailsSummary %}
💡 **Interesting JavaScript used in this code**
{% endDetailsSummary %}

- [Regular
  expressions](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions#writing_a_regular_expression_pattern)
  to count only the words.
- [InsertAdjacentElement](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentElement)
 to insert the reading time node after the element.
- [Classlist](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) to add css class
  names to the element class attribute.

{% endDetails %}

## Test that it works {: #try-out }

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development Basics][doc-dev-basics-unpacked].

<!-- Explore including steps as a detail dropdown -->

### Open an extension documentation {: #open-sites }

Here are a few pages you can open to see how long each article  will take to read. 

* [Welcome to the Chrome Extension documentation][doc-welcome]
* [Using promises][doc-promises]
* [Understanding Content Scripts][doc-cs]

It should look like this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VczSGe8eh0Xv7nTXxhxg.png", 
alt="Reading time extension in the extension Welcome page", width="500", height="116", class="screenshot" %}
  <figcaption>
  Extension Welcome page with the Reading time extension
  </figcaption>
</figure>

## 🎯 Potential enhancements {: #challenge }

Based on what you’ve learned today, try to implement any of the following:

- Add another **match pattern** in the manifest.json to support other [chrome developer][dev-chrome]
  pages, like for example, the [devtool][devtools] or [workbox][workbox].
- Add a new content script that calculates the reading time to any of your favorite blogs or
  documentation sites. 

💡 TIP: [Viewing the DOM][devtools-dom] explains how to use the Chrome devtools to find out which element to query for.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. 

Continue developing your skills by completing other tutorials on this series:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                           |

[cws-icons]: /docs/webstore/images/#icons
[dev-chrome]: https://developer.chrome.com/docs/
[devtools-dom]: https://developer.chrome.com/docs/devtools/dom/
[devtools]: https://developer.chrome.com/docs/devtools/
[doc-cs]: /docs/extensions/mv3/content_scripts/
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-icons]: /docs/extensions/mv3/manifest/icons/
[doc-promises]: /docs/extensions/mv3/promises/
[doc-welcome]:/docs/extensions/mv3/
[doc-match]:/docs/extensions/mv3/match_patterns/
[github-reading-time]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/reading-time
[github-rt-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/reading-time/images
[mdn-dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[mdn-json]: https://developer.mozilla.org/docs/Glossary/JSON
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
[workbox]: https://developer.chrome.com/docs/workbox/
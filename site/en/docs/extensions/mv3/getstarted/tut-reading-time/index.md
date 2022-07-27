---
layout: 'layouts/doc-post.njk'
title: 'Reading time'
description: 'Learn how to insert an element on each page.'
subhead: 'Create your first extension that inserts a new element on the page.'
date: 2022-08-10
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that adds the expected reading time to any Chrome extension and
Chrome web store documentation page. 

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VczSGe8eh0Xv7nTXxhxg.png", 
alt="Reading time extension in the extension Welcome page", width="500", height="116", class="screenshot" %}
  <figcaption>
  Reading time extension on the extension's Welcome page. 
  </figcaption>
</figure>

In this guide, we’re going to explain the following concepts:

- The extension manifest.
- What icon sizes an extension uses.
- How to inject code on pages using [content scripts][doc-cs].
- How to use match patterns.
- Extension permissions

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow.

## Build the extension {: #build }

To start, create a new directory called `Reading time` that will hold the extension's files. If you
prefer, you can download the complete source code on [Github][github-reading-time].

### Step 1: Add information about the extension {: #step-1 }

The manifest JSON file is the only required extension file. It holds important information about the
extension. Create a `manifest.json` file in the _root_ of the project and add the following code:

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

These keys contain basic metadata for the extension. It appears in the Extension Management page
and, when published, in the Chrome Web Store listing. To dive deeper, check out the
[`"name"`][man-name], [`"version"`][man-ver] and [`"description"`][man-desc] keys on the
[Manifest][doc-manifest] overview page.

{% Details %}
{% DetailsSummary %}
💡 **Other facts about the extension Manifest**
{% endDetailsSummary %}

- It must be located at the **root** of the project.
- The only required keys are the `"manifest_version"`, `"name"` and `"version"`.
- It supports comments (`//`) during development but not in the Chrome Web Store.

{% endDetails %}

### Step 2: Provide the icons {: #step-2 }

So, why do we need icons? Although [icons][doc-icons] are optional during development, they are
required if you plan to distribute your extension on the Chrome Web Store. They also appear in other
places like the Extension Management page.

Create an `images` folder and place the icons inside. You can download the icons on
[Github][github-rt-icons]. Next, add the following code to declare the icons in the manifest:

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
💡 **Where are these icon sizes displayed?**
{% endDetailsSummary %}

| Icon Size | Icon Use                                               |
|-----------|--------------------------------------------------------|
| 16x16     | Favicon on the extension's pages and context menu icon.|
| 32x32     | Windows computers often require this size.             |
| 48x48     | Displays on the Extension Management page.             |
| 128x128   | Displays on installation and in the Chrome Web Store.  |

{% endDetails %}

### Step 3: Declare the content script {: #step-3 }

Extensions can run scripts that read and modify the content of the pages. These are called _content
scripts_. Add the following code to the `manifest.json` to register a content script called
`content.js`.

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
}
```

The `“matches”` field can have one or more [match patterns][doc-match]. These allow the browser to
identify which sites to inject the content scripts into. Match patterns consist of three parts
`<scheme>://<host><path>`. They can contain '`*`' characters.

{% Details %}
{% DetailsSummary %}
💡 **Does this extension display a permission warning?**
{% endDetailsSummary %}

When a user installs an extension, the browser informs them what the extension has the capacity to
do. Content scripts request permission to run on the sites that meet the match pattern criteria. 

In this example, the user would see the following permission warning:
<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/rKDdOyri9x8VkhTEXbO6.png", alt="Permission warning the user will see when installing the Reading time extension", width="338", height="175", class="screenshot" %}
  <figcaption>
  Reading time permission warning. 
  </figcaption>
</figure>

To dive deeper on extension permissions, see [Declaring permissions and warn users][doc-perms]. 

{% endDetails %}

### Step 4: Calculate and insert the reading time {: #step-4 }

Content scripts can use the standard [Document Object Model][mdn-dom] (DOM) to read and change the
content of a page. The extension will first check if the page contains the `<article>` element.
Then, it will count all the words within this element and create a paragraph that displays the total
reading time.

Create a new folder called `scripts`. Add a file called `content.js` and include the following code: 

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
  are used to count only the words inside the `<article>` element.
- [InsertAdjacentElement()](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentElement)
 is used to insert the reading time node after the element.
- The [Classlist](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) property is
  used to add CSS class names to the element class attribute.

{% endDetails %}

## Test that it works {: #try-out }

Verify that the file structure of your project looks like the following: 

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

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics-unpacked].

### Open an extension or Chrome Web Store documentation {: #open-sites }

Here are a few pages you can open to see how long each article will take to read. 

- [Welcome to the Chrome Extension documentation][doc-welcome]
- [Publish in the Chrome Web Store][cws-publish]
- [Understanding Content Scripts][doc-cs]

It should look like this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VczSGe8eh0Xv7nTXxhxg.png", 
alt="Reading time running on the Welcome page", 
width="500", height="116", class="screenshot" %}
  <figcaption>
  Extension Welcome page with the Reading time extension
  </figcaption>
</figure>

## 🎯 Potential enhancements {: #challenge }

Based on what you’ve learned today, try to implement any of the following:

- Add another **match pattern** in the manifest.json to support other [chrome developer][dev-chrome]
  pages, like for example, the [Chrome devtools][devtools] or [workbox][workbox].
- Add a new content script that calculates the reading time to any of your favorite blogs or
  documentation sites. 

{% Aside %}

💡 **HINT**: You can use the Devtools to [inspect DOM elements][devtools-dom].

{% endAside %}

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue np your skills by completing other
tutorials on this series:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                           |

[cws-icons]: /docs/webstore/images/#icons
[cws-publish]: /docs/webstore/publish/
[dev-chrome]: https://developer.chrome.com/docs/
[devtools-dom]: https://developer.chrome.com/docs/devtools/dom/
[devtools]: https://developer.chrome.com/docs/devtools/
[doc-cs]: /docs/extensions/mv3/content_scripts/
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-icons]: /docs/extensions/mv3/manifest/icons/
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-match]:/docs/extensions/mv3/match_patterns/
[doc-promises]: /docs/extensions/mv3/promises/
[doc-welcome]:/docs/extensions/mv3/
[doc-perms]:/docs/extensions/mv3/permission_warnings/
[github-reading-time]:
    https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/reading-time
[github-rt-icons]:
    https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/reading-time/images
[man-desc]: /docs/extensions/mv3/manifest/description
[man-name]: /docs/extensions/mv3/manifest/name/
[man-ver]: /docs/extensions/mv3/manifest/version
[mdn-dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[mdn-json]: https://developer.mozilla.org/docs/Glossary/JSON
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
[workbox]: /docs/workbox/
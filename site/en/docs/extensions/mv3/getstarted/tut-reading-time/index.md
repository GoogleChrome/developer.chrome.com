---
layout: 'layouts/doc-post.njk'
title: 'Run scripts on every page'
seoTitle: 'Chrome Extensions Tutorial: Reading time'
description: 'Learn how to automatically add new elements to existing webpages.'
subhead: 'Create your first extension that inserts a new element on the page.'
date: 2022-10-04
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that adds the expected reading time to any Chrome extension and
Chrome Web Store documentation page. 

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VczSGe8eh0Xv7nTXxhxg.png", 
alt="Reading time extension in the extension's Welcome page", width="500", height="116", class="screenshot" %}
  <figcaption>
  Reading time extension on the extension's Welcome page. 
  </figcaption>
</figure>

In this guide, we’re going to explain the following concepts:

- The extension manifest.
- What icon sizes an extension uses.
- How to inject code into pages using [content scripts][doc-cs].
- How to use match patterns.
- Extension permissions.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow.

## Build the extension {: #build }

To start, create a new directory called `reading-time` to hold the extension's files. If you
prefer, you can download the complete source code from [GitHub][github-reading-time].

### Step 1: Add information about the extension {: #step-1 }

The manifest JSON file is the only required file. It holds important information about the
extension. Create a `manifest.json` file in the _root_ of the project and add the following code:

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles"
}
```

These keys contain basic metadata for the extension. They control how the extension appears on the Extensions page and, when published, on the Chrome Web Store. To dive deeper, check out the
[`"name"`][man-name], [`"version"`][man-ver] and [`"description"`][man-desc] keys on the
[Manifest][doc-manifest] overview page.

{% Details %}
{% DetailsSummary %}
💡 **Other facts about the extension manifest**
{% endDetailsSummary %}

- It must be located at the **root** of the project.
- The only required keys are the `"manifest_version"`, `"name"`, and `"version"`.
- It supports comments (`//`) during development, but these must be removed before uploading your code to the Chrome Web Store.

{% endDetails %}

### Step 2: Provide the icons {: #step-2 }

So, why do we need icons? Although [icons][doc-icons] are optional during development, they are
required if you plan to distribute your extension on the Chrome Web Store. They also appear in other
places like the Extensions page.

Create an `images` folder and place the icons inside. You can download the icons on
[GitHub][github-rt-icons]. Next, add the highlighted code to your manifest to declare icons:

```json/2-7
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

We recommend using PNG files, but other file formats are allowed, except for SVG files.

{% Details %}
{% DetailsSummary %}
💡 **Where are these differently-sized icons displayed?**
{% endDetailsSummary %}

| Icon size | Icon use                                               |
|-----------|--------------------------------------------------------|
| 16x16     | Favicon on the extension's pages and context menu icon.|
| 32x32     | Windows computers often require this size.             |
| 48x48     | Displays on the Extensions page.             |
| 128x128   | Displays on installation and in the Chrome Web Store.  |

{% endDetails %}

### Step 3: Declare the content script {: #step-3 }

Extensions can run scripts that read and modify the content of a page. These are called _content
scripts_. They live in an [isolated world][doc-isolated], meaning they can make changes to their JavaScript environment without conflicting with their host page or other extensions' content scripts.

Add the following code to the `manifest.json` to register a content script called
`content.js`.

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

The `"matches"` field can have one or more [match patterns][doc-match]. These allow the browser to
identify which sites to inject the content scripts into. Match patterns consist of three parts
`<scheme>://<host><path>`. They can contain '`*`' characters.

{% Details %}
{% DetailsSummary %}
💡 **Does this extension display a permission warning?**
{% endDetailsSummary %}

When a user installs an extension, the browser informs them what the extension can do. Content scripts request permission to run on sites that meet the match pattern criteria. 

In this example, the user would see the following permission warning:
<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/rKDdOyri9x8VkhTEXbO6.png", 
alt="Permission warning the user will see when installing the Reading time extension", width="338", height="175", class="screenshot" %}
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

Create a file called `content.js` inside a folder called `scripts` and add the following code: 

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
  expressions][mdn-regular-expressions] used to count only the words inside the `<article>` element.
- [InsertAdjacentElement()][mdn-insert-adjacent] used to insert the reading time node after the element.
- The [Classlist][mdn-classlist] property used to add CSS class names to the element class attribute.
- [Optional chaining][mdn-optional-chaining] used to access an object property that may be undefined or null.
- [Nullish coalescing][mdn-nullish-coalescing] returns the `<heading>` if the `<date>` is null or undefined.

{% endDetails %}

## Test that it works {: #try-out }

Verify that the file structure of your project looks like the following: 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/clhDe13hHGwiNyuRczzk.png", 
alt="The contents of the reading time folder: manifest.json, content.js in scripts folder, and images folder.", width="700", height="294" %}

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
  pages, like for example, the [Chrome DevTools][devtools] or [Workbox][workbox].
- Add a new content script that calculates the reading time to any of your favorite blogs or
  documentation sites. 

{% Aside %}

💡 **HINT**: You can use the DevTools to [inspect DOM elements][devtools-dom].

{% endAside %}

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue building your skills by completing other
tutorials on this series:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                           |


## Continue exploring

We hope you enjoyed building this Chrome extension and are excited to continue your Chrome
development learning journey. We recommend the following learning path:

- The [Chrome Extension Architecture][doc-overview] backs up a bit and fills in a lot of detail
  about the Extensions architecture in general.
- The [developer's guide][doc-devguide] has dozens of additional links to pieces of documentation
  relevant to advanced extension creation.
- Extensions have access to powerful APIs beyond what's available on the open web.
  The [Chrome APIs documentation][doc-apis] walks through each API.

[cws-publish]: /docs/webstore/publish/
[dev-chrome]: https://developer.chrome.com/docs/
[devtools-dom]: https://developer.chrome.com/docs/devtools/dom/
[devtools]: https://developer.chrome.com/docs/devtools/
[doc-apis]: /docs/extensions/reference
[doc-cs]: /docs/extensions/mv3/content_scripts/
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-devguide]: /docs/extensions/mv3/devguide/
[doc-icons]: /docs/extensions/mv3/manifest/icons/
[doc-isolated]: /docs/extensions/mv3/content_scripts/#isolated_world
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-match]:/docs/extensions/mv3/match_patterns/
[doc-overview]: /docs/extensions/mv3/architecture-overview/
[doc-perms]:/docs/extensions/mv3/permission_warnings/
[doc-promises]: /docs/extensions/mv3/promises/
[doc-welcome]:/docs/extensions/mv3/
[github-reading-time]:https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.reading-time
[github-rt-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.reading-time/images
[man-desc]: /docs/extensions/mv3/manifest/description
[man-name]: /docs/extensions/mv3/manifest/name/
[man-ver]: /docs/extensions/mv3/manifest/version
[mdn-classlist]: https://developer.mozilla.org/docs/Web/API/Element/classList
[mdn-dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[mdn-insert-adjacent]: https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentElement
[mdn-json]: https://developer.mozilla.org/docs/Glossary/JSON
[mdn-nullish-coalescing]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
[mdn-optional-chaining]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Optional_chaining
[mdn-regular-expressions]: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions#writing_a_regular_expression_pattern
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
[workbox]: /docs/workbox/

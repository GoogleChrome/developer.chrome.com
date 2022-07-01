---
layout: 'layouts/doc-post.njk'
title: 'Tabs Manager'
subhead: 'Build a tabs manager for the extension docs.'
description: 'Learn how to create a tabs manager.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial will build an extension that displays a list of all the open tabs of the extension and
web store documentation pages in a popup. 

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8q5ps3dqw4p2BOZRpIJT.png", 
alt="Tabs Manager extension popup", width="600", height="230", class="screenshot" %}
  <figcaption>
  Tabs Manager extension popup
  </figcaption>
</figure>

In this guide, we’re going to cover the following concepts

- How to create an extension popup.
- How to query tabs.
- How to change the focus of the tab.
- How to move all tabs to the same window and group them.

## Before you start {: #prereq }

If you have not already, make sure you check out [Development Basics][doc-dev-basics], which covers
what to expect during the development of an extension.

This is what the final file structure of this project will look like: 

```text
└── Tabs-manager/
    ├── manifest.json
    ├── popup.js
    ├── popup.css
    ├── popup.html
    └── images/
        ├── icon-16.png
        ├── icon-32.png
        ├── icon-48.png
        └── icon-128.png
```

If you rather download the complete source code, it is available on [Github][github-tabs-manager].

## Build the extension {: #build }

<!-- Intro here? -->

### Step 1: Add the extension data and icons {: #step-1 }

Create a file called `manifest.json` and include the following code:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "manifest_version": 3,
  "name": "Tab Manager for Google Dev Docs",
  "version": "1.0",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  ...
}
```

These manifest keys are explained in more detail in the [Reading time
tutorial][tut-reading-time-step2]. 

Create an `images/` folder and place the icons inside. You can download the icons
[here][github-tabs-manager-icons].

### Step 2: Create and style the popup {: #step-2 }

The [Action][api-action] API controls the extension action (toolbar icon), which, in this case will
open a popup that will display a list of open tabs. Declare the popup in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "action": {
    "default_popup": "popup.html"
  },
  ...
}
```
<!-- TENTATIVE: Did you know the extension action can also execute some code? Learn more about this in the Focus Mode tutorial -->
A popup is very similar to a web page with one exception; it can contain links to stylesheets and
script tags, but can't run inline JavaScript. Create a popup HTML file and add the following code:

{% Label %}popup.html:{% endLabel %}

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./popup.css" />
  </head>
  <body>
    <template id="li_template">
      <li>
        <a>
          <h3 class="title">Tab Title</h3>
          <p class="pathname">Tab Pathname</p>
        </a>
      </li>
    </template>

    <h1>Google Dev Docs</h1>
    <button>Group Tabs</button>
    <ul></ul>

    <script src="./popup.js" type="module"></script>
  </body>
</html>
```

💡 Adding “type: module” to the script tag allows us to use [top level await][mdn-top-level] in the popup.js file.

Now let's style the popup. Create a popup CSS file and include the following code:

{% Label %}popup.css:{% endLabel %}

```css
body {
  width: 20rem;
}

ul {
  list-style-type: none;
  padding-inline-start: 0;
  margin: 1rem 0;
}

li {
  padding: 0.25rem;
}
li:nth-child(odd) {
  background: #80808030;
}
li:nth-child(even) {
  background: #ffffff;
}

h3,
p {
  margin: 0;
}
```

### Step 3: Manage the tabs {: #step-3 }

#### Query the tabs {: #query }

This example only displays a list of extension and the web store pages; use the `tabs.query()`to
retrieve only tabs from these URLs call. Create a popup JS file and add the following code:

{% Label %}popup.js:{% endLabel %}

```js
const tabs = await chrome.tabs.query({
  url: [
    "https://developer.chrome.com/docs/webstore/*",
    "https://developer.chrome.com/docs/extensions/*",
  ],
});
...
```

{% Details %}
{% DetailsSummary %}
💡 **Can I use Chrome APIs directly in the popup?**
{% endDetailsSummary %}

A popup and other extension pages have direct access to any of the Chrome APIs because they are
served from the chrome schema. For example `chrome-extension://EXTENSION_ID/popup.html`.
<!-- Consider explaining how the session starts and ends when the popup opens and closes  -->
{% endDetails %}

#### Request narrow permissions {: #narrow }

To protect user privacy, we are requesting narrow host permissions, which will give us access to the
title and URL of **specific sites**. Add the following code to the manifest JSON file:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "host_permissions": [
    "https://developer.chrome.com/*"
  ],
  ...
}
```
<!-- A Note on permission warnings -->
The user will only see the following permission warning when installing your extension:

Read and change your data on `developer.chrome.com`

{% Details %}
{% DetailsSummary %}
💡 **Why are we not requesting "tabs" permission?**
{% endDetailsSummary %}

The `"tabs"` permission grants access to the URL, title, favicon, and pendingURL of **all** the open tabs.
When you don't require access to browsing data of every tab, we recommend requesting narrow host permissions instead.

{% endDetails %}

#### Focus on a tab {: #focus}

First, let’s sort the list of tabs alphabetically to make it easier to locate an item. When you
click on a list item, the extension will focus on the tab using `tabs.update()` and bring to the window to the front using `windows.update()`. Add the following code to popup.js:

{% Label %}popup.js:{% endLabel %}

```js
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split("-")[0].trim();
  const pathname = new URL(tab.url).pathname.slice("/docs".length);

  element.querySelector(".title").textContent = title;
  element.querySelector(".pathname").textContent = pathname;
  element.querySelector("a").addEventListener("click", async () => {
    // need to focus window as well as the active tab
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}
document.querySelector("ul").append(...elements);
...
```

{% Details %}
{% DetailsSummary %}
💡 **Interesting JavaScript used in this code**
{% endDetailsSummary %}

- [Collator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) to sort the tabs array by title in any language.
- The [template tag](https://web.dev/webcomponents-template/) to
  define an html element that can be cloned, instead of creating each list item with `document.createElement()`.
- The [URL constructor](https://developer.mozilla.org/docs/Web/API/URL/URL) to create and parse URLs.

{% endDetails %}

#### Group the tabs {: #group}

Add the following code to create a button that will group all the tabs using [`tabs.group()`]() and move them
into the current window.

{% Label %}popup.js:{% endLabel %}

```js
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const group = await chrome.tabs.group({ tabIds: tabs.map(({ id }) => id) });
  await chrome.tabGroups.update(group, { title: "DOCS" });
});
```

The [TabGroups][api-tabgroups] API allows the extension to name the group and choose a background color. This API
requires the `“tabGroups”` permission in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": [
    "tabGroups"
  ]
}
```

## Test that it works {: #try-out }

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics].

### Open a few documentation pages {: #open-sites}

First, we have to open a few extension and web store docs. Open the following docs in different windows:

<!-- <TODO Add links to doc pages> -->

Click on the popup. It should look like this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8q5ps3dqw4p2BOZRpIJT.png", 
alt="Tabs Manager extension popup", width="600", height="230", class="screenshot" %}
  <figcaption>
  Tabs Manager extension popup
  </figcaption>
</figure>

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to add any of the following features:

- Modify the CSS stylesheet.
- Change the color and title of the tab group.
- Manage the tabs of another documentation site.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. 

Continue developing your skills by completing other tutorials on this series:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |

## Continue exploring

You finished creating three extensions that have helped kick-off your extension development journey. We
hope you continue using these extensions to improve your experience as you learn more
advanced Chrome extension concepts.

<!-- WIP: ideas https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next_#continue_your_learning_experience -->

To level up your extension skills, we recommend the following learning path:
 
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[github-tabs-manager-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/tabs-manager/images
[github-tabs-manager]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/tabs-manager
[mdn-top-level]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await#top_level_await
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time-step2]: /docs/extensions/mv3/getstarted/tut-reading-time#step-2
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[api-tabs]: /docs/extensions/reference/tabs
[api-action]: /docs/extensions/reference/action
[api-tabgroups]: /docs/extensions/reference/tabGroups
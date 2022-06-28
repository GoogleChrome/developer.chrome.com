---
layout: 'layouts/doc-post.njk'
title: 'Tabs Manager'
subhead: 'Build a tabs manager for the extension docs.'
description: 'Learn how to create a tabs manager.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial will build an extension that displays a list of all the open tabs of the extension and web store pages. 

In this guide, we’re going to cover the following concepts

- How to create an extension popup.
- How to query tabs.
- Show how to change tab focus.
- Demonstrate how to move all tabs to the same window and group them.

You can download the complete source code for this project on [link][github]

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

## Build the extension {: #build }

<!-- Intro here? -->

### Step 1: Add the extension information and icons {: #step-1 }

Create a file called manifest.json and include the following code.

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

These manifest keys are explained in more detail in the [Reading mode tutorial][link to reading mode
manifest information]. 

Create an “images” folder and place the icons inside. You can download the icons here.

### Step 2: Create and style the popup {: #step-2 }

An extension popup appears when the user clicks on the extension action. This extension will use a popup to display a list of open tabs. In the manifest.json, add the following code to declare the popup and action icons.

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

A popup is very similar to a web page with one exception; it can contain links to stylesheets and script tags, but
can't run inline JavaScript. Create a popup.html file and add the following code:

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

TIP: Adding “type: module” to the script tag allows us to use [top level await][mdn-top-level] in the popup.js file.

Now let's style the popup. Create a popup.css file and include the following code:

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

This example only collects the tabs for the extension and the web store documentation pages; to retrieve only pages from these URLs call `tabs.query()`. Create a popup.js file and add the following code:

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

Did you know...

...a popup and other extension pages have direct access to any of the Chrome APIs.

#### Request narrow permissions {: #narrow}

So what kind of permissions do you think we need to use this API? The first permission that comes to mind is the "tabs" since we are using the Tabs API. This permission grants access to the URL, title, favicon, and pendingURL of **all** the open tabs of any URL.

In our case, we only need access to the title and URL of **specific sites**. So to protect user privacy, we are going to request narrow host permissions instead. Add the following code to the manifest.json file:

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

The user will only see the following permission warning when installing your extension:

Read and change your data on `developer.chrome.com`

#### Focus on a tab {: #focus}

First, let’s sort the list of tabs alphabetically to make it easier to locate an item. When you click on a list item, the extension will go to that window and focus on that tab. Add the following code to popup.js:

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
    // need to focus window as well as activate tab
    await chrome.windows.update(tab.windowId, { focused: true });
    await chrome.tabs.update(tab.id, { active: true });
  });

  elements.add(element);
}
document.querySelector("ul").append(...elements);
...
```

<!-- What is the Collator?
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
-->


#### Group the tabs {: #group}

In the popup.js. add the following code to add a button that will group all the tabs and move them into the current window.

{% Label %}popup.js:{% endLabel %}

```js
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const group = await chrome.tabs.group({ tabIds: tabs.map(({ id }) => id) });
  await chrome.tabGroups.update(group, { title: "DOCS" });
});
```

In this example, we use the tabGroups API to name the group “DOCS”. This API requires the “tabGroups” permissions in the manifest:

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

To load an unpacked extension in developer mode, follow the steps in [Development Basics][doc-dev-basics].

### Open a few documentation pages {: #open-sites}

First, we have to open a few extension and web store docs. Open the following docs in different windows:

<!-- <TODO Add links to doc pages> -->

Click on the popup. It should look like this:

<!-- <SCREENSHOT GOES HERE> -->

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to add any of the following features:

- Modify the CSS stylesheet.
- Sort the items by most recently visited.
- Manage the tabs of another documentation site.


## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue developing your skills by completing any of the following tutorials:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page when clicking on the extension action. |

## Continue exploring

Congrats! You just completed three extensions that have helped you better understand Chrome extensions. Plus, you can continue using these extensions as you explore more advanced concepts in the extension docs.

<!-- WIP: ideas https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next_#continue_your_learning_experience -->

To level up your extension skills
 
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[mdn-top-level]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await#top_level_await
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time


---
layout: 'layouts/doc-post.njk'
title: 'Tabs Manager'
subhead: 'Build your first tabs manager.'
description: 'Learn how to create a tabs manager.'
date: 2022-08-10
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds a tabs manager for Chrome extension and Chrome Web store documentation pages.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8q5ps3dqw4p2BOZRpIJT.png", 
alt="Tabs Manager extension popup", width="500", height="230", class="screenshot" %}
  <figcaption>
  Tabs Manager extension
  </figcaption>
</figure>

In this guide, we’re going to explain how to do the following:

- Create an extension popup using the **Action API**.
- Query for specific tabs using the **Tabs API**.
- Preserve user privacy through narrow host permissions.
- Change the focus of the tab.
- Move tabs to the same window and group them.
- Rename tabs group using the **GroupTabs API**.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow.

## Build the extension {: #build }

To start, create a new directory called `Tabs Manager` that will hold the extension's files. If you
prefer, you can download the complete source code on [Github][github-tabs-manager].

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
tutorial][tut-reading-time-step1]. 

Create an `images` folder and place the icons inside. You can download the icons
[here][github-tabs-manager-icons].

### Step 2: Create and style the popup {: #step-2 }

The [Action][api-action] API controls the extension action (toolbar icon). When the user clicks on
the extension action, it will either run some code or open a popup, like in this case. Start by
declaring the popup in the manifest:

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

A popup is similar to a web page with one exception: it can't run inline JavaScript. Create a popup
HTML file and add the following code:

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

{% Aside %}

💡 **TIP**: You can use [top level await][mdn-top-level] by adding `type="module”` to the script
tag.

{% endAside %}

Next, let's style the popup. Create a popup CSS file and include the following code:

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

The [Tabs API][api-tabs] allows an extension to create, query, modify, and rearrange tabs in the
browser.

#### Request permission {: #narrow }

Many features in the Tabs API do not require any permissions to use. However, in our case, we need
to declare a permission to access two sensitive properties: the `title` and the `URL`. 

We could request `"tabs"` permission, which would allow us to see the sensitive properties of all
the browser tabs. However, to protect user privacy, we will request narrow [host
permissions][doc-match], giving us access _only_ to the title and URL of **specific sites**.

Add the following code to the manifest JSON file:

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

#### Query the tabs {: #query }

You can retrieve the tabs from specific URLs using the `tabs.query()` method. Create a `popup.js`
file and add the following code:

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

A popup and other extension pages can call any [Chrome API][doc-apis] because they are served from the
chrome schema. For example `chrome-extension://EXTENSION_ID/popup.html`.

{% endDetails %}

#### Focus on a tab {: #focus}

First, the extension will sort the list alphabetically. Then, when a list item is clicked, it will
focus on that tab using `tabs.update()` and bring the window to the front using `windows.update()`.
Add the following code to `popup.js`:

{% Label %}popup.js:{% endLabel %}

```js
...
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

- The [Collator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) is used to sort the tabs array by title in any language.
- The [template tag](https://web.dev/webcomponents-template/) is used to
  define an HTML element that can be cloned instead of using `document.createElement()` to create each item.
- The [URL constructor](https://developer.mozilla.org/docs/Web/API/URL/URL) is used to create and parse URLs.

{% endDetails %}

#### Group the tabs {: #group}

Add the following code to create a button that will group all the tabs using [`tabs.group()`]() and
move them into the current window.

{% Label %}popup.js:{% endLabel %}

```js
...
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const group = await chrome.tabs.group({ tabIds: tabs.map(({ id }) => id) });
  await chrome.tabGroups.update(group, { title: "DOCS" });
});
```

The [TabGroups][api-tabgroups] API allows the extension to name the group and choose a background
color. Add the `“tabGroups”` permission to the manifest by adding the following code:

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

Verify that the file structure of your project looks like the following: 

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

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics-unpacked].

### Open a few documentation pages {: #open-sites}

Open the following docs in different windows:

- [Design the user interface][doc-ui]
- [Discovery on the Chrome Web Store][cws-discovery]
- [Extension development overview][doc-devguide]
- [Manifest file format][doc-manifest]
- [Publish in the Chrome Web Store][cws-publish]
- [Welcome to Chrome Extension Development][doc-welcome]


Click on the popup. It should look like this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8q5ps3dqw4p2BOZRpIJT.png", 
alt="Tabs Manager extension popup", width="600", height="230", class="screenshot" %}
  <figcaption>
  Tabs Manager extension popup
  </figcaption>
</figure>

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to implement any of the following:

- Improve the popup stylesheet.
- Change the color and title of the tab group.
- Manage the tabs of another documentation site.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue developing your skills by completing other
tutorials on this series:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |

## Continue exploring

We hope you enjoyed building these Chrome extensions and are excited to continue your Chrome
development learning journey. We recommend the following learning path:

- The [Chrome Extension Architecture][doc-overview] backs up a bit and fills in a lot of detail
  about the Extensions architecture in general.
- The [developer's guide][doc-devguide] has dozens of additional links to pieces of documentation
  relevant to advanced extension creation.
- Chrome Extensions have access to powerful APIs above and beyond what's available on the open web.
  The [chrome.\* APIs documentation][doc-apis] will walk through each API.

[api-action]: /docs/extensions/reference/action
[api-tabgroups]: /docs/extensions/reference/tabGroups
[api-tabs]: /docs/extensions/reference/tabs
[cws-discovery]: /docs/webstore/discovery/
[cws-publish]: /docs/webstore/publish
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-apis]: /docs/extensions/reference
[doc-match]: /docs/extensions/mv3/match_patterns/
[doc-devguide]: /docs/extensions/mv3/devguide/
[doc-overview]: /docs/extensions/mv3/architecture-overview/
[doc-ui]: /docs/extensions/mv3/user_interface/
[doc-welcome]: /docs/extensions/mv3/
[github-tabs-manager-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/tabs-manager/images
[github-tabs-manager]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/tabs-manager
[mdn-top-level]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await#top_level_await
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time-step1]: /docs/extensions/mv3/getstarted/tut-reading-time#step-1
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
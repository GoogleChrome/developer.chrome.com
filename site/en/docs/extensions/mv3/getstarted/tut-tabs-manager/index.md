---
layout: 'layouts/doc-post.njk'
title: 'Manage tabs'
subhead: 'Build your first tabs manager.'
description: 'Learn how to programmatically organize tabs using tab groups.'
date: 2022-10-04
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds a tabs manager to organize your Chrome extension and Chrome Web store documentation tabs.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8q5ps3dqw4p2BOZRpIJT.png", 
alt="Tabs Manager extension popup", width="500", height="230", class="screenshot" %}
  <figcaption>
  Tabs Manager extension
  </figcaption>
</figure>

In this guide, we’re going to explain how to do the following:

- Create an extension popup using the [Action][api-action] API.
- Query for specific tabs using the [Tabs][api-tabs] API.
- Preserve user privacy through narrow host permissions.
- Change the focus of the tab.
- Move tabs to the same window and group them.
- Rename tab groups using the [TabGroups][api-tabgroups] API.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow.

## Build the extension {: #build }

To start, create a new directory called `tabs-manager` to hold the extension's files. If you
prefer, you can download the complete source code on [GitHub][github-tabs-manager].

### Step 1: Add the extension data and icons {: #step-1 }

Create a file called `manifest.json` and add the following code:

```json
{
  "manifest_version": 3,
  "name": "Tab Manager for Chrome Dev Docs",
  "version": "1.0",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
}
```

To learn more about these manifest keys, check out the Reading time tutorial that explains the extension's [metadata][tut-reading-time-step1] and [icons][tut-reading-time-step2] in more detail.

Create an `images` folder then [download the icons][github-tabs-manager-icons] into it.

### Step 2: Create and style the popup {: #step-2 }

The [Action][api-action] API controls the extension action (toolbar icon). When the user clicks on
the extension action, it will either run some code or open a popup, like in this case. Start by
declaring the popup in the `manifest.json`:

```json
{
  ...
  "action": {
    "default_popup": "popup.html"
  },
  ...
}
```

A popup is similar to a web page with one exception: it can't run inline JavaScript. Create a `popup.html` file and add the following code:

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

💡 **TIP**: You can use [top level await][mdn-top-level] by adding `type="module"` to the script
tag.

{% endAside %}

Next, let's style the popup. Create a `popup.css` file and add the following code:

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

Many methods in the Tabs API can be used without requesting any permission. However, we need access to the `title` and the `URL` of the tabs; these sensitive properties require permission. We could request `"tabs"` permission, but this would give access to the sensitive properties of **all** tabs. Since we are only managing tabs of a specific site, we will request narrow host permissions. 

Narrow [host permissions][doc-match] allow us to protect user privacy by granting elevated permission to **specific sites**. This will grant access to the `title`, and `URL` properties, as well as additional capabilities. Add the highlighted code to the `manifest.json` file:

```json/2-4
{
  ...
  "host_permissions": [
    "https://developer.chrome.com/*"
  ],
  ...
}
```

{% Details %}
{% DetailsSummary %}
💡 **What are the main differences between the tabs permission and host permissions?**
{% endDetailsSummary %}

Both the `"tabs"` permission and host permissions have drawbacks.

The `"tabs"` permission grants an extension the ability to read sensitive data on all tabs. Over time, this information could be used to collect a user's browsing history. As such, if you request this permission Chrome will display the following warning message at install time:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Zq5KIiqzVbKyoc1sa3vN.png", alt="Tabs permission warning dialog", width="458", height="190" %}

Host permissions allow an extension to read and query a matching tab's sensitive properties, plus inject scripts on these tabs. Users will see the following warning message at install time:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KeXXloMAS8HfX7F2spTv.png", alt="Host permission warning dialog", width="459", height="193" %}

These warning can be alarming for users. For a better onboarding experience, we recommend implementing [optional permissions][api-permissions]. 

{% endDetails %} 

#### Query the tabs {: #query }

You can retrieve the tabs from specific URLs using the `tabs.query()` method. Create a `popup.js`
file and add the following code:

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

First, the extension will sort tab names (the titles of the contained HTML pages) alphabetically. Then, when a list item is clicked, it will
focus on that tab using `tabs.update()` and bring the window to the front using `windows.update()`.
Add the following code to the `popup.js` file:

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

- The [Collator][mdn-collator] used to sort the tabs array by the user's preferred language.
- The [template tag][webdev-template-tag] used to
  define an HTML element that can be cloned instead of using `document.createElement()` to create each item.
- The [URL constructor][mdn-url-constructor] used to create and parse URLs.
- The [Spread syntax][mdn-spread-syntax] used to convert the Set of elements into arguments in the `append()` call.

{% endDetails %}

#### Group the tabs {: #group}

The [TabGroups][api-tabgroups] API allows the extension to name the group and choose a background
color. Add the `“tabGroups”` permission to the manifest by adding the highlighted code:

```json/2-4
{
  ...
  "permissions": [
    "tabGroups"
  ]
}
```

In `popup.js`, add the following code to create a button that will group all the tabs using [`tabs.group()`][api-tabgroups] and
move them into the current window.

```js
...
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: "DOCS" });
});
```

## Test that it works {: #try-out }

Verify that the file structure of your project matches the following directory tree: 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/JpuMfgSxQL9Y7XLymf1r.png", alt="The contents of the tabs manager folder: manifest.json, popup.js, popup.css, popup.html, and images folder.", width="700", height="324" %}

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

Click on the "Group tabs" button. It should look like this:


<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Cqi828zTxJUQnXtBzM62.png", 
alt="Tabs Manager Grouped tabs", width="600", height="450" %}
  <figcaption>
  Grouped tabs using the Tabs Manager extension
  </figcaption>
</figure>

## 🎯 Potential enhancements {: #challenge }

Based on what you’ve learned today, try to implement any of the following:

- Customize the popup stylesheet.
- Change the color and title of the tab group.
- Manage the tabs of another documentation site.
- Add support for ungrouping the grouped tabs.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue developing your skills by completing other
tutorials on this series:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |

## Continue exploring

We hope you enjoyed building this Chrome extension and are excited to continue your Chrome
development learning journey. We recommend the following learning path:

- The [Chrome Extension Architecture][doc-overview] backs up a bit and fills in a lot of detail
  about the Extensions architecture in general.
- The [developer's guide][doc-devguide] has dozens of additional links to pieces of documentation
  relevant to advanced extension creation.
- Extensions have access to powerful APIs beyond what's available on the open web.
  The [Chrome APIs documentation][doc-apis] walks through each API.

[api-action]: /docs/extensions/reference/action
[api-permissions]: /docs/extensions/reference/permissions/
[api-tabgroups]: /docs/extensions/reference/tabGroups
[api-tabs]: /docs/extensions/reference/tabs
[cws-discovery]: /docs/webstore/discovery/
[cws-publish]: /docs/webstore/publish
[doc-apis]: /docs/extensions/reference
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-devguide]: /docs/extensions/mv3/devguide/
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match]: /docs/extensions/mv3/match_patterns/
[doc-overview]: /docs/extensions/mv3/architecture-overview/
[doc-ui]: /docs/extensions/mv3/user_interface/
[doc-welcome]: /docs/extensions/mv3/
[github-tabs-manager-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.tabs-manager/images
[github-tabs-manager]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.tabs-manager
[mdn-collator]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
[mdn-spread-syntax]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[mdn-top-level]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await#top_level_await
[mdn-url-constructor]: https://developer.mozilla.org/docs/Web/API/URL/URL
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time-step1]: /docs/extensions/mv3/getstarted/tut-reading-time#step-1
[tut-reading-time-step2]: /docs/extensions/mv3/getstarted/tut-reading-time#step-2
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[webdev-template-tag]: https://web.dev/webcomponents-template/

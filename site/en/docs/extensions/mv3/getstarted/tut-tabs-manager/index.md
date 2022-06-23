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

If you have not already, make sure you check out [Development Basics][doc-dev-basics], which covers what to expect during the development of an extension.

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

### Step 1: Add the extension information and icons {: #step-1 }

Create a file called manifest.json and include the following code.

<!-- <MANIFEST CODE GOES HERE> -->

These manifest keys are explained in more detail in the [Reading mode tutorial][link to reading mode manifest information]. 

Create an “images” folder and place the icons inside. You can download the icons here.

### Step 2: Create and style the popup {: #step-2 }

An extension popup appears when the user clicks on the extension action. This extension will use a popup to display a list of open tabs. In the manifest.json, add the following code to declare the popup and action icons.

<!-- <Manifest.action.popup code> -->

A popup works very similarly to a web page; it can contain links to stylesheets and script tags, but does not allow inline JavaScript. Create a popup.html file and add the following code:

<!-- <Popup HTML code> -->

You can add “type: module” to the script tag to use [top level await][mdn-top-level] in your popup.js file.

Now let's style the popup. Create a popup.css file and include the following code:

<!-- <Popup.css Stylesheet code> -->

### Step 3: Manage the tabs {: #step-3 }

#### Query the tabs {: #query }

This example only collects the tabs for the extension and the web store documentation pages; to retrieve only pages from these URLs call `tabs.query()`. Create a popup.js file and add the following code:

<!-- <Popup.js tabs.query code> -->

Did you know...

...a popup and other extension pages have direct access to any of the Chrome APIs.

#### Request narrow permissions {: #narrow}

So what kind of permissions do you think we need to use this API? The first permission that comes to mind is the "tabs" since we are using the Tabs API. This permission grants access to the URL, title, favicon, and pendingURL of **all** the open tabs of any URL.

In our case, we only need access to the title and URL of **specific sites**. So to protect user privacy, we are going to request narrow host permissions instead. Add the following code to the manifest.json file:

<!-- <MANIFEST HOST PERMS> -->

The user will only see the following permission warning when installing your extension:

Read and change your data on `developer.chrome.com`

#### Focus on a tab {: #focus}

First, let’s sort the list of tabs alphabetically to make it easier to locate an item. When you click on a list item, the extension will go to that window and focus on that tab. Add the following code to popup.js:

<!-- <sort and focus code> -->

#### Group the tabs {: #group}

In the popup.js. add the following code to add a button that will group all the tabs and move them into the current window.

<!-- <group tabs code> -->

In this example, we use the tabGroups API to name the group “DOCS”. This API requires the “tabGroups” permissions in the manifest:

<!-- <Manifest.perms.grouptabs> -->

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


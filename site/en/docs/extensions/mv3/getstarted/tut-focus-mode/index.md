---
layout: 'layouts/doc-post.njk'
title: 'Focus Mode'
subhead: 'Learn how to run code on the current page when clicking on the extension toolbar.'
description: 'Learn how to run code on the current page when clicking on the extension toolbar.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial will build an extension that will change the style of the chrome extension and Chrome web store documentation. 

In this guide, we’re going to cover the following concepts:

- The role of the extension service worker.
- The activeTab permission and how it can preserve user privacy.
- How to execute code when the user clicks the extension’s toolbar icon.
- What is the extension’s action.
- How to insert and remove a CSS stylesheet.
- How to enable a keyboard shortcut for your extension.

You can download the complete source code for this project on the [extension-samples Github repo][github-focus-mode].


## Before you start {: #prereq }

If you have not already, make sure you check out [Development Basics][doc-dev-basics], which covers what to expect during the development of an extension.

This is what the final file structure of this project will look like: 


```text
Focus mode/
├── manifest.json
├── background.js
├── focus-mode.css
└── images/
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

## Build the extension {: #build }

### Step 1: Add the extension information and icons {: #step-1 }

Create a file called manifest.json and include the following code.

{% Label %}manifest.json:{% endLabel %}

```json
{
  "manifest_version": 3,
  "name": "Focus Mode",
  "description": "Enable reading mode on Chrome's official Extensions and Chrome Web Store documentation.",
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

These manifest keys are explained in more detail in [tbd][link to reading mode manifest metadata]. 

Create an “images” folder and place the icons inside. You can download the icons here.

### Step 2: Register the extension service worker {: #step-2 }

#### Update the manifest

To use a [service worker][doc-sw], the extension must first point to the file in the manifest by adding the following code:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "background": {
      "service_worker": "background.js"
  },
  ...
}
```

#### Initialize the extension

The main role of a service worker is to respond to browser events. The first event the extension
will listen for is `[runtime.onInstalled()][runtime-oninstalled]`. This way, the extension can
complete a few tasks when it’s first installed.

In this example, there are only two states (on and off), so the extension will manage these by
tracking the badge text associated with each tab. Create a file called `background.js` and add the
following code to set the initial state as “OFF”:

{% Label %}background.js:{% endLabel %}

```js
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
...
```

TIP: For more complex states, use the storage API to save the initial state. See example TBD. 


### Step 3: Enable the extension action {: #step-3 }

The _extension action_ controls the extension’s toolbar icon. So whenever the user clicks on the
extension action, it will either run some code on the page (like in this example) or it can display
a popup. Add the following code to declare the extension action in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "action": {
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  },
  ...
}
```

#### Declare the activeTab permission

The activeTab permission gives you access to the information of the tab that the user is currently on like the `url`, `pendingUrl`, `title`, or `favIconUrl.` It also grants you _temporary_ permission to execute code on the current tab.

This permission is **_triggered_** whenever the user interacts with the extension through any of the following gestures:

- Clicking on the extension action.
- Pressing a keyboard shortcut combination.
- Hitting enter when using the omnibox.
- Opening an extension popup.

The “activetab” permission allows users to _purposefully_ choose to run the extension on the currently focused tab; this way, it protects the user’s privacy. 

ASIDE SUCCESS The [activeTab][doc-active-tab] permission does not trigger a [permission warning][doc-perms-warning].

To use the activetab permission, add it to manifest's permission array.

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": ["activeTab"],
  ...
}
```

### Step 4: Track the state of the current tab {: #step-4 }

In `background.js`, add the following code to listen for the `action.onClicked()` event. When the
user clicks on the extension action, the extension will have access to the focused tab and execute
some code.

{% Label %}background.js:{% endLabel %}

```js
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
  ...
```

The extension now has access to the current tab data, so let's perform the following: 
    - Make sure that the URL matches an extension or webstore page
    - Then, check the content of the badge to determine the current state and set the next state.

### Step 5: Add or remove the stylesheet {: #step-5 }

Great! Now that you know if the extension is on or off, you are ready to insert or remove the CSS
stylesheet accordingly. Create a file called focus-mode.css and include the following code:

{% Label %}focus-mode.css:{% endLabel %}

```css
body > .scaffold > :is(top-nav, navigation-rail, side-nav, footer),
main > :not(:last-child),
main > :last-child > navigation-tree,
main .toc-container {
  display: none;
}

main > :last-child {
  margin-top: min(10vmax, 10rem);
  margin-bottom: min(10vmax, 10rem);
}
```

The Scripting API allows the extension to insert or remove the CSS stylesheet.  First, let's add the "scripting" permission, next to the activeTab permission in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": ["activeTab", "scripting"],
  ...
}
```
ASIDE SUCCESS: The scripting API does not trigger a permission warning.

Finally, add the following code to background.js to change the layout of the page to make it easier to read.

{% Label %}background.js:{% endLabel %}

```js
  ...
      if (nextState === "ON") {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      } else if (nextState === "OFF") {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      }
    }
  });
```

### Step 6: Assign a keyboard shortcut {: #step-6 }

As a bonus, add a shortcut to make it easier to enable or disable focus mode. Start by adding the “commands” key to the manifest.json.

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+U",
        "mac": "Command+U"
      }
    }
  }
}
```

The `“_execute_action”` key runs the same code as the `onClicked()` event, so no additional code is needed. 

## Test that it works {: #try-out }

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development Basics][doc-dev-basics].

### Open an extension documentation page {: #open-sites }

Go to any of the following pages:

- [Welcome to the Chrome Extension documentation][doc-welcome]
- [Using promises][doc-promises]
- [Scripting API][api-scripting]

Then, click on the extension action or press the keyboard shortcut `Ctrl + U` or `Cmd + U`.

It should look like this:

<!-- <SCREENSHOT GOES HERE> -->

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to add any of the following features:

- Improve the CSS stylesheet.
- Assign another keyboard shortcut.
- Add a new stylesheet to your favorite blog or another documentation site.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue developing your skills by completing any of the following tutorials:

| Extension                        | What you will learn                               |
|----------------------------------|---------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.      |

## Continue exploring

TBD

[api-scripting]: /docs/extensions/reference/scripting/
[doc-active-tab]: /docs/extensions/mv3/manifest/activeTab/
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-perms-warning]: /docs/extensions/mv3/permission_warnings/#required_permissions
[doc-promises]: /docs/extensions/mv3/promises/
[doc-sw]: /docs/extensions/mv3/migrating_to_service_workers/
[doc-welcome]: /docs/extensions/mv3/
[github-focus-mode]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/focus-mode
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager



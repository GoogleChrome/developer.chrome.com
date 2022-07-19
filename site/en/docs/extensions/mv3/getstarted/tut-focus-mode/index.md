---
layout: 'layouts/doc-post.njk'
title: 'Focus Mode'
subhead: 'Change the aspect of the current page by clicking the extension toolbar icon.'
description: 'Learn how to run code on the current page when clicking on the extension toolbar icon.'
date: 2022-07-15
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that changes the style of the Chrome extension and
web store documentation pages. 

In this guide, we’re going to cover the following concepts:

- The role of the extension service worker.
- How to preserve user privacy with the activeTab permission.
- How to run code when the user clicks the extension toolbar icon.
- How to insert and remove a CSS stylesheet.
- How to add a keyboard shortcut.

## Before you start {: #prereq }

If you have not already, check out [Development Basics][doc-dev-basics] to learn what to expect
during the development of an extension.

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

If you rather download the complete source code, it is available on [Github][github-focus-mode].

## Build the extension {: #build }
<!-- Intro here? -->
### Step 1: Add the extension data and icons {: #step-1 }

Create a file called `manifest.json` and include the following code.

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

These manifest keys are explained in more detail in the [Reading time
tutorial][tut-reading-time-step2]. 

Create an `images` folder and place the icons inside. You can download the icons
[here][github-focus-mode-icons].

### Step 2: Initialize the extension {: #step-2 }
<!-- TODO: Make sense of the mess below -->
Extensions monitor browser events using the extension service worker, which then reacts with
specified instructions. Service workers are a special execution environment; they are started to
handle events they're interested in and are terminated when they're no longer needed.

<!-- Events are actions or occurrences that happen in the system. The system produces (or "fires") a signal of some kind when an event occurs, and provides a mechanism by which an action can be automatically taken when the event occurs. -->

#### Specify the service worker {: #step2-b}

To load the extension [service worker][doc-sw] in the background, first we need to register it in
the manifest:

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

#### Set the initial state

The first event the service worker will listen to is [`runtime.onInstalled()`][runtime-oninstalled].
This method allows the extension to set an initial state or complete some tasks on installation. Since our extension will only handle two states (ON and OFF), we will track each tab's state by checking the _extension badge_.

{% Aside 'key-term' %}
The extension badge is a colored banner on top of the extension action (toolbar icon).

{% endAside %}

Create a file called `background.js` and add the following code to set the initial state to “OFF”:

{% Label %}background.js:{% endLabel %}

```js
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
...
```

{% Details %}
{% DetailsSummary %}
💡 **What if I have a more complex state?**
{% endDetailsSummary %}

You can use the [Storage API][api-storage] to store state data.

{% endDetails %}

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

#### Using the activeTab permission

The activeTab permission grants the extension _temporary_ permission to execute code on the current tab. It also allows access to sensitive Tab properties of the current tab:
`url`, `pendingUrl`, `title`, or `favIconUrl`.

This permission is **_triggered_** whenever the user interacts with the extension through a specific action. In our case, by clicking on the extension action (icon toolbar).

{% Details %}
{% DetailsSummary %}
💡 **What are other ways to trigger the activeTab?**
{% endDetailsSummary %}

Others user gestures that can trigger the activeTab permission are the following:

- By pressing a keyboard shortcut combination.
- By selecting a context menu item.
- By hitting enter when using the omnibox.
- By opening an extension popup.

{% endDetails %}

The `“activetab”` permission allows users to _purposefully_ choose to run the extension on the
currently focused tab; this way, it protects the user’s privacy. 

Another benefit, is that the [activeTab][doc-active-tab] permission does not trigger a [permission
warning][doc-perms-warning].

#### Declare the activeTab permission

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

The `action.onClicked` listener allows us to run code when the user clicks on the extension action.
If the URL matches an extension or web store documentation page, we will check the state of the
current tab and set the next state by setting the badge text. 

Add the following code to `background.js`:

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

### Step 5: Add or remove the stylesheet {: #step-5 }

Now it's time to change the page's layout. So first, create a stylesheet named
`focus-mode.css` and include the following code:

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

Great! Let's insert or remove the CSS stylesheet using the [Scripting][api-scripting] API. To
use the Scripting API, declare the `"scripting"` permission:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": ["activeTab", "scripting"],
  ...
}
```

{% Aside 'success' %}

The Scripting API does not trigger a [permission warning][doc-perms-warning].

{% endAside %}

Finally, in `background.js` add the following code to change the layout of the page:

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
<!-- Can I execute a file instead of inserting a CSS file? -->

### _Optional: Assign a keyboard shortcut_ {: #step-6 }

As a bonus, let's add a shortcut to make it easier to enable or disable focus mode. Add the
`“commands”` key to the manifest.

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

The `“_execute_action”` key runs the same code as the `action.onClicked()` event, so no additional
code is needed!

## Test that it works {: #try-out }

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics].

### Open an extension documentation page {: #open-sites }

Go to any of the following pages:

- [Welcome to the Chrome Extension documentation][doc-welcome]
- [Using promises][doc-promises]
- [Scripting API][api-scripting]

Then, click on the extension action or press the keyboard shortcut `Ctrl + U` or `Cmd + U`.

It should look like this:
<!-- TODO: Change! It also has the reading time extension enabled -->
<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/6jSxXwVmjVv10NvwJ2Iu.png", 
alt="Focus Mode extension in Welcome page", width="800", height="378", class="screenshot" %}
  <figcaption>
  Extension Welcome page with the Focus Mode extension enabled
  </figcaption>
</figure>

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to implement any of the following:

- Improve the CSS stylesheet.
- Assign a different keyboard shortcut.
- Change the layout of your favorite blog or documentation site.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. 

Continue leveling up your skills by completing other tutorials on this series:

| Extension                        | What you will learn                               |
|----------------------------------|---------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.      |

[api-scripting]: /docs/extensions/reference/scripting/
[api-storage]: /docs/extensions/reference/storage
[doc-active-tab]: /docs/extensions/mv3/manifest/activeTab/
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-perms-warning]: /docs/extensions/mv3/permission_warnings/#required_permissions
[doc-promises]: /docs/extensions/mv3/promises/
[doc-sw]: /docs/extensions/mv3/migrating_to_service_workers/
[doc-welcome]: /docs/extensions/mv3/
[github-focus-mode-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/focus-mode/images
[github-focus-mode]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/focus-mode
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tut-reading-time-step2]: /docs/extensions/mv3/getstarted/tut-reading-time#step-2
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager



---
layout: 'layouts/doc-post.njk'
title: 'Focus Mode'
subhead: 'Change the aspect of the current page by clicking the extension toolbar icon.'
description: 'Learn how to run code on the current active tab.'
date: 2022-08-10
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that changes the aspect of the Chrome extension and
Web store documentation pages so that they are easier to read.

In this guide, we’re going to explain how to do the following:

- Use the extension service worker as the event coordinator.
- Preserve user privacy through the `activeTab` permission.
- Run code when the user clicks the extension toolbar icon.
- Insert and remove a stylesheet using the [Scripting][api-scripting] API.
- Use a keyboard shortcut to execute code.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend checking out
[Development Basics][doc-dev-basics] for an introduction to the extension development workflow.

## Build the extension {: #build }

To start, create a new directory called `focus-mode` that will hold the extension's files. If you
prefer, you can download the complete source code on [Github][github-focus-mode].

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
tutorial][tut-reading-time-step1]. 

Create an `images` folder and place the icons inside. You can download the icons
[here][github-focus-mode-icons].

### Step 2: Initialize the extension {: #step-2 }

Extensions monitor browser events using the [extension service worker][doc-sw]. Service workers have
a special JavaScript environment; they load to handle events, and the browser terminates a service
worker when it's no longer needed.

Start by adding the following code to register the service worker in the manifest:

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

The first event the service worker will listen for is
[`runtime.onInstalled()`][runtime-oninstalled]. This method allows the extension to set an initial
state or complete some tasks on installation. Since this example will only handle two states (ON and
OFF), it will track each tab's state through the _extension badge_.

{% Aside 'key-term' %}

The [extension badge][action-badge] is a colored banner on top of the extension action (toolbar
icon).

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
extension action, it will either run some code (like in this example) or display a popup. Add the
following code to declare the extension action in the manifest:

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

#### Use the activeTab permission to protect user privacy {: #active-tab}

The [`activeTab`][doc-active-tab] permission grants the extension _temporary_ ability to execute code
on the currently active tab. It also allows access to [sensitive properties][active-tab-allows] of
the current tab.

This permission is enabled when the user **_invokes_** the extension. In this case, the user invokes the
extension by clicking on the extension action.

{% Details %}
{% DetailsSummary %}
💡 **What other user interactions enable the activeTab permission?**
{% endDetailsSummary %}

Other user gestures that enable the activeTab permission are the following:

- Pressing a keyboard shortcut combination.
- Selecting a context menu item.
- Accepting a suggestion from the omnibox.
- Opening an extension popup.

{% endDetails %}

The `activetab` permission allows users to _purposefully_ choose to run the extension on the
currently focused tab; this way, it protects the user’s privacy. Another benefit is that it does not
trigger a [permission warning][doc-perms-warning].

To use the activetab permission, add it to the manifest's permission array:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": ["activeTab"],
  ...
}
```

### Step 4: Track the state of the current tab {: #step-4 }

After the user clicks on the extension action, the extension will check if the URL matches a
documentation page. Next, it will check the state of the current tab and set the next state. Add the
following code to `background.js`:

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

Now it's time to change the layout of the page. Create a file named `focus-mode.css` and include the
following code:

{% Label %}focus-mode.css:{% endLabel %}

```js
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

Great! Let's insert or remove the stylesheet using the [Scripting][api-scripting] API. Start by
declaring the `"scripting"` permission in the manifest:

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

{% Details %}
{% DetailsSummary %}
💡 **Can I use the Scripting API to inject code instead of a stylesheet?**
{% endDetailsSummary %}

Yes! You can use [`scripting.executeScript()`][api-scripting-es] to inject JavaScript. 

{% endDetails %}

### _Optional: Assign a keyboard shortcut_ {: #step-6 }

Just for fun, let's add a shortcut to make it easier to enable or disable focus mode. Add the
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

Verify that the file structure of your project looks like the following: 

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

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics-unpacked].

### Open an extension documentation page {: #open-sites }

Go to any of the following pages:

- [Welcome to the Chrome Extension documentation][doc-welcome]
- [Publish in the Chrome Web Store][cws-publish]
- [Scripting API][api-scripting]

Then, click on the extension action or press the keyboard shortcut `Ctrl + U` or `Cmd + U`.

It should look like this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/6jSxXwVmjVv10NvwJ2Iu.png", 
alt="Focus Mode extension in Welcome page", width="800", height="378", class="screenshot" %}
  <figcaption>
  Extension Welcome page with the Focus Mode extension enabled
  </figcaption>
</figure>

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to accomplish any of the following:

- Improve the CSS stylesheet.
- Assign a different keyboard shortcut.
- Change the layout of your favorite blog or documentation site.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue leveling up your skills by completing other
tutorials on this series:

| Extension                        | What you will learn                                            |
|----------------------------------|----------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on a specific set of pages automatically. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                   |

[action-badge]: /docs/extensions/reference/action/#badge
[active-tab-allows]: /docs/extensions/mv3/manifest/activeTab/#what-activeTab-allows
[api-scripting-es]: /docs/extensions/reference/scripting/#injected-code
[api-scripting]: /docs/extensions/reference/scripting/
[api-storage]: /docs/extensions/reference/storage
[cws-publish]: /docs/webstore/publish
[doc-active-tab]: /docs/extensions/mv3/manifest/activeTab/
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-perms-warning]: /docs/extensions/mv3/permission_warnings/#required_permissions
[doc-promises]: /docs/extensions/mv3/promises/
[doc-sw]: /docs/extensions/mv3/service_workers/
[doc-welcome]: /docs/extensions/mv3/
[github-focus-mode-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/focus-mode/images
[github-focus-mode]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/focus-mode
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tut-reading-time-step1]: /docs/extensions/mv3/getstarted/tut-reading-time#step-1
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager

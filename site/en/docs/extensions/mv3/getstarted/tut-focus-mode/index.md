---
layout: 'layouts/doc-post.njk'
title: 'Inject scripts into the active tab'
seoTitle: 'Chrome Extensions Tutorial: Focus Mode'
subhead: 'Simplify the styling of the current page by clicking the extension toolbar icon.'
description: 'Learn how to simplify the style of the current page.'
date: 2022-10-04
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that simplifies the styling of the Chrome extension and
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
prefer, you can download the complete source code on [GitHub][github-focus-mode].

### Step 1: Add the extension data and icons {: #step-1 }

Create a file called `manifest.json` and include the following code.

```json
{
  "manifest_version": 3,
  "name": "Focus Mode",
  "description": "Enable focus mode on Chrome's official Extensions and Chrome Web Store documentation.",
  "version": "1.0",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```

To learn more about these manifest keys, check out the Reading time tutorial that explains the extension's [metadata][tut-reading-time-step1] and [icons][tut-reading-time-step2] in more detail.

Create an `images` folder then [download the icons][github-focus-mode-icons] into it.

### Step 2: Initialize the extension {: #step-2 }

Extensions can monitor browser events in the background using the [extension's service
worker][doc-sw]. Service workers are special JavaScript environments that are loaded to handle
events and terminated when they're no longer needed.

Start by registering the service worker in the `manifest.json` file:

```json
{
  ...
  "background": {
    "service_worker": "background.js"
  },
  ...
}
```

Create a file called `background.js` and add the following code:

```js
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
```

The first event our service worker will listen for is
[`runtime.onInstalled()`][runtime-oninstalled]. This method allows the extension to set an initial
state or complete some tasks on installation. Extensions can use the [Storage API][api-storage] and
[IndexedDB][mdn-indexeddb] to store the application state. In this case, though, since we're only handling two states, we will use the _action's badge_ text itself to track whether the extension is 'ON' or 'OFF'.

{% Aside 'key-term' %}

The [action's badge][action-badge] is a colored banner on top of the extension action (toolbar
icon).

{% endAside %}

### Step 3: Enable the extension action {: #step-3 }

The _extension action_ controls the extension’s toolbar icon. So whenever the user clicks on the
extension action, it will either run some code (like in this example) or display a popup. Add the
following code to declare the extension action in the `manifest.json` file:

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
💡 **What other user interactions enable the activeTab permission in my own extension?**
{% endDetailsSummary %}

- Pressing a keyboard shortcut combination.
- Selecting a context menu item.
- Accepting a suggestion from the omnibox.
- Opening an extension popup.

{% endDetails %}

The `activeTab` permission allows users to _purposefully_ choose to run the extension on the
focused tab; this way, it protects the user’s privacy. Another benefit is that it does not
trigger a [permission warning][doc-perms-warning].

To use the `activeTab` permission, add it to the manifest's permission array:

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

```js
const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

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

Let's insert or remove the stylesheet using the [Scripting][api-scripting] API. Start by
declaring the `"scripting"` permission in the manifest:

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
`"commands"` key to the manifest.

```json
{
  ...
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+B",
        "mac": "Command+B"
      }
    }
  }
}
```

The `"_execute_action"` key runs the same code as the `action.onClicked()` event, so no additional
code is needed!

## Test that it works {: #try-out }

Verify that the file structure of your project looks like the following: 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/S86ooJMjFm5uvf906u9a.png", 
alt="The contents of the focus mode folder: manifest.json, background.js, 
focus-mode.css, and images folder.", width="700", height="468" %}

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics-unpacked].

### Test the extension on a documentation page {: #open-sites }

First, open any of the following pages:

- [Welcome to the Chrome Extension documentation][doc-welcome]
- [Publish in the Chrome Web Store][cws-publish]
- [Scripting API][api-scripting]

Then, click on the extension action. If you set up a [keyboard shortcut][tut-focus-mode-step6], you can test it by pressing `Ctrl + B` or `Cmd + B`.

It should go from this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/q9DOiy5Y6m8eTp182PgP.png", alt="Focus Mode extension OFF", width="600", height="378", class="screenshot" %}
  <figcaption>
  Focus Mode extension off
  </figcaption>
</figure>

To this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/e7y4UD1rjmk1yqiVmnoP.png", 
alt="Focus Mode extension ON", width="600", height="378", class="screenshot" %}
  <figcaption>
  Focus Mode extension on
  </figcaption>
</figure>

## 🎯 Potential enhancements {: #challenge }

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

## Continue exploring

We hope you enjoyed building this Chrome extension and are excited to continue your Chrome
development learning journey. We recommend the following learning paths:

- The [Chrome Extension Architecture][doc-overview] backs up a bit and fills in a lot of detail
  about the Extensions architecture in general.
- The [developer's guide][doc-devguide] has dozens of additional links to pieces of documentation
  relevant to advanced extension creation.
- Extensions have access to powerful APIs beyond what's available on the open web.
  The [Chrome APIs documentation][doc-apis] walks through each API.

[action-badge]: /docs/extensions/reference/action/#badge
[active-tab-allows]: /docs/extensions/mv3/manifest/activeTab/#what-activeTab-allows
[api-scripting-es]: /docs/extensions/reference/scripting/#injected-code
[api-scripting]: /docs/extensions/reference/scripting/
[api-storage]: /docs/extensions/reference/storage
[cws-publish]: /docs/webstore/publish
[doc-active-tab]: /docs/extensions/mv3/manifest/activeTab/
[doc-apis]: /docs/extensions/reference
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-devguide]: /docs/extensions/mv3/devguide/
[doc-overview]: /docs/extensions/mv3/architecture-overview/
[doc-perms-warning]: /docs/extensions/mv3/permission_warnings/#required_permissions
[doc-promises]: /docs/extensions/mv3/promises/
[doc-sw]: /docs/extensions/mv3/service_workers/
[doc-welcome]: /docs/extensions/mv3/
[github-focus-mode-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.focus-mode/images
[github-focus-mode]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.focus-mode
[mdn-indexeddb]: https://developer.mozilla.org/docs/Web/API/IndexedDB_API
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tut-focus-mode-step6]: /docs/extensions/mv3/getstarted/tut-focus-mode#step-6
[tut-reading-time-step1]: /docs/extensions/mv3/getstarted/tut-reading-time#step-1
[tut-reading-time-step2]: /docs/extensions/mv3/getstarted/tut-reading-time#step-2
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager

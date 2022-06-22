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

If you have not already, make sure you check out [Development Basics](https://docs.google.com/document/u/0/d/18-6IylMwnsD35J7nFNG1fXCuemD9Llb__r0d794fMiE/edit), which covers what to expect during the development of an extension.

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

<MANIFEST CODE GOES HERE>

These manifest keys are explained in more detail in [tbd][link to reading mode manifest metadata]. 

Create an “images” folder and place the icons inside. You can download the icons here.


### Step 2: Register the extension service worker {: #step-2 }

#### Update the manifest

To use a [service worker][doc-sw], the extension must first point to the file in the manifest by adding the following code:

<MANIFEST CODE GOES HERE>

#### Initialize the extension

The main role of a service worker is to respond to browser events. The first event the extension will listen for is `[runtime.onInstalled()][runtime-oninstalled]`. This way, the extension can complete a few tasks when it’s first installed.

In this example, there are only two states (on and off), so the extension will manage these by tracking the badge text associated with each tab. Create a file called background.js and add the following code to set the initial state as “OFF”:

<CODE GOES HERE>

TIP: For more complex states, use the storage API to save the initial state. See example TBD. 


### Step 3: Enable the extension action {: #step-3 }

The _extension action_ controls the extension’s toolbar icon. So whenever the user clicks on the extension action, it will either run some code on the page (like in this example) or it can display a popup. Add the following code to declare the extension action in the manifest:

<MANIFEST CODE GOES HERE>

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

<MANIFEST CODE GOES HERE> 

### STEP 4: Listen for the onClicked event {: #step-4 }

In “background.js”, add the following code to listen for the action.onClicked() event. When the user clicks on the extension action, the extension will have access to the focused tab and execute some code.

<BACKGROUND CODE GOES HERE>


### Step 5: Track the state of the current tab {: #step-5 }

Now that the extension has access to the tab information, you can make sure the URL matches an extension or webstore documentation page. If that’s the case, check the content of the badge to determine the current state and set the next state.

<BACKGROUND CODE GOES HERE>


### Step 6: Add or remove the stylesheet {: #step-6 }

Great! Now that you know if the extension is on or off, you are ready to insert or remove the CSS stylesheet accordingly. Create a file called focus-mode.css and include the following code:

<CSS CODE GOES HERE>

The Scripting API allows the extension to insert or remove the CSS stylesheet.  First, let's add the "scripting" permission to the manifest:

<MANIFEST CODE GOES HERE>

ASIDE SUCCESS: The scripting API does not trigger a permission warning.

Finally, add the following code to background.js to change the layout of the page to make it easier to read.

<BACKGROUND CODE GOES HERE>

### Step 7: Assign a keyboard shortcut {: #step-7 }

As a bonus, add a shortcut to make it easier to enable or disable focus mode. Start by adding the “commands” key to the manifest.json.

<MANIFEST CODE GOES HERE>

The “_execute_action” key runs the same code as the action.onClicked() event, so no additional code is needed. 


## Test that it works {: #try-out }


### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development Basics][doc-dev-basics].

### Open an extension documentation page {: #open-sites }

1. Go to any of the following pages:

- [Welcome to the Chrome Extension documentation][doc-welcome]
- [Using promises][doc-promises]
- [Scripting API][api-scripting]

2. Click on the extension action or press the keyboard shortcut `Ctrl + U` or `Cmd + U`.

It should look like this:

<SCREENSHOT GOES HERE>

## Potential enhancements {: #challenge }

Based on what you’ve learned today, try to add any of the following features:

- Improve the CSS stylesheet.
- Assign another keyboard shortcut.
- Add a new stylesheet to your favorite blog or another documentation site.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue developing your skills by completing any of the following tutorials:

| Extension                        | What you will learn                                                    |
|----------------------------------|------------------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on every page automatically.                      |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                           |

## Continue exploring

TBD

[api-scripting]: /docs/extensions/reference/scripting/
[doc-active-tab]: /docs/extensions/mv3/manifest/activeTab/
[doc-perms-warning]: /docs/extensions/mv3/permission_warnings/#required_permissions
[doc-promises]: /docs/extensions/mv3/promises/
[doc-sw]: /docs/extensions/mv3/migrating_to_service_workers/
[doc-welcome]: /docs/extensions/mv3/
[github-focus-mode]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/focus-mode
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager



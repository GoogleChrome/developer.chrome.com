---
layout: "layouts/doc-post.njk"
title: "Getting started"
date: 2014-02-28
updated: 2021-05-27
description: Step-by-step instructions on how to create a Chrome Extension.
---

{# TODO: Reword this intro. "Components" is probably not the best word to use here any more as "web
components" are a cross-browser tech for creating reusable custom elements or "components". #}

Extensions are made of different, but cohesive, components. Components can include [background
scripts][1], [content scripts][2], an [options page][3], [UI elements][4] and various logic files.
Extension components are created with web development technologies: HTML, CSS, and JavaScript. An
extension's components will depend on its functionality and may not require every option.

This tutorial will build an extension that allows the user to change the background color of the
currently focused page. It will use many of the extension platform's components to give an
introductory demonstration of their relationships.

To start, create a new directory to hold the extension's files.

The completed extension can be downloaded [here][6].

## Create the manifest {: #manifest }

Extensions start with their [manifest][7]. Create a file called `manifest.json` and include the
following code.

```json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3
}
```

The directory holding the manifest file can be added as an extension in developer mode in its
current state.

1.  Open the Extension Management page by navigating to `chrome://extensions`.
    - Alternatively, open this page by clicking on the Extensions menu button and selecting **Manage
      Extensions** at the bottom of the menu.
    - Alternatively, open this page by clicking on the Chrome menu, hovering over **More Tools**
      then selecting **Extensions**
2.  Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3.  Click the **Load unpacked** button and select the extension directory.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vOu7iPbaapkALed96rzN.png", alt="Loading an unpacked extension", width="563", height="355" %}

Ta-da! The extension has been successfully installed. Because no icons were included in the
manifest, a generic icon will be created for the extension.

## Add functionality {: #background }

The extension is now installed, but it doesn't currently do anything because we haven't told it what
to do or when to do it. Let's fix that by adding some code to store a background color value.

### Register the background script in the manifest {: #background-manifest }

Background scripts, like many other important components, must be registered in the manifest.
Registering a background script in the manifest tells the extension which file to reference, and how
that file should behave.

```json/5-7
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  }
}
```

Chrome is now aware that the extension includes a service worker. When you reload the extension,
Chrome will scan the specified file for additional instructions, such as important events it needs
to listen for.

### Create the background script {: #background-script }

This extension will need information from a persistent variable as soon as it's installed. Start by
including a listening event for [`runtime.onInstalled`][11] in the background script. Inside the
`onInstalled` listener, the extension will set a value using the [storage][12] API. This will allow
multiple extension components to access that value and update it. Inside the extension's directory create a file named `background.js` and add the following code.

```js
// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
```

### Add the storage permission {: #storage-permission }

Most APIs, including the [storage][12] API, must be registered under the `"permissions"` field in
the manifest for the extension to use them.

```json/8
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"]
}
```

### Inspect the background script {: #inspect-background }

Navigate back to the extension management page and click the **Reload** link. A new field, **Inspect
views**, becomes available with a blue link, **service worker**.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/dx9EpIKK949olhe8qraK.png", alt="Inspect views", width="566", height="353" %}

Click the link to view the background script's console log, "`Default background color set to
green`"

## Introduce a user interface {: #user_interface }

Extensions can have many forms of a [user interface][4]; this one will use a [popup][15]. Create and
add a file named `popup.html` to the extension's directory. This extension uses a button to change
the background color.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="button.css">
  </head>
  <body>
    <button id="changeColor"></button>
  </body>
</html>
```

Like the background script, this file must be declared in the manifest in order for Chrome to
present it in the extension's popup. To do this, add an [`action`][17] object to the manifest and
set `popup.html` as the action's `default_popup`.

```json/9-11
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html"
  }
}
```

This popup's HTML references an external CSS file named `button.css`. Add another file to the
extension's directory, name it appropriately, and add the following code.

```css
button {
  height: 30px;
  width: 30px;
  outline: none;
  margin: 10px;
  border: none;
  border-radius: 2px;
}

button.current {
  box-shadow: 0 0 0 2px white,
              0 0 0 4px black;
}
```

Designation for toolbar icons is also included under `action` in the `default_icons` field.
Download the images folder [here][18], unzip it, and place it in the extension's directory. Update
the manifest so the extension knows how to use the images.

```json/11-16
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "/images/get_started16.png",
      "32": "/images/get_started32.png",
      "48": "/images/get_started48.png",
      "128": "/images/get_started128.png"
    }
  }
}
```

Extensions also display images on the extension management page, the permissions warning, and
favicon. These images are designated in the manifest under [`icons`][19].

```json/18-23
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "/images/get_started16.png",
      "32": "/images/get_started32.png",
      "48": "/images/get_started48.png",
      "128": "/images/get_started128.png"
    }
  },
  "icons": {
    "16": "/images/get_started16.png",
    "32": "/images/get_started32.png",
    "48": "/images/get_started48.png",
    "128": "/images/get_started128.png"
  }
}
```

By default, extensions appear in the extensions menu (the puzzle piece). Pinning the extension will display the icon in the toolbar.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/GdHNy255kS4hWD5vb1fc.png", alt="Pin the extension to the toolbar", width="502", height="278" %}

If the extension is reloaded at this stage, it will include the provided icon rather than the
default placeholder, and clicking the action will open a popup that displays a button showing the default color.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ku5Z8MMssgw6MKctpJVI.png", alt="Popup", width="187", height="153" %}

The last step for the popup UI is adding color to the button. Create and add a file named
`popup.js` with the following code to the extension's directory.

```js
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
```

This code grabs the button from `popup.html` and requests the color value from storage. It then
applies the color as the background of the button. Include a script tag to `popup.js` in
`popup.html`.

```html/7
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="button.css">
  </head>
  <body>
    <button id="changeColor"></button>
    <script src="popup.js"></script>
  </body>
</html>
```

Reload the extension to view the green button.

## Layer logic {: #logic }

The extension now has a custom icon and a popup, and it colors the popup button based on a value
saved to the extension's storage. Next, it needs logic for further user interaction. Update
`popup.js` by adding the following to the end of the file.

```js
// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
```

The updated code adds a `click` event listener to the button, which triggers a [programmatically
injected content script][24]. This turns the background color of the page the same color as the
button. Using programmatic injection allows for user-invoked content scripts, instead of auto
inserting unwanted code into web pages.

The manifest will need the [`activeTab`][25] permission to allow the extension temporary access to
the current page, and the [`scripting`][26] permission to use the Scripting API's
[`executeScript`][27] method.

```json/3
{
  "name": "Getting Started Example",
  ...
  "permissions": ["storage", "activeTab", "scripting"],
  ...
}
```

The extension is now fully functional! Reload the extension, refresh this page, open the popup and
click the button to turn it green! However, some users may want to change the background to a
different color.

## Give users options {: #options }

The extension currently only allows users to change the background to green. Including an options
page gives users more control over the extension's functionality, further customizing their browsing
experience.

Start by creating a file in the directory named `options.html` and include the following code.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="button.css">
  </head>
  <body>
    <div id="buttonDiv">
    </div>
    <div>
      <p>Choose a different background color!</p>
    </div>
  </body>
  <script src="options.js"></script>
</html>
```

Then register the options page in the manifest,

```json/3
{
  "name": "Getting Started Example",
  ...
  "options_page": "options.html"
}
```

Reload the extension and right-click the extension icon in the toolbar then select **Options**. Alternatively, click DETAILS and scroll down the details page and select **Extension options**.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/aV46PP8KCjEqqenSJxxp.png", alt="Right click to open the options page", width="248", height="260" %}

The last step is to add the options logic. Create a file named `options.js` in the extension's
directory with the following code.

```js
let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);
```

Four color options are provided then generated as buttons on the options page with onclick event
listeners. When the user clicks a button, it updates the color value in the extension's storage.
Since all of the extension's files pull the color information from this storage, no other values
need to be updated.

## Take the next step {: #next-steps }

Congratulations! The directory now holds a fully-functional, albeit simplistic, Chrome extension.

What's next?

- The [Chrome Extension Overview][30] backs up a bit, and fills in a lot of detail about the
  Extensions architecture in general, and some specific concepts developers will want to be familiar
  with.
- Learn about the options available for debugging Extensions in the [debugging tutorial][31].
- Chrome Extensions have access to powerful APIs above and beyond what's available on the open web.
  The [chrome.\* APIs documentation][32] will walk through each API.
- The [developer's guide][33] has dozens of additional links to pieces of documentation relevant to
  advanced extension creation.

[1]: /docs/extensions/mv3/background_pages
[2]: /docs/extensions/mv3/content_scripts
[3]: /docs/extensions/mv3/options
[4]: /docs/extensions/mv3/user_interface
[6]: https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/file/WlD8wC6g8khYWPJUsQceQkhXSlv1/SVxMBoc5P3f6YV3O7Xbu.zip
[7]: /docs/extensions/mv3/manifest
[11]: /docs/extensions/reference/runtime#event-onInstalled
[12]: /docs/extensions/reference/storage
[15]: /docs/extensions/mv3/user_interface#popup
[17]: /docs/extensions/reference/action
[18]: https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/file/WlD8wC6g8khYWPJUsQceQkhXSlv1/wy3lvPQdeJn4iqHmI0Rp.zip
[19]: /docs/extensions/mv3/user_interface#icons
[20]: /docs/extensions/reference/declarativeContent
[24]: /docs/extensions/mv3/content_scripts/#programmatic
[25]: /docs/extensions/mv3/manifest/activeTab
[26]: /docs/extensions/reference/scripting
[27]: /docs/extensions/reference/scripting#method-executeScript
[30]: /docs/extensions/mv3/overview
[31]: /docs/extensions/mv3/tut_debugging
[32]: /docs/extensions/reference
[33]: /docs/extensions/mv3/devguide

---
api: action
---

To control your extension's toolbar button in Chrome's UI, use the `chrome.action` API.
The action icons are displayed in the browser toolbar next to the [omnibox](https://en.wiktionary.org/wiki/omnibox). After installation, these appear in the extensions menu (the puzzle piece icon).
Users can pin your extension icon to the toolbar.

Every extension has an icon in the Chrome toolbar, even if the `action` key isn't added to the manifest.

## Manifest

To use the `chrome.action` API, specify a `"manifest_version"` of `3`
and include the `"action"` key in your [manifest file][doc-manifest]:

```json
{
  "name": "Action Extension",
  ...
  "action": {
    "default_icon": {              // optional
      "16": "images/icon16.png",   // optional
      "24": "images/icon24.png",   // optional
      "32": "images/icon32.png"    // optional
    },
    "default_title": "Click Me",   // optional, shown in tooltip
    "default_popup": "popup.html"  // optional
  },
  ...
}
```

The `"action"` key (along with its children) is optional. When it isn't included, your extension is still shown in the toolbar to provide access to the extension's menu. For this reason, we recommend that you always include at least the `"action"` and `"default_icon"` keys.

## Concepts and Usage

### Parts of the UI

#### Icon

The icon is the main image on the toolbar for your extension, and is set by the `"default_icon"` key in
your manifest's `action` entry. Icons must be 16 device-independent pixels (DIPs) wide and tall. 

The `"default_icon"` key is a dictionary of sizes to image paths. Chrome uses these icons
to choose which image scale to use. If an exact match is not found, Chrome selects the closest
available and scales it to fit the image, which might affect image quality.

Because devices with less-common scale factors like 1.5x or 1.2x are becoming more
common, we encourage you to provide multiple sizes for your icons. This also
futureproofs your extension against potential icon display size changes.

You can also call `action.setIcon()` to set your extension's icon programmatically
by specifying a different image path or providing a dynamically-generated icon using the [HTML canvas
element][html-canvas], or, if setting from an extension service worker, the [offscreen
canvas][html-offscreencanvas] API.

```js
const canvas = new OffscreenCanvas(16, 16);
const context = canvas.getContext('2d');
context.clearRect(0, 0, 16, 16);
context.fillStyle = '#00FF00';  // Green
context.fillRect(0, 0, 16, 16);
const imageData = context.getImageData(0, 0, 16, 16);
chrome.action.setIcon({imageData: imageData}, () => { /* ... */ });
```

{% Aside %}

The `action.setIcon()` API is intended to set a static image. Don't use animated images for your icons.

{% endAside %}

For packed extensions (installed from a .crx file), images can be in most formats that the Blink
rendering engine can display, including PNG, JPEG, BMP, ICO, and others. SVG isn't supported.
Unpacked extensions must use PNG images.

#### Tooltip (title)

The tooltip, or title, appears when the user holds their mouse pointer over the extension's icon in the
toolbar. It's also included in the accessible text spoken by screen readers when the button gets
focus.

The default tooltip is set using the `"default_title"` field of the `action` key in `manifest.json`.
You can also set it programmatically by calling `action.setTitle()`.

#### Badge

Actions can optionally display a "badge" &mdash; a bit of text layered over the icon. This makes it
easy to update the action to display a small amount of information about the state of the extension,
such as a counter. The badge has a text component and a background color. Because space is limited,
we recommend that badge text use four or fewer characters.

To create a badge, set it programmatically by calling `action.setBadgeBackgroundColor()` and
`action.setBadgeText()`. There isn't a default badge setting in the manifest. Badge color values
can be either an array of four integers between 0 and 255 that make up the RGBA color of the
badge or a string with a [CSS color][css-color] value.

```js
chrome.action.setBadgeBackgroundColor(
  {color: [0, 255, 0, 0]},  // Green
  () => { /* ... */ },
);

chrome.action.setBadgeBackgroundColor(
  {color: '#00FF00'},  // Also green
  () => { /* ... */ },
);

chrome.action.setBadgeBackgroundColor(
  {color: 'green'},  // Also, also green
  () => { /* ... */ },
);
```

#### Popup

An action's popup is shown when the user clicks on the extension's action button in the
toolbar. The popup can contain any HTML contents you like, and will be automatically sized to fit
its contents. The popup's size must be between 25x25 and 800x600 pixels. 

The popup is initially set by the `"default_popup"` property in the `action` key in the
`manifest.json` file. If present, this property should point to a relative path within the extension
directory. It can also be updated dynamically to point to a different relative path using the
`action.setPopup()` method.

{% Aside %}

The `action.onClicked` event won't be sent if the extension action has specified a popup to
show on click on the current tab.

{% endAside %}

## Use cases

### Per-tab state

Extension actions can have different states for each tab. To set a value for an individual
tab, use the `tabId` property in the `action` API's setting methods. For example, to
set the badge text for a specific tab, do something like the following:

```js
function getTabId() { /* ... */}
function getTabBadge() { /* ... */}

chrome.action.setBadgeText(
  {
    text: getTabBadge(tabId),
    tabId: getTabId(),
  },
  () => { ... }
);
```

If the `tabId` property is left out, the setting is treated as a global setting. Tab-specific
settings take priority over global settings.

### Enabled state

By default, toolbar actions are enabled (clickable) on every tab. You can control this using the
`action.enable()` and `action.disable()` methods. This only affects whether the popup (if any) or
`action.onClicked` event is sent to your extension; it doesn't affect the action's presence
in the toolbar.

## Examples

The following examples show some common ways that actions are used in extensions. To try this API,
install the [Action API example][sample-example] from the [chrome-extension-samples][repo-samples]
repository.

### Show a popup

It's common for an extension to display a popup when the user clicks the extension's action. To
implement this in your own extension, declare the popup in your `manifest.json` and specify the
content that Chrome should display in the popup.

```json
// manifest.json
{
  "name": "Action popup demo",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_title": "Click to view a popup",
    "default_popup": "popup.html"
  }
}
```

```html
<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    html {
      min-height: 5em;
      min-width: 10em;
      background: salmon;
    }
  </style>
</head>
<body>
  <p>Hello, world!</p>
</body>
</html>
```

### Injecting a content script on click

A common pattern for extensions is to expose their primary functionality using the extension's
action. The example below demonstrates this pattern. When the user clicks the action, the extension
injects a content script into the current page. The content script then displays an alert to verify
that everything worked as expected.

```json
// manifest.json
{
  "name": "Action script injection demo",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_title": "Click to show an alert"
  },
  "permissions": ["activeTab", "scripting"],
  "background": {
    "service_worker": "background.js"
  }
}
```

```js
// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});
```

```js
// content.js
alert('Hello, world!');
```

### Emulate pageActions with declarativeContent


This example shows how an extension's background logic can (a) disable an action by default and (b)
use [declarativeContent][api-declarative-content] to enable the action on specific sites.

```js
// background.js

// Wrap in an onInstalled callback to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  chrome.action.disable();

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    let exampleRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: '.example.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    // Finally, apply our new array of rules
    let rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
```

[api-browser-action]: /docs/extensions/reference/browserAction/
[api-page-action]: /docs/extensions/reference/pageAction/
[api-declarative-content]: /docs/extensions/reference/declarativeContent/
[css-color]: https://developer.mozilla.org/docs/Web/CSS/color
[doc-manifest]: /docs/extensions/mv3/manifest
[event-onclicked]: /docs/extensions/reference/action/#event-onClicked
[html-canvas]: https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement
[html-offscreencanvas]: https://developer.mozilla.org/docs/Web/API/OffscreenCanvas
[repo-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[sample-example]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action

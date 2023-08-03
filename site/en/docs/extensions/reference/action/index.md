---
api: action
---

You can use the `chrome.action` API to control the toolbar button for your extension in Chrome's UI.
The action icons are displayed in the browser toolbar, to the right of the omnibox (on left-to-right
devices). After installation, by default, these appear in the extensions menu (the puzzle piece).
Users can choose to pin your extension icon to the toolbar.

Note that every extension will have an icon in the toolbar in Chrome, even if the `action` key is
not specified.

## Manifest

In order to use the `chrome.action` API, you need to specify a `"manifest_version"` of `3` or higher
and include the `action` key in your [manifest file][doc-manifest].

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

Each of these values is optional; an empty dictionary is technically allowed.

These properties are described more below.

## Parts of the UI

### Icon

The icon is the main image used in the toolbar button. Icons are 16 DIPs (device-independent pixels)
wide and tall. The icon is initially set by the `default_icon` key in the `action` entry in the
`manifest.json` file. This key is a dictionary of sizes to image paths. Chrome will use these icons
to choose which image scale to use. If an exact match is not found, Chrome will select the closest
available and scale it to fit the image. However, this scaling can cause the icon to lose detail or
look fuzzy.

Since devices with less-common scale factors like 1.5x or 1.2x are becoming more common, you are
encouraged to provide multiple sizes for your icons. This also ensures that if the icon display size
is ever changed, you don't need to do any more work to provide different icons.

The icon can also be set programmatically using the `action.setIcon()` method. This can be used to
specify a different image path or to provide a dynamically-generated icon using the [HTML canvas
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

The `action.setIcon()` API is intended to set a static image. It should not be used to simulate
animation.

{% endAside %}

#### Formats

For packed extensions (installed from a .crx file), images can be in most formats that the Blink
rendering engine can display, including PNG, JPEG, BMP, ICO, and others (SVG is not supported).
Unpacked extensions must use images in the PNG format.

### Tooltip (title)

The tooltip, or title, appears when the user hovers the mouse on the extension's icon in the
toolbar. It is also included in the accessible text spoken by screenreaders when the button gets
focus.

The default tooltip is set from the `default_title` field of the `action` object in `manifest.json`.
You can also set it programmatically with the `action.setTitle()` method.

### Badge

Actions can optionally display a "badge" &mdash; a bit of text layered over the icon. This makes it
easy to update the action to display a small amount of information about the state of the extension,
such as a counter. The badge has a text component and a background color.

Note that the badge has limited space, and should typically use four characters or fewer.

The badge does not have a default taken from the manifest; you can set it programmatically with
`action.setBadgeBackgroundColor()` and `action.setBadgeText()`. When setting the color, the values
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

### Popup

An action's popup will be shown when the user clicks on the extension's action button in the
toolbar. The popup can contain any HTML contents you like, and will be automatically sized to fit
its contents. The popup cannot be smaller than 25x25 and cannot be larger than 800x600.

The popup is initially set from the `default_popup` property in the `action` key in the
`manifest.json` file. If present, this should point to a relative path within the extension
directory. It can also be updated dynamically to point to a different relative path using the
`action.setPopup()` method.

{% Aside %}

The `action.onClicked` event will not be dispatched if the extension action has specified a popup to
show on click on the current tab.

{% endAside %}

## Per-tab state

Extension actions can have different states for each tab. For instance, you could set the badge text
to be different on each tab (to show tab-specific state). You can set the value for an individual
tab using the `tabId` property in the various setting methods on the `action` API. For instance, to
set the badge text on a specific tab, you would do something like the following:

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

If the `tabId` property is omitted, the setting is treated as a global setting. Tab-specific
settings take priority over any global settings.

## Enabled state

By default, toolbar actions are enabled (clickable) on every tab. You can control this using the
`action.enable()` and `action.disable()` methods. This only affects whether the popup (if any) or
`action.onClicked` event is dispatched to your extension; it does not affect the action's presence
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

### Emulating pageActions with declarativeContent

The chrome.action API replaced the [browserAction][api-browser-action] and
[pageAction][api-page-action] APIs in Manifest V3. By default, actions are similar to browser
actions, but it is possible to emulate the behavior of a page action using the action API.

This example shows how an extension's background logic can (a) disable the action by default and (b)
use [declarativeContent][api-declarative-content] to enable the action on specific sites.

```js
// background.js

// Wrap in an onInstalled callback in order to avoid unnecessary work
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

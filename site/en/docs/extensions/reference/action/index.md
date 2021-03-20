---
api: action
---

You can use the `chrome.action` API to control the toolbar button for your
extension in Chrome's UI.  The action icons are displayed in the browser
toolbar, to the right of the omnibox (on left-to-right devices). After
installation, by default, these appear in the extensions menu (the puzzle
piece). Users can choose to pin your extension icon to the toolbar.

Note that every extension will have an icon in the toolbar in Chrome, even if
the `action` key is not specified.

## Manifest

In order to use the `chrome.action` API, you need to specify a
`"manifest_version"` of `3` or higher and include the `action` key in your
[manifest file][manifest].

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

The icon is the main image used in the toolbar button. Icons are 16 DIPs
(device-independent pixels) wide and tall. The icon is initially set by the
`default_icon` key in the `action` entry in the `manifest.json` file. This
key is a dictionary of sizes to image paths. Chrome will use these icons to
choose which image scale to use. If an exact match is not found, Chrome will
select the closest available and scale it to fit the image. However, this
scaling can cause the icon to lose detail or look fuzzy.

Since devices with less-common scale factors like 1.5x or 1.2x are becoming
more common, you are encouraged to provide multiple sizes for your icons. This
also ensures that if the icon display size is ever changed, you don't need to
do any more work to provide different icons.

The icon can also be set programmatically using the `action.setIcon()` method.
This can be used to specify a different image path or to provide a
dynamically-generated icon using the [HTML canvas element][canvas], or, if
setting from an extension service worker, the
[offscreen canvas][offscreencanvas] API.

```js
const canvas = new OffscreenCanvas(16, 16);
const context = canvas.getContext('2d');
context.clearRect(0, 0, 16, 16);
context.fillStyle = '#00FF00';  // Green
context.fillRect(0, 0, 16, 16);
const imageData = context.getImageData(0, 0, 16, 16);
chrome.action.setIcon({imageData: imageData}, () => { ... });
```

{% Aside %}
The `action.setIcon()` API is intended to set a static image. It should not
be used to simulate animation.
{% endAside %}

#### Formats

For packed extensions (installed from a .crx file), images can be in most
formats that the Blink rendering engine can display, including PNG, JPEG,
BMP, ICO, and others (SVG is not supported). Unpacked extensions must use
images in the PNG format.

### Tooltip (title)

The tooltip, or title, appears when the user hovers the mouse of the
extension's icon in the toolbar. It is also included in the accessible text
spoken by screenreaders when the button gets focus.

The default tooltip is set from the `default_title` field in the `action`
`manifest.json` file. You can also set it programmatically with the
`action.setTitle()` method.

### Badge

Actions can optionally display a "badge" &mdash; a bit of text layered over the
icon. This makes it easy to update the action to display a small amount of
information about the state of the extension, such as a counter. The badge has a
text component and a background color.

Note that the badge has limited space, and should typically use four characters
or fewer.

The badge does not have a default taken from the manifest; you can set it
programmatically with `action.setBadgeBackgroundColor()` and
`action.setBadgeText()`. When setting the color, the values can be either
an array of four integers in the range of 0 - 255 that make up the RGBA
color of the badge or a string with a CSS hex color value.

```js
chrome.action.setBadgeBackgroundColor(
    {color: [0, 255, 0, 0]},  // Green
    () => { ... });

chrome.action.setBadgeBackgroundColor(
    {color: '#00FF00'}  // Also green
    () => { ... });
```

### Popup

An action's popup will be shown when the user clicks on the extension's action
button in the toolbar. The popup can contain any HTML contents you like, and
will be automatically sized to fit its contents. The popup cannot be smaller
than 25x25 and cannot be larger than 800x600.

The popup is initially set from the `default_popup` property in the `action`
key in the `manifest.json` file. If present, this should point to a relative
path within the extension directory. It can also be updated dynamically to
point to a different relative path using the `action.setPopup()` method.

{% Aside %}
The `action.onClicked` event will not be dispatched if the extension action
has specified a popup to show on click on the current tab.
{% endAside %}

## Per-tab state

Extension actions can have different states for each tab. For instance, you
could set the badge text to be different on each tab (to show tab-specific state).
You can set the value for an individual tab using the `tabId` property in the
various setting methods on the `action` API. For instance, to set the badge
text on a specific tab, you would do something like the following:

```js
const tabId = getTabId();
const tabMessage = getTabMessage(tabId);
chrome.action.setBadgeText(
    {text: tabMessage, tabId: tabId},
    () => { ... });
```

If the `tabId` property is omitted, the setting is treated as a global setting.
Tab-specific settings take priority over any global settings.

## Enabled state

By default, toolbar actions are enabled (clickable) on every tab. You can
control this using the `action.enable()` and `action.disable()` methods.
This only affects whether the popup (if any) or `action.onClicked` event
is dispatched to your extension; it does not affect the action's presence in the
toolbar.

[manifest]: /docs/extensions/mv3/manifest
[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
[offscreencanvas]: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

---
api: browserAction
---

In the following figure, the multicolored square to the right of the address bar is the icon for a
browser action. A popup is below the icon.

![](browser-action.png)

If you want to create an icon that isn't always visible, use a [page action][1] instead of a browser
action.

## Manifest

Register your browser action in the [extension manifest][2] like this:

```json
{
  "name": "My extension",
  ...
  "action": {
    "default_icon": {                // optional
      "16": "images/icon16.png",     // optional
      "24": "images/icon24.png",     // optional
      "32": "images/icon32.png"      // optional
    },
    "default_title": "Google Mail",  // optional, shown in tooltip
    "default_popup": "popup.html"    // optional
  },
  ...
}
```

You can provide any size icon to be used in Chrome, and Chrome will select the closest one and scale
it to the appropriate size to fill the 16-dip space. However, if the exact size isn't provided, this
scaling can cause the icon to lose detail or look fuzzy.

Since devices with less-common scale factors like 1.5x or 1.2x are becoming more common, you are
encouraged to provide multiple sizes for your icons. This also ensures that if the icon display size
is ever changed, you don't need to do any more work to provide different icons!

The old syntax for registering the default icon is still supported:

```json
{
  "name": "My extension",
  ...
  "browser_action": {
    ...
    "default_icon": "images/icon32.png"  // optional
    // equivalent to "default_icon": { "32": "images/icon32.png" }
  },
  ...
}
```

## Parts of the UI

A browser action can have an [icon][3], a [tooltip][4], a [badge][5], and a [popup][6].

### Icon

The browser action icons in Chrome are 16 dips (device-independent pixels) wide and high. Larger
icons are resized to fit, but for best results, use a 16-dip square icon.

You can set the icon in two ways: using a static image or using the HTML5 [canvas element][7]. Using
static images is easier for simple applications, but you can create more dynamic UIs—such as
smooth animation—using the canvas element.

Static images can be in any format WebKit can display, including BMP, GIF, ICO, JPEG, or PNG. For
unpacked extensions, images must be in the PNG format.

To set the icon, use the **default_icon** field of **browser_action** in the [manifest][8], or call
the [`browserAction.setIcon`][9] method.

To properly display icon when screen pixel density (ratio `size_in_pixel / size_in_dip`) is
different than 1, the icon can be defined as set of images with different sizes. The actual image to
display will be selected from the set to best fit the pixel size of 16 dip. The icon set can contain
any size icon specification, and Chrome will select the most appropriate one.

### Tooltip

To set the tooltip, use the **default_title** field of **browser_action** in the [manifest][10], or
call the [`browserAction.setTitle`][11] method. You can specify locale-specific strings for the
**default_title** field; see [Internationalization][12] for details.

### Badge

Browser actions can optionally display a _badge_—a bit of text that is layered over the icon.
Badges make it easy to update the browser action to display a small amount of information about the
state of the extension.

Because the badge has limited space, it should have 4 characters or less.

Set the text and color of the badge using [`browserAction.setBadgeText`][13] and
[`browserAction.setBadgeBackgroundColor`][14], respectively.

### Popup

If a browser action has a popup, the popup appears when the user clicks the extension's icon. The
popup can contain any HTML contents that you like, and it's automatically sized to fit its contents.
The popup cannot be smaller than 25x25 and cannot be larger than 800x600.

To add a popup to your browser action, create an HTML file with the popup's contents. Specify the
HTML file in the **default_popup** field of **browser_action** in the [manifest][15], or call the
[`browserAction.setPopup`][16] method.

## Tips

For the best visual impact, follow these guidelines:

- **Do** use browser actions for features that make sense on most pages.
- **Don't** use browser actions for features that make sense for only a few pages. Use [page
  actions][17] instead.
- **Do** use big, colorful icons that make the most of the 16x16-dip space. Browser action icons
  should seem a little bigger and heavier than page action icons.
- **Don't** attempt to mimic Google Chrome's monochrome menu icon. That doesn't work well with
  themes, and anyway, extensions should stand out a little.
- **Do** use alpha transparency to add soft edges to your icon. Because many people use themes, your
  icon should look nice on a variety of background colors.
- **Don't** constantly animate your icon. That's just annoying.

## Examples

You can find simple examples of using browser actions in the [examples/api/browserAction][18]
directory. For other examples and for help in viewing the source code, see [Samples][19].

[1]: /docs/extensions/pageAction
[2]: /docs/extensions/mv2/tabs
[3]: #icon
[4]: #tooltip
[5]: #badge
[6]: #popup
[7]: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
[8]: #manifest
[9]: #method-setIcon
[10]: #manifest
[11]: #method-setTitle
[12]: /extensions/i18n
[13]: #method-setBadgeText
[14]: #method-setBadgeBackgroundColor
[15]: #manifest
[16]: #method-setPopup
[17]: /extensions/pageAction
[18]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/browserAction/
[19]: /docs/extensions/mv2/samples

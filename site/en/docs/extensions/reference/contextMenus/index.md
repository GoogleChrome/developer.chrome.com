---
api: contextMenus
---

## Usage

Context menu items can appear in any document (or frame within a document), even those with file://
or chrome:// URLs. To control which documents your items can appear in, specify the
documentUrlPatterns field when you call the `create()` or `update()` method.

You can create as many context menu items as you need, but if more than one from your extension is
visible at once, Google Chrome automatically collapses them into a single parent menu.

## Manifest

You must declare the "contextMenus" permission in your extension's manifest to use the API. Also,
you should specify a 16x16-pixel icon for display next to your menu item. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "contextMenus"
  ],
  "icons": {
    "16": "icon-bitty.png",
    "48": "icon-small.png",
    "128": "icon-large.png"
  },
  ...
}
```

## Examples

To try this API, install the [contextMenus API example][1] from the [chrome-extension-samples][2]
repository.

[1]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/contextMenus
[2]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples

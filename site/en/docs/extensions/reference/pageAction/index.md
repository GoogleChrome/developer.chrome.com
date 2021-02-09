---
api: pageAction
---

Some examples:

- Subscribe to this page's RSS feed
- Make a slideshow out of this page's photos

The RSS icon in the following screenshot represents a page action that lets you subscribe to the RSS
feed for the current page.

![](page_action.png)

Hidden page actions appear grayed out. For example, the RSS feed below is grayed out, as you can't
subscribe to the feed for the current page:

![](page_action_grey.png)

Please consider using a [browser action][1] instead, so that users can always interact with your
extension.

## Manifest

Register your page action in the [extension manifest][2] like this:

```json
{
  "name": "My extension",
  ...
  "page_action": {
    "default_icon": {                    // optional
      "16": "images/icon16.png",           // optional
      "24": "images/icon24.png",           // optional
      "32": "images/icon32.png"            // optional
    },
    "default_title": "Google Mail",      // optional; shown in tooltip
    "default_popup": "popup.html"        // optional
  },
  ...
}
```

Since devices with less-common scale factors like 1.5x or 1.2x are becoming more common, you are
encouraged to provide multiple sizes for your icons. Chrome will select the closest one and scale it
to fill the 16-dip space. This also ensures that if the icon display size is ever changed, you don't
need to do any more work to provide different icons! However, if the size difference is too extreme,
this scaling can cause the icon to lose detail or look fuzzy.

The old syntax for registering the default icon is still supported:

```json
{
  "name": "My extension",
  ...
  "page_action": {
    ...
    "default_icon": "images/icon32.png"  // optional
    // equivalent to "default_icon": { "32": "images/icon32.png" }
  },
  ...
}
```

## Parts of the UI

Like browser actions, page actions can have an icon, a tooltip, and popup; they can't have badges,
however. In addition, page actions can be grayed out. You can find information about icons,
tooltips, and popups by reading about the [browser action UI][3].

You make a page action appear and be grayed out using the [`pageAction.show`][4] and
[`pageAction.hide`][5] methods, respectively. By default, a page action appears grayed out. When you
show it, you specify the tab in which the icon should appear. The icon remains visible until the tab
is closed or starts displaying a different URL (because the user clicks a link, for example).

## Tips

For the best visual impact, follow these guidelines:

- **Do** use page actions for features that make sense for only a few pages.
- **Don't** use page actions for features that make sense for most pages. Use [browser actions][6]
  instead.
- **Don't** constantly animate your icon. That's just annoying.

## Examples

You can find simple examples of using page actions in the [examples/api/pageAction][7] directory.
For other examples and for help in viewing the source code, see [Samples][8].

[1]: /docs/extensions/browserAction
[2]: /docs/extensions/mv2/tabs
[3]: /docs/extensions/browserAction#ui
[4]: #method-show
[5]: #method-hide
[6]: /docs/extensions/browserAction
[7]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/pageAction/
[8]: /docs/extensions/mv2/samples

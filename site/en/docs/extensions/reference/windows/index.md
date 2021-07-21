---
api: windows
extra_permissions_html:
  The <code>chrome.windows</code> API can be used without declaring any permission. However, the <code>"tabs"</code> permission is required in order to populate the <code>url</code>, <code>pendingUrl</code>, <code>title</code>, and <code>favIconUrl</code> properties of <code><a href="../tabs/#type-Tab">Tab</a></code>.
---

## Manifest

When requested, a [`windows.Window`][1] will contain an array of [`tabs.Tab`][2] objects. You must
declare the `"tabs"` permission in your [manifest][3] if you require access to the [`url`][4],
[`pendingUrl`][5], [`title`][6], or [`favIconUrl`][7] properties of [`tabs.Tab`][8]. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": ["tabs"],
  ...
}
```

## The current window

Many functions in the extension system take an optional windowId parameter, which defaults to the
current window.

The _current window_ is the window that contains the code that is currently executing. It's
important to realize that this can be different from the topmost or focused window.

For example, say an extension creates a few tabs or windows from a single HTML file, and that the
HTML file contains a call to [tabs.query][9]. The current window is the window that contains the
page that made the call, no matter what the topmost window is.

In the case of the [event page][10], the value of the current window falls back to the last active
window. Under some circumstances, there may be no current window for background pages.

## Examples

![Two windows, each with one tab](windows.png)

You can find simple examples of using the windows module in the [examples/api/windows][11]
directory. Another example is in the [tabs_api.html][12] file of the [inspector][13] example. For
other examples and for help in viewing the source code, see [Samples][14].

[1]: #type-Window
[2]: /docs/extensions/tabs#type-Tab
[3]: /docs/extensions/mv2/tabs
[4]: /docs/extensions/tabs#property-Tab-url
[5]: /docs/extensions/tabs#property-Tab-pendingUrl
[6]: /docs/extensions/tabs#property-Tab-title
[7]: /docs/extensions/tabs#property-Tab-favIconUrl
[8]: /docs/extensions/tabs#type-Tab
[9]: /docs/extensions/tabs#method-query
[10]: /docs/extensions/mv2/event_pages
[11]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/windows/
[12]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/inspector/tabs_api.html
[13]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/tabs/inspector/
[14]: /docs/extensions/mv2/samples

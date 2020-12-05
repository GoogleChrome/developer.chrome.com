---
api: tabs
---

## Manifest

You can use most `chrome.tabs` methods and events without declaring any permissions in the
extension's [manifest][1] file. However, if you require access to the [`url`][2], [`pendingUrl`][3],
[`title`][4], or [`favIconUrl`][5] properties of [`tabs.Tab`][6], you must declare the `"tabs"`
permission in the manifest, as shown below:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "tabs"
  ],
  ...
}
```

## Examples

![Two tabs in a window](tabs.png)

You can find simple examples of manipulating tabs with the `chrome.tabs` API in the
[examples/api/tabs][7] directory. For other examples and for help in viewing the source code, see
[Samples][8].

[1]: /docs/extensions/mv2/tabs
[2]: #property-Tab-url
[3]: #property-Tab-pendingUrl
[4]: #property-Tab-title
[5]: #property-Tab-favIconUrl
[6]: #type-Tab
[7]:
  https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/
[8]: /docs/extensions/mv2/samples

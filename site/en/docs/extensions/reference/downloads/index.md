---
api: downloads
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

## Manifest

You must declare the `"downloads"` permission in the [extension manifest][1] to use this API.

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "downloads"
  ],
  ...
}
```

## Examples

You can find simple examples of using the `chrome.downloads` API in the [examples/api/downloads][2]
directory. For other examples and for help in viewing the source code, see [Samples][3].

[1]: /docs/extensions/mv3/manifest
[2]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/_archive/mv2/api/downloads/
[3]: /docs/extensions/mv2/samples

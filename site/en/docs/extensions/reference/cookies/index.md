---
api: cookies
---

## Manifest

To use the cookies API, you must declare the "cookies" permission in your
manifest, along with [host permissions][1] for any hosts whose cookies you want
to access. For example:

```json
{
  "name": "My extension",
  ...
  "host_permissions": [
    "*://*.google.com/"
  ],
  "permissions": [
    "cookies"
  ],
  ...
}
```

## Examples

You can find a simple example of using the cookies API in the
[examples/api/cookies][2] directory. For other examples and for help in viewing
the source code, see [Samples][3].

[1]: /docs/extensions/mv3/declare_permissions
[2]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/cookies/cookie-clearer
[3]: /docs/extensions/mv3/samples

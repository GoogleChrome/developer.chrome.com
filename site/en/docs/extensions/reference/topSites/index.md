---
api: topSites
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.

---

## Manifest

You must declare the "topSites" permission in your [extension's manifest][2] to use this API.

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "topSites",
  ],
  ...
}
```
## Examples

To try this API, install the [topSites API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/topSites) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

[1]: /docs/extensions/mv2/samples#search:topsites
[2]: /docs/extensions/mv3/manifest

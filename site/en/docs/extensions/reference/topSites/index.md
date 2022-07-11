---
api: topSites
has_warning: Yes. See <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">permissions with warnings</a> for details.

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

You can find samples of this API in [Samples][1].

[1]: /docs/extensions/mv2/samples#search:topsites
[2]: /docs/extensions/mv3/manifest

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


[1]: /docs/extensions/mv2/samples#search:topsites
[2]: /docs/extensions/mv3/manifest

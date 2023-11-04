---
api: management
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

## Manifest

You must declare the "management" permission in the [extension manifest][1] to use the management
API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "management"
  ],
  ...
}
```

[`management.getPermissionWarningsByManifest`][2], [`management.uninstallSelf`][3], and
[`management.getSelf`][4] do not require the management permission.

[1]: /docs/extensions/mv3/manifest
[2]: #method-getPermissionWarningsByManifest
[3]: #method-uninstallSelf
[4]: #method-getSelf

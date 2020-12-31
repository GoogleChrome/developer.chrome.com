---
api: idle
---

## Manifest

You must declare the "idle" permission in your extension's manifest to use the idle API. For
example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "idle"
  ],
  ...
}
```

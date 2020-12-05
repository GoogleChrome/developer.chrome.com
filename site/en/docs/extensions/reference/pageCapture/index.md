---
api: pageCapture
---

MHTML is a [standard format][1] supported by most browsers. It encapsulates in a single file a page
and all its resources (CSS files, images..).

Note that for security reasons a MHTML file can only be loaded from the file system and that it can
only be loaded in the main frame.

## Manifest

You must declare the "pageCapture" permission in the [extension manifest][2] to use the pageCapture
API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "pageCapture"
  ],
  ...
}
```

[1]: https://tools.ietf.org/html/rfc2557
[2]: /docs/extensions/mv2/tabs

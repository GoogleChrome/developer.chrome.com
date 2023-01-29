---
layout: "layouts/doc-post.njk"
title: "Manifest - name"
seoTitle: "Chrome Extensions Manifest: name"
date: 2013-05-12
updated: 2023-01-23
description: Reference documentation for the name property of manifest.json.
---

The `name` property (required) is a short, plain text string (maximum of 45
characters) that identifies the extension. For example:

```json
{
  "name": "My extension name"
}
```

You can specify a locale-specific string; see [Internationalization][api-i18n]
for details.

It is displayed in the following locations:

- Install dialog
- Extensions page (chrome://extensions)
- [Chrome Web Store][cws]

See also [Short Name](short-name).

[api-i18n]: /docs/extensions/i18n
[cws]: https://chrome.google.com/webstore
[short-name]: /docs/extensions/mv3/manifest/short_name/

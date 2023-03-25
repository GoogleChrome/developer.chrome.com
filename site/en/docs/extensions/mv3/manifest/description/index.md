---
layout: "layouts/doc-post.njk"
title: "Manifest - Description"
seoTitle: "Chrome Extensions Manifest: description"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the description property of manifest.json.
---

A plain text string (no HTML or other formatting; no more than 132 characters) that describes the
extension. For example:

```json
"description": "A description of my extension"
```

The description should be suitable for both the browser's Extensions page (chrome://extensions) and the
[Chrome Web Store][cws]. You can specify locale-specific strings for this field; see
[Internationalization][api-i18n] for details.

[cws]: https://chrome.google.com/webstore
[api-i18n]: /docs/extensions/i18n

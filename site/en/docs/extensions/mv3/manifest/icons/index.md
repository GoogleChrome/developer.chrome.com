---
layout: "layouts/doc-post.njk"
title: "Manifest - Icons"
seoTitle: "Chrome Extensions Manifest: icons"
date: 2013-05-12
updated: 2022-04-27
description: Reference documentation for the icons property of manifest.json.
---

One or more icons that represent the extension or theme. You should always provide a 128x128 icon;
it's used during installation and by the Chrome Web Store. Extensions should also provide a 48x48
icon, which is used in the extensions management page (chrome://extensions). You can also specify a
16x16 icon to be used as the favicon for an extension's pages.

Icons should generally be in PNG format, because PNG has the best support for transparency. They
can, however, be in any raster format supported by Blink, including BMP, GIF, ICO, and JPEG. 

{% Aside 'caution' %}

WebP and SVG files are not supported.

{% endAside %}

Here's an example of how to declare the icons in the manifest:

```json
 "icons": {
    "16": "icon16.png",
    "32": "icon32.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
```

{% Aside %}

You may provide icons of any other size you wish, and Chrome will attempt to use the best size where
appropriate. 

{% endAside %}

See [Extension icons][docs-cws-icons] details on Chrome Web Store requirements and best practices.

[docs-cws-icons]: /docs/webstore/images/#icons

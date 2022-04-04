---
layout: "layouts/doc-post.njk"
title: "Manifest - Icons"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the icons property of manifest.json.
---

One or more icons that represent the extension or theme. You should always provide a 128x128
icon; it's used during installation and by the Chrome Web Store. Extensions should also provide a
48x48 icon, which is used in the extensions management page (chrome://extensions). You can also
specify a 16x16 icon to be used as the favicon for an extension's pages.

Icons should generally be in PNG format, because PNG has the best support for transparency. They
can, however, be in any format supported by WebKit, including BMP, GIF, ICO, and JPEG. 

{% Aside 'caution' %}

SVG files are not supported.

{% endAside %}

Here's an
example of how to declare the icons in the manifest:

```json
"icons": { "16": "icon16.png",
           "48": "icon48.png",
          "128": "icon128.png" },
```

<div class="aside aside--note">You may provide icons of any other size you wish, and Chrome will attempt to use the best size where appropriate. For example, Windows often requires 32-pixel icons, and if the app includes a 32-pixel icon, Chrome will choose that instead of shrinking a 48-pixel icon down. However, you should ensure that all of your icons are square, or unexpected behavior may result.</div>

See [Extension icons][docs-cws-icons] for best practices.

[docs-cws-icons]: /docs/webstore/images/#icons

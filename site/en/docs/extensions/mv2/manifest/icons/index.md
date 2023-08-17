---
layout: "layouts/doc-post.njk"
title: "Manifest - Icons"
seoTitle: "Manifest V2 - Icons [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the icons property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest icons](/docs/extensions/mv3/manifest/icons) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

One or more icons that represent the extension, app, or theme. You should always provide a 128x128
icon; it's used during installation and by the Chrome Web Store. Extensions should also provide a
48x48 icon, which is used in the extensions management page (chrome://extensions). You can also
specify a 16x16 icon to be used as the favicon for an extension's pages.

Icons should generally be in PNG format, because PNG has the best support for transparency. They
can, however, be in any format supported by WebKit, including BMP, GIF, ICO, and JPEG. Here's an
example of specifying the icons:

```json
"icons": { "16": "icon16.png",
           "48": "icon48.png",
          "128": "icon128.png" },
```

<div class="aside aside--note">You may provide icons of any other size you wish, and Chrome will attempt to use the best size where appropriate. For example, Windows often requires 32-pixel icons, and if the app includes a 32-pixel icon, Chrome will choose that instead of shrinking a 48-pixel icon down. However, you should ensure that all of your icons are square, or unexpected behavior may result.</div>

If you upload your extension, app, or theme using the [Chrome Developer Dashboard][1], you'll need
to upload additional images, including at least one screenshot of your extension. For more
information, see the [Chrome Web Store developer documentation][2].

[1]: https://chrome.google.com/webstore/developer/dashboard
[2]: /docs/webstore

---
layout: "layouts/doc-post.njk"
title: "Manifest - Icons"
seoTitle: "Chrome Apps Manifest - Icons [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

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

{% Aside %}

You may provide icons of any other size you wish, and Chrome will attempt to use the best size where
appropriate. For example, Windows often requires 32-pixel icons, and if the app includes a 32-pixel
icon, Chrome will choose that instead of shrinking a 48-pixel icon down. However, you should ensure
that all of your icons are square, or unexpected behavior may result.

{% endAside %}

If you upload your extension, app, or theme using the [Chrome Developer Dashboard][3], you'll need
to upload additional images, including at least one screenshot of your extension. For more
information, see the [Chrome Web Store developer documentation][4].

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: https://chrome.google.com/webstore/developer/dashboard
[4]: /webstore

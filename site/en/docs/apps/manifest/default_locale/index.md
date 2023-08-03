---
layout: "layouts/doc-post.njk"
title: "Manifest - Default Locale"
seoTitle: "chrome Apps Manifest - Default Locale [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Specifies the subdirectory of `_locales` that contains the default strings for this extension. This
field is **required** in extensions that have a `_locales` directory; it **must be absent** in
extensions that have no `_locales` directory. For details, see [Internationalization][3].

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /extensions/i18n

---
layout: "layouts/doc-post.njk"
title: "Manifest - App"
seoTitle: "Chrome Apps Manifest - App [Deprecated]"
date: 2013-05-11
updated: 2018-04-26
description: Reference documentation for the app property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Used by [packaged apps][3] to specify the app's background scripts. Also used by [hosted apps][4] to
specify the URLs that the app uses.

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /trunk/apps/app_lifecycle#eventpage
[4]: https://developers.google.com/chrome/apps/docs/developers_guide#live

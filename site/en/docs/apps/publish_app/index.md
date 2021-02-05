---
layout: "layouts/doc-post.njk"
title: "Publish Your App"
date: 2012-09-17
updated: 2013-10-21
description: How to publish your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Packaged apps are published in the same way as other types of apps in the Chrome Web Store. For
detailed instructions, see [Publishing Your App][3].

**Tip:** If your app uses [Native Client][4], you can structure your application directory hierarchy
and zip file in a way that reduces the size of the user download package. For details, see [Reducing
the size of the user download package][5].

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /docs/apps/migration/
[3]: /docs/webstore/publish/
[4]: /docs/native-client/
[5]: /docs/native-client/devguide/distributing/#chrome-apps

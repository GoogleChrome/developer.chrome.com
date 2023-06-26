---
layout: "layouts/doc-post.njk"
title: "Manifest - Key"
seoTitle: "Chrome Apps Manifest - Key [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

This value can be used to control the unique ID of an extension, app, or theme when it is loaded
during development.

{% Aside %}

**Note:** You don't usually need to use this value. Instead, write your code so that the key value
doesn't matter by using [relative paths][3] and [extension.getURL][4].

{% endAside %}

To get a suitable key value, first install your extension from a `.crx` file (you may need to
[upload your extension][5] or [package it manually][6]). Then, in your [user data directory][7],
look in the file `Default/Extensions/_<extensionId>_/_<versionString>_/manifest.json`. You will see
the key value filled in there.

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /extensions/overview#relative-urls
[4]: /extensions/extension#method-getURL
[5]: https://chrome.google.com/webstore/developer/dashboard
[6]: /extensions/packaging
[7]: https://www.chromium.org/user-experience/user-data-directory

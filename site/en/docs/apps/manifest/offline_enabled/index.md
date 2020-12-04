---
layout: "layouts/doc-post.njk"
title: "Manifest - Offline Enabled"
#date: TODO
#updated: TODO
#description: TODO
---

!!!.aside.aside--caution

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

!!!

Whether the app or extension is expected to work offline. When Chrome detects that it is offline,
apps with this field set to true will be highlighted on the New Tab page.

As of Chrome 35, apps are assumed to be offline enabled and the default value of `"offline_enabled"`
is `true` unless `"webview"` permission is requested. In this case, network connectivity is assumed
to be required and `"offline_enabled"` defaults to `false`.

The `"offline_enabled"` value is also used to determine whether a network connectivity check will be
performed when launching an app in [Chrome OS kiosk mode][3]. A network connectivity check will be
performed when apps are not offline enabled, and app launching put on hold until the device obtains
connectivity to the Internet.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: https://developers.chrome.com/apps/migration
[3]: /apps/manifest/kiosk_enabled

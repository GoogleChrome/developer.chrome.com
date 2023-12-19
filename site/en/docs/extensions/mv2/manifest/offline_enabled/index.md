---
layout: "layouts/doc-post.njk"
title: "Manifest - Offline Enabled"
seoTitle: "Manifest V2 - Offline Enabled [Deprecated]"
date: 2013-05-12
updated: 2015-01-07
description: Reference documentation for the offline_enabled property of manifest.json.
---

{% Partial 'extensions/mv2-legacy-page.md' %}

Whether the app or extension is expected to work offline. When Chrome detects that it is offline,
apps with this field set to true will be highlighted on the New Tab page.

As of Chrome 35, apps are assumed to be offline enabled and the default value of `"offline_enabled"`
is `true` unless `"webview"` permission is requested. In this case, network connectivity is assumed
to be required and `"offline_enabled"` defaults to `false`.

The `"offline_enabled"` value is also used to determine whether a network connectivity check will be
performed when launching an app in [ChromeOS kiosk mode][1]. A network connectivity check will be
performed when apps are not offline enabled, and app launching put on hold until the device obtains
connectivity to the Internet.

[1]: /apps/manifest/kiosk_enabled

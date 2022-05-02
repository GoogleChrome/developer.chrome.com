---
layout: "layouts/doc-post.njk"
title: "Manifest - Key"
date: 2013-05-12
updated: 2022-05-02
description: Reference documentation for the key property of manifest.json.
---

This value can be used to control the unique ID of an extension, app, or theme when it is loaded
during development.

{% Aside 'note' %}

You don't usually need to use this value. Instead, write your code so that the key value doesn't
matter by using [relative paths][relative-urls] and [`runtime.getURL()`][runtime-geturl]</a>.

{% endAside %}

To get a suitable key value, first install your extension from a `.crx` file (you may need to
[upload your extension][cws-dashboard] or [package it manually][create-crx]). Then, in your [user
data directory][user-dir], look in the file
`Default/Extensions/EXTENSION_ID/EXTENSION_VERSION/manifest.json`. You will see the key value filled
in there.

[create-crx]: /docs/extensions/mv3/linux_hosting/#create
[cws-dashboard]: https://chrome.google.com/webstore/developer/dashboard
[relative-urls]: /docs/extensions/mv3/overview#relative-urls
[runtime-geturl]: /docs/extensions/reference/runtime/#method-getURL
[user-dir]: https://www.chromium.org/user-experience/user-data-directory

---
layout: "layouts/doc-post.njk"
title: "Manifest - Key"
seoTitle: "Manifest V2 - Key [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the key property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest key](/docs/extensions/mv3/manifest/key) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

This value can be used to control the unique ID of an extension, app, or theme when it is loaded
during development.

<div class="aside aside--note"><b>Note:</b> You don't usually need to use this value. Instead, write your code so that the key value doesn't matter by using <a href="/extensions/overview#relative-urls">relative paths</a> and <a href="/extensions/extension#method-getURL">extension.getURL</a>.</div>

To get a suitable key value, first install your extension from a `.crx` file (you may need to
[upload your extension][3] or [package it manually][4]). Then, in your [user data directory][5],
look in the file `Default/Extensions/EXTENSION_ID/EXTENSION_VERSION/manifest.json`. You will see the
key value filled in there.

[1]: /docs/extensions/mv2/overview#relative-urls
[2]: /docs/extensions/extension#method-getURL
[3]: https://chrome.google.com/webstore/developer/dashboard
[4]: /docs/extensions/packaging
[5]: https://www.chromium.org/user-experience/user-data-directory

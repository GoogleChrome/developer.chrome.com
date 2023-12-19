---
layout: "layouts/doc-post.njk"
title: "Manifest - Description"
seoTitle: "Manifest V2 - Description [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the description property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest description](/docs/extensions/mv3/manifest/description) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

A plain text string (no HTML or other formatting; no more than 132 characters) that describes the
extension. The description should be suitable for both the browser's extension management UI and the
[Chrome Web Store][1]. You can specify locale-specific strings for this field; see
[Internationalization][2] for details.

[1]: https://chrome.google.com/webstore
[2]: /docs/extensions/i18n

---
layout: "layouts/doc-post.njk"
title: "Manifest - Default Locale"
seoTitle: "Manifest V2 - Default Locale [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the default_locale property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest Default Locale](/docs/extensions/mv3/manifest/default_locale) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

Specifies the subdirectory of `_locales` that contains the default strings for this extension. This
field is **required** in extensions that have a `_locales` directory; it **must be absent** in
extensions that have no `_locales` directory. For details, see [Internationalization][1].

[1]: /docs/extensions/i18n

---
layout: "layouts/doc-post.njk"
title: "Manifest - Default Locale"
seoTitle: "Chrome Extensions Manifest: default_locale"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the default_locale property of manifest.json.
---

Defines the default language of an extension that supports multiple locales. It is the name of the subdirectory in `_locales` that contains the default language for this extension. For example, the following code indicates that English is the default language:

```json
"default_locale": "en"
```

This field is **required** for localized extensions (those with a `_locales` directory), but **must be absent** in
extensions that have no `_locales` directory. For details, see [Internationalization][api-i18n].

[api-i18n]: /docs/extensions/i18n

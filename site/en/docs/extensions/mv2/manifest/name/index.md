---
layout: "layouts/doc-post.njk"
title: "Manifest - Name and Short Name"
seoTitle: "Manifest V2 - Name and Short Name [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the name and short_name properties of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest name](/docs/extensions/mv3/manifest/name) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}

The `name` and `short_name` manifest properties are short, plain text strings that identify the
extension. You can specify locale-specific strings for both fields; see [Internationalization][1]
for details.

## Name {: #name }

The `name` (maximum of 45 characters) is the primary identifier of the extension and is a required
field. It is displayed in the following locations:

- Install dialog
- Extension management UI
- [Chrome Web Store][2]

## Short Name {: #short_name }

The `short_name` (maximum of 12 characters recommended) is a short version of the extension's name.
It is an optional field and if not specified, the `name` will be used, though it will likely be
truncated. The short name is typically used where there is insufficient space to display the full
name, such as:

- App launcher
- New Tab page

[1]: /docs/extensions/i18n
[2]: https://chrome.google.com/webstore

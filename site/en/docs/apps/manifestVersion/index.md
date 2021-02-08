---
layout: "layouts/doc-post.njk"
title: "Manifest Version"
date: 2012-09-17
updated: 2019-08-12
description: Reference documentation for the manifest_version property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Applications are simply bundles of resources, wrapped up with a [`manifest.json`][3] file that
describes the package's contents. The format of this file is generally stable, but occasionally
breaking changes must be made to address important issues. Developers should specify which version
of the manifest specification their package targets by setting a `manifest_version` key in their
manifests.

## Current Version {: #current-version }

Chrome App developers must currently specify **`'manifest_version': 2`**:

```json
{
  ...,
  "manifest_version": 2,
  ...
}
```

Manifest version 1 only applied to extensions and hosted apps, not Chrome Apps. It was
[deprecated][4] in Chrome 18.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: manifest
[4]: ../extensions/manifestVersion

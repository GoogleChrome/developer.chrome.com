---
layout: "layouts/doc-post.njk"
title: "Manifest Version"
date: 2013-05-12
updated: 2021-07-29
description: Reference documentation for the manifest_version property of manifest.json.
---

An integer specifying the version of the manifest file format your package requires. For example:

```json
"manifest_version": 3
```

Supported values for this key are:

* `3`: Use the [Manifest V3][mv3] format and associated feature set.
* `2`: Use the [Manifest V2][mv2] format and associated feature set.

The current version is Manifest V3. Manifest V2 is also currently permitted, but will be phased out
in the future (see [Manifest V2 support timeline][mv2-timeline] for more details). There will be other manifest versions in the future (V4 and beyond) but these aren't
scheduled yet.

[mv3]: /docs/extensions/mv3/intro/mv3-overview/
[mv2]: /docs/extensions/mv2/manifest/
[mv2-timeline]: /docs/extensions/mv3/mv2-sunset/

---
layout: "layouts/doc-post.njk"
title: "Manifest Version"
date: 2013-05-12
updated: 2020-06-20
description: Reference documentation for the manifest_version property of manifest.json.
---

One integer specifying the version of the manifest file format your package requires. As of Chrome
88, developers _should_ specify `3` (without quotes) to use the format as described by this
document:

```json
"manifest_version": 3
```

The Version 2 deprecation timeline is not yet published.

The changes in between Version 2 and Version 3 are described in detail in the [Overview of Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/).

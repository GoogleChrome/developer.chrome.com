---
layout: "layouts/doc-post.njk"
title: "Manifest - Minimum Chrome Version"
seoTitle: "Chrome Extensions Manifest: minimum_chrome_version"
date: 2013-05-12
updated: 2023-01-04
description: Reference documentation for the minimum_chrome_version property of manifest.json.
---

An optional manifest key containing a string that defines what versions of Chrome are able to install the extension. The value set for this string must be identical to an existing Chrome browser version string. Either a full version number can be used if you need to specify a specific update to chrome, or simply the first number in the string for that version.

 ```json
{
  // ...
  "minimum_chrome_version": "107.0.5304.87", // Can also be abbreviated to "107", "107.0", or "107.0.5304"
  // ...
}
```
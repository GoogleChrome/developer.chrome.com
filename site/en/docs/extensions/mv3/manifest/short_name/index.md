---
layout: "layouts/doc-post.njk"
title: "Manifest - short_name"
date: 2013-05-12
updated: 2022-11-15
description: Reference documentation for the short_name property of manifest.json.
---

An optional manifest key defining the short version of the extension's name (maximum of 12 characters recommended). If this key is not specified, a truncated version of the `"name"` key will be used. The short name is typically used where there is insufficient space to display the full name.

```json
{
  // ...
  "short_name": "Short Name"
  // ...
}
```
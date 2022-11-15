---
layout: "layouts/doc-post.njk"
title: "Manifest - short_name"
date: 2013-05-12
updated: 2022-11-15
description: Reference documentation for the short_name property of manifest.json.
---

An optional manifest key defining the short version of the extension's name (maximum of 12 characters recommended). It is an optional field and if not specified, the name will be used, though it will likely be truncated. The short name is typically used where there is insufficient space to display the full name.

```json
{
  // ...
 "short_name": "Short Name"
  // ...
}
```
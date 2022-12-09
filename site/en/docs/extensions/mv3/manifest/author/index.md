---
layout: "layouts/doc-post.njk"
title: "Manifest - Author"
date: 2022-10-03
updated: 2022-10-03
description: Reference documentation for the author name property of manifest.json.
---

An optional Manifest key containing a String for a valid email address. If provided, the address should belong to the publisher of the Chrome extension on the Chrome Web Store. For an individual, this can be a personal email address, while businesses may use a contact address. 

```json
{
  // ...
    "author": "example@email.com",
  // ...
}
```
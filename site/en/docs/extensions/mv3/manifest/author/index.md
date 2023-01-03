---
layout: "layouts/doc-post.njk"
title: "Manifest - Author"
date: 2022-10-03
updated: 2022-10-03
description: Reference documentation for the author name property of manifest.json.
---

An optional manifest key that takes an object with an "email" key (see the example below). This is the email address of the extension author. When publishing a CRX file to the Chrome Web Store, this string MUST match the email address of the account used to publish the extension. 

```json
{
  // ...
  "author": {
    "email": "user@example.com"
  },
  // ...
}
```
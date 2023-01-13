---
layout: "layouts/doc-post.njk"
title: "Manifest - oauth2"
date: 2022-11-14
updated: 
description: Reference documentation for the oauth2 property of manifest.json.
---

An optional manifest key enabling the use of an OAuth 2.0 security ID on the extension. This key takes an object with two required sub-properties: `"client_id"` and `"scopes"`. When developing an extension that uses an `"oauth2"` key, consider also setting the extension's [`"key"`](/docs/extensions/mv3/manifest/key/) to keep a [consistent extension ID](/docs/extensions/mv3/tut_oauth/#keep-consistent-id).

 For more detailed implementation instructions, visit the full [OAuth 2.0 tutorial](/docs/extensions/mv3/tut_oauth/).
 ```json
{
  // ...
     "oauth2": {
      "client_id": "YOUR_EXTENSION_OAUTH_CLIENT_ID.apps.googleusercontent.com",
      "scopes": ["https://www.googleapis.com/auth/contacts.readonly"]
    },
    "key": "EXTENSION_PUBLIC_KEY",
  // ...
}
```
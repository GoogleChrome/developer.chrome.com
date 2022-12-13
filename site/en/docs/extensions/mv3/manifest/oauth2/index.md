---
layout: "layouts/doc-post.njk"
title: "Manifest - oauth2"
date: 2022-11-14
updated: 
description: Reference documentation for the oauth2 property of manifest.json.
---

An optional manifest key enabling the use of an OAuth 2.0 security ID on the extension. Implementing this manifest key will require the use of the sub-properties "client_id" and "scopes", as well as the "key" property. For more detailed implementation instructions, visit the full [OAuth 2.0 tutorial](/docs/extensions/mv3/tut_oauth/).
 ```json
{
  // ...
     "oauth2": {
      "client_id": "yourExtensionOAuthClientIDWillGoHere.apps.googleusercontent.com",
      "scopes": ["https://www.googleapis.com/auth/contacts.readonly"]
    },
    "key": "EXTENSION_PUBLIC_KEY",
  // ...
}
```
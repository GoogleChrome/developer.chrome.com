---
layout: "layouts/doc-post.njk"
title: "Manifest - background"
date: 2023-05-24
updated: 
description: Reference documentation for the background property of manifest.json.
---

An optional manifest key used to specify a javascript file as the extension service worker. A service worker is a background script that acts as the extension's main event handler. For more information, visit the [more comprehensive introduction to service workers](/docs/extensions/mv3/service_workers/#manifest).

```json
{
  ...
   "background": {
      "service_worker": "service-worker.js",
      "type": "module"
    },
  ...
}
```

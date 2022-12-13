---
layout: "layouts/doc-post.njk"
title: "Manifest - offline_enabled"
date: 2022-11-15
updated: 
description: Reference documentation for the offline_enabled property of manifest.json.
---

An optional manifest key enabling the use of the extension while offline. Extensions will perform an internet connection check on startup that determines if the extension will run. Extensions that can perform normally while offline can opt to ignore this network check and run anyway when there is no internet connectivity. 

```json
{
  // ...
 "offline_enabled": true
  // ...
}
```
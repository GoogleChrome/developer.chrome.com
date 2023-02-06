---
layout: "layouts/doc-post.njk"
title: "Manifest - Homepage Url"
seoTitle: "Chrome Extensions Manifest: Homepage Url"
date: 2013-05-12
updated: 2023-01-04
description: Reference documentation for the homepage_url property of manifest.json.
---

An optional manifest key containing a string for a valid homepage URL. Developers may choose to set the extension's homepage to their personal or company's website. If the parameter is left undefined, the default homepage will be the extension's Chrome Web Store page listed on the extensions management page (chrome://extensions). This field is particularly useful if you [host the extension on your own site][1]. 

 ```json
{
  // ...
  "homepage_url": "https://example.com,",
  // ...
}
```

[1]: /docs/extensions/mv3/hosting

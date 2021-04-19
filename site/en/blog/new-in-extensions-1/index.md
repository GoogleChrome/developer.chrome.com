---
layout: 'layouts/blog-post.njk'
title: An example blog post
description: >
  Web Accessible Resources for Manifest is here! Now `manifest.json` supports permission definitions. Developers can restrict resources based on the requesting site origin or extension id.
subhead: >
  New and improved Web Accessible Resources for Manifest V3!
date: 2021-04-20
updated: 2021-04-20
authors:
  - solomonkinard
  - simeonv
tags:
  - extensions
  - privacy
  - security
---

New and improved Web Accessible Resources for Manifest V3!

## Summary

Web Accessible Resources for Manifest is here! Now `manifest.json` supports permission definitions. Developers can restrict resources based on the requesting site origin or extension id.

## Examples

`manifest.json`

Wildcard site:
```
{
  "web_accessible_resources": [
    {
      "resources": ["a.png"],
      "matches": ["*://*/*"]
    }
  ],
  ...
}
```

Site specific:

```
{
  "web_accessible_resources": [
    {
      "resources": ["a.png"],
      "matches": ["https://example.com/*"]
    }
  ],
  ...
}
```


Extension specific:

```
{
  "web_accessible_resources": [
    {
      "resources": ["a.png"],
      "extension_ids": ["abcdefghijlkmnopabcdefghijlkmnop"]
    }
  ],
  ...
}
```

Extension and site specific:

```
{
  "web_accessible_resources": [
    {
      "resources": ["a.png"],
      "matches": ["https://example.com/*"],
      "extension_ids": ["abcdefghijlkmnopabcdefghijlkmnop"]
    }
  ],
  ...
}
```

## Links

* [Demo](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api/web-accessible-resources)
* [Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/)


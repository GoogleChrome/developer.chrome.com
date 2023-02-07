---
layout: 'layouts/blog-post.njk'
title: Web Accessible Resources for Manifest V3
description: >
  Web Accessible Resources for Manifest V3 is here! Now `manifest.json` supports permission
  definitions. Developers can restrict resources based on the requesting site origin or extension
  id.
subhead: >
  New and improved Web Accessible Resources for Manifest V3!
date: 2021-04-20
updated: 2021-04-20
authors:
  - solomonkinard
  - dotproto
tags:
  - extensions-news
  - privacy
  - security
draft: true
---

New and improved Web Accessible Resources for Manifest V3!

## Summary

Web Accessible Resources for Manifest V3 is here! Now `manifest.json` supports permission
definitions. Developers can restrict resources based on the requesting site origin or extension id.

## Examples

Wildcard site:

```json
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

```json
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

```json
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

```json
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

* [Demo][war-example]
* [Docs][war-docs]

## Launched

m89

[war-example]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/web-accessible-resources
[war-docs]: https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/

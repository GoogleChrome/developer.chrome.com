---
layout: "layouts/doc-post.njk"
title: "Working with favicons"
seoTitle: "Chrome Extensions: Working with favicons"
date: 2023-01-10
# updated: 2023-02-14
description: How to access a websites' favicon in a Chrome extension.
---

## Overview {: #overview }

A favicon (short for "favorite icon") is a small icon that is displayed in the browser's address bar. Favicons are typically used to identify and differentiate websites.

This article describes how to retrieve a website’s favicon in a Manifest version 3 extension.

## Accessing a websites favicon {: #how-to} 

To retrieve the favicon of a website, you need the `"favicon"` permission in the manifest and construct the following URL:

```text
chrome-extension://EXTENSION_ID/_favicon/?pageUrl=EXAMPLE_URL&size=32
```

The `EXTENSION_ID` is the extension's unique ID and `EXAMPLE_URL` is the website you want to retrieve the favicon from.

These steps are described:  

### Update the manifest {: #manifest }

```json
{
  "name": "My favicon extension", 
  "manifest_version": 3,
  ...  
  "permissions": ["favicon"],
  ...
}
```


```json
{
  ...
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "permissions": ["favicon"],
  "web_accessible_resources": [
    {
      "resources": ["_favicon/*"],
      "matches": ["<all_urls>"],
      "extension_ids": ["*"]
    }
  ]
  ...
}
```

### Construct the URL {: #url }

The following code uses `runtime.getURL()` to get a   

retrieves the 32 px favicon of www.google.com and displays it in a popup:  

```js
function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u); // this encodes the URL as well
  url.searchParams.set("size", "32");
  return url.toString();
}

window.onload = e => {
  const img = document.createElement('img');
  // chrome-extension://EXTENSION_ID/_favicon/?pageUrl=https%3A%2F%2Fwww.google.com&size=32
  img.src = faviconURL("https://www.google.com") 
  document.body.appendChild(img);
  ;
}
```

### Example {: #example }

<!-- ASIDE
For this to work in a content script, remember to add _favicon as a war -->



[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-war]: /docs/extensions/mv3/manifest/web_accessible_resources/
[doc-cs]: /docs/extensions/mv3/content_scripts/
[gh-favicon-api]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api/favicon
[gh-favicon-cs]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/example/favicon-cs
[mdn-favicon]: https://developer.mozilla.org/docs/Glossary/Favicon

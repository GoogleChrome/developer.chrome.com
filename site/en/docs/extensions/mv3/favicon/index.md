---
layout: "layouts/doc-post.njk"
title: "Fetching favicons"
seoTitle: "Fetching favicons in Chrome extensions"
date: 2023-01-11
# updated: 2023-02-14
description: How to get a website's favicon.
---

## Overview {: #overview }

A [favicon][mdn-favicon] (short for "favorite icon") is a small icon that is displayed in the browser's address bar. Favicons are typically used to identify and differentiate websites.
This article describes how to retrieve a website’s favicon in a Manifest V3 extension.

## Accessing a website's favicon {: #how-to } 

To retrieve the favicon of a website, you need to construct the following URL:

```text
chrome-extension://EXTENSION_ID/_favicon/?pageUrl=EXAMPLE_URL&size=FAV_SIZE
```

`EXTENSION_ID`
: The ID of your extension.

`EXAMPLE_URL`
: The URL of the favicon's website.

`FAV_SIZE`
: The size of the favicon. The most common size is 16 x 16 pixels.

The following steps describe how to construct this URL in a Chrome extension:  

### Step 1: update the manifest {: #manifest }

First, you must request the `"favicon"` permission in the [manifest][doc-manifest].

```json/4
{
  "name": "Favicon API in a popup",
  "manifest_version": 3,
  ...
  "permissions": ["favicon"],
  ...
}
```

{% Aside 'caution' %}

The `"favicon"` permission only [triggers a warning][doc-perms-warn] if the `"tabs"` permission or [host permissions][doc-match] have not already been requested. 

{% endAside %}

In addition, when fetching favicons in [content scripts][doc-cs], the `"_favicon/*"` folder must be declared as a [web accessible resource][doc-war]. For example:

```json/10-16
{
  "name": "Favicon API in content scripts",
  "manifest_version": 3,
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

### Step 2: construct the URL {: #url }

The following function uses [`runtime.getURL()`][runtime-geturl] to create a fully-qualified URL pointing to the `"_favicon/"` folder. Then it returns a new string representing the URL with several query parameters. Finally, the extension appends the image to the body. 

```js
function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "32");
  return url.toString();
}

const img = document.createElement('img');
img.src = faviconURL("https://www.google.com") 
document.body.appendChild(img);
```

This example is a `www.google.com` 32px favicon URL that includes a random extension ID:

```text
chrome-extension://eghkbfdcoeikaepkldhfgphlaiojonpc/_favicon/?pageUrl=https%3A%2F%2Fwww.google.com&size=32
```

## Extension examples {: #example }

There are two favicon examples in the [chrome-extension-samples][gh-samples] repository:

- [Favicon popup][gh-favicon-api] example. 
- [Favicon content script][gh-favicon-cs] example. 

[doc-cs]: /docs/extensions/mv3/content_scripts/
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-match]: /docs/extensions/mv3/match_patterns/
[doc-perms-warn]: /docs/extensions/mv3/permission_warnings/#permissions_with_warnings
[doc-war]: /docs/extensions/mv3/manifest/web_accessible_resources/
[gh-favicon-api]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/favicon
[gh-favicon-cs]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.favicon-cs
[gh-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/
[mdn-favicon]: https://developer.mozilla.org/docs/Glossary/Favicon
[runtime-geturl]: /docs/extensions/reference/runtime/#method-getURL


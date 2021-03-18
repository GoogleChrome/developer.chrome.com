---
layout: "layouts/doc-post.njk"
title: "Manifest - Web Accessible Resources"
date: 2013-05-12
updated: 2018-05-14
description: Reference documentation for the web_accessible_resources property of manifest.json.
---

An array of objects that specify accessiblity of resources. Each object maps a set of extension
resources to a set of URLs or extensions that can access those resources.

```json
{
  ...
  "web_accessible_resources": [
    "images/*.png",
    "style/double-rainbow.css",
    "script/double-rainbow.js",
    "script/main.js",
    "templates/*"
  ],
  ...
}
```

These resources would then be available in a webpage via the URL
`chrome-extension://[PACKAGE ID]/[PATH]`, which can be generated with the [extension.getURL][1]
method. Allowlisted resources are served with appropriate [CORS][2] headers, so they're available
via mechanisms like XHR.

A navigation from a web origin to an extension resource will be blocked unless the resource is
listed as web accessible. Note these corner cases:

- When an extension uses the [webRequest][3] or [declarativeWebRequest][4] APIs to redirect a public
  resource request to a resource that is not web accessible, such request is also blocked.
- The above holds true even if the resource that is not web accessible is owned by the redirecting
  extension.

[Content scripts][5] themselves do not need to be allowlisted.

Prior to manifest version 2 all resources within an extension could be accessed from any page on the
web. This allowed a malicious website to [fingerprint][6] the extensions that a user has installed
or exploit vulnerabilities (for example [XSS bugs][7]) within installed extensions. Limiting
availability to only resources which are explicitly intended to be web accessible serves to both
minimize the available attack surface and protect the privacy of users.

## Default Availability {: #availability }

Resources inside of packages using [`manifest_version`][8] 2 or above are **blocked by default**,
and must be allowlisted for use via this property.

Resources inside of packages using `manifest_version` 1 are available by default, but _if_ you do
set this property, then it will be treated as a complete list of all allowlisted resources.
Resources not listed will be blocked.

[1]: /docs/extensions/extension#method-getURL
[2]: https://www.w3.org/TR/cors/
[3]: /docs/extensions/webRequest
[4]: /docs/extensions/declarativeWebRequest
[5]: /docs/extensions/mv3/content_scripts
[6]: https://en.wikipedia.org/wiki/Device_fingerprint
[7]: https://en.wikipedia.org/wiki/Cross-site_scripting
[8]: /docs/extensions/mv3/tabs#manifest_version

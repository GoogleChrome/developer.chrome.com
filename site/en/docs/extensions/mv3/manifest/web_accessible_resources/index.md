---
layout: "layouts/doc-post.njk"
title: "Manifest - Web Accessible Resources"
seoTitle: "Chrome Extensions Manifest: web_accessible_resources"
date: 2013-05-12
updated: 2023-02-16
description: Reference documentation for the web_accessible_resources property of manifest.json.
---

Web-accessible resources are files inside an extension that can be accessed by web pages or other
extensions. Extensions typically use this feature to expose images or other assets that need to be
loaded in web pages, but any asset included in an extension's bundle can be made web accessible.

By default no resources are web accessible, as this allows a malicious website to [fingerprint][6] extensions that a user has installed
or exploit vulnerabilities (for example [XSS bugs][7]) in installed extensions. Only pages or scripts loaded from an extension's origin
can access that extension's resources. 

## Manifest declaration

Use the `web_accessible_resources` manifest property to declare which resources are exposed and to
what origins. This property is an array of objects that declares resource access rules. Each object
maps an array of extension resources to an array of URLs and/or extension IDs that can access those resources.

```json
{
  ...
  "web_accessible_resources": [
    {
      "resources": [ "test1.png", "test2.png" ],
      "matches": [ "https://web-accessible-resources-1.glitch.me/*" ]
    }, {
      "resources": [ "test3.png", "test4.png" ],
      "matches": [ "https://web-accessible-resources-2.glitch.me/*" ],
      "use_dynamic_url": true
    }
  ],
  ...
}
```

Each object in the array contains these elements:

`"resources"`
: An array of strings, each containing a relative path to a given resource from the extension's root directory. Resources may contain asterisks (`*`) for wildcard matches. For example, `"/images/*"` exposes everything in the extension's `images/` directory, recursively, while `"*.png"` exposes all PNG files.

`"matches"`
: An array of strings, each containing a [match pattern](/docs/extensions/mv3/match_patterns/) that specifies which sites can access this set of resources. Only the origin is used to match URLs. Origins include subdomain matching. Google Chrome emits an "Invalid match pattern" error if the pattern has a path other than '/*'.

`"extension_ids"`
: An array of strings, each containing the ID of an extension that can access the resources.

`"use_dynamic_url"`
: If true, only allow resources to be accessed through a dynamic ID. A dynamic ID is generated per session. That means it is regenerated when the browser restarts or the extension reloads.

Each element must include a `"resources"` element and either a `"matches"` or `"extension_ids"` element. This establishes a mapping that exposes the specified resources to either web pages matching the pattern or to extensions with matching IDs. The `"use_dynamic_url"` element is optional.

## Navigability of resources

Resources are available in a webpage via the URL
`chrome-extension://[PACKAGE ID]/[PATH]`, which can be generated with the [`runtime.getURL()`][1]
method. The resources are served with appropriate [CORS][2] headers, so they're available
via `fetch()`.

A navigation from a web origin to an extension resource is blocked unless the resource is
listed as web accessible. Note these corner cases:

- When an extension uses the [webRequest][3] API to redirect a public
  resource request to a resource that is not web accessible, such a request is also blocked.
- The above holds true even if the resource that is not web accessible is owned by the redirecting
  extension.
- Navigation is blocked in incognito mode unless the value of the [`"incognito"` field](/docs/extensions/mv3/manifest/incognito/) is set to `"split"`.

[Content scripts][5] themselves do not need to be allowed.

## Example

The [Web Accessible Resources example][war-example] demonstrates the use of this element in a working extension.

[war-example]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/web-accessible-resources
[1]: /docs/extensions/reference/extension/#method-getURL
[2]: https://www.w3.org/TR/cors/
[3]: /docs/extensions/reference/webRequest/
[4]: /docs/extensions/reference/declarativeWebRequest
[5]: /docs/extensions/mv3/content_scripts
[6]: https://en.wikipedia.org/wiki/Device_fingerprint
[7]: https://en.wikipedia.org/wiki/Cross-site_scripting
[8]: /docs/extensions/mv3/tabs#manifest_version

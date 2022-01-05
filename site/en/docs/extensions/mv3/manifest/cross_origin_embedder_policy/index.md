---
layout: "layouts/doc-post.njk"
title: "Cross-origin embedder policy"
date: 2021-08-03
#updated:
description: Reference documentation for the cross_origin_embedder_policy property of manifest.json.
---

The `cross_origin_embedder_policy` manifest key lets the extension to specify a value for the
[Cross-Origin-Embedder-Policy][mdn-coep] (COEP) response header for requests to the extension's
origin.  This includes the extension's background context (service worker or background page),
popup, options page, tabs that are open to an extension resource, etc.

Together with [cross_origin_opener_policy][doc-coop], this key allows the extension to opt
into [cross-origin isolation][doc-coi].

## Manifest declaration

{% Aside %}

This key was introduced in Chrome 93.

{% endAside %}

The `cross_origin_embedder_policy` manifest key takes an object. This object should only contain one
property named `value` with a string value. Chrome uses this string as the value of the
`Cross-Origin-Embedder-Policy` header when serving resources from the extension's origin. For
example:

```js
{
    ...
    "cross_origin_embedder_policy": {
      "value": "require-corp"
    },
    ...
}
```

See the [Cross-origin isolation overview][doc-coi] for more information about this feature.

[doc-coi]: /docs/extensions/mv3/cross-origin-isolation/
[doc-coop]: /docs/extensions/mv3/manifest/cross_origin_opener_policy/
[mdn-coep]: https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy

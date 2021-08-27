---
layout: "layouts/doc-post.njk"
title: "Cross-origin embedder policy"
date: 2021-08-03
#updated:
description: Reference documentation for the cross_origin_embedder_policy property of manifest.json.
---

The `cross_origin_embedder_policy` manifest member lets the extension to specify a value for the
[Cross-Origin-Embedder-Policy][mdn-coep] (COEP) response header for requests to the extension's
origin.  This includes the extension's background context (service worker or background page),
popup, options page, tabs that are open to an extension resource, etc.

Together with [cross_origin_opener_policy][doc-coop], this member allows the extension to opt into
[cross-origin isolation][doc-coi].

## Manifest declaration

{% Aside %}

This key was introduced in Chrome 93.

{% endAside %}

The manifest's `cross_origin_embedder_policy` member takes an object. This object should only
contain one member named `value` with a string value. Chrome uses this string as the value of the
`Cross-Origin-Embedder-Policy` header when serving resources from the extension's origin. For example:

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

[doc-coi]: /docs/extensions/mv2/cross-origin-isolation/
[doc-coop]: /docs/extensions/mv2/manifest/cross_origin_opener_policy/
[mdn-coep]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy

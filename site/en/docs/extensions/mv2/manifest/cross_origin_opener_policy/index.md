---
layout: "layouts/doc-post.njk"
title: "Cross-origin opener policy"
date: 2021-08-03
#updated:
description: Reference documentation for the cross_origin_opener_policy property of manifest.json.
---

The `cross_origin_opener_policy` manifest key lets extensions specify a value for the
[Cross-Origin-Opener-Policy][mdn-coop] (COOP) response header for requests to the extension's
origin. This includes the extension's background context (service worker or background page), popup,
options page, tabs that are open to an extension resource, etc.

Together with [cross_origin_embedder_policy][doc-coep], this key allows extensions opt into
[cross-origin isolation][doc-coi].

## Manifest declaration

{% Aside %}

This key was introduced in Chrome 93.

{% endAside %}

The `cross_origin_opener_policy` manifest key takes an object. This object should only contain one
property named `value` with a string value. Chrome uses this string as the value of the
`Cross-Origin-Opener-Policy` header when serving resources from the extension's origin. For example:

```js
{
    ...
    "cross_origin_opener_policy": {
      "value": "same-origin"
    },
    ...
}
```

See [Cross-origin isolation overview][doc-coi] for more information about this feature.

[doc-coep]: /docs/extensions/mv2/manifest/cross_origin_embedder_policy/
[doc-coi]: /docs/extensions/mv2/cross-origin-isolation/
[mdn-coop]: https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy

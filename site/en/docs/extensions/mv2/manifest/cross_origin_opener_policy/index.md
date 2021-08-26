---
layout: "layouts/doc-post.njk"
title: "Cross-origin opener policy"
date: 2021-08-03
#updated: 
description: Reference documentation for the cross_origin_opener_policy property of manifest.json.
---

The `cross_origin_opener_policy` manifest key lets extensions specify a value for the
[Cross-Origin-Opener-Policy][mdn-coop]
(COOP) response header for requests to the extension's origin.  This includes the extension's
background context (service worker or background page), popup, options page, tabs that are open to
an extension resource, etc. 

Together with the [cross_origin_embedder_policy] manifest key, this key lets extensions opt into
[cross-origin isolation][coi-overview].


## Manifest declaration 

{% Aside %}
This key was introduced in Chrome 93
{% endAside %}

The `cross_origin_opener_policy` manifest key takes a dictionary with a single key called `value`
which the extension can use to specify the response header value. For example:


```js
{
    ...
    "cross_origin_opener_policy": {
      "value": "same-origin"
    },
    ...
}
```

See the [Cross-origin isolation overview](coi-overview) for more
information about using this key.

[coi-overview]: /docs/extensions/mv2/cross-origin-isolation/
[cross_origin_embedder_policy]: /docs/extensions/mv2/manifest/cross_origin_embedder_policy/
[mdn-coop]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy

---
layout: "layouts/doc-post.njk"
title: "Cross-origin embedder policy"
date: 2021-08-03
#updated: 
description: Reference documentation for the cross_origin_embedder_policy property of manifest.json.
---

The `cross_origin_embedder_policy` manifest key allows the extension to specify a value for the
[Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
(COEP) response header for requests to the extension’s origin.  This includes the extension's
background context (service worker or background page), popup, options page, tabs that are open to
an extension resource, etc. 

Together with the `cross_origin_opener_policy` manifest key, this key allows the extension to opt
into cross-origin isolation.


## Manifest declaration 

{% Aside %}
This key was introduced in Chrome 93
{% endAside %}

The `cross_origin_embedder_policy` manifest key takes a dictionary with a single key called `value`
which the extension can use to specify the response header value. For example:


```
{
    ….
    "cross_origin_embedder_policy": {
      "value": "require-corp"
    },
    ...
}
```

See the [Cross-origin isolation overview](/docs/extensions/mv3/cross-origin-isolation) for more
information about using this key.

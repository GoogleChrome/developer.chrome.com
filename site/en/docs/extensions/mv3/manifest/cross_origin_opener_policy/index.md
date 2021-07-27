---
layout: "layouts/doc-post.njk"
title: "Cross-origin opener policy"
date: 2021-07-27
#updated: 
description: Reference documentation for the cross_origin_opener_policy property of manifest.json.
---

### Availability 

{% Aside %}
This key was introduced in Chrome 93
{% endAside %}

The `cross_origin_opener_policy` manifest key lets extensions specify a value for the
[Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)
(COOP) response header for requests to the extension’s origin.  This includes the extension's
background context (service worker or background page), popup, options page, tabs that are open to
an extension resource, etc. 

Together with the `cross_origin_embedder_policy` manifest key, this key lets extensions opt into
cross-origin isolation.


### Manifest declaration 

The `cross_origin_opener_policy` manifest key takes a dictionary with a single key called `value`
which the extension can use to specify the response header value. Example:


```
{
    ….
    "cross_origin_opener_policy": {
      "value": "same-origin"
    },
    ...
}
```


# Manifest - cross_origin_embedder_policy

Availability 

Since M93

The `cross_origin_embedder_policy` manifest key allows the extension to specify a value for the
[Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
(COEP) response header for requests to the extension’s origin.  This includes the extension's
background context (service worker or background page), popup, options page, tabs that are open to
an extension resource, etc. 

Together with the `cross_origin_opener_policy` manifest key, this key allows the extension to opt
into cross-origin isolation.


## Manifest declaration 

The `cross_origin_embedder_policy` manifest key takes a dictionary with a single key called `value`
which the extension can use to specify the response header value. Example:


```
{
    ….
    "cross_origin_embedder_policy": {
      "value": "require-corp"
    },
    ...
}
```


# Extension Cross-Origin Isolation 

[Cross-origin isolation](https://web.dev/cross-origin-isolation-guide/) enables a web page to use
powerful features such as SharedArrayBuffer. An extension can opt into cross-origin isolation by
specifying the appropriate values for `cross_origin_embedder_policy` and
`cross_origin_opener_policy` manifest keys. For example, a manifest like the following example
will allow the extension to opt into cross-origin isolation for its origin.


```
{
    "name": "CrossOriginIsolation",
    "manifest_version": 3,
    "version": "1.1",
    "cross_origin_embedder_policy": {
      "value": "require-corp"
    },
    "cross_origin_opener_policy": {
      "value": "same-origin"
    },
    ....
}
```


will allow the extension to opt into cross-origin isolation for its origin.

Opting into cross-origin isolation allows the extension to use powerful APIs like SharedArrayBuffers
in its cross-origin isolated contexts. However, it does also come with certain side-effects. See
**[Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)**
for more information on this. 


{% Aside 'caution' %}
Even if an extension opts into cross-origin isolation, not all extension contexts will be
cross-origin isolated. For example, cross-origin isolation [is not fully
implemented](https://bugs.chromium.org/p/chromium/issues/detail?id=1131404) for service and shared
workers currently. Similarly, a cross-origin isolated extension’s web-accessible subframe on a
regular web page is not considered cross-origin isolated currently. 

{% endAside %}

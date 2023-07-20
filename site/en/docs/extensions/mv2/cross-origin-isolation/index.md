---
layout: "layouts/doc-post.njk"
title: "Cross-origin isolation"
seoTitle: "MV2 - Cross-origin isolation [Deprecated]"
date: 2021-08-03
updated: 2021-11-10
description: Overview of cross-origin isolation for extensions
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Cross-origin isolation](/docs/extensions/mv3/cross-origin-isolation/) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.
{% endAside %}


[Cross-origin isolation][web-coi-guide] enables a web page to use powerful features such as
[`SharedArrayBuffer`][mdn-sharedarraybuffer]. An extension can opt into cross-origin isolation by
specifying the appropriate values for the [`cross_origin_embedder_policy`][doc-coep] and
[`cross_origin_opener_policy`][doc-coop] manifest keys. For example, a manifest like the one below
will opt the extension's origin into cross-origin isolation.

```json
{
  "name": "CrossOriginIsolation example",
  "manifest_version": 2,
  "version": "1.1",
  "cross_origin_embedder_policy": {
    "value": "require-corp"
  },
  "cross_origin_opener_policy": {
    "value": "same-origin"
  },
  ...
}
```

Opting into cross-origin isolation allows the extension to use powerful APIs like SharedArrayBuffers
in its cross-origin isolated contexts. However, it does also come with certain side-effects. See
[Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/) for
more information on this.

{% Aside 'caution' %}

Even if an extension opts into cross-origin isolation, not all extension contexts will be
cross-origin isolated. For example, cross-origin isolation [is not fully implemented][crbug-issue])
for service and shared workers currently. Similarly, a cross-origin isolated extension's
web-accessible subframe on a regular web page is not considered cross-origin isolated currently.

{% endAside %}

[crbug-issue]: https://bugs.chromium.org/p/chromium/issues/detail?id=1131404
[doc-coep]: /docs/extensions/mv2/manifest/cross_origin_embedder_policy
[doc-coop]: /docs/extensions/mv2/manifest/cross_origin_opener_policy
[mdn-sharedarraybuffer]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
[web-coi-guide]: https://web.dev/cross-origin-isolation-guide/

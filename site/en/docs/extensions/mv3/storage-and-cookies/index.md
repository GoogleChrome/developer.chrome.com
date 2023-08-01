---
layout: "layouts/doc-post.njk"
title: "Storage and Cookies"
seoTitle: "Chrome Extensions storage and cookies"
date: 2023-08-01
description: Overview of how web storage APIs and cookies work in extensions
---

Extensions can store cookies and access web storage APIs similar to a normal website. However, in
some cases these behave differently in extensions.

This article does not cover extension specific APIs. For more on these, see
[chrome.storage][chrome-storage-api].

## Storage {: #storage }

### Persistence {: #storage-persistence }

Extension storage is always persistent. For example, when a user uses the "Clear Browsing Data"
feature, this does not affect extensions. This includes any data stored using web storage APIs (such
as Local Storage and IndexedDB). Additionally, extensions are not subject to storage eviction under
heavy memory pressure.

By default, extensions are subject to the normal quota restrictions on storage, which can be checked
using the `navigator.storage.estimate()` method. However, they can request the `unlimitedStorage`
permission which affects both extension and web storage APIs.

### Access in service workers {: #storage-in-service-workers }

Some web storage APIs like IndexedDB are accessible in service workers. However, Local Storage and
Session Storage are not.

Instead, use an [offscreen document][offscreen]. For example, you could use the following to migrate
data when updating from Manifest V2 to Manifest V3:

1. In the extension service worker check `chrome.storage` for your data.
1. If your data isn't found, [create][create-offscreen] an offscreen document and call
[`sendMessage()`][send-message] to start a conversion routine. Read the data from the web storage
APIs and use message passing to return it to the service worker.
1. In the service worker, write the data to a new location.

### Partitioning {: #storage-partitioning }

To prevent certain types of cross-site tracking, [storage partitioning][storage-partitioning]
creates a seperate storage area in certain third-party contexts. In practice, this means that
if site A embeds an iframe containing site B, site B will not be able to access the same storage
it would usually have when navigated to directly.

To mitigate the impact of this in extensions, two key exemptions apply:

- If a page with the chrome-extension:// scheme is embedded in any site, storage partitioning will
not apply, and the extension will have access to its normal storage partition.
- If a page with the chrome-extension:// scheme includes an iframe, and the extension has
[host permissions][declare-permissions] for the site it is embedding, that site will also have
access to its normal storage partition.

Combined, these mean that storage partitioning is not usually something which extension developers
should need to consider.

## Cookies {: #cookies }

### Secure cookies {: #secure-cookies }

The [`Secure`][cookies-restrict-access] cookie attribute is only supported for the https:// scheme.
Consequently, chrome-extension:// pages are not able to set cookies with this attribute. This also
means that extensions cannot use the [`Partitioned`][chips] attribute, which requires that the
`Secure` attribute is also set.

### Partitioning {: #cookies-partitioning }

{% Aside %}
As of 2023, this is an ongoing area of investigation and the behavior here is subject to change. In
particular, we are currently investigating changing the behaviour when an extension with host
permissions embeds a third-party site: [https://crbug.com/1463991](https://crbug.com/1463991)
{% endAside %}

As mentioned [above](#secure-cookies), extensions cannot create partitioned cookies, and cookies
are not currently partitioned by default (see the Privacy Sandbox
[timeline][privacy-sandbox-timeline] for related work). Consequently, chrome-extension:// pages
embedded in other websites can access cookies associated with the extension origin as normal.

If a chrome-extension:// page contains an iframe, any sites it embeds will use the extension
origin as the partitioning key. This means that they will **not** be able to access partitioned
cookies associated with other partitions.

Partitioning also has implications for the [chrome.cookies][chrome-cookies] API. For more
information, see the [API reference][chrome-cookies-partitioning].

[chrome-storage-api]: /extensions/reference/storage
[offscreen]: /extensions/reference/offscreen
[on-message]: /docs/extensions/reference/runtime/#event-onMessage
[create-offscreen]: /docs/extensions/reference/offscreen/#method-createDocument
[send-message]: /docs/extensions/reference/runtime/#method-sendMessage
[storage-partitioning]: /docs/privacy-sandbox/storage-partitioning
[declare-permissions]: /docs/extensions/mv3/declare_permissions/
[cookies-restrict-access]: https://developer.mozilla.org/docs/Web/HTTP/Cookies#restrict_access_to_cookies
[chips]: /docs/privacy-sandbox/chips
[privacy-sandbox-timeline]: https://privacysandbox.com/open-web/#open-web-timeline-3pc
[chrome-cookies]: /extensions/reference/cookies
[chrome-cookies-partitioning]: /extensions/reference/cookies#partitioning

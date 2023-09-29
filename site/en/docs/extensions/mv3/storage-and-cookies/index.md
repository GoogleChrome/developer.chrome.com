---
layout: "layouts/doc-post.njk"
title: "Storage and cookies"
seoTitle: "Chrome extensions storage and cookies"
date: 2023-09-28
description: Overview of how web storage APIs and cookies work in extensions.
---

Extensions can store cookies and access web storage APIs similarly to a normal website. However, in
some cases these behave differently in extensions.

See [`chrome.storage`][chrome-storage-api] for information on the extension API.

## Storage {: #storage }

It is often desirable to use web platform storage APIs in extensions. This section explores the
behavior of these APIs in an extension context, which can sometimes differ with how they behave on the
web.

### Persistence {: #storage-persistence }

Extension storage is not cleared when a user [clears browsing data][clear-browsing-data].
This applies to any data stored using web storage APIs (such as
[Local Storage][local-storage] and [IndexedDB][indexeddb]).

By default, extensions are subject to the normal quota restrictions on storage, which can be checked
by calling [`navigator.storage.estimate()`][storage-estimate]. Storage can also be evicted under
heavy memory pressure, although this is rare. To avoid this:

- Request the `"unlimitedStorage"` permission, which affects both extension and web storage APIs and
exempts extensions from both quota restrictions and eviction.
- Call [`navigator.storage.persist()`][storage-persist] for protection against eviction.

Extension storage is shared across the extension's origin including the extension service worker,
any extension pages (including popups and the side panel), and offscreen documents. In content
scripts, calling web storage APIs accesses data from the host page the content script is injected on
and not the extension.

### Access in service workers {: #storage-in-service-workers }

The [IndexedDB][indexeddb] and [Cache Storage][cache-storage] APIs are accessible in service
workers. However, [Local Storage][local-storage] and [Session Storage][session-storage] are not.

If you need to access Local Storage or Session Storage from the service worker, use an [offscreen document][offscreen].

### Partitioning {: #storage-partitioning }

Partitioning is where keys are introduced for stored data to limit where it can be accessed. Storage
has historically been keyed by origin.

Starting in Chrome 115, [storage partitioning][storage-partitioning] introduces changes to how
partitioning keys are defined to prevent certain types of cross-site tracking. In practice, this
means that if site A embeds an iframe containing site B, site B will not be able to access the same
storage it would usually have when navigated to directly.

To mitigate the impact of this in extensions, two exemptions apply:

- If a page with the `chrome-extension://` scheme is embedded in any site, storage partitioning will
not apply, and the extension will have access to its top-level partition.
- If a page with the `chrome-extension://` scheme includes an iframe, and the extension has
[host permissions][declare-permissions] for the site it is embedding, that site will also have
access to its top-level partition.

## Cookies {: #cookies }

Cookies provide a way to store key/value pairs associated with a specific domain and path. They have
limited value in extensions but understanding their behavior can be useful if you have a specific
use case or have bundled a third-party script which uses them in its implementation.

### Secure cookies {: #secure-cookies }

The [`Secure`][cookies-restrict-access] cookie attribute is only supported for the `https://`
scheme. Consequently, `chrome-extension://` pages are not able to set cookies with this attribute.

This also means that extension pages cannot use other cookie attributes where the `Secure` attribute is
required:

- [`SameSite=None`][same-site]
- [`Partitioned`][chips]

### Partitioning {: #cookies-partitioning }

{% Aside %}
When an extension embeds a third-party site, that site will use the extension origin as the partition key. This means the site will not be able access the same cookies as if it was navigated to directly. See [https://crbug.com/1463991](https://crbug.com/1463991).
{% endAside %}

Cookies set on chrome-extension:// pages always use [`SameSite=Lax`][same-site]. Consequently, they
can never be accessed in iframes and partitioning is not relevant.

When an extension embeds a third-party website inside one of its pages, the behavior
depends on the choices on Chrome's Privacy and security settings page:

- If third-party cookies are enabled, the site can access cookies from a partition keyed based on
its origin.
- If third-party cookies are blocked, Chrome uses the extension origin as the partitioning key
for the third-party site's cookies. This means that the site will **not** be able to access
partitioned cookies associated with other partitions such as the cookies it could access if it were
navigated to directly.

This setting is part of the Privacy Sandbox work and is being adjusted according to this
[timeline][privacy-sandbox-timeline].

The [`chrome.cookies`][chrome-cookies] API currently operates on cookies from all partitions. For
more information, see the [API reference][chrome-cookies-partitioning].

[clear-browsing-data]: https://support.google.com/chrome/answer/2392709
[indexeddb]: https://developer.mozilla.org/docs/Web/API/IndexedDB_API
[local-storage]: https://developer.mozilla.org/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/docs/Web/API/Window/sessionStorage
[chrome-storage-api]: /docs/extensions/reference/storage
[offscreen]: /docs/extensions/reference/offscreen
[on-message]: /docs/extensions/reference/runtime/#event-onMessage
[create-offscreen]: /docs/extensions/reference/offscreen/#method-createDocument
[send-message]: /docs/extensions/reference/runtime/#method-sendMessage
[storage-partitioning]: /docs/privacy-sandbox/storage-partitioning
[declare-permissions]: /docs/extensions/mv3/declare_permissions/
[cookies-restrict-access]: https://developer.mozilla.org/docs/Web/HTTP/Cookies#restrict_access_to_cookies
[chips]: /docs/privacy-sandbox/chips
[same-site]: https://web.dev/samesite-cookies-explained
[privacy-sandbox-timeline]: https://privacysandbox.com/open-web/#open-web-timeline-3pc
[chrome-cookies]: /docs/extensions/reference/cookies
[chrome-cookies-partitioning]: /docs/extensions/reference/cookies#partitioning
[storage-estimate]: https://developer.mozilla.org/docs/Web/API/StorageManager/estimate
[storage-persist]: https://developer.mozilla.org/docs/Web/API/StorageManager/persist
[cache-storage]: https://developer.mozilla.org/docs/Web/API/CacheStorage

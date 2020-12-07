---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store API Reference"
#date: TODO
#updated: TODO
#description: TODO
---

This API reference is organized by resource type. Each resource type has one or more data
representations and one or more methods.

## Resource types

1.  [InAppProducts][1]
2.  [Items][2]
3.  [Licenses][3]
4.  [UserLicenses][4]
5.  [Payments][5]

## InAppProducts {: #InAppProducts }

For InAppProducts Resource details, see the [resource representation][6] page.

<table><thead><tr><th>Method</th><th>HTTP request</th><th>Description</th></tr></thead><tbody><tr class="alt"><td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless otherwise noted</td></tr><tr><td><a href="/webstore/webstore_api/inAppProducts/get/">get</a></td><td><code>GET&nbsp; /items/<var>itemId</var>/skus/<var>sku</var></code></td><td>Gets the in-app product information of an item.</td></tr><tr><td><a href="/webstore/webstore_api/inAppProducts/list/">list</a></td><td><code>GET&nbsp; /items/<var>itemId</var>/skus</code></td><td>Lists the in-app product information of an item.</td></tr></tbody></table>

## Items {: #Items }

For Items Resource details, see the [resource representation][9] page.

<table><thead><tr><th>Method</th><th>HTTP request</th><th>Description</th></tr></thead><tbody><tr class="alt"><td colspan="3">URIs relative to https://www.googleapis.com, unless otherwise noted</td></tr><tr><td><a href="/webstore/webstore_api/items/get/">get</a></td><td><code>GET<br>/chromewebstore/v1.1/items/<var>itemId</var></code></td><td>Gets a Chrome Web Store item. Provide <code>projection="DRAFT"</code> in URL (case sensitive).</td></tr><tr><td><a href="/webstore/webstore_api/items/insert/">insert</a></td><td><code>POST<br>/upload/chromewebstore/v1.1/items</code></td><td>Inserts a new item.</td></tr><tr><td><a href="/webstore/webstore_api/items/publish/">publish</a></td><td><code>POST&nbsp; /chromewebstore/v1.1/<br>items/<var>itemId</var>/publish</code></td><td>Publishes an item. Provide defined <code>publishTarget</code> in URL (case sensitive): <code>publishTarget = "trustedTesters"</code> or <code>publishTarget = "default"</code>.</td></tr><tr><td><a href="/webstore/webstore_api/items/update/">update</a></td><td><code>PUT<br>/upload/chromewebstore/v1.1/<br>items/<var>itemId</var></code><br>&nbsp;<br>and<br>&nbsp;<br><code>PUT&nbsp; /items/<var>itemId</var></code></td><td>Updates an existing item.</td></tr></tbody></table>

## Licenses {: #Licenses }

For Licenses Resource details, see the [resource representation][14] page.

<table><thead><tr><th>Method</th><th>HTTP request</th><th>Description</th></tr></thead><tbody><tr class="alt"><td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless otherwise noted</td></tr><tr><td><a href="/webstore/webstore_api/licenses/get/">get</a></td><td><code>GET&nbsp; /licenses/<var>appId</var>/<var>userId</var></code></td><td>Gets the licenses for Chrome hosted apps.</td></tr></tbody></table>

## UserLicenses {: #userLicenses }

For UserLicenses Resource details, see the [resource representation][16] page.

<table><thead><tr><th>Method</th><th>HTTP request</th><th>Description</th></tr></thead><tbody><tr class="alt"><td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless otherwise noted</td></tr><tr><td><a href="/webstore/webstore_api/userLicenses/getUserLicense/">getUserLicense</a></td><td><code>GET&nbsp; /userlicenses/<var>appId</var></code></td><td>Gets the user licenses for Chrome Apps and Chrome Extensions.</td></tr></tbody></table>

## Payments {: #Payments }

For Payments Resource details, see the [resource representation][18] page.

<table><thead><tr><th>Method</th><th>HTTP request</th><th>Description</th></tr></thead><tbody><tr class="alt"><td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless otherwise noted</td></tr><tr><td><a href="/webstore/webstore_api/payments/list/">list</a></td><td><code>GET&nbsp; /items/<var>itemId</var>/payments</code></td><td>Lists the in-app products that the user has purchased.</td></tr></tbody></table>

[1]: #InAppProducts
[2]: #Items
[3]: #Licenses
[4]: #userLicenses
[5]: #Payments
[6]: /docs/webstore/webstore_api/inAppProducts/#resource
[7]: /docs/webstore/webstore_api/inAppProducts/get/
[8]: /docs/webstore/webstore_api/inAppProducts/list/
[9]: /docs/webstore/webstore_api/items/#resource
[10]: /docs/webstore/webstore_api/items/get/
[11]: /docs/webstore/webstore_api/items/insert/
[12]: /docs/webstore/webstore_api/items/publish/
[13]: /docs/webstore/webstore_api/items/update/
[14]: /docs/webstore/webstore_api/licenses/#resource
[15]: /docs/webstore/webstore_api/licenses/get/
[16]: /docs/webstore/webstore_api/userLicenses/#resource
[17]: /docs/webstore/webstore_api/userLicenses/getUserLicense/
[18]: /docs/webstore/webstore_api/payments/#resource
[19]: /docs/webstore/webstore_api/payments/list/

---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store API Reference"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'warning' %}

The Licensing API used by the Chrome Web Store payments system is now deprecated. See [Payment
deprecation](/docs/webstore/cws-payments-deprecation/) to learn about migration and official
timelines.

{% endAside %}

This reference describes the methods and resource representation available for the Chrome Web Store
Publish API and the Licensing API. Each resource type has one or more data representations and one
or more methods.

## Resource types {: #resource-types }

**Chrome Web Store Publish API**

-  [Items][header-items]

**Licensing API**

-  [InAppProducts][header-in-app-products]
-  [Licenses][header-licenses]
-  [UserLicenses][header-user-licenses]
-  [Payments][header-payments]

## Chrome Web Store Publish API {: #publish-api}

### Items {: #items }

For Items Resource details, see the [resource representation][api-items-resource] page.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>HTTP request</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr class="alt">
      <td colspan="3">URIs relative to https://www.googleapis.com, unless otherwise noted</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/items/get/">get</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/chromewebstore/v1.1/items/<var>itemId</var></code>
      </td>
      <td>Gets a Chrome Web Store item. Provide <code>projection="DRAFT"</code> in URL (case
        sensitive).</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/items/insert/">insert</a></td>
      <td>
        <strong>POST</strong><br>
        <code>/upload/chromewebstore/v1.1/items</code>
      </td>
      <td>Inserts a new item.</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/items/publish/">publish</a></td>
      <td>
        <strong>POST</strong><br>
        <code>/chromewebstore/v1.1/<br>items/<var>itemId</var>/publish</code>
      </td>
      <td>Publishes an item.<br>
        <br>
        The optional <code>publishTarget</code> query parameter specifies how the item will be
        published. Valid values are <code>"trustedTesters"</code> and <code>"default"</code>.
      </td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/items/update/">update</a></td>
      <td>
        <strong>PUT</strong><br>
        <code>/upload/chromewebstore/v1.1/<br>items/<var>itemId</var></code><br>
        <br>
        and<br>
        <br>
        <strong>PUT</strong><br>
        <code>/items/<var>itemId</var></code>
      </td>
      <td>Updates an existing item.</td>
    </tr>
  </tbody>
</table>

{% Aside %}

See [Using the Chrome Web Store Publish API][publish-api].

{% endAside %}

## Licensing API {: #licensing-api }

### InAppProducts {: #in-app-products }

For InAppProducts Resource details, see the [resource representation][api-inappproducts-resource] page.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>HTTP request</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr class="alt">
      <td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless
        otherwise noted</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/inAppProducts/get/">get</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/items/<var>itemId</var>/skus/<var>sku</var></code>
      </td>
      <td>Gets the in-app product information of an item.</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/inAppProducts/list/">list</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/items/<var>itemId</var>/skus</code>
      </td>
      <td>Lists the in-app product information of an item.</td>
    </tr>
  </tbody>
</table>


### Licenses {: #licenses }

For Licenses Resource details, see the [resource representation][api-licenses-resource] page.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>HTTP request</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr class="alt">
      <td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless
        otherwise noted</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/licenses/get/">get</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/licenses/<var>appId</var>/<var>userId</var></code><br>
      </td>
      <td>Gets the licenses for Chrome hosted apps.</td>
    </tr>
  </tbody>
</table>

### UserLicenses {: #user-licenses }

For UserLicenses Resource details, see the [resource representation][api-userlicenses-resource] page.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>HTTP request</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr class="alt">
      <td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless
        otherwise noted</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/userLicenses/getUserLicense/">getUserLicense</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/userlicenses/<var>appId</var></code>
      </td>
      <td>Gets the user licenses for Chrome Apps and Chrome Extensions.</td>
    </tr>
  </tbody>
</table>

### Payments {: #payments }

For Payments Resource details, see the [resource representation][api-payments-resource] page.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>HTTP request</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr class="alt">
      <td colspan="3">URIs relative to https://www.googleapis.com/chromewebstore/v1.1, unless
        otherwise noted</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/webstore_api/payments/list/">list</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/items/<var>itemId</var>/payments</code>
      </td>
      <td>Lists the in-app products that the user has purchased.</td>
    </tr>
  </tbody>
</table>

[api-inappproducts-get]: /docs/webstore/webstore_api/inAppProducts/get/
[api-inappproducts-list]: /docs/webstore/webstore_api/inAppProducts/list/
[api-inappproducts-resource]: /docs/webstore/webstore_api/inAppProducts/#resource
[api-items-get]: /docs/webstore/webstore_api/items/get/
[api-items-insert]: /docs/webstore/webstore_api/items/insert/
[api-items-publish]: /docs/webstore/webstore_api/items/publish/
[api-items-resource]: /docs/webstore/webstore_api/items/#resource
[api-items-update]: /docs/webstore/webstore_api/items/update/
[api-licenses-get]: /docs/webstore/webstore_api/licenses/get/
[api-licenses-resource]: /docs/webstore/webstore_api/licenses/#resource
[api-payments-list]: /docs/webstore/webstore_api/payments/list/
[api-payments-resource]: /docs/webstore/webstore_api/payments/#resource
[api-userlicenses-get]: /docs/webstore/webstore_api/userLicenses/getUserLicense/
[api-userlicenses-resource]: /docs/webstore/webstore_api/userLicenses/#resource
[header-in-app-products]: #in-app-products
[header-items]: #items
[header-licenses]: #licenses
[header-payments]: #payments
[header-user-licenses]: #user-licenses
[publish-api]: /docs/webstore/using_webstore_api

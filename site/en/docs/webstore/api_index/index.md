---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store API Reference"
#date: TODO
#updated: TODO
#description: TODO
---

This reference describes the methods and resource representation available for the Chrome Web Store
Publish API. Each resource type has one or more data representations and one
or more methods.

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

[api-items-get]: /docs/webstore/webstore_api/items/get/
[api-items-insert]: /docs/webstore/webstore_api/items/insert/
[api-items-publish]: /docs/webstore/webstore_api/items/publish/
[api-items-resource]: /docs/webstore/webstore_api/items/#resource
[api-items-update]: /docs/webstore/webstore_api/items/update/
[header-in-app-products]: #in-app-products
[header-items]: #items
[publish-api]: /docs/webstore/using_webstore_api

---
layout: "layouts/doc-post.njk"
title: "InAppProducts:Get"
#date: TODO
#updated: TODO
#description: TODO
---

Gets an in-app product.

## Request {: #getrequest }

### HTTP request

```http
GET https://www.googleapis.com/chromewebstore/v1.1/items/itemId/skus/sku
```

### Parameters

<table class="with-borders with-heading-tint"><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to query for in-app products.</td></tr><tr id="sku"><td><code>sku</code></td><td><code>string</code></td><td>The in-app product ID.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="gl"><td><code>gl</code></td><td><code>string</code></td><td>Specifies the region code of the in-app product when projection is <code>THIN</code>.</td></tr><tr id="hl"><td><code>hl</code></td><td><code>string</code></td><td>Specifies the language code of the in-app product when projection is <code>THIN</code>.</td></tr><tr id="projection"><td><code>projection</code></td><td><code>string</code></td><td>Whether to return a subset of the result.<br><br>Acceptable values are:<ul><li>"<code>ALL</code>": Return in-app product info for all available regions and languages.</li><li>"<code>THIN</code>": Return in-app product info for only the requested region and language.</li></ul></td></tr></tbody></table>

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore.readonly</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

### Request body

Do not supply a request body with this method.

## Response {: #response }

If successful, this method returns an [InAppProducts resource][2] in the response body.

[1]: https://developers.google.com/accounts/docs/OAuth2
[2]: /docs/webstore/webstore_api/inAppProducts#resource

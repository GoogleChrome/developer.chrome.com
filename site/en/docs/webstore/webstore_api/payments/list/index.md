---
layout: 'layouts/doc-post.njk'
title: "Payments:List
"
#date: TODO
#updated: TODO
#description: TODO
---

Lists the [in-app products][1] that the user has purchased.

## Request {: #request }

### HTTP request

```text
GET https://www.googleapis.com/chromewebstore/v1.1/items/itemId/payments
```

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore.readonly</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

### Request body

Do not supply a request body with this method.

## Response {: #response }

If successful, this method returns a response body with the following structure:

```json
[
  {
    "kind": "chromewebstore#payment",
    "itemId": string,
    "sku": string,
    "createdTime": long,
    "state": string
  }
]
```

<table class="with-borders with-heading-tint"><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Static string value is always <code>"chromewebstore#payment"</code>.</td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to query for in-app products.</td></tr><tr id="sku"><td><code>sku</code></td><td><code>string</code></td><td>The in-app product ID.</td></tr><tr id="createdTime"><td><code>createdTime</code></td><td><code>long</code></td><td>Time of the creation of the payment.</td></tr><tr id="state"><td><code>state</code></td><td><code>string</code></td><td>Will be one of the following payment states: <code>ACTIVE</code>, <code>PAYMENT_DECLINED</code>, <code>EXPIRED</code>, <code>CANCELLED</code>, <code>REJECTED</code>, <code>PENDING</code>, <code>CANCELLED_BY_DEVELOPER</code>, <code>DISABLED</code>.</td></tr></tbody></table>

[1]: /docs/webstore/webstore_api/inAppProducts
[2]: https://developers.google.com/accounts/docs/OAuth2

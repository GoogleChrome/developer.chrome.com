---
layout: "layouts/doc-post.njk"
title: "Items:Publish"
#date: TODO
#updated: TODO
#description: TODO
---

Publishes an [item][1]. Provide defined publishTarget in URL (case sensitive): publishTarget =
"trustedTesters" or publishTarget = "default".

## Request {: #request }

### HTTP request

```text
POST https://www.googleapis.com/chromewebstore/v1.1/items/itemId/publish
```

### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to publish.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="publishTarget"><td><code>publishTarget</code></td><td><code>string</code></td><td>Provide defined <code>publishTarget</code> in URL (case sensitive): <code>publishTarget="trustedTesters"</code> or <code>publishTarget="default"</code>. Defaults to <code>publishTarget="default"</code>.</td></tr></tbody></table>

### Request body

In the request body, you can optionally supply data with the following structure:

### JSON

```json
{
  "target": string
}
```

<table><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="target"><td><code>target</code></td><td><code>string</code></td><td>The publish target of this publish operation. This is the same as using publishTarget as a URL query parameter. The string value can either be target="trustedTesters" or target="default". The default value, if none is supplied, is target="default". Recommended usage is to use the URL query parameter to specificy the value.</td></tr></tbody></table>

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

## Response {: #response }

If successful, this method returns a response body with the following structure:

### JSON

```json
{
  "kind": "chromewebstore#item",
  "item_id": string,
  "status": [
    string
  ],
  "statusDetail": [
    string
  ]
}
```

<table><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Static string value is always <code>"chromewebstore#item"</code>.</td></tr><tr id="item_id"><td><code>item_id</code></td><td><code>string</code></td><td>The ID of this item.</td></tr><tr id="status"><td><code>status[]</code></td><td><code>list</code></td><td>The status code of this publish operation. It may contain multiple elements from the following list: <code>OK</code>, <code>NOT_AUTHORIZED</code>, <code>INVALID_DEVELOPER</code>, <code>DEVELOPER_NO_OWNERSHIP</code>, <code>DEVELOPER_SUSPENDED</code>, <code>ITEM_NOT_FOUND</code>, <code>ITEM_PENDING_REVIEW</code>, <code>ITEM_TAKEN_DOWN</code>, <code>PUBLISHER_SUSPENDED</code>.</td></tr><tr id="statusDetail"><td><code>statusDetail[]</code></td><td><code>list</code></td><td>Detailed human-comprehensible explanation of the status code above.</td></tr></tbody></table>

[1]: /docs/webstore/webstore_api/items/
[2]: https://developers.google.com/accounts/docs/OAuth2

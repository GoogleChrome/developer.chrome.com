---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store API Reference"
#date: TODO
#updated: TODO
#description: TODO
---

This reference describes the methods and resource representation available for the Chrome Web Store
Publish API. Each resource type has one or more data representations and one
or more methods. See [Using the Chrome Web Store Publish API][publish-api] for implementation details.

## Items {: #items }

For Items Resource details, see the [resource representation][cws-resource]. URIs are relative to https://www.googleapis.com, unless otherwise noted

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>HTTP request</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/webstore/api_index/#get">get</a></td>
      <td>
        <strong>GET</strong><br>
        <code>/chromewebstore/v1.1/items/<var>itemId</var></code>
      </td>
      <td>Gets a Chrome Web Store item. Provide <code>projection="DRAFT"</code> in URL (case
        sensitive).</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/api_index/#insert">insert</a></td>
      <td>
        <strong>POST</strong><br>
        <code>/upload/chromewebstore/v1.1/items</code>
      </td>
      <td>Inserts a new item.</td>
    </tr>
    <tr>
      <td><a href="/docs/webstore/api_index/#publish">publish</a></td>
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
      <td><a href="/docs/webstore/api_index/#update">update</a></td>
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

### Resource representation {: #resource }

```json
{
  "kind": "chromewebstore#item",
  "id": string,
  "publicKey": string,
  "uploadState": string,
  "itemError": [
    (value)
  ]
}
```

<table id="properties"><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="id"><td><code>id</code></td><td>string</td><td>Unique ID of the item.</td></tr><tr id="itemError"><td><code>itemError[]</code></td><td>list</td><td>Detail human-readable status of the operation, in English only. Same error messages are displayed when you upload your app to the Chrome Web Store.</td></tr><tr id="kind"><td><code>kind</code></td><td>string</td><td>Identifies this resource as an Item. Value: the fixed string <code>"chromewebstore#item"</code>.</td></tr><tr id="publicKey"><td><code>publicKey</code></td><td>string</td><td>Public key of this item.</td></tr><tr id="uploadState"><td><code>uploadState</code></td><td>string</td><td>Status of the operation.<br><br>Acceptable values are:<ul><li>"<code>FAILURE</code>"</li><li>"<code>IN_PROGRESS</code>"</li><li>"<code>NOT_FOUND</code>"</li><li>"<code>SUCCESS</code>"</li></ul></td></tr></tbody></table>

## Get

Gets a Chrome Web Store item. Provide `projection="DRAFT"` (case sensitive) as a URL Parameter.

### Request

#### HTTP request

```text
GET https://www.googleapis.com/chromewebstore/v1.1/items/itemId
```

#### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td>string</td><td>Unique identifier representing the Chrome App, Chrome Extension, or the Chrome Theme.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="projection"><td><code>projection</code></td><td>string</td><td>Determines which subset of the item information to return.<br><br>Acceptable values are:<ul><li>"<code>DRAFT</code>": Return information extracted from the current draft.</li><li>"<code>PUBLISHED</code>": Return information extracted from the published item draft.</li></ul>Note that only <code>"DRAFT"</code> is supported at this time.</td></tr></tbody></table>

#### Authorization

This request requires authorization with the following scope.

```text
https://www.googleapis.com/auth/chromewebstore.readonly
```

The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the [OAuth 2.0 documentation][google-oauth2].

#### Request body

Do not supply a request body with this method.

### Response

If successful, this method returns an [Items resource][cws-resource] in the response body.

## Insert

Inserts a new [item][cws-items].

This method supports an upload URI and accepts uploaded media.

### Request

#### HTTP request

```text
POST https://www.googleapis.com/upload/chromewebstore/v1.1/items
```

#### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Required query parameters</b></td></tr><tr id="uploadType_id"><td><code>uploadType</code></td><td>string</td><td>The type of upload request to the <strong>/upload</strong> URI. The only accepted value is <code>media</code>: a simple upload of the media data.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="publisherEmail"><td><code>publisherEmail</code></td><td>string</td><td>The email of the publisher who owns the items. Defaults to the caller's email address.</td></tr></tbody></table>

#### Authorization

This request requires authorization with the following scope.

```text
https://www.googleapis.com/auth/chromewebstore
```

The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the [OAuth 2.0 documentation][google-oauth2].

#### Request body

Do not supply a request body with this method.

### Response

If successful, this method returns an [Items resource][cws-resource] in the response body.

## Publish

Publishes an [item][cws-items]. Provide defined publishTarget in URL (case sensitive): publishTarget =
"trustedTesters" or publishTarget = "default".

### Request

#### HTTP request

```text
POST https://www.googleapis.com/chromewebstore/v1.1/items/itemId/publish
```

#### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td>string</td><td>The ID of the item to publish.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="publishTarget"><td><code>publishTarget</code></td><td>string</td><td>Provide defined <code>publishTarget</code> in URL (case sensitive): <code>publishTarget="trustedTesters"</code> or <code>publishTarget="default"</code>. Defaults to <code>publishTarget="default"</code>.</td></tr></tbody></table>

#### Request body

In the request body, you can optionally supply data with the following structure:

#### JSON

```json
{
  "target": string
}
```

<table><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="target"><td><code>target</code></td><td><code>string</code></td><td>The publish target of this publish operation. This is the same as using publishTarget as a URL query parameter. The string value can either be target="trustedTesters" or target="default". The default value, if none is supplied, is target="default". Recommended usage is to use the URL query parameter to specify the value.</td></tr></tbody></table>

#### Authorization

This request requires authorization with the following scope.

```text
https://www.googleapis.com/auth/chromewebstore
```

The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the [OAuth 2.0 documentation][google-oauth2].

### Response

If successful, this method returns a response body with the following structure:

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

## Update

Updates an existing [item][cws-items].

This method supports an upload URI and accepts uploaded media.

### Request

#### HTTP request

This method provides media upload functionality through two separate URIs.

- Upload URI, for media upload requests:

  ```text
  PUT https://www.googleapis.com/upload/chromewebstore/v1.1/items/itemId
  ```

- Metadata URI, for metadata-only requests:

  ```text
  PUT https://www.googleapis.com/chromewebstore/v1.1/items/itemId
  ```

#### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to upload.</td></tr><tr><td colspan="3"><b>Required query parameters</b></td></tr><tr id="uploadType_id"><td><code>uploadType</code></td><td><code>string</code></td><td>The type of upload request to the <strong>/upload</strong> URI. Acceptable values are: <code>media</code> - Simple upload. Upload the media only, without any metadata.</td></tr></tbody></table>

#### Request body

In the request body, supply an [Items resource][cws-resource] as the metadata.

#### Authorization

This request requires authorization with the following scope.

```text
https://www.googleapis.com/auth/chromewebstore
```

The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the [OAuth 2.0 documentation][google-oauth2].

### Response

If successful, this method returns an [Items resource][cws-resource] in the response body.

[cws-items]: #items
[cws-resource]: #resource
[publish-api]: /docs/webstore/using_webstore_api
[google-oauth2]: https://developers.google.com/accounts/docs/OAuth2

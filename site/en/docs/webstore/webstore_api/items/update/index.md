---
layout: 'layouts/doc-post.njk'
title: "Items:Update"
#date: TODO
#updated: TODO
#description: TODO
---

Updates an existing [item][1].

This method supports an upload URI and accepts uploaded media.

## Request {: #request }

### HTTP request

This method provides media upload functionality through two separate URIs.

- Upload URI, for media upload requests:

  ```text
  PUT https://www.googleapis.com/upload/chromewebstore/v1.1/items/itemId
  ```

- Metadata URI, for metadata-only requests:

  ```text
  PUT https://www.googleapis.com/chromewebstore/v1.1/items/itemId
  ```

### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to upload.</td></tr><tr><td colspan="3"><b>Required query parameters</b></td></tr><tr id="uploadType_id"><td><code>uploadType</code></td><td><code>string</code></td><td>The type of upload request to the <strong>/upload</strong> URI. Acceptable values are:<ul><li><code>media</code> - <a href="#simple">Simple upload</a>. Upload the media only, without any metadata.</li></ul></td></tr></tbody></table>

### Request body

In the request body, supply an [Items resource][3] as the metadata.

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

## Response {: #response }

If successful, this method returns an [Items resource][5] in the response body.

[1]: /docs/webstore/webstore_api/items/
[2]: #simple
[3]: /docs/webstore/webstore_api/items/
[4]: https://developers.google.com/accounts/docs/OAuth2
[5]: /docs/webstore/webstore_api/items/#resource

---
layout: 'layouts/doc-post.njk'
title: "Items:Insert"
#date: TODO
#updated: TODO
#description: TODO
---

Inserts a new [item][1].

This method supports an upload URI and accepts uploaded media.

## Request {: #request }

### HTTP request

```text
POST https://www.googleapis.com/upload/chromewebstore/v1.1/items
```

### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Required query parameters</b></td></tr><tr id="uploadType_id"><td><code>uploadType</code></td><td><code>string</code></td><td>The type of upload request to the <strong>/upload</strong> URI. The only accepted value is <code>media</code>: a simple upload of the media data.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="publisherEmail"><td><code>publisherEmail</code></td><td><code>string</code></td><td>The email of the publisher who owns the items. Defaults to the caller's email address.</td></tr></tbody></table>

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

### Request body

Do not supply a request body with this method.

## Response {: #response }

If successful, this method returns an [Items resource][3] in the response body.

[1]: /docs/webstore/webstore_api/items/
[2]: https://developers.google.com/accounts/docs/OAuth2
[3]: /docs/webstore/webstore_api/items/#resource

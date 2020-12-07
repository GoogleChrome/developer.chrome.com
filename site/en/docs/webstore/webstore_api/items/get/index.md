---
layout: "layouts/doc-post.njk"
title: "Items:Get"
#date: TODO
#updated: TODO
#description: TODO
---

Gets a Chrome Web Store [item][1]. Provide projection="DRAFT" (case sensitive) in URL as a URL
Parameter.

## Request {: #request }

### HTTP request

```text
GET https://www.googleapis.com/chromewebstore/v1.1/items/itemId
```

### Parameters

<table><thead><tr><th>Parameter name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr><td colspan="3"><b>Path parameters</b></td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>Unique identifier representing the Chrome App, Chrome Extension, or the Chrome Theme.</td></tr><tr><td colspan="3"><b>Optional query parameters</b></td></tr><tr id="projection"><td><code>projection</code></td><td><code>string</code></td><td>Determines which subset of the item information to return.<br><br>Acceptable values are:<ul><li>"<code>DRAFT</code>": Return information extracted from the current draft.</li><li>"<code>PUBLISHED</code>": Return information extracted from the published item draft.</li></ul>Note that only <code>"DRAFT"</code> is supported at this time.</td></tr></tbody></table>

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore.readonly</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

### Request body

Do not supply a request body with this method.

## Response {: #response }

If successful, this method returns an [Items resource][3] in the response body.

[1]: /docs/webstore/webstore_api/items/
[2]: https://developers.google.com/accounts/docs/OAuth2
[3]: /docs/webstore/webstore_api/items/#resource

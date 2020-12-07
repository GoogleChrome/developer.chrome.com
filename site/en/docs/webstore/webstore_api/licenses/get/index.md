---
layout: 'layouts/doc-post.njk'
title: "Licenses:Get"
#date: TODO
#updated: TODO
#description: TODO
---

Gets the [licenses][1] for Chrome hosted apps.

## Request {: #request }

### HTTP request

```text
GET https://www.googleapis.com/chromewebstore/v1.1/licenses/appId/userId
```

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore.readonly</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an Oauth 2.0 access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>. This api can also be accessed using <a href="https://developers.google.com/accounts/docs/OAuth_ref">OAuth 1.0</a>, if necessary, but that usage is deprecated.</td></tr></tbody></table>

### Request body

Do not supply a request body with this method.

## Response {: #response }

If successful, this method returns a [Licenses resource][4] in the response body.

[1]: /docs/webstore/webstore_api/licenses/
[2]: https://developers.google.com/accounts/docs/OAuth2
[3]: https://developers.google.com/accounts/docs/OAuth_ref
[4]: /docs/webstore/webstore_api/licenses/#resource

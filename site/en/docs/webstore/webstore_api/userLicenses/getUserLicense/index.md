---
layout: "layouts/doc-post.njk"
title: "UserLicenses:getUserLicence"
#date: TODO
#updated: TODO
#description: TODO
---

Gets the user licenses for a Chrome App or Chrome Extension.

## Request {: #request }

### HTTP request

```text
GET https://www.googleapis.com/chromewebstore/v1.1/userlicenses/appId
```

### Authorization {: #auth }

This request requires authorization with the following scope.

<table><thead><tr><th>Scope</th></tr></thead><tbody><tr><td><code>https://www.googleapis.com/auth/chromewebstore.readonly</code></td></tr><tr><td>The above URL is used as the scope parameter when generating an access token. For more details on API authorization and authentication, consult the <a href="https://developers.google.com/accounts/docs/OAuth2">OAuth 2.0 documentation</a>.</td></tr></tbody></table>

### Request body

Do not supply a request body with this method.

## Response {: #response }

If successful, this method returns a response body with the following structure:

### JSON

```json
{
  "kind": "chromewebstore#userLicense",
  "itemId": string,
  "createdTime": long,
  "result": boolean,
  "accessLevel": string,
  "maxAgeSecs": long
}
```

<table><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Identifies this resource as a user license. Value: the fixed string <code>chromewebstore#userLicense</code>.</td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to query for in-app products.</td></tr><tr id="createdTime"><td><code>createdTime</code></td><td><code>long</code></td><td>Creation time of license, formatted as a <a href="http://en.wikipedia.org/wiki/Unix_time">Unix timestamp </a>.</td></tr><tr id="result"><td><code>result</code></td><td><code>boolean</code></td><td><code>TRUE</code> = User has license. <code>FALSE</code> = User does not have license.</td></tr><tr id="accessLevel"><td><code>accessLevel</code></td><td><code>string</code></td><td><br><br>Acceptable values are:<ul><li>"<code>FREE_TRIAL</code>"</li><li>"<code>FULL</code>"</li></ul></td></tr><tr id="maxAgeSecs"><td><code>maxAgeSecs</code></td><td><code>long</code></td><td>Time that results can be cached.</td></tr></tbody></table>

[1]: https://developers.google.com/accounts/docs/OAuth2
[2]: http://en.wikipedia.org/wiki/Unix_time

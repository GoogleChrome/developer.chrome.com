---
layout: "layouts/doc-post.njk"
title: "Web Store API:Licenses"
#date: TODO
#updated: TODO
#description: TODO
---

A `Licences` resource represents a licence purchased by the user for a hosted app.

## Licenses representation {: #resource }

### JSON

```json
{
  "kind": "chromewebstore#license",
  "id": string,
  "appId": string,
  "userId": string,
  "result": string,
  "accessLevel": string,
  "maxAgeSecs": long
}
```

<table id="properties"><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="accessLevel"><td><code>accessLevel</code></td><td><code>string</code></td><td><br><br>Acceptable values are:<ul><li>"<code>FREE_TRIAL</code>"</li><li>"<code>FULL</code>"</li></ul></td></tr><tr id="appId"><td><code>appId</code></td><td><code>string</code></td><td>Chrome Web Store app ID. Get the app ID from the Chrome Developer Dashboard after you upload your app for the first time.</td></tr><tr id="id"><td><code>id</code></td><td><code>string</code></td><td>This value is a concatenation of the appId and userId seperated by a forward slash, for example: <code>ekjjfhlnedeokeakcddlnockkdiacakf/8098347</code>.</td></tr><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Identifies this resource as a license. Value: the fixed string <code>"chromewebstore#license"</code>.</td></tr><tr id="maxAgeSecs"><td><code>maxAgeSecs</code></td><td><code>long</code></td><td>Once you've got the response, cache is only valid for the max number of seconds.</td></tr><tr id="result"><td><code>result</code></td><td><code>string</code></td><td><br>Acceptable values are:<ul><li>"<code>NO</code>"</li><li>"<code>YES</code>"</li></ul></td></tr><tr id="userId"><td><code>userId</code></td><td><code>string</code></td><td>OpenID URL for the user's Google Account.</td></tr></tbody></table>

## Methods {: #methods }

[get][1]

: Gets the licenses for Chrome hosted apps.

[1]: /docs/webstore/webstore_api/licenses/get/
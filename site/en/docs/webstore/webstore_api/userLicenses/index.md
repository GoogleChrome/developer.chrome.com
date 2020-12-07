---
layout: "layouts/doc-post.njk"
title: "Web Store API:UserLicenses"
#date: TODO
#updated: TODO
#description: TODO
---

A `UserLicences` resource represents a license purchased by the user for Chrome App or Chrome
Extension.

## UserLicenses representation {: #resource }

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

<table><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Identifies this resource as a user license. Value: the fixed string <code>chromewebstore#userLicense</code>.</td></tr><tr id="itemId"><td><code>itemId</code></td><td><code>string</code></td><td>The ID of the item to query for in-app products.</td></tr><tr id="createdTime"><td><code>createdTime</code></td><td><code>long</code></td><td>Creation time of license. Number of milliseconds.</td></tr><tr id="result"><td><code>result</code></td><td><code>boolean</code></td><td><code>TRUE</code> = User has license. <code>FALSE</code> = User does not have license.</td></tr><tr id="accessLevel"><td><code>accessLevel</code></td><td><code>string</code></td><td><br><br>Acceptable values are:<ul><li>"<code>FREE_TRIAL</code>":</li><li>"<code>FULL</code>":</li></ul></td></tr><tr id="maxAgeSecs"><td><code>maxAgeSecs</code></td><td><code>long</code></td><td>Time that results can be cached.</td></tr></tbody></table>

## Methods {: #methods }

[getUserLicense][1]

: Gets the licenses for Chrome Apps.

[1]: /docs/webstore/webstore_api/userLicenses/getUserLicense/

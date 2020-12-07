---
layout: "layouts/doc-post.njk"
title: "Web Store API:Items"
#date: TODO
#updated: TODO
#description: TODO
---

An Item resource represents a Chrome App, Chrome Extension, Theme or hosted app.

## Resource representation {: #resource }

### JSON

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

<table id="properties"><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="id"><td><code>id</code></td><td><code>string</code></td><td>Unique ID of the item.</td></tr><tr id="itemError"><td><code>itemError[]</code></td><td><code>list</code></td><td>Detail human-readable status of the operation, in English only. Same error messages are displayed when you upload your app to the Chrome Web Store.</td></tr><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Identifies this resource as an Item. Value: the fixed string <code>"chromewebstore#item"</code>.</td></tr><tr id="publicKey"><td><code>publicKey</code></td><td><code>string</code></td><td>Public key of this item.</td></tr><tr id="uploadState"><td><code>uploadState</code></td><td><code>string</code></td><td>Status of the operation.<br><br>Acceptable values are:<ul><li>"<code>FAILURE</code>"</li><li>"<code>IN_PROGRESS</code>"</li><li>"<code>NOT_FOUND</code>"</li><li>"<code>SUCCESS</code>"</li></ul></td></tr></tbody></table>

## Methods {: #methods }

[get][1]

: Gets your own Chrome Web Store item. Provide `projection="DRAFT"` as a URL parameter (case
  sensitive).

[insert][2]

: Inserts a new item.

[publish][3]

: Publishes an item. Add the `publishTarget` URL parameter to the end of the URL with either
  `publishTarget ="trustedTesters"` or `publishTarget="default"` (case sensitive) as the value.

[update][4]

: Updates an existing item.

[1]: /docs/webstore/webstore_api/items/get/
[2]: /docs/webstore/webstore_api/items/insert/
[3]: /docs/webstore/webstore_api/items/publish/
[4]: /docs/webstore/webstore_api/items/update/

---
layout: "layouts/doc-post.njk"
title: "Payments"
#date: TODO
#updated: TODO
#description: TODO
---

A `Payments` resource represents an existing payment made by the user for an in-app product, Chrome
App, or Chrome Extension.

## Payment Representation {: #paymentrepresentation }

```json
{
  "response": {
    "details": [
      {
        "kind": "chromewebstore#payment",
        "itemId": "hgmipfdefoffjahnoanffggdklnoojan",
        "sku": "giant_tv",
        "createdTime": "1387221267248",
        "state": "ACTIVE"
      }
    ]
  }
}
```

<table class="with-borders with-heading-tint" id="properties"><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Identifies this resource as a payment. Value: the fixed string <code>"chromewebstore#payment"</code>.</td></tr><tr id="item_id"><td><code>item_id</code></td><td><code>string</code></td><td>Unique identifier for a Chrome App, Chrome Extension, or Chrome Theme.</td></tr><tr id="sku"><td><code>sku</code></td><td><code>string</code></td><td>Unique identifer (Product ID) for an individual In-App Product (IAP). Product IDs must start with a lowercase letter or number and can only contain lowercase letters(a-z), numbers(0-9), dots(.) and underscores(_).</td></tr><tr id="createdTime"><td><code>Created</code></td><td><code>long</code></td><td>Creation time of the payment in Unix time stamp format.</td></tr><tr id="state"><td><code>state</code></td><td><code>string</code></td><td>Will be one of the following payment states: <code>ACTIVE</code>, <code>PAYMENT_DECLINED</code>, <code>EXPIRED</code>, <code>CANCELLED</code>, <code>REJECTED</code>, <code>PENDING</code>, <code>CANCELLED_BY_DEVELOPER</code>, <code>DISABLED</code></td></tr></tbody></table>

## Methods {: #methods }

[list][1]
: Lists the in-app products that the user has purchased.

[1]: /docs/webstore/webstore_api/payments/list

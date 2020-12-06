---
layout: "layouts/doc-post.njk"
title: "InAppProducts"
#date: TODO
#updated: TODO
#description: TODO
---

An `inAppProducts` resource represents a digital good that is sold inside of a Chrome App or Chrome
Extension and is available for purchase by the user.

## inAppProduct Representation {: #iaprepresentation }

```json
{
  "kind": "chromewebstore#inAppProduct",
  "sku": string,
  "item_id": string,
  "type": string,
  "state": string,
  "prices": [
    {
      "valueMicros": long,
      "currencyCode": string,
      "regionCode": string
    }
  ],
  "localeData": [
    {
      "title": string,
      "description": string,
      "languageCode": string
    }
  ]
}
```

<table id="properties" class="with-borders with-heading-tint"><thead><tr><th>Property name</th><th>Value</th><th>Description</th></tr></thead><tbody><tr id="item_id"><td><code>item_id</code></td><td><code>string</code></td><td>Unique identifier for a Chrome App, Chrome Extension, or Chrome Theme.</td></tr><tr id="type"><td><code>type</code></td><td><code>string</code></td><td>Either <code>inapp</code> or <code>subs</code>.</td></tr><tr id="kind"><td><code>kind</code></td><td><code>string</code></td><td>Identifies this resource as an inAppProduct. Value: the fixed string <code>"chromewebstore#inAppProduct"</code>.</td></tr><tr id="localeData"><td><code>localeData[]</code></td><td><code>list</code></td><td>Locale data of the in-app product.</td></tr><tr id="localeData.description"><td><code><span>localeData[].</span>description</code></td><td><code>string</code></td><td>Description of the in-app product in the specified locale.</td></tr><tr id="localeData.languageCode"><td><code><span>localeData[].</span>languageCode</code></td><td><code>string</code></td><td>Language code for the locale data.</td></tr><tr id="localeData.title"><td><code><span>localeData[].</span>title</code></td><td><code>string</code></td><td>Title of the in-app product in the specified locale.</td></tr><tr id="prices"><td><code>prices[]</code></td><td><code>list</code></td><td>Price of the in-app product.</td></tr><tr id="prices.currencyCode"><td><code><span>prices[].</span>currencyCode</code></td><td><code>string</code></td><td>Currency code for the in-app product, for example, "USD".</td></tr><tr id="prices.regionCode"><td><code><span>prices[].</span>regionCode</code></td><td><code>string</code></td><td>Region code for the in-app product, for example, "US".</td></tr><tr id="prices.valueMicros"><td><code><span>prices[].</span>valueMicros</code></td><td><code>long</code></td><td>Monetary value of the in-app product multiplied by 1000.</td></tr><tr id="sku"><td><code>sku</code></td><td><code>string</code></td><td>Unique identifer (Product ID) for an individual In-App Product (IAP). Product IDs must start with a lowercase letter or number and can only contain lowercase letters(a-z), numbers(0-9), dots(.) and underscores(_).</td></tr><tr id="state"><td><code>state</code></td><td><code>string</code></td><td>State of this in-app product, <code>ACTIVE</code> or <code>INACTIVE</code>. In-app products can be inactive until you are ready to make them available to your users.</td></tr></tbody></table>

## Methods {: #iapmethods }

[get][1] {: #getmethod }
: Gets the in-app product information of an item.

[list][2] {: #listmethod }
: Lists the in-app product information of an item.

[1]: /docs/webstore/webstore_api/inAppProducts/get

[2]: /docs/webstore/webstore_api/inAppProducts/list

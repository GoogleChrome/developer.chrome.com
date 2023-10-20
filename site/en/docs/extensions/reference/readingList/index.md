---
api: readingList
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

Chrome features a reading list which allows users to save web pages to read later or when offline.
Use the Reading List API to retrieve existing items and to add and remove items from the list.

<figure>
  {% Img src="image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/isx7uJZA6B8YmEGTFmB6.png", alt="Reading list showing a number of articles", width="400", height="371" %}
  <figcaption>
    Reading list showing a number of articles
  </figcaption>
</figure>

## Manifest {: #manifest }

To use the Reading List API, add the `"readingList"` permission in the extension [manifest][doc-manifest] file:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My reading list extension",
  ...
  "permissions": [
    "readingList"
  ]
}
```

## Concepts and usage {: #concepts }

### Item ordering

Items in the reading list are not in any guarenteed order.

### Item uniqueness

Items are keyed by URL. This includes the hash and query string.

## Use cases {: #use-cases }

The following sections demonstrate some common use cases for the Reading List API. See [Extension samples](#examples) for complete extension examples.

### Add an item {: #add-item }

To add an item to the reading list, use [`chrome.readingList.addEntry`][add-entry]:

```js
chrome.readingList.addEntry({
  title: "New to the web platform in September | web.dev",
  url: "https://developer.chrome.com/",
  hasBeenRead: false
});
```

### Display items {: #display-items }

To display items currently in the reading list, use the [`chrome.readingList.query()`][query]
method.

```js
const items = await chrome.readingList.query({});

for (const item of items) {
  // Do something do display the item
}
```

### Mark an item as read {: #mark-item-read }

To mark an item as read, use [`chrome.readingList.updateEntry`][update-entry]:

```js
chrome.readingList.updateEntry({
  url: "https://developer.chrome.com/",
  hasBeenRead: true
});
```

### Remove an item {: #remove-item }

To remove an item, use [`chrome.readingList.removeEntry`][remove-entry]:

```js
chrome.readingList.removeEntry({
  url: "https://developer.chrome.com/",
  hasBeenRead: true
});
```

## Extension samples {: #examples }

For more Reading List API extensions demos, explore any of the following extensions:

- Coming soon.

[doc-manifest]: /docs/extensions/mv3/manifest/
[query]: #method-query
[add-entry]: #method-addEntry
[update-entry]: #method-updateEntry
[remove-entry]: #method-removeEntry

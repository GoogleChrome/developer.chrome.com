---
layout: 'layouts/blog-post.njk'
title: A change to the default durability mode in IndexedDB
description: >
   The durability mode in IndexedDB is changing from strict to relaxed from Chrome 121.
authors:
  - thomassteiner
date: 2023-11-03
---

The default durability mode in IndexedDB is changing from `strict` to `relaxed` from Chrome 121. This adjustment is to enhance performance and to align with other major browsers like Firefox and Safari. The blog post explains the details of this change and what it means for web developers.

## IndexedDB durability modes

[IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API), a powerful web API for storing large amounts of structured data, offers two [durability](https://developer.mozilla.org/docs/Web/API/IDBDatabase/transaction#durability) modes for `readwrite` transactions:

- **`strict`:** this mode explicitly instructs the OS to flush changes to disk before issuing the [`complete`](https://developer.mozilla.org/docs/Web/API/IDBTransaction/complete_event) event.
- **`relaxed`** this mode relies on default OS flushing behavior and issues the `complete` event after changes make it to the OS buffer, which is typically flushed every couple seconds.

It's important to note that `strict` does not ensure that changes are _actually_ written immediately to disk. After a site calls [`put()`](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/put), there's still some finite amount of time during which a power failure could cause the change to not make it to disk and therefore be missing the next time the app runs.

When it comes to guarantees with `strict` durability, the IndexedDB transaction `complete` event is not fired until _after_ the data is actually written, whereas with `relaxed` durability, the data is still in the _process of being written_ when the `complete` event fires. (For more details about the full process, [check this explainer](https://wicg.github.io/storage-buckets/explainer.html#durability-guarantees)).

So `strict` is really only for operations where you _absolutely_ need to know it was written before you do the next thing. Data migration is an example where `strict` durability is required. When moving from one backing store to another, you don't want to delete the old format until the new one is written. This way, `strict` durability facilitates a migration routine that could recover from a failure halfway through.

## The default durability mode change

The crucial aspect of this change is the default durability mode for `readwrite` transactions in Chrome. Until now, the default was `strict`, ensuring immediate disk writes for data changes. However, due to performance considerations and to align with other major browsers which all use `relaxed`, Chrome likewise plans to change the default to `relaxed`.

This change is designed to provide a better balance between performance and data durability. While `strict` ensures maximum data durability, `relaxed` is often sufficient for many web applications and can significantly improve performance in the following ways

- Speed—in real-world examples, the Chrome team saw speed improvements between a factor of 3 and 30.
- Disk durability, particularly for devices with a Solid State Disk (SSD).
- Extended battery life.
- An improvement in read speed. Due to the architecture of IndexedDB, where read transactions are often blocked behind write transactions, read speed is improved as a secondary effect.
- The entire device is positively affected, because disk operations are a shared system resource.

## Interoperability and compatibility

One important aspect of this change is its impact on interoperability and compatibility. By aligning with the behavior of other major browser vendors, Chromium improves interoperability. The standard itself allows for different implementations, and this change aims to harmonize those implementations. You can find more historical context on this change in [this GitHub Issue](https://github.com/w3c/IndexedDB/issues/50).

## What does this mean for web developers?

This change doesn't introduce any new API surface. The existing IndexedDB API remains the same, and this change primarily affects the default behavior of `readwrite` transactions. You can specify your preferred durability mode when creating transactions, giving you control over data durability and performance. The following code sample shows how to get the old behavior back, by setting `durability` to `strict` in the optional options array.

```js
let db;
const DBOpenRequest = window.indexedDB.open("toDoList", 4);
DBOpenRequest.onsuccess = (event) => {
  db = DBOpenRequest.result;
};
const transaction = db.transaction(
  ['toDoList'],
  'readwrite',
  { durability: 'strict' });
```

{% Aside %}
The Chrome team recommends taking _no action_ for the vast majority of developers. Just sit back and bask in better performance. There is an array of functional improvements outlined above that users will benefit from for free by this change. Strict durability is only ever useful for some _very_ specialized cases.
What it doesn't do is make guarantees about data loss.
{% endAside %}

## Testing the change locally before it ships

The change will go into effect in Chrome 121. If you want to test the new behavior locally before, toggle the `#indexed-db-default-durability-relaxed` flag in `chrome://flags`.

## Learn More

For more technical details and updates on this change, check the [tracking bug](https://bugs.chromium.org/p/chromium/issues/detail?id=965883) and the [Chrome Platform Status entry](https://chromestatus.com/feature/5084460341264384).

In summary, Chrome's move to change the default durability mode in IndexedDB aims to improve performance while maintaining compatibility with other major browsers. In the majority of cases, our recommendation is to do nothing, as the new default will provide performance enhancements. If required, you can continue to specify your preferred durability mode, taking control over data durability and performance in your web applications.

## Acknowledgements

This article was reviewed by [Evan Stade](https://www.linkedin.com/in/evan-stade-4585826/) and [Rachel Andrew](https://rachelandrew.co.uk/).

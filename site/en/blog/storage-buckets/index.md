---
layout: 'layouts/blog-post.njk'
title: 'Not all storage is created equal: introducing Storage Buckets'
subtitle: >
  We're experimenting with an API for making persistent storage eviction under heavy
  memory pressure more predictable, and we'd love your feedback.
description: >
  We're experimenting with an API for making persistent storage eviction under heavy
  memory pressure more predictable, and we'd love your feedback.
authors:
  - thomassteiner
date: 2022-11-04
updated: 2022-11-08
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/uSUKNoGdlmEsXAtHr0yJ.jpg
alt: Several buckets with paint in different colors in them.
tags:
  - capabilities
---

The [Storage Standard](https://storage.spec.whatwg.org/) defines an API for persistent storage and
quota estimates, and the platform storage architecture.
We're experimenting with an API for making persistent storage eviction under heavy
memory pressure more predictable. It's available behind the
`#enable-experimental-web-platform-features` flag in Chromium&nbsp;106, and we'd love your feedback.

{% Aside %}
You can try the Storage Buckets API by [participating in the Storage Buckets origin trial](/origintrials/#/view_trial/2674012278751232001). The origin trial runs from Chrome&nbsp;115 (stable date): {% ChromeDate 115 %} to Chrome&nbsp;118 (stable date): {% ChromeDate 118 %}.
{% endAside %}

## What problem does the storage standard aim to solve?

Traditionally, as the user runs out of storage space on their device, the data stored with APIs like
IndexedDB or `localStorage` gets lost without the user being able to intervene. A way to make
storage persistent is through invoking the
[`persist()`](https://developer.mozilla.org/docs/Web/API/StorageManager/persist) method of the
`StorageManager` interface. It simultaneously requests the end user for permission and changes the
storage to be persistent once granted:

```js
const persisted = await navigator.storage.persist();
if (persisted) {
  /* Storage will not be cleared except by explicit user action. */
}
```

This method of asking for storage to be persisted is all or nothing. There's no way to express more
fine-grained persistence needs. It's all one storage bucket.

## The Storage Buckets proposal

The core idea of the [Storage Buckets proposal](https://wicg.github.io/storage-buckets/explainer) is
granting sites the ability to create multiple storage buckets, where the browser may choose to
delete each bucket independently of other buckets. This allows developers to specify eviction
prioritization to make sure the most valuable data doesn't get deleted.

## Use case example

To illustrate where storage buckets would come in handy, imagine an email application. It would be
unforgivable if the app lost the user's unsent drafts that only exist on the client. In contrast, if
they are stored on a server, the user would probably be fine with some of their oldest inbox emails
to be removed from the client if their browser is under heavy storage pressure.

<figure>
  {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/P0ETJprf3gBBlCqyFyl1.png", alt="Email app interface", width="509", height="267" %}
  <figcaption>Email app with separate storage buckets for inbox and drafts. (For illustrative purposes only, this does not necessarily reflect how Gmail works.)</figcaption>
</figure>

## Using the Storage Buckets API

{% Aside %} This article only teases the main features of the Storage Buckets API. For a full
reference of what's possible with the API, see the
[Storage Buckets proposal](https://wicg.github.io/storage-buckets/explainer). {% endAside %}

{% Aside %}
Full debugging support in DevTools for the Storage Buckets API is planned, but still in the works.
{% endAside %}

### Creating a new storage bucket

A new storage bucket can be created with the `open()` method on the `StorageBucketManager`
interface.

```js
// Create a storage bucket for emails that are synchronized with the
// server.
const inboxBucket = await navigator.storageBuckets.open('inbox');
```

#### Creating a persisted new storage bucket

To ensure the storage bucket is persisted, you can pass `durability` and `persisted` option
arguments to the `open()` method:

- `persisted` determines if the storage bucket should be persisted or not. The allowed values are
  either `false` (default) or `true`.
- `durability` provides a hint to the browser that helps it trade off write performance against a
  reduced risk of data loss in the event of power failures. The allowed values are `'relaxed'`
  (default) or `'strict'`:

  - `'strict'` buckets attempt to minimize the risk of data loss on power failure. This may come at
    the cost of reduced performance, meaning that writes may take longer to complete, might impact
    overall system performance, may consume more battery power, and may wear out the storage device
    faster.
  - `'relaxed'` buckets may "forget" writes that were completed in the last few seconds, when a
    power loss occurs. In return, writing data to these buckets may have better performance
    characteristics, and may allow a battery charge to last longer, and may result in longer storage
    device lifetime. Also, power failures will not lead to data corruption at a higher rate than for
    `'strict'` buckets.

```js
// Create a storage bucket for email drafts that only exist on the client.
const draftsBucket = await navigator.storageBuckets.open('drafts', {
  durability: 'strict', // Or `'relaxed'`.
  persisted: true, // Or `false`.
});
```

### Accessing the storage APIs from a storage bucket

Each storage bucket is associated with storage APIs, for example,
[IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API/Using_IndexedDB), the
[Cache](https://developer.mozilla.org/docs/Web/API/Cache) interface, or the
[File](https://developer.mozilla.org/docs/Web/API/File) interface. These storage APIs work as per
the usual, just that the entry point is from the `StorageBucket` interface, for example,
`StorageBucket.indexedDB`.

```js/1
const inboxDb = await new Promise(resolve => {
  const request = inboxBucket.indexedDB.open('messages');
  request.onupgradeneeded = () => { /* migration code */ };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
```

{% Aside %}
Apart from IndexedDB, the
[explainer mentions several other storage APIs](https://wicg.github.io/storage-buckets/explainer#accessing-storage-apis-from-buckets).
 For example, the [Cache API](https://developer.mozilla.org/docs/Web/API/Cache)
and [File API](https://developer.mozilla.org/docs/Web/API/File_API). The current implementation is only
the IndexedDB API.
{% endAside %}

## Feedback

The Chrome team wants to hear what you think of storage buckets. Your feedback on the
[Storage Buckets proposal](https://wicg.github.io/storage-buckets/explainer) is warmly welcomed.
Please provide feedback by commenting on existing or filing new
[GitHub Issues](https://github.com/WICG/storage-buckets/issues).

## Useful resources

- [Storage Buckets explainer](https://wicg.github.io/storage-buckets/explainer)
- [Storage Buckets repository](https://github.com/WICG/storage-buckets)
- [ChromeStatus entry](https://chromestatus.com/feature/5739224579964928)
- [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1099413)
- Blink component
  [`Blink > Storage > Buckets`](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EStorage%3EBuckets)
- [Mozilla Standards Position](https://github.com/mozilla/standards-positions/issues/475)
- [TAG review](https://github.com/w3ctag/design-reviews/issues/562)

---
layout: layouts/blog-post.njk
title: Participate in early testing for Storage Partitioning
subhead: How to check if your site is affected by Storage Partitioning.
description: プライバシーを改善するために、Chrome は今後ストレージ API と通信 API の動作を変更していきます。今後の変更と、サイトにストレージパーティションによる影響があるかどうかを確認する方法についての詳細をお読みください。
authors:
  - miketaylr
  - mihajlija
date: '2022-09-01'
tags:
  - privacy
---

プライバシーを改善するために、Chrome は今後ストレージ API と通信 API の動作を変更していきます。[ストレージパーティション](/docs/privacy-sandbox/storage-partitioning/)への今後の変更についての詳細をお読みください。

The initial implementation has been available behind a flag in Chrome 105, since July 2022. Starting in Chrome Beta 106, from September 2022, the new implementation (which includes Cache Storage partitioning) is available for testing. The latest features and bug fixes will land in Chrome Canary first, so consider using Canary for continued testing.

This change should not affect the most common use cases where your app only uses storage in a first-party context, but we recommend testing to ensure that your applications will continue to work as they do today. If you interact with, or rely on storage in iframes, there's a higher chance the change may impact you.

## How to test Storage Partitioning

To try Storage Partitioning out:

1. Make sure you are using Chrome Beta version 106 or higher.
2. Go to `chrome://flags/#third-party-storage-partitioning`.
3. Enable the "Experimental Third-party Storage Partitioning" flag.

Participate in early testing and [report bugs](https://bugs.chromium.org/p/chromium/issues/entry?labels=StoragePartitioning-trial-bugs&components=Blink%3EStorage) to help the Chrome team identify and fix any unexpected behavior before the stable launch.

## What is Storage Partitioning

特定の種類のサイドチャネル クロスサイト トラッキングを防止するために、Chrome はサードパーティのコンテキストでストレージと通信の API をパーティション化しています（詳細については、[Explainer](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#introduction) をご覧ください）。

Historically, storage has been keyed only by origin. This means that if an iframe from `example.com` is embedded on `a.com` and `b.com`, `example.com` could learn about your browsing habits for those two top-level sites by storing and successfully retrieving an ID from storage. With third-party Storage Partitioning enabled, the storage for `example.com` will exist in two different partitions, one for `a.com` and the other for `b.com`. Storage partitioning prevents an embed from joining your visits to either site.

The following storage and communication APIs are partitioned when enabling the "Experimental Third-party Storage Partitioning" flag:

- [Broadcast Channel](https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API)
- [Cache Storage](https://developer.mozilla.org/docs/Web/API/CacheStorage)
- [Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
- [File System Access](https://developer.mozilla.org/docs/Web/API/File_System_Access_API)
- [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
- [Legacy FileSystem](https://developer.mozilla.org/docs/Web/API/FileSystem)
- [Quota](https://developer.mozilla.org/docs/Web/API/StorageManager)
- [Web Locks](https://developer.mozilla.org/docs/Web/API/Web_Locks_API)
- [ServiceWorker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)
- [SharedWorker](https://developer.mozilla.org/docs/Web/API/SharedWorker)

The following APIs are under active development, and will be partitioned before shipping to stable:

- Blob URL
- Clear-Site-Data header

## When will this feature be launched by default

We are hoping to begin the feature launch in early 2023, depending on stability and compatibility. Testing third-party storage partitioning now and filing bugs will help Chrome get feedback from the ecosystem to ensure developers and site owners have the support they need.

## Reporting bugs

The best way to give feedback is to file a [new issue](https://bugs.chromium.org/p/chromium/issues/entry?labels=Proj-StoragePartitioningTrial&components=Blink%3EStorage), either with a link to a publicly accessible URL or a reduced test case.

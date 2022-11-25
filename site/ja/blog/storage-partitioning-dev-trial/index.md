---
layout: layouts/blog-post.njk
title: ストレージパーティションの早期テストに参加する
subhead: サイトがストレージパーティションの影響を受けているかどうかを確認する方法について。
description: プライバシーを改善するために、Chrome は今後ストレージ API と通信 API の動作を変更していきます。今後の変更と、サイトにストレージパーティションによる影響があるかどうかを確認する方法についての詳細をお読みください。
authors:
  - miketaylr
  - mihajlija
date: 2022-09-01
tags:
  - privacy
---

プライバシーを改善するために、Chrome は今後ストレージ API と通信 API の動作を変更していきます。[ストレージパーティション](/docs/privacy-sandbox/storage-partitioning/)への今後の変更についての詳細をお読みください。

初期実装は、2022 年 7 月以降、Chrome 105 のフラグ付きで利用できます。2022 年 9 月からの Chrome ベータ 106 以降は、新しい実装（キャッシュストレージのパーティショニングを含む）をテストできます。最新の機能とバグ修正は最初に Chrome Canary に組み込まれるため、継続的なテストには Canary を使用することを検討してください。

この変更は、アプリがファーストパーティのコンテキストでのみストレージを使用する最も一般的なユースケースには影響しませんが、テストを行って、アプリケーションが現在と同じように引き続き機能することを確認することをお勧めします。iframe 内のストレージを操作したり、iframe 内のストレージに依存したりする場合、変更によって影響を受ける可能性が高くなります。

## ストレージ パーティションのテスト方法

ストレージ パーティションを試すには、以下を行います。

1. Chrome ベータ版 106 以降を使用していることを確認します。
2. `chrome://flags/#third-party-storage-partitioning` に移動します。
3. 「Experimental Third-party Storage Partitioning」フラグを有効にします。

初期のテストに参加し、安定版のリリース前に Chrome チームが予期しない動作を特定して修正できるようにて[バグを報告](https://bugs.chromium.org/p/chromium/issues/entry?labels=StoragePartitioning-trial-bugs&components=Blink%3EStorage)してください。

## ストレージ パーティションとは

特定の種類のサイドチャネル クロスサイト トラッキングを防止するために、Chrome はサードパーティのコンテキストでストレージと通信の API をパーティション化しています（詳細については、[Explainer](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#introduction) をご覧ください）。

これまで、ストレージはオリジンによってのみキー化されてきました。これは、`example.com` からの iframe が `a.com` と `b.com` に埋め込まれている場合、`example.com` は ID を保存してストレージから正しく取得することで、これら 2 つのトップレベル サイトのブラウジング習慣を学習できる可能性があることを意味します。サードパーティのストレージ パーティションを有効にすると、 `example.com` のストレージは、`a.com` 用と `b.com` 用の 2 つの異なるパーティションに存在することになります。ストレージ パーティションにより、埋め込みはどちらのサイトにも訪問を結合できなくなります。

「Experimental Third-party Storage Partitioning」フラグを有効にすると、次のストレージと通信の API がパーティション化されます。

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

次の API は活発に開発されており、安定版に出荷される前にパーティション化されます。

- Blob URL
- Clear-Site-Data ヘッダー

## この機能がデフォルトでリリースされる時期

安定性と互換性に応じて、2023 年初めに機能のリリースを開始したいと考えています。サードパーティのストレージ パーティションを今すぐテストし、バグを報告していただくと、Chrome はエコシステムからフィードバックを基に開発者やサイト所有者が必要なサポートを受けられるようにすることができます。

## バグの報告

フィードバックを提供する場合は、公開されている URL へのリンクまたは縮小されたテストケースのいずれかを使用して[新しいイシュー](https://bugs.chromium.org/p/chromium/issues/entry?labels=Proj-StoragePartitioningTrial&components=Blink%3EStorage)を提出してください。

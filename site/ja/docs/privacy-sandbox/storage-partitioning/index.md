---
layout: layouts/blog-post.njk
title: ストレージ パーティション
subhead: 特定の種類のサイドチャネル クロスサイト トラッキングを防止するために、Chrome はサードパーティのコンテキストでストレージと通信の API をパーティション化します。
description: |2

  Without storage partitioning, a site can join data across different sites to track the
  user across the web. To prevent certain types of side-channel cross-site tracking, Chrome is
  partitioning storage and communications APIs in third-party contexts.
authors:
  - kevinkiklee
date: '2022-08-24'
tags:
  - privacy
---

## ストレージ パーティションとは

特定の種類のサイドチャネル クロスサイト トラッキングを防止するために、Chrome はストレージと通信の API をサードパーティのコンテキストでパーティション化しています。ストレージ パーティションがない場合、サイトは異なるサイト間でデータを結合して、ウェブ全体でユーザーを追跡できます。また、埋め込みサイトは、[タイミング攻撃](https://dl.acm.org/doi/10.1145/352600.352606)、 [XS-Leaks](https://github.com/xsleaks/xsleaks)、[COSI](https://arxiv.org/pdf/1908.02204.pdf) などのサイドチャネル手法を使用して、トップレベル サイトのユーザーに関する特定の状態を推測できます。

Historically, storage has been keyed only by origin. This means that if an iframe from `example.com` is embedded on `a.com` and `b.com`, it could learn about your browsing habits for those two sites by storing and successfully retrieving an ID from storage. With third-party storage partitioning enabled, storage for `example.com` exists in two different partitions, one for `a.com` and the other for `b.com`. Partitioning generally means that data stored by storage APIs like local storage and IndexedDB by an iframe will no longer be accessible to all contexts in the same origin. Instead, the data will only be available to contexts with the same origin and same top-level site.

### パーティション ストレージ有効前

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/wOagNNjLO8LHJUn6p1iM.png", alt="パーティションなしのストレージ API の図。", width="793", height="415" %}

### パーティション ストレージ後

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/X8tExxdcoVSE4P1bUKQJ.png", alt="パーティションによるストレージ API の図。", width="800", height="553" %}

機能のリリースは、安定性と互換性に応じて、2023 年早期に予定されています。オリジントライアルでサードパーティのストレージ パーティションをテストし、バグを報告することで、潜在的な問題を発見し、一般公開のロールアウト前に解決することができます。

Chrome ベータ版 105.0.5195.17 以降では、ストレージ パーティションをテストできます。

## ストレージ パーティションのテスト方法

以下の手順に従ってお試しください。

1. Chrome Canary バージョン 105 以降を使用します。
2. `chrome://flags/#third-party-storage-partitioning` にアクセスします。
3. Enable the "Experimental Third-party Storage Partitioning" flag.

Participate in early testing and [report bugs](https://bugs.chromium.org/p/chromium/issues/entry?labels=StoragePartitioning-trial-bugs&components=Blink%3EStorage) to help the Chrome team identify and fix any unexpected behavior before the stable launch. Blob URL and Clear-Site-Data header APIs are under active development and are not available for testing yet.

## Updated APIs

### Storage APIs

[クォータ システム](https://web.dev/storage-for-the-web/#how-much): クォータ システムは、ストレージに割り当てられるディスク容量を決定するために使用されます。各パーティションはクォータ システムによって個別のバケットとして管理され、許可される容量と、クリアされる時期が決定されます。: `navigator.storage.estimate()` はパーティションの情報を返します。`window.webkitStorageInfo` や `navigator.webkitTemporaryStorage` などの Chrome 専用 API は使用廃止になります。: [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) と [キャッシュ ストレージ](https://web.dev/cache-api-quick-guide)は、新しいパーティション クォータ システムを使用します。

[Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) : Web Storage API は、ブラウザがキーと値のペアを保存できる [Local Storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) と [Session Storage](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage) の 2 つの仕組みを提供します。これらは現在クォータで管理されていませんが、引き続きパーティション化されます。

[Origin Private File System](https://web.dev/file-system-access/#accessing-the-origin-private-file-system) : [File System Access API](https://web.dev/file-system-access)を使用すると、ユーザーがアクセスを許可した後、サイトはデバイス上のファイルやフォルダの変更を直接読み取ったり保存したりできます。Origin Private File System を使用すると、オリジンは、ユーザーが簡単にアクセスできるディスクに非公開コンテンツを保存でき、パーティション化されます。

[Storage Bucket API](https://wicg.github.io/storage-buckets/explainer.html) : Storage Bucket API は、バケットと呼ばれる新しい概念を使用して、IndexedDB や localStorage などのさまざまなストレージ API を統合する [Storage Standard](https://storage.spec.whatwg.org/) 用に開発されています。バケットに格納されたデータとバケットに関連付けられたメタデータはパーティションされます。

[Clear-Site-Data ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Clear-Site-Data) : 応答に `Clear-Site-Data` ヘッダーを含めると、サーバーはユーザーのブラウザに保存されているデータを消去するように要求できます。キャッシュ、Cookie、および DOM ストレージをクリアできます。ヘッダーを使用すると、1 つのパーティション内のストレージのみがクリアされます。

[Blob URL](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL) ストア : [blob](https://developer.mozilla.org/docs/Web/API/Blob) は、処理される生データを含むオブジェクトであり、リソースにアクセスするために blob URL を生成できます。トップレベル コンテキストで任意の Blob URL に移動するユースケースをサポートするために（[ディスカッション](https://github.com/w3c/FileAPI/issues/153)）、Blob URL ストアはトップレベル サイトではなくエージェント クラスターによってパーティションされます。この機能はまだテストできません。また、パーティションの仕組みが今後変更される可能性があります。

### Communication APIs

ストレージ API とともに、1 つのコンテキストがオリジンの境界を越えて通信できるようにする通信 API もパーティションされます。この変更は主に、ブロードキャストまたは同一オリジン ランデブーを介して他のコンテキストを検出できるようにする API に影響します。

以下の通信 API については、サードパーティの iframe は同一オリジン コンテキストと通信できなくなります。

[Broadcast Channel](/blog/broadcastchannel/) : Broadcast Channel API を使用すると、[ブラウジング コンテキスト](https://developer.mozilla.org/docs/Glossary/Browsing_context)（ウィンドウ、タブ、または iframe）と同じオリジンのワーカー間の通信が可能になります。: コンテキスト間の関係が明確に定義されているクロスサイト iframe の `postMessage()` は、変更が提案されていません。

[SharedWorker](https://developer.mozilla.org/docs/Web/API/SharedWorker) : SharedWorker API は、同一オリジンのブラウジング コンテキスト間でアクセスできるワーカーを提供します。

[Web Locks](https://developer.mozilla.org/docs/Web/API/Web_Locks_API) : Web Locks API を使用すると、同一オリジンの 1 つのタブまたはワーカーで実行されているコードが、何らかの作業の実行中に共有リソースのロックを取得できます。

### Service Worker API

[Service Worker API](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)は、バックグラウンドでタスクを実行するためのインターフェースを提供します。サイトがイベントに応答するための新しいワーカー コンテキストを作成する永続的な登録を作成すると、そのワーカーは任意の同一オリジン コンテキストと通信できるようになります。また、ServiceWorker API はナビゲーション リクエストのタイミングを変更できるため、[履歴スニッフィング](https://www.ndss-symposium.org/wp-content/uploads/ndss2021_1C-2_23104_paper.pdf)などのクロスサイト情報漏えいの可能性につながる可能性があります。したがって、サードパーティのコンテキストから登録される Service Worker はパーティションされます。

### Extension APIs

[拡張機能](/docs/extensions/mv3/)は、ユーザーのブラウジング エクスペリエンスをカスタマイズするプログラムです。Manifest V2 では、拡張機能は拡張機能のオリジンを持つ[バックグラウンド ページ](/docs/extensions/mv2/background_pages/)を作成できますが、ウェブコンテンツのオリジンを持つ iframe を埋め込むことができます。ストレージをパーティションすると一部のユース ケースが無効になるため、緩和策が提供される予定です。拡張機能に iframe オリジンの [host_permissions](/docs/extensions/mv2/runtime_host_permissions/) がある場合、iframe は拡張機能ページではなくトップレベル フレームとして扱われます。

Manifest V2 は[使用廃止](/docs/extensions/mv3/mv2-sunset/)となっており、削除されることに注意してください。[Manifest V3 に移行](/docs/extensions/mv3/intro/mv3-migration/)することをお勧めします。

## Engage and share feedback

共有ストレージの提案は現在も検討中であるため、今後変更される可能性があります。 この API を試して、フィードバックがある場合は、ぜひお聞かせください。

- **GitHub**: [提案](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md)を読み、[質問を投稿したり、ディスカッションに参加](https://github.com/wanderview/quota-storage-partitioning/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

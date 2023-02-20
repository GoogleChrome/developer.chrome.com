---
layout: layouts/blog-post.njk
title: ストレージ パーティション
subhead: サードパーティのコンテキストで通信 API からストレージを分離して、特定の種類のサイドチャネル クロスサイトトラッキングを防止します。
description: サードパーティのコンテキストで通信 API からストレージを分離して、特定の種類のサイドチャネル クロスサイトトラッキングを防止します。
authors:
  - kevinkiklee
date: 2022-08-24
tags:
  - privacy
---

## 実施状況

- [Storage Partitioning の提案](https://github.com/privacycg/storage-partitioning)はディスカッションを受け付けています。
- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5723617717387264)
- Chrome Beta バージョン 105.0.5195.17 以降でテストできます。

機能のリリースは、安定性と互換性に応じて、2023 年早期に予定されています。オリジントライアルでサードパーティのストレージ パーティションをテストし、バグを報告することで、潜在的な問題を発見し、一般公開のロールアウト前に解決することができます。

## ストレージ パーティションとは

特定の種類のサイドチャネル クロスサイト トラッキングを防止するために、Chrome はサードパーティのコンテキストでストレージと通信の API をパーティション化します。

ストレージ パーティションがない場合、サイトは異なるサイト間でデータを結合して、ウェブ全体でユーザーを追跡できます。また、埋め込みサイトは、[タイミング攻撃](https://dl.acm.org/doi/10.1145/352600.352606)、[XS-Leaks](https://github.com/xsleaks/xsleaks)、[COSI](https://arxiv.org/pdf/1908.02204.pdf) などのサイドチャネル手法を使用して、トップレベル サイトのユーザーに関する特定の状態を推測できます。

これまで、ストレージはオリジンによってのみキー化されてきました。これは、`example.com` からの iframe が `a.com` と `b.com` に埋め込まれている場合、ID を保存してストレージから正しく取得することで、これら 2 つのトサイトのブラウジング習慣を学習できる可能性があることを意味します。サードパーティのストレージ パーティションを有効にすると、`example.com` のストレージは、`a.com` 用と `b.com` 用の 2 つの異なるパーティションに存在することになります。

パーティション化は一般に、ローカルストレージや iframe による IndexedDB などのストレージ API によって保存されたデータが、同じオリジンのすべてのコンテキストからアクセスできなくなることを意味します。代わりに、データは同じオリジンと同じトップレベルサイトを持つコンテキストでのみ利用できます。

{% Columns %}

{% Column %}

### パーティション ストレージ有効前

<figure>  {% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/wOagNNjLO8LHJUn6p1iM.png", alt="パーティション化のないストレージ API の図。", width="793", height="415" %}    <figcaption>      ストレージ パーティション有効前は a.com と b.com でデータを共有可能。<br><a href="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/wOagNNjLO8LHJUn6p1iM.png">拡大表示</a>。    </figcaption> </figure>  
{% endColumn %}

{% Column %}

### パーティション ストレージ後

<figure>   {% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/X8tExxdcoVSE4P1bUKQJ.png", alt="パーティション化によるストレージ API の図。", width="800", height="553" %}     <figcaption>       ストレージ パーティション有効後は b.com は a.com のストレージにアクセスできなくなる。<br><a href="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/X8tExxdcoVSE4P1bUKQJ.png">拡大表示</a>。     </figcaption> </figure>  
{% endColumn %}

{% endColumns %}

## ストレージ パーティションのテスト方法

以下の手順に従ってお試しください。

1. Chrome Canary バージョン 105 以降を使用します。
2. `chrome://flags/#third-party-storage-partitioning` にアクセスします。
3. 「Experimental Third-party Storage Partitioning」フラグを有効にします。

初期のテストに参加して、安定版のリリース前に Chrome チームが予期しない動作を特定して修正できるように[バグを報告](https://bugs.chromium.org/p/chromium/issues/entry?labels=StoragePartitioning-trial-bugs&components=Blink%3EStorage)してください。Blob URL と Clear-Site-Data ヘッダー API は開発中であり、まだテストには使用できません。

## 更新された API

### ストレージ API

[クォータ システム](https://web.dev/storage-for-the-web/#how-much) :   クォータ システムは、ストレージに割り当てられるディスク容量を決定するために使用されます。各パーティションはクォータ システムによって個別のバケットとして管理され、許可される容量と、クリアされる時期が決定されます。 :   `navigator.storage.estimate()` はパーティションの情報を返します。`window.webkitStorageInfo` や `navigator.webkitTemporaryStorage` などの Chrome 専用 API は使用廃止になります。 :   [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) と [キャッシュ ストレージ](https://web.dev/cache-api-quick-guide)は、新しいパーティション クォータ システムを使用します。

[Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) :   Web Storage API は、ブラウザがキーと値のペアを保存できる [Local Storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) と [Session Storage](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage) の 2 つの仕組みを提供します。これらは現在クォータで管理されていませんが、引き続きパーティション化されます。

[Origin Private File System](https://web.dev/file-system-access/#accessing-the-origin-private-file-system) :   [File System Access API](https://web.dev/file-system-access)を使用すると、ユーザーがアクセスを許可した後、サイトはデバイス上のファイルやフォルダの変更を直接読み取ったり保存したりできます。Origin Private File System を使用すると、オリジンは、ユーザーが簡単にアクセスできるディスクに非公開コンテンツを保存でき、パーティション化されます。

[Storage Bucket API](https://wicg.github.io/storage-buckets/explainer.html) :   Storage Bucket API は、バケットと呼ばれる新しい概念を使用して、IndexedDB や localStorage などのさまざまなストレージ API を統合する [Storage Standard](https://storage.spec.whatwg.org/) 用に開発されています。バケットに格納されたデータとバケットに関連付けられたメタデータはパーティションされます。

[Clear-Site-Data ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Clear-Site-Data) :   応答に `Clear-Site-Data` ヘッダーを含めると、サーバーはユーザーのブラウザに保存されているデータを消去するように要求できます。キャッシュ、Cookie、および DOM ストレージをクリアできます。ヘッダーを使用すると、1 つのパーティション内のストレージのみがクリアされます。

[Blob URL](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL) ストア :   [blob](https://developer.mozilla.org/docs/Web/API/Blob) は、処理される生データを含むオブジェクトであり、リソースにアクセスするために blob URL を生成できます。トップレベル コンテキストで任意の Blob URL に移動するユースケースをサポートするために（[ディスカッション](https://github.com/w3c/FileAPI/issues/153)）、Blob URL ストアはトップレベル サイトではなくエージェント クラスターによってパーティションされます。この機能はまだテストできません。また、パーティションの仕組みが今後変更される可能性があります。

### 通信 API

ストレージ API とともに、1 つのコンテキストがオリジンの境界を越えて通信できるようにする通信 API もパーティションされます。この変更は主に、ブロードキャストまたは同一オリジン ランデブーを介して他のコンテキストを検出できるようにする API に影響します。

以下の通信 API については、サードパーティの iframe は同一オリジン コンテキストと通信できなくなります。

[Broadcast Channel](/blog/broadcastchannel/) :   Broadcast Channel API を使用すると、[ブラウジング コンテキスト](https://developer.mozilla.org/docs/Glossary/Browsing_context)（ウィンドウ、タブ、または iframe）と同じオリジンのワーカー間の通信が可能になります。 :   コンテキスト間の関係が明確に定義されているクロスサイト iframe の `postMessage()` は、変更が提案されていません。

[SharedWorker](https://developer.mozilla.org/docs/Web/API/SharedWorker) :   SharedWorker API は、同一オリジンのブラウジング コンテキスト間でアクセスできるワーカーを提供します。

[Web Locks](https://developer.mozilla.org/docs/Web/API/Web_Locks_API) :   Web Locks API を使用すると、同一オリジンの 1 つのタブまたはワーカーで実行されているコードが、何らかの作業の実行中に共有リソースのロックを取得できます。

### Service Worker API

[Service Worker API](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) は、バックグラウンドでタスクを実行するためのインターフェースを提供します。サイトがイベントに応答するための新しいワーカー コンテキストを作成する永続的な登録を作成すると、そのワーカーは任意の同一オリジンコンテキストと通信できるようになります。また、ServiceWorker API はナビゲーションリクエストのタイミングを変更できるため、[履歴スニッフィング](https://www.ndss-symposium.org/wp-content/uploads/ndss2021_1C-2_23104_paper.pdf)などのクロスサイト情報漏えいの可能性につながる可能性があります。

したがって、サードパーティのコンテキストから登録された Service Worker はパーティション化されます。

### 拡張 API

[拡張機能](/docs/extensions/mv3/)は、ユーザーのブラウジング エクスペリエンスをカスタマイズするプログラムです。Minifest V2 を使用すると、拡張機能は、拡張機能のオリジンを持つバックグラウンド ページを作成できますが、ウェブコンテンツのオリジンを持つ iframe を埋め込むことができます。

ストレージをパーティション化すると一部のユースケースが壊れてしまうため、その軽減策が提供される予定です。拡張機能に iframe オリジンの [host_permissions](/docs/extensions/mv2/runtime_host_permissions/) がある場合、iframe は拡張機能ページではなくトップレベルのフレームとして扱われます。

{% Aside %} Manifest V2 は[使用廃止](/docs/extensions/mv3/mv2-sunset/)となっており、削除されることに注意してください。[Manifest V3 に移行](/docs/extensions/mv3/intro/mv3-migration/)することをお勧めします。{% endAside %}

## 貢献とフィードバックの共有

共有ストレージの提案は現在も検討中であるため、今後変更される可能性があります。 この API を試して、フィードバックがある場合は、ぜひお聞かせください。

- **GitHub**: [提案](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md)を読み、[質問を投稿したり、ディスカッションに参加](https://github.com/wanderview/quota-storage-partitioning/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

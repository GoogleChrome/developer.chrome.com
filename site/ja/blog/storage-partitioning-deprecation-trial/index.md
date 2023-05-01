---
layout: layouts/blog-post.njk
title: パーティション分割されていないサードパーティ ストレージ、サービス ワーカー、通信 API の非推奨トライアルに参加する
description: Chrome 113 から段階的に、ストレージ、サービス ワーカー、通信 API がサードパーティのコンテキストに分割されます。この新しい機能に適応する時間が必要なサイトの場合、これらの非推奨のトライアルにより、サードパーティのストレージ、サービス ワーカー、および通信 API を一時的にパーティション分割されていない状態に保つことができます。
authors:
  - arichiv
  - kyraseevers
date: 2023-03-09
tags:
  - privacy
---

[Chrome 113](https://chromiumdash.appspot.com/schedule)から徐々に、ストレージ、サービス ワーカー、通信 API が[サードパーティ コンテキストに分割され](/docs/privacy-sandbox/storage-partitioning/)ます。サードパーティ コンテキストで使用される影響を受ける API は、同一生成元ポリシーによって分離されるだけでなく、最上位コンテキストのサイトによっても分離されます。サード パーティのストレージ パーティショニングのサポートを実装する時間がなかったサイトは、非推奨トライアルに参加して、一時的にパーティショニング**を解除し**(同一オリジン ポリシーによる分離を継続しますが、最上位サイトによる分離を削除します)、ストレージの以前の動作を復元することができます。サービス ワーカー、およびサイトに埋め込まれたコンテンツ内の通信 API。

一般的なパーティション分割の非推奨トライアルに加えて、 `window.sessionStorage`だけに焦点を当てた非推奨トライアルに参加することができます。この試用版は、一部のサイトで Firebase `signInWithRedirect`フローを移行する必要があるため利用できます。その移行の詳細については、[この記事](https://firebase.google.com/docs/auth/web/redirect-best-practices)を参照してください。

## 利用可能な非推奨トライアル

[Chrome 112 Beta](https://chromiumdash.appspot.com/schedule)から、2 つの非推奨トライアルを開始します。

1. [`DisableThirdPartyStoragePartitioning`](/origintrials/#/view_trial/-8517432795264450559) : トップレベル サイトが、ページに埋め込まれたサードパーティ コンテンツのストレージ、サービス ワーカー、および通信 API のパーティション分割を解除 (トップレベル サイトによる分離を一時的に解除) できるようにします。
2. [`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`](/origintrials/#/view_trial/3444127815031586817) : サイトがナビゲーション間で sessionStorage のパーティション分割を解除できるようにします。

これにより、サードパーティのパーティショニングが Chrome 113 でロールアウト プロセスを開始する前に、サイトが問題を発見して修正できるようになります。

以下は、非推奨の試用版の概要と予想される内容です。共有するフィードバックがある場合、またはこのトライアル中に問題が発生した場合は[、Partitioned Storage Deprecation Trial Github リポジトリ](https://github.com/miketaylr/partitioned-storage-deprecation-trial-feedback)でお知らせください。

### DisableThirdPartyStoragePartitioning

`DisableThirdPartyStoragePartitioning`非推奨トライアルに最上位サイトを登録すると、次の API はサードパーティのコンテキストでパーティション分割されないままになります: [Storage API](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#storage-apis) (localStorage、sessionStorage、IndexedDB、Quota など)、 [Communication API](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#communication-apis) (BroadcastChannel、SharedWorkers など) 、および WebLocks)、および[ServiceWorker API](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#serviceworker-api) 。

{% Aside 'caution' %} この`DisableThirdPartyStoragePartitioning`トライアルでは、 `Origin-Trial` HTTP ヘッダーではなく、HTML `<meta>`タグを介してオリジン トライアル トークンを含める必要があります。 {% endAside %}

例：

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/dqBSsNU8W3HOmMkPDYYh.png", alt="ストレージ分割図", width="800", height="544" %}

より詳細な説明については、 [プロジェクトの説明](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md)をご覧ください。

### DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning

`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`推奨トライアルに登録すると、タブを登録済みのオリジンに移動すると、同じオリジンのすべてのクロスサイト iframe が、 `Window.sessionStorage`およびその特定のタブの存続期間のみパーティション分割されないままになります。 `DisableThirdPartyStoragePartitioning`非推奨トライアルは、登録されたオリジン内に埋め込まれたすべてのサードパーティ コンテキストに影響しますが、 `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`非推奨トライアルは、代わりに、サード パーティ コンテキストに埋め込まれたときに、パーティション分割されていないアクセスを受け取る特定のオリジンを登録します。

{% Aside %} `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`トライアルは、HTML `<meta>`または`Origin-Trial` HTTP ヘッダーを介して機能します。 {% endAside %}

例：

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/6uxCgy48dDcfFVgkwycu.png", alt="一般的なパリトン化後のストレージ分割図。", width="800", height="432" %}

## これは Web 開発者にとって何を意味するのでしょうか?

サイトは、パーティション化されていないストレージ、サービス ワーカー、および通信 API のサードパーティ コンテキストでの使用状況を監査し、必要に応じて、これらの非推奨トライアルが期限切れになる前にサードパーティのパーティショニングに備える必要があります。 **Chrome 123 でこれらの非推奨トライアルを 2024 年 5 月 2 日に終了する予定です。**

ページに埋め込まれたサードパーティ コンテンツのストレージのパーティション分割を解除するようブラウザに指示するには、最上位サイトで非推奨トライアルの 1 つまたは両方に登録し、対応するトライアル トークンを HTTP 応答ヘッダーに追加する必要があります (詳細な例を参照)。下）。

各廃止トライアルは、Windows、Mac、Linux、Chrome OS、Android、および Android WebView で利用できます。

## 非推奨トライアルに参加する

以下は、非推奨トライアルの一方または両方に参加する方法の簡単な概要です。詳細な手順については、[オリジン トライアルを開始する を](/docs/web-platform/origin-trials)参照してください。

1. Chrome バージョン 112 (またはそれ以降) を起動し、 [`ThirdPartyStoragePartitioning`](/blog/storage-partitioning-dev-trial/)フラグが有効になっていることを確認します。
2. 最上位サイトに埋め込まれたサードパーティ コンテンツの動作が、ストレージのパーティショニングによって壊れていることを確認します (そうでない場合は、廃止トライアルに参加する必要はありません)。
3. 以下にアクセスして、非推奨トライアルに登録し、ドメインのトークンを取得します。
    1. サードパーティの埋め込みコンテンツでストレージ、サービスワーカー、および通信 API のパーティション化を解除するトップレベルサイトの場合: [`DisableThirdPartyStoragePartitioning`](/origintrials/#/view_trial/-8517432795264450559)
    2. ナビゲーション間で sessionStorage のパーティション化を解除するトップレベルサイトの場合: [`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`](/origintrials/#/view_trial/3444127815031586817)
4. オリジン トライアル トークンをページに追加します。
    1. `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`トライアルの場合、最上位サイトの HTTP 応答ヘッダーに`Origin-Trial: <DEPRECATION TRIAL TOKEN>`を追加できます。 `<DEPRECATION TRIAL TOKEN>`には、非推奨トライアルに登録したときに取得したトークンが含まれます。これは HTML 経由でも実行できます `<meta>鬼ごっこ。
    2. `DisableThirdPartyStoragePartitioning`トライアルの場合、トークンは HTML の`<meta>`タグで指定する必要があります。 HTTP ヘッダー メソッドはサポートされていません。
5. `ThirdPartyStoragePartitioning`有効にしたまま Chrome 112 Beta (またはそれ以降) で Web サイトを読み込み、パーティショニング関連の問題が適切に軽減されていることを確認します。
6. 非推奨トライアルへの参加をやめるには、ステップ 2 で追加したヘッダーを削除するだけです。

これらの非推奨トライアルは[、サードパーティのオリジン トライアル](/docs/web-platform/third-party-origin-trials/)機能をサポートしていません。登録者は`DisableThirdPartyStoragePartitioning`の最上位サイトである必要があり、 `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`の場合、登録者は特定のタブの有効期間のある時点で最上位サイトであった必要があります。 [Chrome のオリジン トライアルのトラブルシューティング](/docs/web-platform/origin-trial-troubleshooting/)ガイドでは、トークンが正しく構成されていることを確認するための完全なチェックリストを提供しています。

## フィードバックを共有する

発生したフィードバックや問題は[、Partitioned Storage Deprecation Trial Github リポジトリ](https://github.com/miketaylr/partitioned-storage-deprecation-trial-feedback)に送信してください。

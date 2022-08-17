---
layout: 'layouts/doc-post.njk'
title: '共有ストレージ'
subhead: >
  安全な環境で、パーティション化されていないクロスサイトデータへのアクセスを許可します。
description: >
  安全な環境で、パーティション化されていないクロスサイトデータへのアクセスを許可します。
date: 2022-04-25
updated: 2022-05-24
authors:
  - alexandrawhite
  - kevinkiklee
---

## 実装状況

このドキュメントでは、パーティション化されていないストレージの新しい提案である Shared Storage API の概要を説明します。

*  [Shared Storage の提案](https://github.com/pythagoraskitty/shared-storage)の[公開ディスカッション](https://github.com/pythagoraskitty/shared-storage/issues)が開始しました。
*  [この API を Chrome に実装中](#try-the-shared-storage-api)です。
   *  最初のオリジントライアルには、`selectURL` API 関数のみが含まれる可能性があります。 Private Aggergation API のサポートはその後まもなく実装されることが予定されています。
   *  `selectURL` API は、M104 時点の Chrome Canaryでのテストに使用できます。
*  [プライバシーサンドボックスのタイムライン](http://privacysandbox.com/timeline)には、Shared Storage API とプライバシーサンドボックスのその他の提案の実装時期に関する情報が提供されています。

## この API が必要な理由

クロスサイトユーザーの追跡を防ぐために、ブラウザはあらゆる形態のストレージ（Cookie、localStorage、キャッシュなど）を[パーティション化](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)しています。 パーティション化されていないストレージに依存する正当なユースケースも多数ありますが、これらは新しいウェブ API の支援を受けなければ不可能です。 たとえば、サイト運営者がさまざまなサイトにまたがる広告キャンペーンのリーチを測定しながらも、個々のユーザープライバシーと ID は保護したい場合があります。

提案されている Shared Storage API では、サイトはパーティション化されていないクロスサイトデータを保存してそれらにアクセスすることが可能になります。 このデータは、漏洩を防ぐために安全な環境で読み取られる必要があります。 この API は、[トラスト トークン](/docs/privacy-sandbox/trust-tokens/)や [Fenced Frames](/docs/privacy-sandbox/fenced-frame/) などの他の提案と組み合わせて動作します。

## 共有ストレージのユースケース

Shared Storage API は、サードパーティ Cookie の既存の使用法をいくつか置き換えて、多くのユースケースをサポートすることを目的としています。 これには以下のようなユースケースが含まれます。

*  [Private Aggregation API](https://github.com/alexmturner/private-aggregation-api) を使った人口統計、リーチ、頻度測定、コンバージョン測定などの集計統計の記録
*  フリークエンシーキャップ
*  リフト実験
*  A/B テスト

この提案は、多くの潜在的な将来のユースケースをサポートする汎用 API を作成することを目的としています。 これにより、ウェブエコシステムとともに成長するためのさらなる実験と変更が可能になります。

## 共有ストレージの仕組み

共有ストレージを使用すると、埋め込む側のサイトにユーザー情報（ブラウザの履歴やその他の個人情報など）を共有することなく、クロスサイトデータに基づいた決定を下せるようになります。 共有ストレージには、いつでも他の JavaScript ストレージ API（localStorage や indexedDB など）などを書き込むことが可能です。 他のストレージ API とは異なり、共有ストレージの値は、共有ストレージワークレットと呼ばれる安全な環境でのみ読み取ることができます。

共有ストレージデータは次の目的で使用できます。

*  [**URL の選択**](#url-selection): ワークレットスクリプトを実行して、保存されたデータに基づいて、提供されたリストから URL を選択し、それを Fenced Frame にレンダリングできます。  返される URL は不透明な URL になります。つまり、コードの開発者や他の閲覧者には、どの URL が選択されたかがわかりません。
*  [**クロスサイトデータのノイズ付き集計**](#aggregated-data): ワークレットスクリプトを実行して、プライバシーサンドボックスの提案である [Private Aggergation API](https://github.com/alexmturner/private-aggregation-api) でデータを送信できるようになります。これにより、プライバシーを保護したレポートが返されます。

### 例: フリークエンシーキャップの URL の選択 {: #url-selection }

不透明な URL を選択して作成するために、共有ストレージデータを読み取るワークレットモジュールを登録します。 ワークレットクラスは最大 8 つの URL のリストを受け取り、選択された URL のインデックスを返します。

クライアントが `sharedStorage.selectURL()` を呼び出すと、ワークレットが実行し、レンダリングされる不透明な URL が Fenced Frame に返されます。

広告主のフリークエンシーキャップ（1 つの広告に対するユーザーの最大インプレッション数）に基づいて広告をレンダリングするとします。 フリークエンシーキャップは共有ストレージに保存されます。 共有ストレージワークレットは、共有ストレージ内の値を読み取り、ビューが追加されるたびにその値を減らします。 利用可能なインプレッションが残っている場合（ユーザーがフリークエンシーキャップに達していない場合）、広告が返されます（インデックス `1`）。 そうでない場合、デフォルトの URL が返されます（インデックス `0`）。

この例では、アドテクは次の 2 つのファイルを作成します。

*  `get-url.js`: 共有ストレージワークレット。広告クリエイティブにどの URL を返すかを判定するために、フリークエンシーキャップを評価します。
*  `ad-iframe.js`: 広告クリエイティブを選択してレンダリングし、サイト運営者のウェブサイトに注入します。

#### `get-url.js`

```javascript
class SelectURLOperation {
  async run(data, urls) {

    // 共有ストレージのフリークエンシーキャップを読み取る
    const frequencycap = await this.sharedStorage.get('frequencycap');

    // インプレッションが残っていない場合は、デフォルトの URL を返す
    if (frequencyCap === 0) {
      return 0;
    }

    // インプレッションを利用できる場合は、1 を差し引いて、広告 URL を返す
    await this.sharedStorage.set('frequencycap', frequencycap - 1);
    return 1;
  }
}

// 演算を登録する
register(
   'select-url', SelectURLOperation
);
```

#### `ad-iframe.js`

```javascript
// デフォルトの URL と広告 URL をセットアップする
const defaultUrl = new URL('https://default.example');
const adUrl = new URL('[https://ad.example](https://ad.example)');

// ワークレットモジュールを登録する
await window.sharedStorage.worklet.addModule('get-url.js');

// このキャンペーンのフリークエンシーキャップが未設定の場合は、それを設定する。
window.sharedStorage.set('frequencycap', 5, { ignoreIfPresent: true });

// 利用できるオプションから URL を選択する
const opaqueUrl = await window.sharedStorage.selectURL(
  'select-url', [defaultUrl, adUrl]
);

// 返される URL を iframe または Fenced Frame にレンダリングする
document.getElementById('example-iframe').src = opaqueUrl;
```

### 例: クロスサイトデータ（広告キャンペーンリーチ）の集計 {: #aggregated-data }

ユーザーに関するデータを集計することでユーザーのプライバシーを保護しながら、そのデータをサイト間のリーチを測定する集計サービスに送信することもできます。

たとえば、消費財を扱う会社が、広告を表示する人の数を最大化するために、複数のサイトで認知度を高める広告キャンペーンを実施するとします。 この会社は、広告を表示したユニークユーザー数を表すリーチを知りたいと考えています。 この例では、サイト運営者は次の 2 つのファイルを作成します。

*  `ad-iframe.js`: iframe に埋め込みます。これは共有ストレージワークレットを呼び出し、広告キャンペーン ID を含むレポートを送信します。
*  `reach.js`: 集計されるリーチレポートを送信する共有ストレージワークレット。

#### `ad-iframe.js`

```javascript
await window.sharedStorage.worklet.addModule("reach.js");

// 共有ストレージワークレットにレポートを送信する
await window.sharedStorage.run("send-reach-report", {
  data: {
     "campaign-id": "1234"
  }
});
```

#### `reach.js`

```javascript
class SendReachReportOperation {
  async run(data) {
    const report_sent_for_campaign = "report-sent-" + data["campaign-id"];

    // このキャンペーンのレポートを送信されたことのないユーザーの
    // リーチを計算する。
    // 現在のサイト以外のサイトで、このキャンペーンのレポートを以前に
    // トリガーしたユーザーはスキップされる。
    if (await this.sharedStorage.get(report_sent_for_campaign) === "yes") {
      return;  // レポートを送信しない。
    }

    // ユーザーエージェントは、遅延後に、レポートをデフォルトのエンドポイントに送信する。
    privateAggregation.sendHistogramReport({
      bucket: data["campaign-id"];
      value: 128,  // 事前定義済みの固定値。Private Aggergation API の Explainer を参照（Scaling values）。
   });

   await this.sharedStorage.set(report_sent_for_campaign, "yes");
  }
}

register("send-reach-report", SendReachReportOperation);
```

## Shared Storage API を試す

Shared Storage API は Chrome Canary 104 でコマンドラインの フラグを使って使用できます。

```text
--args --enable-features=SharedStorageAPI,FencedFrames,PrivacySandboxAdsAPIsOverride
```

以前に [Privacy Sandbox Ads API の実験機能](chrome://flags/#privacy-sandbox-ads-apis)を有効にしたことがある場合は、この設定によってコマンドラインから設定されるフラグがオーバーライドされるため、その機能を無効にする必要があります。

## 貢献とフィードバックの共有

共有ストレージの提案は現在も検討中であるため、今後変更される可能性があります。 この API を試して、フィードバックがある場合は、ぜひお聞かせください。

*  **GitHub**: [提案](https://github.com/pythagoraskitty/shared-storage)を読み、[質問を投稿したり、ディスカッションに参加](https://github.com/pythagoraskitty/shared-storage/issues)したりできます。
*  **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

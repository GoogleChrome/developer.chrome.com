---
title: 'アトリビューション レポートの提案 2022 年 1 月のアップデート'
description: >
  Learn about changes made to Attribution Reporting to reflect community feedback.
layout: 'layouts/blog-post.njk'
date: 2022-01-27
updated: 2022-06-15
hero: 'image/VbsHyyQopiec0718rMq2kTE1hke2/0ZWxOTHGZIp5fRzDBLTx.jpg'
alt: >
  Measuring tape.
authors:
  - maudn
  - alexandrawhite
tags:
  - privacy
  - experiment
---

{% Aside %}
このコンテンツは当初 Attribution Reporting API ドキュメントの一部として公開されました。今後の更新情報はより詳しい情報へのリンクを含む、[アップデート](/docs/privacy-sandbox/attribution-reporting-updates)に公開していきます。
{% endAside %}

このアトリビューション レポートの提案には、コミュニティからのフィードバックに対応するため、API
メカニズムの変更から新機能まで、さまざまな変更が反映されています。

## 変更履歴

- 2022 年 2 月 7 日: [ヘッダートリガーのリダイレクト](#header-trigger-redirect)に関するセクションを追加しました。
- 2022 年 1 月 27 日: 記事を最初に公開しました。

## この投稿の対象者 {: #who }

この投稿は次の方を対象としています。

- この API についてしっかりと理解している方。たとえば、WICG リポジトリでの議論を見守っていたり参加したりしていて、2022 年 1 月の提案に加えられた変更を把握したい方。
- デモや本番環境のテストで Attribution Reporting API を使用している方。

この API を初めて検討する場合や、まだ試してみていない場合は、まず、[API
の概要](/docs/privacy-sandbox/attribution-reporting-introduction/)をご覧ください。

## 今後の移行 {: #migration }

{% Aside %}
提案された変更は Chrome で試験的に実装される予定です。

これらの変更についてエコシステムからのフィードバックをお寄せください。議論に参加するには、この投稿の「公開ディスカッションに参加」の下にあるリンクでコメントするか、新しいイシューを作成してください。[参加の詳細についてご確認ください](/docs/privacy-sandbox/attribution-reporting-introduction/#participate)。

**これは API
ガイドではありません**。新しい提案の詳細は変更される場合があります。この
API を試してみる予定がある場合は、Chrome
でコードが利用可能になるまで移行を保留し、[デベロッパー向けメーリング
リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に登録して最新情報を入手してください。

{% endAside %}

これらの変更が Chrome に実装された場合: Attribution Reporting API
のイベントレベル レポートをデモや本番環境のテスト（オリジン
トライアル）で使用している場合、API
を引き続き動作させるには、ご自分のコードを編集していただく必要があります。また、新機能の使用を検討することもできます。

この記事では、集計可能レポートの変更点についても説明します。ただし、この投稿を記述した時点では、集計可能レポートに関するブラウザの実装はまだ存在しないため、これらの変更点が実装された場合、対応や移行は特に必要ありません。

## 名前の変更 {: #name-changes }

### 要約レポートと集計可能レポート

これまでの「集計レポート」は「要約レポート」と呼ばれるようになりました。

「要約レポート」は、複数の「集計可能レポート」（旧名称は「コントリビューション」または「ヒストグラム
コントリビューション」）の集計の最終的な出力です。

## API メカニズムの変更 {: #mechanism-changes }

### ヘッダーベースのソース登録（イベントレベル レポート）{: #header-source }

#### 変更点とその理由 {: #header-source-event-change }

ユーザーが広告を表示またはクリックすると、ブラウザは（ユーザーのデバイスでローカルに）このイベントを記録します。その際に、アトリビューション
レポートに固有のパラメータ `attributionsourceeventid`, `attributiondestination`, `attributionexpiry`
などのパラメータ）も記録されます。これらのパラメータの値はアドテクによって設定されます。

これらのパラメータの設定方法が変更されています。

以前の提案では、これらのパラメータはクライアントサイドで、アンカー
タグ内に HTML 属性として、または JS
ベースの呼び出しの引数として含める必要がありました。パラメータは、クリック時または表示時に判明している必要がありました。

新しい提案では、これらのパラメータの値はアドテク
サーバーで定義されます。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/YHKvC2HL9yLi7j6QZ3zv.png", alt="ヘッダーベースのソース登録の図", width="800", height="476" %}

この方法には、特にセキュリティの面で多くのメリットがあります。このヘッダー
メカニズムでは、アトリビューション
ソースがスコープ内に登録されるかどうかについて、レポート送信元（通常はアドテク）が直接制御できるようになるからです。この変更により、正規のブラウザでは送信元を有効にしていないソースは登録されなくなるため、不正行為に関する懸念が部分的に軽減されます。

#### ソース登録の仕組み {: #header-source-event-how }

1. ある広告について、アドテクは特定のクライアントサイド属性
   `attributionsrc`. を定義する必要があります。この属性の値は、ブラウザのリクエストの送信先となる
    URL です。このリクエストには新しい HTTP ヘッダー `Attribution-Reporting-Source-Info` が含まれます。その値 `navigation`
    または `event` では、それぞれソースがクリックとビューのどちらであるかを指定します。
2. このリクエストを受信したら、クリック / ビュー トラッキング サーバーは、必要なアトリビューション パラメータを含む HTTP
    ヘッダー `Attribution-Reporting-Register-Source` を指定して応答する必要があります。
3. このヘッダーを返す送信元が「レポート送信元」となります（以前は `attributionreportto` として定義されていました）。

    HTTP レスポンス ヘッダー `Attribution-Reporting-Register-Source`:

    ```json
    {
      "source_event_id": "267630968326743374",
      "destination": "https://toasters.example",
      "expiry": "604800000"
    }
    ```

#### テクニカル Explainer で詳細を見る {: #header-source-event-explainer }

[アトリビューション
ソースの登録](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#registering-attribution-sources)

#### 公開ディスカッションに参加 {: #header-source-event-discuss }

[イシュー #261](https://github.com/WICG/conversion-measurement-api/issues/261)

### ヘッダーベースのアトリビューション トリガー（イベントレベル レポート）{: #header-trigger-event }

#### 変更点とその理由 {: #header-trigger-event-change }

クリックやビューの登録と同様に、新しい提案では、アトリビューション
トリガー（アドテクがブラウザにコンバージョンを記録するよう指示するタイミング）がヘッダーベースの手法に変更されています。

このメカニズムは[ヘッダーベースのソース登録](#header-based-source-registration-event-level-reports)に合わせたもので、以前に使用していたリダイレクト
メカニズムよりも従来型の方法です。

また、新しい提案では、コンバージョン ページで `attributionsrc`
属性が必須となります。

その理由は権限の問題です。以前の提案では、トリガー側のサイト（通常は広告主のサイト）は、`Permissions-Policy`
ヘッダーを通じて機能を全般的に制御することはできました。しかし、最終的にアトリビューションをトリガーする主体に対して、要素がリクエストを送信できるかどうかについて、要素レベルで細かく制御することはできませんでした。`attributionsrc`
によってこの点が変わります。この必須のマーカーを使用すると、広告主はどの要素がアトリビューションをトリガーできるかを管理して制御できるようになります。

なお、ソース側（通常はパブリッシャーのサイト）には、`Permissions-Policy`
によるページ全体の制御と、`attributionsrc`
による要素レベルの制御があります。

#### アトリビューション トリガーの仕組み {: #header-trigger-event-how }

ピクセル
リクエストを受信し、コンバージョンとして分類する必要があると判断した場合、アドテクは新しい
HTTP
ヘッダー `Attribution-Reporting-Register-Event-Trigger`
を指定して応答する必要があります。

このヘッダーの値では、トリガー イベントの処理方法を JSON
オブジェクトとして指定します。これは以前の提案でクエリ
パラメータとして定義されていた情報と同じです。

HTTP レスポンス ヘッダー `Attribution-Reporting-Register-Event-Trigger`:

```json
    [{
        trigger_data: （3 ビット符号なし整数）,
        trigger_priority: （64 ビット符号付き整数）,
        deduplication_key: （64 ビット符号付き整数）
    }]
```

#### リダイレクト（任意）{: #header-trigger-redirect }

必要に応じて、アドテク サーバーは
`Attribution-Reporting-Register-Event-Trigger` を含むレスポンスをリダイレクト
レスポンスにすることができます。それにより、サードパーティは、コンバージョン
イベントを確認し、ブラウザに関連付けるよう指示できるようになります。

リダイレクトは任意です。アドテクとサードパーティの両方がページ上にピクセルを配置している場合、リダイレクトは不要です。

詳しくは、[サードパーティのレポート](#3p-reporting)をご覧ください。

#### テクニカル Explainer で詳細を見る {: #header-trigger-event-explainer }

[アトリビューションのトリガー](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#triggering-attribution)

#### 公開ディスカッションに参加 {: #header-trigger-event-discuss }

[イシュー #91](https://github.com/WICG/conversion-measurement-api/issues/91)

### ワークレットなし（集計可能レポート）{: #no-worklet }

#### 変更点とその理由 {: #no-worklet-change }

以前の集計可能レポートの提案では、JavaScript
にアクセスして、集計可能レポートを生成するワークレット（JavaScript
ベースのメカニズム）を呼び出す必要がありました。

新しい提案では、ワークレットは必要ありません。代わりに、アドテクは、ブラウザが集計可能レポートを生成する際に使用するルールを宣言的に（HTTP
ヘッダーを使って）定義します。

この新しい提案には次のようなメリットがあります。

- **ブラウザの実装:** ワークレットの設計とは異なり、新しい設計では、ブラウザでの新しい実行環境を必要としないため、大幅にシンプルになります。
- **デベロッパーのエクスペリエンス:** 新しい設計はヘッダーに依存しています。ヘッダーはワークレットとは異なり、デベロッパーによく使用されていて、広く知られています。また、[ソース登録](#header-based-source-registration-event-level-reports)の API サーフェスと密接に連携しているため、API の習得と使用が容易になります。
- **採用:** 新しい設計では、より多くの既存の測定システムが集計可能レポートを使用できるようになります。多くの測定ソリューションは
  HTTP のみを使用しています。つまり、JavaScript へのアクセスを必要としない画像リクエスト（ピクセル リクエスト）に依存しています。しかし、ワークレットの手法では
  JavaScript へのアクセスが必要であるため、既存の測定システムからの移行が難しくなる可能性がありました。
- **堅牢性:** 新しい設計では、`keepalive` セマンティクスとの統合が容易になるため、たとえば、ユーザーがページを離れるときにクリックやビューが登録される場合などに、データ損失を軽減できます。

#### ワークレットのないメカニズムの仕組み {: #no-worklet-how }

この宣言的なメカニズムは、イベントレベルのソース登録やアトリビューション
トリガーのヘッダーと同様に、HTTP
ヘッダーに基づいています。この点について詳しくは、次のセクションをご覧ください。

#### 公開ディスカッションに参加 {: #no-worklet-discuss }

[イシュー #194](https://github.com/WICG/conversion-measurement-api/issues/194)

### ヘッダーベースのソース登録（集計可能レポート）{: #header-source-agg }

集計可能レポートのソースを登録するために新しいメカニズムが提案されています。このメカニズムは[イベントレベルのソース登録](#header-based-source-registration-event-level-reports)と同じです。

ヘッダー名のみが異なります:
`Attribution-Reporting-Register-Aggregatable-Source`

#### テクニカル Explainer で詳細を見る {: #header-source-agg-explainer }

[アトリビューション
ソースの登録](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-source-registration)

### ヘッダーベースのアトリビューション トリガー（集計可能レポート）{: #header-trigger-agg }

集計可能レポートのソースを登録するために新しいメカニズムが提案されています。このメカニズムは[イベントレベルのアトリビューション
トリガー](#header-based-attribution-trigger-event-level-reports)と同じです。

ヘッダー名のみが異なります:
`Attribution-Reporting-Register-Aggregatable-Trigger-Data`

#### テクニカル Explainer で詳細を見る {: #header-trigger-agg-explainer }

[アトリビューション
トリガーの登録](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)

## 新機能 {: #new-features }

### サードパーティ レポート（イベントレベルのレポートと集計レポート）{: #3p-reporting }

#### 変更点とその理由 {: #3p-reporting-change }

新しい提案には、サードパーティ
レポートのユースケースのサポートを改善する 2 つの側面があります。

- 必要に応じて、アドテクが**ネットワーク リクエストを他のアドテク
    サーバーにリダイレクトできます**。それにより、他のアドテクがソースとトリガーを独自に登録できます。これは現在、サードパーティで設定されている一般的な方法です。これにより API は、サードパーティの、特に既存のレポート システムに導入しやすくなります。
- レポートの送信元（通常はアドテク）は**プライバシーに関する制限をほとんど共有しなくなります**。これにより、複数のアドテクが同じパブリッシャーや広告主と連携するユースケースに対応できます。

#### サードパーティ レポートの仕組み {: #3p-reporting-how }

新しい提案では、レスポンス ベースのソース登録とトリガーが HTTP
ヘッダーを利用するようになります。アドテクは、こうしたリクエストに対して
HTTP リダイレクトを利用できます。

パブリッシャー
サイトでのクリックまたは視聴のリクエスト（ソース登録）が、後で複数のパーティーにリダイレクトされれば、それぞれのパーティーがこの視聴またはクリック（ソースイベント）を登録できます。

同様に、アドテクは広告主サイトからの個々のアトリビューション
リクエストをリダイレクトできるので、他の複数のパーティーがコンバージョンを登録できます（アトリビューション（アトリビューション
トリガー）。

**パーティーがそれぞれ個別のレポートにアクセスし**、個別のデータでレポートを設定できます。

{% Aside %}
不正行為を防止するため、レポートに関する明示的な制限が追加されました。詳しくは、[プライバシー保護の変更](#privacy-protection-changes)をご覧ください。
{% endAside %}

#### Register multiple triggers without redirects

コンバージョン側に（トリガーごとに）複数のピクセル要素を追加することで、リダイレクトなしに複数のアトリビューション トリガーを登録することも可能です。

#### 公開ディスカッションに参加 {: #3p-reporting-discuss }

[イシュー #91](https://github.com/WICG/conversion-measurement-api/issues/91)
[イシュー #261](https://github.com/WICG/conversion-measurement-api/issues/261)

### ビュースルーの測定（イベントレベルのレポートと集計レポート）{: #view-through }

#### 変更点とその理由 {: #view-through-change }

新しい提案では、ビュースルー測定とクリックスルー測定が、次のように連携して機能します。

- `registerattributionsrc` は、クリックとともに視聴を記録するようにブラウザに指示する視聴専用の属性で、今回の提案により**削除されます**。
- **プライバシーのメカニズム**が、クリックと視聴の両方で統一されます。詳しくは、[ノイズと透明性](#noise-and-transparency-event-level-reports-and-aggregatable-reports)をご覧ください。

この変更は、新しい[ヘッダーベースの登録メカニズム](#api-mechanism-changes)に合わせて提案されています。また、クリックスルー測定とビュースルー測定の両方をサポートする場合に、デベロッパー
エクスペリエンスも簡素化されます。

#### ビュースルー測定の仕組み {: #view-through-how }

ビュースルー測定とクリックスルー測定には、どちらも[ヘッダーベースの登録](#api-mechanism-changes)を使用します。

#### テクニカル Explainer で詳細を見る {: #view-through-explainer }

[イベントレベルのレポート（クリックと視聴の両方](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md)

#### 公開ディスカッションに参加 {: #view-through-discuss }

[イシュー #261](https://github.com/WICG/conversion-measurement-api/issues/261)

### デバッグ / パフォーマンス分析（イベントレベルのレポートと集計レポート）{: #debugging }

#### 変更点とその理由 {: #debugging-change }

デバッグ
メカニズムが提案に追加され、デベロッパーがバグを検出しやすくなるだけでなく、アトリビューション
レポートのパフォーマンスを既存の Cookie
ベースの測定ソリューションと比較できるようになります。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/ncYlu8aGOiQn579Wzc2D.png", alt="新しいCookieベースのデバッグシステムの図", width="800", height="304" %}

#### デバッグの仕組み {: #debugging-how }

{% Aside %}
Attribution Reporting API は、ソースイベント（パブリッシャー
サイトでの広告クリックまたは広告視聴）の詳細と、トリガー
イベント（広告主サイトでのコンバージョン）の詳細とのリンクを明示的に阻止しています。これにより、サードパーティの
Cookie ベース ソリューションによるクロスサイト
トラッキングは行えなくなります。

**テストフェーズ中**は、デバッグ機能の提案により、ソースイベントの詳細とトリガー
イベントの詳細の間のリンクが提供されます。ただし、このデバッグ機能は意図的に、サードパーティの
Cookie を設定しておく機能を必須としています。つまり、サードパーティの
Cookie
がブロックされている場合は、デバッグ機能を利用できなくなります。また、サードパーティの
Cookie のサポートが終了した後は、必然的に利用できなくなります。
{% endAside %}

ソース登録とトリガー登録はどちらも、新しいパラメータ `debug_key`
を受け取ります。これは 64 ビットの符号なし整数（大きい数値）です。

ソースとトリガーのデバッグキーを使用してレポートが作成されていて、`Samesite=None
ar_debug=1` という Cookie
が、ソースとトリガーの登録時にレポートの送信元の Cookie
格納場所にある場合、デバッグ レポート（JSON）が
`.well-known/attribution-reporting/debug` エンドポイントに送信されます。

```json
{
  "source_debug_key": 1234567890987,
  "trigger_debug_key": 4567654345028
}
```

イベントレベルのレポートと集計レポートにも、この 2
つの新しいパラメータが含まれるため、これらを適切なデバッグ
レポートに関連付けることができます。

#### テクニカル Explainer で詳細を見る {: #debugging-explainer }

[省略可: 拡張デバッグ
レポート](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#optional-extended-debugging-reports)

#### 公開ディスカッションに参加 {: #debugging-discuss }

[イシュー #174](https://github.com/WICG/conversion-measurement-api/issues/174)

### フィルタ機能（イベントレベルのレポートと集計レポート）{: #filtering }

{% Aside %}
これは新機能です。正確に言うと、集計レポートの提案にはすでに含まれており、今回、イベントレベルのレポートの提案にも追加されました。
{% endAside %}

#### 変更点とその理由 {: #filtering-change }

この機能は、現在の広告エコシステムの重要なユースケースをサポートするので、イベントレベルのレポートと集計レポートの両方で多くのユースケースがサポートされるようになります。

- **コンバージョン フィルタリング:** ソース側の情報に基づいてコンバージョンをフィルタします。たとえば、広告クリックと広告視聴に対してそれぞれ異なるトリガーデータ（コンバージョン データ）を選択できます。

- **アトリビューションの不一致:** 間違ったアトリビューションが行われたコンバージョンをフィルタします。これは特殊なコンバージョン
フィルタリングです。たとえば、API 内の etld+1 の送信先スコープが原因で間違った広告クリックまたは広告視聴に一致したコンバージョンを除外します。

#### フィルタ機能の仕組み（イベントレベルのレポート）{: #filtering-how }

ソース側の JSON オブジェクトでオプションの `source_data`
フィールドを使用すると、後でコンバージョン時にブラウザがフィルタリング
ロジックを適用するために使用するアイテムを定義できます。

```json
  {
    source_event_id: "267630968326743374",
    destination: "https://toasters.example",
    expiry: "604800000"
    source_data: {
      conversion_subdomain: ["electronics.megastore"
                              "electronics2.megastore"],
      product: "198764",
      // "source_type" は {"navigation", "event"} のどちらかとして自動的に生成されます
    }
  }
```

トリガー登録はオプションのヘッダー `Attribution-Reporting-Filters`
を受け取るようになります。

HTTP レスポンス ヘッダー `Attribution-Reporting-Filters`:

```json
{
  "conversion_subdomain": "electronics.megastore",
  "directory": "/store/electronics"
}
```

また、`Attribution-Reporting-Register-Event-Trigger` ヘッダーを `filters`
フィールドを使って拡張すると、`trigger_data` を `source_data`
に基づいて設定する選択的フィルタリングが行えます。

フィルタ（JSON）内のキーが `source_data`
内のキーと一致する場合にトリガーは、
共通集合が空であれば、完全に無視されます。

#### テクニカル Explainer で詳細を見る {: #filtering-explainer }

[オプションのアトリビューション
フィルタ](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#optional-attribution-filters)

#### 公開ディスカッションに参加 {: #filtering-discuss }

[イシュー #194](https://github.com/WICG/conversion-measurement-api/issues/194)

[イシュー #201](https://github.com/WICG/conversion-measurement-api/issues/201)

## プライバシー保護の変更 {: #privacy-changes }

### ノイズと透明性（イベントレベルのレポートと集計レポート）{: #noise }

#### 変更点とその理由 {: #noise-change }

新しい提案では、レポートのプライバシー
メカニズムの一つが改善され、レポートが**ランダム化されるレスポンス**の対象となります。
つまり、正しくレポートされるのは実際のコンバージョンの一部であり、一定の確率で、**実際のコンバージョンの一部が抑制されたり、偽のコンバージョンが追加されたりする**ことになります。  

この新しい手法には以下のようなメリットがあります。

- クリックと視聴のプライバシー メカニズムが**統合されます**。
- トリガーデータ（コンバージョン データ）とトリガーソースのリンクのノイズを分離するメカニズムよりも**わかりやすく**なります。
- 次のような**プライバシー フレームワーク**を設定できます。ノイズを適切に設定することで、パーティーが誰も、特定の広告でコンバージョンに至った（または至らなかった）ユーザー個人の識別に API を利用できないようにするフレームワークです。

この新しいメカニズムは、5% の確率でトリガーデータ（コンバージョン
データ）がランダムな値に置き換えられていた以前のメカニズムに代わるものです。

さらに、ランダム化されるレスポンスの確率値がレポート本体に追加されます（`randomized_trigger_rate`
フィールド）。このフィールドは、ソースがランダム化されるレスポンスの対象となる確率（0～1）を示します。

これには主に 2 つのメリットがあります。

- ブラウザの基本動作の**透明性**を、レポートを受け取る対象者（通常はアドテク）に対して保ちます。
- これは今後、API がサポートされる**すべてのブラウザ**にとって有用となります。ブラウザごとに、プライバシーに関する目標に応じて、異なるレベルのノイズを適用できるようになり、レポートを取り扱うパーティーにとって、こうした可視性が必要になるからです。

#### ノイズの仕組み {: #noise-how }

新しい提案では、ソースの登録時（広告クリックまたは広告視聴が記録されたとき）に、コンバージョンのアトリビューションを正しく行ってこの広告クリック
/
視聴に関するレポートを送信するかどうか、または**偽の出力**を代わりに生成するかどうかを、ブラウザがランダムに決定します。

偽の出力は次のようになります。

- **レポートを一切出力しない** - ユーザーのコンバージョンがあったかどうかにはよりません。
- **1 つまたは複数の偽のレポートを出力する** - ユーザーのコンバージョンがあったかどうかにはよりません。

偽のレポートでは、トリガーデータ（コンバージョン
データ）はランダム値です。クリックの場合は 3 ビットのランダム値（0～7
の任意の数値）、視聴の場合は 1 ビットのランダム値（0 または 1）です。

実際のレポートと同様に、偽のレポートもユーザーのコンバージョン直後には送信されません。ランダムな*レポート期間*の終わりに送信されます。

{% Aside 'key-term' %}
最初の広告クリック後、*レポート期間*のスケジュールが開始します。各レポート期間には期限が設定されています。その期限までにアトリビューションが行われたコンバージョンに関するレポートは、その期間の終わりに送信されます。
{% endAside %}

**クリック**の場合のレポート期間は、3 種類（クリック後 2 日間、7
日間、30
日間）あります。偽のレポートはそれぞれランダムに、レポート期間のいずれかに割り当てられます。

これとは別に、前回の提案ですでに説明したように、*各期間内*のレポートの順序はランダムです。

{% Aside %}
**視聴**の場合のレポート期間は 1
種類しかないため、視聴についての偽のレポートは、ランダムなレポート期間の対象になりません。
{% endAside %}

#### テクニカル Explainer で詳細を見る {: #noise-explainer }

[ノイズとなる偽のコンバージョンの例](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#noisy-fake-conversion-examples)

#### 公開ディスカッションに参加 {: #noise-discuss }

[イシュー #84](https://github.com/WICG/conversion-measurement-api/issues/84)

[イシュー #273](https://github.com/WICG/conversion-measurement-api/issues/273)

### レポートに関する制限事項（イベントレベルのレポートと集計レポート）{: #reporting-limits }

[レポート送信元の制限](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#reporting-origin-limits)

#### 変更点とその理由 {: #reporting-limits-change }

新しい提案では、**2
つのサイト間でイベントを測定できる当事者の数が明示的に制限されます**。

- {パブリッシャー、広告主} あたりのソース登録が可能な固有のレポート送信元（通常はアドテク）の上限数を **30 日間で 100
件**に制限することが提案されています。この数は、広告のクリックや視聴（ソースイベント）ごとにカウントされ、関連付けが行われていない場合もカウントされます。
- {パブリッシャー、広告主} あたりのレポート送信が可能な固有のレポート送信元（通常はアドテク）の上限数を **30 日間で 10
件**に制限することが提案されています。この数は、関連付けが行われたコンバージョンごとにカウントされます。

これらの上限数は、当事者によるコンバージョンの測定を妨げない程度に十分大きく、かつ
API
の一部の不正使用による影響を軽減できる程度に十分小さい値となっています。

### レポートのクールダウン / レート制限 {: #rate-limits }

#### 変更点とその理由 {: #rate-limits-change }

レポートのクールダウンは、1 人のユーザーについて、この API
を介して一定期間に送信される情報の合計量を抑制するプライバシー
メカニズムです。

新しい提案では、{ソースサイト、送信先、レポートの送信元}（通常は
{パブリッシャー、広告主、アドテク}）あたり **30
日間**にスケジュール作成できるレポートが **100** 件に制限されます。

この制限に達すると、ブラウザは該当の
{ソースサイト、送信先、レポートの送信元}（通常は
{パブリッシャー、広告主、アドテク}）に一致するレポートのスケジュール作成を停止します。その後、該当の
{ソースサイト、送信先、レポートの送信元} のレポート数が 100
件を下回ってから 30
日間が経過すると再度スケジュール作成できるようになります。

#### テクニカル Explainer で詳細を見る {: #rate-limits-explainer }

[レポートのクールダウン /
レート制限](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#reporting-cooldown--rate-limits)

### 送信先の制限（イベントレベルのレポートのみ）{: #capping }

{% Aside %}
新しい提案は、**クリック数と視聴回数の両方**について送信先を制限するものです。なお、視聴回数に関する送信先の制限については、前回すでに提案されています。
{% endAside %}

#### 変更点とその理由 {: #capping-change }

送信先の制限で、スコープにレポート送信元（通常はアドテク）を含めるよう修正:
{パブリッシャー、アドテク} あたり **100**
件の固有の保留中の送信先（通常は広告主のサイト、またはコンバージョンが発生すると想定されるサイト）が許可されます。

これは、閲覧履歴の再構成を制限する**プライバシー保護メカニズム**です。

#### テクニカル Explainer で詳細を見る {: #capping-explainer }

[保留中のソースで扱う固有の送信先の数を制限する](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#limiting-the-number-of-unique-destinations-covered-by-pending-sources)

## アトリビューション レポート: すべてのリソース {: #resources }

*  [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting-introduction).
*  [API ハンドブック](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit?usp=sharing)
   と [API について知っておくべきこと](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/edit?usp=sharing).

_The header image is from <a href="https://unsplash.com/@diana_pole">Diana Polekhina</a> on <a href="https://unsplash.com/">Unsplash</a>._

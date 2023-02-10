---
layout: layouts/doc-post.njk
title: 共有ストレージ
subhead: >

  安全な環境で、パーティション化されていないクロスサイトデータへのアクセスを許可します。
description: >

  安全な環境で、パーティション化されていないクロスサイトデータへのアクセスを許可します。
date: 2022-04-25
updated: 2023-01-19
authors:
  - alexandrawhite
  - kevinkiklee
---

## 実装状況

このドキュメントでは、パーティション化されていないクロスサイトストレージの新しい提案である Shared Storage API の概要を説明します。

- [共有ストレージの提案](https://github.com/pythagoraskitty/shared-storage)の[公開ディスカッション](https://github.com/pythagoraskitty/shared-storage/issues)が開始しました。
- この API を Chrome に実装中です。[ライブデモが公開されています](#try-the-shared-storage-api)。
    - URL の選択出力ゲートは、Chrome M105+ からのローカルテストで利用可能です。
    - プライベート集計出力ゲートは、Chrome M107+ からのローカルテストで利用可能です。
    - Private Aggregation API は、Chrome M107+ Beta からの[プライバシーサンドボックス統一オリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)で利用可能です。
- [プライバシーサンドボックスのタイムライン](http://privacysandbox.com/timeline)には、Shared Storage API とプライバシーサンドボックスのその他の提案の実装時期に関する情報が提供されています。

## この API が必要な理由

クロスサイトユーザートラッキングを防ぐために、ブラウザはあらゆる形式のストレージ（Cookie、localStorage、キャッシュなど）を[パーティション化](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)しています。ただし、新しい Web API の助けがなければ不可能な、パーティション化されていないストレージに依存する正当なユースケースが多数あります。たとえば、コンテンツプロデューサーは、クロスサイト識別子に依存せずに、さまざまなサイトでのリーチを測定したいと考えるかもしれません。

Shared Storage API を使用すると、サイトはパーティション化されていないクロスサイトデータを保存してアクセスできます。このデータは、漏えいを防ぐために安全な環境で読み取る必要があります。

### 共有ストレージのユースケース

Shared Storage API を使用することでメリットが得られる可能性のある企業は、多種多様にあります。以下はその一例です。

- アドテックは、キャンペーンのリーチを測定し、フリークエンシーの上限を設定し、クリエイティブをローテーションすることができますが、現在はすべて、サードパーティの Cookie に依存しています。
- 決済プロバイダーは、ユーザーが既存の顧客であるかどうかを判断し、チェックアウトのエクスペリエンスを調整できます。
- ウェブセキュリティ会社は、カスタムロジックを構築して、不審または危険な行動にフラグを付けることができます。

まだ解決されていないクロスサイトストレージソリューションを探していますか？[ユースケースをお知らせください](https://github.com/WICG/shared-storage/issues)。

### ユースケース

Shared Storage API は、サードパーティ Cookie の既存のいくつかの用途を置き換えて多くのユースケースをサポートすることを意図しておます。これには以下が含まれる可能性があります。

<table class="with-heading-tint width-full">
  <thead>
  <tr>
   <th>ユースケース</th>
   <th>説明</th>
   <th>出力ゲート</th>
  </tr>
  </thead>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/frequency-control/">フリークエンシーコントロール</a></p></strong>
   </td>
   <td>効果的なフリークエンシーの振り子の反対側は過飽和状態になっており、ユーザーに同じコンテンツが頻繁に表示されれば、ユーザーエクスペリエンスが低下してしまいます。ビュー数のバランスを取って制御するために、組織はユーザーのビュー数を共有ストレージに記録し、ユーザーが事前定義されたカスタマイズ可能な制限に達したら、別のコンテンツを表示するようにできます。</td>
   <td>URL の選択</td>
  </tr>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/ab-testing/">A/B テスト</a></p></strong>
   </td>
   <td>ユーザーを実験グループに割り当て、そのグループを共有ストレージに保存して、サイト間でアクセスできるようにすることができます。</td>
   <td>URL の選択</td>
  </tr>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/creative-rotation/">クリエイティブ ローテーション</a></p></strong>
   </td>
   <td>クリエイティブローテーションモードとその他のメタデータを保存して、異なるサイト間でクリエイティブをローテーションできます。</td>
   <td>URL の選択</td>
  </tr>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/known-customer/">決済プロバイダーの既知の顧客</a></p></strong>
   </td>
   <td>ユーザーがサイトに登録したかどうかを共有ストレージに保存し、その保存されたステータスに基づいて別の要素をレンダリングできます。</td>
   <td>URL の選択</td>
  </tr>
  <tr>
   <td>
<strong>乱用防止の緩和</strong>
   </td>
   <td>悪用防止、詐欺防止、およびウェブセキュリティ組織は、独自の技術を使用して、自動化されたボットであれ、危害を加えようとしている実際の人間であれ、悪意のあるユーザーを検出することがよくあります。ここでは、URL の選択出力ゲートを使用してユーザーの信頼性評価をエンコードするか、プライベート集計出力ゲートを使用して異常検出用のデータセットを構築するかにかかわらず、さまざまな戦略をテストできます。</td>
   <td>URL の選択、Private Aggregation API</td>
  </tr>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/unique-reach/">ユニークリーチ レポート</a></p></strong>
   </td>
   <td>多くのコンテンツプロデューサーや広告主は、自分のコンテンツを閲覧したユニークユーザー数を知りたいと考えています。共有ストレージを使用して、ユーザーが広告、埋め込みビデオ、出版物を初めて見たときのレポートを作成し、同じユーザーが別のサイトで重複してカウントされるのを防ぎ、集計されたノイズの多いおおよそのユニークリーチのレポートを提供できます。</td>
   <td>Private Aggregation API</td>
  </tr>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/user-demographics">ユーザー人口統計レポート</a></p></strong>
   </td>
   <td>コンテンツプロデューサーは、多くの場合、オーディエンスの人口統計を理解したいと考えています。共有ストレージを使用して、1P サイトなどのコンテキストでユーザーの人口統計データを記録し、集約レポートを使用して、埋め込みコンテンツなどの他の多くのサイトでレポートを作成できます。</td>
   <td>Private Aggregation API</td>
  </tr>
  <tr>
   <td>
<strong><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/shared-storage/k-freq-reach">K+ フリークエンシー リーチ レポート</a></p></strong>
   </td>
   <td>「有効フリークエンシー」と呼ばれることもありますが、ユーザーが特定のコンテンツを認識または思い出す前に（多くの場合、広告ビューのコンテキストで）閲覧する最小限のビュー数が存在することがよくあります。共有ストレージを使用して、コンテンツを少なくとも K 回見た一意のユーザーのレポートを作成できます。</td>
   <td>Private Aggregation API</td>
  </tr>
</table>

この提案は、多くの潜在的な将来のユースケースをサポートする汎用 API を作成することを目的としています。 これにより、ウェブエコシステムとともに成長するためのさらなる実験と変更が可能になります。

## 共有ストレージの仕組み

共有ストレージを使用すると、ユーザー情報（ブラウザの履歴やその他の個人情報など）を埋め込みサイトと共有したり、独自のサーバーにデータを流出させたりすることなく、クロスサイトデータを以って十分な情報に基づく意思決定を行うことができます。

他の JavaScript ストレージ API（localStorage や indexedDB など）と同様に、いつでも共有ストレージに書き込むことができます。他のストレージ API とは異なり、共有ストレージワークレットと呼ばれる安全な環境でのみ共有ストレージの値を読み取ることができます。

{% Aside 'key-term' %} [ワークレット](https://developer.mozilla.org/docs/Web/API/Worklet)を使用すると、特定の JavaScript 関数を実行して、要求元に情報を返すことができます。ワークレット内では、JavaScript を実行できますが、外部ページと対話したり通信したりすることはできません。 {% endAside %}

ワークレットは、ビジネス ロジックを追加する場所です。ワークレット内では、共有ストレージから値を読み取って処理できますが、ワークレットの呼び出し元に正確な値を直接返すことはできません。ワークレットから有用な情報を抽出するために、一連の「ゲート」を使用できます。利用可能なゲートは 2 つありますが、今後さらに追加される可能性があります。

利用可能な Shared Storage API 出力ゲート:

- [**URL の選択**](/docs/privacy-sandbox/use-shared-storage#url-selection): ワークレットスクリプトを実行して、保存されたデータに基づいて、提供されたリストから URL を選択し、それを Fenced Frame にレンダリングできます。
    - 例: A/B テストを実施するとしましょう。サイトにユーザーが表示されたら、そのユーザーを実験グループに割り当て、そのグループを共有ストレージに保存して、サイト間でアクセスできるようにすることができます。その後、別のサイトで、共有ストレージに保存されているユーザーの実験グループに基づいて、ユーザーに表示するフレーム（支払いボタンや広告クリエイティブなど）を選択できます。
- [**クロスサイトデータのノイズ付き集計**](/docs/privacy-sandbox/use-shared-storage#aggregated-data): ワークレットを実行して、[Private Aggregation API](/docs/privacy-sandbox/attribution-reporting/summary-reports/) でクロスサイトデータを送信できます。これにより、プライバシーを保護した[集計レポート](/docs/privacy-sandbox/use-shared-storage#aggregated-data)が返されます。
    - 例: さまざまなサイトでコンテンツを閲覧したユニーク ユーザー数を知りたい場合があります。共有ストレージを使用して、ユーザーが広告、埋め込み動画、出版物、またはその他のコンテンツを初めて見たときに保存します。次に、Private Aggregation API を使用してワークレットを実行して、すべてのユーザーの初回ビューのデータを集計し、集計されたノイズ付きのおおよそのユニークリーチレポートを生成します。

## Shared Storage API を試す

URL の選択出力ゲートとプライベート集計出力ゲートの Shared Storage API をテストできます。URL の選択は Chrome Canary/Dev/Beta M105+ でテストでき、Private Aggregation API は Chrome M107+ Canary および Dev でテストできます。この API は、`chrome://flags/#privacy-sandbox-ads-apis` で **Privacy Sandbox Ads APIs experiment** フラグを有効にすることでテストできます。

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png", alt="これらの API を使用するには、Privacy Sandbox Ads APIs experiment を有効に設定してください", width="744", height="124" %}

### デモを使用する

[デモを利用できます](https://shared-storage-demo.web.app/)。コードを [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo) でご覧ください。

このデモは、広告主、アドテック、コンテンツ配信業者、またはさまざまなサイト運営者のサイトにまたがって情報を保存したい他のサードパーティサービスの観点から作成されています。デモでは、ユースケースごとに同じサードパーティのコードが **Publisher A** と **Publisher B** の両方のサイトで実行されます。サイト間のコンテキストでデータがどのように共有されているかを確認するには、サイト運営者のページにアクセスしてください。

デモには、URL の選択とプライベート集計のユースケースが含まれています。

URL の選択のデモでは、[フリークエンシーコントロール](/docs/privacy-sandbox/shared-storage/frequency-control)、[クリエイティブローテーション](/docs/privacy-sandbox/shared-storage/creative-rotation/)、[既知の顧客](/docs/privacy-sandbox/shared-storage/known-customer/)、[A/B テスト](/docs/privacy-sandbox/shared-storage/ab-testing/)のユース ケースを利用できます。

プライベート集計のデモでは、ユニーク[リーチの測定](/docs/privacy-sandbox/shared-storage/unique-reach)、[人口統計の測定](/docs/privacy-sandbox/shared-storage/user-demographics)、[K-フリークエンシーの測定](/docs/privacy-sandbox/shared-storage/k-freq-reach)をプレビューできます。

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

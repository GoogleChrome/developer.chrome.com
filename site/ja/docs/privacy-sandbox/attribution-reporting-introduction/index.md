---
layout: 'layouts/doc-post.njk'
title: アトリビューション レポートの概要 (コンバージョン測定)
subhead: Attribution Reporting API を理解するための概要と重要な概念。
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %}この API は提案であり、時間の経過とともに拡張されます。このブログ記事では、現在の状態について説明したものであり、API の進化に応じて更新されます。{% endAside %}

更新:

- 2021 年前半: 集計レポートとビュースルー測定が提案に追加されました。
- 2021 年前半: API は「Attribution Reporting API」に名前が変更されました。

{% Aside 'caution' %}

- この記事は広告のユース ケースに焦点を当てていますが、Attribution Reporting API は広告に関連しないユース ケースにも対応できます。
- この API の広告のユース ケースは、広告のクリックまたはビューをコンバージョンにリンクすることに重点を置いています (コンバージョン測定)。{% endAside %}

## はじめに

Attribution Reporting API を使用すると、**広告のクリックまたは表示**が、販売やサインアップなど、広告主サイトでの**コンバージョン**につながる時期を測定できます。API は、サイト全体で個々のユーザーを識別するのに使用できるサードパーティ Cookie やメカニズムに依存していません。

この提案はオープンにインキュベートされています。提案とディスカッションは、[WICGGitHub リポジトリにあります](https://github.com/WICG/conversion-measurement-api)。

{% Aside %}この API は、サードパーティ Cookie やその他のクロスサイト追跡メカニズムを使用せずにサードパーティのユース ケースを満たすための一連の提案「プライバシー サンドボックス」の一部です。詳細については、「[プライバシー サンドボックスの提案](https://developers.chrome.com/docs/privacy-sandbox)」を参照してください。{% endAside %}

## この API が必要なのはなぜか？

今日、広告コンバージョンの測定は、[サードパーティ Cookie](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies) に依存することがよくあります。ブラウザはサードパーティ Cookie へのアクセスを制限しています。これらは、サイト間でユーザーを追跡するために使用され、ユーザーのプライバシーに支障を与える可能性があるためです。この API は、サードパーティ Cookie を使用せずに、プライバシーを保護する形でこうした測定を可能にします。

## この API について知っておく必要があるのは誰ですか？

- [デマンドサイド プラットフォーム](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) や[データ管理プラットフォーム](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) などのアドテック プラットフォームは、この API を使用して、現在サードパーティ Cookie に依存している機能をサポートする場合があります。
- 広告またはコンバージョン測定にカスタム コードを使用している広告主およびサイト運営者は、この API を使用して既存の手法を置き換えることができます。
- コンバージョン測定にアドテック プラットフォームに依存している広告主とサイト運営者は、API を直接使用する必要はありませんが、API を統合する可能性のあるアドテック プラットフォームを使用している場合は、API を理解することに関心があるかもしれません。

## ChromeDevTools による API エラーのデバッグ

[Chrome93 から使用できます](/blog/new-in-devtools-93/#attribution-reporting)。Attribution Reporting API エラーは、[DevTools](/docs/devtools) の [[Issues] タブ](/docs/devtools/issues/)に報告されるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="[問題]タブのAttribution Reporting API エラー", width="800", height="501" %}

## 参加

{% Aside %}**あなたの参加が必要です！**この API は、さまざまな変換測定と最適化のユース ケースをサポートする必要がある場合があります。これらのユース ケースをサポートするソリューションがオープンに議論されるよう、エコシステムのインプットは欠かすことができません。 {% endAside %}

参加するには、ディスカッションに参加して API をお試しください。この両方を行っていただきたいところですが、ディスカッションには API を試したかどうかにかかわらずご参加いただけます。

### ディスカッションへの参加

- [隔週の会議に参加する](https://github.com/WICG/conversion-measurement-api/issues/80) (隔週)。こうしたコールにおいて、参加者は API 設計の提案に加え、API がさまざまな測定のユース ケースをどのようにサポートできるかについて話し合います。次の会議の議題には、いつでも[トピックを追加](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit)できます。[WICG に参加](https://www.w3.org/community/wicg/)している方なら、どなたでもディスカッションにご参加いただけます。
- [問題を開いて、](https://github.com/WICG/conversion-measurement-api/issues/new)質問したり、機能を提案したり、ユース ケースについて話し合ったりします。問題の定式化方法がわからない場合は、[こちらの課題](https://github.com/WICG/conversion-measurement-api/issues/147)や[こちらの課題](https://github.com/WICG/conversion-measurement-api/issues/68)などの例を参照してください。[また、既存の課題](https://github.com/WICG/conversion-measurement-api/issues)に関する会話に参加することもできます。

### API をお試しください

{% Aside 'caution' %}

Chrome で API を試している方は、**現在**実装されているすべての機能にアクセスできます。[リポジトリ](https://github.com/WICG/conversion-measurement-api/)と[会議](https://github.com/WICG/conversion-measurement-api/issues/80)で説明されているすべての機能が Chrome オリジン トライアルに実装されているわけではありません。 [Status](#status) で現在の機能ステータスを確認してください。実験に利用できる機能は、API によって最終的にサポートされる機能のサブセットでもあり、API がオープンにインキュベートされ、エコシステムのフィードバックが収集されるタイミングで変更される可能性があります。

{% endAside %}

#### ローカルまたはデモで実験する

1. API をブラウザ内でローカルで有効にするには、`#enable-experimental-web-platform-features` フラグを有効にします。 Chrome のフラグは、特定の実験的な機能を有効にすることをブラウザに指示するトグルです。そのフラグをオンにするには、Chrome の検索バーに `chrome://flags/#enable-experimental-web-platform-features` を貼り付けて、**有効にする**をクリックします。
2. [デモ](#demo)をローカルで実行します (または[ライブ デモ](#demo)をお試しください)。
3. [デモ コードをフォークして](#demo)カスタマイズするか、独自のデモを最初から作成します。

#### デプロイされたサイトでエンド ユーザーに対して試す

1. 使用できる場合は、[オリジン  トライアル](/blog/origin-trials/)に登録して、エンド ユーザーの API を有効にします。オリジン トライアルでは、実験的な機能にアクセスして、限られた時間で試すことができる機能を構築できます。[サードパーティのオリジン トライアル](/blog/third-party-origin-trials/)では、広告配信や測定プロバイダーなどのサードパーティのアクターが複数のサイトで API をテストできてしまうことに注意してください。**この API で現在利用可能なオリジン トライアルを確認するには、[ステータス](#status)にアクセスしてください**。今後のオリジン トライアルについては、 [開発者向けアトリビューション レポート メーリング リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)にご登録ください。

2. API をサイトやシステムに統合します。

{% Aside %}実装に関する質問は[、開発者向けアトリビューション レポート メーリング リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)にご登録してからお尋ねください。

ユース ケースについて、技術に関する一般的な質問がある場合は、[プライバシー サンドボックス開発サポート リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で課題を開くことを検討してください。 {% endAside %}

## デモ

お試しいただけるデモがいくつかあります。

- イベントレベルのレポート、クリックのみ:

    - [ライブ デモ](https://goo.gle/sppi-devrel-eventlevel)。
    - このデモの[ソース コード](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting)。必要に応じて[フォークしてカスタマイズできます。](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize)

## ユース ケースと機能

{% Aside %}

この API は開発中のものであり、エコシステムのフィードバックと入力に応じて進化していきます。

この API がサポートするすべての機能は提案です。**これらの提案については、ディスカッションを行うことができます。またフィードバックもお受けしています**。最初のブラウザ実装の準備ができているものもこれに含まれます。

この API は、オープンにインキュベートおよび開発されています。ディスカッションへの[参加をご検討ください。](#participate)

{% endAside %}

この API を使用するサイトは、次の場合にコンバージョンを測定できます。

- 広告の**クリック**と**表示**。
- サードパーティのアドテック プロバイダーを使用するパブリッシャー サイトの広告など、**サードパーティ**の iframe 内の広告。
- ソーシャル ネットワークや検索エンジンの検索結果ページに表示される広告や自社の広告を提供する出版社の広告など、**ファーストパーティ** コンテキストに表示される広告。

柔軟な**アトリビューション モデル**がサポートされています。詳細については、[ステータス](#status)をご覧ください。

この API は、広告主またはサードパーティのアドテック プロバイダーに送信できる 2 種類のレポートを介して、さまざまな種類のインサイトにアクセスできるようにします。これら 2 種類のレポートは、補助的なものとして同時に使用できます。

**イベントレベルのレポート**は、広告のクリックまたはビューを粗いコンバージョン データに関連付けます。

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",
  alt="イベントレベルのレポート", width="400", height="180" %}
  <figcaption>イベントレベルのレポートの例: <code>news.example</code> のクリック ID 200400600 (<code>news.example</code> のユーザー ID Bob_Doe に関連付けられている) が <code>shop.example</code> での購入につながっている。</figcaption>
</figure>

イベントレベルのレポートは、次の目的に適しています。

- **最適化**のユース ケース。*イベントレベルのレポートは、「投資収益率を向上させるにはどうすればよいですか？」*などの質問に答えるのに役立ちます。 特に、広告側の一意の ID をレポートで利用できるため、広告の配置を最適化するために使用できます。イベントレベルのレポートは、機械学習モデルのトレーニング データを提供できます。
- 変換に関する情報がほとんど必要ない**粗いレポート**のユース ケース。現在の制限は、クリックの場合は 3 ビットのコンバージョン データです。つまり、コンバージョンには 8 つのカテゴリのいずれかを割り当てることができます。またビューの場合は 1 ビットです。したがって、特定の価格やコンバージョン時間などの詳細なコンバージョン側データのエンコードは、イベントレベルのレポートではサポートされていません。
- **不正検出**のユース ケース。一部のレポートのデータは、スパムまたは無効なアクティビティを特定するために使用できるパターンを理解できるようにすることで、広告詐欺の検出と分析に役立つ場合があります。

一方で、**集計レポート**は、より詳細なコンバージョン データを提供し、クリック/ビュー データとコンバージョン データを結合するための柔軟性を高めます。

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="aggregate
  report", width="400", height="180"%}
  <figcaption>集計レポートのインサイトの例: <code>news.example</code> の CampaignID 1234567 により <code>shoes.example</code> で 518 件のコンバージョンが発生し、購入価格は合計 $38174 であった。また、コンバージョンの半数はアメリカのニューヨーク市のユーザーによるものであった。</figcaption>
</figure>

集計レポートは、ユース ケースの**報告**に最適です。*「投資収益率はどれくらいですか？」*などの質問に答えるのに役立ちます。 <br>**最適化**のユース ケースを対象に使用される集計レポート (たとえば、コンバージョン データが粗すぎるためにイベントレベルのレポートではサポートされていない購入額を最適化するため) は、現在研究が進められている領域です。[未解決の質問](#open-questions)を参照してください。

{% Details %} {% DetailsSummary 'h3' %}なぜ 2 種類のレポートが必要なのですか？ {% endDetailsSummary %}

イベントレベルのレポートは、ユーザーのプライバシーを保護するために、大まかなコンバージョン データのみを提供します。

ただし、この大まかなデータでは、キャンペーンの効果を測定するには不十分な場合があります。マーケターは、購入額、コンバージョンしたユーザーの広告主側の集計人口統計や購入した商品のカテゴリ、コンバージョンしたユーザーは初めての顧客なのか、定期的な顧客なのか、さらにはカートの内容など、コンバージョンに関する詳細を知る必要がある場合があります。

集計レポートが開発されたのは、これが理由です。 {% endDetails %}

この API で提案されているその他の機能は、 [アプリからウェブへのアトリビューション](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) (アプリで広告を表示またはクリックしてウェブで変換) と[クロスデバイス アトリビューション](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) (モバイルで広告を表示またはクリックしてデスクトップで変換) です。

{% Aside %}将来的に、サードパーティ Cookie がない場合、この API はエンドツーエンドのユース ケースをカバーするために、他のプライバシーが保護される広告の API と組み合わされます。

- リマーケティング: [FLEDGE](/docs/privacy-sandbox/fledge/) を参照
- インタレストベースの広告選択: [FLoC を参照](/docs/privacy-sandbox/floc/)

{% endAside %}

## 状態

**🕙最終更新日：2021 年 8 月**

ステータス:

- `🤿 Under exploration`: このアイデアはディスカッションの初期段階にあります。
- `🥚 Proposal`: 初期設計の準備が整い、公開されています。
- `🏗️ Under development (BROWSER_NAME)` ：この機能は BROWSER_NAME に実装されています。
- `🧪 実験 (BROWSER_NAME)`: 実験は BROWSER_NAME で利用できます。 Chromeでは、実験はオリジン トライアルと呼ばれます。
- `🚀 Stable (BROWSER_NAME)`: この機能はデフォルトで BROWSER_NAME に搭載されています。

{% Aside %} [現在のオリジン トライアル](/origintrials/#/view_trial/3411476717733150721) (Chrome 実験🧪){% endAside %}

{% Aside 'caution' %}複数のオリジン トライアル (実験) が実行されます。各ラウンドは、エコシステムのフィードバックに基づいて API を改善および調整するために使用されます。 {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">提案</th>
    <th style="text-align: left;">状態</th>
</tr></thead>
<tbody>
    <tr>
    <td>クリックのイベントレベルのレポート<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">説明</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>ビューのイベントレベルのレポート<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">説明</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>クリックとビューのレポートを集約<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">説明</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>変換ジャーニー: クロスデバイス <br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">説明</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>変換ジャーニー: アプリから Web<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">説明</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>アトリビューション モデル: ラスト クリック<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">説明</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>アトリビューション モデル: 優先度ベース<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">説明</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>アトリビューション モデル: 柔軟</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %} {% DetailsSummary 'h3' %}アトリビューション モデルについて{% endDetailsSummary %}

優先度ベースのモデルを使用すると、ブラウザは優先度を各アトリビューション ソースに関連付けることができます。これは次の目的で使用できます。

- コンバージョンの理由として最も可能性が高いのはクリックとビューのどちらなのかを判断します (クリックは通常、ユーザーの関心をより直接的に示すものと見なされます)。
- `attributionsourcepriority`を時間に相対するように設定し、**ファーストタッチ** **アトリビューション** モデルを設定します。
- 優先度をランダムに均一に選択することにより、(確率的に) **線形アトリビューション**モデルを設定します。

他のアトリビューションモデルは、将来的にサポートされる可能性があります。集計レポートでは、 [ワークレットベースのスキーム](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)により、以前の複数のアトリビューション ソースに部分的なクレジットを指定するなど、より柔軟なアトリビューション オプションを使用できる可能性があります。

{% endDetails %}

## ブラウザのサポート

- Firefox と Edge[はシグナルを共有していません](https://chromestatus.com/feature/6412002824028160)。
- Safari / Webkit では[サポートされておらず](https://chromestatus.com/feature/6412002824028160)、[Private Click Measurement (プライベート クリック測定)](https://developer.apple.com/videos/play/wwdc2021/10033/)と呼ばれる広告コンバージョンを測定する別の API が提案されています。

2 つの API は異なりますが、Chrome と WebKit は、属性名、および[レポートに使う JSON 構造](https://github.com/privacycg/private-click-measurement/issues/30)を合わせるなどして、開発者のエクスペリエンスを簡素化できるよう、オープンに連携しています。

{% Details %} {% DetailsSummary 'h3' %} Chrome が提案する API と WebKit が提案する API の相違点。{% endDetailsSummary %} Chrome が提案する Attribution Reporting API の機能セットは、Safari/WebKit が提案する Private Click Measurement API の機能セットとは異なります。最も注目すべきは、Chrome によって提案された Attribution Reporting API です。

- ビュースルー測定がサポートされている。
- イベントレベルのレポートを提供できる。
- ファーストパーティのコンテキストに表示される広告リンク (ソーシャル ネットワークや検索エンジンの結果ページに表示される広告、または自社の広告を配信するパブリッシャーなど) **および** サードパーティの iframe に表示される広告リンク (サードパーティのアドテック プロバイダーを使用するパブリッシャー サイトに表示される広告など) がサポートされている。
- アドテック プラットフォームなどのサードパーティは、サイト運営者や広告主に代わってレポートを受け取ることができます。

{% endDetails %}

## 使い方

### イベントレベルのレポート

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",
  alt="イベントレベルのレポート", width="800", height="521" %}
  <figcaption>イベントレベルのレポートは次のように生成されます。ブラウザは、クリックまたはビュー(「アトリビューション ソース イベント」)をアドテックによって定義されたコンバージョン データ (「アトリビューション トリガー データ」) と照合します。その後、ブラウザーは結果のレポートを事前定義されたエンドポイントに送信しますが、遅延とノイズが発生します。</figcaption>
</figure>

{% Details %} {% DetailsSummary 'h3' %} 詳細な仕組み: イベントレベルのレポート{% endDetailsSummary %}広告リンクは、広告コンバージョンに固有の属性を使用して構成できます。

- クリック ID やキャンペーン ID など、サイト運営者側の広告クリック (またはビュー) に添付するカスタムデータ。
- この広告のコンバージョンが見込まれるサイト。
- 変換が成功したことを通知する必要がある、つまりレポートを受信する必要があるレポート エンドポイント。
- この広告でコンバージョンをカウントできなくなった場合の締め切り日。

また、[`window.open()`によって開始された](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations)ナビゲーションのアトリビューション ソースを登録できます。またビューの場合は [JavaScript API](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript) を使って登録できます。

ユーザーが特別に構成された広告をクリックまたは表示すると、ユーザーのローカル デバイス上のブラウザーは、指定されたアトリビューション構成データとともにこのイベントを記録します。

その後、ユーザーは広告主の Web サイトにアクセスし、広告主またはそのアドテックプロバイダーが購入などのコンバージョンとして分類するアクションを実行します。これが発生すると、広告主またはアドテック プロバイダーがアトリビューションをトリガーします。特定の値の `trigger-data` を使用してコンバージョンを記録するようブラウザーに要求し、広告のクリック (または表示) とコンバージョン イベントがユーザーのブラウザーによって照合されます。

ブラウザーは最終的に、広告側で指定されたエンドポイントに送信されるレポートをスケジュールします。このレポートには次のものが含まれます。

- このコンバージョンにつながった広告クリックまたはビューに添付された広告側カスタムデータ。
- ノイズのあるコンバージョン側カスタム データ。

特定の広告クリック (または表示) に対して複数のコンバージョンが登録されている場合は、対応するレポートが送信されるようにスケジュールされます。表示の場合は 1 つのレポートを、クリックの場合は最大 3 つのレポートを送信できます。

レポートは、コンバージョンの数日後、または場合によっては数週間後にブラウザから送信されます。

{% endDetails %}

### 集計レポート


<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png",
alt="ALT_TEXT_HERE", width="800", height="1140" %}
<figcaption>集計レポートは次のように生成されます。ブラウザーは、詳細なクリックまたは表示 (「アトリビューション ソース イベント」) を、アドテックによって定義された詳細なコンバージョンデータ (「アトリビューション トリガー データ」) と照合します。 アドテックで定義されたコードは、ワークレットで実行され、集計レポートの計算に使用するためにブラウザーによって送信されるコントリビューションを定義します。集約サービスは、アドテックの集約レポートを非公開で計算する役割を果たします。</figcaption>
</figure>

{% Details %} {% DetailsSummary 'h3' %} 詳細な仕組み: レポートの集計{% endDetailsSummary %}

広告リンクは、広告コンバージョンに固有の属性を使用して構成できます。

ユーザーが特別に構成された広告をクリックまたは表示すると、ユーザーのローカルデバイス上のブラウザーは、指定されたアトリビューション構成データとともにこのイベントを記録します。

次に、アドテックで定義されたコードがワークレット内で実行され、コントリビューション、つまり広告側と変換側のデータの結合が定義されます。

これらのコントリビューション (生のレポート) は暗号化された状態でアドテック サーバーに送信されてから、集計レポートを[公開せずに](#privacy)計算する集計サービスに送信されます。

集計レポートは、イベントレベルのレポートほどは遅延しないことに注意してください。

{% endDetails %}

## プライバシー

### 概要

ボブという人を例に挙げます。 ボブは、`news.com` のニュースを読んでいるときに広告を見ました。1 週間後、ボブは `shoes.example` で靴を購入します。

現在、このコンバージョンは、**クロスサイト識別子**として使用されるサードパーティの Cookie によって追跡されます。サードパーティの Cookie を使用すると、アドテック企業は `news.example`**および**`shoes.example` におけるボブの行動を詳しく確認することにより、これらの情報をまとめ、ボブの詳しいプロフィールを確立できます。アドテック企業は、ボブの居場所や閲覧に関する習慣、`news.com`における好みの読み物に加え、`shoes.com` における購入、活動、およびクレジットカード情報までを知ることができるようになります。このクロスサイトジョイントは、広告のコンバージョンを測定するのに役立ちます。しかし、ボブの活動は、複数のサイトに渡って詳しく追跡されるため、ユーザーのプライバシーに影響すると言えます。

一方、Attribution Reporting API を使用すると、広告会社は**個人のアクティビティを複数のサイトに渡って追跡しなくても**、コンバージョンに関するインサイトを得ることができます。コンバージョンを測定するのに十分な少量の情報が複数のサイト間で結合されますが、複数のサイトにおけるボブの活動を詳しく追跡できるだけの情報は結合されません。`news.example` と `shoes.example` におけるボブの行動は別ものとして扱われます。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="図: 今日のWeb (結合された ID) と明日の Web (パーティション化された ID) を横に並べたビュー", width="800", height="314" %}

### 詳細

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png",
  alt="ALT_TEXT_HERE", width="800", height="1237" %}
  <figcaption>サードパーティ Cookie とは異なり、Attribution Reporting API は、サイトごとの ID パーティショニングを維持するために、クロスサイト識別子なしでインサイトを提供します。<br>イベントレベルのレポートは、広告側の識別子と少量のコンバージョン側のデータのみをリンクします。そのため、コンバージョンに関するクロスサイト情報は提供されますが、コンバージョン側の情報は粗すぎるため、サイト間でユーザー ID を結合することはできません。<br>集計レポートは詳細なインサイトを提供しますが、集計レベルでのみ提供されます。差分プライバシー技術、プライベート計算、および暗号化が使用されているため、集計レポートを使用して個々のユーザーのアクティビティを複数のサイトに渡って追跡することはできません。<br>レート制限をはじめとする追加のプライバシー保護は、イベントレベルのレポートと集計レポートの両方に課せられます。</figcaption>
</figure>

{% Details %} {% DetailsSummary 'h3' %}詳細: イベントレベルのレポートとプライバシー{% endDetailsSummary %}

イベントレベルのレポートは、次のプライバシー メカニズムに従うことにより、サイト間でユーザーを追跡することなく、コンバージョンのインサイトを提供します。

- クロスサイト識別子は使用されないため、詳細なクロスサイトブラウジングアクティビティがデバイスから取得されることはありません。イベントレベルのレポートは、広告側 (`news.example` の 64 ビットの情報をコンバージョン側 (`shop.example`) の 1 ビットまたは 3 ビットのみに関連付けます。64 ビットは**、個々のユーザー ID にマップするのに十分な情報ですが、こうした 64 ビットは**、非常にわずかなクロスサイト情報にしかリンクできまん。1 ビットも 3 ビットも、識別子を保持するには不十分です。注: 広告側の 64 ビットは新しい情報ではありません。ユーザー ID は、現在、広告側ですでに利用可能になっています。`news.example` または `adtech.example` では、すでに `news.example` における特定のユーザーの活動がすでに把握されています `news.example` 。

- 悪用やクロスサイト追跡を防ぐために、追加の保護が適用されます。

    - **レポートは遅延して**送信されます。
    - コンバージョンデータには**ノイズがあり**ます。一定の割合 Chromeでは5%) で、実際のコンバージョンデータはランダムな値に置き換えられます。
    - 属性付きコンバージョンレポートの数は、クリックまたはビューごとに制限されています。

{% Aside %} 実際のコンバージョン数は、プライバシーが保護される方法で回復することが可能です。 [サンプル スクリプト](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py)を参照してください。{% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}詳細：集計レポートとプライバシー{% endDetailsSummary %}

集計レポートは、詳細なクリックまたは表示イベントを詳細なコンバージョン データに関連付けます。ただし、次のプライバシー メカニズムに従うことで、サイト間でユーザーを追跡せずにコンバージョンのインサイトを提供します。

- クロスサイト識別子は使用しない。

- 各アトリビューションは、結果の集計レポートに複数の貢献をすることができ、特定のユーザーは、特定のクリック (または表示) およびコンバージョンに対して複数のアトリビューションをトリガーできます。ただし、ユーザーが特定の時間枠内に行える貢献には限りがあります。

- データは多くのイベント (多くのユーザー) のレベルまで集約され、個々のイベントを正確に観察することはできません。[差分プライバシー](https://en.wikipedia.org/wiki/Differential_privacy)は、サイト間でユーザー ID をリンクするために出力データを使用できないようにするために使用されます。集約データにドリルダウンすると、詳細レベルが上がると、そのデータの相対ノイズも増えます。これにより、相対誤差が大きくなり、個々のイベント (またはユーザー) を正確に監視できないようになります。一方、多くのイベントとユーザーを集約するデータのスライスは、有用性を維持するためにより正確です。

- 詳細なクリックまたは表示イベントを詳細なコンバージョンデータに関連付ける生のレポートは暗号化されており、アドテック企業は読み取ることができません。集計データは、信頼できるサーバーを介してプライベートな方法でこれらのレポートから計算されます。いくつかの計算オプションが検討されています。

    - 安全なマルチパーティ計算 (MPC)。信頼は複数のサーバーに分散されます。各サーバーは、それ自体では意味のないデータのスライスを 1 つ取得します。各ヘルパーが計算を実行すると、これらのヘルパーからの出力が組み合わされて、意味のある全体が形成されます。
    - 単一サーバーの計算。 1 つのヘルパー サーバーが出力を計算します。このオプションは安全性が低く、プライベート性も低くなります。ただし、設定は簡単です。つまり、より多様なエコシステム アクターがこの API を試して、フィードバックを提供できるようになります。**このオプションは、長期的な解決策を意図したものではありません**。十分な通知と移行時間があれば、エコシステム フィードバックが統合され、このAPIが成熟するにつれて非推奨になり、より安全なアプローチである MPC または安全な単一サーバーが優先されます。
    - 安全な単一サーバーの計算。単一のサーバーですが、MPC と同様の (ただし同等ではない) 秘密のコンピューティング プロパティを備えています。
    - 長期的には、サーバーは安全なマルチパーティ計算 (安全な単一サーバーまたは安全なマルチパーティ) でデータを排他的に処理する必要があります。

- 悪用やクロスサイト追跡を防ぐために、追加の保護が適用されます。

    - レポートはランダム遅延により送信されます。
    - データのさまざまなスライスに対するクエリはレート制限されています。

{% endDetails %}

## サイトとユーザーの管理

- `chrome://settings/privacySandbox`のユーザー設定よりオプトアウトできます。
- デフォルトとして、この機能はトップレベルのコンテキストで有効になっています。 Attribution Reporting API は、[アクセス許可ポリシー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)によって子 iframe で有効にされている必要があるため、どのサードパーティでもパブリッシャーに内緒で API を使用できるということはありません。

## 未解決の質問

多くの質問は未解決のままであり、API がオープンにインキュベートされるときに解決されます。ディスカッションにぜひ[ご参加ください](#participate)。特に、以下のようなディスカッションへの参加をお待ちしています。

- プライバシーと有用性を維持するにはどの程度のノイズが適量とされていますか？
- カスタム アトリビューション モデルをサポートするにはどうすればよいですか？
- 購入額など、特定のレベルの詳細が含まれたコンバージョン側データを最適化するにはどうすればよいですか？
- 信頼できるサーバーとはどんなものか？評価中の解決策の 1 つに、定期的なオープンソースの監査があります。[ディスカッションに参加する](https://github.com/WICG/conversion-measurement-api/issues/116)。
- より多くのレポートエンドポイントへの委任をサポートするなど、レポートの柔軟性を高めるるにはどうすればよいですか？[ディスカッションに参加する](https://github.com/WICG/conversion-measurement-api/issues/96)。
- 詐欺を防ぐ方法とは (匿名のクレデンシャルを使用した認証など)？ [ディスカッションに参加する](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth)。
- 広告以外のユース ケースにこの API を使用することを検討している場合は、何が欠けているのでしょうか？どうすれば API を改善できるのでしょうか？[課題を開く](https://github.com/WICG/conversion-measurement-api/issues)
- 実装者はどのようにしてプライバシー設定をカスタマイズできますか？[ディスカッションに参加してください](https://github.com/WICG/conversion-measurement-api/issues/99)。

{% Aside %} この API は、**プライバシーと有用性**を実現するために、複数のプライバシー技術を組み合わせています。これは、この API で使用される 3 ビット (表示の場合は 1 ビット) のデータ制限およびその他のプライバシー メカニズムが目的を達成するための手段であることを意味します。それらは変更される可能性があります。アドテック企業が強力なプライバシー保証を達成しながら、ユース ケースに役立つデータを取得する方法があるとすれば、この API はそれに応じて進化していくでしょう。{% endAside %}

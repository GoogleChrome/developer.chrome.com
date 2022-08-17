---
layout: layouts/doc-post.njk
title: フィードバック
subhead: >
  開発者のみなさんがプライバシー サンドボックスの提案に対してフィードバックを送る場所と方法をご紹介します。
description: >
  開発者のみなさんがプライバシー サンドボックスの提案に対してフィードバックを送る場所と方法をご紹介します。
date: 2022-02-28
updated: 2022-05-17
authors:
  - rowan_m
---

フィードバック
開発者のみなさんがプライバシーサンドボックスの提案に対してフィードバックを送る場所と方法をご紹介します。
プライバシー サンドボックスでは、ウェブ
エコシステム全体の多様な関係者からフィードバックを得ることが必要不可欠です。ここでは、開発の情報を提供するさまざまな公開チャネルについて説明し、個人または組織が開発の各段階でフィードバックを提供するための方法をご案内します。こうしたフィードバックには、Chrome
のプロダクト
マネージャーとエンジニアが積極的に対処します。すでに数百名の業界代表者からご協力をいただいています。

さまざまなフィードバック
チャネルをご利用になれます。個々のやり取りは多くの場合一般公開されるので、ディスカッションの進行を追いかけ、どこで開発に貢献するかを決めることができます。**[フィードバック
フォーム](#feedback-form)** もご利用いただけます。フォームを使用すると、関係者は公開フォーラムの外で
Chrome
チームと直接フィードバックを共有する機会を得られます。フィードバック
フォーム経由で届いたフィードバックは、属性情報なしで Chrome
チームの公開レポートに含まれるものとして集計される場合があります。

## フィードバックが検討されたことを確認するにはどうすればよいでしょうか。 {: #reports}

個々の Privacy Sandbox API
に関する最新情報は、定期的にこのサイトで公開されています。特に、この最新情報では、API
固有の一般的なフィードバック テーマの概要を紹介します。

 * [フィードバックレポート - 2022 年第 1 四半
   期](/docs/privacy-sandbox/feedback/report-2022-q1/)

基本的に公開のフィードバック
チャネルを推奨しますが、公開チャネル（GitHub など）とダイレクト
チャネル（フィードバック フォームなど）の両方が利用可能です。Chrome
チームは、関係者から得られたフィードバックと関心が各 API
の設計と開発に反映されるかどうか、またどのように反映されるかを説明します。

## フィードバックのルート

{% Details %} {% DetailsSummary %}

### 個々の提案に共同で取り組む {: #proposal-feedback}

**_プライバシー サンドボックスに関する提案はすべて公開されてディスカッションの対象となります。提案の作成者とウェブの関係者は、協力して未解決の質問に回答し、機能が確定される前に実装の詳細を明確化します。_**

{% endDetailsSummary %}

提案は Explainer から始まります。Explainer
とは、提案する仕様の機能の大まかな技術概要です。未解決の質問と明確化が必要な詳細情報は常に存在するので、Explainer
が投稿されてフィードバック
プロセスが開始されます。この共同作業プロセスは、提案のライフサイクルを通じて進行します。これは、アイデアの初期のディスカッションで始まり、正式な仕様の改訂の反復で終わります。

{% Aside %}

このような大まかな概要と未解決の質問のパターンについては、[Topics API
の Explainer](https://github.com/jkarlin/topics)
をご覧ください。

{% endAside %}

Explainer と補足コンテンツは GitHub でホストされます。GitHub
では、GitHub
アカウントを持っている方はどなたでも、リポジトリ（repo）で問題を報告（質問を投稿またはコメントを追加）して、ディスカッションを開始するかディスカッションに参加することができます。提案の作成者（Chrome
プロダクト
マネージャーとエンジニアを含む）は積極的にディスカッションに参加します。GitHub
には、新しいアクティビティのアラートを受け取るオプションがあります。GitHub
のフィードバックについては、特定の提案に関心を持つコミュニティと直接交流できます。GitHub
アカウントを持っていなくても、個々の提案に関するコミュニティのコメントをすべて閲覧できます。

リポジトリにおけるディスカッションでは、提案の中で解決すべきものとされているユースケースになぜ対処するのか、またどのように対処するかに焦点を絞る必要があります。個々の提案に関する問題を閲覧および報告するためのリンクは、[**提案**セクション](#proposals)の表の**フィードバック**の列にあります。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Chromium 機能の開発を追跡して対応する

**_機能開発の各段階はすべて公開メーリング
リストで発表されます。これにより、技術実装に関するディスカッションがさらに促進されます。_**

{% endDetailsSummary %}

各提案の結果として、Chromium に 1
つ以上の機能が組み込まれる可能性があります。提案したデベロッパーは、[一般公開されている
`blink-dev` メーリング
リスト](https://groups.google.com/a/chromium.org/g/blink-dev)で、機能開発の各段階を開始するリクエストを送信します。[各段階には、](https://blog.chromium.org/2019/11/intent-to-explain-demystifying-blink.html)Intent
to Prototype（I2P）、Intent to Experiment（I2E）、Intent to
Ship（I2S）、Intent to Remove（I2R）があります。

* **Intent to Prototype（I2P）:** デベロッパーは、Chromium の最初の実装を開始したいと考えています。これにより、デベロッパー
    テストで初期の機能をテストできる機会が増えます。ほとんどの場合、この段階での目的は提案されたアイデアを開発中のコードで検証することなので、この段階で役立つフィードバックは
    GitHub に投稿することが適切です。
* **Intent to Experiment（I2E）:** デベロッパーは、広範囲を対象としてテストをオリジン
    トライアルの形で実施したいと考えています。これにより、デベロッパーのサイトでデベロッパー自身のトラフィックの一部を使用して初期の機能をテストできます。この段階で役立つフィードバックとしては、テストへの参加希望の表明や、提案されたテストが動作の検証のニーズを満たしているかどうかなどがあります。
* **Intent to Ship（I2S）**: デベロッパーは、完全な機能を Chromium
    にデプロイしたいと考えています。これにより、すべてのユーザーが機能を利用できるようになります。この段階で役立つフィードバックは、未解決だった問題が解決されて機能を一般提供する準備ができたという確認です。
* **Intent to Remove（I2R）**: デベロッパーは、機能を非推奨にして Chromium
    から削除したいと考えています。この段階で役立つフィードバックとしては、この削除によって開発チームが把握していない影響がユースケースに及ぶかどうかの確認などがあります。

各段階には標準テンプレートがあり、デベロッパーはそれを通して関連性の高い情報を厳選して提供します。段階によっては、Chromium
プロジェクト オーナーの承認が必要です。オーナーは、投稿に「Looks Good To
Me」（LGTM）と回答することにより承認を行います。

メーリング
リストは一般公開されているので、どなたでも各マイルストーンでディスカッションを追いかけたり、メーリング
リストに参加して質問を追加したりすることができます。このメーリング
リストは Chromium
プロジェクトで扱われるすべての機能をカバーしているため、そこでは広範なアクティビティが行われています。[Chrome
ステータスで個々の機能の進捗状況](https://chromestatus.com/features)をご覧ください。

メーリング リストのスレッドでは、Chromium
における特定の機能の実装の詳細に焦点を絞ってディスカッションする必要があります。提案自体の有効性に関するディスカッションは、[GitHub
で行うことが適切](#proposal-feedback)です。個々のお知らせを閲覧してコメントを投稿するためのリンクは、[**提案**セクション](#proposals)の表の**インテント**の列にあります。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### 個々の機能開発を追跡してディスカッションする

**_特定の提案に焦点を絞ったディスカッションを行うため、提案の実装の進捗に応じて特定のメーリング
リストが作成されることがあります。_**

{% endDetailsSummary %}

個々の提案の Chromium
への実装が進むにつれて、特定の提案に焦点を絞ったディスカッションを行うため、提案固有のメーリング
リストが作成されることがあります。

それにより、オリジン
トライアルの最新情報、必要なコードの更新、開発に影響する可能性がある既知の問題などに関する通知とディスカッションが可能になります。そのようなメーリング
リストは、`blink-dev`
と同様に一般公開されます。提案を直接追跡している場合や提案に取り組んでいる場合は、提案固有のメーリング
リストに参加して、開発チームから最新情報を直接入手する必要があります。

これらのメーリング リストのスレッドでは、Chromium
における進行中の実装の詳細に焦点を絞ってディスカッションする必要があります。メーリング
リストの対象読者はお知らせ全般に興味がある一般ユーザーではなく、特定の機能のコードを作成するデベロッパーであるからです。メーリング
リストで閲覧と投稿を行うためのリンクは、[**提案**セクション](#proposals)の表の**メーリング
リスト**の列にあります。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### 機能に関する問題を報告および追跡する

**_実装の進行に伴い、機能の動作に関する問題が発生した場合、Chromium の
Issue Tracker に報告することができます。_**

{% endDetailsSummary %}

報告できる問題には、Chromium
の動作が提案された仕様と一致しない実装バグのほかに、ブラウザ固有の機能（提案された機能が
DevTools
やユーザー設定とどのように相互作用するかなど）に関する問題や、単にエラーを報告するだけのものもあります。デベロッパー
テスト用に新しく追加された試験運用機能の問題であれ、安定版リリースで検出された問題であれ、問題は
Chromium 機能のライフサイクルのどの時点でも報告できます。

Chromium の問題については、Chromium
の想定される機能実装の詳細に焦点を絞ってディスカッションする必要があります。提案自体の有効性に関するディスカッションは、[GitHub
で行うことが適切](#proposal-feedback)です。問題を閲覧または報告するためのリンクは、[**提案**セクション](#proposals)の表の
**Chromium コンポーネント**の列にあります。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### 標準化団体をフォローして参加する

**_[ワールドワイド ウェブ
コンソーシアム（W3C）](https://www.w3.org/)と[インターネット技術特別調査委員会（IETF）](https://www.ietf.org/)は、すべてのウェブ
プラットフォーム向けのオープン標準を開発しています。それらの団体は、関係者が個々の基準と大規模なウェブ
エコシステムについて議論し、知識を深めることを奨励しています。_**

{% endDetailsSummary %}

W3C と IETF
は、ウェブとインターネットのためのオープン標準を開発し、オープン
プラットフォームの長期的な成長を促進する国際団体です。それらの標準化団体のさまざまなフォーラムでは、プライバシー
サンドボックス技術のような新しいウェブ
プラットフォーム技術が提案され、議論されています。フォーラムは、技術の設計と開発に積極的に参加することを希望するすべての人々に開放されています。

各標準化団体は、あらゆる関係者に対してさまざまなメンバーシップと貢献方法を提供しています。たとえば、ウェブ
エコシステムと関連業界の人々が参加しているコミュニティ
グループとビジネス
グループがあります。提案の作成者は、しばしば関連する会議で概要と進捗状況に関する最新情報を紹介し、参加者が直接質問したり他の関係者から話を聞いたりする機会を設けています。ほとんどのグループの議事録は一般公開されています。
標準化団体での議論は広範囲にわたりますが、一般的には、提案がエコシステムのニーズを満たす方法と、提案が標準として承認されるまでの進捗状況に焦点を絞っています。標準化団体をフォローするかそれらに参加するためのリンクは、[**提案**セクション](#proposals)の表の**標準化団体**の列にあります。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### フィードバック フォームを使ってフィードバックを送信する {: #feedback-form}

**_すべての問題が上記のカテゴリに分類されるわけではありません。これらのルートは、最も関連性の高い相手と公開のディスカッションを開始する最良の方法ですが、フィードバック
フォームを使用して、いつでも Chrome
チームに直接問い合わせることができます。_**

{% endDetailsSummary %}

以下の点をお知りになりたい場合は、このフォームをご使用ください。

* 複数の提案によって特定の状況にどのような影響があるか。

* ユースケースが提案の対象となるかどうか。

このフォームによって、関係者は Chrome
チームとフィードバックを直接共有できますが、フィードバックのテーマや問題は、関連付けなしで
Chrome チームの公開レポートに含められる場合があります。

{% endDetails %}

{% Aside %}

[**フィードバック
フォームを使ってフィードバックをお送りいただけます**](https://goo.gle/privacy-sandbox-feedback-ja)。

{% endAside %}

## 提案

### キー

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td>個別の提案に関する進行中のディスカッション</td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td>Chromium 機能開発の各段階におけるお知らせメッセージ</td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td>Chromium 機能の実装に関連する未解決の問題</td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>開発中の Chromium 機能に関するデベロッパー向けのお知らせとディスカッション</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td>個別の提案についてディスカッションを行っている W3C または IETF のグループ</td>
  </tr>
</table>

### ウェブ上のスパムと不正行為の防止

#### Trust Token API

_トラスト トークンを使用すると、クロスサイト
トラッキングを許可しなくても、サイトは少量の情報（ユーザーが正当であることを示す情報など）を他のサイトと共有できます。[Trust
Token API
の詳細](/docs/privacy-sandbox/trust-tokens/)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/WICG/trust-token-api/issues">WICG/trust-token-api</a>
   </td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/fpfbKgJF8Vc/">I2E 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/">I2E 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/_Ayi6SD8yRs/">I2E 2021/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/UIvia1WwIhk/">I2E 2020/05</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/X9sF2uLe9rA/">I2P 2019/10</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ETrustTokens">Internals > Network > TrustTokens</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://datatracker.ietf.org/rg/pearg/about/">Privacy Enhancements and Assessments Research Group (pearg)</a></td>
  </tr>
</table>

### 関連性の高いコンテンツと広告の表示

#### Topics API

_トピックを使用すると、ユーザーがアクセスしたサイトのトラッキングに頼らなくても、インタレスト
ベースの広告を表示できます。[Topics API
の詳細](/docs/privacy-sandbox/topics/)をご覧ください。_

**_最終更新日: 2022 年 3 月 - Topics API はオリジン
トライアルに向けて準備中です_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/jkarlin/topics/issues">jkarlin/topics</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/59uTw_dxM3M/">I2P 2022/02</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td>[更新される予定です]</td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/topics-api-announce/">topics-api-announce</a>
   </td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

#### FLoC API

_FLoC
は、閲覧履歴が類似する数千のユーザーをコホートにグループ化することで、ユーザーの興味
/ 関心を大まかに把握する機能を提供していました。[FLoC
の詳細](/docs/privacy-sandbox/floc/)をご覧ください。_

**_最終更新日: 2022 年 2 月 - FLoC は Topics API
に置き換えられました。リンクは過去の情報の参照用です_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/WICG/floc/issues">WICG/floc</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs/">I2E 2021/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/DpZZG5K1PWs/">I2P 2020/05</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestCohort">Blink > InterestCohort</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

#### FLEDGE API

_FLEDGE を使用すると、リマーケティングとカスタム
オーディエンスのユースケースに対応できます。たとえば、広告で個別の識別子に依存することなく、ユーザーが以前アクセスしたサイトまたは商品の情報を利用できます。[FLEDGE
の詳細](/docs/privacy-sandbox/fledge/)をご覧ください。_

**_最終更新日: 2022 年 3 月 - FLEDGE API はオリジン
トライアルに向けて準備中です_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/WICG/turtledove/issues">WICG/turtledove</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/">I2P 2021/03</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups">Blink > InterestGroups</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/fledge-api-announce">fledge-api-announce</a></td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

### デジタル広告の測定

#### Attribution Reporting API のイベントレベルのレポート

_イベントレベルのレポートを使用することで、クロスサイト識別子を使用せずに、広告のクリックや閲覧などのユーザー
アクションがいつコンバージョンにつながったかをサイトで測定できます。[Attribution
Reporting API
の詳細](/docs/privacy-sandbox/attribution-reporting/)をご覧ください。_

**_最終更新日: 2022 年 3 月 - Attribution Reporting API は追加のオリジン
トライアルに向けて準備中です_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/WICG/conversion-measurement-api/issues">WICG/conversion-measurement-api</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/DdjaFmsb4fA/">I2E 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/DmsUL3KHqMk/">I2E 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/xCWP1ltlAgw/">I2E 2021/07</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/C0P7ePjITJQ/">I2E 2021/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/Ib9-tDFitns/">I2E 2020/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/7B0ldtZR_68/">I2P 2019/10</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3EConversionMeasurement">Internals > ConversionMeasurement</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev">attribution-reporting-api-dev</a></td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

#### Attribution Reporting API の要約レポート

_要約レポートは詳細なコンバージョン
データを集約して確認するのに有用です。データ内の個別のユーザーを特定することなく、レポートに含めたい重要な情報を保持できます。[Attribution
Reporting API
の詳細](/docs/privacy-sandbox/attribution-reporting/)をご覧ください。_

**_最終更新日: 2022 年 3 月 - Attribution Reporting API は追加のオリジン
トライアルに向けて準備中です_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/WICG/conversion-measurement-api/issues">WICG/conversion-measurement-api</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/2zA5-TuVSkA/">I2P 2021/08</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3EConversionMeasurement">Internals > ConversionMeasurement</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev">attribution-reporting-api-dev</a></td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

### クロスサイトのプライバシー境界の強化

#### First-Party Sets API

_ファーストパーティ
セットを使用すると、同じ組織が所有および運営する関連サイトを、同じファーストパーティに属するものとして宣言できます。[ファーストパーティ
セットの詳細](/docs/privacy-sandbox/first-party-sets/)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/privacycg/first-party-sets/issues">privacycg/first-party-sets</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/nNdY-qOScBc/">I2E 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/XkWbQKrBzMg/">I2E 2021/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-unZxHbw8Pc/">I2P 2021/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0EMGi-xbI-8/">I2P 2020/08</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3EFirst-Party-Sets">Internals > Network > First-Party-Sets</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/groups/cg/privacycg">Privacy Community Group</a></td>
  </tr>
</table>

#### Shared Storage API

_共有ストレージを使用すると、サイトはパーティショニングされていないクロスサイト
データを保存し、特別に制御された方法でのみそのデータを読み取るようになります。これにより、サイト間で一貫した
A/B
テストを実施するなど、いくつかのユースケースに対応できます。[Shared
Storage API
の詳細](https://github.com/pythagoraskitty/shared-storage/)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/pythagoraskitty/shared-storage/issues">pythagoraskitty/shared-storage</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/_quChIvPzT8/">I2P 2021/06</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EStorage%3ESharedStorage">Blink > Storage > SharedStorage</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

#### Cookies Having Independent Partitioned State（CHIPS）

_CHIPS では、トップレベル サイトごとに個別の Cookie
の格納場所を使用して、Cookie
を「パーティショニングされた」ストレージに取り込むことができます。[CHIPS
の詳細](/docs/privacy-sandbox/chips/)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/WICG/CHIPS/issues">WICG/CHIPS</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/_dJFNJpf91U/">I2E2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/hvMJ33kqHRo/">I2P 07/2021</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ECookies">Internals > Network > Cookies</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/wicg/">Web Platform Incubator Community Group (WICG)</a></td>
  </tr>
</table>

#### ストレージのパーティショニング

_ストレージのパーティショニングを使用すると、トップレベル サイトごとにデータを保管できるようにストレージ用の個別のコンテナを作成して、他の既存の保管方法と通信方法を、提案されている
Cookie の変更に合わせることができます。[ストレージのパーティショニングの詳細](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/wanderview/quota-storage-partitioning/issues">wanderview/quota-storage-partitioning</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/WXNzM0WiQ-s/">I2P 2021/05</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EStorage">Blink > Storage</a></td>
  </tr>
  <tr>
   <td><strong>Mメーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/groups/cg/privacycg">Privacy Community Group</a></td>
  </tr>
</table>

#### HTTP キャッシュ パーティショニング

_これまで HTTP
キャッシュは、あるサイトでリソースが別のサイトを読み込んだかどうかを判断できる単一のポイントとして機能していましたが、事実上、クロスサイト情報の漏洩の原因になっていました。キャッシュをパーティショニングすることで、アクティビティを単一のサイトに制限できます。[HTTP
キャッシュ
パーティショニングの詳細](https://developers.google.com/web/updates/2020/10/http-cache-partitioning)をご覧ください。_

**_最終更新日: 2022 年 2 月 - HTTP キャッシュ
パーティショニングは完全リリースされました_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/shivanigithub/http-cache-partitioning/issues">shivanigithub/http-cache-partitioning</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/NUR-gpWxSZ4/">I2S 2020/10</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/6KKXv1PqPZ0/">I2P 2019/07</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ECache">Internals > Network > Cache</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://whatwg.org/">Web Hypertext Application Technology Working Group (WHATWG)</a></td>
  </tr>
</table>

#### ネットワーク状態のパーティショニング

_ネットワーク状態のパーティショニングは、キャッシュ用のきめ細かいコンテナを作成することで、HTTP
キャッシュ
パーティショニングで実装されたパターンを引き継ぎ、クロスサイト情報の漏洩を防止します。[ネットワーク状態のパーティショニングの詳細](https://github.com/MattMenke2/Explainer---Partition-Network-State)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/MattMenke2/Explainer---Partition-Network-State/issues">MattMenke2/Explainer---Partition-Network-State</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/tJa6uzXu_IA/">I2S 2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/sLC_W6B8big/">I2E 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/6KKXv1PqPZ0/">I2P 2019/07</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork">Internals > Network</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://whatwg.org/">Web Hypertext Application Technology Working Group (WHATWG)</a></td>
  </tr>
</table>

#### Fenced Frame

_Fenced Frame
を使用すると、ページと埋め込みコンテンツの間に境界が強制的に設定されるため、クロスサイト
トラッキングを許可しなくても、パーティション化されていないデータに安全にアクセスできます。[Fenced
Frame
の詳細](https://github.com/shivanigithub/fenced-frame)をご覧ください。_

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/shivanigithub/fenced-frame/issues">shivanigithub/fenced-frame</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/Ko9UXQYPgUE/">I2P 2021/04</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EFencedFrames">Blink > FencedFrames</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a></td>
  </tr>
</table>

#### Federated Credentials Management（FedCM）

_Federated Credentials Management API は既存の ID
プロバイダのユースケースをベースに構築されているため、サードパーティの
Cookie なしで、フェデレーション ID
に関する新規および既存のユースケースに対応できます。[Federated
Credentials Management
の詳細](https://github.com/fedidcg/FedCM)をご覧ください。_

**_最終更新日: 2022 年 3 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/fedidcg/FedCM/issues">fedidcg/FedCM</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/kws-gltC5us/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jlV_1m7uUAg/">I2E 2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/2B4TJ7j2U4M/">I2P 2020/09</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EIdentity%3EFedCM">Blink > Identity > FedCM</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/fed-id/">Federated Identity Community Group</a></td>
  </tr>
</table>

### 隠されたトラッキングの防止

#### デフォルトで SameSite=Lax の Cookie 設定

_「SameSite=Lax のデフォルト化」は、すべての Cookie
をデフォルトでファーストパーティ（つまり
same-site）にする仕様変更でした。これにより、サイトはサードパーティ（つまり
cross-site）として使用する Cookie
を明示的にマークする必要が生じました。[SameSite Cookie
の詳細](https://web.dev/samesite-cookies-explained/)をご覧ください。_

**_最終更新日: 2022 年 2 月 - SameSite=Lax
のデフォルト化は完全リリースされました_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/mikewest/cookie-incrementalism/issues">mikewest/cookie-incrementalism</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/O_uF2FBXacA/">I2S 2019/08</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/6KhRNH3PrvU/">I2R 08/2019</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/AknSSyQTGYs/">I2P+I2S 2019/05</a></td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ECookies">Internals > Network > Cookies</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://datatracker.ietf.org/group/httpstate/about/">HTTP 状態管理メカニズム（httpstate）</a></td>
  </tr>
</table>

#### DNS-over-HTTPS

_DNS-over-HTTPS は、ブラウザがアクセスしたサイトを同じネットワーク上で覗き見されないようにします。[DNS-over-HTTPS
の詳細](https://blog.chromium.org/2020/05/a-safer-and-more-private-browsing-DoH.html)をご覧ください。_

**_最終更新日: 2022 年 2 月 - DNS-over-HTTPS
はすべてのプラットフォーム向けにリリースされました_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/net-dev">net-dev</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td>[該当なし]</td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3EDoH">Internals > Network > DoH</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td><a href="https://groups.google.com/a/chromium.org/g/net-dev">net-dev</a></td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://datatracker.ietf.org/group/doh/about/">DNS Over HTTPS (doh)</a></td>
  </tr>
</table>

#### User-Agent の情報量削減と User-Agent Client Hints

_Chrome は、デフォルトで User-Agent
文字列内で開示される情報の量を削減し、これにより隠れたトラッキングが行われる可能性を抑制します。User-Agent
Client Hints は、サイトがクリーンかつ監査可能な API
を使用して、リクエストに応じてこの情報を受け取ることができるようにします。[User-Agent
の情報量削減と User-Agent Client
Hints（UA-CH）の詳細](/docs/privacy-sandbox/user-agent/)をご覧ください。_

**_注: 全体的な仕組みはさまざまな個別の機能として段階的にリリースされており、その結果としてインテント
メッセージが増加しています。_**

**_最終更新日: 2022 年 2 月_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td>
     <ul>
       <li>User-Agent Client Hints: <a href="https://github.com/WICG/ua-client-hints/issues">WICG/ua-client-hints</a></li>
       <li>Client Hints overall 全般: <a href="https://github.com/WICG/client-hints-infrastructure/issues">WICG/client-hints-infrastructure</a></li>
       <li>User-Agent 文字列の削減: <a href="https://github.com/abeyad/user-agent-reduction/issues">abeyad/user-agent-reduction</a></li>
     </ul>
   </td>
  </tr>
  <tr>
   <td><strong>インテント</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/">I2S 2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/G-ouYoNY9Hs/">I2E 2022/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-2OW78CB1-A/">I2E 2022/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/JQ68cvYuiQU/">I2S 2021/12</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oDU_uaDTLic/">I2P 2021/12</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/yZh8Lwr34Ro/">I2S 2021/11</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/2V3kubJSOU0">I2P 2021/11</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/FTNrw03Xs9s/">I2P 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/R0xKm1B7qoQ/">I2E 2021/07</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/r0kcHYoK79U/">I2P 2021/07</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/dafizBGwWMw/">I2P 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/t-S9nnos9qU/">I2R 2020/12</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/zPYGbULXn7o/">I2P 2020/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/">I2R 2020/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/A4wxFpvqUfA/">I2S 2020/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/WQ0eC_Gf8bw">I2P 2019/01</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3ENetwork%3EClientHints">Blink > Network > ClientHints</a></td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://www.w3.org/community/wicg/">Web Platform Incubator Community Group (WICG)</a></td>
  </tr>
</table>

#### Gnatcatcher

_Gnatcatcher は、サイトからユーザーの IP
アドレスをマスクする方法を探索します。マスキングを行うことで、IP
アドレスを必要とするコア機能を維持しつつ、主要なトラッキング
シグナルを削減できます。[Gnatcatcher
の詳細](https://github.com/bslassey/ip-blindness)をご覧ください。_

**_最終更新日 2022 年 2 月 - プライバシー
バジェットの初回提案はまだディスカッションの初期段階にあります_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/bslassey/ip-blindness/issues">bslassey/ip-blindness</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td>[更新される予定です]</td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td>[更新される予定です]</td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[任意]</td>
  </tr>
  <tr>
   <td><strong>標準化グループ</strong></td>
   <td><a href="https://datatracker.ietf.org/wg/masque/about/">Multiplexed Application Substrate over QUIC Encryption (masque)</a></td>
  </tr>
</table>

#### プライバシー バジェット

_プライバシー バジェットでは、サイトで利用可能な識別情報の量をブラウザが検出し、大量のデータが収集される前にブラウザが対処できるようにする方法を提案しています。[プライバシー
バジェットの詳細](https://github.com/bslassey/privacy-budget)をご確認ください。_

**_最終更新日 2022 年 2 月: プライバシー
バジェットの初回提案はまだ初期の検討段階です_**

<table class="width-full">
  <tr>
   <td><strong>フィードバック</strong></td>
   <td><a href="https://github.com/bslassey/privacy-budget/issues">bslassey/privacy-budget</a></td>
  </tr>
  <tr>
   <td><strong>インテント</strong></td>
   <td>[未定]</td>
  </tr>
  <tr>
   <td><strong>Chromium コンポーネント</strong></td>
   <td>[未定]</td>
  </tr>
  <tr>
   <td><strong>メーリング リスト</strong></td>
   <td>[省略可]</td>
  </tr>
  <tr>
   <td><strong>標準グループ</strong></td>
   <td><a href="https://www.w3.org/groups/cg/privacycg">プライバシー コミュニティ グループ</a></td>
  </tr>
</table>

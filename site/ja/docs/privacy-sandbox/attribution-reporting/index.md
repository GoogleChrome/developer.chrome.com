---
layout: layouts/doc-post.njk
title: アトリビューションレポート
subhead: 広告のクリックまたはビューが、広告主サイトでの購入などのようにコンバージョンにつながったタイミングを測定します。
description: 広告のクリックまたはビューが、広告主サイトでの購入などのようにコンバージョンにつながったタイミングを測定します。
date: 2021-05-18
updated: 2023-03-14
authors:
  - maudn
  - alexandrawhite
---

{% YouTube id='UGA74CIcom8' %}

## この記事の対象者

この記事では、アトリビューション レポートの基本を取り上げ、いくつかの基礎的な概念について説明しますが、技術的な詳細についてはあまり触れません。

- **広告またはアドテック**の分野に従事している場合は、サード パーティ Cookie によって現在サポートされている機能をこの API がどのようにサポートするかについて学ぶことができます。[レポートの生成](#use-cases-and-features)方法の詳細については、[API のユースケース](#how-does-the-attribution-reporting-api-work)をご覧ください。
- **開発者またはソフトウェアエンジニア**の場合は、[システムの完全な概要](/docs/privacy-sandbox/attribution-reporting/system-overview/)にアクセスするか、[実験して API に参加](/docs/privacy-sandbox/attribution-reporting-experiment/)してください。

**アドテックプラットフォームでコンバージョン測定を行っている広告主とサイト運営者**は、直接 API を使用する必要はありません。ご利用のアドテックがこの API を統合することを計画している場合は、アトリビューション レポートの仕組みを理解しておくことをお勧めします。

{% Aside %}

将来的には、Attribution Reporting API は広告に関連しないユースケースにも対応する可能性があります。

{% endAside %}

## Attribution Reporting API とは何ですか？

現在、広告コンバージョンの測定は多くの場合、[サード パーティ Cookie](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies) に依存しています。サード パーティ Cookie は、サイト間でユーザーを追跡してユーザーのプライバシーを妨害する目的で使用される可能性があるため、ブラウザはサード パーティ Cookie へのアクセスを制限しています。

Attribution Reporting API は、サードパーティ Cookie を使用することなくプライバシーの保護を担保しながらこういった測定を可能にしています。

この API を使用することで、広告主やアドテクプロバイダーは以下のような場合にコンバージョンを測定できるようになります。

- 広告の**クリック**や**表示**。
- サードパーティのアドテクプロバイダーを使用している広告主のサイト内の広告など、**サードパーティ** iframe 内の広告。
- SNS や検索エンジンの検索結果ページ上の広告や、広告主が独自に配信する広告などを含む**ファーストパーティ**コンテキストの広告。

これらの用語や概念については、[プライバシー サンドボックス用語集](/docs/privacy-sandbox/glossary/)をご覧ください。

## API を試す

- Attribution Reporting API は、実験用に[広告関連のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)で提供されています。
- ブラウザでローカルにテストできます。[*フラグ*を設定](/docs/web-platform/chrome-flags/)して、Chrome ブラウザに特定の実験的機能を有効にするよう指示します。

API の実験に興味がある場合は、[アトリビューション レポート: 実験と参加](/docs/privacy-sandbox/attribution-reporting-experiment/)をご覧ください。

{% Partial 'privacy-sandbox/feedback-aside.njk' %}

{: #changes }

### API の変更点

- [API の変更点](/docs/privacy-sandbox/attribution-reporting-updates/) を追跡する。
- [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/chrome-shipping) を 2023 年前半に出荷する予定としている理由をご覧ください。

{% Aside %}

アトリビューション レポートは以前、Event Conversion Measurement API として知られていました。当時のイベントレベルの範囲が他の測定ユースケースにまで拡大されたことから、[この名前は 2022 年に変更](/docs/privacy-sandbox/attribution-reporting-introduction/)されました。

{% endAside %}

{: #status }

### 提供

{% Partial 'privacy-sandbox/timeline/attribution-reporting-features.njk' %}

{% Aside %}

すべての Privacy Sandbox API のステータスの概要については、[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)をご覧ください。

{% endAside %}

## ユースケースと機能

Attribution Reporting API では、広告主またはサードバーティのアドテクプロバイダーへと送信可能な 2 種類のレポートを通して、さまざまな種類の統計情報にアクセスできます。 これら 2 種類のレポートは同時使用が可能であり、補完的な関係にあります。

- [**イベントレベルレポート**](#event-level-reports)は、特定の広告のクリックまたはビュー（広告側）をコンバージョン側のデータに関連付けます。コンバージョン側のデータは非常に限られており、データにはノイズが含まれています（つまり、少数のケースでは、実際のレポートの代わりにランダムなデータが送信されます）。これにより、サイト間でのユーザー ID の結合が防止され、ユーザーのプライバシーが保護されます。プライバシーをさらに保護するために、レポートはすぐには送信されません。
- <strong>集計レポート</strong>は、広告側の特定のイベントには関連付けられていません。 こういったレポートは、イベントレベルレポートよりもリッチで忠実度の高いコンバージョンデータを提供しています。 複数のプライバシー技術を組み合わせることで、サイト間でアイデンティティが結び付けられてしまうリスクを軽減させます。

### イベントレベルレポート

**イベントレベルレポート**は、広告のクリックや表示を大まかなコンバージョンデータに関連付けます。

<figure class="screenshot">  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",  alt="Event-level report", width="400", height="180" %}  <figcaption>    イベントレベルレポートの例: <code>news.example</code> のクリック ID 200400600（<code>news.example</code> のユーザー ID Bob_Doe に接続）は <code>shop.example</code> での購入につながっている。</figcaption></figure>

イベントレベルレポートは、以下の用途に適しています。

- **最適化**。「投資回収率を改善するにはどうすればよいか？」などの質問に答えます。広告側の一意の ID をレポートで使用できるようになるため、こういったレポートは特に広告プレースメントの最適化に使用できます。イベントレベルレポートは機械学習モデルのトレーニングデータを提供でます。
- コンバージョンに関する情報がほとんど必要ない**粗粒レポート**。現在は、クリックに対して 3 ビット（コンバージョンは 8 つのカテゴリの 1 つに割り当てられています）とビューに対して 1 ビットのコンバージョンデータに制限されています。イベントレベルレポートでは、特定の価格やコンバージョン時間などの細かいコンバージョン側データのエンコードはサポートされていません。
- **不正行為の検出**。 一部のレポートのデータからはスパム行為や不正な操作の特定に使用可能なパターンを読み取ることができるため、広告に関する不正の検出や分析に役立ちます。

### 要約レポート (これまでの集計レポート)

一方**要約レポート**は、より詳細なコンバージョンデータと、クリック/ビューデータやコンバージョンデータを結び付けるために必要となる柔軟性を提供します。

[要約レポート](/docs/privacy-sandbox/summary-reports/)についての詳細をご覧ください。

<figure>  {% Img    src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="Example of insights from summary reports.", width="400", height="180"%}  <figcaption>要約レポートのインサイトの例です。<code>news.example</code> の CampaignID 1234567 は、<code>shoes.example</code> で 518 件のコンバージョンにつながっており、合計支出は $38174 となっています。このコンバージョンの半数は米国ニューヨーク市のユーザーです。</figcaption></figure>

要約レポートは、ユースケースの報告に最適です。これらのレポートを使って、「投資回収率は？」などの質問に答えられます。

最適化を目的とした要約レポートの使用方法（コンバージョンデータが粗粒すぎるイベントレポートレポートではサポートされていない購入価格の最適化など）は、活発に調査されている分野です。

### その他の機能

この API に提案されているその他の機能には、以下のようなものが含まれています。

- [アプリからウェブへのアトリビューション](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md): アプリでの広告閲覧またはクリックをウェブでコンバージョンする。
- [クロスデバイスのアトリビューション](https://github.com/WICG/attribution-reporting-api/blob/main/archive/cross_device.md): モバイルでの広告閲覧またはクリックをデスクトップでコンバージョンする。

{% Aside %}

サード パーティ Cookie が存在しない将来には、この API は他のプライバシー保護広告 API と組み合わされて、エンドツーエンドのユースケースに対応することになります。

- リマーケティング: [Protected Audience API](/docs/privacy-sandbox/fledge/) を参照
- インタレストベース広告の選択: [Topics](/docs/privacy-sandbox/topics/) を参照

{% endAside %}

## ブラウザのサポート

- Firefox と Edge は[シグナルがありません](https://chromestatus.com/feature/6412002824028160)。
- Safari/Webkit は[非対応](https://chromestatus.com/feature/6412002824028160)であり、広告コンバージョンの測定には[プライベートクリック測定](https://developer.apple.com/videos/play/wwdc2021/10033/)と呼ばれる異なる API を提案しました。

{% Details %}

{%DetailsSummary 'h3' %} Chrome が提案する API と WebKit が提案する API の違い {% endDetailsSummary %}

この 2 つの API は異なるものの、Chrome と WebKit はオープンに連携しながら開発者エクスペリエンスの簡素化を進めています。たとえば、属性名や[レポート用の JSON の構造](https://github.com/privacycg/private-click-measurement/issues/30)を統一しています。

Chrome が 提案する Attribution Reporting API は、Safari/WebKit が提案する Private Click Measurement API とは機能セットが異なっています。 Chrome が提案する Attribution Reporting API のポイントは、以下の通りです。

- ビュースルー測定のサポート。
- イベントレベルレポートの提供が可能であること。
- 要約レポートにクリック/ビュー側とコンバージョン側の双方に関する情報が豊富に含まれていること。
- アドテクプラットフォームなどのサードパーティがサイト運営者や広告主に代わってレポートを受け取ることができること。

{% endDetails %}

### ブラウザ構成 {: #browser-configuration }

- ユーザーは、`chrome://settings/privacySandbox` のユーザー設定から API の利用を停止することができます。
- **シークレット**モードの使用中は API が無効になります。
- **サードパーティ Cookie** が無効になっている場合、API は無効化されます。

{% Aside %}

この API はサードパーティ Cookie に依存していません。 しかしながら、テスト段階では API を有効にするためにサードパーティ Cookie を有効化する必要があります。 これにより開発者はデバッグレポートを取得し、API の結果を Cookie ベースのアトリビューションと比較することができます。

{% endAside %}

## サイトではどのようにしてアクセスを制御することができますか？ {: #sites-control }

特定のブラウザで API を使用できる場合、デフォルトで、任意のサイト（トップレベルのドキュメントとスクリプトの両方、および same-origin の iframe）で使用できます。

任意のサード パーティ（トップレベルのアクセス権を持つスクリプトを介してページに追加されていないクロスオリジン広告 iframe など）は、サイト運営者または広告主が認識していない状態で API を使用することはできません。これらの iframe では、[権限ポリシー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)を通じて明示的に Attribution Reporting API が有効にされている必要があります。

```html
<iframe src="..." allow="attribution-reporting"></iframe>
```

クロスオリジン iframe をページに追加するサード パーティにトップレベルのアクセス権がある場合も、[権限ポリシー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)で Attribution Reporting API を有効にできます。

{% Aside %}

### セキュリティ上のメリット

これにより、トップレベルのアクセス権を持つスクリプトは、スクリプト自体が追加するフレームでアトリビューション レポートを使用できるようになります。トップレベルのアクセス権は、サイトによって信頼されているサード パーティのスクリプトにのみ与えられるため、これは問題ではありません。

このポリシーのセキュリティに関する主なメリットは他の点にあります。トップレベルのスクリプトを使用せずに追加されたフレームがデフォルトで信頼されて、ソースまたはトリガーを登録してしまっては問題です（埋め込み側がすでに信頼されている場合を除きます）。トップレベル サイトでこれらの iframe の API を明示的に有効にすることが求められているのは、このためです。

{% endAside %}

サイトは、HTTP レスポンスヘッダーを送信することで、すべてのパーティ（トップレベルのアクセスを持つスクリプトを含む）に対して Attribution Reporting API を無効にすることができます。

```text
Permissions-Policy: attribution-reporting=()
```

## Attribution Reporting API はどのように機能するのですか？

Attribution Reporting API を使用すると、相互にリンクされている 2 つのイベント、つまりユーザーによる広告のビューやクリックなどのサイト運営者サイト上のイベントと、その後の広告主サイトでのコンバージョンを測定できます。

{: #billing }

{% Aside %}

イベントレベルレポートと[要約レポート](/docs/privacy-sandbox/aggregation-service/#noise-scale)にはノイズが追加されるため、Attribution Reporting API は、コンバージョン単価の請求ニーズには適していない可能性があります。

[GitHub](https://github.com/WICG/attribution-reporting-api/issues) で Attribution Reporting API によるさまざまな請求モデルへの影響に関するフィードバックをお寄せください。

{% endAside %}

### イベントレベルレポート

<figure>  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",  alt="event-level report", width="800", height="521" %} <figcaption style="text-align:left;">イベントレベルレポートは、次のような順序で生成されます。<br>ブラウザーは、クリックまたはビューをアドテクノロジーによって定義されたコンバージョンデータと照合します。<br>その後、多少の遅延とノイズとともにレポート結果を事前に定義されているエンドポイントへと送信します。</figcaption> </figure>

### 要約レポート

<figure> {% Img   src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/un70ZcJVrWepdWWsnMIY.png", alt="", width="800", height="1024" %}  <figcaption style="text-align:left;">要約レポートの生成</figcaption></figure>

要約レポートは以下のように生成されます。

- ユーザーが、特別に構成された広告をクリックまたは表示します。すると、ユーザーのローカルデバイス上のブラウザは、事前に指定されたアトリビューション構成データとともにそのイベントを記録します。
- 後で、ユーザーがコンバージョンすると、ブラウザはその詳細なクリックまたはビューイベント（*アトリビューション ソース イベント*）を詳細なコンバージョン データ（*アトリビューション トリガー データ*）と照合します。キャプチャされる情報の次元はアドテックによって事前に定義されており、ブラウザはアドテックが定義した特定のロジックに従います。ブラウザはこのデータを*集計可能なレポート*に出力します。
- 集計可能なレポートはブラウザによって暗号化され、アドテックサーバーに送信されます。集計可能なレポートはアドテックサーバーから[集計サービス](/docs/privacy-sandbox/aggregation-service/)に送信されて、要約レポートが生成されます。
- 要約レポートはその後でアドテックで利用できるようになります。要約レポートは、イベントレベルレポートほど遅延しないことに注意してください。

[要約レポート](/docs/privacy-sandbox/summary-reports/)についての詳細をお読みください。

## プライバシー

サード パーティ Cookie とは異なり、Attribution Reporting API を使用すると、**アドテック会社はサイト間での個人のアクティビティを追跡することなく**、コンバージョンに関するインサイトを得ることができます。

ボブという人物を例に挙げましょう。 ボブは、`news.com`でニュースを読んでいるときにある広告を目にしました。 その 1 週間後、ボブは `shoes.example` で靴を購入します。

現時点でこういったコンバージョンは**クロスサイト識別子**として使用されるサードパーティ Cookie によって追跡されています。 サードパーティ Cookie を使用することでアドテク企業は `news.example` と `shoes.example` でボブが行ったアクティビティの詳細な情報にアクセスできるようになり、それらの情報を統合してボブの詳細な人物像を構築することができます。 最終的にアドテク企業は、ボブの所在地、サイトの閲覧習慣、`news.com` での記事の好み、さらには `shoes.com` での購入内容、アクティビティ、クレジットカードなどの情報を手に入れることができます。 こういったクロスサイトでの情報の結び付けは広告のコンバージョン測定においては有効となります。 しかしながら、これはユーザーのプライバシーを侵害します。ボブのアクティビティは、サイト間に渡って高いレベルで追跡されてしまうことになります。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="今日のウェブ（結合したアイデンティティ）と未来のウェブ（パーティション化されたアイデンティティ）の対照比較", width="800", height="314" %}

サイト間で結合されるのは少量の情報です。コンバージョンの測定に十分な量であっても、ボブのアクティビティをサイト間で詳細に追跡するには不十分です。`news.example` と `shoes.example` でのボブのアクティビティは分離したままとなります。

### レポートタイプごとの保護

**イベントレベルレポート**は、広告側の識別子をコンバージョン側のデータの一部にリンクします。コンバージョンに関連するサイト間の情報は提供されますが、コンバージョン側の情報が大まかすぎるため、サイト間でユーザーのアイデンティティを結び付けることはできません。

**要約レポート**では詳細な分析情報が提供されますが、提供されるのは集計後の情報のみです。こういった集計可能レポートの内容は暗号化された上でアドクノロジー側へと送信されるため、アドテクノロジー側では集計サービスを利用しない限りレポートから情報を得ることができません。 集計サービスでは、ノイズが含まれる集計へのアクセスのみが提供されます。

レート制限などを含む追加のプライバシー保護が、イベントレベルレポートと集計レポートの両方に課せられています。

<figure> {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/mDdo2XLyGLBCAlgH7MPZ.png", alt="", width="800", height="1237" %}</figure>

{: #event-level-noise }

{% Details %} {% DetailsSummary 'h3' %} 詳細: イベントレベルレポートとプライバシー  {% endDetailsSummary %}

イベントレベルレポートは、次のプライバシーメカニズムに従って、サイト間でユーザーを追跡することなく、コンバージョンに関するインサイトを提供します。

- クロスサイト識別子は使用されず、詳細なクロスサイト閲覧アクティビティがデバイスから送信されることはありません。
- イベントレベルレポートは、広告側（`news.example`）の 64 ビットの情報を、コンバージョン側（`shop.example`）の 1 ビットまたは 3 ビットのみに関連付けます。64 ビットは、個々のユーザー ID にマッピングするには十分な情報ですが、これらの 64 ビットは、非常に少ないクロスサイト情報（1 ビットまたは 3 ビット）とのみリンクでき、識別子を保持するには十分ではありません。
    - 広告側 64 ビットは新しい情報ではありません。ユーザー ID は現在、広告側ですでに利用可能です。`news.example` または `adtech.example` は `news.example` の特定のユーザーのアクティビティをすでに認識しています。
- 悪用やクロスサイトトラッキングを防止するために、追加の保護が適用されています。
    - レポートは**遅れて**送信されます。
    - コンバージョンデータには**ノイズが含まれて**おり、一定の割合で偽のレポートが生成されます。
    - アトリビューション付きコンバージョンレポートの数は、クリックまたはビューごとに制限されています。{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %} 詳細: 要約レポートとプライバシー  {% endDetailsSummary %}

要約レポートは、詳細なクリックまたはビューイベントを詳細なコンバージョンデータに関連付けます。以下のプライバシー保護メカニズムによって、サイト間でユーザーを追跡することなくコンバージョンのインサイトを提供しています。

- クロスサイト識別子を使用しません。
- 各アトリビューションは、要約レポートの結果に複数のコントリビューションを設定することが可能です。 ユーザーは特定のクリック (またはビュー) やコンバージョンについて複数のアトリビューションをトリガーすることができます。
- データは多数のイベント（多数のユーザー）レベルで集計されており、個別のイベントを正確に把握することはできません。集計されたデータを掘り下げていくと、詳細度が上がるにつれてそのデータに関連するノイズも増加していきます。 多数のイベントやユーザーが集計されているデータスライスの方が、有用性を維持するために重要となる精度が高くなります。
- 詳細なクリックまたはビューイベントと詳細なコンバージョンデータが関連付けられている生レポートは暗号化されており、アドテック企業が解読することはできません。[集計サービス](/docs/privacy-sandbox/aggregation-service)のみがこのデータを読み取ることが可能です。
- 悪用やクロスサイトトラッキングを防止するために、追加の保護が適用されています。
    - レポートはランダムに遅れて送信されます。
    - 異なるデータスライスに対するクエリについてはレートが制限されます。

{% endDetails %}

## 貢献とフィードバックの共有

- この機能について質問するにはどうすればよいですか？
- オリジントライアルの参加者で技術的な質問がある場合は、開発者向けの [Attribution Reporting メーリング リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に参加して質問するか、[Chromium のバグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=attribution%20reporting)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

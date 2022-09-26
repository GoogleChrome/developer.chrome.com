---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE API'
subhead: >
  FLEDGE は、リマーケティングとカスタムオーディエンスのユースケースを提供するプライバシーサンドボックスの提案で、第三者がサイト全体でユーザーの閲覧行動を追跡するために使用できないように設計されています。
description: >
  FLEDGE は、リマーケティングとカスタムオーディエンスのユースケースを提供するプライバシーサンドボックスの提案で、第三者がサイト全体でユーザーの閲覧行動を追跡するために使用できないように設計されています。 このAPIにより、ブラウザによるオンデバイスのオークションが可能になり、ユーザーが以前に訪問したウェブサイトから関連性の高い広告を選択できます。
date: 2022-01-27
updated: 2022-05-23
authors:
  - samdutton
---

{% YouTube id='HkvmYKqnytw' %}


## この記事の対象者

この記事では FLEDGE の基本について説明します。いくつかの基本的な概念について説明はしますが、技術的な詳細についてはあまり説明しません。

* **広告またはアドテク**の分野に従事している方は、[広告主](#advertiser)や[サイト運営者](#publisher)などの概念を説明する部分をスキップすることができます。 それでも「[FLEDGE の仕組み](#how)」は役に立つでしょう。

* **開発者またはソフトウェアエンジニア**の方は、提案に関するより詳細な技術情報が記載された「[FLEDGE API 開発者ガイド](/blog/fledge-api)」をご覧ください。

* [FLEDGE デモ](https://fledge-demo.glitch.me)では、基本的な FLEDGE デプロイメントのウォークスルーが提供されています。


{% Aside %}
🧐この記事の最後には、 FLEDGE 関連用語を集めた[用語集](#glossary)と、[連絡方法とフィードバックの送信方法](#engage)についての情報が記載されています。
{% endAside %}


## FLEDGE とは {: #what}

FLEDGE は、[リマーケティング](#remarketing)とカスタムオーディエンスのユースケースを提供する[プライバシーサンドボックス](/docs/privacy-sandbox/overview)の提案で、第三者がサイト全体でユーザーの閲覧行動を追跡するために使用できないように設計されています。

このAPIにより、ブラウザによるオンデバイスのオークションが可能になり、ユーザーが以前に訪問したウェブサイトから関連性の高い広告を選択できます。

FLEDGE は、 [TURTLEDOVE](https://github.com/WICG/turtledove) ファミリーの提案の中で Chromium に実装された最初の実験です。 [プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)には、FLEDGE とその他のプライバシーサンドボックス提案の実装時期に関する情報が提供されています。


## 一分で説明する FLEDGE {: #overview}

<br>

<figure class="w-figure">
  {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png", alt="FLEDGE ライフサイクルの各ステップの概要を示すイラスト",
  width="800", height="366" %}
  <br>
  <figcaption class="w-figcaption">FLEDGE のライフサイクル: <a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png?auto=format&w=1600"
title="画像をクリックして拡大" target="_blank">拡大表示</a></figcaption>
</figure>

<br>

FLEDGE では、「[インタレストグループ](#interest-group-detail)」を使用することで、サイトがユーザーに関連する広告を表示できるようになっています。

たとえば、製品の広告を出している Web サイトにユーザーがアクセスすると、インタレストグループの[オーナー](#interest-group-detail)（サイトの [DSP](#dsp) など）は、ユーザーのブラウザに対し、そのインタレストグループのメンバーシップを追加するように要求できます。 グループのオーナー（この例では DSP）は、`navigator.joinadInterestGroup()` という JavaScript 関数を呼び出して、これを行います。 呼び出しが成功すると、ブラウザは以下を記録します。
* インタレストグループの**名前**: 「custom-bikes」など。
* インタレストグループの**オーナー**:「https://dsp.example」など。
* インタレストグループの**構成情報**: グループのオーナーがオンライン広告オークションでの入札に招待された場合に、ブラウザが入札コード、広告コード、およびリアルタイムデータにアクセスできるようにします。 この情報は、インタレストグループのオーナーが後で更新することが可能です。

{% Aside %}

インタレストグループには他にもユースケースがあります。[オーナーと種類の例](#interest-group-types)をご覧ください。

{% endAside %}

その後、ユーザーが広告スペースを販売するサイトにアクセスすると、そのサイトの広告スペースの[セラー](#seller-detail)（ほとんどの場合、サイトの [SSP](#ssp)、またはサイト自体）は、FLEDGE を使用して、ユーザーに表示する最も適切な広告を選択する広告オークションを実行することができます。 セラーは `navigator.runadAuction()` 関数を呼び出し、入札に招待されたインタレストグループオーナーのリストを提供します。 入札コードは、ブラウザがメンバーとなっているインタレストグループで、そのオーナーが入札に招待されている場合にのみ実行されます。

入札コードは、インタレストグループの構成情報に指定されてある URL から取得されます。 このコードには `generateBid()` 関数を含める必要があります。この関数には、インタレストグループに関するデータとセラーからの情報とともに、ページに関するコンテキストデータとブラウザからのコンテキストデータが渡されます。 各入札者は、[バイヤー](#buyer)と呼ばれます。

セラーは、`navigator.runAdAuction()` 関数を呼び出すと、`scoreAd()` 関数を含むコードを提供します。 この関数は、オークションの各入札者に対して実行され、`generateBid ()` によって返される各入札にスコアを付けます。 広告オークション中、各バイヤーに実行される入札コード（`generateBid()`）とセラーに対して実行されるスコアリングコード（`scoreAd()`）は、[信頼できるサーバー](#trusted-server)からリアルタイムデータを受け取ることができます。

オークションを落札するのは、最もスコアの高い入札です。 その入札に関連付けられている広告が、入札で指定された広告 URL（インタレストグループの構成情報に指定されたリストのいずれかの広告 URL）を使用して、[`<fencedframe>`](#fenced-frame) 要素に表示されます。

オークションの結果を報告するには、セラーのコードには `reportResult()` 関数を、各バイヤーのコードには `reportWin()` 関数を含めることができます。


## FLEDGE を試すには {: #try-fledge}

* 「[FLEDGE API 開発者ガイド](/blog/fledge-api#try-fledge)」には、[機能フラグ](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)を使用してコマンドラインから Chrome を実行し、API を手動で有効にすることで、シングルユーザー向けに FLEDGE を試す方法が説明されています。

* [fledge-demo.glitch.me](https://fledge-demo.glitch.me/) には、広告主とサイト運営者サイトにまたがる基本的な FLEDGE デプロイメントのウォークスルーが提供されています。

* [FLEDGE デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードの動作が説明されており、FLEDGE デバッグに Chrome DevTools を使用する方法が紹介されています。

{% YouTube id='znDD0gkdJyM' %}

## 利用可能なブラウザ構成 {: #user-controls}

ユーザーは chrome://settings/privacySandbox のトップレベル設定を有効または無効にすることで、Chrome でのプライバシーサンドボックスのトライアルへの参加を調整できます。  初回テスト中には、この高レベルのプライバシーサンドボックス設定を使用して、FLEDGE からオプトアウトすることが可能です。 Chrome では、アクセスしたウェブサイト全体に追加されたインタレストグループのリストの表示や管理をユーザー実行できるようにすることを予定しています。  プライバシーサンドボックステクノロジー自体と同様に、ユーザー設定は、ユーザーや規制当局などからのフィードバックによって進化する可能性があります。

FLEDGE の提案が進展するにつれ、[テストやフィードバックに応じて](/docs/privacy-sandbox/cds21-update/#collaborate)、Chrome で利用可能な設定について更新し続けます。 将来的には、FLEDGE と関連データを管理するための、より細かな設定を提供する予定です。

API 呼び出し元は、ユーザーがシークレットモードで閲覧している場合はグループメンバーシップにアクセスできません。また、ユーザーがサイトデータを消去するとメンバーシップは削除されます。

{: #opt-out-site}

## FLEDGE からオプトアウトする方法 {: #opt-out}

FLEDGE API デベロッパー ガイドにサイトオーナー、もしくはいちユーザーとして [FLEDGE API へのアクセスをブロックする方法](/blog/fledge-api#opt-out) が記載されています。

## FLEDGE が必要である理由 {: #why}

ユーザーの興味を理解することで、サイトのコンテンツに基づいて広告を選択する（コンテキストターゲティング）、または広告が表示されるサイトにユーザーが提供した情報を使用する（ファーストパーティデータターゲティング）よりも関連性の高い広告を有効にできます。

従来、広告プラットフォームはサイト間でユーザーの行動を追跡することで、ユーザーの興味を学習してきましたが、 コンテンツパブリッシャーがクロスサイトトラッキングなしで広告収入を得られるようにするには、ブラウザに、広告プラットフォームが関連性のある広告を選択できるようにする方法が必要となります。

FLEDGE の実験は、ユーザーが興味を持っている物事に関する情報がそのユーザーのブラウザ（広告主やアドテクプラットフォーム上ではなく、ユーザーのデバイス上）に保持される状態に Web プラットフォームを近づけることを目的としています。

{% Aside 'warning' %}

この記事で説明されているすべての機能が、現在 Chrome でテストされている FLEDGE API のバージョンに実装（または完全に実装）されているわけではありません。 「[FLEDGE API 開発者ガイド](/blog/fledge-api#try-fledge)」には、[機能フラグ](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)を使用してコマンドラインから実行する Chrome でテストできる FLEDGE 機能について説明されています。

FLEDGE の機能は、実装作業が進むにつれて追加される予定です。 API がオリジントライアルステージに達したら、すでに実装されている部分と依存として進行中の部分のリストを定期的に更新することにします。

{% endAside %}

<br>

## FLEDGE の仕組み {: #how}

以下では、ユーザーがさまざまなサイトを訪問したときに、ユーザーのインタレストグループが広告選択にどのように影響するかを例示します。

この例では、ユーザーはカスタム自転車メーカーの Web サイトにアクセスし、しばらくさまざまな自転車モデルを閲覧しています。 その後、ユーザーがニュースサイトにアクセスすると、同じ自転車メーカーによる新しい自転車の広告が表示されます。

### 1. ユーザーが広告主サイトを訪問する

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="ノートパソコンのブラウザでカスタム自転車メーカーのサイトにアクセスするユーザーのイラスト。", width="400", height="190" %}

ユーザーがカスタム自転車メーカー（この例では[広告主](#advertiser)）の Web サイトにアクセスし、ハンドメイドのスチール製自転車製品ページでしばらく時間を費やしていることを想像してください。 このユーザーの行動により、自転車メーカーに[リマーケティング](#remarketing)の機会が生まれます。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 2. ユーザーのブラウザにインタレストグループの追加が求められる {: #joinAdInterestGroup}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png", alt="ノートパソコンのブラウザでサイトを閲覧するユーザーのイラスト。 JavaScript コードの joinadInterestGroup() がブラウザで実行されている。", width="400", height="187" %}

広告主の [DSP](#dsp)（または広告主自体）は、JavaScript 呼び出しの `navigator.joinAdInterestGroup()` を実行し、ブラウザに、インタレストグループをそれがメンバーであるグループに追加するように求めます。 この例では、グループの名前を `custom-bikes` とします。 インタレストグループのオーナーは、[ステップ 4](#ad-auction) で説明した広告オークションの広告スペースバイヤーです。 このオーナーは、広告オークションの実行時にブラウザがグループの入札コード、広告コード、およびリアルタイムデータにアクセスできるようにするための構成情報を提供します。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 3. ユーザーが広告スペースを販売しているサイトを訪問する

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png", alt="ノートパソコンのブラウザでニュースサイトにアクセスしているユーザーのイラスト。 サイトには広告の空きスロットがある。", width="400", height="182" %}

ユーザーが、FLEDGE を使用して広告を選択するニュースサイト（[**サイト運営者**](#publisher)）にアクセスします。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 4. ブラウザで広告オークションが実行される

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png", alt="ノートパソコンのブラウザでニュースサイトを閲覧しているユーザーのイラスト。 FLEDGE API を使用した広告オークションが行われている。", width="500", height="228" %}

ユーザーのデバイス上で、サイト運営者サイトの特定の空き広告スペースに最適な広告を選択するための広告オークションが実行されます。 オークションを実行するためのコードは大抵、[サプライサイドプラットフォーム（SSP）](#ssp) またはサイト自体によって提供されます。

{% Aside %}

FLEDGE では、広告オークションを実行している当事者を**セラー**と呼びます。

セラーからオークションで入札することを招待された当事者を**バイヤー**と呼びます。

各バイヤーはインタレストグループのオーナーであり、オークションでは、インタレストグループを代表して 1 つの入札がなされます。 つまり、入札者はそれぞれ広告スペースのバイヤーであり、インタレストグループのオーナーでもあるということになります。

{% endAside %}

入札コードは、ブラウザのすべてのインタレストグループに対して実行されますが、そのグループのオーナーが `navigator.runadAuction()` に渡された招待入札者リストに含まれている場合に限ります。

オークションは、セラーが JavaScript 関数の `navigator.runadAuction()` を呼び出すと開始されます。 この関数は、セラーと招待された各入札者のコードを使用します。 各入札者のコード（ステップ 2 で提供された URL のコード）には、入札を送信する `generateBid()` 関数が含まれている必要があります。 この関数は、入札するかどうかを選択して入札額の計算を行うために、利用可能な広告スペースに関するデータを使用します。 セラーのオークションコードには `scoreAd()` 関数が含まれている必要があります。この関数は、入札にスコアを付けるために入札ごとに 1 回実行され、最も望ましい入札額が選択されます。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 5. セラーと参加バイヤーが信頼できるサーバーからリアルタイムデータを受信する

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png", alt="ノートパソコンのブラウザでニュースサイトを閲覧しているユーザーのイラスト。 FLEDGE API を使用した広告オークションが開催され、参加者が信頼できるサーバーからデータを取得している。", width="600", height="189" %}

広告オークション中、広告スペースの[セラー](#seller)または入札広告スペースの[バイヤー](#buyer)は、リアルタイムデータへのアクセスが必要になる場合があります。 セラーが[広告クリエイティブ](#creative)がサイト運営者のポリシーに準拠しているか、または入札者が広告キャンペーンの予算残高を計算する必要があるかどうかをチェックする必要がある場合などです。 FLEDGE のプライバシー要件を満たすため、このデータは[信頼できるサーバー](#trusted-server)を使用して提供されます。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 6. 落札した広告が表示される

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png", alt="ノートパソコンのブラウザでニュースサイトを閲覧しているユーザーのイラスト。 自転車の広告（20% 割引）が表示されている。上部のロックは、広告が Fenced Frame に表示されていることを示している。", width="400", height="192" %}

ステップ 5 で `navigator.runadAuction()` によって返された値が、レンダリング目的で [Fenced Frame](#fenced-frame) に渡されると、落札した広告がサイトに表示されます。 Fenced Frame で表示すると、広告コードが周囲のページと対話することはできません。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 7. オークションの結果が報告される

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/OPSYyEPotB8G1CUeDV0Q.png", alt="FLEDGE 広告オークションの結果が広告のセラーとバイヤーに報告されている様子を表すイラスト。", width="600", height="173" %}

`reportResult()` および `reportWin()` 関数は、それぞれ[セラー](#seller)と落札したバイヤーが提供するオークションコードで呼び出されます。そのため、それぞれがオークション結果についてログ記録し、レポート作成を行うことができます。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇ ︎</p>

### 8. 広告クリックが報告される

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png", alt="ニュースサイトで Fenced Frame に表示された自転車の広告をクリックするユーザーのイラスト。レポートデータがセラーとバイヤーに送信されている。", width="600", height="220" %}

Fenced Frame にレンダリングされた広告のクリックが報告されます。 これがどのように機能するかについて詳しくは、「[Fenced Frames 広告のレポーティング](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent)」をご覧ください。

<br>


{: #interest-group-detail}

{% Details %}

{% DetailsSummary %}

## インタレストグループとは

{% endDetailsSummary %}

FLEDGE インタレストグループは、[リマーケティング](#remarketing)リストに対応する、共通の興味を持つユーザーのグループを表します。

各 FLEDGE インタレストグループにはオーナーがいます。 オーナーの種類が異なれば、ユースケースが異なるさまざまな種類のインタレストグループが作成されます。

オーナーはユーザーのブラウザに対し、JavaScript 関数 `navigator.joinadInterestGroup()` を呼び出して、インタレストグループに関連する広告に関するデータと入札に使用される JavaScript の URL などの情報を提供することで、インタレストグループのメンバーシップを追加するように要求します。 インタレストグループデータ（広告など）の更新は可能で、インタレストグループは最大 30 日間有効にできます。

{% Aside %}

ブラウザに保存されたインタレストグループは FLEDGE ブラウザ内オークションで入札できますが、プログラムで「読み取り可能」ではありません。 つまり、クロスサイトアイデンティティを公開する navigator.getadInterestGroups() はありません。

{% endAside %}

{: #interest-group-types}

以下の表は、FLEDGE インタレストグループとオーナーのさまざまな種類の例を示しています。

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="text-align: left; vertical-align: top;">オーナー</th>
        <th style="text-align: left; vertical-align: top;">例</th>
        <th style="text-align: left; vertical-align: top;">関心の対象</th>
        <th style="text-align: left; vertical-align: top;">例</th>
        <th style="text-align: left; vertical-align: top;">ユースケース</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;">広告主</td>
        <td style="vertical-align: top;">自転車メーカー</td>
        <td style="vertical-align: top;">製品</td>
        <td style="vertical-align: top;">特定のカテゴリの自転車の製品ページを閲覧した人。</td>
        <td style="vertical-align: top;">以前にそのブランドと対話したことのあるユーザーへの<a href="#remarketing" title="Glossary entry for remarketing">リマーケティング</a>。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">サイト運営者</td>
        <td style="vertical-align: top;">ニュースサイト</td>
        <td style="vertical-align: top;">コンテンツ</td>
        <td style="vertical-align: top;">サイクリングについて読んだ人。</td>
        <td style="vertical-align: top;">サイト運営者は、ファーストパーティデータを使用して、広告主がサイト閲覧者に関連のある広告を購入できるようにすることができます。 サイト運営者が所有するインタレストグループは、これらのユーザーが他のサイトを閲覧している場合であっても、サイト運営者に同じことをさせることができます。
          サイト運営者は、オーディエンスの特定のセグメントに広告を表示する機能に対して課金することが可能です。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">アドテク</td>
        <td style="vertical-align: top;"><a href="#dsp" title="DSP の用語集エントリ">DSP</a></td>
        <td style="vertical-align: top;">商品カテゴリ</td>
        <td style="vertical-align: top;">サイクリング用品に興味を示した人たち。</td>
        <td style="vertical-align: top;">アドテク企業は、あるカテゴリのアイテムの市場にいると信じているユーザーのインタレストグループを作成し、管理することができます。 このインタレストグループは、そのカテゴリ（とアドテク会社と連携しているユーザー）で商品を販売するサイトで、商品を宣伝するために使用されます。</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

{% endDetails %}


{: #buyer-detail}

{% Details %}

{% DetailsSummary %}

## バイヤーとは

{% endDetailsSummary %}

FLEDGE で、[インタレストグループ](#interest-group)を所有し、広告[オークション](#)に入札する当事者。

たとえば、以下が該当します。

* **[広告主](#advertiser)**: 広告主自体を代表します。
* **[デマンドサイドプラットフォーム](#dsp)**（DSP）: 広告主を代表します。
* **[インタレストグループオーナー](#interest-group-detail)**: 複数の広告主のために使用されます。

バイヤーには 3 つのジョブがあります。

* オークションに参加するかどうかを選択すること
* 広告を選択して入札単価を計算すること
* オークションの結果を報告すること

これらの任務は、FLEDGE 広告オークション中に実行される、バイヤーが提供するコードによるプログラムで実行されます。

バイヤーがユーザーのブラウザに対して、それが属しているグループにインタレストグループを追加するように要求する際（JavaScript 関数 `navigator.joinadInterestGroup()` を呼び出す）、バイヤーはブラウザに以下を提供します。
* 入札コードの URL。[セラー](#seller)が[広告オークション](#ad-auction)を実行するときに使用されます。
* 潜在的に、インタレストグループの[広告クリエイティブ](#creative)の URL。 （広告 URL は、アップデートを通じて後から追加される可能性があります。）
* データ[キー](#key-value)のリストと、バイヤーの[信頼できるサーバー](#trusted-server)の URL。オークション中に入札コードでリアルタイムデータを取得できるようにするために必要です。

バイヤーのコードには、オークションの結果を報告する `reportWin()` 関数を含めることもできます。

{% endDetails %}


{: #seller-detail}

{% Details %}

{% DetailsSummary %}

## 広告オークションの実行者

{% endDetailsSummary %}

広告スペースを販売するためにオークションを開催する可能性のある当事者は複数存在します。

たとえば、以下が該当します。

* **コンテンツパブリッシャー**: それ自体を代表し、自社サイトで広告コンテンツをホストします。
* **[サプライサイドプラットフォーム](#ssp)**（SSP）: サイト運営者と連携し、他のサービスを提供します。
* **サードパーティスクリプト**: サイト運営者を代表し、広告オークションへの参加を可能にします。

FLEDGE の場合、広告スペースの[セラー](#seller)には 3 つのジョブがあります。

* サイト運営者のルールを強制すること: どのバイヤーとどの入札が適格か。
* オークションロジックを実行すること: JavaScript を[ワークレット](#worklet)で実行し、各入札の望ましさスコアを計算します。
* オークションの結果を報告すること

これらのジョブは、JavaScript 関数の `navigator.runadAuction()` を呼び出して広告 オークションを開始したときに、セラーが指定したコードによるプログラムで実行されます。

{% endDetails %}


{: #ad-auction}

{% Details %}

{% DetailsSummary %}

## FLEDGE 広告オークションの仕組み

{% endDetailsSummary %}

<br>

{: #auction-diagram}

以下の図は、FLEDGE 広告オークションの各ステージの概要を示しています: <a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/roes4NP2gaUcEFD2uVlW.png?auto=format&w=1600"
title="Click to view a larger version of image" target="_blank">拡大表示</a>。

<figure class="w-figure">
  {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/roes4NP2gaUcEFD2uVlW.png", alt="FLEDGE 広告オークションの各ステージの概要を示すイラスト",
  width="800", height="481" %}
</figure>

<br>

FLEDGE において、広告オークションは、ブラウザがユーザーの デバイス上で広告を選択するために実行する小さな JavaScript プログラムの集合体です。 プライバシーを保護するために、セラーとバイヤーからのすべての広告オークションコードは、外部と対話できない分離された JavaScript [ワークレット](#worklet)で実行されます。

広告スペースのセラー（[サプライサイドプラットフォーム](#ssp)など）は、広告スペースを販売するサイト（ニュースサイトなど）で FLEDGE 広告オークションを開始します。 セラーはオークションに参加するバイヤーを選択し、どのスペースが販売されているかを示し、広告の追加基準を提供します。 各バイヤーは、インタレストグループのオーナーです。

セラーはブラウザに入札単価を採点するコードを提供します。このコードには、各入札額、[広告クリエイティブ](#creative)の URL、および各バイヤーから返されるその他のデータが含まれます。 オークション中、バイヤーからの入札コードとセラーからの入札スコアリングコードは、[信頼できるサーバー](#trusted-server)からデータを受信することができます。 広告が選択されて表示されると（プライバシー保護のために [Fenced Frame](#fenced-frame) に表示）、セラーと落札した入札者はオークションの結果を報告できます。

### 1. ユーザーが広告を表示するサイトを訪問する

### 2. セラーがオークションを開始する

**セラー**は、JavaScript関数の `navigator.runAdAuction()` を呼び出して、利用可能な広告スロットのオークションを開始します。 セラーは大抵、サイトの [SSP](#ssp) であるか、サイト自体です。 セラーは、その関数に渡されるオークション構成値で、どの広告スペースが販売されており、誰が入札できるのかを示し、入札単価を採点するコードの URL を指定します。


### 3. 招待された各入札者に対し、入札コードが実行される

「[FLEDGE の仕組み](#joinAdInterestGroup)」で説明したように、それぞれのインタレストグループオーナーは、`navigator.joinAdInterestGroup()` を呼び出したときに、広告オークションで入札するために使用できるコードの URL を提供します。 このコードには `generateBid()` 関数を含める必要があります。この関数は、数値による入札単価と、[広告クリエイティブ](#creative)の URL を他のデータとともに返します。 入札コードは、残りの広告 キャンペーン予算など、各入札者の[信頼できるサーバー](#trusted-server)からリアルタイムデータを受け取ることができます。

### 4. セラーのコードが各バイヤーの入札を評価する

`navigator.runadAuction()` コード（ステップ 2）には、`scoreAd()` 関数が含まれている必要があります。この関数は、広告とそれに付随する入札ごとに 1 回実行され、その望ましさが判定されます。 `scoreAd()` 関数は、セラーが提供するオークションロジック JavaScript コードで、広告候補ごとに実行されます。 この関数は、各バイヤーのコード（前のステップ）に含まれる `generateBid()` 関数によって返された入札値とその他のデータを使用します。 セラーは、[信頼できるサーバー](#trusted-server)からリアルタイムデータを受信する場合もあります。

`scoreAd()` 関数は広告ごとに、広告の望ましさを示す数値を返します。 望ましさが最も高い広告が落札となります。 オークションが始まる前に、セラーは利用可能な広告スロットに最適なコンテキスト広告を見つけます。 `scoreAd()` には、そのコンテキスト落札者を打ち負かすことができない広告を拒否するロジックも含まれています。

### 5. 広告が表示される

落札した広告に対し、オークションコードは *opaque* 値を返します。この値は、その広告をレンダリングする [Fenced Frame](#fenced-frame) にのみ渡されます。 広告スペースを販売している当事者も、広告を表示しているサイトも、この値を検査することはできません。

### 6. セラーとバイヤーによってオークションの結果が報告される

ステップ 4 のセラーのコードには、関数 `reportResult()` の定義を含めることができます。 ステップ 3 のバイヤーのコードには、`reportWin()` の定義を含めることができます。 `reportResult()` と `reportWin()` 内のコードには、`sendReportTo()` の呼び出しを含めることができます。これは、集計レポートが使用可能になるまでの、[一時的措置](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)です。 `sendReportTo()` 関数は、引数としてオークションの結果を報告するために取得される URL を取ります。

{% Aside %}
落札できなかった入札者のレポート作成メカニズムについては[議論中](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#53-losing-bidder-reporting)です。
{% endAside %}

{% endDetails %}


{: #trusted-server-detail}

{% Details %}

{% DetailsSummary %}

## 信頼できるサーバーとは

{% endDetailsSummary %}

プライバシーサンドボックスの文脈では、信頼できるサーバーは、プライバシーを維持しながらデータへのアクセスを可能にする安全な環境を指します。 信頼できるサーバーへのリクエストによって、イベントレベルのロギングが発生したり、その他の副作用が発生したりすることはありません。

当事者（FLEDGE オークション中の Web ブラウザなど）が機密情報を漏らす可能性のある質問を尋ねられるようにするには、信頼できるサーバーが以下を提供する必要があります。

-  **ポリシーアプローチ**: コード監査の義務付けや信頼できるサードパーティのみのサーバーの使用など。
-  **技術的保証**: [安全なマルチパーティ計算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)または [Secure Enclave](https://support.apple.com/en-gb/guide/security/sec59b0b31ff/web) など。

{% endDetails %}


{% Details %}

{% DetailsSummary %}

## オークションへのリアルタイムデータの組み込み方法

{% endDetailsSummary %}

広告オークションの[バイヤー](#buyer-detail)または[セラー](#seller-detail)は、リアルタイムデータにアクセスする必要がある場合があります。 入札者が広告キャンペーンの残りの予算を計算したい場合や、セラーがサイト運営者のポリシーに対して広告クリエイティブをチェックする必要がある場合などです。

FLEDGE のプライバシー要件を満たすため、広告オークション中に必要なリアルタイムデータは、[信頼できるサーバー](#trusted-server-detail)によって提供されるようになっています。 各バイヤーが `navigator.joinAdInterestGroup()` を呼び出す際は、バイヤーが信頼できるサーバーの URL を指定し、オークション中にそのサーバーから取得する必要のあるデータを指定します。 同様に、セラーが `navigator.runAdAuction()` を呼び出して広告オークションを実行する際は、セラーが信頼できるサーバーの URL を提供し、そのサーバーから必要となるデータを指定します。

信頼できるサーバーの役割とオーナーシップはまだ議論中であるため、FLEDGE の初期テストでは一時的に [「ライセンス持ち込み（BYOL）」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)モデルを使用します。

{% endDetails %}



<br>

{: #glossary}

{% Details %}

{% DetailsSummary %}

## 用語集

{% endDetailsSummary %}

{: #ad-auction}

### 広告オークション

FLEDGE では、広告を表示するサイトの広告スペースを販売するために、[セラー](#seller)がユーザーのデバイスのブラウザで JavaScript コードを使って広告オークションを実行します。

{: #ad-creative}

### 広告クリエイティブ

[クリエイティブ](#creative)を参照。

{: #ad-exchange}

### アドエクスチェンジ

複数の広告ネットワークでの広告枠の売買を自動化するプラットフォーム。

{: #ad-inventory }

### 広告枠

広告スペースを販売するサイトが提供する広告用のスペース。

{: #advertiser}

### 広告主

自社商品を宣伝するために支払うサイト。 この記事の例では、カスタム自転車メーカーです。

{: #buyer }

### バイヤー

[広告オークション](#ad-auction)で広告スペースに入札する当事者。DSP、または広告主自体である可能性があります。 広告スペースのバイヤーは、インタレストグループを所有し、管理します。 詳細については、「[広告スペースのバイヤーとは](#buyer-detail)」を参照してください。

{: #creative}

### クリエイティブ

広告コンテンツ: グラフィック、テキスト、動画、オーディオ。

{: #dsp }

### デマンドサイドプラットフォーム（DSP）

広告購入の自動化に使用されるアドテクサービス。 広告主は DSP を使用して、サイト運営者の広範なサイトに渡って[広告インプレッション](https://en.wikipedia.org/wiki/Impression_(online_media))を購入します。 サイト運営者は、アドエクスチェンジと呼ばれるマーケットプレイスを通じて[広告枠](#ad-inventory)を販売し、DSP は、利用可能な広告インプレッションの内、広告主が購入する上でどれが最も合理的であるかをプログラムで決定します。

{: #fenced-frame}

### Fenced Frame

[フレーム](https://developer.mozilla.org/docs/Web/HTML/Element/iframe)の種類。広告を表示するために使用されますが、その周囲のページと対話することはできません。 [Fenced Frame の提案](https://github.com/shivanigithub/fenced-frame)は議論中です。

{: #interest-group}

### インタレストグループ

[リマーケティングリスト](https://www.thinkwithgoogle.com/marketing-strategies/search/remarketing-lists-for-search-ads/)など、共通の関心を持つユーザーのグループ。 各 FLEDGEインタレストグループには、広告主、サイト運営者、またはアドテクプラットフォームのオーナーがいます。 オーナーは、ユーザーのブラウザにインタレストグループへの参加を依頼します。

{: #publisher}

### Key-Value

[信頼できるサーバー](#key-value)を参照。

### サイト運営者

[FLEDGE の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=publisher) の文脈では、広告を表示するために支払われるサイトを指します。 この記事の例では、ニュースサイトです。

{: #rtb}

### リアルタイム入札（RTB）

Web サイトでページロード中に実施される、広告インプレッションを売買するための自動オークション。

{: #remarketing}

### リマーケティング

サイトを訪れたことのあるユーザーに広告を出すこと。 たとえば、カスタム自転車メーカーの広告は、過去にメーカーのサイトで商品ページを閲覧したことがあるユーザーに表示されます。

{: #seller }

### セラー

FLEDGE では、広告オークションを実行する当事者を指します。[SSP](#ssp) であるか、サイト運営者自体である可能性があります。

{: #ssp }

### サプライサイドプラットフォーム、セルサイドプラットフォーム（SSP）

広告枠の販売を自動化するために使用されるアドテクサービス。 SSP を使用すると、サイト運営者は広告枠（広告が表示される空の矩形）を複数のアドエクスチェンジ、DSP、およびネットワークに提供できます。 このため、幅広い潜在的なバイヤーが広告スペースに入札することが可能となります。

{: #trusted-server}

### 信頼できるサーバー

データを提供するために使用されるサーバーですが、技術的保証とポリシーに裏打ちされた、プライバシーを保護するための大きな制限があります。 信頼できるサーバーへのリクエスト（FLEDGE 広告オークションの入札者が広告キャンペーンの残りの予算をチェックするなど）は、イベントレベルのログに記録されないか、他の副作用があります。

{: #key-value}

バイヤーまたはセラーが信頼できるサーバーにリクエストを送信する際、サーバーから必要とするデータを「キー」のリストとして指定します。 信頼されたサーバーは、各キーに対応する値を応答します。

{: #worklet}

### ワークレット

単一の URL から読み込まれ、制限付きで実行される JavaScript の小さなチャンク。 特に、ワークレットは、ネットワーク、ストレージ、Cookie、またはワークレットが実行されている Web ページにアクセスできません。 広告スペースの[バイヤー](#buyer-detail)からの入札ロジック、および広告スペースの[セラー](#seller-detail)が行う広告の望ましさの計算は、セラーが `navigator.runAdAuction()` JavaScript 関数を呼び出すときにワークレットで実行されます。

{% endDetails %}


<br>

{: #engage}

## 貢献とフィードバックの共有

-  **GitHub**: [提案](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)を読み、[質問を投稿したり、ディスカッションに参加したり](https://github.com/WICG/turtledove/issues)できます。
-  **W3C**: [Web 広告事業の改善グループ](https://www.w3.org/community/web-adv/participants)で、業界ユースケースについて議論できます。
-  **開発者サポート**: [プライバシーサンドボックス開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で、質問を投稿したり、ディスカッションに参加したりできます。


## 詳細について

-  [FLEDGE API 開発者ガイド](/blog/fledge-api): API 使用法のリファレンスガイド
-  [FLEDGE デモ](https://fledge-demo.glitch.me): 基本的な FLEDGE デプロイメントのウォークスルー
-  [FLEDGE デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードの動作が説明されており、FLEDGE デバッグに Chrome DevTools を使用する方法が紹介されています。
-  [FLEDGE API Explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
-  [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)
-  [Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)

---

写真提供: [Ray Hennessy](https://unsplash.com/@rayhennessy)（[Unsplash](https://unsplash.com/photos/GL6ORxDMswI)）

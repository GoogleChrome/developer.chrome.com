---
layout: layouts/doc-post.njk
title: Protected Audience API auction reporting
subhead: Protected Audience API のオークション データと結果を測定する
description: Measure Protected Audience API auction data and results
date: 2023-09-26
authors:
  - kevinkiklee
---

この記事では、Protected Audience API のオークション データをサーバーにレポートするために利用できるさまざまなメカニズムの概要と、代替ソリューションの準備ができるまで、現時点で移行中に使用できる移行メカニズムについて説明します。

広告オークションから収集した重要な指標についてレポートするために、Protected Audience API は以下と連携します。

- [プライベート集計](/docs/privacy-sandbox/summary-reports/): オークション シグナルと結果を収集して[要約レポート](/docs/privacy-sandbox/private-aggregation/)を生成します。
- [Fenced Frames](/docs/privacy-sandbox/fenced-frame/) と [iframe](https://developer.mozilla.org/docs/Web/HTML/Element/iframe) に使用する [Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md): Protected Audience API ワークレットと通信するためのフレーム内のチャネルです。API を使用すると、イベント レベルのデータをオークション シグナルに関連付けることができます。Ads Reporting API のイベント レベルのレポートは、よりプライベートなレポート メカニズムが設計されるまでの移行メカニズムです。
- [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/): コンバージョン データをオークション シグナルに関連付けることができます。
- [共有ストレージ](/docs/privacy-sandbox/shared-storage/): クロスオリジン ストレージにオークション シグナルを書き込み、後でプライベート集計を使用してそのデータをレポートすることができます。

{% Aside %}

We recommend you read the documentation on [Private Aggregation](/docs/privacy-sandbox/private-aggregation/), [Fenced Frames](/docs/privacy-sandbox/fenced-frame/), [Shared Storage](/docs/privacy-sandbox/shared-storage/), and [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) before continuing, as core concepts are expanded on in this document.

{% endAside %}

## Protected Audience API レポートの概要

<figure>   {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/R35UFscm9XdMmtco0BYH.png", alt="Protected Audience overall workflow", width="800", height="414" %}   <figcaption>     Protected Audience overall workflow   </figcaption> </figure>

Protected Audience API のオークション フローからのデータをサーバーにレポートできる主な期間は 3 つあります。オークションがサイト運営者サイトから実行されるときのオークション時間、広告がサイト運営者サイトの Fenced Frame または iframe にレンダリングされるときのレンダリング時間、およびユーザーが別のサイトでオークションに起因すると考えられる何らかのアクションを実行したときのコンバージョン時間です。

オークション時間中には、レポートワークレットを使用してオークション データをレポートできます。レンダリング時間中には、iframe または Fenced Frame からエンゲージメント データをレポートできます。コンバージョン時間中には、Attribution Reporting API を使用して、宛先ページからアトリビューション データをレポートできます。

### Reporting locations

オークション内では、買い手は `generateBid()` および `reportWin()` ワークレットで利用可能なシグナルをレポートでき、売り手は `scoreAd()` および `reportResult()` で利用可能なシグナルをレポートできます。オークションの外では、買い手と売り手は、広告をレンダリングしたフレームやコンバージョンが行われたサイトからのデータをレポートできます。

<table style="zoom: 0.8">
  <tr>
   <td style="background-color: #efefef">Time period    </td>
   <td style="background-color: #efefef">Destination    </td>
   <td style="background-color: #efefef">Location    </td>
   <td style="background-color: #efefef; width: 20%;">Data available    </td>
   <td style="background-color: #efefef">Reporting APIs available    </td>
  </tr>
  <tr>
   <td rowspan="4" style="background-color: #d9ead3">Auction    </td>
   <td rowspan="2">Buyer    </td>
   <td>
<code>generateBid()</code>
   </td>
   <td rowspan="4">Signals, auction results, and auction performance    </td>
   <td>Private Aggregation API</td>
  </tr>
  <tr>
   <td>
<code>reportWin()</code>
   </td>
   <td>Private Aggregation API <p> Ads Reporting API    </p>
</td>
  </tr>
  <tr>
   <td rowspan="2">Seller    </td>
   <td>
<code>scoreAd()</code>
   </td>
   <td>Private Aggregation API</td>
  </tr>
  <tr>
   <td>
<code>reportResult()</code>
   </td>
   <td>Private Aggregation API <p> Ads Reporting API    </p>
</td>
  </tr>
  <tr>
   <td style="background-color: #c9daf8">Render    </td>
   <td>Buyer / Seller    </td>
   <td>Frame on the publisher site    </td>
   <td>Event-level data within the ad frame    </td>
   <td>Private Aggregation API  <p> Ads Reporting API    </p>
</td>
  </tr>
  <tr>
   <td style="background-color: #fce5cd">Conversion    </td>
   <td>Buyer / Seller    </td>
   <td>Conversion site    </td>
   <td>Conversion and event-level data from the conversion site    </td>
   <td>Attribution Reporting API <p> Private Aggregation API </p>
<p> Ads Reporting API    </p>
</td>
  </tr>
</table>

リストされているそれぞれの期間中に、買い手と売り手は、オークション シグナル、イベントレベルのデータ、コンバージョン データなどのデータをレポートするために利用できるさまざまなレポート API にアクセスできます。

### Protected Audience API オークション内で利用可能なデータ

The following data are available to be reported from a Protected Audience API worklet during the auction.

#### Signals

*シグナル*は、ワークレット内のバイヤーとセラーが入札の生成、広告のスコアリング、およびオークション結果のレポートを行う上で利用できるオークション コンテキスト データ、ユーザーデータ、リアルタイムデータ、およびブラウザデータです。

<table style="zoom: 0.8">
  <tr>
   <td style="background-color: #f3f3f3">
<strong>Signal</strong>
   </td>
   <td style="background-color: #f3f3f3">
<strong>説明</strong>
   </td>
   <td style="background-color: #f3f3f3">
<strong>Set location</strong>
   </td>
   <td style="background-color: #f3f3f3">
<strong>ユーザー</strong>
   </td>
   <td style="background-color: #f3f3f3">
<strong>提供</strong>
   </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>auctionSignals</strong>
   </td>
   <td>オークションが行われる場所のコンテキストで利用可能なデータ。このデータには、ページコンテンツ情報、ファーストパーティ ユーザーデータなどが含まれる場合があります。</td>
   <td>オークション構成に、サイト運営者サイトの売り手が設定します。</td>
   <td>買い手 <p> 売り手</p>
</td>
   <td>generateBid scoreAd reportWin reportResult    </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>directFromSellerSignals</strong>
   </td>
   <td>
<code>auctionSignals</code>、<code>perBuyerSignals</code>、<code>sellerSignals</code> のデータと同じですが、シグナルは指定された売り手から送信されることが保証されています。</td>
   <td>売り手の HTTP レスポンス ヘッダーを介して設定されます。</td>
   <td>買い手 <p> 売り手</p>
</td>
   <td>generateBid scoreAd reportWin reportResult    </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>browserSignals</strong>
   </td>
   <td>Various data provided by the browser (<code>topWindowHostname</code>, <code>interestGroupOwner</code>, <code>renderUrl</code>, <code>adComponents</code>, <code>biddingDurationMsec</code>, <code>IGJoinCount</code>, <code>IGRecency</code>, <code>modelingSignals</code>).    </td>
   <td>Set by the browser.    </td>
   <td>買い手 <p> 売り手</p>
</td>
   <td>generateBid scoreAd reportWin reportResult    </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>sellerSignals</strong>
   </td>
   <td>広告スコアリングの目的で売り手に提供されるシグナル。</td>
   <td>オークション構成に、サイト運営者サイトの売り手が設定します。</td>
   <td>売り手</td>
   <td>scoreAd <p> reportWin </p>
<p> reportResult    </p>
</td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>trustedScoringSignals</strong>
   </td>
   <td>広告スコアリングの目的で売り手に提供されるリアルタイム シグナル。</td>
   <td>URL は、オークション構成に、サイト運営者サイトの売り手によって設定されます。</td>
   <td>売り手</td>
   <td>scoreAd reportResult    </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>perBuyerSignals</strong>
   </td>
   <td>特定の買い手に提供されるオークション コンテキスト データ。売り手は、オークションが開始する前に買い手の値を取得できます。これは広告機会に関する買い手の知識です。</td>
   <td>オークション構成に、サイト運営者サイトの売り手が設定します。</td>
   <td>買い手</td>
   <td>generateBid scoreAd reportWin reportResult    </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>trustedBiddingSignals</strong>
   </td>
   <td>広告入札の目的で買い手に提供されるリアルタイム シグナル。</td>
   <td>URL は、インタレスト グループの設定時に広告主サイトの買い手が設定します。</td>
   <td>買い手</td>
   <td>generateBid    </td>
  </tr>
  <tr>
   <td style="background-color: null">
<strong>userBiddingSignals</strong>
   </td>
   <td>買い手が提供するユーザーデータ。</td>
   <td>インタレスト グループの設定時に広告主サイトの買い手が設定します。</td>
   <td>買い手</td>
   <td>generateBid    </td>
  </tr>
</table>

[オークション構成](/docs/privacy-sandbox/protected-audience-api/ad-auction/#auctionconfig-properties)オブジェクトは、ワークレットでシグナルとして使用できるようにするために提供されるデータの主なソースです。サイト運営者と売り手はオークション構成でコンテキスト データとファーストパーティ データを提供でき、これらのシグナルは、買い手からのインタレスト グループデータ、広告レンダリング フレームからのイベントレベル データ、およびクリックスルー ページからのアトリビューション データで強化されます。レポートされたデータは、買い手/売り手のレポート、請求、予算編成、ML モデルのトレーニングなどに使用できます。

#### Other available data

- *Results data* that relates to auction win and loss data such as winning bid price and bid rejection reason.
- *パフォーマンス データ*: 入札ワークレットの取得と実行にかかった時間などの遅延情報を含むデータ。

### Data available outside a Protected Audience API auction

Outside of a Protected Audience API auction, there are two time periods where data is available to be reported.

広告がサイト運営者サイトでレンダリングされるレンダリング時間中には、iframe または Fenced Frame 内のイベントレベルのデータを Protected Audience API のオークション データに関連付けて、サーバーにレポートできます。イベントレベルのデータの例には、広告のインプレッション、クリックスルー、ホバー、およびフレーム内で発生するその他のイベントが含まれます。

ユーザーがオークションに起因するクリックスルー ページで何らかのアクションを実行するコンバージョン時間中には、コンバージョン ページからのイベントレベル データを Protected Audience API のオークション データに関連付けて、サーバーにレポートできます。

## イベントレベル レポート

イベントレベル レポートは、1 つ以上のイベントからの詳細情報をレポートします。イベントには、オークションの落札、広告インプレッション、またはコンバージョンが含まれます。[少なくとも 2026 年まで](/docs/privacy-sandbox/protected-audience-api/feature-status/)は、イベントレベルのオークション落札レポートは維持され、Protected Audience 広告のレンダリングには Fenced Frame は不要となり、イベントレベル レポートには制約のないネットワーク アクセスを持つ iframe を使用できます。また、[Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) は Fenced Frame と iframe で利用でき、オークション データとコンバージョン データをフレームのイベントレベルのデータに関連付けることができます。これは、システムを Protected Audience に移行する間、エコシステムの移行が容易になるように少なくとも 2026 年までは既存のレポート インフラストラクチャを引き続き使用できるように設計されています。

### Event-level auction win reporting with `sendReportTo()`

Protected Audience オークション内のイベントレベルのデータをレポートするために利用できるメカニズムは、オークション落札時の <code>[sendReportTo() 関数]（https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#reporting）</code>です。この関数はバイヤーおよびセラーのレポートワークレットで使用でき、ブラウザは広告レンダリングの開始時に指定された URL 文字列に対して <code>GET</code> リクエストを行います。ワークレットで使用可能な任意のシグナルを URL のクエリ パラメーターとしてエンコードできます。

たとえば、買い手は請求目的で、`reportWin()` ワークレットから落札額をレポートできます。

```js
// Buyer reporting worklet
function reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals, directFromSellerSignals) {
  sendReportTo(`https://buyer-reporting-server.example/reporting?bid=${browserSignals.bid}`);
}
```

`sendReportTo()` 関数を使用すると、`reportResult()` から呼び出された場合には売り手の落札レポートを生成し、`reportWin()` から呼び出された場合には買い手の落札レポートを生成できます。`sendReportTo()` 関数は[少なくとも 2026 年まで利用可能](/docs/privacy-sandbox/protected-audience-api/feature-status/#event-level-auction-win-reporting)です。

### エンゲージメント レポート

*エンゲージメント レポート*には、広告をレンダリングした Protected Audience API オークションの*シグナル*に関連付けられたインプレッション データやクリックデータなど、広告クリエイティブからのイベントレベルのデータが含まれます。広告はオークション終了後に表示されるため、広告を表示するフレーム内ではオークション シグナルを利用できません。異なる期間のこれらのデータを関連付けるために、エンゲージメント レポートを生成するための移行メカニズムが  2 つ提供されています。

上で説明した `sendReportTo()` 関数を使用すると、オークション データを iframe からのイベントレベル データに関連付けることができますが、Fenced Frame では機能しません。これは、エンベッダーと Fenced Frame 間の通信が制約されているため、エンベッダーから一意の ID を渡すことができないためです。オークション データを Fenced Frame の広告からのイベントレベル データに関連付けるには、[Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) を使用できます。

#### Ads Reporting API for fenced frames and iframes

Fenced Frame と iframe 用の [Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) は、広告フレームからのユーザーイベントレベル データを、Protected Audience オークション内のシグナルに関連付けるメカニズムを提供します。

Protected Audience API レポート ワークレットでは、<code>[registerAdBeacon()](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#registeradbeacon)</code> 関数を使用して広告ビーコンを登録し、シグナルをクエリ パラメーターとして設定します。次に、ユーザーレベル データペイロードで <code>[window.fence.reportEvent()](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent)</code> 関数を呼び出すことで、Fenced Frame からイベントをトリガーします。

In the following example, a campaign ID is associated with an event-level payload that the click coordinates:

```js
// Protected Audience API worklet
function generateBid(interestGroup) {
  const { campaignId } = interestGroup.ads.metadata;
  registerAdBeacon({
    click: `https://your-server.example/report/click?campaignId=${campaignId}`
  })
}
```

```js
// Ad frame
window.fence.reportEvent({
  'eventType': 'click',
  'eventData': JSON.stringify({'clickX': '123', 'clickY': '456'}),
  'destination':['buyer', 'seller']
});
```

The Fenced Frames Ads Reporting API will also be available until at least 2026 for [the same reasons as win reporting](/docs/privacy-sandbox/protected-audience-api/feature-status/#event-level-auction-win-reporting).

For a deeper dive, see the [explainer](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md).

#### 制約のないネットワークアクセス

Fenced Frame を使用すると、iframe と同じ方法でネットワーク リソースを読み込むことができ、Fenced Frame 内のイベントレベル データをサーバーに送信できます。Fenced Frame からのイベントレベル データを、上記の[オークション イベントレベルのレポートメカニズム](#event-level-auction-win-reporting-with-sendreportto)のセクションで説明した `sendReportTo()` で送信されたオークションデータに関連付けることにより、後でサーバー側でイベントレベル レポートを生成できます。

Network access will be constrained sometime after third-party cookie deprecation.

現在、Protected Audience API に存在するイベントレベル レポートのメカニズムは移行メカニズムであり、既存のユースケースをより適切にサポートするための代替ソリューションが設計される予定です。

### アトリビューション レポート

*アトリビューション レポート*では、ウェブサイト上のコンバージョンを Protected Audience API オークションから選択された広告に関連付けることができます。たとえば、配信した商品広告をユーザーがクリックすると広告主のサイトにリダイレクトされますが、そこで購入が発生した場合に、その購入が表示された広告に起因するものであるかどうかを知りたいことがあります。[Attribution Reporting API](https://github.com/WICG/attribution-reporting-api/tree/main) は Protected Audience API と統合されて、サイト運営者サイトからのオークション データと広告主サイトからのコンバージョン データが組み合わされるようになります。

より永続的なソリューションを設計してはいますが、アトリビューション レポートを使用してイベント レベルの集計可能なレポートを生成するための移行メカニズムとして、Fenced Frame の [Ads Reporting API](#ads-reporting-api-for-fenced-frames-and-iframes) を使用できます。これらのレポートはコンバージョンを測定するためのものであり、オークションや広告フレームから生成されるイベントレベルの集計可能なエンゲージメント レポートとは異なることに注意してください。より永続的なソリューションの準備ができ次第、Explainer を公開します。

#### 移行メカニズム

広告ビーコンを登録する際に、キーワード `reserved.top_navigation` を使用できます。これにより、ビーコンの `Attribution-Reporting-Eligible` ヘッダーが自動的に追加され、[アトリビューション ソースとして登録できる](https://github.com/WICG/attribution-reporting-api/blob/main/EVENT.md#registering-attribution-sources)ようになります。

```js
registerAdBeacon({
 'reserved.top_navigation': 'https://adtech.example/click?buyer_event_id=123',
});
```

登録したビーコンにイベントレベルのデータを接続するには、イベント ペイロードで Fenced Frame から <code>[setReportEventDataForAutomaticBeacons()](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#api-to-populate-event-data-for-reservedtop_navigation)</code> を呼び出します。

```js
window.fence.setReportEventDataForAutomaticBeacons({
  eventType: 'reserved.top_navigation',
  eventData: 'data from the frame',
  destination:['seller', 'buyer']
})
```

See the [Attribution Reporting section of the Ads Reporting API explainer](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#support-for-attribution-reporting) to learn more.

### エンゲージメントおよびコンバージョン レポートの例

この例では、オークション、広告フレーム、コンバージョンサイトのデータを関連付けることに関心がある買い手の視点から見てみましょう。

このワークフローでは、買い手が売り手と調整して、一意の ID をオークションに送信します。オークション中に、買い手はこの一意の ID をオークションデータとともに送信します。レンダリング時とコンバージョン時には、Fenced Frame または iframe からのデータも同じ一意の ID で送信されます。後で、その一意の ID を使用してこれらのレポートを関連付けることができます。

ワークフロー:

1. オークションが開始される前に、買い手はプログラムによる[リアルタイム入札（RTB」）入札レスポンス](https://github.com/google/ads-privacy/tree/master/proposals/fledge-rtb)の一部として、一意の ID を売り手に送信します。この ID は、`auctionId` のような変数として設定できます。ID は `auctionConfig` の `perBuyerSignals` として渡され、買い手のワークレットで使用できるようになります。
2. オークション時間中、買い手は広告レンダリング時間とコンバージョン時間中にトリガーされる広告ビーコンを登録できます（`registerAdBeacon()`）。
    1. 広告フレームイベントのオークションシグナルを関連付けるには、`auctionId` をビーコン URL のクエリ パラメーターとして設定します。
    2. コンバージョン イベントのオークション シグナルを関連付けるには、ビーコン URL に `auctionId` を設定します。
3. 広告レンダリング時間中、オークション時間中に登録したビーコンをトリガーしたりイベントレベルのデータで強化したりできます。<br> 3. `reportEvent()` でフレームイベントをトリガーし、イベントレベル データを渡します。4. `setReportEventDataForAutomaticBeacons()` を使用して、イベントレベルのペイロードをアトリビューション ビーコンに追加します。5. `Attribution-Reporting-Register-Source` ヘッダーを使用して広告ビーコン リクエストに応答することで、Attribution Reporting API で広告を登録します。
4. During conversion time, you can trigger the source you registered during auction time.

上記のプロセスが終わると、買い手はオークション レポート、エンゲージメント レポート、コンバージョン レポートを取得します。これらはすべて、相互に関連付けるために使用できる単一の一意のキーによって結び付けられています。

アトリビューション データにアクセスする必要がある場合、同様のワークフローが売り手に適用され、売り手も一意の ID を使用して `registerAdBeacon()` で送信することができます。フレームからの `reportEvent()` 呼び出しには、買い手と売り手の両方にレポートを送信するために使用できる宛先プロパティが含まれています。トリガーがソースに関連付けられるには、ランディング ページにも SSP が存在する必要があることに注意してください。

## Aggregating Protected Audience data

The Private Aggregation API is the mechanism used to report Protected Audience data to generate a [summary report](/docs/privacy-sandbox/summary-reports/), which is a noisy, aggregated report of data collected in buckets. A bucket is represented by an aggregation key, and some information can be encoded into the key.

たとえば、ある広告インプレッション イベントは、それぞれに異なる広告キャンペーンを表す様々なバケットにカウントすることができます。イベントレベル レポートと異なるのは、要約レポートが個々のイベントに関する情報を明らかにしないという点です。イベントレベル レポートを使用すると、ユーザー A、B、C がキャンペーン 123 を閲覧したことを確認できますが、要約レポートの場合は、キャンペーン 123 を閲覧したユーザーの数を測定でき、[ノイズの追加](/docs/privacy-sandbox/aggregation-service/#noise-scale)によって、ユーザーのプライバシーが保護されています。

See the [Private Aggregation](/docs/privacy-sandbox/private-aggregation/) article for more on the API.

### Aggregating auction signals

プライベート集計を使用して、ワークレット内で使用可能なシグナルをサーバーに集計できます。シグナル集約の場合、買い手の入札ワークレット、売り手のスコアリング ワークレット、および買い手/売り手レポート ワークレットで使用できる <code>[privateAggregation.contributeToHistogram()](/docs/privacy-sandbox/private-aggregation/#sendhistogramreport)</code> メソッドを使用できます。

この例では、落札入札はインタレスト グループ オーナーのバケットに集計されます。

```js
function convertBuyerToBucket(igOwner) {}
function convertWinningBidToValue(winningBid) {}

function reportResult(auctionConfig, browserSignals) {
  privateAggregation.contributeToHistogram({
    bucket: convertBuyerToBucket(browserSignals.interestGroupOwner),
    value: convertWinningBidToValue(browserSignals.bid)
  });
}
```

これは、集計するシグナルがイベントレベル データに関連付けられておらず、オークション外のイベントによってトリガーされない場合に使用する一般的なメカニズムです。オークション シグナルのレポートの詳細については、[Explainer](https://github.com/patcg-individual-drafts/private-aggregation-api) をご覧ください。

### Aggregating auction signals with event data

You can aggregate auction signals with limited information about an event that occurs in an ad frame. For example, you can aggregately measure how many clicks an ad for a campaign has received by creating a bucket that represents that campaign and the click event. Note that, from the ad frame, you can specify what event has occurred, but you cannot attach an event-level payload.

To aggregate auction signals by events, you can use `privateAggregation.contributeToHistogramOnEvent(eventType, contribution)` that takes a string that specifies the event type and the contribution to be reported when that event is triggered. You can call the method with a custom event type, then, call `window.fence.reportEvent(eventType)` from the ad frame to trigger the report to be submitted.

Let’s say you want to measure how many clicks an ad for a campaign has received.

```js
// Protected Audience API worklet
function getClickReportBucketForCampaign(campaignId) {
  // return a bucket for the campaign ID and the click event
}

function generateBid(interestGroup) {
  privateAggregation.contributeToHistogramOnEvent('click', {
    bucket: getClickReportBucketForCampaign(interestGroup.ads.metadata.campaignId),
    value: 1
  });
}
```

In the bid generation function, you can define a bucket as the combination of the campaign ID and the click event, then increase the value for that bucket by 1 every time the event is triggered.

```js
// Ad frame
window.fence.reportEvent('click');
```

Then, at a later time, from the ad frame, you can trigger the report submission by calling `reportEvent(eventType)`:

Learn more about triggering Private Aggregation contributions from a frame from the [explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md#triggering-reports).

### オークション結果とパフォーマンスのレポート

You can also aggregate auction results when triggered by an auction win or loss event with `contributeToHistogramOnEvent(eventType, contribution)` when you pass in a reserved event type keywords (`reserved.win, reserved.loss`, and `reserved.always`).

Private Aggregation provides [a list of base values](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md#reporting-api-informal-specification) you can calculate the bucket and value of your contribution from. The available base values for auction results are the bid value of the winning ad, the bid value that was scored as second highest, and the reason a bid was rejected from the auction.

When some base value is provided, like the winning bid amount, you can set how much to add or subtract from that value, then report the final value. For example, if the winning bid of $5 is provided as the base value, you can subtract your bid of $2 to calculate the actual value of $3 of how much you lost your auction by.

#### オークション結果レポート

Let’s look at an example where you have lost an auction, and you want to learn how far off your bid was from the auction clearing price.

To learn how much you lost the auction by, you can subtract your bid price from the winning bid price:

```js
function generateBid() {
  const bid = calculateBidAmount();

  privateAggregation.contributeToHistogramOnEvent('reserved.loss', {
    bucket: getBucketForCampaign(interestGroup.ads.metadata.campaignId),
    value: {
      baseValue: 'winning-bid',
      scale: 1 // Scale the value to minimize noise-to-signal ratio
      offset: -bid, // Numbers added to browser value after scaling
    }
  });
}
```

When the report is submitted, the actual reported value will be the scaled `baseValue` shifted by the `offset` value. To learn more, see the [explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md).

#### パフォーマンスレポート

買い手と売り手は、スクリプトの実行にかかった時間と、信頼できるシグナルを取得するのににかかった時間をレポートできます。売り手は、買い手の許可を得て、各買い手の入札生成時間と信頼できる入札シグナル時間を収集できます。

See the [explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md#reporting-per-buyer-latency-and-statistics-to-the-seller) to learn more.

## 共有ストレージでのオークション シグナルの保存

[Shared storage](/docs/privacy-sandbox/shared-storage/) is an unpartitioned and cross-origin storage that you can write freely into, but is guarded with gates when reading and processing the stored values. One of the available gates for the Shared Storage API is Private Aggregation. You can only read the values in shared storage from inside a worklet, and you can report those values using Private Aggregation from the worklet.

You can also write to shared storage from Protected Audience API bidding, scoring, and reporting worklets. At a later point in time, you can report those values in shared storage to your server using Private Aggregation . You can also use the stored values for the [URL Selection](https://github.com/WICG/shared-storage#url-selection) operation.

Protected Audience API ワークレットから、任意のキーと値を共有ストレージに書き込むことができます。

```js
// Protected Audience API worklet
function generateBid() {
  sharedStorage.set('test-bucket', 123);
}
```

At a later time, you can load a shared storage worklet to read and send that value out with Private Aggregation:

```js
// Shared Storage worklet
class SendReachReport{
  async run() {
    const testBucket = await this.sharedStorage.get('test-bucket');

    privateAggregation.contributeToHistogram({
      bucket: testBucket,
      value: 1
    });
  }
}

register('send-report', SendReachReport);
```

To learn more about Shared Storage, see the shared storage section of the Protected Audience API reporting developer guide, [explainer](https://github.com/WICG/shared-storage), [live demo](https://shared-storage-demo.web.app/), and the [demo code on GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo).

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

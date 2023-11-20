---
layout: layouts/doc-post.njk
title: '売り手向けガイド: 広告オークションを実行する'
subhead: Protected Audience API 広告オークションの売り手向け API ガイドとリファレンス。
description: Protected Audience API 広告オークションの売り手向け API ガイドとリファレンス。
date: 2022-11-01
updated: 2023-09-18
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

この記事では、実験的な Protected Audience API の現在のイテレーションで使用されている、広告オークションの技術リファレンスを紹介します。

Protected Audience API のライフサイクル全体については[開発者ガイド](/docs/privacy-sandbox/protected-audience-api)を参照し、[売り手によるオンデバイス オークションの実行方法](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)の詳細なディスカッションについては Protected Audience API の Explainer をご覧ください。

開発者でない方は、[Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をご覧ください。

## Protected Audience API 広告オークションとは？

Protected Audience API 広告オークションは、広告を選択するためにブラウザがユーザーのデバイス上で実行する小さな JavaScript プログラムの集合体を指します。プライバシーを保護する目的で、売り手と買い手からのすべての広告オークション コードは、外部と通信できない分離された JavaScript [ワークレット](/docs/privacy-sandbox/glossary/#worklet)で実行されます。

{: #auction-diagram}

<figure class="w-figure">
  {% Img
    src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png",
    alt="Protected Audience API 広告オークションの 6 つのステージ",
    width="800", height="481"
    %}
    <figcaption>この図は、Protected Audience API 広告オークションの各段階の概要を示しています。 <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
title="View a larger version of image." target="_blank">拡大版を表示</a>.</figcaption>
</figure>

1. ユーザーが広告を表示するサイトにアクセスします。
2. 売り手のコードは `navigator.runAdAuction()` を実行します。これにより、どの広告スペースが販売され、誰が入札できるかが指定されます。売り手は、 `scoreAd()` という各入札をスコアリングするスクリプトも含める必要があります。
{% Aside %}
オークションが開始される前に、売り手は利用可能な広告スロットに最適なコンテキスト広告を見つけます。
{% endAside %}
3. 招待された買い手のコードが実行され、入札、関連する広告クリエイティブの URL、およびその他のデータが生成されます。入札スクリプトは、買い手の [Key/Value サービス](/docs/privacy-sandbox/protected-audience#key-value-service-detail) から、残りの広告キャンペーン予算などのリアルタイム データをクエリできます。
4. 売り手のコードが各入札をスコアリングし、落札者を選択します。このロジックでは、入札値と入札の望ましさを返す他のデータを使用します。コンテキストの落札者に勝てない広告は拒否されます。売り手は、リアルタイム データに独自の[Key/Value サービス](/docs/privacy-sandbox/protected-audience#key-value-service-detail) を使用できます。
5. 落札した広告は opaque 値として返され、Fenced Frame<br> に表示されます。売り手とサイト運営者のいずれもこの値を閲覧できなくなります。
6. オークションは、売り手と落札した買い手に報告されます。
{% Aside %}
売り手 `reportResult()` と買い手の `reportWin()` には、`sendReportTo()` の呼び出しを含めることができます。これは、[プライベート集計](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now) で集計レポートが利用可能になるまで、[一時的](/docs/privacy-sandbox/private-aggregation) に利用できます。
{% endAside %}

### オークションが行われるタイミング

Protected Audience API は、単独で実行することも、プログラマティック オークションを使用して実行することもできます。複数の売り手によるプログラマティック オークションの場合:

1. ユーザーが参加サイトにアクセスします。
2. 利用可能な広告スロットのコンテキスト広告を見つけるために別の売り手によってプログラマティック オークションが実行されます。
3. Protected Audience API オークションが実行されます。
4. `scoreAd()` が買い手の入札を最初のオークションの結果と比較します。

コンテキストの落札者に勝てない入札は拒否されます。

### Protected Audience API 広告オークションの実行者

複数の関係者が広告スペースを販売するためのオークションを実行します。

たとえば、以下のような例があります。

- **コンテンツサイト運営者**: 自らのウェブサイト上で広告コンテンツをホストします。
- **[サプライサイド プラットフォーム（SSP）](/docs/privacy-sandbox/glossary/#ssp)**: サイト運営者と協力し、その他のサービスを提供します。
- **サードパーティ スクリプト**: サイト運営者に代わって、広告オークションへの参加を可能にします。

Protected Audience API では、売り手には次の 3 つのジョブがあります。

- サイト運営者ルールの実施: どの買い手とどの入札が対象であるか。
- オークション ロジックの実行: JavaScript を[ワークレット](/docs/privacy-sandbox/glossary/#worklet)で実行して、各入札の望ましさのスコアを計算します。
- オークション結果の報告。

これらのジョブは、売り手が JavaScript 関数`navigator.runAdAuction()` を呼び出して広告オークションを開始するときに提供するプログラムで実行されます。

## API 関数

### `runAdAuction()`

売り手は、`navigator.runAdAuction()` を呼び出して、ユーザーのブラウザに広告オークションを開始するよう要求します。

たとえば、以下のような例があります。

```javascript
const auctionConfig = {
  seller: 'https://ssp.example',
  decisionLogicUrl: ...,
  trustedScoringSignalsUrl: ...,
  interestGroupBuyers: ['https://dsp.example', 'https://buyer2.example', ...],
  auctionSignals: {...},
  sellerSignals: {...},
  sellerTimeout: 100,
  perBuyerSignals: {
    'https://dsp.example': {...},
    'https://another-buyer.example': {...},
    ...
  },
  perBuyerTimeouts: {
    'https://dsp.example': 50,
    'https://another-buyer.example': 200,
    '*': 150,
    ...
  },
  componentAuctions: [
    {
      'seller': 'https://some-other-ssp.example',
      'decisionLogicUrl': ...,
      ...
    },
    ...
  ]
};

try {
  const auctionResultPromise = navigator.runAdAuction(auctionConfig);
} catch (error) {
  // Handle error.
}
```

`runAdAuction()` は、広告オークションの結果を表す [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns)（`urn:uuid:<something>`）に解決される promise を返します。これは、レンダリングのために [Fenced Frame](/docs/privacy-sandbox/fenced-frame/) に渡された場合にのみ、ブラウザによってデコードできます。したがってサイト運営者のページは、落札した広告を検査できません。

{% Aside %} [`joinAdInterestGroup()`](/blog/fledge-api/#joinadinterestgroup)を使用してスクリプトのオリジンは、インタレスト グループのオーナーのオリジンと一致する必要があるため、`joinAdInterestGroup()` は、インタレスト グループのオーナーのオリジンと現在のドキュメントのオリジンが一致しない限り（たとえば、独自のインタレスト グループを持つウェブサイト）、iframe から呼び出す必要があります。

[`runAdAuction`](/blog/fledge-api/#ad-auction) には同じ要件がないため、`<script>` タグを使用すると、おそらくクロスオリジン iframe よりもはるかにパフォーマンスが向上します。{% endAside %}

`decisionLogicUrl` スクリプトは、関連する入札とメタデータとともに個々の広告を 1 つずつ検討し、数値的な望ましさスコアを割り当てます。

#### `auctionConfig` のプロパティ

{% Aside %} `additionalBids` は、Protected Audience API の現在の実装ではサポートされていません。詳細については、Protected Audience API の Explainer の[オークション参加者](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#22-auction-participants)セクションをご覧ください。
{% endAside %}

<dl>
    <dt><code>seller</code></dt>
        <dd>必須</dd>
        <dd>例: <code>'https://ssp.example'</code></dd>
        <dd>役割: 売り手のオリジン</dd>
    <dt><code>decisionLogicUrl</code></dt>
        <dd>必須</dd>
        <dd>例: <code>'https://ssp.example/auction-decision-logic.js'</code></dd>
        <dd>役割: オークション ワークレット JavaScript の URL。</dd>
    <dt><code>trustedScoringSignalsUrl</code></dt>
        <dd>オプション</dd>
        <dd>例: <code>'https://ssp.example/scoring-signals'</code></dd>
        <dd>役割: 売り手の信頼できるサーバーの URL。</dd>
    <dt><code>interestGroupBuyers</code></dt>
        <dd>必須</dd>
        <dd>例: <code>['https://dsp.example', 'https://buyer2.example', ...]</code></dd>
        <dd>役割: オークションへの入札を依頼されたすべてのインタレスト グループのオーナーのオリジン。</dd>
        <dd>注意: 売り手は、<code>interestGroupBuyers:</code> を指定することで、すべてのインタレスト グループが入札できるようにすることができます。すると、インタレスト グループのオーナーが含まれていること以外の基準に基づいて、広告が承認または拒否されます。たとえば、売り手は広告クリエイティブをレビューして、ポリシーへの準拠を確認することができます。</dd>
    <dt><code>auctionSignals</code></dt>
        <dd>オプション</dd>
        <dd>例: <code>{...}</code></dd>
        <dd>役割: ページのコンテキスト、オークションの種類などに関する売り手情報。</dd>
    <dt><code>sellerSignals</code></dt>
        <dd>オプション</dd>
        <dd>例: <code>{...}</code></dd>
        <dd>役割: サイト運営者の設定に基づく情報、コンテキスト広告リクエストの発行など。</dd>
     <dt><code>sellerTimeout</code></dt>
        <dd>オプション</dd>
        <dd>例: <code>100</code></dd>
        <dd>役割: 売り手の <code>scoreAd()</code> スクリプトの最大実行時間（ミリ秒）。</dd>
    <dt><code>perBuyerSignals</code></dt>
        <dd>オプション</dd>
        <dd>例：
        <pre> {'https://dsp.example': {...}, 'https://another-buyer.example': {...}, ... }</pre></dd>
        <dd>役割: 特定の買い手ごとのページに関する、それぞれのサーバーから得るコンテキスト シグナル。</dd>
    <dt><code>perBuyerTimeouts</code></dt>
        <dd>オプション</dd>
        <dd>例: <code>50</code></dd>
        <dd>役割: 特定の買い手の <code>generateBid()</code> スクリプトの最大実行時間（ミリ秒）。</dd>
    <dt><code>componentAuctions</code></dt>
        <dd>オプション</dd>
        <dd>例:
        <pre>[{'seller': 'https://www.some-other-ssp.com', 'decisionLogicUrl': ..., ...}, ...]</pre></dd>
        <dd>役割: <a href="/blog/fledge-api/#:~:text=componentauctions">コンポーネント オークション</a>の追加構成。</dd>
    </dl><br>
<p>

### `decisionLogicUrl`

`decisionLogicUrl` は `runAdAuction()` に渡されるオークション構成オブジェクトのプロパティです。この URL には [`scoreAd()`](#scoread) 関数が含まれている必要があります。このロジックは、広告の望ましさを判断するために、広告ごとに 1 回実行されます。

```javascript
scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  ...
  return desirabilityScoreForThisAd;
}
```

#### `browserSignals`

`browserSignals` はブラウザが認識し、売り手のオークション スクリプトが検証する可能性のある情報を含む、ブラウザによって構築されるオブジェクトです。

```javascript
{
  topWindowHostname: 'publisher.example',
  interestGroupOwner: 'https://dsp.example',
  renderUrl: 'https://cdn.example/render',
  adComponents: ['https://cdn.com/ad-component-1', ...],
  biddingDurationMsec: 12,
  dataVersion: 1 /* DValue from the seller's Key/Value service response. */
}
```

オークションが始まる前に、売り手は利用可能な広告スロットに最適なコンテキスト広告を見つけます。その `scoreAd()` ロジックには、コンテキストの落札者に勝てない広告を拒否するロジックが含まれます。

### `scoreAd()` {: #scoread }

`scoreAd()` は次の引数を取ります。

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">引数</th>
        <th style="font-weight: bold; text-align: left;">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>adMetadata</code></td>
        <td style="vertical-align: top;">買い手によって提供される任意のメタデータ。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionConfig</code></td>
        <td style="vertical-align: top;">
<code>navigator.runAdAuction()</code>に渡されるオークション構成オブジェクト。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>bid</code></td>
        <td style="vertical-align: top;">数値的な入札値。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedScoringSignals</code></td>
        <td style="vertical-align: top;">オークション時に売り手の信頼できるサーバーから取得された値で、広告に対する売り手の意見を表します。</td>
      </tr>
    </tbody>
  </table>
</div>

## よくある質問

{% Details %} {% DetailsSummary %}

### オークションの落札者はどのように決まり、誰が選ぶのですか？

{% endDetailsSummary %} 売り手は各広告の望ましさスコアを決定するためのスコアリング ロジックを提供し、ブラウザは最も高いスコアを落札広告として選択します。

売り手は、`scoreAd()` 関数にロジックを組み込み、ブラウザは、外部のコードとの通信が制限されているワークレット内で関数を実行します。ブラウザ自体は広告をスコアリングしません。スコアリング ロジックを実行して最高スコアの入札を選択するタスクは、ブラウザに排他的に当てられています。{% endDetails %}

## すべての Protected Audience API リファレンス

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

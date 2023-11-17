---
layout: layouts/doc-post.njk
title: Protected Audience API オークション結果のレポート
subhead: Protected Audience API オークション レポートを生成するための売り手および買い手向けガイド。
description: Protected Audience API オークション レポートを生成するための売り手および買い手向けガイド。
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

この記事は、実験的な Protected Audience API の現在のイテレーションで使用される、Protected Audience API オークションの落札に関するレポートを生成するための技術リファレンスです。

Protected Audience API のライフサイクル全体については[開発者ガイド](/docs/privacy-sandbox/protected-audience-api)を参照し、[イベント レベルのレポート（暫定）](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)の詳細なディスカッションについては Protected Audience API の Explainer をご覧ください。

開発者でない方は、[Protected Audience API の API の概要](/docs/privacy-sandbox/protected-audience)をご覧ください。

## Protected Audience API がレポートする内容

Protected Audience API レポートには 2 種類あります。

- **売り手レポート**: 広告オークションの落札者を売り手に通知します。
- **買い手レポート**: 落札した買い手のみが利用でき、オークションで落札したことを知ることができます。

長期的には、[Private Aggreagation API](/docs/privacy-sandbox/private-aggregation) を使用して、ブラウザが売り手と買い手のオークション結果をレポートできるようにすることを計画しています。暫定的なイベントレベルのレポートの仕組みとして、売り手用に `reportResult()` を実装し、落札者用に `reportWin()` を実装するコードは、`sendReportTo()` 関数を呼び出すことができます。これはオークションの完了後に取得される URL を表す文字列を引数として取ります。これにより、レポートされるイベントレベルの情報が暗号化されます。

## API 関数

### セラー: `reportResult()`

{% Aside %} **Protected Audience API の Explainer**: [Seller reporting on Render](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#51-seller-reporting-on-render) をご覧ください。{% endAside %}

`decisionLogicUrl` で提供される売り手の JavaScript（`scoreAd()` も提供）には、オークションの結果を報告するための `reportResult()` 関数を含めることができます。

```javascript
reportResult(auctionConfig, browserSignals) {
  ...
  return signalsForWinner;
}
```

この関数には以下の引数が渡されます。

#### `auctionConfig`

`navigator.runAdAuction()` に渡されるオークション構成オブジェクト。

#### `browserSignals`

オークションに関する情報を提供するブラウザによって作成されるオブジェクト。以下に例を示します。

```javascript
  {
    'topWindowHostname': 'publisher.example',
    'interestGroupOwner': 'https://dsp.example',
    'renderUrl': 'https://cdn.example/url-of-winning-creative.wbn',
    'bid': <bidValue>,
    'desirability': <winningAdScore>
  }
```

この関数の戻り値は、落札者の `reportWin()` 関数の `sellerSignals` 引数として使用されます。

### 買い手: `reportWin()`

{% Aside %} **Protected Audience API の Explainer**: [Buyer reporting on render and ad events](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#52-buyer-reporting-on-render-and-ad-events) をご覧ください。{% endAside %}

落札者の JavaScript（`generateBid()` も提供）には、オークションの結果を報告するための `reportWin()` 関数を含めることができます。

```javascript
reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  ...
}
```

{% Aside %}

Chrome の Protected Audience API の現在の実装では、`reportWin()` が定義されていない場合に警告が表示されます。

{% endAside %}

この関数には以下の引数が渡されます。

#### `auctionSignals` と `perBuyerSignals`

同じ値が落札者の [`generateBid()`](#generatebid) に渡されます。

#### `sellerSignals`

[`reportResult()`](#reportresult) の戻り値。これにより、買い手に情報を渡す機会が売り手に与えられます。

#### `browserSignals`

オークションに関する情報を提供するブラウザによって作成されるオブジェクト。以下に例を示します。

```javascript
{
  'topWindowHostname': 'publisher.example',
  'seller': 'https://ssp.example',
  'interestGroupOwner': 'https://dsp.example',
  'interestGroupName': 'custom-bikes',
  'renderUrl': 'https://cdn.example/winning-creative.wbn',
  'bid': <bidValue>
}
```

## 一時的なレポートの実装 {: #temporary-reporting}

Chrome では、暫定的に 2 つの方法でオークションの勝敗をレポートできます。

- `forDebuggingOnly.reportAdAuctionLoss()`
- `forDebuggingOnly.reportAdAuctionWin()`

これらのメソッドはそれぞれ、オークションの完了後に取得する URL を引数として取ります。`scoreAd()` と `generateBid()` の両方で、異なる URL 引数を使用して何度も呼び出すことができます。

Chrome は、オークションが完了するまで実行された場合にのみ、デバッグの勝敗レポートを送信します。オークションがキャンセルされた場合（新しいナビゲーションなどが原因で）、レポートは生成されません。

これらのメソッドは、Chrome で `chrome://flags/#privacy-sandbox-ads-apis` が有効になっている場合にデフォルトで使用できます。ただし、Protected Audience API を有効にするコマンドライン フラグを使用して Chrome を実行している場合は、`BiddingAndScoringDebugReportingAPI` フラグを含めて、メソッドを明示的に有効にする必要があります。フラグが有効になっていない場合、メソッドは引き続き使用できますが、何も起こりません。

## すべての Protected Audience API リファレンス

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

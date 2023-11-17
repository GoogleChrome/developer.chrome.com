---
layout: layouts/doc-post.njk
title: Report on Protected Audience API auction results
subhead: |2-

  Protected Audience API オークション レポートを生成するための売り手および買い手向けガイド。
description: |2-

  Protected Audience API オークション レポートを生成するための売り手および買い手向けガイド。
date: '2022-10-29'
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

This article is a technical reference for generating reports for Protected Audience API auction wins, as used in the current iteration of the experimental Protected Audience API.

Read the [developer guide](/docs/privacy-sandbox/protected-audience-api) for the full life cycle of the Protected Audience API, and refer to the Protected Audience API explainer for an in-depth discussion of [event-level reporting (temporary)](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now).

Not a developer? Refer to the [Protected Audience API API overview](/docs/privacy-sandbox/protected-audience).

## What does the Protected Audience API report?

There are two available Protected Audience API reports:

- **売り手レポート**: 広告オークションの落札者を売り手に通知します。
- **買い手レポート**: 落札した買い手のみが利用でき、オークションで落札したことを知ることができます。

長期的には、[Private Aggreagation API](/docs/privacy-sandbox/private-aggregation) を使用して、ブラウザが売り手と買い手のオークション結果をレポートできるようにすることを計画しています。暫定的なイベントレベルのレポートの仕組みとして、売り手用に `reportResult()` を実装し、落札者用に `reportWin()` を実装するコードは、`sendReportTo()` 関数を呼び出すことができます。これはオークションの完了後に取得される URL を表す文字列を引数として取ります。これにより、レポートされるイベントレベルの情報が暗号化されます。

## API functions

### Seller: `reportResult()`

{% Aside %} **Read the Protected Audience API explainer**:  [Seller reporting on Render](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#51-seller-reporting-on-render). {% endAside %}

`decisionLogicUrl` で提供される売り手の JavaScript（`scoreAd()` も提供）には、オークションの結果を報告するための `reportResult()` 関数を含めることができます。

```javascript
reportResult(auctionConfig, browserSignals) {
  ...
  return signalsForWinner;
}
```

The arguments passed to this function are:

#### `auctionConfig`

The auction configuration object passed to `navigator.runAdAuction()`.

#### `browserSignals`

An object constructed by the browser providing information about the auction. For example:

```javascript
  {
    'topWindowHostname': 'publisher.example',
    'interestGroupOwner': 'https://dsp.example',
    'renderUrl': 'https://cdn.example/url-of-winning-creative.wbn',
    'bid': <bidValue>,
    'desirability': <winningAdScore>
  }
```

The return value of this function is used as the `sellerSignals` argument for the winning bidder's `reportWin()` function.

### 買い手: `reportWin()`

{% Aside %} **Read the Protected Audience API explainer**: [Buyer reporting on render and ad events](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#52-buyer-reporting-on-render-and-ad-events). {% endAside %}

The winning bidder's JavaScript (which also provided `generateBid()`) can include a `reportWin()` function to report the auction outcome.

```javascript
reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  ...
}
```

{% Aside %}

The current implementation of the Protected Audience API in Chrome will warn if `reportWin()` is not defined.

{% endAside %}

The arguments passed to this function are:

#### `auctionSignals` and `perBuyerSignals`

The same values passed to [`generateBid()`](#generatebid) for the winning bidder.

#### `sellerSignals`

[`reportResult()`](#reportresult) の戻り値。これにより、買い手に情報を渡す機会が売り手に与えられます。

#### `browserSignals`

An object constructed by the browser providing information about the auction. For example:

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

## Temporary reporting implementation {: #temporary-reporting}

There are two methods available temporarily in Chrome for auction reporting:

- `forDebuggingOnly.reportAdAuctionLoss()`
- `forDebuggingOnly.reportAdAuctionWin()`

These methods each take a single argument: a URL to fetch after the auction is completed. They can be called multiple times, in both `scoreAd()` and `generateBid()`, with different URL arguments.

Chrome only sends debug loss/win reports when an auction runs to completion. If an auction is canceled (for example, due to a new navigation) no reports will be generated.

These methods are available by default in Chrome if `chrome://flags/#privacy-sandbox-ads-apis` is enabled. But, if you're running Chrome with command line flags to enable the Protected Audience API, you'll need to explicitly enable the methods by including the `BiddingAndScoringDebugReportingAPI` flag. If the flag is not enabled, the methods will still be available but do nothing.

## All Protected Audience API API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

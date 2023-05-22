---
layout: 'layouts/doc-post.njk'
title: 'Report on Protected Audience API auction results'
subhead: >
  Seller and buyer guide to generate Protected Audience API auction reports.
description: >
  Seller and buyer guide to generate Protected Audience API auction reports.
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

This article is a technical reference for generating reports for
Protected Audience API auction wins, as used in the current iteration of the experimental
Protected Audience API.

Read the [developer guide](/docs/privacy-sandbox/fledge-api) for the full life
cycle of the Protected Audience API, and refer to the Protected Audience API explainer for an in-depth proposal of
[event-level reporting (temporary)](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now).

Not a developer? Refer to the [Protected Audience API API overview](/docs/privacy-sandbox/fledge).

## What does the Protected Audience API report?

There are two available Protected Audience API reports:

* **Seller report**: Informs the seller of the ad auction winner.
* **Buyer report**: Available to winning buyers only, to learn that they've won an auction.

The long-term plan is to allow the browser to report auction results for the
seller and buyers with the [Private Aggregation API APIs](/docs/privacy-sandbox/private-aggregation).
As a temporary event-level reporting mechanism, the code implementing
`reportResult()` for the seller, and `reportWin()` for the winning bidder, can
call the `sendReportTo()` function. This takes a single argument: a string
representing a URL that is fetched after the auction completes, which encodes
event-level information to be reported.

## API functions

### Seller: `reportResult()` 

{% Aside %}
**Read the Protected Audience API explainer**:  [Seller reporting on Render](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#51-seller-reporting-on-render).
{% endAside %}

The seller's JavaScript provided in `decisionLogicUrl` (which also provides
`scoreAd()`) can include a `reportResult()` function, to report the auction
outcome.

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

An object constructed by the browser providing information about the auction.
For example:

```javascript
  {
    'topWindowHostname': 'publisher.example',
    'interestGroupOwner': 'https://dsp.example',
    'renderUrl': 'https://cdn.example/url-of-winning-creative.wbn',
    'bid': <bidValue>,
    'desirability': <winningAdScore>
  }
```

The return value of this function is used as the `sellerSignals` argument for
the winning bidder's `reportWin()` function.

### Buyer: `reportWin()`

{% Aside %}
 **Read the Protected Audience API explainer**: [Buyer reporting on render and ad events](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#52-buyer-reporting-on-render-and-ad-events).
{% endAside %}

The winning bidder's JavaScript (which also provided `generateBid()`) can
include a `reportWin()` function to report the auction outcome.

```javascript
reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  ...
}
```

{% Aside %}

The current implementation of the Protected Audience API in Chrome will warn if `reportWin()` is
not defined.

{% endAside %}

The arguments passed to this function are:

#### `auctionSignals` and `perBuyerSignals`

The same values passed to [`generateBid()`](#generatebid) for the winning
bidder.

#### `sellerSignals`

The return value of [`reportResult()`](#reportresult), which gives the seller an
opportunity to pass information to the buyer.

#### `browserSignals`

An object constructed by the browser providing information about the auction.
For example:

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

* `forDebuggingOnly.reportAdAuctionLoss()`
* `forDebuggingOnly.reportAdAuctionWin()`

These methods each take a single argument: a URL to fetch after the auction is
completed. They can be called multiple times, in both `scoreAd()` and
`generateBid()`, with different URL arguments.

Chrome only sends debug loss/win reports when an auction runs to completion. If
an auction is canceled (for example, due to a new navigation) no reports will
be generated.

These methods are available by default in Chrome if
`chrome://flags/#privacy-sandbox-ads-apis` is enabled. But, if you're running
Chrome with command line flags to enable the Protected Audience API, you'll need to
explicitly enable the methods by including the
`BiddingAndScoringDebugReportingAPI` flag. If the flag is not enabled, the
methods will still be available but do nothing.

## All Protected Audience API API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

---
layout: 'layouts/doc-post.njk'
title: 'Seller guide: run ad auctions'
subhead: >
  Seller API guide and references for the FLEDGE ad auction.
description: >
  Seller API guide and references for the FLEDGE ad auction.
date: 2022-11-01
authors:
  - samdutton
  - alexandrawhite
---

In this article, you'll find a technical reference for the ad auction, as used in the current iteration of the experimental FLEDGE API.

Read the [developer guide](/docs/privacy-sandbox/fledge-api) for the full life
cycle of FLEDGE, and refer to the FLEDGE explainer for an in-depth proposal of
how [sellers run on-device auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions).

Not a developer? Refer to the [FLEDGE API overview](/docs/privacy-sandbox/fledge).

## What is the FLEDGE ad auction?

A FLEDGE ad auction is a collection of small JavaScript programs the
browser runs on the user's device to choose an ad. To preserve privacy, all ad
auction code from the seller and buyers is run in isolated JavaScript
[worklets](/docs/privacy-sandbox/glossary/#worklet) that can't talk to the
outside world.

{: #auction-diagram}

<figure class="w-figure">
  {% Img
    src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png",
    alt="Six stages in a FLEDGE ad auction",
    width="800", height="481"
    %}
    <figcaption>This diagram outlines each stage of a FLEDGE ad auction: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
title="View a larger version of image." target="_blank">view a larger version</a>.</figcaption>
</figure>

1. A user visits a site which displays ads. While FLEDGE is in an origin trial,
   the site must have an available and valid origin trial token. The user must
   be in an experimental group (such as Finch).
2. The seller's code executes `navigator.runAdAuction()`. This specifies which
   ad space is for sale and who can bid. Sellers must also include a script
   that scores each bid, `scoreAd()`.
   {% Aside %}
   Before the auction starts, the seller finds the best contextual ad for the
   available ad slot.
   {% endAside %}
3. The invited buyer's code executes to generate a bid, URL for a relevant ad
   creative, and other data. The bidding script can query for real-time data,
   such as the remaining ad campaign budget, from the buyer's
   [Key/Value service](/docs/privacy-sandbox/fledge#key-value-service-detail).
4. The seller's code scores each bid and selects a winner. This logic uses the
   bid value and other data return a bid's desirability. Ads which cannot beat
   the contextual winner are rejected. The seller can use their own
   [Key/Value service](/docs/privacy-sandbox/fledge#key-value-service-detail) for real-time data.
5. The winning ad is returned as an opaque value, which displays in a
   [fenced frame](/docs/privacy-sandbox/fenced-frame/). Both the seller and
   publisher will be unable to view this value.
6. The auction is reported to the seller and winning buyers. 
   {% Aside %}
   The seller's `reportResult()` and buyer's `reportWin()` can include a call 
   to `sendReportTo()`. This is available
   [temporarily](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now),
   until aggregate reporting is available with
   [Private Aggregation](/docs/privacy-sandbox/private-aggregation).
   {% endAside %}
   
### When does the auction take place?

FLEDGE can be run on its own or with programmatic auctions. In a multi-seller,
programmatic auction:

1. The user visits a participating site.
2. A programmatic auction is run by another seller to find a contextual ad for an available ad slot.
3. The FLEDGE auction is run.
4. `scoreAd()`compares the buyer's bids with the results of the first auction.

Bids which cannot beat the contextual winner are rejected.

### Who runs the FLEDGE ad auction?

There are multiple parties that might run an auction to sell ad space.

For example:

* **Content publisher**: acting for itself to host ad content on its website.
* **[Supply-side platform (SSP)](/docs/privacy-sandbox/glossary/#ssp)**: working with the publisher and providing other services.
* **Third-party script**: acting for a publisher, to enable participation in ad auctions.

With FLEDGE, a seller has three jobs:

* Enforce publisher rules: which buyers and which bids are eligible.
* Run auction logic: JavaScript run in
  [worklets](/docs/privacy-sandbox/glossary/#worklet) to calculate a
  desirability score for each bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the seller when it
instigates an ad auction by calling the JavaScript function
`navigator.runAdAuction()`.

## API functions

### `runAdAuction()`

The seller makes a request to the user's browser to begin an ad auction by calling `navigator.runAdAuction()`.

For example:

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

const auctionResultPromise = navigator.runAdAuction(auctionConfig);
```

`runAdAuction()` returns a promise that resolves to a [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns) (`urn:uuid:<something>`) that represents the
ad auction outcome. This can only be decoded by the browser when passed to a [fenced frame](/docs/privacy-sandbox/fledge#fenced-frame)
for rendering: the publisher page cannot inspect the winning ad.

{% Aside %}
The origin of the script with [`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge/interest-groups) 
must match the interest group owner's origin, so `joinAdInterestGroup()` will
need to be called from an iframe (for example, from a DSP) unless the origin of
the interest group owner matches the origin of the current document (for
example, a website with its own interest groups).

[`runAdAuction`](/docs/privacy-sandbox/fledge/ad-auction) doesn't have the same
requirements, so using a `<script>` tag is probably far more performant than a
cross-origin iframe.
{% endAside %}

The `decisionLogicUrl` script considers each individual ad, along with its
associated bid and metadata, one at a time, and then assigns it a numerical
desirability score.

#### `auctionConfig` properties

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Required</th>
        <th style="font-weight: bold; text-align: left;">Example</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>seller</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>'https://ssp.example'</code></td>
        <td style="vertical-align: top;">Origin of the seller.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>decisionLogicUrl</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>'https://ssp.example/auction-decision-logic.js'</code></td>
        <td style="vertical-align: top;">URL for auction worklet JavaScript.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedScoringSignalsUrl</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>'https://ssp.example/scoring-signals'</code></td>
        <td style="vertical-align: top;">URL of seller's trusted server.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>interestGroupBuyers*</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>['https://dsp.example', 'https://buyer2.example', ...]</code></td>
        <td style="vertical-align: top;">Origins of all interest group owners asked to bid in the auction.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">Seller information about page context, type of auction, etc.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>sellerSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">Information based on publisher settings, making a contextual ad request, etc.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>sellerTimeout</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>100</code></td>
        <td style="vertical-align: top;">Maximum runtime (ms) of seller's <code>scoreAd()</code> script.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{'https://dsp.example': {...},<br>
          &nbsp;&nbsp;'https://another-buyer.example': {...},<br>
          ...}</code></td>
        <td style="vertical-align: top;">Contextual signals about the page for each specific buyer, from their server.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerTimeouts</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>50</code></td>
        <td style="vertical-align: top;">Maximum runtime (ms) of particular buyer's <code>generateBid()</code> scripts.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>componentAuctions</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>[{'seller': 'https://www.some-other-ssp.com',<br>
          &nbsp;&nbsp;'decisionLogicUrl': ..., ...},<br>
          &nbsp;&nbsp;...]</code></td>
        <td style="vertical-align: top;">Additional configurations for <a href="#ad-components">component auctions</a>.</td>
      </tr>
    </tbody>
    <caption style="text-align:left">
      \* The seller may specify `interestGroupBuyers: '*'` to permit all interest groups to bid.
      Ads are then accepted or rejected based on criteria other than inclusion of the interest group owner.
      For example, the seller may review ad creatives to confirm compliance with their policies.

      \*\* `additionalBids` is not supported in the current implementation of FLEDGE. Read the [Auction
      Participants](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#22-auction-participants) section in the
      FLEDGE explainer for more information.
    </caption>
  </table>
</div>

### `decisionLogicUrl`

The `decisionLogicUrl` is a property of the auction configuration object,
passed to `runAdAuction()`. This URL must include a script for the
[`scoreAd()`](#scoread) function. This logic is run once for each ad to
determine its desirability.

```javascript
scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  ...
  return desirabilityScoreForThisAd;
}
```

#### `browserSignals`

`browserSignals` is an object constructed by the browser, including information
that the browser knows and which the seller's auction script might want to
verify:

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

Before an auction starts, the seller finds the best contextual ad for the
available ad slot. Part of the `scoreAd()` logic rejects any ad that can't
beat the contextual winner.

### `scoreAd()` {: #scoread }

`scoreAd()` takes the following arguments:

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Argument</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>adMetadata</code></td>
        <td style="vertical-align: top;">Arbitrary metadata provided by the buyer.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionConfig</code></td>
        <td style="vertical-align: top;">The auction configuration object passed to <code>navigator.runAdAuction()</code>.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>bid</code></td>
        <td style="vertical-align: top;">A numerical bid value.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedScoringSignals</code></td>
        <td style="vertical-align: top;">Values retrieved at auction time from the seller's trusted server, representing the seller's opinion of the ad.</td>
      </tr>
    </tbody>
  </table>
</div>

## All FLEDGE API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

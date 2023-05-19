---
layout: 'layouts/doc-post.njk'
title: 'Seller guide: run ad auctions'
subhead: >
  Seller API guide and references for the Protected Audience API ad auction.
description: >
  Seller API guide and references for the Protected Audience API ad auction.
date: 2022-11-01
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

In this article, you'll find a technical reference for the ad auction, as used in the current iteration of the experimental Protected Audience API.

Read the [developer guide](/docs/privacy-sandbox/fledge-api) for the full life
cycle of Protected Audience API, and refer to the Protected Audience API explainer for an in-depth proposal of
how [sellers run on-device auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions).

Not a developer? Refer to the [Protected Audience API overview](/docs/privacy-sandbox/fledge).

## What is the Protected Audience API ad auction?

A Protected Audience API ad auction is a collection of small JavaScript programs the
browser runs on the user's device to choose an ad. To preserve privacy, all ad
auction code from the seller and buyers is run in isolated JavaScript
[worklets](/docs/privacy-sandbox/glossary/#worklet) that can't talk to the
outside world.

{: #auction-diagram}

<figure class="w-figure">
  {% Img
    src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png",
    alt="Six stages in a Protected Audience API ad auction",
    width="800", height="481"
    %}
    <figcaption>This diagram outlines each stage of a Protected Audience API ad auction: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
title="View a larger version of image." target="_blank">view a larger version</a>.</figcaption>
</figure>

1. A user visits a site which displays ads. While the Protected Audience API is in an origin trial,
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

The Protected Audience API can be run on its own or with programmatic auctions. In a multi-seller,
programmatic auction:

1. The user visits a participating site.
2. A programmatic auction is run by another seller to find a contextual ad for an available ad slot.
3. The Protected Audience API auction is run.
4. `scoreAd()`compares the buyer's bids with the results of the first auction.

Bids which cannot beat the contextual winner are rejected.

### Who runs the Protected Audience API ad auction?

There are multiple parties that might run an auction to sell ad space.

For example:

* **Content publisher**: acting for itself to host ad content on its website.
* **[Supply-side platform (SSP)](/docs/privacy-sandbox/glossary/#ssp)**: working with the publisher and providing other services.
* **Third-party script**: acting for a publisher, to enable participation in ad auctions.

With the Protected Audience API, a seller has three jobs:

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
ad auction outcome. This can only be decoded by the browser when passed to a [fenced frame](/docs/privacy-sandbox/fenced-frame/)
for rendering: the publisher page cannot inspect the winning ad.

{% Aside %}
The origin of the script with [`joinAdInterestGroup()`](/blog/fledge-api/#joinadinterestgroup) 
must match the interest group owner's origin, so `joinAdInterestGroup()` will
need to be called from an iframe (for example, from a DSP) unless the origin of
the interest group owner matches the origin of the current document (for
example, a website with its own interest groups).

[`runAdAuction`](/blog/fledge-api/#ad-auction) doesn't have the same
requirements, so using a `<script>` tag is probably far more performant than a
cross-origin iframe.
{% endAside %}

The `decisionLogicUrl` script considers each individual ad, along with its
associated bid and metadata, one at a time, and then assigns it a numerical
desirability score.

#### `auctionConfig` properties

{% Aside %}
`additionalBids` is not supported in the current implementation of the Protected Audience API. Read the [Auction
      Participants](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#22-auction-participants) section in the
      Protected Audience API explainer for more information.
{% endAside %}


<dl>
    <dt><code>seller</code></dt>
        <dd>Required</dd>
        <dd>Example: <code>'https://ssp.example'</code></dd>
        <dd>Role: Origin of the seller.</dd>
    <dt><code>decisionLogicUrl</code></dt>
        <dd>Required</dd>
        <dd>Example: <code>'https://ssp.example/auction-decision-logic.js'</code></dd>
        <dd>Role: URL for auction worklet JavaScript.</dd>
    <dt><code>trustedScoringSignalsUrl</code></dt>
        <dd>Optional</dd>
        <dd>Example: <code>'https://ssp.example/scoring-signals'</code></dd>
        <dd>Role: URL of seller's trusted server.</dd>
    <dt><code>interestGroupBuyers</code></dt>
        <dd>Required</dd>
        <dd>Example: <code>['https://dsp.example', 'https://buyer2.example', ...]</code></dd>
        <dd>Role: Origins of all interest group owners asked to bid in the auction.</dd>
        <dd>Notes: The seller may specify <code>interestGroupBuyers:</code> to permit all interest groups to bid. Ads are then accepted or rejected based on criteria other than inclusion of the interest group owner. For example, the seller may review ad creatives to confirm compliance with their policies.</dd>
    <dt><code>auctionSignals</code></dt>
        <dd>Optional</dd>
        <dd>Example: <code>{...}</code></dd>
        <dd>Role: Seller information about page context, type of auction, etc.</dd>
    <dt><code>sellerSignals</code></dt>
        <dd>Optional</dd>
        <dd>Example: <code>{...}</code></dd>
        <dd>Role: Information based on publisher settings, making a contextual ad request, etc.</dd>
     <dt><code>sellerTimeout</code></dt>
        <dd>Optional</dd>
        <dd>Example: <code>100</code></dd>
        <dd>Role: Maximum runtime (ms) of seller's <code>scoreAd()</code> script.</dd>
    <dt><code>perBuyerSignals</code></dt>
        <dd>Optional</dd>
        <dd>Example: 
        <pre>{'https://dsp.example': {...}, 'https://another-buyer.example': {...}, ... }</pre></dd>
        <dd>Role: Contextual signals about the page for each specific buyer, from their server.</dd>
    <dt><code>perBuyerTimeouts</code></dt>
        <dd>Optional</dd>
        <dd>Example: <code>50</code></dd>
        <dd>Role: Maximum runtime (ms) of particular buyer's <code>generateBid()</code> scripts.</dd>
    <dt><code>componentAuctions</code></dt>
        <dd>Optional</dd>
        <dd>Example:
        <pre>[{'seller': 'https://www.some-other-ssp.com', 'decisionLogicUrl': ..., ...}, ...]</pre></dd>
        <dd>Role: Additional configurations for <a href="/blog/fledge-api/#:~:text=componentauctions">component auctions</a>.</dd>
    </dl><br>
<p>


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

## Frequently asked questions

{% Details %}
{% DetailsSummary %}
### How is the auction winner decided and who picks them?
{% endDetailsSummary %}
The seller provides the scoring logic to determine the desirability score of each ad, and the browser selects the highest score as the winning ad. 

The seller includes logic in the `scoreAd()` function, and the browser executes the function in a worklet that has limited communication with code outside of it. The browser itself does not score the ads. The browser is exclusively responsible to execute the scoring logic and select the bid with the highest score.
{% endDetails %}

## All Protected Audience API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}


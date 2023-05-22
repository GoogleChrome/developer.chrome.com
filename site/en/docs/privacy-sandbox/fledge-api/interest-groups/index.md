---
layout: 'layouts/doc-post.njk'
title: 'Buyer guide: join interest groups and generate bids'
subhead: >
  Buyer API guide and references to join remarketing lists and bid
  in Protected Audience API auctions.
description: >
  Buyer API guide and references to join remarketing lists and bid
  in Protected Audience API auctions.
date: 2022-11-01
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

In this article, you'll find a technical reference for interest groups, as used
in the current iteration of the experimental Protected Audience API.

Read the [developer guide](/docs/privacy-sandbox/fledge-api) for the full life
cycle of the Protected Audience API, and refer to the Protected Audience API explainer for an in-depth proposal of
how [browsers record interest groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups).

Not a developer? Refer to the
[Protected Audience API overview](/docs/privacy-sandbox/fledge).

## Protected Audience API interest groups

A Protected Audience API interest group represents a group of people with a common interest,
corresponding to a [remarketing](/docs/privacy-sandbox/glossary/#remarketing)
list. Every Protected Audience API interest group has an
[owner](/docs/privacy-sandbox/fledge#interest-group-types).

Interest group owners act as the buyer in the Protected Audience API ad auction. Interest group
membership is stored by the browser, on the user's device, and is not shared
with the browser vendor or anyone else.

## Bid in a Protected Audience API ad auction

Owners of Protected Audience API interest groups can be invited to [bid in Protected Audience API ad auctions](#generatebid).

## API functions

### `joinAdInterestGroup()`

The advertiser's demand-side platform (DSP) or the advertiser itself calls
`navigator.joinAdInterestGroup()` to ask the browser to add an interest group
to the browser's membership list. 

The origin of the calling context for `joinAdInterestGroup()` must match the
interest group owner's origin, so `joinAdInterestGroup()` will need to be
called from an iframe (for example, from a DSP) unless the origin of the
interest group owner matches the origin of the current document (for example, a
website with its own interest groups).

`joinAdInterestGroup()` requires permission from:

* The [site being visited](#visited-site-permission)
* The interest group owner

This means it's not possible for `malicious.example` to call
`joinAdInterestGroup()` for an interest group owned by  `dsp.example.com`,
without `dsp.example.com` granting permission.

#### Permission from the visited site {: #visited-site-permission}

Permission can be granted from the same origin or cross-origin.

By default, permission is granted for `joinAdInterestGroup()` calls from the
same origin as the site visited, (in other words, from the same origin as the
top-level frame of the current page). Sites can use the
[`join-ad-interest-group` permissions policy header](/docs/privacy-sandbox/permissions-policy/)
to disable `joinAdInterestGroup()` calls.

Calling `joinAdInterestGroup()` cross-origin (origins that are different from
the current page) can only succeed if the site being visited has set a
permissions policy that allows calls to `joinAdInterestGroup()` from
cross-origin iframes.

{% Aside %}
The default in the current implementation of the Protected Audience API is to allow calls to
`joinAdInterestGroup()` from anywhere in a page, even from cross-origin iframes.

In the future, once site owners have had time to adjust their permissions
policies, the plan is by default to disallow calls from cross-origin iframes.
{% endAside %}

#### Permission from the interest group owner

Interest group owner permission is implicitly granted by calling
`joinAdInterestGroup()` from an iframe with the same origin as that of the
interest group's owner. For example, a `dsp.example.com` iframe can call
`joinAdInterestGroup()` for interest groups owned by `dsp.example.com`.

In essence, `joinAdInterestGroup()` can run in a page or iframe on the owner's
domain, or be delegated to other domains provided using a list at a
`.well-known` URL.

#### Example usage

Here's an example of how one might define an interest group and ask the browser to join the group.

{: #ad-components}

```javascript
const interestGroup = {
  owner: 'https://dsp.example',
  name: 'custom-bikes',
  biddingLogicUrl: ...,
  biddingWasmHelperUrl: ...,
  dailyUpdateUrl: ...,
  trustedBiddingSignalsUrl: ...,
  trustedBiddingSignalsKeys: ['key1', 'key2'],
  userBiddingSignals: {...},
  ads: [bikeAd1, bikeAd2, bikeAd3],
  adComponents: [customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2],
};

navigator.joinAdInterestGroup(interestGroup, 7 * kSecsPerDay);
```

The `interestGroup` object passed to the function must be no more than 50 kiB
in size, otherwise the call will fail. The second parameter specifies the
duration of the interest group, capped at 30 days. Successive calls overwrite
previously stored values.

{% Aside 'gotchas' %}

All URLs used as parameters for Protected Audience API methods must be from secure origins:
all resources must be served over HTTPS URLs. [How to use HTTPS for local development](https://web.dev/how-to-use-local-https/)
explains how to do this when running the Protected Audience API locally.

In addition, `biddingLogicUrl`, `decisionLogicUrl`, and `trustedBiddingSignals` 
require an `X-Allow-FLEDGE: true` HTTP response header.

{% endAside %}

#### Required properties {: #interest-group-properties}

The only required properties for interest groups are `owner` and `name`:

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Example</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>owner</code></td>
        <td style="vertical-align: top;"><code>https://dsp.example</code></td>
        <td style="vertical-align: top;">Origin of the interest group owner.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>name</code></td>
        <td style="vertical-align: top;"><code>custom-bikes</code></td>
        <td style="vertical-align: top;">Name of the interest group.</td>
      </tr>
    </tbody>
  </table>
</div>

#### Optional properties

The remaining properties are optional:

<dl>
    <dt><code>biddingLogicUrl</code><sup><a href="#first-ref">1</a>, <a href="#second-ref">2</a></sup></dt>
        <dd>Example: <code>https://dsp.example/bid/custom-bikes/bid.js</code></dd>
        <dd>Role: URL for bidding JavaScript run in worklet.</dd>
    <dt><code>biddingWasmHelperUrl</code><sup><a href="#first-ref">1</a>, <a href="#second-ref">2</a></sup></dt>
        <dd>Example: <code>https://dsp.example/bid/custom-bikes/bid.wasm</code></dd>
        <dd>Role: URL for WebAssembly code driven from <code>biddingLogicUrl</code>.</dd>
    <dt><code>dailyUpdateUrl</code><sup><a href="#second-ref">2</a></sup></dt>
        <dd>Example: <code>https://dsp.example/bid/custom-bikes/update</code></dd>
        <dd>Role: URL that returns JSON to update interest group attributes.
        (See <a href="#update-interest-group">Update the interest group</a>.)</dd>
    <dt><code>trustedBiddingSignalsUrl</code><sup><a href="#second-ref">2</a></sup></dt>
        <dd>Example: <code>https://dsp.example/trusted/bidding-signals</code></dd>
        <dd>Role: Base URL for key-value requests to bidder's trusted server.</dd>
    <dt><code>trustedBiddingSignalsKeys</code></dt>
        <dd>Example: <code>['key1', 'key2' ...]</code></dd>
        <dd>Role: Keys for requests to key-value trusted server.</dd>
    <dt><code>userBiddingSignals</code></dt>
        <dd>Example: <code>{...}</code></dd>
        <dd>Role: Additional metadata the owner can use during bidding.</dd>
    <dt><code>ads</code><sup><a href="#first-ref">1</a></sup></dt>
        <dd>Example: <code>[bikeAd1, bikeAd2, bikeAd3]</code></dd>
        <dd>Role: Ads that might be rendered for this interest group.</dd>
    <dt><code>adComponents</code></dt>
        <dd>Example: <code>[customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2]</code></dd>
        <dd>Role: Components for <a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">ads composed of multiple pieces</a>.</dd>
</dl>

   
    <caption style="text-align:left">
    <p id="first-ref"><sup>1</sup> The `biddingLogicUrl` and `ads` properties are optional, but
    required to participate in an auction. There may be use cases for creating an interest group without these properties: for example, an interest group owner might want to add a browser to an interest group for a campaign that isn't running yet, or for some other future use, or they may temporarily have run out of advertising budget.</p>

    <p id="second-ref"><sup>2</sup> In the current implementation of the Protected Audience API, `biddingLogicUrl`,
    `biddingWasmHelperUrl`, `dailyUpdateUrl` and `trustedBiddingSignalsUrl` must
    have the same origin as owner. That may not be a long-term constraint, and
    the `ads` and `adComponents` URLs have no such constraint.</p>
    </caption>


#### Update attributes {: #update-interest-group}

`dailyUpdateUrl` specifies a web server that returns JSON defining interest
group properties, corresponding to the interest group object passed to `joinAdInterestGroup()`.

This allows the group's owner to periodically update the attributes of the
interest group. In the
[current implementation](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/interest_group/interest_group_storage.cc;l=671;drc=5a102f146faa0c21eb9cf255ceb46b35a158ab3f),
the following attributes can be changed:

* `biddingLogicUrl`
* `biddingWasmHelperUrl`
* `trustedBiddingSignalsUrl`
* `trustedBiddingSignalsKeys`
* `ads`
* `priority`

Any field not specified in the JSON will not be overwritten—only fields
specified in the JSON get updated—whereas calling
`navigator.joinAdInterestGroup()` overwrites any existing interest group.

Updates are best-effort, and can fail under the following conditions:

* Network request timeout (currently 30 seconds).
* Other network failure.
* JSON parsing failure.

Updates are rate-limited to a maximum of one per day.

Updates can be canceled if too much contiguous time has been spent
updating, though this doesn't impose any rate limiting on canceled (remaining)
updates. Updates that fail due to network errors are retried after an hour, and
updates that fail due to disconnection from the internet are retried
immediately on reconnection.

##### Manual updates

Updates to interest groups owned by the current frame's origin can be triggered
manually via `navigator.updateAdInterestGroups()`.

Rate limiting prevents updates from happening too frequently: repeated calls to
`navigator.updateAdInterestGroups()` don't do anything until the rate limit
period (currently one day) has passed.

The rate limit gets reset if `navigator.joinAdInterestGroup()` is called again
for the same interest group `owner` and `name`.

##### Automatic updates

All interest groups loaded for an auction are updated automatically after an
auction completes, subject to the same rate limits as manual updates.

For each owner with at least one interest group participating in an auction,
it's as if `navigator.updateAdInterestGroups()` is called from an iframe whose
origin matches that owner.

#### Specify ads for an interest group

`ads` and `adComponents` objects include a URL for an ad creative and, optionally, arbitrary metadata that can be used at bidding time.

For example:

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

### `generateBid()` {: #generatebid}

The interest group owner's script at `biddingLogicUrl` must
include a `generateBid()` function.

When a [seller calls `navigator.runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction),
the `generateBid()` function is called once for each candidate ad. In other
words, it's called for each interest group that the browser is a member
of&mdash;if the interest group's owner is invited to bid. 

The seller provides a `decisionLogicUrl` in the auction
configuration parameter passed to `navigator.runAdAuction()`. The code at this
URL must include a `scoreAd()` function, which scores the bid generated by each participating bidder.

{% Aside %}

The `biddingWasmHelperUrl` property is optional. It allows the bidder to
provide computationally-expensive subroutines in
[WebAssembly](https://developer.mozilla.org/docs/WebAssembly),
rather than JavaScript, to be driven from the JavaScript function provided by
`biddingLogicUrl`.

If provided, it must point to a WebAssembly binary,
delivered with an `application/wasm mimetype`. The corresponding
`WebAssembly.Module` is made available by the browser to the `generateBid()`
function.

{% endAside %}

The script at `biddingLogicUrl` provided by a buyer must include a `generateBid()` function.

This function is called once for each candidate ad.
[`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction/)
individually checks each ad, along with its associated bid and metadata, then
assigns the ad a numerical desirability score.

```javascript
generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
  ...
  return {
    ad: adObject,
    bid: bidValue,
    render: renderUrl,
    adComponents: [adComponentRenderUrl1, ...]
   };
}
```

#### Arguments

`generateBid()` takes the following arguments:

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Argument</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>interestGroup</code></td>
        <td style="vertical-align: top;">An object passed to by the ad buyer. The interest group may be updated with <code>dailyUpdateUrl</code>.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionSignals</code></td>
        <td style="vertical-align: top;">A property of the <a href="#ad-auction">auction config</a> argument passed to <code>navigator.runAdAuction()</code> by the seller. This provides information about page context (such as the ad size and the publisher ID), the type of auction (first-price or second-price), and other metadata.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">A property of the <a href="#ad-auction">auction config</a> argument passed by the seller. This can provide contextual signals from the buyer's server about the page, if the seller is an <a href="/docs/privacy-sandbox/glossary#ssp">SSP</a> which performs a real-time bidding call to buyer servers and pipes the response back, or if the publisher page contacts the buyer's server directly. If so, the buyer may wish to check a cryptographic signature of those signals inside <code>generateBid()</code> as protection against tampering.</a> </td>
      </tr>
      <tr>
              <td style="vertical-align: top;"><code>trustedBiddingSignals</code></td>
              <td style="vertical-align: top;">An object whose keys are the <code>trustedBiddingSignalsKeys</code> for the interest group, and whose values are returned in the <code>trustedBiddingSignals</code> request.</td>
       </tr>
       <tr>
         <td style="vertical-align: top;"><code>browserSignals</code><sup>3</sup></td>
         <td style="vertical-align: top;">An object constructed by the browser, which might include information about page context (such as the <code>hostname</code> of the current page, which the seller could otherwise fake) and data for the interest group itself (such as a record of when the group previously won an auction, to allow on-device frequency capping).</a> </td>
       </tr>
    </tbody>
  </table>
</div>

<sup>3</sup> The `browserSignals` object has the following properties:

```javascript
{
  topWindowHostname: 'publisher.example',
  seller: 'https://ssp.example',
  joinCount: 3,
  bidCount: 17,
  prevWins: [[time1,ad1],[time2,ad2],...],
  wasmHelper: ... /* WebAssembly.Module object based on interest group's biddingWasmHelperUrl. */
  dataVersion: 1, /* Data-Version value from the buyer's Key/Value service response(s). */
}
```

To calculate a `bid` value, code in `generateBid()` can use the properties of
the function's parameters.

For example:

```javascript
function generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
  return {
    ...
    bid: auctionSignals.is_above_the_fold ? perBuyerSignals.atf_value : perBuyerSignals.btf_value,
    ...
  }
}
```

`generateBid()` returns an object with four properties:

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>ad</code></td>
        <td style="vertical-align: top;">Arbitrary metadata about the ad, such as information the seller expects to learn about this bid or ad creative. The seller uses this information in its auction and decision logic.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>bid</code></td>
        <td style="vertical-align: top;">A numerical bid that will enter the auction. The seller must be in a position to compare bids from different buyers, therefore bids must be in some seller-chosen unit (such as"USD per thousand"). If the bid is zero or negative, then this interest group will not participate in the seller's auction at all. With this mechanism, the buyer can implement any advertiser rules for where their ads may or may not appear.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>render</code></td>
        <td style="vertical-align: top;">A URL, or a list of URLs, that will be used to render the creative if this bid wins the auction. The value has to match the `renderUrl` of one of the <a href="#ad-components">ads defined for the interest group</a>.<br /><br /><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">Ads Composed of Multiple Pieces explainer</a> </td>
      </tr>
            <tr>
              <td style="vertical-align: top;"><code>adComponents</code></td>
              <td style="vertical-align: top;">An optional list of up to 20 components for <a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">ads composed of multiple pieces</a>, taken from the <a href="#ad-components">adComponents</a> property of the interest group argument passed to `navigator.joinAdInterestGroup()`.</td>
            </tr>
    </tbody>
  </table>
</div>

### ` leaveAdInterestGroup()`

The interest group owner can request to a browser be removed from an interest
group. The browser removes the interest group from its membership list.

```javascript
navigator.leaveAdInterestGroup({
  owner: 'https://dsp.example',
  name: 'custom-bikes'
});
```

If a user returns to the site which asked the browser to add an interest group,
the interest group owner can call the `navigator.leaveAdInterestGroup()`
function to request the browser remove the interest group.

Code for an ad can also call this function for its interest group.

## Frequently asked questions

{% Details %}
{% DetailsSummary %}
### How do I implement frequency control by click?
{% endDetailsSummary %}

For simple frequency control, you can use the `prevWins` field in `browserSignals` inside `generateBid()`. Alternatively, you can call `navigator.leaveAdInterestGroup()` to request that a user's browser leave an interest group when an ad is clicked. This prevents future bidding and acts as a form of frequency capping. 

You can also use a first-party cookie to store click information. When the ad is rendered, overwrite an existing interest group with the click data as user bidding signals. The workflow would look something like: 

*   User visits `advertiser.com/product`.
*   The advertiser writes "0 clicks" in a first-party cookie and calls `joinAdInterestGroup({ ..., userBiddingSignals: { clicks: [] } })`.
*   User clicks on an ad at a later time and is taken to `advertiser.com/product`.
*   The advertiser reads and increments first-party cookie click data, then calls `joinAdInterestGroup({ userBiddingSignals: { clicks: ["1667499972"] } })`.
*   For future bidding, the click data available in `userBiddingSignals` can be used in bidding logic.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### How do I use a user's recent browsing history for ad recommendations?
{% endDetailsSummary %}

A user's browsing history for the site that called `joinAdInterestGroup()` can be updated in `userBiddingSignals`, which can be used during on-device bidding. See the [product-level TURTLEDOVE](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md) original proposal which includes some analysis by RTB House on the impact of core metrics for recommendation use case adoption.

`dailyUpdateUrl` provides a mechanism to periodically update the attributes of the interest group, but this update is not based on the user's browsing history. 
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### What's the maximum number of interest groups per group owner for a single user?
{% endDetailsSummary %}

Chrome allows up to 1000 interest groups per owner, and up to 1000 interest group
owners. These limits are meant as guard rails, not to be hit in regular operation.

{% endDetails %}

## All Protected Audience API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

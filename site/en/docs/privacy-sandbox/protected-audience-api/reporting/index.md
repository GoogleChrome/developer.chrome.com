---
layout: 'layouts/doc-post.njk'
title: 'Protected Audience API auction reporting'
subhead: >
  Measure Protected Audience API auction data and results
description: >
  Measure Protected Audience API auction data and results
date: 2023-09-26
authors:
  - kevinkiklee
---

In this article, you’ll find a high-level overview of the various mechanisms available for you to report Protected Audience API auction data to your server, along with the transition mechanisms available right now for you to use during the migration until alternative solutions are ready. 

To report on important metrics that you gather from an ad auction, Protected Audience API works with:

*   [Private Aggregation](/docs/privacy-sandbox/private-aggregation/) which collects auction signals and results to generate [summary reports](/docs/privacy-sandbox/summary-reports/). 
*   [Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) for [Fenced Frames](/docs/privacy-sandbox/fenced-frame/) and [iframes](https://developer.mozilla.org/docs/Web/HTML/Element/iframe) which is a channel within the frames to communicate with Protected Audience API worklets. The API allows associating event-level data with auction signals.  The event-level reporting of the Ads Reporting API is a transitional mechanism until a more private reporting mechanism is designed. 
*   [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) which allows you to associate conversion data with auction signals.  
*   [Shared Storage](/docs/privacy-sandbox/shared-storage/) which lets you write auction signals to a cross-origin storage, then allows you to report that data later using Private Aggregation.

{% Aside %}

We recommend you read the documentation on [Private Aggregation](/docs/privacy-sandbox/private-aggregation/), [Fenced Frames](/docs/privacy-sandbox/fenced-frame/), [Shared Storage](/docs/privacy-sandbox/shared-storage/), and [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) before continuing, as core concepts are expanded on in this document.

{% endAside %}

## Protected Audience API reporting overview

<figure>
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/R35UFscm9XdMmtco0BYH.png", alt="Protected Audience overall workflow", width="800", height="414" %}
  <figcaption>
    Protected Audience overall workflow
  </figcaption>
</figure>

There are three main time periods where data from the Protected Audience API auction flow can be reported to your server: auction time when the auction is executed from the publisher site, render time when the ad is rendered into a fenced frame or an iframe on the publisher site, and conversion time when the user conducts some action on the another site that can be attributed to the auction. 

During auction time, you can report the auction data using reporting worklets. During render time, you can report engagement data from an iframe or a fenced frame. During conversion time, you can report attribution data from the destination page using the Attribution Reporting API. 

### Reporting locations

Within an auction, the buyers are able to report signals available in `generateBid()` and `reportWin()` worklets, and the sellers are able to report signals available in `scoreAd()` and `reportResult()`. Outside of an auction, the buyers and sellers can report data from a frame that rendered the ad, and from the site that the conversion was made from. 

<table style="zoom: 0.8">
  <tr>
   <td style="background-color: #efefef">Time period
   </td>
   <td style="background-color: #efefef">Destination
   </td>
   <td style="background-color: #efefef">Location
   </td>
   <td style="background-color: #efefef; width: 20%;">Data available
   </td>
   <td style="background-color: #efefef">Reporting APIs available
   </td>
  </tr>
  <tr>
   <td rowspan="4" style="background-color: #d9ead3">Auction
   </td>
   <td rowspan="2">Buyer
   </td>
   <td><code>generateBid()</code> 
   </td>
   <td rowspan="4">Signals, auction results, and auction performance
   </td>
   <td>Private Aggregation API
   </td>
  </tr>
  <tr>
   <td><code>reportWin()</code> 
   </td>
   <td>Private Aggregation API
<p>
Ads Reporting API
   </td>
  </tr>
  <tr>
   <td rowspan="2">Seller
   </td>
   <td><code>scoreAd()</code>
   </td>
   <td>Private Aggregation API
   </td>
  </tr>
  <tr>
   <td><code>reportResult()</code> 
   </td>
   <td>Private Aggregation API
<p>
Ads Reporting API
   </td>
  </tr>
  <tr>
   <td style="background-color: #c9daf8">Render
   </td>
   <td>Buyer / Seller
   </td>
   <td>Frame on the publisher site
   </td>
   <td>Event-level data within the ad frame
   </td>
   <td>Private Aggregation API 
<p>
Ads Reporting API
   </td>
  </tr>
  <tr>
   <td style="background-color: #fce5cd">Conversion
   </td>
   <td>Buyer / Seller
   </td>
   <td>Conversion site
   </td>
   <td>Conversion and event-level data from the conversion site
   </td>
   <td>Attribution Reporting API
<p>
Private Aggregation API
<p>
Ads Reporting API
   </td>
  </tr>
</table>

During each of the time periods listed, buyers and sellers will have access to various reporting APIs available to report data such as auction signals, event-level data, and conversion data. 

### Data available within a Protected Audience API auction

The following data are available to be reported from a Protected Audience API worklet during the auction. 

#### Signals

_Signals_ are the auction contextual data, user data, real-time data, and browser data available to the buyers and sellers within a worklet to generate a bid, score an ad, and report the results of an auction. 

<table style="zoom: 0.8">
  <tr>
   <td style="background-color: #f3f3f3"><strong>Signal</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Description</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Set location</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Users</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Availability</strong>
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>auctionSignals</strong>
   </td>
   <td>Data available in the context of where the auction is held. This data can include page content information, first-party user data, and more. 
   </td>
   <td>Set by the seller from the publisher site in the auction config.
   </td>
   <td>Buyer <p> Seller</p>
   </td>
   <td>generateBid scoreAd reportWin reportResult
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>directFromSellerSignals</strong>
   </td>
   <td>The same data for  <code>auctionSignals</code>, <code>perBuyerSignals</code>, <code>sellerSignals</code> but the signals are guaranteed to come from the specified seller.
   </td>
   <td>Set via HTTP response headers from the seller
   </td>
   <td>Buyer
<p>
Seller
   </td>
   <td>generateBid scoreAd reportWin reportResult
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>browserSignals</strong>
   </td>
   <td>Various data provided by the browser (<code>topWindowHostname</code>, <code>interestGroupOwner</code>, <code>renderUrl</code>, <code>adComponents</code>, <code>biddingDurationMsec</code>, <code>IGJoinCount</code>, <code>IGRecency</code>, <code>modelingSignals</code>).
   </td>
   <td>Set by the browser.
   </td>
   <td>Buyer
<p>
Seller
   </td>
   <td>generateBid scoreAd reportWin reportResult
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>sellerSignals</strong>
   </td>
   <td>Signals provided to the seller for ad scoring.
   </td>
   <td>Set by the seller from the publisher site in the auction config.
   </td>
   <td>Seller
   </td>
   <td>scoreAd
<p>
reportWin
<p>
reportResult
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>trustedScoringSignals</strong>
   </td>
   <td>Real-time signals provided to the seller for ad scoring.
   </td>
   <td>The URL is set by the seller from the publisher site in the auction config.
   </td>
   <td>Seller
   </td>
   <td>scoreAd reportResult
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>perBuyerSignals</strong>
   </td>
   <td>Auction contextual data provided to specific buyers. The seller can retrieve the values for the buyers before the auction starts. This is the buyer’s knowledge of the ad opportunity.
   </td>
   <td>Set by the seller from the publisher site in the auction config.
   </td>
   <td>Buyer

   </td>
   <td>generateBid scoreAd reportWin reportResult
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>trustedBiddingSignals</strong>
   </td>
   <td>Real-time signals provided to the buyers for ad bidding.
   </td>
   <td>The URL is set by the buyer from the advertiser site when the interest group is set.
   </td>
   <td>Buyer
   </td>
   <td>generateBid
   </td>
  </tr>
  <tr>
   <td style="background-color: null"><strong>userBiddingSignals</strong>
   </td>
   <td>User data provided by the buyer. 
   </td>
   <td>Set by the buyer from the advertiser site when the interest group is set .
   </td>
   <td>Buyer
   </td>
   <td>generateBid
   </td>
  </tr>
</table>

The [auction config](/docs/privacy-sandbox/protected-audience-api/ad-auction/#auctionconfig-properties) object is the primary source of data supplied to become available as signals in worklets. The publisher and seller can supply contextual data and first-party data in the auction config, and these signals can be enriched with the interest group data from the buyer, event-level data from the ad rendering frame, and attribution data from the clickthrough page. The data reported can be used for buyer/seller reporting, billing, budgeting, ML model training, and more. 

#### Other available data

*   _Results data_ that relates to auction win and loss data such as winning bid price and bid rejection reason.  
*   _Performance data_ that contains latency information, such as how long it took to fetch and execute the bidding worklet.

### Data available outside a Protected Audience API auction

Outside of a Protected Audience API auction, there are two time periods where data is available to be reported. 

During render time, when the ad is rendered on the publisher site, the event-level data from inside the iframe or fenced frame can be associated with Protected Audience API auction data, and reported to your server. Example event-level data includes ad impression, clickthrough, hover, and any other events that occur inside the frame. 

During conversion time, when a user conducts some action on the clickthrough page that is attributed back to the auction, the event-level data from the conversion page can be associated with Protected Audience API auction data, and reported to your server. 

## Event-level reporting

Event-level reports detail information from one or more events. An event can be an auction win, ad impression, or a conversion. [Until at least 2026](/docs/privacy-sandbox/protected-audience-api/feature-status/), event-level auction win reporting will remain in place, fenced frames will not be required to render a Protected Audience ad, and an iframe with unconstrained network access can be used for event-level reporting. Also, the [Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) is available in fenced frames and iframes for you to associate auction and conversion data with event-level data from the frame. This is designed to let the ecosystem have an easier path to migration, since you can continue to use your existing reporting infrastructure until at least 2026 while you migrate your system to Protected Audience.

### Event-level auction win reporting with `sendReportTo()`

A mechanism available for reporting event-level data inside a Protected Audience auction is the <code>[sendReportTo() function](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#reporting)</code> on an auction win. The function is available in the buyer and seller reporting worklets, and the browser makes a <code>GET</code> request to the supplied URL string when the ad rendering begins.  You can encode any signal available in your worklets as query params of the URL. 

For example, a buyer can report the winning bid amount from the `reportWin()` worklet for billing purposes: 

```js
// Buyer reporting worklet
function reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals, directFromSellerSignals) {
  sendReportTo(`https://buyer-reporting-server.example/reporting?bid=${browserSignals.bid}`);
}
```

The `sendReportTo()` function can be used to generate a win report for the seller when called from `reportResult()`, and a win report for the buyer when called from `reportWin()`. The `sendReportTo()` function is [available until at least 2026](/docs/privacy-sandbox/protected-audience-api/feature-status/#event-level-auction-win-reporting),


### Engagement report

An _engagement report_ contains event-level data from an ad creative such as impression or click data that is associated with the _signals_ of the Protected Audience API auction that rendered the ad. Since the ad is rendered after the auction has concluded, the auction signals are not available inside the frame that renders the ad. To associate these data from different time periods, we provide you with two transition mechanisms to generate engagement reports. 

The `sendReportTo()` function described above can be used to associate auction data with event-level data from an iframe, but it does not work for a fenced frame since a unique ID cannot be passed in from the embedder because the communication between the embedder and the fenced frame is limited. For associating auction data with event-level data from a fenced frame ad, the [Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) can be used.

#### Ads Reporting API for fenced frames and iframes

The [Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md) for fenced frames and iframes provides a mechanism for you to associate user event-level data from an ad frame with signals within a Protected Audience auction. 

In a Protected Audience API reporting worklet, you register an ad beacon with the <code>[registerAdBeacon()](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#registeradbeacon)</code> function and set your signals as query params. Then you trigger the event from a fenced frame by calling the <code>[window.fence.reportEvent()](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent)</code> function with the user event-level data payload. 

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

#### Unconstrained network access

Fenced frames will allow loading network resources the same way as an iframe would, and you can send event-level data within fenced frames to your server. You can generate event-level reports on the server-side later by associating the event-level data from a fenced frame with the auction data that was sent with `sendReportTo()` that was discussed in the [auction event-level reporting mechanism](#event-level-auction-win-reporting-with-sendreportto) section above. 

Network access will be constrained sometime after third-party cookie deprecation. 

The event-level reporting mechanisms that exist in Protected Audience API today are transition mechanisms, and an alternative solution will be designed to better support existing use cases. 

### Attribution report

An _attribution report_ allows you to associate a conversion on a website with an ad that was chosen from a Protected Audience API auction. For example, a user may click on a product ad you serve, redirected to the advertiser’s site, make a purchase there, and you are interested in attributing the purchase to the ad that was shown. The [Attribution Reporting API](https://github.com/WICG/attribution-reporting-api/tree/main) will be integrated with Protected Audience API to combine the auction data from the publisher site and the conversion data from the advertiser site. 

While we design a more permanent solution, you can use the [Ads Reporting API](#ads-reporting-api-for-fenced-frames-and-iframes) for fenced frames as a transitional mechanism for generating an event-level and aggregatable report with Attribution Reporting. Note that these reports are for measuring conversion, and are separate from the event-level and aggregatable engagement reports generated from the auction and the ad frame. We will publish an explainer for a more permanent solution when ready. 

#### Transitional mechanism

When registering an ad beacon, you can use the keyword `reserved.top_navigation` which will automatically add the `Attribution-Reporting-Eligible` header for the beacon to become eligible to [register as an attribution source](https://github.com/WICG/attribution-reporting-api/blob/main/EVENT.md#registering-attribution-sources). 

```js
registerAdBeacon({
 'reserved.top_navigation': 'https://adtech.example/click?buyer_event_id=123',
});
```

To attach event-level data to the beacon you registered, you can call <code>[setReportEventDataForAutomaticBeacons()](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#api-to-populate-event-data-for-reservedtop_navigation)</code> from the fenced frame with the event payload.

```js
window.fence.setReportEventDataForAutomaticBeacons({
  eventType: 'reserved.top_navigation',
  eventData: 'data from the frame',
  destination:['seller', 'buyer']
})
```

See the [Attribution Reporting section of the Ads Reporting API explainer](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#support-for-attribution-reporting) to learn more. 


### Engagement and conversion reporting example

In this example, we'll look at it from the buyer perspective who is interested in associating the data from the auction, ad frame, and conversion site together. 

In this workflow, the buyer coordinates with the seller to send a unique ID into the auction.  During the auction, the buyer sends this unique ID with the auction data.  During render and conversion time, the data from the fenced frame or iframe is also sent out with the same unique ID. Later, the unique ID can be used to associate these reports together.

Workflow: 

1. Before the auction starts, the buyer sends a unique ID to the seller as part of their programmatic [real-time bidding (“RTB”) bid response](https://github.com/google/ads-privacy/tree/master/proposals/fledge-rtb). The ID can be set as a variable like `auctionId`. The ID is passed in as `perBuyerSignals` in the `auctionConfig` and it becomes available in buyer’s worklets. 
2. During auction time, the buyer can register an ad beacon to be triggered during ad render time and conversion time (`registerAdBeacon()`). 
    1. To associate auction signals for an ad frame event, set the `auctionId` as a query param of the beacon URL.  
    2. To associate auction signals for a conversion event, set the `auctionId` in the beacon URL.
3. During ad render time, the beacons you registered during auction time can be triggered or enhanced with event-level data.  
    3. Trigger the frame event with `reportEvent()` and pass in the event-level data. 
    4. Add event-level payload to the attribution beacon with `setReportEventDataForAutomaticBeacons()` 
    5. Register the ad with the Attribution Reporting API by responding to the ad beacon requests with the `Attribution-Reporting-Register-Source` header.
4. During conversion time, you can trigger the source you registered during auction time. 

After the above process, the buyer will have an auction report, engagement report, and conversion report, all tied together by a single unique key that can be used to associate with each other. 

Similar workflow applies to a seller if it needs access to attribution data, and the seller can also use a unique ID to send with `registerAdBeacon()`. From the frame, the `reportEvent()` call contains a destination property that can be used to send the report to both the buyer and the seller. Note that the SSP must be also present on the landing page for the trigger to be attributed to the source. 

## Aggregating Protected Audience data

The Private Aggregation API is the mechanism used to report Protected Audience data to generate a [summary report](/docs/privacy-sandbox/summary-reports/), which is a noisy, aggregated report of data collected in buckets. A bucket is represented by an aggregation key, and some information can be encoded into the key. 

For example, an ad impression event can be counted into different buckets, where each bucket represents a different ad campaign. A summary report differs from an event-level report in that it doesn’t reveal information about each individual event. With an event-level report, you can determine that users A, B and C have seen the campaign 123. With summary reports, you can measure the number of users that have seen campaign 123 and [noise is added](/docs/privacy-sandbox/aggregation-service/#noise-scale) to protect user privacy. 

See the [Private Aggregation](/docs/privacy-sandbox/private-aggregation/) article for more on the API.

### Aggregating auction signals

You can aggregate the signals available within worklets to your server using Private Aggregation. For signal aggregation, you can use the <code>[privateAggregation.contributeToHistogram()](/docs/privacy-sandbox/private-aggregation/#sendhistogramreport)</code> method available in the buyer bidding worklet, seller scoring worklet , and buyer/seller reporting worklets.  

In this example, the winning bid is aggregated into the interest group owner bucket:

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

This is the general mechanism to use when the signals you want to aggregate are not associated with event-level data and are not triggered by an event outside of the auction. To learn more about reporting auction signals, see the [explainer](https://github.com/patcg-individual-drafts/private-aggregation-api). 

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

### Reporting auction results and performance

You can also aggregate auction results when triggered by an auction win or loss event with `contributeToHistogramOnEvent(eventType, contribution)` when you pass in a reserved event type keywords (`reserved.win, reserved.loss`, and `reserved.always`).  

Private Aggregation provides [a list of base values](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md#reporting-api-informal-specification) you can calculate the bucket and value of your contribution from. The available base values for auction results are the bid value of the winning ad, the bid value that was scored as second highest, and the reason a bid was rejected from the auction.

When some base value is provided, like the winning bid amount, you can set how much to add or subtract from that value, then report the final value. For example, if the winning bid of $5 is provided as the base value, you can subtract your bid of $2 to calculate the actual value of $3 of how much you lost your auction by. 

#### Auction results reporting

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

#### Performance reporting

Buyers and sellers can report how long a script has taken to execute, and how long it has taken to fetch the trusted signals. Sellers can collect the bid generation time and trusted bidding signal time of each buyer with their permission. 

See the [explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md#reporting-per-buyer-latency-and-statistics-to-the-seller) to learn more. 

## Storing auction signals in Shared Storage

[Shared storage](/docs/privacy-sandbox/shared-storage/) is an unpartitioned and cross-origin storage that you can write freely into, but is guarded with gates when reading and processing the stored values. One of the available gates for the Shared Storage API is Private Aggregation. You can only read the values in shared storage from inside a worklet, and you can report those values using Private Aggregation from the worklet.

You can also write to shared storage from Protected Audience API bidding, scoring, and reporting worklets. At a later point in time, you can report those values in shared storage to your server using Private Aggregation . You can also use the stored values for the [URL Selection](https://github.com/WICG/shared-storage#url-selection) operation. 

From a Protected Audience API worklet, you can write any keys and values to shared storage:

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

---
layout: 'layouts/doc-post.njk'
title: 'Private Aggregation API'
subhead: >
   Generate aggregate data reports using data from Protected Audience and cross-site
   data from Shared Storage.
description: >
   Generate aggregate data reports using data from Protected Audience and cross-site
   data from Shared Storage.
date: 2022-10-11
updated: 2023-06-29
authors:
   - kevinkiklee
---

To provide critical features that the web relies on, the Private Aggregation
API has been proposed for aggregating and reporting on cross-site data in a
privacy-preserving manner. 

## Implementation status

{% Partial 'privacy-sandbox/timeline/private-aggregation.njk' %}

## What is the Private Aggregation API

The Private Aggregation API allows developers to generate aggregate data reports
with data from the [Protected Audience API](/docs/privacy-sandbox/fledge/) and
cross-site data from [Shared Storage](/docs/privacy-sandbox/shared-storage/). 

This API currently provides one operation, `sendHistogramReport()`, but more may be
supported in the future. The histogram operation allows you to aggregate data
across users in each bucket (known in the API as an aggregation key) you define.
Your histogram call accumulates values and returns a noised aggregated result in
the form of a summary report. For instance, the report might show the number of
sites each user has seen your content on, or come across a bug in your third-party script. This operation is performed within another API’s worklet.

{% Aside 'key-term' %}
A _[worklet](https://developer.mozilla.org/docs/Web/API/Worklet)_ allows you to run specific JavaScript functions and return information back to the requester. Within a worklet, you can execute JavaScript but you cannot interact or communicate with the outside page.
{% endAside %}

For example, if you have previously recorded demographic and geographic data in Shared Storage, you can use the Private Aggregation API to construct a histogram that tells you approximately how many users in New York City have seen your content cross-site. To aggregate for this measurement, you can encode the geography dimension into the aggregation key and count the users in the aggregatable value.

### Key concepts

When you call the Private Aggregation API with an aggregation key and an aggregatable value, the browser generates an aggregatable report. 

Aggregatable reports are sent to your server for collection and batching. The batched reports are processed later by the [Aggregation Service](/docs/privacy-sandbox/aggregation-service/), and a [summary report](/docs/privacy-sandbox/summary-reports/) is generated. 

See the [Private Aggregation API fundamentals](/docs/privacy-sandbox/private-aggregation-fundamentals) document to learn more about the key concepts involved with the Private Aggregation API.

### Differences from Attribution Reporting

The Private Aggregation API shares many similarities with the [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/). Attribution Reporting is a standalone API designed to measure conversions, whereas Private Aggregation is built for cross-site measurements in conjunction with APIs such as the Protected Audience API and Shared Storage. Both APIs produce aggregatable reports that are consumed by the Aggregation Service back-end to generate summary reports. 

Attribution Reporting associates data gathered from an impression event and a conversion event, which happen at different times. Private Aggregation measures a single, cross-site event. 

## Test this API

The API is available in the [Privacy Sandbox unified origin trial](/docs/privacy-sandbox/unified-origin-trial/) on Chrome Canary and Dev M107 or later. Learn how you can register for a [third-party origin trial](/docs/web-platform/third-party-origin-trials/).

The Private Aggregation API can also be locally tested by enabling
the Privacy Sandbox Ads APIs experiment flag at
`chrome://flags/#privacy-sandbox-ads-apis`.

{% Img
	src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png",
	alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs",
	width="744", height="124"
%}

Read more about testing in [experiment and participate](/docs/privacy-sandbox/private-aggregation-experiment/).

### Use the demo

The demo of Private Aggregation API for Shared Storage can be accessed at [goo.gle/shared-storage-demo](http://goo.gle/shared-storage-demo), and the code is available on [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo). The demo implements the client-side operations and produces an aggregatable report that is sent to your server. 

A demo of Private Aggregation API for the Protected Audience API will be published in the future. 

## Use cases

Private Aggregation is a general purpose API for cross-site measurement, and it’s available to be used in [Shared Storage](/docs/privacy-sandbox/shared-storage/) and [Protected Audience API](/docs/privacy-sandbox/fledge/) worklets. The first step is to decide specifically what information you want to collect. Those data points are the basis of your aggregation keys.

### With Shared storage

[Shared Storage](/docs/privacy-sandbox/shared-storage/) allows you to read and write cross-site data in a secure environment to prevent leakage, and the Private Aggregation API allows you to measure cross-site data stored in Shared Storage. 

#### Unique reach measurement

You may want to measure how many unique users have seen their content. Private Aggregation API can provide an answer such as "Approximately 317 unique users have seen the Content ID 861." 

You can set a flag in Shared Storage to signify whether the user has already seen the content or not. On the first visit where the flag does not exist, a call to Private Aggregation is made and then the flag is set. On subsequent visits by the user, including cross-site visits, you can check Shared Storage and skip submitting a report to Private Aggregation if the flag is set. 

#### Demographics measurement

You may want to measure the demographics of the users who have seen your content across different sites.

Private Aggregation can provide an answer, such as "Approximately 317 unique users are from the age of 18-45 and are from Germany." Use Shared Storage to access demographics data from a third-party context. At a later point in time, you can generate a report with Private Aggregation by encoding the age group and country dimensions in the aggregation key. 

#### K+ frequency measurement

You may want to measure the number of users who have seen a piece of content or an ad at least K times on a given browser, for a pre-chosen value of K.

Private Aggregation can provide an answer such as "Approximately 89 users have seen the Content ID 581 at least 3 times." A counter can be incremented in Shared Storage from different sites and can be read within a worklet. When the count has reached K, a report can be submitted via Private Aggregation. 

### With the Protected Audience API

The Protected Audience API enables retargeting and custom audience use cases, and Private Aggregation allows you to report events from buyer and seller worklets. The API can be used for tasks such as measuring the distribution of auction bids.

From a Protected Audience API worklet, you can aggregate your data directly using `sendHistogramReport()` and report your data based on a trigger using `reportContributionForEvent()`, which is a special extension for the Protected Audience API.

## Available functions

The following functions are available in the `privateAggregation` object available in Shared Storage and Protected Audience API worklets. To learn how to run your code in a worklet, refer to the [Shared Storage code samples](/docs/privacy-sandbox/use-shared-storage/). 

### contributeToHistogram()

You can call `privateAggregation.contributeToHistogram({ bucket: <bucket>, value: <value> })`, where the aggregation key is `bucket` and the aggregatable value as `value`. For the `bucket` parameter, a `BigInt` is required. For the `value` parameter, an integer Number is required.

Here is an example of how it may be called in Shared Storage for reach measurement: 

#### `iframe.js`

```js
// Cross-site iframe code

async function measureReach() {
 // Register worklet
 await window.sharedStorage.worklet.addModule('worklet.js');

 // Run reach measurement operation
 await window.sharedStorage.run('reach-measurement', { 
  data: { contentId: '1234' } 
 });
}

measureReach();
```

#### `worklet.js`

```js
// Shared storage worklet code

function convertContentIdToBucket(camapignId){ 
  // Generate aggregation key
}

// The scale factor is multiplied by the aggregatable value to
// maximize the signal-to-noise ratio. See "Noise and scaling" 
// section in the Aggregation Fundamentals document to learn more.
const SCALE_FACTOR = 65536;

class ReachMeasurementOperation {
  async run(data) {
    const key = 'has-reported-content';
    // Read the flag from Shared Storage
    const hasReportedContent = await this.sharedStorage.get(key) === 'true';

    // Do not send report if the flag is set
    if (hasReportedContent) {
      return;
    }

    // Send histogram report
    // Set the aggregation key in `bucket`
    // Bucket examples: 54153254n or BigInt(54153254)
    // Set the scaled aggregatable value in `value`
    privateAggregation.contributeToHistogram({
      bucket: convertContentIdToBucket(data.contentId), 
      value: 1 * SCALE_FACTOR 
    });

    // Set the flag in Shared Storage
    await this.sharedStorage.set(key, true);
  }
}

register('reach-measurement', ReachMeasurementOperation);
```

The above code example will call Private Aggregation whenever the cross-site iframe content is loaded. The iframe code loads the worklet, and the worklet calls the Private Aggregation API with the content ID converted to an aggregation key (bucket). 


### contributeToHistogramOnEvent()

Within Protected Audience API worklets only, we provide a trigger-based mechanism for sending a report only if a certain event occurs. This function also allows for the bucket and value to depend on signals that are not yet available at that point in the auction.

The `privateAggregation.reportContributionForEvent(eventType, contribution)` method takes an `eventType` that specifies the triggering event, and the `contribution` to be submitted when the event is triggered. The triggering event can come from the auction itself after the auction ends, such as an auction win or loss event, or it can come from a fenced frame that rendered the ad. 
To send a report for auction events, you can use two reserved keywords, `reserved.win`, `reserved.loss`, and `reserved.always`. To submit a report triggered by an event from a fenced frame, define a custom event type. To trigger the event from a fenced frame, use the [`fence.reportEvent()`](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent) method available from the [Fenced Frames Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md). 

The following example sends an impression report when the auction win event is triggered, and sends a click report if a `click` event is triggered from the fenced frame that rendered the ad. These two values can be used to calculate the clickthrough rate. 

```js
function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
  // …
  privateAggregation.contributeToHistogramOnEvent(“reserved.win”, {
      bucket: getImpressionReportBucket(),
      value: 1
  });
  privateAggregation.contributeToHistogramOnEvent("click", {
      bucket: getClickReportBuckets(), // 128-bit integer as BigInt
      value: 1
  });
```

See the [Extended Private Aggregation Reporting explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md) to learn more. 

### enableDebugMode()

While third-party cookies are still available, we'll provide a temporary mechanism that allows easier debugging and testing by enabling the debug mode. A debug report is useful in comparing your cookie-based measurements with your Private Aggregation measurements, and also allows you to quickly validate your API integration. 

Calling `privateAggregation.enableDebugMode()` in the worklet enables the debug mode which causes aggregatable reports to include the unencrypted (cleartext) payload. You can then process these payloads with the Aggregation Service [local testing tool](https://github.com/google/trusted-execution-aggregation-service#set-up-local-testing). 

You can also set the debug key by calling `privateAggregation.enableDebugMode({ <debugKey: debugKey> })` where a `BigInt` can be used as a debug key. The debug key can be used to associate data from a cookie-based measurement and data from Private Aggregation measurement. These can be called only once per context. Any subsequent calls will be ignored.

```js
// Enables debug mode
privateAggregation.enableDebugMode();

// Enables debug mode and sets a debug key
privateAggregation.enableDebugMode({ debugKey: BigInt(1234) });
```

## Report verification

For Shared Storage, you can verify the aggregatable reports you received are legitimate by [adding a context ID](https://github.com/patcg-individual-drafts/private-aggregation-api/blob/main/report_verification.md#shared-storage) to the shared storage operation call. The ID will be attached to the sent report, and at a later time, you can use that ID to verify that the report was sent from your shared storage operation.

The feature is available for testing in Chrome M114+. Report verification for the Protected Audience API is not yet available for testing.

To learn more, see the [report verification explainer](https://github.com/patcg-individual-drafts/private-aggregation-api/blob/main/report_verification.md#shared-storage). 

## Engage and share feedback

The Private Aggregation API proposal is under active discussion and subject to change in the future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the [proposal](https://github.com/patcg-individual-drafts/private-aggregation-api), [raise questions and participate in discussion](https://github.com/patcg-individual-drafts/private-aggregation-api/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
*  Join the [Shared Storage API group](https://groups.google.com/a/chromium.org/g/shared-storage-api-announcements) and the [Protected Audience API group](https://groups.google.com/a/chromium.org/g/fledge-api-announce/) for the latest announcements related to Private Aggregation. 

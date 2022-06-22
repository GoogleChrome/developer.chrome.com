---
layout: 'layouts/doc-post.njk'
title: 'Shared Storage'
subhead: >
  Allow access to unpartitioned cross-site data in a secure environment.
description: >
  Allow access to unpartitioned cross-site data in a secure environment.
date: 2022-04-25
updated: 2022-06-06
authors:
  - alexandrawhite
  - kevinkiklee
---

## Implementation status

This document outlines a new proposal for unpartitioned storage: the Shared
Storage API.

*  The [Shared Storage proposal](https://github.com/pythagoraskitty/shared-storage)
   has entered [public discussion](https://github.com/pythagoraskitty/shared-storage/issues).
*  We are implementing this API in Chrome, and the [live demo is available](#try-the-shared-storage-api).
   *  The initial origin trial will likely only include the `selectURL` API
	 function. Support for the Private Aggregation API is planned shortly after.
   *  The `selectURL` API is available for testing in Chrome Canary as of M104.
*  [The Privacy Sandbox timeline](http://privacysandbox.com/timeline)
   provides implementation timings for the Shared Storage API and other
   Privacy Sandbox proposals.

## Why do we need this API?

To prevent cross-site user tracking, browsers are 
[partitioning](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)
all forms of storage (cookies, localStorage, caches, etc). However, there are
a number of legitimate use cases that rely on unpartitioned storage which
would be impossible without help from new web APIs. For example, a publisher
may want to measure reach of an ad campaign across different sites, while
preserving individual user privacy and identity.

The proposed Shared Storage API will allow sites to store and access
unpartitioned cross-site data. This data must be read in a secure environment
to prevent leakage. This API will work in combination with other proposals,
such as [Trust Tokens](/docs/privacy-sandbox/trust-tokens/),
[Fenced Frames](/docs/privacy-sandbox/fenced-frame/), and others.

## Use cases for Shared Storage

The Shared Storage API intends to support many use cases, replacing several
existing uses for third-party cookies. This may include:

*  **Frequency capping** - When the same ad is shown repeatedly to a user, the ad starts to lose its effectiveness. Frequency capping allows you to limit the number of times an ad can be shown to a user. The count of how many times the user has seen the ad is saved in shared storage and can be accessed [cross-site](https://web.dev/same-site-same-origin/). 
*  **A/B testing, such as brand lift experiment** - To see if an experiment has the desired effect, you can conduct A/B testing across multiple sites. As an advertiser, you can choose to render a different ad based on what group the user is assigned to. The group assignment is saved in shared storage.
* **Creative rotation** - An advertiser may want to apply different strategies to an ad campaign, and rotate the creatives to increase effectiveness of the ads. Shared storage can be used to run different rotation strategies, such as sequential rotation and evenly-distributed rotation, across different sites.
* **Known customer** - You may want to render a different element based on whether the user was seen on a different site. For example, a payment provider may want to render a "Register" or "Buy now" button based on whether the user has registered at the payment provider's site. Shared storage can be used to set the user's status.
* **Reach measurement and custom reporting** - Advertisers can save user information, such as demographics, reach, frequency measurement, and conversion measurement, in shared storage. The [Private Aggregation API](https://github.com/alexmturner/private-aggregation-api) can be used transmit and processes the data in a privacy-preserving way to generate an aggregated report.

The proposal intends to create a general purpose API which supports many
possible future use cases. This allows for further experimentation and change,
to grow alongside the web ecosystem.

Frequency capping, A/B testing, creative rotation, and known customer use cases can be seen in the [live demo](#try-the-shared-storage-api).

## How will shared storage work?

Shared storage will allow you to make informed decisions based on cross-site
data, without sharing user information (such as browser history or other
personal details) with an embedding site. You can write to  shared storage at
any time, like other JavaScript storage APIs (like localStorage or indexedDB).
Unlike the other storage APIs, you can only read the shared storage values in
a secure environment, known as a shared storage worklet.

The shared storage data can be used for:

*  [**URL selection**](#url-selection): you can run a worklet script to select
   a URL from a provided list, based on the stored data, and then render that
   URL in a fenced frame.  The returned URL will be an opaque URL, which means
   the developer and other viewers of the code won't know which URL was
   selected.
*  [**Noisy aggregation of cross-site data**](#aggregated-data): you will be
   able to run a worklet script to send your data through the
   [Private Aggregation API](https://github.com/alexmturner/private-aggregation-api),
   a Privacy Sandbox proposal, which returns a privacy-preserving report. 

### Example: URL selection for frequency capping {: #url-selection }

To select and create an opaque URL, register a worklet module to read shared
storage data. The worklet class receives a list of up to eight URLs and then
returns the index of the chosen URL. 

When the client calls `sharedStorage.selectURL()`, the worklet
executes and returns an opaque URL to be rendered into a fenced frame.

Let's say you want to render an ad based on the advertiser's frequency cap
(the maximum number of impressions for a user on a single ad). The frequency
cap value is stored in shared storage. The shared storage worklet reads the
values in shared storage, and decrements the value with each additional view.
If there are available impressions left (the user has not hit their frequency
cap), the ad is returned (index `1`). If not, the default URL is returned
(index `0`).

In this example, the adtech creates two files:

*  `get-url.js` is the shared storage worklet, which evaluates the frequency
   cap to determine which URL is returned for the ad creative.
*  `ad-iframe.js` selects and renders the ad creative and is injected on a
   publisher's website.

#### `get-url.js`

```javascript
class SelectURLOperation {
  async run(data, urls) {

    // Read the frequency cap value in shared storage
    const frequencycap = await this.sharedStorage.get('frequencycap');

    // If no impressions remain, return the default URL
    if (frequencyCap === 0) {
      return 0;
    }

    // If there are available impressions, subtract 1 and return the ad URL
    await this.sharedStorage.set('frequencycap', frequencycap - 1);
    return 1;
  }
}

// Register the operation
register(
   'select-url', SelectURLOperation
);
```

#### `ad-iframe.js`

```javascript
// Set up the default and ad URLs
const defaultUrl = new URL('https://default.example');
const adUrl = new URL('[https://ad.example](https://ad.example)');

// Register the worklet module
await window.sharedStorage.worklet.addModule('get-url.js');

// Set the frequency cap for this campaign, if it wasn't already set
window.sharedStorage.set('frequencycap', 5, { ignoreIfPresent: true });

// Select the URL from available options
const opaqueUrl = await window.sharedStorage.selectURL(
  'select-url', [defaultUrl, adUrl]
);

// Render the returned URL into an iframe or a fenced frame
document.getElementById('example-iframe').src = opaqueUrl;
```

### Example: aggregation of cross-site data (ad campaign reach) {: #aggregated-data }

You can also send that data to an aggregation service that measures the reach
across sites, while protecting user privacy by aggregating data about users.

For example, a consumer goods company runs an awareness ad campaign across
multiple sites, to maximize the number of people who see their ad. The company
wants to know their reach, how many unique users have seen the ad. In this
example, the publisher creates two files: 

*  `ad-iframe.js` should be embedded in the iframe, which calls to the shared
   storage worklet and sends a report with the ad campaign ID.
*  `reach.js`  is the shared storage worklet which sends the reach report to
   be aggregated.

#### `ad-iframe.js`

```javascript
await window.sharedStorage.worklet.addModule("reach.js");

// Send a report to the shared storage worklet
await window.sharedStorage.run("send-reach-report", {
  data: {
     "campaign-id": "1234"
  }
});
```

#### `reach.js`

```javascript
class SendReachReportOperation {
  async run(data) {
    const report_sent_for_campaign = "report-sent-" + data["campaign-id"];

    // Compute reach for users who haven't previously had a report sent
    // for this campaign.
    // Users who previously triggered a report for this campaign, on a site
    // other than the current one, will be skipped.
    if (await this.sharedStorage.get(report_sent_for_campaign) === "yes") {
      return;  // Don't send a report.
    }

    // The user agent sends the report to a default endpoint after a delay.
    privateAggregation.sendHistogramReport({
      bucket: data["campaign-id"];
      value: 128,  // A predetermined fixed value; see Private Aggregation API explainer: Scaling values.
   });

   await this.sharedStorage.set(report_sent_for_campaign, "yes");
  }
}

register("send-reach-report", SendReachReportOperation);
```

## Try the Shared Storage API

### How to enable Shared Storage

Shared Storage API with Fenced Frames can be tested in Chrome 104 (version
104.0.5086.0 or later) by enabling the **Privacy Sandbox Ads APIs experiment**
flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png", alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs", width="744", height="124" %}

### How to use the demo

The demo can be accessed from the [live site](https://shared-storage-demo.web.app), and the code is available on [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo). 

The demo is constructed from the perspective of an advertiser/DSP that wants to store information across different publishers. Think of the advertiser as a shoe company, and the publishers as news companies. In the demo, the same advertiser code will run on both **Publisher A** and **Publisher B** sites for each use case. Visit both publishers to see how the data is shared between two sites.

The demo contains frequency capping, creative rotation, known customer, and A/B testing use cases.

## Engage and share feedback

The shared storage proposal is under active discussion and subject to change
in the future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the
   [proposal](https://github.com/pythagoraskitty/shared-storage), [raise questions and participate in discussion](https://github.com/pythagoraskitty/shared-storage/issues).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

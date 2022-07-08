---
layout: 'layouts/doc-post.njk'
title: 'Use Shared Storage'
subhead: >
  Examine use cases and code samples for Shared Storage.
description: >
  Examine use cases and code samples for Shared Storage.
date: 2022-06-28
updated: 2022-06-28
authors:
  - alexandrawhite
  - kevinkiklee
---

The Shared Storage proposal intends to create a general purpose cross-site
storage API which supports many possible use cases. In this document, you'll
find code samples to help you get started.

The following features are available to test in Chrome 104:

*  [**URL selection**](#url-selection): you can run a worklet script to select
   a URL from a provided list, based on the stored data, and then render that
   URL in a fenced frame. This has many possible uses, such as selecting new
   ads when a frequency cap is reached.
*  [**A/B testing**](#ab-testing): You can assign a user to an experiment
   group, then store that group in Shared Storage to be accessed cross-site. 
*  [**Creative rotation**](#creative-rotation): You can store the creative
   rotation mode, and other metadata, to rotate the creatives across different sites. 
*  [**Known customer for payment provider**](#known-customer): You can store
   whether the user has registered on your site into Shared Storage, then
   render a different element based on that stored status.

The following use case isn't available for testing in Chrome Beta, but we
intend to support it in the future:

*  [**Noisy aggregation of cross-site data**](#aggregated-data): you will be
   able to run a worklet script to send your data through the
   [Private Aggregation API](https://github.com/alexmturner/private-aggregation-api)
   (currently a draft proposal), a Privacy Sandbox proposal, which returns a
   privacy-preserving report. 

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.

## Try the Shared Storage API

Shared Storage API with Fenced Frames can be tested in Chrome 104 (version
104.0.5086.0 or later) by enabling the **Privacy Sandbox Ads APIs experiment**
flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img
	src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png",
	alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs",
	width="744", height="124"
%}

### Use the demo

The demo can be accessed at [goo.gle/ss-demo](http://goo.gle/ss-demo),
and the code is available on
[GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo). 

The demo is constructed from the perspective of an advertiser/DSP that wants to
store information across different publishers. Think of the advertiser as a
shoe company, and the publishers as news companies. In the demo, the same
advertiser code will run on both **Publisher A** and **Publisher B** sites for
each use case. Visit both publishers to see how the data is shared between two
sites. 

The demo contains frequency capping, creative rotation, known customer, and A/B
testing use cases.


## Experiment with code samples

{% Aside %}

The following code samples were created to demonstrate how the API may be used
for the given use cases. These are not meant to be used in production.

{% endAside %}

### URL selection {: #url-selection }

To select and create an opaque URL, register a worklet module to read shared
storage data. The worklet class receives a list of up to eight URLs and then
returns the index of the chosen URL. 

When the client calls `sharedStorage.runURLSelectionOperation()`, the worklet
executes and returns an opaque URL to be rendered into a [fenced frame](/docs/privacy-sandbox/fenced-frame/).

Let's say you want to render an ad based on the advertiser's frequency cap (the
maximum number of impressions for a user on a single ad over a set period of
time). The frequency cap value is stored in shared storage. The shared storage
worklet reads the values in shared storage, and decrements the value with each
additional view. If there are available impressions left (the user has not hit
their frequency cap), the ad is returned (index `1`). If not, the default URL
is returned (index `0`).

In this example:

*  `frequency-cap.js` is loaded via the advertiser's iframe, and is responsible
   for loading the shared storage worklet, and rendering the returned opaque
   source into a fenced frame.
*  `frequency-cap-worklet.js` is the shared storage worklet that reads the
   frequency cap count value to determine which URL is returned for the ad creative.

**[frequency-cap.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/frequency-cap.js)**

```javascript
// The first URL is the default ad to be rendered when the frequency cap is reached
const AD_URLS = [
  { url: `https://localhost:4437/ads/default-ad.html` },
  { url: `https://localhost:4437/ads/example-ad.html` },
];

async function injectAd() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('frequency-cap-worklet.js');

  // Set the initial frequency cap to 5
  window.sharedStorage.set('frequency-cap-count', 5, {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation to choose an ad based on the frequency cap in shared storage
  const opaqueURL = await window.sharedStorage.selectURL('frequency-cap', AD_URLS);

  // Render the opaque URL into a fenced frame
  document.getElementById('ad-slot').src = opaqueURL;
}

injectAd();
```

**[frequency-cap-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/frequency-cap-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls, data) {
    // Read the current frequency cap in shared storage
    const count = parseInt(await this.sharedStorage.get('frequency-cap-count'));

    // If the count is 0, the frequency cap has been reached
    if (count === 0) {
      console.log('frequency cap has been reached, and the default ad will be rendered');
      return 0;
    }

    // Set the new frequency count in shared storage
    await this.sharedStorage.set('frequency-cap-count', count - 1);
    return 1;
  }
}

// Register the operation as 'frequency-cap'
register('frequency-cap', SelectURLOperation);
```

### A/B testing {: #ab-testing }

To see if an experiment has the desired effect, you can run A/B testing across
multiple sites. As an advertiser, you can choose to render a different ad based
on what group the user is assigned to. The group assignment is saved in shared
storage.

In this example:

*  `ab-testing.js` should be embedded in an ad iframe, which maps a control and
   two experiment ads. The script calls the shared storage worklet for the experiment.
*  `ab-testing-worklet.js`  is the shared storage worklet that returns which
   group the user is assigned to, determining which ad is shown.

**[ab-testing.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/ab-testing.js)**

```javascript
// Map the experiment groups to the URLs
const EXPERIMENT_MAP = [
  {
    group: 'control',
    url: `https://advertiser.example/ads/default-ad.html`,
  },
  {
    group: 'experiment-a',
    url: `https://advertiser.example/ads/experiment-ad-a.html`,
  },
  {
    group: 'experiment-b',
    url: `https://advertiser.example/ads/experiment-ad-b.html`,
  },
];

// Choose a random group for the initial experiment
function getRandomExperiment() {
  const randomIndex = Math.floor(Math.random() * EXPERIMENT_MAP.length);
  return EXPERIMENT_MAP[randomIndex].group;
}

async function injectAd() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('ab-testing-worklet.js');

  // Set the initial value in the storage to a random experiment group
  window.sharedStorage.set('ab-testing-group', getRandomExperiment(), {
    ignoreIfPresent: true,
  });

  const urls = EXPERIMENT_MAP.map(({ url }) => ({ url }));
  const groups = EXPERIMENT_MAP.map(({ group }) => group);

  // Run the URL selection operation to select an ad based on the experiment group in shared storage
  const opaqueURL = await window.sharedStorage.selectURL('ab-testing', urls, { data: groups });

  // Render the opaque URL into a fenced frame
  document.getElementById('ad-slot').src = opaqueURL;
}

injectAd();
```

**[ab-testing-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/ab-testing-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls, data) {
    // Read the user's group from shared storage
    const experimentGroup = await this.sharedStorage.get('ab-testing-group');

    // Return the index of the group
    return data.indexOf(experimentGroup);
  }
}

register('ab-testing', SelectURLOperation);
```

### Creative rotation {: #creative-rotation }

An advertiser may want to apply different strategies to an ad campaign, and
rotate the creatives to increase effectiveness of the ads. Shared storage can
be used to run different rotation strategies, such as sequential rotation and
evenly-distributed rotation, across different sites.

In this example:

*  `creative-rotation.js` is embedded in an ad iframe. This script sets which
   ads are the most important (ad weight), and calls to the worklet to
   determine which ad should be displayed.
*  `creative-rotation-worklet.js`  is the shared storage worklet that
   determines the weighted distribution for the ad creatives and returns which
   should be displayed.

**[creative-rotation.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/creative-rotation.js)**

```javascript
// Ad config with the URL of the ad, a probability weight for rotation, and the clickthrough rate.
const DEMO_AD_CONFIG = [
  {
    url: 'https://advertiser.example/ads/ad-1.html',
    weight: 0.7,
  },
  {
    url: 'https://advertiser.example/ads/ad-2.html',
    weight: 0.2,
  },
  {
    url: 'https://advertiser.example/ads/ad-3.html',
    weight: 0.1,
  },
];

// Set the mode to sequential and set the starting index to 0.
async function seedStorage() {
  await window.sharedStorage.set('creative-rotation-mode', 'sequential', {
    ignoreIfPresent: true,
  });

  await window.sharedStorage.set('creative-rotation-index', 0, {
    ignoreIfPresent: true,
  });
}

async function injectAd() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('creative-rotation-worklet.js');

  // Initially set the storage to sequential mode for the demo
  seedStorage();

  // Run the URL selection operation to determine the next ad that should be rendered
  const urls = DEMO_AD_CONFIG.map(({ url }) => ({ url }));
  const opaqueURL = await window.sharedStorage.selectURL('creative-rotation', urls, { data: DEMO_AD_CONFIG });

  // Render the opaque URL into a fenced frame
  document.getElementById('ad-slot').src = opaqueURL;
}

injectAd();
```

**[creative-rotation-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/creative-rotation-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls, data) {
    // Read the rotation mode from Shared Storage
    const rotationMode = await this.sharedStorage.get('creative-rotation-mode');

    // Generate a random number to be used for rotation
    const randomNumber = Math.random();

    let index;

    switch (rotationMode) {
      /**
       * Sequential rotation
       * - Rotates the creatives in order
       * - Example: A -> B -> C -> A ...
       */
      case 'sequential':
        const currentIndex = await this.sharedStorage.get('creative-rotation-index');
        index = parseInt(currentIndex, 10);
        const nextIndex = (index + 1) % urls.length;

        await this.sharedStorage.set('creative-rotation-index', nextIndex);
        break;

      /**
       * Weighted rotation
       * - Rotates the creatives with weighted probability
       * - Example: A=70% / B=20% / C=10%
       */
      case 'weighted-distribution':
        // Find the first URL where the cumulative sum of the weights
        // exceed the random number. The array is sorted by the weight
        // in descending order.
        let weightSum = 0;
        const { url } = data
          .sort((a, b) => b.weight - a.weight)
          .find(({ weight }) => {
            weightSum += weight;
            return weightSum > randomNumber;
          });

        index = urls.indexOf(url);
        break;

      default:
        index = 0;
    }

    return index;
  }
}

register('creative-rotation', SelectURLOperation);
```

### Known customer {: #known-customer }

You may want to render a different element based on whether the user was seen
on a different site. For example, a payment provider may want to render a
"Register" or "Buy now" button based on whether the user has registered at the
payment provider's site. Shared storage can be used to set the user's status.

In this example:

*  `known-customer.js` is embedded in an ad iframe. This script sets the
   options for which button should be displayed on a site, "Register" or "Buy now."
*  `known-customer-worklet.js`  is the shared storage worklet that determines
   if the user is known. If the user is known, the information is returned. If
   the user is unknown, that information is returned to display the "Register"
   button and the user is marked as known for the future.

**[known-customer.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/known-customer.js)**

```javascript
// The first URL for the "register" button is rendered for unknown users.
const AD_URLS = [
  { url: `https://${advertiserUrl}/ads/register-button.html` },
  { url: `https://${advertiserUrl}/ads/buy-now-button.html` },
];

async function injectAd() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('known-customer-worklet.js');

  // Set the initial status to unknown ('0' is unknown and '1' is known)
  window.sharedStorage.set('known-customer', 0, {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation to choose the button based on the user status
  const opaqueURL = await window.sharedStorage.selectURL('known-customer', AD_URLS);

  // Render the opaque URL into a fenced frame
  document.getElementById('button-slot').src = opaqueURL;
}

injectAd();
```

**[known-customer-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/known-customer-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls) {
    const knownCustomer = await this.sharedStorage.get('known-customer');

    // '0' is unknown and '1' is known
    return parseInt(knownCustomer);
  }
}

register('known-customer', SelectURLOperation);
```

### Cross-site data aggregation (ad campaign reach) {: #aggregated-data }

{% Aside %}

This proposed use case relies on the aggregation service, which is not yet
available. Once ready, this documentation will be updated.

{% endAside %}

You can also send that data to an aggregation service that measures the reach
across sites, while protecting user privacy by aggregating data about users.

For example, a consumer goods company runs an awareness ad campaign across
multiple sites, to maximize the number of people who see their ad. The company
wants to know their reach, how many unique users have seen the ad. In this
example, the publisher creates two files: 

* `ad-iframe.js` should be embedded in the iframe, which calls to the shared storage worklet and sends a report with the ad campaign ID.
* `reach-worklet.js`  is the shared storage worklet which sends the reach report to be aggregated.

**ad-iframe.js**

```javascript
await window.sharedStorage.worklet.addModule("reach.js");
await window.sharedStorage.runOperation("send-reach-report", {
  data: {
     "campaign-id": "1234"
  }
});
```

**reach-worklet.js**

```javascript
class SendReachReportOperation {
  async function run(data) {
    const report_sent_for_campaign = "report-sent-" + data["campaign-id"];
    
    // Compute reach only for users who haven't previously
	 // had a report sent for this campaign.
    // Users who previously triggered a report for this campaign on  
    // a site other than the current one will be skipped.
    if (await this.sharedStorage.get(report_sent_for_campaign) === "yes") {
      return;  // Don't send a report.
    }

    // The user agent will send the report to a default endpoint after
	 // a delay.
    privateAggregation.sendHistogramReport({
      bucket: data["campaign-id"];
      value: 128,  // A predetermined fixed value; see Private Aggregation API explainer: Scaling values.
      });
      
    await this.sharedStorage.set(report_sent_for_campaign, "yes");
  }
}
registerOperation("send-reach-report", SendReachReportOperation);
```

### User consent status {: #user-content-status }

Adtech companies often have cross-site consent statuses that they need to keep
track of. For example, an adtech company may want to store if a user consents
to an adtech's terms or service or policies related to regulations, such as
GDPR.  

Shared storage is not recommended for this use case for two main reasons: 

1. A user might opt-out of using the privacy sandbox apis, which would prevent
   organizations from using shared storage at all.
1. The current output gates will require k-anonymity or additional noise
   sometime after the Origin Trial, which would mean there is a non-zero chance
   the consent status would not be 100% accurately represented in all cases. 

## Engage and share feedback

The Shared Storage proposal is under active discussion and subject to change
in the future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the
   [proposal](https://github.com/pythagoraskitty/shared-storage), [raise questions and participate in discussion](https://github.com/pythagoraskitty/shared-storage/issues).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

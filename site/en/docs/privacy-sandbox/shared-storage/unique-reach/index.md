---
layout: 'layouts/doc-post.njk'
title: 'Unique reach measurement'
subhead: >
  Use Shared Storage and Private Aggregation for unique reach measurement
description: >
  Use Shared Storage and Private Aggregation for unique reach measurement
date: 2022-11-08
updated: 2023-01-19
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. [Private Aggregation API](/docs/privacy-sandbox/private-aggregation) is an output available in Shared Storage that allows you to aggregate cross-site data. 

## Try unique reach measurement

To experiment with unique reach measurement with Shared Storage and Private Aggregation, confirm you're using Chrome M107 or later. Then enable the **Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img
	src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png",
	alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs",
	width="744", height="124"
%}

You can also enable Shared Storage with the `--enable-features=PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting,SharedStorageAPI,FencedFrames` flag in the command line. 

## Experiment with code samples

{% Aside %}

The following code samples were created to demonstrate how the API may be used
for the given use cases. These are not meant to be used in production.

{% endAside %}

You may want to keep track of how many unique users have seen your content across different sites. In this example, the content ID dimension is encoded into the aggregation key (bucket), and the count is used as the aggregatable value. The summary report will contain information such as "Approximately 391 users have seen the content ID 123."

In this example:
*   `unique-reach-measurement.js` is loaded via a frame, and is responsible for loading the shared storage worklet.
*   `unique-reach-measurement-worklet.js` is the shared storage worklet that checks the flag in shared storage and sends a report via the Private Aggregation API.

[`reach-measurement.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/private-aggregation/reach-measurement.js)

```js 
async function measureUniqueReach() {
  // Load the Shared Storage worklet
  await window.sharedStorage.worklet.addModule('reach-measurement-worklet.js');

  // Run the reach measurement operation
  await window.sharedStorage.run('reach-measurement', { data: { contentId: '1234' } });
}

measureUniqueReach();
``` 

[`reach-measurement-worklet.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/private-aggregation/reach-measurement-worklet.js)
```js
// Learn more about noise and scaling from the Private Aggregation fundamentals
// documentation on Chrome blog
const SCALE_FACTOR = 65536;

function convertContentIdToBucket(contentId) {
  return BigInt(contentId);
}

class ReachMeasurementOperation {
  async run(data) {
    const { contentId } = data;

    // Read from Shared Storage
    const key = 'has-reported-content';
    const hasReportedContent = (await this.sharedStorage.get(key)) === 'true';

    // Do not report if a report has been sent already
    if (hasReportedContent) {
      return;
    }

    // Generate the aggregation key and the aggregatable value
    const bucket = convertContentIdToBucket(contentId);
    const value = 1 * SCALE_FACTOR;

    // Send an aggregatable report via the Private Aggregation API
    privateAggregation.sendHistogramReport({ bucket, value });

    // Set the report submission status flag
    await this.sharedStorage.set(key, true);
  }
}

// Register the operation
register('reach-measurement', ReachMeasurementOperation);
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

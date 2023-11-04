---
layout: 'layouts/doc-post.njk'
title: 'K+ frequency measurement'
subhead: >
  Use Shared Storage and Private Aggregation for K+ frequency measurement
description: >
  Use Shared Storage and Private Aggregation for K+ frequency measurement
date: 2022-11-08
updated: 2023-01-19
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. [Private Aggregation API](/docs/privacy-sandbox/private-aggregation) is an output available in Shared Storage that allows you to aggregate cross-site data. 

## Try K+ frequency measurement

To experiment with K+ frequency measurement with Shared Storage and Private Aggregation, confirm you're using Chrome M107 or later. Then enable the **Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

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

You may want to measure the number of users who have seen your content K or more times a given client across different sites. In this example, the impression count is added to shared storage where it increments by 1 whenever the content is loaded. When the impression count has reached 3, the Private Aggregation API is called. The content ID dimension is encoded as the aggregation key, and the count is used as the aggregatable value. The summary report will provide information such as "Approximately 391 users have seen the ad campaign ID 123 at least 3 times."

In this example:

*   [`k-frequency-measurement.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/private-aggregation/k-freq-measurement.js) is loaded via a frame, and is responsible for loading the shared storage worklet.
*   [`k-frequency-measurement-worklet.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/private-aggregation/k-freq-measurement-worklet.js) is the shared storage worklet that reads the impression count in shared storage and sends a report via the Private Aggregation API.

**`k-frequency-measurement.js`**

```js 
async function injectContent() {
  // Load the Shared Storage worklet
  await window.sharedStorage.worklet.addModule('k-freq-measurement-worklet.js');

  // Run the K-frequency measurement operation
  await window.sharedStorage.run('k-freq-measurement', { data: { kFreq: 3, contentId: 123 });
}

injectContent();
``` 
 
**`k-frequency-measurement-worklet.js`**

```js 
// Learn more about noise and scaling from the Private Aggregation fundamentals
// documentation on Chrome blog
const SCALE_FACTOR = 65536;

/**
 * The bucket key must be a number, and in this case, it is simply the content
 * ID itself. For more complex bucket key construction, see other use cases in
 * this demo.
 */
function convertContentIdToBucket(contentId) {
  return BigInt(contentId);
}

class KFreqMeasurementOperation {
  async run(data) {
    const { kFreq, contentId } = data;

    // Read from Shared Storage
    const hasReportedContentKey = 'has-reported-content';
    const impressionCountKey = 'impression-count';
    const hasReportedContent = (await this.sharedStorage.get(hasReportedContentKey)) === 'true';
    const impressionCount = parseInt((await this.sharedStorage.get(impressionCountKey)) || 0);

    // Do not report if a report has been sent already
    if (hasReportedContent) {
      return;
    }

    // Check impression count against frequency limit
    if (impressionCount < kFreq) {
      await this.sharedStorage.set(impressionCountKey, impressionCount + 1);
      return;
    }

    // Generate the aggregation key and the aggregatable value
    const bucket = convertContentIdToBucket(contentId);
    const value = 1 * SCALE_FACTOR;

    // Send an aggregatable report via the Private Aggregation API
    privateAggregation.sendHistogramReport({ bucket, value });

    // Set the report submission status flag
    await this.sharedStorage.set(hasReportedContentKey, 'true');
  }
}

// Register the operation

register('k-freq-measurement', KFreqMeasurementOperation); \
```
{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

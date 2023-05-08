---
layout: 'layouts/doc-post.njk'
title: 'User demographic reporting'
subhead: >
  Use Shared Storage and Private Aggregation for demographics measurement
description: >
  Use Shared Storage and Private Aggregation for demographics measurement
date: 2022-11-08
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. [Private Aggregation API](/docs/privacy-sandbox/private-aggregation) is an output available in Shared Storage that allows you to aggregate cross-site data. 

## Try user demographic measurement

To experiment with user demographic measurement with Shared Storage and Private Aggregation, confirm you're using Chrome Canary and Dev M107 or later. Then enable the **Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img
	src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png",
	alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs.",
	width="744", height="124"
%}

You can also enable Shared Storage with the `--enable-features=PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting,SharedStorageAPI,FencedFrames` flag in the command line. 

## Experiment with code samples

{% Aside %}

The following code samples were created to demonstrate how the API may be used
for the given use cases. These are not meant to be used in production.

{% endAside %}

You may want to measure certain demographics of the users who have seen your content across different sites, for example age range or geographical location. In this example, the content ID, age group ID, and the geography ID dimensions are encoded into the aggregation key (bucket), and the count is used as the aggregatable value. The summary report generated will provide information such as "Approximately 391 users who have seen the content ID 123 are between the age of 18-39 and are from Europe."

In this example:

* `demographic-measurement.js` is loaded via a frame, and is responsible for loading the shared storage worklet.
* `demographic-measurement-worklet.js` is the shared storage worklet that reads the demographics data in shared storage and sends a report via the Private Aggregation API.

[`store-demographic-data.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/private-aggregation/demographics-survey.js)

(Runs at some point in time before the measurement is made to set the demographics data into Shared Storage)

```js
function getDemogrationsData() {
  // Collect age group and continent data
  return {
    ageGroup,
    continent
  }
}

async function storeDemographics() {
  const { ageGroup, continent } = getDemographicsData();
  await window.sharedStorage.set('age-group', ageGroup);
  await window.sharedStorage.set('continent', continent);
}

storeDemographics();
```

[`demographic-measurement.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/private-aggregation/demographics-measurement.js)

```js
async function measureDemographics() {
  // Load the Shared Storage worklet
  await window.sharedStorage.worklet.addModule('demographics-measurement-worklet.js');

  // Run the demographics measurement operation
  await window.sharedStorage.run('demographics-measurement', { data: { contentId: '123' } });
}

measureDemographics();
```

[`demographic-measurement-worklet.js`](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/private-aggregation/demographics-measurement-worklet.js)

```js
// Learn more about noise and scaling from the Private Aggregation fundamentals
// documentation on Chrome blog
const SCALE_FACTOR = 65536;

/**
 * The bucket key must be a number, and in this case, it is simply the ad campaign
 * ID itself. For more complex bucket key construction, see other use cases in
 * this demo.
 */

const AGGREGATION_KEY_MAP = {
  ageGroupId: {
    '18-39': '1',
    '40-64': '2',
    '65+': '3',
  },

  continentId: {
    africa: '1',
    antarctica: '2',
    asia: '3',
    australia: '4',
    europe: '5',
    'north-america': '6',
    'south-america': '7',
  },

};

/**
 * The aggregation key will be in the format of:
 * contentId | ageGroupId | continentId
 *
 * For example, a user from Australia between the age of 40-64, who has
 * seen the Content ID 321 will be represented by the key:
 * 321 | 2 | 4 or 32124
 */

function generateAggregationKey(contentId, ageGroup, continent) {
  const ageGroupId = AGGREGATION_KEY_MAP.ageGroupId[ageGroup];
  const continentId = AGGREGATION_KEY_MAP.continentId[continent];
  const aggregationKey = BigInt(`${contentId}${ageGroupId}${continentId}`);

  return aggregationKey;
}

class DemographicsMeasurementOperation {
  async run(data) {
    const { contentId } = data;

    // Read from Shared Storage
    const key = 'has-reported-content';
    const hasReportedContent = (await this.sharedStorage.get(key)) === 'true';
    const ageGroup = await this.sharedStorage.get('age-group');
    const continent = await this.sharedStorage.get('continent');

    // Do not report if a report has been sent already
    if (hasReportedContent) {
      return;
    }

    // Generate the aggregation key and the aggregatable value
    const bucket = generateAggregationKey(contentId, ageGroup, continent);
    const value = 1 * SCALE_FACTOR;

    // Send an aggregatable report via the Private Aggregation API
    privateAggregation.sendHistogramReport({ bucket, value });

    // Set the report submission status flag
    await this.sharedStorage.set(key, true);
  }
}

// Register the operation
register('demographics-measurement', DemographicsMeasurementOperation); \
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

---
layout: 'layouts/doc-post.njk'
title: 'Creative rotation'
subhead: >
  Use a Shared Storage worklet to rotate creatives across sites.
description: >
  Use a Shared Storage worklet to rotate creatives across sites.
date: 2022-10-14
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. One such example is creative rotation, which is available
to test in Chrome 104.0.5086.0 and later.

With creative rotation, you can store the creative rotation mode and other
metadata to rotate a creative seen by users across different sites. 

## Try creative rotation

To experiment with creative rotation with Shared Storage, confirm you're using Chrome 104.0.5086.0 or later. Then enable the **Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

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

## Other use cases

Explore other Shared Storage use cases and code samples:

*  [**Frequency control**](/docs/privacy-sandbox/shared-storage/frequency-control):
   run a worklet script to select a URL from a provided list, based on the
   stored data, and then render that URL in a fenced frame. This has many
   possible uses, such as selecting new content when a frequency cap is reached.
*  [**A/B testing**](/docs/privacy-sandbox/shared-storage/ab-testing): You can
   assign a user to an experiment group, then store that group in Shared
   Storage to be accessed cross-site.
*  [**Known customer for payment provider**](/docs/privacy-sandbox/shared-storage/known-customer):
   You can store whether the user has registered on your site into shared
   storage, then render a different element based on that stored status.

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.

{% Partial 'privacy-sandbox/sharedstorage-engage.md' %}

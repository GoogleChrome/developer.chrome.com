---
layout: 'layouts/doc-post.njk'
title: 'Creative rotation'
subhead: >
  Use a Shared Storage to determine what creative a user sees across sites.
description: >
  Use a Shared Storage to determine what creative a user sees across sites.
date: 2022-10-14
updated: 2023-04-14
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. One such example is creative rotation, which is available
to test in Chrome 104.0.5086.0 and later.

With creative rotation, you can store data, such as creative ID, view
counts, and user interaction, to determine which creative users' see across
different sites.

Run a Shared Storage worklet to select a URL from a provided list, based on the
stored data, and then render that creative in a fenced frame. This can be used
to select new ads or other content. 

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

An advertiser or a content producer may want to apply different strategies to a
campaign, and rotate the contents or creatives to increase effectiveness. 
Shared storage can be used to run different rotation strategies, such as
sequential rotation and evenly-distributed rotation, across different sites.

In this example:

*   `creative-rotation.js` is embedded in a frame. This script sets which ads are the most important ( weight), and calls to the worklet to determine which content should be displayed.
*   `creative-rotation-worklet.js`  is the shared storage worklet that determines the weighted distribution for the contents and returns which should be displayed.

**[creative-rotation.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/creative-rotation.js)**

```js
// Ad config with the URL of the content, a probability weight for rotation, and the clickthrough rate.
const DEMO_CONTENT_CONFIG = [
  {
    url: 'https://your-server.example/contents/content-1.html',
    weight: 0.7,
  },
  {
    url: 'https://your-server.example/contents/content-2.html',
    weight: 0.2,
  },
  {
    url: 'https://your-server.example/contents/content-3.html',
    weight: 0.1,
  },
];

// Set the mode to sequential and set the starting index to 0.
async function seedStorage() {
  await window.sharedStorage.set('content-rotation-mode', 'sequential', {
    ignoreIfPresent: true,
  });

  await window.sharedStorage.set('content-rotation-index', 0, {
    ignoreIfPresent: true,
  });
}

async function injectAd() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('content-rotation-worklet.js');

  // Initially set the storage to sequential mode for the demo
  seedStorage();

  // Run the URL selection operation to determine the next content rendered.
  const urls = DEMO_CONTENT_CONFIG.map(({ url }) => ({ url }));
  const fencedFrameConfig = await window.sharedStorage.selectURL('content-rotation', urls, { 
    data: DEMO_CONTENT_CONFIG,
    resolveToConfig: true
  });

  // Render the opaque URL into a fenced frame
  document.getElementById('content-slot').config = fencedFrameConfig;
}

injectAd();
```

**[creative-rotation-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/creative-rotation-worklet.js)**

```js
class SelectURLOperation {
  async run(urls, data) {
    // Read the rotation mode from Shared Storage
    const rotationMode = await this.sharedStorage.get('content-rotation-mode');

    // Generate a random number to be used for rotation
    const randomNumber = Math.random();

    let index;

    switch (rotationMode) {
      /**
       * Sequential rotation
       * - Rotates the contents in order
       * - Example: A -> B -> C -> A ...
       */
      case 'sequential':
        const currentIndex = await this.sharedStorage.get('creative-rotation-index');
        index = parseInt(currentIndex, 10);
        const nextIndex = (index + 1) % urls.length;

        await this.sharedStorage.set('content-rotation-index', nextIndex);
        break;

      /**
       * Weighted rotation
       * - Rotates the contentswith weighted probability
       * - Example: A=70% / B=20% / C=10%
       */
      case 'weighted-distribution':
        
        // Sum the weights cumulatively, and find the first URL where the
        // sum exceeds the random number. The array is sorted in
        // descending order first.
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

register('content-rotation', SelectURLOperation);
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

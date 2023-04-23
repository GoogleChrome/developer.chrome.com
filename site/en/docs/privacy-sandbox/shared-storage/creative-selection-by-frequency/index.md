---
layout: 'layouts/doc-post.njk'
title: 'Creative selection by frequency'
subhead: >
  Run a Shared Storage worklet to select a URL and render it
  in a fenced frame.
description: >
  Run a Shared Storage worklet to select a URL and render it
  in a fenced frame.
date: 2022-10-14
updated: 2022-11-08
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. One example is frequency control, which is available to
test in Chrome Beta 104.0.5086.0 and later.

Run a worklet script to select a URL from a provided list, based on the stored
data, and then render that URL in a fenced frame. This can be used to select
new ads or other content when the frequency limit has been reached.

## Test creative selection by frequency

To test creative selection by frequency with Shared Storage and Fenced Frames, confirm you're
using Chrome 104.0.5086.0 or later. Then enable the **Privacy Sandbox Ads APIs experiment**
flag at `chrome://flags/#privacy-sandbox-ads-apis`.

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

To select and create an opaque URL, register a worklet module to read shared
storage data. The worklet class receives a list of up to eight URLs and then
returns the index of the chosen URL. 

When the client calls `sharedStorage.selectURL()`, the worklet
executes and returns an opaque URL to be rendered into a [fenced frame](/docs/privacy-sandbox/fenced-frame/).

Let’s say you want to select a different ad or content to render based on the frequency of how many times a user has seen it before. You can count how many times a user has seen a content, and store that value into shared storage. Once stored, the value in shared storage becomes available for you across different origins. 

Then, the shared storage worklet reads the values in shared storage, and increments the counter with each additional view. If the count has not reached the predefined limit, the content you want to render is returned (index `1`). If not, the default URL is returned (index `0`).

In this example:

*  `creative-selection-by-frequencyjs` is loaded via the content producer's or advertiser's iframe, and is responsible
   for loading the shared storage worklet, and rendering the returned opaque
   source into a fenced frame.
*  `creative-selection-by-frequency-worklet.js` is the shared storage worklet that reads the
   frequency count to determine which URL is returned for a content or an ad creative.

**[creative-selection-by-frequencyjs](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/creative-selection-by-frequencyjs)**

```javascript
// The first URL is the default content or ad to be rendered when the frequency limitis reached.
const CONTENT_URLS = [
  { url: `https://${contentProducerUrl}/default-content.html` },
  { url: `https://${contentProducerUrl}/example-content.html` },
];

async function injectAd() {
  // Load the worklet module.
  await window.sharedStorage.worklet.addModule('creative-selection-by-frequency-worklet.js');

  // Set the initial frequency count
  window.sharedStorage.set('frequency-count', 0, {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation to choose an ad based on the frequency count in shared storage.
  const fencedFrameConfig = await window.sharedStorage.selectURL('creative-selection-by-frequency', CONTENT_URLS, {
    resolveToConfig: true
  });

  // Render the opaque URL into a fenced frame
  document.getElementById('content-slot').config = fencedFrameConfig;
}

injectAd();
```

**[creative-selection-by-frequency-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/creative-selection-by-frequency-worklet.js)**

```javascript
const FREQUENCY_LIMIT = 5;

class CreativeSelectionByFrequencyOperation {
  async run(urls, data) {
    // Read the current frequency limit in shared storage
    const count = parseInt(await this.sharedStorage.get('frequency-count'));

    // Check if the frequency limit has been reached.
    if (count === FREQUENCY_LIMIT) {
      console.log('Frequency limit has been reached, and the default content will be rendered.');
      return 0;
    }

    // Set the new frequency count in shared storage
    await this.sharedStorage.set('frequency-count', count + 1);
    return 1;
  }
}

// Register the operation as 'creative-selection-by-frequency'.
register('creative-selection-by-frequency', CreativeSelectionByFrequencyOperation);
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

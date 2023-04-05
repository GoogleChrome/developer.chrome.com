---
layout: 'layouts/doc-post.njk'
title: 'Frequency control'
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
new ads or other content when the frequency cap has been reached.

## Test frequency control

To test frequency control with Shared Storage and Fenced Frames, confirm you're
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

When the client calls `sharedStorage.runURLSelectionOperation()`, the worklet
executes and returns an opaque URL to be rendered into a [fenced frame](/docs/privacy-sandbox/fenced-frame/).

Let's say you want to render an ad based on the advertiser's frequency cap (the
maximum number of impressions for a user on a single ad over a set period of
time). The frequency cap value is stored in shared storage.

The shared storage worklet reads the values in shared storage, and decrements
the value with each additional view. If there are available impressions left
(the user has not hit their frequency cap), the ad is returned (index `1`). If
not, the default URL is returned (index `0`).

In this example:

*  `frequency-cap.js` is loaded via the advertiser's iframe, and is responsible
   for loading the shared storage worklet, and rendering the returned opaque
   source into a fenced frame.
*  `frequency-cap-worklet.js` is the shared storage worklet that reads the
   frequency cap count value to determine which URL is returned for the ad creative.

**[frequency-cap.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/frequency-cap.js)**

```javascript
// The first URL is the default ad to be rendered when the frequency cap is reached
const AD_URLS = [
  { url: `https://${contentProducerUrl}/ads/default-ad.html` },
  { url: `https://${contentProducerUrl}/ads/example-ad.html` },
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

**[frequency-cap-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/frequency-cap-worklet.js)**

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
    await this.sharedStorage.set('frequency-cap-count', (count - 1).toString());
    return 1;
  }
}

// Register the operation as 'frequency-cap'
register('frequency-cap', SelectURLOperation);
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

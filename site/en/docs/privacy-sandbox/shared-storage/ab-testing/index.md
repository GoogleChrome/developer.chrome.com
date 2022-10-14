---
layout: 'layouts/doc-post.njk'
title: 'A/B Testing'
subhead: >
  Use a Shared Storage worklet to run A/B testing.
description: >
  Use a Shared Storage worklet to run A/B testing.
date: 2022-10-14
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. One such example is A/B testing, which is available to test
in Chrome 104.0.5086.0 and later.

With URL selection, you can assign a user to an experiment group, then store
that group in Shared Storage to be accessed in a cross-site environment. 

## Try A/B testing

To experiment with A/B testing with Shared Storage, confirm you're using Chrome 104.0.5086.0 or later. Then enable the **Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

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

## Other use cases

Explore other Shared Storage use cases and code samples:

*  [**Frequency control**](/docs/privacy-sandbox/shared-storage/frequency-control):
   run a worklet script to select a URL from a provided list, based on the
   stored data, and then render that URL in a fenced frame. This has many
   possible uses, such as selecting new content when a frequency cap is reached.
*  [**Creative rotation**](/docs/privacy-sandbox/shared-storage/creative-rotation):
   You can store the creative rotation mode, and other metadata, to rotate the
   creatives across different sites. 
*  [**Known customer for payment provider**](/docs/privacy-sandbox/shared-storage/known-customer):
   You can store whether the user has registered on your site into shared
   storage, then render a different element based on that stored status.

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.

{% include 'content/privacysandbox-partials/sharedstorage-engage.njk' %}

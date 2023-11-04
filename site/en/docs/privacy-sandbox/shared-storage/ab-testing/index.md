---
layout: 'layouts/doc-post.njk'
title: 'A/B Testing'
subhead: >
  Use a Shared Storage worklet to run A/B testing.
description: >
  Use a Shared Storage worklet to run A/B testing.
date: 2022-10-14
updated: 2022-11-08
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. One such example is A/B testing, which is available to test
in Chrome 104.0.5086.0 and later.

You can assign a user to an experiment group, then store that group in Shared
Storage to be accessed in a cross-site environment.

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

To see if an experiment has the desired effect, you can run A/B testing across multiple sites. As an advertiser or a content producer, you can choose to render different content or ads based on what group the user is assigned to. The group assignment is saved in shared storage, but cannot be exfiltrated.

In this example:

*   `ab-testing.js` should be embedded in a frame, which maps a control and two experiment contents. The script calls the shared storage worklet for the experiment.
*   `ab-testing-worklet.js`  is the shared storage worklet that returns which group the user is assigned to, determining which ad is shown.

**[ab-testing.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/ab-testing.js)**

```js
// Randomly assigns a user to a group 0 or 1
function getExperimentGroup() {
  return Math.round(Math.random());
}

async function injectContent() {
  // Register the Shared Storage worklet
  await window.sharedStorage.worklet.addModule('ab-testing-worklet.js');

  // Assign user to a random group (0 or 1) and store it in Shared Storage
  window.sharedStorage.set('ab-testing-group', getExperimentGroup(), {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation
  const fencedFrameConfig = await window.sharedStorage.selectURL(
    'ab-testing',
    [
      { url: `https://your-server.example/content/default-content.html` },
      { url: `https://your-server.example/content/experiment-content-a.html` }
    ],
    {
      resolveToConfig: true
    }
  );

  // Render the chosen URL into a fenced frame
  document.getElementById('content-slot').config = fencedFrameConfig;
}

injectContent();
```

**[ab-testing-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/ab-testing-worklet.js)**

```js
class SelectURLOperation {
  async run(urls, data) {
    // Read the user's experiment group from Shared Storage
    const experimentGroup = await this.sharedStorage.get('ab-testing-group');

    // Return the corresponding URL (first or second item in the array)
    return urls.indexOf(experimentGroup);
  }
}

register('ab-testing', SelectURLOperation);
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

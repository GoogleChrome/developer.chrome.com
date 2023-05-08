---
layout: 'layouts/doc-post.njk'
title: 'Known customers'
subhead: >
  Use a Shared Storage worklet to identify known customers.
description: >
  Use a Shared Storage worklet to identify known customers.
date: 2022-10-14
updated: 2022-11-08
authors:
  - alexandrawhite
  - kevinkiklee
---

The [Shared Storage API](/docs/privacy-sandbox/shared-storage/) is a Privacy
Sandbox proposal for general purpose, cross-site storage, which supports many
possible use cases. One example is identifying known customers, which is
available to test in Chrome 104.0.5086.0 and later.

You can store whether the user has registered on your site into Shared Storage,
then render a seperate element based on whether the user's stored status (is
the user a "known" customer).

## Set known customers

To experiment with identifying known customers in Shared Storage, confirm
you're using Chrome 104.0.5086.0 or later. Then enable the
**Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

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

You may want to render a different element based on whether the user was seen on a different site. For example, a payment provider may want to render a "Register" or "Buy now" button based on whether the user has registered at the payment provider's site. Shared storage can be used to set the user's status and customize their user experience based on that status.

In this example:
*   `known-customer.js` is embedded in a frame. This script sets the options for which button should be displayed on a site, “Register” or “Buy now.”
*   `known-customer-worklet.js`  is the shared storage worklet that determines if the user is known. If the user is known, the information is returned. If the user is unknown, that information is returned to display the “Register” button and the user is marked as known for the future.

**[known-customer.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/known-customer.js)**

```js
// The first URL for the "register" button is rendered for unknown users.
const BUTTON_URLS = [
  { url: `https://${advertiserUrl}/ads/register-button.html` },
  { url: `https://${advertiserUrl}/ads/buy-now-button.html` },
];

async function injectButton() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('known-customer-worklet.js');

  // Set the initial status to unknown ('0' is unknown and '1' is known)
  window.sharedStorage.set('known-customer', 0, {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation to choose the button based on the user status
  const fencedFrameConfig = await window.sharedStorage.selectURL('known-customer', BUTTON_URLS, {
    resolveToConfig: true
  });

  // Render the opaque URL into a fenced frame
  document.getElementById('button-slot').src = fencedFrameConfig;
}

injectButton();
```

**[known-customer-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/content-producer/url-selection/known-customer-worklet.js)**

```js
class SelectURLOperation {
  async run(urls) {
    const knownCustomer = await this.sharedStorage.get('known-customer');

    // '0' is unknown and '1' is known
    return parseInt(knownCustomer);
  }
}

register('known-customer', SelectURLOperation);
```

{% Partial 'privacy-sandbox/shared-storage-use-cases.md' %}

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

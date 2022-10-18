---
layout: 'layouts/doc-post.njk'
title: 'Known customers'
subhead: >
  Use a Shared Storage worklet to identify known customers.
description: >
  Use a Shared Storage worklet to identify known customers.
date: 2022-10-14
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

## Try setting known customers

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

You may want to render a different element based on whether the user was seen
on a different site. For example, a payment provider may want to render a
"Register" or "Buy now" button based on whether the user has registered at the
payment provider's site. Shared storage can be used to set the user's status.

In this example:

*  `known-customer.js` is embedded in an ad iframe. This script sets the
   options for which button should be displayed on a site, "Register" or "Buy now."
*  `known-customer-worklet.js`  is the shared storage worklet that determines
   if the user is known. If the user is known, the information is returned. If
   the user is unknown, that information is returned to display the "Register"
   button and the user is marked as known for the future.

**[known-customer.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/known-customer.js)**

```javascript
// The first URL for the "register" button is rendered for unknown users.
const AD_URLS = [
  { url: `https://${advertiserUrl}/ads/register-button.html` },
  { url: `https://${advertiserUrl}/ads/buy-now-button.html` },
];

async function injectAd() {
  // Load the worklet module
  await window.sharedStorage.worklet.addModule('known-customer-worklet.js');

  // Set the initial status to unknown ('0' is unknown and '1' is known)
  window.sharedStorage.set('known-customer', 0, {
    ignoreIfPresent: true,
  });

  // Run the URL selection operation to choose the button based on the user status
  const opaqueURL = await window.sharedStorage.selectURL('known-customer', AD_URLS);

  // Render the opaque URL into a fenced frame
  document.getElementById('button-slot').src = opaqueURL;
}

injectAd();
```

**[known-customer-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/known-customer-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls) {
    const knownCustomer = await this.sharedStorage.get('known-customer');

    // '0' is unknown and '1' is known
    return parseInt(knownCustomer);
  }
}

register('known-customer', SelectURLOperation);
```

## Other use cases

Explore other Shared Storage use cases and code samples:

*  [**Frequency control**](/docs/privacy-sandbox/shared-storage/frequency-control):
   run a worklet script to select a URL from a provided list, based on the
   stored data, and then render that URL in a fenced frame. This has many
   possible uses, such as selecting new content when a frequency cap is reached.
*  [**A/B testing**](/docs/privacy-sandbox/shared-storage/ab-testing): You can
   assign a user to an experiment group, then store that group in shared
   storage to be accessed cross-site. 
*  [**Creative rotation**](/docs/privacy-sandbox/shared-storage/creative-rotation):
   You can store the creative rotation mode, and other metadata, to rotate the
   creatives across different sites. 

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.

{% Partial 'privacy-sandbox/sharedstorage-engage.md' %}

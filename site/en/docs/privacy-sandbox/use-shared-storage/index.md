---
layout: 'layouts/doc-post.njk'
title: 'Use Shared Storage'
subhead: >
  Examine use cases and code samples for Shared Storage.
description: >
  Examine use cases and code samples for Shared Storage.
date: 2022-06-28
updated: 2022-10-14
authors:
  - alexandrawhite
  - kevinkiklee
---

The Shared Storage proposal intends to create a general purpose cross-site
storage API which supports many possible use cases. In this document, you'll
find code samples to help you get started.

The following features are available to test in Chrome 104:

*  [**Creative selection by frequency**](/docs/privacy-sandbox/shared-storage/creative-selection-by-frequency):
   run a worklet script to select a URL from a provided list, based on the
   stored data, and then render that URL in a fenced frame. This has many
   possible uses, such as selecting new content when a frequency cap is reached.
*  [**A/B testing**](/docs/privacy-sandbox/shared-storage/ab-testing): You can assign a user to an experiment
   group, then store that group in Shared Storage to be accessed cross-site. 
*  [**Creative rotation**](/docs/privacy-sandbox/shared-storage/creative-rotation): You can store the creative
   rotation mode, and other metadata, to rotate the creatives across different sites. 
*  [**Known customer for payment provider**](/docs/privacy-sandbox/shared-storage/known-customer): You can store
   whether the user has registered on your site into Shared Storage, then
   render a different element based on that stored status.

The following use case isn't available for testing in Chrome Beta, but we
intend to support it in the future:

*  [**Noisy aggregation of cross-site data**](#aggregated-data): you will be
   able to run a worklet script to aggregate your data with the
   [Private Aggregation API](/docs/privacy-sandbox/private-aggregation)
   which returns a privacy-preserving report. 

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.

## Try the Shared Storage API

Shared Storage API with Fenced Frames can be tested in Chrome 104 (version
104.0.5086.0 or later) by enabling the **Privacy Sandbox Ads APIs experiment**
flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img
	src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png",
	alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs",
	width="744", height="124"
%}

You can also enable Shared Storage with the `--enable-features=PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting,SharedStorageAPI,FencedFrames` flag in the command line. 

### Use the demo

The demo can be accessed at [goo.gle/shared-storage-demo](http://goo.gle/shared-storage-demo),
and the code is available on
[GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo). 

The demo is constructed from the perspective of an advertiser/DSP that wants to
store information across different publishers. Think of the advertiser as a
shoe company, and the publishers as news companies. In the demo, the same
advertiser code will run on both **Publisher A** and **Publisher B** sites for
each use case. Visit both publishers to see how the data is shared between two
sites. 

The demo contains frequency capping, creative rotation, known customer, and A/B
testing use cases.

### Not recommended: user consent status {: #user-content-status }

Ad tech companies often have cross-site consent statuses that they need to keep
track of. For example, an ad tech company may want to store if a user consents
to an ad tech's terms or service or policies related to regulations, such as
GDPR.  

**Shared storage is not recommended for this use case**. This is because:

1. A user might opt-out of using the privacy sandbox apis, which would prevent
   organizations from using shared storage at all.
1. The current output gates will require k-anonymity or additional noise
   sometime after the Origin Trial, which would mean there is a non-zero chance
   the consent status would not be 100% accurately represented in all cases. 

## Engage and share feedback

The Shared Storage proposal is under active discussion and subject to change
in the future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the
   [proposal](https://github.com/pythagoraskitty/shared-storage), [raise questions and participate in discussion](https://github.com/pythagoraskitty/shared-storage/issues).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

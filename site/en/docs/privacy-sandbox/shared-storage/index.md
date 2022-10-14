---
layout: 'layouts/doc-post.njk'
title: 'Shared Storage'
subhead: >
  Allow access to unpartitioned cross-site data in a secure environment.
description: >
  Allow access to unpartitioned cross-site data in a secure environment.
date: 2022-04-25
updated: 2022-10-14
authors:
  - alexandrawhite
  - kevinkiklee
---

## Implementation status

This document outlines a new proposal for unpartitioned storage: the Shared
Storage API.

*  The [Shared Storage proposal](https://github.com/WICG/shared-storage)
   has entered [public discussion](https://github.com/WICG/shared-storage/issues).
*  The API is available in the [Privacy Sandbox unified origin trial](/blog/expanding-privacy-sandbox-testing/)
   on Chrome Canary/Dev/Beta M105 or later.
*  Only the URL Selection (`selectURL`) output gate is available for
   testing at the moment. Support for the Private Aggregation API will
   come soon.
*  You can also [locally test the API with a flag](#try-the-shared-storage-api) on Chrome M104 or later.
*  [The Privacy Sandbox timeline](http://privacysandbox.com/timeline)
   provides implementation timings for the Shared Storage API and other
   Privacy Sandbox proposals.

## Why do we need this API?

To prevent cross-site user tracking, browsers are 
[partitioning](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)
all forms of storage (cookies, localStorage, caches, etc). However, there are
a number of legitimate use cases that rely on unpartitioned storage which
would be impossible without help from new web APIs. For example, an advertiser
may want to measure reach of an ad campaign across different sites, while
preserving individual user privacy and identity.

The proposed Shared Storage API will allow sites to store and access
unpartitioned cross-site data. This data must be read in a secure environment
to prevent leakage. This API will work in combination with other proposals,
such as [Trust Tokens](/docs/privacy-sandbox/trust-tokens/),
[Fenced Frames](/docs/privacy-sandbox/fenced-frame/), and others.

### Who is this for?

Many different organizations may benefit from using the Shared Storage API. For
example:

*  Content producers and adtechs to solve many common use cases, which currently
   rely on third-party cookies.
*  Payments providers to understand if the user is an existing customer and
   tailor the checkout experience.
*  Web security companies who use custom on-device logic to flag suspicious or
   dangerous behavior.

## Use cases for Shared Storage

The Shared Storage API intends to support many use cases, replacing several
existing uses for third-party cookies. This may include:

*  [Frequency control](/docs/privacy-sandbox/shared-storage/frequency-control/)
*  [A/B or lift experiments](docs/privacy-sandbox/shared-storage/ab-testing/)
*  [Creative rotation](docs/privacy-sandbox/shared-storage/creative-rotation/)
*  [Determining known customers](docs/privacy-sandbox/shared-storage/known-customer/)
*  Recording aggregated statistics, such as demographics, reach, frequency
   measurement, and conversion measurement with the
   [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/)
*  Confirm login for payment provider

{% Aside %}
While it is technically possible to configure and collect user consent status with Shared Storage, we don't recommend this use case.
{% endAside %}

The proposal intends to create a general purpose API which supports many
possible future use cases. This allows for further experimentation and change,
to grow alongside the web ecosystem.

## How will shared storage work?

Shared storage allows you to make informed decisions based on cross-site
data, without sharing user information (such as browser history or other
personal details) with an embedding site.

You can write to shared storage at any time, like other JavaScript storage APIs
(like localStorage or indexedDB). Unlike the other storage APIs, you can only
read the shared storage values in a secure environment, known as a shared
storage worklet.

The shared storage data can be used for:

*  [**URL selection**](/docs/privacy-sandbox/shared-storage/url-selection): 
   you can run a worklet script to select a URL from a provided list, based on
   the stored data, and then render that URL in a fenced frame.  The returned
   URL will be an opaque URL, which means the developer and other viewers of
   the code won't know which URL was selected.
*  **Noisy aggregation of cross-site data**:
   you will be able to run a worklet script to send your data through the
   [Private Aggregation API](/docs/privacy-sandbox/private-aggregation),
   a Privacy Sandbox proposal, which returns a privacy-preserving report. 

## Try the Shared Storage API

The API is available in the [Privacy Sandbox unified origin trial](/blog/expanding-privacy-sandbox-testing/)
on Chrome Canary, Dev, and Beta M105 or later. Learn how you can
register for a [third-party origin trial](/docs/web-platform/third-party-origin-trials/).

The Shared Storage API with Fenced Frames can be locally tested in Chrome 104 or later (version
104.0.5086.0 or later) by enabling the **Privacy Sandbox Ads APIs experiment**
flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png", alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs", width="744", height="124" %}

You can also enable Shared Storage with the `--enable-features=PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting,SharedStorageAPI,FencedFrames` flag in the command line. 

Check out the [example use cases and code samples](/docs/privacy-sandbox/use-shared-storage).

{% include 'content/privacysandbox-partials/sharedstorage-engage.njk' %}

---
layout: 'layouts/doc-post.njk'
title: 'Shared Storage'
subhead: >
  Allow access to unpartitioned cross-site data in a secure environment.
description: >
  Allow access to unpartitioned cross-site data in a secure environment.
date: 2022-04-25
updated: 2023-03-14
authors:
  - alexandrawhite
  - kevinkiklee
---
## Implementation status

This document outlines a proposal for unpartitioned, cross-site storage: the Shared Storage API.

{% Partial 'privacy-sandbox/timeline/shared-storage.njk' %}

{% Partial 'privacy-sandbox/timeline/shared-storage-features.njk' %}

## Why do we need this API?

To prevent cross-site user tracking, browsers are [partitioning](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html) all forms of storage (cookies, localStorage, caches, etc). However, there are a number of legitimate use cases that rely on unpartitioned storage which would be impossible without help from new web APIs. For example, a content producer may want to measure reach across different sites, without relying on cross-site identifiers.

The Shared Storage API allows sites to store and access unpartitioned cross-site data. This data must be read in a secure environment to prevent leakage. 

### Who is this for?

There are many different kinds of companies which may benefit from using the Shared Storage API. For example:

*   Ad techs could measure campaign reach, set frequency caps, and rotate creatives, all of which currently rely on third-party cookies.
*   Payments providers could determine if a user is an existing customer and tailor the checkout experience.
*   Web security companies can build custom logic to flag suspicious or dangerous behavior.

Is your company looking for cross-site storage solutions that haven’t yet been addressed? [Share your use case](https://github.com/WICG/shared-storage/issues).

### Use cases

The Shared Storage API intends to support many use cases, replacing several existing uses for third-party cookies. This may include:

<table class="with-heading-tint width-full">
  <thead>
  <tr>
   <th>Use case</th>
   <th>Description</th>
   <th>Output gate</th>
  </tr>
  </thead>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/creative-selection-by-frequency/">Frequency Controls</a></strong>
   </td>
   <td>The opposite side of the pendulum to effective frequency is oversaturation, showing users the same content too often leading to poor user experience.  To balance and control for the number of views, organizations can record a user’s view counts in shared storage and display different content once the user has reached a predefined and customizable limit. 
   </td>
   <td>URL Selection
   </td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/ab-testing/">A/B testing</a></strong>
   </td>
   <td>You can assign a user to an experiment group, then store that group in shared storage to be accessed cross-site. 
   </td>
   <td>URL Selection
   </td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/creative-rotation/">Creative rotation</a></strong>
   </td>
   <td>You can store the creative rotation mode, and other metadata, to rotate the creatives across different sites.
   </td>
   <td>URL Selection
   </td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/known-customer/">Known customer for payment provider</a></strong>
   </td>
   <td>You can store whether the user has registered on your site into shared storage, then render a different element based on that stored status.
   </td>
   <td>URL Selection
   </td>
  </tr>
  <tr>
   <td><strong>Anti-abuse mitigation</strong>
   </td>
   <td>Anti-abuse, anti-fraud, and web security organizations often use proprietary techniques to detect malicious users, whether automated bots or real humans trying to cause harm.  It’s possible to test many different strategies here, whether it’s using URL Selection output gate to encode a user trustworthiness rating or using the Private Aggregation output gate to build datasets for anomaly detection.  
   </td>
   <td>URL Selection, Private Aggregation API
   </td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/unique-reach/">Unique Reach Reporting</a></strong>
   </td>
   <td>Many content producers and advertisers often want to know how many unique people saw their content.  You can use shared storage to report on the first time a user saw your ad, embedded video, publication, and prevent duplicative counting of that same user on a different site, giving you an aggregated noisy report of your approximate unique reach. 
   </td>
   <td>Private Aggregation API
   </td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/user-demographics">User Demographics Reporting</a></strong>
   </td>
   <td>Content producers often want to understand the demographics of their audience.  You can use shared storage to record user demographic data in a context where you have it, such as your 1P site, and use aggregated reporting to report on it across many other sites, such as embedded content. 
   </td>
   <td>Private Aggregation API
   </td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/k-freq-reach">K+ Frequency Reach Reporting</a></strong>
   </td>
   <td>Sometimes described as “effective frequency,” there is often a minimum number of views before a user will recognize or recall certain content (often in the context of advertisement views). You can use Shared Storage to build reports of unique users that have seen a piece of content at least K times. 
   </td>
   <td>Private Aggregation API
   </td>
  </tr>
</table>

The proposal intends to create a general purpose API which supports many possible future use cases. This allows for further experimentation and change, to grow alongside the web ecosystem.

## How does shared storage work?

Shared storage allows you to make informed decisions based on cross-site data, without sharing user information (such as browser history or other personal details) with an embedding site or exfiltrating data to your own servers.

You can write to shared storage at any time, like other JavaScript storage APIs (like localStorage or indexedDB). Unlike the other storage APIs, you can only read the shared storage values in a secure environment, known as a shared storage worklet. 

{% Aside 'key-term' %}
A [worklet](https://developer.mozilla.org/docs/Web/API/Worklet) allows you to run specific JavaScript functions and return information back to the requester. Within a worklet, you can execute JavaScript but you cannot interact or communicate with the outside page.
{% endAside %}

Worklets are where you add your business logic. Inside the worklet, you are allowed to read and process a value from Shared Storage, but you cannot directly return the exact value to the worklet caller. To extract useful information from the worklet, a set of “gates” are available. There are two gates available, but more may be added in the future. 

Available Shared Storage API output gates: 

*   [**URL selection**](/docs/privacy-sandbox/use-shared-storage#url-selection): You can run a worklet script to select a URL from a provided list, based on the stored data, and then render that URL in a fenced frame.
    *   For example: You may want to conduct A/B testing. You can assign a user to an experiment group when you see that user on your site, then store that group in shared storage to be accessed cross-site. Later, on another site, a frame (e.g., a payment button or ad creative) can be chosen to show the user based on the user’s experiment group stored in shared storage. 
*   [**Noisy aggregation of cross-site data**](/docs/privacy-sandbox/use-shared-storage#aggregated-data): You can run a worklet to send  cross-site data through the [Private Aggregation API](/docs/privacy-sandbox/use-shared-storage#aggregated-data), which returns a [summary report](/docs/privacy-sandbox/attribution-reporting/summary-reports/). 
    *   For example: You may want to know how many unique users saw your content across different sites.  Use shared storage to store the first time a user saw your ad, embedded video, publication, or other content. Then run a worklet with the Private Aggregation API to aggregate the data across all users’ first time views and generate an aggregated noisy report of your approximate unique reach. 

## Try the Shared Storage API

Shared Storage API for URL selection output gate and Private Aggregation output gate are available for testing.  URL selection can be tested in Chrome Canary/Dev/Beta M105+ and Private Aggregation API is available for testing in Chrome M107+ Canary and Dev. The API can be tested by enabling the **Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png", alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs", width="744", height="124" %}

### Use the demo

A [demo is available](https://shared-storage-demo.web.app/), and you can review the code on [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo). 

This demo is constructed from the perspective of an advertiser, ad tech, content distributor or other third party service that wants to store information across different publishers’ sites. In the demo, the same third party’s code will run on both **Publisher A** and **Publisher B** sites for each use case. Visit the publisher’s pages to see how the data is shared in a cross-site context.

The demo contains use cases for URL selection and Private Aggregation.

For the URL selection demo, [frequency control](/docs/privacy-sandbox/shared-storage/creative-selection-by-frequency), [creative rotation](/docs/privacy-sandbox/shared-storage/creative-rotation/), [known customer](/docs/privacy-sandbox/shared-storage/known-customer/), and [A/B testing](/docs/privacy-sandbox/shared-storage/ab-testing/) use cases are available.

For the Private Aggregation demo, you can preview unique [reach measurement](/docs/privacy-sandbox/shared-storage/unique-reach), [demographics measurement](/docs/privacy-sandbox/shared-storage/user-demographics), and [K-frequency measurement](/docs/privacy-sandbox/shared-storage/k-freq-reach).

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

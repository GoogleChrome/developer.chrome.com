---
layout: 'layouts/doc-post.njk'
title: 'Shared Storage'
subhead: >
  Allow unlimited, cross-site storage write access with privacy-preserving read access.
description: >
  Allow unlimited, cross-site storage write access with privacy-preserving read access.
date: 2022-04-25
updated: 2023-04-14
authors:
  - alexandrawhite
  - kevinkiklee
---

## Implementation status

This document outlines a proposal for unpartitioned, cross-site storage: the Shared Storage API.

{% Partial 'privacy-sandbox/timeline/shared-storage.njk' %}

{% Partial 'privacy-sandbox/timeline/shared-storage-features.njk' %}

## Why do we need this API?

To prevent cross-site user tracking, browsers are
[partitioning](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)
all forms of storage (cookies, localStorage, caches, etc). However, there are a
number of legitimate use cases that rely on unpartitioned storage which would
be impossible without help from new web APIs. For example, a content producer
may want to measure reach across different sites, without relying on cross-site identifiers.

The Shared Storage API allows sites to store and access unpartitioned
cross-site data. This data must be read in a secure environment to prevent
leakage.

You can [use Shared Storage](#how-does-shared-storage-work) data in two ways:

* [Cross-site content selection](/docs/privacy-sandbox/shared-storage/content-selection/).
* Noisy aggregation of cross-site data with the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/)

### Who is this for?

There are many different kinds of companies which may benefit from using the
Shared Storage API. For example:

*   Ad techs could measure campaign reach, set frequency caps, and rotate creatives, all of which currently rely on third-party cookies.
*   Payments providers could determine if a user is an existing customer and tailor the checkout experience.
*   Web security companies can build custom logic to flag suspicious or dangerous behavior.

Is your company looking for cross-site storage solutions that haven't yet been
addressed? [Share your use case](https://github.com/WICG/shared-storage/issues).

### Use cases

The Shared Storage API intends to support many use cases, replacing several
existing uses for third-party cookies. This includes:

<table class="with-heading-tint width-full">
  <thead>
  <tr>
   <th>Use case</th>
   <th>Description</th>
   <th>Output gate</th>
  </tr>
  </thead>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/creative-rotation/">Creative rotation</a></strong></td>
   <td>You can store data, such as creative ID, view counts, and user interaction, to determine which creative users' see across different sites. This allows you to balance views and avoid oversaturation of ceratin content, which can help you avoid a negative user experience.</td>
   <td>Content selection</td>
   </tr>  
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/ab-testing/">A/B testing</a></strong></td>
   <td>You can assign a user to an experiment group, then store that group in shared storage to be accessed cross-site.</td>
   <td>Content selection</td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/known-customer/">Custom user experiences</a></strong></td>
   <td>You can share custom content and calls-to-action based on a user’s registration status or other user states.</td>
   <td>Content selection</td>
  </tr>
  <tr>
   <td><strong>Anti-abuse mitigations</strong>
   </td>
   <td>Anti-abuse, anti-fraud, and web security organizations often use proprietary techniques to detect malicious users, whether automated bots or real humans trying to cause harm.  It's possible to test many different strategies here, whether it's using URL Selection output gate to encode a user trustworthiness rating or using the Private Aggregation output gate to build datasets for anomaly detection.  
   </td>
   <td>Content selection, Private Aggregation API</td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/unique-reach/">Unique reach reporting</a></strong>
   </td>
   <td>Many content producers and advertisers often want to know how many unique people saw their content. You can use Shared Storage to report on the first time a user saw your ad, embedded video, publication, and prevent duplicative counting of that same user on a different site, giving you an aggregated noisy report of your approximate unique reach. 
   </td>
   <td>Private Aggregation API</td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/user-demographics">User Demographics Reporting</a></strong></td>
   <td>Content producers often want to understand the demographics of their audience.  You can use shared storage to record user demographic data in a context where you have it, such as your 1P site, and use aggregated reporting to report on it across many other sites, such as embedded content.</td>
   <td>Private Aggregation API</td>
  </tr>
  <tr>
   <td><strong><a href="/docs/privacy-sandbox/shared-storage/k-freq-reach">K+ Frequency Reach Reporting</a></strong></td>
   <td>Sometimes described as "effective frequency," there is often a minimum number of views before a user will recognize or recall certain content (often in the context of advertisement views). You can use Shared Storage to build reports of unique users that have seen a piece of content at least K times.</td>
   <td>Private Aggregation API</td>
  </tr>
</table>

The proposal intends to create a general purpose API which supports many
possible future use cases. This allows for further experimentation and change,
to grow alongside the web ecosystem.

## How does Shared Storage work?

Shared Storage allows you to make informed decisions based on cross-site data,
without sharing user information (such as browser history or other personal
details) with an embedding site or exfiltrating data to your own servers.

You can write to shared storage at any time, like other JavaScript storage APIs (like localStorage or indexedDB). Unlike the other storage APIs, you can only read the shared storage values in a secure environment, known as a shared storage worklet. 

{% Aside 'key-term' %}

A [worklet](https://developer.mozilla.org/docs/Web/API/Worklet) allows you to
run specific JavaScript functions and return information back to the requester.
Within a worklet, you can execute JavaScript but you cannot interact or
communicate with the outside page.

{% endAside %}

Worklets are where you add your business logic. Inside the worklet, you are
allowed to read and process a value from Shared Storage, but you cannot
directly return the exact value to the worklet caller. To extract useful
information from the worklet, a set of "gates" are available. There are two
gates available, but more may be added in the future. 

The available Shared Storage API output gates are:

* **[Cross-site content selection](/docs/privacy-sandbox/shared-storage/url-selection/)**: You can run a worklet script to select a URL from a provided list, based on the stored data, and then render that content in a fenced frame.
* **Noisy aggregation with the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/)**: You can run a worklet to send cross-site data through the Private Aggregation API and return a [summary report](/docs/privacy-sandbox/attribution-reporting/summary-reports/). 

## Try the Shared Storage API

Shared Storage API for URL selection output gate and Private Aggregation output
gate are available for testing. Content selection can be tested in Chrome
Canary/Dev/Beta M105+ and Private Aggregation API is available for testing in
Chrome M107+ Canary and Dev. The API can be tested by enabling the
**Privacy Sandbox Ads APIs experiment** flag at `chrome://flags/#privacy-sandbox-ads-apis`.

<figure>
{% Img
  src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png", alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs.", width="744", height="124"
%}
</figure>

### Use the demo

A [demo is available](https://shared-storage-demo.web.app/), and you can review the code on [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo). 

This demo is constructed from the perspective of an advertiser, ad tech,
content distributor or other third party service that wants to store
information across different publishers' sites. In the demo, the same third
party's code will run on both **Publisher A** and **Publisher B** sites for
each use case. Visit the publisher's pages to see how the data is shared in a
cross-site context.

The demo contains use cases for content selection and Private Aggregation.

For the content selection demo,
[creative rotation](/docs/privacy-sandbox/shared-storage/creative-rotation/),
[known customer](/docs/privacy-sandbox/shared-storage/known-customer/), and
[A/B testing](/docs/privacy-sandbox/shared-storage/ab-testing/) use cases are available.

For the Private Aggregation demo, you can preview unique
[reach measurement](/docs/privacy-sandbox/shared-storage/unique-reach),
[demographics measurement](/docs/privacy-sandbox/shared-storage/user-demographics), and
[K-frequency measurement](/docs/privacy-sandbox/shared-storage/k-freq-reach).

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}

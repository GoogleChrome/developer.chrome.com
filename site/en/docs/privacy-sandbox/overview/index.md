---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: >
  A series of proposals to satisfy cross-site use cases without
  third-party cookies or other tracking mechanisms.
description: "What's in it, how to get involved, and what it's for."
date: 2021-05-18
updated: 2023-02-27
authors:
  - samdutton
---

The Privacy Sandbox initiative aims to create technologies that both
protect people's privacy online and give companies and developers tools to
build thriving digital businesses.

The Privacy Sandbox has two core aims:

* Phase out support for third-party cookies when new solutions are in place.
* Reduce cross-site and cross-app tracking while helping to keep online content and services free for all.

{% YouTube
	id='WnCKlNE52tc'
%}

## What are the Privacy Sandbox proposals?

Chrome and other ecosystem stakeholders have offered more than 30 proposals to
date, which can be found in the
[public resources of W3C groups](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo).
These proposals cover a wide variety of use cases and requirements.

Several key proposals are listed below.

### Strengthen cross-site privacy boundaries

* [**CHIPS**](/docs/privacy-sandbox/chips/): Allow developers to opt-in a
  cookie to partitioned storage, with a separate cookie jar per top-level site.
* [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): Allow related
  domain names owned by the same entity to declare themselves as belonging to
  the same first party.
* [**Shared Storage**](/docs/privacy-sandbox/shared-storage/): Create a
  general-purpose API which allows sites to store and access unpartitioned
  cross-site data. This data must be read in a secure environment to prevent leakage.
* [**SameSite cookies**](https://web.dev/samesite-cookies-explained/): Secure
  sites by explicitly marking cross-site cookies.
* [**Storage Partitioning**](https://github.com/privacycg/storage-partitioning):
  Enable all forms of [user agent state](https://github.com/privacycg/storage-partitioning#user-agent-state),
  such as `localStorage` or cookies, to be double-keyed: by the top-level site
  as well as the origin of the resource being loaded, rather than a single
  origin or site.
* [**Fenced Frames**](/docs/privacy-sandbox/fenced-frame): Securely embed content onto a page without sharing cross-site data.
* [**Network State Partitioning**](https://github.com/MattMenke2/Explainer---Partition-Network-State):
  Prevent browser network resources being shared across first-party contexts, by ensuring that every request has a network partition key that must match in order for resources to be reused.
* [**HTTP Cache Partitioning**](/blog/http-cache-partitioning): Improve
  security and privacy by partitioning the browser HTTP cache.
* [**Federated Credential Management (FedCM)**](/docs/privacy-sandbox/fedcm/): Support federated identity without sharing the user's email address or other identifying information with a third-party service or website, unless the user explicitly agrees to do so.

### Show relevant content and ads

* [**Topics API**](/docs/privacy-sandbox/topics): Enable interest-based
  advertising without use of third-party cookies or tracking user behavior
  across sites.
* [**FLEDGE**](/docs/privacy-sandbox/fledge): Ad selection to serve remarketing
  and custom audience use cases, designed so that it cannot be used by third
  parties to track user browsing behavior across sites. FLEDGE is the first
  experiment to be implemented in Chromium from the
  [TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals.

### Measure digital ads

* [**Attribution Reporting**](/docs/privacy-sandbox/attribution-reporting):
  Correlate ad clicks or ad views with conversions. Ad techs can generate
  event-level or [summary reports](/docs/privacy-sandbox/summary-reports).
* [**Private Aggregation API**](/docs/privacy-sandbox/private-aggregation/):
  Generate noisy summary reports with cross-site data.

### Prevent covert tracking

* [**User-Agent reduction and User-Agent Client Hints**](/docs/privacy-sandbox/user-agent/):
  Limit passively shared browser data to reduce the volume of sensitive
  information which leads to fingerprinting. Client Hints allow developers to
  actively request only the information they need about the user's device or
  conditions.
* [**IP Protection**](/docs/privacy-sandbox/ip-protection/): Improve user
  privacy by protecting their IP address from being used for tracking.
* [**Bounce tracking mitigations**](/docs/privacy-sandbox/bounce-tracking-mitigations/):
  A proposal to reduce or eliminate the ability of bounce tracking to recognize
  people across contexts.
* [**Privacy Budget**](/docs/privacy-sandbox/privacy-budget/): Limit the amount
  of individual user data exposed to sites to prevent covert tracking.

### Fight spam and fraud on the web

* [**Private State Tokens**](/docs/privacy-sandbox/trust-tokens): Allow
  websites to convey a limited amount of information from one browsing context
  to another (for example, across sites) to help combat fraud, without passive
  tracking.

## Who works on the Privacy Sandbox?

* 30+ Privacy Sandbox proposals offered by Chrome and others.
* 400+ participants who joined W3C groups to provide input including the
  [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)
  and the [Privacy Community Group](https://www.w3.org/community/privacycg/participants).

## When will the APIs be implemented?

The [timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)
has the latest implementation status for the Privacy Sandbox on the web. Each
API has an implementation status in their documentation.

We'll make regular announcements on the [Chrome Developers blog](/tags/privacy/)
as APIs move from proposal to experiment to scaled availability.

## Engage and share feedback

* **GitHub**: read the explainers on GitHub and raise questions or comments in
  the Issues tab for each.
* **W3C**: Use cases can be discussed and industry feedback shared in the W3C [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/), the [Privacy Community Group](https://www.w3.org/community/privacycg/participants),
and the [Web Incubator Community Group](https://github.com/WICG).
* **Developer support**: Ask questions and join discussions on the
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

### Articles and videos for web developers

* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
* [SameSite cookies explained](https://web.dev/samesite-cookies-explained/)
* [Getting started with Privacy State Tokens](https://web.dev/trust-tokens)

### Principles and concepts behind the proposals

* [A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model)
  sets out the core principles underlying the APIs.
* [The Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
* Privacy Sandbox overview: [Building a more private web](https://www.blog.google/products/chrome/building-a-more-private-web/)
* Google AI Blog: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
* [The future of third-party cookies](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

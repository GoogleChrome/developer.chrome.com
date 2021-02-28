---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: The Privacy Sandbox is a series of proposals to satisfy third-party use cases without third-party cookies or other tracking mechanisms.
description: "What's in it, who's behind it, and what it's for."
date: 2021-02-28
updated: 2021-02-28
authors:
	- samdutton
---

## What is the Privacy Sandbox?

{% YouTube
	id='WnCKlNE52tc' 
%}


{% Aside 'warning' %}

[For Googlers, March 2021.]

This document is a work in progress, unfinished and not to be shared externally.

{% endAside %}

The web does not meet today’s expectations for user privacy and choice.

The Privacy Sandbox initiative announced in 2019 has two core aims:
* Work with the web community to develop replacement solutions for third-party cookies and covert 
tracking techniques.
* Phase out support for [third-party cookies](https://web.dev/samesite-cookies-explained/) when new 
solutions are in place. ([First party cookies](https://web.dev/samesite-cookies-explained/#what-are-first-party-and-third-party-cookies) are unaffected.)


## What are the Privacy Sandbox use cases?

Chrome and other ecosystem stakeholders have offered more than 30 proposals to date, but explanations of the key proposals are linked to below. Most proposals can be found in the public resources of W3C groups.

### 🍪 First-party context
* SameSite cookie changes: 
* First Party Sets: 

### Audience selection
* FLoC: interest groups
* FLEDGE: remarketing

### 📊 Measurement and attribution
* Event Attribution API: attributing ad clicks and ad views. Previously known as the Event Conversion Measurement API.
* Reach Measurement API: measure
* Aggregation Service

### 🚨 Fraud detection
* Trust Tokens: convey trust in a user from one context to another.

### Limiting data collection
* Privacy Budget
* Gnatcatcher (IP Privacy)

### 👤 Identity
* WebID (Federated Identity)

End to end flows will use multiple solutions. The example below gives a simplified view of click-based advertising flow with customized audience selection 







## Has there been any progress?

By early 2021 there were: 
* 30+ Privacy Sandbox proposals offered by Chrome and others.
* 400+ participants who joined W3C groups to provide input including the [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) and the [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
* 5 API implementations already available for testing in Chrome.


## Who is behind the Privacy Sandbox?
[TBC]



## Find out more

* [Digging into the Privacy Sandbox](web.dev/digging-into-the-privacy-sandbox) provides an overview for web developers.

### Privacy Sandbox proposal explainers {: #explainers }

The Privacy Sandbox initiative needs your support. The API proposal [explainers](https://blog.chromium.org/2019/08/potential-uses-for-privacy-sandbox.html) need feedback, in particular to suggest missing use cases and more-private ways to accomplish their goals.

* [Privacy Budget](https://github.com/bslassey/privacy-budget)
* [Trust Token API](https://github.com/dvorak42/trust-token-api)
* [Willful IP Blindness](https://github.com/bslassey/ip-blindness)
* [Aggregated Reporting API](https://github.com/csharrison/aggregate-reporting-api)
* [Conversion measurement](https://github.com/csharrison/conversion-measurement-api)
* [Federated Learning of Cohorts](https://github.com/jkarlin/floc)
* [TURTLEDOVE](https://github.com/michaelkleber/turtledove)

[A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model) sets out the core principles underlying the APIs.


### The Privacy Sandbox

* [The Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
* Privacy Sandbox overview: [Building a more private web](https://www.blog.google/products/chrome/building-a-more-private-web/)
* Google AI Blog: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
* [The future of third-party cookies](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

### Use cases, policies, and requirements {: #use-cases-policies-requirements }

* [Advertising Use Cases](https://github.com/w3c/web-advertising/blob/master/support_for_advertising_use_cases.md)
* [Mozilla anti-tracking policy](https://wiki.mozilla.org/Security/Anti_tracking_policy)
* [WebKit tracking prevention policy](https://webkit.org/tracking-prevention-policy/)
* [Privacy Preserving Ad Click Attribution For the Web](https://webkit.org/blog/8943/privacy-preserving-ad-click-attribution-for-the-web/)
* [Brave, Fingerprinting, and Privacy Budgets](https://brave.com/brave-fingerprinting-and-privacy-budgets/)
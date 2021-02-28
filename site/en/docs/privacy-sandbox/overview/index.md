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

The web today does not meet user expectations for privacy and choice.

When you visit a website you're unlikely to know what third parties are involved and what they're 
doing with your data. Even publishers and web developers may not understand the entire third-party 
supply chain.

The Privacy Sandbox initiative has two core aims:
* Work with the web community to develop replacement solutions to support legitimate third-party use 
cases and business models without enabling users to be tracked across sites.
* Phase out support for [third-party cookies](https://web.dev/samesite-cookies-explained/) when new 
solutions are in place. ([First party cookies](https://web.dev/samesite-cookies-explained/#what-are-first-party-and-third-party-cookies) 
are unaffected.)


## What are the Privacy Sandbox use cases?

Chrome and other ecosystem stakeholders have offered more than 30 proposals to date, which can be 
found in the [public resources of W3C groups](https://www.w3.org/Privacy/).

Explanations of each of the key proposals are linked to below. 

### 🍪 First-party context
* [SameSite cookie changes](https://web.dev/samesite-cookies-explained/): secure sites by explicitly 
marking your cross-site cookies.
* [First Party Sets](/docs/privacy-sandbox/first-party-sets): Allow related domain names owned by 
the same entity to declare themselves as belonging to the same first party.

### 👤 Audience selection
* [FLoC](/docs/privacy-sandbox/floc): Ad selection for interest groups (aka relevant ads). 
* [FLEDGE](/docs/privacy-sandbox/fledge): Ad selection for remarketing. Descendant of TURTLEDOVE.

### 📊 Measurement and attribution
* [Event Attribution Reporting](/docs/privacy-sandbox/event-attribution-reporting): Attribute ad 
clicks and ad views. Previously known as the Event Conversion Measurement API.
* [Aggregation Reporting](https://github.com/csharrison/aggregate-reporting-api): Measure the reach 
of a particular ad campaign (how many distinct users saw the ad) by collapsing information across 
multiple sites into a single, privacy-preserving report.

### 🚨 Fraud detection
* [Trust Tokens](/docs/privacy-sandbox/trust-tokens): convey trust in a user from one context to 
another to help combat fraud and distinguish bots from humans.

### 👀 Limiting data collection
* [Privacy Budget](https://www.youtube.com/watch?v=0STgfjSA6T8): Allow websites to get information 
about a user's browser or device, but enable the browser to set a quota on the total amount of 
information a site can access, so that a user cannot be identified.
* [Gnatcatcher](https://github.com/bslassey/ip-blindness): Limit the ability to identify individual 
users by accessing their IP address. There are two parts to the proposal: [Willful IP Blindness](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) provides a way for websites to let browsers know 
they are not observing IP addresses and [Near-path NAT](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) allows groups of users to send their traffic through the same privatizing server, 
effectively hiding their IP addresses from a site host. Gnatcatcher also ensures that sites 
requiring access to IP addresses for legitimate purposes such as abuse prevention can do so, subject 
to certification and auditing.

### 🏷 Identity
* WebID (Federated Identity): Support federated identity (where a user can sign into a website 
through a third-party service) without sharing the user’s email address or other identifying 
information with the third-party service or the website, unless the user explicitly agrees to do so. 
WebID enables federated sign-in without the use of redirects, pop-ups or third-party cookies which 
can be used to identify and track users across sites.

End-to-end flows will use multiple solutions. 

The example below gives a simplified view of a click-based advertising flow with customized audience 
selection.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/9Zpa9oYNNal5sqAU5hpW.png", 
  alt="Simplified view of a click-based advertising flow with customized audience selection using Privacy Sandbox APIs", width="800", 
  height="265" %}


## Who is working on the Privacy Sandbox?

By early 2021 there were: 
* 30+ Privacy Sandbox proposals offered by Chrome and others.
* 400+ participants who joined W3C groups to provide input including the [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) and the [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
* Five API implementations available for testing in Chrome.


## Is the Privacy Sandbox ready yet?

The [implementation status](/docs/privacy-sandbox/status/) page on this site provides progress 
updates for individual APIs.


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
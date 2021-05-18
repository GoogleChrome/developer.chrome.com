---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: The Privacy Sandbox is a series of proposals to satisfy cross-site use cases without third-party cookies or other tracking mechanisms.
description: "What's in it, how to get involved, and what it's for."
date: 2021-05-18
updated: 2021-05-18
authors:
	- samdutton
---


## What is the Privacy Sandbox?

{% YouTube
	id='WnCKlNE52tc' 
%}


## Why do we need the Privacy Sandbox?

The Privacy Sandbox initiative has two core aims:
* Develop replacement solutions to support web use cases and business models without enabling users 
to be tracked across sites, and avoiding cross-site tracking users aren't aware of.
* Phase out support for third-party cookies when new solutions are in place.


## What are the Privacy Sandbox proposals?

Chrome and other ecosystem stakeholders have offered more than 30 proposals to date, which can be 
found in the [public resources of W3C groups](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo). These proposals cover a wide variety of use cases and requirements.

The key proposals developed by the Chrome team are listed below. 


### Relevant content and ads

* [**FLoC**](/docs/privacy-sandbox/floc): Privacy-preserving interest-based ad and content selection: 
"relevant ads". 
* [**FLEDGE**](/docs/privacy-sandbox/fledge): Ad selection for remarketing. Descendant of 
[TURTLEDOVE](https://github.com/WICG/turtledove).


### Measurement and attribution

* [**Attribution Reporting**](/docs/privacy-sandbox/attribution-reporting): Correlate ad clicks or ad 
views with conversions. Previously known as the Event Conversion Measurement API. Enables two types 
of reports: event-level and aggregate.


### First-party protections

* [**SameSite cookie changes**](https://web.dev/samesite-cookies-explained/): Secure sites by explicitly 
marking your cross-site cookies.
* [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): Allow related domain names owned by 
the same entity to declare themselves as belonging to the same first party.


### Fraud detection

* [**Trust Tokens**](/docs/privacy-sandbox/trust-tokens): Convey trust in a user from one context to 
another, in order to help combat fraud and distinguish bots from humans.


### Limiting data collection

* [**Privacy Budget**](https://www.youtube.com/watch?v=0STgfjSA6T8): Allow websites to get information 
about a user's browser or device, but enable the browser to set a quota on the total amount of 
information a site can access, so that a user cannot be identified.
* [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/): 
The [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) (UA) string 
is a significant passive [fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) 
surface, as well as being difficult to process. Client Hints enable developers to actively 
request only the information they need about the user's device or conditions, rather than needing to 
parse this data from the User-Agent string.
* [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): Limit the ability to identify individual 
users by accessing their IP address. There are two parts to the proposal: 
[**Willful IP Blindness**](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) 
provides a way for websites to let browsers know they are not connecting IP addresses with users, 
and [**Near-path NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) allows 
groups of users to send their traffic through the same privatizing server, effectively hiding their 
IP addresses from a site host. Gnatcatcher also ensures that sites requiring access to IP addresses 
for legitimate purposes such as abuse prevention can do so, subject to certification and auditing.


### Identity

* [**WebID**](https://github.com/WICG/WebID): Support federated identity (where a user can sign into a 
website through a third-party service) without sharing the user's email address or other identifying 
information with the third-party service or the website, unless the user explicitly agrees to do so. 
WebID enables federated sign-in without the use of redirects, pop-ups or third-party cookies which 
can be used to identify and track users across sites.


## Who is working on the Privacy Sandbox?

By early 2021 there were: 
* 30+ Privacy Sandbox proposals offered by Chrome and others.
* 400+ participants who joined W3C groups to provide input including the 
[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) and 
the [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
* Five API implementations available for testing in Chrome.


## When will the APIs be implemented?

The [implementation status](/docs/privacy-sandbox/status/) page on this site provides progress 
updates for individual APIs.

---


## Engage and share feedback

* **GitHub**: read the explainer for the proposal on GitHub and raise questions or comments in the 
Issues tab for the explainer.  
[Links to explainers](#explainers) are provided below.
* **W3C**: Use cases can be discussed and industry feedback shared in the W3C [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/), the [Privacy Community Group](https://www.w3.org/community/privacycg/participants), 
and the [Web Incubator Community Group](https://github.com/WICG).
* **Developer support**: Ask questions and join discussions on the 
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Find out more

### Privacy Sandbox proposal explainers {: #explainers }

The API proposal explainers need feedback, in particular to suggest missing use cases and 
more-private ways to accomplish their goals. You can make comments or ask questions in the Issues 
tab for each explainer.

* [Privacy Budget](https://github.com/bslassey/privacy-budget)
* [Trust Tokens](https://github.com/dvorak42/trust-token-api)
* [First-Party Sets](https://github.com/privacycg/first-party-sets)
* [Gnatcatcher](https://github.com/bslassey/ip-blindness)
* [Aggregated Reporting API](https://github.com/csharrison/aggregate-reporting-api)
* [Attribution Reporting](https://github.com/csharrison/conversion-measurement-api)
* [FLoC](https://github.com/jkarlin/floc)
* [FLEDGE](https://github.com/michaelkleber/turtledove)

### Articles and videos for web developers

* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
* [SameSite cookies explained](https://web.dev/samesite-cookies-explained/)
* [Getting started with Trust Tokens](https://web.dev/trust-tokens)
* [A more private way to measure ad conversions](https://web.dev/conversion-measurement/)
* [What is FLoC?](https://web.dev/floc/)
* [Introducing the Privacy Budget](https://www.youtube.com/watch?v=0STgfjSA6T8)

### Principles and concepts behind the proposals

* [A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model) sets out the 
core principles underlying the APIs.
* [The Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
* Privacy Sandbox overview: [Building a more private web](https://www.blog.google/products/chrome/building-a-more-private-web/)
* Google AI Blog: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
* [The future of third-party cookies](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
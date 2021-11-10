---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: The Privacy Sandbox is a series of proposals to satisfy cross-site use cases without third-party cookies or other tracking mechanisms.
description: "What's in it, how to get involved, and what it's for."
date: 2021-05-18
updated: 2021-10-29
authors:
  - samdutton
---


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

The key proposals are listed below.

{% Aside %}
Some items below link to API explainers or other resources. 

Over the coming months, we'll add more posts within this site to summarize external content.
{% endAside %}


### Strengthen cross-site privacy boundaries

* [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): Allow related domain names owned by
the same entity to declare themselves as belonging to the same first party.
* [**Shared Storage**](https://github.com/pythagoraskitty/shared-storage): Proposal for a 
general-purpose, low-level API that can serve a number of legitimate use cases that currently rely 
on unpartitioned storage (which is being deprecated).
* [**CHIPS**](https://github.com/WICG/CHIPS): As with [First-Party Sets](/docs/privacy-sandbox/first-party-sets), 
this proposal addresses use cases around partitioning, and how cross-origin interactions and sharing 
might be enabled, where it makes sense, and how this can be kept safe. The core aim is to allow cookies 
to be set by a third-party service, but only read within the context of the top-level site where they 
were initially set. A partitioned third-party cookie is tied to the top-level site where it was initially 
set and cannot be accessed from elsewhere.
* [**Origin-Bound Cookies**](https://www.chromestatus.com/feature/4945698250293248): Bind cookies to 
their setting origin by default, so they are only accessible by that origin. 
* [**SameSite cookies**](https://web.dev/samesite-cookies-explained/): Secure sites by explicitly
marking cross-site cookies.
* [**Storage Partitioning**](https://github.com/privacycg/storage-partitioning): Enable all forms of 
[user agent state](https://github.com/privacycg/storage-partitioning#user-agent-state), such as 
`localStorage` or cookies, to be double-keyed: by the top-level site as well as the origin of 
the resource being loaded, rather than a single origin or site.
* [**Fenced Frames**](https://github.com/shivanigithub/fenced-frame): Provide a type of frame element 
that can be used to display content (such as an advertisement) but can't interact with the page 
around it.
* [**Network State Partitioning**](https://github.com/MattMenke2/Explainer---Partition-Network-State/blob/main/README.md): 
Partition network state to prevent browser network resources being shared across first-party 
contexts, by ensuring that every request has a network partition key that must match in order for 
resources to be reused.
* [**HTTP Cache Partitioning**](https://developers.google.com/web/updates/2020/10/http-cache-partitioning): 
Improve security and privacy by partitioning the browser HTTP cache.
* [**Federated Credential Management**](https://github.com/wicg/fedcm):  Support federated identity (where a 
user can sign into a website through a third-party service) without sharing the user's email address 
or other identifying information with a third-party service or website, unless the user 
explicitly agrees to do so. WebID enables federated sign-in without the use of redirects, pop-ups or 
third-party cookies which can be used to identify and track users across sites.


### Show relevant content and ads

* [**FLoC**](/docs/privacy-sandbox/floc): Privacy-preserving, interest-based ad and content 
selection: "relevant ads".
* [**FLEDGE**](/docs/privacy-sandbox/fledge): Ad selection to serve remarketing and custom audience 
use cases, designed so that it cannot be used by third parties to track user browsing behavior across 
sites.  FLEDGE is the first experiment to be implemented in Chromium within the 
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals.


### Measure digital ads

* [**Core Attribution Reporting**](/docs/privacy-sandbox/attribution-reporting): Correlate ad clicks or ad
views with conversions. Previously known as the Event Conversion Measurement API. Enables two types
of reports: event-level and aggregate.


### Prevent covert tracking

* [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/):
The [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) (UA) string
is a significant passive [fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive)
surface, as well as being difficult to process. Client Hints enable developers to actively
request only the information they need about the user's device or conditions, rather than needing to
parse this data from the User-Agent string.
* [**DNS-over-HTTPS**](https://en.wikipedia.org/wiki/DNS_over_HTTPS): A protocol for 
[DNS resolution](https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/) via the secure 
context of [HTTPS](https://www.cloudflare.com/en-gb/learning/ssl/what-is-https/).
* [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): Limit the ability to identify individual
users by accessing their IP address. There are two parts to the proposal:
[**Willful IP Blindness**](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md)
provides a way for websites to let browsers know they are not connecting IP addresses with users,
and [**Near-path NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) allows
groups of users to send their traffic through the same privatizing server, effectively hiding their
IP addresses from a site host. Gnatcatcher also ensures that sites requiring access to IP addresses
for legitimate purposes such as abuse prevention can do so, subject to certification and auditing.
* [**Privacy Budget**](https://www.youtube.com/watch?v=0STgfjSA6T8): Explore methods of quantifying 
the amount of information about a user's browser or device that are available to websites, and develop 
practical mechanisms to enable browser-based limits on the information a site can access.


### Fight spam and fraud on the web

* [**Trust Tokens**](/docs/privacy-sandbox/trust-tokens): Enable a website to convey a limited amount of 
information from one browsing context to another (for example, across sites) to help combat fraud, 
without passive tracking.


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
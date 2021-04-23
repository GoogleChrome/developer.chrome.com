---
layout: 'layouts/doc-post.njk'
title: 'Federated Learning of Cohorts (FLoC)'
subhead: >
  Allow sites to guess your interests without being able to uniquely identify you.
description: >
 FLoC enables interest-based advertising in a way that preserves privacy. As a user moves around the 
 web, their browser is assigned to an "interest cohort" along with thousands of others with a 
 similar browsing history. This is done without sharing individual browsing data with the browser 
 vendor or anyone else.
date: 2021-02-28
updated: 2021-04-23
authors:
  - samdutton
---

{% Aside 'warning' %}
[For Googlers, April 2021.]

This document is a work in progress, unfinished and not to be shared externally.
{% endAside %}


## Implementation status

* [In origin trial](https://web.dev/origin-trials): Chrome 89–91. See [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) for updates.
* [Register for origin trial](https://developer.chrome.com/origintrials/#/view_trial/213920982300098561).
* [Demo](https://floc.glitch.me).
* [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) in 
[Blink](https://www.chromium.org/blink).

## Why do we need FLoC?

Many businesses rely on advertising to drive traffic to their sites, and many websites fund content 
by enabling third parties to show ads. People generally prefer to see ads that are relevant and 
useful to them, and relevant ads also bring more business to advertisers and 
[more revenue to the websites that host them](https://services.google.com/fh/files/misc/disabling_third-party_cookies_publisher_revenue.pdf). Ad space is more valuable when it displays 
relevant ads. Thus, selecting relevant ads increases revenue for ad-supported websites.

However, many people are concerned about the privacy implications of tailored advertising, which 
currently relies on techniques such as tracking cookies and device fingerprinting which can reveal 
your browsing history to advertisers or ad platforms. The FLoC proposal aims to allow ad selection 
without compromising privacy.


## What is the FLoC proposal?

Advertisers use multiple techniques to choose relevant ads. For example:
* First-party and contextual information: "Show this ad to users who selected knitting as a favorite 
topic" or "Show this ad on pages about motorcycles'.
* Specific actions of the user: "Show this ad for discount wool to users who left knitting items in 
their shopping cart." Remarketing use cases such as this are handled by the [FLEDGE](/docs/privacy-sandbox/fledge) 
proposal.
* General information about user interests: "Show this ad to classical music lovers" or "Show this 
ad to users that viewed hiking boots on an online shoe store". This is the use case handled by FLoC.

With FLoC, the browser groups thousands of users with similar browsing histories into "cohorts", and 
periodically recalculates this value. Advertisers can select ads for this group, but cannot identify 
individual people within it. Each user belongs to no more than one cohort. The user's browser 
provides their cohort ID (for example "9739") to websites and services on request. Cohort IDs can be 
requested to select ads or to learn which cohorts are most likely to visit a website or complete a 
'conversion' event such as a purchase or content view.

As well as relevant ads, FLoC can also be used to suggest relevant content, by sites that observe 
correlations between cohort IDs and browsing activity.

### Today
Ad tech companies infer a particular individual's interests based on sites they visit by using 
cookies and fingerprinting techniques.

### Future
FLoC allows sites to guess your interests without being able to uniquely identify you. Content can 
be personalized in a private way based on the recent browsing activity of a large group of people, 
instead of tracking the detailed browsing history of individuals.


## What can FLoC be used for?

* Show ads to people whose browsers belong to a cohort that has been observed to frequently visit an 
advertiser's site or shows interest in relevant topics.
* Use machine learning models to predict the probability a user will convert based on their cohort, 
in order to inform ad auction bidding behavior.
* Recommend content to users. For example, suppose a news site observes that their sports podcast 
page has become especially popular with visitors from cohorts 1234 and 7. They can recommend that 
content to other visitors from those cohorts.


## How does FLoC work?

[What is Federated Learning of Cohorts?](https://web.dev/floc/#how-does-floc-work) provides a 
simple, step-by-step explanation of how FloC works.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/Wn3jzSPSeiHiR2p6Yr1f.png", 
alt="Diagram showing, step by step, the different roles in selecting and delivering an ad using
  FLoC: FLoC service, Browser, Advertisers, Publisher (to observe cohorts), Adtech,
  Publisher (to display ads)", width="800", height="359" %}


---


## Engage and share feedback

* **GitHub**: Read the [proposal](https://github.com/WICG/floc), [raise questions and 
follow discussion](https://github.com/WICG/floc/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).


## Find out more

* [What is Federated Learning of Cohorts (FLoC)?](https://www.web.dev)
* [FLoC API technical explainer](https://github.com/WICG/floc)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

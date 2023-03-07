---
layout: 'layouts/doc-post.njk'
title: 'FLoC'
subhead: >
  Allow sites to guess your interests without being able to uniquely identify you.
description: >
 FLoC enables interest-based advertising in a way that preserves privacy. As a user moves around the 
 web, their browser is assigned to an "interest cohort" along with thousands of others with a 
 similar browsing history. This is done without sharing individual browsing history with the browser 
 vendor or anyone else.
date: 2021-05-18
updated: 2021-10-29
authors:
  - samdutton
---


## Implementation status

* Initial [origin trial](https://web.dev/origin-trials) now closed. 
* [Demo](https://floc.glitch.me/) of initial version (origin trial now closed).
* [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) in 
[Blink](https://www.chromium.org/blink).

{% Aside %}
This post outlines the API design implemented in Chrome for the first origin trial of FLoC. 

Future iterations of an API to enable interest-based advertising without third-party cookies 
or other cross-site tracking mechanisms are currently in development.
{% endAside %}

## Why do we need FLoC?

Many people are concerned about the privacy implications of tailored advertising, which currently 
relies on techniques such as tracking cookies and device fingerprinting which can reveal your 
browsing history across sites to advertisers or ad platforms. The FLoC proposal aims to allow ad 
selection in a way that better protects privacy.


## What is the FLoC proposal?

FLoC provides a privacy-preserving mechanism for interest-based selection of ads and other content.

As a user moves around the web, their browser uses the FLoC algorithm to work out its 
"interest cohort", which will be the same for thousands of browsers with a similar recent browsing 
history. The browser recalculates its cohort periodically, on the user's device, without sharing 
individual browsing data with the browser vendor or anyone else.

Advertisers (sites that pay for advertisements) can include code on their own websites to gather and 
provide cohort data to their ad tech platforms (companies that provide software and tools to deliver 
advertising). For example, an ad tech platform might learn from an online shoe store that browsers 
from cohorts 1101 and 1354 seem interested in the store's hiking gear. From other advertisers, the 
ad tech platform learns about other interests of those cohorts.

Subsequently, the ad platform can use this data to select relevant ads when a browser from one of 
those cohorts visits a page from a site that displays ads, such as a news website.


## What can FLoC be used for?

* Show ads to people whose browsers belong to a cohort that has been observed to frequently visit an 
advertiser's site or shows interest in relevant topics.
* Use machine learning models to predict the probability a user will convert based on their cohort, 
in order to inform ad auction bidding behavior.
* Recommend content to users. For example, suppose a news site observes that their sports podcast 
page has become especially popular with visitors from cohorts 1234 and 14159. They can recommend 
that content to other visitors from those cohorts.

## How does FLoC work?

[What is FLoC?](https://web.dev/floc/#how-does-floc-work) provides a simple, step-by-step 
explanation of how FloC works. 

The diagram below shows an example of the different roles in selecting and delivering a relevant ad 
by using FLoC.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/oH6SuZegrVJMbkTsl9mq.png", 
alt="Diagram showing, step by step, the different roles in selecting and delivering a relevant ad by 
	using FLoC: FLoC service, Browser, Advertisers, Publisher (to observe cohorts), Ad tech,
  Publisher (to display ads)", width="800", height="359" %}


---


## Engage and share feedback

* **GitHub**: Read the [proposal](https://github.com/WICG/floc), [raise questions and 
follow discussion](https://github.com/WICG/floc/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).
* **Developer support**: Ask questions and join discussions on the 
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Find out more

* [What is FLoC?](https://www.web.dev)
* [FLoC API technical explainer](https://github.com/WICG/floc)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

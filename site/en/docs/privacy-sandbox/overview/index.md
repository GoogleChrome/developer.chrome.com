---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: The Privacy Sandbox is a series of proposals to satisfy third-party use cases without third-party cookies or other tracking mechanisms.
description: What's in it, who's behind it, and what it's for.
date: 2021-02-05
updated: 2021-02-05
authors:
	- samdutton
---

## What is the Privacy Sandbox?

{% youtube 
	id='WnCKlNE52tc' 
%}


!!!.aside.aside--warning
The aim is to include the following textual content in this page in 300 words or less. 

Potentially, these (or similar) could be headings.

* What are the requirements that need to be met (by the Privacy Sandbox)?
* What are the problems that need to be addressed?
* What's wrong with existing solutions: why do we need something new?
* In concrete terms, what is 'the Privacy Sandbox'? 
* What the Privacy Sandbox is not.
* How will the Privacy Sandbox address requirements and solve problems?
* Who is working on the Privacy Sandbox?
* How are these proposals developed?
* What is the timeframe?
* How to share feedback and comments
* How to get involved


Text below is temporary content taken from [web.dev/digging-into-the-privacy-sandbox](https://web.dev/digging-into-the-privacy-sandbox/).
!!!


## The current state of privacy on the web

Websites use services from other companies to provide analytics, serve video and do lots of other useful stuff. Composability is one of the web's superpowers. Most notably, ads are included in web pages via third-party JavaScript and iframes. Ad views, clicks and conversions are tracked via third-party cookies and scripts.

However, when you visit a website you may not be aware of the third parties involved and what they're doing with your data. Even publishers and web developers may not understand the entire third-party supply chain.

Ad selection, conversion measurement, and other use cases currently rely on establishing stable cross-site user identity. Historically this has been done with third-party cookies, but browsers have begun to restrict access to these cookies. There has also been an increase in the use of other mechanisms for cross-site user tracking, such as covert browser storage, device fingerprinting, and requests for personal information such as email addresses.

This is a dilemma for the web. How can legitimate third-party use cases be supported without enabling users to be tracked across sites?

In particular, how can websites fund content by enabling third parties to show ads and measure ad performance—but not allow individual users to be profiled? How can advertisers and site owners evaluate a user's authenticity without resorting to dark patterns such as device fingerprinting?

The way things work at the moment can be problematic for the entire web ecosystem, not just users. For publishers and advertisers, tracking identity and using a variety of non-standard third-party solutions can add to technical debt, code complexity, and data risk. Users, developers, publishers, and advertisers should be confident that the web is protecting user privacy choices.

Advertising is a core web business model for the internet, but advertising has to work for everyone. Which brings us to the Privacy Sandbox's mission: to create a thriving web ecosystem that is respectful of users and private by default.

## Introducing the Privacy Sandbox

The Privacy Sandbox introduces a set of privacy-preserving APIs to support business models that fund the open web in the absence of tracking mechanisms like third-party cookies.

The Privacy Sandbox APIs require web browsers to take on a new role. Rather than working with limited tools and protections, the APIs enable the user's browser to act on the user's behalf—locally, on their device—to protect the user's identifying information as they navigate the web. The APIs enable use cases such as ad selection and conversion measurement, without revealing individual private and personal information. In engineering terms a sandbox is a protected environment; a key principle of the Privacy Sandbox is that a user's personal information should be protected and not shared in a way that lets the user be identified across sites.

This is a shift in direction for browsers. The Privacy Sandbox's vision of the future has browsers providing specific tools to satisfy specific use cases, while preserving user privacy. A Potential Privacy Model for the Web sets out core principles behind the APIs:

To establish the range of web activity across which the user's browser can let websites treat a person as having a single identity.
To identify the ways in which information can move across identity boundaries without compromising that separation.

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
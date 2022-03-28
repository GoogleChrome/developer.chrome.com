---
layout: layouts/doc-post.njk
title: Proposal lifecycle in the Privacy Sandbox
subhead: >
  How we collaborate with stakeholders to discuss, test, and adopt privacy-preserving technologies.
description: >
  How we collaborate with stakeholders to discuss, test, and adopt privacy-preserving technologies.
date: 2022-03-30
authors:
  - alexandrawhite
---

_Much of this content was originally shared as a part of the
[2021 Chrome Developer Summit recap](/docs/privacy-sandbox/cds21-update/)._

## What is the goal of The Privacy Sandbox proposals?

The Privacy Sandbox proposals are the first of many steps necessary in the
creation of web standards.

Web standards are technical documents&mdash;known as specifications or
specs&mdash;which detail exactly how web technology should work. These specs
are for developers to implement the technologies. For example, the [Accessible
Rich Internet Applications (WAI-ARIA) standard](https://www.w3.org/TR/wai-aria-1.1/)
(commonly known as just "ARIA") defines technical ways to make the web more
accessible to those with disabilities. These specs are developed for and by the
[World Wide Web Consortium (W3C)](https://www.w3.org/Consortium/), an
international community with full-time staff, member organizations, and
feedback from the general public.

After [discussion](#discussion), [testing](#testing), and [scaled
adoption](#scaled-adoption), some proposals will become specs. It's
critical we [receive feedback](/docs/privacy-sandbox/feedback/) from
developers and industry leaders (with and without web technology knowledge) to
ensure we create durable web features with broad utility and robust privacy
protections for users.

Chromium (the open source platform behind many modern browsers) has written
about the [feature development
process](https://www.chromium.org/blink/launching-features/) for all
technologies which aim to become a web standard. Because of the critical nature
of privacy and security on the web, we expect and encourage large amounts of
discussion and feedback before testing begins.

## From proposal to web standard

There is a large amount of ecosystem input shaping this work, at every stage of
development. This process may be familiar to web developers, but may be new to
other industry stakeholders who will use these purpose-built APIs&mdash;and
whose expertise is critical to this initiative.

### Start with discussion {: #discussion}

There have been dozens of [privacy-preserving
proposals](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)
offered by Chrome and others over the last couple of years. You can read these
proposals, ask questions, offer ideas to improve them and see what others are
saying. 

To find conversations where the proposed solutions are being discussed and
debated together, there are a number of W3C groups you can join or monitor,
depending on the use cases you're interested in:

* [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/)
* [Private Advertising Technology Community Group](https://www.w3.org/community/patcg/)
* [Privacy Community Group](https://www.w3.org/community/privacycg/)
* [Web Platform Incubator Community Group](https://www.w3.org/community/wicg/)
* [Federated Identity Community Group](https://www.w3.org/community/fed-id/)

The discussion stage can be highly involved.

For example, [FLEDGE](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)
is a proposal to support interest-based advertising without cross-site
tracking. With input from privacy advocates and many industry stakeholders,
FLEDGE has evolved from two previous proposals (PIGIN and TURTLEDOVE). More
than one hundred organizations have joined [W3C
meetings](https://github.com/WICG/turtledove/issues/88) to help refine the
current version, plus over [200 online discussion
threads](https://github.com/WICG/turtledove/issues).

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/Rg4lEQVzb1v6CZTyzFTE.png",
alt="In 2019 we proposed PIGIN, followed by TURTLEDOVE in 2020 and FLEDGE in 2021.",
width="800", height="169" %}

There have also been more than half a dozen other proposals offered by other
companies, in the same solution space. Through continued collaboration, we hope
to define a path forward. 

At the same time, [developer testing](/blog/fledge-api/)
for the initial version of FLEDGE is behind a Chrome flag so developers can get
their hands on it.

Not every proposal will go through such an intense incubation period as
FLEDGE&mdash;some will move much more quickly&mdash;but there is a lot of
innovation happening. These are new ideas and it can take a lot of work to get
them right.

### Developers test and share feedback {: #testing}

Testing is critical because it surfaces issues or gaps that may require more
work. There will be many iterative cycles of discussion and testing. There are
a handful of proposals ready for developer testing today and more will become
available.

Testing in Chrome usually starts with a feature behind a flag for developers to
test locally. This means developers need to turn it on in the browser to try it
out. This code is often very fresh, so you can expect to find issues.

We also run origin trials, each of which run for a limited time with a limited
population of Chrome users. Origin trials are public and open to all
developers&mdash;you just need to register to opt in your site or service. This
is when we get actionable feedback from developers on what works, what doesn't,
and where those gaps are.

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/vTqicAx2UauzkePJkM0A.png",
alt="", width="800", height="368" %}

Success at this stage depends both on developers doing hands-on testing and
being willing to share what they learn.

{% Aside %}
For example, Yahoo! JAPAN published a
[detailed analysis](https://github.com/WICG/conversion-measurement-api/issues/201)
of their test of the Attribution Reporting API. They highlighted areas for
improvement like the need for a better way to deliver conversion reports,
which has now been added to the API.
{% endAside %}

We also hope to see companies talking about their approach to testing and how
they expect to use an API. 

Chrome tests aren't the only way to explore how new technologies might work.
Some companies are also building simulations based on Privacy Sandbox concepts. 

{% Aside %}
Advertising platform Criteo recently
[ran a competition](https://medium.com/criteo-engineering/assessing-the-impacts-of-the-privacy-sandbox-piece-by-piece-1-bring-the-noise-624331e64a12)
with more than 150 teams testing different machine learning models to evaluate
how differential privacy concepts such as noise insertion and aggregation might
impact advertising performance.
{% endAside %}

### Launch for scaled adoption {: #scaled-adoption}

Once an API is tested and ready for general use in Chrome, we announce the
launch and make sure public documentation is ready for scaled ecosystem
adoption.

[User-Agent Client Hints](https://web.dev/user-agent-client-hints/) (UA-CH)
launched in Chrome in 2021. It's part of the Privacy Sandbox work stream to
reduce covert tracking such as browser fingerprinting.

Like cookies, the User-Agent (UA) string is an early web feature. By default,
it provides a lot of information about the user's browser and device, making
it a readily available surface for fingerprinting. It also has a format that
can be a headache to parse.

{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/AVzbV9HF0T0bm3buFjV6.jpg",
   alt="For example, 'User-Agent: Mozilla/5.0 (Linux; Android 10; Pixel 3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4076.0 Mobile Safari/537.36' is very long and offers specific details used for fingerprinting, such as the exact device model, platform version, and full Chrome version.",
   width="800", height="464"
%}

The reduced User-Agent includes the browser's brand and a significant version,
where the request came from (desktop or mobile), and the platform. In the
future, you’ll need to use UA-CH if you need to access more data in the future,
such as specific information about the user's device or conditions.

In other words, the User-Agent data is moving from an "available by default"
model to an "on request" model. This is a good privacy practice today, and the
pattern we want to set for the future.

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ZsumGF9jzVb5yYL4QD3i.png",
alt="", width="800", height="338" %}

In April 2022, gradual UA string reduction will begin in Chrome. UA-CH launched
and was ready for scaled adoption starting in March of 2021&mdash;you can begin
testing and migrating to it now. [Participate in an origin
trial](/origintrials/#/view_trial/-7123568710593282047) to opt-in to the
reduced UA string so you can see what the future state looks like.

It's important that developers have ample time to transition their websites to
adopt new standards. If it turns out your site needs extra time, you'll be able
to opt-in to keep using the User-Agent string as-is through March 2023.

## Wrap up and feedback  {: #wrap-up-feedback}

We'll continue to explain what's happening, provide as much forward visibility
as we can, encourage your involvement, and hear your input.

*  Learn about the many ways in which you can [provide
   feedback](/docs/privacy-sandbox/feedback/).
*  Read the technical details and [implementation guidelines](/docs/privacy-sandbox/).
*  Share your feedback with [@ChromiumDev on Twitter](https://twitter.com/ChromiumDev).
*  Submit Issues to the [developer support
   repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

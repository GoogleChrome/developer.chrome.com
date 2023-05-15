---
layout: layouts/doc-post.njk
title: Proposal lifecycle in the Privacy Sandbox
subhead: >
  How we collaborate with stakeholders to discuss, test, and adopt
  privacy-preserving technologies.
description: >
  How we collaborate with stakeholders to discuss, test, and adopt
  privacy-preserving technologies.
date: 2022-03-30
updated: 2022-05-17
authors:
  - alexandrawhite
---

The Privacy Sandbox proposals are the first of many steps required to create
web standards.

Web standards are technical documents, known as specifications or
specs, which detail exactly how web technology should work. Specs are
written for developers to implement the technologies. For example, the
[Accessible Rich Internet Applications (WAI-ARIA) standard](https://www.w3.org/TR/wai-aria-1.1/)
(commonly known as "ARIA") defines technical ways to make the web more
accessible to those with disabilities. These specs are developed for and by the
[World Wide Web Consortium (W3C)](https://www.w3.org/Consortium/), an
international community with full-time staff, member organizations, and feedback
from the general public.

After [discussion](#discussion), [testing](#testing), and [scaled
adoption](#scaled-adoption), some Privacy Sandbox proposals and APIs will
become specs. It's critical we [receive feedback](/docs/privacy-sandbox/feedback/)
from developers and industry leaders (with and without web technology
knowledge) to ensure we create durable web features with broad utility and
robust privacy protections for users.

Chromium (the open source project behind many modern browsers) has written
about the [feature development process](https://www.chromium.org/blink/launching-features/)
for all technologies which aim to become a web standard. Because of the
critical nature of privacy and security on the web, we expect and encourage
large amounts of discussion and feedback before testing begins.

## From proposal to web standard

At every stage of development, the ecosystem gives critical feedback which
shapes the Privacy Sandbox. This process may be familiar to web developers, but
may be new to other industry stakeholders who will use these purpose-built
APIs&mdash;and whose expertise is critical to this initiative.

### Start with discussion {: #discussion}

There have been dozens of [privacy-preserving
proposals](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)
offered by Chrome and others over the last few years. You can read these
proposals, ask questions, offer ideas to improve them and see what others say.

There are a number of W3C groups you can join or monitor, depending on the use
cases you're interested in:

* [Improving Web Advertising Business
  Group](https://www.w3.org/community/web-adv/)
* [Private Advertising Technology Community
  Group](https://www.w3.org/community/patcg/)
* [Privacy Community Group](https://www.w3.org/community/privacycg/)
* [Web Platform Incubator Community Group](https://www.w3.org/community/wicg/)
* [Federated Identity Community Group](https://www.w3.org/community/fed-id/)

The discussion stage can be highly involved.

For example, [Protected Audience API](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) is
a proposal to support interest-based advertising without cross-site tracking.
With input from privacy advocates and many industry stakeholders, Protected Audience API has
evolved from two previous proposals (PIGIN and TURTLEDOVE). More than 100 have
joined [W3C meetings](https://github.com/WICG/turtledove/issues/88) to help
refine the current version, plus over
[300 online discussion threads](https://github.com/WICG/turtledove/issues).

There have also been more than half a dozen other proposals offered by other
companies, in the same solution space. Through continued collaboration, we hope
to define a path forward.

[Testing for Protected Audience API](/docs/privacy-sandbox/fledge-experiment/) and other APIs
is available behind a Chrome flag, so developers can access them early.

Not every proposal goes through such an intense incubation period as
Protected Audience API&mdash;some will move much more quickly&mdash;but there is a lot of
innovation happening. These are new ideas and it can take a lot of work to get
them right.

### Developers test and share feedback {: #testing}

We rely on developers to provide [feedback](/docs/privacy-sandbox/feedback/) on
improvements to these technologies and to share issues which may require
changes to the API design and implementation. Many of the Privacy Sandbox
technologies are available for testing, with various options.

Often, Chrome engineers implement [features behind flags](/docs/web-platform/chrome-flags/)
to allow for local testing, without the feature being available by default
across browsers. Developers must enable a feature to try it, and the feature
implementation will be. This means developers can expect to encounter some
issues.

[Chrome origin trials](/docs/web-platform/origin-trials/) allow developers to
enable a feature for a limited population of Chrome users. To participate,
developers can register to opt in your site or service. This provides you an
opportunity to try the feature on production traffic and provide feedback on
real-world experience.

<figure>
{% Img
  src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/gSDnOdAhjtUa5XnBFVI7.png",
  alt="Proposals move through discussion to functional testing,
  effectiveness and scaled testing, to general availability. At each
  stage, Chromium publishes Intent documents.",
  width="800", height="231"
%}
<figcaption>
Features progress through a timeline of development and testing through to
general availability. These individual phases are not hard boundaries, but
represent a change in focus as a feature moves from discussing a potential
functionality through to testing real behavior in a browser. The diagram shows
some terms and artefacts you will see through a proposal's progress.
</figcaption>
</figure>

When a feature is initially made available for testing, the focus is generally
on **functional or technical testing**. With new code, there is an expectation
that contributors will discover and report bugs, as well as provide fixes for
those bugs. This means the stability and shape of a feature may change quickly
in this period. Receiving feedback on the integration and developer experience
is critical to ensure that debugging and tooling support can be created
alongside the feature.

As development progresses and the features become more stable, the focus shifts
to wider scale **effectiveness or utility testing.** The aim of utility testing
is to understand the performance of the feature against its intended use cases,
at scale. At this stage, the population of Chrome users included in the
experiment is increased to obtain a larger, more representative sample.
During this phase, we hope to see sites running longer term tests over a larger
portion of their own traffic to validate the feature against their business
needs.

Success in this process depends on developers performing these tests, then
sharing what they learn. We're also testing, simultaneously throughout each
phase, and we share the results through the various individual project channels
with regular summaries across the project in our
[Progress in the Privacy Sandbox blog series](/tags/progress-in-the-privacy-sandbox/)
and [quarterly feedback reports](/docs/privacy-sandbox/feedback/#reports) as
part of [our commitments with the CMA](https://blog.google/around-the-globe/google-europe/path-forward-privacy-sandbox/).

{% Aside 'example' %}

Yahoo! JAPAN published a [detailed
analysis](https://github.com/WICG/conversion-measurement-api/issues/201) of
their participation in the Attribution Reporting API origin trial. They
highlighted areas for improvement like the need for a better way to deliver
conversion reports, which has now been added to the API.

{% endAside %}

Whether you share your testing in public places like the W3C, feedback forms, or
through direct partnership channels, [we hope to hear from
you](/docs/privacy-sandbox/feedback/).

Testing in the browser, either through feature flags or origin trials, isn't the
only way to explore how new technologies might work. Some companies are also
building simulations based on Privacy Sandbox concepts.

{% Aside 'example' %}

Advertising platform Criteo recently [ran a
competition](https://medium.com/criteo-engineering/assessing-the-impacts-of-the-privacy-sandbox-piece-by-piece-1-bring-the-noise-624331e64a12)
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

Like cookies, the User-Agent (UA) string is an early web feature. By default, it
provides a lot of information about the user's browser and device, making it a
readily available surface for fingerprinting. It also has a format that can be a
headache to parse.

<figure>
{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/AVzbV9HF0T0bm3buFjV6.jpg",
   alt="Full User-Agent string, highlighting the platform version, device model, and full chrome version.", width="800", height="464"
%}
<figcaption>For example, 'User-Agent: Mozilla/5.0 (Linux; Android 10; Pixel 3)
   AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4076.0 Mobile
   Safari/537.36' is very long and offers specific details used for
   fingerprinting, such as the exact device model, platform version, and full
   Chrome version.</figcaption>
</figure>

The reduced User-Agent includes the browser's brand and a significant version,
where the request came from (desktop or mobile), and the platform. In the
future, you’ll need to use UA-CH if you need to access more data in the future,
such as specific information about the user's device or conditions.

In other words, the User-Agent data is moving from an "available by default"
model to an "on request" model. This is a good privacy practice today, and the
pattern we want to set for the future.

{% Img
  src="image/VbsHyyQopiec0718rMq2kTE1hke2/ZsumGF9jzVb5yYL4QD3i.png",
  alt="", width="800", height="338"
%}

In April 2022, gradual UA string reduction will begin in Chrome. UA-CH launched
and was ready for scaled adoption starting in March of 2021&mdash;you can begin
testing and migrating to it now. [Participate in an origin
trial](/origintrials/#/view_trial/-7123568710593282047) to opt-in to the reduced
UA string so you can see what the future state looks like.

It's important that developers have ample time to transition their websites to
adopt new standards. If it turns out your site needs extra time, you'll be able
to opt-in to keep using the User-Agent string as-is through March 2023.

## Share your feedback  {: #wrap-up-feedback}

We'll continue to explain what's happening, provide as much forward visibility
as we can, encourage your involvement, and hear your input.

*  Learn about the many ways you can
   [provide feedback](/docs/privacy-sandbox/feedback/).
*  Read the technical details and [implementation
   guidelines](/docs/privacy-sandbox/).
*  Share your feedback with [@ChromiumDev on
   Twitter](https://twitter.com/ChromiumDev).
*  Submit Issues to the [developer support
   repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

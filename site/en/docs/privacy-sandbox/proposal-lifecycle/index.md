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
updated: 2023-05-18
authors:
  - alexandrawhite
---

The Privacy Sandbox proposals are the first of many steps required to create
web platform features.

These web platform features may become web standards (also known as
specifications or specs), which are technical documents that detail exactly how
web technology should work and define how engineers should implement the
technologies in web browsers. For example, the
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

<figure>
  {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/pZjqJnZFFrVBci1HL49M.png", alt="", width="800", height="223" %}
  <figcaption>
    Features progress through a timeline of development and testing through to general availability. The intents are hard boundaries, which are required before certain actions can take place. For example, testing cannot begin until an Intent to Experiment has been posted and received approvals. Learn more about these <a href="https://www.chromium.org/blink/guidelines/api-owners/procedures/">requirements</a>.
  </figcaption>
</figure>

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

<figure class="float-right">
  {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/YqWVuPhY40KbtMcBkpde.png", alt="An Intent to Prototype starts the conversation.", width="205", height="274" %}
</figure>

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

For example,
[Protected Audience](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)
(formerly known as FLEDGE) is
a proposal to support interest-based advertising without cross-site tracking.
With input from privacy advocates and many industry stakeholders, the Protected Audience API has
evolved from two previous proposals (PIGIN and TURTLEDOVE). More than 100 have
joined [W3C meetings](https://github.com/WICG/turtledove/issues/88) to help
refine the current version, plus over
[300 online discussion threads](https://github.com/WICG/turtledove/issues).

There have also been more than half a dozen other proposals offered by other
companies, in the same solution space. Through continued collaboration, we hope
to define a path forward.

[Testing for Protected Audience](/docs/privacy-sandbox/fledge-experiment/) and
other APIs is available behind a Chrome flag, so developers can access them
early.

Not every proposal goes through such an intense incubation period as
Protected Audience&mdash;some will move much more quickly&mdash;but each API
receives input from across the ecosystem. These are new ideas and it can take a
lot of work to get them right.

### Developers test and share feedback {: #testing}

<figure class="float-right">
  {% Img
    src="image/VbsHyyQopiec0718rMq2kTE1hke2/LOVctE33BzfAxj6MZl2O.png",
    alt="Intent to Experiments are for functional and scaled testing",
    width="530", height="274"
  %}
</figure>

We rely on developers to provide [feedback](/docs/privacy-sandbox/feedback/) on
improvements to these technologies and to share issues which may require
changes to the API design and implementation. Many of the Privacy Sandbox
technologies are available for testing, with various options. For example, to
test the Topics API, you can set the
[epoch length and other parameters](/docs/privacy-sandbox/topics/#feature-flags) with Chrome flags.

Often, Chrome engineers implement [features behind flags](/docs/web-platform/chrome-flags/)
to allow for local testing, without the feature being available by default
across browsers. Developers must enable a feature to try it and availability is
is dependent on Chrome version. Developers can expect to encounter some issues
as development continues.

[Chrome origin trials](/docs/web-platform/origin-trials/) allow developers to
enable a feature for a limited population of Chrome users. To participate,
developers can register to opt in your site or service. This provides you an
opportunity to try the feature on production traffic and provide feedback on
real-world experience.

The Privacy Sandbox has been running a
[unified origin trial](/docs/privacy-sandbox/unified-origin-trial/) for the
relevance and measurement APIs, which is still open for sign ups. We anticipate
this origin trial will close when these
[APIs enter general availability](/blog/shipping-privacy-sandbox/). 

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

<figure class="float-right">
  {% Img
    src="image/VbsHyyQopiec0718rMq2kTE1hke2/OhdrhlSPu18pDYFeqsyT.png",
    alt="An Intent to Ship indicates an request to make an API available for scaled adoption.", width="302", height="272"
    %}
</figure>

Once an API is tested and ready for general use in Chrome, we announce the
launch and make sure public documentation is ready for scaled ecosystem
adoption.

We've already shipped a number of significant milestones, with many more to
come. The following technologies are now available:

* [User-Agent reduction](/docs/privacy-sandbox/user-agent/): Limit passively
  shared browser data to reduce the volume of sensitive information which leads
  to fingerprinting. We began reduction of these values in May 2022 and plan to
  complete in May 2023.
* [CHIPS](/docs/privacy-sandbox/chips/): Allow developers to opt-in a cookie to
  partitioned storage, with a separate cookie jar per top-level site. CHIPS
  became available in Stable in February 2023.
* [First-Party Sets](/docs/privacy-sandbox/first-party-sets/): Declare
  relationships among sites to allow for limited cross-site cookie access using
  the Storage Access API. First-Party Sets is slowly rolling out with Chrome
  Stable version 113, this week.
* [Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/):
  Support federated identity without sharing the user's email address or other
  identifying information with a third-party service or website, unless the
  user explicitly agrees to do so. FedCM shipped in November 2022.

In July 2023, the relevance and measurement APIs will be
[available for scaled adoption](/blog/shipping-privacy-sandbox/). This means
these APIs will be available by default in Chrome. Developers will be able to
use these technologies without browser flags or participation in origin trials.

In short, these APIs will be ready for use, at-scale, in a production
environment.

#### Phased launches

Some technologies are made available gradually. This allows our team and
developers to monitor and address potential issues. And, full availability
doesn't mean 100% of traffic has the APIs enabled.

For example, the User-Agent Client Hints (UA-CH) phased launch in Chrome began
in 2021. [User-Agent reduction](/docs/privacy-sandbox/user-agent/) began in
April 2022 and completed in March 2023. This allowed developers ample time to
transition how their sites relied on the User-Agent string.

#### API controls

Some APIs, like the relevance and measurement APIs, have configuration options
for the user. This includes the ability to enable and disable these APIs.

It's important to build the appropriate
[feature detection](https://developer.mozilla.org/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection).
Feature detection can help determine whether a browser supports certain code
and allow you to provide alternative code. This ensures that your site
continues to behave as-expected, even if an API has been turned off by a user
or the user is in a browser without support for a particular technology.

Consider using a
[Permissions Policy](/docs/privacy-sandbox/permissions-policy/) to control
first-party and third-party access to browser features.

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

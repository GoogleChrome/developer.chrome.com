---
layout: 'layouts/doc-post.njk'
title: 'Chrome-facilitated testing'
subhead: >
  Test your sites with third-party cookies disabled.
description: >
  Test your sites with third-party cookies disabled.
date: 2023-05-18
authors:
  - alexandrawhite
  - rowan_m
---

As we start [general availability](/blog/privacy-sandbox-launch/) for the
relevance and measurement APIs, we intend to provide Chrome-facilitated testing
that allows sites to meaningfully preview what it's like to operate in a world
without third-party cookies. APIs will be gradually enabled over the course of the 115 milestone while monitoring for issues, aiming for 99% availability by mid-August. This will allow us to perform more effective API
testing and grow confidence within the ecosystem as to its readiness for
third-party cookie phase out.

We have worked with the CMA to ensure these testing modes align with the
testing framework (and timeline) for third parties laid out in its note on
_[Quantitative testing of Google's Privacy Sandbox technologies](https://assets.publishing.service.gov.uk/media/6363b00de90e0705a8c3544d/CMA_Experiments_note.pdf)_.
As a result, the CMA anticipates that the results from testing in these modes
can be used in its assessment of the Privacy Sandbox. 

We plan to have two modes of Chrome-facilitated testing:

* **Mode A**: Ad techs can receive control and experiment labels on a portion
  of traffic and use these to conduct testing and experiments.
* **Mode B**: Chrome globally disables third-party cookies for some portion of
  all Chrome users.

These details are not final, and we'll publish further implementation guidance
as we progress in Q3 2023. The current proposals are as follows.

## Mode A: Opt-in testing {: #mode-a }

Ad techs will be able to receive experiment labels for a portion of Chrome
traffic. An ad tech can choose to coordinate with other ad techs, for example,
to run [Protected Audience](/docs/privacy-sandbox/fledge/) auctions without
third-party cookies for a consistent experiment group. Ad techs can also use
these labels for their own independent experiments and testing. 

Chrome will not modify the state of third-party cookies for users in Mode A.
Chrome only provides the labels, as to ensure that ad techs can experiment with
consistent control and experiment groups. This means that a publisher's site
could still receive third-party cookie data for the publisher's own usage, even
if their ad tech partners are participating in the experiment.

We expect this to allow for meaningful experimentation, where all involved
sites and services can coordinate to ensure third-party cookies are not used at
any point within the process. We anticipate providing labels for up to 10% of
Chrome browsers via a new request header and low-entropy client hint. We
encourage anyone interested in testing to provide
[feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues)
from the ecosystem on the method for accessing labels and the granularity of
labels.

We plan to make the opt-in testing mode available starting in Q4 2023, and
we'll continue this mode until third-party cookie deprecation.

## Mode B: 1% third-party cookie deprecation {: #mode-b }

Chrome will deprecate third-party cookies for up to 1% of browsers. There is no
opt-in for this mode, as it will be applied globally. There is, of
course, the possibility that some site features may be impacted if the site
hasn't yet adopted an alternative solution, such as
[CHIPS](/docs/privacy-sandbox/chips/) or
[First-Party Sets](/docs/privacy-sandbox/first-party-sets/). 

{% Aside %}

If you rely on third-party cookie data for site functionality, read our
[guide to prepare for third-party cookie phase-out](/docs/privacy-sandbox/third-party-cookie-phase-out/)
to understand if CHIPS or First-Party Sets can address your needs. We've
launched a [public issue tracker](https://goo.gle/report-3pc-broken), where you
can report site issues resulting from third-party cookie deprecation. 

{% endAside %}

We're working on mitigations to detect, address, and proactively alert site
owners of issues that impact user experience during this phase.

Additionally, we plan to provide a small fraction of traffic within Mode B that
has Privacy Sandbox relevance and measurement APIs disabled. Other APIs, like
First-Party Sets, CHIPS, FedCM, and so on, will not be disabled. We anticipate
that this combination will be helpful to establish a baseline of
performance without third-party cookies, and we're seeking
[feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) on
an appropriate fraction of traffic to devote to this subset of testing.

We plan to deprecate 1% of third party cookies in Q1 2024, and we'll work
closely with the CMA before taking further steps to expand deprecation.

## Engage and share feedback

Feedback from a diverse set of stakeholders across the web ecosystem is critical to the Privacy Sandbox initiative. The dedicated [feedback section](/docs/privacy-sandbox/feedback/) provides an overview of the existing public channels, where you can follow or contribute to discussion, along with a feedback form to ensure you can always reach the Chrome team directly.

You can provide your feedback on the following issues:

-  [Are you planning to test using Mode A, Mode B, or both?](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/112)
-  [Picking label sizes for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/113)
-  [Use of Client Hints for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/114)

Or you can also [raise a new issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues) for additional questions or discussion.  

{% Aside %}

The [Competition and Markets Authority (CMA)](https://www.gov.uk/government/organisations/competition-and-markets-authority) has published their [guidance on testing Privacy Sandbox APIs](https://assets.publishing.service.gov.uk/media/649d6a5f45b6a2000c3d455f/20230629_CMA_industry_testing_update_B.pdf) with relevant information on timelines, approaches to testing, and next steps.

{% endAside %}

If you're a developer, you can ask questions and join discussions in the [Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) on GitHub.

---
layout: 'layouts/blog-post.njk'
title: 'Preparing to ship the Privacy Sandbox relevance and measurement APIs'
authors:
  - rowan_m
  - alexandrawhite
description: >
  General availability for these APIs begins in late July with Chrome
  Stable 115.
subtitle: >
  General availability for these APIs begins in late July with Chrome
  Stable 115.
date: 2023-05-18
hero: 'image/VbsHyyQopiec0718rMq2kTE1hke2/tcYqpA0B5VEJXN27w0ZW.png'
alt: >
  The Privacy Sandbox with logo.
tags:
  - privacy
  - origin-trials
---

The Privacy Sandbox project is gearing up to ship the relevance and measurement
APIs to Chrome Stable. On the
[project timeline for the web](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline),
we show general availability (GA) starts in Q3 2023. Specifically, we intend to
target [Chrome Stable 115](https://chromiumdash.appspot.com/schedule), which
means we'll begin making the APIs generally available from late July, 2023.

In this post, we review multiple components of this launch, including:

* **What's shipping**. The relevance and measurement APIs launching are Topics,
  Protected Audience, Attribution Reporting, Private Aggregation, Shared
  Storage, and Fenced Frames. We'll make these APIs available gradually to
  monitor for potential issues.
* **The official launch process**. Each API goes through the standard Chrome
  launch process, which includes individual "Intent to Ship" messages published
  on the blink-dev mailing list for approval.
* **Updated user controls**. Users will have Ad privacy controls to manage the APIs.
* **Status of the origin trial**. The origin trial will continue to be
  available through to Stable release. 
* **Enrollment**. Enrollment will be available in June and required to access
  the relevance and measurement APIs in August.
* **Chrome-facilitated testing**. We're preparing options for developers to
  test the APIs without third-party cookie data. 

We'll keep you posted as we get closer to GA. For now, the only immediate
action for developers is to become informed. By identifying what changes are
coming, you can ensure your sites are ready.

When we say "GA," we mean the APIs are available by default in Chrome, without
requiring browser flags or participation in an origin trial. However, this does
not mean 100% of Chrome browsers immediately have the APIs enabled&mdash;the
APIs will be made available gradually, and users can always control if the APIs
are active. Once we are ramped up, the ecosystem can use the APIs in
production. 

<figure class="screenshot">
  <a href="https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline">
    {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ywbyok1JNTBh5B9Xb8xP.png", alt="Web timeline for the Privacy Sandbox.", width="800", height="562" %}
</a>
</figure>

These are the same set of APIs available for testing in the
[relevance and measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/).
The feedback we received from the ecosystem during testing has been absolutely
critical in shaping this functionality to meet important use cases. We're
grateful to all of you who have been testing, reporting issues, and sharing
your results with the world&mdash;it's a genuinely collaborative effort!

{: #included-apis }

## What's shipping

The relevance and measurement APIs include:

* [Topics](/docs/privacy-sandbox/topics/): Generate signals for interest-based advertising without third-party cookies or other user identifiers that track individuals across sites.
* [Protected Audience](/docs/privacy-sandbox/fledge/): Select ads to serve remarketing and custom audience use cases, designed to mitigate third-party tracking across sites. (This API was previously named FLEDGE. As we head towards launch, we've updated the name to better reflect the functionality.)
* [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/): Correlate ad clicks or ad views with conversions. Ad techs can generate event-level or summary reports.
* [Private Aggregation](/docs/privacy-sandbox/private-aggregation/): Generate aggregate data reports using data from Protected Audience and cross-site data from Shared Storage.
* [Shared Storage](/docs/privacy-sandbox/shared-storage/): Allow unlimited, cross-site storage write access with privacy-preserving read access.
* [Fenced Frames](/docs/privacy-sandbox/fenced-frame/): Securely embed content onto a page without sharing cross-site data.

{: #blink-intents }

### Shipping features in Chrome

<figure class="float-right">
{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/wtfeBg9L5DZVLQYoKKvO.png", alt="A suitcase with a lock and key", width="444", height="338" %}
</figure>

All proposals for new web platform features, including those in the Privacy Sandbox,  go through our [standard process to ship new functionality](https://www.chromium.org/blink/launching-features/) in Chrome. Each milestone in an API's lifecycle is signaled by an [Intent](https://www.youtube.com/watch?v=9cvzZ5J_DTg&list=PLNYkxOF6rcIBzsbjZKyOdO-iwQTjidz1P&index=1&t=3s&ab_channel=GoogleChromeDevelopers) message that we share on the public [blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev). That means for each of the Privacy Sandbox features, we sent an "Intent to Prototype" (I2P) when we shared the initial proposal for discussion and an "Intent to Experiment" (I2E) when we made the features available for testing via origin trial.

Soon, we'll send an "Intent to Ship" (I2S) message to blink-dev for each feature. The I2S messages will include additional detail on exact functionality and the plan to target Chrome version 115. An I2S must receive approvals from three Chromium API owners before it can proceed.

The APIs will not immediately be enabled for all browser instances with the Stable release. As with some previous Privacy Sandbox features, we'll gradually enable the APIs for an increasing percentage of browser instances to ensure that we can monitor and respond to any potential issues. As we progress, we'll share the status across our developer channels: here on developer.chrome.com, the blink-dev I2S threads, and the [developer mailing lists](/docs/privacy-sandbox/events/#future-events).

### Already shipped {: #shipped }

The relevance and measurement APIs are a critical piece of the Privacy Sandbox project. But, there are also some significant milestones we've already hit and plenty more to come:

* [User-Agent reduction](/docs/privacy-sandbox/user-agent/): Limit passively shared browser data to reduce the volume of sensitive information which leads to fingerprinting, while providing User-Agent Client Hints to actively request data. We began reduction of these values in May 2022 and completed in May 2023.
* [CHIPS](/docs/privacy-sandbox/chips/): Allow developers to opt-in a cookie to partitioned storage, with a separate cookie jar per top-level site. CHIPS became available in Chrome Stable in February 2023.
* [First-Party Sets](/docs/privacy-sandbox/first-party-sets/): Declare relationships among sites to allow for limited cross-site cookie access using the Storage Access API. First-Party Sets is slowly rolling out with Chrome Stable 113, this week.
* [Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/): Support federated identity without sharing the user's email address or other identifying information with a third-party service or website, unless the user explicitly agrees to do so. FedCM shipped in November 2022.

## Updated user controls {: #user-controls }

Alongside shipping the web platform APIs, we're updating the interface in Chrome to configure the features. We're evolving this interface from the trial participation controls to be more integrated with the overall Chrome settings. Currently, we're testing an updated Ad privacy interface with a small percentage of Chrome Stable users.

Developers can preview these controls by setting the `chrome://flags/#privacy-sandbox-settings-4` flag. We're continuing to evaluate the updated controls and the current version may differ from what we ship by default. However, these user controls don't change how sites interact with the API surface&mdash;the methods for feature detection and calling the APIs remain the same.

<figure class="screenshot">
{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/K7udJ3mRsR3ltLwZVJnL.png", alt="Ad privacy controls preview in Chrome.", width="800", height="509" %}
</figure>

## Origin trial

The [Privacy Sandbox Relevance and Measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/)
allows sites to run unified
experiments across Attribution Reporting, Protected Audience, Topics, Fenced
Frames, and Shared Storage. We intend to continue the origin trial through to
Chrome Stable 115. Testers participating in the origin trial may see
some gaps in availability or data from the APIs as Stable rolls
out, and we will provide additional guidance and details to help testers manage
this transition.

We'll update our [documentation](/docs/privacy-sandbox/unified-origin-trial/)
as this progresses.

## Enrollment and next steps {: #enrollment }

Alongside GA, we want to ensure these APIs are used as intended and with
transparency. We announced a new
[developer enrollment process](/blog/announce-enrollment-privacy-sandbox/) for
Privacy Sandbox relevance and measurement APIs, across Chrome and Android.
We'll share updates and instructions in the [enrollment documentation](/docs/privacy-sandbox/enroll/).

## Chrome-facilitated testing modes {: #testing }

We intend to provide Chrome-facilitated testing that allows sites to
meaningfully preview what it's like to operate in a world without third-party
cookies. This will allow us to perform more effective API testing and grow
confidence within the ecosystem, as to its readiness for third-party cookie
phase out.

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

### Mode A: Opt-in testing {: #mode-a }

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

### Mode B: 1% third-party cookie deprecation {: #mode-b }

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

## Engage and share feedback {: #feedback }

If you're not already participating in the relevance and measurement origin
trial, you can still [sign up and experiment](/docs/privacy-sandbox/unified-origin-trial/)
with these APIs. By signing up now, you'll have a chance to get more familiar
with how these APIs work in practice and try different techniques before they
are widely available.

Feedback from a diverse set of stakeholders across the web ecosystem is
critical to the Privacy Sandbox initiative. Our dedicated
[feedback section](/docs/privacy-sandbox/feedback/) provides an overview of the
existing public channels, where you can follow or contribute to discussion,
along with a feedback form to ensure you can always reach the Chrome team
directly.

If you're a developer, you can ask questions and join discussions in the
[Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
on GitHub.

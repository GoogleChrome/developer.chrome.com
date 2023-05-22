---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: >
  A series of proposals to satisfy cross-site use cases without
  third-party cookies or other tracking mechanisms.
description: "What's in it, what's it for, and how to get involved."
date: 2021-05-18
updated: 2023-02-27
authors:
  - samdutton
  - alexandrawhite
---

The Privacy Sandbox initiative aims to create technologies that both
protect people's privacy online and give companies and developers tools to
build thriving digital businesses.

The Privacy Sandbox has two core aims:

* Phase out support for third-party cookies when new solutions are in place.
* Reduce cross-site and cross-app tracking while helping to keep online content and services free for all.

{% YouTube
	id='WnCKlNE52tc'
%}

The Privacy Sandbox APIs require web browsers to take on a new role. Rather 
than working with limited tools and protections, the APIs allow a user's
browser to act on the user's behalf—locally, on their device—to protect the
user's identifying information as they navigate the web. This is a shift in
direction for browsers.

The Privacy Sandbox's vision of the future has browsers providing specific
tools to satisfy specific use cases, while preserving user privacy.

## What are the Privacy Sandbox proposals?

Chrome and other ecosystem stakeholders have offered more than 30 proposals to
date, which can be found in the
[public resources of W3C groups](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo).
These proposals cover a wide variety of use cases and requirements.

Proposals have a lifecycle with up to three phases before becoming
[web standards](https://www.w3.org/standards/): discussion, testing, and scaled
adoption. It's critical we [receive feedback](/docs/privacy-sandbox/feedback/)
from developers and industry leaders to ensure we create durable
web features with broad utility and robust privacy protections for users.
Read more about the [proposal lifecycle](/docs/privacy-sandbox/proposal-lifecycle/).

Several key proposals are listed below.

### Strengthen cross-site privacy boundaries

* [**CHIPS**](/docs/privacy-sandbox/chips/): Allow developers to opt-in a
  cookie to partitioned storage, with a separate cookie jar per top-level site.
* [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): Allow related
  domain names owned by the same entity to declare themselves as belonging to
  the same first party.
* [**Shared Storage**](/docs/privacy-sandbox/shared-storage/): Create a
  general-purpose API which allows sites to store and access unpartitioned
  cross-site data. This data must be read in a secure environment to prevent leakage.
* [**Storage Partitioning**](https://github.com/privacycg/storage-partitioning):
  Enable all forms of [user agent state](https://github.com/privacycg/storage-partitioning#user-agent-state),
  such as `localStorage` or cookies, to be double-keyed: by the top-level site
  as well as the origin of the resource being loaded, rather than a single
  origin or site.
* [**Fenced Frames**](/docs/privacy-sandbox/fenced-frame): Securely embed
  content onto a page without sharing cross-site data.
* [**Network State Partitioning**](https://github.com/MattMenke2/Explainer---Partition-Network-State):
  Prevent browser network resources being shared across first-party contexts,
  by ensuring that every request has a network partition key that must match in
  order for resources to be reused.
* [**Federated Credential Management (FedCM)**](/docs/privacy-sandbox/fedcm/):
  Support federated identity without sharing the user's email address or other
  identifying information with a third-party service or website, unless the
  user explicitly agrees to do so.

### Show relevant content and ads

* [**Topics API**](/docs/privacy-sandbox/topics): Enable interest-based
  advertising without use of third-party cookies or tracking user behavior
  across sites.
* [**Protected Audience API**](/docs/privacy-sandbox/fledge): Ad selection to serve remarketing
  and custom audience use cases, designed so that it cannot be used by third
  parties to track user browsing behavior across sites. The Protected Audience API is the first
  experiment to be implemented in Chromium from the
  [TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals.

### Measure digital ads

* [**Attribution Reporting**](/docs/privacy-sandbox/attribution-reporting):
  Correlate ad clicks or ad views with conversions. Ad techs can generate
  event-level or [summary reports](/docs/privacy-sandbox/summary-reports).
* [**Private Aggregation API**](/docs/privacy-sandbox/private-aggregation/):
  Generate noisy summary reports with cross-site data.

### Prevent covert tracking

* [**User-Agent reduction and User-Agent Client Hints**](/docs/privacy-sandbox/user-agent/):
  Limit passively shared browser data to reduce the volume of sensitive
  information which leads to fingerprinting. Client Hints allow developers to
  actively request only the information they need about the user's device or
  conditions.
* [**IP Protection**](/docs/privacy-sandbox/ip-protection/): Improve user
  privacy by protecting their IP address from being used for tracking.
* [**Bounce tracking mitigations**](/docs/privacy-sandbox/bounce-tracking-mitigations/):
  A proposal to reduce or eliminate the ability of bounce tracking to recognize
  people across contexts.
* [**Privacy Budget**](/docs/privacy-sandbox/privacy-budget/): Limit the amount
  of individual user data exposed to sites to prevent covert tracking.

### Fight spam and fraud on the web

* [**Private State Tokens**](/docs/privacy-sandbox/trust-tokens): Allow
  websites to convey a limited amount of information from one browsing context
  to another (for example, across sites) to help combat fraud, without passive
  tracking.

## Who works on the Privacy Sandbox?

Chrome and other browser vendors, as well as ad companies and other
stakeholders, have offered more than 30 proposals to date. These proposals can
be found in the
[public resources of W3C groups](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)
and cover a wide variety of use cases and requirements.

400+ participants have joined W3C groups to provide input including the
[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) and
the [Privacy Community Group](https://www.w3.org/community/privacycg/participants).

## Where are the Privacy Sandbox APIs available?

Five API implementations are currently available for testing in Chrome.

The APIs are implemented in
[Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)), which
is the open-source browser used to make Chrome. Code for the Privacy Sandbox
APIs can be accessed via
[Chromium Code Search](https://source.chromium.org/search?q=floc).

You can
[download Chromium](http://chromium.org/getting-involved/download-chromium),
then [run it with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
to allow access to APIs that are in the process of implementation.

{% Aside 'caution' %}  
Chrome origin trials are designed to work for Chrome users. Don't rely on Chrome
origin trial tokens to allow trial features in other browsers, including Chromium,
and other Chromium-based browsers.

For more detailed information, see
[Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/#chrome).

Chrome on iOS and iPadOS does not support Chrome origin trials.
{% endAside%}  

## When will the APIs be implemented?

The [timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)
has the latest implementation status for the Privacy Sandbox on the web. Each
API has an implementation status in their documentation.

We publish regular announcements on the [Chrome Developers blog](/tags/privacy/)
as APIs move from proposal to experiment to scaled availability.

## How can I try Privacy Sandbox APIs that aren't yet turned on by default?

As an API progresses through development in Chrome, there are multiple ways it
may be made available for testing.

-  **For a single user via command line flags**  
   Early features may often provide a specific command line flag to allow a
   developer to launch the browser with the new feature enabled.
-  **For a single user via `chrome://flags`**  
   As a feature progresses, it's often made available via an experimental flag
   within the more accessible `chrome://flags` interface.
   `chrome://flags#enable-experimental-web-platform-features` bundles together
   current experimental features.
-  **For your users, in an origin trial**  
   Once an iteration of a new feature is code-complete and relatively stable,
   an [origin trial](/docs/web-platform/origin-trials/) may be provided to allow
   individual sites to turn on the feature for Chrome users on their site. If
   an [origin trial](/docs/web-platform/origin-trials/) is available for an API you
   want to test with your users,
   [register for the origin trial](/origintrials/#/trials/active) and provide
   a valid trial token with every page load.
-  **For users of early Chrome releases**  
   When a feature is approved to ship in a given release, it will progress
   through each [Chrome release channel](/docs/web-platform/chrome-release-channels/),
   including Canary and Beta, before it reaches Stable. The feature will
   be turned on by default for all users of those channels.

{% Aside 'caution' %}  
Chrome offers users the ability to opt-out of Privacy Sandbox trials in
browser settings. Users who opt-out will not have Privacy Sandbox features
turned on, even on pages which provide a valid origin trial token.  
{% endAside%}  

## Will `SameSite` become irrelevant after third-party cookies are deprecated?

- `SameSite=Lax` is the current default. While it does not strictly *need* to
   be included, it's good practice to specify it for cross-browser consistency.
- `SameSite=Strict` continues to be a more restrictive option, for cookies that
   must only be sent when the user is already on the site. This is and remains
   a good security practice for cookies that are part of managing particularly
   sensitive access.
- `SameSite=None` should continue to be sent for cross-browser consistency. However,
   Chrome's proposed change to phase out third-party cookies would result in those
   cookies no longer being sent as is in cross-site contexts.

The exception is cookies that are modified by either the
[CHIPS](/docs/privacy-sandbox/chips/) or
[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) proposal.
These allow for a subset of cross-site use cases. As these proposals are
under active discussion, the final formats and functionality may change.


## Engage and share feedback

* **GitHub**: read the explainers on GitHub and raise questions or comments in
  the Issues tab for each.
* **W3C**: Use cases can be discussed and industry feedback shared in the W3C [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/), the [Privacy Community Group](https://www.w3.org/community/privacycg/participants),
and the [Web Incubator Community Group](https://github.com/WICG).
* **Developer support**: Ask questions and join discussions on the
  [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
* [A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model)
  sets out the core principles underlying the APIs.
* Chromium's overview of [the Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
* Google AI Blog: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
* [The future of third-party cookies](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

### Stay up to date on the progress of the Privacy Sandbox

You can follow the monthly updates to the [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/) series of articles which also includes an [RSS / Atom feed where you can subscribe](/feeds/progress-in-the-privacy-sandbox.xml) with your preferred reader.

The article series links to the matching monthly updates to the [Privacy Sandbox timeline](https://privacysandbox.com/timeline/) which shows the current status and schedule for proposals.

These high-level resources will provide signposts to changes across the project, but for individual proposals where you want to follow in detail you should:

 - Watch or Star proposal repos on GitHub to get notification of new issues and updates: the Privacy Sandbox [status page](/docs/privacy-sandbox/status/) provides a link to the repo for each proposal
 - Join the associated [W3C group](https://www.w3.org/groups/) for regular meetings discussing the proposal detail
 - Star the associated entry on [Chrome Platform Status](https://chromestatus.com) for email updates on Chrome implementation changes.

### Get involved

-  Participate in incubation, testing and refinement of the APIs:  
   [How to participate in the Privacy Sandbox initiative](/blog/privacy-sandbox-participate/)
-  As a developer, join discussions or ask questions:  
   [Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)

For questions about specific APIs, you can file an issue on the
[GitHub repo for an API Explainer](/docs/privacy-sandbox/status/).

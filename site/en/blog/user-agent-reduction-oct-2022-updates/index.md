---
layout: "layouts/blog-post.njk"
title: "Prepare for User-Agent Reduction changes in October"
subhead: > 
  What's happening with the User-Agent string, why Chrome is making this change, and what you can do to prepare.
description: >
  In October, Chrome will take the next step in reducing the information
  available in the browser's User-Agent string, to improve privacy for users. With
  this change, websites and services that rely on the User-Agent string for
  certain information may need to take action. This post gives some background on what's
  happening, why Chrome is making this change, and what you can do to prepare.
hero: 'image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/LSV0dVu9tz6GWlyQ2yKm.png'
alt: "Timeline of User-Agent Reduction changes."
authors:
  - jney
date: 2022-08-25
tags:
  - privacy
---

In October, Chrome will take the next step in reducing the information
available in the browser's User-Agent (UA) string, to improve privacy for users. With
this change, websites and services that rely on the User-Agent string for
certain information may need to take action.

Here's some background on what's happening, why Chrome is making this change,
and what you can do to prepare.

## Why is the User-Agent string changing

The User-Agent string includes information about the browser and the type
of device a person is using. The UA string has played an [instrumental
role](https://www.rfc-editor.org/rfc/rfc1945#section-10.15) for websites that
want to customize user experiences as well as for anti-fraud providers who rely
on this information to identify bots and malicious attacks. Chrome is committed
to maintaining those important use cases.

Nevertheless, the UA string does not meet modern web privacy expectations. By
default, the User-Agent string provides information which could be used to
identify and track a user across the web. And not all websites and services need
the information the UA string provides.

That's why Chrome is reducing the information shared by default in the UA
string, and introducing [a new API](https://web.dev/user-agent-client-hints/),
User-Agent Client Hints (UA-CH), that will let sites and services request only
the information they need.  We first
[announced](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)
this plan in January 2020 and shared a
[phased roadmap](https://blog.chromium.org/2021/05/update-on-user-agent-string-reduction.html)
in May 2021. This change aligns Chrome with other browsers in limiting
information in the UA string.

## Phased approach

Chrome began removing parts of the UA string to improve privacy in late April, 
beginning with the [minor
version](https://chromestatus.com/feature/6311349754789888). This is what we've
been calling the
[UA Reduction](/docs/privacy-sandbox/user-agent/).

As part of the latest phase, Chrome will begin reducing other information like
the OS version and device platform in the UA string for browsers on desktop
beginning in late October 2022. As is standard in our testing approach, we will
do a phased rollout to Chrome users over time. The next phase will occur in
February 2023 for Chrome browsers on mobile. The complete [timeline is available
on
Chromium.org](https://www.chromium.org/updates/ua-reduction/#proposed-rollout-plan).

## Feedback and testing

We're excited to see companies evaluating the impact of these changes and
sharing their insights on UA Reduction and the new UA-CH API. This type of
feedback allows others to collectively benefit from learnings while also
encouraging an open conversation about how to improve privacy on the web.

For example, Brazilian digital commerce platform [VTEX
has published their testing results](https://github.com/WICG/ua-client-hints/issues/314)
for UA Reduction and found no impact on their payments gateway. ClearSale, a
Brazilian anti-fraud provider, similarly published their results and
[concluded](https://github.com/WICG/ua-client-hints/issues/315) they could
preserve their use cases while improving user privacy. Chrome is still working
with stakeholders to evaluate additional use cases and conduct further testing.
Other types of websites and services that [might be
affected](https://wicg.github.io/ua-client-hints/#use-cases) include analytics
companies, anti-fraud providers, and payments processors.

If you operate a website or service that might be using the User-Agent string,
this is a great time to test. Chrome has extended the
[User-Agent Reduction origin trial](/blog/user-agent-reduction-origin-trial/)
to run until the end of the middle of October 2022 (M106) and local testing is
also available via feature flags using `chrome://flags/#reduce-user-agent`.

If you need additional time to migrate to the UA-CH API, you can opt-in to the
[User-Agent Reduction Deprecation origin trial](/origintrials/#/view_trial/2608710084154359809),
which will allow your site to receive the full legacy UA string until May 2023
(M113).

Lastly, if you think these changes will impact your third-party partners who
use UA string information to provide their services, Chrome has developed some
[new tools](/docs/privacy-sandbox/user-agent/#prepare-and-test)
for third-party vendors to test without impacting their customer sites.

## Engage and share feedback

-   **Origin trial**:
    [Share your feedback](https://github.com/miketaylr/user-agent-reduction/issues).
-   **Demo**: Try our [demo of User-Agent Reduction](https://uar-ot.glitch.me/).
-   **GitHub**: Read the [UA-CH
    proposal](https://github.com/WICG/ua-client-hints),
    [raise questions and follow discussion](https://github.com/WICG/ua-client-hints/issues).
-   **Developer support**: Ask questions and join discussions on the
    [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

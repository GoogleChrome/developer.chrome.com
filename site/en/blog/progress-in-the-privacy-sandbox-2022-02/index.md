---
title: Progress in the Privacy Sandbox (January/February 2022)
description: >
  Updates including Privacy Sandbox on Android, CHIPS origin trial, user-agent
  reduction, the new Topics proposal, and major updates for FLEDGE and
  Attribution Reporting.
layout: 'layouts/blog-post.njk'
date: 2022-03-04
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/Y7tKlJDkeqUGvTMUhwEX.jpg'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the start of year edition of "**[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)**", covering January and
February 2022, as we track the milestones on the path to phasing out third-party
cookies in Chrome and working towards a more private web. In each edition, we
share an overview of the updates to the [Privacy Sandbox
timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)
along with news from across the project&mdash;and the beginning of 2022 has
plenty of updates.


## Privacy Sandbox on Android

If you have been watching the Privacy Sandbox site, you may have noticed changes
to the structure as we [introduced the Privacy Sandbox on
Android](https://blog.google/products/android/introducing-privacy-sandbox-android/).

_"We’re announcing a multi-year initiative to build the Privacy Sandbox on
Android, with the goal of introducing new, more private advertising solutions.
Specifically, these solutions will limit sharing of user data with third parties
and operate without cross-app identifiers, including advertising ID. We're also
exploring technologies that reduce the potential for covert data collection,
including safer ways for apps to integrate with advertising SDKs."_

You can learn more and track progress in [the Android section of the Privacy
Sandbox site](https://privacysandbox.com/android/#how-works-on-apps-hero).


## Feedback

Getting feedback from a diverse set of stakeholders across the web ecosystem is
critical to the Privacy Sandbox initiative. We've added a **dedicated [feedback
section](/docs/privacy-sandbox/feedback/)** that provides an overview of the
existing public channels where you can follow or contribute to discussion along
with a feedback form to ensure you can always reach the Chrome team directly.


## Strengthen cross-site privacy boundaries

Third-party cookies are a key mechanism that enables cross-site tracking. Being
able to phase them out is a major milestone, but we also need to tackle other
forms of cross-site storage or communication.


### Cookies

As the cookie-related proposals progress, you should audit your own
`SameSite=None` or **cross-site cookies** and plan the action you will need to
take on your site.


#### CHIPS

If you set cookies that are sent in cross-site contexts, but in 1:1
relationships&mdash;like iframe embeds, or API calls&mdash;we have added a [new
overview for CHIPS](/docs/privacy-sandbox/chips/), or Cookies Having Independent
Partitioned State. CHIPS allows you to mark cookies as "`Partitioned`", which
puts them in a separate cookie jar per top-level site.

We've also sent the **[I2E (Intent to Experiment) for
CHIPS](https://groups.google.com/a/chromium.org/g/blink-dev/c/_dJFNJpf91U)**
with the plan to start the origin trial in Chrome 100 and run from March 31st,
2022 until June 30, 2022. The origin trial will be available for registration on
[the Chrome Origin Trials site](/origintrials/#/trials/active).


#### Additional cookie updates

We're also continuing to clean up issues in general cookie implementation in
Chrome and have sent an **[I2S (Intent to Ship) to allow cookie domain
attributes to be the empty
string](https://groups.google.com/a/chromium.org/g/blink-dev/c/IYWGbLV-1hU)**.
Unless you are already aware that you make use of an empty domain in cookie
attributes, there is unlikely to be any developer action needed. This brings
Chrome's behavior inline with other browsers.


### Federated Credentials Management

The [Federated Credentials Management API](https://github.com/fedidcg/FedCM)
builds on existing identity provider use cases to allow new and existing
federated identity use cases to continue without third-party cookies. We have
sent the **[I2E for an initial FedCM origin
trials](https://groups.google.com/a/chromium.org/g/blink-dev/c/jlV_1m7uUAg)**
starting with a limited trial from Chrome 101 on Android. This initial trial is
primarily aimed at identity providers who will eventually [integrate
FedCM](https://github.com/fedidcg/FedCM/blob/main/explainer/HOWTO.md) into their
own libraries.


### Network State Partitioning

[Network State
Partitioning](https://github.com/MattMenke2/Explainer---Partition-Network-State)
continues the pattern implemented in [HTTP Cache
Partitioning](https://developers.google.com/web/updates/2020/10/http-cache-partitioning)
by creating finer-grained containers for caches, which prevents cross-site
information leakage. We sent an **[I2S to partition network
state](https://groups.google.com/a/chromium.org/g/blink-dev/c/tJa6uzXu_IA)**
which affects websocket connections, DNS cache, and others&mdash;however after
discussion on the list we will be running additional performance experiments
before returning to this topic with a new intent.


## Preventing covert tracking

As we reduce the options for explicit cross-site tracking, we also need to
address the areas of the web platform that expose identifying information that
enables fingerprinting or covert tracking of users.


### User-Agent string reduction and User-Agent Client Hints

We are incrementally reducing the information passively available in [Chrome's
user-agent string and providing alternative User-Agent Client Hints
(UA-CH)](/docs/privacy-sandbox/user-agent/) for sites that need to actively
request that information. We have sent the **[I2S for phase 4 of the reduction
where we replace the minor
version](https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ)**
information with zeros starting in Chrome 101.

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/101.<span  style="background: #ef9a9a">0.4638.16</span> Mobile
Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/100.<span style="background: #a5d6a7">0.0.0</span> Mobile
Safari/537.36</span> {% endCompare %}

Also starting in Chrome 101 we're launching (via an
[I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2OW78CB1-A)) the
**[User-Agent reduction deprecation
trial](/blog/user-agent-reduction-deprecation-trial/)**. This allows sites that
have not had time to migrate to User-Agent Client Hints to continue receiving
the full user-agent string.

We are continuing to improve the User-Agent Client Hints functionality. There is
a new **[I2S for markup-based Client Hints delegation for third-party
content](https://groups.google.com/a/chromium.org/g/blink-dev/c/JQ68cvYuiQU)**.
This allows for sites to use a `<meta>` tag in their HTML instead of a
`Permissions-Policy` header to send extended Client Hints on cross-origin
requests. There is also a new **[I2E to expand the GREASE functionality for
UA-CH](https://groups.google.com/a/chromium.org/g/blink-dev/c/G-ouYoNY9Hs)**
which is intended to encourage correct parsing of special characters, avoiding
the fragile parsing associated with the user-agent string.


## Show relevant content and ads

As we move towards phasing out third-party cookies, we are introducing APIs that
enable key use cases that sites depended on to allow them to fund their content
**without** continuing to enable cross-site tracking.


### Topics

The [Topics API](/docs/privacy-sandbox/topics/) is a new proposal to enable
interest-based advertising without cross-site tracking. Topics was informed by
our learning and widespread community feedback from our earlier
[FLoC](/docs/privacy-sandbox/floc/) trials, and replaces our FLoC proposal. The
Topics API uses a curated taxonomy of topics to map a site to an associated
topic and provide a method to retrieve a browser's top topics.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
alt="Diagram showing the stages in the Topics API lifecycle, from a user
visiting websites to an ad being displayed.", width="800", height="275" %}

You can read more in the [introductory Topics blog
post](https://blog.google/products/chrome/get-know-new-topics-api-privacy-sandbox/)
along with the full detail in the **[Topics
explainer](https://github.com/jkarlin/topics)**. This is also linked from the
associated **[Topics
I2P](https://groups.google.com/a/chromium.org/g/blink-dev/c/59uTw_dxM3M)**,
announcing our intent to start coding on the feature.


### FLEDGE

[FLEDGE](/docs/privacy-sandbox/fledge/) enables remarketing and custom audience
use cases, as in advertising that can make use of sites or products previously
visited, without relying on an individual identifier.

FLEDGE is **[preparing for an initial origin
trial](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)**
with details available for discussion in the repository. Alongside this we have
also published a **[detailed developer guide](/blog/fledge-api/)**.


## Measure digital ads

As the companion to displaying ads without cross-site tracking, we need
privacy-preserving mechanisms to enable measuring the effectiveness of those
ads.


### Attribution Reporting API

The **[Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)** enables functionality to
measure events on one site, like clicking or viewing an ad, that lead to a
conversion on another site&mdash;without enabling cross-site tracking.

A number of new changes landed in the Attribution Reporting API proposal. We
have made a full list available in the **[Attribution Reporting API January 2022
update](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/)**.
This includes an [**overview of summary
reports**](/docs/privacy-sandbox/attribution-reporting/summary-reports/)
(previously referred to as aggregate reports). Summary reports provide an
aggregated view of detailed conversion data, while retaining critical
information for reporting, without the ability to identify individual users
within that data. **Event-level reporting** added [new
features](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/#new-features)
for third-party reporting, view-through measurement, filtering reports, and
debugging functionality.


## Article feedback

As we continue to publish these updates and progress through the Privacy Sandbox
as a whole, we want to make sure that you as a developer are getting the
information and support that you need. Let us know on [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) if there's anything that we could
improve in this series. We'll use your input to continue improving the format.
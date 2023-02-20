---
title: Progress in the Privacy Sandbox (March - April 2022)
description: >
  Updates including including a number of APIs available for origin trial: CHIPS
  for partitioned cookies and Attribution Reporting, FLEDGE, and Topics as part
  of the combined Privacy Sandbox Relevance and Measurement trial.
layout: 'layouts/blog-post.njk'
date: 2022-05-17
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/DrSOB8w3wN26K2O8nfy9.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the start of year edition of "**[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)**", covering March and April
2022, as we track the milestones on the path to phasing out third-party cookies
in Chrome and working towards a more private web. In each edition, we share an
overview of the updates to the [Privacy Sandbox
timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)
along with news from across the project.


## Privacy Sandbox Relevance and Measurement origin trial

Early developer feedback and the ability to evolve proposals based on that
feedback continues to be a top priority for us. We have opened a **combined
origin trial for Attribution Reporting, FLEDGE, and Topics** to allow for
initial feedback on these APIs in real world environments.

We're starting with a very small proportion of users on the Chrome Beta channel,
starting with Chrome 101. Our aim is to initially focus on [testing the
infrastructure setup, developer experience, and user
interface](https://blog.chromium.org/2022/03/what-to-expect-from-ps-testing.html)
so we can adjust and iterate before expanding the trial to a larger selection of
users.

If you are thinking about integrating any of these APIs, you can **[sign up for
the origin trial now](/origintrials/#/view_trial/771241436187197441)**. We have
**[full instructions on how to join, how to test, demos to explore, and where to
provide feedback](/blog/privacy-sandbox-unified-origin-trial/)** for the
different aspects of the trial.

As we're focusing on this early stage, you should **expect to see regular
changes in the code** as we improve the experience and fix issues. You can
follow this blog series, posts on the blink-dev mailing list, and the individual
developer mailing lists for the proposals as we validate this foundation and
expand the experiment for more scaled testing.


## Feedback

Feedback from a diverse set of stakeholders across the web ecosystem is critical
to the Privacy Sandbox initiative as a whole. The **dedicated [feedback
section](/docs/privacy-sandbox/feedback/)** provides an overview of the existing
public channels where you can follow or contribute to discussion along with a
feedback form to ensure you can always reach the Chrome team directly.

We are also starting to run a series of **[office hours
sessions](/blog/privacy-sandbox-office-hours-1/)** where you can ask questions
directly to the teams. We ran initial sessions on the general origin trial set
up and will announce future topics shortly. This is your chance to talk directly
to the people building the functionality and they want to hear the issues you're
encountering.


## Strengthen cross-site privacy boundaries

Third-party cookies are a key mechanism that enables cross-site tracking. Being
able to phase them out is a major milestone, but we also need to address other
forms of cross-site storage or communication.


### Cookies

As the cookie-related proposals progress, you should audit your own
`SameSite=None` or **cross-site cookies** and plan the action you will need to
take on your site. 


#### CHIPS

[CHIPS (Cookies Having Independent Partitioned
State)](/docs/privacy-sandbox/chips/) allows developers to opt a cookie into
"partitioned" storage, with a separate cookie jar per top-level site. The [CHIPS
origin trial is available now](/origintrials/#/view_trial/1239615797433729025)
and we have [developer instructions available](/blog/chips-origin-trial/) so you
can test cookies with the `Partitioned` attribute on your own production site.


#### Additional cookie updates

We are also continuing to clean up and improve the general specification and
functionality of cookies. The [RFC for cookies has been updated to provide an
explicit limit of 400
days](https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-the-expires-attribute-2)
on a cookie whether that's via the `Expires` or `Max-Age` attribute. We have
sent the
[I2P](https://groups.google.com/a/chromium.org/g/blink-dev/c/Pm7Or-u27js) and
[I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/tZ52DF6uoBU) with
an aim to implement in Chrome 104. Existing cookies will be unaffected, but
setting a new cookie with an expiry beyond the limit will cap its expiry at 400
days in the future. If you do want cookies that persist for longer than this,
you should regularly re-set the cookie with an updated expiry.


### Federated Credentials Management

The [Federated Credentials Management API](https://github.com/fedidcg/FedCM)
builds on existing identity provider use cases to allow new and existing
federated identity use cases to continue without third-party cookies. The first
[origin trial for FedCM](/origintrials/#/view_trial/3977804370874990593) is now
available for sign-up and we have [developer documentation for the
trial](/blog/fedcm-origin-trial/) along with a [new section providing an
overview and demos for the API](/docs/privacy-sandbox/fedcm/). 


### Network State Partitioning

[Network State
Partitioning](https://github.com/MattMenke2/Explainer---Partition-Network-State)
continues the pattern implemented in [HTTP Cache
Partitioning](https://developers.google.com/web/updates/2020/10/http-cache-partitioning)
by creating finer-grained containers for caches, which prevents cross-site
information leakage. We have sent an I2E to better understand the performance
impact of where that partition is defined: double-keying (top frame site) versus
triple-keying (top frame site and frame site).

No developer action is required here and any potential impact from the
experiment should be minimal as this will only run on 1% of Chrome Stable
traffic.


## Preventing covert tracking

As we reduce the options for explicit cross-site tracking, we also need to
address the areas of the web platform that expose identifying information that
enables fingerprinting or covert tracking of users.


### User-Agent string reduction and User-Agent Client Hints

We are incrementally reducing the information passively available in [Chrome's
user-agent string and providing alternative User-Agent Client Hints
(UA-CH)](/docs/privacy-sandbox/user-agent/) for sites that need to actively
request that information. In Chrome 101 we are starting the first phase of the
reduction, by replacing the build or minor version with zeroes.

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/101.<span  style="background: #ef9a9a">0.4638.16</span> Mobile
Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/100.<span style="background: #a5d6a7">0.0.0</span> Mobile
Safari/537.36</span> {% endCompare %}


**Note:** We are incrementally rolling out this change as we monitor for issues,
so you will not immediately see the reduced string on all 101 instances, but you
should expect it to appear in a growing proportion of traffic over time.

We also sent an [I2E to extend the origin
trial](https://groups.google.com/a/chromium.org/g/blink-dev/c/6x6WH2Odzfo) for
an early opt-in for the full user-agent string reduction if you would like to
test the proposal final format against your production traffic. You can [sign up
on the origin trial site now](/origintrials/#/view_trial/-7123568710593282047).
We also continue to offer the [deprecation trial to retain the full user-agent
string](/origintrials/#/view_trial/2608710084154359809) if you need more time to
prepare for migration.

User-Agent Client Hints is also receiving an update with an [I2S to update the
GREASE
behavior](https://groups.google.com/a/chromium.org/g/blink-dev/c/zdFNms0Nxqg).
This means where Chrome currently sends a brand, "` Not A;Brand`" which includes
special characters to ensure clients correctly parse the format, you can expect
that value to change between Chrome releases to continue encouraging robust
parsing.


### Fenced Frames

A fenced frame (`<fencedframe>`) is a proposed HTML element for embedded
content, similar to an iframe. Unlike iframes, a fenced frame restricts
communication with its embedding context to allow the frame access to cross-site
data without sharing it with the embedding context. For example, in FLEDGE the
intent is for ads to be displayed within a fenced frame.

You can read the [new developer overview
content](/docs/privacy-sandbox/fenced-frame/) and we have sent an [I2E to make
fenced frames
available](https://groups.google.com/a/chromium.org/g/blink-dev/c/y6G3cvKXjlg)
as part of the wider Privacy Sandbox Relevance and Measurement origin trial
starting during the Chrome 102 Beta.


## Show relevant content and ads

As we move towards phasing out third-party cookies, we are introducing APIs that
enable key use cases that sites depended on to allow them to fund their content
without continuing to enable cross-site tracking.


### Topics

The [Topics API](/docs/privacy-sandbox/topics/) is a proposal to enable
interest-based advertising without cross-site tracking. We sent an [I2E to
include
Topics](https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs) as
part of the Privacy Sandbox Relevance and Measurement origin trial. We also have
new [developer guidance for the testing and providing feedback on
Topics](/docs/privacy-sandbox/topics-experiment/) during the origin trial.

As this is early stage testing, we are actively discovering and addressing
issues in the code as they come up. On Topics, we discovered a crashing bug so
temporarily disabled the API within the origin trial to allow the fix to roll
out without overly impacting the user experience.


### FLEDGE

[FLEDGE](/docs/privacy-sandbox/fledge/) enables remarketing and custom audience
use cases, as in advertising that can make use of sites or products previously
visited, without relying on an individual identifier. We sent an [I2E for
FLEDGE](https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg),
again to enable it as part of the wider Privacy Sandbox Relevance and
Measurement origin trial. And likewise, there's [matching developer
documentation for the experiment
available](/docs/privacy-sandbox/fledge-experiment/).


## Measure digital ads

As the companion to displaying ads without cross-site tracking, we need
privacy-preserving mechanisms to enable measuring the effectiveness of those
ads.


### Attribution Reporting API

The **[Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)** enables functionality to
measure events on one site, like clicking or viewing an ad, that lead to a
conversion on another site—without enabling cross-site tracking. As you may have
guessed, there was also an [I2E for Attribution
Reporting](https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y)
to continue expanding its testing as part of the Privacy Sandbox Relevance and
Measurement origin trial.

During the initial stage of the origin trial we are focused on feedback around
the developer experience and integration, such as
[debugging](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/#debugging),
and this will expand to cover end-to-end testing across event-level and summary
reports.


## Article feedback

As we continue to publish these updates and progress through the Privacy Sandbox
as a whole, we want to make sure that you as a developer are getting the
information and support that you need. Let us know on [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) if there's anything that we could
improve in this series. We'll use your input to continue improving the format.

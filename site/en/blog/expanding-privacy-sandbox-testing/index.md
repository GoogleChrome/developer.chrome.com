---
title: Expanding Privacy Sandbox testing
description: >
  As the Privacy Sandbox timeline changes, learn about the expanding and
  extending the Privacy Sandbox Relevance and Measurement origin trial and how
  you can test and give feedback to shape the future of the APIs.
layout: 'layouts/blog-post.njk'
date: 2022-07-27
updated: 2023-01-05
authors:
  - rowan_m
  - barbsmith
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/7Hid7vSdQtp0RNThvO5J.png'
alt: >
  Privacy Sandbox logo
tags:
  - privacy
---

{% Aside %}
**See updated guidance for the [Relevance and measurement unified origin
trial](/docs/privacy-sandbox/unified-origin-trial/).**
{% endAside %}

Today we shared an [updated plan and timeline for Privacy Sandbox for the
web](https://blog.google/products/chrome/update-testing-privacy-sandbox-web/)
and the path towards phasing out third-party cookies. **Your feedback as web
developers and site owners** has been instrumental in demonstrating the
importance of spending more time to get the proposals right and ensuring there's
enough opportunity to test, integrate, and optimize the new solutions. This post
includes more detail on testing plans, including our intent to increase the
traffic volume in the unified Privacy Sandbox Relevance and Measurement origin
trial in August, and extend the duration of the trial.

{% Aside %}

Since the start of the Privacy Sandbox initiative we've seen engagement from
hundreds of developers, companies, and others across the W3C, industry events,
our Chrome-hosted office hours, proposal repos, and more. In the past six
months, we've also started **sharing quarterly summary reports** currently
totalling at 145 aggregated feedback topics across 14 areas. Your feedback
directly informs the design and development of the proposals and there are
[multiple routes open for you to provide it](/docs/privacy-sandbox/feedback/).
Keep it coming!

*   [Feedback report: 2022 Q1](/docs/privacy-sandbox/feedback/report-2022-q1/)
*   [Feedback report: 2022 Q2](/docs/privacy-sandbox/feedback/report-2022-q2/)

{% endAside %}

The Privacy Sandbox project represents a broad and ambitious set of changes that
aim to **tackle cross-site tracking for the web as a whole.** It proposes open
standards everyone can implement rather than browser-specific features while
ensuring that sites can use third-party services in a safe and private way.
While **phasing out third-party cookies represents a major milestone** in
overall project progress, that goal of addressing all forms of cross-site
tracking is much wider! You should still expect the individual proposals and
features to launch throughout that journey. It is likely that your site will be
impacted in some way; you will want to ensure you understand how your sites and
services are affected, and know which proposals and features you should be
following.

Let's break down the current status and look at what you need to know to
continue to test, provide feedback, and prepare for features on the path to
launch.

## Expanding the Privacy Sandbox Relevance and Measurement origin trial

The [Privacy Sandbox Relevance and Measurement origin
trial](/blog/privacy-sandbox-unified-origin-trial/) enables the ecosystem to run
unified tests for technical stability and developer experience across
[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/),
[FLEDGE](/docs/privacy-sandbox/fledge/),
[Topics](/docs/privacy-sandbox/topics/), [fenced
frames](/docs/privacy-sandbox/fenced-frame/), and we will be adding [Shared
Storage](/docs/privacy-sandbox/shared-storage/) soon. The trial is currently
[enabled for 50% of Chrome Beta
users](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/NTItmgLMAQAJ)
which has helped us to actively address early developer feedback and issues
without disrupting users too much.

As the origin trial progresses, we want to give developers the opportunity to
test the utility and effectiveness of the APIs with a meaningful proportion of
real-world traffic. With the [Chrome 104 Stable launch at the start of
August](https://chromiumdash.appspot.com/schedule), we will be **expanding the
trial to desktop users on Chrome Stable**. We plan to extend the trial to mobile
users starting from [Chrome 105
Stable](https://chromiumdash.appspot.com/schedule) on Android. The origin trial
is scheduled to conclude at the end of the 104 Stable period—**[we are
requesting an
extension](https://groups.google.com/a/chromium.org/g/blink-dev/c/SD8Ot2gpz4g/m/Cc0TGPhoAAAJ)
through to [Chrome 107 (late
October)](https://chromiumdash.appspot.com/schedule) to enable further
testing.** This follows the standard practice of requesting origin trial
extensions in three-milestone increments.  We're committed to supporting testing
through to launching the APIs for general availability.

You can follow **the official [request to extend the Intent to Experiment
(I2E)](https://groups.google.com/a/chromium.org/g/blink-dev/c/SD8Ot2gpz4g/m/Cc0TGPhoAAAJ)**.
We will also update the [Privacy Sandbox documentation](/docs/privacy-sandbox/)
with implementation and testing guides.

{% Aside %}

*   [Getting started: Privacy Sandbox Relevance and Measurement origin
    trial](/blog/privacy-sandbox-unified-origin-trial/)
*   [Developer guide: Attribution
    Reporting](/docs/privacy-sandbox/attribution-reporting-experiment/)
*   [Developer guide: FLEDGE](/docs/privacy-sandbox/fledge-experiment/)
*   [Developer guide: Topics API](/docs/privacy-sandbox/topics-experiment/)

{% endAside %}

If you deliver any of the services these APIs provide, then your participation
and feedback in the origin trial is invaluable. As we move to larger scale
testing, this is your opportunity to validate the proposals that meet your
needs. There is no need for expertise in web standards or browser
development—just your existing experience in your own field.

Once we reach a point where core functionality is sound and complete **we plan
to start shipping the APIs for general availability, likely in early to mid
2023**. Over the course of the origin trial there is, by design, scope for the
APIs to evolve based on testing and feedback. Individual features may launch
while the overall origin trial is still ongoing. After launching we will
continue to refine the APIs as we proceed through initial adoption and long-term
testing.

## Updating cookie behavior

The Cookies Having Independent Partitioned State (CHIPS) and First-Party Sets
proposals provide a route to **support cookies in cross-site contexts that do
not involve tracking**.

### CHIPS

CHIPS allows developers to **opt a cookie into "partitioned" storage**, with a
separate cookie jar per top-level site. Based on developer feedback during the
current origin trial we made a number of fixes and improvements along with
**extending the trial period through to the end of [Chrome Stable
104](https://chromiumdash.appspot.com/schedule)** at the end of August.
Specifically, we have **[removed](https://github.com/privacycg/CHIPS/pull/46)
the more restrictive requirements** for a `__Host-` prefix and no `Domain`
attribute to enable easier migration for sites using cookies across subdomains,
such as `shop.example.com` and `blog.example.com`.

With this positive feedback on both the proposal and the trial, we are **hoping
to ship CHIPS after the conclusion of the trial**. As per the official process,
you can follow the [blink-dev mailing
list](https://groups.google.com/a/chromium.org/g/blink-dev/) for when we post
the [Intent to Ship
(I2S)](https://www.chromium.org/blink/launching-features/#step-6-prepare-to-ship)
message.

{% Aside %}

*   [Developer guide: Cookies Having Independent Partitioned State
    (CHIPS)](/docs/privacy-sandbox/chips/)
*   [Getting started: CHIPS origin trial](/blog/chips-origin-trial/)

{% endAside %}

That's an exciting milestone because for many use cases where you provide an
embedded, self-contained service to another site such as a widget or API, this
lets you get your updates done well in advance of the third-party cookie
phase-out!

### First-Party Sets

First-Party Sets provides a method to group affiliated sites intended to allow
organizations that have multiple sites, such as different country-level domains,
to still use their own cookies in these specific cross-site but first-party
contexts.

Based on the feedback we received during discussion and testing of the feature,
[we're proposing a number of
changes](https://github.com/WICG/first-party-sets/issues/92) that aim to both
address those issues and still satisfy the needs of the ecosystem. Specifically,
we are proposing that sets be defined in terms of use-case-specific "subsets".
We also propose that sites use the Storage Access API along with a potential
extension to request cross-site cookie access. This replaces the proposal for
the `SameParty` attribute.

{% Aside %}

*   [GitHub explainer: First-Party
    Sets](https://github.com/WICG/first-party-sets)
*   [Developer guide: First-Party Sets](/docs/privacy-sandbox/first-party-sets/)

{% endAside %}

We will update the developer guide as work progresses. If you've already been
experimenting with First-Party Sets or the use-case matches your needs, then
this is a good time to follow the discussions and get involved.

## Shipping user-agent reduction

We are currently reducing the information in Chrome's user-agent string. As of
Chrome 101 in April, 2022, the **minor or build version has been replaced with
zeroes**. The [upcoming
phases](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)
will also **replace the OS/platform version and device model with fixed
values**. This will start for desktop from [Chrome
107](https://chromiumdash.appspot.com/schedule) in October, 2022 and for mobile
from [Chrome 110](https://chromiumdash.appspot.com/schedule) in January, 2023.
This timeline remains the same and is not affected by the changes to the
phase-out schedule for third-party cookies with the fully reduced user-agent
being rolled out by early 2023.

{% Aside %}

*   [Developer guide: User-Agent reduction](/docs/privacy-sandbox/user-agent/)

{% endAside %}

The **changes to the string are intended to be backwards-compatible**, so if you
do not need those specific values then you will not be affected. However, if you
do parse the user-agent string to extract the browser minor/build version,
OS/platform version, or device model then you will need to [migrate to
User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/).

## Storage partitioning

Cookies are the most prominent feature used for cross-site tracking, but the
**Privacy Sandbox aims to tackle cross-site tracking as a whole**—and that
includes all forms of cross-site storage. In a similar way to how we already
[partitioned the HTTP cache in 2020](/blog/http-cache-partitioning/), we also
intend to **partition storage APIs** like IndexedDB and localStorage,
communication APIs like BroadcastChannel and SharedWorker, and features that
span both of those categories like ServiceWorker.

{% Aside %}

*   [GitHub explainer: Storage
    partitioning](https://github.com/privacycg/storage-partitioning#introduction)

{% endAside %}

We have sent the [Intent to Prototype (I2P) for this
work](https://groups.google.com/a/chromium.org/g/blink-dev/c/WXNzM0WiQ-s/m/l10NGhaoAQAJ)
which means we are progressing through designs and initial code for the various
APIs. Within the current [Chrome 105
Canary](https://chromiumdash.appspot.com/schedule) we are planning to have a
**flag available to enable local developer testing**. You should expect these
changes to progress through the standard Chrome development process as work
completes which we expect to be in early 2023, in advance of the overall
third-party cookie phase-out.

## Developer documentation and support

To help you navigate Privacy Sandbox as a whole we have
[privacysandbox.com](https://privacysandbox.com/) which provides the concepts,
goals, and timelines for the project across web and Android. Here on
[developer.chrome.com/privacy-sandbox/](/docs/privacy-sandbox/) you can find the
details for individual proposals, demos, testing and implementation guides,
along with links out to wider resources for involvement.

We are holding regular **developer Office Hours** sessions across a variety of
Privacy Sandbox topics. In each of these we bring in the engineering and product
teams, run through a demo, and then answer your questions on implementation and
testing. We publicize each session on the [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) and on the mailing lists for the
matching API. We're already providing a Japanese language session along with
repeats for different timezones, but will also continue to improve the programme
to post subtitled videos of the demos and making it easier for you to submit
topics and questions in advance.

{% Aside %}

We have two more **Attribution Reporting** sessions coming up:

*   English language - Thursday, August 11 @ 15:00-16:30 GMT
*   Japanese language - Friday, August 19 @ 10:00-11:30 JST (01:00-02:30 GMT)

More details on the [attribution-reporting-api-dev mailing
list](https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev/c/s3QYro6SjeE/m/R6jI9TseAgAJ)
announcement.

{% endAside %}

We also have our **[developer support repo on
GitHub](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)**. If
you've run into an issue or have a question and don't know where to raise it,
then post an issue there and we will help answer it or find the right place for
you to get involved.

## Providing and sharing feedback

While the Privacy Sandbox as a project was initiated by Google, the goal is that
we are making **proposals to change the web platform as a whole**, not just
feature changes in Chrome. That is an open and collaborative process across a
large number of groups that includes browser vendors, site owners, and most
importantly the people who use those sites and browsers—the users. While the
resulting specifications are written in very explicit and formal language (since
they need to define the process fully enough to implement) the process of making
sure that specification does the right thing needs input from everyone.

We hear from a lot of companies who want to know who else is testing and how
those results will be shared. **It's up to you, as testers, to decide to make
your testing plans and results public**—and we strongly encourage you to do so!
There are a number of public forums across the W3C, GitHub, mailing lists where
you can share directly with other stakeholders. This might be as simple as
stating that you're actively participating in an origin trial, whether or not
you had all the material you needed to implement, or detailed analysis of the
results of your tests. You can also publish to your own sites, blogs, or social
accounts—especially where you have a specific audience you want to talk to.

{% Aside %}

Feedback highlights:

*   **Yahoo! Japan**
    [whitepaper](https://github.com/WICG/attribution-reporting-api/issues/201)
    on results from early Attribution Reporting testing.
*   **Google Ad Manager** initial plans for [Topics
    ](https://support.google.com/admanager/answer/12270543)origin trial.

{% endAside %}

Our **[feedback page covers each of the different
routes](/docs/privacy-sandbox/feedback/)** and the active ones for each API. You
can also provide feedback directly to us via [our feedback
form](/docs/privacy-sandbox/feedback/#feedback-form).

In the end, by changing how cookies behave we're changing technology that has
been part of the web for 28 years. The web belongs to all of us, and working
through these changes to find that ideal mix that enables a more private
environment while still enabling the rich, open ecosystem we all love will
continue to require your input and direction. We're looking forward to the rest
of the journey together.

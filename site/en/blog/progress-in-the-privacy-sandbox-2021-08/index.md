---
title: Progress in the Privacy Sandbox (August 2021)
description: >
  First in the series of monthly summaries for changes across the Privacy
  Sandbox proposals. Share your feedback on this first edition so we can improve
  as we go.
layout: 'layouts/blog-post.njk'
date: 2021-08-30
updated: 2021-08-31
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/m7SPM6kSG6KHykySb5DV.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

In July 2021 we shared a detailed [timeline for our Privacy Sandbox
work](https://privacysandbox.com/timeline/). Privacy Sandbox is an effort to
move towards a web that's private by default by phasing out third-party cookies
and preventing covert tracking workarounds. The timeline will be updated monthly
and you can use it to track all phases and milestones. We'll also be sharing
accompanying articles and videos with more details.

{% Aside %}
There's a **request for you** in this before we start—this whole effort only
succeeds if we go on this journey together. All this work happens in the open,
but needs input from the ecosystem so that we end up with proposals that can
work for the web platform as a whole—not just one browser.
{% endAside %}

However, there's a lot to track! [_"Progress in the Privacy
Sandbox"_](/tags/progress-in-the-privacy-sandbox/) aims to provide all the
signposts you need to get involved with the proposals at the right time for your
needs—consider this and the upcoming video as the pilot episode. **We need your
feedback** to ensure these posts are worth your time each month!

You can **share your feedback** with the team on [@ChromiumDev on
Twitter](https://twitter.com/ChromiumDev) or via an issue on
[GoogleChromeLabs/privacy-sandbox-dev-support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
on GitHub.

With that, let's take a look through the updates over the past month.

## Strengthen cross-site privacy boundaries

{% Aside %}
Third-party cookies are the key mechanism that enables cross-site tracking.
Being able to phase them out is a major milestone, but we also need to tackle
other forms of cross-site storage or communication.
{% endAside %}

### Cookies

At Google I/O, we shared a [flow chart covering the
proposals](https://youtu.be/1g2uQfP1Q3U) and actions that are suitable for the
different cookie use cases.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/2ZNV53Gav03QOat5RMom.png",
alt="Is my cookie used cross-site? No: Use the good first-party cookie recipe.
Yes: Partitioned 1:1 - check the CHIPS proposal, State sharing across domains of
the same party - use First-Party Sets, State sharing across sites (different
parties) - try the new APIs", width="800", height="400" %}

As part of our Mother Language Day series, Maud shared a [**video overview** in
French](https://youtu.be/2N8H6LIdSgs) that walks through improvements you can
make now to your first-party cookies.

We published the [**Intent to Prototype (I2P) for
CHIPS**](https://groups.google.com/a/chromium.org/g/blink-dev/c/hvMJ33kqHRo), or
Cookies Having Independent Partitioned State. This means we're ready to start
writing code for the feature. CHIPS enables use cases that require cross-site
cookies where their usage is contained, or partitioned, to just one top-level
context. For example, cross-site embeds or API calls where you may be using a
cookie for some form of session or saving state. Publishing the I2P means you
should expect to see the feature available behind a flag in a coming release. If
you think CHIPS would be useful for your cookies, you should track the [I2P
thread](https://groups.google.com/a/chromium.org/g/blink-dev/c/hvMJ33kqHRo) or
the [Chrome Status entry](https://chromestatus.com/feature/5179189105786880)
for availability. We will also have more articles and demos ready for you to see
the feature in action.

A new [**video overview** from Sam on **First-Party
Sets**](https://youtu.be/cNJ8mZ-J3F8) is out as a part of our "What is the
Privacy Sandbox?" series exploring individual proposals.

{% YouTube id='cNJ8mZ-J3F8' %}

There is another [**I2P out to bring Chrome's cookie size
limits**](https://groups.google.com/a/chromium.org/g/blink-dev/c/0N5BePVCPVo) in
line with [the HTTP
standard](https://github.com/httpwg/http-extensions/pull/1563) and closer to
Firefox's behaviour. This is a minor change as Chrome already rejects cookies
over the 4096 character limit. If your site is regularly setting cookies close
to this value you should ideally try to reduce that regardless, but also check
the details of the I2P for the exact changes. DevTools already shows rejected
cookies and will be updated inline with the new limits.

### Additional clean up work

There is an **Intent to Deprecate and Remove** (I2D / I2R) the already
[deprecated **Web SQL API in third-party
contexts**](https://groups.google.com/a/chromium.org/g/blink-dev/c/TM6YDx1Hh08)
and another [I2D for the **"persistent" quota
type**](https://groups.google.com/a/chromium.org/g/blink-dev/c/ziTjKMdOqz8) on
the already deprecated webkitRequestFileSystem API. The Chrome usage metrics are
low, but if your site is still using either `window.openDatabase()` in an iframe
or `window.webkitRequestFileSystem(window.PERSISTENT, […])` then check the links
for the potential impact.

## Preventing covert tracking

{% Aside %}
As we reduce the options for explicit cross-site tracking, we also need to
address the areas of the web platform that expose identifying information that
enables fingerprinting or covert tracking of users.
{% endAside %}


### User-Agent string reduction and User-Agent Client Hints

The full **User-Agent string** is a major source of highly identifying
information about the browser and device. In May we shared plans for how [Chrome
will be reducing the detail in its user-agent
string](https://blog.chromium.org/2021/05/update-on-user-agent-string-reduction.html).
As part of phase 1, **Issues are already appearing in DevTools** to help sites
audit where they are accessing `navigator.userAgent`.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/CfzWSmhalDALO2uz1omL.png",
alt="DevTools Issues panel showing an Improvement issue advising the developer
to audit usage of navigator.userAgent, navigator.appVersion, and
navigator.platform", width="800", height="322" %}

For phase 2, we've shared the **Intent to Experiment (I2E)**, which means we
want to run an origin trial allowing sites an [early opt-in for **receiving a
reduced user-agent
string**](https://groups.google.com/a/chromium.org/g/blink-dev/c/R0xKm1B7qoQ).
If you process the user-agent in some way on your site—via the HTTP header or in
JavaScript—consider participating for an early indication of any changes you may
need to make. The origin trial is planned to start **from Chrome 95** and we
will announce when it is available for registration.

If you require the extended information from the User-Agent, then [**User-Agent
Client Hints (UA-CH)**](https://web.dev/user-agent-client-hints/) provides that
functionality for both HTTP headers and JavaScript. Check out the [migration
guide](https://web.dev/migrate-to-ua-ch/) for integrating this into your site.

UA-CH is available by default in Chrome Stable and we are continuing to improve
functionality with ecosystem feedback. The Microsoft Edge team is contributing
an [**I2P** to improve the **platform
version**](https://groups.google.com/a/chromium.org/g/blink-dev/c/r0kcHYoK79U)
data provided for Windows.

## Show relevant content and ads

{% Aside %}
As we move towards phasing out third-party cookies, we need to introduce APIs
that enable the use cases that depended on them but **without** continuing to
enable cross-site tracking.
{% endAside %}

### FLoC

[FLoC](/docs/privacy-sandbox/floc/) is a proposal to
enable interest-based advertising **without** the need for individual cross-site
tracking. The **origin trial for the first version of FLoC ended in mid-July**
and we are evaluating improvements for the next version of FLoC before advancing
to further ecosystem testing. If you're still serving your origin trial token
for FLoC or other experimental code, then now is a good time to clean up.

### Shared Storage API

We published an [**I2P** for the **Shared Storage
API**](https://groups.google.com/a/chromium.org/g/blink-dev/c/_quChIvPzT8). This
is a relatively low-level storage component that's intended to support aggregate
reporting and content filtering of cross-site data. The idea is that an origin
can write to its storage across multiple embedded contexts and then only read
back through a very limited interface. For example, providing a single value for
a consistent A/B test or reach/frequency capping across multiple contexts but
**without** allowing direct access to that identifier.

It is an active area of discussion currently, so if you are interested in the
design phase then [raise issues in the
repo](https://github.com/pythagoraskitty/shared-storage/issues/), but further
testing and origin trials are still to come.

## Measure digital ads

{% Aside %}
As the companion to displaying ads without cross-site tracking, we need
privacy-preserving mechanisms to enable measuring the effectiveness of those
ads.
{% endAside %}

### Attribution Reporting

The core [**Attribution Reporting
API**](/docs/privacy-sandbox/attribution-reporting/)
has been in origin trial since the end of 2020, under the name Event-Level
Conversion Measurement API.

There were a number of API changes from Chrome 92—we've published a [guide for
migrating from Conversion Measurement API to Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting-migration/)—and
we're also [**extending the trial** period through to Chrome 93
stable](https://groups.google.com/a/chromium.org/g/blink-dev/c/xCWP1ltlAgw). We
have also extended the "Discussion" phase [on the
timeline](https://privacysandbox.com/timeline/) to reflect the ongoing work on
aspects such as aggregate and cross-device reporting.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",
alt="Event-level reports are generated as follows: the browser matches clicks or
views (attribution source events) with conversion data (attribution trigger
data) defined by an adtech. Later, the browser sends the resulting reports to a
predefined endpoint, with some delay and noise.", width="800", height="521" %}

We've published an [**introduction to Attribution
Reporting**](/docs/privacy-sandbox/attribution-reporting-introduction/)
and [**video overview**](https://youtu.be/UGA74CIcom8) to cover how the API
works, the main use cases, API implementation status, and how it compares with
third-party cookies.

## Fight spam and fraud on the web

{% Aside %}
The other challenge as we reduce the surfaces available for cross-site tracking
is that these same fingerprint techniques are often used for spam and fraud
protection. We need privacy-preserving alternatives here as well.
{% endAside %}

## Trust Tokens

**Trust Tokens** is a proposal that allows one site to share a claim about a
user—such as "I think they're human"—and enable other sites to verify that
claim, but in a way that doesn't allow linking the user across those sites.

As part of the "What is the Privacy Sandbox?" series, Sam has a short [**video
overview** of the Trust Tokens API](https://youtu.be/bXB1Iwq6Eq4).

{% YouTube id='bXB1Iwq6Eq4' %}

The [**origin trial** for **Trust
Tokens**](/origintrials/#/view_trial/2479231594867458049)
has been open since Chrome 84 and is planned to run through to Chrome 94, so
there is still time to experiment on your sites.

We also published an [**I2E** on **Android Platform-Provided Trust
Tokens**](https://groups.google.com/a/chromium.org/g/blink-dev/c/_Ayi6SD8yRs)
exploring the potential to issue tokens from a wider range of sources than just
other websites. This is intended as a very limited initial experiment to work
through the server-side implementation and aim for wider experimentation based
on the lessons learned here.

## Feedback

Look for the pilot video coming soon and another edition of this series next
month. The goal is to make this round-up useful and actionable for you, so
remember to [let us know](https://twitter.com/ChromiumDev) anything we can
improve!

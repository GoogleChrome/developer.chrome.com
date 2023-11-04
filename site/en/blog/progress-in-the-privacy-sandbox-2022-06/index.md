---
title: Progress in the Privacy Sandbox (May - June 2022)
description: >
  Updates including including an expanded Privacy Sandbox Relevance and
  Measurement trial for Attribution Reporting, FLEDGE, Topics, fenced frames,
  and Shared Storage. We've published the 2022 Q1 feedback summary report along
  with hosting more developer Office Hours.
layout: 'layouts/blog-post.njk'
date: 2022-07-08
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/qDtYpUkWP0DtqmpIVXli.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to this edition of "**[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)**", covering May and June 2022,
as we track the milestones on the path to phasing out third-party cookies in
Chrome and working towards a more private web. In each edition, we share an
overview of the updates and news across the [Privacy
Sandbox](https://privacysandbox.com/open-web/).


## Privacy Sandbox Relevance and Measurement origin trial

We're continuing to run the combined origin trial for **Attribution Reporting**,
**FLEDGE**, and **Topics**, along with expanding it to include **Fenced frames**
and **Shared Storage**. Fenced frames provide a restricted container for
displaying content which FLEDGE makes use of to display ads. Shared Storage
complements fenced frames by allowing access to a carefully gated form of
unpartitioned storage where the stored data may be used as part of the ad
selection process.

The origin trial has now been **[expanded to 50% of Chrome Beta
users](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs)**. At
this stage, the focus is still on testing the infrastructure setup, developer
experience, and user interface, before moving on to larger scale effectiveness
or utility testing. In this testing we discovered and fixed a [crashing bug in
Topics](https://bugs.chromium.org/p/chromium/issues/detail?id=1321140) where a
null value was not handled correctly. In these early stages of testing, it's
common to find issues as we start running real traffic through the feature. This
is one of the reasons we start with a small portion of overall traffic to still
discover issues while minimizing the impact of them. However, as this had the
potential to crash the browser for that small set of users, we disabled the
Topics API in the origin trial while the fix rolled out. This fix is now fully
complete, and Topics is enabled again within the origin trial.

Your feedback and testing at this stage is vital to ensure we're proposing and
building the functionality you need. If you participate in the origin trial now,
you can expect to see continued regular updates to the code as we respond to
feedback, issues, and expand the available functionality.

You can **[sign up for the origin trial
now](/origintrials/#/view_trial/771241436187197441)**. We have **[full
instructions on how to join, how to test, demos to explore, and where to provide
feedback](/blog/privacy-sandbox-unified-origin-trial/)** for the different
aspects of the trial.


## Feedback

Feedback from a diverse set of stakeholders across the web ecosystem is critical
to the Privacy Sandbox initiative as a whole. The **dedicated [feedback
section](/docs/privacy-sandbox/feedback/)** provides an overview of the existing
public channels, where you can follow or contribute to discussion, along with a
feedback form to ensure you can always reach the Chrome team directly.

We compiled a summary of your feedback and our responses in a **[2022 Q1
feedback overview report](/docs/privacy-sandbox/feedback/report-2022-q1/)**.
There's a lot there—so you’d be forgiven for not reading the whole thing!
Hopefully though you can get a feeling for the types of questions and issues
being raised along with how we then deal with those. We aim to make these
feedback routes easy and accessible for developers, so if you have a question or
something to clarify, then we want to hear it.

We're continuing to run our series of **[Privacy Sandbox Office Hours with an
overview session on Attribution
Reporting](https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev/c/NLbPwiwj3BE)**.
This is your chance to ask questions directly to the implementation team. We're
also planning to run a version of this session in Japanese, and another session
for an updated demo walk-through. There will be further editions covering other
APIs and aspects of the project which we will publicize across the mailing
lists, blogs, and [Twitter](https://twitter.com/ChromiumDev).


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
"partitioned" storage, with a separate cookie jar per top-level site. We are
[extending the current origin
trial](https://groups.google.com/a/chromium.org/g/blink-dev/c/kZRtetS8jsY)
through to the end of Chrome 104 around the end of August. You can sign up for
the **[CHIPS origin trial now](/origintrials/#/view_trial/1239615797433729025)**
and we have **[developer instructions available](/blog/chips-origin-trial/)** so
you can test cookies with the `Partitioned` attribute on your own production
site.


#### Additional cookie updates

We are also continuing to clean up and improve the general default functionality
of cookies alongside the changes that are under the Privacy Sandbox banner.
We've sent the **[I2P (Intent to Prototype) for Origin-bound cookies (by
default)](https://groups.google.com/a/chromium.org/g/blink-dev/c/xKTem_X2LU8)**,
which would result in more secure defaults for a cookie. While the earlier
`SameSite=Lax` by default change meant cookies were restricted to the same site
(or "first-party") by default, they can still be sent across different ports or
URL schemes. This update would mean cookies are only sent to the exact origin on
which they were set unless explicitly allowed by the `Domain` attribute.

We're also bringing Chrome more inline with the Fetch specification by
**[blocking the `Set-Cookie` header on outbound fetch
requests](https://groups.google.com/a/chromium.org/g/blink-dev/c/SyHAsPfO004)**.
Reporting shows that usage of this ability is extremely low, but you should be
aware that if you rely on this functionality, those cookies will soon stop being
set.


### Shared Storage

Shared Storage allows for sites to store unpartitioned data but only read that
data back in a secure environment with carefully constructed output gates.
Shared Storage pairs with fenced frames which provides the secure environment
allowing use cases such as A/B testing over a campaign.

The **[I2E for Shared
Storage](https://groups.google.com/a/chromium.org/g/blink-dev/c/jDx8z5a6ovk)**
makes it available for testing as part of the wider [Privacy Sandbox Relevance
and Measurement origin trial](/origintrials/#/view_trial/771241436187197441).
**[Developer documentation is
available](/docs/privacy-sandbox/shared-storage/)** covering use cases and
testing.


## Preventing covert tracking

As we reduce the options for explicit cross-site tracking, we need to address
the areas of the web platform that expose identifying information that enables
fingerprinting or covert tracking of users.


### User-Agent string reduction and User-Agent Client Hints

We continue to incrementally reduce the information passively available in
[Chrome's user-agent string and providing alternative User-Agent Client Hints
(UA-CH)](/docs/privacy-sandbox/user-agent/) for sites that need to actively
request that information. The initial phase of reducing the minor version number
to zeroes is now **[fully rolled out to Chrome 101 and
above](https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/m/xDC3QIjgBQAJ)**.

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/101.<span  style="background: #ef9a9a">0.4638.16</span> Mobile
Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/101.<span style="background: #a5d6a7">0.0.0</span> Mobile
Safari/537.36</span> {% endCompare %}

We are continuing to refine and update the general Client Hints behavior. This
includes [cleaning up the default for legacy
hints](https://groups.google.com/a/chromium.org/g/blink-dev/c/PUymAUxfjVg)
(`dpr`, `width`, `viewport-width`, and `device-memory`) so they are not sent to
third-party subresources by default.


### Accept-Language reduction

The `Accept-Language` header sends a user's language preferences to a site,
which is useful for delivering localized content but can represent a source of
passive fingerprinting information—especially when the user has multiple
accepted languages. We sent an **[I2P to reduce the fingerprinting surface in
the `Accept-Language`
header](https://groups.google.com/a/chromium.org/g/blink-dev/c/V4FS3zMbZ08)**.

The intent is that on the first request to a site the browser would only send
the top preferred language in the header, such as `Accept-Language: fr`. The
site response should then specify the `Content-Language` of the response and
indicate if there are multiple languages available by using the `Vary` and
`Variants` headers. For example:

```diff
Get / HTTP/1.1
Host: example.com
Accept-Language: fr

HTTP/1.1 200 OK
Content-Language: fr
Vary: Accept-Language
Variants: Accept-Language=(de en fr)
```

The browser can use the `Variants` information to re-request content in a
preferred language in the event the top choice is not available. I2Ps are
deliberately sent early in the process to allow discussion of the potential
impact of a change like this and ensure that we set up appropriate metrics to
monitor that impact.


### Fenced frames

A fenced frame (`<fencedframe>`) is a proposed HTML element for embedded
content, similar to an iframe. Unlike iframes, a fenced frame restricts
communication with its embedding context to allow the frame access to cross-site
data without sharing it with the embedding context. For example, in FLEDGE the
intent is for ads to be displayed within a fenced frame.

You can read the [new developer overview
content](/docs/privacy-sandbox/fenced-frame/). We published the **[I2E for
fenced
frames](https://groups.google.com/a/chromium.org/g/blink-dev/c/y6G3cvKXjlg)**
and you can now sign up as part of the wider [Privacy Sandbox Relevance and
Measurement origin trial](/origintrials/#/view_trial/771241436187197441).


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
issues in the code as they come up. On Topics, we discovered a [crashing
bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1321140), so we
temporarily disabled the API within the origin trial roll out the fix without
overly impacting the user experience. With that fix complete, Topics API is now
[enabled for 50% of Chrome Beta
users](https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs) as
part of the overall origin trial.


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

As a companion to display ads without cross-site tracking, we need
privacy-preserving tools to measure the effectiveness of those ads.


### Attribution Reporting API

The **[Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)** allows adtech and
advertisers to measure events on one site, like clicking or viewing an ad, that
lead to a conversion on another site—without enabling cross-site tracking. As
you may have guessed, there was also an [I2E for Attribution
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

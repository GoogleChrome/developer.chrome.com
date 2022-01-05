---
title: Progress in the Privacy Sandbox (October 2021)
description: >
  Monthly summary of Privacy Sandbox news including the renamed Federated
  Credentials Management API and W3C TPAC sessions.
layout: 'layouts/blog-post.njk'
date: 2021-10-29
updated: 2021-11-17
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/TG00mBIgiEzZo09xjvBg.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the October edition of "**[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)**," tracking the milestones on
the path to phasing out third-party cookies in Chrome and working towards a more
private web. Each month we'll share an overview of the updates to [the Privacy
Sandbox timeline](https://privacysandbox.com/timeline/) along with news from
across the project.

## Events

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/53vjMK6z3bt6ZFb8fwFa.jpeg",
alt="Chrome Dev Summit, agenda now live, attend virtually from November 3rd",
width="800", height="267" %}

From the 3rd of November we will be hosting the **[Chrome Developer
Summit](/devsummit/)**. You will be able to get an update on Privacy Sandbox in
[the keynote](/devsummit/schedule/keynote/) along with an opportunity to ask
questions to the leadership team in the [AMA](/devsummit/schedule/ama/), and
time for more detailed questions with the engineering teams in the [Office
Hours](/devsummit/schedule/office-hours/). [Sign up
today](https://events.withgoogle.com/chrome-dev-summit-2021/registrations/new/details/)
and we hope to see you there!

This month also included the **[W3C's Annual
Conference](https://www.w3.org/2021/10/TPAC/)** (commonly known as
**[TPAC](https://www.w3.org/2021/10/TPAC/#:~:text=What%20does%20TPAC%20stand%20for)**)
where all the various groups across the W3C meet to discuss a variety of topics
across the entirety of the web. You can view the **[minutes and videos for the
breakout sessions](https://www.w3.org/2021/10/TPAC/breakouts.html)** and
specific sessions including Privacy Sandbox topics are included below.

Continuing conference season, the **[IETF (Internet Engineering Task
Force)](https://www.ietf.org/)** is hosting their regular **[112 online
technical plenary](https://www.ietf.org/how/meetings/112/)**. Similarly to TPAC
there are a number of individual sessions where Privacy Sandbox topics are
discussed such as the **[PRIV (Privacy Respecting Incorporation of
Values)](https://datatracker.ietf.org/doc/agenda-112-priv/)**, **[PEARG (Privacy
Enhancements and Assessments Research
Group)](https://datatracker.ietf.org/doc/agenda-112-pearg/)** and the **[MASQUE
(Multiplexed Application Substrate over QUIC
Encryption)](https://datatracker.ietf.org/doc/agenda-112-masque/)** working
groups. These are deep technical discussions on protocol designs—if you have the
appropriate expertise and an interest in contributing to these discussions,
please consider joining.

## Strengthen cross-site privacy boundaries

Third-party cookies are a key mechanism that enables cross-site tracking. Being
able to phase them out is a major milestone, but we also need to tackle other
forms of cross-site storage or communication.

### Federated Credentials Management API

The **[Federated Credentials Management (FedCM)
proposal](https://github.com/WICG/FedCM)** is the new, more meaningful name for
WebID.  Federated identity is a critical service for the web, but given that
it's explicitly about sharing aspects of identity with other sites, there are
implementation details which overlap with cross-site tracking.

The Federated Credentials Management proposal explores a range of options from
simple migration paths for existing solutions to more private methods of
connecting to services with the bare minimum of information shared.

This proposal is still at an early stage and discussion can be followed in the
[W3C's Federated Identity Community
Group](https://www.w3.org/community/fed-id/). The group also hosted a
[breakout](https://www.w3.org/2021/10/21-fcm-minutes.html)
[session](https://watch.videodelivery.net/29bab61e04e8cabf1517e5885c9fe4cf) at
TPAC which explored an overview of the proposal. There is also a [very early
prototype version of the
API](https://github.com/WICG/FedCM/blob/main/explainer/HOWTO.md) available
behind a flag from Chrome 89, but this is purely for experimentation and will
change as discussion progresses.

{% Aside %}

The Federated Credentials Management API overlaps with and builds on some of the
functionality already present in the [Credential Management
API](https://developer.mozilla.org/docs/Web/API/Credential_Management_API).

{% endAside %}

### Cookies

As the cookie-related proposals progress, you should be auditing your own
`SameSite=None` or **cross-site cookies** and planning the action you will need
to take on your site.

#### CHIPS

If you set cookies that are sent in cross-site contexts, but in 1:1
relationships—like iframe embeds, or API calls—you should follow the **[CHIPS
proposal](https://github.com/WICG/CHIPS)**, or Cookies Having Independent
Partitioned State. This allows you to mark cookies as "Partitioned" putting them
in a separate cookie jar per top-level site.

Work is progressing on CHIPS and while the feature is available behind
`chrome://flags/#partitioned-cookies` and the `--partitioned-cookies` CLI flag,
it is not yet in a fully testable state. We will provide updated testing and
debugging details once the implementation is more complete.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/D271bfhBSxVcW29p424S.png",
alt="The top-level site, green.com has an iframe to red.com. red.com sets a
cookie with the 'Partitioned' attribute. When the browser is on blue.com with an
iframe to red.com, no cookie is sent! CHIPS creates a partition per top-level
site.", width="800", height="240" %}

#### First-Party Sets

If you set cookies for cross-site contexts, but only across sites you own—for
example, you host a service on your .com that's used by your .co.uk—then you
should follow **[First-Party Sets](/docs/privacy-sandbox/first-party-sets/)**.
This proposal defines a way of declaring which sites you want to form a set and
then marking cookies as "SameParty" so that they are only sent for contexts
inside of that set.

First-Party Sets are [available for local developer
testing](https://www.chromium.org/updates/first-party-sets) behind the
`chrome://flags/#use-first-party-set` and
`chrome://flags/#sameparty-cookies-considered-first-party` flags, allowing you
to specify your own set of related sites, and experiment with cookie behavior
across them.

### Storage Partitioning

The web platform includes other forms of storage that may enable cross-site
tracking. The TPAC breakout session on **[the state of browser storage
partitioning](https://docs.google.com/document/d/13oqM9AUnItnDw02zsvpT3DdYYOpIpl0_eTcnbS8rjUY/preview)**
provides an overview of Chrome's progress along with discussion from other
browser vendors.

There's no immediate need for developer action, but if you make use of
SharedWorker, Web Storage, IndexedDB, CacheStorage, FileSystem API(s),
BroadcastChannel, Web Locks API, Storage Buckets, or other form of storage or
communication API where you rely on accessing that data across multiple sites
then you should track this topic for future updates.

## Preventing covert tracking

As we reduce the options for explicit cross-site tracking, we also need to
address the areas of the web platform that expose identifying information that
enables fingerprinting or covert tracking of users.

### User-Agent string reduction and User-Agent Client Hints

We've expanded the origin trial for testing **Chrome's reduced User-Agent**
format [to include third-party
embeds](/blog/user-agent-reduction-origin-trial/#how-to-participate-in-the-origin-trial-as-a-third-party-embed).
If you primarily provide cross-site content for other services, you can enable
the third-party option when registering for the origin trial to receive the
reduced format on requests to your resources.

You can track the full [timeline for reducing Chrome's
user-agent](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html),
with [further examples and details of rollout
phases](https://www.chromium.org/updates/ua-reduction). You will also need to
[Migrate to User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/) (UA-CH)
if you rely on the platform version, device, or full build version information
in the current `User-Agent` format.

We're continuing to [standardize existing names for Client
Hints](https://groups.google.com/a/chromium.org/g/blink-dev/c/Y42bZ66L6Zo) by
adding the `Sec-CH-` header prefix where missing. Pending approval, we hope to
[expand the range of GREASE
characters](https://groups.google.com/a/chromium.org/g/blink-dev/c/ueudFsZzT1M)
for UA-CH.

## Show relevant content and ads

As we move towards phasing out third-party cookies, we need to introduce APIs
that allow the use cases that depended on them but **without** allowing
cross-site tracking.

### FLoC

**[FLoC](/docs/privacy-sandbox/floc/)** is a proposal to enable interest-based
advertising without the need for individual cross-site tracking. We've been
evaluating the feedback from the earlier origin trial of FLoC before we advance
to further ecosystem testing. While we continue to work on next steps and
decisions for FLoC, you should see some exploratory code around the concept of
topics ([previously
referenced](https://datatracker.ietf.org/meeting/111/agenda/?show=pearg)) to
show up in the Chromium code base soon. As all of Chrome's development happens
in the open, this work will be visible, but there isn't anything immediately
actionable for developer testing (nor is this applicable to users). We hope to
continue sharing these discussions and updates in the new **[PATCG (Private
Advertising Technology Community Group)](https://www.w3.org/community/patcg/)**.

## Measure digital ads

As the companion to displaying ads without cross-site tracking, we need
privacy-preserving mechanisms to measure the effectiveness of those ads.

### Attribution Reporting API

The **[Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)** gives you the ability to
measure events on one site, like clicking or viewing an ad, that lead to a
conversion on another site&mdash;without enabling cross-site tracking.

We would like to continue testing the Attribution Reporting API and we plan
on **[extending the origin
trial](/origintrials/#/view_trial/3411476717733150721)**
through to Chrome 97. Current origin trial tokens expired on October 12th, so
you will need to apply for updated tokens to continue testing.

## Fight spam and fraud on the web

The other challenge as we reduce the surfaces available for cross-site tracking
is that these same fingerprinting techniques are often used for spam and fraud
protection. We need privacy-preserving alternatives here as well.

### Trust Tokens

The **[Trust Token](/docs/privacy-sandbox/trust-tokens/)** API is a proposal
that allows one site to share a claim about a visitor—such as "I think they're
human"&mdash;and allow other sites to verify that claim, again without
identifying the individual.

Trust Tokens are one part of the overall strategy to tackle spam and fraud on
the web. In the **["Anti-fraud for the web" breakout at
TPAC](https://github.com/WICG/trust-token-api/blob/main/meetings/tpac2021-antifraud-breakout.md)**,
representatives from across the ecosystem discussed some of the current
challenges and approaches.

## Feedback

As we continue to publish these monthly updates and progress through the Privacy
Sandbox as a whole, we want to make sure that you as a developer are getting the
information and support that you need. Let us know on [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) if there's anything that we could
improve in this series. We'll use your input to continue improving the format.

We have also added a **[Privacy Sandbox FAQ](/docs/privacy-sandbox/faq/)** which
we will continue to expand based on the issues you submit to the [developer
support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
If you have any questions around testing or implementation on any of the
proposals, come talk to us there.

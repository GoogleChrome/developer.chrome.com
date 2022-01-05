---
title: Progress in the Privacy Sandbox (September 2021)
description: >
  Monthly summary of Privacy Sandbox news including Chrome's user-agent
  reduction and timeline updates.
layout: 'layouts/blog-post.njk'
date: 2021-09-30
updated: 2021-10-01
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/PIf4d4mkMtBCRtM13A42.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the September edition of "[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)" tracking the milestones on the
path to phasing out third-party cookies in Chrome and working towards a more
private web. Each month we'll share an overview of the updates to the [Privacy
Sandbox timeline](https://privacysandbox.com/timeline/) along with news from
across the project.

 * [**Prevent covert tracking**](#preventing-covert-tracking)
   * User-agent reduction timeline published, changes start from Chrome 101
     (stable in Q2 2022) and end with Chrome 113 (stable in Q2 2023)
   * User-agent reduction early opt-in origin trial registration opened
 * [**Strengthen cross-site privacy
   boundaries**](#strengthen-cross-site-privacy-boundaries)
   * Initial origin trial for First-Party Sets concluded
   * DevTools cookie functionality improved
 * [**Show relevant content and ads**](#show-relevant-content-and-ads)
   * Extending the overall Discussion period to Q4 2021 and starting the Testing
     period in Q1 2022
   * Highlighting the existing feature flag for FLEDGE developer testing
 * [**Measure digital ads**](#measure-digital-ads)
   * Attribution Reporting origin trial extended to Chrome 94
   * DevTools Attribution Reporting functionality improved
 * [**Fight spam and fraud on the web**](#fight-spam-and-fraud-on-the-web)
   * Trust Token API origin trial extended to Chrome 101

## Preventing covert tracking

As we reduce the options for explicit cross-site tracking, we also need to
address the areas of the web platform that expose identifying information that
enables fingerprinting or covert tracking of users.

### User-Agent string reduction and User-Agent Client Hints

We shared the full [timeline for reducing Chrome's
**user-agent**](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)
information and opened registration for the [**early opt-in origin
trial**](/blog/user-agent-reduction-origin-trial/)
for the new format.

The end result retains the same string format to minimise compatibility issues,
but will be using fixed values for device model, platform version, and the full
Chrome build.

{% Compare 'worse', 'old' %}
<span style="font-family: monospace">Mozilla/5.0 (Linux; Android <span
style="background: #ef9a9a">12; Pixel 5</span>) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/95.<span  style="background: #ef9a9a">0.4638.16</span> Mobile
Safari/537.36</span>
{% endCompare %}

{% Compare 'better', 'new' %}
<span style="font-family: monospace">Mozilla/5.0 (Linux; Android <span
style="background: #a5d6a7">10; K</span>) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/95.<span style="background: #a5d6a7">0.0.0</span> Mobile
Safari/537.36</span>
{% endCompare %}

You can see [further examples and the rollout phases
here](https://www.chromium.org/updates/ua-reduction).

{% Aside %}
If you rely on any of these values, you will need to [migrate to user-agent
client hints](https://web.dev/migrate-to-ua-ch/) to request that additional
information.
{% endAside %}

The changes are planned to start from Chrome 101 (stable in Q2 2022) and
complete in Chrome 113 (stable in Q2 2023). While the changes are a little way
in the future, User-Agent Client Hints are already fully available in Chrome
stable, so you should be actively assessing any impact and implementing any
changes now.

## Strengthen cross-site privacy boundaries

Third-party cookies are the key mechanism that enables cross-site tracking.
Being able to phase them out is a major milestone, but we also need to tackle
other forms of cross-site storage or communication.

### Cookies

As the cookie-related proposals progress, you should be auditing your own
`SameSite=None` or cross-site cookies and planning the action you will need to
take on your site.

#### CHIPS

If you set cookies that are sent in cross-site contexts, but in 1:1
relationships—like iframe embeds, or API calls—you should follow the [**CHIPS**
proposal](https://github.com/WICG/CHIPS), or Cookies Having Independent
Partitioned State. This allows you to mark cookies as "Partitioned" putting them
in a separate cookie jar per top-level site.

The [**Intent to Prototype (I2P)** for
CHIPS](https://groups.google.com/a/chromium.org/g/blink-dev/c/hvMJ33kqHRo) was
sent in July so we're currently writing the code and you should expect to see
the feature available behind a flag as the next step. You can track this on the
timeline and we'll have more docs and demos ready for you soon.

#### First-Party Sets

If you set cookies for cross-site contexts, but only across sites you own—like
you host a service on your .com that's used by your .co.uk—then you should
follow [**First-Party
Sets**](/docs/privacy-sandbox/first-party-sets/).
This proposal defines a way of declaring which sites you want to form a set and
then marking cookies as "SameParty" so that they are only sent for contexts
inside of that set.


The initial **origin trial** for First-Party Sets concluded this month and work
continues based on that feedback. You can still continue to test via the feature
flags and we'll update the docs as work progresses.

### DevTools

We're also continuing to improve **DevTools** functionality for much of this
early testing. You can now see origin trial status, upcoming deprecations, and
raw cookie header values. There's more detail from Jecelyn on [What's New In
DevTools (Chrome 94)](/blog/new-in-devtools-94/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png",
alt="DevTools screenshot showing the raw Set-Cookie header for a cookie with an
issue", width="800", height="450" %}

## Show relevant content and ads

As we move towards phasing out third-party cookies, we need to introduce APIs
that enable the use cases that depended on them but **without** continuing to
enable cross-site tracking.

Given the active ecosystem feedback, the **Discussion** phase for the [**Show
relevant content and
ads**](https://privacysandbox.com/timeline#:~:text=SHOW%20RELEVANT%20CONTENT%20AND%20ADS)
use case is going to extend through Q4 2021 as we work on changes to the
proposals. The current expectation is that both FLoC and FLEDGE will be
available for wider testing by sometime in Q1 2022.

### FLoC

[**FLoC**](/docs/privacy-sandbox/floc/) is a
proposal to enable interest-based advertising without the need for individual
cross-site tracking. The origin trial for the first version of FLoC ended in
mid-July and we are evaluating improvements for the next version of FLoC before
advancing to further ecosystem testing. If you're still serving your origin
trial token for FLoC or other experimental code, then now is a good time to
clean up.

### FLEDGE

[**FLEDGE**](/docs/privacy-sandbox/fledge/) is an
initial experiment in enabling remarketing use cases, showing ads based on the
user's previous interactions with the advertiser's site, but without third-party
tracking.

Some key concepts here involve running the ad auction in a restricted on-device
worklet and loading the ad in a restricted fenced frame. This ensures only a
limited amount of data can be used at each stage. Sam has a new video overview
explaining the concepts in more detail.

{% YouTube id='HkvmYKqnytw' %}

FLEDGE is [available via CLI
flags](/docs/privacy-sandbox/fledge/#:~:text=---,enable-features,-%3DFledgeInterestGroups%2CFledgeInterestGroupAPI)
for early developer testing (as opposed to scaled user testing) and we're
updating the timeline to make these flags more visible. The feature is under
active development, so you should run against a Canary or Dev build of Chrome to
test the latest changes. Developer feedback at this early stage is helpful to
ensure we're heading in the right direction in preparation for origin trials,
but be aware this is very fresh code and will not be stable.

## Measure digital ads

As the companion to displaying ads without cross-site tracking, we need
privacy-preserving mechanisms to enable measuring the effectiveness of those
ads.

### Attribution Reporting API

The [**Attribution Reporting
API**](/docs/privacy-sandbox/attribution-reporting/)
enables functionality to measure events on one site, like clicking or viewing an
ad, that lead to a conversion on another site—again, all without being able to
track the individual on that cross-site journey.

Developer feedback has been very active here, with [Yahoo! Japan providing a
detailed report](https://github.com/WICG/conversion-measurement-api/issues/201)
on their origin trial findings. We have also shared our own figures on the
[effects of users clearing site
data](https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev/c/5Ppe0cL-l1Y/m/kPATnUbwCAAJ)
on pending reports. To enable further developer testing, an [extension to the
**Attribution Reporting API origin
trial**](https://groups.google.com/a/chromium.org/g/blink-dev/c/DmsUL3KHqMk/m/J2v3I_aEBAAJ)
has been approved to run through to Chrome 94.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png",
alt="DevTools screenshot showing Attribution Reporting API Issues", width="800",
height="450" %}

DevTools has added Issue support for the Attribution Reporting API. Common
issues that may block source or report registration and prevent you from
receiving reports will now appear along with tips on how to fix them. See
[What's New In DevTools (Chrome
93)](/blog/new-in-devtools-93/#attribution-reporting)
for more details.

## Fight spam and fraud on the web

The other challenge as we reduce the surfaces available for cross-site tracking
is that these same fingerprinting techniques are often used for spam and fraud
protection. We need privacy-preserving alternatives here as well.

### Trust Tokens

The [**Trust Token**
API](/docs/privacy-sandbox/trust-tokens/) is a
proposal that allows one site to share a claim about a visitor—such as "I think
they're human"—and enable other sites to verify that claim, again without
identifying the individual.

Issuing your own tokens does require spinning up a new service and we've heard
from the ecosystem feedback that more testing time is required here. As such,
we've applied to extend the [**Trust Token origin
trial**](https://groups.google.com/a/chromium.org/g/blink-dev/c/fpfbKgJF8Vc/m/lHcBFfxkBAAJ)
through to Chrome 101. [Registration for the origin
trial](/origintrials/#/register_trial/2479231594867458049)
is available on the origin trials site.

## Feedback

As we continue to publish these monthly updates and progress through the Privacy
Sandbox as a whole we want to make sure that you as a developer are getting the
information and support that you need. Let us know on [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) if there's anything that we could
improve in this series, we'll use your input to continue improving the format.

We have also added an [**Privacy Sandbox FAQ**
section](/docs/privacy-sandbox/faq/) which we will
continue to expand based on the issues you submit to the [developer support
repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support). If you
have any questions around testing or implementation on any of the proposals,
come talk to us there.

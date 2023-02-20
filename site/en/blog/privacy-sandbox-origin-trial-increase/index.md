---
title: Increasing the Privacy Sandbox Relevance and Measurement origin trial to 5%
description: >
  This week, no sooner than October 26, we'll begin increasing the Privacy
  Sandbox Relevance and Measurement origin trial population towards 5% of
  Chrome Stable users.
subhead: >
  This week, no sooner than October 26, we'll begin increasing the Privacy
  Sandbox Relevance and Measurement origin trial population towards 5% of
  Chrome Stable users.
layout: 'layouts/blog-post.njk'
date: 2022-10-24
updated: 2023-01-05
authors:
  - cilvento
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

This week, no sooner than October 26, we will begin increasing the Privacy
Sandbox Relevance and Measurement origin trial population towards 5% of Chrome
Stable users. We always take an incremental approach to increasing limits and
actively monitor for issues in Chrome origin trials–you can expect to see
traffic levels increase over a period of a few days. Pre-stable channels, Canary
and Beta will continue as is with a 50/50 split for origin trial eligibility.

We [brought the trial to Chrome Stable in
August](/blog/expanding-privacy-sandbox-testing/) to enable functional testing
in a real, production environment—and the results helped us improve API
stability, developer documentation, and support. We are increasing the scale of
this testing to 5% to continue functional testing through 2022 and prepare for
utility testing in 2023.

Through all of this, your feedback is critical. This feedback can come in the
form of discussion on the proposals, reporting implementation issues, and—most
importantly as we open up this wider scale—sharing the results of your testing
with the rest of the ecosystem.

{% Aside %}
**Feedback**

Since the start of the Privacy Sandbox initiative we've heard from hundreds of
developers, companies, and others across the W3C, industry events, Chrome-hosted
office hours, proposal repos, and more. In the past six months, we've shared
quarterly summary reports, currently totalling 145 aggregated feedback topics
across 14 areas.

Your feedback directly informs the design and development of the proposals and
there are [multiple routes open for you to provide
it](/docs/privacy-sandbox/feedback/). Keep it coming!

*   [Feedback report: 2022 Q1](/docs/privacy-sandbox/feedback/report-2022-q1/)
*   [Feedback report: 2022 Q2](/docs/privacy-sandbox/feedback/report-2022-q2/)
*   Feedback report: 2022 Q3 will be published this week.
{% endAside %}

## Control your participation in the origin trial

Learn how you can participate in the Privacy Sandbox Relevance and Measurement
origin trial on our [dedicated origin trial
documentation](/docs/privacy-sandbox/unified-origin-trial/).

The mechanics of the origin trial remain the same: you obtain origin trial
tokens for the contexts where you want to experiment with the APIs. With the
expanded testing population, you should ensure that you are actively monitoring
and controlling the level of traffic where you choose to enable the trial.

{% Aside %}
5% of Chrome Stable traffic won’t directly correspond to 5% of your own traffic.
The actual proportion of traffic your sites and services receive will depend on
the make-up of your visitors.
{% endAside %}

A good approach here is to:

1. Include the origin trial tokens by default in all contexts where you wish to
   experiment.
2. Use feature detection to check for active APIs.
3. If the APIs are active (and therefore, the browser is eligible for this
   experiment), choose whether or not to use them based on your own experiment
   criteria. For example, if you already have A/B testing infrastructure to
   experiment on a percentage of traffic, sampling, or some other attribute,
   then at this point you can decide which features you will actively use.

You can prevent participation in the origin trial entirely for any browser
instance by not including the token in the response. For instance, if you have
met your own quota for an experiment or need to address an issue during the
trial, then not including the token ensures no experimental functionality will
be available or active in the page. 

## Renew your token

Origin trial tokens expire six weeks from their issue date (or at the end of the
trial if that's sooner).

It’s critical that you [renew and deploy your new
tokens](/docs/web-platform/origin-trials/#renew) within that window for
uninterrupted use of the origin trial features. 

Renewing tokens only takes a few minutes, and you can deploy multiple tokens for
the same trial within the same page. You can deploy a renewed token before your
existing token expires, so there's no break in service for users.

{% Aside 'caution'%}
Renewing a token at the end of October only takes you through to early December.
If you have a code freeze over the end of the year, you will either want to
ensure that you can still deploy an updated token or plan to pause participation
in the origin trial over that period.
{% endAside %}

## Origin trial APIs and features

Increasing the testing population means finding the balance between getting
early features for you to test while maintaining a stable experience for Chrome
users. While we are increasing the overall population for the origin trial to 5%
of Chrome Stable users, the individual API features within the trial will each
progress through early channels for stability testing before we graduate them
into the Beta or Stable origin trial.

Some features may only graduate to later channels if they are being used—this
means early testing on Canary and Beta, either via the origin trial or with the
feature flag, is critical for us to progress those features to Stable. In your
testing, you should continue to actively use feature detection per API and
expect to see variation in that functionality over time and over different
Chrome versions.

As individual features progress, you’ll be notified on the developer mailing
lists for the relevant APIs ([Attribution
Reporting](https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev),
[FLEDGE](https://groups.google.com/a/chromium.org/g/fledge-api-announce),
[Topics](https://groups.google.com/a/chromium.org/g/topics-api-announce), and
[Shared
Storage](https://groups.google.com/a/chromium.org/g/shared-storage-api-announcements)).
We’ll continue to update the developer documentation with a summary of active
functionality.

Attribution Reporting, Topics, FLEDGE, and Fenced Frames are all currently
available in Chrome Stable and will be part of the increased traffic. We will
start increasing traffic for Attribution Reporting and Topics from this week, no
sooner than October 26. FLEDGE and Fenced Frames will increase from November
9th.

<table>
  <tr>
   <th>API</th>
   <th>Origin trial status</th>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
   </td>
   <td>Available in Stable, increasing to 5% after October 26th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a>
   </td>
   <td>Available in Stable, increasing to 5% after October 26th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">FLEDGE</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">Shared Storage</a>
   </td>
   <td>Only available in M105+ Canary, Dev, and Beta for now.
   </td>
  </tr>
</table>

This is an important milestone in our overall progress to launching these APIs
for general availability and phasing out third-party cookies. If you were
waiting for a more complete set of functionality for your own testing—then now
is the time to get involved! 

## Future Testing

As we conclude functional testing in 2022 to ensure all the APIs work as
expected, we expect developers to invest in utility testing. In the coming
months, we will publish more detailed utility testing guidance to help prepare
developers to get the best results possible for specific advertiser types and
their use cases.

As always, we want to hear your feedback and make the path to participation as
easy as possible. You can reach out to us via our [feedback
form](https://goo.gle/privacy-sandbox-feedback), [@ChromiumDev on
Twitter](https://twitter.com/ChromiumDev), our [developer support repo on
GitHub](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support), or any
of the other [channels we have open for
feedback](/docs/privacy-sandbox/feedback/).

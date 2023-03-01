---
layout: 'layouts/doc-post.njk'
title: 'FAQ: Impact of user-initiated data clearing on attribution reports'
subhead: >
  How does user-initiated data clearing impact attribution reports? How does that compare with cookie-based measurement?
description: >
  How does user-initiated data clearing impact attribution reports? How does that compare with cookie-based measurement?
date: 2021-10-19
updated: 2021-10-19
authors:
  - maudn
---

{% Aside %} If you're not familiar with the API, head over to [Introduction to Attribution
Reporting (Conversion Measurement)](/docs/privacy-sandbox/attribution-reporting/)
before reading this post. {% endAside %}

The [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) makes it
possible to measure when an ad click leads to a conversion on an advertiser site, such as a sale or
a sign-up. The API offers a privacy-preserving approach to measuring ad conversions. It doesn't rely
on third-party cookies or mechanisms that can be used to identify individual users across sites.
Instead, it works as follows: attribution reports that link an ad click with a conversion are
generated and stored on the user's device; later, the browser sends these reports to a predefined
endpoint.

Sites have experimented with the Attribution Reporting API in Chrome, via an [origin
trial](/docs/privacy-sandbox/attribution-reporting/#status).

One of the insights
provided by these early experiments is the impact of **user-initiated data clearing, such as browser history clearing,** on the data advertisers and ad tech companies get from the API. [Aggregate Chrome statistics](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/5Ppe0cL-l1Y)
were recently published. This post adresses answering common questions on the impact of
user-initiated data clearing on attribution reports.

{% Aside %} Numbers and statements in this blog post are correct at the time of its
publication. They're subject to change as the API evolves. {% endAside %}

## How does user-initiated data clearing impact attribution reports?

And how does that compare with cookie-based measurement?

### About the numbers

{% Aside 'caution' %}
The numbers presented below help understand some observed discrepancies between cookie-based
measurement and Attribution Reporting based measurement.

However, they likely won't be consistently observable for all organizations
that use the API.

These numbers are aggregated and measured for the set of sites that were running an origin
trial. They differ across sites and are likely to change as more organizations use the API in an
origin trial and use different parameters.
{% endAside %}

**Multiple factors influence these numbers:**

- Whether users clear history on sites they navigate to by clicking on an ad;
- Whether users convert on categories of sites where they tend to clear history—possibly shortly
  after converting. Ads on this type of content might experience higher rates of clearing and hence
  higher discrepancies with cookie-based measurement;
- Similarly, whether users clear history on sites they click ads to;
- Whether the attribution is configured to expire a long or short time after click
  (`attributionexpiry`);
- Whether a long time actually elapses between click and conversion.

Chrome teams will continue to monitor and publish statistics on the [mailing
list for developers](https://groups.google.com/u/0/a/chromium.org/g/attribution-reporting-api-dev).

### Data clearing occurring after a click and before a conversion

**With cookies**, some percentage of conversions aren't reported due to post-click pre-conversion
data clearing. Because cookies have been cleared, there's no cookie to attach to a request at
conversion time, thus that conversion can't be measured. The exact percentage of conversions that
aren't reported due to user-initiated data clearing isn't known. It varies across ad tech companies
(or advertisers).

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/O7UEJCUZ2vfOYpLvm5wL.png", alt="User-initiated data clearing before a conversion impacts cookie-based measurement.", width="800", height="180" %}
  <figcaption>User-initiated data clearing before a conversion impacts cookie-based measurement.</figcaption>
</figure>

{% Aside %}
Note that different data clearing methods have different impacts on measurement data deletion. For example,
clearing data from the last hour doesn't clear a cookie that was set much earlier.
{% endAside %}

**With the Attribution Reporting API**, some percentage of conversions aren't reported due to
post-click pre-conversion data clearing. Observations of early experiments (origin trial) using the
Attribution Reporting API have shown that **[about 16%](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/5Ppe0cL-l1Y)**
of sources (click events) are deleted before conversion. A percentage of these sources lead to
conversions, and the reports for these conversions won't be sent if the sources have been deleted.

#### Example

For a **10%** conversion rate, assuming a total of **1000** clicks and without taking other errors
into consideration:

- If users were never clearing any data: an ad tech company would observe **100** conversions.
- Considering data clearing:
  - With cookies: data clearing occurring after a click and before a conversion causes some
    percentage of conversions to not be attributed to certain click events, since there is no cookie
    to map the click and the conversion. With our example, an ad tech company would observe **less than 100** conversions.
  - With Attribution Reporting: data clearing occurring after a click and before a conversion caused
    **1.6%** of reports that signified a conversion to be cleared (16% of 10% = 1.6%) in the first
    origin trial. Without taking other errors into consideration, an ad tech company would receive **84**
    reports that signal a conversion, instead of **100**.

### Data clearing occurring after a conversion

**With cookies**, post-conversion data clearing has no effect, because conversions are reported
immediately to the ad tech company.

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/7H4tlmi9nsa1LRNRkGlV.png", alt="User-initiated data clearing after a conversion doesn't impact cookie-based measurement.", width="800", height="195" %}
  <figcaption>User-initiated data clearing after a conversion doesn't impact cookie-based measurement.</figcaption>
</figure>

**With the Attribution Reporting API**, post-conversion data clearing causes reports to be cleared
in order to honor user choice—such as a user clearing browser history, or deleting site data.
Because the API doesn't send the reports immediately but with a delay in order to protect user
privacy, this means that the browser storage is already empty when the scheduled time comes from the
browser to send the report to the predefined endpoint—typically an ad tech company.

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/IeZewxklxPft41cQFtFh.png", alt="User-initiated data clearing after a conversion impacts measurement based on the Attribution Reporting API.", width="800", height="280" %}
  <figcaption>User-initiated data clearing after a conversion impacts measurement based on the Attribution Reporting API.</figcaption>
</figure>

Observations of early experiments (origin trial) using the Attribution Reporting API have shown that
**about [6.5%](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/5Ppe0cL-l1Y)**
of reports have been deleted in this way.

## What exact user actions can impact attribution reports?

{% Aside  %} Specific methods a user could use to delete pending conversions are likely to change, as
additional controls for the Privacy Sandbox are developed. {% endAside %}

As of Chrome 94—the stable Chrome version at the time of this writing—any of the following actions
will clear stored click events and pending reports.

- `chrome://settings` > Privacy and Security > Clear browsing data

  - Check the **Browsing History checkbox**
  - and/or Check the **Clear Cookies and other site data checkbox**
  - Click **Clear data**

- `chrome://settings` > Privacy and Security > Cookies and other site data

  - Toggle **Clear cookies and site data when you close all windows**
  - Or add a behavior under **Always clear cookies when windows are closed**

- `chrome://history`:

  - Delete any individual entry

- Site-scoped controls:
  - [site-scoped history
    controls](https://blog.google/products/chrome/privacy-and-performance-working-together-chrome/#:~:text=delete%20the%20site%20from%20your%20browsing%20history)
  - Click the lock button in the URL bar, Navigate to **Site Settings**, Click **Clear Data**.

**This list isn't exhaustive**. These are common user actions that impact attribution data. Other
user actions, such as uninstalling Chrome or running a system cleaner, would also impact
measurement—whether it's based on the Attribution Reporting API or on cookies.

## Does user-initiated data clearing account for any observed loss?

Organizations that have experimented with the API via an origin trial may have observed a
**discrepancy between cookie-based measurement and Attribution Reporting based measurement**: less
conversions may have been reported for Attribution Reporting. User-initiated data clearing
may account for observed loss, but the discrepancy must be monitored in future origin trials in
order to answer this question with certainty.

Two elements are known to have played a role in the discrepancy between cookie-based measurement and
Attribution Reporting based measurement in the past origin trial:

- User-initiated data clearing.
- [Network errors](https://bugs.chromium.org/p/chromium/issues/detail?id=1054127#c7). These are
  considered bugs and should be fixed in Chrome 94.

## How do we balance privacy and utility in the Attribution Reporting API with respect to user-initiated data clearing?

During the testing phase of the API, the intent is to experiment with some of the parameters of the
API to observe the effect on reports sent balanced against identifiability of the user. One of these
parameters may be the reporting delay.  
[Ecosystem discussions are ongoing in the regular WICG
meetings](https://github.com/WICG/conversion-measurement-api/blob/main/meetings/2021-09-20-minutes.md#:~:text=browser%20clearing%20attribution%20data)
to explore these parameters.

{% Aside %}
On a more general note: Attribution Reporting offers a **privacy-preserving** approach to measurement.
In order to achieve this, it explicitly limits the amount of data exposed that might otherwise allow
cross-site tracking. **As such, in absolute terms, less data is made available in this API than in cookie-based solutions.**
{% endAside %}

## Will aggregate reports be impacted in the same way?

{% Aside %}
Learn more about the difference between **aggregate** reports and **event-level** reports [here](/docs/privacy-sandbox/attribution-reporting-introduction/#use-cases-and-features).
{% endAside %}

We don't know for sure how of user-initiated data clearing will impact aggregate reports.

The statistics shared in this post are for event-level reports. Even though the reporting delays may be shorter for aggregate reports—[a few
hours](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#:~:text=Reports%20will%20not%20be%20delayed%20to%20the%20same%20extent%20as%20they%20are%20for%20event%20level%20reports.%20It%20may%20be%20possible%20to%20send%20these%20with%20as%20little%20delay%20as%20~0-1%20hour),
whereas event-level reports may be sent days or weeks after click—the impact of user-initiated data
clearing may not be lower. For example, for certain categories of sites, people tend to clear the browsing data shortly after
converting. Such user-initiated actions would still result in reports being cleared, even though
they were scheduled to be sent soon.

## Attribution Reporting: all resources

See [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/).

{% Partial 'privacy-sandbox/ar-get-updates.njk' %}

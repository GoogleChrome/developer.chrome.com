---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting'
subhead: The Attribution Reporting API makes it possible to measure when an ad click or view leads to a conversion such as a purchase on an advertiser site. It's designed so it cannot be used by third parties to track user browsing behavior across sites.
description: The Attribution Reporting API makes it possible to measure when an ad click or view leads to a conversion such as a purchase on an advertiser site. It's designed so it cannot be used by third parties to track user browsing behavior across sites.
date: 2021-05-18
updated: 2022-03-31
authors:
  - maudn
  - samdutton
---

{% YouTube id='UGA74CIcom8' %}

{% Aside %}

This API is a proposal. It is being incubated, discussed and developed in the open.
This API is evolving over time, as ecosystem feedback is gathered. 

Participation is welcome and encouraged. Learn about the ways you can participate in  [Attribution Reporting: experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/).

{% endAside %}

## Who is this article for?

This article covers the basics of Attribution Reporting, and explains some underlying concepts, but doesn't go into
much technical detail.

* If you work in **advertising or adtech**, [Use cases](#use-cases-and-features) and [How does Attribution Reporting work?](#how-does-the-attribution-reporting-api-work) should
 be useful.

* If you're a **developer or software engineer**, head over to the [Attribution Reporting: experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/).

* [The Attribution Reporting demo](https://attribution-reporting-demo.glitch.me/) provides a walkthrough of a basic Attribution Reporting
deployment.

{% Aside %}
🧐 There is a [glossary](#glossary) at the end of this post.
{% endAside %}

## Changes

- **January 2022**: New functionality is added to the Attribution Reporting
  proposal. See [Updates in January
  2022](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/).

- **Early 2021**: Aggregate reports and view-through measurement are added to the proposal.
- **Early 2021**: The API is renamed to "Attribution Reporting API".

## What is the Attribution Reporting API?

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies).

Browsers are restricting access to third-party cookies because these can be used to track users
across sites and hinder user privacy.

The Attribution Reporting API enables those measurements in a privacy-preserving way, without
third-party cookies.

This API enables advertisers and adtech providers to measure conversions in the following cases:

- Ad **clicks** and **views**.
- Ads in a **third-party** iframe, such as ads on a publisher site that uses a third-party adtech
  provider.
- Ads in a **first-party** context, such as ads on a social network or a search engine results page,
  or a publisher serving their own ads.

## Who needs to know about the Attribution Reporting API?

- **Adtech platforms** such as [demand-side
  platforms](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) or [data management
  platforms](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) may use this API to
  support functionality that currently relies on third-party cookies.
- **Advertisers and publishers relying on custom code** for advertising or conversion measurement
  may use this API to replace existing techniques.
- **Advertisers and publishers relying on adtech platforms** for conversion measurement don't need
  to use the API directly, but may be interested in understanding it if they're working with adtech
  platforms that may integrate the API.

{% Aside %} The Attribution Reporting API may also serve use cases that are not related to advertising. {% endAside %}

## Status

**🕙 Last updated: March 31st, 2022**

### How can I try Attribution Reporting?

At the time of this writing, you can try Attribution Reporting:
- Soon, with end users, as part of an origin trial. [Learn more](/blog/privacy-sandbox-unified-origin-trial/).
- Locally in your browser (with a _flag_).

**If you're interested in experimenting with the API, head over to [Attribution Reporting: experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/).**

{% Aside 'key-term' %}

- In Chrome, a _flag_ is a toggle that tells
  your browser to enable certain experimental functionalities.
- An _origin trial_ is a way to test with end users a new
  or experimental web platform feature, and give feedback to the web standards community on the
  feature. Learn more in [Getting started with Chrome's origin trials](/blog/origin-trials/). Note that **multiple rounds of origin trials are run**. Each round is used to improve and adjust the API
based on ecosystem feedback. 
  {% endAside %}

### Status details

<table class="simple width-full fixed-table with-heading-tint">
<thead>
<tr>
    <th style="text-align: left;">Proposal</th>
    <th style="text-align: left;">Status</th>
</tr>
</thead>
<tbody>
    <tr>
    <td>Event-level reports for clicks and views<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md">Explainer</a></td>
    <td>Available in Chrome behind a flag.</td>
    </tr>
    <tr>
    <td>Aggregatable reports for clicks and views<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explainer</a></td>
    <td>Available in Chrome behind a flag.</td>
    </tr>
    <td>Conversion journey: app-to-web<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explainer</a></td>
    <td>Proposal, not implemented yet.</td>
    </tr>
    <tr>
    <tr>
    <td>Conversion journey: cross-device<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Explainer</a></td>
    <td>Proposal, not implemented yet.</td>
    </tr>
</tbody>
</table>

{% Aside %}
For an overview of the status of all Privacy Sandbox APIs, see the [Privacy Sandbox timeline](https://privacysandbox.com/timeline).
{% endAside %}

## Use cases and features

The Attribution Reporting API gives access to different types of insights via two types of reports that can be sent to an
advertiser or a third-party adtech provider. These two types of reports can be used simultaneously
and are complementary.

- **Event-level reports** associate a particular ad click or view (on the ad side) with data on the
  conversion side. To preserve user privacy by preventing the joining of user identity across sites,
  conversion-side data is very limited, and the data is noised (meaning that for a small
  percentage of cases, random data is sent instead of real reports). As an extra privacy protection, reports are not sent
  immediately.
- **Aggregate reports** are not tied to a specific event on the ad side. These reports provide
  richer, higher-fidelity conversion data than event-level reports. A combination of privacy
  techniques help reduce the risk of identity joining across sites.

Both report types can be used simultaneously. They're complementary.

### Event-level reports

**Event-level reports** associate an ad click or view with coarse conversion data.

<figure>
 {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",
 alt="event-level report", width="400", height="180" %}
 <figcaption>Example event-level report: Click ID 200400600 on <code>news.example</code> (attached to user ID Bob_Doe on <code>news.example</code>) has led to a purchase on <code>shop.example</code>.</figcaption>
</figure>

Event-level reports are suited for:

- **Optimization**. Event-level reports help answer questions like _"How can I improve my return on
  investment?"_. In particular, these reports can be used to optimize for ad placement, since a
  unique ID for the ad side can be made available in the reports. Event-level reports can provide
  training data for machine learning models.
- **Coarse reporting**, where very little information is needed about the conversion. The current
  limitation is 3 bits of conversion data for clicks⏤this means a conversion can be assigned one of
  eight categories⏤and 1 bit for views. Encoding of granular conversion-side data, such as a
  specific price or conversion time is not supported in event-level reports.
- **Fraud detection**. The data in some reports can be useful for ad fraud detection and
  analysis, by allowing you to understand patterns that can be used to identify spammy or invalid
  activity.

### Summary reports (formerly aggregate reports)

**Summary reports**, on the other hand, offer more detailed conversion data and more flexibility for
joining click/view data and conversion data.

Learn more about in [Attribution Reporting: summary reports](/docs/privacy-sandbox/attribution-reporting/summary-reports/).

<figure>
 {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="summary
 report", width="400", height="180"%}
 <figcaption>Example of insights from summary reports: CampaignID 1234567 on <code>news.example</code> has led to 518 conversions on <code>shoes.example</code>, and to a total spend of $38174. Half of the conversions were from users in NYC, USA.</figcaption>
</figure>

Aggregate summary reports are best suited for **reporting** use cases. These reports help answer questions such as
_"What is my return on investment?"_.
Usage of summary reports for **optimization**—for example, to optimize for a purchase value, which
is not supported by event-level reports because the conversion data is too coarse—is an area of
active research.

{% Details %}
{% DetailsSummary 'h3' %}
Why are two types of reports needed?
{% endDetailsSummary %}

Event-level reports only offer coarse conversion data in order to preserve user privacy.

But this coarse data may not be sufficient to measure campaign effectiveness. Marketers may need to
learn specific details about conversions, such as the purchase value, the aggregated advertiser-side
demographics for users who converted, the product categories that were purchased, whether
converted users are first-time or recurring customers, the carts' contents, etc.

Summary reports provide a privacy-preserving solution to this need.

{% endDetails %}

Other features proposed in this API include [app-to-web
attribution](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) (see or
click an ad in an app and convert on the web) and [cross-device
attribution](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) (see or
click an ad on mobile and convert on desktop).

{% Aside %}
In a future without third-party cookies, this API would be combined with other privacy-preserving
ads APIs in order to cover end-to-end use cases:

- Remarketing: see [FLEDGE](/docs/privacy-sandbox/fledge/)
- Interest-based ad selection: see [Topics](/docs/privacy-sandbox/topics/)

{% endAside %}

## Browser support

- Firefox and Edge [haven't shared signals](https://chromestatus.com/feature/6412002824028160).
- Safari/Webkit is [negative](https://chromestatus.com/feature/6412002824028160) and proposed a
  different API to measure ad conversions, called [Private Click
  Measurement](https://developer.apple.com/videos/play/wwdc2021/10033/).

{% Details %}
{% DetailsSummary 'h3' %}
Differences between the API proposed by Chrome and the API proposed by WebKit
{% endDetailsSummary %}

Though the two APIs are different, Chrome and WebKit are working together in the open to simplify
the developer experience, for example by aligning on the attribute names and on the [JSON structure
for reports](https://github.com/privacycg/private-click-measurement/issues/30).

The feature set of the Attribution Reporting API proposed by Chrome is different from that of the
Private Click Measurement API proposed by Safari/WebKit.
Most notably, with the Attribution Reporting API proposed by Chrome:

- View-through measurement is supported.
- Event-level reports can be provided.
- Summary reports contain rich information on both the click/view side and conversion side.
- Third parties such as adtech platforms can receive reports on behalf of publishers and
  advertisers.

{% endDetails %}

## What browser configuration is available? {: #browser-configuration }

- Users can opt out of the API via the user settings at `chrome://settings/privacySandbox`.
- The API is not active in **Incognito** mode. 
- The API is not active when **third-party cookies** are disabled. 

{% Aside %}

The API does not rely on third-party cookies. However, in the testing phase, third-party cookies need to be enabled for the API to be enabled. This should make it easier for developers experimenting with the API to compare the API's performance with cookie-based performance.

{% endAside %}


## How can sites control access? {: #sites-control }

Arbitrary third-parties can't use the API without a publisher's or advertiser's knowledge. The
  Attribution Reporting API needs to be enabled in child iframes via a [Permissions
  policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

## How does the Attribution Reporting API work?

The Attribution Reporting API enables the measurement of two events that are linked together: an
event on a publisher's website, such as a user viewing or clicking an ad, with a subsequent
conversion on an advertiser site.

### Event-level reports

<figure>
 {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",
 alt="event-level report", width="800", height="521" %}
 <figcaption style="text-align:left;">Event-level reports are generated as follows:<br>The browser matches clicks or views with conversion data defined by an adtech.<br>Later, the browser sends the resulting reports to a predefined endpoint, with some delay and noise.</figcaption>
</figure>

### Summary reports

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/un70ZcJVrWepdWWsnMIY.png", alt="ALT_TEXT_HERE", width="800", height="1024" %}
 <figcaption style="text-align:left;">Summary reports are generated as follows:<br>
When the user clicks or sees a specially configured ad, the browser—on the user's local device—records this event, alongside the attribution configuration data that was specified.<br>
Later on, when the user converts, the browser matches this detailed clicks or views event ("attribution source event") with detailed conversion data ("attribution trigger data") defined by an adtech company, following a specific logic that is defined by the adtech.<br>
The output of this process is an aggregatable report. Aggregatable reports are then encrypted by the browser and sent to the adtech server. From the adtech server, the aggregatable reports are sent to a service that aggregates them to produce a summary report.<br> Summary reports are then made available to the adtech.
Note that summary reports are not delayed to the same extent as event-level reports.</figcaption>
</figure>

{% Details %}
{% DetailsSummary 'h3' %}
How it works in detail: aggregate reports
{% endDetailsSummary %}

Ad links can be configured with attributes that are specific to ad conversions.

When the user clicks or sees a specially configured ad, the browser—on the user's local
device—records this event, alongside the attribution configuration data that was specified.

Adtech-defined code is then executed within a worklet to define contributions, namely joints of
ad-side and conversion-side data.

These contributions (raw reports) are sent encrypted to an adtech server, and then over to
aggregation services that will compute aggregate reports in a [private](#privacy) way.

Note that aggregate reports are not be delayed to the same extent as event-level reports.

{% endDetails %}

## Privacy

### Overview

Let's take a person named Bob. Bob sees an ad while reading the news on `news.com`. One week later,
Bob buys shoes on `shoes.example`.

Today, this conversion would be tracked by a third-party cookie used as a **cross-site identifier**.
With third-party cookies, an adtech company can access a lot of details on Bob's activity on
`news.example` and on `shoes.example`, and merge these pieces of information together to build a
detailed profile of Bob. An adtech company can end up knowing Bob's location, browsing habits and
preferred reads on `news.com`⏤as well as purchases, activity, and credit card information on
`shoes.com`. This cross-site joint is useful to measure ad conversions. But it hinders user privacy:
Bob's activity is tracked across sites with a high level of detail.

Unlike third-party cookies, the Attribution Reporting API enables advertising companies to gain insights into
conversions **without tracking an individual's activity across sites**. A small amount of
information is joined across sites⏤enough to measure conversions, but not enough to track Bob's
activity across sites in detail. Bob's activity on `news.example` and on `shoes.example` remains
separate.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagram: side-by-side
view of today's web (joined identity) and tomorrow's web (partitioned identity)", width="800",
height="314" %}

### In detail

**Event-level reports** link an ad-side identifier with only a small amount of conversion-side data.
While they do provide cross-site information about a conversion, but the conversion-side information is
too coarse to join user identity across sites.

**Summary reports** provide detailed insights, but only at an aggregated level; because the contents
of these aggregatable reports are encrypted when they are sent to the adtech, the adtech cannot get
any information from the reports without using an aggregation service. The aggregation service only
provides access to noisy aggregates.

Additional privacy protections such as rate limitations are imposed on both event-level and
aggregate reports.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/mDdo2XLyGLBCAlgH7MPZ.png", alt="ALT_TEXT_HERE", width="800", height="1237" %}
</figure>
{% Details %}
{% DetailsSummary 'h3' %}
In detail: event-level reports and privacy {% endDetailsSummary %}
Event-level reports provide conversion insights without tracking users across sites, by following
the following privacy mechanisms:
- No cross-site identifier is used and no detailed cross-site browsing activity leaves the device.
Event-level reports associate 64 bits of information on the ad side (`news.example`) with only 1
bit or 3 bits on the conversion side (`shop.example`). 64 bits **are enough information to be
mapped to an individual user identifier, but these 64 bits can only be linked with very little
cross-site information:** 1 bit or 3 bits, which are not enough to hold an identifier. Note: the
ad-side 64 bits are not new information. A user ID can already be available on the ad side today.
`news.example` or `adtech.example` already knows about a certain user's activity on
`news.example`.
- Additional protections are applied to prevent abuse and cross-site tracking:
- The reports are sent with a **delay**.
- The conversion data is **noised**: a certain percentage of the time, fake reports are generated.
- The number of attributed conversion reports is limited per click or view.
{% endDetails %}
{% Details %}
{% DetailsSummary 'h3' %}
In detail: summary reports and privacy {% endDetailsSummary %}
 
Summary reports associate a detailed click or view event with detailed conversion data. However,
they provide conversion insights without tracking users across sites, by following the following
privacy mechanisms:
 
- No cross-site identifier is used.
- Each attribution can make multiple contributions to a resulting summary report. Any given user can
 trigger multiple attributions for a particular click (or view) and conversion.
- Data is aggregated up to the level of many events (many users) and no individual events can be
 observed precisely. When drilling down into the aggregated data, as the level of detail increases,
 the relative noise on that data increases as well. Slices of data that aggregate a lot of events
 and users are more accurate to preserve usefulness.
- The raw reports that associate a detailed click or view event with detailed conversion data are
 encrypted and not readable by the adtech company. Aggregate data is then computed from these
 reports via a trusted server.
 
- Additional protections are applied to prevent abuse and cross-site tracking:
 
- Reports are sent with random delays.
- Queries on different slices of the data are rate-limited.
 
{% endDetails %}

## Glossary

- **Adtech platforms**: companies that provide software and tools to enable brands or agencies to
  target, deliver, and analyze their digital advertising.
- **Advertisers**: companies paying for advertising.
- **Publishers**: companies that display ads on their websites.
- **Click-through conversion**: conversion that is attributed to an ad click.
- **View-through conversion**: conversion that is attributed to an ad impression (if the user
  doesn't interact with the ad, then later converts).

{% Aside %}

You may also want to consult the complete [Privacy Sandbox
glossary](/docs/privacy-sandbox/glossary/).

{% endAside %}

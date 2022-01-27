---
layout: 'layouts/doc-post.njk'
title: 'Introduction to Attribution Reporting (Conversion Measurement)'
subhead: >
  Introduction and key concepts to understand the Attribution Reporting API.
date: 2021-08-09
updated: 2022-01-27
authors:
  - maudn
---

{% Aside 'caution' %} This API is a proposal and will expand over time. This blog post describes its
current state, and will be updated as the API evolves. {% endAside %}

{% Aside %}

This post focuses on **advertising** use cases, but the Attribution Reporting API can serve use
cases that are not related to advertising as well.

The advertising use cases for this API focus on linking ad clicks or views to conversions
(Conversion Measurement).  
 {% endAside %}

## Introduction

The Attribution Reporting API makes it possible to measure when an **ad click or view** leads to a
**conversion** on an advertiser site, such as a sale or a sign-up. The API doesn't rely on
third-party cookies or mechanisms that can be used to identify individual users across sites.

This proposal is being incubated in the open. The proposal and discussions live in the [WICG GitHub
repository](https://github.com/WICG/conversion-measurement-api).

{% Aside %}  
This API is a part of Privacy Sandbox, a series of proposals to satisfy third-party use cases
without third-party cookies or other cross-site tracking mechanisms. See [Privacy Sandbox
proposals](https://developers.chrome.com/docs/privacy-sandbox).  
{% endAside %}

## Why is this API needed?

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Browsers are
restricting access to third-party cookies because these cookies can be used to track users across
sites and hinder user privacy. The Attribution Reporting API enables those measurements in a
privacy-preserving way, without third-party cookies.

## Who needs to know about this API?

- Adtech platforms such as [demand-side
  platforms](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) or [data management
  platforms](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) may use this API to
  support functionality that currently relies on third-party cookies.
- Advertisers and publishers relying on custom code for advertising or conversion measurement may
  use this API to replace existing techniques.
- Advertisers and publishers relying on adtech platforms for conversion measurement don't need to
  use the API directly, but may be interested in understanding it if they're working with adtech
  platforms that may integrate the API.

## Participate

{% Aside %}  
**Your participation is needed!** This API may need to support a wide variety of conversion
measurement and optimization use cases. Ecosystem input is vital to ensure that solutions to support
these use cases are discussed in the open. {% endAside %}

To engage, join the discussion and try the API. Doing both is optimal, but you're welcome to join
the discussion whether or not you've tried the API.

### Join the discussion

- [Join the bi-weekly meetings](https://github.com/WICG/conversion-measurement-api/issues/80) (every
  second week). In these calls, participants discuss API design proposals and how the API could
  support various measurement use cases. You can [add
  topics](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit) to
  the next meeting's agenda at any time. Everyone is welcome to join these discussions⏤only make
  sure to [join the WICG](https://www.w3.org/community/wicg/).
- [Open an issue](https://github.com/WICG/conversion-measurement-api/issues/new) to ask questions,
  propose features, or discuss use cases. If you're unsure how to formulate your issue, see examples
  like [this issue](https://github.com/WICG/conversion-measurement-api/issues/147) and [this
  issue](https://github.com/WICG/conversion-measurement-api/issues/68). You can also join the
  conversation in [existing issues](https://github.com/WICG/conversion-measurement-api/issues).

### Try the API

{% Aside 'caution' %}

If you experiment with the API in Chrome, you'll have access to all the features that are
**currently implemented**. Not all features discussed in the
[repository](https://github.com/WICG/conversion-measurement-api/) and
[meetings](https://github.com/WICG/conversion-measurement-api/issues/80) are implemented in the
Chrome origin trial. The features available for
experimentation are a subset of what will ultimately be supported by the API. Features are subject
to change as the API is being incubated in the open and as ecosystem feedback is collected.

See the current feature status in [Status](#status).

{% endAside %}

Depending on the status of the API—see details in [Status](#status)—you may experiment with the API:

- Either locally in your browser, by using a _flag_.
- Or with end-users, by using an _origin trial_.

{% Aside 'key-term' %} In Chrome, a _flag_ (sometimes called an _experiment_) is a toggle that tells
your browser to enable certain experimental functionalities. {% endAside %}

{% Aside 'key-term' %} An _origin trial_ (sometimes called an _experiment_) is a way to test a new
or experimental web platform feature, and give feedback to the web standards community on the
feature. Learn more in [Getting started with Chrome's origin trials](/blog/origin-trials/). {%
endAside %}

Whether a flag or an origin trial is available for the API, and which features are available,
depends on the current status of the API. Head over to [Status](#status).

{% Aside %}  
If you have implementation questions, join the [Attribution Reporting mailing list for
developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) and ask.

If you have general technical questions about your use case, consider opening an issue on the
[Privacy Sandbox dev support
repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).  
{% endAside %}

## Use cases and features

{% Aside %}

This API is a work in progress and will evolve over time, depending on ecosystem feedback and input.

All the features this API supports are proposals. **Each of these proposals is open to discussion
and feedback**, including those that have an initial browser implementation ready.

This API is being incubated and developed in the open. [Consider participating](#participate) in the
discussion.

{% endAside %}

This API enables sites to measure conversions in the following cases:

- Ad **clicks** and **views**.
- Ads in a **third-party** iframe, such as ads on a publisher site that uses a third-party adtech
  provider.
- Ads in a **first-party** context, such as ads on a social network or a search engine results page,
  or a publisher serving their own ads.

A flexible **attribution model** is supported. Review the details in [Status](#status).

This API gives access to different types of insights via two types of reports that can be sent to an
advertiser or a third-party adtech provider. These two types of reports can be used simultaneously
and are complementary.

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
  specific price or conversion time, is not supported in event-level reports.
- **Fraud detection**. The data in some reports can be useful for ad fraud detection and
  analysis, by allowing you to understand patterns that can be used to identify spammy or invalid
  activity.

### Summary reports (formerly aggregate reports)

**Summary reports**, on the other hand, offer more detailed conversion data and more flexibility for
joining click/view data and conversion data.

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

## Status

**🕙 Last updated: January 2022**

### Changelog

- **January 2022**: A number of changes, from API refactorings to new functionality, is applied to
  the attribution reporting proposal. Head over to [What's changing in January
  2022?](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/).

{% Aside 'caution' %}  
As of January 2022, these changes are not yet implemented in Chrome. {% endAside %}

- **Early 2021**: Aggregate reports and view-through measurement are added to the proposal.
- **Early 2021**: The API is renamed to "Attribution Reporting API".

### Status

Statuses:

- `🤿 Under exploration`: this idea is in the early discussion stages.
- `🥚 Proposal. Not implemented (all browsers)`: an initial design is ready and under public incubation.
- `🏗️ Under development in BROWSER_NAME`: the feature is being implemented in BROWSER_NAME.
- `⛳️ Flag in BROWSER_NAME` : the feature can be tried locally in an individual user's browser, by
  toggling a flag.
- `🧪 Origin trial (BROWSER_NAME)`: the feature can be tried in production with end-users.
- `🚀 Stable (BROWSER_NAME)`: the feature is shipped by default in BROWSER_NAME.

{% Aside 'caution' %}  
Multiple origin trials (experiments) will be run. Each round is used to improve and adjust the API
based on ecosystem feedback. {% endAside %}

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
    <td><code>Latest version not implemented yet, under development in Chrome</code></td>
    </tr>
    <tr>
    <td>Aggregatable reports for clicks and views<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explainer</a></td>
    <td><code>Latest version not implemented yet, under development in Chrome</code></td>
    </tr>
    <td>Conversion journey: app-to-web<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explainer</a></td>
    <td><code>🥚 Proposal. Not implemented yet (all browsers)</code></td>
    </tr>
    <tr>
    <tr>
    <td>Conversion journey: cross-device<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Explainer</a></td>
    <td><code>🥚 Proposal. Not implemented yet (all browsers)</code></td>
    </tr>
</tbody>
</table>

{% Details %}  
{% DetailsSummary 'h3' %}  
About attribution models  
{% endDetailsSummary %}

With the priority-based model, the browser can associate a priority with each attribution source.
This can be used to:

- Decide whether a click or a view was the most likely cause of the conversion (a click is usually
  considered a more direct signal of user interest).
- Set a **first-touch** **attribution** model, by setting `attributionsourcepriority` to be relative
  to time.
- Set a (probabilistically) **linear attribution** model, by choosing the priority uniformly at
  random.

Other attribution models may be supported in the future. In aggregate reports, the [worklet-based
scheme](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)
possibly allows for more flexible attribution options, including specifying partial credit for
multiple previous attribution sources.

{% endDetails %}

### Browser support

- Firefox and Edge [haven't shared signals](https://chromestatus.com/feature/6412002824028160).
- Safari/Webkit is [negative](https://chromestatus.com/feature/6412002824028160) and proposed a
  different API to measure ad conversions, called [Private Click
  Measurement](https://developer.apple.com/videos/play/wwdc2021/10033/).

Though the two APIs are different, Chrome and WebKit are working together in the open to simplify
the developer experience, for example by aligning on the attribute names and on the [JSON structure
for reports](https://github.com/privacycg/private-click-measurement/issues/30).

{% Details %}  
{% DetailsSummary 'h3' %}  
Differences between the API proposed by Chrome and the API proposed by WebKit  
{% endDetailsSummary %}  
The feature set of the Attribution Reporting API proposed by Chrome is different from that of the
Private Click Measurement API proposed by Safari/WebKit.  
Most notably, with the Attribution Reporting API proposed by Chrome:

- View-through measurement is supported.
- Event-level reports can be provided.
- Summary reports contain rich information on both the click/view side and conversion side.
- Third parties such as adtech platforms can receive reports on behalf of publishers and
  advertisers.

{% endDetails %}

## How it works

### Event-level reports

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",
  alt="event-level report", width="800", height="521" %}
  <figcaption style="text-align:left;">Event-level reports are generated as follows:<br>the browser matches clicks or views ("attribution source events") with conversion data ("attribution trigger data") defined by an adtech. Later, the browser sends the resulting reports to a predefined endpoint, with some delay and noise.</figcaption>
</figure>

For details on how this works, read [Event-level reports in the Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting-event-introduction/).

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
`news.example` **and** on `shoes.example`, and merge these pieces of information together to build a
detailed profile of Bob. An adtech company can end up knowing Bob's location, browsing habits and
preferred reads on `news.com`⏤**as well as** purchases, activity, and credit card information on
`shoes.com`. This cross-site joint is useful to measure ad conversions. But it hinders user privacy:
Bob's activity is tracked across sites with a high level of detail.

On the other hand, the Attribution Reporting API enables advertising companies to gain insights into
conversions **without tracking an individual's activity across sites**. A small amount of
information is joined across sites⏤enough to measure conversions, but not enough to track Bob's
activity across sites in detail. Bob's activity on `news.example` and on `shoes.example` remains
separate.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagram: side-by-side
view of today's web (joined identity) and tomorrow's web (partitioned identity)", width="800",
height="314" %}

### In detail

Unlike third-party cookies, the Attribution Reporting API provides insights without cross-site
identifiers in order to preserving identity partitioning per site.

**Event-level reports** link an ad-side identifier with only a small amount of conversion-side data.
So they do provide cross-site information about a conversion, but the conversion-side information is
too coarse to join user identity across sites.

**Summary reports** provide detailed insights, but only at an aggregated level; because the contents
of these aggregateable reports are encrypted when they are sent to the adtech, the adtech cannot get
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

## Sites and user control

- Users can opt out via the user settings at `chrome://settings/privacySandbox`.
- By default, the feature is enabled in top-level contexts. Arbitrary third-parties can't use the
  API without a publisher's or advertiser's knowledge, because the Attribution Reporting API needs
  to be enabled in child iframes via a [Permissions
  policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

## Attribution Reporting: all resources

See [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting).

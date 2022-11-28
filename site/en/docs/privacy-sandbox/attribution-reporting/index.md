---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting'
subhead: An API to measure when an ad click or view leads to a conversion, such as a purchase on an advertiser site.
description: An API to measure when an ad click or view leads to a conversion, such as a purchase on an advertiser site.
date: 2021-05-18
updated: 2022-06-23
authors:
  - maudn
  - samdutton
  - alexandrawhite
---

{% YouTube id='UGA74CIcom8' %}

{% Partial 'privacy-sandbox/feedback-aside.njk' %}

## Who is this article for?

This article covers the basics of Attribution Reporting, and explains some
underlying concepts, but doesn't go into much technical detail.

- If you work in **advertising or adtech**, [Use cases](#use-cases-and-features) and [How does Attribution Reporting work?](#how-does-the-attribution-reporting-api-work) should
  be useful.

- If you're a **developer or software engineer**, head over to the [Attribution Reporting: experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/).

- [The Attribution Reporting demo](https://attribution-reporting-demo.glitch.me/) provides a walkthrough of a basic Attribution Reporting
  deployment.

{% Aside %}
If you're unfamiliar with some of these terms, consult the
[Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).
{% endAside %}

## Changes

Keep track of the [API changes](/docs/privacy-sandbox/attribution-reporting-updates/).

## What is the Attribution Reporting API?

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies).

Browsers are restricting access to third-party cookies because these can be
used to track users across sites and hinder user privacy.

The Attribution Reporting API enables those measurements in a privacy-preserving way, without
third-party cookies.

This API enables advertisers and adtech providers to measure conversions in the following cases:

- Ad **clicks** and **views**.
- Ads in a **third-party** iframe, such as ads on a publisher site that uses a third-party adtech
  provider.
- Ads in a **first-party** context, such as ads on a social network or a search engine results page,
  or a publisher serving their own ads.

## Who needs to know about this API?

- **Adtech platforms** such as [demand-side
  platforms](/docs/privacy-sandbox/glossary/#dsp) (DSP) or [data management
  platforms](/docs/privacy-sandbox/glossary/#dmp) (DMP) may use this API to
  support functionality that currently relies on third-party cookies.
- **Advertisers and publishers relying on custom code** for advertising or
  conversion measurement may use this API to replace existing techniques.
- **Advertisers and publishers relying on adtech platforms** for conversion
  measurement don't need
  to use the API directly, but may be interested in understanding it if they're working with adtech
  platforms that may integrate the API.

{% Aside %}

In the future, the Attribution Reporting API may serve use cases that are not related to advertising.

{% endAside %}


## Try the API

- The Attribution Reporting API is available for experiments in the
  [ads relevance and measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/).
   - Multiple rounds of origin trials are run to improve and adjust APIs based on ecosystem feedback.
- You can test locally in your browser. [Set a _flag_](/blog/browser-flags/),
  which tells the Chrome browser to enable specific experimental
  functionalities.

If you're interested in experimenting with the API, head over to
[Attribution Reporting: experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/).

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
    <td>Available in Chrome for origin trial.</td>
    </tr>
    <tr>
    <td>Aggregatable reports for clicks and views<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explainer</a></td>
    <td>Available in Chrome for origin trial.</td>
    </tr>
    <td>Conversion journey: app-to-web<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explainer</a></td>
    <td>Proposal, not implemented yet.</td>
    </tr>
    <tr>
    <tr>
    <td>Conversion journey: cross-device<br><a href="https://github.com/WICG/attribution-reporting-api/blob/main/archive/cross_device.md">Explainer</a></td>
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

- [**Event-level reports**](#event-level-reports) associate a particular ad click or view (on the ad side) with data on the
  conversion side. To preserve user privacy by preventing the joining of user identity across sites,
  conversion-side data is very limited, and the data is noised (meaning that for a small
  percentage of cases, random data is sent instead of real reports). As an extra privacy protection, reports are not sent
  immediately.
- [**Summary reports**](#summary-reports) are not tied to a specific event on the ad side. These reports provide
  richer, higher-fidelity conversion data than event-level reports. A combination of privacy
  techniques help reduce the risk of identity joining across sites.

Both report types can be used simultaneously. They're complementary.

### Event-level reports

Event-level reports associate an ad click or view with coarse conversion data.

<figure class="screenshot">
 {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",
 alt="Event-level report", width="400", height="180" %}
 <figcaption>Example event-level report: Click ID 200400600 on <code>news.example</code> (attached to user ID Bob_Doe on <code>news.example</code>) has led to a purchase on <code>shop.example</code>.</figcaption>
</figure>

Event-level reports are suited for:

- **Optimization**. Event-level reports help answer questions like "How can I improve my return on
  investment?". In particular, these reports can be used to optimize for ad placement, since a
  unique ID for the ad side can be made available in the reports. Event-level reports can provide
  training data for machine learning models.
- **Coarse reporting**, where very little information is needed about the conversion. The current
  limitation is 3 bits of conversion data for clicks⏤this means a conversion can be assigned one of
  eight categories⏤and 1 bit for views. Encoding of granular conversion-side data, such as a
  specific price or conversion time is not supported in event-level reports.
- **Fraud detection**. The data in some reports can be useful for ad fraud detection and
  analysis, by allowing you to understand patterns that can be used to identify spammy or invalid
  activity.

### Summary reports

Summary reports (formerly known as aggregate reports) offer more detailed
conversion data and more flexibility for joining click/view data and conversion data.

Learn more about [summary reports](/docs/privacy-sandbox/summary-reports/).

<figure>
 {% Img
   src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="Example of insights from summary reports.", width="400", height="180"%}
 <figcaption>Here's an example of insights from summary reports: CampaignID 1234567 on <code>news.example</code> has led to 518 conversions on <code>shoes.example</code>, and to a total spend of $38174. Half of the conversions were from users in NYC, USA.</figcaption>
</figure>

Summary reports are best suited for reporting use cases. These reports help
answer questions such as: "What is my return on investment?"

Usage of summary reports for optimization—for example, to optimize for a
purchase value, which is not supported by event-level reports (because the
conversion data is too coarse)—is an area of active research.

### Other features

Other features proposed in this API include:

- [App-to-web attribution](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md):
  see or click an ad in an app and convert on the web.
- [Cross-device attribution](https://github.com/WICG/attribution-reporting-api/blob/main/archive/cross_device.md):
  see or click an ad on mobile and convert on desktop.

{% Aside %}
In a future without third-party cookies, this API would be combined with other privacy-preserving
ads APIs to cover end-to-end use cases:

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

The API does not rely on third-party cookies. However, in the testing phase, third-party cookies need to be enabled for the API to be enabled. This allows developers to get debug reports and compare the API's results with cookie-based attribution.

{% endAside %}

## How can sites control access? {: #sites-control }

If the API is available in a given browser, it's available by default in any given site, both in top-level documents and scripts, and in same-origin iframes.

Arbitrary third-parties—for example, cross-origin ad iframes that were not added to the page via a script that has top-level access—can't use the API without a publisher's or advertiser's knowledge: in these iframes, the Attribution Reporting API needs to be explicitly enabled via a [Permissions
policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

```html
<iframe src="..." allow="attribution-reporting"></iframe>
```

Third parties with top-level access that add cross-origin iframes to a page can enable the Attribution Reporting API via this [Permissions
policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) as well.

{% Aside %}

### Security benefits

By doing this, a script with top-level access allows the frames it adds itself
to use Attribution Reporting. Only a third-party script that is trusted by the
site should be given top-level access, so this isn't an issue.

The main security advantage of the policy lies somewhere else: frames that were
added without a top-level script shouldn't be trusted by default to register
sources or triggers (unless their embedder is already trusted). This is why the
top-level site is required to explicitly enable the API for these iframes.

{% endAside %}

A site can disable the Attribution Reporting API for all parties—including scripts with top-level access—by sending the HTTP response header:

```text
Permissions-Policy: attribution-reporting=()
```

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
{% Img
  src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/un70ZcJVrWepdWWsnMIY.png", alt="", width="800", height="1024"
%}
 <figcaption style="text-align:left;">Summary reports are generated as follows:<br>
*  When the user clicks or sees a specially configured ad, the browser—on the user's local device—records this event, alongside the attribution configuration data that was specified.<br>
*  Later on, when the user converts, the browser matches this detailed clicks or views event ("attribution source event") with detailed conversion data ("attribution trigger data") defined by an adtech company, following a specific logic that is defined by the adtech. The output of this process is an aggregatable report.<br>
*  Aggregatable reports are encrypted by the browser and sent to the adtech server. From the adtech server, the aggregatable reports are sent to the aggregation service to produce a summary report.<br>
*  Summary reports are then made available to the adtech. Note that summary reports are not delayed to the same extent as event-level reports.
</figcaption>
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

These contributions (raw reports) are sent encrypted to an adtech server, and
then over to aggregation services that will compute aggregate reports in a
[privacy-preserving](#privacy) way.

Note that aggregate reports are not be delayed to the same extent as event-level reports.

{% endDetails %}

## Privacy

### Overview

Let's take a person named Bob. Bob sees an ad while reading
the news on `news.example`. One week later, Bob buys shoes on
`shoes.example`.

Today, this conversion would be tracked by a third-party
cookie used as a **cross-site identifier**.
With third-party cookies, an adtech company can access a lot
of details on Bob's activity on `news.example` and on
`shoes.example`. The adtech can merge these pieces of
information together to build a detailed profile of Bob,
including Bob's location, browsing habits and
preferred reads on `news.example`. This profile could also
include purchases, activity, and credit card information on
`shoes.example`. This cross-site joint is useful to measure
ad conversions. But it hinders user privacy:
Bob's activity is tracked across sites with a high level of detail.

Unlike third-party cookies, the Attribution Reporting API
allows advertising companies to gain insights into
conversions **without tracking an individual's activity
across sites**. A small amount of information is joined
across sites&mdash;enough to measure conversions, but not
enough to track Bob's activity across sites in detail. Bob's
activity on `news.example` and on `shoes.example` remains
separate.

{% Img
  src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg",
  alt="Side-by-side view of today's web (joined identity) and tomorrow's web (partitioned identity)",
  width="800", height="314"
%}

### In detail

**Event-level reports** link an ad-side identifier with a small amount of
conversion-side data. While they do provide cross-site information about a
conversion, but the conversion-side information is too coarse to join user
identity across sites.

**Summary reports** provide detailed insights, but only at an aggregated level; because the contents
of these aggregatable reports are encrypted when they are sent to the adtech, the adtech cannot get
any information from the reports without using an aggregation service. The aggregation service only
provides access to noisy aggregates.

Additional privacy protections such as rate limitations are imposed on both
event-level and aggregate reports.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/mDdo2XLyGLBCAlgH7MPZ.png", alt="", width="800", height="1237" %}
</figure>
{% Details %}
{% DetailsSummary 'h3' %}
In detail: event-level reports and privacy
{% endDetailsSummary %}

Event-level reports provide conversion insights without tracking users across
sites, by following the following privacy mechanisms:

- No cross-site identifier is used and no detailed cross-site browsing activity
  leaves the device.
- Event-level reports associate 64 bits of information on the ad side
  (`news.example`) with only 1 bit or 3 bits on the conversion side
  (`shop.example`). 64 bits are enough information to be mapped to an
  individual user identifier, but these 64 bits can only be linked with very
  little cross-site information: 1 bit or 3 bits, which are not enough to hold
  an identifier.
  - The ad-side 64 bits are not new information. A user ID can already be
    available on the ad side today. `news.example` or `adtech.example` 
    already knows about a certain user's activity on `news.example`.
- Additional protections are applied to prevent abuse and cross-site tracking:
  - The reports are sent with a **delay**.
  - The conversion data is **noised**: a certain percentage of the time, fake reports are generated.
  - The number of attributed conversion reports is limited per click or view.
{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}
In detail: summary reports and privacy
{% endDetailsSummary %}
 
Summary reports associate a click or view event with detailed conversion data.
They provide conversion insights without tracking users across sites, by using the following privacy mechanisms:
 
- No cross-site identifier is used.
- Each attribution can make multiple contributions to a resulting summary
  report. Any given user can trigger multiple attributions for a particular
  click (or view) and conversion.
- Data is aggregated up to the level of many events (many users) and no
  individual events can be observed precisely. When looking at the
  aggregated data, as the level of detail increases so does the relative noise
  on that data increases as well. Slices of data that aggregate a lot of events
  and users are more accurate to preserve usefulness.
- The raw reports that associate a detailed click or view event with detailed conversion data are encrypted and not readable by the adtech company.
  This data can only be read by the [aggregation service](/docs/privacy-sandbox/aggregation-service).
- Additional protections are applied to prevent abuse and cross-site tracking:
  - Reports are sent with random delays.
  - Queries on different slices of the data are rate-limited.
 
{% endDetails %}

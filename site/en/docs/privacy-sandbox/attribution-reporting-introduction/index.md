---
layout: 'layouts/doc-post.njk'
title: 'Introduction to Attribution Reporting (Conversion Measurement)'
subhead: >
  Introduction and key concepts to understand the Attribution Reporting API.
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %}  
This API is a proposal and will expand over time. This blog post describes its current
state, and will be updated as the API evolves. {% endAside %}

Updates:

- Early 2021: aggregate reports and view-through measurement are added to the proposal.
- Early 2021: the API is renamed to "Attribution Reporting API".

{% Aside 'caution' %}

- This post focuses on advertising use cases, but the Attribution Reporting API can serve
  use cases that are not related to advertising as well.
- The advertising use cases for this API focus on linking ad clicks or views to
  conversions (Conversion Measurement).  
  {% endAside %}

## Introduction

The Attribution Reporting API makes it possible to measure when an **ad click or view**
leads to a **conversion** on an advertiser site, such as a sale or a sign-up. The API
doesn't rely on third-party cookies or mechanisms that can be used to identify individual
users across sites.

This proposal is being incubated in the open. The proposal and discussions live in the
[WICG GitHub repository](https://github.com/WICG/conversion-measurement-api).

{% Aside %}  
This API is a part of Privacy Sandbox, a series of proposals to satisfy third-party use
cases without third-party cookies or other cross-site tracking mechanisms. See [Privacy
Sandbox proposals](https://developers.chrome.com/docs/privacy-sandbox).  
{% endAside %}

## Why is this API needed?

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies).
Browsers are restricting access to third-party cookies because these can be used to track
users across sites and hinder user privacy. This API enables those measurements in a
privacy-preserving way, without third-party cookies.

## Who needs to know about this API?

- Adtech platforms such as [demand-side
  platforms](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) or [data management
  platforms](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) may use this
  API to support functionality that currently relies on third-party cookies.
- Advertisers and publishers relying on custom code for advertising or conversion
  measurement may use this API to replace existing techniques.
- Advertisers and publishers relying on adtech platforms for conversion measurement don't
  need to use the API directly, but may be interested in understanding it if they're
  working with adtech platforms that may integrate the API.

## Participate

{% Aside %}  
**Your participation is needed!** This API may need to support a wide variety of conversion
measurement and optimization use cases. Ecosystem input is vital to
ensure that solutions to support these use cases are discussed in the open. {% endAside %}

To engage, join the discussion and try the API. Doing both is optimal, but you're welcome
to join the discussion whether or not you've tried the API.

### Join the discussion

- [Join the bi-weekly
  meetings](https://github.com/WICG/conversion-measurement-api/issues/80) (every second
  week). In these calls, participants discuss API design proposals and how the API could
  support various measurement use cases. You can [add
  topics](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit)
  to the next meeting's agenda at any time. Everyone is welcome to join these
  discussions⏤only make sure to [join the WICG](https://www.w3.org/community/wicg/).
- [Open an issue](https://github.com/WICG/conversion-measurement-api/issues/new) to ask
  questions, propose features, or discuss use cases. If you're unsure how to formulate
  your issue, see examples like [this
  issue](https://github.com/WICG/conversion-measurement-api/issues/147) and [this
  issue](https://github.com/WICG/conversion-measurement-api/issues/68). You can also join
  the conversation in [existing
  issues](https://github.com/WICG/conversion-measurement-api/issues).

### Try the API

{% Aside 'caution' %}

If you're experimenting with the API in Chrome, you'll have access to all the features
that are **currently** implemented. Not all features discussed in the
[repository](https://github.com/WICG/conversion-measurement-api/) and
[meeting](https://github.com/WICG/conversion-measurement-api/issues/80) are implemented in
the Chrome origin trial. See the current feature status in [Status](#status). The features
available for experimentation are also a subset of what will ultimately be supported by
the API, and are subject to change as the API is being incubated in the open and as
ecosystem feedback is collected.

{% endAside %}

#### Experiment locally or with a demo

1.  To enable the API locally in your browser, turn on the flag
    `#enable-experimental-web-platform-features`. A Chrome flag is a toggle that tells
    your browser to enable certain experimental functionalities. To turn on that flag,
    paste `chrome://flags/#enable-experimental-web-platform-features` in Chrome's search
    bar and click **Enable**.
2.  Run the [demo](#demo) locally (or try the [live demo](#demo)).
3.  [Fork the demo code](#demo) and customize it, or build your own demo from scratch.

#### Experiment with end users on a deployed site

1.  Enable the API for end users by registering for an [origin
    trial](https://developer.chrome.com/blog/origin-trials/) if available. An origin trial
    gives you access to an experimental feature, to build functionality you can try out
    for a limited time. Note that [third-party origin
    trials](https://developer.chrome.com/blog/third-party-origin-trials/) make it possible
    for third-party actors such as ad serving and measurement providers to test an API
    across multiple sites. **To see the currently available origin trials for this API,
    head over to [Status](#status)**. To be informed of future origin trials, join the
    [Attribution Reporting mailing list for
    developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).

1.  Integrate the API into your sites and systems.

{% Aside %}  
If you have implementation questions, join the [Attribution Reporting mailing list for
developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)
and ask.

If you have general technical questions about your use case, consider opening an issue on
the [Privacy Sandbox dev support
repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).  
{% endAside %}

## Demo

A few demos are available for you to try.

- Event-level reports, clicks only:

  - [Live demo](https://goo.gle/sppi-devrel-eventlevel).
  - [Source
    code](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/conversion-measurement)
    for this demo, that you can [fork and
    customize](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/conversion-measurement#fork-and-customize)
    as needed.

## Use cases and features

{% Aside %}

This API is a work in progress and will evolve over time, depending on ecosystem feedback
and input.

All the features this API supports are proposals. **Each of these proposals is open to
discussion and feedback**, including those that have an initial browser implementation
ready.

This API is being incubated and developed in the open. [Consider
participating](#participate) in the discussion.

{% endAside %}

This API enables sites to measure conversions in the following cases:

- Ad **clicks** and **views**.
- Ads in a **third-party** iframe, such as ads on a publisher site that uses a third-party
  adtech provider.
- Ads in a **first-party** context, such as ads on a social network or a search engine
  results page, or a publisher serving their own ads.

A flexible **attribution model** is supported. See details in [Status](#status).

This API gives access to different types of insights via two types of reports that can be
sent to an advertiser or a third-party adtech provider. These two types of reports can be
used simultaneously; they're complementary.

**Event-level reports** associate an ad click or view with coarse conversion data.

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",
  alt="event-level report", width="400", height="180" %}
  <figcaption>Example event-level report: Click ID 200400600 on <code>news.example</code> (attached to user ID Bob_Doe on <code>news.example</code>) has led to a purchase on <code>shop.example</code>.</figcaption>
</figure>

Event-level reports are suited to:

- **Optimization** use cases. Event-level reports help answer questions such as _"How can
  I improve my return on investment?"_. In particular, they can be used to optimize for ad
  placement, since a unique ID for the ad side can be made available in the reports.
  Event-level reports can provide training data for machine learning models.
- **Coarse reporting** use cases where very little information is needed about the
  conversion. The current limitation is 3 bits of conversion data for clicks⏤which means
  that a conversion can be assigned one of eight categories⏤and 1 bit for views. Encoding
  of granular conversion-side data, such as a specific price or conversion time, is hence
  not supported in event-level reports.
- **Fraud detection** use cases. The data in some reports can be useful for ad fraud
  detection and analysis, by allowing you to understand patterns that can be used to
  identify spammy or invalid activity.

**Aggregate reports**, on the other hand, offer more detailed conversion data, and more
flexibility for joining click/view data and conversion data.

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="aggregate
  report", width="400", height="180"%}
  <figcaption>Example of insights from aggregate reports: CampaignID 1234567 on <code>news.example</code> has led to 518 conversions on <code>shoes.example</code>, and to a total spend of $38174. Half of the conversions were from users in NYC, USA.</figcaption>
</figure>

Aggregate reports are best suited for **reporting** use cases. They help answer questions
such as _"What is my return on investment?"_.  
Usage of aggregate reports for **optimization** use cases—for example, to optimize for a
purchase value, which is not supported by event-level reports because the conversion data
is too coarse—is an area of active research. See [Open questions](#open-questions).

{% Details %}  
{% DetailsSummary 'h3' %}  
Why are two types of reports needed?  
{% endDetailsSummary %}

Event-level reports only offer coarse conversion data in order to preserve user privacy.

But this coarse data may not be sufficient to measure campaign effectiveness. Marketers
may need to learn details about conversions, such as the purchase value, the aggregated
advertiser-side demographics for users who converted, the categories of the products that
were purchased, whether converted users are first-time or recurring customers, the carts'
contents, etc.

This is why aggregate reports have been designed.  
{% endDetails %}

Other features proposed in this API are [app-to-web
attribution](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md)
(see or click an ad in an app and convert on the web) and [cross-device
attribution](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md)
(see or click an ad on mobile and convert on desktop).

{% Aside %}  
In a future without third-party cookies, this API would be combined with other
privacy-preserving ads APIs in order to cover end-to-end use cases:

- Remarketing: see [FLEDGE](https://developer.chrome.com/docs/privacy-sandbox/fledge/)
- Interest-based ad selection: see
  [FLoC](https://developer.chrome.com/docs/privacy-sandbox/floc/)

{% endAside %}

## Status

**🕙 Last updated: August 2021**

Statuses:

- `🤿 Under exploration`: this idea is in the early discussion stages.
- `🥚 Proposal`: an initial design is ready and under public incubation.
- `🏗️ Under development (BROWSER_NAME)`: the feature is being implemented in
  BROWSER_NAME.
- `🧪 Experiment (BROWSER_NAME)`: an experiment is available in BROWSER_NAME. In Chrome,
  an experiment is called an origin trial.
- `🚀 Stable (BROWSER_NAME)`: the feature is shipped by default in BROWSER_NAME.

{% Aside %}  
[Current origin
trial](https://developer.chrome.com/origintrials/#/view_trial/3411476717733150721) (Chrome
experiment 🧪) {% endAside %}

{% Aside 'caution' %}  
Multiple origin trials (experiments) will be run. Each round is used to improve and adjust
the API based on ecosystem feedback. {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead>
<tr>
    <th style="text-align: left;">Proposal</th>
    <th style="text-align: left;">Status</th>
</tr>
</thead>
<tbody>
    <tr>
    <td>Event-level reports for clicks<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">Explainer</a></td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Event-level reports for views<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">Explainer</a></td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Aggregate reports for clicks and views<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explainer</a></td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Conversion journey: cross-device<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Explainer</a></td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Conversion journey: app-to-web<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explainer</a></td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Attribution model: last click<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">Explainer</a></td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Attribution model: priority-based<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">Explainer</a></td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Attribution model: flexible</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %}  
{% DetailsSummary 'h3' %}  
About attribution models  
{% endDetailsSummary %}

With the priority-based model, the browser can associate a priority with each attribution
source. This can be used to:

- Decide whether a click or a view was the most likely cause of the conversion (a click is
  usually considered a more direct signal of user interest).
- Set a **first-touch** **attribution** model, by setting `attributionsourcepriority` to
  be relative to time.
- Set a (probabilistically) **linear attribution** model, by choosing the priority
  uniformly at random.

Other attribution models may be supported in the future. In aggregate reports, the
[worklet-based
scheme](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)
possibly allows for more flexible attribution options, including specifying partial credit
for multiple previous attribution sources.

{% endDetails %}

## Browser support

- Firefox and Edge [haven't shared
  signals](https://chromestatus.com/feature/6412002824028160).
- Safari/Webkit is [negative](https://chromestatus.com/feature/6412002824028160) and
  proposed a different API to measure ad conversions, called [Private Click
  Measurement](https://developer.apple.com/videos/play/wwdc2021/10033/).

Though the two APIs are different, Chrome and WebKit are working together in the open to
simplify the developer experience, for example by aligning on the attribute names and on
the [JSON structure for
reports](https://github.com/privacycg/private-click-measurement/issues/30).

{% Details %}  
{% DetailsSummary 'h3' %}  
Differences between the API proposed by Chrome and the API proposed by WebKit  
{% endDetailsSummary %}  
The feature set of the Attribution Reporting API proposed by Chrome is different from that
of the Private Click Measurement API proposed by Safari/WebKit.  
Most notably, with the Attribution Reporting API proposed by Chrome:

- View-through measurement is supported.
- Event-level reports can be provided.
- Both ads links in a first-party context (such as ads on a social network or a search
  engine results page, or a publisher serving their own ads) **and** ads links in a
  third-party iframe (such as ads on a publisher site that uses a third-party adtech
  provider) are supported.
- Third parties such as adtech platforms can receive reports on behalf of publishers and
  advertisers.

{% endDetails %}

## How it works

### Event-level reports

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",
  alt="event-level report", width="800", height="521" %}
  <figcaption>Event-level reports are generated as follows: the browser matches clicks or views ("attribution source events") with conversion data ("attribution trigger data") defined by an adtech. Later, the browser sends the resulting reports to a predefined endpoint, with some delay and noise.</figcaption>
</figure>

{% Details %}  
{% DetailsSummary 'h3' %}  
How it works in detail: event-level reports  
{% endDetailsSummary %}  
Ad links can be configured with attributes that are specific to ad conversions:

- Custom data to attach to an ad click (or view) on the publisher's side, for example a
  click ID or campaign ID.
- The site for which a conversion is expected for this ad.
- The reporting endpoint that should be notified of successful conversions, that is,
  receive the reports.
- The cut-off date for when conversions can no longer be counted for this ad.

Note: it's also possible to register an attribution source for navigations [initiated by
`window.open()`](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations)
or, for views, via a [JavaScript
API](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript).

When the user clicks or sees a specially configured ad, the browser—on the user's local
device—records this event, alongside the attribution configuration data that was
specified.

Later on, the user visits the advertiser's website and performs an action that the
advertiser or their adtech provider categorizes as a conversion, such as a purchase. When
this happens, the advertiser or adtech provider triggers an attribution: it asks the
browser to record a conversion with a certain value `trigger-data`, and the ad click (or
view) and conversion event are matched by the user's browser.

The browser finally schedules a report to be sent to the endpoint specified on the ad
side. This report includes:

- Custom ad-side data that was attached to the ad click or view that led to this
  conversion.
- Custom conversion-side data, with some noise.

If several conversions are registered for a given ad click (or view), corresponding
reports are scheduled to be sent. A single report can be sent for views, and up to three
reports for clicks.

Reports are sent by the browser after a delay⏤days or sometimes weeks after a conversion.

{% endDetails %}

### Aggregate reports

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png",
alt="ALT_TEXT_HERE", width="800", height="1140" %}
  <figcaption>Aggregate reports are generated as follows: the browser matches detailed clicks or views ("attribution source events") with detailed conversion data ("attribution trigger data") defined by an adtech. Adtech-defined code runs in a worklet to define contributions that will be sent by the browser in order to be used to compute aggregate reports. Aggregation services are responsible for privately computing aggregate reports for adtech.</figcaption>
</figure>

{% Details %}  
{% DetailsSummary 'h3' %}  
How it works in detail: aggregate reports  
{% endDetailsSummary %}

Ad links can be configured with attributes that are specific to ad conversions.

When the user clicks or sees a specially configured ad, the browser—on the user's local
device—records this event, alongside the attribution configuration data that was
specified.

Adtech-defined code is then executed within a worklet to define contributions, namely
joints of ad-side and conversion-side data.

These contributions (raw reports) are sent encrypted to an adtech server, and then over to
aggregation services that will compute aggregate reports in a [private](#privacy) way.

Note that aggregate reports are not be delayed to the same extent as event-level reports.

{% endDetails %}

## Privacy

### Overview

Let's take a person named Bob. Bob sees an ad while reading the news on `news.com`. One
week later, Bob buys shoes on `shoes.example`.

Today, this conversion would be tracked by a third-party cookie used as a **cross-site
identifier**. With third-party cookies, an adtech company can access a lot of details on
Bob's activity on `news.example` **and** on `shoes.example`, and merge these pieces of
information together to build a detailed profile of Bob. An adtech company can end up
knowing Bob's location, browsing habits and preferred reads on `news.com`⏤**as well as**
purchases, activity, and credit card information on `shoes.com`. This cross-site joint is
useful to measure ad conversions. But it hinders user privacy: Bob's activity is tracked
across sites with a high level of detail.

On the other hand, the Attribution Reporting API enables advertising companies to gain
insights into conversions **without tracking an individual's activity across sites**. A
small amount of information is joined across sites⏤enough to measure conversions, but not
enough to track Bob's activity across sites in detail. Bob's activity on `news.example`
and on `shoes.example` remains separate.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagram:
side-by-side view of today's web (joined identity) and tomorrow's web (partitioned
identity)", width="800", height="314" %}

### In detail

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png",
  alt="ALT_TEXT_HERE", width="800", height="1237" %}
  <figcaption>Unlike third-party cookies, the Attribution Reporting API provide insights without cross-site identifiers in order to preserving identity partitioning per site.<br> Event-level reports link an ad-side identifier with only a small amount of conversion-side data. So they do provide cross-site information about a conversion, but the conversion-side information is too coarse to join user identity across sites.<br> Aggregate reports provide detailed insights, but only at an aggregated level; on account of differential privacy techniques, private computation and cryptography, aggregate reports can't be used to track an individual user's activity across sites.<br>Additional privacy protections such as rate limitations are imposed on both event-level and aggregate reports.</figcaption>
</figure>

{% Details %}  
 {% DetailsSummary 'h3' %}  
 In detail: event-level reports and privacy {% endDetailsSummary %}

Event-level reports provide conversion insights without tracking users across sites, by
following the following privacy mechanisms:

- No cross-site identifier is used and no detailed cross-site browsing activity leaves the
  device. Event-level reports associate 64 bits of information on the ad side
  (`news.example`) with only 1 bit or 3 bits on the conversion side (`shop.example`). 64
  bits **are enough information to be mapped to an individual user identifier, but these
  64 bits can only be linked with very little cross-site information:** 1 bit or 3 bits,
  which are not enough to hold an identifier. Note: the ad-side 64 bits are not new
  information. A user ID can already be available on the ad side today. `news.example` or
  `adtech.example` already knows about a certain user's activity on `news.example`.
- Additional protections are applied to prevent abuse and cross-site tracking:

  - The reports are sent with a **delay**.
  - The conversion data is **noised**: a certain percentage of the time (5% in Chrome),
    the real conversion data is replaced with a random value.
  - The number of attributed conversion reports is limited per click or view.

{% Aside %}  
 It's possible to recover the true conversion count in a privacy-preserving way. See the
[example
script](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py).
{% endAside %}

{% endDetails %}

{% Details %}  
 {% DetailsSummary 'h3' %}  
 In detail: aggregate reports and privacy {% endDetailsSummary %}

Aggregate reports associate a detailed click or view event with detailed conversion data.
However, they provide conversion insights without tracking users across sites by following
the following privacy mechanisms:

- No cross-site identifier is used.
- Each attribution can make multiple contributions to a resulting aggregate report, and a
  given user can trigger multiple attributions for a particular click (or view) and
  conversion. But the contributions any user can make in a given time window is limited.
- Data is aggregated up to the level of many events (many users) and no individual events
  can be observed precisely. [Differential
  privacy](https://en.wikipedia.org/wiki/Differential_privacy) is used to keep the output
  data unusable to link user identity across sites: when drilling down into the aggregated
  data, as the level of detail increases, the relative noise on that data increases as
  well. This leads to a greater relative error, and ensures that no individual events (or
  users) can be observed precisely. On the other hand, slices of data that aggregate a lot
  of events and users are more accurate to preserve usefulness.
- The raw reports that associate a detailed click or view event with detailed conversion
  data are encrypted and not readable by the adtech company. Aggregate data is then
  computed from these reports in a private way via a trusted server. A few computation
  options are under consideration:

  - Secure multi-party computation (MPC). Trust is distributed across multiple servers.
    Each server gets one slice of the data that is meaningless on its own. Once each
    helper has run computations, the output from these helpers is combined to form a
    meaningful whole.
  - Single-server computation. One helper server computes the output. This option is less
    secure and less private. But it's easier to set up, which means that it can enable
    more diverse ecosystem actors to experiment with this API and provide feedback. **This
    option is not intended to be a long-term solution**. With sufficient notice and
    migration time, it will be deprecated as ecosystem feedback is integrated and as this
    API matures, in favor of the more secure approaches, MPC or secure single-server.
  - Secure single-server computation. A single server, but with confidential compute
    properties that are similar (but not equivalent) to MPC.
  - In the long-term, servers will need to process data exclusively with secure
    multi-party computation (secure single-server or secure multi-party).

- Additional protections are applied to prevent abuse and cross-site tracking:

  - Reports are sent with random delays.
  - Queries on different slices of the data are rate-limited.

{% endDetails %}

## Sites and user control

- Users can opt out via the user settings at `chrome://settings/privacySandbox`.
- By default, the feature is enabled in top-level contexts. Arbitrary third-parties can't
  use the API without a publisher's knowledge, because the Attribution Reporting API needs
  to be enabled in child iframes via a [Permission
  policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy).

## Open questions

A number of questions remain open and will be resolved as the API is incubated in the
open. You're encouraged to [participate](#participate) in these discussions. In
particular:

- What is the right amount of noise to preserve privacy and usefulness?
- How to support custom attribution models?
- How to optimize for any conversion-side data that has a certain level of detail, such as
  a purchase value?
- What will qualify as a trusted server? One solution that is being assessed is to run
  regular open-source audits. [Join the
  discussion](https://github.com/WICG/conversion-measurement-api/issues/116).
- How to offer more reporting flexibility, for example support delegation to more
  reporting endpoints? [Join the
  discussion](https://github.com/WICG/conversion-measurement-api/issues/96).
- How to prevent fraud, e.g. via authentication using anonymous credentials? [Join the
  discussion](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth).
- If you're thinking of using this API for non-advertising use cases: what's missing, how
  could the API be improved? [Open an
  issue](https://github.com/WICG/conversion-measurement-api/issues)
- How can implementers customize the privacy settings? [Join the
  discussion](https://github.com/WICG/conversion-measurement-api/issues/99).

{% Aside %}  
This API combines multiple privacy techniques in order to achieve **privacy and
usefulness**. This means that the 3-bit (or 1-bit for views) data limitation and other
privacy mechanisms used by this API are a means to an end. They're subject to change. If
there are ways for adtech companies to get more useful data for their use cases while
achieving strong privacy guarantees, this API will evolve accordingly. {% endAside %}

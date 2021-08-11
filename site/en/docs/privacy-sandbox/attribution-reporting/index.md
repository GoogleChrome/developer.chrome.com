---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting'
subhead: >
  Measure when user action (such as an ad click or view) leads to a conversion, without using cross-site identifiers.
description: >
  The Attribution Reporting API makes it possible to measure when user action (such as an ad click or view) leads to a conversion, without using cross-site identifiers.
date: 2021-05-18
updated: 2021-08-09
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %} The Attribution Reporting API was previously known as the Conversion
Measurement API. {% endAside %}

## Implementation status

See [Status](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

## Glossary

{% Aside %} You may also want to consult the complete [Privacy Sandbox
glossary](/docs/privacy-sandbox/glossary/). {% endAside %}

- **Adtech platforms**: companies that provide software and tools to enable brands or
  agencies to target, deliver, and analyze their digital advertising.
- **Advertisers**: companies paying for advertising.
- **Publishers**: companies that display ads on their websites.
- **Click-through conversion**: conversion that is attributed to an ad click.
- **View-through conversion**: conversion that is attributed to an ad impression (if the
  user doesn't interact with the ad, then later converts).

## Who needs to know about this API: adtech platforms, advertisers, and publishers

- Adtech platforms such as [demand-side
  platforms](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) or [data management
  platforms](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) may use this
  API to support functionality that currently relies on third-party cookies.
- Advertisers and publishers relying on custom code for advertising or conversion
  measurement may use this API to replace existing techniques.
- Advertisers and publishers relying on adtech platforms for conversion measurement don't
  need to use the API directly, but may be interested in understanding it if they're
  working with adtech platforms that may integrate the API.

{% Aside %} There may be use cases that are non-ads-related. [Engage](#engage) to share
your use case! {% endAside %}

## Why is this API needed? {: #why-is-this-api-needed }

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies).
Browsers are restricting access to third-party cookies because these can be used to track
users across sites and hinder user privacy. This API enables those measurements in a
privacy-preserving way, without third-party cookies.

## How does the Attribution Reporting API work and what are its features?

{% Aside %} This API is being incubated and developed in the open. It is subject to
change. Your feedback is welcome. See [how to engage](#engage). {% endAside %}

The Attribution Reporting API enables the measurement of two events that are linked
together: an event on a publisher's website, such as a user viewing or clicking an ad,
with a subsequent conversion on an advertiser site.

This API supports click-through conversion attribution measurement (available in the first
implementation of this API, currently in [origin
trial](https://web.dev/conversion-measurement/#browser-support)) and view-through
attribution measurement ([see public
explainer](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md)).

The API offers two types of attribution reports than can be used for different use cases:

- **Event-level reports** associate a particular ad click or view (on the ad side) with
  data on the conversion side. To preserve user privacy by preventing the joining of user
  identity across sites, conversion-side data is very limited, and the data is 'noised'
  (meaning that for a small percentage of cases, random data is sent). As an extra privacy
  protection, reports are not sent immediately.
- **Aggregate reports** are not tied with a specific event on the ad side. These reports
  provide richer, higher-fidelity conversion data than event-level reports. A combination
  of privacy techniques across cryptography, distribution of trust, and differential
  privacy help reduce the risk of identity joining across sites. Both report types can be
  used simultaneously. They're complementary. Other features that are designed in this API
  include [cross-device attribution
  reporting](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md)
  and [app-to-web attribution
  reporting](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md).

## Engage and share feedback {: #engage }

- **Origin trial**: [register for the first origin trial (click
  only)](https://developer.chrome.com/origintrials/#/view_trial/3411476717733150721) or
  [see the first demo (click
  only)](https://goo.gle/demo-event-level-conversion-measurement-api).
- To stay tuned about the next implementation of this API that will offer more features
  and be available for experimentation in Chrome (origin trial), join the [mailing list
  for
  developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).
- **GitHub**: Read the [proposal](https://github.com/WICG/conversion-measurement-api/),
  [raise questions and follow the
  discussion](https://github.com/WICG/conversion-measurement-api/issues).
- **W3C**: Discuss industry use cases in the [Improving Web Advertising
  Business&nbsp;Group](https://www.w3.org/community/web-adv/participants) and join the
  [Privacy Community Group](https://www.w3.org/community/privacycg/) for discussions
  around the WebKit/Safari API.
- **Developer support**: Ask questions and join discussions on the [Privacy Sandbox
  Developer Support
  repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

- [Introduction to Attribution Reporting (Conversion
  Measurement)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API technical explainers](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsolete) [A more private way to measure ad
  conversions](https://web.dev/conversion-measurement/): overview of the first iteration
  of this API for web developers
- (⚠️ obsolete) [A more private way to measure ad conversions -
  Video](https://www.youtube.com/watch?v=jcDfOoWwZcM): demo of the first iteration of this
  API (clicks only)
- (⚠️ obsolete) [Using the Event Conversion Measurement
  API](https://web.dev/using-conversion-measurement/): how to experiment with the first
  iteration of this API for web developers
- [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

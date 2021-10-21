---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting'
subhead: >
  Measure when user action (such as an ad click or view) leads to a conversion, without using cross-site identifiers.
description: >
  The Attribution Reporting API makes it possible to measure when user action (such as an ad click or view) leads to a conversion, without using cross-site identifiers.
date: 2021-05-18
updated: 2021-10-20
authors:
  - maudn
  - samdutton
---

## Get started

Head over to [Attribution Reporting in five minutes](/docs/privacy-sandbox/attribution-reporting-in-short) for a quick overview of the Attribution Reporting API.

## Learn more

- [Introduction to Attribution Reporting (Conversion Measurement)](/docs/privacy-sandbox/attribution-reporting-introduction) gives you an in-depth
  introduction to the API's use cases, features, and privacy model.
- [FAQ: Impact of user-initiated data clearing on attribution reports](/docs/privacy-sandbox/attribution-reporting-data-clearing/)
- [Migration guide (Chrome 92): Conversion Measurement API to Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-migration/)

## See the timeline

- Head over to the [Privacy Sandbox timeline](https://privacysandbox.com/timeline) for an overview of the various stages of development for this API.
- The [Attribution Reporting status overview](/docs/privacy-sandbox/attribution-reporting-introduction/#status) is a detailed view of the status of different features within the API.

## Try out the API

Try out the [demo](https://goo.gle/demo-event-level-conversion-measurement-api) to see the API in
action in your browser. This demo features event-level reports for clicks, which is a subset of the
features the API aims to support.

_For developers:_

- See [how to build a prototype and/or experiment
  locally](/docs/privacy-sandbox/attribution-reporting-introduction/#experiment-locally-or-with-a-demo).
- Ask technical questions about your implementation on the [Privacy Sandbox Developer Support
  repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) or on the [Attribution
  Reporting mailing list for
  developers](https://groups.google.com/u/0/a/chromium.org/g/attribution-reporting-api-dev).
- [Not available at the moment for this API] Register for an origin trial to experiment with end
  users on a deployed site.

## Join the discussion

{% Aside %}  
**Your participation is needed!** Ecosystem input is vital to ensure that your conversion
measurement, optimization, and other use cases are discussed in the open. {% endAside %}

### Discuss the Attribution Reporting API

This API is a proposal; it lives [here](https://github.com/WICG/conversion-measurement-api/).
Proposals like this one are documented and discussed publicly, and often live on a
platform called _GitHub_. On GitHub, discussions are called _issues_.

- Join the conversation in [existing
  issues](https://github.com/WICG/conversion-measurement-api/issues).
- [Open a new issue](https://github.com/WICG/conversion-measurement-api/issues/new) to ask questions,
  propose features, or discuss use cases. If you're unsure how to formulate your issue, see [this issue](https://github.com/WICG/conversion-measurement-api/issues/147) as an example.
- Discussions also take place in a [biweekly
  meeting](https://github.com/WICG/conversion-measurement-api/issues/80) (every second week).
  Everyone is welcome to join these discussions⏤only make sure to [join the
  WICG](https://www.w3.org/community/wicg/). You can discuss use cases or API design questions others have submitted, submit an agenda item yourself, or just listen in!

### Discuss related topics

- Discuss industry use cases in the [Improving Web Advertising Business
  Group](https://www.w3.org/community/web-adv/participants).
- Discuss the [WebKit/Safari Measurement
  API](https://github.com/privacycg/private-click-measurement) in the [Privacy Community
  Group](https://www.w3.org/community/privacycg/).

## Get updates

{% Aside %}  
This API is a work in progress and is evolving over time, depending on ecosystem feedback
and input.
{% endAside %}

- To get monthly updates, subscribe to the RSS feed [Progress in
  the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/). This includes Attribution Reporting announcements alongside other Privacy Sandbox news.
- To closely follow all ongoing discussions, click the **Watch** button on the [proposal page on GitHub](https://github.com/WICG/conversion-measurement-api).
- Join the [mailing list for
  developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) to be
  notified when a new origin trial is starting.

{% Aside %}  
Note: if you're already subscribed to the [blink-dev mailing
list](https://groups.google.com/a/chromium.org/g/blink-dev), you'll receive updates for all web
platform features, including Attribution Reporting. If you're only interested in Attribution
Reporting for now, no need to subscribe to blink-dev.
{% endAside %}

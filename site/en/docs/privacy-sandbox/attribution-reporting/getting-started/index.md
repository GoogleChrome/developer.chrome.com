---
layout: 'layouts/doc-post.njk'
title: 'Get started with Attribution Reporting'
subhead: >
  Here's where to start, including setup and a quick overview.
description: >
  Here's where to start, including setup and a quick overview.
date: 2023-07-10
authors:
  - maudn
---

<!-- from Generating aggregatable reports in https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.5nnh1qxxsa01 -->

{% Aside %}
<strong>Hands-on resources</strong>

- [Attribution Reporting API demo](https://arapi-home.web.app/)
  - [Demo background]()

- [Noise lab](https://noise-lab.uc.r.appspot.com/?mode=simple)
  - [Noise lab background](/docs/privacy-sandbox/summary-reports/design-decisions/#appendix)
{% endAside %}

## What you need to get started

The Attribution Reporting API requires a bit of background understanding and planning before you can implement reporting with the API.

Several of the elements involved in implementation can be understood at both a more superficial level and a deeper level.

In this guide we list the things you need to be familiar with and the things you need to do to get started, along with a quick overview of the steps you'll take to get ready to generate reports.
 
## Planning

You'll need to develop or adapt your ad and reporting strategy to transition to the Attribution Reporting API. Understanding what data the API can report on, the size constraints of the data, the timing of reports, and how you will prioritize data to be reported will be important.

### Design decisions

Refer to [Design decisions](/docs/privacy-sandbox/summary-reports/design-decisions/) to help you plan your data collection strategy.

You can get started by trying out the steps that follow, and then adapt you strategy to fit, or you can plan your strategy in advance.

This guide is a high-level implemention how-to for developers, not a strategy guide. Strategic planning will likely require a deeper understanding of the internal workings of the API, which is covered in other documentation.

Part of your decision making will be to decide whether you'll be starting with event-level reports or summary reports.

Event-level reports require less preparation than Aggregatable reports, and can be a good way to dive into the API. Just know that they each serve different use cases.

Event-level reports associate an ad click or view with coarse conversion data. 

They are suited for:

- **Optimization**. Event-level reports help answer questions like "How can I improve my return on investment?". In particular, these reports can be used to optimize for ad placement, since a unique ID for the ad side can be made available in the reports. Event-level reports can provide training data for machine learning models.
- **Coarse reporting**, where very little information is needed about the conversion. The current limitation is 3 bits of conversion data for clicks⏤this means a conversion can be assigned one of eight categories⏤and 1 bit for views. Encoding of granular conversion-side data, such as a specific price or conversion time is not supported in event-level reports.
- **Fraud detection**. The data in some reports can be useful for ad fraud detection and analysis, by allowing you to understand patterns that can be used to identify spammy or invalid activity.

Aggregatable reports are used to generate summary reports. An aggregatable report is a combination of data gathered from the ad (on a publisher's site) and conversion data (from the advertiser's site) which is generated and encrypted by the browser on a user's device before it's collected by the ad tech.

Summary reports are not tied to a specific event on the ad side. These reports provide richer, higher-fidelity conversion data than event-level reports. A combination of privacy techniques help reduce the risk of identity joining across sites.

## Important concepts

At a minimum, the Attribution Reporting elements you will need to review to begin implementing the API are listed here.

### Event-level reports

- [attribution sources](/docs/privacy-sandbox/attribution-reporting/register-attribution-source)
- [attribution triggers](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger)
- request and response headers

Once you're familiar with the concepts for event-level reports and have defined your sources, triggers, set your headers, and defined your endpoints, you're ready to receive event-level reports.

The remainder of this document discusses implementation for Aggregatable report generation.

### Summary reports

In addition to uderstanding source, triggers, and headers as as noted for event-level reports, for aggregatable reports you'll need few more.

While you may not need to delve into all of the details, such as exactly how [noise](/docs/privacy-sandbox/attribution-reporting/understanding-noise) is generated, a solid understanding of the basics will help you develop a plan. Knowledge of these concepts is not strictly necessary for implementation, but to understand and refine the reports generated, you'll benefit from this information.

These concepts are:

- [Contribution budget](/docs/privacy-sandbox/attribution-reporting/contribution-budget)
- [Noise](/docs/privacy-sandbox/attribution-reporting/understanding-noise)
- epsilon

## Implementation



### Report generation

To generate aggregatable reports, you need to generate contributions as a user clicks or views an ad and later converts. Contributions from many users are then aggregated to produce a summary report. 

Before you generate aggregatable reports, you need to define your strategy for summary reports. Review [Attribution Reporting: Strategies and tips for summary reports](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#). 

Make sure to check out the [demo](https://arapi-home.web.app/) for a working example and example code.

{% Aside %}
For a given event source, it's possible to generate both an
event-level and an aggregatable report. The
[demo](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.vk0ctjqbpr1g)
walks you through the process. 
{% endAside %}

Aggregatable reports are generated similarly to event-level reports. To be able to generate reports, follow these high-level steps. Each step points to more detailed information as well.

{% Aside 'important' %}
Before you can register sources and triggers and get reports, your sites need to have SSL/TLS certificates; in other words, you need to be running over HTTPS.
{% endAside %}

1. **Register a source:**
    1. [Registering a source](/docs/privacy-sandbox/attribution-reporting/register-attribution-source) is the same processs for both event-level and aggregatable reports.
    1. In the `Attribution-Reporting-Register-Source` header add the
        necessary fields to generate aggregatable or event-level reports. These fields include:
        - `source_event_id`
        - `destination`
        - `expiry` (optional)
        - `debug_key`
        - `aggregation_keys` (for aggregatable reports)
        - `debug_reporting`
        - `event_trigger_data` (for event-level reports only)
         (refer to the
        [Example code](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/main/attribution-reporting/functions/apps/adtech.js)).

        {% Aside %}
        While headers can be used for both event-level and aggregatable reports, the content of the headers will be different for each of these report types. For example, if you omit `event_trigger_data`, event-level reports will not be generated.
        {% endAside %}
      
 
1. **Register a trigger:**
    1. [Registering a trigger](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger) is the same process for both event-level reports and aggregatable reports.
    1. In the `Attribution-Reporting-Register-Trigger` header add the
        necessary fields to generate aggregatable reports (refer to the
        [Example code](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/main/attribution-reporting/functions/apps/adtech.js)):
        - `aggregatable_trigger_data`, with `key_piece` and `source_keys
`       
        - `aggregatable_values`

1. **Set up filters (optional)**:
    1. Follow the instructions in
        [Define filters](/docs/privacy-sandbox/attribution-reporting/define-filters/).
    1. Review details specific to filters for aggregatable reports in
        the
        [explainer](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATE.md).

1. **Set up endpoints for the reports:**
    1. Set up an endpoint for **aggregatable** reports with
        the following URL:
        `{REPORTING_ENDPOINT}/.well-known/attribution-reporting/report-aggregate-attribution`

        Refer to the [example code](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L334). More on [.well-known](https://en.wikipedia.org/wiki/Well-known_URI).

    1.  Set up an endpoint for **event-level** reports with
        the following URL:

        `{REPORTING_ENDPOINT}/.well-known/attribution-reporting/report-event-attribution`      
1. **Set up debug reports:**
    1. Learn how to set up debug reports in the
        [Attribution reporting debugging series](/docs/privacy-sandbox/attribution-reporting-debugging/).

1. **Batch and send the reports** for further processing with the aggregation service which will produce summary reports. Refer to [batched aggregatable reports](/docs/privacy-sandbox/attribution-reporting/system-overview/#batched-aggregatable-reports).

### Don't forget feature detection

Before you use the API, detect if it hasn't been disallowed on the page via a Permissions-Policy. 
To do so, run the following code:

```javascript
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // the Attribution Reporting API is enabled
}
```

If this feature detection check returns true, the API is allowed in the context (page) where the check is run.

Note that this check alone isn't a guarantee that the API is usable on that page; the user may have disabled the API via their browser settings, or they may have other settings that prevent the API from being used. In order to protect user privacy, there is no way to check for this programmatically.


## Next steps
(separate by type)
If you're ready to begin implementation, check out these docs:
- [Register an attribution trigger](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger)
- [Register an attribution source](/docs/privacy-sandbox/attribution-reporting/register-attribution-source)
- [Working with noise](/docs/privacy-sandbox/attribution-reporting/working-with-noise/)
- [Prioritize specific clicks, views, or conversions](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/)


If you're still in the planning stage, take a look at these docs:
- [System overview](/docs/privacy-sandbox/summary-reports/system-overview/) 
- [Design decisions](/docs/privacy-sandbox/summary-reports/design-decisions/) 
- [Contribution budget](/docs/privacy-sandbox/attribution-reporting/contribution-budget/)
- [Understanding noise](/docs/privacy-sandbox/attribution-reporting/understanding-noise/) 


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


{% Aside %}
<strong>Relevance</strong>

- This document applies to both event-level and summary reports.

<strong>Hands-on resources</strong>

- [Attribution Reporting API demo](https://arapi-home.web.app/), [Demo background]()
- [Noise lab](https://noise-lab.uc.r.appspot.com/?mode=simple), [Noise lab background](/docs/privacy-sandbox/summary-reports/design-decisions/#appendix)
- [Attribution Reporting Header Validator](https://wicg.github.io/attribution-reporting-api/validate-headers)
{% endAside %}

 
## Planning and design decisions

You'll need to develop or adapt your ad and reporting strategy to transition to the Attribution Reporting API. Understanding what data the API can report on, the [size constraints](/docs/privacy-sandbox/attribution-reporting/constraints/) of the data, the [timing of reports](/docs/privacy-sandbox/attribution-reporting/report-schedules/), and how you will [prioritize data to be reported](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/) will be important.

Strategic planning will require a deeper understanding of the internal workings of the API, which is covered in other documentation, such as [Design decisions](/docs/privacy-sandbox/summary-reports/design-decisions/).

### Choose a report type

The Attribution Reporting API is designed to allow you to generate two types of reports: event-level and summary reports. Event-level reports require less setup than aggregatable/summary reports, so they may be a good place to start. Of course, if you decide to, you can set up reporting for both event-level and summary reports. They are complementary. 

It's important to note that aggregatable reports represent data that is eventually aggregated and summarized to produce summary reports. They can be thought of as an intermediate step in the generation of summary reports, which are the reports containing data that can be read by advertisers and ad techs. Summary reports require integration with the [Aggregation Service](/docs/privacy-sandbox/aggregation-service/); event-level reports don't. 

#### Event-level reports

{% Partial 'privacy-sandbox/glossary-entries/event-level.njk' %}

https://github.com/WICG/attribution-reporting-api/blob/main/EVENT.md

#### Summary reports 

{% Partial 'privacy-sandbox/glossary-entries/summary-report.njk' %}



## Implementation

You can get started by trying out the steps that follow.

Note that for a given event source, it's possible to generate both an
event-level and an aggregatable report. The
[demo](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.vk0ctjqbpr1g)
walks you through the process. 
 

{% Aside 'important' %}
Before you can register sources and triggers and get reports, your sites need to have SSL/TLS certificates; in other words, you need to be running over HTTPS.
{% endAside %}

### Event-level report generation

 Here are the minimum steps to follow to be able to generate event-level reports:

1. **Register a source**. Refer to [Registering a source](/docs/privacy-sandbox/attribution-reporting/register-attribution-source) for more information.

1. **Register a trigger**. Refer to [Triggering Attribution](https://github.com/WICG/attribution-reporting-api/blob/main/EVENT.md#triggering-attribution) for more information.

    Note that `deduplication_key`, `priority`, and `trigger_data` are optional fields.

1.  **Set up an endpoint** with the following URL: {: #event-endpoint}

    `{REPORTING_ENDPOINT}/.well-known/attribution-reporting/report-event-attribution`  

1. **Complete the source registration**. Respond with the source registration header. Upon receiving that request, respond with the header `Attribution-Reporting-Register-Source`. In that header, specify the desired Attribution Reporting configuration. This step is the same for both clicks and views.

More details on [event-level reports](https://github.com/WICG/attribution-reporting-api/blob/main/EVENT.md) here.

### Summary report generation

To be able to generate reports, follow these high-level steps.

1. **Register a source**. Refer to [Registering a source](/docs/privacy-sandbox/attribution-reporting/register-attribution-source) for more details. 

1. **Register a trigger**. Refer to [Registering a trigger](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger).

1. **Set up an endpoint** for aggregatable reports with the following URL: {: #summary-endpoint}
        `{REPORTING_ENDPOINT}/.well-known/attribution-reporting/report-aggregate-attribution`

        Refer to the [example code](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L334). More on [.well-known](https://en.wikipedia.org/wiki/Well-known_URI).

1. **Complete the source registration**: Respond with the source registration header. Upon receiving that request, respond with the header `Attribution-Reporting-Register-Source`. In that header, specify the desired Attribution Reporting configuration. This step is the same for both clicks and views.
    
1. **Set up debug reports**: Learn how in the [Attribution reporting debugging series](/docs/privacy-sandbox/attribution-reporting-debugging/).

1. **Batch and send the reports** for further processing with the aggregation service which will produce summary reports. Refer to [batched aggregatable reports](/docs/privacy-sandbox/attribution-reporting/system-overview/#batched-aggregatable-reports).

More details on [summary reports](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATE.md) here.

#### Summary reports additional concepts

In addition to understanding the implementation steps here, the following concepts will help you plan your summary reporting strategy:

- [Contribution budget](/docs/privacy-sandbox/attribution-reporting/contribution-budget)
- [Noise](/docs/privacy-sandbox/attribution-reporting/understanding-noise)

### Optional steps

1. **Set up filters (optional)**:
    1. Follow the instructions in
        [Define filters](/docs/privacy-sandbox/attribution-reporting/define-filters/).
    1. Review details specific to filters for aggregatable reports in
        the
        [explainer](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATE.md).

### Don't forget feature detection

Before you use the API, detect if it hasn't been blocked on the page via a Permissions-Policy. 
To do so, run the following code:

```javascript
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // the Attribution Reporting API is enabled
}
```

If this feature detection check returns true, the API is allowed in the context (page) where the check is run.

Note that this check alone isn't a guarantee that the API is usable on that page; the user may have disabled the API via their browser settings, or they may have other settings that prevent the API from being used. In order to protect user privacy, there is no way to check for this programmatically.


## Next steps

If you're ready to begin implementation, check out these docs:
- [Register an attribution trigger](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger)
- [Register an attribution source](/docs/privacy-sandbox/attribution-reporting/register-attribution-source)
- [Working with noise](/docs/privacy-sandbox/attribution-reporting/working-with-noise/)
- [Prioritize specific clicks, views, or conversions](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/)
- [Constraints on Aggregation Reporting data](/docs/privacy-sandbox/attribution-reporting/constraints/)


If you're still in the planning stage, take a look at these docs:
- [System overview](/docs/privacy-sandbox/attribution-reporting/system-overview/) 
- [Design decisions](/docs/privacy-sandbox/summary-reports/design-decisions/) 
- [Contribution budget](/docs/privacy-sandbox/attribution-reporting/contribution-budget/)
- [Understanding noise](/docs/privacy-sandbox/attribution-reporting/understanding-noise/) 



---
layout: 'layouts/doc-post.njk'
title: 'Summary reports'
subhead: >
  Measure data aggregated across users with the Attribution Reporting API
  and the Private Aggregation API.
description: >
  Measure data aggregated across users with the Attribution Reporting API
  and the Private Aggregation API.
date: 2022-11-29
authors:
  - alexandrawhite
---

## Implementation status

*  Participate and experiment with [Attribution Reporting summary reports](/docs/privacy-sandbox/attribution-reporting-experiment/).
   *  This API is available in the [ads relevance and measurement origin trial](/blog/privacy-sandbox-unified-origin-trial/).

## What is a summary report?

A _summary report_ is compiled for a group of users so that it cannot be tied
to any individual. Summary reports offer detailed conversion data with
flexibility for click and view data. Summary reports do not rely on third-party
cookies or mechanisms that can be used to identify individual users across
sites.

Summary reports are created in two contexts:

* **Ads measurement**: adtechs can generate summary reports with
  [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction/), to
  measure when an ad click or view leads to a conversion on an advertiser site,
  such as a sale or a sign-up. Adtechs can also generate summary reports for
  [FLEDGE auctions with Private Aggregation](/docs/privacy-sandbox/private-aggregation/#with-fledge).
* **General cross-site reporting**: developers capture cross-site data in
  Shared Storage, and can report on that data with
  [Private Aggregation](/docs/privacy-sandbox/private-aggregation/#with-shared-storage).
  This has many uses, such as gaining insight into user demographics and
  capturing unique reaches for content.

Summary reports are requested differently for Attribution Reporting and Private
Aggregation. Before you can learn how to generate reports, you must first
understand what aggregation is and how summary reports may be used to address
your measurement needs.

## Key concepts

### Design your data collection {: #design-data-collection}

A key principle of summary reports is early design decisions. You decide what data to collect in what categories. The output reports provide insights on your campaigns or business. 

The output report offers detailed cross-site conversion data and flexibility for joining click and view data with conversion data. You can also think of the final output as an input for the tools you use to make decisions.

Ask yourself: what do I want to learn about user engagement with my content?

{% Details %}

{% DetailsSummary %}
#### Ad conversions
{% endDetailsSummary %}

For example, if you generate summary reports to determine how many conversions led to some total spend value, that may help your team decide what your next ad campaign should target to generate a higher total spend.

{% endDetails %}

{% Details %}

{% DetailsSummary %}
#### Cross-site engagement
{% endDetailsSummary %}

For example, if you generate summary reports to determine how many people read your content on a third-party's website, that may help your team decide on how to partner with that third-party to generate higher engagement and encourage readers to visit your site directly.

{% endDetails %}

### What information is captured in the browser?

An _aggregatable report_ is the raw data captured from a user's browser, which
includes a predetermined set of buckets (or _aggregation keys_). How you
determine this criteria is dependent on your [design decisions](#design-data-collection).

Summary reports offer a combination of aggregated data alongside detailed conversion data.

{% Details %}

{% DetailsSummary %}
#### Ad conversions
{% endDetailsSummary %}

Conversions are defined by the advertiser or adtech company, and may be different for different ad campaigns. One campaign could measure the number of ad clicks that were followed by a user purchasing the advertised item. Another campaign could measure how many ad views led to advertiser site visits. 

For example, an adtech provider runs an ad campaign on news.example, where a conversion represents a user clicking an ad for shoes and completing a purchase of shoes on shoes.example.

The adtech receives a summary report for this ad campaign with ID `1234567`, which states there were <strong>518</strong> conversions on shoes.example on <strong>January 12, 2022</strong>, with a total spend of <strong>$38,174</strong>. <strong>60%</strong> of conversions were from users buying blue sneakers with product SKU `9872` and <strong>40%</strong> were users who bought yellow sandals with product SKU `2643`. The campaign ID is detailed ad-side data, while the product SKUs are detailed conversion data. The number of conversions and total spend are aggregated data.

{% endDetails %}

{% Details %}

{% DetailsSummary %}
#### Cross-site engagement
{% endDetailsSummary %}

Before you can capture data, you must define what information you want to collect, identify what conversions you expect from any given cross-site integration, and determine which report type to collect.

There are a number of possible use cases, detailed in the Private Aggregation documentation. Let's explore one example:

You may want to measure the demographics of the users who have seen your content across different sites. Private Aggregation can provide an answer, such as “Approximately 317 unique users are from the age of 18-45 and are from Germany.” First, decide specifically what information you want to collect (such as age and location). Then, use [Shared Storage](/docs/privacy-sandbox/shared-storage/) to collect that specific demographics data from a third-party site. At a later point in time, you can submit a report via Private Aggregation with the age group and country dimensions encoded in the aggregation key. 

{% endDetails %}

### How is data captured before aggregation?

As summary reports are made up of the data from a group of individuals, let's start with one individual's browser actions.

1. A user visits a publisher site and sees or clicks an ad, otherwise known as an attribution source event.
2. A few minutes or days later the user converts, otherwise known as an attribution trigger event. For example, a conversion can be defined as a product purchase.
3. The browser software matches the ad click or view with the conversion event. Based on this match, the browser creates an aggregatable report with specific logic created by an adtech provider.
4. The browser encrypts this data and, after a small delay, sends it to an adtech server for collection. The adtech server must rely on an aggregation service to access the noised insights.

### Batching aggregatable reports

Before aggregatable reports can be processed and aggregated into a summary report, they must first be collected and batched. A _batch_ is a strategic group of aggregatable reports.

Aggregatable reports have a small amount of unencrypted data, included as `shared_info`, which can be used to create batches. This includes the timestamp and reporting origin. You cannot batch based on encrypted information within the report.

Ideally, batches will contain many reports (in other words, more than 100 reports in a batch). You may decide to batch on a daily, weekly, or monthly basis. This strategy can change for specific events where a higher traffic is expected. 

For example, if batching aggregatable reports for the Attribution Reporting API, you may decide to update your batching strategy for the day of a large sale, where you expect a larger volume of ad conversions.

With the Private Aggregation API, you may expect to change your strategy on the day of a large press release about a specific piece of content, embedded on third-party websites.

###  Processing data with the aggregation service

The _[aggregation service](/docs/privacy-sandbox/aggregation-service/)_ decrypts and combines the batched data from the aggregatable reports, [adds noise](/docs/privacy-sandbox/aggregation-service#noise), and returns the final summary report. This service runs in a trusted execution environment (TEE), which is deployed on a cloud service that supports necessary security measures to protect this data.

## Summary reports with Attribution Reporting

For adtech providers to retrieve a summary report, the following steps must be taken:

1. The adtech provider collects aggregatable reports from individual users'
   browsers.
   {% Aside %}
   The adtech provider can only decrypt these reports in the aggregation service.
   {% endAside %}
1. The adtech provider batches the aggregatable reports and sends the batches
   to the aggregation service.
1. The aggregation service schedules a
   [worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) to aggregate the data.
   {% Aside %}
   Before the worker can aggregate, attestation is required from the ​​coordinator. If the worker passes attestation, the decryption keys will be provided.
   {% endAside %}
1. The aggregation worker decrypts and aggregates data from the aggregatable
   reports, along with noised data.
1. The aggregation service returns the summary report to the adtech provider.

The adtech can use the summary report to inform bidding and to offer reporting to its own customers. A [JSON-encoded scheme](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#aggregate-attribution-reports) is the proposed format for summary reports.

## Summary reports with Private Aggregation

1. Call your shared storage worklet to generate a histogram report using
   Private Aggregation. In this call, define what buckets should be aggregated.
1. The aggregation service schedules a worker to aggregate the data.
   {% Aside %}
   Before the worker can aggregate, attestation is required from the
   ​​coordinator. If the worker passes attestation, the decryption keys will be
   provided.
   {% endAside %}
1. The aggregation worker decrypts and aggregates data from the aggregatable
   reports, along with noised data.
1. The aggregation service returns the summary report to the requester.

## Engage and share feedback

Summary reports are a key piece of the Privacy Sandbox measurement offerings.

* Discuss the [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-experiment/#discuss-the-api).
* Discuss the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/#engage-and-share-feedback).
* **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

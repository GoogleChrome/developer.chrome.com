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

* **Ads measurement**: ad techs can generate summary reports with
  [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction/), to
  measure when an ad click or view leads to a conversion on an advertiser site,
  such as a sale or a sign-up. Ad techs can also generate summary reports for
  [Protected Audience API auctions with Private Aggregation](/docs/privacy-sandbox/private-aggregation/#with-fledge).
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

A key principle of summary reports is early design decisions. You decide what
data to collect in what categories. The output reports provide insights on your
campaigns or business. 

The output report offers detailed cross-site conversion data and flexibility
for joining click and view data with conversion data. You can also think of the
final output as an input for the tools you use to make decisions.

Ask yourself: what do I want to learn about user engagement with my content?

{% Details %}

{% DetailsSummary %}
#### Ad conversions
{% endDetailsSummary %}

For example, if you generate summary reports to determine how many conversions
led to some total spend value, that may help your team decide what your next ad
campaign should target to generate a higher total spend.

<figure class="screenshot">
{% Img
  src="image/VbsHyyQopiec0718rMq2kTE1hke2/RFfm1ulmqrFMASCqZ2dJ.png",
  alt="Diagram which shows how multiple aggregatable reports are processed and have noise added to generate specific summary reports.", width="800", height="465"
%}
</figure>
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

Conversions are defined by the advertiser or ad tech company, and may be different for different ad campaigns. One campaign could measure the number of ad clicks that were followed by a user purchasing the advertised item. Another campaign could measure how many ad views led to advertiser site visits. 

For example, an ad tech provider runs an ad campaign on news.example, where a conversion represents a user clicking an ad for shoes and completing a purchase of shoes on shoes.example.

The ad tech receives a summary report for this ad campaign with ID `1234567`, which states there were <strong>518</strong> conversions on shoes.example on <strong>January 12, 2022</strong>, with a total spend of <strong>$38,174</strong>. <strong>60%</strong> of conversions were from users buying blue sneakers with product SKU `9872` and <strong>40%</strong> were users who bought yellow sandals with product SKU `2643`. The campaign ID is detailed ad-side data, while the product SKUs are detailed conversion data. The number of conversions and total spend are aggregated data.

{% endDetails %}

{% Details %}

{% DetailsSummary %}
#### Cross-site engagement
{% endDetailsSummary %}

Before you can capture data, you must define what information you want to collect, identify what conversions you expect from any given cross-site integration, and determine which report type to collect.

There are a number of possible use cases, detailed in the Private Aggregation documentation. Let's explore one example:

You may want to measure the demographics of the users who have seen your
content across different sites. Private Aggregation can provide an answer, such
as "Approximately 317 unique users are from the age of 18-45 and are from
Germany." First, decide specifically what information you want to collect (such
as age and location). Then, use
[Shared Storage](/docs/privacy-sandbox/shared-storage/) to collect that
specific demographics data from a third-party site. At a later point in time,
you can submit a report via Private Aggregation with the age group and country
dimensions encoded in the aggregation key. 

{% endDetails %}

### How is data captured before aggregation?

Summary reports are made up of aggregated data from a group of individual
devices. While an individual user’s actions cannot be observed and reviewed,
the process of collection is the same for each person.

An individual user’s actions are encrypted and collected in an aggregatable
report. These reports also include a small amount of
[unencrypted metadata relevant to batching](#batching).

{% Aside %}
Unencrypted conversion data is only available in summary reports—that is,
after the aggregatable reports have been processed by the [aggregation service](/docs/privacy-sandbox/aggregation-service/).
{% endAside %}.

For Attribution Reporting data, aggregatable reports are captured as such:

1. A user visits a publisher site and sees or clicks an ad, otherwise known as an attribution source event.
2. A few minutes or days later the user converts, otherwise known as an attribution trigger event. For example, a conversion can be defined as a product purchase.
3. The browser software matches the ad click or view with the conversion event. Based on this match, the browser creates an aggregatable report with specific logic created by an ad tech provider.
4. The browser encrypts this data and, after a small delay, sends it to an ad tech server for collection. The ad tech server must rely on an aggregation service to access the noised insights.

For Private Aggregation, it looks like the following:

1. A third-party decides what they want to measure and writes the data into Shared Storage to be read at a later time.
2. The user triggers an event which matches what the third-party wants to measure. For example, when the user visits a site with embedded content, the third-party can read the data in Shared Storage and use Private Aggregation to send encrypted aggregatable reports to your server for collection. .

<figure class="screenshot">
{% Img
  src="image/VbsHyyQopiec0718rMq2kTE1hke2/2Si3rdSh7jr3S6UZTSrg.png",
  alt="", width="600", height="195"
%}
</figure>

### Batching aggregatable reports {: #batching }

Before the collected aggregatable reports can be processed and aggregated into a summary report, they must be batched. A batch is a strategic group of aggregatable reports.

Aggregatable reports have a small amount of unencrypted data, included as `shared_info`, which can be used to create batches. This includes the timestamp and reporting origin. You cannot batch based on encrypted information within the report.
 
Ideally, batches will contain many reports. You may decide to batch hourly, daily, weekly, or any other time frame of your choice. This strategy can change for specific events where a higher traffic is expected. 
 
For example, when batching aggregatable reports for the Attribution Reporting
API, you may decide to update your batching strategy to hourly for the day of a
large sale, where you expect a larger volume of ad conversions.
 
With the Private Aggregation API, you may expect to change your strategy on the
day of a large press release about a specific piece of content, embedded on
third-party websites.

###  Processing data with the aggregation service

The _[aggregation service](/docs/privacy-sandbox/aggregation-service/)_ decrypts and combines the batched data from the aggregatable reports, [adds noise](/docs/privacy-sandbox/private-aggregation-fundamentals/#noise-and-scaling), and returns the final summary report. This service runs in a trusted execution environment (TEE), which is deployed on a cloud service that supports necessary security measures to protect this data.

## Summary reports with Attribution Reporting

For ad tech providers to retrieve a summary report, the following steps must
be taken:

1. The ad tech provider collects aggregatable reports from individual users'
   browsers.
   {% Aside %}
   The ad tech provider can only decrypt these reports in the aggregation service.
   {% endAside %}
1. The ad tech provider batches the aggregatable reports and sends the batches
   to the aggregation service.
1. The aggregation service schedules a
   [worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) to
   aggregate the data.
   {% Aside %}
   Before the worker can aggregate, attestation is required from the
   ​​coordinator. If the worker passes attestation, the decryption keys will be
   provided.
   {% endAside %}
1. The aggregation worker decrypts and aggregates data from the aggregatable
   reports, along with noised data.
1. The aggregation service returns the summary report to the ad tech provider.

<figure class="screenshot">
  {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/U1ZeswSEnAMSSoCcE5Za.png", alt="", width="800", height="146" %}
</figure>

The ad tech can use the summary report to inform bidding and to offer reporting
to its own customers. A
[JSON-encoded scheme](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#aggregate-attribution-reports)
is the proposed format for summary reports.

## Summary reports with Private Aggregation

1. Read the cross-site data collected by Shared Storage and generate an
   aggregation key to group the data. 
1. Call the Private Aggregation API from a Shared Storage worklet with the
   aggregation key and the value that you want to accumulate. The browser 
   generates an encrypted aggregatable report from your input and sends it to
   your server for collection.
1. Batch the aggregatable reports and send them to the aggregation service for
   processing.
1. The aggregation service processes the batched reports, then adds noise.
   {% Aside %}
   Before the aggregation service can process the reports, attestation is required from the ​​coordinator. Learn more about the [aggregation service](/docs/privacy-sandbox/aggregation-service).
   {% endAside %}
1. The aggregation service returns the summary report to the requester.

## Engage and share feedback

Summary reports are a key piece of the Privacy Sandbox measurement proposals.
Like other Privacy Sandbox proposals, this is documented and discussed publicly
on GitHub.

* Discuss the [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-experiment/#discuss-the-api).
* Discuss the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/#engage-and-share-feedback).
* **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

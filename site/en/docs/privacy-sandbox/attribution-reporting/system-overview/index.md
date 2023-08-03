---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting: full system overview'
subhead: >
  High-level overview of connected services for Attribution Reporting,
  aimed at technical decision makers. 
description: >
  High-level overview of connected services for Attribution Reporting,
  aimed at technical decision makers.
date: 2022-08-09
authors:
  - alexandrawhite
---

<style type="text/css">
	.type figcaption {text-align:left;}
</style>

The Attribution Reporting API allows ad techs and advertisers to measure when an
ad click or view leads to a conversion, such as a purchase. This API relies on
a combination of client-side and server-side integrations, depending on your
business needs.

Before continuing, make sure to read the
[Attribution Reporting overview](/docs/privacy-sandbox/attribution-reporting).
This will help you understand the API's purpose and the flow of the different output reports
([event-level report](/docs/privacy-sandbox/attribution-reporting/#event-level-reports)
and [summary reports](/docs/privacy-sandbox/summary-reports/)).
If you come across unfamiliar terms, refer to the
[Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).

## Who is this article for?

You should read this article if:

*  You're an ad tech or advertiser's **technical decision-maker**. You may work
   in operations, DevOps, data science, IT, marketing, or another role where
   you make technical implementation decisions. You're wondering how the many
   proposals for Attribution Reporting systems work together to build a tool
   for privacy-preserving measurement.
*  You're a **technical practitioner** (such as a developer, system operator,
   system architect, or data scientist) who will be setting up experiments with
   this API and Aggregation Service environment.

{% Aside %}
Right now, publishers don't have to take any action with this API. If this changes, this article will be updated accordingly.
{% endAside %}

In this article, you'll read a high-level, end-to-end explanation of how the
services work for the Attribution Reporting API. If you're a technical
practitioner, you can
[experiment with this API](/docs/privacy-sandbox/attribution-reporting-experiment/)
locally or in production with the
[unified Privacy Sandbox Relevance and Measurement Origin Trial](/blog/privacy-sandbox-unified-origin-trial/).

## Overview

The Attribution Reporting API consists of many services, which require specific
setup, client-side configurations, and server deployments. To determine what
you need, first:

* **[Make design decisions](#design-decisions)**. Define what information you want to collect, identify what conversions you expect from any given campaign, and determine which report type to collect. The final output is one or both of the two report types: event-level reports and summary reports.

There are always two (and sometimes three) components which work together to support reporting:

*  **[Website to browser communication](#web-browser-communication)**.  In
   cookie-based systems, information for conversions and ad engagements is
   attached to an identifier that allows you or an analytics service to join
   these events later. With this API, the browser associates conversions with
   ad clicks/views, based on your instructions, before it’s delivered for
   analysis. Therefore, your ad rendering code and conversion tracking must:
   *  Tell the browser which conversions should be attributed to which ad
	clicks or impressions.
   *  Signal any other data to include in the final reports.
*  **[Data collection](#data-collection)**. You'll need a collector endpoint to
   receive the reports, generated in users' browsers. The output from browsers
   could be one of two possible reports: event-level reports and aggregatable
   reports (which are encrypted, used to generate summary reports).

If you collected aggregatable reports, you'll need a third component:

*  **[Summary report generation](#summary-report-generation)**. Batch
   aggregatable reports and use the Aggregation Service to process the reports
   to generate a summary report.

## Design decisions

A key principle of Attribution Reporting is early design decisions. You decide
what data to collect in what categories and how frequently to process that
data. The output reports provide insights on your campaigns or business. 

The output report can be:

*  _Event-level reports_ associate a particular ad click or view (on the ad side) with data on the conversion side. To preserve user privacy by limiting the joining of user identity across sites, conversion-side data is very limited, and the data is noisy (meaning that for a small percentage of cases, random data is sent instead of real reports).
*  _[Summary reports](/docs/privacy-sandbox/summary-reports/)_ are not tied to a specific event on the ad side. These reports offer more detailed conversion data and flexibility for joining click and view data with conversion data. 

Your report selection determines what data you'll need to collect.

You can also think of the final output as an input for the tools you use to
make decisions. For example, if you generate summary reports to determine how
many conversions led to some total spend value, that may help your team decide
what your next ad campaign should target to generate a higher total spend.

Once you've decided what you want to measure, you can set up the client-side
for Attribution Reporting API.

## Website to browser communication {: #web-browser-communication }

{% Aside %}
While this API is in testing, your code must confirm the API is available and set the appropriate Permissions-Policy.
{% endAside %}

<figure class="screenshot">
{%
	Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/wO7uPRjjBsSoUGNN8M9B.png",
	alt="Attribution sources on a publisher's website connect with triggers on an advertiser's website.",
	width="800", height="275"
%}
<figcaption><strong>Figure 1</strong>.</figcaption>
</figure>

### Attribution sources (publisher's website) {: #attribution-sources}

An _[attribution source](/docs/privacy-sandbox/attribution-reporting/register-attribution-source/)_
is an ad-related event (a click or view), to which an ad tech can attach the
following kinds of information:

*  Contextual reporting data, such as the ad creative ID, information about the
   campaign, or geography.
*  A conversion destination, as in the site where you expect the user will convert.

Once the data is collected for the attribution source, the browser adds the
data to local storage, so it can later be matched with an attribution trigger.

### Attribution triggers (advertiser's website)

The _[attribution trigger](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATE.md#attribution-trigger-registration)_
is the event that tells the browser to capture conversions. 

We recommend capturing the conversions that are most important to the
advertiser, such as purchases. Multiple conversion types and metadata can be
captured in summary reports.

This ensures the aggregate results are detailed and accurate for these events.

### Match sources to triggers

When a browser receives an attribution trigger response, the browser accesses
local storage to find a source that matches both the attribution trigger's
origin and that page URL's
[eTLD+1](https://web.dev/same-site-same-origin/#site).

For example, when the browser receives an attribution trigger from
`adtech.example` on `shoes.example/shoes123`, the browser looks for a source in
local storage that matches both `adtech.example` and `shoes.example`.

_Filters_ (or custom rules) can be set to determine when a trigger is matched
to a specific source. For example, set a filter to count only conversions for a
specific product category and ignore all other categories. Filters and
prioritization models allow for more advanced attribution reporting.

If multiple attribution sources are found in local storage, the browser picks
the one that was stored most recently. In some cases where attribution sources
are assigned a priority, the browser will select the source with the highest
priority.

## Data collection

Together, an attribution trigger matched to a corresponding source, are sent as
a report by the browser to a reporting endpoint on an ad tech-owned server
(sometimes referred to as a collection endpoint or collection service). These
reports can be event-level reports or aggregatable reports.

_[Aggregatable reports](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#aggregatable-reports)_
are used to generate summary reports. An aggregatable report is a combination
of data gathered from the ad (on a publisher's site) and conversion data (from
the advertiser's site) which is generated and encrypted by the browser on a
user's device before it's collected by the ad tech.

Event-level reports are delayed between 2 and 30 days. Aggregatable reports are
sent with a random delay within one hour and the events must fit within the
_[contribution budget](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATE.md#contribution-bounding-and-budgeting)_.
These choices protect privacy and prevent exploitation of any individual user's actions.

If you're only interested in event-level reports, this is the last piece of
infrastructure you need. However, if you want to generate summary reports,
you'll need to process the aggregatable reports with an additional service.

## Summary report generation

To generate summary reports, you'll use the
[Aggregation Service](https://github.com/google/trusted-execution-aggregation-service)
(operated by the ad tech) to process the aggregatable reports. The Aggregation
Service adds noise to protect user privacy and returns the final summary report.

<figure class="screenshot">
	{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ZBF0uMoXBDww805XVctQ.png", alt="Aggregatable reports are collected, batched, and sent to the ad tech environtment.", width="800", height="464" %}
	<figcaption>
		<strong>Figure 2</strong>. This diagram represents the asynchronous flow
		of data from the collection endpoint, batching reports, through
		processing on the ad tech-owned Aggregation Service.<br /><br />
		After batching the collected aggregatable reports the batch is processed
		by the Aggregation Service. A
		<a href="https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md#attestation-and-the-coordinator">coordinator</a>
		gives the decryption keys only to attested versions of the Aggregation
		Service. The Aggregation Service then decrypts the data, aggregates
		it, and add noise before returning the results as a summary report.
	</figcaption>
</figure>

### Batched aggregatable reports

Before the aggregatable reports are processed, they must be batched. A batch
consists of strategically grouped aggregatable reports. Your strategy will most
likely be reflective of a specific time period (such as daily or weekly). This
process can take place on the same server which acts as your reporting endpoint.

Batches should contain many reports to ensure the signal-to-noise ratio is high.

<figure class="screenshot">
  {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/hjs2hU2e7N51a1CyNvsB.png", alt="Larger time periods lead to less noisy results.", width="614", height="317" %}
	<figcaption>
		<strong>Figure 3</strong>. Compare waiting 1 day and 1 week. In 1
		hour, you'll have a smaller summary value with likely more noisy results.
		In one day, you'll have a larger summary value so it's likely to be less
		noisy.
	</figcaption>
</figure>

Batch periods can change at any time to ensure you capture specific events
where you expect higher volume, such as for an annual sale. The batching period
can be changed without needing to change attribution sources or triggers.

### Aggregation Service

The [Aggregation Service](/docs/privacy-sandbox/aggregation-service/) is responsible for processing aggregatable reports to
generate a summary report. Aggregatable reports are encrypted and can only be
read by the Aggregation Service, which runs on a trusted execution environment
(TEE).

The Aggregation Service requests decryption keys from the [coordinator](/docs/privacy-sandbox/aggregation-service/#coordinator )
to decrypt and aggregate the data. Once decrypted and aggregated, the results
are noised to preserve privacy and returned as a summary report. 

Practitioners can generate aggregatable cleartext reports to
[test the Aggregation Service locally](https://github.com/google/trusted-execution-aggregation-service#set-up-local-testing).
Or, you can [test with encrypted reports on AWS with Nitro Enclaves](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports).

## What's next?

We want to engage in conversations with you to ensure we build an API that
works for everyone.

### Discuss the API

Like other Privacy Sandbox proposals, this API is documented and
[discussed publicly](/docs/privacy-sandbox/attribution-reporting-experiment/#join-the-discussion).

### Experiment with the API

You can [experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/)
in conversation about the Attribution Reporting API.

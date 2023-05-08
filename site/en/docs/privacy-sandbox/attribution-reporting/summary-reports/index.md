---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting: summary reports'
subhead: >
  Measure ad conversions aggregated across users, without revealing
  individual data. Formerly known as aggregate reports.
description: >
  Measure ad conversions aggregated across users, without revealing
  individual data. Formerly known as aggregate reports.
date: 2022-02-16
updated: 2022-06-06
authors:
  - alexandrawhite
---

## Implementation status

*  [Chrome platform status](https://chromestatus.com/feature/5762222527610880)
*  This API is available in the [ads relevance and measurement origin trial](/blog/privacy-sandbox-unified-origin-trial/).
*  [Participate and experiment with this API](/docs/privacy-sandbox/attribution-reporting-experiment/).
*  Keep track of the [API changes](/docs/privacy-sandbox/attribution-reporting-updates/).

## What is an Attribution Reporting summary report?

The Attribution Reporting API makes it possible to measure when an ad click or
view leads to a conversion on an advertiser site, such as a sale or a sign-up.
The API doesn't rely on third-party cookies or mechanisms that can be used to
identify individual users across sites.

This API offers two types of reports. [Event-level
reports](/docs/privacy-sandbox/attribution-reporting/#event-level-reports)
are already available for testing in Chrome, which associate a specific ad
click or view with less detailed conversion data. The browser delays sending
reports to ad tech companies for multiple days to prevent identity connection
across sites. 

A _summary report_ (formerly known as an aggregate report) is compiled for a
group of users so that it cannot be tied to any individual. Summary
reports offer detailed conversion data, such as purchase value and cart
contents, with flexibility for click and view data. These reports are not
delayed to the same extent as event-level reports.

If you haven't already, we recommend you read the [general overview of
Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction/)
before reading the rest of this article.

## Why do we need summary reports?

{% Img
   class="float-right",
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/mvk4I92OFInhVvwZEbiu.jpg",
   alt="A collection of users that take the same action in their browser (such as buying a pair of shoes), can have their conversions aggregated.",
   width="305",
   height="220"
%}

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies).
Browsers are restricting access to third-party cookies to make it more
difficult to track users across sites and improve user privacy. The
Attribution Reporting API allows ad techs measure conversations in a
privacy-preserving way, without third-party cookies.

In contrast to Attribution Reporting API's event-level reports, which associate
singular events (such as clicks or views) to [coarse
data](/docs/privacy-sandbox/glossary/#coarse-data), summary reports provide
aggregated data (such as the number of users who converted) attached to
detailed conversion data (such as what specific product the users purchased).

{% Aside 'key-term' %}
Ad techs [run an aggregation service](#aggregation-service) that processes
browser events. [Noise is
added](https://en.wikipedia.org/wiki/Additive_noise_mechanisms) to most data
points reported in the event, so that no single individual's data is
discoverable in a summary report.

_Aggregated data_ is noised values relevant to measuring conversions, such as the number of users who converted.
{% endAside %}

Unlike third-party cookies, report types from the Attribution Reporting API
don't allow any entity (such as ad tech, buyers, publishers, etc) to "see" a
user's browsing behavior across multiple sites, while still making it possible
to measure ad conversions.

## How is user data captured and aggregated?

{% Partial 'privacy-sandbox/feedback-aside.njk' %}

With the Attribution Reporting API, an individual user's detailed activity
across sites, and potentially the user's identity across sites, is kept
private to the user's browser on their device. This data can be collected in
an aggregatable report, and each report is encrypted to prevent various
parties from accessing the underlying data.

{% Aside 'key-term' %}
_Aggregatable reports_ are reports collected from individual users' browsers.
They detail cross-site user behavior and
[conversions](/docs/privacy-sandbox/glossary/#conversion), which are defined
by ad tech providers.
{% endAside %}

The proposed process to create a summary report is as follows:

1. Aggregatable reports are sent to the _reporting origin_, operated by an
   ad tech provider.
   *  These reports may include location details, number of clicks, value of
	 the conversion (such as a purchase price), or other metrics defined by the
	 ad tech provider. Reports are encrypted, so ad techs cannot see or access the
	 content of any individual report.
1. Once the ad tech reporting origin receives the aggregatable reports, the
   ad tech sends the reports to an [_aggregation service_](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATION_SERVICE_TEE.md).
   *  In our initial implementation, the [aggregation
      service](#aggregation-service) is operated by the ad tech provider
      with a trusted execution environment (TEE) hosted in the cloud. The
      _coordinator_ ensures that only verified entities have access to
      decryption keys and that no other intermediary (the ad tech, the cloud
      provider, or any other party) can access and decrypt sensitive data
      outside of the aggregation process.
1. The aggregation service combines the decrypted data and outputs a _summary
   report_ to the ad tech provider.
   *  The summary report includes a summary of the combined data. The ad tech
      provider can read and use the summary report.

<figure>
{% Img
   class="screehshot",
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/hoRtQVV2b2MCXIKi1okK.jpg", 
   alt="The proposed process to create a summary report is represented by encrypted reports sent to a collector server. The collector server sends the data to a secure aggregation service, which has a key to decrypt the data and create the summary report. The report is then sent back to the ad tech provider.",
   width="800", height="168"
%}
  <figcaption>
    For a full sequence diagram, refer to the
    <a href="/docs/privacy-sandbox/attribution-reporting-introduction/#aggregate-reports">Introduction to Attribution Reporting</a>.
  </figcaption>
</figure>

Because individual reports may contain cross-site user behavior information,
the aggregation service must treat this information as private. The service
will ensure that no other entity can get access to the individual, unencrypted
attribution reports. Further, the service itself should not perform any
privacy-invasive actions.

To ensure the aggregation service is in fact secure, the service must have
technical and organizational safeguards which are verifiable by consumer
audit. These safeguards are meaningful to:

*  Individual users, who can know their individual data can only be accessed
   in aggregate and not by any singular entity
*  Ad techs, who can verify that the aggregation process uses valid data and
   can be monitored appropriately

### Generate reports with the Aggregation Service {: #aggregation-service}

{% Aside 'key-term' %}
A _trusted execution environment_ is a special configuration of computer
hardware and software that allows external parties to verify the exact
versions of software running on the computer. TEEs allow external parties to
verify that the software does exactly what the software manufacturer claims it
does—nothing more or less.
{% endAside %}

[The initial
proposal](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATION_SERVICE_TEE.md)
asks each ad tech provider to operate their own instance of the aggregation
service, in a trusted execution environment (TEE) deployed on a cloud service
that supports needed security features.

{% Aside %}

You can [participate in an origin trial](/docs/privacy-sandbox/attribution-reporting-experiment/)
for Attribution Reporting with the aggregation service, which will initially
support local testing or testing in TEEs provided by Amazon Web Services. Read
detailed [setup instructions for the aggregation
service](https://github.com/google/trusted-execution-aggregation-service/#set-up-aggregation-service-for-aggregatable-reports).

In the future, we intend to add support for other cloud providers that meet the
aggregation service’s security requirements.
{% endAside %}

The TEE's code is the only place in the aggregation service which has access
to raw reports&mdash;this code will be auditable by security researchers,
privacy advocates, and ad techs. To confirm that the TEE is running the exact
approved software and that data remains secured,  the coordinator performs
attestation.

The coordinator has several responsibilities: 

*  Maintain a list of authorized binary images. These images are [cryptographic
   hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the
   aggregation service software builds, which Google will periodically
   release. This will be reproducible so that any party can verify the images
   are identical to the aggregation service builds.
*  Operate a key management system. Encryption keys are required for the
   Chrome on a user's device to encrypt aggregatable reports. Decryption keys
   are necessary for proving the aggregation service code matches the binary
   images.
*  Track the aggregatable reports to prevent reuse in aggregation for summary
   reports, as reuse may reveal personal identifying information (PII).

To make testing of the aggregation service available in an origin trial,
Google will play the role of the coordinator. Longer term, we are working to
identify one or more independent entities who can share this role.

### What information is captured?

Summary reports offer a combination of aggregated data alongside detailed
ad-side and conversion data.

For example, an ad tech provider runs an ad campaign on `news.example`, where a
conversion represents a user clicking an ad for shoes and completing a
purchase of shoes on `shoes.example`. The ad tech receives a summary report for
this ad campaign with ID `1234567`, which states there were **518**
conversions on shoes.example on **January 12, 2022**, with a total spend of
**$38,174**. **60%** of conversions were from users buying blue sneakers with
product SKU `9872` and **40%** were users who bought yellow sandals with
product SKU `2643`. The campaign ID is detailed ad-side data, while the
product SKUs are detailed conversion data. The number of conversions and total
spend are aggregated data.

Conversions are defined by the advertiser or ad tech company, and may be
different for different ad campaigns. One campaign could measure the number of
ad clicks that were followed by a user purchasing the advertised item. Another
campaign could measure how many ad views led to advertiser site visits.

### How is browser data captured before aggregation?

As summary reports are made up of the data from a group of individuals, let's
start with one individual's browser actions.

1. A user visits a publisher site and sees or clicks an ad, otherwise known as
   an attribution source event.
1. A few minutes or days later the user converts, otherwise known as an
   attribution trigger event. For example, a conversion can be defined as a
   product purchase.
   {% Img
      class="screehshot",
      src="image/VbsHyyQopiec0718rMq2kTE1hke2/oHfdWrzpCl2uAYcXQfU8.jpg",
      alt="",
      width="700",
      height="209"
   %}
1. The browser software matches the ad click or view with the conversion
   event. Based on this match, the browser creates an aggregatable report with
   specific logic created by an ad tech provider.
1. The browser encrypts this data and, after a small delay, sends it to an
   ad tech server for collection. The ad tech server must rely on an aggregation
   service to access the aggregated insights from these aggregatable reports.
   {% Img
      class="screehshot",
      src="image/VbsHyyQopiec0718rMq2kTE1hke2/gGKktJZoaKXTX4YG9udv.jpg",
      alt="",
      width="564",
      height="209"
   %}
   
## Create a summary report

For ad tech providers to retrieve a summary report, the following steps must be
taken:

1. The ad tech collects aggregatable reports from individual users' browsers.
   {% Aside %}
   Ad techs can only decrypt these reports in the aggregation service. The
   decrypted data is not available outside of the TEE.
   {% endAside %}
1. The ad tech provider batches the aggregatable reports and sends the batches
   to the aggregation service.
1. The aggregation service schedules a worker to aggregate the data.
   {% Aside %}
   Before the worker can aggregate, attestation is required from the ​​coordinator. If the worker passes attestation, the decryption keys will be provided.
   {% endAside %}
1. The aggregation worker decrypts and aggregates data from the aggregatable reports,
   along with noised data (a privacy mechanism for data).
1. The aggregation service returns the summary report to the ad tech provider.

The ad tech can use the summary report to inform bidding and to offer
reporting  to its own customers. A [JSON-encoded
scheme](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#aggregate-attribution-reports)
is the proposed format for summary reports.

{% Partial 'privacy-sandbox/ar-engage.njk' %}

## Find out more

*  Read the [Introduction to Attribution Reporting (Conversion
   Measurement)](/docs/privacy-sandbox/attribution-reporting-introduction/)
*  Read the [aggregation service
   explainer](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATION_SERVICE_TEE.md)
   and [detailed setup instructions](https://github.com/google/trusted-execution-aggregation-service/).
*  [Digging into the Privacy
   Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

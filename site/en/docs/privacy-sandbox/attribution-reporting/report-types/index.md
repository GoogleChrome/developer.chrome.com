---
layout: 'layouts/doc-post.njk'
title: 'Report types'
subhead: >
  Using the Attribution Reporting API you can generate two types of reports, event-level and summary reports. Learn how they differ, and the most common use cases for each.
description: >
  Using the Attribution Reporting API you can generate two types of reports, event-level and summary reports. Learn how they differ, and the most common use cases for each.
date: 2022-03-01
updated: 2023-03-14
authors:
  - maudn
  - alexandrawhite
---

<!-- content from https://developer.chrome.com/docs/privacy-sandbox/attribution-reporting/system-overview/ -->

The Attribution Reporting API allows you to generate two types of reports--event-level reports and summary reports.

_Event-level reports_ associate a particular ad click or view (on the ad side) with data on the conversion side. To preserve user privacy by limiting the joining of user identity across sites, conversion-side data is very limited, and the data is noisy (meaning that for a small percentage of cases, random data is sent instead of real reports).

_Summary reports_ are not tied to a specific event on the ad side. These reports offer more detailed conversion data and flexibility for joining click and view data with conversion data.

Both report types can be used simultaneously. They're complementary.

## Event-level reports

Event-level reports associate an ad click or view with coarse conversion data.

<figure class="screenshot">
 {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",
 alt="Event-level report", width="400", height="180" %}
 <figcaption>Example event-level report: Click ID 200400600 on <code>news.example</code> (attached to user ID Bob_Doe on <code>news.example</code>) has led to a purchase on <code>shop.example</code>.</figcaption>
</figure>

### Use cases

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

## Summary reports

Summary reports (formerly known as aggregate reports) offer more detailed
conversion data and more flexibility for joining click/view data and conversion data.

Learn more about [summary reports](/docs/privacy-sandbox/summary-reports/).

<figure>
 {% Img
   src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="Example of insights from summary reports.", width="400", height="180"%}
 <figcaption>Here's an example of insights from summary reports: CampaignID 1234567 on <code>news.example</code> has led to 518 conversions on <code>shoes.example</code>, and to a total spend of $38174. Half of the conversions were from users in NYC, USA.</figcaption>
</figure>

### Use cases

Summary reports are best suited for reporting use cases. These reports help
answer questions such as: "What is my return on investment?"

Usage of summary reports for optimization—for example, to optimize for a
purchase value, which is not supported by event-level reports (because the
conversion data is too coarse)—is an area of active research.


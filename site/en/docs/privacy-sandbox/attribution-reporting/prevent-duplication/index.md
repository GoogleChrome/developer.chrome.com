---
layout: 'layouts/doc-post.njk'
title: 'Prevent duplication in reports'
subhead: >
  Learn how to prevent duplicates in both event-level and aggregatable reports.
description: >
  Learn how to prevent duplicates in both event-level and aggregatable reports.
date: 2023-03-06
updated: 2023-07-21
authors:
  - maudn
---

At times you may notice a specific conversion counted more than once, or a report sent multiple times. In this page, we discuss how you can find duplicate reports, and how you can prevent duplicate conversions from being counted.

## Ignore reports you've already received

When the browser retries sending reports due to network unavailability, it may send the same report multiple times.
To mitigate this, upon receiving a report, check its `report_id`. If you've already received a report with that same `report_id`, ignore the report.

We recommend you check for duplicates of both event-level and aggregatable reports.

##  Instruct the browser to ignore specific conversions

Through an unexpected user flow, a conversion may be counted more than once. The following example describes how this can happen:

Let's assume a user mistakenly reloads the checkout completion page that includes the conversion pixel. By default, the page reload will trigger a second conversion and you'll get two reports.
But the user has only made one purchase. You can change this behavior to only see one conversion by deduplicating conversions.

You can read more about attribution logic in [Prioritize specific clicks, views, or conversions](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/).

### Deduplicate conversions in event-level reports

To deduplicate conversions for event-level reports, set a `deduplication_key` in your `Attribution-Reporting-Register-Trigger` header: 

```json
"event_trigger_data": [{
  ...
  "deduplication_key": "89796855"
}]
```

### Deduplicate conversions in aggregatable reports

The following sections describe deduplication keys and filters for deduplicating conversions in aggregatable reports.

#### Use aggregatable_deduplication_keys

You can set deduplication keys like so in your header:

```json
  "aggregatable_deduplication_keys": [
    {
      "deduplication_key": "1231232123123"
    },
  ]
```

Here, if this attribution trigger is matched to a source, then an aggregatable report is generated and has a deduplication key of `1231232123123`.

#### Use filters

You can also deduplicate aggregatable reports based on filter data.

You can make your deduplication key for aggregatable reports vary based on your filter configuration. This enables use cases such as deduplicating aggregatable reports based on conversion type, or based on any other information that can be used in filters.

This example illustrates the use of filters along with deduplication keys:

```json
  "aggregatable_deduplication_keys": [
    {
      "deduplication_key": "1231232123123",
      "filters": {"conversion_type": ["homepage_view", "productpage_view"]}
    },
    {
      "deduplication_key": "789789789789",
      "filters": {"conversion_type": ["purchase"]}
    }
  ]
```
In this example:

* If this trigger is matched to a conversion of type `homepage_view` or `productpage_view`, then an aggregatable report is generated and has a deduplication key of `1231232123123`.
* If this trigger is matched to a conversion of type `purchase`, then an aggregatable report is generated and has a deduplication key of `789789789789`.
* If multiple deduplication keys match the filter data, then the first matched one is used.

## Next steps

* Read more about filters in [Define custom rules using filters](/docs/privacy-sandbox/attribution-reporting/define-filters/).
* Read about changing the attribution logic in  [Prioritize specific clicks, views, or conversions](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/).

---
layout: 'layouts/doc-post.njk'
title: 'Prevent duplication in reports'
subhead: >
  Learn how to remove duplicates from both event-level and aggregatable reports.
description: >
  Learn how to remove duplicates from both event-level and aggregatable reports.
date: 2023-03-06
updated: 2023-07-21
authors:
  - maudn
---


## Ignore reports you've already received as an ad tech

When the browser retries sending reports due to network unavailability, it may send the same report multiple times.
To mitigate this:
* Upon receiving a report, check its `report_id`.
* Ignore the report if you've already received a report with that same `report_id`.


## Deduplicate conversions in event-level reports

To deduplicate conversions for event-level reports, set a `deduplication_key` in your `Attribution-Reporting-Register-Trigger` header: 

```json
"event_trigger_data": [{
  ...
  "deduplication_key": "89796855"
}]
```

## Deduplicate conversions in aggregatable reports

To deduplicate aggregatable reports, there are two properties you can use: `aggregatable_deduplication_keys` and filters.

### Use aggregatable_deduplication_keys

You can set deduplication keys like so in your header:

```json
  "aggregatable_deduplication_keys": [
    {
      "deduplication_key": "1231232123123"
    },
  ]
```

Here, if this attribution trigger is matched to a source, then an aggregatable report is generated and has a deduplication key of `1231232123123`.

### Use filters

You can also deduplicate aggregatable reports based on filter data.

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

Read more about filters in [Define custom rules using filters](/docs/privacy-sandbox/attribution-reporting/define-filters/).
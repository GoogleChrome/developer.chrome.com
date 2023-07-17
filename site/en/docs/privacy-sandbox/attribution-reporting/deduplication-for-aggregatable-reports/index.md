---
layout: 'layouts/doc-post.njk'
title: 'Remove duplicates from aggregatable reports'
subhead: >
  Remove duplicates from aggregatable reports.
description: >
  Remove duplication from aggregatable reports.
date: 2023-03-06
updated: 2023-07-06
authors:
  - maudn
---

{% Aside %}
**Dealing with duplicate reports** 

At times, you may receive the same report more than once because if the browser is offline and has to retry, it may end up sending a report multiple times.

You can find and ignore duplicate reports by checking their `report_id`.
Ignore a report if you've already received one with the same `report_id`.
{% endAside %}


There are two properties you can use for indicating duplicates to deduplicate aggregatable reports: `aggregatable_deduplication_keys` and filters.

## Using aggregatable_deduplication_keys

You can set deduplication keys like so in your header:

```json
  "aggregatable_deduplication_keys": [
    {
      "deduplication_key": "1231232123123",
    },
  ]
```

Here, if this attribution trigger is matched to a source, then an aggregatable report is generated and has a deduplication key of `1231232123123`.

## Using filters

You can also deduplicate aggregatable reports based on filter data.

This example illustrates the use of filters:

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
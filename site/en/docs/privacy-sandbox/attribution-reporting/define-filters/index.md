---
layout: 'layouts/doc-post.njk'
title: 'Define custom rules using filters'
subhead: >
  Filters let you define rules for a variety of actions including which conversions are reported.
description: >
  Filters let you define rules for a variety of actions including which conversions are reported.
date: 2022-03-01
updated: 2023-03-14
authors:
  - maudn
---

Filters are custom fields you can create and set in your registration header. Filters are flexible and have more uses than we will cover here, but here are just two ways they can be useful.

- Count conversions for a only a specific product category, and filter out conversions for other categories.
- Choose trigger data based on source event data. Because the bit limit for the trigger data is different depending on the source type with ad click having a limit of 7 and views having a limit of 1 bit, it can be convenient to dynamically assign the value of the trigger data depending on the source type.

## Declaring filters

1. In your source registration, add a new field `filter_data` to the `Attribution-Reporting-Register-Source` header .
1. In your trigger registration, add a top-level `filters` field, or define filters directly in the `event_trigger_data` field.

Source and trigger registration has additional optional functionality to both:

1. Selectively filter some triggers (effectively ignoring them)
1. Choose trigger data based on source event data

This can be done via simple extensions to the registration configuration.

<!-- from github https://github.com/WICG/attribution-reporting-api/blob/main/EVENT.md#optional-attribution-filters --> 

## Event-level reports

### Add filter to source registration

```json
{
  "source_event_id": "12345678",
  "destination": "https://toasters.example",
  "expiry": "604800000",
  "filter_data": {
    "conversion_subdomain": ["electronics.megastore", "electronics2.megastore"],
    "product": ["1234"]
    // Note that "source_type" will be automatically generated as
    // one of {"navigation", "event"}
  }
}
```

### Add filter to trigger registration

```json
{
  ... // existing fields, such as `event_trigger_data`

  // Note that "not_filters", which filters with a negation, is also supported.
  "filters": {
    "conversion_subdomain": ["electronics.megastore"],
    // Not set on the source side, so this key is ignored
    "directory": ["/store/electronics]"
  }
}
```

If keys in the `filters` dictionary match keys in the `filter_data` dictionary
and the intersection of their values is empty, the trigger is ignored.

Example: Given a "conversion_subdomain" key present in both `filter_data` and
`filters` dictionaries. If the values of the `filters`'s "conversion_subdomain"
key do not include "electronics.megastore" or "electronics2.megastore", the
trigger gets ignored.

Note: A key which is present in one dictionary and not the other will not be included in the matching logic (i.e. the trigger will be considered).

Note: A filter dictionary does not support nested dictionaries or lists. It is only allowed to have a list of values with string type.

The `event_trigger_data` field can also be extended to do selective filtering to set `trigger_data` based on `filter_data`:

```json
// Filter by the source type to handle different bit limits.
{
  "event_trigger_data": [
    {
      "trigger_data": "2",
      // Note that "not_filters", which filters with a negation, is also supported.
      "filters": {"source_type": ["navigation"]}
    },
    {
      "trigger_data": "1",
      "filters": {"source_type": ["event"]}
    }
  ]
}
```

`filter_data` must be a dictionary. `filters` can be a
dictionary or a list of filter dictionaries. When a list is received, only one dictionary has to match for the trigger to be considered.

```json
{
  "event_trigger_data": [
    {
      "trigger_data": "2",
      "filters": [
        {"product": ["1234"], "conversion_subdomain": ["electronics.megastore"]},  // OR
        {"product": ["4321"], "conversion_subdomain": ["electronics4.megastore"]}
      ]
    },
  ]
}
```

If the filters do not match for any of the event triggers, no event-level report will be created.

If the filters match for multiple event triggers, the first matching event trigger is used.


## Aggregatable reports

See [GitHub explainer](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATE.md#attribution-source-registration).

## Example code

- Use filters to attribute conversions only when the user converts on a specific product category by setting the filter on [source](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L143) and [trigger](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L288).
- Choose trigger data [based on source event data](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#optional-attribution-filters).  
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

Filters are custom fields you can create and set in your registration header. Filters are flexible and have more uses than we will cover here, but here are just two ways they can be useful:

- Only count conversions for a specific product category, and filter out conversions for other categories.
- Choose trigger data based on source event data because for event-level reports, the bit limit for the trigger data is different depending on the source type—ad click (0-7) or view (0 or 1). It can be convenient to dynamically assign the value of the trigger data depending on the source type.

## How to declare filters

On source registration, add a `filter_data` field to the `Attribution-Reporting-Register-Source` header. 

On trigger registration, add a `filters` field to the `Attribution-Reporting-Register-Trigger` header.

### Example code

- Use filters to attribute conversions only when the user converts on a specific product category. Set the filter on [source](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L143) and [trigger](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L288).
- [Choose trigger data based on source event data](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#optional-attribution-filters).  

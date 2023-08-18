---
layout: 'layouts/doc-post.njk'
title: 'Prioritize specific clicks, views, or conversions'
subhead: >
  Configure the API to prioritize specific sources or triggers.
description: >
  Configure the API to prioritize specific sources or triggers.
date: 2022-12-15
updated: 2023-06-29
authors:
  - maudn
---

## Prioritize specific clicks or views for event-level or aggregatable reports

Using source-side priorities, you can change the Attribution Reporting API's default behavior. By default, the attribution model  is last-touch, meaning that a conversion is attributed to the most recent matching source event. For both event-level and aggregatable reports you can tweak this behavior.

To change the default priority, add the `priority` key to your source registration header.

Set a higher priority for sources you wish to prioritize. Larger values denote a higher priority; for example, a source event with a `priority` of 2 takes precedence over a source with a `priority` of 1.

Only the report that matches the source event with the highest priority is sent.

### Example code

Change the attribution to select less recent sources (first click):

```javascript
const currentTimestamp = Date.now();
const priority = - currentTimestamp;

 res.set(
  'Attribution-Reporting-Register-Source',    
  JSON.stringify({
  // … all usual fields for that header
      priority: `${priority}`
    })
 );
```

## Prioritize specific conversions for event-level reports

Unlike source-side priorities, setting trigger-side priorities is only available for event-level reports.

Assume that a user clicks an ad and converts four times: they visit the advertiser site homepage, then visit a product page, sign up to the newsletter, and finally make a purchase.

But due to the three-report limit for clicks, by default all subsequent reports after the signup (third conversion) are dropped, including the purchase report. 

Instead, you can configure the API such that you receive reports for conversions that you consider more important; for example, the purchase report.

To do so, add the `priority` key to your [trigger registration header](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger/) and set a higher priority for conversions you want to prioritize. 

When an attribution is triggered for a given source event, if the maximum number of attributions (three for clicks, one for views) has been reached for this source the browser will:

* Compare the priority of the new report with the priorities of existing scheduled reports for that same source.

* Delete the report with the lowest priority to schedule the new report instead. If the new report is the one with the lowest priority, it is ignored and you won't receive it.

If no priorities are set, the browser falls back to its default behavior: any conversion happening after the third conversion for clicks or the first conversion for views is dropped.

Review the example code: [prioritize conversions of type checkout](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L215)


## Next steps

For information about setting sources and triggers, refer to:

- [Register attribution sources](/docs/privacy-sandbox/attribution-reporting/register-attribution-source/).
- [Register attribution triggers](/docs/privacy-sandbox/attribution-reporting/register-attribution-triggers/).

---
layout: 'layouts/doc-post.njk'
title: 'Contribution budget for summary reports'
subhead: >
  Learn about the role of the contribution budget for Attribution Reporting summary reports and how to allocate it to capture the data you need.  
description: >
  Learn about the role of the contribution budget for Attribution Reporting summary reports and how to allocate it to capture the data you need.  
date: 2022-03-01
updated: 2023-06-24
authors:
  - maudn
---

To protect user privacy, individual users' contributions must have an upper limit.

In practice, this works as follows: across all aggregatable values associated with a single source (ad click or view), no value can be higher than a certain cap. We refer to this value as the `CONTRIBUTION_BUDGET`.

## Contribution budget current value

In the [explainer](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md), the contribution budget is referred to as the L1 budget. L1 budget = `CONTRIBUTION_BUDGET`. 

At the time of this writing, `CONTRIBUTION_BUDGET = 2^16 = 65,536`.
The value of the contribution budget is arbitrary. What's important is that you can use this budget to maximize signal-to-noise ratio on the summary values. 

The contribution budget applies across all metrics on a single source event (ad click or view event). The sum of all aggregatable values associated with the conversion(s) attributed to a given ad click or view (source) should be under the budget.

## Implications of the hard cap

The contribution budget is a hard cap. Once the contribution budget is reached, no additional values are recorded. 

This has a few implications. For example:

- For the same ad click or view (source), the sum of all aggregatable values across all conversions should be at most 65,536 (`CONTRIBUTION_BUDGET`). If, for a given ad click or view, all the contribution budget is spent on the first five conversions, and a sixth conversion happens, that one won't generate a report.
- For a single conversion event (trigger), the adtech company can register an aggregatable value of at most 65,536 (`CONTRIBUTION_BUDGET`). If the aggregatable value for that single conversion exceeds this budget, the aggregatable report is not created.
- For a single conversion event (trigger), the adtech company can register multiple aggregatable values, and their sum should be at most 65,536 (`CONTRIBUTION_BUDGET`). If the sum of all aggregatable values for that single conversion exceeds this budget, the aggregatable report is not created.

## Tips for success

These tips will help you work successfully with the contribution budget.

- Ensure your values are strictly within the contribution budget to not lose any information, since the budget is a hard cap. 
- Allocate the contribution budget across metrics. Because the budget is common to all metrics for a given source, if more than one metric is tracked, you should share the budget across these metrics.

- If you're tracking two metrics—for example, the purchase value and the purchase count—you would split the contribution budget across these two metrics. More details can be found [in the example](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/view#heading=h.i6ovl4dm1npa).

- Adjust aggregatable values to minimize the impact of noise. Because the contribution budget impacts noise, adjusting the aggregatable values to this budget will allow you to improve signal-to-noise ratio. Read the details in [Scale up to contribution budget](/docs/privacy-sandbox/attribution-reporting/working-with-noise/#scale-up-to-contribution-budget). <!-- working with noise -->

{% Partial 'privacy-sandbox/ar-engage.njk' %}

## Next steps

- For more details on working with the contribution budget, refer to [Scale up to contribution budget](/docs/privacy-sandbox/attribution-reporting/working-with-noise/#scale-up-to-contribution-budget).
- For a review of other Attribution Reporting concepts, refer to [Attribution Reporting system overview](/docs/privacy-sandbox/attribution-reporting/system-overview/).

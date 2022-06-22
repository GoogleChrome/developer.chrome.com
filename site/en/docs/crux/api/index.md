---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX API

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Information about the CrUX API, use cases and sample queries

# Optional
# This appears below the title and is an optional teaser
subhead: >
  Information about the CrUX API, use cases and sample queries

# Required
date: 2022-04-01

# Optional
# Include an updated date when you update your post
updated: 2020-10-16

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - simonhearne

# Optional
# How to a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - performance
---

The Chrome UX Report API gives low-latency access to aggregated Real User Metrics (RUM) from the Chrome User Experience Report.

## Common use case

The Chrome UX Report API allows for the querying of user experience metrics for a specific URI like "Get metrics for the `https://example.com` origin."

## Data model

### Record

A discrete piece of information about a page, or site. A record can have data that is specific for an identifier and for a specific combination of dimensions. A record can contain data for one or more metrics.

### Identifiers

Identifiers specify what records should be looked up. In the Chrome UX Report these identifiers are webpages and websites.

### Origin

When the identifier is an origin all data present for all pages in that origin are aggregated together. For example, say the http://www.example.com origin had pages as laid out by this sitemap:

```
http://www.example.com
http://www.example.com/foo.html
http://www.example.com/bar.html
```

This would mean that when querying the Chrome UX Report with the origin set to `http://www.example.com`, data for `http://www.example.com/`, `http://www.example.com/foo.html`, and `http://www.example.com/bar.html` would be returned because those are all pages under that origin.

### URLs

When the identifier is a url only data for that specific url will be returned. Looking again to the `http://www.example.com` origin sitemap:

```
http://www.example.com
http://www.example.com/foo.html
http://www.example.com/bar.html
```

If the identifier is set to url with the value of `http://www.example.com/foo.html`, only data for that page will be returned.

### Dimensions

Dimensions identify a specific group of data that a record is being aggregated against, e.g. a form factor of Mobile indicates that the record contains information about loads that took place on a mobile device. Each dimension will have a certain number of values, and implicitly the lack of specifying that dimension will mean that the dimension is aggregated over all values. For example, specifying no form factor indicates that record contains information about loads that took place on any form factor.

#### Form Factor

The device class that the end-user used to navigate to the page. This is a general class of device split into `Phone`, `Tablet`, and `Desktop`.

### Metric

See [metrics]() for more info about the kinds of metrics included in the CrUX dataset.

Metrics are expressed in a histogram, which represents the percent of users that experienced a metric with that value proportionally to all.

A simple three bin histogram for metric "ExampleMetric" looks like this.

```
{
  "histogram": [
    {
      "start": 0,
      "end": 1000,
      "density": 0.38179089544772343
    },
    {
      "start": 1000,
      "end": 3000,
      "density": 0.49904952476238057
    },
    {
      "start": 3000,
      "density": 0.11915957978989571
    }
  ],
}
```

This data indicates that 38.2% of users experience an ExampleMetric value between 0ms and 1000ms. The units of ExampleMetric are not contained in this histogram, in this case we will assume milliseconds.

Additionally, 49.9% of users experience an ExampleMetric value between 1000ms and 3000ms, and 11.9% of users experience an ExampleMetric value greater than 3000ms.

Metrics will also contain percentiles that can be useful for additional analysis.

```
{
  "percentiles": {
    "p75": 2063
  },
}
```

These percentiles can show specific metric values at the given percentile for that metric. They are based off the full set of available data and not the final binned data, so they do not necessarily match an interpolated percentile that is based off the final binned histogram.

{% Aside %}
Note: The values for each percentile are synthetically derived, it does not imply that any user actually experienced the value indicated, only that some percentage of users experienced a metric value that was less than the value given.
{% endAside %}

### Metric value types

| CrUX API Metric Name     | Data Type                | Metric Units | web.dev Docs                         |
|--------------------------|--------------------------|--------------|--------------------------------------|
| first_contentful_paint   | int                      | milliseconds | [fcp](https://web.dev/fcp/)          |
| largest_contentful_paint | int                      | milliseconds | [lcp](https://web.dev/lcp/)          |
| cumulative_layout_shift  | double encoded as string | unitless     | [cls](https://web.dev/cls/)          |
| first_input_delay        | int                      | milliseconds | [fid](https://web.dev/fid/)          |

### BigQuery metric name mapping

| CrUX API Metric Name     | BigQuery Metric Name                       |
|--------------------------|--------------------------------------------|
| first_contentful_paint   | first_contentful_paint                     |
| largest_contentful_paint | largest_contentful_paint                   |
| cumulative_layout_shift  | layout_instability.cumulative_layout_shift |
| first_input_delay        | first_input.delay                          |

## Data pipeline

### The rolling average

The data in the Chrome UX Report is a 28-day rolling average of aggregated metrics. This means that the data presented in the Chrome UX Report at any given time is actually data for the past 28 days aggregated together.

This is similar to how the [CrUX dataset on BigQuery](https://developers.google.com/web/tools/chrome-user-experience-report/bigquery/getting-started) aggregates monthly reports.

### Daily updates

Data is updated daily around 04:00 UTC. There is no SLO for update times; it is run on a best effort basis everyday.

{% Aside 'caution' %}
Caution: Data will not differ within the same day, repeated calls will yield the same results.
{% endAside %}

---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX on BigQuery

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Learn how the CrUX dataset on BigQuery is structured.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  Learn how CrUX data is structured on BigQuery.

# Required
date: 2022-06-23

# Optional
# Include an updated date when you update your post
updated: 2023-05-10

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
# authors:

# Optional
# How to a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - web-vitals
  - crux
---

## Introduction

The raw data behind the Chrome UX Report (CrUX) is available on [BigQuery](https://cloud.google.com/bigquery/), a database hosted on the Google Cloud Platform (GCP).

CrUX on BigQuery allows users to directly query the full dataset going back to 2017, for example to analyze trends, compare web technologies and benchmark domains.

The data is structured by monthly release, as well as a number of summary tables to provide simple access for querying the data. These are documented further below.

The BigQuery data is the basis of the [CrUX Dashboard](/docs/crux/dashboard/), which allows you to visualize this data without writing SQL queries.

## Accessing the dataset in GCP

Using BigQuery requires a [GCP project](https://cloud.google.com/) and basic knowledge of SQL. The [CrUX dataset on BigQuery](https://console.cloud.google.com/bigquery?p=chrome-ux-report&d=all&page=dataset) is free to access and explore up to the limits of the [free tier](https://cloud.google.com/bigquery/pricing#queries), which is renewed monthly and provided by BigQuery. Additionally, new GCP users may be eligible for a [signup credit](https://cloud.google.com/free/docs/frequently-asked-questions#free-trial) to cover expenses beyond the free tier. Note that a credit card must be provided for the GCP project, see [Why do I need to provide a credit card?](https://cloud.google.com/free/docs/frequently-asked-questions#why-credit-card).

If this is your first time using BigQuery then follow below steps to set up a project:
1. Navigate to [Google Cloud Platform](https://console.cloud.google.com/projectcreate).
2. Click **Create a Project**.
3. Give your new project a name like “My Chrome UX Report” and click Create.
4. Provide your billing information if prompted.
5. Navigate to the [CrUX dataset on BigQuery](https://console.cloud.google.com/bigquery?p=chrome-ux-report&d=all&page=dataset)

Now you’re ready to start querying the dataset.

{% Aside %}
For example queries see the [getting started guide](/blog/chrome-ux-report-bigquery/).
{% endAside %}

## Project organization

CrUX data on BigQuery is released on the second Tuesday of the following month. Each month is released as a new table under `chrome-ux-report.all`. There are also a number of materialized tables which provide summary statistics for each month.

- chrome-ux-report
    - all
        - [YYYYMM](#schema_raw_tables)
    - country_CC
        - [YYYYMM](#schema_raw_tables)
    - [experimental](#schema_experimental)
        - [country](#schema-experimental-country)
        - [global](#schema-experimental-global)
    - [materialized](#schema_summary)
        - [country_summary](#schema_country_summary)
        - [device_summary](#schema_device_summary)
        - [metrics_summary](#schema_metrics_summary)
        - [origin_summary](#schema_origin_summary)

## Detailed table schema

### Raw tables {: #schema_raw_tables}

The raw tables for each country and the `all` dataset have the following schema:

- `origin`
- effective_connection_type
- form_factor
- first_paint
- first_contentful_paint
- largest_contentful_paint
- dom_content_loaded
- onload
- first_input
    - delay
- layout_instability
    - cumulative_layout_shift
- interaction_to_next_paint
- experimental
    - permission
        - notifications
    - time_to_first_byte
    - interaction_to_next_paint (deprecated)
    - popularity

{% Aside 'important' %}
The `interaction_to_next_paint` metric is available both with and without the experimental prefix. The experimental prefix should now be considered deprecated and will be removed in August 2023. The non-prefixed schema should be used going forward.
{% endAside %}

## Materialized table schema {: #schema-materialized }

Materialized tables are provided for easy access to summary data by a number of key dimensions. No histograms are provided, instead performance data is aggregated into fractions by performance assessment and the 75th percentile value. A set of example rows from the `metrics_summary` table are shown below as an example:

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>yyyymm</th>
<th>origin</th>
<th>fast_lcp</th>
<th>avg_lcp</th>
<th>slow_lcp</th>
<th>p75_lcp</th>
</tr>
</thead>
<tbody>
<tr>
<td>202204</td>
<td>https://example.com</td>
<td>0.9056</td>
<td>0.0635</td>
<td>0.0301</td>
<td>1600</td>
</tr>
<tr>
<td>202203</td>
<td>https://example.com</td>
<td>0.9209</td>
<td>0.052</td>
<td>0.0274</td>
<td>1400</td>
</tr>
<tr>
<td>202202</td>
<td>https://example.com</td>
<td>0.9169</td>
<td>0.0545</td>
<td>0.0284</td>
<td>1500</td>
</tr>
<tr>
<td>202201</td>
<td>https://example.com</td>
<td>0.9072</td>
<td>0.0626</td>
<td>0.0298</td>
<td>1500</td>
</tr>
</tbody>
</table></div>

This shows that in the 202204 dataset, 90.56% of real-user experiences on `https://example.com` met the criteria for [good LCP](https://web.dev/defining-core-web-vitals-thresholds/#refresher:-core-web-vitals-metrics-and-thresholds), and that the coarse 75th percentile LCP value was 1,600ms. This is slightly slower than previous months.

Four materialized tables are provided:

[`metrics_summary`](#schema-metrics-summary)
 : key metrics by month and origin

[`device_summary`](#schema-device-summary)
 : key metrics by month, origin and device type

[`country_summary`](#schema-country-summary)
 : key metrics by month, origin, device type and country

[`origin_summary`](#schema-origin-summary)
 : a list of all origins included in the dataset

### metrics_summary {: #schema-metrics-summary }

The `metrics_summary` table contains summary statistics for each origin and each monthly dataset:

`yyyymm`
 : Month of the data collection period

`origin`
 : URL of the site origin

`rank`
 : Coarse popularity ranking (as of [March 2021](/docs/crux/release-notes/#202103))

`[small|medium|large]_cls`
 : fraction of traffic by CLS thresholds

`[fast|avg|slow]_<metric>`
 : fraction of traffic by performance thresholds

`p75_<metric>`
 : 75th percentile value of performance metrics (milliseconds)

`notification_permission_[accept|deny|ignore|dismiss]`
 : fraction of notification permission behaviors

`[desktop|phone|tablet]Density`
 : fraction of traffic by form factor

`[_4G|_3G|_2G|slow2G|offline]Density`
 : fraction of traffic by effective connection type

### device_summary {: #schema-device-summary }

The `device_summary` table contains aggregated statistics by month, origin, country and device. In addition to the `metrics_summary` columns there is:

`device`
 : Device [form factor](/docs/crux/methodology/#form-factor-dimension)

### country_summary {: #schema-country-summary }

The `country_summary` table contains aggregated statistics by month, origin, country and device. In addition to the `metrics_summary` columns there is:

`country_code`
 : [Two-letter country code](/docs/crux/methodology/#country-dimension)

`device`
 : Device [form factor](/docs/crux/methodology/#form-factor-dimension)

### origin_summary {: #schema-origin-summary }

The `origin_summary` table contains a list of all origins in the CrUX dataset; it is updated monthly with the latest list of origins in the dataset and has a single column: `origin`.

## Experimental dataset {: #schema-experimental }

Tables in the experimental dataset are exact copies of the default `YYYYMM` tables, but they make use of newer and more advanced BigQuery features like [partitioning](https://cloud.google.com/bigquery/docs/partitioned-tables) and [clustering](https://cloud.google.com/bigquery/docs/clustered-tables) that enable you to write faster, simpler, and cheaper queries.

### Country {: #schema-experimental-country }

The `experimental.country` dataset contains aggregated data from the `country_CC` datasets with an additional `yyyymm` column for the dataset date. The schema is identical to [raw tables](#schema_raw_tables) with the addition of the date and `country_code` columns, allowing for country-level comparison over time queries to be executed without joining the monthly tables.

### Global {: #schema-experimental-global }

The `experimental.global` dataset contains aggregated data from the `all` dataset with an additional `yyyymm` column for the dataset date. The schema is identical to [raw tables](#schema_raw_tables) with the addition of the date, allowing for comparison over time queries to be executed without joining the monthly tables.

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
  CrUX data can be accessed via BigQuery. Learn more about data structure and example queries.

# Required
date: 2022-06-01

# Optional
# Include an updated date when you update your post
# updated: 2020-10-16

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

## Introduction

The raw data behind the Chrome UX Report (CrUX) is available on [BigQuery](https://cloud.google.com/bigquery/), a database hosted on the Google Cloud Platform (GCP).

CrUX on BigQuery allows users to directly query the full dataset going back to 2017, for example to analyze trends, compare web technologies and benchmark domains.

The data is structured by monthly release, as well as a number of summary tables to provide simple access for querying the data. These are documented further below.

Using BigQuery requires a [GCP project](https://developers.google.com/web/tools/chrome-user-experience-report/getting-started#getting-started) and basic knowledge of SQL. The CrUX dataset on BigQuery is free to access and explore up to the limits of the [free tier](https://cloud.google.com/bigquery/pricing#queries), which is renewed monthly and provided by BigQuery. Additionally, new GCP users may be eligible for a [signup credit](https://cloud.google.com/free/docs/frequently-asked-questions#free-trial) to cover expenses beyond the free tier. Note that a credit card must be provided for the GCP project, see [Why do I need to provide a credit card?](https://cloud.google.com/free/docs/frequently-asked-questions#why-credit-card).

{% Aside %}
For example queries see the [getting started guide on web.dev](https://web.dev/chrome-ux-report-bigquery/).
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

### Raw Tables {: #schema_raw_tables}

The raw tables for each country and the `all` dataset have the following schema:

- origin
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
- experimental
  - permission
    - notifications
  - time_to_first_byte
  - responsiveness
  - popularity

## Materialized table schema {: #schema-materialized }

Materialized tables are provided for easy access to summary data by a number of key dimensions. No histograms are provided, instead performance data is aggregated into fractions by performance assessment and the 75th percentile value. A set of example rows from the `metrics_summary` table are shown below as an example:

| yyyymm | origin              | fast_lcp | avg_lcp | slow_lcp | p75_lcp |
|--------|---------------------|----------|---------|----------|---------|
| 202204 | https://example.com | 0.9056   | 0.0635  | 0.0301   | 1600    |
| 202203 | https://example.com | 0.9209   | 0.052   | 0.0274   | 1400    |
| 202202 | https://example.com | 0.9169   | 0.0545  | 0.0284   | 1500    |
| 202201 | https://example.com | 0.9072   | 0.0626  | 0.0298   | 1500    |

This shows that in the 202204 dataset over 90% of experiences on `https://example.com` met the criteria for good LCP ([less than 2,500ms](https://web.dev/defining-core-web-vitals-thresholds/#refresher:-core-web-vitals-metrics-and-thresholds)), and that the coarse 75th percentile LCP value was 1,600ms. This is slightly slower than previous months.

Four materialized tables are provided:

- [`metrics_summary`](#schema-metrics-summary) - key metrics by month and origin
- [`device_summary`](#schema-device-summary) - key metrics by month, origin and device type
- [`country_summary`](#schema-country-summary) - key metrics by month, origin, device type and country
- [`origin_summary`](#schema-origin-summary) - a list of all origins included in the dataset

### metrics_summary {: #schema-metrics-summary }

The `metrics_summary` table contains summary statistics for each origin and each monthly dataset:

- `yyyymm`
- `origin`
- `rank` (as of [March 2021](../release-notes/#202103))
- `[small|medium|large]_cls` - fraction of traffic by CLS thresholds
- `[fast|avg|slow]_<metric>` - fraction of traffic by performance thresholds
- `p75_<metric>` - 75th percentile value of performance metrics (ms)
- `notification_permission_[accept|deny|ignore|dismiss]` - fraction of notification permission behaviors
- `[desktop|phone|tablet]Density` - fraction of traffic by form factor
- `[_4G|_3G|_2G|slow2G|offline]Density` - fraction of traffic by effective connection type

### device_summary {: #schema-device-summary }

The `device_summary` table contains aggregated statistics by month, origin, country and device. In addition to the `metrics_summary` columns there is:

- [`device`](../methodology/#form-factor-dimension)

### country_summary {: #schema-country-summary }

The `country_summary` table contains aggregated statistics by month, origin, country and device. In addition to the `metrics_summary` columns there is:

- [`country_code`](../methodology/#country-dimension)
- [`device`](../methodology/#form-factor-dimension)

### origin_summary {: #schema-origin-summary }

The `origin_summary` table contains a list of all origins in the CrUX dataset; it is updated monthly with the latest list of origins in the dataset and has a single column: `origin`.

## Experimental dataset {: #schema-experimental }

Experimental datasets are aggregated from the raw data to provide simpler queries for specific use cases.

### Country {: #schema-experimental-country }

The `experimental.country` dataset contains aggregated data from the `country_CC` datasets with an additional `yyyymm` column for the dataset date. The schema is identical to [raw tables](#schema_raw_tables) with the addition of the date and `country_code` columns, allowing for country-level comparison over time queries to be executed without joining the monthly tables.

### Global {: #schema-experimental-global }

The `experimental.global` dataset contains aggregated data from the `all` dataset with an additional `yyyymm` column for the dataset date. The schema is identical to [raw tables](#schema_raw_tables) with the addition of the date, allowing for comparison over time queries to be executed without joining the monthly tables.

## Support

Questions about particular queries can be posted to [chrome-ux-report](https://stackoverflow.com/questions/tagged/chrome-ux-report) on Stack Overflow. General questions about the dataset can be posted to the [CrUX Discuss Google group](https://groups.google.com/a/chromium.org/g/chrome-ux-report). Informal questions can be addressed to our Twitter account at [@ChromeUXReport](https://twittter.com/ChromeUXReport). Observations about the data can be shared on the [HTTPArchive Discussion Forum](https://discuss.httparchive.org/). BigQuery specific support is provided through [GCP Support](https://console.cloud.google.com/support).

---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: Release notes

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Details on the latest changes to the CrUX dataset.

# Optional
# This appears below the title and is an optional teaser
subhead:

# Required
date: 2017-10-01

# Optional
# Include an updated date when you update your post
updated: 2023-07-11

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

The CrUX dataset on BigQuery is updated on the second Tuesday of every month. Each release is numbered according to the year and calendar month of the data collection period, for example 201912 corresponds to the UX data collected during December 2019 and would be released on the second Tuesday of January 2020 after the data collection period has ended.

In the list below, we've curated some release notes for each monthly dataset. Subscribe to our [CrUX Announce](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report-announce) mailing list or follow [@ChromeUXReport](https://twitter.com/ChromeUXReport) on Twitter for release Announcements.
The CrUX dataset on BigQuery is generally updated on the second Tuesday of every month. Each release is numbered according to the year and calendar month of the data collection period, for example 201912 corresponds to the UX data collected during December 2019 and would be released on the second Tuesday of January 2020 after the data collection period has ended.

In the list below, we've curated some release notes for each monthly dataset. Subscribe to our [CrUX Announce](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report-announce) mailing list or follow [@ChromeUXReport](https://twitter.com/ChromeUXReport) on Twitter for release Announcements.

## 202306

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/AaW8rohYfHk)

Publication date
 : Jul 11, 2023

What's new

I am pleased to say that we have finally made progress on the long-standing root page redirect issue [mentioned last month](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/13hl37E28RE). Some origins which redirect their root page, and were therefore excluded from CrUX due to our lack of handling this properly, should now start to be included again from this month. Please note that some origins are still being resolved so not all origins are in this month's dataset. However, it is great that we have made some good progress on this now and we hope to have the issue fully resolved in the near future.

This is the last month that the INP metric is guaranteed to be available in the CrUX BigQuery, API, and History API both with and without the experimental prefix. We encourage users to move to the non-prefixed field as the experimental prefix fields should now be considered deprecated and will be removed in 30 days.

Notable stats
 : - 18,065,718 origins
 : - 44.1% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202305

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/13hl37E28RE)

Publication date
 : Jun 13, 2023

What's new

We're seeing a slight decrease again this month for LCP and FCP due to the final roll outs of the [change in LCP to ignore low-entropy images](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_04_lcp.md) and [correction in paint timing](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_03_lcp_fcp.md) discussed last month. However, despite this, the overall good LCP, FID, and CLS rates are up slightly from last month.

We are aware that some origins that redirect their root page (for example, https://www.example.com that automatically redirects to https://www.example.com/en/) are not showing origin-level data in CrUX, and so are also not appearing in the BigQuery dataset. We're also aware that this has been going on for some time. Unfortunately, this is proving a difficult issue to resolve and so we still do not have an estimated time of when this will be resolved.

Notable stats
 : - 18,377,791 origins
 : - 43.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202304

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/_1ja3Bg-3Ow)

Publication date
 : May 10, 2023

What's new

We’re seeing a slight decrease in pass rates for the Core Web Vitals, especially for LCP due in part to [a change in LCP to ignore low-entropy images](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_04_lcp.md). We also see a decrease in FCP pass rates [due to correction in paint timing](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_03_lcp_fcp.md) (which also affects LCP but to a lesser extent).

On a more positive note [INP](https://web.dev/inp/) continues to improve with a further improvement of 0.2%. This is especially important as we are [moving this metric from an Experimental metric to a Pending metric](https://web.dev/inp-cwv/), and it will join the reset of the Core Web Vitals next year.

From this release, the INP metric is available in the [CrUX BigQuery](/docs/crux/bigquery/), [API](/docs/crux/api/), and [History API](/docs/crux/history-api/) both with and without the experimental prefix. We encourage users to move to the non-prefixed field as the experimental prefix fields should now be considered deprecated and will be removed in 90 days.

Notable stats
 : - 18,406,973 origins
 : - 43.5% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202303

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/1hHxnk9ZOCk)

Publication date
 : Apri 11, 2023

Notable stats
 : - 18,495,210 origins
 : - 44.2% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202302

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/1im_J9824AU)

Publication date
 : March 14, 2023

What's new
 : - We're seeing further improvements to the good [INP](https://web.dev/inp) rate which has increased by 2.3% to 77.3% of origins due to [the improvement in the Chrome scheduler](https://bugs.chromium.org/p/chromium/issues/detail?id=853771) mentioned last month, which was still rolling out during February.

Notable stats
 : - 18,184,396 origins
 : - 43.1% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202301

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/ImlvxIZ8Jss)

Publication date
 : February 14, 2023

What's new
 : - Good [INP](https://web.dev/inp) increased by 4.3% to 75.6% of origins, primarily due to [an improvement in the Chrome scheduler](https://bugs.chromium.org/p/chromium/issues/detail?id=853771). The next frame is now scheduled with highest priority after discrete input events, which shortens the lag between input event and visual update.
 : - This month we've launched a [CrUX History API](/docs/crux/history-api/), which provides 25 weeks of historical data at both origin and URL level. We've [written a post](/blog/chrome-ux-report-history-api/) detailing how to use this new API, and a [Colab](https://colab.sandbox.google.com/github/GoogleChrome/CrUX/blob/main/colab/crux-history-api.ipynb) showing you an example of how to plot this historical data in various graphs.

Notable stats
 : - 18,203,637 origins
 : - 43.0% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202212

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/T0TDE_VCWTE)

Publication date
 : January 10, 2023

What's new
 : - No significant updates in this release.

Notable stats
 : - 16,824,271 origins
 : - 41.8% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202211

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/-LcubQclVAg)

Publication date
 : December 13, 2022

What's new
 : - No significant updates in this release.

Notable stats
 : - 17,618,944 origins
 : - 41.8% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202210

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/DmTmMHll7_o)

Publication date
 : November 8, 2022

What's new
 : - In this release we have further broken down our "rank" popularity. Previously these were in groupings of log 10 (i.e. top 1,000 sites, top 10,000, top 100,000 sites, … up to top 100 million sites). From this release these are provided in half-rank steps (i.e. top 1,000 sites, top 5,000 sites, top 10,000, top 50,000 sites, top 100,000 sites, top 500,000 sites… up to top 100 million sites). The top rank (1,000) will not be altered with this change (i.e. we are not providing a top 500 rank).

Notable stats
 : - 17,637,195 origins
 : - 41.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202209

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/lH-zHX-ao4E)

Publication date
 : October 11, 2022

What's new
 : - The CrUX API now includes `collectionPeriod` object showing what day's data is included in the response as shown below. More details in the [CrUX API docs](./api/#collection-period).

```json
    "collectionPeriod": {
      "firstDate": {
        "year": 2022,
        "month": 9,
        "day": 12
      },
      "lastDate": {
        "year": 2022,
        "month": 10,
        "day": 9
      }
    }
```

Notable stats
 : - 17,715,277 origins
 : - 41.4% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202208

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/xKHFbog7-9w)

Publication date
 : September 13, 2022

Notable stats
 : - 16,754,655 origins
 : - 40.7% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202207

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/N5B3F9QVOmY)

Publication date
 : August 09, 2022

What's new
 : - This release includes a change which records the CLS metric when the tab is backgrounded in addition to tab close. See the [CLS changelog](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2021_11_cls.md) for details.
 : - We have identified a bug in our origin filtering which unfortunately affects a small number of origins, including some popular ones, which are missing from this release. We hope to get this fixed for future releases.

Notable stats
 : - 16,190,453 origins
 : - 40.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202206

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/_DiKAAqqKPE)

Publication date
 : July 13, 2022

What's new
 : - The number of origins covered by the CrUX dataset increases once again in this release due to the optional dimensions feature introduced in the previous release. We expect the size to be much more stable from here. Please see the [announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/_DiKAAqqKPE) as well.

Notable stats
 : - 16,230,572 origins
 : - 41.3% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202205

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/A_LAY_lYxQk)

Publication date
 : June 14, 2022

What's new
 : - The percentage of origins having good LCP experiences increased this month by 2.4%, thanks in large part to an improvement in the [performance of Chrome on Android](https://blog.chromium.org/2022/03/a-new-speed-milestone-for-chrome.html#:~:text=Chrome%20continues%20to%20get%20faster%20on%20Android%20as%20well.%20Loading%20a%20page%20now%20takes%2015%25%20less%20time%2C%20thanks%20to%20prioritizing%20critical%20navigation%20moments%20on%20the%20browser%20user%20interface%20thread.). This was a major contributing factor to the percentage of origins having good Core Web Vitals increasing by 2.1%.
 : - With this release, CrUX records no longer require effective connection type and form factor, so we're including data for which these fields are `NULL`, indicating all effective connection types or form factors, respectively. This allows us to increase origin coverage by 28.2%.
 : - An unrelated issue with our data pipeline prevents us from adding new origins in this release, so we're only including origins for which we published data in the previous 6 months. Due to this, `experimental.popularity.rank` has some gaps, e.g. there are only 904 origins in the top 1,000. This is unique to the 202205 release and should be fixed next month.

Notable stats
 : - 11,024,795 origins
 : - 42% of origins have good Core Web Vitals

## 202204

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/v-h5gKkUEE0)

Publication date
 : May 3, 2022

What's new
 : - This release includes `experimental.interaction_to_next_paint`, our updated responsiveness metric.
 : - `experimental_interaction_to_next_paint` in the CrUX API, with thresholds 200ms and 500ms.
 : - `experimental_time_to_first_Byte` in the CrUX API, with thresholds 800ms and 1800ms.

Notable stats
 : - 8,602,902 origins
 : - 41.2% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202203

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/kiuJANLYwYQ)

Publication date
 : April 12, 2022

What's new
 : - No significant updates in this release.

Notable stats
 : - 8,555,307 origins
 : - 39.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202202

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/F7S4_emZkcw)

Publication date
 : March 8, 2022

What's new
 : - This release includes `experimental.responsiveness`, our candidate for the new responsiveness metric. See [web.dev/responsiveness/](https://web.dev/responsiveness/) for details.

Notable stats
 : - 8,764,246 origins
 : - 39.0% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202201

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/n7aPXCGtjPA)

Publication date
 : February 8, 2022

What's new
 : - No significant updates in this release.

Notable stats
 : - 8,934,350 origins
 : - 37.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202112

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/rGrZuEZTbTM)

Publication date
 : January 11, 2022

What's new
 : - No significant updates in this release.

Notable stats
 : - 8,398,796 origins
 : - 35.0% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202111

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/yXLokgqHBj8)

Publication date
 : December 14, 2021

What's new
 : - We've removed the old CLS metric: `experimental.uncapped_cumulative_layout_shift` is no longer in this BigQuery release, and CrUX API no longer serves `experimental_uncapped_cumulative_layout_shift`. Use the current CLS metric instead.
 : - An LCP fix rolled out with M96.

Notable stats
 : - 8,733,078 origins
 : - 34.8% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202110

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/T5u0UPzOqjg)

Publication date
 : November 9, 2021

What's new
 : - No significant updates in this release.

Notable stats
 : - 8,784,894 origins
 : - 34.1% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202109

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/zPCVi-TEguk)

Publication date
 : October 12, 2021

What's new
 : - There was a [change to FCP](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2021_07_fcp.md) in Chrome that ignores content with a style of opacity:0, increasing the user-perceived accuracy of the metric. Read more about it in the Chrome Speed change log.

Notable stats
 : - 8,660,068 origins
 : - 32.8% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202108

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/GNkuNGVNaCA)

Publication date
 : September 14, 2021

What's new
 : - No significant updates in this release.

Notable stats
 : - 8,431,699 origins
 : - 31.3% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202107

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/4rkDpuzInmA)

Publication date
 : August 10, 2021

What's new
 : - No significant updates in this release.

Notable stats
 : - 8,174,923 origins
 : - 30.4% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202106

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/CvHQXQBbStA)

Publication date
 : July 13, 2021

What's new
 : - [Changes to the FID metric](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2021_05_fid.md) took effect in Chrome 91, resulting in improved FID experiences involving double-tap-to-zoom on mobile.

Notable stats
 : - 8,416,608 origins
 : - 30.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202105

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/tjakkbenFZo)

Publication date
 : June 8, 2021

Notable stats
 : - 8,411,670 origins
 : - 29.23% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

Notable Changes
 : - The BigQuery update 202105 includes the same CLS and LCP updates that we released on June 1 for the CrUX API (see below). The previous CLS metric will be available for a limited time as `experimental.uncapped_cumulative_layout_shift`.

API Update
 : June 1, 2021

Notable Changes
 : - The new [Cumulative Layout Shift definition](https://web.dev/evolving-cls/) is now the default metric surfaced as `cumulative_layout_shift`, the previous Cumulative Layout Shift metric will be available for a limited time as it is phased out as `experimental_uncapped_cumulative_layout_shift`.
 : - [Largest Contentful Paint](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2020_11_lcp_2.md) has undergone adjustments in recent Chrome versions and has been updated similarly in CrUX.
 : - First Contentful Paint tri-binning thresholds have been updated to be: [0-1.8s], (1.8s-3s), [3s-∞].

## 202104

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/wQyI4jUJlYQ)

Publication date
 : May 11, 2021

Notable stats
 : - 8,423,302 origins
 : - 25.83% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202103

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/fyUSl0--9Z8v)

Publication date
 : April 13, 2021

Notable stats
 : - 8,326,310 origins
 : - 24.81% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202102

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/fyUSl0--9Z8)

Publication date
 : March 9, 2021

What's new
 : - Coarse origin ranking data will be available in the CrUX dataset on BigQuery, starting in the February 2021 (202102) release. With this feature, we'll be able to unlock new insights into the aggregate user experiences of the head, torso, and tail of the web. All origins in the global and per-country tables will be assigned rank magnitude values under the experimental namespace, experimental.popularity.rank. Values will be powers of 10, starting with the top 1,000, then 10,000, 100,000, and so on. For example, a rank magnitude of 10,000 means that an origin is among the top 10,000 most visited origins in the dataset ([learn more](https://developers.google.com/web/updates/2021/03/crux-rank-magnitude)).
 : - Tell us what you think of this new feature. We welcome your feedback on the [CrUX discussion forum](https://groups.google.com/a/chromium.org/g/chrome-ux-report).

Notable stats
 : - 8,264,371 origins
 : - 21.98% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202101

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/Kt1rNLZP3DA)

Publication date
 : February 10, 2021

Notable stats
 : - 8,185,540 origins
 : - 23.71% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202012

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/_yJ6tuEcmbI)

Publication date
 : January 12, 2021

Notable stats
 : - 7,629,156 origins
 : - 23.4% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202011

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/fb1jtGoXpuw)

Publication date
 : December 8, 2020

What's new
 : - As of December 3, PageSpeed Insights (web and API) is [sourcing its field data from the CrUX API](https://groups.google.com/g/pagespeed-insights-discuss/c/by9-TbqdlBM/m/Ovgg_o22AAAJ), bringing the tools closer in alignment.
 : - We rolled out a small [accuracy improvement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/vOlMzdG-uGo) to metrics' 75th percentiles in the CrUX API.
 : - The API results were [frozen](https://twitter.com/ChromeUXReport/status/1332746842254217217) for a few days at the end of November and the issue has since been fixed.

Notable stats
 : - 7,942,408 origins
 : - 23.5% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202010

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/7npqg6mxmoY/m/CHrR0FnZAQAJ)

Publication date
 : November 10, 2020

What's new
 : - A [CLS issue in Chrome 86](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2020_10_cls.md) may cause regressions in CLS scores:

Notable stats
 : - 8,050,755 origins
 : - 23.7% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202009

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/oYDHMLZ76yA/m/dXwvBlNEAwAJ)

Publication date
 : October 13, 2020

What's new
 : - No major changes in this release!

Notable stats
 : - 7,937,088 origins
 : - 24.6% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202008

[Announcement](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/vXXUE6qslKU/m/O6tjPcUtBAAJ)

Publication date
 : September 9, 2020

What's new
 : - There was a bump in origin coverage this month (+3.3%) due in part to a data pipeline change. Previously, for a user experience record to be included in the dataset, it must have included FP, DCL, and OL measurements. Now, the only required metric is FCP. This change helps to ensure that we're capturing more meaningful user experiences.

Notable stats
 : - 7,773,359 origins
 : - 24.9% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202007

[Announcement](https://groups.google.com/a/chromium.org/d/msg/chrome-ux-report-announce/Es5ilJvNrqg/9S-FzC2uBgAJ)

Publication date
 : August 11, 2020

What's new
 : - No major changes in this release!

Notable stats
 : - 7,527,878 origins
 : - 25.2% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202006

[Announcement](https://groups.google.com/a/chromium.org/d/topic/chrome-ux-report/yS-z15V7W48/discussion)

Publication date
 : July 14, 2020

What's new
 : - User experiences served from Google's AMP cache are now attributed to the publisher's origin in CrUX. Effects will vary depending on the amount of AMP cache traffic relative to the rest of the website, but most origins see less than a 5 percentage point change in Core Web Vitals performance, with most effects being positive.

Notable stats
 : - 7,501,835 origins
 : - 25.34% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202005

[Announcement](https://groups.google.com/a/chromium.org/d/topic/chrome-ux-report/m3fOLE4kx4s/discussion)

Publication date
 : June 9, 2020

What's new
 : - There were two [LCP updates](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2020_05_lcp.md), which should have a minimal effect on most origins
 : - There was one [FID update](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2020_05_fid.md), which may result in some sites observing faster FID experiences

Notable stats
 : - 7,103,486 origins
 : - 23.77% of origins have good [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)

## 202004

[Announcement](https://groups.google.com/a/chromium.org/forum/#!topic/chrome-ux-report-announce/nFh_M7lbUPM)

Publication date
 : May 12, 2020

What's new
 : - There was a [small improvement](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2020_04_lcp.md) to the way LCP is measured in M81. This may manifest itself in your CrUX data as a slight shift in slower LCP or in rare cases too few LCP samples to include for your origin.
 : - Introducing [Web Vitals](https://blog.chromium.org/2020/05/introducing-web-vitals-essential-metrics.html)! CrUX is committed to providing you with all of your Core Web Vital metrics to give you an accurate picture of how real users experience the web.
 : - Do you query data on a per-country basis? Give the new [`experimental.country`](https://console.cloud.google.com/bigquery?p=chrome-ux-report&d=experimental&t=country&page=table) table a try! It's optimized to make querying across country and monthly datasets super easy.

Notable stats
 : - 6,389,861 origins

## 202003

[Announcement](https://groups.google.com/a/chromium.org/forum/#!topic/chrome-ux-report-announce/PnEMrAcBJwE)

Publication date
 : April 14, 2020

What's new
 : - CLS histogram start/end values changed from `INT64` to `NUMERIC` type and divided by 100. This change aligns CLS with the fractional layout shift values provided by the [Layout Instability API](https://github.com/WICG/layout-instability).

Notable stats
 : - 5,937,298 origins

## 202002

Publication date
 : March 10, 2020

Notable stats
 : - 6,366,736 origins

## 202001

Publication date
 : February 11, 2020

What's new
 : - Experimental metric on [notification permission acceptance rates](https://developers.google.com/web/updates/2020/02/notification-permission-data-in-crux)

Notable stats
 : - 5,976,293 origins

## 201912

Notable stats
 : - 5,532,155 origins

## 201911

Notable stats
 : - 5,821,306 origins

What's new
 : - The [FID](/docs/crux/methodology/#fid-metric) metric was moved from `experimental.first_input_delay` to `first_input.delay`
 : - The [CLS](/docs/crux/methodology/#cls-metric) metric was moved from `experimental.cumulative_layout_shift` to `layout_instability.cumulative_layout_shift`

## 201910

Notable stats
 : - 5,752,729 origins

## 201909

Notable stats
 : - 6,008,004 origins

What's new
 : - The [LCP](/docs/crux/methodology/#lcp-metric) metric was launched as `largest_contentful_paint`
 : - [CLS](/docs/crux/methodology/#cls-metric) was updated to take [move distance](https://github.com/WICG/layout-instability/blob/main/README.md#distance-fraction) into account. Coverage may be lower while Chrome users upgrade to the latest version of the Layout Instability API

## 201908

Notable stats
 : - 6,011,463 origins

What's new
 : - [FID](/docs/crux/methodology/#fid-metric) coverage has returned to normal
 : - The average percent of fast experiences for most metrics dropped by about 2%, this appears to be due to a [bug in Chrome](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2019_12_fcp.md)

## 201907

Notable stats
 : - 5,612,504 origins

What's new
 : - There was an [incremental update](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2019_07_fid.md) to Chrome's [FID](/docs/crux/methodology/#fid-metric) implementation, which included pointer events on mobile. Coverage will be lower while Chrome users update to the latest version

## 201906

Notable stats
 : - 5,624,797 origins

What's new
 : - The [TTFB](/docs/crux/methodology/#ttfb-metric) metric was added to the list of experimental metrics as `experimental.time_to_first_byte`

## 201905

Notable stats
 : - 5,884,155 origins

What's new
 : - The [CLS](/docs/crux/methodology/#cls-metric) metric was added to the list of experimental metrics as `experimental.cumulative_layout_shift`

## 201904

Notable stats
 : - 5,744,982 origins

What's new
 : - There was an incremental update to Chrome's [FID](/docs/crux/methodology/#fid-metric) implementation. Coverage will be lower while Chrome users update to the latest version

## 201903

Notable stats
 : - 5,703,255 origins

What's new
 : - There was an incremental update to Chrome's [FID](/docs/crux/methodology/#fid-metric) implementation. Coverage will be lower while Chrome users update to the latest version

## 201902

Notable stats
 : - 5,464,560 origins

## 201901

Notable stats
 : - 5,351,287 origins

## 201812

Notable stats
 : - 4,654,112 origins

## 201811

Notable stats
 : - 4,697,003 origins

## 201810

Notable stats
 : - 4,374,729 origins

## 201809

Notable stats
 : - 4,375,805 origins

## 201808

Notable stats
 : - 4,386,422 origins

What's new
 : - Histogram bins have been normalized to consistent widths ([more info](https://twitter.com/ChromeUXReport/status/1042443549676064768))

## 201807

Notable stats
 : - 4,202,945 origins

## 201806

Notable stats
 : - 4,134,123 origins

What's new
 : - The [FID](/docs/crux/methodology/#fid-metric) metric was added to the list of experimental metrics as `experimental.first_input_delay` ([learn more](https://developers.google.com/web/updates/2018/07/first-input-delay-in-crux))

## 201805

Notable stats
 : - 4,162,633 origins

## 201804

Notable stats
 : - 3,970,181 origins

## 201803

Notable stats
 : - 3,589,954 origins

## 201802

Notable stats
 : - 3,237,524 origins

## 201801

Notable stats
 : - 3,086,603 origins

What's new
 : - Added [country dimension](https://developers.google.com/web/updates/2018/01/crux)

## 201712

Notable stats
 : - 1,939,945 origins

## 201711

Notable stats
 : - 1,237,407 origins

What's new
 : - Expanded dataset with [1M+ origins](https://developers.google.com/web/updates/2017/12/crux)

## 201710

Notable stats
 : - 10,000 origins

What's new
 : - [Chrome User Experience Report beta preview](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) is launched at Chrome Dev Summit

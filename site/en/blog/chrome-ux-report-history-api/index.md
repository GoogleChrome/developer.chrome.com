---
layout: layouts/blog-post.njk
title: Introducing historical web performance data via the CrUX History API
description: >
 Learn about the new CrUX History API and how to use it to track user experience trends.
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/Xu66s88U5aDaULbgDIz0.jpg
alt: Trinity College Library, Dublin, Ireland
authors:
 - johannes
 - jasmineyan
 - tunetheweb
date: 2023-02-07
#updated: 2023-02-07
tags:
 - performance
 - crux
---

This article introduces the [Chrome UX Report (CrUX) History API](/docs/crux/history-api/) endpoint, which provides time series of web performance data. This data updates weekly, and allows you to see about 6 months worth of history, with 25 data points spaced out by a week.

When used with the daily updates from the original [CrUX API](/docs/crux/api/) endpoint, you can now quickly see both the most recent data and what happened previously, making this a powerful tool for seeing webpage changes over time.

## Querying the daily CrUX API

To recap from [a previous article on the CrUX API](/blog/chrome-ux-report-api/), you can get a snapshot of the field data for a particular origin in this way:

```shell
API_KEY="[YOUR_API_KEY]"
curl "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$API_KEY" --header 'Content-Type: application/json' --data '{"origin": "https://web.dev"}'

{
  "record": {
    "key": {
      "origin": "https://web.dev"
    },
    "metrics": {
      "largest_contentful_paint": {
        "histogram": [{
          "start": 0, "end": 2500, "density": 0.9192
        }, {
          "start": 2500, "end": 4000, "density": 0.0513
        }, {
          "start": 4000, "density": 0.0294
        }],
        "percentiles": {
          "p75": 1303
        }
      }
      // ...
    },
    "collectionPeriod": {
      "firstDate": { "year": 2022, "month": 12, "day": 27 },
      "lastDate": { "year": 2023, "month": 1, "day": 23 }
    }
  }
}
```

This snapshot includes histogram density values and percentile values for a particular 28-day collection period, in this case, from December 27, 2022 to January 23, 2023.

## Querying the CrUX History API

To call the history endpoint, change `queryRecord` in the URL to `queryHistoryRecord` in the `curl` command. Using the same [CrUX API key](/docs/crux/api/#crux-api-key) as for the previous call will work.

```shell
API_KEY="[YOUR_API_KEY]"
curl "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=$API_KEY" \
 --header 'Content-Type: application/json' \
 --data '{"origin": "https://web.dev"}'
```

The overall shape of a response is similar—but there is a lot more data! Instead of a single data point, there are now time series for the fields containing the 75th percentile (p75) and histogram density values.

```json
{
  "record": {
    "key": {
      "origin": "https://web.dev"
    },
    "metrics": {
      "largest_contentful_paint": {
        "histogramTimeseries": [{
            "start": 0, "end": 2500, "densities": [
              0.9190, 0.9203, 0.9194, 0.9195, 0.9183, 0.9187
            ]
          }, {
            "start": 2500, "end": 4000, "densities": [
              0.0521, 0.0513, 0.0518, 0.0518, 0.0526, 0.0527
            ]
          },  {
            "start": 4000, "densities": [
              0.0288, 0.0282, 0.0286, 0.0285, 0.0290, 0.0285
            ]
          }
        ],
        "percentilesTimeseries": {
          "p75s": [
            1362, 1352, 1344, 1356, 1366, 1377
          ]
        }
      }
      // ...
    },
    "collectionPeriods": [{
        "firstDate": { "year": 2022, "month": 7, "day": 10 },
        "lastDate": { "year": 2022, "month": 8, "day": 6 }
      }, {
        "firstDate": { "year": 2022, "month": 7, "day": 17 },
        "lastDate": { "year": 2022, "month": 8, "day": 13 }
      }, {
        "firstDate": { "year": 2022, "month": 7, "day": 24 },
        "lastDate": { "year": 2022, "month": 8, "day": 20 }
      }, {
        "firstDate": { "year": 2022, "month": 7, "day": 31 },
        "lastDate": { "year": 2022, "month": 8, "day": 27 }
      }, {
        "firstDate": { "year": 2022, "month": 8, "day": 7 },
        "lastDate": { "year": 2022, "month": 9, "day": 3 }
      }, {
        "firstDate": { "year": 2022, "month": 8, "day": 14 },
        "lastDate": { "year": 2022, "month": 9, "day": 10 }
      }
    ]
  }
}
```

In this example, the `densities` time series for the 0 to 2500 ms bucket of the [Largest Contentful Paint (LCP)](https://web.dev/lcp/) metric is `[0.9190, 0.9203, 0.9194, 0.9195, 0.9183, 0.9187].` Each of these densities was observed during the corresponding `collectionPeriods` entry. For example, the fifth density, 0.9183, was the density for the fifth collection period, ending on September 3rd, 2022, and 0.9187 was the density in the period ending the week after that.

In other words, interpreting the last time series entries in the example for [https://web.dev](https://web.dev), it was found that from August 14, 2022 until September 10, 2022, 91.87% of page loads had LCP values smaller than 2500ms, 5.27% had values between 2500ms and 4000ms, and 2.85% had values greater than 4000ms.

Similarly, there’s a time series for the p75 values: the LCP p75 for August 14, 2022 until September 10, 2022 was `1377`. This means that, for this collection period, 75% of user experiences had an LCP of less than 1377 ms, and 25% of user experiences had an LCP greater than 1377 ms.

While the example only lists 6 time series entries and collection periods, responses from the API currently provide 25 time series entries; since the end dates for each of these collection periods are Saturdays that are 7 days apart, this covers 6 months.

{% Aside %}
Unlike the daily API, the CrUX History API is only updated once a week on Mondays (including data until the previous Saturday). However, like the daily API, each value in the CrUX History API is measured from the previous 28 days. This means the History API should represent the same data that was available via the daily API for the given date—it is just now available to query retrospectively. However, it does mean the History API contains overlapping periods of data but—as a trend analysis—it is useful to track the change in metrics over time.
{% endAside %}

In any given response, the length of the time series for the histogram bin densities and for p75 values will be exactly the same as the length of array in the `collectionPeriods` field: There is a one-to-one correspondence based on the index into these arrays.

## Querying page-level data

As well as origin-level data, the CrUX History API allows access to historical page-level data. While the origin-level data was available previously via the [CrUX dataset on BigQuery](/docs/crux/bigquery/) (or via [the CrUX Dashboard](/docs/crux/dashboard/)), the page-level historical data was only available if sites collected and stored the data themselves. The new API now unlocks that historical page-level data.

The page-level data can be queried in the same manner, but using `url` instead of `origin` in the payload:

```shell
API_KEY="[YOUR_API_KEY]"
curl "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=$API_KEY" \
 --header 'Content-Type: application/json' \
 --data '{"url": "https://web.dev/blog/"}'
```

Page-level (and origin-level) historical data is subject to [the same eligibility requirements](/docs/crux/methodology/#eligibility) as the rest of CrUX, and so pages in particular may not have a complete historical record. In these cases the "missing" data will be represented by `"NaN"` for the `histogramTimeseries` densities and `null` for the `percentilesTimeseries`. The reason for the difference is the histogram densities are always numbers, while the percentiles can be numbers or strings (CLS uses strings, even if they look like numbers).

## Visualizing the data

So, you may ask, why is the data shaped in this way? It was found that this makes it easy to plot graphs. For example, here is a graph for the p75 values for [Interaction To Next Paint (INP)](https://web.dev/inp/) for [https://web.dev](https://web.dev):

{% Img src="image/kd0zRXNeKScEzrwMmhY1NNvIzeM2/fgLRTt2WB2Yd67bL3mMc.png", alt="Time series graph of p75 value showing a regression around November 2022", width="512", height="339" %}

In this line chart, each value on the y-axis is a p75 value from the `p75s` time series, and the x-axis is the time, which is set up as the `lastDate` for each collection period.

Here is a graph for the histogram bin time series—known as a tri-bin chart—because these histograms have three bins.

{% Img src="image/kd0zRXNeKScEzrwMmhY1NNvIzeM2/3izH0o8vNvZqXGMWYCFJ.png", alt="Stacked bar chart showing how the relative proportions of good, needs improvement and poor changes over time.", width="678", height="353" %}

The x-axis is set up as the `lastDate` for each collection period. This time, however, the y-axis is the percentage of page loads falling into a specific range for the INP metric, shown through a stacked bar chart. The p75 chart provides a quick overview, and within a single chart, it’s relatively easy to add multiple metrics, or show lines for both `PHONE` and `DESKTOP`. The tri-bin chart gives a sense of the distribution of metric values measured during each collection period.

For example, even though the p75 chart suggests that [https://web.dev](https://web.dev) had almost acceptable INP values during the observation period, the tri-bin chart shows that for a small fraction of page loads, the INP was actually poor. In both charts, it’s relatively easy to infer that there was a performance regression which started toward the end of October, and was fixed by mid-November.

To generate such charts yourself, we have created an example [Colab](https://colab.research.google.com/). A Colab, or 'Colaboratory', allows you to write and execute Python from within your browser. The [CrUX History API Colab](https://colab.research.google.com/github/GoogleChrome/CrUX/blob/main/colab/crux-history-api.ipynb) [[source]](https://github.com/GoogleChrome/CrUX/blob/main/colab/crux-history-api.ipynb) uses Python to make calls to the API and chart the data.

This Colab allows you to make p75 charts, tri-bin charts, get data in tabular form, and see the request/response pair for the CrUX API, by filling out a brief form. You need not be a programmer to use this—but you certainly can look at the Python code and modify it into something amazing! Please enjoy and don't hesitate to provide feedback on what you find!

Of course you are not limited to Colab or Python and this is just one example of how to use this new API. As a JSON-based, HTTP endpoint the API is easily queryable from any technology.

## Conclusion

Before the introduction of the CrUX History API endpoint, site owners were limited in the historical information they could obtain from CrUX. Monthly origin-level data was available via BigQuery and the CrUX Dashboard, but weekly data was not available nor was page-level historical data. Site owners could record this data themselves using the daily API, but often the need for this was only discovered after a regression in metrics.

The hope with the introduction of this CrUX History API is that it will allow site owners to have a better understanding of their changing site metrics, and as a diagnostic tool for when issues arise. If you are using the new API, feedback is welcomed at the [Chrome UX Report (Discussions) google group](https://groups.google.com/a/chromium.org/g/chrome-ux-report).

## Acknowledgements

_Hero image by [Dave Herring](https://unsplash.com/@daveherring) on [Unsplash](https://unsplash.com/photos/pqB2IeI2U1s)_

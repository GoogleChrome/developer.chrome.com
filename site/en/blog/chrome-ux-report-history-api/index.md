---
layout: layouts/blog-post.njk
title: History web performance data via the CrUX API
description: >
  History web performance data via the CrUX API.
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

This article introduces the [CrUX History API](/docs/crux/history-api/), which provides time series. This data updates weekly and allows you to see about 6 months worth of history, with 25 data points spaced out by a week.

When used with the daily updates from the original CrUX API endpoint, you can now quickly see both the most recent data and what happened previously, making this a powerful tool for tracking webpage changes over time.

## Querying the Daily CrUX API

To recap from [our previous article](/blog/chrome-ux-report-api/), you can get a snapshot of the field data for a particular origin from our API in this way:

```shell
API_KEY="[YOUR_API_KEY]"
curl "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$API_KEY" --header 'Content-Type: application/json' --data '{"origin": "https://web.dev"}'
```

```json
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

This snapshot includes histogram density values and percentile values for a particular 28-day collection period, in this case, from December 27, 2002, to January 23, 2023.

## Querying the History CrUX API

To call the history endpoint, change `queryRecord` in the URL to `queryHistoryRecord` in the curl command. Using the same [CrUX API key](/docs/crux/api/#crux-api-key) as for the previous call will work.

```shell
API_KEY="[YOUR_API_KEY]"
curl "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=$API_KEY" \
 --header 'Content-Type: application/json' \
 --data '{"origin": "https://web.dev"}'
```

The overall shape of a response is similar - but there is a lot more data! There are now time series, instead of a single data point, for the fields containing the p75 and histogram density values.

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

In our example, the densities time series for the 0-2500 ms bucket of the [Largest Contentful Paint (LCP)](https://web.dev/lcp) metric is [`0.9190, 0.9203, 0.9194, 0.9195, 0.9183, 0.9187].` Each of these densities was observed during the corresponding `collectionPeriods` entry. For example, the fifth density, 0.9183, was the density for the fifth collection period, ending in September 3rd, 2022, and 0.9187 was the density in the period ending the week after that.

In other words, interpreting the last time series entries in the example, for [https://web.dev](https://web.dev), we found that from August 14, 2022 until September 10, 2022, 91.87% of page loads had LCP values smaller than 2500ms, 5.27% had values between 2500ms and 4000ms, and 2.85% had values greater than 4000ms.

Similarly, there’s a time series for the p75 values: the LCP p75 for August 14, 2022 until September 10, 2022 was 1377. This means that for this collection period, 75% of user experiences had an LCP of less than 1377 ms, and 25% of user experiences had an LCP greater than 1377 ms.

While the example only lists 6 time series entries and collection periods, responses from the API currently provide 25 time series entries; since the end dates for each of these collection periods are Saturdays that are 7 days apart, this covers 6 months.

{% Aside %}
Unlike the daily API, the CrUX History API is only available once a week. However, like the daily API, each value in the CrUX History API is measured from the previous 28 days. This means the CrUX History API should represent the same data that was available via the daily API for the given date—it is just now available to query retrospectively. However, it does mean the CrUX History API contains overlapping periods of data but, as a trend analysis, it is useful to track the change in metrics over time.
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

Page-level (and origin-level) historical data is subject to [the same eligibility requirements](/docs/crux/methodology/#eligibility) as the rest of CrUX and so pages in particular may not have a complete historical record.

## Visualizing the data

So, you may ask, why is the data shaped in this way? We found that this makes it easy to plot graphs. For example, here is a graph for the p75 values for [Interaction To Next Paint (INP)](https://web.dev/inp) for [https://web.dev](https://web.dev):

{% Img src="image/kd0zRXNeKScEzrwMmhY1NNvIzeM2/fgLRTt2WB2Yd67bL3mMc.png", alt="Time series graph of p75 value showing a regression around November 2022", width="512", height="339" %}

In this line chart, each value on the y-axis is a p75 value from the `p75s` time series, and the x-axis is the time, which we set up as the `lastDate` for each collection period.

Here is a graph for the histogram bin time series - we call it the tri-bin chart, because these histograms have three bins.

{% Img src="image/kd0zRXNeKScEzrwMmhY1NNvIzeM2/3izH0o8vNvZqXGMWYCFJ.png", alt="Stacked bar chart showing how the relative proportions of good, needs improvement and poor changes over time.", width="678", height="353" %}

Again, the x-axis is set up as the `lastDate` for each collection period. But this time, the y-axis is the percentage of page loads falling into a specific range for the INP metric, shown through a stacked bar chart. The p75 chart provides a quick overview, and within a single chart, it’s relatively easy to add multiple metrics, or show lines for both PHONE and DESKTOP. The tri-bin chart gives a sense of the distribution of metric values measured during each collection period. For example, even though the p75 chart suggests that [https://web.dev](https://web.dev) had almost acceptable INP values during the observation period, the tri-bin chart shows that for a small fraction of page loads, the INP was actually poor. In both charts, it’s relatively easy to infer that there was a performance regression which started toward the end of October, and got ironed out mid-November.

To generate such charts yourself, please check out our [Colab](https://colab.research.google.com/) here:

Example of how to link to a Github colab:

[https://colab.research.google.com/github/ContinualAI/colab/blob/master/notebooks/intro_to_continual_learning.ipynb](https://colab.research.google.com/github/ContinualAI/colab/blob/master/notebooks/intro_to_continual_learning.ipynb)

Our Colab allows you to make p75 charts, tri-bin charts, get data in tabular form, and see the request / response pair for the CrUX API, by filling out a brief form. You need not be a programmer to use this.

But, you certainly can look at the Python code and modify it into something amazing! Please enjoy and let us know what you find!

## Conclusion

Before the introduction of the CrUX History API endpoint, site owners were limited in the historical information they could obtain from CrUX. Monthly, origin-level data was available via Big Query and the CrUX Dashboard, but weekly data was not available and neither was page-level historical data. Site owners could record this data themselves using the daily API, but often the need for this was only discovered after a regression in metrics.

We hope with the introduction of this CrUX History API will allow site owners to have a better understanding of their changing site metrics, and as an investigation tool for when issues arise. We are keen to hear how you are using the new API and welcome feedback at the [Chrome UX Report (Discussions) google group](https://groups.google.com/a/chromium.org/g/chrome-ux-report).

## Acknowledgements

_Hero image by [Dave Herring](https://unsplash.com/@daveherring) on [Unsplash](https://unsplash.com/photos/NqOInJ-ttqM)_

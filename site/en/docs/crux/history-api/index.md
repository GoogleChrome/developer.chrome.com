---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX History API

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Learn how to query the previous six months of historical CrUX trends using the CrUX History API.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  The CrUX History API gives low-latency access to six months of historical real-user experience data at page and origin granularity.

# Required
date: 2023-02-07

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


## Common use case

The CrUX History API allows for the querying of historical user experience metrics for a specific URI like "Get the historical UX trends for the `https://example.com` origin."

The History API follows the same structure as the daily [CrUX API](../api/) except values are given in an array, and keys are labelled with plural names (for example, `histogramTimeseries` instead of `histogram`, or `p75s` instead of `p75`).

## CrUX API Key

Like the daily API, using the CrUX History API requires a Google Cloud API key. The same key can be used for the daily and history API.

You can create one in the [Credentials](https://console.developers.google.com/apis/credentials) page and provision it for `Chrome UX Report API` usage.

After you have an API key, your application can append the query parameter `key=[YOUR_API_KEY]` to all request URLs. See the [Example queries](#example-queries) below.

The API key is safe for embedding in URLs; it doesn't need any encoding.

## Data model

This section details the structure of data in requests and responses.

### Record

A discrete piece of information about a page, or site. A record can have data that is specific for an identifier and for a specific combination of dimensions. A record can contain data for one or more metrics.

### Identifiers

Identifiers specify what records should be looked up. In CrUX these identifiers are webpages and websites.

### Origin

When the identifier is an origin all data present for all pages in that origin are aggregated together. For example, say the `http://www.example.com` origin had pages as laid out by this sitemap:

```text
http://www.example.com/
http://www.example.com/foo.html
http://www.example.com/bar.html
```

This would mean that when querying the Chrome UX Report with the origin set to `http://www.example.com`, data for `http://www.example.com/`, `http://www.example.com/foo.html`, and `http://www.example.com/bar.html` would be returned, aggregated together, because those are all pages under that origin.

### URLs

When the identifier is a URL, only data for that specific URL will be returned. Looking again to the `http://www.example.com` origin sitemap:

```text
http://www.example.com/
http://www.example.com/foo.html
http://www.example.com/bar.html
```

If the identifier is set to URL with the value of `http://www.example.com/foo.html`, only data for that page will be returned.

### Dimensions

Dimensions identify a specific group of data that a record is being aggregated against. For example, a form factor of `PHONE` indicates that the record contains information about loads that took place on a mobile device.

The CrUX History API is only available aggregated by form factor dimension. This is a general class of device split into `PHONE`, `TABLET`, and `DESKTOP`.

{% Aside %}
Unlike the daily API, the CrUX History API does not have data aggregated against Effective Connection Type (ECT).
{% endAside %}

### Metric

Metrics are expressed in a histogram array, which represents the percent of users that experienced a metric with that value proportionally to all.

A simple three bin histogram for an example metric looks like this:

```json
{
  "histogramTimeseries": [
    {
      "start": 0,
      "end": 2500,
      "densities": [0.9190, 0.9203, 0.9194, 0.9195, 0.9183, 0.9187]
    },
    {
      "start": 2500,
      "end": 4000,
      "densities": [0.0521, 0.0513, 0.0518, 0.0518, 0.0526, 0.0527]
    },
    {
      "start": 4000,
      "densities": [0.0288, 0.0282, 0.0286, 0.0285, 0.0290, 0.0285]
    }
  ],
}
```

The data points are presented in the order of the [collection period](#collection-periods) dates also returned by the API, with the first point being the earliest period, and the final point being the most recent collection period.

This data indicates that 91.90% of users experience the example metric value between 0ms and 2,500ms for the first collection period in the history, followed by 92.03%, 91.94%, and so on. The units of the metric are not contained in this histogram, in this case we will assume milliseconds.

Additionally, 5.21% of users experience the example metric value between 2,500ms and 4,000ms in the first collection period in the history, and 2.88% of users experience a value greater than 4,000ms in the first collection period in the history.

Metrics will also contain percentiles that can be useful for additional analysis.

```json
{
  "percentilesTimeseries": {
    "p75s": [1362, 1352, 1344, 1356, 1366, 1377]
  },
}
```

These percentiles can show specific metric values at the given percentile for that metric. They are based on the full set of available data and not the final binned data, so they do not necessarily match an interpolated percentile that is based on the final binned histogram.

{% Aside %}
Note: The values for each percentile are synthetically derived, it does not imply that any user actually experienced the value indicated, only that some percentage of users experienced a metric value that was less than the value given.
{% endAside %}

#### Metric value types

As the CrUX History API uses the same metric value types, you can reference [the daily CrUX API metric value types documentation](../api/#metric-value-types) for more details.

#### Metric eligibility

Based on the [eligibility criteria](../methodology/#eligibility) an origin or URL may only be eligible for some of the collection periods covered by the CrUX History API. In these cases the CrUX History API will return `"NaN"` for the `histogramTimeseries` densities and `null` for the `percentilesTimeseries` for the collection periods which have no eligible data. The reason for the difference is the histogram densities are always numbers, while the percentiles can be numbers or strings (CLS uses strings, even if they look like numbers).

For example, if the second period did not have any eligible data, this would show as:

```json
{
  "histogramTimeseries": [
    {
      "start": 0,
      "end": 2500,
      "densities": [0.9190, "NaN", 0.9194, 0.9195, 0.9183, 0.9187]
    },
    {
      "start": 2500,
      "end": 4000,
      "densities": [0.0521, "NaN", 0.0518, 0.0518, 0.0526, 0.0527]
    },
    {
      "start": 4000,
      "densities": [0.0288, "NaN", 0.0286, 0.0285, 0.0290, 0.0285]
    }
  ],
  "percentilesTimeseries": {
    "p75s": [1362, null, 1344, 1356, 1366, 1377]
  },
}
```

For URLs or origins that fall in and out of eligibility over time, you may notice many missing entries.

### Collection periods

The CrUX History API contains a `collectionPeriods` object with an array of `firstDate` and `endDate` fields representing the beginning and end dates of each aggregation window. An example is provided below:

```json
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
```

These collection periods are in ascending order and represent the date span of each of the data points in the other sections of the response.

The History API is updated each Monday and contains data up until the previous Saturday (as per the standard 2-day lag). It contains the previous 25-weeks worth of data—one collection period per week.

As each collection period contains the previous 28-days aggregated data, and the collection periods are per week, this means the collection periods will overlap. They are similar to a moving average of data, with three weeks worth of data being included in each subsequent period, and one week being different.

## Example queries

Queries are submitted as JSON objects via a POST request to `https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=[YOUR_API_KEY]"` with query data as a JSON object in the POST body.

Note the use of `queryHistoryRecord` replacing the `queryRecord` of the daily CrUX API.

An example body is shown below:

```json
{
  "origin": "https://example.com",
  "formFactor": "PHONE",
  "metrics": [
    "largest_contentful_paint",
    "experimental_time_to_first_byte"
  ]
}
```

For example, this can be called from `curl` with the following command line (replacing `API_KEY` with your key):

```bash
curl -s --request POST 'https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=API_KEY' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --data '{"formFactor":"PHONE","origin":"https://www.example.com","metrics":["largest_contentful_paint", "experimental_time_to_first_byte"]}'
```

{% Aside 'note' %}
The above example is for MacOS or Linux based systems—including the Git BASH shell for Windows. Other systems may require slight modifications. For example, the `cmd.exe` command line does not allow single quotes for parameters, nor the line continuations (`\`), so requires using double quotes (escaping inner quotes as appropriate with `\"`), and also using a single line.
{% endAside %}

Page-level data is available through the API by passing a `url` property in the query, instead of `origin`:

```json
{
  "url": "https://example.com/page",
  "formFactor": "PHONE",
  "metrics": [
    "largest_contentful_paint",
    "experimental_time_to_first_byte"
  ]
}
```

If the `metrics` property is not set then all available metrics will be returned:

- `cumulative_layout_shift`
- `first_contentful_paint`
- `first_input_delay`
- `interaction_to_next_paint`
- `largest_contentful_paint`
- `experimental_interaction_to_next_paint`
- `experimental_time_to_first_byte`

{% Aside 'important' %}
The `interaction_to_next_paint` metric is available both with and without the experimental prefix. The experimental prefix should now be considered deprecated and will be removed in August 2023. The non-prefixed schema should be used going forward.
{% endAside %}

If no `formFactor` value is provided then the values will be aggregated across all form factors.

See [History web performance data via the CrUX API](/blog/chrome-ux-report-history-api) for more example queries.

## Data pipeline

The CrUX dataset is processed through a pipeline to consolidate, aggregate and filter the data before becoming available via the API.

### The rolling average

The data in the Chrome UX Report is a 28-day rolling average of aggregated metrics. This means that the data presented in the Chrome UX Report at any given time is actually data for the past 28 days aggregated together.

The History API contains a number of collection periods, each spanning these 28 days. As each collection period contains the previous 28-days aggregated data, and the collection periods are per week, this means the collection periods will overlap. They are similar to a moving average of data, with three weeks worth of data being included in each subsequent period, and one week being different.

### Weekly updates

The History API is updated each Monday around 04:00 UTC and contains data up until the previous Saturday (as per the standard 2-day lag). It contains the previous 25 weeks (approximately 6 months) worth of data, one collection period per week.

There is no service level agreement for update times; it is run on a best-effort basis every day.

{% Aside 'caution' %}
Data will not differ within the same week after it has been updated each Monday around 04:00 UTC, repeated calls will yield the same results.
{% endAside %}

## Schema

There is a single endpoint for the CrUX History API which accepts `POST` HTTP requests. The API returns a `record` which contains one or more `metrics` corresponding to performance data about the requested origin or page.

### HTTP request

```http
POST https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord
```

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Request body

As the CrUX History API uses the same request bodies, you can reference [the daily CrUX API request body documentation](../api/#request-body) for more details.

For example, to request the desktop Largest Contentful Paint values for the web.dev homepage:

```json
{
  "origin": "https://web.dev/",
  "formFactor": "DESKTOP",
  "metrics": [
    "largest_contentful_paint"
  ]
}
```

### Response body

Successful requests return responses with a `record` object and `urlNormalizationDetails` in the following structure:

```json
{
  "record": {
    "key": {
      object (Key)
    },
    "metrics": [
      string: {
        object (Metric)
      }
    ]
  },
  "urlNormalizationDetails": {
    object (UrlNormalization)
  }
}
```

For example, the response to the request body in the above request could be:

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
              0.9190, 0.9203, 0.9194, 0.9195, 0.9183, 0.9187, ...
            ]
          }, {
            "start": 2500, "end": 4000, "densities": [
              0.0521, 0.0513, 0.0518, 0.0518, 0.0526, 0.0527, ...
            ]
          },  {
            "start": 4000, "densities": [
              0.0288, 0.0282, 0.0286, 0.0285, 0.0290, 0.0285, ...
            ]
          }
        ],
        "percentilesTimeseries": {
          "p75s": [
            1362, 1352, 1344, 1356, 1366, 1377, ...
          ]
        }
      }
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
      }, {
        ...
      }
    ]
  }
}
```

#### Key {: #api-response-key }

`Key` defines all the dimensions that identify this record as unique.

```json
{
  "formFactor": enum (FormFactor),

  // Union field url_pattern can be only one of the following:
  "origin": string,
  "url": string
  // End of list of possible types for union field url_pattern.
}
```

<table class="width-full with-heading-tint">
  <colgroup>
    <col width="25%">
    <col>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
      <td><code translate="no" dir="ltr">formFactor</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">enum (<a href="#form-factor">FormFactor</a>)</code></strong></p>
        <p>The form factor is the device class that all users used to access the site for this record.</p><p>If the form factor is unspecified, then aggregated data over all form factors will be returned.</p>
      </td>
    </tr>
    <tr>
      <td colspan="2">Union field <code translate="no" dir="ltr">url_<wbr>pattern</code>. The url pattern is the url that the record applies to. <code translate="no" dir="ltr">url_<wbr>pattern</code> can be only one of the following:</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">origin</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>Origin specifies the origin that this record is for.</p><p>Note: When specifying an origin, data for loads under this origin over all pages are aggregated into origin level user experience data.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">url</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>Url specifies a specific url that this record is for.</p><p>Note: When specifying a "url" only data for that specific url will be aggregated.</p>
      </td>
    </tr>
  </tbody>
</table>

#### Metrics {: #api-response-metrics }

A `metric` is a set of user experience data for a single web performance metric, such as first contentful paint. It contains a summary histogram of real world Chrome usage as a series of `bins`.

```json
{
  "histogramTimeseries": [
    {
      object (Bin)
    }
  ],
  "percentilesTimeseries": {
    object (Percentiles)
  }
}
```

<table class="width-full with-heading-tint">
  <colgroup>
    <col width="25%">
    <col>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no" dir="ltr">histogramTimeseries[]</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">object (<a href="#api-response-bin">Bin</a>)</code></strong></p>
        <p>The timeseries histogram of user experiences for a metric. The timeseries histogram will have at least one bin and the densities of all bins will add up to ~1.</p>
        <p>Missing values for that particular Collection Period will be marked as <code>"NaN"</code>.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">percentilesTimeseries</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">object (<a href="#api-response-percentiles">Percentiles</a>)</code></strong></p>
        <p>Common useful percentiles of the Metric. The value type for the percentiles will be the same as the value types given for the Histogram bins.</p>
        <p>Missing values for that particular Collection Period will be marked as <code>null</code>.</p>
      </td>
    </tr>
  </tbody>
</table>

#### Bin {: #api-response-bin }

A `bin` is a discrete portion of data spanning from start to end, or if no end is given from start to positive infinity.

A bin's start and end values are given in the value type of the metric it represents. For example, first contentful paint is measured in milliseconds and exposed as ints, therefore its metric bins will use int32s for its start and end types. However cumulative layout shift is measured in unitless decimals and is exposed as a decimal encoded as a string, therefore its metric bins will use strings for its value type.

```json
{
  "start": value,
  "end": value,
  "densities": [number, number, number...etc.]
}
```

<table class="width-full with-heading-tint">
  <colgroup>
    <col width="25%">
    <col>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no" dir="ltr">start</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">value (<a href="https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Value">Value</a> format)</code></strong></p>
        <p>Start is the beginning of the data bin.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">end</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">value (<a href="https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Value">Value</a> format)</code></strong></p>
        <p>End is the end of the data bin. If end is not populated, then the bin has no end and is valid from start to +inf.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">densities</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">array[number]</code></strong></p>
        <p>A timeseries of the proportion of users that experienced this bin's value for the given metric.</p>
      </td>
    </tr>
  </tbody>
</table>

#### Percentiles {: #api-response-percentiles }

`Percentiles` contains synthetic values of a metric at a given statistical percentile. These are used for estimating a metric's value as experienced by a percentage of users out of the total number of users.

```json
{
  "P75": value
}
```

<table class="width-full with-heading-tint">
  <colgroup>
    <col width="25%">
    <col>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr id="Percentiles.FIELDS.p75">
      <td><code translate="no" dir="ltr">p75s</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">array[value] (<a href="https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Value">Value</a> format)</code></strong></p>
        <p>Timeseries of the values that 75% of users experienced the given metric at or below this value.</p>
      </td>
    </tr>
  </tbody>
</table>

#### UrlNormalization {: #api-response-urlnormalization }

Object representing the normalization actions taken to normalize a url to achieve a higher chance of successful lookup. These are simple automated changes that are taken when looking up the provided `url_pattern` would be known to fail. Complex actions like following redirects are not handled.

```json
{
  "originalUrl": string,
  "normalizedUrl": string
}
```

<table class="width-full with-heading-tint">
  <colgroup>
    <col width="25%">
    <col>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr id="UrlNormalization.FIELDS.original_url">
      <td><code translate="no" dir="ltr">originalUrl</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The original requested URL prior to any normalization actions.</p>
      </td>
    </tr>
    <tr id="UrlNormalization.FIELDS.normalized_url">
      <td><code translate="no" dir="ltr">normalizedUrl</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The URL after any normalization actions. This is a valid user experience URL that could reasonably be looked up.</p>
      </td>
    </tr>
  </tbody>
</table>

## Rate limits

The CrUX History API shares the same limit with the [CrUX API](/docs/crux/api) for 150 queries per minute per Google Cloud project for either API, which is offered free of charge. This limit, and your current usage, can be seen in the [Google Cloud Console](https://console.cloud.google.com/apis/api/chromeuxreport.googleapis.com/quotas). This generous quota should be sufficient for the vast majority of use cases and at present it is not possible to pay for an increased quota.

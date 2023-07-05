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
  Learn how to construct requests to and parse responses from the CrUX API.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  The CrUX API gives low-latency access to aggregated real-user experience data at page and origin granularity.

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


## Common use case

The CrUX API allows for the querying of user experience metrics for a specific URI like "Get metrics for the `https://example.com` origin."

## CrUX API Key

Using the CrUX API requires a Google Cloud API key. You can create one in the [Credentials](https://console.developers.google.com/apis/credentials) page and provision it for `Chrome UX Report API` usage.

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

Dimensions identify a specific group of data that a record is being aggregated against, for example a form factor of `PHONE` indicates that the record contains information about loads that took place on a mobile device. Each dimension will have a certain number of values, and implicitly the lack of specifying that dimension will mean that the dimension is aggregated over all values. For example, specifying no form factor indicates that record contains information about loads that took place on any form factor.

#### Form Factor

The device class that the end-user used to navigate to the page. This is a general class of device split into `PHONE`, `TABLET`, and `DESKTOP`.

#### Effective Connection Type

[Effective Connection Type](/docs/crux/methodology/#ect-dimension) is the estimated connection quality of the device when navigating to the page. This is a general class split into `offline`, `slow-2G`, `2G`, `3G` and `4G`.

### Metric

Metrics are expressed in a histogram, which represents the percent of users that experienced a metric with that value proportionally to all.

A simple three bin histogram for an example metric looks like this:

```json
{
  "histogram": [
    {
      "start": 0,
      "end": 1000,
      "density": 0.38179
    },
    {
      "start": 1000,
      "end": 3000,
      "density": 0.49905
    },
    {
      "start": 3000,
      "density": 0.11916
    }
  ],
}
```

This data indicates that 38.179% of users experience the example metric value between 0ms and 1,000ms. The units of the metric are not contained in this histogram, in this case we will assume milliseconds.

Additionally, 49.905% of users experience the example metric value between 1,000ms and 3,000ms, and 11.916% of users experience a value greater than 3,000ms.

Metrics will also contain percentiles that can be useful for additional analysis.

```json
{
  "percentiles": {
    "p75": 2063
  },
}
```

These percentiles can show specific metric values at the given percentile for that metric. They are based on the full set of available data and not the final binned data, so they do not necessarily match an interpolated percentile that is based on the final binned histogram.

{% Aside %}
Note: The values for each percentile are synthetically derived, it does not imply that any user actually experienced the value indicated, only that some percentage of users experienced a metric value that was less than the value given.
{% endAside %}

#### Metric value types

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>CrUX API Metric Name</th>
<th>Data Type</th>
<th>Metric Units</th>
<th>web.dev Docs</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>cumulative_layout_shift</code></td>
<td>double encoded as string</td>
<td>unitless</td>
<td><a href="https://web.dev/cls/">cls</a></td>
</tr>
<tr>
<td><code>first_contentful_paint</code></td>
<td>int</td>
<td>milliseconds</td>
<td><a href="https://web.dev/fcp/">fcp</a></td>
</tr>
<tr>
<td><code>first_input_delay</code></td>
<td>int</td>
<td>milliseconds</td>
<td><a href="https://web.dev/fid/">fid</a></td>
</tr>
<tr>
<td><code>interaction_to_next_paint</code></td>
<td>int</td>
<td>milliseconds</td>
<td><a href="https://web.dev/inp/">inp</a></td>
</tr>
<tr>
<td><code>largest_contentful_paint</code></td>
<td>int</td>
<td>milliseconds</td>
<td><a href="https://web.dev/lcp/">lcp</a></td>
</tr>
<tr>
<td><code>experimental_time_to_first_byte</code></td>
<td>int</td>
<td>milliseconds</td>
<td><a href="https://web.dev/ttfb/">ttfb</a></td>
</tr>
<tr>
<td><code>experimental_interaction_to_next_paint</code> (deprecated)</td>
<td>int</td>
<td>milliseconds</td>
<td><a href="https://web.dev/inp/">inp</a></td>
</tr>
</tbody>
</table></div>

{% Aside 'important' %}
The `interaction_to_next_paint` metric is available both with and without the experimental prefix. The experimental prefix should now be considered deprecated and will be removed in August 2023. The non-prefixed schema should be used going forward.
{% endAside %}

#### BigQuery metric name mapping

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>CrUX API Metric Name</th>
<th>BigQuery Metric Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>cumulative_layout_shift</code></td>
<td><code>layout_instability.cumulative_layout_shift</code></td>
</tr>
<tr>
<td><code>first_contentful_paint</code></td>
<td><code>first_contentful_paint</code></td>
</tr>
<tr>
<td><code>first_input_delay</code></td>
<td><code>first_input.delay</code></td>
</tr>
<tr>
<td><code>interaction_to_next_paint</code></td>
<td><code>interaction_to_next_paint</code></td>
</tr>
<tr>
<td><code>largest_contentful_paint</code></td>
<td><code>largest_contentful_paint</code></td>
</tr>
<tr>
<td><code>experimental_time_to_first_byte</code></td>
<td><code>experimental.time_to_first_byte</code></td>
</tr>
<tr>
<td><code>experimental_interaction_to_next_paint</code> (deprecated)</td>
<td><code>experimental.interaction_to_next_paint</code> (deprecated)</td>
</tr>
</tbody>
</table></div>

### Collection period

As of October 2022, the CrUX API contains a `collectionPeriod` object with `firstDate` and `endDate` fields representing the beginning and end dates of the aggregation window. An example is provided below:

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

This allows better understanding of the data and whether it's been updated yet for that day or is returning the same data as yesterday.

Note that the CrUX API is approximately two days behind today's date since it waits for completed data for the day, and there is some processing time involved before it is available in the API. The timezone used is Pacific Standard Time (PST) with no changes for daylight savings.

## Example queries

Queries are submitted as JSON objects via a POST request to `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=[YOUR_API_KEY]"` with query data as a JSON object in the POST body, e.g.


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
curl -s --request POST 'https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=API_KEY' \
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

If no `formFactor` value is provided then the values will be aggregated across all form factors.

See [Using the Chrome UX Report API](/blog/chrome-ux-report-api/) for more example queries.

## Data pipeline

The CrUX dataset is processed through a pipeline to consolidate, aggregate and filter the data before becoming available via the API.

### The rolling average

The data in the Chrome UX Report is a 28-day rolling average of aggregated metrics. This means that the data presented in the Chrome UX Report at any given time is actually data for the past 28 days aggregated together.

This is similar to how the [CrUX dataset on BigQuery](../bigquery/) aggregates monthly reports.

### Daily updates

Data is updated daily around 04:00 UTC. There is no service level agreement for update times; it is run on a best-effort basis every day.

{% Aside 'caution' %}
Data will not differ within the same day after it has been updated around 04:00 UTC, repeated calls will yield the same results.
{% endAside %}

## Schema

There is a single endpoint for the CrUX API which accepts `POST` HTTP requests. The API returns a `record` which contains one or more `metrics` corresponding to performance data about the requested origin or page.

### HTTP request

```http
POST https://chromeuxreport.googleapis.com/v1/records:queryRecord
```

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Request body

The request body should contain data with the following structure:

```json
{
  "effectiveConnectionType": string,
  "formFactor": enum (FormFactor),
  "metrics": [
    string
  ],

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
    <tr>
      <td><code translate="no" dir="ltr">effectiveConnectionType</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The effective connection type is a query dimension that specifies the effective network class that the record's data should belong to.</p>
        <p>This field uses the values <code>["offline", "slow-2G", "2G", "3G", "4G"]</code> as specified in the <a href="https://wicg.github.io/netinfo/#effective-connection-types">Network Information API specification</a></p>
        <p>Note: If no effective connection type is specified, then a special record with aggregated data over all effective connection types will be returned.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">formFactor</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">enum (<a href="#form-factor">FormFactor</a></code>)</code></strong></p>
        <p>The form factor is a query dimension that specifies the device class that the record's data should belong to.</p>
        <p>This field uses the values <code>DESKTOP</code> or <code>PHONE</code>.</p>
        <p>Note: If no form factor is specified, then a special record with aggregated data over all form factors will be returned.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">metrics[]</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The metrics that should be included in the response. If none are specified then any metrics found will be returned.</p><p>Allowed values: <code>["cumulative_layout_shift", "first_contentful_paint", "first_input_delay", "interaction_to_next_paint", "largest_contentful_paint", "experimental_time_to_first_byte", "experimental_interaction_to_next_paint"]</code></p>
      </td>
    </tr>
    <tr>
      <td colspan="2">Union field <code translate="no" dir="ltr">url_<wbr>pattern</code>. The url pattern is the main identifier for a record lookup. It can be one of multiple types of values. <code translate="no" dir="ltr">url_<wbr>pattern</code> can be only one of the following:</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">origin</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The url pattern "origin" refers to a url pattern that is the origin of a website.</p><p>Examples: <code>"https://example.com"</code>, <code>"https://cloud.google.com"</code></p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">url</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The url pattern "url" refers to a url pattern that is any arbitrary url.</p><p>Examples: <code>"https://example.com/</code>, <code>https://cloud.google.com/why-google-cloud/"</code></p>
      </td>
    </tr>
  </tbody>
</table>

For example, to request the desktop largest contentful paint values for the Chrome developer documentation homepage:

```json
{
  "url": "https://developer.chrome.com/docs/",
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
      "formFactor": "DESKTOP",
      "url": "https://developer.chrome.com/docs/"
    },
    "metrics": {
      "largest_contentful_paint": {
        "histogram": [
          {
            "start": 0,
            "end": 2500,
            "density": 0.98148451581189577
          },
          {
            "start": 2500,
            "end": 4000,
            "density": 0.010814353596591841
          },
          {
            "start": 4000,
            "density": 0.0077011305915124116
          }
        ],
        "percentiles": {
          "p75": 651
        }
      }
    },
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
  }
}
```

#### Key {: #api-response-key }

`Key` defines all the dimensions that identify this record as unique.

```json
{
  "effectiveConnectionType": string,
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
      <td><code translate="no" dir="ltr">effectiveConnectionType</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">string</code></strong></p>
        <p>The effective connection type is the general connection class that all users experienced for this record. This field uses the values ["offline", "slow-2G", "2G", "3G", "4G"] as specified in: <a href="https://wicg.github.io/netinfo/#effective-connection-types">https://wicg.github.io/netinfo/#effective-connection-types</a></p><p>If the effective connection type is unspecified, then aggregated data over all effective connection types will be returned.</p>
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
  "histogram": [
    {
      object (Bin)
    }
  ],
  "percentiles": {
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
      <td><code translate="no" dir="ltr">histogram[]</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">object (<a href="#api-response-bin">Bin</a>)</code></strong></p>
        <p>The histogram of user experiences for a metric. The histogram will have at least one bin and the densities of all bins will add up to ~1.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">percentiles</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">object (<a href="#api-response-percentiles">Percentiles</a>)</code></strong></p>
        <p>Common useful percentiles of the Metric. The value type for the percentiles will be the same as the value types given for the Histogram bins.</p>
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
  "density": number
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
      <td><code translate="no" dir="ltr">density</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">number</code></strong></p>
        <p>The proportion of users that experienced this bin's value for the given metric.</p>
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
      <td><code translate="no" dir="ltr">p75</code></td>
      <td>
        <p><strong><code class="apitype" translate="no" dir="ltr">value (<a href="https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Value">Value</a> format)</code></strong></p>
        <p>75% of users experienced the given metric at or below this value.</p>
      </td>
    </tr>
  </tbody>
</table>

#### UrlNormalization {: #api-response-urlnormalization }

Object representing the normalization actions taken to normalize a url to achieve a higher chance of successful lookup. These are simple automated changes that are taken when looking up the provided `url_patten` would be known to fail. Complex actions like following redirects are not handled.

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

The CrUX API is limited to 150 queries per minute per Google Cloud project, which is offered free of charge. This limit, and your current usage, can be seen in the [Google Cloud Console](https://console.cloud.google.com/apis/api/chromeuxreport.googleapis.com/quotas). This generous quota should be sufficient for the vast majority of use cases and at present it is not possible to pay for an increased quota.

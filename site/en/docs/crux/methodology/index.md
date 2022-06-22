---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX Methodology

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  All about CrUX eligibility, metrics, dimensions and accessing the data

# Optional
# This appears below the title and is an optional teaser
subhead: >
  All about CrUX eligibility, metrics, dimensions and accessing the data

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

The Chrome User Experience Report (also known as the Chrome UX Report, or CrUX for short) is a dataset that reflects how real-world Chrome users experience popular destinations on the web.

CrUX is the official dataset of the [Web Vitals](https://web.dev/vitals/) program. All user-centric Core Web Vitals metrics will be represented in the dataset.

## Methodology

This section documents how CrUX collects and organizes user experience data.

### Eligibility

At the core of the CrUX dataset are individual user experiences, which are aggregated into page-level and origin-level distributions. This section documents user eligibility and the requirements for pages and origins to be included in the dataset.

Pages and origins will be automatically included or removed from the dataset if their eligibility changes over time. There is not currently a way to manually submit pages or origins for inclusion.

#### User {: #user-eligibility}

For a **user** to have their experiences aggregated in the CrUX dataset, they must meet the following criteria:

1. Enable [usage statistic reporting](https://support.google.com/chrome/answer/96817)
2. Sync their [browser history](https://support.google.com/chrome/answer/185277)
3. Not have a [Sync passphrase](​​https://support.google.com/chrome/answer/165139?co=GENIE.Platform%3DAndroid#zippy=%2Ccreate-a-passphrase) set
4. Use a supported platform

Chrome does not publish data about the proportions of users that meet these criteria. You can learn more about the data we collect in the [Chrome Privacy Whitepaper](https://www.google.com/chrome/privacy/whitepaper.html#usagestats).

The current supported platforms are:

- Desktop versions of Chrome including Windows, MacOS, ChromeOS, and Linux operating systems
- Android versions of Chrome, including native apps using [Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs/)

There are a few notable exceptions of platforms that are not supported by the CrUX dataset:

- Chrome on iOS
- Native Android apps using WebView
- Other Chromium browsers (e.g. [Microsoft Edge](https://www.microsoft.com/en-us/edge))

#### Origin {: #origin-eligibility }

An [**origin**](https://developer.mozilla.org/en-US/docs/Glossary/Origin) represents an entire website, addressable by a URL like `https://www.example.com`. For an origin to be included in the CrUX dataset it must meet two requirements:

1. Publicly discoverable
2. Sufficiently popular

An origin is considered to be publicly discoverable if its **root page** is discoverable. For example, the root page of the origin `https://www.example.com` would have a URL of `https://www.example.com/`. If the root page has any HTTP redirects, the origin will be assessed based on the redirected page as experienced by Google's web crawler.

You can verify that your origin is discoverable by running a [Lighthouse audit](https://web.dev/measure/) with the SEO category enabled. Your site is not discoverable if your root page (e.g. <https://www.example.com/>) fails the [_Page is blocked from indexing_](https://web.dev/is-crawable/) or [_Page has unsuccessful HTTP status code_](https://web.dev/http-status-code/) audits.

If an origin is determined to be publicly discoverable, eligible user experiences on _all_ of that origin's pages are aggregated at the origin-level, regardless of the pages' individual discoverability. All of these experiences count towards the origin's popularity requirement.

The origins in the CrUX dataset are all lowercase and do not include port numbers, for example `:8080` is omitted.

#### Page {: #page-eligibility}

The requirements for a **page** to be included in the CrUX dataset are the same as origin:

1. Publicly discoverable
2. Sufficiently popular

A page is determined to be **publicly discoverable** using the same [indexability](https://developers.google.com/search/docs/advanced/crawling/block-indexing) and [crawlability](https://developers.google.com/search/docs/advanced/robots/intro) criteria as search engines. A page will not meet the discoverability requirement if any of the following conditions are met:

- The page is served with an HTTP [status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) other than `200` (after following any redirects)
- The page is served with an HTTP `X-Robots-Tag: noindex` [header](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#xrobotstag-implementation)
- The document includes a `<meta name="robots" content="noindex">` [meta tag](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag)
- The URL is disallowed by [robots.txt](https://developers.google.com/search/docs/advanced/robots/intro)

You can verify that a page is discoverable by running a [Lighthouse audit](https://web.dev/measure/) with the SEO category enabled. Your page is not discoverable if it fails the [_Page is blocked from indexing_](https://web.dev/is-crawable/) or [_Page has unsuccessful HTTP status code_](https://web.dev/http-status-code/) audits.

A page is determined to be **sufficiently popular** if it has a minimum number of distinct visitors. We don't disclose an exact number, but it has been chosen to ensure that we have enough samples to be confident in the statistical distribution.

Pages commonly have additional identifiers in their URL including query string parameters like `?utm_medium=email` and fragments like `#main`. These identifiers are stripped from the URL in the CrUX dataset so that all user experiences on the page are aggregated together. This is useful for pages that would otherwise not meet the popularity threshold if there were many disjointed URL aggregations for the same page. Note that under certain conditions this may unexpectedly group experiences for distinct pages together; for example if parameters `?productID=101` and `?productID=102` represent different pages.

A website's architecture may complicate how its data is represented in CrUX. For example, single page apps (SPAs) may use a JavaScript-based _soft navigation_ scheme to transition between pages. These soft navigations appear as new page views to the user, but to Chrome and the underlying platform APIs, the entire experience is attributed to the initial page view. This isn't a problem for traditional websites that use HTML anchor-based _hard navigations_ to transition between pages. This is a limitation of the native web platform APIs on which CrUX is built.

### Tools

The CrUX dataset is made available through a variety of tools maintained by Google. This section briefly summarizes each tool and how the data can be used.

#### CrUX BigQuery

Origin-level CrUX data is available for public querying via [BigQuery](https://cloud.google.com/bigquery). Read the guide on [Using the Chrome UX Report](https://web.dev/chrome-ux-report-bigquery/).

Pros

- Query any and all origins
- Historical data going back to 2017
- All metrics, including experimental
- All dimensions including country, form factor, and effective connection type
- Full histograms

Cons

- Updated monthly - on the second Tuesday of each month
- Limited to origin-level data
- Percentiles are interpreted based on coarse histogram data

#### CrUX Dashboard

The [CrUX Dashboard](https://web.dev/chrome-ux-report-data-studio-dashboard/) is a Data Studio dashboard that allows you to query and render CrUX data into an interactive dashboard or export to PDF reports.

Pros

- Visualizations of monthly trends
- Historical data going back to 2017
- Core Web Vitals console
- All metrics, including experimental
- Form factor dimension

Cons

- No effective connection type or country dimensions
- No page-level data
- Coarse percentiles

#### CrUX API

The [CrUX API](https://web.dev/chrome-ux-report-api/) provides programmatic access to CrUX data by page or origin.

Pros

- Query any specified origin or URL
- Updated daily

Cons

- No historical data
- Limited to Core Web Vitals and Web Vitals metrics

#### PageSpeed Insights

[PageSpeed Insights](https://pagespeed.web.dev/) uses CrUX data to present field performance statistics.

Pros

- CrUX data combined with lab data and recommendations
- Page-level information where available
- Mobile & Desktop dimensions

Cons

- No historical data
- Limited to Core Web Vitals metrics
- No geography or connection type dimensions

#### PageSpeed Insights API

The [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) offers programmatic access to the data shown in PageSpeed Insights, including Core Web Vitals data from CrUX.

Pros

Cons

- No historical data
- Limited to Core Web Vitals metrics
- No geography or connection type dimensions

#### Search Console

[Search Console](https://search.google.com/search-console) shows how CrUX data is used to determine the [Page Experience](https://developers.google.com/search/docs/advanced/experience/page-experience) ranking factor by URL and URL group.

Pros

- Page-level Core Web Vitals

Cons

- 20 URLs shown per URL group

### Metrics

Metrics provided by the public Chrome User Experience Report hosted on Google BigQuery are powered by standard web platform APIs exposed by modern browsers and aggregated to origin-resolution. Site owners that want more detailed (URL level resolution) analysis and insight into their site performance can use the same APIs to gather detailed real user measurement (RUM) data for their own origins.
Most metrics are represented as a histogram aggregation, see TODO for examples to calculate percentiles from the histogram.

| Metric                                                       | CrUX Field Name                              | Unit              | Purpose                       | Aggregation                    | Example                                                       |
|--------------------------------------------------------------|----------------------------------------------|-------------------|-------------------------------|--------------------------------|---------------------------------------------------------------|
| [First Paint](#fp-metric)                                    | `first_paint`                                | Milliseconds (ms) | Render performance            | Histogram                      | `start: 400, end: 500, density: 0.02`                         |
| [First Contentful Paint](#fcp-metric)                        | `first_contentful_paint`                     | Milliseconds (ms) | Render performance            | Histogram                      |                                                               |
| [DOM Content Loaded](#dcl-metric)                            | `dom_content_loaded`                         | Milliseconds (ms) | Page performance              | Histogram                      |                                                               |
| [Largest Contentful Paint](#lcp-metric)                      | `largest_contentful_paint`                   | Milliseconds (ms) | Render performance            | Histogram                      |                                                               |
| [Onload](#ol-metric)                                         | `onload`                                     | Milliseconds (ms) | Page performance              | Histogram                      |                                                               |
| [First Input Delay](#fid-metric)                             | `first_input`                                | Milliseconds (ms) | Interactivity                 | Histogram                      |                                                               |
| [Cumulative Layout Shift](#cls-metric)                       | `layout_instability.cumulative_layout_shift` | Numeric (0 - ∞)   | Experience / visual stability | Histogram                      | `start: 0.15, end: 0.2, density: 0.0011`                      |
| [Time to First Byte](#ttfb-metric)                           | `experimental.time_to_first_byte`            | Milliseconds (ms) | Back-end performance          | Histogram                      |                                                               |
| [Responsiveness](#responsiveness-metric)                     | `experimental.responsiveness`                | Milliseconds (ms) | Interactivity                 | Histogram                      | `start: 50, end: 75, density: 0.005`                          |
| [Popularity](#popularity-metric)                             | `experimental.popularity.rank`               | Rank              | Origin popularity             | log10 intervals from 1k to 10M | `rank: 100000`                                                |
| [Notification Permissions](#notification-permissions-metric) | `experimental.permission.notifications`      | Fraction          | Permission opt-in             | Fraction                       | `accept: 0.006, deny: 0.0191, ignore: 0.086, dismiss: 0.0068` |

#### First Paint {: #fp-metric }

{% Aside %}
"First Paint reports the time when the browser first rendered after navigation. This excludes the default background paint, but includes non-default background paint. This is the first key moment developers care about in page load – when the browser has started to render the page." -[Paint Timing API](https://w3c.github.io/paint-timing/#first-paint)
{% endAside %}

#### First Contentful Paint {: #fcp-metric }

{% Aside %}
"First Contentful Paint reports the time when the browser first rendered any text, image (including background images), non-white canvas or SVG. This includes text with pending webfonts. This is the first time users could start consuming page content." - [https://w3c.github.io/paint-timing/#first-contentful-paint](Paint Timing API)
{% endAside %}

#### DOM Content Loaded {: #dcl-metric }

{% Aside %}
"The DOMContentLoaded reports the time when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading." - [MDN](https://developer.mozilla.org/en-US/docs/web/api/window/domcontentloaded_event)
{% endAside %}

#### Largest Contentful Paint {: #lcp-metric }

{% Aside %}
"Largest Contentful Paint (LCP) is an important, user-centric metric for measuring perceived load speed because it marks the point in the page load timeline when the page's main content has likely loaded — a fast LCP helps reassure the user that the page is useful." - [https://web.dev/lcp/](web.dev/lcp/)
{% endAside %}

#### Onload {: #ol-metric }

{% Aside %}
"The load event is fired when the page and its dependent resources have finished loading." - [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/load)
{% endAside %}

#### First Input Delay {: #fid-metric }

{% Aside %}
"First Input Delay (FID) is an important, user-centric metric for measuring load responsiveness because it quantifies the experience users feel when trying to interact with unresponsive pages—a low FID helps ensure that the page is usable." - [web.dev/fid/](https://web.dev/fid/)
{% endAside %}

#### Cumulative Layout Shift {: #cls-metric }

{% Aside %}
"Cumulative Layout Shift (CLS) is an important, user-centric metric for measuring visual stability because it helps quantify how often users experience unexpected layout shifts — a low CLS helps ensure that the page is delightful." - [web.dev/cls/](https://web.dev/cls/)
{% endAside %}

#### Experimental {: #experimental-metrics }

Experimental metrics are available in the CrUX dataset via [BigQuery](../bigquery/). These metrics are likely to change regularly as they evolve based on user feedback. Check the [release notes](../release-notes/) to keep up to date on the latest changes.

##### Time to First Byte {: #ttfb-metric }

{% Aside %}
"Time to First Byte (TTFB) refers to the time between the browser requesting a page and when it receives the first byte of information from the server. This time includes DNS lookup and establishing the connection using a TCP handshake and SSL handshake if the request is made over https. TTFB is the time it takes between the start of the request and the start of the response, in milliseconds" - [MDN](https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte)
{% endAside %}

##### Responsiveness {: #responsiveness-metric}

[Responsiveness](https://web.dev/responsiveness/) was added to the CrUX dataset in February 2022. This new metric captures the end-to-end latency of individual events and offers a more holistic picture of the overall responsiveness of a page throughout its lifetime.

##### Popularity {: #popularity-metric}

The [popularity rank](https://developer.chrome.com/blog/crux-rank-magnitude/) metric provides an indication of how each origin ranks in total visits. The ranking is one of: top 1k, 10k, 100k, 1M and 10M origins.

##### Notification Permissions {: #notification-permissions-metric }

{% Aside %}
"The Notifications API allows web pages to control the display of system notifications to the end user. These are outside the top-level browsing context viewport, so therefore can be displayed even when the user has switched tabs or moved to a different app. The API is designed to be compatible with existing notification systems, across different platforms." - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
{% endAside %}

### Dimensions

The CrUX dataset includes dimension data to allow deeper interrogation of the data. Dimensions identify a specific group of data that a record is being aggregated against, e.g. a form factor of `Mobile` indicates that the record contains information about loads that took place on a mobile device.
Data may not be available for all dimensions, based on [eligibility criteria](#page-eligibility).

#### Effective Connection Type {: #ect-dimension }

[Effective Connection Type](https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type) is a web platform API to broadly categorize visitor connection speeds. This dimension in the CrUX dataset allows you to:
See a breakdown of connection speeds of real visitors
Filter performance data by connection speed

Note that the specification defines four connection types, the majority of visits will likely be faster than `3g` and thus be classified as `4g`:

| ECT     | Minimum RTT | Maximum downlink | Explanation                                                                                              |
|---------|-------------|------------------|----------------------------------------------------------------------------------------------------------|
| slow-2g | 2000ms      | 50 Kbps          | The network is suited for small transfers only such as text-only pages.                                  |
| 2g      | 1400ms      | 70 Kbps          | The network is suited for transfers of small images.                                                     |
| 3g      | 270ms       | 700 Kbps         | The network is suited for transfers of large assets such as high resolution images, audio, and SD video. |
| 4g      | 0ms         | ∞                | The network is suited for HD video, real-time video, etc.                                                |

#### Form Factor {: #form-factor-dimension }

The form factor dimension allows you to query against three separate form factors:
Mobile
Tablet
Desktop
Form factor is inferred from the device [user-agent string](https://developer.chrome.com/docs/multidevice/user-agent/).

#### Country {: #country-dimension }

The Country dimension was [added to CrUX in 2018](https://developer.chrome.com/blog/crux-2018-01/). The term "country" is used loosely, as some geographic areas are politically disputed. Values in the country dimension are inferred from user IP address and represented as two-letter country codes as defined in [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

### Accelerated Mobile Pages (AMP)

TODO

### Data quality

NOTES:
Filtering - lowest dimensionality assessed for eligibility independently, if total eligible distincts is <20% of all distincts on origin then a URL is excluded from the dataset. TBD how this impacts origin data.
Fuzzing - A small amount of randomness is added to the data to ensure anonymity and prevent determination of sensitive metrics such as total distinct visitors
Precision - histogram densities are rounded to four decimal places
Sampling - data is not sampled on collection, i.e. all experiences which meet the eligibility criteria are included in the calculations.

## Feedback & Support

We would love to hear your feedback, questions, and suggestions to help us improve the Chrome User Experience Report. Please join the conversation on our [public Google Group](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report).
We cannot offer individual support for CrUX, but the group has a large amount of information and discussion which may already answer your questions.
We also tweet on [@ChromeUXReport](https://twitter.com/chromeuxreport) with updates. There is also a [discussion forum](https://discuss.httparchive.org/) on HTTP Archive with many analyses driven by CrUX data.

## License

CrUX datasets by Google are licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

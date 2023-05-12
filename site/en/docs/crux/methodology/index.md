---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX methodology

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Technical documentation on CrUX eligibility, metrics, dimensions and accessing the data.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  This section documents how CrUX collects and organizes user experience data.

# Required
date: 2022-06-23

# Optional
# Include an updated date when you update your post
updated: 2023-04-19

# Optional
# How to add a new author
# /docs/handbook/how-to/add-an-author/
#authors:

# Optional
# How to a new tag
# /docs/handbook/how-to/add-a-tag/
tags:
  - web-vitals
  - crux
---

## Eligibility

At the core of the CrUX dataset are individual user experiences, which are aggregated into page-level and origin-level distributions. This section documents user eligibility and the requirements for pages and origins to be included in the dataset. All eligibility criteria must be satisfied in order for an experience to be included in page-level data available in PageSpeed Insights and the CrUX API: [User](#user-eligibility), [Origin](#origin-eligibility) and [Page](#page-eligibility). Experiences which meet the User and Origin criteria but not Page will be included in the origin-level data available in all CrUX data sources.

Pages and origins will be automatically included or removed from the dataset if their eligibility changes over time. There is not currently a way to manually submit pages or origins for inclusion.

### Publicly discoverable {: #discoverability-eligibility }

A page must be publicly discoverable to be considered for inclusion in the CrUX dataset.

A page is determined to be publicly discoverable using the same [indexability](https://developers.google.com/search/docs/advanced/crawling/block-indexing) criteria as search engines.

Any page will **not** meet the discoverability requirement if **any** of the following conditions are met, including root pages for the origin dataset:

- The page is served with an HTTP [status code](https://developer.mozilla.org/docs/Web/HTTP/Status) other than `200` (after redirects).
- The page is served with an HTTP `X-Robots-Tag: noindex` [header](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#xrobotstag-implementation) or equivalent.
- The document includes a `<meta name="robots" content="noindex">` [meta tag](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag) or equivalent.

Refer to [Google Search Console](https://search.google.com/search-console/about) for an overview of your site's indexing status.

### Sufficiently popular {: #popularity-eligibility }

A page is determined to be sufficiently popular if it has a minimum number of visitors. An origin is determined to be sufficiently popular if it has a minimum number of visitors across all of its pages. An exact number is not disclosed, but it has been chosen to ensure that we have enough samples to be confident in the statistical distributions for included pages. The minimum number is the same for pages and origins.

Pages and origins that do not meet the popularity threshold are not included in the CrUX dataset.

### Origin {: #origin-eligibility }

An [**origin**](https://developer.mozilla.org/docs/Glossary/Origin) represents an entire website, addressable by a URL like `https://www.example.com`. For an origin to be included in the CrUX dataset it must meet two requirements:

1. [Publicly discoverable](#discoverability-eligibility)
2. [Sufficiently popular](#popularity-eligibility)

You can verify that your origin is discoverable by running a [Lighthouse audit](https://pagespeed.web.dev/) and looking at the SEO category results. Your site is not discoverable if your root page fails the [_Page is blocked from indexing_](https://web.dev/is-crawable/) or [_Page has unsuccessful HTTP status code_](https://web.dev/http-status-code/) audits.

If an origin is determined to be publicly discoverable, eligible user experiences on _all_ of that origin's pages are aggregated at the origin-level, regardless of individual page discoverability. All of these experiences count towards the origin's popularity requirement.

For querying purposes, note that all origins in the CrUX dataset are lowercase.

### Page {: #page-eligibility}

The requirements for a **page** to be included in the CrUX dataset are the same as origins:

1. [Publicly discoverable](#discoverability-eligibility)
2. [Sufficiently popular](#popularity-eligibility)

You can verify that a page is discoverable by running a [Lighthouse audit](https://pagespeed.web.dev/) and looking at the SEO category results. Your page is not discoverable if it fails the [_Page is blocked from indexing_](https://web.dev/is-crawable/) or [_Page has unsuccessful HTTP status code_](https://web.dev/http-status-code/) audits.

Pages commonly have additional identifiers in their URL including query string parameters like `?utm_medium=email` and fragments like `#main`. These identifiers are stripped from the URL in the CrUX dataset so that all user experiences on the page are aggregated together. This is useful for pages that would otherwise not meet the popularity threshold if there were many disjointed URL variations for the same page. Note that in rare cases this may unexpectedly group experiences for distinct pages together; for example if parameters `?productID=101` and `?productID=102` represent different pages.

Pages in CrUX are measured based on the top-level page. Pages included as iframes are not reported on separately in CrUX, but do contribute to the metrics of the top-level page. For example, if `https://www.example.com/page.html` embeds `https://www.example.com/frame.html` in an iframe, then `page.html` _will be_ represented in CrUX (subject to the other eligibility criteria) but `frame.html` _will not_. And if `frame.html` has poor [CLS](#cls-metric) then the CLS will be included when measuring the CLS for `page.html`. CrUX is the Chrome _User Experience_ Report and a user may not even be aware this is an iframe. Therefore, the experience is measured at the top level page—as per how the user sees this.

A website's architecture may complicate how its data is represented in CrUX. For example, single page apps (SPAs) may use a JavaScript-based _route transition_ scheme to move between pages, as opposed to traditional anchor-based page navigations. These transitions appear as new page views to the user, but to Chrome and the underlying platform APIs the entire experience is attributed to the initial page view. This is a limitation of the native web platform APIs on which CrUX is built, see [How SPA architectures affect Core Web Vitals](https://web.dev/vitals-spa-faq/) on web.dev for more information.

### User {: #user-eligibility}

For a **user** to have their experiences aggregated in the CrUX dataset, they must meet the following criteria:

1. Enable [usage statistic reporting](https://support.google.com/chrome/answer/96817).
2. Sync their [browser history](https://support.google.com/chrome/answer/185277).
3. Not have a [Sync passphrase](https://support.google.com/chrome/answer/165139?co=GENIE.Platform%3DAndroid#zippy=%2Ccreate-a-passphrase) set.
4. Use a supported platform.

The current supported platforms are:

- Desktop versions of Chrome including Windows, MacOS, ChromeOS, and Linux operating systems.
- Android versions of Chrome, including native apps using [Custom Tabs](/docs/android/custom-tabs/) and [WebAPKs](https://web.dev/webapks/).

There are a few notable exceptions that do not provide data to the CrUX dataset:

- Chrome on iOS.
- Native Android apps using WebView.
- Other Chromium browsers (for example [Microsoft Edge](https://www.microsoft.com/edge)).

Chrome does not publish data about the proportions of users that meet these criteria. You can learn more about the data we collect in the [Chrome Privacy Whitepaper](https://www.google.com/chrome/privacy/whitepaper.html#usagestats).

### Accelerated Mobile Pages (AMP)

Pages built with AMP are included in the CrUX dataset like any other web page. As of the [June 2020 CrUX release](/docs/crux/release-notes/#202006), pages served via the [AMP Cache](https://developers.google.com/amp/cache) and / or rendered in the [AMP Viewer](https://developers.google.com/search/docs/advanced/experience/about-amp#about-google-amp-viewer) are also captured, and attributed to the publisher's page URL.

## Tools

The CrUX dataset is made available through a variety of tools maintained by Google. Each tool may access CrUX data slightly differently, resulting in varying levels of timeliness and metric support.

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>Tool</th>
<th>Frequency</th>
<th>Metrics</th>
<th>Dimensions</th>
<th>Historical Data</th>
<th>Origin / Page-level</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#tool-bigquery">CrUX on BigQuery</a></td>
<td>Monthly <a href="#footnote-1"><sup>1</sup></a></td>
<td>All metrics</td>
<td>All dimensions</td>
<td>Since 2017 <a href="#footnote-5"><sup>5</sup></a></td>
<td>Origin</td>
</tr>
<tr>
<td><a href="#tool-crux-dash">CrUX Dashboard</a></td>
<td>Monthly <a href="#footnote-1"><sup>1</sup></a></td>
<td>All metrics</td>
<td>No country dimension</td>
<td>Since 2017 <a href="#footnote-5"><sup>5</sup></a></td>
<td>Origin</td>
</tr>
<tr>
<td><a href="#tool-crux-api">CrUX API</a></td>
<td>28-day average <a href="#footnote-2"><sup>2</sup></a></td>
<td>Subset of key metrics  <a href="#footnote-4"><sup>4</sup></a></td>
<td>No country dimension</td>
<td>No</td>
<td>Origin &amp; Page</td>
</tr>
<tr>
<td><a href="#tool-crux-history-api">CrUX History API</a></td>
<td>Weekly <a href="#footnote-3"><sup>3</sup></a></td>
<td>Subset of key metrics  <a href="#footnote-4"><sup>4</sup></a></td>
<td>No country dimension</td>
<td>Previous 25 weeks</td>
<td>Origin &amp; Page</td>
</tr>
<tr>
<td><a href="#tool-psi">PageSpeed Insights</a></td>
<td>28-day average <a href="#footnote-2"><sup>2</sup></a></td>
<td>Subset of key metrics  <a href="#footnote-4"><sup>4</sup></a></td>
<td>No effective connection type or country dimensions</td>
<td>No</td>
<td>Origin &amp; Page</td>
</tr>
<tr>
<td><a href="#tool-psi-api">PageSpeed Insights API</a></td>
<td>28-day average <a href="#footnote-2"><sup>2</sup></a></td>
<td>Subset of key metrics  <a href="#footnote-4"><sup>4</sup></a></td>
<td>No effective connection type or country dimensions</td>
<td>No</td>
<td>Origin &amp; Page</td>
</tr>
<tr>
<td><a href="#tool-gsc">Google Search Console</a></td>
<td>28-day average <a href="#footnote-2"><sup>2</sup></a></td>
<td>Core web vitals</td>
<td>No dimensions</td>
<td>Three months</td>
<td>Page Group <a href="#footnote-6"><sup>6</sup></a></td>
</tr>
</tbody>
</table></div>

<p>
<a id="footnote-1"><sup>1</sup></a> Monthly data is released on the second Tuesday after each monthly collection period. The last 28 days of each month period are included.<br>
<a id="footnote-2"><sup>2</sup></a> 28-day rolling average data is updated daily, based on the aggregated data from the previous 28 days.<br>
<a id="footnote-3"><sup>3</sup></a> Weekly historical data is released every Monday, containing the 25 most recent 28 day collection periods that end on Saturdays.<br>
<a id="footnote-4"><sup>4</sup></a> The web vital metrics are available in all tools.<br>
<a id="footnote-5"><sup>5</sup></a> Not all metrics are available in all monthly tables, see the <a href="/docs/crux/release-notes">release notes</a> for details.<br>
<a id="footnote-6"><sup>6</sup></a> Search Console <a href="https://support.google.com/webmasters/answer/9205520#page_groups">groups URLs</a> that provide similar experiences, Core Web Vitals data are shown aggregated by these page groups.
</p>

The following sections briefly summarize each tool and how the data can be used.

### CrUX on BigQuery {: #tool-bigquery}

Origin-level CrUX data is available for public querying via [BigQuery](https://cloud.google.com/bigquery). Read the guide on [Using the Chrome UX Report](/blog/chrome-ux-report-bigquery/).

[CrUX on BigQuery](/docs/crux/bigquery/) provides a publicly accessible database of all origin-level data collected by CrUX. It is possible to query any and all origins for which data is collected, analyze any metric that CrUX supports and filter by all available dimensions. Full metric histograms are stored in the BigQuery tables allowing for visualization of performance distributions, including experimental metrics.

The data in BigQuery is updated monthly, with each month's data released on the second Tuesday after the collection period. Page-level data is not available in BigQuery tables, and percentiles are interpreted from coarse histogram data which results in approximate values.

Use CrUX on BigQuery for analysis across any dimension: origins, countries, dates, form factor and connection type. Read more on the [CrUX on BigQuery](/docs/crux/bigquery/) documentation page.

### CrUX Dashboard {: #tool-crux-dash}

The [CrUX Dashboard](/docs/crux/dashboard) is a Looker Studio dashboard that allows you to query and render CrUX data into an interactive dashboard, as well as exporting PDF reports.

The dashboard provides visualization of all CrUX metrics in monthly trends, with data available back to 2017. Data can be split by form factor to compare mobile / tablet / desktop performance and performance goals are available to create red-amber-green visualizations. Effective connection type can be shown as a distribution.

The CrUX Dashboard does not support the country dimension, so all global data is presented in the reports. Page-level data is not available and percentile values are calculated from coarse histogram data so are approximate.

### CrUX API {: #tool-crux-api}

The [CrUX API](/docs/crux/api/) provides programmatic access to CrUX data by page or origin, and can be further filtered by form factor, effective connection type and metrics.

The API provides [Web Vitals](https://web.dev/vitals/) metrics both by origin and at page-level and the data is updated daily. The only values provided for metrics are calculated from the previous 28 days as a rolling window. Historical data is available via the separate [History API](#tool-crux-history-api).

The CrUX API returns more quickly than the [PageSpeed Insights API](#tool-psi-api) but does not include the additional [Lighthouse data](https://developers.google.com/search/blog/2018/11/pagespeed-insights-now-powered-by) provided by PageSpeed Insights.

[Read more in the API documentation](/docs/crux/api/).

### CrUX History API {: #tool-crux-history-api}

The [CrUX History API](/docs/crux/historical-api/) provides programmatic access to CrUX historical data by page or origin, and can be further filtered by form factor, effective connection type and metrics.

The API provides [Web Vitals](https://web.dev/vitals/) metrics both by origin and at page-level and the data is updated weekly. The only values provided for metrics are calculated from the past 25 weekly collection periods of 28 days as a rolling window.

[Read more in the History API documentation](/docs/crux/history-api/).

### PageSpeed Insights {: #tool-psi}

[PageSpeed Insights](https://pagespeed.web.dev/) uses CrUX to present real-user performance data alongside performance opportunities powered by [Lighthouse](/docs/lighthouse/overview/).

The PageSpeed Insights report presents a consolidated view of the Core Web Vitals for the given URL or origin, plus additional diagnostic metrics. Data is presented by desktop and mobile form factors and can be compared with the lab test results to give a better understanding of your page performance.

PageSpeed Insights does not provide historical data, and does not include country or effective connection type dimensions.

### PageSpeed Insights API {: #tool-psi-api}

The [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) offers programmatic access to the data shown in PageSpeed Insights, including Core Web Vitals data from CrUX.

This API integrates well into existing SEO tooling and workflows, allowing CrUX data to be included in automated reports and analyses. The PageSpeed Insights API returns slower than the [CrUX API](#tools-crux-api), but includes additional data provided by [Lighthouse](https://developers.google.com/search/blog/2018/11/pagespeed-insights-now-powered-by).

As in the web version, the PageSpeed Insights API has no historical data and is limited to the Core Web Vitals. Country and effective connection type dimensions are not included.

### Search Console {: #tool-gsc}

[Search Console](https://search.google.com/search-console) shows how CrUX data influences the [page experience](https://developers.google.com/search/docs/advanced/experience/page-experience) ranking factor by URL and URL group.

Search Console presents Core Web Vitals values as aggregates of [groups of similar pages](https://support.google.com/webmasters/answer/9205520#page_groups). This provides a quick indication of which sections of a site are potentially impacting the page experience ranking factor.

Data is updated daily and is split by mobile and desktop form factors. A maximum sample of 20 pages per group are presented for further analysis.

## Metrics

Metrics in CrUX are powered by standard web platform APIs exposed by browsers. In the BigQuery dataset in particular, this data is aggregated to origin-resolution. Site owners requiring more detailed (e.g. URL-level resolution) analysis and insight into their site performance can use the same APIs to gather detailed real user measurement (RUM) data for their own origins. Note that while all APIs are available in Chrome, other browsers may not support the full set of metrics.

Most metrics are represented as a histogram aggregation, allowing visualization of the distribution and approximation of percentile values.

### First Paint {: #fp-metric }

{% Aside %}
"First Paint reports the time when the browser first rendered after navigation. This excludes the default background paint, but includes non-default background paint. This is the first key moment developers care about in page load - when the browser has started to render the page."

<cite><a href="https://w3c.github.io/paint-timing/#first-paint">Paint Timing API</a></p></cite>
{% endAside %}

### First Contentful Paint {: #fcp-metric }

{% Aside %}
"First Contentful Paint reports the time when the browser first rendered any text, image (including background images), non-white canvas or SVG. This includes text with pending webfonts. This is the first time users could start consuming page content."

<cite><a href="https://w3c.github.io/paint-timing/#first-contentful-paint">Paint Timing API</a></cite>
{% endAside %}

### DOM Content Loaded {: #dcl-metric }

{% Aside %}
"The DOMContentLoaded reports the time when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading."

<cite><a href="https://developer.mozilla.org/docs/web/api/window/domcontentloaded_event">MDN</a></cite>
{% endAside %}

### Largest Contentful Paint {: #lcp-metric }

{% Aside %}
"Largest Contentful Paint (LCP) is an important, user-centric metric for measuring perceived load speed because it marks the point in the page load timeline when the page's main content has likely loaded — a fast LCP helps reassure the user that the page is useful."

<cite><a href="https://web.dev/lcp/">web.dev/lcp/</a></cite>
{% endAside %}

### Onload {: #ol-metric }

{% Aside %}
"The load event is fired when the page and its dependent resources have finished loading."

<cite><a href="https://developer.mozilla.org/docs/Web/Events/load">MDN</a></cite>
{% endAside %}

### Cumulative Layout Shift {: #cls-metric }

{% Aside %}
"Cumulative Layout Shift (CLS) is an important, user-centric metric for measuring visual stability because it helps quantify how often users experience unexpected layout shifts — a low CLS helps ensure that the page is delightful."

<cite><a href="https://web.dev/cls/">web.dev/cls/</a></cite>
{% endAside %}

### First Input Delay {: #fid-metric }

{% Aside %}
"First Input Delay (FID) is an important, user-centric metric for measuring load responsiveness because it quantifies the experience users feel when trying to interact with unresponsive pages—a low FID helps ensure that the page is usable."

<cite><a href="https://web.dev/fid/">web.dev/fid/</a></cite>
{% endAside %}

### Interaction to Next Paint {: #inp-metric}

{% Aside %}
"Interaction to Next Paint (INP) is a field metric that assesses [responsiveness](https://web.dev/user-centric-performance-metrics/#types-of-metrics). INP logs the latency of all interactions throughout the entire page lifecycle. The highest value of those interactions—or close to the highest for pages with many interactions—is recorded as the page's INP. A low INP ensures that the page will be reliably responsive at all times."

<cite><a href="https://web.dev/inp/">web.dev/inp/</a></cite>
{% endAside %}

Interaction to Next Paint (INP) was added to the CrUX dataset in [February 2022](/docs/crux/release-notes/#202202). This new metric captures the end-to-end latency of individual events and offers a more holistic picture of the overall responsiveness of a page throughout its lifetime.

### Experimental metrics {: #experimental-metrics }

Experimental metrics are available in the CrUX dataset via [BigQuery](/docs/crux/bigquery/), with some also available in the [CrUX API](/docs/crux/api/). These metrics are likely to change regularly as they evolve based on user feedback. Check the [release notes](/docs/crux/release-notes/) to keep up to date on the latest changes.

#### Time to First Byte {: #ttfb-metric }

{% Aside %}
"Time to First Byte (TTFB) is a foundational metric for measuring connection setup time and web server responsiveness in both the lab and the field. It helps identify when a web server is too slow to respond to requests. In the case of navigation requests—that is, requests for an HTML document—it precedes every other meaningful loading performance metric."

<cite><a href="https://web.dev/ttfb/">web.dev/ttfb/</a></cite>
{% endAside %}

TTFB is only collected on full page loads, unlike other timers (such as [LCP](#lcp-metric)) which are also collected on back-forward navigations and pre-rendering. As such, the sample size of TTFB can be smaller than other metrics and may not necessarily be compared directly with them.

#### Interaction to Next Paint (deprecated){: #inp-metric-experimental}

{% Aside 'important' %}
The Interaction to Next Paint (INP) metric is available both with and without the experimental prefix. The experimental prefix should now be considered deprecated and will be removed in August 2023. The non-prefixed schema should be used going forward.
{% endAside %}

#### Popularity {: #popularity-metric}

The [popularity rank](/blog/crux-rank-magnitude/) metric is a relative measure of site popularity within the CrUX dataset, measured by the total number of navigations on the origin. Rank is on a log10 scale with half steps (e.g. top 1k, top 5k, top 10k, top 50k, top 100k, top 500k, top 1M, etc.) with each rank excluding the previous (e.g. top 5k is actually 4k URLs, excluding top 1k). The upper limit is dynamic as the dataset grows.

Popularity is provided as a guide for broad analysis, e.g. to determine performance by country for the top 1,000 origins.

#### Notification Permissions {: #notification-permissions-metric }

{% Aside %}
"The Notifications API allows web pages to control the display of system notifications to the end user. These are outside the top-level browsing context viewport, so therefore can be displayed even when the user has switched tabs or moved to a different app. The API is designed to be compatible with existing notification systems, across different platforms."

<cite><a href="https://developer.mozilla.org/docs/Web/API/Notifications_API">MDN</a></cite>
{% endAside %}

For websites that request permission to show users notifications, this metric represents the relative frequency of users' responses to the prompts: accept, deny, ignore, or dismiss.

## Dimensions

The CrUX dataset includes dimension data to allow deeper interrogation of the data. Dimensions identify a specific group of data that a record is being aggregated against, e.g. a form factor of `"phone"` indicates that the record contains information about loads that took place on a mobile device.

Data may not be available for all dimensions, based on [eligibility criteria](#page-eligibility).

### Effective Connection Type {: #ect-dimension }

[Effective Connection Type](https://developer.mozilla.org/docs/Glossary/Effective_connection_type) (ECT) is a web platform API to broadly categorize visitor connection speeds. This dimension in the CrUX dataset allows you to:

- See a breakdown of connection speeds of real visitors
- Filter performance data by connection speed

Note that the specification defines four connection types, the majority of visits will likely be on connections faster than `3G` and thus be classified as `4G`:

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>ECT</th>
<th>Minimum RTT</th>
<th>Maximum downlink</th>
<th>Explanation</th>
</tr>
</thead>
<tbody>
<tr>
<td>offline</td>
<td>N/A</td>
<td>N/A</td>
<td>The network is offline, only cached files can be served.</td>
</tr>
<tr>
<td>slow-2g</td>
<td>2000ms</td>
<td>50 Kbps</td>
<td>The network is suited for small transfers only such as text-only pages.</td>
</tr>
<tr>
<td>2g</td>
<td>1400ms</td>
<td>70 Kbps</td>
<td>The network is suited for transfers of small images.</td>
</tr>
<tr>
<td>3g</td>
<td>270ms</td>
<td>700 Kbps</td>
<td>The network is suited for transfers of large assets such as high resolution images, audio, and SD video.</td>
</tr>
<tr>
<td>4g</td>
<td>0ms</td>
<td>∞</td>
<td>The network is suited for HD video, real-time video, etc.</td>
</tr>
</tbody>
</table></div>

### Form Factor {: #form-factor-dimension }

The form factor dimension allows you to query against three separate form factors:

- Phone
- Tablet
- Desktop

Form factor is inferred from the device [User-Agent string](/docs/multidevice/user-agent/).

### Country {: #country-dimension }

The country dimension was [added to CrUX in 2018](/blog/crux-2018-01/). The term "country" is used loosely, as some geographic areas are politically disputed. Values in the country dimension are inferred from users' IP addresses and represented as two-letter country codes as defined by [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

Country-level datasets are provided in addition to the global dataset, with the standard eligibility requirements applied at a country level. A table is [provided for each country](/docs/crux/bigquery/#schema-country-summary), as well as [summary tables](/docs/crux/bigquery/#schema-raw-tables) which include the country code as a column.

### Optional dimensions {: #optional-dimensions}

As of the [May 2022](/docs/crux/release-notes/#202205) release, the CrUX dataset supports optional dimensions. Previously, a form factor and effective connection type (ECT) combination must have independently met the _sufficiently popular_ criterion or else it would be excluded from the page or origin record. With this feature, experiences on different ECTs could be combined by their common form factor, and the corresponding ECT value will be `NULL`. Experiences on different form factors may also be combined, and both the ECT and form factor values will be `NULL`.

Previously, form factor and effective connection type were required columns in our BigQuery tables. This meant that when we did not have sufficient coverage to express the histogram densities in the specific rows (e.g., form factor = phone, effective connection type = 2G), we were dropping the entire origin from the dataset. With optional dimensions, we made the form factor and effective connection type optional (NULLABLE) and therefore, we're now able to publish overall histogram densities in such cases; that is, we may set the effective connection type value to NULL indicating "all effective connection types", or we may set both effective connection type and form factor to NULL indicating "all effective connection types" and "all form factors".

## Data quality

Data in CrUX undergoes a small amount of processing to ensure that it is statistically accurate, well structured and easy to query.

### Filtering

The CrUX dataset is filtered to ensure that the presented data is statistically valid. This may exclude entire pages or origins from appearing in the dataset.

In addition to the [eligibility criteria](#eligibility) applied to origins and pages, further filtering is applied for segments within the data:

Origins or pages having more than 20% of their total traffic excluded due to ineligible combinations of dimensions are excluded entirely from the dataset.

Because the global-level dataset encompasses user experiences from all countries, combinations of dimensions that do not meet the popularity criteria at the country level may still be included at the global level, provided that there is sufficient popularity.

### Fuzzing

A small amount of randomness is applied to the dataset to prevent reverse-engineering of sensitive data, such as total traffic volumes. This does not affect the accuracy of aggregate statistics.

### Precision

Most metric values within the CrUX dataset are represented as histograms of values and bin sizes, where the histogram value is a fraction of all included segments summing to 1. Bin sizes are floating point numbers between 1.0 and 0.0001.

Histogram [bin widths are normalized](https://twitter.com/chromeuxreport/status/1042443549676064768) to simplify querying and visualizing the data. This means that larger bins may be split into smaller bins, which equally share the original density in order to maintain consistent bin widths.

## Feedback and support

We would love to hear your feedback, questions, and suggestions to help us improve CrUX. Join the conversation on our [public Google Group](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report).
We also tweet at [@ChromeUXReport](https://twitter.com/chromeuxreport) with updates.

There are a number of channels to receive support, depending on the type of support required:

[chrome-ux-report](https://stackoverflow.com/questions/tagged/chrome-ux-report) on Stack Overflow
 : For questions about particular queries.

[CrUX discussion](https://groups.google.com/a/chromium.org/g/chrome-ux-report) on Google Groups
 : For general questions about the dataset.

[HTTPArchive discussion forum](https://discuss.httparchive.org/)
 : To share observations about the data.

[GCP support](https://console.cloud.google.com/support)
 : For formal BigQuery support.

## License

CrUX datasets by Google are licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

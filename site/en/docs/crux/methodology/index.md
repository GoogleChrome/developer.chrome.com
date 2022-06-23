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
  Technical documentation on CrUX eligibility, metrics, dimensions and accessing the data

# Optional
# This appears below the title and is an optional teaser
subhead: >
  This section documents how CrUX collects and organizes user experience data.

# Required
date: 2022-06-23

# Optional
# Include an updated date when you update your post
# updated: 2020-10-16

# Optional
# How to add a new author
# /docs/handbook/how-to/add-an-author/
authors:
  - simonhearne

# Optional
# How to a new tag
# /docs/handbook/how-to/add-a-tag/
tags:
  - performance
---

## Eligibility

At the core of the CrUX dataset are individual user experiences, which are aggregated into page-level and origin-level distributions. This section documents user eligibility and the requirements for pages and origins to be included in the dataset. All eligibility criteria must be satisfied in order for an experience to be included in page-level data available in PageSpeed Insights and the CrUX API: [User](#user-eligibility), [Origin](#origin-eligibility) and [Page](#page-eligibility). Experiences which meet the User and Origin criteria (but not Page) will be included in the origin-level data available in all CrUX data sources.

Pages and origins will be automatically included or removed from the dataset if their eligibility changes over time. There is not currently a way to manually submit pages or origins for inclusion.

### User {: #user-eligibility}

For a **user** to have their experiences aggregated in the CrUX dataset, they must meet the following criteria:

1. Enable [usage statistic reporting](https://support.google.com/chrome/answer/96817)
2. Sync their [browser history](https://support.google.com/chrome/answer/185277)
3. Not have a [Sync passphrase](https://support.google.com/chrome/answer/165139?co=GENIE.Platform%3DAndroid#zippy=%2Ccreate-a-passphrase) set
4. Use a supported platform

The current supported platforms are:

- Desktop versions of Chrome including Windows, MacOS, ChromeOS, and Linux operating systems
- Android versions of Chrome, including native apps using [Custom Tabs](/docs/android/custom-tabs/) and [WebAPKs](https://web.dev/webapks/)

There are a few notable exceptions that do not provide data to the CrUX dataset:

- Chrome on iOS
- Native Android apps using WebView
- Other Chromium browsers (e.g. [Microsoft Edge](https://www.microsoft.com/edge))

Chrome does not publish data about the proportions of users that meet these criteria. You can learn more about the data we collect in the [Chrome Privacy Whitepaper](https://www.google.com/chrome/privacy/whitepaper.html#usagestats).

### Origin {: #origin-eligibility }

An [**origin**](https://developer.mozilla.org/docs/Glossary/Origin) represents an entire website, addressable by a URL like `https://www.example.com`. For an origin to be included in the CrUX dataset it must meet two requirements:

1. Publicly discoverable
2. Sufficiently popular

An origin is considered to be publicly discoverable if its **root page** is discoverable. For example, the root page of the origin `https://www.example.com` would have a URL of `https://www.example.com/`. If the root page has any HTTP redirects, the origin will be assessed based on the redirected page as experienced by real users.

Any page will **not** meet the discoverability requirement if **any** of the following conditions are met, including root pages for the origin dataset:

- The page is served with an HTTP [status code](https://developer.mozilla.org/docs/Web/HTTP/Status) other than `200`
- The page is served with an HTTP `X-Robots-Tag: noindex` [header](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#xrobotstag-implementation)
- The document includes a `<meta name="robots" content="noindex">` [meta tag](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag)
- The URL is disallowed by [robots.txt](https://developers.google.com/search/docs/advanced/robots/intro)

You can verify that your origin is discoverable by running a [Lighthouse audit](https://web.dev/measure/) with the SEO category enabled. Your site is not discoverable if your root page fails the [_Page is blocked from indexing_](https://web.dev/is-crawable/) or [_Page has unsuccessful HTTP status code_](https://web.dev/http-status-code/) audits.

If an origin is determined to be publicly discoverable, eligible user experiences on _all_ of that origin's pages are aggregated at the origin-level, regardless of individual page discoverability. All of these experiences count towards the origin's popularity requirement: an origin is determined to be **sufficiently popular** if it has a minimum number of visitors. We don't disclose an exact number, but it has been chosen to ensure that we have enough samples to be confident in the statistical distribution. Origins that do not meet the popularity criteria are not included in the CrUX dataset.

For querying purposes, note that all origins in the CrUX dataset are lowercase.

### Page {: #page-eligibility}

The requirements for a **page** to be included in the CrUX dataset are the same as origins:

1. Publicly discoverable
2. Sufficiently popular

A page is determined to be **publicly discoverable** using the same [indexability](https://developers.google.com/search/docs/advanced/crawling/block-indexing) and [crawlability](https://developers.google.com/search/docs/advanced/robots/intro) criteria as search engines.

You can verify that a page is discoverable by running a [Lighthouse audit](https://web.dev/measure/) with the SEO category enabled. Your page is not discoverable if it fails the [_Page is blocked from indexing_](https://web.dev/is-crawable/) or [_Page has unsuccessful HTTP status code_](https://web.dev/http-status-code/) audits.

A page is determined to be **sufficiently popular** if it has a minimum number of visitors. An exact number is not disclosed, but it has been chosen to ensure that we have enough samples to be confident in the statistical distributions for included pages.

Pages commonly have additional identifiers in their URL including query string parameters like `?utm_medium=email` and fragments like `#main`. These identifiers are stripped from the URL in the CrUX dataset so that all user experiences on the page are aggregated together. This is useful for pages that would otherwise not meet the popularity threshold if there were many disjointed URL variations for the same page. Note that in rare cases this may unexpectedly group experiences for distinct pages together; for example if parameters `?productID=101` and `?productID=102` represent different pages.

A website's architecture may complicate how its data is represented in CrUX. For example, single page apps (SPAs) may use a JavaScript-based _route transition_ scheme to move between pages, as opposed to traditional anchor-based page navigations. These transitions appear as new page views to the user, but to Chrome and the underlying platform APIs the entire experience is attributed to the initial page view. This is a limitation of the native web platform APIs on which CrUX is built, see [How SPA architectures affect Core Web Vitals](https://web.dev/vitals-spa-faq/) on web.dev for more information.

### Accelerated Mobile Pages (AMP)

Pages built with AMP are included in the CrUX dataset like any other web page as of the [June 2020 CrUX release](../release-notes/#202006). Pages served via the [AMP Cache](https://developers.google.com/amp/cache) and / or rendered in the [AMP Viewer](https://developers.google.com/search/docs/advanced/experience/about-amp#about-google-amp-viewer) are also captured, and attributed to the publisher's page URL.

## Tools

The CrUX dataset is made available through a variety of tools maintained by Google. Each tool may access CrUX data slightly differently, resulting in varying levels of timeliness and metric support.

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>Tool</th>
<th>Timeliness</th>
<th>Metrics</th>
<th>Dimensions</th>
<th>Historical Data</th>
<th>Origin / Page-level</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#tool-bigquery">CrUX on BigQuery</a></td>
<td>Monthly <a href="#tooltip-1"><sup>1</sup></a></td>
<td>All metrics</td>
<td>All dimensions</td>
<td>Since 2017 <a href="#tooltip-1"><sup>1</sup></a></td>
<td>Origin</td>
</tr>
<tr>
<td><a href="#tool-crux-dash">CrUX Dashboard</a></td>
<td>Monthly <a href="#tooltip-1"><sup>1</sup></a></td>
<td>All metrics</td>
<td>No effective connection type or country dimensions</td>
<td>Since 2017 <a href="#tooltip-1"><sup>1</sup></a></td>
<td>Origin</td>
</tr>
<tr>
<td><a href="#tool-crux-api">CrUX API</a></td>
<td>28-day average <a href="#tooltip-2"><sup>2</sup></a></td>
<td>Subset of key metrics  <a href="#tooltip-4"><sup>4</sup></a></td>
<td>No country dimension</td>
<td>No</td>
<td>Origin &amp; Page</td>
</tr>
<tr>
<td><a href="#tool-psi">PageSpeed Insights</a></td>
<td>28-day average <a href="#tooltip-2"><sup>2</sup></a></td>
<td>Subset of key metrics  <a href="#tooltip-4"><sup>4</sup></a></td>
<td>No effective connection type or country dimensions</td>
<td>No</td>
<td>Origin &amp; Page</td>
</tr>
<tr>
<td><a href="#tool-psi-api">PageSpeed Insights API</a></td>
<td>28-day average <a href="#tooltip-2"><sup>2</sup></a></td>
<td>Subset of key metrics  <a href="#tooltip-4"><sup>4</sup></a></td>
<td>No effective connection type or country dimensions</td>
<td>No</td>
<td>Page</td>
</tr>
<tr>
<td><a href="#tool-gsc">Google Search Console</a></td>
<td>28-day average <a href="#tooltip-2"><sup>2</sup></a></td>
<td>Core web vitals</td>
<td>No dimensions</td>
<td>Three months</td>
<td>Page</td>
</tr>
</tbody>
</table></div>

<p>
<a id="tooltip-1"><sup>1</sup></a>: Monthly data is released on the second Tuesday after each monthly collection period. The first 28 days of each month period are included.<br>
<a id="tooltip-2"><sup>2</sup></a>: 28-day rolling average data is updated daily, based on the aggregated data from the previous 28 days.<br>
<a id="tooltip-3"><sup>3</sup></a>: Not all metrics are available in all monthly tables, see the <a href="../release-notes">release notes</a> for details.<br>
<a id="tooltip-4"><sup>4</sup></a>: The web vital metrics are available in all tools.<br>
</p>

The following sections briefly summarize each tool and how the data can be used.

### CrUX on BigQuery {: #tool-bigquery}

Origin-level CrUX data is available for public querying via [BigQuery](https://cloud.google.com/bigquery). Read the guide on [Using the Chrome UX Report](https://web.dev/chrome-ux-report-bigquery/).

[CrUX on BigQuery](../bigquery/) provides a publicly accessible database of all origin-level data collected by CrUX. It is possible to query any and all origins for which data is collected, analyze any metric that CrUX supports and filter by all available dimensions. Full metric histograms are stored in the BigQuery tables allowing for visualization of performance distributions, including experimental metrics.

The data in BigQuery is updated monthly, with each month's data released on the second Tuesday after the collection period. Page-level data is not available in BigQuery tables, and percentiles are interpreted from coarse histogram data which results in approximate values.

Use CrUX on BigQuery for analysis across any dimension: origins, countries, dates, form factor and connection type. Read more on the [CrUX on BigQuery](../bigquery/) documentation page.

### CrUX Dashboard {: #tool-crux-dash}

The [CrUX Dashboard](https://web.dev/chrome-ux-report-data-studio-dashboard/) is a Data Studio dashboard that allows you to query and render CrUX data into an interactive dashboard, as well as exporting PDF reports.

The dashboard provides visualization of all CrUX metrics in monthly trends, with data available back to 2017. Data can be split by form factor to compare mobile / tablet / desktop performance and performance goals are available to create red-amber-green visualizations.

The CrUX dashboard does not support effective connection type or country dimensions, so all global data is presented in the reports. Page-level data is not available and percentile values are calculated from coarse histogram data so are approximate.

### CrUX API {: #tool-crux-api}

The [CrUX API](https://web.dev/chrome-ux-report-api/) provides programmatic access to CrUX data by page or origin.

The API provides web vitals metrics both by origin and at page-level and the data is updated daily. The only values provided for metrics are calculated from the previous 28 days as a rolling window, no historical data is available via the API.

[Read more in the API documentation](/crux/docs/api/).

### PageSpeed Insights {: #tool-psi}

[PageSpeed Insights](https://pagespeed.web.dev/) uses CrUX data to present field performance statistics alongside the lab statistics calculated at run time.

The PageSpeed Insights report presents a consolidated view of the core web vitals (plus first contentful paint) for the given URL - or origin in case data for the URL is not available. Data is presented by desktop or mobile form factors and can be compared with the lab test results to give a better understanding of your page performance.

PageSpeed Insights does not provide historical data, and does not include country or effective connection type dimensions.

### PageSpeed Insights API {: #tool-psi-api}

The [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) offers programmatic access to the data shown in PageSpeed Insights, including Core Web Vitals data from CrUX.

This API integrates well into existing SEO tooling and workflows, allowing CrUX data to be included in automated reports and analyses.

As in the web version, the PageSpeed Insights API has no historical data and is limited to the core web vitals. Country and effective connection type dimensions are not included.

### Search Console {: #tool-gsc}

[Search Console](https://search.google.com/search-console) shows how CrUX data influences the [Page Experience](https://developers.google.com/search/docs/advanced/experience/page-experience) ranking factor by URL and URL group.

Search console presents data at the page-level, with individual pages grouped into URL groups with aggregate core web vitals values. This provides a quick indication of which sections of a site are potentially impacting the page experience ranking factor.

Data is updated daily and is split by mobile and desktop form factors. For URL groups with more than 20 members, only a sample of 20 are presented for further analysis.

## Metrics

Metrics provided by the CrUX on Google BigQuery are powered by standard web platform APIs exposed by modern browsers and aggregated to origin-resolution. Site owners requiring more detailed (e.g. URL-level resolution) analysis and insight into their site performance can use the same APIs to gather detailed real user measurement (RUM) data for their own origins.

Most metrics are represented as a histogram aggregation, allowing visualization of the distribution and approximation of percentile values.

<div class="responsive-table">
<table class="with-heading-tint width-full fixed-table">
<thead>
<tr>
<th>Metric</th>
<th>CrUX Field Name</th>
<th>Unit</th>
<th>Purpose</th>
<th>Available in CrUX API</th>
<th>Aggregation</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#fp-metric">First Paint</a></td>
<td><code>first_paint</code></td>
<td>Milliseconds (ms)</td>
<td>Render performance</td>
<td>No</td>
<td>Histogram</td>
<td><code>start: 400, end: 500, density: 0.02</code></td>
</tr>
<tr>
<td><a href="#fcp-metric">First Contentful Paint</a></td>
<td><code>first_contentful_paint</code></td>
<td>Milliseconds (ms)</td>
<td>Render performance</td>
<td>Yes</td>
<td>Histogram</td>
<td></td>
</tr>
<tr>
<td><a href="#dcl-metric">DOM Content Loaded</a></td>
<td><code>dom_content_loaded</code></td>
<td>Milliseconds (ms)</td>
<td>Page performance</td>
<td>No</td>
<td>Histogram</td>
<td></td>
</tr>
<tr>
<td><a href="#lcp-metric">Largest Contentful Paint</a></td>
<td><code>largest_contentful_paint</code></td>
<td>Milliseconds (ms)</td>
<td>Render performance</td>
<td>Yes</td>
<td>Histogram</td>
<td></td>
</tr>
<tr>
<td><a href="#ol-metric">Onload</a></td>
<td><code>onload</code></td>
<td>Milliseconds (ms)</td>
<td>Page performance</td>
<td>No</td>
<td>Histogram</td>
<td></td>
</tr>
<tr>
<td><a href="#fid-metric">First Input Delay</a></td>
<td><code>first_input</code></td>
<td>Milliseconds (ms)</td>
<td>Responsiveness</td>
<td>Yes</td>
<td>Histogram</td>
<td></td>
</tr>
<tr>
<td><a href="#cls-metric">Cumulative Layout Shift</a></td>
<td><code>layout_instability.cumulative_layout_shift</code></td>
<td>Numeric (0 - ∞)</td>
<td>Experience / visual stability</td>
<td>Yes</td>
<td>Histogram</td>
<td><code>start: 0.15, end: 0.2, density: 0.0011</code></td>
</tr>
<tr>
<td><a href="#ttfb-metric">Time to First Byte</a></td>
<td><code>experimental.time_to_first_byte</code></td>
<td>Milliseconds (ms)</td>
<td>Back-end performance</td>
<td>Yes</td>
<td>Histogram</td>
<td></td>
</tr>
<tr>
<td><a href="#inp-metric">Interaction to Next Paint</a></td>
<td><code>experimental.interaction_to_next_paint</code></td>
<td>Milliseconds (ms)</td>
<td>Responsiveness</td>
<td>Yes</td>
<td>Histogram</td>
<td><code>start: 50, end: 75, density: 0.005</code></td>
</tr>
<tr>
<td><a href="#popularity-metric">Popularity</a></td>
<td><code>experimental.popularity.rank</code></td>
<td>Rank</td>
<td>Origin popularity</td>
<td>No</td>
<td>log10 intervals from 1k</td>
<td><code>rank: 100000</code></td>
</tr>
<tr>
<td><a href="#notification-permissions-metric">Notification Permissions</a></td>
<td><code>experimental.permission.notifications</code></td>
<td>Fraction</td>
<td>Permission opt-in</td>
<td>No</td>
<td>Fraction</td>
<td><code>accept: 0.006, deny: 0.0191, ignore: 0.086, dismiss: 0.0068</code></td>
</tr>
</tbody>
</table></div>

### First Paint {: #fp-metric }

{% Aside %}
""First Paint reports the time when the browser first rendered after navigation. This excludes the default background paint, but includes non-default background paint. This is the first key moment developers care about in page load - when the browser has started to render the page."

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

### First Input Delay {: #fid-metric }

{% Aside %}
"First Input Delay (FID) is an important, user-centric metric for measuring load responsiveness because it quantifies the experience users feel when trying to interact with unresponsive pages—a low FID helps ensure that the page is usable."

<cite><a href="https://web.dev/fid/">web.dev/fid/</a></cite>
{% endAside %}

### Cumulative Layout Shift {: #cls-metric }

{% Aside %}
"Cumulative Layout Shift (CLS) is an important, user-centric metric for measuring visual stability because it helps quantify how often users experience unexpected layout shifts — a low CLS helps ensure that the page is delightful."

<cite><a href="https://web.dev/cls/">web.dev/cls/</a></cite>
{% endAside %}

### Experimental {: #experimental-metrics }

Experimental metrics are available in the CrUX dataset via [BigQuery](../bigquery/). These metrics are likely to change regularly as they evolve based on user feedback. Check the [release notes](../release-notes/) to keep up to date on the latest changes.

#### Time to First Byte {: #ttfb-metric }

{% Aside %}
"Time to First Byte (TTFB) is a foundational metric for measuring connection setup time and web server responsiveness in both the lab and the field. It helps identify when a web server is too slow to respond to requests. In the case of navigation requests—that is, requests for an HTML document—it precedes every other meaningful loading performance metric."

<cite><a href="https://web.dev/ttfb/">web.dev/ttfb/</a></cite>
{% endAside %}

TTFB is only collected on full page loads, unlike other timers (such as [LCP](#lcp-metric)) which are also collected on back-forward navigations and pre-rendering. As such, the sample size of TTFB can be smaller than other metrics and may not necessarily be compared directly with them.

#### Interaction to Next Paint {: #inp-metric}

{% Aside %}
"Interaction to Next Paint (INP) is an experimental field metric that assesses [responsiveness](https://web.dev/user-centric-performance-metrics/#types-of-metrics). INP logs the latency of all interactions throughout the entire page lifecycle. The highest value of those interactions—or close to the highest for pages with many interactions—is recorded as the page's INP. A low INP ensures that the page will be reliably responsive at all times."

<cite><a href="https://web.dev/inp/">web.dev/inp/</a></cite>
{% endAside %}

Interaction to Next Paint (INP) was added to the CrUX dataset in [February 2022](../release-notes/#202202). This new metric captures the end-to-end latency of individual events and offers a more holistic picture of the overall responsiveness of a page throughout its lifetime.

#### Popularity {: #popularity-metric}

The [popularity rank](/blog/crux-rank-magnitude/) metric is a relative measure of site popularity within the CrUX dataset, measured by the total number of navigations on the origin. Rank is on a log10 scale (e.g. top 1k, 10k, 100k, 1M, etc.) with each rank excluding the previous (e.g. top 10k is actually 9k URLs, excluding top 1k). The upper limit is dynamic as the dataset grows.

Popularity is provided as a guide for broad analysis, e.g. to determine performance by country for the top 1,000 origins. It should not be used to determine an origin's overall popularity on the web.

#### Notification Permissions {: #notification-permissions-metric }

{% Aside %}
"The Notifications API allows web pages to control the display of system notifications to the end user. These are outside the top-level browsing context viewport, so therefore can be displayed even when the user has switched tabs or moved to a different app. The API is designed to be compatible with existing notification systems, across different platforms."

<cite><a href="https://developer.mozilla.org/docs/Web/API/Notifications_API">MDN</a></cite>
{% endAside %}

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

- Mobile (`PHONE`)
- Tablet (`TABLET`)
- Desktop (`DESKTOP`)

Form factor is inferred from the device [user-agent string](/docs/multidevice/user-agent/).

### Country {: #country-dimension }

The country dimension was [added to CrUX in 2018](/blog/crux-2018-01/). The term "country" is used loosely, as some geographic areas are politically disputed. Values in the country dimension are inferred from users' IP addresses and represented as two-letter country codes as defined by [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

Country-level datasets are provided in addition to the global dataset, with the standard eligibility requirements applied at a country level. A table is [provided for each country](../bigquery/#schema-country-summary), as well as [summary tables](../bigquery/#schema-raw-tables) which include the country code as a column.

### Optional dimensions {: #optional-dimensions}

As of the [May 2022](../release-notes/#202205) release, the CrUX dataset supports optional dimensions. Previously, a form factor and effective connection type (ECT) combination must have independently met the _sufficiently popular_ criterion or else it would be excluded from the page or origin record. With this feature, experiences on different ECTs could be combined by their common form factor, and the corresponding ECT value will be `NULL`. Experiences on different form factors may also be combined, and both the ECT and form factor values will be `NULL`.

Previously, form factor and effective connection type were required columns in our BigQuery tables. This meant that when we did not have sufficient coverage to express the histogram densities in the specific rows (e.g., form factor = phone, effective connection type = 2G), we were dropping the entire origin from the dataset. With optional dimensions, we made the form factor and effective connection type optional (NULLABLE) and therefore, we're now able to publish overall histogram densities in such cases; that is, we may set the effective connection type value to NULL indicating "all effective connection types", or we may set both effective connection type and form factor to NULL indicating "all effective connection types" and "all form factors".

## Data quality

### Filtering

The CrUX dataset is filtered to ensure that the presented data is statistically valid. This may exclude entire pages or origins from appearing in the dataset.

In addition to the [eligibility criteria](#eligibility) applied to origins and pages, further filtering is applied for segments within the data:

Origins having more than 20% of their total traffic excluded due to ineligible combinations of dimensions are excluded entirely from the dataset.
Pages having more than 20% of their total traffic excluded due to ineligible combinations of dimensions are excluded entirely from the dataset.

Because the global-level dataset encompasses user experiences from all countries, combinations of dimensions that do not meet the popularity criteria at the country level may still be included at the global level, provided that there is sufficient popularity.

### Fuzzing

A small amount of randomness is applied to the dataset to prevent reverse-engineering of sensitive data, such as total traffic volumes. This does not affect the accuracy of aggregate statistics.

### Precision

Most metric values within the CrUX dataset are represented as histograms of values and bin sizes, where the histogram value is a fraction of all included segments summing to 1. Bin sizes are floating point numbers between 1.0 and 0.0001.

Histogram [bin widths are normalized](https://twitter.com/chromeuxreport/status/1042443549676064768) to simplify querying and visualizing the data. This means that larger bins may be split into smaller bins, which equally share the original density in order to maintain consistent bin widths.

## Feedback and support

We would love to hear your feedback, questions, and suggestions to help us improve the Chrome User Experience Report. Please join the conversation on our [public Google Group](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report).
We also tweet on [@ChromeUXReport](https://twitter.com/chromeuxreport) with updates.

## License

CrUX datasets by Google are licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

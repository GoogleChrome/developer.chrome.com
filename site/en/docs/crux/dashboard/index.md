---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX Dashboard

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Using the CrUX Dashboard for visualizing BigQuery CrUX data

# Optional
# This appears below the title and is an optional teaser
subhead: >
  Using the CrUX Dashboard for visualizing BigQuery CrUX data

# Required
date: 2022-11-10

# Optional
# Include an updated date when you update your post
updated: 2023-03-20

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

The CrUX Dashboard is a [Looker Studio](https://cloud.google.com/looker-studio) (formerly Data Studio) dashboard that links to the raw origin-level CrUX data on [BigQuery](/docs/crux/bigquery/) and the visualizes the data for you. It eliminates the need for users of the dashboard to write any queries or generate any charts. Everything is built for you; all you need is to provide an origin and the dashboard will be generated for you.

## Accessing the CrUX Dashboard

To launch the CrUX Dashboard, enter an origin or URL:

<style>
  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
  }
  #origin {
    width: 100%;
    font-size: 2em;
    line-height: 1.3em;
    text-align: center;
  }
  #origin[aria-invalid=true] {
    border: red dashed 2px;
  }
  #origin-submit {
    line-height: 2.25em;
  }
</style>

<form id="form">
  <input id="origin" aria-label="Origin" type="text" placeholder="https://developer.chrome.com" required>
  <input id="formatted-origin" aria-label="Formatted Origin" type="url" hidden>
  <button id="origin-submit" class="bg-primary button-filled color-bg material-button">Go</button>
</form>

*Note: if the protocol (`http` or `https`) is not provided, then `https` will be assumed. Paths will be stripped as the CrUX Dashboard only provides data at an origins level.*

<script>
var form = document.getElementById('form');
var origin = document.getElementById('origin');
form.addEventListener('submit', function(e) {
  try {
    origin.removeAttribute('aria-invalid');
    e.preventDefault();
    var url = origin.value.trim();
    // Do some basic checks to ensure it's a valid external URL (of the format
    // (xxx.yyy). Later we'll use `new URL()` to do more thorough validation
    // but it allows single word URLs like http://localhost or http://test
    // which are not valid external URLs that CrUX needs.
    if (!(url.indexOf('.') > 0)) throw new TypeError('Invalid URL');
    if (url.endsWith('.')) throw new TypeError('Invalid URL');
    // Add default scheme of https if needed
    if (!url.startsWith('http')) url = 'https://' + url;
    // Check it's a valid URL
    var url = new URL(url);
    var encoded_origin = encodeURIComponent(url.origin);
    var url =
      'https://lookerstudio.google.com/reporting/bbc5698d-57bb-4969-9e07-68810b9fa348/page/keDQB?params=%7B%22origin%22:%22' +
      encoded_origin +
      '%22%7D';
    window.location = url;
  } catch {
    origin.setAttribute('aria-invalid',true);
  }
});
</script>

The dashboard URL can then be shared and bookmarked for easy reference.

## Does it work for all websites?

No. If your origin is not included in the CrUX dataset, there will be no data to display. There are over 15 million origins in the dataset, but the one you want may not have sufficient data to be included.

Some common issues with origins are providing the wrong protocol, for example `http://` instead of `https://`, and omitting the subdomain when needed. Some websites include redirects, so if `http://example.com` redirects to `https://www.example.com`, then you should use the latter, which is the canonical version of the origin. As a rule of thumb, use whichever origin users see in the URL bar.

## Using a Custom Search Engine to access the Dashboard

An alternative way, for those frequently visiting different domains, is to set up a custom Search Engine in Chrome which allows you to access pass a search term—the origin in this case—to a URL. To do this go into Chrome Settings using the three dots menu in the top right of Chrome. Once in Settings choose the "Search engine" option.

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/QFmABBH8qJJuyA25QXqc.png", alt="Chrome settings for Search Engines", width="800", height="243" %}

From here expand the "Manage search engines and site search", scroll down to "Site Search" click the "Add" button and enter the following details:

- Search engine: `CrUX`
- Shortcut: `crux`
- URL with %s in place of query: `https://lookerstudio.google.com/c/u/0/reporting/bbc5698d-57bb-4969-9e07-68810b9fa348/page/keDQB?params=%7B%22origin%22:%22%s%22%7D`

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/uMyipuu95G78aQ7hdn9u.png", alt="Chrome 'Add search engine' dialog", width="600", height="422" %}

After this, when you type `crux` and press `tab` in the search bar you will now be able to enter an origin, and Chrome will navigate to the CrUX Dashboard for that origin.

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/O2sQwX4JwVRxcb24Mfw1.png", alt="Using a custom search engine in Chrome Omnibox", width="400", height="138" %}

If you omit the protocol, HTTPS is assumed. Subdomains matter, for example `https://developers.google.com` and `https://www.google.com` are considered to be different origins.

If the origin exists in CrUX, you'll be taken to the dashboard, populated with the CrUX data for this origin:

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/9vSp9trQYMwC5kw2DZPJ.png", alt="Example CrUX Dashboard", width="800", height="565" %}

## Using the dashboard

Each dashboard comes with three types of pages:

1. Core Web Vitals overview
2. Metric performance
3. User demographics

Each page includes a chart showing distributions over time for each available monthly release. As new datasets are released, you can simply refresh the dashboard to get the latest data.

The monthly datasets are released on the second Tuesday of every month. For example, the dataset consisting of user experience data from the month of May is released on the second Tuesday of June.

### Core Web Vitals overview

The first page is an overview of the origin's monthly [Core Web Vitals](https://web.dev/vitals/) performance. These are the most important UX metrics that Google recommends you focus on.

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/S9mRhx2J0LD2GQONzfqv.png", alt="CrUX Dashboard Core Web Vitals overview", width="800", height="918" %}

Use the Core Web Vitals page to understand how the origin is experienced by desktop and phone users. By default, the most recent month at the time you created the dashboard is selected. To change between older or newer monthly releases, use the **Month** filter at the top of the page.

### Metric performance

After the Core Web Vitals page, you'll find standalone pages for all [metrics](/docs/crux/methodology/#metrics) in the CrUX dataset.

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/jsrDskLIh4311zYmaujf.png", alt="CrUX Dashboard LCP page", width="800", height="618" %}

Atop each page is the **Device** filter, which you can use to restrict the form factors included in the experience data. For example, you can drill down specifically into phone experiences. This setting persists across pages.

The primary visualizations on these pages are the monthly distributions of experiences categorized as "Good", "Needs Improvement", and "Poor". The color-coded legend below the chart indicates the range of experiences included in the category. For example, in the screenshot above, you can see the percent of "good" [Largest Contentful Paint](https://web.dev/lcp/#what-is-a-good-lcp-score) (LCP) experiences fluctuating slightly and getting slightly worse in recent months.

The most recent month's percentages of "good" and "poor" experiences are shown above the chart along with an indicator of the percent difference from the previous month. For this origin, "good" LCP experiences fell by 0.8% to 83.25% month-over-month, the p75 number had 0 movement and stayed at 1,500 month-over-month, and the "poor" LCP experiences increased by 3.6% (shown in red as an increase here is bad) to 7.42%. Note the percentage movements are actual percentage movements, and not percentage point movements—for example 83.93% to 83.25% is a 0.68 percentage point movement, or 0.8% decrease of the 83.93% previous total.

Additionally, for metrics like LCP and other Core Web Vitals that provide explicit percentile recommendations, you'll find the "P75" metric between the "good" and "poor" percentages. This value corresponds to the origin's 75th percentile of user experiences. In other words, 75% of experiences are better than this value. One thing to note is that this applies to the overall distribution across _all devices_ on the origin. Toggling specific devices with the **Device** filter will not recalculate the percentile.

{% Details %}
{% DetailsSummary %}
Technical caveats about percentiles
{% endDetailsSummary%}

Be aware that the percentile metrics are based on the histogram data from [BigQuery](/docs/crux/bigquery/), so the granularity will be coarse: 1000ms for LCP, 100ms for FID, and 0.05 for CLS. In other words, a P75 LCP of 3800ms indicates that the true 75th percentile is somewhere between 3800ms and 3900ms.

Additionally, the BigQuery dataset uses a technique called "bin spreading" in which densities of user experiences are intrinsically grouped into very coarse bins of decreasing granularity. This allows us to include minute densities in the tail of the distribution without having to exceed four digits of precision. For example, LCP values less than 3 seconds are grouped into bins 200ms wide. Between 3 and 10 seconds, bins are 500ms wide. Beyond 10 seconds, bins are 5000ms wide, etc. Rather than having bins of varying widths, bin spreading ensures that all bins are a constant 100ms wide (the greatest common divisor), and the distribution is linearly interpolated across each bin.

Corresponding P75 values in tools like PageSpeed Insights are not based on the public BigQuery dataset and are able to provide millisecond-precision values.
{% endDetails %}

### User demographics

There are two [dimensions](/docs/crux/methodology/#dimensions) included on the user demographic pages: devices and effective connection types (ECTs). These pages illustrate the distribution of page views across the entire origin for users in each demographic.

The device distribution page shows you the breakdown of phone, desktop, and tablet users over time:

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/CEtiVuTSsroziiTI7E1e.png", alt="CrUX Dashboard device page", width="800", height="597" %}

Many origins tend to have little to no tablet data so you'll often see "0%" hanging off the edge of the chart.

Similarly, the ECT distribution page shows you the breakdown of 4G, 3G, 2G, slow 2G, and offline experiences.

{% Aside 'key-term' %}
Effective connection types are considered _effective_ because they're based on bandwidth measurements on users' devices, and don't imply any particular technology used. For example, a desktop user on fast Wi-Fi may be labelled as 4G while a slower mobile connection might be labelled as 2G.
{% endAside %}

The distributions for these dimensions are calculated using segments of the [First Contentful Paint](https://web.dev/fcp/) (FCP) histogram data.

## FAQ

### When would I use the CrUX Dashboard as opposed to other tools?

The CrUX Dashboard is based on the same underlying data available on BigQuery, but you don't need to write a single line of SQL to extract the data and you don't ever have to worry about exceeding any free quotas. Setting up a dashboard is quick and easy, all of the visualizations are generated for you, and you have the control to share it with anyone you want.

### Are there any limitations to using the CrUX Dashboard?

Being based on BigQuery means that the CrUX Dashboard inherits all of its limitations as well. It is restricted to origin-level data at monthly granularity.

The CrUX Dashboard also trades away some of the versatility of the raw data on BigQuery for simplicity and convenience. For example, metric distributions are only given as "good", "needs improvement", and "poor", as opposed to the full histograms. The CrUX Dashboard also provides data at a global level, while the BigQuery dataset allows you to zoom in on particular countries.

### How can I customize the dashboard

The page details how to access a read-only version of the CrUX Dashboard maintained by the CrUX team. If you wish to create your own copy of the dashboard, so you can edit it to show different visualizations, then [see this user guide](/blog/chrome-ux-report-looker-studio-dashboard/) for more info. Note that by creating you own copy, you will need to update the month manually and also will not benefit from any additions added to the official dashboard—for example new metrics, or other information.

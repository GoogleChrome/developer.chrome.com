---
layout: 'layouts/doc-post.njk'
title: First Contentful Paint
description: |
  Learn about Lighthouse's First Contentful Paint metric and
  how to measure and optimize it.
date: 2019-05-02
updated: 2021-06-04
---

First Contentful Paint (FCP) is one of six metrics
tracked in the **Performance** section of the Lighthouse report.
Each metric captures some aspect of page load speed.

Lighthouse displays FCP in seconds:

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/0zDaizn5WxE6QfToxVMG.png", alt="A screenshot of the Lighthouse First Contentful Paint audit", width="800", height="592" %}
</figure>

## What FCP measures

FCP measures how long it takes the browser
to render the first piece of DOM content
after a user navigates to your page.
Images, non-white `<canvas>` elements, and SVGs on your page are considered
DOM content; anything inside an iframe _isn't_ included.

## How Lighthouse determines your FCP score

Your FCP score is a comparison of your page's FCP time
and FCP times for real websites, based on
[data from the HTTP Archive](https://httparchive.org/reports/loading-speed#fcp).
For example, sites performing in the ninety-ninth percentile
render FCP in about 1.2&nbsp;seconds.
If your website's FCP is 1.2 seconds,
your FCP score is 99. See [How metric scores are determined](/docs/lighthouse/performance/performance-scoring/#metric-scores)
to learn how Lighthouse score thresholds are set.

This table shows how to interpret your FCP score:

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>FCP time<br>(in seconds)</th>
        <th>Color-coding</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0–1.8</td>
        <td>Green (fast)</td>
      </tr>
      <tr>
        <td>1.8–3</td>
        <td>Orange (moderate)</td>
      </tr>
      <tr>
        <td>Over 3</td>
        <td>Red (slow)</td>
      </tr>
    </tbody>
  </table>
</div>

{% Partial 'lighthouse-performance/scoring.njk' %}

## How to improve your FCP score

One issue that's particularly important for FCP is
font load time. Check out the
[Ensure text remains visible during webfont load](/docs/lighthouse/performance/font-display/) post
for ways to speed up your font loads.

## Tracking FCP on real users' devices

To learn how to measure when FCP actually occurs on your users' devices,
see Google's [User-centric Performance Metrics][metrics] page.
The [Tracking FP/FCP][tracking] section describes
how to programmatically access FCP data and submit it to Google Analytics.

See Google's [Assessing Loading Performance in Real Life with Navigation and Resource Timing](https://web.dev/navigation-and-resource-timing/)
for more on collecting real-user metrics.

{% Partial 'lighthouse-performance/improve.njk' %}

## Resources

- [Source code for **First Contentful Paint** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/metrics/first-contentful-paint.js)
- [FCP Metric Guide](https://web.dev/fcp/)
- [Lighthouse Scoring Guide](/docs/lighthouse/performance/performance-scoring/)
- [Paint Timing specification](https://w3c.github.io/paint-timing)

[metrics]: https://web.dev/user-centric-performance-metrics/
[tracking]: https://web.dev/user-centric-performance-metrics/#important-metrics-to-measure

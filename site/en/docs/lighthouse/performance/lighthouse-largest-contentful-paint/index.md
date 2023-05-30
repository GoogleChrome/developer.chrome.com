---
layout: 'layouts/doc-post.njk'
title: Largest Contentful Paint
description: |
  Learn about Lighthouse's Largest Contentful Paint metric and
  how to measure and optimize it.
date: 2020-01-10
updated: 2021-06-04
---

Largest Contentful Paint (LCP) is one of the metrics
tracked in the **Performance** section of the Lighthouse report.
Each metric captures some aspect of page load speed.

Lighthouse displays LCP in seconds:

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/NcBzUBQFmSzhZaxshxLS.png", alt="A screenshot of the Lighthouse Largest Contentful Paint audit", width="800", height="592" %}
</figure>

## What LCP measures

LCP measures when the largest content element in the viewport is
rendered to the screen. This approximates when the main content of the page is
visible to users. See [Largest Contentful Paint defined][definition] for more
details on how LCP is determined.

## How Lighthouse determines your LCP score

Lighthouse extracts LCP data from [Chrome's tracing tool](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

The table below shows how to interpret your LCP score:

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>LCP time<br>(in seconds)</th>
        <th>Color-coding</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0-2.5</td>
        <td>Green (fast)</td>
      </tr>
      <tr>
        <td>2.5-4</td>
        <td>Orange (moderate)</td>
      </tr>
      <tr>
        <td>Over 4</td>
        <td>Red (slow)</td>
      </tr>
    </tbody>
  </table>
</div>

{% Partial 'lighthouse-performance/scoring.njk' %}

## How to improve your LCP score

If the LCP is an image, the timing can be broken down into four phases.
Knowing which phases take the longest can help you [optimize your LCP][improve].
Lighthouse will display the LCP element along with the phase breakdown in the "Largest Contentful Paint element" diagnostic.

| LCP phase                 | Description |
| ------------------------- | ----------- |
| Time to first byte (TTFB) |	The time from when the user initiates loading the page until when the browser receives the first byte of the HTML document response. [Learn more about TTFB](https://web.dev/ttfb/). |
| Load delay	              | The delta between TTFB and when the browser starts loading the LCP resource. |
| Load time	                | The time it takes to load the LCP resource itself. |
| Render delay	            | The delta between when the LCP resource finishes loading until the LCP element is fully rendered. |

## Resources

- [Source code for **Largest Contentful Paint** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/metrics/largest-contentful-paint.js)
- [Largest Contentful Paint](https://web.dev/lcp/)
- [Largest Contentful Paint API](https://wicg.github.io/largest-contentful-paint/)

[definition]: https://web.dev/lcp/#what-is-lcp
[improve]: https://web.dev/optimize-lcp/

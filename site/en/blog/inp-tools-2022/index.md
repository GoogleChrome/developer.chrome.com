---
layout: 'layouts/blog-post.njk'
title: Interaction to Next Paint (INP) tool support
authors:
  - brendankenny
  - egsweeny
date: 2022-05-17
description: >
  Support for Interaction to Next Paint across Chrome performance tools.
tags:
  - web-vitals
  - performance
  - lighthouse
  - new-in-lighthouse
  - devtools
---

We are thrilled to have the first round of tooling support for the new experimental responsiveness metric, Interaction to Next Paint (INP). To learn about the metric itself, check out [the official INP metric guide](https://web.dev/inp/).

## Suggested measurement

The goal of measuring INP is to understand how fast your page responds to user input. The only way to get realistic data is to measure how your page is responding for real users visiting your site using [data from the field](https://web.dev/lab-and-field-data-differences/#field-data).

Measuring INP [in the lab](https://web.dev/lab-and-field-data-differences/#lab-data) then helps to better understand event timings and where optimizations need to happen. Lab tools won't automatically interact with the page, so they either need manual input while they measure, or they need to be scripted with an automation tool like Puppeteer. When key interactions are identified from typical user journeys, they can be tried out to identify issues or scripted, and put in CI tests to prevent regressions.

{% Aside %}
To learn more about how to leverage both lab and field data, read about [why lab and field data can be different (and what to do about it)](https://web.dev/lab-and-field-data-differences/).
{% endAside %}

## Discover what your real users are experiencing (field data)

### Visit PageSpeed Insights

PageSpeed Insights pulls field data from the Chrome User Experience (CrUX) Report API, and gives a snapshot of your page and origin's performance over the previous 28 days. This data now includes INP:

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/AYjKSo9IhqqQxsObwTVg.png", alt="A PSI report on Core Web Vitals in the field, with a highlighted section showing the new INP metric value and a marker showing its place in fast, average, and slow buckets", width="800", height="423", class="screenshot" %}
</figure>

Try it out at [PageSpeed Insights](https://pagespeed.web.dev/).

### Collect your own INP values from the field

If you'd like to collect INP data for a site yourself, the easiest way to do so is the [`web-vitals`](https://github.com/GoogleChrome/web-vitals/tree/f33da096d689a5a8809b58c19e8546cb88a8f78c#install-and-load-the-library) library, which now has full INP support in its beta release.

```js
import {onINP} from 'web-vitals';

onINP(({value}) => {
  // Log the value to the console, or send it to your analytics provider.
  console.log(value);
});
```

Read [more about `web-vitals` and how to measure in the DevTools console](https://web.dev/inp/#measure-inp-in-javascript).

### Web Vitals Chrome extension

The Web Vitals extension gives both an overview of your users' page experience (from the CrUX API) and the real-time values of CWV and key metrics of the current visit to the page.

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/6TZBRkpTsmtuDQ4VTJIO.png", alt="A report from the extension, showing values for each of the Core Web Vitals and now including a value for INP", width="800", height="621", class="screenshot" %}
</figure>

Install the [Web Vitals extension for Chrome](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma).

## Diagnose performance issues (lab data)

### Use Lighthouse User Flows

The new timespan mode in the Lighthouse Panel in DevTools lets you start Lighthouse, interact with your test page however you wish, and then get a report of what happened during that time. This report now includes INP and an audit to help diagnose any responsiveness issues.

<figure>
  {% Video src="video/MtjnObpuceYe3ijODN3a79WrxLU2/GioMntCgOope1zSUmT7s.mov", controls="true"%}
</figure>

The same series of interactions can be automated by using [Lighthouse user flows](https://web.dev/lighthouse-user-flows/). INP is available in user flows as of Lighthouse 9.6.

### Tool availability details

- **Chrome User Experience Report (CrUX)**
  - _BigQuery_: INP available as `experimental.interaction_to_next_paint` 
  - _CrUX API_: INP available as `experimental_interaction_to_next_paint`
  - _CrUX Dashboard_: Includes INP data
- **PageSpeed Insights**
  - _pagespeed.web.dev_: Page-level and origin-level INP field data from the CrUX API surfaced as 'Interaction to Next Paint'
  - _PSI API_: INP available as `EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT_MS`
- **`web-vitals` JS library**
  - _`web-vitals@next`_ includes INP support
- **Web Vitals Chrome extension**
  - Includes local INP measurement and INP field data when available from the CrUX API
- **Lighthouse**
  - _Lighthouse panel in DevTools_: INP measurement available in 'timespan' mode in Chrome Canary (104)
  - _Lighthouse npm module_: INP measurement available in timespans (use puppeteer for synthetic input)

## Future work and request for feedback

Moving forward, Chrome tooling teams will continue to invest in debugging capabilities and optimization recommendations for INP.

INP itself is still experimental. If you have feedback on anything from the metric's usefulness, to ease of measurement, to its name, please bring it to the [web-vitals-feedback Google group](https://groups.google.com/g/web-vitals-feedback).

---
layout: 'layouts/blog-post.njk'
title: Announcing Lighthouse 3.0
date: 2018-05-02
updated: 2018-05-08
description: 'Faster audits, less variance, a new report UI, new audits, and more.'
---

<figure class="float-right">
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/C7YLr8zjXlEocpylBx9l.png", alt="Lighthouse logo.", width="800", height="451" %}
</figure>

Lighthouse 3.0 is out! 3.0 features faster audits, less variance, a new report UI, new audits, and
more.

## How to update to 3.0

- **CLI**. Run `npm install -g lighthouse@next`.
- **Node**. Run `npm install lighthouse@next`.
- **Chrome Extension**. Your extension should auto-update to 3.0.
- **Chrome DevTools**. Lighthouse 3.0 will be available in Chrome 69.

## Faster audits and less variance

Lighthouse 3.0 completes your audits faster, with less variance between runs, thanks to a
few changes:

- **Simulated throttling**. Previously Lighthouse actually throttled your page before running
  audits. Now, Lighthouse uses a new internal auditing engine, codenamed Lantern, that runs your
  audits under your normal network and CPU settings, and then estimates how long the page would
  take to load under mobile conditions.
- **Smaller waiting periods**. To determine that a page has finished loading, Lighthouse
  needs to wait for the network and CPU to have no activity. This waiting period is smaller in v3.

## New Report UI

Lighthouse 3.0 features a brand-new report UI, thanks to a collaboration between the Lighthouse
and Chrome UX (Research & Design) teams.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/dlUKUDHfKUUdIK5HlA3j.png", alt="Lighthouse 3 report run on GMail", width="800", height="996" %}
  <figcaption>
    <b>Figure 1</b>. Lighthouse v3 report run on GMail's about page
  </figcaption>
</figure>

## Invocation changes

The Node version of Lighthouse now supports the same configuration options as the CLI version.
This could be a breaking change, depending on how you configured your Node Lighthouse module in
v2. See [Invocation changes](https://developers.google.com/web/tools/lighthouse/v3/migration#invocation) for more information.

## Scoring changes

In Lighthouse 3.0 the scoring model for Performance audits changes. A score of 50 represents
the 75th percentile, and a perfect score of 100 represents the 98th percentile, which is the point
of diminishing returns.

The Performance score is a weighted average of the Performance audits. The weighting of the
audits also changes in v3.

<table>
  <tr>
    <th>Audit Name</th>
    <th>v2 Weight</th>
    <th>v3 Weight</th>
  </tr>
  <tr>
    <td>First Contentful Paint (New in v3)</td>
    <td>N/A</td>
    <td>3</td>
  </tr>
  <tr>
    <td>First Meaningful Paint</td>
    <td>5</td>
    <td>1</td>
  </tr>
  <tr>
    <td>First CPU Idle (First Interactive in v2)</td>
    <td>5</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Time To Interactive (Consistently Interactive in v2)</td>
    <td>5</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Perceptual Speed Index</td>
    <td>1</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Speed Index</td>
    <td>N/A</td>
    <td>4</td>
  </tr>
  <tr>
    <td>Estimated Input Latency</td>
    <td>1</td>
    <td>0</td>
  </tr>
</table>

Going forward, the [Lighthouse v3 Scoring Guide][v3scoring] is the source of truth for anything
you need to know regarding how scoring works in Lighthouse v3.


## New output formats and changes

### CSV output support

Report results can now be output in CSV. Each row contains information and results for one
audit, including:

- The name of the category that the audit belongs to.
- The name of the audit.
- A description of the audit.
- The score type used for the audit.
- The score value.

### JSON output changes

Version 3.0 introduces many changes to Lighthouse's JSON output format. See [Lighthouse v3
Migration Guide][migration] for more details.

## New audits 

### First Contentful Paint

Measure the time at which text or image content is first painted to the user's screen.

{% Aside 'gotchas' %}
  There's no single load performance metric that captures all use cases
  across the web, so Lighthouse provides many different ones, so that you can build a holistic
  picture of your performance.
{% endAside %}

### robots.txt is not valid

Ensure that your site's [`robots.txt`][robots] file is properly formed so that
search bots can crawl your site.


### Use video formats for animated content

Replace GIFs with `video` tags for massive potential savings in video file sizes.

See [Replace Animated GIFs with Video][jeremy] to learn more.


### Avoid multiple, costly round trips to any origin

Improve your load performance by adding `rel="preconnect"` attributes to `link` tags, which informs
the browser to establish a connection to an origin as soon as possible.

See [Preconnect](https://developers.google.com/web/fundamentals/performance/resource-prioritization#preconnect) to learn more.

## Audit changes

### First Interactive ➡ First CPU Idle

The **First Interactive** audit has been renamed to **First CPU Idle** to better describe how it
works. The general purpose of the audit is the same. Use this audit to measure when users are
first able to interact with your page.

### Perceptual Speed Index ➡ Speed Index
In Lighthouse 3.0 the **Perceptual Speed Index** audit is now **Speed Index**. This change aligns
Lighthouse with how [WebPageTest][wpt] measures this metric. The purpose of the audit
is the same, but the underlying metric is slightly different.


[v3scoring]: https://developers.google.com//web/tools/lighthouse/v3/scoring
[migration]: https://developers.google.com/web/tools/lighthouse/v3/migration
[robots]: https://support.google.com/webmasters/answer/6062608
[jeremy]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/
[wpt]: https://webpagetest.org/easy

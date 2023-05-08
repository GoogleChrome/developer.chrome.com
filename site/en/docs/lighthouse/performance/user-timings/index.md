---
layout: 'layouts/doc-post.njk'
title: User Timing marks and measures
description: |
  Learn how the User Timing API can help you get real-world performance data
  for your web page.
date: 2019-05-02
updated: 2019-10-04
---

## What's the User Timing API?

Making your web app fast and responsive is crucial for a good user experience.
The first step in improving performance is identifying where time is being spent.

The [User Timing API](https://developer.mozilla.org/docs/Web/API/User_Timing_API)
gives you a way to measure your app's JavaScript performance.
You do that by inserting API calls in your JavaScript and then
extracting detailed timing data that you can use to optimize your code.
You can access those data from JavaScript using the API
or by viewing them on your [Chrome DevTools Timeline Recordings](/docs/devtools/evaluate-performance/performance-reference/).

Check out the [page about the User Timing API](https://web.dev/usertiming/)
for a quick introduction to using it.

## How Lighthouse reports User Timing data

When your app uses the User Timing API to add marks (that is, time stamps)
and measures (that is, measurements of the elapsed time between marks),
you'll see them in your
[Lighthouse](/docs/lighthouse/overview/) report:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/PWzo7o0AN7SpBeGKG2OD.png", alt="A screenshot of the Lighthouse User Timing marks and measures audit", width="800", height="408" %}
</figure>

Lighthouse extracts User Timing data from
[Chrome's Trace Event Profiling Tool](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

This audit is not structured as a pass or fail test.
It's just an opportunity to discover a useful API that can help you measure your app's performance.

{% Partial 'lighthouse-performance/scoring.njk' %}

## Stack-specific guidance

### React

Use the [React DevTools
Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html),
which makes use of the Profiler API, to measure the rendering performance of
your components.

## Resources

- [Source code for **User Timing marks and measures** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/user-timings.js)
- [User Timing API (MDN)](https://developer.mozilla.org/docs/Web/API/User_Timing_API)
- [User Timing API (web.dev)](https://web.dev/usertiming/)

---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Chrome User Experience Report - expanding to top 1 Million+ origins

# Required
description: >
 Today, we’re announcing a new Chrome User Experience Report with expanded coverage of over 1 million top origins on the web.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - ilyagrigorik

# Required
date: 2017-12-14

# Optional
# Include an updated date when you update your post
updated: 2017-12-14

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
#tags:


---

{% YouTube id="_srJ7eHS3IM" %}

Today, we're happy to announce a new [Chrome User Experience Report](/docs/crux)
with expanded coverage of over 1 million top origins on the web. Originally
[announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html)
at the Chrome Developer Summit 2017, the report is a public dataset of key
user experience metrics for popular sites on the web.

All data included in the new dataset reflects real-user measurement captured
during the [month of November 2017](https://bigquery.cloud.google.com/table/chrome-ux-report:all.201711).
CrUX performance data is based on real-world measurement, as experienced by
Chrome users across a diverse set of hardware and network conditions around the
world. Moving forward, we will release a new report monthly to provide insight
into trends and user experience changes on the web.

A key goal of CrUX is to enable macro level analysis of real-world user
experience trends on the web, expanding the scope of performance analysis beyond
an individual page or website. It has been exciting to see the community begin
to experiment with this data, for example:

+  Dexecure is [experimenting with new Site Experience
Benchmark](https://dexecure.com/blog/chrome-user-experience-report-explained-google-bigquery/)
based on CrUX data, allowing them to compare differences in user experience
across connection types, and even approximate impact
[across geographies](https://dexecure.com/blog/impact-3g-vs-4g-connections-user-experience-countries/).

+  HTTP Archive is surfacing a new [Loading report powered by
CrUX](https://beta.httparchive.org/reports/chrome-ux-report)
, which provides a macro-level comparison of key loading user experience
metrics between mobile and desktop devices.

For details on the dataset format, how to access it, and best practices for
analysis, please see our [developer
documentation](/web/tools/chrome-user-experience-report/), and join the
[discussion](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)
if you have questions or feedback. We're excited to see what you'll build with
the expanded dataset!


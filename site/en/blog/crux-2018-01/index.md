---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Chrome User Experience Report - New country dimension

# Required
description: >
  Announcing the release of a new country dimension in the Chrome User Experience Report.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - rviscomi

# Required
date: 2018-01-24

# Optional
# Include an updated date when you update your post
updated: 2022-07-19

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
#tags:


---

The
[Chrome User Experience Report](/docs/crux/)
(CrUX) is a public dataset of real user performance data. Since we
[announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html)
the report, one of the most requested additions has been the ability to better
understand differences in user experience across locations. Based on this
feedback, we are expanding the existing CrUX dataset––which provides a global
view across all geographic regions––to also include a collection of separate
country-specific datasets!


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/64Hyz3kg8A4LSqmCNYkK.png", alt="Map of countries included in the CrUX dataset", width="800", height="929" %}
  <figcaption>
    Map of countries included in the CrUX dataset
  </figcaption>
</figure>


For example, in the screenshot above we see a query that compares the aggregate
densities for 4G and 3G effective connection types across a few countries.
What’s interesting is to see how prevalent 4G speeds are in Japan, while 3G
speeds are still very common in India. Insights like these are made possible
thanks to the new country dimension.

To get started, head over to the
[CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all)
on BigQuery and you’ll see a list of datasets organized by
[country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
from `country_ae` (United Arab Emirates) to `country_za` (South Africa).
The familiar `all` dataset is still there to capture the global aggregate
performance data. Within each dataset there are monthly tables starting with
the most recent report, `201712`. For a detailed walkthrough on how to get
started, please refer to our updated
[CrUX documentation](/docs/crux/).

We’re excited to share this new data with you and hope to see you use it in
ways to improve the user experience on the web. To get help, ask questions,
offer feedback, or share findings from your own analysis, join the discussion
on the
[CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report).
And if the free tier on BigQuery isn’t enough to contain your querying
enthusiasm, we’re still running a promotion to give you an
[extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform),
so go get your credits while supplies last!



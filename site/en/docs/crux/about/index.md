---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: About CrUX

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  Introduction to the CrUX dataset.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  The Chrome User Experience Report (also known as the Chrome UX Report, or CrUX for short) is a dataset that reflects how real-world Chrome users experience popular destinations on the web.

# Required
date: 2022-06-23

# Optional
# Include an updated date when you update your post
# updated: 2020-10-16

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

CrUX is the official dataset of the [Web Vitals](https://web.dev/vitals/) program. All user-centric Core Web Vitals metrics will be represented in the dataset.

CrUX data is collected from real browsers around the world, based on certain browser options which determine [user eligibility](/docs/crux/methodology/#user-eligibility). A set of [dimensions](/docs/crux/methodology/#dimensions) and [metrics](/docs/crux/methodology/#metrics) are collected which allow site owners to determine how users experience their sites.

The data collected by CrUX is available publicly through a number of [tools](/docs/crux/methodology/#tools) and is used by Google Search to inform the [page experience ranking factor](https://developers.google.com/search/docs/advanced/experience/page-experience).

Not all origins or pages are represented in the dataset. There are separate eligibility criteria for [origins](/docs/crux/methodology/#origin-eligibility) and [pages](/docs/crux/methodology/#page-eligibility), primarily that they must be publicly discoverable and there must be a large enough number of visitors in order to create a statistically significant dataset.

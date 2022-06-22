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
  Introduction to the Chrome Real User Experience Report

# Optional
# This appears below the title and is an optional teaser
subhead: >
  Introduction to the Chrome Real User Experience Report

# Required
date: 2022-04-01

# Optional
# Include an updated date when you update your post
updated: 2020-10-16

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - simonhearne

# Optional
# How to a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - performance
---

The Chrome User Experience Report (also known as the Chrome UX Report, or CrUX for short) is a dataset that reflects how real-world Chrome users experience popular destinations on the web.

CrUX is the official dataset of the [Web Vitals](https://web.dev/vitals/) program. All user-centric Core Web Vitals metrics will be represented in the dataset.

CrUX data is collected from real browsers around the world, based on certain browser options which determine [user eligibility](#user-eligibility). A set of [dimensions](#dimensions) and [metrics](#metrics) are collected which allow site owners to determine how users experience their sites.

The data collected by CrUX is available publicly through a number of [tools](#tools) and is used by Google Search to inform the [Page Experience ranking factor](https://developers.google.com/search/docs/advanced/experience/page-experience).

Performance data is stored as histograms, allowing users to extract key percentile values such as the 75th used in Page Experience.

Not all origins or pages are represented in the dataset. There are separate eligibility criteria for [origins](#origin-eligibility) and [pages](#page-eligibility), primarily that there must be a large enough number of distinct visitors in order to create a statistically significant dataset.

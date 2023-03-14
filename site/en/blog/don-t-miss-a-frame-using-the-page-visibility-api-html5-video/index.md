---
layout: 'layouts/blog-post.njk'
title: Don't miss a frame - Using the Page Visibility API + HTML5 Video
description: >
  The Page Visibility API can be used to check if the current tab is visible or not.
authors:
  - ericbidelman
date: 2011-07-15
updated: 2019-01-16

---

The [Page Visibility API](/blog/page-visibility-api-have-i-got-your-attention/) can be used to check if the current tab is visible or not. [Sam Dutton](https://twitter.com/sw12) has thrown together a nice demo highlighting one great use case for the API: pausing a playing HTML5 video if the user switches tabs.

[Demo](https://samdutton.wordpress.com/2011/07/15/the-page-visibility-api/)

The demo requires Chrome 13 or higher but could be adapted to work with the upcoming IE10, which will include [support](https://docs.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/dev-guides/hh673553%28v%3dvs.85%29) for the Page Visibility API.

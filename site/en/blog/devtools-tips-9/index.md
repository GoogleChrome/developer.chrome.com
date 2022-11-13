---
title: >
  DevTools Tips: How to inspect CSS container queries
description: >
  Inspect and debug CSS container queries with DevTools.
layout: 'layouts/blog-post.njk'
date: 2022-06-30
authors:
  - sofiayem
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7fid3Zx57cRSpIndGA2M.png'
alt: >
  DevTools Tips hero logo
tags:
  - css
  - devtools
  - devtools-tips
---

[CSS container queries](https://web.dev/new-responsive/#responsive-to-the-container) is the new CSS feature that web developers are excited about. It may trigger a revolution in web design—from page-based responsive design to container-based [responsive design](https://web.dev/new-responsive/#responsive-to-the-container).

{% YouTube id='X4TYXlvbb2E' %}

[Chrome DevTools](/docs/devtools/) is here to help you adopt new layout design patterns and stay on top of the latest trends. With the support of this CSS feature, you can now inspect and debug your container queries in DevTools.

The video above gives you an overview of container queries, their syntax, and how to inspect them in DevTools.

You can now discover container elements and their descendants with the corresponding badge that toggles a dotted-line overlay.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/32Rgch28boxD9dSwHVwJ.png", alt="Container badge.", width="800", height="497" %}

Inspect `@container` rules applied to descendants when containers satisfy query conditions.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WbHl2Tj7voNJ7tIgZzWD.png", alt="@container rule.", width="800", height="647" %}

To learn more about the support of container queries in DevTools, see [Inspect and debug CSS container queries](/docs/devtools/css/container-queries/).

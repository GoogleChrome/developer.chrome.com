---
title: >
  DevTools Tips: Identify CSS improvelements
description: >
  Use the CSS Overview panel to identify potential CSS improvements.
layout: 'layouts/blog-post.njk'
date: 2022-11-23
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LDRHsz4mB5aTBCYFNqSD.png'
alt: >
  DevTools Tips hero logo
tags:
  - css
  - devtools
  - devtools-tips
---

The **CSS Overview** panel in DevTools lets you find potential CSS improvements on your page at a glance.

{% YouTube id='OAP_Sr0zb5I' %}

To get a report, open DevTools > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="More.", width="24", height="24" %} > **More tools** > **CSS Overview** and click **Capture overview**.

The report shows you several sections:

- A summary with statistics on styles, selectors, and media queries.
- A breakdown of used colors including [contrast issues](/docs/devtools/accessibility/contrast/)—the most [common issues on the web](https://webaim.org/projects/million/#wcag).
- A breakdown of used fonts with statistics on size, weight, and line height.
- Unused CSS declarations.
- Statistics on media queries sorted by number of occurrences in descending order.

For a more hands-on learning experience, see [CSS Overview: Identify potential CSS improvements](/docs/devtools/css-overview/).

To learn more on contrast issues, see [Make your website more readable](/docs/devtools/accessibility/contrast/).

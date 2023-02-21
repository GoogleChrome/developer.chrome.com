---
title: >
  DevTools Tips: Discover CSS issues
description: >
  Use the Styles and Computed panes to discover CSS issues with DevTools.
layout: 'layouts/blog-post.njk'
date: 2023-02-23
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9o9lHPSAE6DRx6eb84gb.png'
alt: >
  DevTools Tips hero logo
tags:
  - devtools
  - devtools-tips
---

Have you ever applied some CSS to an element but it just doesn't work?

With Chrome DevTools, you can discover and debug CSS issues with the **Elements** > **Styles** and **Computed** panes.

<!-- {% YouTube id='-------' %} -->

Watch the video to learn how DevTools highlights various CSS issues:

- Properties with invalid syntax
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vZqUZJOGJRKpZqTw5BOH.png", alt="Invalid value.", width="380", height="88" %}
- Overridden properties
- Inactive properties
- Inherited and non-inherited properties
- Implied longhand properties
- Non-editable properties

More debugging tips: 

- Use the filter in the **Styles** pane to focus on the one property that interests you.
- Use the **Computed** pane to see all the [Cascade](https://developer.mozilla.org/docs/Web/CSS/Cascade) winners and their computed values.
- In the **Computed** pane, expand a property and click a link to its source in the **Styles** pane.

To learn more about all the ways DevTools highlights CSS issues, see [Find invalid, overridden, inactive, and other CSS](/docs/devtools/css/issues/).

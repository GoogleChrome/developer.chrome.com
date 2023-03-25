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

Have you ever applied CSS to an element but it just doesn't work?

With Chrome DevTools, you can discover CSS issues at a glance, debug, and test them.

{% YouTube id='iuZx0kHS0Xs' %}

Watch the video to learn how the **Elements** > **Styles** pane highlights various CSS issues:

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jmGK9ty59IimtzofYo64.png", alt="Warning.", width="26", height="24" %} <s>Property with invalid syntax</s>

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} <s>Overridden property</s>

- <span style="opacity:0.5">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} Inactive property {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2OyGRodvgk9neTIEAH4g.svg", alt="Information.", width="20", height="20" %}{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xWgVEhCcJCewCZMPA40M.png", alt="With a hint.", width="80", height="20" %}<span>

- <span style="background-color: #e9ebed;display: block;">Inherited from <code>parent</code></span>

  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} Inherited property
  - <span style="opacity:0.5">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} Non-inherited property</span>

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} Expandable shorthand property {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EFQ1zrhFIERbYg3nkEdG.png", alt="Expand.", width="20", height="16" %}

  - <span style="opacity:0.5">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} <s>Overridden longhand property</s></span>
  - <span style="opacity:0.5">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} Active longhand property</span>

<span style="float:right; opacity: 0.5;"><em>user agent stylesheet</em></span>
- *Non-editable property*
- <s><em>Overridden non-editable property</em></s>

More debugging tips: 

- Use the filter in the **Styles** pane to focus on the one property that interests you.
- Use the **Computed** pane to see all the [Cascade](https://developer.mozilla.org/docs/Web/CSS/Cascade) winners and their computed values.
- In the **Computed** pane, expand a property and click a link to find its source in the **Styles** pane.

To learn more about all the ways DevTools highlights CSS issues, see [Find invalid, overridden, inactive, and other CSS](/docs/devtools/css/issues/).

To level up your CSS expertise, see [Learn CSS](https://web.dev/learn/css/).

To learn how to create websites that look great and work well for everyone, see [Learn Responsive Design](https://web.dev/learn/design/).

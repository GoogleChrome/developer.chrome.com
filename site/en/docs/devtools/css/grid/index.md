---
layout: "layouts/doc-post.njk"
title: "Inspect CSS grid layouts"
authors:
  - jecelynyeen
  - sofiayem
date: 2021-06-08
updated: 2022-08-18
description: "Learn how to use Chrome DevTools to view and change CSS grids."
tags:
  - prototype-fixes
  - css
---

This guide shows you how to discover CSS grids on a page, examine them, and debug layout issues
in the **Elements** panel of Chrome DevTools.

{% YouTube id='M8SlBgul8ao' %}

The examples shown in the screenshots appearing in this article are from these two web pages: [Fruit
box][1] and [Snack box][2].

## Discover CSS grids {: #discover }

When an HTML element on your page has `display: grid` or `display: inline-grid` applied to it, you
can see a [`grid` badge](/docs/devtools/elements/badges/#grid) next to it in the [**Elements**][3] panel.

{% Img src="image/admin/SbWH3OGFQDiXKV2Eev2j.png", alt="Discover grid", width="800", height="524" %}

Clicking the badge to toggle the display of a grid overlay on the page. The overlay appears over the
element, laid out like a grid to show the position of its grid lines and tracks:

{% Img src="image/admin/YwKMuoODL6eFMvfJOzlF.png", alt="Toggle grid badge.", width="800", height="524" %}

{% Aside %}
**Note**: Similarly, you can also toggle the overlay of a [subgrid](https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout/Subgrid) with the [subgrid badge](/docs/devtools/elements/badges/#subgrid). 
{% endAside %}

Open the **Layout** pane. When grids are included on a page, the Layout pane includes a **Grid**
section containing a number of options for viewing those grids.

{% Img src="image/admin/r4Ignwcmy4VzFqs3Zzb1.png", alt="Layout pane.", width="800", height="524" %}

## Align grid items and their content with the Grid Editor {: #grid-editor }

You can align grid items and their content with a click of a button instead of typing CSS rules.

To align grid items and their content:

1. In the **Elements** > **Styles** pane, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JFbQddgayUhHoW6jtlXe.png", alt="Grid Editor.", width="22", height="22" %} **Grid Editor** button next to `display: grid`.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/l185BjeN8O7LBbMZxNY7.png", alt="Grid Editor button.", width="800", height="424" %}

1. In the **Grid Editor**, click the corresponding buttons to set the `align-*` and `justify-*` CSS properties for the grid items and their content.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cMNZJ8oMcxjzOH5s63u1.png", alt="Setting CSS properties.", width="800", height="424" %}

1. Observe the adjusted grid items and content in the viewport.

## Grid viewing options {: #options }

The **Grid** section in the **Layout** pane contains 2 sub sections:

- Overlay display settings
- Grid overlays

Let's look into each of these sub sections in detail.

## Overlay display settings {: #display-settings }

The **Overlay display settings** consists of two parts:

a. A drop-down menu with the following options:

- **Hide line labels**: Hide the line labels for each grid overlay.
- **Show lines number**: Show the line numbers for each grid overlay (selected by default).
- **Show line names**: Show the line names for each grid overlay in the case of grids with line
  names.

b. Checkboxes with options within:

- **Show track sizes**: Toggle to show or hide track sizes.
- **Show area names**: Toggle to show or hide area names, in the case of grids with named grid
  areas.
- **Extend grid lines**: By default, grid lines are only shown inside the element with
  `display: grid` or `display: inline-grid` set on it; when toggling this option on, the grid lines
  extend to the edge of the viewport along each axis.

Let's examine these settings in more detail.

### Show line numbers {: #line-numbers }

By default, the positive and negative line numbers are displayed on the grid overlay.

{% Img src="image/admin/KEEXn0ipZF0I7Y1qNuZs.png", alt="Show line numbers.", width="800", height="524" %}

### Hide line labels {: #line-labels }

Select **Hide line labels** to hide the line numbers.

{% Img src="image/admin/I1QJnFZDFcIflsKBSK8J.png", alt="Hide line labels.", width="800", height="524" %}

### Show line names {: #line-names }

You can select **Show line names** to view the line names instead of numbers. In this example, we
have four lines with names: left, middle1, middle2 and right.

In this demo, **orange** element spans from left to right, with CSS `grid-column: left / right`.
Showing line names make it easier to visualize the start and end position of the element.

{% Img src="image/admin/fiQzqCmGbD0acgVNXWyR.png", alt="Show line names.", width="800", height="524" %}

### Show track sizes {: #track-sizes }

Enable the **Show track sizes** checkbox to view the track sizes of the grid.

DevTools will display `[authored size] - [computed size]` in each line label: **Authored** size: The
size defined in stylesheet (omitted if not defined). **Computed** size: The actual size on screen.

In this demo, the `snack-box` column sizes are defined in the CSS `grid-template-columns:1fr 2fr;`.
Therefore, the column line labels show both authored and computed sizes: **1fr - 96.66px** and
**2fr - 193.32px**.

The row line labels show only computed sizes: **80px** and **80px** since there are no row sizes
defined in the stylesheet.

{% Img src="image/admin/RknbkSjXv9ZKgL83nx8N.png", alt="Show track sizes.", width="800", height="524" %}

### Show area names {: #area-names }

To view the area names, enable the **Show area names** checkbox. In this example, there are three areas
in the grid - **top**, **bottom1** and **bottom2**.

{% Img src="image/admin/iPPMOUBJFtsTyKr0ZcMh.png", alt="Show area names.", width="800", height="524" %}

### Extend grid lines {: #extend-grid-lines }

Enable the **Extend grid lines** checkbox to extend the grid lines to the edge of the viewport along
each axis.

{% Img src="image/admin/OlajZ73i2Y8hlAIZAwFD.png", alt="Extend grid lines.", width="800", height="524" %}

## Grid overlays {: #overlays }

The **Grid overlays** section contains a list of grids that are present on the page, each with a
checkbox, along with various options.

### Enable overlay views of multiple grids {: #view-multiple-grids }

You can enable overlay views of multiple grids. In this example, there are two grid overlays enabled -
`main` and `div.snack-box`, each represented with different colors.

{% Img src="image/admin/GMCjbEkrzZXFfskAqlUe.png", alt="Enable overlay views of multiple grids.", width="800", height="524" %}

### Customize the grid overlay color {: #customize-overlay-color }

You can customize each grid overlay color by clicking the color picker.

{% Img src="image/admin/GLcwHKYxWT6oQW7rd0HP.png", alt="Customize the grid overlay color", width="800", height="524" %}

### Highlight the grid {: #highlight-grid }

Click the highlight icon to immediately highlight the HTML element, scroll to it in the page and
select it in the Elements panel.

{% Img src="image/admin/JinOsqhnOBZIf6A2UdWD.png", alt="Highlight the grid", width="800", height="524" %}

[1]: https://jec.fish/demo/css-grid-fruit
[2]: https://jec.fish/demo/css-grid-snack
[3]: /docs/devtools/open

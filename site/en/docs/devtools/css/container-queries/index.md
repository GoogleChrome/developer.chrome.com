---
layout: "layouts/doc-post.njk"
title: "Inspect and debug CSS container queries"
authors:
  - sofiayem
  - jecelynyeen
date: 2022-06-30
updated: 2023-03-19
description: "Learn how to use Chrome DevTools to inspect, modify, and debug CSS container queries."
tags:
  - prototype-fixes
  - css
---

This guide shows you how to inspect and debug CSS container queries in the **Elements** panel in Chrome DevTools.

{% YouTube id='X4TYXlvbb2E' %}

[CSS container queries][3] allow you to manipulate the element's styles based on its parent container properties. This capability shifts the concept of [responsive web design][2] from page-based to [container-based](https://web.dev/new-responsive/).

The screenshots in this guide are taken from [this demo page](https://jec.fish/demo/css-cq-coffee).

## Discover containers and their descendants {: #discover-descendants}

Every element defined as a query container has a `container` badge next to it in the **Elements** panel. The badge toggles a dotted-line overlay of the container and its descendants.

To toggle the overlay:

1. [Open DevTools][1].
1. In the **Elements** panel, click the `container` badge next to the element defined as a container.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/32Rgch28boxD9dSwHVwJ.png", alt="Container badge.", width="800", height="497" %}

In this example, the `container-type: inline-size` property defines the container element. The descendants can query its inline dimension (horizontal axis) and change their styles based on the width of the container.

## Inspect container queries {: #inspect-container-queries }

The **Elements** panel shows  `@container` query declarations when they are applied to a descendant element, that is, when the container fulfills the query's condition.

To understand when you can inspect `@container` declarations on [this demo page](https://jec.fish/demo/css-cq-coffee), examine the following code sample:

```css
@container (inline-size > 400px) {
  .coffee p {
    display: block;
  }
}

@container (inline-size > 600px) {
  .coffee {
    display: grid;
    grid-template-columns: 280px auto;
  }

  .coffee h1 {
    grid-column: 1/3;
  }

  .coffee img {
    grid-row: 2/4;
  }
```

In this example, if the container's width exceeds the following number of pixels, the corresponding styles apply:

- More than `400px`: the paragraph (`p`) element appears on the page as a block—starts on a new line and takes up the whole width.
- More than `600px`: descendants adopt a horizontal grid layout with the title (`h1`) on the top, and image (`img`) on the left.

To inspect the first `@container` declaration:

1. In the **Elements** panel, set the container's width to `500px`. The `p` element appears.
1. Select the `p` element. In the **Styles** pane, you can see the `@container` declaration along with a link to the parent container `article.card`.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/c0jBYWpVuerGxsF0YSBc.png", alt="@container declaration.", width="800", height="569" %}

1. Set the width to more than `600px`, then select any of the affected elements. Observe `@container` declarations that implement a horizontal layout.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iByqqVWOYKjeU0UYA0mu.png", alt="More @container declarations.", width="800", height="392" %}

## Find container elements {: #find-containers }

To find and select a container element that caused the query to take effect, hover over and click the element name above the `@container` declaration.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YZ5NenZ08cZtF8Fu6TR7.png", alt="Hovering over the element name.", width="800", height="392" %}

When hovered over, the name turns into a link to the element in the **Elements** panel and the **Styles** pane displays the queried property and its current value.

## Modify container queries {: #modify }

To debug a query, you can modify it as any other CSS declaration in the **Styles** pane as described in [View and change CSS](/docs/devtools/css/).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/OdeunIEJzVJ9BSmAyaR0.mp4", autoplay=true, loop=true, class="screenshot" %}

In this example, the container's width is `500px`. The paragraph (`p`) element appears on the page. 

1. Select the `p` element. In the **Styles** pane. You can see the `@container (inline-size > 400px)` declaration.
2. Change the `inline-size` from `400px` to `520px`.
3. The paragraph (`p`) element disappears from the page because it did not fulfill the query criteria.

[1]: /docs/devtools/open
[2]: https://web.dev/learn/design/intro/
[3]: https://web.dev/new-responsive/#responsive-to-the-container

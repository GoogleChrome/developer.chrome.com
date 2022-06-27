---
layout: "layouts/doc-post.njk"
title: "Inspect and debug CSS container queries"
authors:
  - sofiayem
date: 2022-06-30
#updated: YYYY-MM-DD
description: "Learn how to use Chrome DevTools to inspect, modify, and debug CSS container queries."
tags:
  - prototype-fixes
  - css
---

This guide shows you how to inspect, modify, and debug CSS container queries on the **Elements** panel in Chrome DevTools.

[CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) allow you to manipulate the element's styles based on its parent container properties. This important capability shifts the concept of [responsive web design][2] from page-based to [container-based](https://web.dev/new-responsive/).

{% Aside %}
CSS container queries is an experimental feature. To enable its support in DevTools, under [`chrome://flags`](chrome://flags), set the `Enable CSS Container Queries` experiment to `Enabled`.
{% endAside %}

The screenshots in this guide are from [this demo page](https://jec.fyi/demo/css-cq-coffee).

## Discover containers and their descendants {: #discover-descendants}

When you define a query container, you can see a `container` badge next to the element in the **Elements** panel.

To toggle an overlay of the container's descendants:

1. [Open DevTools][1].
1. In the **Elements** panel, click the `container` badge next to the element defined as a container.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/32Rgch28boxD9dSwHVwJ.png", alt="Container badge.", width="800", height="497" %}

In this example, the `container-type: inline-size` property defines the container element. The descendants can query its inline dimension (horizontal axis) and change their styles based on the width of the container.

## Inspect container queries {: #inspect-container-queries }

The **Elements** panel shows the `@container` declarations when they are applied, that is, when the query's condition is fulfilled.

To understand when you're able to inspect `@container` declarations on [this demo page](https://jec.fyi/demo/css-cq-coffee), examine the following code sample:

```css
@container (inline-size > 400px) {
  .coffee p {
    display: block;
  }
}

@container (inline-size > 600px) {
  .coffee p, .coffee a {
    margin-left: 20px;
  }

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

In this example, if the container's width surpasses the following number of pixels:

- `400px`: the paragraph (`p`) element appears on the page as a block—starts on a new line and takes up the whole width.
- `600px`: all the descendants adopt a horizontal grid layout with the title (`h1`) on the top, and image (`img`) on the left.

To inspect the first `@container` declaration:

1. In the **Elements** panel, set the container's width to `500px`. The `p` element appears.
1. Select the `p` element. In the **Styles** pane, you can the `@ container` declaration along with a link to the parent container `article.card`.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/c0jBYWpVuerGxsF0YSBc.png", alt="@container declaration.", width="800", height="569" %}

1. Setting the width to more than `600px`, then select the affected elements and observe their `@container` declarations.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iByqqVWOYKjeU0UYA0mu.png", alt="More @container declarations.", width="800", height="392" %}

## Find container elements {: #find-containers }

To find and select a container element that caused the query to take effect, hover over and click the element name above the `@container` declaration.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YZ5NenZ08cZtF8Fu6TR7.png", alt="Hovering over the element name.", width="800", height="392" %}

When hovered over, the name turns into a link to the element in the **Elements** panel and the **Styles** pane displays the queried property and its current value.

## Modify container queries {: #modify }

To debug a query, you can modify it as any other CSS declaration in the **Styles** pane as described in [View and change CSS](/docs/devtools/css/).

[1]: /docs/devtools/open
[2]: https://developer.mozilla.org/docs/Learn/CSS/CSS_layout/Responsive_Design
[3]: https://developer.mozilla.org/docs/Web/CSS/CSS_Container_Queries

---
title: "Container queries begin to land in stable browsers while the polyfill gets a big update"
description: >
  "Container queries enable components to own their responsive styling information based on the space they fit within. This feature is starting to roll out to modern browsers, and there's been a big update for polyfill support."
layout: 'layouts/blog-post.njk'
date: 2022-09-15
hero: 'image/HodOHWjMnbNw56hvNASHWSgZyAf2/8NcncbrOEEUqTRR1UaoE.jpg'
alt: >
  Laptop with vivid colors as a reflective background.
tags:
  - chrome-105
  - css
authors:
  - unakravets
  - gbmonaco
---

## Container queries are here!

Exciting news—one of the most highly requested developer features has begun to land in web browsers! As of [Chromium 105](/blog/new-in-chrome-105/) and [Safari 16](https://webkit.org/blog/13152/webkit-features-in-safari-16-0/), you can now create size-based [container queries](/blog/has-with-cq-m105/) and use [container query unit values](https://ishadeed.com/article/container-query-units/) in these browsers. To make it even easier to use size-based container queries and `cq` units, the Aurora team at Chrome has been hard at work updating the [Container Query Polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) to support more browsers and use cases so you can feel confident using this powerful feature today.

{% Aside %}
Container queries are a part of the [css-contain-3 specification](https://www.w3.org/TR/css-contain-3/). This specification covers new unit values and both size and style container types, though browsers are initially launching with only the support of size-containment. Because of this, we’ll focus on size containment in this article.
{% endAside %}

## What are container queries?
[Container queries](https://www.youtube.com/watch?v=gCNMyYr7F6w) are a CSS feature which enables you to write styling logic that targets features of a parent element to style its children.  You can create truly component-based responsive design by querying for a parent’s size. This is much more granular and useful information than something like [media queries](https://web.dev/learn/design/media-queries/) that only provide size information about the viewport.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/Sw2dY4cpYjc8GBJVmCrK.png", alt="ALT_TEXT_HERE", width="800", height="372" %}

With container queries, you can write reusable components that can appear differently based on where they live in the page. This makes them much more resilient and responsive across pages and templates.

## Using container queries
Say you have some HTML:

```html
<!-- card parent -->
<div class=”card-parent”>
  <div class=”card>
     <!-- card contents -->
      …
  </div>
</div>
```

To use a container query, you first need to set containment on the parent element you want to track. Do this by setting the `container-type` property, or using the `container` shorthand to set the container type and container name at the same time.

```css
.card-parent {
  /* query the inline-direction size of this parent */
  container-type: inline-size;
}
```

Now, you can use the `@container` rule to set styles based on the closest parent. For a design like the image above, where a card might go from one column to two columns, write something like:

```css
@container (min-width: 300px) {
  .card {
    /* styles to apply when the card container (.card-parent in this case) is >= 300px */
    /* I.e. shift from 1-column to 2-column layout: */
    grid-template-columns: 1fr 1fr;
  }
}
```

To be more neat and explicit, give the parent element container a name:

```css
.card-parent {
  container-type: inline-size;
  /* set name here, or write this in one line using the container shorthand */
  container-name: card-container;
}
```

Then rewrite the previous code as:

```css
@container card-container (min-width: 300px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
```

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/gDtHfgcFfTU4q8syn4Ct.mp4", autoplay="true", controls="true", loop="true" %}

{% Codepen {
  user: 'web-dot-dev',
  id: 'LYmNyER',
  height: 450,
  tab: 'result'
} %}

## Container query units

To make container queries even more useful, you can use container-based unit values as well. The following table shows the possible container unit values and how they correspond to a container’s size:

<table><thead><tr><th>unit</th><th>relative to</th></tr></thead><tbody><tr><td><code>cqw</code></td><td>1% of a query container’s width</td></tr><tr><td><code>cqh</code></td><td>1% of a query container’s height</td></tr><tr><td><code>cqi</code></td><td>1% of a query container’s inline size</td></tr><tr><td><code>cqb</code></td><td>1% of a query container’s block size</td></tr><tr><td><code>cqmin</code></td><td>The smaller value of cqi or cqb</td></tr><tr><td><code>cqmax</code></td><td>The larger value of cqi or cqb</td></tr></tbody></table>

One example for how you would use container-based units is responsive typography. The viewport-based units (such as `vh`, `vb`, `vw`, and `vi`) can be used to size any element on the screen. 

```css
.card h2 {
  font-size: 15cqi;
}
```

This code will make the font-size 15% of the inline size of the container, meaning it will get bigger as the inline size (width) increases, or smaller as it decreases. To take this even further, use the `clamp()` function to give your typography a minimum and maximum size limit, and size it responsively based on the container size:

```css
.card h2 {
  font-size: clamp(1.5rem, 15cqi, 3rem);
}
```

Now the header will never get larger than `3rem` or smaller than `.5rem` but it will take 15% of the container’s inline size anywhere in between.

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/6mrxzhOLJJsuD8yWLI4B.mp4", autoplay="true", controls="true", loop="true" %}

{% Codepen {
  user: 'web-dot-dev',
  id: 'XWqdRbJ',
  height: 450,
  tab: 'result'
} %}

This demo takes that a step further and updates the wider cards to have a smaller size range, as they present in a 2-column view.

## The container query polyfill

Because container queries are such a powerful feature, we want you to be able to feel comfortable incorporating it into your projects, and know that browser support is a big part of that. Because of this, we’ve been working on making improvements to the [Container Query Polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill). This polyfill has general support in:

- Firefox 69+
- Chrome 79+
- Edge 79+
- Safari 13.4+

It is under 9kb in size when compressed, and uses ResizeObserver with MutationObserver to support the full @container query syntax that is currently available in stable browsers:

- Discrete queries (`width: 300px` and `min-width: 300px`).
- Range queries (`200px < width < 400px` and `width < 400px`).
- Container relative length units (`cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, and` cqmax`) in properties and keyframes.

## Using the container query polyfill
To use the polyfill, add this script tag to the head of your document: :

```js
<script type="module">
  if (!("container" in document.documentElement.style)) {
    import("https://unpkg.com/container-query-polyfill@^0.2.0");
  }
</script>
```

You may also wish to use a service to conditionally deliver the polyfill based on `User-Agent`, or self-host it on your own origin.

{% Aside %}
All browsers have support for container queries released or on their roadmap, so it's recommended that you avoid bundling the polyfill with your other code.
{% endAside %}

For the best user experience, it's recommended that you initially only use the polyfill for content below-the-fold and use `@supports` queries to temporarily replace it with a loading indicator until the polyfill is ready to display it:

```css
@supports not (container-type: inline-size) {
  .container,
  footer {
    display: none;
  }

  .loader {
    display: flex;
  }
}
```

On sufficiently fast networks and devices, or devices that natively support container queries, this loading indicator will never be displayed.

{% Aside %}
Keep in mind that this technique effectively trades off [LCP](https://web.dev/lcp/) for less jank during initial load, so you may see regressions in the former as a result, particularly on low end devices.
{% endAside %}

## New Polyfill Features

The updated polyfill supports:
- Nested `@container` rules.
- Nesting `@container` rules under `@supports` and `@media` queries and vice versa is supported.
- Conditional CSS such as `@supports (container-type: inline-size)` will pass after the polyfill loads.
- Full CSS syntax support (there is no longer any issue with putting comments anywhere that they are syntactically valid).
- Vertical writing modes (via writing-mode).
- Container Relative Units (`cqw`, `cqh`, etc) are supported within query conditions, property declarations, and animation keyframes.
`rem` and `em` are supported in query conditions.
Expanded container query syntax:
  - Range syntax (for example `(200px < width < 400px)`).
  - Equality queries (for example, `(width = 200px)`).
- Pseudo elements like `::before` and` ::after`.
- Browsers without `:is(...)`/`:where(...)` are supported via an optional [workaround](https://github.com/GoogleChromeLabs/container-query-polyfill#supporting-browsers-without-where)
- The `orientation` and `aspect-ratio` feature queries.
- Correctly filtering queries based on features (for example, querying `height` on `container: inline-size` is correctly disallowed with a horizontal writing mode).
- DOM mutation (for example, `<style>` and `<link>` elements being removed at runtime).

{% Aside %}
The updated container query polyfill no longer supports outdated legacy size query syntax where a user must wrap size queries in `size()` (i.e. `size(width >= 200px)`).
{% endAside %}

## Polyfill limitations and warnings

If you are using the container query polyfill, there are a few missing features to watch out for:

- The Shadow DOM is not yet supported.
- Container Relative Units (for example, `cqw` and `cqh`) are not supported in `@media` query conditions.
  - Safari: Container Relative Units are not supported in animation keyframes prior to 15.4.
- `calc()`, `min()`, `max()`, or other mathematical functions are not yet supported in query conditions.
- This polyfill only works with inline and same-origin CSS. Cross origin stylesheets, and stylesheets in iframes (unless a polyfill is manually loaded) are not supported.
- `layout` and `style` containment requires underlying browser support:
  - Safari 15.4+
  - Firefox does not support style containment at this time, but is [working](https://bugzilla.mozilla.org/show_bug.cgi?id=1463600) on it.

### Warnings

- To prevent impacting [FID](https://web.dev/fid/) and [CLS](https://web.dev/cls/), the polyfill makes no guarantees about when the first layout will occur, even if it’s loaded synchronously, except that it will attempt to avoid unreasonably delaying LCP. In other words, you should never rely on it for first paint. 
- Generates `ResizeObserver Loop Errors`. The original polyfill does this too, but it’s worth calling out. This occurs because the block-size of a `container-type: inline-size` will likely change after evaluating a query, but `ResizeObserver` has no way to tell it that we don’t care about block-size changes.
- This polyfill is tested against Web Platform Tests and reached 70% passing since certain features like JavaScript APIs are not polyfilled, and so the pass rate is intentionally closer to 70%.
- The `:where()` [workaround](https://github.com/GoogleChromeLabs/container-query-polyfill#supporting-browsers-without-where) is required for the 2.23% users of browsers older than:
  - Safari 14
  - Chromium 88
    - Edge 88
    - Samsung Internet 15
  - Firefox 78

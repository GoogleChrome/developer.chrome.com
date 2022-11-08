---
title: "Inside the container query polyfill"
description: "Learn how the container query polyfill brings container query support to older browsers."
layout: 'layouts/blog-post.njk'
date: 2022-10-10
hero: 'image/0Nc53fqpS4cgxOG9PCAyLwS0QwB3/75EKsp0A2SyU8bOWttSd.jpg'
alt: "An assortment of neatly arranged drafting tools. In the center is a blank sheet of graphing paper."
tags:
  - css
  - aurora-project
authors:
  - gbmonaco
---

[Container queries](https://www.youtube.com/watch?v=gCNMyYr7F6w) are a new CSS feature that enables you to write styling logic that targets features of a parent element (for example, its width or height) to style its children. Recently, a [big update](/blog/cq-polyfill/) to the [polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) was released, coinciding with support landing in browsers.

In this post, you will be able to take a peek inside how the polyfill works, the challenges it overcomes, and the best practices when using it to provide a great user experience for your visitors.

## Under the hood

### Transpilation

When the CSS parser inside a browser encounters an unknown at-rule, like the brand new `@container` rule, it will simply discard it as if it never existed. Therefore, the first and most important thing the polyfill must do is transpile an `@container` query into something that won’t be discarded.

{% Aside %}
This sort of transpilation often occurs at build-time, as part of a post-processing step. However, the polyfill does this at runtime instead, for two reasons: you and your visitors. With support for container queries already in [Chromium 105](/blog/new-in-chrome-105/) and [Safari 16](https://webkit.org/blog/13152/webkit-features-in-safari-16-0/), it’s expected that most of your visitors will likely be running browsers with built-in support sooner rather than later. Offline transpilation would effectively tax you (for having to maintain this offline post-processing step) _and_ your visitors (for having to download transpiled code that may never be used).
{% endAside %}

The first step in transpilation is to convert the top-level `@container` rule into an [@media](https://developer.mozilla.org/docs/Web/CSS/@media) query. This mostly ensures that the content remains grouped together. For example, when using [CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model) APIs and when viewing the CSS source.

{% Compare 'worse', 'before' %}
```css
@container (width > 300px) {
  /* content */
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
@media all {
  /* content */
}
```
{% endCompare %}

Before container queries, CSS didn’t have a way for an author to arbitrarily enable or disable groups of rules. To polyfill this behavior, the rules inside of a container query need to be transformed too. Each `@container` is given its own unique ID (for example, `123`), which is used to transform each selector such that it will only apply when the element has a `cq-XYZ` attribute including this ID. This attribute will be set by the polyfill at runtime.

{% Compare 'worse', 'before' %}
```css
@container (width > 300px) {
  .card {
    /* ... */
  }
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
@media all {
  .card:where([cq-XYZ~="123"]) {
    /* ... */
  }
}
```
{% endCompare %}

Notice the use of the [`:where(...)`](https://developer.mozilla.org/docs/Web/CSS/:where) pseudo-class. Normally, including an additional attribute selector would increase the [specificity](https://developer.mozilla.org/docs/Web/CSS/Specificity) of the selector. With the pseudo-class, the extra condition can be applied while preserving the original specificity. To see why this is crucial, consider the following example:

```css
@container (width > 300px) {
  .card {
    color: blue;
  }
}

.card {
  color: red;
}
```

Given this CSS, an element with the `.card` class should always have `color: red`, as the later rule would always override the previous rule with the same selector and specificity. Transpiling the first rule and including an additional attribute selector _without_ `:where(...)` would therefore increase the specificity, and cause `color: blue` to be applied erroneously.

However, the `:where(...)` pseudo-class is [fairly new](https://caniuse.com/mdn-css_selectors_where). For browsers that don’t support it, the polyfill provides a safe and easy workaround: you can _intentionally_ increase the specificity of your rules by manually adding a dummy `:not(.container-query-polyfill)` selector to your `@container` rules:

{% Compare 'worse', 'before' %}
```css
@container (width > 300px) {
  .card {
    color: blue;
  }
}
  
.card {
  color: red;
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
@container (width > 300px) {
  .card:not(.container-query-polyfill) {
    color: blue;
  }
}
  
.card {
  color: red;
}
```
{% endCompare %}

This has a number of benefits:

* The selector in the source CSS has changed, so the difference in specificity is explicitly visible. This also acts as documentation so you know what is affected when you no longer need to support the workaround or the polyfill.
* The specificity of the rules will always be the same, since the polyfill does not change it.

During transpilation, the polyfill will replace this dummy with the attribute selector with the same specificity. To avoid any surprises, the polyfill uses both selectors: the original source selector is used to determine if the element should receive the polyfill attribute, and the transpiled selector is used for styling.

### Pseudo-elements

One question you might be asking yourself is: if the polyfill sets some `cq-XYZ` attribute on an element to include the unique container ID `123`, how can pseudo-elements, which can’t have attributes set on them, be supported?

Pseudo-elements are always bound to a real element in the DOM, called the [originating element](https://www.w3.org/TR/selectors-4/#pseudo-element-attachment). During transpilation, the conditional selector is applied to this real element instead:

{% Compare 'worse', 'before' %}
```css
@container (width > 300px) {
  #foo::before {
    /* ... */
  }
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
@media all {
  #foo:where([cq-XYZ~="123"])::before {
    /* ... */
  }
}
```
{% endCompare %}

Instead of being transformed to `#foo::before:where([cq-XYZ~="123"])` (which would be invalid), the conditional selector is moved to the end of the originating element, `#foo`.

However, that’s not all that is needed. A container isn’t allowed to modify anything not contained _within_ it (and a container can’t be inside of itself), but consider that is exactly what would happen if `#foo` was itself the container element being queried. The `#foo[cq-XYZ]` attribute would be erroneously changed, and any `#foo` rules would be erroneously applied.

To correct this, the polyfill actually uses _two_ attributes: one that can only be applied to an element by a parent, and one that an element can apply to itself. The latter attribute is used for selectors that target pseudo-elements.

{% Compare 'worse', 'before' %}
```css
@container (width > 300px) {
  #foo,
  #foo::before {
    /* ... */
  }
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
@media all {
  #foo:where([cq-XYZ-A~="123"]),
  #foo:where([cq-XYZ-B~="123"])::before {
    /* ... */
  }
}
```
{% endCompare %}

Since a container will never apply the first attribute (`cq-XYZ-A`) to itself, the first selector will only match if a _different_ parent container has met the container conditions and applied it.

### Container relative units

Container queries also come with [a few new units](https://www.w3.org/TR/css-contain-3/#container-lengths) that you can use in your CSS, such as `cqw` and `cqh` for 1% of the width and height (respectively) of the closest appropriate parent container. To support these, the unit is transformed into a `calc(...)` expression using [CSS Custom Properties](https://developer.mozilla.org/docs/Web/CSS/--*). The polyfill will set the values for these properties via inline styles on the container element.

{% Compare 'worse', 'before' %}
```css
.card {
  width: 10cqw;
  height: 10cqh;
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
.card {
  width: calc(10 * --cq-XYZ-cqw);
  height: calc(10 * --cq-XYZ-cqh);
}
```
{% endCompare %}

There are also logical units, like `cqi` and `cqb` for inline size and block size (respectively). These are a little bit more complicated, because the inline and block axes are determined by the [`writing-mode`](https://developer.mozilla.org/docs/Web/CSS/writing-mode) of _the element using the unit_, not the element being queried. To support this, the polyfill applies an inline style to any element whose `writing-mode` differs from its parent.

```css
/* Element with a horizontal writing mode */
--cq-XYZ-cqi: var(--cq-XYZ-cqw);
--cq-XYZ-cqb: var(--cq-XYZ-cqh);

/* Element with a vertical writing mode */
--cq-XYZ-cqi: var(--cq-XYZ-cqh);
--cq-XYZ-cqb: var(--cq-XYZ-cqw);
```

Now, the units can be transformed into the appropriate CSS Custom Property just as before.

### Properties

Container queries also add a few new CSS properties like [`container-type`](https://www.w3.org/TR/css-contain-3/#container-type) and [`container-name`](https://www.w3.org/TR/css-contain-3/#container-name). Since APIs like `getComputedStyle(...)` can’t be used with unknown or invalid properties, these are also transformed to CSS Custom Properties _after being parsed_. If a property can’t be parsed (for example, because it contains an invalid or unknown value), it’s simply left alone for the browser to handle.

{% Compare 'worse', 'before' %}
```css
.card {
  container-name: card-container;
  container-type: inline-size;
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
.card {
  --cq-XYZ-container-name: card-container;
  --cq-XYZ-container-type: inline-size;
}
```
{% endCompare %}

These properties are transformed whenever they’re discovered, allowing the polyfill to play nicely with other CSS features like [`@supports`](https://developer.mozilla.org/docs/Web/CSS/@supports). This functionality is the basis of the best practices for using the polyfill, as covered below.

{% Compare 'worse', 'before' %}
```css
@supports (container-type: inline-size) {
  /* ... */
}
```
{% endCompare %}

{% Compare 'better', 'after' %}
```css
@supports (--cq-XYZ-container-type: inline-size) {
  /* ... */
}
```
{% endCompare %}

By default, CSS Custom Properties are inherited, meaning for example that any child of `.card` will take on the value of `--cq-XYZ-container-name` and `--cq-XYZ-container-type`. That’s definitely not how the native properties behave. To solve this, the polyfill will insert the following rule before any user styles, ensuring that every element receives the initial values, unless intentionally overridden by another rule.

```css
* {
  --cq-XYZ-container-name: none;
  --cq-XYZ-container-type: normal;
}
```

## Best practices

While it’s expected that most visitors will be running browsers with built-in container query support sooner rather than later, it’s still important to give your remaining visitors a good experience.

During the initial load, there is a lot that needs to happen before the polyfill can layout the page:

* The polyfill needs to be loaded and initialized.
* Stylesheets need to be parsed and transpiled. Since there aren’t any APIs to access the raw source of an external stylesheet, it may need to be asynchronously re-fetched, though ideally just from the browser cache.

If these concerns aren’t carefully addressed by the polyfill, it could potentially regress your [Core Web Vitals](https://web.dev/vitals/).

To make it easier for you to give your visitors a pleasant experience, the polyfill was designed to prioritize [First Input Delay (FID)](https://web.dev/fid/) and [Cumulative Layout Shift (CLS)](https://web.dev/cls/), potentially at the expense of [Largest Contentful Paint (LCP)](https://web.dev/lcp/). Concretely, _the polyfill makes no guarantee that your container queries will be evaluated before the first paint_. This means that for the best user experience, you **must** ensure that any content whose size or position would be affected by using container queries are hidden until after the polyfill has loaded and transpiled your CSS. One way to accomplish this is by using an `@supports` rule:

```css
@supports not (container-type: inline-size) {
  #content {
    visibility: hidden;
  }
}
```

It’s recommended that you combine this with a pure CSS loading animation, absolutely positioned over your (hidden) content, to tell the visitor that something is happening. You can find a full demo of this approach [here](https://codesandbox.io/s/smoosh-glitter-m2ub4w?file=/index.html).

This approach is recommended for a number of reasons:

* A pure CSS loader minimizes the overhead for users with newer browsers, while providing lightweight feedback to those on older browsers and slower networks.
* By combining absolute positioning of the loader with `visibility: hidden`, you avoid layout shift.
* After the polyfill loads, this `@supports` condition will stop passing, and your content will be revealed.
* On browsers with built-in support for container queries, the condition will never pass, and so the page will be displayed on the first-paint as expected.

## Conclusion

If you're interested in using container queries on older browsers, give the [polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) a try. Don't hesitate to [file an issue](https://github.com/GoogleChromeLabs/container-query-polyfill/issues/new) if you run into any problems.

We can't wait to see and experience the amazing things you will build with it.


## Acknowledgements

Hero image by [Dan Cristian Pădureț](https://unsplash.com/@dancristianpaduret) on [Unsplash](https://unsplash.com/photos/XC7lc8biINg).
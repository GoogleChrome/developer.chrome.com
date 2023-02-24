---
layout: 'layouts/blog-post.njk'
title: More control over :nth-child() selections with the of S syntax
authors:
  - bramus
subhead: >
  Pre-filter a set of child elements before applying An+B logic on it.
description: >
  Pre-filter a set of child elements before applying An+B logic on it.
date: 2023-02-09
hero: image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/d3BZ8gLh8WkVPRfJf6mz.jpg
alt: "Rows of green chairs in the Munich Olympic Stadium."
tags:
  - css
  - chrome-111
---

## The `:nth-child()` and `:nth-last-child()` pseudo-class selectors

With [the `:nth-child()` pseudo-class selector](https://web.dev/learn/css/pseudo-classes/#nth-child-and-nth-of-type) it is possible to select Elements in the DOM by their index. Using the [`An+B` microsyntax](https://www.w3.org/TR/css-syntax-3/#anb-microsyntax) you get fine control over which elements you want to select.

- `:nth-child(2)`: Select the 2nd child.
- `:nth-child(2n)`: Select all even children _(2nd, 4th, 6th, 8th, and so on)_.
- `:nth-child(2n+1)`: Select all odd children _(1st, 3rd, 5th, 7th, and so on)_.
- `:nth-child(5n+1)`: Select the 1st _(=(5×0)+1)_, 6th _(=(5×1)+1)_, 11th _(=(5×2)+1)_, … child.
- `:nth-child(5n+2)`: Select the 2nd _(=(5×0)+2)_, 7th _(=(5×1)+2)_, 12th _(=(5×2)+2)_, … child.

{% Aside %}
To interactively see how the `An+B` logic affects selections use [the `:nth-child` tester](https://css-tricks.com/examples/nth-child-tester/).
{% endAside %}

But, there’s more creative selections you can do, if you omit the `A` parameter. For example:

- `:nth-child(n+3)`: Select every child from the 3rd one up _(3rd, 4th, 5th, and so on)_.
- `:nth-child(-n+5)`: Select every child up to the 5th one _(1st, 2nd, 3rd, 4th, 5th)_.

Combine a few of these `:nth-child()` selections and you can select ranges of elements:

- `:nth-child(n+3):nth-child(-n+5)`: Select every child from the 3rd one up to the 5th one _(3rd, 4th, 5th)_.

Using `:nth-last-child()` you can do similar selections, but instead of starting to count from the start, you start counting from the end.

{% Aside %}
If you want to take it to the next level, you can use `:nth-child()` to [apply styles on a group of elements when they reach a certain size _(“Quantity Queries”)_](https://alistapart.com/article/quantity-queries-for-css/) or [style a parent element based on the number of children it has](https://www.bram.us/2022/11/17/style-a-parent-element-based-on-its-number-of-children-using-css-has/).
{% endAside %}

## Pre-filtering selections with the `of S` syntax

New in [CSS Selectors Level 4](https://www.w3.org/TR/selectors-4/) is the ability to optionally pass a selector list into `:nth-child()` and `:nth-last-child()`.

```css
:nth-child(An+B [of S]?)
:nth-last-child(An+B [of S]?)
```

When `of S` is specified, the `An+B` logic is only applied onto elements that match the given selector list `S`. This essentially means that you can prefilter children before `An+B` does its thing.

{% BrowserCompat 'css.selectors.nth-child.of_syntax' %}

## Examples

For example, `:nth-child(2 of .highlight)` selects the second matching element that has the `.highlight` class. Put differently: out of all children with the class `.highlight`, select the second one.

This in contrast to `.highlight:nth-child(2)` which selects the element that has the class `.highlight` **and** also is the second child.

In the demo below you can see this difference:

- The element that matches `:nth-child(2 of .highlight)` has a pink outline.
- The element that matches `.highlight:nth-child(2)` has a green outline.

{% Codepen {
  user: 'web-dot-dev',
  id: 'oNMRaQq',
  height: 960,
  theme: 'dark',
  tab: 'result'
} %}

Note that `S` is a selector list which means it accepts multiple selectors separated by a comma. For example, `:nth-child(4 of .highlight, .sale)` selects the fourth element that is either `.highlight` or `.sale` from a set of siblings.

In the demo below, the element that matches `:nth-child(4 of .highlight, .sale)` has an orange outline applied to it.

{% Codepen {
  user: 'web-dot-dev',
  id: 'BaPeqGe',
  height: 960,
  theme: 'dark',
  tab: 'result'
} %}

## Zebra-striping, revisited

A classic example where `:nth-child()` is used, is when creating a zebra-striped table. It’s a visual technique in which each table row alternates colors. Normally, this would be approached as follows:

```css
tr:nth-child(even) {
  background-color: lightgrey;
}
```

While this works fine for static tables, it becomes problematic when you start to dynamically filter the table contents. When, for example, row two gets hidden, you’d end up with rows one and three visible, each with the same background color.

{% Codepen {
  user: 'web-dot-dev',
  id: 'WNKBaLN',
  height: 700,
  theme: 'dark',
  tab: 'result'
} %}

To fix this, we can leverage `:nth-child(An+B [of S]?)` by excluding the hidden rows from the `An+B` logic:

```css
tr:nth-child(even of :not([hidden])) {
  background-color: lightgrey;
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'KKBLGbd',
  height: 700,
  theme: 'dark',
  tab: 'result'
} %}

Pretty sweet, right?

Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/photos/JaNYtET65Es)

---
layout: 'layouts/blog-post.njk'
title: Limit the reach of your selectors with the CSS `@scope` at-rule
authors:
  - bramus
subhead: >
  Learn how to use `@scope` to select elements only within a limited subtree of your DOM.
description: >
  Learn how to use `@scope` to select elements only within a limited subtree of your DOM.
date: 2023-10-04
hero: image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/DP7MSi8WT7a2syzdBfiK.jpg
alt: "A street sign to indicate the road is narrowing."
tags:
  - css
  - chrome-118
---

## The delicate art of writing CSS selectors

When writing selectors you may find yourself torn between two worlds. On the one hand you want to be pretty specific about which elements you select. On the other hand, you want your selectors to remain easy to override and not be tightly coupled to the DOM structure.

For example, when you want to select “the hero image in the content area of the card component”–which is a rather specific element selection–you most likely don’t want to write a selector like `.card > .content > img.hero`.

- This selector has a pretty high [specificity](https://web.dev/learn/css/specificity/) of `(0,3,1)` which makes it hard to override as your code grows.
- By relying on the direct child combinator it is tightly coupled to the DOM structure. Should the markup ever change, you need to change your CSS as well.

But, you also don’t want to write just `img` as the selector for that element, as that would select all image elements across your page.

Finding the right balance in this is often quite the challenge. Over the years, some developers have come up with solutions and workarounds to help you out in situations like these. For example:

- Methodologies such as BEM dictate that you give that element a class of `card__img card__img--hero` to keep the specificity low while allowing you to be specific in what you select.
- JavaScript-based solutions such as [Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html) or [Styled Components](https://styled-components.com/) rewrite all your selectors by adding randomly generated strings–such as `sc-596d7e0e-4`–to your selectors to prevent them from targeting elements at the other side of your page.
- Some libraries even abolish selectors altogether and require you to put the styling triggers directly in the markup itself.

But what if you didn’t need any of those? What if CSS gave you a way to be both pretty specific about which elements you select, without requiring you to write selectors of high specificity or ones that are tightly coupled to your DOM? Well, that’s where `@scope` comes into play, offering you a way to select elements only within a subtree of your DOM.

## Introducing @scope

With `@scope` you can limit the reach of your selectors. You do this by setting the _scoping root_ which determines the upper boundary of the subtree you want to target. With a scoping root set, the contained style rules –named _scoped style rules_– can only select from that limited subtree of the DOM.

For example, to target only the `<img>` elements in the `.card` component, you set `.card` as the scoping root of the `@scope` at-rule.

```css
@scope (.card) {
    img {
        border-color: green;
    }
}
```

The scoped style rule `img { … }` can effectively only select `<img>` elements that are [in scope](https://drafts.csswg.org/css-cascade-6/#in-scope) of the matched `.card` element.

{% Codepen {
  user: 'web-dot-dev',
  id: 'YzdOydZ',
  height: 1000,
  theme: 'dark',
  tab: 'result'
} %}

To prevent the `<img>` elements inside the card’s content area (`.card__content`) from being selected you could make the `img` selector more specific. Another way to do this is to use the fact that the `@scope` at-rule also accepts a _scoping limit_ which determines the lower boundary.

```css
@scope (.card) to (.content) {
    img {
        border-color: green;
    }
}
```

This scoped style rule only targets `<img>` elements that are placed between `.card` and `.content` elements in the ancestor tree. This type of scoping–with an upper and lower boundary–is often referred to as a _donut scope_

{% Codepen {
  user: 'web-dot-dev',
  id: 'wvREKRj',
  height: 1000,
  theme: 'dark',
  tab: 'result'
} %}

## The `:scope` selector

By default, all scoped style rules are relative to the scoping root. It is also possible to target the scoping root element itself. For this, use the `:scope` selector.

```css
@scope (.card) {
    :scope {
        /* Selects the matched .card itself */
    }
    img {
       /* Selects img elements that are a child of .card */
    }
}
```

Selectors inside scoped style rules implicitly get `:scope` prepended. If you want, you can be explicit about it, by prepending `:scope` yourself. Alternatively you can prepend the `&` selector, from [CSS Nesting](/articles/css-nesting/).

```css
@scope (.card) {
    img {
       /* Selects img elements that are a child of .card */
    }
    :scope img {
        /* Also selects img elements that are a child of .card */
    }
    & img {
        /* Also selects img elements that are a child of .card */
    }
}
```

A scoping limit can use the `:scope` pseudo-class to require a specific relationship to the scoping root:

```css
/* .content is only a limit when it is a direct child of the :scope */
@scope (.media-object) to (:scope > .content) { ... }
```

A scoping limit can also reference elements outside their scoping root by using `:scope`. For example:

```css
/* .content is only a limit when the :scope is inside .sidebar */
@scope (.media-object) to (.sidebar :scope .content) { ... }
```

Note that the scoped style rules themselves can not escape the subtree. Selections like `:scope + p` are invalid because that tries to select elements that are not in scope.

## `@scope` and specificity

The selectors that you use in the prelude for `@scope` do not affect the specificity of the contained selectors. In the example below, the specificity of the `img` selector still is `(0,0,1)`.

```css
@scope (#sidebar) {
    img { /* Specificity = (0,0,1) */
        …
    }
}
```

The specificity of `:scope` is that of a regular pseudo-class, namely `(0,1,0)`.

```css
@scope (#sidebar) {
    :scope img { /* Specificity = (0,1,0) + (0,0,1) = (0,1,1) */
        …
    }
}
```

In the following example, internally, the `&` gets rewritten to the selector that is used for the scoping root, wrapped inside an `:is()` selector. In the end, the browser will use `:is(#sidebar, .card) img` as the selector to do the matching. This process is known as _[desugaring](https://en.wikipedia.org/wiki/Syntactic_sugar)_.

```css
@scope (#sidebar, .card) {
    & img { /* desugars to `:is(#sidebar, .card) img` */
        …
    }
}
```

Because `&` gets desugared using `:is()`, the specificity of `&` is calculated following [the `:is()` specificity rules](https://brm.us/css-is#specificity): the specificity of `&` is that of its most specific argument.

Applied to this example, the specificity of `:is(#sidebar, .card)` is that of its most specific argument, namely `#sidebar`, and therefore becomes `(1,0,0)`. Combine that with the specificity of `img`–which is `(0,0,1)`–and you end up with `(1,0,1)` as the specificity for the entire complex selector.

```css
@scope (#sidebar, .card) {
    & img { /* Specificity = (1,0,0) + (0,0,1) = (1,0,1) */
        …
    }
}
```

## The difference between `:scope` and `&` inside `@scope`

Besides differences in how specificity gets calculated, another difference between `:scope` and `&` is that `:scope` represents the matched scoping root, whereas `&` represents the selector used to match the scoping root.

Because of this, it is possible to use `&` multiple times. This is in contrast to `:scope` which you can use only once, as you can’t match a scoping root inside a scoping root.

```css
@scope (.card) {
  & & { /* Selects a `.card` in the matched root .card */
  }
  :root :root { /* ❌ Does not work */
    …
  }
}
```

## Prelude-less scope

When writing inline styles with the `<style>` element, you can scope the style rules to the `<style>` element’s enclosing parent element by not specifying any scoping root. You do this by omitting the `@scope`’s prelude.

```html
<div class="card">
  <div class="card__header">
    <style>
      @scope {
        img {
          border-color: green;
        }
      }
    </style>
    <h1>Card Title</h1>
    <img src="…" height="32" class="hero">
  </div>
  <div class="card__content">
    <p><img src="…" height="32"></p>
  </div>
</div>
```

In the example above, the scoped rules only target elements inside the `div` with the class name `card__header`, because that `div` is the `<style>` element’s parent element.

{% Codepen {
  user: 'web-dot-dev',
  id: 'JjwaYwG',
  height: 1000,
  theme: 'dark',
  tab: 'result'
} %}

## @scope in the cascade

Inside of the [CSS Cascade](https://web.dev/learn/css/the-cascade/), `@scope` also adds a new criterion: _scoping proximity_. The step comes after specificity but before order of appearance.

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/SqOlwVfRjOpeRzzbz9L7.svg", alt="Visualization of the CSS Cascade.", width="1920", height="1080" %}

As [per specification](https://drafts.csswg.org/css-cascade-6/#cascade-proximity):

> When comparing declarations that appear in style rules with different scoping roots, then the declaration with the fewest generational or sibling-element hops between the scoping root and the scoped style rule subject wins.

This new step comes in handy when nesting several variations of a component. Take this example, that doesn’t use `@scope` just yet:

```html
<style>
    .light { background: #ccc; }
    .dark  { background: #333; }
    .light a { color: black; }
    .dark a { color: white; }
</style>
<div class="light">
    <p><a href="#">What color am I?</a></p>
    <div class="dark">
        <p><a href="#">What about me?</a></p>
        <div class="light">
            <p><a href="#">Am I the same as the first?</a></p>
        </div>
    </div>
</div>
```

When viewing that little bit of markup, the third link will be `white` instead of `black`, even though it’s a child of a `div` with the class `.light` applied to it. This is due to  the order of appearance criterion which the cascade uses here to determine the winner. It sees that `.dark a` was declared last, so it’ll win from the `.light a` rule

{% Codepen {
  user: 'web-dot-dev',
  id: 'eYbLpQw',
  height: 1000,
  theme: 'dark',
  tab: 'result'
} %}

With the scoping proximity criterion this is now solved:

```css
@scope (.light) {
    :scope { background: #ccc; }
    a { color: black;}
}

@scope (.dark) {
    :scope { background: #333; }
    a { color: white; }
}
```

Because both scoped `a` selectors have the same specificity, the scoping proximity criterion kicks into action. It weighs both selectors by proximity to their scoping root. For that third `a` element, it is only one hop to the `.light` scoping root but two to the `.dark` one. Therefore, the `a` selector in `.light` will win.

{% Codepen {
  user: 'web-dot-dev',
  id: 'MWZqazx',
  height: 1000,
  theme: 'dark',
  tab: 'result'
} %}

## Closing note: Selector isolation, not style isolation

One important note to make is that `@scope` limits the reach of the selectors, it does not offer style isolation. Properties that inherit down to children will still inherit, beyond the lower bound of the `@scope`. One such property is the `color` one. When declaring that one inside of a donut scope, the `color` will still inherit down to children inside the hole of the donut.

```css
@scope (.card) to (.card__content) {
  :scope {
    color: hotpink;
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'BavOoGY',
  height: 1000,
  theme: 'dark',
  tab: 'result'
} %}

In the example above, the `.card__content` element and its children have a `hotpink` color because they inherit the value from `.card`.

_(Cover photo by [rustam burkhanov](https://unsplash.com/@rstm) [on Unsplash](https://unsplash.com/photos/a-street-sign-that-is-hanging-from-a-tree-RMpDxhmzHpE))_

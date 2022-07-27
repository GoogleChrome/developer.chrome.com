---
layout: layouts/blog-post.njk
title: Help pick a syntax for CSS nesting
description: >
  Two competing syntaxes need your help in determining which should be championed through to a specification candidate.
subhead: >
  Two competing syntaxes need your help in determining which should be championed through to a specification candidate.
date: 2022-07-26
authors:
  - argyle
  - miriamsuzanne
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/ZrMGmOcY6AH5J2tAblyO.jpg
alt: >
  A bird nest with a couple of blue eggs inside, surrounded by lush greenery.
---

CSS nesting is a convenience syntax addition that allows CSS to be added inside
of a ruleset. If you've used
[SCSS](https://sass-lang.com/guide#:~:text=throughout%20the%C2%A0site.-,Nesting,-When%20writing%20HTML),
[Less](https://lesscss.org/features/#features-overview-feature-nested-rules) or
[Stylus](https://stylus-lang.com/docs/selectors.html#partial-reference), then
you've most certainly seen a few flavors of this:

```scss
.nesting {
  color: hotpink;

  > .is {
    color: rebeccapurple;

    > .awesome {
      color: deeppink;
    }
  }
}
```

Which after being compiled to regular CSS by the preprocessor, turns into
regular CSS like this:

```css
.nesting {
  color: hotpink;
}

.nesting > .is {
  color: rebeccapurple;
}

.nesting > .is > .awesome {
  color: deeppink;
}
```

An official CSS version of this syntax is being strongly considered and we have
a split in preference that we'd like to employ the help of the community to
break the tie. The rest of this post will be introducing the syntax options so
you can feel informed to take a survey at the end.

{% Details %}
{% DetailsSummary %}
Why can't the exact nesting example shown above be the syntax for CSS nesting?
{% endDetailsSummary %}

There are a few reasons the most popular nesting syntax can't be used as is:

1. <b>Ambiguous parsing</b>
<br>
Some nested selectors can [look exactly like properties and
preprocessors](https://www.w3.org/TR/css-nesting-1/#:~:text=Why%20can%E2%80%99t%20everything%20be%20directly%20nested%3F)
are able to resolve and manage them at build time. Browser engines won't have
the same affordances, selectors needs to never be loosely interpreted. <br>

1. <b>Preprocessor parsing conflicts</b>
<br>
The CSS way of nesting [shouldn't break
preprocessors](https://github.com/sass/sass/issues/3030) or existing developer
nesting workflows. This would be disruptive and inconsiderate to those
ecosystems and communities.
<br>

1. <b>Waiting for [`:is()`](https://web.dev/css-is-and-where/)</b>
<br>
Basic nesting doesn't need `:is()` but more complex nesting does. See [Example
#3](#example-3-selector-lists-and-nesting) for a light introduction to selector
lists and nesting. Imagine that selector list was in the middle of a selector
instead of at the beginning, in those cases `:is()` is required in order to
group the selectors in the middle of another selector.
<br>

{% endDetails %}

## Overview of what we're comparing

We want to get CSS nesting right, and in that spirit we're including the
community. The following sections will help describe the three possible versions
we're evaluating. We'll then go over some examples of usage for comparison, and
at the end there will be a light survey asking you which you preferred overall.

### Option 1: @nest

This is the current specified syntax in [CSS Nesting
1](https://www.w3.org/TR/css-nesting-1/). It offers a convenient way to nest
appending styles by starting new nested selectors with `&`. It also offers
`@nest` as a way to place the `&` context anywhere inside a new selector, like
when you're not just appending subjects. It's flexible and minimal but at the
expense of needing to remember `@nest` or `&` depending on your use case.

### Option 2: @nest restricted

This is a stricter alternative, in an attempt to reduce the expense mentioned of
remembering two nesting methods. This restricted syntax only allows nesting to
occur following `@nest`, so there's no append only convenience pattern. Removing
ambiguity of choice, creating one easy to remember way to nest, but sacrifices
terseness in favor of convention.

{% Aside %} It's worth noting that the less restricted `@nest` syntax (Option 1)
could use a linter to enforce a usage rule across a team, in case they together
decided they didn't like the ambiguity or terseness. Changing the spec may be an
extreme measure. {% endAside %}

### Option 3: Brackets

In order to avoid the double-syntax or extra clutter involved with the `@nest`
proposals, [Miriam Suzanne](https://www.miriamsuzanne.com/) and [Elika
Etemad](https://twitter.com/fantasai) proposed an [alternative
syntax](https://github.com/w3c/csswg-drafts/issues/4748#issuecomment-924118287)
that instead relies on additional curly-brackets. This provides syntax clarity,
with only two extra characters, and no new at-rules. It also allows nested rules
to be grouped by the type of nesting required, as a way of simplifying
multiple similarly nested selectors.

<style>
h3 + pre.language-css {
  margin-block-start: calc(var(--flow-space) / 4);
}
</style>

## Example 1 - Direct nesting

### @nest

```css
.foo {
  color: #111;

  & .bar {
    color: #eee;
  }
}
```

### @nest always

```css
.foo {
  color: #111;

  @nest & .bar {
    color: #eee;
  }
}
```

### brackets

```css
.foo {
  color: #111;

  {
    & .bar {
      color: #eee;
    }
  }
}
```

### Equivalent CSS

```css
.foo {
  color: #111;
}

.foo .bar {
  color: #eee;
}
```

## Example 2 - Compound nesting

### @nest

```css
.foo {
  color: blue;

  &.bar {
    color: red;
  }
}
```

### @nest always

```css
.foo {
  color: blue;

  @nest &.bar {
    color: red;
  }
}
```

### brackets

```css
.foo {
  color: blue;

  {
    &.bar {
      color: red;
    }
  }
}
```

### Equivalent CSS

```css
.foo {
  color: blue;
}

.foo.bar {
  color: red;
}
```

## Example 3 - Selector lists and nesting

### @nest

```css
.foo, .bar {
  color: blue;

  & + .baz,
  &.qux {
    color: red;
  }
}
```

### @nest always

```css
.foo, .bar {
  color: blue;

  @nest & + .baz,
  &.qux {
    color: red;
  }
}
```

### brackets

```css
.foo, .bar {
  color: blue;

  {
    & + .baz,
    &.qux {
      color: red;
    }
  }
}
```

### Equivalent CSS

```css
.foo, .bar {
  color: blue;
}

:is(.foo, .bar) + .baz,
:is(.foo, .bar).qux {
  color: red;
}
```

## Example 4 - Multiple levels

### @nest

```css
figure {
  margin: 0;

  & > figcaption {
    background: lightgray;

    & > p {
      font-size: .9rem;
    }
  }
}
```

### @nest always

```css
figure {
  margin: 0;

  @nest & > figcaption {
    background: lightgray;

    @nest & > p {
      font-size: .9rem;
    }
  }
}
```

### brackets

{% raw %}
```css
figure {
  margin: 0;

  {
    & > figcaption {
      background: lightgray;

      {
        & > p {
          font-size: .9rem;
        }
      }
    }
  }
}
```
{% endraw %}

### Equivalent CSS

```css
figure {
  margin: 0;
}

figure > figcaption {
  background: hsl(0 0% 0% / 50%);
}

figure > figcaption > p {
  font-size: .9rem;
}
```

## Example 5 - Parent nesting or subject changing

### @nest

```css
.foo {
  color: red;

  @nest .parent & {
    color: blue;
  }
}
```

### @nest always

```css
.foo {
  color: red;

  @nest .parent & {
    color: blue;
  }
}
```

### brackets

```css
.foo {
  color: red;

  {
    .parent & {
      color: blue;
    }
  }
}
```

### Equivalent CSS

```css
.foo {
  color: red;
}

.parent .foo {
  color: blue;
}
```

## Example 6 - Mixing direct and parent nesting

### @nest

```css
.foo {
  color: blue;

  @nest .bar & {
    color: red;

    &.baz {
      color: green;
    }
  }
}
```

### @nest always

```css
.foo {
  color: blue;

  @nest .bar & {
    color: red;

    @nest &.baz {
      color: green;
    }
  }
}
```

### brackets

```css
.foo {
  color: blue;

  {
    .bar & {
      color: red;

      {
        &.baz {
          color: green;
        }
      }
    }
  }
}
```

### Equivalent CSS

```css
.foo {
  color: blue;
}

.bar .foo {
  color: red;
}

.bar .foo.baz {
  color: green;
}
```

## Example 7 - Media query nesting

### @nest

```css
.foo {
  display: grid;

  @media (width => 30em) {
    grid-auto-flow: column;
  }
}
```

#### or explicitly / extended

```css
.foo {
  display: grid;

  @media (width => 30em) {
    & {
      grid-auto-flow: column;
    }
  }
}
```

### @nest always (is always explicit)

```css
.foo {
  display: grid;

  @media (width => 30em) {
    @nest & {
      grid-auto-flow: column;
    }
  }
}
```

### brackets

```css
.foo {
  display: grid;

  @media (width => 30em) {
    grid-auto-flow: column;
  }
}
```

#### or explicitly / extended

```css
.foo {
  display: grid;

  @media (width => 30em) {
    & {
      grid-auto-flow: column;
    }
  }
}
```

### Equivalent CSS

```css
.foo {
  display: grid;
}

@media (width => 30em) {
  .foo {
    grid-auto-flow: column;
  }
}
```

{% Aside %} There's a convenience syntax called implicit nesting. The top/first
examples in each example show the implicit nesting feature, where the scope of
the style rules are applied to the implicit selector scope they are nested
within. Implicit nesting does need adjusting when more than one nested selector
needs to exist, at which point you'll need to refactor to the explicit nesting
style. {% endAside %}

## Example 8 - Nesting groups

### @nest

```css
fieldset {
  border-radius: 10px;

  &:focus-within {
    border-color: hotpink;
  }

  & > legend {
    font-size: .9em;
  }

  & > div {
    & + div {
      margin-block-start: 2ch;
    }

    & > label {
      line-height: 1.5;
    }
  }
}
```

### @nest always

```css
fieldset {
  border-radius: 10px;

  @nest &:focus-within {
    border-color: hotpink;
  }

  @nest & > legend {
    font-size: .9em;
  }

  @nest & > div {
    @nest & + div {
      margin-block-start: 2ch;
    }

    @nest & > label {
      line-height: 1.5;
    }
  }
}
```

### brackets

{% raw %}
```css
fieldset {
  border-radius: 10px;

  {
    &:focus-within {
      border-color: hotpink;
    }
  }

  > {
    legend {
      font-size: .9em;
    }

    div {{
      + div {
        margin-block-start: 2ch;
      }

      > label {
        line-height: 1.5;
      }
    }}
  }
}
```
{% endraw %}

### Equivalent CSS

```css
fieldset {
  border-radius: 10px;
}

fieldset:focus-within {
  border-color: hotpink;
}

fieldset > legend {
  font-size: .9em;
}

fieldset > div + div {
  margin-block-start: 2ch;
}

fieldset > div > label {
  line-height: 1.5;
}
```

## Example 9 - Complex nesting group "Kitchen Sink"

### @nest

```css
dialog {
  border: none;

  &::backdrop {
    backdrop-filter: blur(25px);
  }

  & > form {
    display: grid;

    & > :is(header, footer) {
      align-items: flex-start;
    }
  }

  @nest html:has(&[open]) {
    overflow: hidden;
  }
}
```

### @nest always

```css
dialog {
  border: none;

  @nest &::backdrop {
    backdrop-filter: blur(25px);
  }

  @nest & > form {
    display: grid;

    @nest & > :is(header, footer) {
      align-items: flex-start;
    }
  }

  @nest html:has(&[open]) {
    overflow: hidden;
  }
}
```

### brackets

{% raw %}
```css
dialog {
  border: none;

  {
    &::backdrop {
      backdrop-filter: blur(25px);
    }

    & > form {
      display: grid;

      {
        & > :is(header, footer) {
          align-items: flex-start;
        }
      }
    }
  }

  {
    html:has(&[open]) {
      overflow: hidden;
    }
  }
}
```
{% endraw %}

### Equivalent CSS

```css
dialog {
  border: none;
}

dialog::backdrop {
  backdrop-filter: blur(25px);
}

dialog > form {
  display: grid;
}

dialog > form > :is(header, footer) {
  align-items: flex-start;
}

html:has(dialog[open]) {
  overflow: hidden;
}
```

## Time to vote

Hopefully you feel that was a fair comparison and sample platter of the syntax
options we're evaluating. Please review them carefully and let us know which you
prefer below. We appreciate you helping us advance CSS nesting to a syntax we
all will come to know and love!

<a class="material-button button-filled color-bg bg-primary" href="https://goo.gle/nesting">Take the survey!</a>

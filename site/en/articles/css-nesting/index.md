---
layout: layouts/blog-post.njk
title: CSS Nesting
description: >
  One of our favorite CSS preprocessor features is now built into the language: nesting style rules.
subhead: >
  One of our favorite CSS preprocessor features is now built into the language: nesting style rules.
date: 2023-03-08
authors:
  - argyle
tags:
  - css
  - chrome-112
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/zyWAIWcvGAdAWDikew8n.jpg
alt: >
  Two colorful origami cranes.
---

Before nesting, every selector needed to be explicitly declared, separately from
one another. This leads to repetition, stylesheet bulk and a scattered authoring
experience.

{% Compare 'worse', 'Before' %}
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
{% endCompare %}

After [nesting](https://www.w3.org/TR/css-nesting-1/), selectors can be
continued and related style rules to it can be grouped within.

{% Compare 'better', 'After' %}
```css
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
{% endCompare %}

[Try this in browser](https://codepen.io/web-dot-dev/pen/RwYLRdr).

Nesting helps developers by reducing the need to repeat selectors while also
co-locating style rules for related elements. It can also help styles match the
HTML they target. If the `.nesting` component in the previous example was
removed from the project, you could delete the entire group instead of searching
files for related selector instances.

**Nesting can help with:**
- Organization
- Reducing file size
- Refactoring

<!-- {% BrowserCompat 'css.nesting' %} -->

Nesting is available from Chrome 112 and also available to [try in Safari Technical
Preview
162](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/).

## Getting started with CSS Nesting

Throughout the rest of this post,the following demo sandbox is used to help you
visualize the selections. In this default state, nothing is selected and
everything is visible. By selecting the various shapes and sizes, you can
practice the syntax and see it in action.

{% Img
  src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/6DqcGwdZPdhBp5f2UCRQ.png",
  alt="A colorful grid of small and large circles, triangles and squares.",
  width="800",
  height="357"
%}

Inside the sandbox are circles, triangles, and squares. Some are small, medium
or large. Others are blue, pink or purple. They're all inside the `.demo`
containing element. The following is a preview of the HTML elements you'll be
targeting.

```html
<div class="demo">
  <div class="sm triangle pink"></div>
  <div class="sm triangle blue"></div>
  <div class="square blue"></div>
  <div class="sm square pink"></div>
  <div class="sm square blue"></div>
  <div class="circle pink"></div>
  …
</div>
```

### Nesting examples

CSS nesting allows you to define styles for an element within the context of
another selector.

```css
.parent {
  color: blue;

  .child {
    color: red;
  }
}
```

In this example, the `.child` [class
selector](https://web.dev/learn/css/selectors/#class-selector) is nested within
the `.parent` class selector. This means that the nested `.child` selector will
only apply to elements that are children of elements with a `.parent` class.

This example could alternatively be written using the `&` symbol, to explicitly
signify where the parent class should be placed.

```css
.parent {
  color: blue;

  & .child {
    color: red;
  }
}
```

These two examples are functionally equivalent and the reason you have options
will become clearer as more advanced examples are explored in this article.

#### Selecting the circles

For this first example, the task is to add styles to fade and blur just the
circles inside the demo.

**Without nesting**, CSS today:

```css
.demo .circle {
  opacity: .25;
  filter: blur(25px);
}
```

**With nesting**, there are two valid ways:

```css
/* & is explicitly placed in front of .circle */
.demo {
  & .circle {
    opacity: .25;
    filter: blur(25px);
  }
}
```

or

```css
/* & + " " space is added for you */
.demo {
  .circle {
    opacity: .25;
    filter: blur(25px);
  }
}
```

**The result**, all the elements inside `.demo` with a `.circle` class are
blurred out and nearly invisible:

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/D2WlUbULj03OzAc7NlcP.png",
    alt="The colorful grid of shapes no longer has circles,
    they're very faint in the background.",
    width="800",
    height="419"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/xxaXOvo">
      Try a demo
    </a>
  </figcaption>
</figure>

#### Selecting any triangles and squares

This task requires selecting multiple nested elements, also called a [group
selector](https://web.dev/learn/css/selectors/#grouping-selectors).

**Without nesting**, CSS today, there are two ways:

```css
.demo .triangle,
.demo .square {
  opacity: .25;
  filter: blur(25px);
}
```

or, using [`:is()`](https://web.dev/learn/css/pseudo-classes/#is)

```css
/* grouped with :is() */
.demo :is(.triangle, .square) {
  opacity: .25;
  filter: blur(25px);
}
```

**With nesting**, here are two valid ways:

```css
.demo {
  & .triangle,
  & .square {
    opacity: .25;
    filter: blur(25px);
  }
}
```

or

```css
.demo {
  .triangle, .square {
    opacity: .25;
    filter: blur(25px);
  }
}
```

Both nesting options will use `:is()` under the hood as follows.

```css
.demo :is(.triangle, .square) {
  opacity: .25;
  filter: blur(25px);
}
```

**The result**, only `.circle` elements remain inside `.demo`:

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/rabeTed4fbzbykVurcNS.png",
    alt="The colorful grid of shapes is left with only circles,
    all other shapes are nearly invisible.",
    width="800",
    height="414"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/XWPejbG">
      Try a demo
    </a>
  </figcaption>
</figure>

#### Selecting large triangles and circles

This task requires a [compound
selector](https://web.dev/learn/css/selectors/#compound-selectors), where
elements must have both classes present in order to be selected.

**Without nesting**, CSS today:

```css
.demo .lg.triangle,
.demo .lg.square {
  opacity: .25;
  filter: blur(25px);
}
```

or

```css
.demo .lg:is(.triangle, .circle) {
  opacity: .25;
  filter: blur(25px);
}
```

**With nesting**, here are two valid ways:

```css
.demo {
  .lg.triangle,
  .lg.circle {
    opacity: .25;
    filter: blur(25px);
  }
}
```

or

```css
.demo {
  .lg {
    &.triangle,
    &.circle {
      opacity: .25;
      filter: blur(25px);
    }
  }
}
```

**The result**, all the large triangles and circles are hidden inside `.demo`:

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/F9TUzFkOcVUt5VeNXlPO.png",
    alt="The colorful grid only has small and medium shapes visible.",
    width="800",
    height="423"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/WNgZGrz">
      Try a demo
    </a>
  </figcaption>
</figure>

##### Pro tip with compound selectors and nesting

The `&` symbol is your friend here as it shows explicitly how to adjoin nested
selectors. Consider the following example:

```css
.demo {
  .lg {
    .triange,
    .circle {
      opacity: .25;
      filter: blur(25px);
    }
  }
}
```

While a valid way to nest, the results won't match the elements you may expect.
The reason is that without `&` to specify the desired outcome of `.lg.triangle,
.lg.circle` compounded together, the actual result would be `.lg .triangle, .lg
.circle`; [descendant
selectors](https://web.dev/learn/css/selectors/#descendant-combinator).

{% Aside 'key-term' %}
Nesting classes without `&` will always result in descendant selectors.
Use the `&` symbol to change that result.
{% endAside %}

#### Selecting all the shapes except the pink ones

This task requires a [negation functional pseudo
class](https://web.dev/learn/css/pseudo-classes/#not), where elements must not
have the specified selector.

**Without nesting**, CSS today:

```css
.demo :not(.pink) {
  opacity: .25;
  filter: blur(25px);
}
```

**With nesting**, here are two valid ways:

```css
.demo {
  :not(.pink) {
    opacity: .25;
    filter: blur(25px);
  }
}
```

or

```css
.demo {
  & :not(.pink) {
    opacity: .25;
    filter: blur(25px);
  }
}
```

**The result**, all the shapes that aren't pink are hidden inside `.demo`:

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/SbZjiSq0Y7AT9n9CPm9Y.png",
    alt="The colorful grid is now monochrome, only showing pink shapes.",
    width="800",
    height="431"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/VwGMKKj">
      Try a demo
    </a>
  </figcaption>
</figure>

##### Precision and flexibility with `&`

Say you wanted to target `.demo` with the `:not()` selector. `&` **is required** for
that:

```css
.demo {
  &:not() {
    ...
  }
}
```

This compounds `.demo` and `:not()` to `.demo:not()`, as opposed to the previous
example which needed `.demo :not()`. This reminder is made very important when
wanting to nest a `:hover` interaction.

```css
.demo {
  &:hover {
    /* .demo:hover */
  }

  :hover {
    /* .demo :hover */
  }
}
```

### More nesting examples

The [CSS specification for nesting](https://www.w3.org/TR/css-nesting-1/) is
packed with more examples. If you're looking to learn more about the syntax
through examples, it covers a wide range of valid and invalid examples.

The next few examples will briefly introduce a CSS nesting feature, to help you
understand the breadth of capabilities it introduces.

#### Nesting @media

It can be very distracting to move to a different area of the stylesheet to find
media query conditions that modify a selector and its styles. That distraction
is gone with the ability to nest the conditions right inside the context.

For syntax convenience, if the nested media query is only modifying the styles
for the current selector context, then a minimal syntax can be used.

```css
.card {
  font-size: 1rem;

  @media (width >= 1024px) {
    font-size: 1.25rem;
  }
}
```

Using `&` explicitly can also be used:

```css
.card {
  font-size: 1rem;

  @media (width >= 1024px) {
    &.large {
      font-size: 1.25rem;
    }
  }
}
```

This example shows the expanded syntax with `&`, while also targeting `.large`
cards to demonstrate additional nesting features continue working.

Learn more about [nesting
@rules](https://www.w3.org/TR/css-nesting-1/#conditionals).

#### Nesting anywhere

All examples up to this point have continued or appended to a previous context.
You can completely change or rearrange the context if needed.

```css
.card {
  .featured & {
    /* .featured .card */
  }
}
```

The `&` symbol represents a reference to a selector object (not a string) and
can be placed anywhere in a nested selector. It can even be placed multiple
times:

```css
.card {
  .featured & & & {
    /* .featured .card .card .card */
  }
}
```

While this example is a bit useless looking, there are certainly scenarios where
being able to repeat a selector context is handy.

### Invalid nesting examples

There are a few nesting syntax scenarios that are invalid and may surprise you
if you've been nesting in preprocessors. A cheat sheet for valid nesting syntax
can be found in the [understanding the nesting
parser](#understanding-the-nesting-parser) section of this article.

#### Nesting element tag names

HTML elements currently require the `&` symbol in front or being wrapped with
`:is()`.

```css
.card {
  h1 {
    /* 🛑 h1 does not start with a symbol */
  }
}
```

Fixed with syntax like this:

```css
.card {
  & h1 {
    /* ✅ now h1 starts with a symbol */
  }

  /* or */

  :is(h1) {
    /* ✅ now h1 starts with a symbol */
  }
}
```

#### Nesting and concatenation

Many CSS class naming conventions count on nesting being able to concatenate or
append selectors as if they were strings. This does not work in CSS nesting as
the selectors are not strings, they're object references.

```css
.card {
  &--header {
    /* is not equal to ".card--header" */
  }
}
```

A more in depth explanation can be found in [the
spec](https://www.w3.org/TR/css-nesting-1/#conditionals:~:text=Some%20CSS%2Dgenerating%20tools%20that%20preprocess%20nesting%20will%20concatenate%20selectors%20as%20strings%2C).

#### Mixing nesting and declarations

Consider the following nesting CSS block:

```css
.card {
  color: green;
  & { color: blue; }
  color: red;
}
```

The color of `.card` elements will be `blue`.

Any intermixed style declarations are hoisted to the top, as if they were
authored before any nesting occurred. More details can be found in [the
spec](https://www.w3.org/TR/css-nesting-1/#mixing).

## Understanding the nesting parser

To have the most success with CSS nesting, authors can study the examples from
the spec or they can learn how the CSS parser works with regards to nesting.
With this knowledge, authors can confidently nest styles without constantly
looking up rules.

The first and simplest way to think about the parser is to identify the symbols
that signal to the parser that it's consuming nesting styles.

```css
& @ : . > ~ + # [ *
```

Those symbols should look familiar. Some are combinators and some are for
selectors. So at its most simplest, if the parser finds your nested selectors
and it doesn't start with one of these symbols, it will fail and incorrectly
consume your styles.

{% Img
  src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/wgW0MQEoQDmjlZUj5fJ0.png",
  alt="& @ : . > ~ + # [ *. Nested selector starts with one of these symbols?
  If yes, it is valid. If not, it is invalid.",
  width="800",
  height="399"
%}

## Feature detection

There are two great ways to feature detect CSS nesting: use nesting or use
`@supports` to check for nesting selector parsing capability.

{% Img
  src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/dwuCNx6QUnJ5dRTGO4f5.png",
  alt="A screenshot of Bramus's Codepen demo, asking if your browser supports
  CSS nesting. Under that question is a green box, signaling support.",
  width="800",
  height="238"
%}

Using nesting:

```css
html {
  .has-nesting {
    display: block;
  }

  .no-nesting {
    display: none;
  }
}
```

Using `@supports`:

```css
@supports (selector(&)) {
  /* nesting parsing available */
}
```

My colleague [Bramus](https://www.bram.us/about/) has a [great
Codepen](https://codepen.io/bramus/pen/oNdrypM) showing this strategy.

## Debugging with Chrome DevTools

Current support in DevTools for nesting is minimal. Currently you will find
styles are represented in the Styles pane as expected, but tracing the nesting
and its full selector context is not yet supported. We have design and plans to
make this transparent and clear.

{% Img
  src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/hGrNc5Ng0falRK4nVGRU.png",
  alt="A screenshot of Chrome DevTools nesting syntax.",
  width="306",
  height="124"
%}

Chrome 113 plans to have additional support for CSS nesting. Stay tuned.

## The future

[CSS Nesting](https://www.w3.org/TR/css-nesting-1/) is only at version 1.
Version 2 will introduce more syntactic sugar and potentially fewer rules to
memorize. There's a lot of demand for the parsing of nesting to not be limited,
to not have a [list of symbols that trigger the
parser](#understanding-the-nesting-parser).

**Nesting is a big enhancement to the CSS language.** It has authoring implications
to almost every architectural aspect of CSS. This big impact needs to be deeply
explored and understood before version 2 can effectively be specified.

As a final thought, [here's a demo](https://codepen.io/argyleink/pen/GRBMXyR)
that uses `@scope`, nesting, and `@layer` all together. It's all very exciting!

{% Img
  src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/Jy2XDDOEaycNiSPS2Brg.png",
  alt="A light card on a gray background. The card has a title and text,
  a few action buttons, and a cyber punk style image.",
  width="800",
  height="460"
%}

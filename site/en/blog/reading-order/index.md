---
title: Solving the CSS layout and source order disconnect
description: > 
  Your feedback is wanted on a proposed solution for the problem of layout methods arranging items in an order that is disconnected from the source of the document.
subhead: >
  Your feedback is wanted on a proposed solution for the problem of layout methods arranging items in an order that is disconnected from the source of the document.
layout: 'layouts/blog-post.njk'
date: 2023-04-12
thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/ohpYeFraXHgCYHzmKKQ0.jpg'
alt: >
  Books, some displayed out of order and alignment.
authors:
  - rachelandrew
tags:
  - accessibility
  - css
---

The CSS Working Group is working on a solution to the situation where a layout method can arrange items in an order that is disconnected from the source, and therefore from the reading and focus order of the document. This article explains the problem and proposed solution, and we would love your feedback.

## The problem

The reading order of an HTML document follows the source order. This means that a screen reader will read the document as it is laid out in the source, and a person using the keyboard to tab around the document will also follow that source order. Usually this makes sense, and a sensible source order for the document is vital for reading mode presentations of content, screen readers, and any device with limited CSS. However, CSS, and flexbox and grid in particular, can create layouts where the layout defines a visual reading order that is different to the underlying source.

For example, using the `order` property on flex items changes the layout order but not the order in the source.

<figure>
{% Codepen {
  user: 'web-dot-dev',
  id: 'mdjjmvG',
  height: 300,
  theme: 'dark',
  tab: 'result'
} %}
  <figcaption>Click into the example and tab around to see how the tab order is disconnected from the layout order, using the `order` property.</figcaption>
</figure>

Using grid layout, it is possible for the chosen layout method to jumble up the tab order, for example when using `grid-auto-flow: dense`, which creates a randomized layout order of items.

<figure>
{% Codepen {
  user: 'web-dot-dev',
  id: 'RwBBgWq',
  height: 600,
  theme: 'dark',
  tab: 'result'
} %}

<figcaption>Click into the example and tab around to see how the tab order is disconnected from the layout order, this time by grid arranging the items out of order.</figcaption>
</figure>

A developer can also cause this disconnect by placing items on the grid in a different order to that dictated in the source.

<figure>
{% Codepen {
  user: 'web-dot-dev',
  id: 'eYjjROB',
  height: 600,
  theme: 'dark',
  tab: 'result'
} %}
<figcaption>Click into the example and tab around to see how the tab order is disconnected from the layout order by use of grid placement properties.</figcaption>
</figure>

{% Aside %}
Learn more about the problem:

- [Flexbox and the keyboard navigation disconnect](https://tink.uk/flexbox-the-keyboard-navigation-disconnect/)
- [HTML Source Order versus CSS Display Order](https://adrianroselli.com/2015/10/html-source-order-vs-css-display-order.html)
- [Video: Grid, Content Re-Ordering and Accessibility](https://www.youtube.com/watch?v=YXXvP3jtcCo)

{% endAside %}

## Proposed solution

The CSS Working Group is proposing a solution for this problem, and would love feedback from developers and the accessibility community about this approach. 

{% Aside %}
Note that property and value names used in this post are likely to change. This post uses naming conventions that hopefully make things clear for the purpose of getting feedback.
{% endAside %}

### Following randomized layouts with `reading-order: auto`

In situations that create a randomized layout order, such as when using dense packing in grid layout, you probably want the browser to follow the layout, rather than the source order. To cause this to happen, the flex or grid items need to have a `reading-order` property, with a value of `auto`.

 The following CSS would cause the reading order to follow the placement of items that have been densely packed due to `grid-auto-flow: dense`.

```css
.cards {
  display: grid;
  grid-auto-flow: dense;
}

.cards li {
  grid-column: auto / span 2;
  reading-order: auto;
}
```

### Following non-randomized layouts with `reading-order-items`

In some grid and flex layouts, the layout order is straightforward to understand. For example, in a flex layout that uses the `order` property to re-order items there is an obvious layout order dictated by the `order` property. In other layouts it is less clear what the ideal layout order is, there may be more than one possible choice. Therefore, when following non-randomized layouts, you will need to add the `grid-order-items` property to the container, with keyword values explaining your intention for the layout order.

The following example shows a flex layout using `row-reverse`. The flex items have `reading-order: auto`, and the flex container `reading-order-items: flex flow` to indicate that we also want the reading order to follow the `flex-flow` direction too, rather than following a visual order (which we could indicate with `flex visual`).

```css
.cards {
  display: flex;
  flex-flow: row-reverse;
  reading-order-items: flex flow;
}

.cards li {
  reading-order: auto;
}
```

In this next example, a grid layout is created using `grid-template-areas` and the items are placed in a different layout order to the source order. The `reading-order-items` property is used to indicate we should follow the layout order, traversing each row before advancing to the next. (`grid column` would indicate the opposite direction).

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-areas:
    "a a b b b b"
    "c c d d e e"
    "f f g g h h";
  reading-order-items: grid rows;
}

.a {
  grid-area: a;
  reading-order: auto;
}
```

## Does this mean that source order doesn't matter?

No, source order still matters. This functionality should only be used in specific situations where the reading order might vary from the source. For example, when using layout methods that can cause this disconnect such as dense grid packing, or when a different layout order makes sense at a certain breakpoint.

When using these properties, create a source document using an order that would make sense if the page was rendered with no CSS. Add these properties only in the places, and at the breakpoints, that require them. 

{% Aside %}
Reordering using CSS is compelling in cases such as the one described in [this tweet](https://twitter.com/jlengstorf/status/1531411993051090945), because it is easier and faster than manipulating the DOM. There is a companion issue [and proposal](https://github.com/whatwg/dom/issues/586#issuecomment-1414457981) raised against the DOM Standard to make this type of reordering more straightforward too.
{% endAside %}

## Should authoring tools apply these properties?

Authoring tools that allow people to create a grid layout by dragging and dropping elements, should still encourage people to create a sensible source document. Therefore in most cases it would be more appropriate to reorder the source based on the layout order, rather than use these properties as a lazy way of dealing with the disconnect.

## Please share your feedback on this proposal

We are very keen to gather feedback on this. In particular, if you have a use case that you feel this won't solve, or have an accessibility concern with the approach, please let the CSS Working Group know.

[There is an ongoing thread](https://github.com/w3c/csswg-drafts/issues/7387), which contains many use cases and thoughts on the approach. That thread is a great place to add any comments, and highlight potential issues with this proposal. Note that the current proposal is very different from my initial one that started the thread. Interested people might enjoy all the conversation that led to where we are today, as it's a good example of how proposals are worked though in the CSS Working Group to become something that can be implemented in browsers.

_Thumbnail image by [Patrick Tomasso](https://unsplash.com/@impatrickt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText). Thanks to Chris Harrelson, Tab Atkins, and Ian Kilpatrick for feedback and review._
  
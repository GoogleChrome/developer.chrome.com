---
layout: 'layouts/blog-post.njk'
title: Specify how multiple animation effects should composite with `animation-composition`
authors:
  - bramus
subhead: >
  Replace, add, or accumulate? That’s the question.
description: >
  When multiple animations affect the same property simultaneously, should they replace each other, add, or accumulate?
date: 2023-03-29
hero: 'image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/YBkrNxjn85x5n5HLFEXj.jpg'
alt: "Milk pouring over tea."
tags:
  - css
  - chrome-112
---

## Combining multiple animation effects

The `animation-composition` property allows control of what should happen when multiple animations affect the same property simultaneously.

{% BrowserCompat 'css.properties.animation-composition' %}

Say you have this base transform applied to an element:

```css
transform-origin: 50% 50%;
transform: translateX(50px) rotate(45deg);
```

And that you also have this set of keyframes:

```css
@keyframes adjust {
  to {
    transform: translateX(100px);
  }
}
```

When applying these keyframes to an element, the `transform` in the `to` keyframe replaces the existing `transform`. This is the default behavior.

With `animation-composition`, you now have control over what should happen instead of the default `replace`. Accepted values are:

- `replace`: The effect value replaces the underlying value. _(default)_
- `add`: The effect value is added to the underlying value.
- `accumulate`: The effect value is combined with the underlying value.

The difference between addition and accumulation is subtle. For example, take the two values `blur(2)` and `blur(3)`. When added together would this produce `blur(2) blur(3)`, but when accumulated this would produce `blur(5)`.

You could compare this with a cup that is filled with tea. When pouring milk in it this would happen:

- `replace`: The tea gets removed, and is replaced by the milk.
- `add`: The milk gets added to the cup, but it remains layered on top of the tea.
- `accumulate`: The milk is added to the tea and, because they are both fluids, they mix nicely.

## Demo

In the demo below there are three gray boxes that have that base `transform` and `animation` applied to them.

Even though these boxes have the same animation they yield a different result because they have a different `animation-composition` set:

{% Codepen {
  user: 'web-dot-dev',
  id: 'VwGRBVX',
  height: 980,
  theme: 'dark',
  tab: 'result'
} %}

The first box is set to `animation-composition: replace`. This is the default behavior. In its end position, the original `translateX(50px) rotate(45deg)` value for `transform` is simply replaced by `translateX(100px)`.

The second box is set to `animation-composition: add`. In its end position, the `translateX(100px)` is added to the original `translateX(50px) rotate(45deg)`, resulting in `translateX(50px) rotate(45deg) translateX(100px)`. This moves the box by 50px, then turns it 45deg, and then moves it 100px.

The third box is set to `animation-composition: accumulate`. In its end position, the `translateX(100px)` will be mathematically added to the `translateX(50px)` from the original transform, resulting in a transformation of `translateX(150px) rotate(45deg)`.

_Photo by [Alex Boyd](https://unsplash.com/@alex_boyd) on [Unsplash](https://unsplash.com/photos/OLO8QPj1fJA)_

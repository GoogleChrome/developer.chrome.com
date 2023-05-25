---
layout: 'layouts/blog-post.njk'
title: Create complex animation curves in CSS with the `linear()` easing function
authors:
  - bramus
subhead: >
  Introducing `linear()`, an easing function in CSS that interpolates linearly between its points, allowing you to recreate bounce and spring effects.
description: >
  Introducing linear(), an easing function in CSS that interpolates linearly between its points, allowing you to recreate bounce and spring effects.
date: 2023-05-25
hero: "image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/tlphA8yFApB07mM9Oxe2.jpg"
alt: "Birds in the sky, forming a line as they fly."
tags:
  - css
  - chrome-113
---

{% YouTube id="oDcb3fvtETs", startTime="704" %}

## Easings in CSS

When animating or transitioning elements in CSS, you control the rate at which a value changes with an easing function using the `animation-timing-function` and `transition-timing-function` properties.

There are several keywords available as presets in CSS, namely `linear`, `ease`, `ease-in`, `ease-out`, and `ease-in-out`. To create your own easing curves use the `cubic-bezier()` function, or  take a steps based approach using the `steps()` easing function.

{% Codepen {
  user: 'web-dot-dev',
  id: 'YzNeJbL',
  height: 480,
  theme: 'dark',
  tab: 'result'
} %}

{%Aside%}Learn more about these easing keywords and functions in [Learn CSS: Animations](https://web.dev/learn/css/animations/#animation-timing-function).{%endAside%}

When used appropriately, easings give an animated element a sense of weight as it appears to gather momentum.

Creating complex curves such as bounce or spring effects is not possible in CSS, but thanks to `linear()` you can now approximate them astonishingly well.

## An intro to `linear()`

{% BrowserCompat 'css.types.easing-function.linear-function' %}

A new way to define an easing in CSS is with `linear()`. This function accepts a number of stops, separated by commas. Each stop is a single number that ranges from 0 to 1. In between each stop the interpolation is done in a linear way, explaining the name of the function.

```css
animation-timing-function: linear(0, 0.25, 1);
```

These stops are by default spread equidistantly. In the preceding snippet, that means the output value of `0.25` will be used at the 50% mark.

Visualized, the graph for `linear(0, 0.25, 1)` looks like this:

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/gNgoODC3lkqdYcJd0cgV.svg", alt="Chart visualization of linear(0, 0.25, 1).", width="652", height="600" %}

If you don’t want the stops to be spread equidistantly, you can optionally pass in a _stop length_. When passing in one value as a stop length, you define its starting point:

```css
animation-timing-function: linear(0, 0.25 75%, 1);
```

Here, an output value of `0.25` will not be used at the `50%` mark but at `75%`.

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/eQBNWbcAaXieBbc8y0d6.svg", alt="Chart visualization of linear(0, 0.25 75%, 1).", width="652", height="600" %}

When specifying two values as a stop length, you define both its starting and ending point:

```css
animation-timing-function: linear(0, 0.25 25% 75%, 1);
```

An output value of 0.25 will be used from 25% to 75% in time.

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/NbWKeK1tt6GiKorRSVsk.svg", alt="Chart visualization of linear(0, 0.25 25% 75%, 1).", width="652", height="600" %}

## Creating complex curves with linear()

While the examples above are very simple easings, you can use `linear()` to recreate complex easing functions in a very simple manner, with the compromise of losing some precision.

Take this bounce easing curve, a type of easing that cannot be expressed directly in CSS, defined using JavaScript:

```js
function easing(pos) {
  const t = 7.5625;
  const e = 2.75;
  return pos < 1 / e
    ? t * pos * pos
    : pos < 2 / e
    ? t * (pos -= 1.5 / e) * pos + 0.75
    : pos < 2.5 / e
    ? t * (pos -= 2.25 / e) * pos + 0.9375
    : t * (pos -= 2.625 / e) * pos + 0.984375;
}
```

While the code might not tell you much, a visualization might. Here’s the output, visualized as a blue curve:

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/WmozaWB6Zur6JvC62r2C.svg", alt="A smooth bounce curve drawn in blue.", width="600", height="600" %}

The curve can be simplified by adding a number of stops onto it. Here, each green dot indicates a stop:

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/NDJw6qW68We1xw7Q2E5c.svg", alt="A smooth bounce curve in blue, with green dots laid on top.", width="600", height="600" %}

When passed into `linear()`, the result is a curve that kinda looks like the original one, but is a bit rougher on the edges.

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/5fjFE8QHzN5Y1PooPik4.svg", alt="A simplified curve in green laid on top of the original smooth curve in blue.", width="600", height="600" %}

Compare the green animated box to the blue one, you can tell it’s not as smooth.

{% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/Y1WIp2Ak8P8yeuAwLC6J.mp4", width="466", height="830", controls="true", playsinline="true" %}

But, if you add enough stops you can approximate the original curve quite well. Here’s an updated version:

{% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/sBN3YAierNGLjjOs5cHE.svg", alt="An updated curve, with twice the number of stops.", width="600", height="600" %}

By merely doubling the number of stops, you already get a smooth result.

{% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/pmuAlSgFGkFHRho1MZ9j.mp4", width="466", height="830", controls="true", playsinline="true" %}

The code used to animate looks like this:

```css
animation-timing-function: linear(
  /* Start to 1st bounce */
  0, 0.004, 0.016, 0.035, 0.063 9.1%, 0.141, 0.25, 0.391, 0.563, 0.765, 1,
  /* 1st to 2nd bounce */
  0.891, 0.813 45.5%, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813 63.6%, 0.891, 1 72.7%,
  /* 2nd to 3rd bounce */
  0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1,
  /* 3rd bounce to end */
  0.988, 0.984, 0.988, 1
);
```

## A tool to help

Manually creating this list of stops would be very cumbersome. Thankfully, [Jake](/authors/jakearchibald/) and [Adam](/authors/argyle/) have created [a tool to help you convert an easing curve to its `linear()` counterpart](https://linear-easing-generator.netlify.app/).

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/7sLDqz722Xgd8Irigwl7.png", alt="Screenshot of the linear easing generator tool.", width="800", height="448" %}
  <figcaption>Screenshot of <a href="https://linear-easing-generator.netlify.app/">https://linear-easing-generator.netlify.app/</a> in action.</figcaption>
</figure>

The tool takes a JavaScript easing function or SVG curve as its input, and outputs the simplified curve using `linear()`. Use the sliders to control the number of stops you want, and their precision.

At the top-right, you can also choose one of the presets: Spring, Bounce, Simple elastic, or Material Design emphasized easing are included.

## DevTools support

Available in DevTools is support to visualize and edit the result of `linear()`. Click on the icon to show an interactive tooltip that lets you drag around the stops.

<figure>
  {% Img src="image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/4bYmuUGTYtjAeuGYmrCZ.png", alt="Screenshot of Chrome DevTools’s `linear()` editor.", width="800", height="677" %}
  <figcaption>Screenshot of Chrome DevTools’s `linear()` editor.</figcaption>
</figure>

This DevTools feature is available in DevTools shipping with Chrome 114.

_Photo by [Howie Mapson](https://unsplash.com/@howiehowei) on [Unsplash](https://unsplash.com/photos/lG6sv7jnBZk)_

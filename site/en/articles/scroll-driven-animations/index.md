---
layout: 'layouts/blog-post.njk'
title: Animate elements on scroll with Scroll-driven animations
authors:
  - bramus
subhead: >
  Learn how to work with Scroll Timelines and View Timelines to create scroll-driven animations in a declarative way.
description: >
  Learn how to work with Scroll Timelines and View Timelines to create scroll-driven animations in a declarative way.
date: 2023-05-05
hero: image/AeNB0cHNDkYPUYzDuv8gInYA9rY2/iDNlcxHa6axrfgHi4aoU.png
alt: "A computer mouse and an arrow indicating scroll movement."
tags:
  - css
  - chrome-115
---

{% YouTube id="oDcb3fvtETs", startTime="335" %}

## Scroll-driven animations

{% BrowserCompat 'css.properties.animation-timeline' %}

Scroll-driven animations are a common UX pattern on the web. A scroll-driven animation is linked to the scroll position of a scroll container. This means that as you scroll up or down, the linked animation scrubs forward or backward in direct response. Examples of this are effects such as parallax background images or reading indicators which move as you scroll.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/HiTavHlNjHFrA3NLLDZq.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>A reading indicator atop a document, driven by scroll.</figcaption>
</figure>

A similar type of scroll-driven animation is an animation that is linked to an element's position within its scroll container. With it, for example, elements can fade-in as they come into view.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/eV0R7BXHO7ieTFVBfTEE.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>The images on this page fade-in as they come into view.</figcaption>
</figure>

The classic way to achieve these kinds of effects is to respond to scroll events on [the main thread](https://developer.mozilla.org/docs/Glossary/Main_thread), which leads to two main problems:

- Modern browsers perform scrolling on a separate process and therefore deliver scroll events asynchronously.
- Main thread animations are [subject to jank](/blog/inside-browser-part3/#updating-rendering-pipeline-is-costly).

This makes creating performant scroll-driven animations that are in-sync with scrolling impossible or very difficult.

Coming to Chrome is a new set of APIs and concepts that work in conjunction with the existing [Web Animations API (WAAPI)](https://drafts.csswg.org/web-animations-1/) and [CSS Animations API](https://drafts.csswg.org/css-animations-1/) to enable declarative scroll-driven animations.

Integrating scroll-driven animations with two existing APIs, means that they benefit from the  advantages of these APIs. That includes the ability to have these animations run off the main thread. Yes, read that correctly: you can now have silky smooth animations, driven by scroll, running off the main thread, with just a few lines of extra code. What's not to like?!

{% Aside %} If you can’t wait to check out some demos go visit [https://scroll-driven-animations.style](https://scroll-driven-animations.style), a site packed with demos and tools to check out. {% endAside %}

## Animations on the web, a small recap

### Animations on the web with CSS

To create an animation in CSS, define a set of keyframes using the `@keyframes` at-rule. Link it up to an element using the `animation-name` property while also setting an `animation-duration` to determine how long the animation should take. There are more `animation-*` longhand properties available–`animation-easing-function` and `animation-fill-mode` just to name a few–which can all be combined in the `animation` shorthand.

For example, here’s an animation that scales up an element on the X-axis while also changing its background color:

```css
@keyframes scale-up {
  from {
    background-color: red;
    transform: scaleX(0);
  }
  to {
    background-color: darkred;
    transform: scaleX(1);
  }
}

#progressbar {
  animation: 2.5s linear forwards scale-up;
}
```

{% Aside %} To learn more about CSS Animations, visit [Learn CSS Animations](https://web.dev/learn/css/animations/) {% endAside %}

### Animations on the web with JavaScript

In JavaScript, the Web Animations API can be used to achieve exactly the same. You can do this by either creating new `Animation` and `KeyFrameEffect` instances, or use the much shorter [`Element` `animate()` method](https://developer.mozilla.org/docs/Web/API/Element/animate).

```js
document.querySelector('#progressbar').animate(
  {
    backgroundColor: ['red', 'darkred'],
    transform: ['scaleX(0)', 'scaleX(1)'],
  },
  {
    duration: 2500,
    fill: 'forwards',
    easing: 'linear',
   }
);
```

This visual result of the JavaScript snippet above is identical to the previous CSS version.


## Animation timelines

By default, an animation attached to an element runs on the [document timeline](https://developer.mozilla.org/docs/Web/API/DocumentTimeline). Its origin time starts at 0 when the page loads, and starts ticking forwards as clock time progresses. This is the default animation timeline and, until now, was the only animation timeline you had access to.

The [Scroll-driven Animations Specification](https://drafts.csswg.org/scroll-animations-1/) defines two new types of timelines that you can use:


- **Scroll Progress Timeline**: a timeline that is linked to the scroll position of a scroll container along a particular axis.
- **View Progress Timeline**: a timeline that is linked to the relative position of a particular element within its scroll container.

### Scroll Progress Timeline

A Scroll Progress Timeline is an animation timeline that is linked to progress in the scroll position of a scroll container–also called _scrollport_ or _scroller_–along a particular axis. It converts a position in a scroll range into a percentage of progress.

The starting scroll position represents 0% progress and the ending scroll position represents 100% progress. In the following visualization, you can see that the progress counts up from 0% to 100% as you scroll the scroller from top to bottom.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/xdU4YJ6cxjNYpec1XcE6.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Visualization of a Scroll Progress Timeline. As you scroll down to the bottom of the scroller, the progress value counts up from 0% to 100%.</figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/tools/scroll-timeline/progress/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="500" style="height: 500px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

A Scroll Progress Timeline is often abbreviated to simply “Scroll Timeline”.

### View Progress Timeline

This type of timeline is linked to the relative progress of a particular element within a scroll container. Just like a Scroll Progress Timeline, a scroller’s scroll offset is tracked. Unlike a Scroll Progress Timeline, it’s the relative position of a subject within that scroller that determines the progress.

This is somewhat comparable to how [`IntersectionObserver`](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) works, which can track how much an element is visible in the scroller. If the element is not visible in the scroller, it is not intersecting. If it is visible inside the scroller–even for the smallest part–it is intersecting.

A View Progress Timeline begins from the moment a subject starts intersecting with the scroller and ends when the subject stops intersecting the scroller. In the following visualization, you can see that the progress starts counting up from 0% when the subject enters the scroll container and reaches 100% at the very moment the subject has left the scroll container.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/rvPTFW2277KBTuWiZFj1.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Visualization of a View Progress Timeline. The progress counts up from 0% to 100% as the subject (green box) crosses the scroller.</figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/tools/view-timeline/progress/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="500" style="height: 500px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

A View Progress Timeline is often abbreviated to simply “View Timeline”. It is possible to target specific parts of a View Timeline based on the subject’s size, but more on that later.


## Getting practical with Scroll Progress Timelines


### Creating an anonymous Scroll Progress Timeline in CSS

The easiest way to create a Scroll Timeline in CSS is to use the `scroll()` function. This creates an anonymous Scroll Timeline that you can set as the value for the new `animation-timeline` property.

Example:

```css
@keyframes animate-it { … }

.subject {
  animation: animate-it linear;
  animation-timeline: scroll(root block);
}
```

{% Aside %} The `animation-timeline` longhand property is not part of the `animation` shorthand and must be declared separately. Furthermore, `animation-timeline` must be declared after the `animation` shorthand as the shorthand will reset non-included longhands to their initial value. {% endAside %}

The `scroll()` function accepts a `<scroller>` and an `<axis>` argument.

Accepted values for the `<scroller>` argument are the following:
- `nearest`: Uses the nearest ancestor scroll container _(default)_.
- `root`: Uses the document viewport as the scroll container.
- `self`: Uses the element itself as the scroll container.

Accepted values for the `<axis>` argument are the following:
- `block`: Uses the measure of progress along the block axis of the scroll container _(default)_.
- `inline`: Uses the measure of progress along the inline axis of the scroll container.
- `y`: Uses the measure of progress along the y axis of the scroll container.
- `x`: Uses the measure of progress along the x axis of the scroll container.

For example, to bind an animation to the root scroller on the block axis, the values to pass into `scroll()` are `root` and `block`. Put together, the value is `scroll(root block)`.

{% Aside 'important' %} Because an `animation-duration` set in seconds does not make sense when using a Scroll Progress Timeline, you must set `animation-duration` to `auto`. Alternatively, as done in the code snippet above, you can omit the `animation-duration` from the `animation` shorthand as it will then use its default value which is `auto`. {% endAside %}

#### Demo: Reading progress indicator

This demo has a reading progress indicator fixed to the top of the viewport. As you scroll down the page, the progress bar grows until it takes up the full viewport width upon reaching the end of the document. An anonymous Scroll Progress Timeline is used to drive the animation.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/HiTavHlNjHFrA3NLLDZq.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Demo: <a href="https://scroll-driven-animations.style/demos/progress-bar/css/scroll-defaults.html">Reading progress indicator</a>.</figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/progress-bar/css/scroll-defaults.html?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

The reading progress indicator is positioned at the top of the page using position fixed. To leverage composited animations, not the `width` is being animated but the element is scaled down on the x-axis using a `transform`.

```html
<body>
  <div id="progress"></div>
  …
</body>
```

```css
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

#progress {
  position: fixed;
  left: 0; top: 0;
  width: 100%; height: 1em;
  background: red;

  transform-origin: 0 50%;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}
```

The timeline for the animation `grow-progress` on the `#progress` element is set to an anonymous timeline that’s created using `scroll()`. No arguments are given to `scroll()` so it will fall back to its default values.

The default scroller to track is the `nearest` one, and the default axis is `block`. This effectively targets the root scroller as that is the nearest scroller of the `#progress` element, while tracking its block direction.

### Creating a named Scroll Progress Timeline in CSS

An alternative way to define a Scroll Progress Timeline is to use a named one. It’s a bit more verbose, but it can come in handy when you aren’t targeting a parent scroller or the root scroller, or when the page uses multiple timelines or when automatic lookups don’t work. This way, you can identify a Scroll Progress Timeline by the name that you give it.

To create a named Scroll Progress Timeline on an element, set the `scroll-timeline-name` CSS property on the scroll container to an identifier of your liking. The value must start with `--`.

To tweak which axis to track, also declare the `scroll-timeline-axis` property. Allowed values are the same as the `<axis>` argument of `scroll()`.

Finally, to link the animation to the Scroll Progress Timeline, set the `animation-timeline` property on the element that needs to be animated to the same value as the identifier used for the `scroll-timeline-name`.

Code Example:

```css
@keyframes animate-it { … }

.scroller {
  scroll-timeline-name: --my-scroller;
  scroll-timeline-axis: inline;
}

.scroller .subject {
  animation: animate-it linear;
  animation-timeline: --my-scroller;
}
```

If wanted, you can combine `scroll-timeline-name` and `scroll-timeline-axis` in the `scroll-timeline` shorthand. For example:

```css
scroll-timeline: --my-scroller inline;
```

{% Aside 'important' %} Note that even for named Scroll Timelines the lookup from the subject to the scroller happens across ancestors only. How to target a non-ancestor element, such as a sibling element, is covered further down this article in the [“Attaching to a non-ancestor Scroll Timeline”](#attaching-to-a-non-ancestor-scroll-timeline) section. {% endAside %}

#### Demo: Horizontal carousel step indicator

This demo features a step indicator shown above each image carousel. When a carousel contains three images, the indicator bar starts at 33% width to indicate you are currently looking at image one of three. When the last image is in view–determined by the scroller having scrolled to the end–the indicator takes up the full width of the scroller. A named Scroll Progress Timeline is used to drive the animation.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/5ln4aDkZ625xlM9jZXPl.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Demo: <a href="https://scroll-driven-animations.style/demos/horizontal-carousel/css/">Horizontal carousel step indicator</a>.</figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/horizontal-carousel/css/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}


The base markup for a gallery is this:

```html
<div class="gallery" style="--num-images: 2;">
  <div class="gallery__scrollcontainer">
    <div class="gallery__progress"></div>
    <div class="gallery__entry">…</div>
    <div class="gallery__entry">…</div>
  </div>
</div>
```

The `.gallery__progress` element is absolutely positioned within the `.gallery` wrapper element. Its initial size is determined by the `--num-images` custom property.

```css
.gallery {
  position: relative;
}


.gallery__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1em;
  transform: scaleX(calc(1 / var(--num-images)));
}
```

The `.gallery__scrollcontainer` lays out the contained `.gallery__entry` elements horizontally and is the element that scrolls. By tracking its scroll position, the `.gallery__progress` gets animated. This is done by referring to the named Scroll Progress Timeline `--gallery__scrollcontainer`.

```css
@keyframes grow-progress {
  to { transform: scaleX(1); }
}

.gallery__scrollcontainer {
  overflow-x: scroll;
  scroll-timeline: --gallery__scrollcontainer inline;
}
.gallery__progress {
  animation: auto grow-progress linear forwards;
  animation-timeline: --gallery__scrollcontainer;
}
```

{% Aside 'warning' %} For this specific demo, using an Anonymous Scroll Progress Timeline would not have worked. If you set `animation-timeline: scroll(nearest inline)` on `.gallery__progress` it would not find the scroller from the `.gallery__scrollcontainer` even if that element is its direct parent.

The reason for this, is that lookups for `nearest` only considers the elements that can affect its position and size. Because `.gallery__progress` is absolutely positioned, the first parent element that will determine its size and position is the `.gallery` element as it has `position: relative` applied, thereby jumping over the `.gallery__scrollcontainer` element.

Expressed in more technical terms, the lookup walks up [the containing block chain](https://drafts.csswg.org/css-display/#containing-block-chain) to find the nearest [scroll container](https://drafts.csswg.org/css-overflow-3/#scroll-container). {% endAside %}

### Creating a Scroll Progress Timeline with JavaScript

To create a Scroll Timeline in JavaScript, create a new instance of the `ScrollTimeline` class. Pass in a property bag with the `source` and `axis` that you want to track.

- `source`: A reference to the element whose scroller that you want to track. Use `document.documentElement` to target the root scroller.
- `axis`: Determines which axis to track. Similar to the CSS variant, accepted values are `block`, `inline`, `x`, and `y`.

```js
const tl = new ScrollTimeline({
  source: document.documentElement,
});
````

To attach it to a Web Animation, pass it in as the `timeline` property and omit any `duration` if there was any.

```js
$el.animate({
  opacity: [0, 1],
}, {
  timeline: tl,
});
```

#### Demo: Reading progress indicator, revisited

To recreate the reading progress indicator with JavaScript, while using the same markup, use the following JavaScript code:


```js
const $progressbar = document.querySelector('#progress');

$progressbar.style.transformOrigin = '0% 50%';
$progressbar.animate(
  {
    transform: ['scaleX(0)', 'scaleX(1)'],
  },
  {
    fill: 'forwards',
    timeline: new ScrollTimeline({
      source: document.documentElement,
    }),
  }
);
```

The visual result is identical in the CSS version: the created `timeline` tracks the root scroller and scale the `#progress` up on the x-axis from 0% to 100% as you scroll the page.


{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/progress-bar/waapi/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}


## Getting practical with View Progress Timeline

### Creating an Anonymous View Progress Timeline in CSS

To create a View Progress Timeline, use the `view()` function. Its accepted arguments are `<axis>` and `<view-timeline-inset>`.

- The `<axis>` is the same as from the Scroll Progress Timeline and defines which axis to track. The default value is `block`.
- With `<view-timeline-inset>`, you can specify an offset _(positive or negative)_ to adjust the bounds when an element is considered to be in view or not. The value must be a percentage or `auto`, with `auto` being the default value.

For example, to bind an animation to an element intersecting with its scroller on the block axis, use `view(block)`. Similar to `scroll()`, set this as the value for the `animation-timeline` property and don’t forget to set the `animation-duration` to `auto`.

Using the following code, every `img` will fade-in as it crosses the viewport while you scroll.

```css
@keyframes reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

img {
  animation: reveal linear;
  animation-timeline: view();
}
```

{% Aside 'important' %} It is not possible to determine the `<scroller>` of a View Timeline, as it always tracks the subject within its nearest parent scroller. {% endAside %}

### Intermezzo: View Timeline ranges

By default, an animation linked to the View Timeline attaches to the entire timeline range. This starts from the moment the subject is about to enter the scrollport and ends when the subject has left the scrollport entirely.

It is also possible to link it to a specific part of the View Timeline by specifying the range that it should attach to. This can be, for example, only when the subject is entering the scroller. In the following visualization, the progress starts counting up from 0% when the subject enters the scroll container but already reaches 100% from the moment it is entirely intersecting.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/p952qt9FVzv2v3zP0o9Q.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>A View Timeline set to track the entry range of the subject. The animation only runs while the subject is entering the scrollport.</figcaption>
</figure>

The possible View Timeline ranges that you can target are the following:

- `cover`: Represents the full range of the view progress timeline.
- `entry`: Represents the range during which the principal box is entering the view progress visibility range.
- `exit`: Represents the range during which the principal box is exiting the view progress visibility range.
- `entry-crossing`: Represents the range during which the principal box crosses the end border edge.
- `exit-crossing`: Represents the range during which the principal box crosses the start border edge.
- `contain`: Represents the range during which the principal box is either fully contained by, or fully covers, its view progress visibility range within the scrollport. This depends on whether the subject is taller or shorter than the scroller.

To define a range, you must set a range-start and range-end. Each consists of range-name _(see list above)_ and a range-offset to determine the position within that range-name. The range-offset is typically a percentage ranging from `0%` to `100%` but you can also specify a fixed length such as `20em`.

For example, if you want to run an animation from the moment a subject enters, choose `entry 0%` as the range-start. To have it finished by the time the subject has entered, choose `entry 100%` as a value for the range-end.

In CSS, you set this using the `animation-range` property. Example:

```css
animation-range: entry 0% entry 100%;
```

In JavaScript, use the `rangeStart` and `rangeEnd` properties.

```js
$el.animate(
  keyframes,
  {
    timeline: tl,
    rangeStart: 'entry 0%',
    rangeEnd: 'entry 100%',
  }
);
```

Use the tool embedded below to see what each range-name represents and how the percentages affect the start and end positions. Try to set the range-start to `entry 0%` and the range-end to `cover 50%`, and then drag the scrollbar to see the animation result.

<figure>
  <iframe loading="lazy" src="https://scroll-driven-animations.style/tools/view-timeline/ranges/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
  <figcaption>The View Timeline Ranges Visualizer, available at <a href="https://goo.gle/view-timeline-range-tool">https://goo.gle/view-timeline-range-tool</a></figcaption>
</figure>

{% Details %}
{% DetailsSummary %}Watch a recording{% endDetailsSummary %}
{% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/x6SLvlnns26zNGeJOCuS.mp4", width="800", height="800", controls="true", playsinline="true" %}
{% endDetails %}

As you might notice while playing around with this View Timeline Ranges tools, some ranges can be targeted by two different range-name + range-offset combinations. For example, `entry 0%`, `entry-crossing 0%`, and `cover 0%` all target the same area.

When the range-start and range-end target the same range-name and span the entire range–from 0% up to 100%–you can shorten the value to simply the range name. For example, `animation-range: entry 0% entry 100%;` can be rewritten to the much shorter `animation-range: entry`.

{% Aside 'important' %} Note that these ranges are derived from the untransformed _principal box_ of the subject. That means that transformations such as `scale` and `translate` are not taken into account when deriving the ranges. This is a good thing, as this allows you to scale a subject during scroll without affecting the available scroll estate. If the transformed box were used, attached animations would flicker because they would constantly need to be recalculated in response to a change in scroll estate. {% endAside %}

#### Demo: Image reveal

This demo fades in the images as they enter the scrollport. This is done using an Anonymous View Timeline. The animation range has been tweaked so that each image is at full opacity when it is halfway the scroller.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/eV0R7BXHO7ieTFVBfTEE.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Demo: <a href="https://scroll-driven-animations.style/demos/image-reveal/css/anonymous.html">Image reveal</a></figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/image-reveal/css/anonymous.html?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

The expanding effect is achieved by using a clip-path that is animated. The CSS used for this effect is this:

```css
@keyframes reveal {
  from { opacity: 0; clip-path: inset(0% 60% 0% 50%); }
  to { opacity: 1; clip-path: inset(0% 0% 0% 0%); }
}

.revealing-image {
  animation: auto linear reveal both;
  animation-timeline: view();
  animation-range: entry 25% cover 50%;
}
```

### Creating a named View Progress Timeline in CSS

Similar to how Scroll Timelines have named versions, you can also create named View Timelines. Instead of the `scroll-timeline-*` properties you use variants that carry the `view-timeline-` prefix, namely `view-timeline-name` and `view-timeline-axis`.

The same type of values apply, and the same rules for looking up a named timeline apply.

#### Demo: Image reveal, revisited

Reworking the image reveal demo from earlier, the revised code looks like this:

```css
.revealing-image {
  view-timeline-name: --revealing-image;
  view-timeline-axis: block;

  animation: auto linear reveal both;
  animation-timeline: --revealing-image;
  animation-range: entry 25% cover 50%;
}
```

Using `view-timeline-name: revealing-image`, the element will be tracked within its nearest scroller. The same value is then used as the value for the `animation-timeline` property. The visual output is exactly the same as before.

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/image-reveal/css/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

### Creating a View Progress Timeline in JavaScript

To create a View Timeline in JavaScript, create a new instance of the `ViewTimeline` class. Pass in a property bag with the `subject` that you want to track, `axis`, and `inset`.

- `subject`: A reference to the element that you want to track within its own scroller.
- `axis`: The axis to track. Similar to the CSS variant, accepted values are `block`, `inline`, `x`, and `y`.
- `inset`: An inset _(positive)_ or outset _(negative)_ adjustment of the scrollport when determining whether the box is in view.

```js
const tl = new ViewTimeline({
  subject: document.getElementById('subject'),
});
```

To attach it to a Web Animation, pass it in as the `timeline` property and omit any `duration` if there was any. Optionally, pass in range information using the `rangeStart` and `rangeEnd` properties.

```js
$el.animate({
  opacity: [0, 1],
}, {
  timeline: tl,
  rangeStart: 'entry 25%',
  rangeEnd: 'cover 50%',
});
```

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/image-reveal/waapi/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

{% Aside %} The animated element `$el` and the `subject` do not need to be the same element. This means that you can track an element in its scroller while animating a distant element somewhere else in the DOM tree. {% endAside %}

## More things to try out

### Attaching to multiple View Timeline ranges with one set of keyframes

Let’s take a look at this contact list demo where the list entries are animated. As a list entry enters the scrollport from the bottom it slides+fades in, and as it exits the scrollport at the top it slides+fades out.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/edztzaUNSuQsUVUzF9vr.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Demo: <a href="https://scroll-driven-animations.style/demos/contact-list/css/multiple-animations.html">Contact list</a></figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/contact-list/css/multiple-animations.html?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

For this demo, each element gets decorated with one View Timeline that tracks the element as it crosses its scrollport yet two scroll-driven animations are attached to it. The `animate-in` animation is attached to the `entry` range of the timeline, and the `animate-out` animation to the `exit` range of the timeline.

```css
@keyframes animate-in {
  0% { opacity: 0; transform: translateY(100%); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes animate-out {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-100%); }
}

#list-view li {
  animation: animate-in linear forwards,
             animate-out linear forwards;
  animation-timeline: view();
  animation-range: entry, exit;
}
```

Instead of running two different animations attached to two different ranges, it is also possible to create one set of keyframes that already contains the range information.

```css
@keyframes animate-in-and-out {
  entry 0%  {
    opacity: 0; transform: translateY(100%);
  }
  entry 100%  {
    opacity: 1; transform: translateY(0);
  }
  exit 0% {
    opacity: 1; transform: translateY(0);
  }
  exit 100% {
    opacity: 0; transform: translateY(-100%);
  }
}

#list-view li {
  animation: linear animate-in-and-out;
  animation-timeline: view();
}
```

As the keyframes contain the range information, you don’t need to specify the `animation-range`. The result is exactly the same as it was before.

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/contact-list/css/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

### Attaching to a non-ancestor Scroll Timeline

{% Aside %} The feature described in this section is not supported in Chrome 115. To try it out, use Chrome 116 with the Experimental Web Platform Features flag enabled. {% endAside %}

The lookup mechanism for named Scroll Timelines and named View Timelines is limited to scroll ancestors only. Very often though, the element that needs to be animated is not a child of the scroller that needs to be tracked.

To make this work, the `timeline-scope` property comes into play. You use this property to declare a timeline with that name without actually creating it. This gives the timeline with that name a broader scope. In practice, you use the `timeline-scope` property on a shared parent element so that a child scroller’s timeline can attach to it.

For example:

```css
.parent {
  timeline-scope: --tl;
}
.parent .scroller {
  scroll-timeline: --tl;
}
.parent .scroller ~ .subject {
  animation: animate linear;
  animation-timeline: --tl;
}
```

In this snippet:

- The `.parent` element declares a timeline with the name `--tl`. Any child of it can find and use it as a value for the `animation-timeline` property.
- The `.scroller` element actually defines a Scroll Timeline with the name `--tl`. By default it would only be visible to its children but because `.parent` has it set as the `scroll-timeline-root`, it attaches to it.
- The `.subject` element uses the `--tl` timeline. It walks up its ancestor tree and finds `--tl` on the `.parent`. With the `--tl` on the `.parent` pointing to the `--tl` of `.scroller`, the `.subject` will essentially track the `.scroller`’s Scroll Progress Timeline.

Put differently, you can use `timeline-root` to move a timeline up to an ancestor (aka _hoisting_), so that all children of the ancestor can access it.

The `timeline-scope` property can be used with both both Scroll Timelines and View Timelines.

## More demos and resources

All demos covered in this article on [the scroll-driven-animations.style mini-site](https://scroll-driven-animations.style/). The website includes many more demos to highlight what is possible with Scroll-driven animations.

One of the additional demos is this list of album covers. Each cover rotates in 3D as it takes the center spotlight.

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/hiItR1vueBVTJbgOAwHp.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Demo: <a href="https://scroll-driven-animations.style/demos/cover-flow/css/">Cover Flow</a></figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/cover-flow/css/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

Or this stacking cards demo that leverage `position: sticky`. As the cards stack, the already stuck cards scale down, creating a nice depth effect. In the end, the entire stack slides out of view as a group.


<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/dyy4rOs0WsWOAuxS9sBG.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>Demo: <a href="https://scroll-driven-animations.style/demos/stacking-cards/css/">Stacking cards<a>.</figcaption>
</figure>

{% Details %}
{% DetailsSummary %}✨ Try it for yourself{% endDetailsSummary %}
<iframe loading="lazy" src="https://scroll-driven-animations.style/demos/stacking-cards/css/?embed" frameborder="0" sandbox="allow-scripts allow-forms allow-top-navigation" width="500" height="600" style="height: 600px; width: 100%; border: 1px solid #333;"></iframe>
{% endDetails %}

Also featured on [scroll-driven-animations.style](https://scroll-driven-animations.style/) is a collection of tools such as the View Timeline Range Progress visualization that was included earlier in this post.

Scroll-driven animations are also covered in [What’s new in Web Animations](https://io.google/2023/program/170b44dc-47f0-409f-92fe-b5c70aab4569/) at Google I/O ’23.

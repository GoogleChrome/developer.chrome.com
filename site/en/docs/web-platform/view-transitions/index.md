---
layout: 'layouts/doc-post.njk'
title: Smooth and simple transitions with the View Transitions API
authors:
  - jakearchibald
description: >
  The View Transition API allows page transitions within single-page apps, and will later include multi-page apps.
date: 2021-08-17
updated: 2022-08-02
---

{% Aside %}
This feature was previously called "Shared Element Transitions", and is sometimes referred to as "page transitions".
{% endAside %}

The View Transition API makes it easy to change the DOM in a single step, while creating an animated transition between the two states.

It's currently behind the `chrome://flags/#view-transition` flag in Chrome 109+.

<style>
  .video-full-demo {
    aspect-ratio: 1520 / 1054;
  }
</style>

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/hgnJfPFUbGlucFegEEtl.mp4",
    class="video-full-demo",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Transitions created with the View Transition API. <a href="https://http203-playlist.netlify.app/">Try the demo site</a> – Requires Chrome 109+ and the <code>chrome://flags/#document-transition</code> flag.</figcaption>
</figure>

## Why do we need this feature?

Page transitions not only look great, they also communicate direction of flow, and make it clear which elements are related from page to page. They can even happen during data fetching, leading to a faster perception of performance.

But, we already have animation tools on the web, such as [CSS transitions](https://developer.mozilla.org/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), [CSS animations](https://developer.mozilla.org/docs/Web/CSS/CSS_Animations/Using_CSS_animations), and the [Web Animation API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), so why do we need a new thing to move stuff around?

The truth is, state transitions are hard, even with the tools we already have.

Even something like a simple cross-fade involves both states being present at the same time. That presents usability challenges, such as handling additional interaction on the outgoing element. Also, for users of assistive devices, there's a period where both the before and after state are in the DOM at the same time, and things may move around the tree in a way that's fine visually, but can easily cause reading position and focus to be lost.

Handling state changes is particularly challenging if the two states differ in scroll position. And, if an element is moving from one container to another, you can run into difficulties with `overflow: hidden` and other forms of clipping, meaning you have to restructure your CSS to get the effect you want.

It isn't impossible, it's just _really hard_.

Additionally, although the current implementation targets single page apps (SPAs), this feature will be expanded to allow for transitions between full page loads, which is currently impossible.

## Standardization status

The feature is being developed within the [W3C CSS Working Group](https://www.w3.org/groups/wg/css) as a [draft specification](https://drafts.csswg.org/css-view-transitions-1/).

Once we're happy with the API design, we'll start the processes and checks required to ship this feature to stable.

Developer feedback is really important, so please [file issues on GitHub](https://github.com/w3c/csswg-drafts/labels/css-view-transitions-1) with suggestions and questions.

## The simplest transition: A cross-fade

The default View Transition is a cross-fade, so it serves as a nice introduction to the API:

```js
function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // With a transition:
  document.startViewTransition(() => updateTheDOMSomehow(data));
}
```

Where `updateTheDOMSomehow` changes the DOM to the new state. That can be done however you want: Add/removing elements, changing class names, changing styles… it doesn't matter.

And just like that, pages cross-fade:

<style>
  .desktop-demo {
    aspect-ratio: 1960 / 1304;
  }
</style>

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/9rdbsCmBXKOYxOQNjBMI.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>The default cross-fade. <a href="https://simple-set-demos.glitch.me/1-cross-fade/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=1-cross-fade%2Fscript.js%3A1%3A0">Source</a>.</figcaption>
</figure>

Ok, a cross-fade isn't that impressive. Thankfully, transitions can be customized, but before we get to that, we need to understand how this basic cross-fade worked.

## How these transitions work

Taking the code sample from above:

```js
document.startViewTransition(() => updateTheDOMSomehow(data));
```

When `.startViewTransition()` is called, the API captures the current state of the page. This includes taking a screenshot.

Once that's complete, the callback passed to `.startViewTransition()` is called. That's where the DOM is changed. Then, the API captures the new state of the page.

Once the state is captured, the API constructs a pseudo-element tree like this:

```diff
::view-transition
└─ ::view-transition-group(root)
   └─ ::view-transition-image-set(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

The `::view-transition` sits in a top-layer, over everything else on the page.

`::view-transition-old(root)` is a screenshot of the old view, and `::view-transition-new(root)` is a live representation of the new view. Both render as CSS 'replaced content' (like an `<img>`).

The old view animates from `opacity: 1` to `opacity: 0`, while the new view animates from `opacity: 0` to `opacity: 1`, creating a cross-fade.

All of the animation is performed using CSS animations, so they can be customized with CSS.

## Simple customization

All of the pseudo-elements above can be targeted with CSS, and since the animations are defined using CSS, you can modify them using existing CSS animation properties. For example:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 5s;
}
```

With that one change, the fade is now really slow:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/90h6Ppxza6oPqNiMpTPE.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Long cross-fade. <a href="https://simple-set-demos.glitch.me/2-slow-cross-fade/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=2-slow-cross-fade%2Fstyles.css%3A1%3A0">Source</a>.</figcaption>
</figure>

Ok, that's still not impressive. Instead, let's implement [Material Design's shared axis transition](https://material.io/design/motion/the-motion-system.html#shared-axis):

<!-- prettier-ignore -->
```css
@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-from-right {
  from { transform: translateX(30px); }
}

@keyframes slide-to-left {
  to { transform: translateX(-30px); }
}

::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
```

And here's the result:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/BRT5dMgEzpixRmrVYKwN.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Shared axis transition. <a href="https://simple-set-demos.glitch.me/3-shared-axis/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=3-shared-axis%2Fstyles.css%3A25%3A1">Source</a>.</figcaption>
</figure>

{% Aside %}
In this example, the animation always moves from right to left, which doesn't feel natural when clicking the back button. How to change the animation depending on the direction of navigation is covered [later in the article](#changing-on-navigation-type).
{% endAside %}

## Transitioning multiple elements

In the previous demo, the whole page is involved in the shared axis transition. That works for most of the page, but it doesn't seem quite right for the heading, as it slides out just to slide back in again.

To avoid this, you can extract the header from the rest of the page so it can be animated separately. This is done by assigning a `view-transition-name` to the element, and giving the element [`layout`](https://developer.mozilla.org/docs/Web/CSS/CSS_Containment#layout_containment) or [`paint`](https://developer.mozilla.org/docs/Web/CSS/CSS_Containment#paint_containment) containment. `layout` containment has fewer restrictions, so it's usually the better choice.

```css
.main-header {
  view-transition-name: main-header;
  contain: layout;
}
```

The value of `view-transition-name` can be whatever you want (except for `none`, which means there's no transition name). It's used to _uniquely_ identify the element across the transition.

{% Aside %}
`view-transition-name` must be unique. If two rendered elements have the same `view-transition-name` at the same time, the transition will be skipped.
{% endAside %}

And the result of that:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/zlpY4YFct0LHC6eowSFA.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Shared axis transition with fixed header. <a href="https://simple-set-demos.glitch.me/4-fixed-header/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=4-fixed-header%2Fstyles.css%3A1%3A0">Source</a>.</figcaption>
</figure>

Now the header stays in place and cross-fades.

That CSS declaration caused the pseudo-element tree to change:

```diff
::view-transition
├─ ::view-transition-container(root)
│  └─ ::view-transition-image-set(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
└─ ::view-transition-container(main-header)
   └─ ::view-transition-image-set(main-header)
      ├─ ::view-transition-old(main-header)
      └─ ::view-transition-new(main-header)
```

There are now two transition containers. One for the header, and another for the rest. These can be targeted independently with CSS, and given different transitions. Although, in this case `main-header` was left with the default transition, which is a cross-fade.

Well, ok, the default transition isn't just a cross fade, it also transitions:

- Position and transform (via a `transform`)
- Width
- Height

That hasn't mattered until now, as the header is the same size and position both sides of the DOM change. But we can also extract the text in the header:

```css
.main-header-text {
  view-transition-name: main-header-text;
  contain: layout;
  width: fit-content;
}
```

`fit-content` is used so the element is the size of the text, rather than stretching to the remaining width. Without this, the back arrow reduces the size of the header text element, whereas we want it to be the same size in both pages.

So now we have three parts to play with:

```diff
::view-transition
├─ ::view-transition-container(root)
│  └─ …
├─ ::view-transition-container(main-header)
│  └─ …
└─ ::view-transition-container(main-header-text)
   └─ …
```

But again, just going with the defaults:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/eXu6vohojllPLNEQScjO.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Sliding header text. <a href="https://simple-set-demos.glitch.me/5-heading-text/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=5-heading-text%2Fstyles.css%3A1%3A0">Source</a>.</figcaption>
</figure>

Now the heading text does a little satisfying slide across to make space for the back button.

{% Aside %}
View transitions use a flat structure. In the real DOM, the heading text was in the header. But, during the transition, their respective `::view-transition-container`s are siblings. This is really handy when animating items from one container to another, as you don't need to worry about clipping from parent elements.
{% endAside %}

## Debugging transitions

Since View Transitions are built on top of CSS animations, the animations panel in Chrome Dev Tools is great for debugging transitions.

Using the animations panel, you can pause the next animation, then scrub back and forth through the animation. During this, the transition pseudo-elements can be found in the elements panel.

<style>
  .devtools-demo {
    aspect-ratio: 2538 / 1544;
  }
</style>

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/DMH7qPqMszyVbTYOA2zd.mp4",
    class="devtools-demo",
    muted="true",
    controls="true"
  %}
  <figcaption>Debugging View Transitions with Chrome Dev Tools.</figcaption>
</figure>

## Transitioning elements don't need to be the same DOM element

So far we've used `view-transition-name` to create separate transition elements for the header, and the text in the header. These are conceptually the same element before and after the DOM change, but you can create transitions where that isn't the case.

For instance, the main video embed can be given a `view-transition-name`:

```css
.full-embed {
  view-transition-name: full-embed;
  contain: layout;
}
```

Then, when the thumbnail is clicked, it can be given the same `view-transition-name`, just for the duration of the transition:

```js
thumbnail.onclick = async () => {
  thumbnail.style.viewTransitionName = 'full-embed';

  document.startViewTransition(() => {
    thumbnail.style.viewTransitionName = '';
    updateTheDOMSomehow();
  });
};
```

And the result:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/283vqtaDXSaGRTn5nEEn.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>One element transitioning to another. <a href="https://simple-set-demos.glitch.me/6-expanding-image/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=6-expanding-image%2Fscript.js%3A15%3A17">Source</a>.</figcaption>
</figure>

The thumbnail now transitions into the main image. Even though they're conceptually (and literally) different elements, the transition API treats them as the same thing because they shared the same `view-transition-name`.

The real code for this is a little more complicated than the simple example above, as it also handles the transition back to the thumbnail page. [See the source](https://glitch.com/edit/#!/simple-set-demos?path=6-expanding-image%2Fscript.js%3A15%3A17) for the full implementation.

## Async DOM updates, and waiting for content

The callback passed to `.startViewTransition()` can return a promise, which allows for async DOM updates, and waiting for important content to be ready.

```js
document.startViewTransition(async () => {
  await something;
  await updateTheDOMSomehow();
  await somethingElse;
});
```

The transition won't be started until the promise fulfills. During this time, the page is frozen, so delays here should be kept to a minimum. Specifically, network fetches should be done before calling `.startViewTransition()`, while the page is still fully interactive, rather than doing them as part of the `.startViewTransition()` callback.

If you decide to wait for images or fonts to be ready, be sure to use an aggressive timeout:

```js
const wait = ms => new Promise(r => setTimeout(r, ms));

document.startViewTransition(async () => {
  updateTheDOMSomehow();

  // Pause for up to 100ms for fonts to be ready:
  await Promise.race([document.fonts.ready, wait(100)]);
});
```

However, in some cases it's better to avoid the delay altogether, and use the content you already have.

### Making the most of content you already have

In the case where the thumbnail transitions to a larger image:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/283vqtaDXSaGRTn5nEEn.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

The default transition is to cross-fade, which means the thumbnail could be cross-fading with a not-yet-loaded full image.

One way to handle this is to wait for the full image to load before starting the transition. Ideally this would be done before calling `.startViewTransition()`, so the page remains interactive, and a spinner can be shown to indicate to the user that things are loading. But in this case there's a better way:

```css
::view-transition-old(full-embed),
::view-transition-new(full-embed) {
  /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
  animation: none;
  /* Use normal blending,
  so the new view sits on top and obscures the old view */
  mix-blend-mode: normal;
}
```

Now the thumbnail doesn't fade away, it just sits underneath the full image. This means if the new view hasn't loaded, the thumbnail is visible throughout the transition. This means the transition can start straight away, and the full image can load in its own time.

This wouldn't work if the new view featured transparency, but in this case we know it doesn't, so we can make this optimization.

## Handling changes in aspect ratio

Conveniently, all the transitions so far have been to elements with the same aspect ratio, but that won't always be the case. What if the thumbnail is 1:1, and the main image is 16:9?

<style>
  .aspect-ratio-change-demo {
    aspect-ratio: 2252 / 1446;
  }
</style>

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/gXiaS9IpE70fnv4kkrK5.mp4",
    class="aspect-ratio-change-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>One element transitioning to another, with an aspect ratio change. <a href="https://simple-set-demos.glitch.me/7-expanding-image-ratio/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=7-expanding-image-ratio%2Fstyles.css%3A59%3A0">Source</a>.</figcaption>
</figure>

In the default transition, the container animates from the before size to the after size. The old and new views are 100% width of the container, and auto height, meaning they keep their aspect ratio regardless of the container's size.

This is a good default, but it isn't what we want in this case. So:

```css
::view-transition-old(full-embed),
::view-transition-new(full-embed) {
  /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
  animation: none;
  /* Use normal blending,
  so the new view sits on top and obscures the old view */
  mix-blend-mode: normal;
  /* Make the height the same as the container,
  meaning the view size might not match its aspect-ratio. */
  height: 100%;
  /* Clip any overflow of the view */
  overflow: clip;
}

/* The old view is the thumbnail */
::view-transition-old(full-embed) {
  /* Maintain the aspect ratio of the view,
  by shrinking it to fit within the bounds of the element */
  object-fit: contain;
}

/* The new view is the full image */
::view-transition-new(full-embed) {
  /* Maintain the aspect ratio of the view,
  by growing it to cover the bounds of the element */
  object-fit: cover;
}
```

This means the thumbnail stays in the center of the element as the width expands, but the full image 'un-crops' as it transitions from 1:1 to 16:9.

{% Aside %}
Animating width and height, as happens here on the `::view-transition-container`, is generally frowned upon in web performance circles as it runs layout per frame. However, for View Transitions, we plan to optimize it so it can run off the main thread in most cases. This optimization hasn't been implemented yet.
{% endAside %}

## Changing the transition depending on device state

You may want to use different transitions on mobile vs desktop, such as this example which performs a full slide from the side on mobile, but a more subtle slide on desktop:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/NSCx5JTmzyJPOu6rrpeT.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>One element transitioning to another. <a href="https://simple-set-demos.glitch.me/media-queries/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=media-queries%2Fstyles.css%3A35%3A0">Source</a>.</figcaption>
</figure>

This can be achieved using regular media queries:

<!-- prettier-ignore -->
```css
/* Transitions for mobile */
::view-transition-old(root) {
  animation: 300ms ease-out both full-slide-to-left;
}

::view-transition-new(root) {
  animation: 300ms ease-out both full-slide-from-right;
}

@media (min-width: 500px) {
  /* Overrides for larger displays.
  This is the shared axis transition from earlier in the article. */
  ::view-transition-old(root) {
    animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  ::view-transition-new(root) {
    animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
}
```

You may also want to change which elements you assign a `view-transition-name` depending on matching media queries.

### Reacting to the 'reduced motion' preference

Users can indicate they prefer reduced motion via their operating system, and that preference is [exposed via CSS](https://web.dev/prefers-reduced-motion/).

You could chose to prevent any transitions for these users:

```css
@media (prefers-reduced-motion) {
  ::view-transition-container(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

However, a preference for 'reduced motion' doesn't mean the user wants _no motion_. Instead of the above, you could choose a more subtle animation, but one that still expresses the relationship between elements, and the flow of data.

## Changing the transition depending on the type of navigation {:#changing-on-navigation-type}

Sometimes a navigation from one particular type of page to another should have a specifically tailored transition. Or, a 'back' navigation should be different to a 'forward' navigation.

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/Btn9XiUhpQC7Lz198IKI.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Different transitions when going 'back'. <a href="https://simple-set-demos.glitch.me/directional-transition/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=directional-transition%2Fscript.js%3A15%3A0">Source</a>.</figcaption>
</figure>

The best way to handle these cases is to set a class name on `<html>`, also known as the document element:

```js
if (isBackNavigation) {
  document.documentElement.classList.add('back-transition');
}

const transition = document.startViewTransition(() =>
  updateTheDOMSomehow(data)
);

try {
  await transition.finished;
} finally {
  document.documentElement.classList.remove('back-transition');
}
```

This example uses `transition.finished`, a promise that resolves once the transition has reached its end state. Other properties of this object are covered in the [API reference](#api-reference).

{% Aside %}
The above doesn't define how `isBackNavigation` is determined, as that depends on how the navigation is performed. [The Navigation API](/docs/web-platform/navigation-api/) is really useful here, and that's what's used in the [minimal demo](https://glitch.com/edit/#!/simple-set-demos?path=directional-transition%2Fscript.js%3A16%3A0).
{% endAside %}

Now you can use that class name in your CSS to change the transition:

<!-- prettier-ignore -->
```css
/* 'Forward' transitions */
::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms
      cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

/* Overrides for 'back' transitions */
.back-transition::view-transition-old(root) {
  animation-name: fade-out, slide-to-right;
}

.back-transition::view-transition-new(root) {
  animation-name: fade-in, slide-from-left;
}
```

As with media queries, the presence of these classes could also be used to change which elements get a `view-transition-name`.

## Animating with JavaScript {:#animating-with-javascript}

So far, all the transitions have been defined using CSS, but sometimes CSS isn't enough:

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/MrrqwatxWSPdobfDR1Qo.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Circle transition. <a href="https://simple-set-demos.glitch.me/circle-transition/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=circle-transition%2Fscript.js%3A1%3A1">Source</a>.</figcaption>
</figure>

A couple of parts of this transition can't be achieved with CSS alone:

- The animation starts from the click location.
- The animation ends with the circle having a radius to the farthest corner. Although, hopefully this will be possible with CSS [in future](https://github.com/w3c/csswg-drafts/issues/824#issuecomment-1157549393).

Thankfully, you can create transitions using the [Web Animation API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API)!

```js
let lastClick;
addEventListener('click', event => (lastClick = event));

function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // With a transition:
  const transition = document.startViewTransition(() => {
    // Get the click position, or fallback to the middle of the screen
    const x = lastClick?.clientX ?? innerWidth / 2;
    const y = lastClick?.clientY ?? innerHeight / 2;
    // Get the distance to the furthest corner
    const endRadius = Math.sqrt(
      Math.max(x, innerWidth - x) ** 2 + Math.max(y, innerHeight - y) ** 2
    );

    updateTheDOMSomehow(data);
  });

  // Wait for the pseudo-elements to be created:
  transition.ready.then(() => {
    // Animate the root's new view
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in',
        // Specify which pseudo-element to animate
        pseudoElement: '::view-transition-new(root)',
      }
    );
  });
}
```

This example uses `transition.ready`, a promise that resolves once the transition pseudo-elements have been successfully created. Other properties of this object are covered in the [API reference](#api-reference).

## Transitions as an enhancement

The View Transition API is designed to 'wrap' a DOM change and create a transition for it. However, the transition should be treated as an enhancement, as in, your app shouldn't enter an 'error' state if the DOM change succeeds, but the transition fails. Ideally the transition shouldn't fail, but if it does, it shouldn't break the rest of the user experience.

In order to treat transitions as an enhancement, take care not to use transition promises in a way that would cause your app to throw if the transition fails.

{% Compare 'worse' %}

```js
async function switchView(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    await updateTheDOM(data);
    return;
  }

  const transition = document.startViewTransition(async () => {
    await updateTheDOM(data);
  });

  await transition.ready;

  document.documentElement.animate(
    {
      clipPath: [`inset(50%)`, `inset(0)`],
    },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    }
  );
}
```

{% endCompare %}

The problem with this example is that `switchView()` will reject if the _transition_ cannot reach a `ready` state, but that doesn't mean that the view failed to switch. The DOM may have successfully updated, but there were duplicate `view-transition-name`s, so the transition was skipped.

Instead:

{% Compare 'better' %}

```js
async function switchView(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    await updateTheDOM(data);
    return;
  }

  const transition = document.startViewTransition(async () => {
    await updateTheDOM(data);
  });

  animateFromMiddle(transition);

  await transition.domUpdated;
}

async function animateFromMiddle(transition) {
  try {
    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [`inset(50%)`, `inset(0)`],
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  } catch (err) {
    // You might want to log this error, but it shouldn't break the app
  }
}
```

{% endCompare %}

This example uses `transition.domUpdated` to wait for the DOM update, and to reject if it fails. `switchView` no longer rejects if the transition fails, it resolves when the DOM update completes, and rejects if it fails.

## API reference {:#api-reference}

`const viewTransition = document.startViewTransition(domUpdateCallback)`
: Start a new `ViewTransition`.

    `domUpdateCallback` is called once the current state of the document is captured.

    Then, when the promise returned by `domUpdateCallback` fulfills, the transition begins in the next frame. If the promise returned by `domUpdateCallback` rejects, the transition is abandoned.

Instance members of `ViewTransition`:

`viewTransition.domUpdated`
: A promise that fulfills when the promise returned by `domUpdateCallback` fulfills, or rejects when it rejects.

    The View Transition API wraps a DOM change and creates a transition. However, sometimes you don't care about the success/failure of the transition animation, you just want to know if and when the DOM change happens. `domUpdated` is for that use-case.

`viewTransition.ready`
: A promise that fulfills once the pseudo-elements for the transition are created, and the animation is about to start.

    It rejects if the transition cannot begin. This can be due to misconfiguration, such as duplicate `view-transition-name`s, or if `domUpdateCallback` returns a rejected promise.

    This is useful for [animating the transition pseudo-elements with JavaScript](#animating-with-javascript).

`viewTransition.finished`
: A promise that fulfills once the end state is fully visible and interactive to the user.

    It only rejects if `domUpdateCallback` returns a rejected promise, as this indicates the end state wasn't created.

    Otherwise, if a transition fails to begin, or is skipped during the transition, the end state is still reached, so `finished` fulfills.

`viewTransition.skipTransition()`
: Skip the animation part of the transition.

    This won't skip calling `domUpdateCallback`, as the DOM change is separate to the transition.

## Default style and transition reference

`::view-transition`
: The root pseudo-element which fills the viewport and contains each `::view-transition-container`.

`::view-transition-container`
: Absolutely positioned.

    Transitions `width` and `height` between the 'before' and 'after' states.

    Transitions `transform` between the 'before' and 'after' viewport-space quad.

`::view-transition-image-set`
: Absolutely positioned to fill the container.

    Has `isolation: isolate` to limit the effect of the `plus-lighter` blend mode on the old and new views.

`::view-transition-new` and `::view-transition-old`
: Absolutely positioned to the top-left of the wrapper.

    Fills 100% of the container width, but has an auto height, so it will maintain its aspect ratio rather than filling the container.

    Has `mix-blend-mode: plus-lighter` to allow for a true cross-fade.

    The old view transitions from `opacity: 1` to `opacity: 0`. The new view transitions from `opacity: 0` to `opacity: 1`.

## Feedback

Developer feedback is really important at this stage, so please [file issues on GitHub](https://github.com/w3c/csswg-drafts/labels/css-view-transitions-1) with suggestions and questions.

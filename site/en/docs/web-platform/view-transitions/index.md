---
layout: 'layouts/doc-post.njk'
title: Smooth and simple transitions with the View Transitions API
authors:
  - jakearchibald
description: >
  The View Transition API allows page transitions within single-page apps, and will later include multi-page apps.
date: 2021-08-17
updated: 2023-03-24
---

{% Aside %}
This feature was previously called "Shared Element Transitions", and is sometimes referred to as "page transitions".
{% endAside %}

The View Transition API makes it easy to change the DOM in a single step, while creating an animated transition between the two states. It's available in Chrome 111+.

<style>
  .video-full-demo {
    aspect-ratio: 1520 / 1054;
  }
</style>

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/hgnJfPFUbGlucFegEEtl.mp4",
    class="video-full-demo",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Transitions created with the View Transition API. <a href="https://http203-playlist.netlify.app/">Try the demo site</a> – Requires Chrome 111+.</figcaption>
</figure>

## Why do we need this feature?

Page transitions not only look great, they also communicate direction of flow, and make it clear which elements are related from page to page. They can even happen during data fetching, leading to a faster perception of performance.

But, we already have animation tools on the web, such as [CSS transitions](https://developer.mozilla.org/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), [CSS animations](https://developer.mozilla.org/docs/Web/CSS/CSS_Animations/Using_CSS_animations), and the [Web Animation API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), so why do we need a new thing to move stuff around?

The truth is, state transitions are hard, even with the tools we already have.

Even something like a simple cross-fade involves both states being present at the same time. That presents usability challenges, such as handling additional interaction on the outgoing element. Also, for users of assistive devices, there's a period where both the before and after state are in the DOM at the same time, and things may move around the tree in a way that's fine visually, but can easily cause reading position and focus to be lost.

Handling state changes is particularly challenging if the two states differ in scroll position. And, if an element is moving from one container to another, you can run into difficulties with `overflow: hidden` and other forms of clipping, meaning you have to restructure your CSS to get the effect you want.

It isn't impossible, it's just _really hard_.

View Transitions give you an easier way, by allowing you to make your DOM change without any overlap between states, but create a transition animation between the states using snapshotted views.

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
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/9rdbsCmBXKOYxOQNjBMI.mp4",
    class="desktop-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>The default cross-fade. <a href="https://simple-set-demos.glitch.me/1-cross-fade/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=1-cross-fade%2Fscript.js%3A1%3A0">Source</a>.</figcaption>
</figure>

Ok, a cross-fade isn't that impressive. Thankfully, transitions can be customized, but before we get to that, we need to understand how this basic cross-fade worked.

{% Aside %}
Demo links in this article are less visually impressive, but also have a tiny codebase. The goal is to make it easier to read and understand all of the code, without knowing any particular SPA framework.
{% endAside %}

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
   └─ ::view-transition-image-pair(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

The `::view-transition` sits in an overlay, over everything else on the page. This is useful if you want to set a background color for the transition.

`::view-transition-old(root)` is a screenshot of the old view, and `::view-transition-new(root)` is a **live** representation of the new view. Both render as CSS 'replaced content' (like an `<img>`).

The old view animates from `opacity: 1` to `opacity: 0`, while the new view animates from `opacity: 0` to `opacity: 1`, creating a cross-fade.

All of the animation is performed using CSS animations, so they can be customized with CSS.

{% Aside %}
The old and new views also have [`mix-blend-box: plus-lighter`](https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode), and the `::view-transition-image-pair` has [`isolation: isolate`](https://developer.mozilla.org/docs/Web/CSS/isolation). This is required to create a correct cross-fade. If you're interested in why, here's [far too many words on the topic](https://jakearchibald.com/2021/dom-cross-fade/).
{% endAside %}

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
    playsinline="true",
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
    playsinline="true",
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

To avoid this, you can extract the header from the rest of the page so it can be animated separately. This is done by assigning a `view-transition-name` to the element.

```css
.main-header {
  view-transition-name: main-header;
}
```

The value of `view-transition-name` can be whatever you want (except for `none`, which means there's no transition name). It's used to _uniquely_ identify the element across the transition.

{% Aside %}
`view-transition-name` must be unique. If two rendered elements have the same `view-transition-name` at the same time, the transition will be skipped.
{% endAside %}

And the result of that:

<figure>
  {% Video
    playsinline="true",
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
├─ ::view-transition-group(root)
│  └─ ::view-transition-image-pair(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
└─ ::view-transition-group(main-header)
   └─ ::view-transition-image-pair(main-header)
      ├─ ::view-transition-old(main-header)
      └─ ::view-transition-new(main-header)
```

There are now two transition groups. One for the header, and another for the rest. These can be targeted independently with CSS, and given different transitions. Although, in this case `main-header` was left with the default transition, which is a cross-fade.

Well, ok, the default transition isn't just a cross fade, the `::view-transition-group` also transitions:

- Position and transform (via a `transform`)
- Width
- Height

That hasn't mattered until now, as the header is the same size and position both sides of the DOM change. But we can also extract the text in the header:

```css
.main-header-text {
  view-transition-name: main-header-text;
  width: fit-content;
}
```

`fit-content` is used so the element is the size of the text, rather than stretching to the remaining width. Without this, the back arrow reduces the size of the header text element, whereas we want it to be the same size in both pages.

So now we have three parts to play with:

```diff
::view-transition
├─ ::view-transition-group(root)
│  └─ …
├─ ::view-transition-group(main-header)
│  └─ …
└─ ::view-transition-group(main-header-text)
   └─ …
```

But again, just going with the defaults:

<figure>
  {% Video
    playsinline="true",
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
View transitions use a flat structure. In the real DOM, the heading text was in the header. But, during the transition, their respective `::view-transition-group`s are siblings. This is really handy when animating items from one container to another, as you don't need to worry about clipping from parent elements.
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
    playsinline="true",
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
    playsinline="true",
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

## Custom entry and exit transitions

Look at this example:

<style>
  .enter-exit-video {
    aspect-ratio: 1400/776;
  }
</style>

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/uXSSraCaMIvu7nbWv0XS.mp4",
    class="enter-exit-video",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Entering and exiting sidebar. <a href="https://simple-set-demos.glitch.me/enter-exit-sidebar/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=enter-exit-sidebar%2Fstyles.css%3A1%3A0">Source</a>.</figcaption>
</figure>

The sidebar is part of the transition:

```css
.sidebar {
  view-transition-name: sidebar;
}
```

But, unlike the header in the previous example, the sidebar doesn't appear on all pages. If both states have the sidebar, the transition pseudo-elements look like this:

```diff
::view-transition
├─ …other transition groups…
└─ ::view-transition-group(sidebar)
   └─ ::view-transition-image-pair(sidebar)
      ├─ ::view-transition-old(sidebar)
      └─ ::view-transition-new(sidebar)
```

However, if the sidebar is only on the new page, the `::view-transition-old(sidebar)` pseudo-element won't be there. Since there's no 'old' image for the sidebar, the image-pair will only have a `::view-transition-new(sidebar)`. Similarly, if the sidebar is only on the old page, the image-pair will only have a `::view-transition-old(sidebar)`.

In the demo above, the sidebar transitions differently depending on whether it's entering, exiting, or present in both states. It enters by sliding from the right and fading in, it exits by sliding to the right and fading out, and it stays in place when it's present in both states.

To create specific entry and exit transitions, you can use the [`:only-child` pseudo-class](https://developer.mozilla.org/docs/Web/CSS/:only-child) to target the old/new pseudo-element when it's the only child in the image-pair:

<!-- prettier-ignore -->
```css
/* Entry transition */
::view-transition-new(sidebar):only-child {
  animation: 300ms cubic-bezier(0, 0, 0.2, 1) both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

/* Exit transition */
::view-transition-old(sidebar):only-child {
  animation: 150ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right;
}
```

In this case, there's no specific transition for when the sidebar is present in both states, since the default is perfect.

{% Aside %}
Support for `:only-child` on transition pseudo-elements was added in Chrome 110.
{% endAside %}

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
    playsinline="true",
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
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/gXiaS9IpE70fnv4kkrK5.mp4",
    class="aspect-ratio-change-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>One element transitioning to another, with an aspect ratio change. <a href="https://simple-set-demos.glitch.me/7-expanding-image-ratio/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=7-expanding-image-ratio%2Fstyles.css%3A59%3A0">Source</a>.</figcaption>
</figure>

In the default transition, the group animates from the before size to the after size. The old and new views are 100% width of the group, and auto height, meaning they keep their aspect ratio regardless of the group's size.

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
  /* Make the height the same as the group,
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
Animating width and height, as happens here on the `::view-transition-group`, is generally frowned upon in web performance circles as it runs layout per frame. However, for View Transitions, we plan to optimize it so it can run off the main thread in most cases. This optimization hasn't been implemented yet.
{% endAside %}

## Changing the transition depending on device state

You may want to use different transitions on mobile vs desktop, such as this example which performs a full slide from the side on mobile, but a more subtle slide on desktop:

<figure>
  {% Video
    playsinline="true",
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
  ::view-transition-group(*),
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
    playsinline="true",
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

## Transitioning without freezing other animations {:#transitioning-without-freezing}

Take a look at this demo of a video transitioning position:

<style>
  .not-freezing-demo {
    aspect-ratio: 1366/1584;
    max-width: 683px;
    max-height: 70vh;
  }
</style>

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/PdbIbficqb89NkKrBOBt.mp4",
    class="not-freezing-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Video transition. <a href="https://simple-set-demos.glitch.me/video/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=video%2Fstyles.css%3A2%3A21">Source</a>.</figcaption>
</figure>

Did you see anything wrong with it? Don't worry if you didn't. Here it is slowed right down:

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/gfErCErLjrbc5RdXUR43.mp4",
    class="not-freezing-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Video transition, slower. <a href="https://simple-set-demos.glitch.me/video/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=video%2Fstyles.css%3A2%3A21">Source</a>.</figcaption>
</figure>

During the transition, the video appears to freeze, then the playing version of the video fades in. This is because the `::view-transition-old(video)` is a screenshot of the old view, whereas the `::view-transition-new(video)` is a _live_ image of the new view.

You can fix this, but first, ask yourself if it's worth fixing. If you didn't see the 'problem' when the transition was playing at its normal speed, I wouldn't bother changing it.

If you really want to fix it, then don't show the `::view-transition-old(video)`; switch straight to the `::view-transition-new(video)`. You can do this by overriding the default styles and animations:

```css
::view-transition-old(video) {
  /* Don't show the frozen old view */
  display: none;
}

::view-transition-new(video) {
  /* Don't fade the new view in */
  animation: none;
}
```

And that's it!

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/n5BdihfhzitBSIak1KhM.mp4",
    class="not-freezing-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Video transition, slower. <a href="https://simple-set-demos.glitch.me/video/">Minimal demo</a>. <a href="https://glitch.com/edit/#!/simple-set-demos?path=video%2Fstyles.css%3A2%3A21">Source</a>.</figcaption>
</figure>

Now the video plays throughout the transition.

## Animating with JavaScript {:#animating-with-javascript}

So far, all the transitions have been defined using CSS, but sometimes CSS isn't enough:

<figure>
  {% Video
    playsinline="true",
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

  // Get the click position, or fallback to the middle of the screen
  const x = lastClick?.clientX ?? innerWidth / 2;
  const y = lastClick?.clientY ?? innerHeight / 2;
  // Get the distance to the furthest corner
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // With a transition:
  const transition = document.startViewTransition(() => {
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

The problem with this example is that `switchView()` will reject if the transition cannot reach a `ready` state, but that doesn't mean that the view failed to switch. The DOM may have successfully updated, but there were duplicate `view-transition-name`s, so the transition was skipped.

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

  await transition.updateCallbackDone;
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

This example uses `transition.updateCallbackDone` to wait for the DOM update, and to reject if it fails. `switchView` no longer rejects if the transition fails, it resolves when the DOM update completes, and rejects if it fails.

If you want `switchView` to resolve when the new view has 'settled', as in, any animated transition has completed or skipped to the end, replace `transition.updateCallbackDone` with `transition.finished`.

{% Aside %}
`updateCallbackDone` was previously `domUpdated`. It was renamed in Chrome 111.
{% endAside %}

## Not a polyfill, but… {:#not-a-polyfill}

I don't think this feature can be polyfilled in any useful way, but I'm happy to be proven wrong!

However, this helper function makes things much easier in browsers that don't support view transitions:

```js
function transitionHelper({
  skipTransition = false,
  classNames = [],
  updateDOM,
}) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});

    return {
      ready: Promise.reject(Error('View transitions unsupported')),
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition: () => {},
    };
  }

  document.documentElement.classList.add(...classNames);

  const transition = document.startViewTransition(updateDOM);

  transition.finished.finally(() =>
    document.documentElement.classList.remove(...classNames)
  );

  return transition;
}
```

And it can be used like this:

```js
function spaNavigate(data) {
  const classNames = isBackNavigation ? ['back-transition'] : [];

  const transition = transitionHelper({
    classNames,
    updateDOM() {
      updateTheDOMSomehow(data);
    },
  });

  // …
}
```

In browsers that don't support View Transitions, `updateDOM` will still be called, but there won't be an animated transition.

You can also provide some `classNames` to add to `<html>` during the transition, making it easier to [change the transition depending on the type of navigation](#changing-on-navigation-type).

You can also pass `true` to `skipTransition` if you don't want an animation, even in browsers that support View Transitions. This is useful if your site has a user preference to disable transitions.

## Working with frameworks

If you're working with a library or framework that abstracts away DOM changes, the tricky part is knowing when the DOM change is complete. Here's a set of examples, using the [helper above](#not-a-polyfill), in various frameworks.

- [React](https://codesandbox.io/s/nervous-mclaren-j8v8y0?file=/src/App.tsx)—the key here is [`flushSync`](https://beta.reactjs.org/reference/react-dom/flushSync), which applies a set of state changes synchronously. Yes, there's a big warning about using that API, but [Dan Abramov](https://twitter.com/dan_abramov) assures me it's appropriate in this case. As usual with React and async code, when using the various promises returned by `startViewTransition`, take care that your code is running with the correct state.
- [Vue.js](https://sfc.vuejs.org/#eNqNVduO2zYQ/ZWpimLlZCUZaYOiqr3YYhOgBXp7CAIEUR5oabTLmCIFXuw4jv89Q9KSvN7NxS/mZThn5szM0T75o+/zjcOkTBam1ry3YNC6/qqSvOuVtrAHje0lSPxgX/F6DQdoterggh5d/H5iZTWThluu5J8oetSjYV44y4XJ3xtvX8laSWOhVk5aWHrn6XxGFwCVbJ2svQfgstbYobQ3gjDTGey9wTlEGk4BmNnJGlzfMIsv/vtnMPe/AJNvmHD49GlACQ+2jNsxpTTCAxz838HvaLUoIh/EBG0sdr0g97QDWKyctRTlde2jW1bJ/XCr5Oqv4WBRRNv4ruEbqAUzht6EyMh0vw+rw2FR0DXZLYoTMNoauxN+eWc7ERNbsXp9q+lVU8JK0CbEXyuhdAk/tm0bM6hkHlkOj1olbdayjotdCYaIzAxq7k2JWGIiY4LfyhJqihp1OO5VZLsEtjJKOIvhmEtqkRKez3+COTBnVfThi9Mq3ZVx6RN4k2ZkFekN+IZ/xBKePd9sw9mG4zabqppJ1tF1CHpIoXgCN85YaqTJDp4Ulbxe467V9MCAVpbAMuWOqVo1NMBJUNEo/W3e4G2MiPwHiIeeuDxy5hv4i66yR3z5IpXleV5KNGnIanb5JROJ26NJBGQ0WSzcNE6HBfE2n3cmwE23kbLMsezcY8san8nllNTA6beCPI/gGxjE+whC63F8Qt8ml0mUiKxjPWmAkiQ1wT+NTbgwVVIOJFcJyYrfV8mdtb0pi8LJfn1LjdwV13RXaAqQd5g1qrv+OX+W//IrjY2xp+c5mi5babWlBifEKiHSR+cFHW5QZxplgxr1V8HObO8Bnt09AB26gggY9I8yxw9BLkehe1zSzJr3r6Z2X0LLhMGQRpCPf0OzLuHtu3A2Kh/tDsfq8RbSMzefPsEPjaqd16XcWKbtayrnZDDKZlTo6PWGCeH15oWSSIj/00Rwg7lGEoQNpieiO8vtHcqU1Hd5Bfsgo9Gdpg+KPk5U3LOGNGhy9R5rm77UWun0wod0wooBJ43rPWnYXMz8/EQnD6Mbr1ouublDEsevGN3npoQh7KPBYZhq/zeSNixeiiDueSjG39QNOWuaNM/jQajOkH7k8kS7lpO7R2owETo4mJ7mQ2J+QTntItcx4O+Ikb5Iikp2P0z/eoA6FmpC9KOcHD4DPLDcUA==)—the key here is [`nextTick`](https://vuejs.org/api/general.html#nexttick), which fulfills once the DOM has been updated.
- [Svelte](https://svelte.dev/repl/84cffc3241514c1581bf951bdf818def?version=3.55.1)—very similar to Vue, but the method to await the next change is [`tick`](https://svelte.dev/docs#run-time-svelte-tick).
- [Lit](https://lit.dev/playground/#project=W3sibmFtZSI6ImFwcC50cyIsImNvbnRlbnQiOiJpbXBvcnQge2h0bWwsIGNzcywgTGl0RWxlbWVudH0gZnJvbSAnbGl0JztcbmltcG9ydCB7Y3VzdG9tRWxlbWVudCwgcHJvcGVydHl9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB7IHRyYW5zaXRpb25IZWxwZXIgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuQGN1c3RvbUVsZW1lbnQoJ2RlbW8tYXBwJylcbmV4cG9ydCBjbGFzcyBEZW1vQXBwIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHN0YXRpYyBzdHlsZXMgPSBjc3NgXG4gICAgLmNvdW50IHtcbiAgICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgaW5zZXQ6IDUwJSAwIGF1dG87XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgICBmb250LXNpemU6IDI1dnc7XG4gICAgICB2aWV3LXRyYW5zaXRpb24tbmFtZTogY291bnQ7XG4gICAgICAvKiBUaGlzIHdvbid0IGJlIHJlcXVpcmVkIHNvb24uIEluIGZhY3QsIGl0IGFscmVhZHkgd29ya3Mgd2l0aG91dCB0aGlzIGluIENhbmFyeSAqL1xuICAgICAgY29udGFpbjogbGF5b3V0O1xuICAgIH1cbiAgYDtcbiAgXG4gIGluY3JlbWVudENsaWNrKCkge1xuICAgIHRyYW5zaXRpb25IZWxwZXIoe1xuICAgICAgdXBkYXRlRE9NOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEBwcm9wZXJ0eSgpXG4gIGNvdW50ID0gMDtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8YnV0dG9uIEBjbGljaz0ke3RoaXMuaW5jcmVtZW50Q2xpY2t9PkluY3JlbWVudDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cImNvdW50XCI-JHt0aGlzLmNvdW50fTwvZGl2PlxuICAgIGA7XG4gIH1cbn1cbiJ9LHsibmFtZSI6ImluZGV4Lmh0bWwiLCJjb250ZW50IjoiPCFET0NUWVBFIGh0bWw-XG48aGVhZD5cbiAgPHN0eWxlPlxuICAgIGh0bWwge1xuICAgICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG5cbiAgICAvKiBDdXN0b20gdHJhbnNpdGlvbiAqL1xuICAgIEBrZXlmcmFtZXMgcm90YXRlLW91dCB7XG4gICAgICB0byB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIHJvdGF0ZS1pbiB7XG4gICAgICBmcm9tIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBodG1sOjp2aWV3LXRyYW5zaXRpb24tb2xkKGNvdW50KSxcbiAgICBodG1sOjp2aWV3LXRyYW5zaXRpb24tbmV3KGNvdW50KSB7XG4gICAgICBhbmltYXRpb24tZHVyYXRpb246IDIwMG1zO1xuICAgICAgYW5pbWF0aW9uLW5hbWU6IC11YS12aWV3LXRyYW5zaXRpb24tZmFkZS1pbiwgcm90YXRlLWluO1xuICAgIH1cblxuICAgIGh0bWw6OnZpZXctdHJhbnNpdGlvbi1vbGQoY291bnQpIHtcbiAgICAgIGFuaW1hdGlvbi1uYW1lOiAtdWEtdmlldy10cmFuc2l0aW9uLWZhZGUtb3V0LCByb3RhdGUtb3V0O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiLi9hcHAuanNcIj48L3NjcmlwdD5cbjwvaGVhZD5cbjxib2R5PlxuICA8ZGVtby1hcHA-PC9kZW1vLWFwcD5cbjwvYm9keT4ifSx7Im5hbWUiOiJwYWNrYWdlLmpzb24iLCJjb250ZW50Ijoie1xuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJsaXRcIjogXCJeMi4wLjBcIixcbiAgICBcIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiOiBcIl4xLjAuMFwiLFxuICAgIFwibGl0LWVsZW1lbnRcIjogXCJeMy4wLjBcIixcbiAgICBcImxpdC1odG1sXCI6IFwiXjIuMC4wXCJcbiAgfVxufSIsImhpZGRlbiI6dHJ1ZX0seyJuYW1lIjoidXRpbHMudHMiLCJjb250ZW50IjoiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zaXRpb25IZWxwZXIoe1xuICBza2lwVHJhbnNpdGlvbiA9IGZhbHNlLFxuICBjbGFzc05hbWVzID0gW10sXG4gIHVwZGF0ZURPTSxcbn0pIHtcbiAgaWYgKHNraXBUcmFuc2l0aW9uIHx8ICFkb2N1bWVudC5zdGFydFZpZXdUcmFuc2l0aW9uKSB7XG4gICAgY29uc3QgdXBkYXRlQ2FsbGJhY2tEb25lID0gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZURPTSgpKS50aGVuKCgpID0-IHt9KTtcbiAgICBjb25zdCByZWFkeSA9IFByb21pc2UucmVqZWN0KEVycm9yKCdWaWV3IHRyYW5zaXRpb25zIHVuc3VwcG9ydGVkJykpO1xuXG4gICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgd2l0aCB0aGlzIGVycm9yIHVubGVzcyB0aGUgcHJvbWlzZSBpcyB1c2VkLlxuICAgIHJlYWR5LmNhdGNoKCgpID0-IHt9KTtcblxuICAgIHJldHVybiB7XG4gICAgICByZWFkeSxcbiAgICAgIHVwZGF0ZUNhbGxiYWNrRG9uZSxcbiAgICAgIGZpbmlzaGVkOiB1cGRhdGVDYWxsYmFja0RvbmUsXG4gICAgICBza2lwVHJhbnNpdGlvbjogKCkgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuXG4gIGNvbnN0IHRyYW5zaXRpb24gPSBkb2N1bWVudC5zdGFydFZpZXdUcmFuc2l0aW9uKHVwZGF0ZURPTSk7XG5cbiAgdHJhbnNpdGlvbi5maW5pc2hlZC5maW5hbGx5KCgpID0-XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lcylcbiAgKTtcblxuICByZXR1cm4gdHJhbnNpdGlvbjtcbn0ifV0)—the key here is the [`this.updateComplete`](https://lit.dev/docs/v1/components/lifecycle/#updatecomplete) promise within components, which fulfills once the DOM has been updated.
- [Angular](https://stackblitz.com/edit/angular-bp4pvy?file=src%2Fmain.ts)—the key here is [`applicationRef.tick`](https://angular.io/api/core/ApplicationRef#tick), which flushes pending DOM changes.

## API reference {:#api-reference}

`const viewTransition = document.startViewTransition(updateCallback)`
: Start a new `ViewTransition`.

    `updateCallback` is called once the current state of the document is captured.

    Then, when the promise returned by `updateCallback` fulfills, the transition begins in the next frame. If the promise returned by `updateCallback` rejects, the transition is abandoned.

Instance members of `ViewTransition`:

`viewTransition.updateCallbackDone`
: A promise that fulfills when the promise returned by `updateCallback` fulfills, or rejects when it rejects.

    The View Transition API wraps a DOM change and creates a transition. However, sometimes you don't care about the success/failure of the transition animation, you just want to know if and when the DOM change happens. `updateCallbackDone` is for that use-case.

    {% Aside %}
    `updateCallbackDone` was previously `domUpdated`. It was renamed in Chrome 111.
    {% endAside %}

`viewTransition.ready`
: A promise that fulfills once the pseudo-elements for the transition are created, and the animation is about to start.

    It rejects if the transition cannot begin. This can be due to misconfiguration, such as duplicate `view-transition-name`s, or if `updateCallback` returns a rejected promise.

    This is useful for [animating the transition pseudo-elements with JavaScript](#animating-with-javascript).

`viewTransition.finished`
: A promise that fulfills once the end state is fully visible and interactive to the user.

    It only rejects if `updateCallback` returns a rejected promise, as this indicates the end state wasn't created.

    Otherwise, if a transition fails to begin, or is skipped during the transition, the end state is still reached, so `finished` fulfills.

`viewTransition.skipTransition()`
: Skip the animation part of the transition.

    This won't skip calling `updateCallback`, as the DOM change is separate to the transition.

## Default style and transition reference

`::view-transition`
: The root pseudo-element which fills the viewport and contains each `::view-transition-group`.

`::view-transition-group`
: Absolutely positioned.

    Transitions `width` and `height` between the 'before' and 'after' states.

    Transitions `transform` between the 'before' and 'after' viewport-space quad.

`::view-transition-image-pair`
: Absolutely positioned to fill the group.

    Has `isolation: isolate` to limit the effect of the `plus-lighter` blend mode on the old and new views.

`::view-transition-new` and `::view-transition-old`
: Absolutely positioned to the top-left of the wrapper.

    Fills 100% of the group width, but has an auto height, so it will maintain its aspect ratio rather than filling the group.

    Has `mix-blend-mode: plus-lighter` to allow for a true cross-fade.

    The old view transitions from `opacity: 1` to `opacity: 0`. The new view transitions from `opacity: 0` to `opacity: 1`.

## Feedback

Developer feedback is really important at this stage, so please [file issues on GitHub](https://github.com/w3c/csswg-drafts/labels/css-view-transitions-1) with suggestions and questions.

---
layout: 'layouts/blog-post.njk'
title: Smooth and simple page transitions with the shared element transition API
authors:
  - jakearchibald
description: >
  The shared element transition API allows page transitions within single-page apps, and is available as an origin trial now!
date: 2021-08-17
updated: 2021-08-18
hero: image/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/6bO4bz5DfFIZxiBMd1oW.jpg
alt: A layout plan for a web page.
---

The Shared Element Transition API makes it easy to change the DOM in a single step, while creating an animated transition between the two states.

It's currently behind the `chrome://flags/#document-transition` flag, but you can experiment with it in production via the [origin trial](https://developer.chrome.com/origintrials/#/view_trial/1762033354208706561).

<style>
  .video-full-demo {
    aspect-ratio: 1520 / 1054;
  }
</style>

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/hgnJfPFUbGlucFegEEtl.mp4",
    width="1520",
    height="1054",
    class="video-full-demo",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Transitions created with the Shared Element Transition API. <a href="https://http203-playlist.netlify.app/">Try the demo site</a> – Requires Chrome 104+ and the <code>chrome://flags/#document-transition</code> flag.</figcaption>
</figure>

## Why do we need this feature?

Page transitions look great, but they also communicate direction of flow, and make it clear which elements are related from page to page. They can even happen during data fetching, leading to a perception of better performance.

But, we already have animation tools on the web. We've already got [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations), and the [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), why do we need a new thing to move stuff around?

The truth is, state transitions are hard, even with the tools we already have.

Even something like a simple cross-fade involves both states being present at the same time. That presents usability challenges, such as handling additional interaction on the outgoing element. Also, for users of assistive devices, there's a period where both the before and after state are in the DOM, and after state may move around the tree.

Handling state changes is particularly challenging if one page is scrolled, and the other is scrolled to a different position. And, if an element is moving from one container to another, you can run into difficulties with `overflow: hidden` and other forms of clipping, meaning you have to restructure your CSS to get the effect you want.

It isn't impossible, it's just _really hard_.

Also, although the current implementation targets single page apps (SPAs), the feature will be expanded to allow for transitions between full page loads, which is currently impossible.

## The simplest transition: A cross-fade

The default transition in this API is a cross-fade, so it serves as a nice introduction to the API:

```js
async function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.createDocumentTransition) {
    await updateTheDOMSomehow(data);
    return;
  }

  // With a transition
  const transition = document.createDocumentTransition();
  await transition.start(() => updateTheDOMSomehow(data));
  console.log('Transition complete!');
}
```

Where `updateTheDOMSomehow` changes the DOM to the new state. It can do that however you want: Add/removing elements, changing class names, changing styles… it doesn't matter.

And just like that, pages cross-fade:

<style>
  .phone-demo {
    aspect-ratio: 4 / 3;
  }
</style>

<figure>
  {% Video
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/ldmGWK8LbaY0JoICEskt.mp4",
    class="phone-demo",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

Here's a [somewhat minimal demo](https://simple-set-demos.glitch.me/1-cross-fade/) of the cross-fade.

## Notes

- Super simple demos of each thing!

- The simplest transition: Cross-fade
  - Code sample
  - http-203-playlist video
  - Link to full demo, link to super simple demo
  - You can do way more than a fade, but first need to understand how this all worked
- How did that happen?
  - When call `.start`, it captured current state
  - Then called our callback, which made the DOM change
  - Then the browser captured the new state, and constructed a pseudo element tree like this:
  - (display it in a code block like devtools does)
  - (document the default animation like in the developer guide)
  - Note: Outgoing image is static, incoming image is live
- Simple customisation
  - All of the parts can be accessed as pseudoelements
  - A longer fade
    - (code to increase animation duration)
    - (video of demo)
    - Link to full demo, link to super simple demo
  - Sliding from the right
    - DO THE MATERIAL VERSION
    - (code to increase animation duration)
    - (video of demo)
    - Link to full demo, link to super simple demo
- Transitioning multiple elements
  - https://github.com/WICG/shared-element-transitions/blob/main/developer-guide.md#transitioning-multiple-elements
  - So far, whole page, but can extract it
  - (code example)
  - Now the page is captured in two parts
  - New pseudo tree
  - (video of demo)
  - Link to full demo, link to super simple demo
  - Note: flat structure
- Default transition
  - Animate text in header
  - Detail default animation
  - Plus-lighter details
- Debugging transitions
  - Animation panel & elements panel
- Transitioning elements don't need to be the same dom node
  - In the example above, the header is the same DOM node before and after
  - But that isn't required
  - As long as they have the same page-transition-tag, they'll be treated as the same thing
  - Thumbnail to big demo
  - Simple demo
- Detailed customization
  - https://github.com/WICG/shared-element-transitions/blob/main/developer-guide.md#using-object-fit-and-object-position
  - 4:3 to 16:9 demo (object fit etc)
  - Again avoiding plus lighter
- Animating with JavaScript
  - Circle wipe demo
  - New API is better at this
- Be kind: reduced motion
- API guide
- Origin trial

## Acknowledgements

Hero image by [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com/photos/4UGmm3WRUoQ).

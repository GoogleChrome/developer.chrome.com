---
layout: 'layouts/blog-post.njk'
title: Smooth and simple page transitions with the shared element transition API
authors:
  - jakearchibald
description: >
  The shared element transition API allows page transitions within single-page apps, and is available as an origin trial now! Navigation transitions between pages and sites are coming later.
date: 2021-08-17
updated: 2021-08-18
hero: image/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/6bO4bz5DfFIZxiBMd1oW.jpg
alt: A layout plan for a web page.
---

When you navigate around apps on your phone, there's usually some sort of transition, from a simple fade or slide from one screen to another, to more complex transitions that move different elements independently:

{% Video
  src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/jpLZi7FV8lRq3yI18bTr.mp4",
  loop=true,
  muted=true,
  playsinline=true,
  controls=true,
  height=500
%}

Although, on the web, we don't tend to get those kinds of effects. Creating a transition from one page to another after clicking a link is, well, impossible. But, it isn't exactly easy within a single-page app either.

Even in a simple case, where content fades from one screen to another, it means rendering your page with both states at once, performing a cross-fade, then removing the old state.

This is harder than it sounds. You need to make sure that the outgoing page can't receive additional interactions, and that the outgoing state doesn't jank the transition by updating its own state. You also need to ensure the presence of both states doesn't create a confusing experience for those using accessibility technology.

Platforms like Android and iOS have tools to make this stuff easier, so why can't we? That's where the shared element transitions API comes in! It's a [proposal we're working on](https://github.com/WICG/shared-element-transitions/) that provides a high-level way to transition between page states.

Here it is in action in a remix of the Preact website:

{% Video
  src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/63bGGDsvP2sE7b009F6w.mp4",
  loop=true,
  muted=true,
  playsinline=true,
  controls=true
%}

[Here's the live version of the demo](https://preact-with-nav-transitions.netlify.app/).

## How to use shared element transitions

Enable `#document-transition` in `about:flags` to experiment locally without an origin trial token.

### Enabling support during the origin trial phase

Starting in Chromium 92, the shared element transition API is available as an origin trial in Chromium. The origin trial is expected to end in Chromium 94.

Origin trials allow you to try new features and give feedback on their usability, practicality, and effectiveness to the web standards community. For more information, see the [Origin Trials Guide for Web Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md). To sign up for this or another origin trial, visit the [registration page](https://developers.chrome.com/origintrials/#/trials/active).

### Register for the origin trial

1. [Request a token](/origintrials/#/view_trial/451485862643892225) for your origin.
2. Add the token to your pages. There are two ways to do that:
    - Add an origin-trial `<meta>` tag to the head of each page. For example, this may look something like:

      `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
    - If you can configure your server, you can also add the token using an `Origin-Trial` HTTP header. The resulting response header should look something like:

      `Origin-Trial: TOKEN_GOES_HERE`

### Feature detection

The presence of `documentTransition` on `document` indicates support for this API.

```js
if ('documentTransition' in document) {
  // Feature supported
}
```

## The API

The transitions have two forms, simple transitions, and more complex "shared element" transitions.

### Simple transitions

```js
// When the user clicks on a link/button:
async function navigateToSettingsPage() {
  // Capture the current state.
  await document.documentTransition.prepare({
    rootTransition: 'cover-left',
  });

  // This is a function within the web app that updates the DOM:
  updateDOMForSettingsPage();

  // Start the transition.
  await document.documentTransition.start();
  // Transition complete!
}
```

To perform transitions, you:

1. Call the `prepare()` function to capture the current visual state.
1. Update the DOM to represent the new page.
1. Call `start()` to perform the transition.

`rootTransition` controls the style of the transition.

[Here's a live demo of the styles that are currently available](https://root-transitions-demo.glitch.me/).

#### Limitations of simple transitions

**Animations suddenly stop on the outgoing DOM.** The outgoing DOM is captured as a single frame, meaning that things like gifs and CSS animations will freeze. This is by design, and unlikely to change. This only impacts the outgoing DOM; the new DOM will animate as usual.

**The transition applies to the whole document.** You can't limit the transition to some inner-UI. This feature may be added in future.

**The naming is currently directional, for example, `cover-left`.** This will be changed to match [CSS logical properties](https://web.dev/learn/css/logical-properties/), so `start` and `end` will be used rather than `left` and `right`, and `inline` and `block` will be used to refer to the axis, allowing the API to react to the writing mode of the page.

**Control over the transition is limited.** You can't control the length or other properties of the transition. This will change in future versions of the API, although this will always be limited to things that can be done with a screenshot of state, such as transforms, opacity, and crops.

### Shared element transitions

Shared element transitions build on top of simple transitions by letting you specify elements to transition independently. This is how the header in the following example stays static during these transitions:

{% Video
  src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/63bGGDsvP2sE7b009F6w.mp4",
  loop=true,
  muted=true,
  playsinline=true,
  controls=true
%}

But they don't need to stay static. They can also move independently of the root transition.

Here's how it's done:

```js
// When the user clicks on a link/button:
async function navigateToSettingsPage() {
  // Capture and visually freeze the current state.
  await document.documentTransition.prepare({
    rootTransition: 'cover-up',
    sharedElements: [element1, element2, element3],
  });
  // This is a function within the web app:
  updateDOMForSettingsPage();
  // Start the transition.
  await document.documentTransition.start({
    sharedElements: [element1, element4, element5],
  });
  // Transition complete!
}
```

`sharedElements` is the difference here, both in the prepare step and the start step.

In this case, `element1` will animate independently from the rest of the page, moving from its original position and size to its end position and size (or staying still if it doesn't move).

The elements don't need to be the same node. In this case, `element2` will transition to `element4`, because they're each second in the provided array.

#### Limitations of shared element transitions

**When an element becomes 'shared', it shouldn't render on the background too, but right now it does**. This creates "ghosting" effects on elements that should appear static. This has been fixed, but hasn't made it to stable yet.

**Shared transition elements will render on top of other elements.** If other elements render on top of the transitioned elements, they'll pop underneath for the transition. We're not sure yet if this should be a general limitation, or if it should be fixed.

**Shared transition elements must have [`contain: paint`](https://web.dev/content-visibility/#containment).** This makes it difficult to transition elements that have paint effects outside their content rectangle, such as shadows, blurs, and outlines. Hopefully this will change in future.

**Shared transition elements cannot have background effects.** Things like [`mix-blend-mode`](https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode) and [`backdrop-filter`](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter) won't interact correctly with the background during a transition.

**Control over the transition is limited.** Right now, when one element transitions to another, their "screenshots" quickly cross-fade while they scale and translate into position. Future versions of the API will add additional configuration, but this will always be limited to things that can be done with a screenshot of state, such as transforms, opacity, and crops.

## In future: Multi-page apps

Transitions between pages is currently impossible, but this API intends to fix that.

It's currently unclear how the API would look, but you can [follow along with the discussion on GitHub](https://github.com/WICG/shared-element-transitions/issues/2).

## In future-er: Multi-page cross-origin apps

The cross-origin story is more complicated. Even though a page transition has a limited timeframe, it would still be giving one site brief visual control over another, which is risky. Cross-origin page transitions will either come with restrictions, or require some sort of agreement between the two origins, perhaps using headers.

For more details on the problem, and to follow along with discussions, see [the GitHub issue](https://github.com/WICG/shared-element-transitions/issues/44).

## Feedback

We're looking for feedback on the direction of this API.

### Tell us what you think about the feature

Does it do what you need? Is it missing something important? Please let us know your thoughts in the [GitHub repo for the feature](https://github.com/WICG/shared-element-transitions).

### Report problems

Did you find a bug with Chromium's implementation? File a bug at [new.crbug.com](https://new.crbug.com). Be sure to include as much detail as you can, simple instructions for reproducing, and mention "shared element transitions" in your bug report. [Glitch](https://glitch.com) works great for sharing quick and easy test cases.

## Acknowledgements

Hero image by [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com/photos/4UGmm3WRUoQ).

---
layout: 'layouts/blog-post.njk'
title: SPA view transitions land in Chrome 111
description: >
  The View Transition API allows page transitions within single-page apps, and will later include multi-page apps.
date: 2023-03-09
authors:
  - jakearchibald
hero: 'image/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/nR4JNO8pelD4mGP3dQbr.jpg'
alt: >
  The Chrome DevTools animation timeline, showing a view transition.
sharing_image: 'image/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/nR4JNO8pelD4mGP3dQbr.jpg'
---

The View Transition API lets you update the DOM in a single step, while generating an animated transition between the two states.

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
  <figcaption>Transitions created with the View Transition API. <a href="https://http203-playlist.netlify.app/">Try the demo site</a>–Requires Chrome 111+.</figcaption>
</figure>

These kinds of transitions were a frequently-requested feature from developers, including me, and I think we've managed to land it in a way that balances good defaults with extensibility and customization. That sounds like we're patting ourselves on the back, but [developer](https://twitter.com/DavidKPiano/status/1428043899482824710) [feedback](https://twitter.com/jods16/status/1428434783441494023) was key to the design of this feature. [An earlier prototype](https://github.com/WICG/view-transitions/tree/92ea1f3e8cd5e16099b288838644d04c6cb08b61) of this feature was much less flexible, and folks (like you?) who took the time to play with the prototypes and provide feedback triggered a total rethink. Thank you!

To get to grips with the feature, and play with some demos, [check out our guide](/docs/web-platform/view-transitions/). If there's something you feel isn't covered there, please [reach out to me on Twitter](https://twitter.com/jaffathecake), [Mastodon](https://mastodon.social/@jaffathecake), or [via email](mailto:view-transitions-api@chromium.org).

The View Transition API is currently only available in Chrome; thankfully it can be used as a progressive enhancement. The guide includes [a helper function](/docs/web-platform/view-transitions/#not-a-polyfill) that you can use across browsers, but only browsers that support view transitions will get the animation.

We [developed this feature within the CSS Working Group](https://drafts.csswg.org/css-view-transitions-1/), with input from other browser vendors and independents. We don't know if or when other browsers will adopt View Transitions, but keep an eye on [Mozilla's standards position](https://github.com/mozilla/standards-positions/issues/677), and [WebKit's standards position](https://github.com/WebKit/standards-positions/issues/48).

## But, we're not 'done' yet!

The functionality landing in Chrome 111 is just the first release. We hope we've already found all the bugs, but please file any issues you find at [crbug.com](http://crbug.com/new), preferably with a reduced demo. If that's not something you're familiar or comfortable with, [reach out to me on Twitter](https://twitter.com/jaffathecake), [Mastodon](https://mastodon.social/@jaffathecake) or [via email](mailto:view-transitions-api@chromium.org), and I'll help.

This release is a small-but-hopefully-useful part of a bigger picture. We've already sketched some extensions to this feature to ensure the parts we're shipping today are future-compatible.

Here's a sneak preview of what we're thinking. These aren't in priority order (well, maybe the first one is the most important for a lot of folks), so we'd love feedback on which additions are the most important to you.

### Transitions across documents

This is the one I think most developers want us to work on next, and the good news is that we're already working on it!

The View Transitions API was designed so it can work across same-origin documents. The only difference is, instead of `startViewTransition` signaling the DOM state change, the navigation itself will signal that change.

Our prototype of this behind the `chrome://flags/#view-transition-on-navigation` flag. Here's a [super-simple demo](https://simple-set-demos.glitch.me/mpa/), and a [more complex demo](https://deploy-preview-28--http203-playlist.netlify.app/).

To move this forward we need to figure out how each page opts into the transition. Right now we're using a meta tag: `<meta name="view-transition" content="same-origin">`, but we think CSS is a better place for this. We also want to make it easier to know what kind of page you're transitioning from, preferably without needing to write JavaScript.

There's lots of work to do, and we'd rather land it 'right' than 'fast', but it's definitely a priority for us.

### Compositor-driven animations

We chose to animate width and height on transition groups by default because it's much easier to customize. However, this means the animation runs on the main thread, which isn't ideal, particularly during page loads.

We plan to detect the default animations and common customizations, then reinterpret them as compositor-driven animations for a nice performance boost.

### Scoped transitions

Right now, SPA transitions are scoped to the whole document, and only one transition can run at a time. We want to introduce a feature that allows transitions to be scoped to a particular element so that multiple page components can run transitions independently.

This would allow, say, an embedded video player to use view transitions, at the same time as an embedded chat widget.

### Nested transition groups

Right now, all `::view-transition-group`s are siblings. This is often a good thing, as it allows views to transition from one container to another, and you don't have to worry about clipping.

However, sometimes you want a view to be clipped by some parent, which may also be involved in the transition.

We want to investigate an opt-in that places a particular `::view-transition-group` within another `::view-transition-group`.

### Classes of transitions

Each `view-transition-name` must be unique. That's how we identify that a particular element is conceptually "the same" on either side of the DOM change, even if it isn't literally the same element.

However, sometimes things with different `view-transition-name`s should use the same kind of animation. Right now, this means adding a selector rule for every `view-transition-name`.

We'd like to add a way to create [classes of transitions](https://github.com/w3c/csswg-drafts/issues/8319) to overcome this limitation.

### Ignore offscreen elements

If you give an element a `view-transition-name`, it will be involved in the transition as its own group. Sometimes this isn't ideal. For example, if you give a header a `view-transition-name`, and you go from a state where you're scrolled down by 2000 pixels, to a state at the top of the page, the header will animate from 2000 pixels away, which feels wrong in terms of timing.

Instead, we'd like to add an opt-in where [an element will be ignored](https://github.com/w3c/csswg-drafts/issues/8282), as if it doesn't have a `view-transition-name`, if it's entirely outside the viewport.

You can already do this with JavaScript by dynamically setting `style.viewTransitionName`, but it feels like we should have a declarative solution for this.

### requestAnimationFrame-driven animations

You can already [create view transition animations with JavaScript](/docs/web-platform/view-transitions/#animating-with-javascript) via the [web animations API](https://developer.mozilla.org/docs/Web/API/Web_Animations_API), but sometimes you need to drive things frame-by-frame with <code>[requestAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame)</code>.

You can already do that, but it's a bit hacky. [Here's a demo](https://simple-set-demos.glitch.me/raf/) with some helpers you might find useful. We want to make it not-hacky!

We’ll do this in two parts. One, by providing an API to [indicate when the animation is done](https://github.com/w3c/csswg-drafts/issues/8132). And two, by [providing JavaScript access to pseudo-elements](https://www.w3.org/TR/css-pseudo-4/#CSSPseudoElement-interface). That second part might be a pretty big job, but it feels like the right thing to do in the long term.

## Now go make some great view transitions!

Hopefully, like me, you're excited about the present and future of this feature. If you have any feedback, or just want to show off some view transitions you made, be they [smooth and functional](https://twitter.com/jaffathecake/status/1630156449610362885), or just [plain](https://twitter.com/jaffathecake/status/1626161752827199489) [silly](https://twitter.com/jaffathecake/status/1621949535437164546), please [reach out to me on Twitter](https://twitter.com/jaffathecake) or [Mastodon](https://mastodon.social/@jaffathecake)!

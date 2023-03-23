---
layout: layouts/blog-post.njk
title: Scrollend, a new JavaScript event
description: >
  Delete your timeout functions and shake off their bugs, here's the event you really need: scrollend.
subhead: >
  Delete your timeout functions and shake off their bugs, here's the event you really need: scrollend.
date: 2023-01-25
authors:
  - argyle
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/TuLoDVklwlps4Akyo9TN.jpg
alt: >
  END is written on the pavement of a street.
---

Before the `scrollend` event, there was no reliable way to detect that a scroll
was complete. This meant that events would fire late or while a user's finger
was still down on the screen. This unreliability in knowing when scroll has
actually ended, led to bugs and a poor experience for the user.

{% Compare 'worse', 'before' %}
```js
document.onscroll = event => {
  clearTimeout(window.scrollEndTimer)
  window.scrollEndTimer = setTimeout(callback, 100)
}
```
{% endCompare %}

The best this `setTimeout()` strategy can do is know if scroll has stopped for
`100ms`. This makes it more like a scroll has paused event, not a scroll has
ended event.

After the
[`scrollend`](https://developer.mozilla.org/docs/Web/API/Document/scrollend_event)
event, the browser does all this difficult evaluation for you.

{% Compare 'better', 'after' %}
```js
document.onscrollend = event => {…}
```
{% endCompare %}

That's the good stuff. Perfectly timed and packed full of meaningful conditions
before emitting.

{% BrowserCompat 'api.Document.scrollend_event' %}

**Try it!**

{% Codepen { user: 'web-dot-dev', id: 'rNrJRKg' } %}

## Event details

The `scrollend` event fires when:
- The browser is no longer animating or translating scroll.
- The user's touch has been released.
- The user's pointer has released the scroll thumb.
- The user's keypress has been released.
- Scroll to fragment has completed.
- Scroll snap has completed.
- `scrollTo()` has completed.
- The user has scrolled the visual viewport.

The `scrollend` event does not fire when:
- A user's gesture did not result in any scroll positional changes (no translation occurred).
- `scrollTo()` did not result in any translation.

A reason this event took so long to come to the web platform was due to the many
small details that needed specification details. One of the most complex areas
was articulating the `scrollend` details for the [Visual
Viewport](https://developer.mozilla.org/docs/Web/API/Visual_Viewport_API)
versus the document. Consider a webpage that you zoom in on. You can scroll
around when in this zoomed state, and it's not necessarily scrolling the
document. Rest assured that even this visual viewport user driven scroll
interaction will emit the `scrollend` event once it completes.

## Using the event

Like other scroll events, you can register listeners in a couple ways.

```js
addEventListener("scrollend", (event) => {
  // scroll ended
});

aScrollingElement.addEventListener("scrollend", (event) => {
  // scroll ended
});
```

or, use the event property:

```js
document.onscrollend = (event) => {
  // scroll ended
};

aScrollingElement.onscrollend = (event) => {
  // scroll ended
};
```

## Polyfills and progressive enhancement

If you're looking to use this new event now, here's our best advice. You can
continue using your current scroll end strategy (if you have one) and at the
beginning of it check support with:

```js
'onscrollend' in window
// true, if available
```

That will report true or false depending if the browser offers the event. With
this check, you can branch the code:

```js
if ('onscrollend' in window) {
  document.onscrollend = callback
}
else {
  document.onscroll = event => {
    clearTimeout(window.scrollEndTimer)
    window.scrollEndTimer = setTimeout(callback, 100)
  }
}
```

That's a healthy start to progressively enhancing your `scrollend` event when it
is available. You could also try a
[polyfill](https://github.com/argyleink/scrollyfills)
([NPM](https://www.npmjs.com/package/scrollyfills)) I made that does the best
the browser can:

```js
import {scrollend} from "scrollyfills"

// then use scrollend as if it's existed this whole time
document.onscrollend = callback
```

The polyfill will progressively enhance to use the browser built-in `scrollend`
event if available. If it's not available, the script watches pointer events and
scroll to do the best estimation of the event ending it can.

## Use cases

It's a good practice to avoid computationally heavy work while scrolling is
happening. This practice ensures scrolling is free to use as much memory and
processing as it can to keep the experience smooth. Using a `scrollend` event
provides the perfect time to call out and do the hard work, because scrolling is
no longer happening.

The `scrollend` event can be used to trigger various actions. A common use case
is synchronizing associated UI elements with the position that the scroll
stopped. For example:
- Syncing a carousel scroll position with a dot indicator.
- Syncing a gallery item with its meta data.
- Fetching data after a user scrolls to a new tab.

Imagine a scenario such as a user swiping away an email. After they finish
swiping you can then perform the action based on where they scrolled to.

You could also use this event for synchronizing after programmatic or user
scroll, or actions such as logging analytics.

Here's a good example where multiple elements such as arrows, dots, and focus,
need to be updated based on the scroll position. [Watch how I built this
carousel on YouTube](https://www.youtube.com/watch?v=CXJv6zM003M). Also, [try
the live demo](https://gui-challenges.web.app/carousel/dist/).

{% Video
  src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/PGdinjGQgGv3XclM4wqs.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}

Thanks to Mehdi Kazemi for their engineering work on this and [Robert
Flack](https://twitter.com/flackrw) for API and implementation guidance.

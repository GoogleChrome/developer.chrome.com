---
title: Changes to NavigateEvent in Chrome 105
description: >
  The Navigation API gets two new methods on NavigateEvent: intercept() replaces transitionWhile() and scroll() replaces restoreScroll().
layout: 'layouts/blog-post.njk'
date: 2022-08-04
tags:
  - chrome-105
  - capabilities
authors:
  - joemedley
---

Intro [TBD]

## NavigateEvent.transitionWhile()

The `NavigateEvent.trasitionWhile()` method, introduced with the Navigation API in Chrome 102, intercepts navitation for client-side transitions in single page apps. Its first argument is a promise that signals to browser and to other parts of the web application that it's finished.

This worked poorly in practice. Consider this common coding pattern:

```js
event.transitionWhile((async () => {
  doSyncStuff();
  await doAsyncStuff();
})());
```

This is functionally equivalent to the code below. It causes some portion of the navigation to run before the navigation is even finished.

```js
doSyncStuff();
event.transitionWhile((async () => {
  await doAsyncStuff();
})());
```

One example where this can mess up an app is in scroll restoration logic where it acts on the DOM before the navigation transition instead of after. 

### What's changed

In lieu of `transitionWhile()`, the current spec introduces `NavigateEvent.intercept()`. The new method takes a handler in addition the `focusReset` and `scrollRestoration` supported by `transitionWhile()`. The new handler always runs after the navigation completes, avoiding the problems with `transitionWhile()`.

The `transitionWhile()` method is still available, but it has been deprecated and will be removed in Chrome 108.

### Using intercept()

The `NavigateEvent.intercept()` cannot be used on all events. If the current `Document` object has a URL that can rewritten to a destination URL, intercept may be called. You can't call it on cross-document back/forward navigations. Doing so will throw a [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) of the `"SecurityError"` type.

To use `intercept()`, simply pass your custom handler when calling. 

```js
navigation.addEventListener("navigate", event => {
  event.intercept({
    handler() {
      return new Promise(resolve => setTimeout(resolve, 1000));
    }
  });
});
```

## NavigateEvent.scroll()

A navigation such as one from the top of the page to an anchor (call it moving from /a to /a#id) is handled completely by the browser even in a single page app. But navigating to an anchor on another 'page' (/a to /b#id), which is simple for multi page apps, is more complicated. The app has to intercept the navigation to /b#id using `NavigateEvent.transitionWhile()`, then call `NavigateEvent.restoreScroll()` to bring the anchor into view. As stated above, this is currently hard to do.

### What's changed

In single page apps, you can now control whether the browser handles scrolling to an anchor or whether your code does.

### Using scroll()

To let browser handle the scrolling, first pass the `scroll` property to `intercept()` with a value of `"after-transition"`. for example:

```js/5
navigation.addEventListener("navigate", event => {
  event.intercept({
    handler() {
      // Handle it;
    },
    scroll: "after-transition"
  });
});
```

If you want to handle the scrolling yourself, set `scroll` to `"manual"`, then call `NavigateEvent.scroll()`.

```js/4,6
navigation.addEventListener("manual", event => {
  event.intercept({
    handler() {
      // Handle it;
      this.scroll();
    },
    scroll: "after-transition"
  });
});
```

The `restoreScroll()` method is still available, but it has been deprecated and will be removed in Chrome 108.

## Conclusion

We hope to soon update our article on the Navigation API. In the meantime, [the spec for this API](https://wicg.github.io/navigation-api/) contains much information specifically for web developers.
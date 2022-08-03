---
title: Changes to NavigateEvent in Chrome 105
description: >
  The Navigation API gets two new methods on NavigateEvent: intercept() replaces transitionWhile() and scroll() replaces restoreScroll().
layout: 'layouts/blog-post.njk'
date: 2022-08-03
tags:
  - chrome-105
  - capabilities
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/CdDfdtqJPPTeVCd3QqRR.jpeg'
alt: >
  A saiboat navigating the big blue waters.
authors:
  - joemedley
---

Chrome 105 introduces two new methods on the `NavigateEvent` of the Navigation API (introduced in 102) to improve on methods that have proved problematic in practice. `intercept()`, which let's developers control the state following the navigation, replaces `transitionWhile()`, which proved difficult to use. The `scroll()` method, which scrolls to an anchor specified in the URL, replaces `restoreScroll()` which does not work for all types of navigation. 

In this article, I'll explain the problems with both and how the new methods fix those problems.

## NavigateEvent.transitionWhile()

The `NavigateEvent.trasitionWhile()` method, introduced with the Navigation API in Chrome 102, intercepts navigation for client-side transitions in single page apps. Its first argument is a promise that signals to the browser and to other parts of the web application that it's finished.

This worked poorly in practice. Consider this common coding pattern:

```js
event.transitionWhile((async () => {
  doSyncStuff();
  await doAsyncStuff();
})());
```

This is functionally equivalent to the code below. It causes some portion of the navigation to run before the API is aware that the developer intends to intercept the navigation.

```js
doSyncStuff();
event.transitionWhile((async () => {
  await doAsyncStuff();
})());
```

One example where this can mess up an app is in scroll restoration logic where it captures scroll positions after the DOM change, rather than before. 

### What's changed

To replace `transitionWhile()`, the current spec introduces `NavigateEvent.intercept()`. The new method takes a handler in addition to the `focusReset` and `scrollRestoration` properties supported by `transitionWhile()`. The new handler always runs after the navigation commits, and things like scroll positions have been captured, avoiding the problems with `transitionWhile()`.

The `transitionWhile()` method is still available, but it has been deprecated and will be removed in Chrome 108.

### Using intercept()

The `NavigateEvent.intercept()` has the same restrictions as `transitionWhile()`, as in it cannot be called on all navigation events. Cross-origin navigations cannot be intercepted, and neither can cross-document traversals. Doing so will throw a [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException) of the `"SecurityError"` type.

To use `intercept()`, simply pass your custom handler when calling it. 

```js
navigation.addEventListener("navigate", event => {
  event.intercept({
    async handler() {
      doSyncStuff();
      await doAsyncStuff();
    }
  });
});
```

## NavigateEvent.scroll()

A navigation such as one from the top of the page to an anchor (call it moving from `/a` to `/a#id`) is handled completely by the browser even in a single page app. But navigating to an anchor on another 'page' (`/a` to `/b#id`), which is simple for multi page apps, is more complicated for single page apps. The app has to intercept the navigation to `/b#id` using `NavigateEvent.transitionWhile()`, then call `NavigateEvent.restoreScroll()` to bring the anchor into view. As stated above, this is currently hard to do.

### What's changed

In single page apps, you can now control whether the browser handles scrolling to an anchor or whether your code does.

### Using scroll()

By default, the browser will attempt to handle scrolling automatically, once the intercept hander has fulfilled. If you want to handle the scrolling yourself, set `scroll` to `"manual"`, then call `NavigateEvent.scroll()` when the browser should attempt to set the scroll position.

```js/2,8
navigation.addEventListener("manual", event => {
  scroll: "manual",
  event.intercept({
    async handler() {
      doSyncStuff();
      // Handle scrolling earlier than by default:
      event.scroll();
      await doAsyncStuff();
    }
  });
});
```

The `restoreScroll()` method is still available, but it has been deprecated and will be removed in Chrome 108.

## Conclusion

We hope to soon update our article on the Navigation API. In the meantime, [the spec for this API](https://wicg.github.io/navigation-api/) contains much information specifically for web developers.

Photo by <a href="https://unsplash.com/@punttim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Gouw</a> on <a href="https://unsplash.com/s/photos/sailboat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  

---
layout: 'layouts/blog-post.njk'
title: Page Visibility API - Have I got your attention?
description: >
  Fortunately, the new Page Visibility API lets your app discover if it's visible or not.
authors:
  - mikemahemoff
date: 2011-06-27
updated: 2011-06-27

---

Multi-tab browsing is now the norm, so you can't assume the user is watching your app just because it's running. Fortunately, the new [Page Visibility API](http://code.google.com/chrome/whitepapers/pagevisibility.html) lets your app discover if it's visible or not. You could use the API to cut down on unnecessary network activity and computation.

`document.webkitHidden` is a boolean value indicating if the current page is hidden (you can try it now in the console if you're using a recent build of Chromium). `document.webkitVisibilityState` will return a string indicating the current state, one of `visible`, `hidden`, and `prerendered`. And a new `webkitvisibilitychange` event will fire when any of these changes, e.g. when the user opens you app's tab, or moves away from it.

If you're interested in giving this a whirl, check out [visibility.js](https://github.com/evilmartians/visibility.js) which adds a little bit of sugar on the API to make watching these interactions a bit more fun.



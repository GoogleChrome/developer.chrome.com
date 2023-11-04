---
layout: "layouts/blog-post.njk"
title: dialog element shipped in Chrome 37 Beta
description: >
  Chrome Beta has landed its native support for <dialog> element
authors:
  - agektmr
date: 2014-07-23 
updated: 2019-03-15 
---

Chrome Beta has landed its native support for `<dialog>` element without needing "Enable experimental Web Platform features." flag turned on.

Check out more sample codes and how it works in detail with [a live demo](https://demo.agektmr.com/dialog/).

There are a few changes applied to the implementation since [the last announcement](https://developers.google.com/web/updates/2013/09/dialog-element-Modals-made-easy) but notable one is:

* Non-modal `<dialog>` is no longer vertically centered in the viewport. It has no special positioning behavior beyond its default CSS styling.

If you are curious about further details on the spec update, check out diffs [here](https://github.com/whatwg/html/commit/f4404b0652215d8301aec3eafde7f6e88713896d) and [here](https://github.com/whatwg/html/commit/df69e87c453671725e4f98b162c49923e957b7dd).



---
layout: "layouts/blog-post.njk"
title: "What's a \"Top layer\"?"
description: "With new native components and APIs coming to the platform, what is this \"Top layer\" that they enable us to use?"
authors:
  - jheyy
hero: "image/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/kogMUEiTkiI5gKqaxrsJ.jpg"
alt: "Layered mountains."
tags:
  - css
  - html
date: 2022-08-14
---

To cut a long story short, the top layer sits above its related `document` in the browser viewport. And each document has one associated top layer. Thus, elements promoted to the top layer needn't worry about `z-index` or DOM hierarchy. They also get a neat `::backdrop` pseudo-element to play with. The [Fullscreen API](https://fullscreen.spec.whatwg.org/#new-stacking-layer) spec goes further in-depth on this. And [that API](https://developer.mozilla.org/docs/Web/API/Element/requestFullScreen) was a great example of the top layer in use before `dialog` [support came](https://caniuse.com/dialog) along.

The top layer helps solve the problem of rendering content above the rest of the `document`.

The important things to remember:
- Top layer is outside of the `document` flow.
- `z-index` has no effect in the top layer.
- Each element in the top layer has a styleable `::backdrop` pseudo-element.
- Each element and `::backdrop` generates a new stacking context.
- Elements in the top layer are stacked in the order they appear in the set. The last one in, appears on top. If you want to promote an element, remove it, and add it again.


How have we mimicked the top layer until now? Well, it's not uncommon to see developers dropping an empty container element at the end of the `body`. And then this will get used as a "faux" top layer. The idea is that this container gets positioned above everything else in the stack. When you want to promote something above everything else, you append it to that container. We can see this in popular packages like [SweetAlert](https://github.com/t4t5/sweetalert), [reactjs-popup](https://github.com/yjose/reactjs-popup), [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup), and others. 

{% Codepen {
    user: 'web-dot-dev',
    id: 'xxWYaor',
    height: 450,
    tab: 'result'
  }
%}


But, with new native components and APIs like `dialog` and `pop-up`. Developers won't need to resort to these workarounds. We can promote content to the top layer. UI frameworks allow us to co-locate promoted elements with their component counterparts. But, then often get separated in the DOM when it comes to rendering.

By using the top layer, promoted elements are where we put them in our source code (for example, a `dialog`). It doesn't matter how many layers down in the DOM the element is. It will get promoted to the top layer and we can inspect it where we expect it to be, co-located with our component HTML. This makes it easier to inspect both the trigger element and the promoted element in the DOM at the same time. Particularly useful if your trigger element is making attribute updates, etc.

{% Codepen {
    user: 'web-dot-dev',
    id: 'QWmQVzX',
    height: 450,
    tab: 'result'
  }
%}


## DevTools

And that brings us onto DevTools support. Chrome DevTools are adding support for top layer elements so you can inspect the top layer. This makes it easier to debug and visualize how things are stacking up in the top layer or what even is in the top layer.

![GIF of DevTools top layer support being demonstrated](https://wd.imgix.net/image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/36Yck7O77zDipSNGNNbB.gif?auto=format&w=1600
)

Alina Varkki has a [great article](/blog/top-layer-devtools/) that goes in-depth on using these tools. They're currently available as a preview feature in Chrome Canary version 105.


## That’s it!

A brief intro to the top layer. Making it possible to say "Bye!" to things like:

```css
.popup-container {
  z-index: 9999;
}
```

What would you push into the Top Layer? Have you tried out [`dialog`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog)? Or checked out the [OpenUI pop-up API](https://open-ui.org/components/popup.research.explainer)? Let us know!



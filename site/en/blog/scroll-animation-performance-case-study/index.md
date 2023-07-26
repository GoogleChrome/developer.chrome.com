---
layout: "layouts/blog-post.njk"
title: "A case study on scroll-driven animations performance"
description: "The new API is much smoother than the classic way of implementing scroll-driven animations."
authors:
  - yurikoh
tags:
  - css
  - javascript
  - performance
date: 2023-07-12
---

## What’s new with scroll-driven animations?

[Scroll-driven animations](/articles/scroll-driven-animations/) are a way to add interactivity and visual interest to your website or web application, triggered by the user's scroll position. This can be a great way to keep users engaged and make your website more visually appealing.

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/dwjO0rGgwWyVp1Rp8a3K.mp4", width="800", height="800", autoplay="true", loop="true", muted="true", controls="true" %}

In the past, the only way to create scroll-driven animations was to respond to the scroll event on the main thread. This caused two major problems:

- Scrolling is performed on a separate thread and therefore delivers scroll events asynchronously.
- Main thread animations are [subject to jank](/blog/inside-browser-part3/#updating-rendering-pipeline-is-costly).

This makes creating performant scroll-driven animations that are in-sync with scrolling impossible or very difficult.

We are now introducing a [new set of APIs](/articles/scroll-driven-animations/#scroll-driven-animations) to support scroll-driven animations, which you can use from CSS or JavaScript. The API tries to use as few main thread resources as possible, making scroll-driven animations  far easier to implement, and also much smoother. The scroll-driven animations API is currently supported in the following browsers:

{% BrowserCompat 'css.properties.animation-timeline' %}

This article compares the new approach with the classic JavaScript technique to show just how easy and silky-smooth scroll-driven animations can be with the new API.

{% Aside %} The following performance gains from the use of scroll-driven animations are available from Chrome 116. {% endAside %}

## The scroll-driven animations CSS API versus classic JavaScript

The following example progress bar is built using class JavaScript techniques.

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/gB3RmjbAlATfn9jANGLL.mp4", width="800", height="484", autoplay="true", loop="true", muted="true", controls="true" %}

The document responds each time the `scroll` event happens to calculate how much percentage of the `scrollHeight` the user has scrolled to.

```js
document.addEventListener("scroll", () => {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100; 
  document.getElementById("progress").style.width = scrolled + "%";
})
```

The following demo shows the same progress bar using the new API with CSS.

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/hfvdzlpPqZEQUtIAklLx.mp4", width="800", height="484", autoplay="true", loop="true", muted="true", controls="true" %}

```css
@keyframes grow-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

#progress {
  animation: grow-progress auto linear forwards;
  animation-timeline: scroll(block root);
}
```

The new [animation-timeline](/articles/scroll-driven-animations/#animation-timelines) CSS feature, automatically converts a position in a scroll range into a percentage of progress, therefore doing all the heavy-lifting.

Now here’s the interesting part—let’s say that you implemented a super-heavy calculation on both versions of the website that would eat up most of the main thread resources. 

```js
function someHeavyJS(){
  let time = 0;
  window.setInterval(function () {
    time++;
    for (var i = 0; i < 1e9; i++) {
      result = i;
    }
    console.log(time)
  }, 100);
}
```

As you might have expected, the classic JavaScript version becomes janky and sluggish due to the main thread resources junction. On the other hand, the CSS version is completely unaffected by the heavy JavaScript work and can respond to the user's scroll interactions. 

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/jEhFBLHvDb9W0VFFupYz.mp4", width="800", height="485", autoplay="true", loop="true", muted="true", controls="true" %}

{% Codepen { user: 'nyb1030', id: 'gOBvZgR' } %}

{% Codepen { user: 'nyb1030', id: 'xxyYmgx' } %}

The CPU usage is completely different in DevTools, as shown in the following screenshots.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/v6rDNCu6XO8Nh5ujx0yw.png", alt="Main thread comparison.", width="800", height="450" %}

The following demo shows an application of scroll driven animation created by [CyberAgent](https://www.cyberagent.co.jp/en/). You can see that the photo fades in as you scroll.

{% Codepen { user: 'herablog', id: 'dygjeQE' } %}

## New scroll-driven animations JavaScript API versus classic JavaScript

The benefit of the new API is not only limited to CSS. You are able to create silky smooth scroll-driven animations using JavaScript as well. Take a look at the following example:

```js
const progressbar = document.querySelector('#progress');
progressbar.style.transformOrigin = '0% 50%';
progressbar.animate(
  {
    transform: ['scaleX(0)', 'scaleX(1)'],
  },
  {
    fill: 'forwards',
    timeline: new ScrollTimeline({
      source: document.documentElement,
    }),
  }
);
```

This enables you to create the same progress bar animation shown in the previous CSS demo using just JavaScript. The underlying technology is the same as the CSS version. The API tries to use as few main thread resources as possible, making the animations far smoother when compared to the classic JavaScript approach. 

Also, this new API works in conjunction with the existing [Web Animations API (WAAPI)](https://drafts.csswg.org/web-animations-1/) and [CSS Animations API](https://drafts.csswg.org/css-animations-1/) to enable declarative scroll-driven animations.

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/J8K2V9KcBZ1A2PSGoBZW.mp4", width="800", height="485", autoplay="true", loop="true", muted="true", controls="true" %}

{% Codepen { user: 'nyb1030', id: 'gOBvZgR' } %}

{% Codepen { user: 'nyb1030', id: 'MWPLgbe' } %}

## More demos and resources

You can check out the different implementations of scroll driven animation via this [demo site](https://scroll-driven-animations.style/), where you can compare demos using these new APIs from CSS and JavaScript.

If you are interested in learning more about the new scroll-driven animations, check out this [article](/articles/scroll-driven-animations/) and the [I/O 2023 talk](https://youtu.be/oDcb3fvtETs?t=337)!

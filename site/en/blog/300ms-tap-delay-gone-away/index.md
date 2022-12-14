---
layout: "layouts/blog-post.njk"
title: 300ms tap delay, gone away
description: >
  Every click interaction in mobile browsers is hampered with a 300ms delay, but that's gone in Chrome 32 for mobile-optimized sites!
authors:
  - jakearchibald
date: 2013-12-12
updated: 2022-10-21
---

{% YouTube id="AjUpiwvIa5A" %}


For many years, mobile browsers applied a 300-350ms delay between `touchend` and `click` while they waited to see if this was going to be a double-tap or not, since double-tap was a gesture to zoom into text.

Ever since the first release of Chrome for Android, this delay was removed if pinch-zoom was also disabled. However, pinch zoom is an important accessibility feature. As of Chrome 32 (back in 2014) this **delay is gone** for **mobile-optimized** sites, **without removing pinch-zooming**! Firefox and IE/Edge did the same shortly afterwards, and in March 2016 a similar fix landed in iOS 9.3.

The performance difference is huge!


Having a UI that responds instantly means the user can quickly press each button with confidence, rather than pausing and waiting for a response. Find out more about the impact of human reaction times and web performance in our [introduction to RAIL](https://web.dev/rail/).

To remove the 300-350ms tap delay, all you need is the following in the `<head>` of your page:

```html
<meta name="viewport" content="width=device-width">
```

This sets the viewport width to the same as the device, and is generally a best-practice for mobile-optimized sites. With this tag, browsers assume you've made text readable on mobile, and the double-tap-to-zoom feature is dropped in favour of faster clicks.

If for some reason you cannot make this change, you can use `touch-action: manipulation` to achieve the same effect either across the page or on particular elements:

```css
html {
    touch-action: manipulation;
}
```

This technique [isn't supported in Safari](https://caniuse.com/?search=touch-action), so the viewport tag is much preferred.

## Is losing double-tap-to-zoom an accessibility concern?

No. Pinch zoom continues to work, and OS features cater for users who find this gesture difficult. On Android, [magnification gestures](https://support.google.com/accessibility/android/answer/6006949) takes care of it. Tools like this even work outside the browser.

## What about older browsers?

[FastClick by FT Labs](https://github.com/ftlabs/fastclick) uses touch events to trigger clicks faster and removes the double-tap gesture. It looks at the amount your finger moved between `touchstart` and `touchend` to differentiate scrolls and taps.

Adding a `touchstart` listener to everything has a performance impact, because lower-level interactions such as scrolling are delayed by calling the listener to see if it `event.preventDefault()`s. Thankfully, FastClick will avoid setting listeners in cases where the browser already removes the 300ms delay, so you get the best of both!

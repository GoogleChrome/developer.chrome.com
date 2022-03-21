---
layout: "layouts/blog-post.njk"
title: image-rendering:pixelated
description: >
  Pixelation of the nation. Now in Chrome 41
authors:
  - paulkinlan
date: 2015-01-17
updated: 2019-03-16
---

As web developers we play with images all the time and in most cases browsers are great
at scaling images to fit the boundaries of our site designs whilst keeping the images pretty. But what happens when you want to control how the browser scales the images on your page?

Chrome 41 (Beta in January 2015) introduces a new CSS property [`image-rendering: pixelated`](https://developer.mozilla.org/docs/Web/CSS/image-rendering) ([Spec](https://drafts.csswg.org/css-images-3/#the-image-rendering)) that gives you a little more control over how the browser renders a scaled up image.

The CSS property `image-rendering` and the value `pixelated` are interesting because they turn off the
browser's standard smooth scaling (normally bi-linear interpolation) and replaces it with another
scaling algorithm (nearest neighbor in most cases) when resizing the images.

Imagine you had an image that was 2×2 pixels and you scaled it up to 100×100 pixels, the browser
would render it in a way that didn't make it look blocky. Something like:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/CMQOAQFXWtzKASXdpBF8.png", alt="Smooth rendering", width="236", height="236" %}
</figure>

There are many cases where you would not want this smoothing behavior and instead use
a method that preserves a more accurate representation of the image.

To get this effect, you simply apply `image-rendering: pixelated;` to your image as follows.

```html
<img
    style="image-rendering: pixelated;"
    width="100" height="100"
    src="data:image/png;base64,iVBORw0KGgoAAAA....Ik2kAAAAASUVORK5CYII=">
```

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/OfthXXdKKKqjXg4JvcAG.png", alt="Pixelated rendering", width="240", height="244" %}
</figure>

[Try the Demo](https://googlechrome.github.io/samples/image-rendering-pixelated/index.html).  As you can
see the application of the property has a significant effect on how the image is rendered.

This property can be applied in many places:

*  `<img>` elements
*  `<canvas style="image-rendering: pixelated">` elements
*  Any element with a `background-image` property

## I still don't get it.  Where should I use this?

If you are just showing photos on your site, then you probably don't want this.

A great use-case is games, you frequently have to scale up the canvas to make it fit the screen size correctly. Prior to this CSS property the browser would interpolate the canvas in such a way that it would look blurry (see below [sic]).


{% Aside %}
Oh wow, [@ChromiumDev](https://twitter.com/ChromiumDev) Canary finally landed `image-resizing: pixelated` for `<canvas>`! Before and after: [pic.twitter.com/QcPDtHu3s5](http://t.co/QcPDtHu3s5) - Thomas Boyt (@thomasABoyt) [January 16, 2015](https://twitter.com/thomasABoyt/status/555990806272946176)
{% endAside %}

If you are building an airline ticketing tool, or an app that displays [QR codes](https://twitter.com/andreasbovens/status/556696829421953024) then frequently the user will want it to be full screen so that it is easier to scan, so controlling the image-rendering is critical.

If you are interested in seeing the implementation, checkout [Issue 317991](https://bugs.chromium.org/p/chromium/issues/detail?id=317991) (it is left open for the implementation of the crisp-edges value. Star the issue to track the implementation).



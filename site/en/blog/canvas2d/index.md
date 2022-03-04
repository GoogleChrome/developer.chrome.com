---
title: "It's always been you, Canvas2D"
description: >
  The API-next-door gets a makeover.
layout: 'layouts/blog-post.njk'
authors:
  - aaronhk
date: 2022-03-03
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/Qr1BTg23IMo4QNsGJWg6.jpg'
alt: >
  A collection of canvases in various shades of blue.
tags:
  - new-in-chrome
---

In a world of shaders, meshes, and filters, Canvas2D might not get you excited. But it should!
30–40% of web pages have a `<canvas>` element and 98% of all canvases use a Canvas2D rendering
context. There are Canvas2Ds in cars, on fridges,
[and in space](https://lithiosapps.com/a-look-under-the-hood-of-spacexs-dragon-capsule/) (really).

Admittedly, the API is a bit behind the times when it comes to state-of-the-art 2D drawing.
Fortunately we've been hard at work implementing new features in Canvas2D to catch up to CSS,
streamline ergonomics and improve performance.

## Part 1: catching up with CSS

CSS has a few drawing commands that are sorely missing from Canvas2D. With the new API we've added a
handful of the most requested features:

### Round rect

Rounded rectangles: the cornerstone of the internet, of computing, nigh, of civilization.

In all seriousness, rounded rectangles are extremely useful: as buttons, chat bubbles, thumbnails,
speech bubbles, you name it. It's always been possible to make a rounded rectangle in Canvas2D, it's
just been a bit messy:

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'magenta';

const top = 10;
const left = 10;
const width = 200;
const height = 100;
const radius = 20;

ctx.beginPath();
ctx.moveTo(left + radius, top);
ctx.lineTo(left + width - radius, top);
ctx.arcTo(left + width, top, left + width, top + radius, radius);
ctx.lineTo(left + width, top + height - radius);
ctx.arcTo(left + width, top + height, left + width - radius, top + height, radius);
ctx.lineTo(left + radius, top + height);
ctx.arcTo(left, top + height, left, top + height - radius, radius);
ctx.lineTo(left, top + radius);
ctx.arcTo(left, top, left + radius, top, radius);
ctx.stroke();
```

All this was necessary for a modest, simple rounded rectangle:

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/J9JnDFq28BhDGsMyw2zY.png", alt="A rounded rectangle.", width="300", height="150" %}

With the new API there's a `roundRect()` method.

```js
ctx.roundRect(upper, left, width, height, borderRadius);
```

So the above can be wholly replaced by:

```js
ctx.roundRect(10, 10, 200, 100, 20);
```

The `ctx.roundRect()` method also takes in an array for the `borderRadius` argument of up to four
numbers. These radii control the four corners of the rounded rectangle the same way
[as for CSS](https://developer.mozilla.org/docs/Web/CSS/border-radius). For example:

```js
ctx.roundRect(10, 10, 200, 100, [15, 50, 30]);
```

[Check out the demo to play around](https://pickle-gorgeous-treatment.glitch.me/)!

### Conic Gradient

You've seen linear gradients:

```js
const gradient = ctx.createLinearGradient(0, 0, 200, 100);
gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/rkG4JDoOC42xn7szSZbL.png", alt="A linear gradient.", width="300", height="150" %}

Radial gradients:

```js
const radialGradient = ctx.createRadialGradient(150, 75, 10, 150, 75, 70);
radialGradient.addColorStop(0, 'white');
radialGradient.addColorStop(0.5, 'magenta');
radialGradient.addColorStop(1, 'lightblue');

ctx.fillStyle = radialGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/NF89ac1lvs6jb2kxTAja.png", alt="A radial gradient.", width="300", height="150" %}

But how about a nice conic gradient?

```js
const grad = ctx.createConicGradient(0, 100, 100);

grad.addColorStop(0, 'red');
grad.addColorStop(0.25, 'orange');
grad.addColorStop(0.5, 'yellow');
grad.addColorStop(0.75, 'green');
grad.addColorStop(1, 'blue');

ctx.fillStyle = grad;
ctx.fillRect(0, 0, 200, 200);
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/s05ut90JNhvLywJ9Sb9b.png", alt="A conic gradient.", width="451", height="329" %}

### Text modifiers

Canvas2Ds text rendering capabilities have been woefully behind. Chrome has added several new
attributes to Canvas2D text rendering:

- ctx.[letterSpacing](https://developer.mozilla.org/docs/Web/CSS/letter-spacing)
- ctx.[wordSpacing](https://developer.mozilla.org/docs/Web/CSS/word-spacing)
- ctx.[fontVariant](https://developer.mozilla.org/docs/Web/CSS/font-variant)
- ctx.[fontKerning](https://developer.mozilla.org/docs/Web/CSS/font-kerning)
- ctx.[fontStretch](https://developer.mozilla.org/docs/Web/CSS/font-stretch)
- ctx.[textDecoration](https://developer.mozilla.org/docs/Web/CSS/text-decoration)
- ctx.[textUnderlinePosition](https://developer.mozilla.org/docs/Web/CSS/text-underline-position)
- ctx.[textRendering](https://developer.mozilla.org/docs/Web/CSS/text-rendering)

These attributes all match their CSS counterparts with the same names.

## Part 2: ergonomic tweaks

Previously, some things with Canvas2D were possible, but needlessly complicated to implement. Here
are some quality-of-life improvements for JavaScript developers who want to use Canvas2D:

### Context reset

To explain clearing a canvas, I've written a silly little
[function to draw a retro pattern](https://glitch.com/edit/#!/wax-rapid-antlion):

```js
draw90sPattern();
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/KRHLGxmk98zv8mSEWdPI.png", alt="A retro pattern of triangles and squares.", width="500", height="500" %}

Great! Now that I'm done with that pattern, I want to clear the canvas and draw something else.
Wait, how do we clear a canvas again? Oh yeah! `ctx.clearRect()`, of course.

```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

Huh… that didn't work. Oh yeah! I've got to reset the transform first:

```js
ctx.resetTransform();
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

<div style="border:solid 1px #ccc;">
  {% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/ddoRhRRV8AuTy1Z82yEj.png", alt="A blank canvas.", width="500", height="500" %}
</div>  

Perfect! A nice blank canvas. Now let's start drawing a nice horizontal line:

```js
ctx.moveTo(10, 10);
ctx.lineTo(canvas.width, 10);
ctx.stroke();
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/VlZkoPMTOuzD6bUeTd1i.png", alt="A horizontal and a diagonal line.", width="500", height="500" %}

Grrrr! That's not right! 😡 What's that extra line doing here? Also, why is it pink? Okay, let's
just check StackOverflow.

```js
canvas.width = canvas.width;
```

Why is this so silly? Why is this so hard?

Well, it's not any more. With the new API we have the simple, elegant, beautiful groundbreaking:

```js
ctx.reset();
```

Sorry that took so long.

### Filters

SVG filters are a world unto themselves. If they're new to you I highly recommend reading
[The Art Of SVG Filters And Why It Is Awesome](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/),
which shows some of their amazing potential.

SVG style filters are already available for Canvas2D! You just have to be willing to pass the filter
as a url pointing to another SVG filter element on the page:

```html
<svg>
  <defs>
    <filter id="svgFilter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      <feConvolveMatrix kernelMatrix="-3 0 0 0 0.5 0 0 0 3" />
      <feColorMatrix type="hueRotate" values="90" />
    </filter>
  </defs>
</svg>
```

```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 400;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

ctx.filter = "url('#svgFilter')";
draw90sPattern(ctx);
```

Which messes up our pattern pretty good:

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/IPgddXUAwJFZzowzdxtx.png", alt="The retro pattern with a blurred effect applied.", width="500", height="500" %}

But, what if you wanted to do the above but stay within JavaScript and not mess around with strings?
With the new API, this is totally possible.

```js
ctx.filter = new CanvasFilter([
  { filter: 'gaussianBlur', stdDeviation: 5 },
  {
    filter: 'convolveMatrix',
    kernelMatrix: [
      [-3, 0, 0],
      [0, 0.5, 0],
      [0, 0, 3],
    ],
  },
  { filter: 'colorMatrix', type: 'hueRotate', values: 90 },
]);
```

Easy as pie! Try it and play with the parameters
[in the demo here](https://glitch.com/edit/#!/pretty-dent-titanoceratops).

{% Aside %} The app [SVGcode](https://svgco.de/), a PWA for converting raster images to SVGs, uses a
dynamically created <code>CanvasFilter</code> for the task of posterization (more background in the
[accompanying article](https://web.dev/svgcode/)). Be sure to check out the app and the related
[source code](https://github.com/tomayac/SVGcode/blob/ef037e33d05b17f43b32cfb2cf039145aeee6104/src/js/preprocessworker.js#L89-L113).
{% endAside %}

## Part 3: performance improvements

With the New Canvas2D API, we also wanted to improve performance where possible. We added a couple
features to give developers finer-grained control of their websites and allow for the slickest
possible framerates:

### Will read frequently

Use `getImageData()` to read pixel data back from a canvas. It can be very slow. The new API gives
you a way of explicitly marking a canvas for reading back (for generative effects, for example).
This allows you to optimize things under the hood and keep canvas fast for a larger variety of use
cases. This feature has been in Firefox for a while and we're finally making it part of the canvas
spec.

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
```

### Context loss

Let's make sad tabs happy again! In the event that a client runs out of GPU memory or some other
disaster befalls your canvas, you can now receive a callback and redraw as needed:

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('contextlost', onContextLost);
canvas.addEventListener('contextrestored', redraw);
```

If you want to read more about canvas context and loss, the WHATWG has
[a good explanation](https://wiki.whatwg.org/wiki/Canvas_Context_Loss_and_Restoration) on their
wiki.

## Conclusion

Whether you're new to Canvas2D, you've been using it for years, or you've been avoiding using it for
years, I'm here to tell you to give canvas another look. It's the API-next-door that's been there
all along.

## Acknowledgements

Hero image by
[Sandie Clarke](https://unsplash.com/@honeypoppet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/s/photos/canvas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).

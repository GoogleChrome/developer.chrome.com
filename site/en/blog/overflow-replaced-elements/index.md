---
title: A change to overflow on replaced elements in CSS
description: >
  An advanced warning of a change to CSS behavior that may cause unwanted overflow.
subhead: >
  An advanced warning of a change to CSS behavior that may cause unwanted overflow.
layout: 'layouts/blog-post.njk'
date: 2022-10-05
thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/oI3hVjUYyUSZalrSNHWr.jpg'
alt: >
  Water.
tags:
  - chrome-108
---

From Chrome 108, the following replaced elements respect the overflow property: `img`, `video` and `canvas`. In earlier versions of Chrome, this property was ignored on these elements.

This means that an image which was earlier clipped to its content box can now draw outside those bounds if specified to do so in a style sheet. The default browser style sheet clips the overflow to the content box with the following rules:

```css
img {
  overflow: clip;
  overflow-clip-margin: content-box;
}
```

However, it is possible for your stylesheet to override this behavior by setting `overflow: visible`. The following examples show some cases where you might now see unwanted overflow.

The `object-fit` property is used to scale the image and fill the box. If the aspect ratio does not match the box, the image will draw outside of the bounds.

```css
img {
  object-fit: cover;
  overflow: visible;
}
```

The `border-radius` property makes a square image look like a circle, but because `overflow` is visble the clipping no longer occurs.

```css
img {
  border-radius: 50% 50%;
  overflow: visible;
}
```

Setting `inherit: all` and causing all properties to inherit, including `overflow`.

```css
img {
  all: inherit;
}
```

## Solution

If this change means you see unwanted overflow, and overriding the overflow property to visible is not intentional, inspect the CSS applied to the element via DevTools. This should allow you to identify the CSS declaration which is overriding the overflow property to `visible` and remove it or update it to `clip`.

```css
img {
    overflow: clip;
}
```

If updating the CSS is not trivial, another fix is to add the following inline style to the element.

```html
<img style="overflow:clip !important">
```

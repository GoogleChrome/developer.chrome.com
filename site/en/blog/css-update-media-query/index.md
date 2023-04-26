---
layout: layouts/blog-post.njk
title: CSS update Media Query
description: >
  Adapt your UI to the screen's refresh rate capabilities.
subhead: >
  Adapt your UI to the screen's refresh rate capabilities.
date: 2023-04-26
authors:
  - argyle
tags:
  - css
---

CSS [media queries](https://web.dev/learn/design/media-queries/) are a powerful
tool that allow you to control the appearance of your website or web app based
on the device it is being viewed on. With media queries, you can create
different layouts for different screen sizes, orientations, and other factors.

The
[`update`](https://developer.mozilla.org/docs/Web/CSS/@media/update-frequency)
media query gives you a way to adapt the UI to the refresh rate of a device. The
feature can report a value of `fast`, `slow`, or `none` which relates to the
capabilities of different devices..

{% BrowserCompat 'css.at-rules.media.update' %}

## Devices and refresh rate

Most of the devices you design for are likely to have a fast refresh rate. This
includes desktops and most mobile devices.

You can query the device, see if it has a fast refresh rate for rendering
content, and style accordingly while still delivering a single stylesheet.

```css
@media (update: fast) {
  /* computer screens, totally cool to animate */
}
```

eReaders, and devices such as low powered payment systems, may have a slow
refresh rate. Knowing that the device can’t handle animation or frequent
updates, means that you can save battery usage or faulty view updates.

```css
@media (update: slow) {
  /* e-book readers or severely underpowered devices */
}
```

Lastly, there are scenarios like printed paper or e-ink displays that may only
offer a single render pass. Output like this cannot refresh at all, and is
referred to as `none`. It can be queried like this:

```css
@media (update: none) {
  /* one time render like printed paper */
}
```

In the following CodePen, see a progressively enhanced hover animation using
this new update media query:

{% Codepen {
  user: 'web-dot-dev',
  id: 'PoyPMBw',
  tab: 'css,result'
} %}

## More resources

- [CSS Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/#update)
- [Update Media Query on MDN](https://developer.mozilla.org/docs/Web/CSS/@media/update-frequency)

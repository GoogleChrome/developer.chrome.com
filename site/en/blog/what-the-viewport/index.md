---
layout: "layouts/blog-post.njk"
title: What the Virtual Viewport?
description: >
  The virtual viewport separates layout and viewing of the viewport.
authors:
  - mattgaunt
date: 2015-01-19
updated: 2019-03-16
---

In [Chrome M40](https://bugs.chromium.org/p/chromium/issues/detail?id=148816)
there is a change to the viewport that is pretty subtle, but should make a big
difference to users.

When mobile browsers started out, the lack of a viewport meta tag meant they would make the web page think it had
approximately 980px of screen real estate and render at this size. With a viewport meta
tag, developers could define the width, most common of which is "device-width", which sets the screen size to that of the device. You can [learn more on Web
Fundamentals](https://web.dev/responsive-web-design-basics/#viewport).

The way Rick Byers describes the virtual viewport is
as follows: the idea of the virtual viewport is to split the notion of "the
viewport" into two, "the layout viewport" (where fixed position items are attached)
and "the visual viewport" (What the users actually see).

## **Super Simple Example**

The website videojs.com is a good example because it's appbar is fixed to the
top and has links on both the left and right side of the appbar.

The image below shows what you would see if you zoomed in on a site and tried
panning left and right.

The top devices are Chrome M39, which doesn't have a virtual viewport
and the bottom 3 are from Chrome M40, which has a virtual viewport.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/QKfmImEwfal2CzMvhWo3.png", alt="Pixelated rendering.", width="800", height="483" %}
</figure>

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/8Fw96djIlZF5FKJIOdiz.png", alt="Pixelated rendering.", width="800", height="483" %}
</figure>

In Chrome M39, you will see the appbar after you zoom in,
but scrolling to the right doesn't allow you to view the links on the right side
of the bar, you'll only ever see the logo.

Compare this to Chrome M40 (which has a "virtual viewport") and you'll see that
the "visual viewport" scrolls everything inside the "layout viewport", allowing
you to view the links on the right.

Internet Explorer already has this behavior and these changes bring us more
closely inline with them.

### html

The only major developer facing change that comes with this is that in M39, you could apply overflow: hidden to the html element and your page would still scroll, in M40, this is no longer supported, the page will simply not scroll.

### More Solid Info

You want to learn more huh?

Well then, you can view the slide deck below.


<iframe src="https://docs.google.com/presentation/embed?id=1nJvJqL2dw5STi5FFpR6tP371vSpDWWs5Beksbfitpzc&amp;start=false&amp;loop=false&amp;" frameborder="0" style="max-width: 600px; width: 100%; height: 400px;"></iframe>


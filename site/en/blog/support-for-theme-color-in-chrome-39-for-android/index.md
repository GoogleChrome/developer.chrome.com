---
layout: "layouts/blog-post.njk"
title: Support for theme-color in Chrome 39 for Android
description: >
  Use theme-color to set the toolbar color in Chrome for Android.
authors:
  - petelepage
date: 2014-11-06
updated: 2019-03-15
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/st1ErwfA8INvMswvBUaV.png", alt="Screenshot of phone showing theme-color.", width="338", height="600" %}
</figure>


Starting in version 39 of Chrome for Android on Lollipop, you’ll now be able
to use the `theme-color` meta tag to set the toolbar color—this means no more
Seattle gray toolbars! The syntax is pretty simple: add a `meta` tag to your
page’s `<head>` with the `name="theme-color"`, and set the `content` to any
valid CSS color.

For example, to set the background to your favorite color or HTML5Rocks orange:

```html
<meta name="theme-color" content="#db5945">
```

In addition, Chrome will show beautiful high-res favicons when they’re
provided. Chrome for Android picks the highest res icon that you provide,
and we recommend providing a 192&times;192px PNG file. For example:

```html
<link rel="icon" sizes="192x192" href="nice-highres.png">
```

Check out the theme-color here on HTML5Rocks as well as on the [Web
Fundamentals](https://developers.google.com/web/fundamentals/) site, and be sure
to check out the
[Add to home screen docs](https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/)
for more ways to make your site stand out.



---
layout: "layouts/blog-post.njk"
title: DevTools answers - What font is that?
description: >
 Ever wondered which font is actually being used to render text? Wonder no more as Chrome DevTools reveals all.
authors:
  - paulirish
date: 2013-09-27
updated: 2019-03-09
---

Chrome DevTools can [now](https://bugs.chromium.org/p/chromium/issues/detail?id=135489) tell you **exactly what typeface is being used to render text**.

Font stacks are a funny thing, more of a suggestion than a demand. Because the family you suggest may not be present, you're letting each user's browser handle the fall-through case, pulling something that will work and using that.

```css
font-family: Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
```

As a developer, you want to know **what font is *actually* being used**.  Here's how it works:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/CV7nUbWecTnsOtJ4aRvy.png", alt="Font Family in devtools", width="800", height="369" %}
</figure>

Under **Computed Styles**, you'll now see a summary of the typeface(s) used for that element. There's a few things to note here:

* DevTools is reporting the **actual typeface** used by Chrome's text rendering layer. No more guessing which font `serif` or `sans-serif` is actually resolving to.
* Is my webfont working? Sometimes it's hard to tell if you're seeing the webfont or the fallback system font. Now you can **verify that the webfont is being applied**. In the above example, we're pulling down _Lobster_ as a webfont for the `::first-line` style.
* **Fall-through fonts in your stack are easy to spot**. Above, we had a typo spelling _Merriweather_ and so it wasn't used, falling through to Lobster.
* **Is that Arial or Helvetica?** Ask a designer or… ask DevTools. ;)
* Works great with Google Webfonts, Typekit, local fonts, @font-face typefaces, unicode glyphs, and all other interesting font sources.

Enjoy and please leave a comment if you have any feedback.



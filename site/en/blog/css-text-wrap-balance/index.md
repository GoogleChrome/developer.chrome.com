---
layout: layouts/blog-post.njk
title: "CSS text-wrap: balance"
description: >
  A classic typography technique of hand-authoring line breaks for balanced text blocks, comes to CSS.
subhead: >
  A classic typography technique of hand-authoring line breaks for balanced text blocks, comes to CSS.
date: 2023-04-03
authors:
  - argyle
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/7s9m7Sa2bx7OvH84PZZq.png
thumb: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/skq8r3b1NFR4B1gnm2an.png
alt: >
  A cairn of rocks balanced.
---

[Chrome Canary](https://www.google.com/chrome/canary/) includes a new feature—`text-wrap: balance` from [CSS Text Level
4](https://www.w3.org/TR/css-text-4/#text-wrap). To check it out, enable
[chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features),
and then take a look at the examples in this post to learn how this one line of
CSS can massively improve your text layouts.

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/qJKWQGssebOIDGVBtLpo.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/KKxjpQm">
      Try a demo
    </a>
  </figcaption>
</figure>

Without `text-wrap: balance`; designers, content editors and publishers have
[few tools](https://developer.mozilla.org/docs/Web/CSS/CSS_Text/Wrapping_Text)
to change the way lines are balanced.. The best options available being to use
[`<wbr>`](https://developer.mozilla.org/docs/Web/HTML/Element/wbr) or
[`&shy;`](https://developer.mozilla.org/docs/Web/CSS/hyphens) to help
guide text layouts into smarter decisions about where to break lines and words.

As a developer, you don’t know the final size, font size, or even language of a
headline or paragraph. All the variables needed for an effective and aesthetic
treatment of text wrapping, are in the browser. This is why we see headline
wrapping as in the following image:

<figure>
  {% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/tm4L941iouiU3Z2pj0Sw.png", alt="Headline is highlighted with DevTools, is spanning the full width of its inline space, and has two hanging words on the second line.", width="800", height="197" %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/ExeBjrO">
      Try a demo
    </a>
  </figcaption>
</figure>

```css
.unbalanced {
  max-inline-size: 50ch;
}
```

With `text-wrap: balance` from [CSS Text
4](https://www.w3.org/TR/css-text-4/#text-wrap), you can request the browser to
figure out the best balanced line wrapping solution for the text. The browser
**does know** all the factors, like font size, language, and allocated area.
Results of browser balanced text wrapping looks like this today in [Chrome
Canary](https://www.google.com/chrome/canary/) with
[chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features)
enabled:

<figure>
  {% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/49XR6eV5QLBiiZg0jr5P.png", alt="Headline is highlighted like the previous DevTools, this time is not spanning the full width. It started a new line before the end and as such is a balanced block of text.", width="800", height="210" %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/QWVXbRM">
      Try a demo
    </a>
  </figcaption>
</figure>

```css
.balanced {
  max-inline-size: 50ch;
  text-wrap: balance;
}
```

It's helpful to see them side by side, still, and without debug information overlaid.

{% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/lnGFtchLIPk9RnHSurHg.png", alt="The two previous exaples are shown together, one is marked as unbalanced and the other as balanced.", width="800", height="371" %}

Your eye should be much more pleased with the balanced text block. It grabs
attention better and is overall easier to read.

## Finding the balance

Headlines are the first thing readers see; they should be visually appealing and
easy to read. This grabs user attention and provides a sense of quality and
assurance. Good typography gives confidence to readers, encouraging them to
continue reading.

Traditionally this task was done by hand, or optically, as the designer
balancing the text wants to please the eye not the math. This topic is often
referred to as metric versus optical alignment. For large publications like the
[New York Times](https://open.nytimes.com/headline-balancing-act-6e92d3d6119),
headline balancing is a very important user experience detail.

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/9Pet3oQWYXf4ZXnh1ukE.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/eYLwpRx">
      Try a demo
    </a>
  </figcaption>
</figure>

{% Aside %}
Balancing main article text is not common as it doesn't
need to stand out or catch a reader's eye.
{% endAside %}

Balancing text in typography dates back to early days of printing, when printers
would hand place letters. As tools and techniques evolved, so did the results.
These days, designers have color, weight, size, and more, to balance text in
their designs.

On the web however, there's less control available because the document changes
sizes and colors based on users. `text-wrap: balance` brings the art of
balancing text to the web in an automated way, building on the work and
traditions of designers from the print industry.

### Balancing headlines

This will, and should be, the primary use case for `text-wrap: balance`. Draw
the eye with size and make it symmetrical and legible for the eye to read. Set
all the headlines to balanced text wrapping with the following CSS:

```css
h1,h2,h3,h4,h5,h6 {
  text-wrap: balance;
}
```

Just applying this style may not provide you with the results you expect, as the
text needs to wrap and therefore have a maximum line length applied from
somewhere. You'll see a
[`max-inline-size`](https://developer.mozilla.org/docs/Web/CSS/max-inline-size)
set on the examples in this post, this style is like `max-width` but can be set
once for any language.

## Limitations

The task of balancing text is not free. The browser needs to loop over
iterations to discover the best balanced wrapping solution. This performance
cost is mitigated by a rule, it **only works for six wrapped lines and under**.

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/9WWmzquQEUw8Nue2zAJJ.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/rNZEOGb">
      Try a demo
    </a>
  </figcaption>
</figure>

### Performance considerations

It is not a good idea to apply text-wrap balancing to your entire design. It's a
wasted request, due to the four line limit, and may impact page render speed.

{% Compare 'worse' %}
```css
* {
  text-wrap: balance;
}
```
{% endCompare %}

{% Compare 'better', 'CONSIDER INSTEAD' %}
```css
h1, h2, h3, h4, h5, h6, blockquote {
  text-wrap: balance;
}
```
{% endCompare %}

A big win for this feature is that you don't need to wait and time text wrap
balancing with font loading, like you may be doing with JavaScript today. The
browser takes care of it!

### Interactions with the `white-space` property

Balancing text competes with the
[`white-space`](https://developer.mozilla.org/docs/Web/CSS/white-space)
property because one is asking for no wrapping and the other is asking for
balanced wrapping. Overcome this by unsetting the white space property, then
balanced wrapping can apply again.

```css
.balanced {
  white-space: unset;
  text-wrap: balance;
}
```

### Balancing won’t change the inline-size of the element

There's an advantage to some of the JavaScript solutions for balanced text
wrapping, as they change the `max-width` of the containing element itself. This
has an added bonus of being "shrink wrapped" to the balanced block. `text-wrap:
balance` does not have this effect and can be seen in this example:

{% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/49XR6eV5QLBiiZg0jr5P.png", alt="Headline is highlighted like the previous DevTools, this time is not spanning the full width. It started a new line before the end and as such is a balanced block of text.", width="800", height="210" %}

See how the width shown from DevTools has a bunch of extra space at the end?
That's because it's a wrapping style only, not a size changing style. Because of
this, there's a few scenarios where `text-wrap: balance` isn't that great, at
least in my opinion. For example, headings inside of a card (or any container
with borders or shadows).

{% Video
  src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/ugZLvLe1TPHneFsrcBWH.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}

Balanced text wrapping ironically creates imbalance to the contained element.

## A brief explanation of the technique the browser is using

The browser effectively performs a binary search for the smallest width which
doesn't cause any additional lines, stopping at one CSS pixel (not display
pixel). To further minimize steps in the binary search the browser starts with
80% of the average line width.

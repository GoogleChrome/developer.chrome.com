---
layout: layouts/blog-post.njk
title: "CSS text-wrap: pretty"
description: >
  Opt-in optimized text wrapping, for beauty over speed.
subhead: >
  Opt-in optimized text wrapping, for beauty over speed.
date: 2023-10-23
authors:
  - argyle
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/spOTYANOG4RylwyIQyRH.png
thumb: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/mY6BvPXwqyfz7Jn70jwG.png
alt: >
  A tall building's windows are shown wrapping in a harmonious curve.
---

From Chrome 117 you can use a new text wrapping feature—`text-wrap: pretty`
from [CSS Text Level 4](https://www.w3.org/TR/css-text-4/#text-wrap).

```css
p {
  text-wrap: pretty;
}
```

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/vQqvAvkTkAmVjqhvLLvw.mp4",
    width="800",
    height="450",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/yLGmzLJ">
      https://codepen.io/web-dot-dev/pen/yLGmzLJ
    </a>
  </figcaption>
</figure>

Typographic [widows and
orphans](https://fonts.google.com/knowledge/glossary/widows_orphans) are single
words that stand alone at the end of a paragraph or text block. Widows are words
alone at the top of a text block and orphans are alone at the end of a text
block. They can interrupt the way our eyes skim the text, making content harder
to read. Some designers avoid them at all costs and go through great lengths to
prevent them.

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/wfqjbgG80KgZryht7iiK.svg",
    alt="A paragraph is shown with a widow at the beginning and an orphan at the end, compared to the same paragraph without the orphans or widows.",
    width="800",
    height="450"
  %}

  <figcaption>
    Image sourced from <a href="https://fonts.google.com/knowledge/glossary/widows_orphans">Google Fonts—Widows & Orphans</a>
  </figcaption>
</figure>

From Chrome 117, orphans can be avoided with one line of CSS: `text-wrap: pretty`.

{% Aside %} `text-wrap: pretty` is different from CSS's
[`orphans`](https://developer.mozilla.org/docs/Web/CSS/orphans) property
which is relevant when using CSS [multi-column
layout](https://developer.mozilla.org/docs/Web/CSS/CSS_multicol_layout).
Also, `pretty` only handles orphans, not widows. {% endAside %}

The feature does a little more than just ensure paragraphs don't end with a
single word, it also adjusts hyphenation if consecutive hyphenated lines appear
at the end of a paragraph or adjusts previous lines to make room. It will also
appropriately adjust for text justification. `text-wrap: pretty` is for
generally better line wrapping and text breaking, currently focused on orphans.
In the future, `text-wrap: pretty` may offer more improvements.

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/Snt1oo5WBdJeXVE8Wcrc.png",
    alt="A comparison of a paragraph with orphans and one with no orphans, each with a badge of bad or good.",
    width="540",
    height="250"
  %}

  <figcaption>
    Image sourced from <a href="https://uxmovement.com/content/why-you-should-remove-orphans-from-your-body-text/">Why you should remove orphans from your body text.</a>
  </figcaption>
</figure>

There's also [`text-wrap: balance`](/blog/css-text-wrap-balance/), which doesn't
prevent orphans, but does ensure the text wraps in a way that creates a
harmonious text block. I personally use `balance` for headlines and `pretty` for
paragraphs.

If you're interested in the details of the algorithm used to determine the
optimal number of lines, or performance considerations, [here's a link to the
design document created by the
engineer](https://docs.google.com/document/d/1jJFD8nAUuiUX6ArFZQqQo8yTsvg8IuAq7oFrNQxPeqI/edit#heading=h.cqq9czoal00g)
behind the feature, [Koji Ishii](/authors/kojiishi/).

If you have other line breaking improvements or suggestions, we'd love to hear
them! File an issue in the [Chromium bug tracker](https://bugs.chromium.org/p/chromium/issues/entry) with the details, examples of
good and bad line breaks, and we'll get back to you.

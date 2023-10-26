---
layout: layouts/blog-post.njk
title: CSS prefers-reduced-transparency
description: >
  Optimize and adjust for users who prefer an opaque UI.
subhead: >
  Optimize and adjust for users who prefer an opaque UI.
date: 2023-10-25
authors:
  - argyle
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/3QaCdrr6JiX2JSVu2ZzY.png
thumb: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/k83UEFvMkHOeSfB59cxU.png
alt: >
  A window covered in rain drops has bright pink and blue blurry shapes beyond the glass that are likely neon lights but they can't be fully made out.
---

From Chrome 118 the new media query feature
[`prefers-reduced-transparency`](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-transparency)
from [CSS Media Queries
5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-transparency) is
available. Non-opaque interfaces can cause headaches or be a visual struggle for
various types of vision deficiencies. This is why [Windows, macOS and iOS have
system
preferences](https://psdtohtml.dev/ideas/accessibility-transparencies-css/#:~:text=How%20to%20activate%20transparency%20reduction)
that can reduce or remove transparency from the UI.

{% BrowserCompat 'css.at-rules.media.prefers-reduced-transparency' %}

With this new media query in the browser, CSS can adapt the interface for users
specifying a desire for reduced transparency:

```css
.example {
  --opacity: .5;

  background: hsl(200 100% 50% / var(--opacity));

  @media (prefers-reduced-transparency: reduce) {
    --opacity: .95;
  }
}
```

In the preceding code example, a CSS variable holds an opacity value at `50%`
which is then used with HSL to create a semi-transparent blue background. The
[nested](/articles/css-nesting/) media query checks for a user preference for
reduced transparency, and when true, adjusts the opacity variable to `95%`, a
nearly opaque opacity value.

This media query fits in well with the other preference media queries, which
enable designers and developers to be creative while also adjusting for users.
You can think of these media queries like a chair in a car that automatically
adjusts the position to the user; when a user visits your website, it
automatically adjusts to them without them asking. So cool.

## Use cases for reducing transparency

The next few sections will be devoted to showing moments and opportunities for
reducing transparency in meaningful ways.

### Semi-transparent captions on images

It's fairly common to overlay an image or video thumbnail with a
semi-transparent caption or summary. The following example illustrates one way
to handle a preference for reduced transparency. The overlay is entirely
removed, and the same caption contents displayed below the image instead of
overlaid.

{% Codepen {
  user: 'web-dot-dev',
  id: 'mdvJjgN',
  tab: 'result'
} %}

### Transparent modals, notifications and popovers

Another way that UI elements overlay content, which often means elements of
opacity are present, is with modals, notifications and popovers. In these cases,
boosting the opacity can respect the user preference while also still allowing a
subtle amount of color from behind the overlay to peek through.

```css
.card {
  background: hsl(none none 100% / 20%);

  @media (prefers-reduced-transparency: reduce) {
    background: hsl(none none 0% / 80%);
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'poGJZmP',
  tab: 'result'
} %}

### Adaptive frosted glass

Another popular image overlay style is frosted glass. In the following example,
the image behind the caption is a mirror reflection of the product image. This
has a couple advantages: the image is not cropped and the light or dark
preference can come through a bit more in the end result.

```css
.adaptive-glass {
  --glass-lightness: 100%;
  --glass-alpha: 50%;

  background: hsl(0 0% var(--glass-lightness) / var(--glass-alpha));
  backdrop-filter: blur(40px);

  @media (prefers-color-scheme: dark) {
    --glass-lightness: 0%;
  }

  @media (prefers-reduced-transparency: reduce) {
    --glass-alpha: 85%;
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'dyaojEa',
  tab: 'result'
} %}

### Hero header

A common homepage element has a bold message overlaying a looping video or
animated image. The following example has a colorful semi-transparent gradient
overlay and an infinitely animating background image. While this may attract
many eyes, it will also create issues for many, due to low contrast with
transparency and motion that can't be controlled.

{% Codepen {
  user: 'web-dot-dev',
  id: 'QWYbBXG',
  tab: 'result'
} %}

This can be fixed with two CSS media queries:
[prefers-reduced-motion](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion)
and prefers-reduced-transparency. Within the reduced-motion media query you can
apply the infinite animation only if the user has "no-preference" for reduced
motion, signaling to the code that it's ok for this user to have motion.

Furthermore, with the reduced-transparency media query, you can decrease the
opacity so the overlay color is nearly 100%. Now the message can be read easily
without a motion distraction or problematic contrast.

{% Codepen {
  user: 'web-dot-dev',
  id: 'qBgdyzJ',
  tab: 'result'
} %}

Put it all together and you can deploy a creative UI look while also ensuring
the target audience can read it and get the message.

```css
.Hero img {
  @media (prefers-reduced-motion: no-preference) {
    animation: zoom 30s ease infinite;
  }
}

.Hero .overlay {
  background: hsl(none none 0% / 95%);

  @media (prefers-reduced-transparency: no-preference) {
    background: linear-gradient(
      to top right in oklab,
      oklch(40% 0.3 340 / 70%),
      oklch(40% 0.4 200 / 70%)
    );
  }
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'KKJpBOW',
  tab: 'result'
} %}

## Additive versus subtractive perspectives on user preferences

The previous example didn't check these user preferences for their reduced
preference, instead it checks for no preference.

```css
@media (prefers-reduced-transparency: no-preference) {
  …
}
```

Developers and designers often "fallback" the user experience based on these
preferences, in a subtractive mentality. This manifests in the media queries as
a check for "reduce," at which point something from the UI is removed. The
example shows an additive mentality, where motion and transparency are added if
the user is ok with it.

This approach helps you to think about a healthy baseline experience that's
sturdy on its own. Then, if it's ok with the user, add to the experience.

{% Aside 'important' %}
The additive strategy is best when there is good browser support.
{% endAside %}

## Devtools

The Chrome DevTools can emulate this preference for reduced transparency (and
more) in the [Rendering tab](/docs/devtools/rendering/). In the following video
see how to toggle the prefers-color-scheme and prefers-reduced-transparency
media queries to showcase the light, dark, transparent and reduced transparency
variants of the frosted glass card.

<figure>

  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/R2fJI7kj1edxSEjE2EG8.mp4",
    width="800",
    height="450",
    autoplay="false",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/dyaojxr">https://codepen.io/web-dot-dev/pen/dyaojxr</a>
  </figcaption>

</figure>

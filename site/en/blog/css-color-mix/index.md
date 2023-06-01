---
layout: layouts/blog-post.njk
title: CSS color-mix()
description: >
  Mix colors, in any of the supported color spaces, right from your CSS.
subhead: >
  Mix colors, in any of the supported color spaces, right from your CSS.
date: 2023-01-30
authors:
  - argyle
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/mvVxfLoskymgjVwKVNCV.jpg
alt: >
  Three paint brushes with orange and red paint mixed on the bristles and canvas.
---

The CSS [`color-mix()`](https://www.w3.org/TR/css-color-5/#funcdef-color-mix)
function is shipping in Chrome 111. This post explains how you can use this
function to mix colors in your stylesheets.

Before `color-mix()`, to darken, lighten, or desaturate a color, developers used
CSS preprocessors or
[`calc()`](https://developer.mozilla.org/docs/Web/CSS/calc) on color
channels.

{% Compare 'worse', 'Before with SCSS' %}
```css
.color-mixing-with-sass {
  /* Sass: equally mix red with white */
  --red-white-mix: color.mix(red, white);
}
```
{% endCompare %}

[Sass](https://sass-lang.com/documentation/modules/color#mix) has done great
work staying ahead of the color CSS specification. There has not, however, been
a real way to mix colors in CSS. To get close you need to do math of partial
color values. Here's a reduced example of how CSS may simulate mixing today:

{% Compare 'worse', 'Before with HSL' %}
```css
.color-mixing-with-vanilla-css-before {
  --lightness: 50%;
  --red: hsl(0 50% var(--lightness));

  /* add "white" to red
     by adding 25% to the lightness channel
  */
  --lightred: hsl(0 50% calc(var(--lightness) + 25%);
}
```
{% endCompare %}

[`color-mix()`](https://www.w3.org/TR/css-color-5/#funcdef-color-mix) brings the
ability to mix colors to CSS. Developers can choose which color space they mix
in and how dominant each color should be in the mix.

{% Compare 'better', 'after' %}
```css
.color-mixing-after {
  /* equally mix red with white */
  --red-white-mix: color-mix(in oklab, red, white);

  /* equally mix red with white in srgb */
  --red-white-mix-srgb: color-mix(in srgb, red, white);
}
```
{% endCompare %}

That's what we want. Flexibility, power and fully featured APIs. Love it.

## Mixing colors in CSS

CSS exists in a [multiple color space and color gamut world](/articles/high-definition-css-color-guide/#meet-the-new-web-color-spaces), and because of this
it's not optional to specify the color space for mixing. Furthermore, different
color spaces can drastically change the results of a mix, so knowing the effects
of a color space will help you get the results you need.

For an interactive introduction, try this `color-mix()` tool:
- Explore the effects of each color space.
- Explore the effects of hue interpolation when mixing in a cylindrical color
  space (`lch`, `oklch`, `hsl`, and `hwb`).
- Change the colors being mixed by clicking either of the top two color boxes.
- Use the slider to change the mixing ratio.
- Generated `color-mix()` CSS code available at the bottom.

{% Codepen { user: 'web-dot-dev', id: 'JjBZLrm' } %}

### Mixing in the various color spaces

The default color space for mixing (and [gradients](/articles/high-definition-css-color-guide/#gradients-in-different-color-spaces)) is `oklab`. It provides
consistent results. You can specify alternative color spaces too, to tailor the
mix to your needs.

Take `black` and `white` for example. The color space they mix in won't make
that big of a difference, right? Wrong.

```css
color-mix(in srgb, black, white);
color-mix(in srgb-linear, black, white);
color-mix(in lch, black, white);
color-mix(in oklch, black, white);
color-mix(in lab, black, white);
color-mix(in oklab, black, white);
color-mix(in xyz, black, white);
```

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/iaoqyLqPgCpCZp54NUpY.png",
    alt="7 color spaces (srgb, linear-srgb, lch, oklch, lab, oklab, xyz) each show their results of mixing black and white. Roughly 5 different shades are shown, demonstrating that each color space will even mix to a gray differently.",
    width="800",
    height="752"
  %}

  <figcaption><a href="https://codepen.io/web-dot-dev/pen/poZKLdw">Try the demo</a></figcaption>
</figure>

It does have a big effect!

Take `blue` and `white` for another example. I chose this specifically because
it's a case where a color space's shape can affect the results. In this case
it's that most color spaces go purple while traveling from white to blue. It
also shows how `oklab` is such a reliable color space for mixing, it's the
closest to most people’s expectations of mixing white and blue (no purple).

```css
color-mix(in srgb, blue, white);
color-mix(in srgb-linear, blue, white);
color-mix(in lch, blue, white);
color-mix(in oklch, blue, white);
color-mix(in lab, blue, white);
color-mix(in oklab, blue, white);
color-mix(in xyz, blue, white);
```

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/aWCQ92ujrmxmaEqM5N2J.png",
    alt="7 color spaces (srgb, linear-srgb, lch, oklch, lab, oklab, xyz) each shown having different results. Many are pink or purple, few are actually still blue.",
    width="800",
    height="449"
  %}

  <figcaption><a href="https://codepen.io/web-dot-dev/pen/eYjKMVV">Try the demo</a></figcaption>
</figure>

Learning the effects of a color space with `color-mix()` is great knowledge for
[making
gradients](/articles/high-definition-css-color-guide/#gradients-in-different-color-spaces)
too. Color 4 syntax also allows gradients to specify the color space, where a
gradient shows the mix over an area of space.

```css
.black-to-white-gradient-in-each-space {
  --srgb: linear-gradient(to right in srgb, black, white);
  --srgb-linear: linear-gradient(to right in srgb-linear, black, white);
  --lab: linear-gradient(to right in lab, black, white);
  --oklab: linear-gradient(to right in oklab, black, white);
  --lch: linear-gradient(to right in lch, black, white);
  --oklch: linear-gradient(to right in oklch, black, white);
  --hsl: linear-gradient(to right in hsl, black, white);
  --hwb: linear-gradient(to right in hwb, black, white);
  --xyz: linear-gradient(to right in xyz, black, white);
  --xyz-d50: linear-gradient(to right in xyz-d50, black, white);
  --xzy-d65: linear-gradient(to right in xyz-d65, black, white);
}
```

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/KZlHKamuzePm2fQc7pDL.png",
    alt="ALT_TEXT_HERE",
    width="800",
    height="496"
  %}

  <figcaption><a href="https://codepen.io/web-dot-dev/pen/QWBxmxv">Try the demo</a></figcaption>
</figure>

If you're wondering which color space is "the best," there isn't one. That's why
there are so many options! There also wouldn't be new color spaces being
invented either (see `oklch` and `oklab`), if one was "the best." Each color
space can have a unique moment to shine and be the right choice.

For example, if you want a vibrant mix result, use hsl or hwb. In the following
demo, two vibrant colors (magenta and lime) are mixed together and hsl and hwb
both produce a vibrant result, while srgb and oklab produce unsaturated colors.

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/ywA5diLvbjcEP5Ity5Eh.png",
    alt="ALT_TEXT_HERE",
    width="800",
    height="371"
  %}

  <figcaption><a href="https://codepen.io/web-dot-dev/pen/VwBdxGm">Try the demo</a></figcaption>
</figure>

If you want consistency and subtlety, use oklab. In the following demo which mixes
blue and black, hsl and hwb produce overly vibrant and hue shifted colors while
srgb and oklab produce a darker blue.

<figure>
  {% Img
    src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/mnSHaIRLkcgRIVmhPcmO.png",
    alt="ALT_TEXT_HERE",
    width="800",
    height="366"
  %}

  <figcaption><a href="https://codepen.io/web-dot-dev/pen/gOjKzdG">Try the demo</a></figcaption>
</figure>

Spend five minutes with the [`color-mix()`
playground](https://codepen.io/argyleink/pen/YzLMaor), testing different colors
and spaces, and you'll start to get a feel for each space's advantages. Also
expect more guidance around color spaces to happen as we all adjust to their
potentials in our user interfaces.

#### Adjusting the hue interpolation method

If you've chosen to mix in a cylindrical color space, essentially any color
space with a `h` hue channel that accepts an angle, you can specify if the
interpolation goes `shorter`, `longer`, `decreasing`, and `increasing`. This is
covered well in this [HD Color
Guide](/articles/high-definition-css-color-guide/) if you want to learn more.

{% Aside %}
The `color-mix()` playground will add an additional select dropdown if the color space is cylindrical. You can play there to see the effects on the mix.
{% endAside %}

Here's the same blue to white mix example, but this time, it's only in the
cylindrical spaces with different hue interpolation methods.

<figure>
  {% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/YoChGUN4F5cFfZ8DhRe5.png", alt="ALT_TEXT_HERE", width="800", height="294" %}

  <figcaption><a href="https://codepen.io/web-dot-dev/pen/BaPVrMQ">Try the demo</a></figcaption>
</figure>

Here's another Codepen I made to help visualize hue interpolation, but
specifically for gradients. I believe this will help you understand how each
color space produces its mix result when hue interpolation is specified though,
give it a study!

{% Codepen { user: 'web-dot-dev', id: 'MWBXVLV' } %}

{% Aside 'warning' %} Providing a hue interpolation method for a non-cylindrical
color space is a syntax error in `color-mix()`. {% endAside %}

### Mixing with varying color syntaxes

So far we've mostly mixed CSS named colors, like `blue` and `white`. CSS color
mixing is ready to mix colors that are from two different color spaces. This is
another reason it's key to specify the color space for the mixing, as it sets
the common space for when the two colors aren't in the same space.

```css
color-mix(in oklch, hsl(200deg 50% 50%), color(display-p3 .5 0 .5));
```

In the previous example, the `hsl` and `display-p3` will be converted to `oklch`
and then mixed. Pretty cool and flexible.

#### Adjusting the mixing ratios

It's not very likely that every time you mix you want equal parts of each color,
like most of the examples so far have shown. Good news, there's a syntax for
articulating how much of each color should be seen in the resulting mix.

To start this topic, here's a sample of mixes that are all equivalent (and [from
the spec](https://www.w3.org/TR/css-color-5/#ex-mix-syntactic)):

```css
.ratios-syntax-examples {
  /* omit the percentage for equal mixes */
  color: color-mix(in lch, purple, plum);
  color: color-mix(in lch, plum, purple);

  /* percentage can go on either side of the color */
  color: color-mix(in lch, purple 50%, plum 50%);
  color: color-mix(in lch, 50% purple, 50% plum);

  /* percentage on just one color? other color gets the remainder */
  color: color-mix(in lch, purple 50%, plum);
  color: color-mix(in lch, purple, plum 50%);

  /* percentages > 100% are equally clamped */
  color: color-mix(in lch, purple 80%, plum 80%);
  /* above mix is clamped to this */
  color: color-mix(in lch, purple 50%, plum 50%);
}
```

I find these examples to illuminate the edge cases well. The first set of
examples show how 50% isn't required but can be optionally specified. The last
example shows an interesting case for when the ratios exceed 100% when added
together, they're equally clamped to total 100%.

Notice too, that if only one color specifies a ratio, the other is assumed to be
the remainder to 100%. Here's a few more examples to help illustrate this
behavior.

```css
color-mix(in lch, purple 40%, plum) /* plum assigned 60% */
color-mix(in lch, purple, 60% plum) /* purple assigned 40% */
color-mix(in lch, purple 40%, plum 60%) /* no auto assignments */
```

These examples illustrate two rules:
1. When ratios exceed 100%, they're clamped and equally distributed.
1. When only one ratio is provided, the other color is set to 100 minus that ratio.

The last rule is slightly less obvious; what happens if percentages are supplied
for both colors and they don't add up to 100%?

```css
color-mix(in lch, purple 20%, plum 20%)
```

This combination of a `color-mix()` results in transparency, `40%` transparency.
When ratios don't add up to 100%, then the resulting mix won't be opaque.
Neither of the colors will be fully mixed.

#### Nesting `color-mix()`

Like all of CSS, nesting is handled well and as expected; inner functions will
resolve first and return their values to the parent context.

```css
color-mix(in lch, purple 40%, color-mix(plum, white))
```

Feel free to nest as much as you need to get the result you're working towards.

## Building a light and dark color scheme

Let's build color schemes with `color-mix()`!

### A basic color scheme

In the following CSS, a light and dark theme are created based on a brand hex
color. The light theme creates two dark blue text colors and a very light white
background surface color. Then in a dark preference media query, the custom
properties are assigned new colors so the background is dark and the text colors
are light.

```css
:root {
  /* a base brand color */
  --brand: #0af;

  /* very dark brand blue */
  --text1: color-mix(in oklab, var(--brand) 25%, black);
  --text2: color-mix(in oklab, var(--brand) 40%, black);

  /* very bright brand white */
  --surface1: color-mix(in oklab, var(--brand) 5%, white);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text1: color-mix(in oklab, var(--brand) 15%, white);
    --text2: color-mix(in oklab, var(--brand) 40%, white);
    --surface1: color-mix(in oklab, var(--brand) 5%, black);
  }
}
```

All of this is accomplished by mixing white or black into a brand color.

{% Codepen { user: 'web-dot-dev', id: 'YzjvabP' } %}

### Intermediate color scheme

This can be taken a step further by adding more than light and dark themes. In
the following demo, changes to the radio group update an attribute on the HTML
tag `[color-scheme="auto"]` which then enables selectors to conditionally apply
a color theme.

{% Codepen { user: 'web-dot-dev', id: 'bGjKvyW' } %}

This intermediate demo also shows a color theming technique where all of the
theme colors are listed in `:root`. This makes them easy to see all together and
adjust if needed. Later in the stylesheet, you can use the variables as they're
defined. This saves hunting through the stylesheet for color manipulations as
they're all contained in the initial `:root` block.

### More interesting use cases

[Ana Tudor](https://twitter.com/anatudor) has a great demo with a few use cases
for study:

{% Codepen { user: 'thebabydino', id: 'LYdgvLr' } %}

## Debugging color-mix() with DevTools

Chrome DevTools has great support for `color-mix()`. It recognizes and
highlights the syntax, creates a preview of the mix right next to the style in
the Styles pane and allows picking alternative colors.

It will look something like this in the DevTools:

{% Img
  src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/mzirxGfzTP8PAgTRLgxa.png",
  alt="ALT_TEXT_HERE",
  width="800",
  height="155"
  %}

Happy mixing y'all!

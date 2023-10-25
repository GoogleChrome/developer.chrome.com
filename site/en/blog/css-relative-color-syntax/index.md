---
layout: layouts/blog-post.njk
title: CSS relative color syntax
description: >
  Create new colors based on another color's channels and values.
subhead: >
  Create new colors based on another color's channels and values.
date: 2023-10-11
authors:
  - argyle
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/NJussb4uxzLcabHjaQ2m.png
thumb: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/W7QVCQJLdkO69EqtdRC3.png
alt: >
  A corridor of multi-colors frames, creating a rainbow hallway, is well lit and the light is blending colors inside the corridor.
---

In Chrome 119 is a very powerful color feature from [CSS Color Level
5](https://www.w3.org/TR/css-color-5/#relative-colors). Relative color syntax
creates a smooth path for color manipulation within CSS, offering ways for
authors and designers to:


- [Lighten](#lighten-a-color)
- [Darken](#darken-a-color)
- [Saturate](#saturate-a-color)
- [Desaturate](#desaturate-a-color)
- [Chroma boost](#chroma-boost-a-color)
- [Adjust opacity](#adjust-opacity-a-color)
- [Invert](#invert-a-color)
- [Complement](#complement-a-color)
- [Convert](#color-conversion)
- [Contrast](#contrast-a-color)
- [Color palettes](#color-palettes)
  - [Monochromatic](#monochromatic-palettes)
  - [Analogous](#analogous-palettes)
  - [Triadic](#triadic-palettes)
  - [Tetradic](#tetradic-palettes)
  - [Monochromatic with hue rotation](#monochromatic-with-a-slight-hue-rotation)

**Before** relative color syntax, to modify the opacity of a color, you need to
create custom properties for the channels of a color, usually HSL, and assemble
them into a final color and final variant color. This means managing a lot of
color pieces, which can quickly become burdensome.

```css
:root {
  --brand-hue: 300deg;
  --brand-saturation: 75%;
  --brand-lightness: 50%;

  --brand-hsl:
    var(--brand-hue)
    var(--brand-saturation)
    var(--brand-lightness);

  --brand-color: hsl(var(--brand-hsl));

  /* all this work just so I can set the opacity to 50% in a variant */
  --brand-color-variant: hsl(var(--brand-hsl) / 50%);
}
```

**After** relative color syntax, you can create a brand color with any color space
or syntax you need, and create a half opacity variant with much less code. It's
also much easier to read the intent of the styles and system.

```css
:root {
  --brand-color: hsl(300deg 75% 50%);
  --brand-color-variant: hsl(from var(--brand-color) h s l / 50%);
}
```

This post will help you [learn the syntax](#syntax-overview) and [demonstrate
common color manipulations](#use-cases-and-demonstrations).

If you prefer video, nearly all of the following article is covered in this GUI Challenge.

{% YouTube "1z_ViBjdnSw" %}

## Syntax overview

The goal of relative color syntax is to allow deriving a color from another
color. The base color is called the originating color, this is the color that
comes after the new [`from`](#the-from-keyword) keyword. The browser will
[convert](#color-conversion) and break this originating color apart and offer
the parts as variables for use in the new color definition.

{% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/fcj6GoebbLUlujPUwtlO.png", alt="A
diagram of the syntax rgb(from green r g b / alpha) is shown, with an arrow
leaving the top of green and arching into the rgb beginning of the function,
this arrow splits into 4 arrows that then point to their relevant variable. The
4 arrows are red, green, blue and alpha. Red and blue have a value of 0, green
is 128 and alpha is 100%.", width="800", height="530" %}

The preceding diagram shows the originating color `green` being converted to the
new color's [color
space](/articles/high-definition-css-color-guide/#a-review-of-the-classic-color-spaces),
turned into individual numbers represented as `r`, `g`, `b`, and `alpha`
variables, which are then directly used as a new `rgb()` color's values.

While this image shows the breakdown, process and variables, it's also not
changing the color. The variables are put back into the color unchanged, thus
resulting in a green color still.

{% Aside %} For a review on specifying colors, visit the [high definition color
guide](/articles/high-definition-css-color-guide/) for all the information you
need about web color. This post assumes familiarity with functional color
notation, color spaces like OKLCH and color gamuts. {% endAside %}

### The `from` keyword

The first part of the syntax to learn is the part  `from <color>` addition to
specifying a color. It goes right before you specify the values. Here's a code
example where all that has been added is `from green`, right before the values
for `rgb()` are specified.

```css
.syntax-introduction_same-colors {
  color: green;
  color: rgb(0 128 0);
  color: rgb(from green r g b);    /* result = rgb(0 128 0) */
}
```

That `from` keyword, when seen as the first parameter in functional notation,
turns the color definition into a relative color! After the `from` keyword, CSS
expects a color, **a color that will inspire the next color**.

### Color conversion

In simpler terms, it converts green to r g and b channels for use in a new
color.

```css
rgb(from green r g b)           /* r=0 g=128 b=0 */
rgb(from rgb(0 128 0) r g b);   /* r=0 g=128 b=0 */
```

### Colors from custom properties

Reading `rgb from green` is very clear and easy to understand. This is why
custom properties and relative color syntax make such a great match, because you
can take the mystery out of the `from` color. You also don't generally need to
know the color format of the custom property color, as you're creating a new
color in a format of your choice.

```css
rgb(from rgb(255 105 180) r g b) /* ????? */
rgb(from var(--hotpink) r g b)   /* clear */
```

### Work in your preferred color space

You can choose the color space with your choice of functional color notation.

```css
rgb(from hsl(120 100% 25%) r g b)     /*  r=0   g=128  b=0    */
hsl(from hsl(120 100% 25%) h s l)     /*  h=120 s=100% l=25%  */
hwb(from hsl(120 100% 25%) h w b)     /*  h=120 w=0%   b=50%  */
lch(from hsl(120 100% 25%) l c h)     /*  l=46  c=68   h=134  */
```

The relative color syntax has that conversion step; the color after `from` is
converted into the color space as specified at the beginning of the relative
color. The input and output don't need to match, which is very liberating.

The ability to choose a color space is also empowering, as choosing a color
space tends to be more focused around the type of color alternation than it is a
preference. The preference is in the results, not the color format or channel
types. This will become much clearer in the sections demonstrating use cases, as
different color spaces excel at different tasks.

### Mix, match, omit and repeat the variables

Something strange but exciting about this syntax, the variables don't have to be
put back in order and can be repeated.

```css
rgb(from green g g g)    /* rgb(128 128 128) */
rgb(from green b r g)    /* rgb(0 0 128) */
rgb(from green 0 0 g)    /* rgb(0 0 128) */
```

### Opacity as a variable

The syntax also provides the opacity as a variable named `alpha`. It's optional,
and goes after the `/` in the functional color notation.

```css
rgb(from #00800080 r g b / alpha)             /* alpha=50% */
rgb(from rgba(0,128,0,.5) r g b / alpha)      /* alpha=50% */
rgb(from rgb(0 128 0 / 50%) r g b / alpha)    /* alpha=50% */
```

### Use calc() or other CSS functions on the variables

So far we've been creating the color green over and over again. Learning the
syntax, getting familiar with the conversion and destructuring steps. Now is
time to modify the variables, alter the output so it's not the same as the
input.

```css
green                              /*  h=120 s=100% l=25%  */
hsl(from green calc(h * 2) s l)    /*  h=240 s=100% l=25%  */
```

It's navy now! The hue was doubled, taking a hue of `120` and turning it into
`240`, completely altering the color. This rotated the hue along the color
wheel, a neat trick made very simple with [cylindrical color
spaces](https://en.wikipedia.org/wiki/Color_model#Cylindrical-coordinate_color_models)
like [HSL](/articles/high-definition-css-color-guide/#hsl),
[HWB](/articles/high-definition-css-color-guide/#hwb),
[LCH](/articles/high-definition-css-color-guide/#lch), and
[OKLCH](/articles/high-definition-css-color-guide/#oklch).

### Check for browser support

```css
@supports (color: rgb(from white r g b)) {
  /* safe to use relative color syntax */
}
```

## Use cases and demonstrations

The following examples and use cases have many alternative syntaxes to achieve
similar or the same results. The variations come from the color spaces and the
channels they offer.

Also, many examples will show color adjustments with the verbiage of `by` and
`to`. A color changed `by` is a relative color change; a change that uses the
value of the variable and makes an adjustment based on its current value. A
color changed `to` is an absolute color change; a change that does not use the
value of the variable and instead specifies a completely new value.

All demo's can be found in this [Codepen
collection](https://codepen.io/collection/eJPQjM).

### Lighten a color

The OKLCH, [OKLAB](/articles/high-definition-css-color-guide/#oklab),
[XYZ](/articles/high-definition-css-color-guide/#xyz-xyz-d50-xyz-d65) or
[sRGB](/articles/high-definition-css-color-guide/) color spaces provide the most
predictable results when lightening colors.

{% Aside %} Learn more about predictable results for gradients in this
[episode](https://www.youtube.com/watch?v=w_vk1j8aYmU) of the CSS podcast. {%
endAside %}

#### Lighten by an amount

The following example `.lighten-by-25` takes the color `blue` and converts it to
OKLCH, then lightens the blue by increasing the `l` (lightness) channel by 25.
This pushes the blue color towards white by 25%.

```css
.lighten-by-25 {
  background: oklch(from blue calc(l + 25) c h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'NWeoqmV',
  tab: 'result'
} %}

#### Lighten to a specific value

The following example `.lighten-to-75` doesn't utilize the `l` channel to
lighten `blue`, it instead completely replaces the value with `75%`.

```css
.lighten-to-75 {
  background: oklch(from blue 75% c h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'bGOzVNP',
  tab: 'result'
} %}

### Darken a color

The same color spaces effective at lightening a color, are also great for
darkening color.

#### Darken by an amount

The following example `.darken-by-25` takes the color blue and converts it to
OKLCH, then darkens the blue by decreasing the `l` (lightness) channel by 25.
This pushes the blue color towards black by 25%.

```css
.darken-by-25 {
  background: oklch(from blue calc(l - 25) c h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'jOXdbbP',
  tab: 'result'
} %}

#### Darken to a specified value

The following example `.darken-to-25` doesn't utilize the `l` channel to darken
`blue`, it instead completely replaces the value with `25%`.

```css
.darken-to-25 {
  background: oklch(from blue 25% c h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'RwEvWWe',
  tab: 'result'
} %}

### Saturate a color

#### Saturate by an amount

The following example `.saturate-by-25` uses the `s` from `hsl()` to increase
`orchid`'s vibrance by `25%`.

```css
.saturate-by-25 {
  background: hsl(from orchid h calc(s + .25) l);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'GRPzpoP',
  tab: 'result'
} %}

#### Saturate to a specific amount

The following example `.saturate-to-100` doesn't utilize the `s` channel from
`hsl()`, it instead specifies a desired saturation value. In this example,
saturation is raised to `100%`.

```css
.saturate-to-100 {
  background: hsl(from orchid h 100% l);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'xxmMwVP',
  tab: 'result'
} %}

### Desaturate a color

#### Desaturate by an amount

The following example `.desaturate-by-50` uses the `s` from `hsl()` to decrease
the saturation of `indigo` by 50%, essentially cutting it in half. This could
have also been done with division like `calc(s / 2)`.

```css
.desaturate-by-50 {
  background: hsl(from indigo h calc(s - .5) l);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'VwqgvjB',
  tab: 'result'
} %}

#### Desaturate to a specific value

Rather than desaturate by an amount, you can desaturate to a specific desired
value. The following example `.desaturate-to-25` creates a new color based on
`indigo` but sets the saturation to 25%.

```css
.desaturate-to-25 {
  background: hsl(from indigo h 25% l);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'KKbJdgV',
  tab: 'result'
} %}

### Chroma boost a color

This effect is similar to saturating a color but is different in a couple of
ways. Firstly, it's a `chroma` change and not a `saturation` change, and this is
because the color spaces that can boost into high dynamic range don't use
saturation. The color spaces which feature `chroma` are high dynamic range
capable, allowing authors to boost color vibrance further than saturation is
even capable of.

```css
.increase-chroma {
  background: oklch(from orange l calc(c + .1) h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'MWZLabj',
  tab: 'result'
} %}

### Adjust opacity a color

Making a semi-transparent variant of a color is one of the most common color
adjustments done in design systems. See the example in the introduction of this
article if you missed it, it outlines the problem space really well.

#### Adjust opacity by an amount

```css
.decrease-opacity-by-25 {
  background: rgb(from lime r g b / calc(alpha - .25));
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'abPaJKJ',
  tab: 'result'
} %}

#### Adjust opacity to a specific value

```css
.decrease-opacity-to-25 {
  background: rgb(from lime r g b / 25%);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'ZEVwbeL',
  tab: 'result'
} %}

### Invert a color

Color inversion is a common color adjustment function found in color libraries.
One way to accomplish this is to convert a color to RGB then subtract each
channel's value from 1.

```css
.invert-each-rgb-channel {
  background: rgb(from yellow calc(1 - r) calc(1 - g) calc(1 - b));
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'xxmaqQL',
  tab: 'result'
} %}

### Complement a color

If your goal wasn't to invert a color but rather complement it, then hue
rotation is likely what you're looking for. Pick a color space which offers the
hue as an angle, then use `calc()` to rotate the hue by an amount you want.
Finding a color's complement is done by rotating by half a turn, in this case
you can add or subtract from the `h` channel by `180` to achieve the result.

```css
.complementary-color {
  background: hsl(from blue calc(h + 180) s l);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'bGOzVRN',
  tab: 'result'
} %}

### Contrast a color

As a method of achieving accessible color contrast ratios, consider L&midast; (Lstar).
This uses the (approximately) perceptually uniform lightness (L) channel from
LCH and OKLCH, in a `calc()`. Depending if you are targeting low, medium or high
contrast, the L&midast; delta is around ~40, ~50, or ~60.

{% Codepen {
  user: 'web-dot-dev',
  id: 'xxmMZOM',
  tab: 'result'
} %}

This technique works well across any hue in LCH or OKLCH.

#### Contrast a darker color

The `.well-contrasting-darker-color` class demonstrates L* with a delta of 60.
Since the originating color is a dark color (low value lightness), 60 is added
to the lightness channel. This technique is used to find a well contrasting,
same hue, dark text color on a light background.

```css
.well-contrasting-darker-color {
  background: darkred;
  color: oklch(from darkred calc(l + 60) c h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'jOXdbLq',
  tab: 'result'
} %}

#### Contrast a lighter color

The `.well-contrasting-lighter-color` class demonstrates L* with a delta of 60
also. Since the originating color is a light color (high value lightness), 60 is
subtract from the lightness channel.

```css
.well-contrasting-lighter-color {
  background: lightpink;
  color: oklch(from lightpink calc(l - 60) c h);
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'mdavVRV',
  tab: 'result'
} %}

### Color palettes

Relative color syntax is very good at creating color palettes. It's especially
useful and powerful due to the number of color spaces available. The following
examples all use OKLCH because the lightness channel is reliable and the hue
channel can be rotated without side effects. The final example demonstrates a
combination of lightness and hue rotation adjustments for a more interesting
result!

Open the example source code for these and try changing the `--base-color`, to
see just how dynamic these palettes are. It's fun!

If you like video, I give in depth information about [building color palettes in
CSS with OKLCH on YouTube](https://www.youtube.com/watch?v=6aCsAMgwnjE).

{% YouTube "6aCsAMgwnjE" %}

#### Monochromatic palettes

To create a monochromatic palette is to make a palette all from the same hue but
with variations in lightness and darkness. The middle color is the source color
for the palette, where two lighter and two darker variants are put on either
side.

```css
:root {
  --base-color: deeppink;

  --color-0: oklch(from var(--base-color) calc(l + 20) c h); /* lightest */
  --color-1: oklch(from var(--base-color) calc(l + 10) c h);
  --color-2: var(--base-color);
  --color-3: oklch(from var(--base-color) calc(l - 10) c h);
  --color-4: oklch(from var(--base-color) calc(l - 20) c h); /* darkest */
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'eYbxpeR',
  tab: 'result'
} %}

##### Try out a bunch of palettes made with relative color syntax and OKLCH

[Open Props](https://open-props.style), a library of free CSS variables, offers
color palettes built with this strategy and makes them easily usable with an
import. They're also all built off of a color you can customize, you just give
it a color and it spits out a palette!

{% Codepen {
  user: 'web-dot-dev',
  id: 'yLGZYpg',
  tab: 'result'
} %}

#### Analogous palettes

Since hue rotation is so easy with OKLCH and HSL, it's trivial to create an
[analogous color palette](https://en.wikipedia.org/wiki/Analogous_colors).
Rotate the hue by an amount you like the results of and change the base color,
and watch new palettes get built by the browser.

```css
:root {
  --base-color: blue;

  --primary:   var(--base-color);
  --secondary: oklch(from var(--base-color) l c calc(h - 45));
  --tertiary:  oklch(from var(--base-color) l c calc(h + 45));
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'ZEVwbry',
  tab: 'result'
} %}

#### Triadic palettes

Similar to complementary colors, [triadic color
palettes](https://www.studiobinder.com/blog/what-is-a-triadic-color-scheme-definition/)
are opposing but harmonious hue rotations given a base color. Where a
complementary color is on the opposite side of a color, like a straight line
drawn through the middle of the color wheel, triadic palettes are like a
triangle of lines, finding 2 colors equally rotated from a base color.
Accomplish this by rotating the hue `120deg`.

This is a slight simplification of the color theory, but it's enough to kick
start you into the more complex triadic palettes if you're interested.

```css
:root {
  --base-color: yellow;
  --triad-1: oklch(from var(--base-color) l c calc(h - 120));
  --triad-2: oklch(from var(--base-color) l c calc(h + 120));
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'KKbJdoN',
  tab: 'result'
} %}

#### Tetradic palettes

Tetradic palettes are four colors evenly divided around the color wheel, making
a palette with no clear dominant value. You could think of it too, like two
pairs of complementary colors. Used wisely, it can be very meaningful.

This is a slight simplification of the color theory, but it's enough to kick
start you into the more complex tetradic palettes if you're interested.

```css
:root {
  --base-color: lime;

  --color-1: var(--base-color);
  --color-2: oklch(from var(--base-color) l c calc(h + 90));
  --color-3: oklch(from var(--base-color) l c calc(h + 180));
  --color-4: oklch(from var(--base-color) l c calc(h + 270));
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'WNLPQJw',
  tab: 'result'
} %}

#### Monochromatic with a slight hue rotation

Many color experts keep this trick up their sleeve. The problem is, a
monochromatic color scale can be quite boring. The solution is to add either a
minor or major hue rotation to each new color as the lightness is changed.

The following example decreases lightness by 10% each swatch and also rotates
the hue by 10 degrees. The result, a hotpink to indigo palette that seems to
seamlessly blend like a gradient might.

```css
:root {
  --base-color: deeppink;

  --color-1: var(--base-color);
  --color-2: oklch(from var(--base-color) calc(l - 10) c calc(h - 10));
  --color-3: oklch(from var(--base-color) calc(l - 20) c calc(h - 20));
  --color-4: oklch(from var(--base-color) calc(l - 30) c calc(h - 30));
  --color-5: oklch(from var(--base-color) calc(l - 40) c calc(h - 40));
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'PoXVPaY',
  tab: 'result'
} %}

##### Try out this leaderboard built with OKLCH and hue rotation

The following leaderboard interface uses this hue rotation strategy. Each list
item tracks its index in the document as a variable called `--i`. This index is
then used to adjust chroma, lightness and hue. The adjustment is only by 5% or
5deg, much more subtle than the above example with deeppink, and so it takes a
keen eye to notice the reason this leaderboard can be in any hue with such
elegance.

Be sure to change the hue in the slider underneath the leaderboard, and see
relative color syntax create beautiful color moments.

```css
li {
  --_bg: oklch(
    /* decrease lightness as list grows */
    calc(75% - (var(--i) * 5%))

    /* decrease chroma as list grows */
    calc(.2 - (var(--i) * .01))

    /* lightly rotate the hue as the list grows */
    calc(var(--hue) - (var(--i) + 5))
  );
}
```

{% Codepen {
  user: 'web-dot-dev',
  id: 'YzdByvg',
  height: 600,
  tab: 'result'
} %}

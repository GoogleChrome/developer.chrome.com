---
layout: "layouts/doc-post.njk"
title: "Emulate CSS media features"
authors:
  - sofiayem
date: 2022-04-13
description:
  "Emulate prefers-color-scheme, media type, forced-colors, prefers-contrast, prefers-reduced-motion, color-gamut."
tags:
  - emulate
  - test
  - css
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

Emulate various CSS media features with this reference of emulation options on the **Rendering** tab.

{% YouTube id='gOkM1L6azEI' %}

## Emulate CSS media feature `prefers-color-scheme`

The [`prefers-color-scheme` CSS media feature][7] indicates if the user prefers light or dark color scheme.

To emulate this condition:

1. On the [prefers-color-scheme](https://web.dev/prefers-color-scheme/) page, [open the **Rendering** tab](/docs/devtools/rendering#open-rendering).
1. Under the **Emulate CSS media feature `prefers-color-scheme`**, select one of the following from the dropdown list:

   - No emulation
   - `prefers-color-scheme:light`
   - `prefers-color-scheme:dark`

1. <span class="material-icons">refresh</span> Reload the page. For example:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/peTdHnJJeksHISUdpJzX.png", alt="Emulated prefers-color-scheme:dark", width="800", height="487" %}

## Emulate CSS media type (Enable print preview)

The [print media query][1] controls how your page looks when printed.

To force your page into print preview mode:

1.  [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and under **Emulate CSS media type** select **print**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1kJOAaC1vMfTmm94wIJa.png", alt="Print preview mode", width="800", height="439" %}

2. From here, you can view and change your CSS, like any other web page. See [Get Started With Viewing And Changing CSS][2].

## Emulate CSS media feature `forced-colors`

The [`forced-colors` CSS media feature][5] indicates if the user agent enabled a forced colors mode. An example of a forced colors mode is Windows High Contrast.

To emulate this condition:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering).
1. Under the **Emulate CSS media feature `forced-colors`**, select one of the following from the dropdown list:

   - No emulation
   - `forced-colors:active`
   - `forced-colors:none`

With `forced-colors:active` emulated:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ezZ8wZmzGYWvciitKSso.png", alt="forced-colors:active", width="800", height="398" %}

## Emulate CSS media feature `prefers-contrast`

The [`prefers-contrast` CSS media feature][6] indicates if the user requested the web content to present with a higher, lower, or specific contrast value.

To emulate this condition:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering).
1. Under the **Emulate CSS media feature `prefers-contrast`**, select one of the following from the dropdown list:

   - No emulation
   - `prefers-contrast:more`
   - `prefers-contrast:less`
   - `prefers-contrast:custom`

## Emulate CSS media feature `prefers-reduced-motion`

The [`prefers-reduced-motion` CSS media feature][8] indicates if the user has requested to minimize the amount of motion on a page.

To emulate this condition:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) on this [demo](https://prefers-reduced-motion.glitch.me/) and try scrolling to see various animations.
1. Under the **Emulate CSS media feature `prefers-reduced-motion`**, select `prefers-reduced-motion:reduce`.
1. Try scrolling again.

## Emulate CSS media feature `color-gamut`

The [`color-gamut` CSS media feature][9] indicates which range of colors the user agent and the output device support.

To emulate this condition:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering).
1. Under the **Emulate CSS media feature `color-gamut`**, select one of the following from the dropdown list:

   - No emulation
   - `color-gamut:srgb`—approximately [sRGB](https://en.wikipedia.org/wiki/SRGB) gamut or more
   - `color-gamut:p3`—approximately the gamut specified in [Display P3 Color Space](https://www.color.org/chardata/rgb/DisplayP3.xalter) or more
   - `color-gamut:rec2020`—approximately the gamut specified in [Rec. 2020](https://en.wikipedia.org/wiki/Rec._2020) or more

[1]: https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries
[2]: /docs/devtools/css
[5]: https://developer.mozilla.org/docs/Web/CSS/@media/forced-colors
[6]: https://developer.mozilla.org/docs/Web/CSS/@media/prefers-contrast
[7]: https://web.dev/prefers-color-scheme/
[8]: https://web.dev/prefers-reduced-motion/
[9]: https://developer.mozilla.org/docs/Web/CSS/@media/color-gamut

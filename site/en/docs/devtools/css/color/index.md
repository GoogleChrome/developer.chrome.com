---
layout: "layouts/doc-post.njk"
title: "Inspect and debug HD and non-HD colors with the Color Picker"
authors:
  - jecelynyeen
  - sofiayem
date: 2023-03-07
#updated: YYYY-MM-DD
description: "Learn how to use the Color Picker in Elements > Styles to inspect and debug HD and non-HD colors."
tags:
  - prototype-fixes
  - css
---

{% Aside %}
This video was made before Chrome version 112 that introduced HD color support in DevTools.
{% endAside %}

{% YouTube id='TuR27BxCRVk' %}

The **Color Picker** provides a GUI for changing `color` and `*-color` declarations and lets you create, convert, and debug [HD color](/articles/high-definition-css-color-guide/) with a click.

{% Aside 'gotchas' %}
Starting with version 112, the **Styles** pane supports:

- 12 new color spaces and 7 new gamuts from the [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) specification.
- The [`color-mix()`](/blog/css-color-mix) function from [CSS Color Level 5](https://www.w3.org/TR/css-color-5/#color-mix).
{% endAside %}

## Change colors with the Color Picker {: #change-colors }

Use the **Color Picker** to change and debug color values:

1.  [Select an element][24] in the **Elements** panel.
2.  In the **Styles** pane, find the `color` or `*-color` declaration that you want to
    change.

    To the left of each `color` or `*-color` value, there is a small square icon with a preview of that color.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UbGGOVBV5ZCxcPT3JCZk.png", alt="Color preview.", width="600", height="400" %}

3.  Click the preview to open the **Color Picker**.

Here's a description of each of the UI elements of the **Color Picker**:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AzrBlIl6iPByojkmoU4y.png", alt="The Color Picker, annotated.", width="800", height="908" %}

1. **Shades**.
1. **Eyedropper**. See [Sample a color anywhere with the Eyedropper](#eyedropper).
1. **Copy to clipboard**. Copy the **Display value** to your clipboard.
1. **Display value**. The parameter values of the chosen color space.
1. **Contrast**. The difference between `color` and `background-color`. See [Color and contrast accessibility](https://web.dev/color-and-contrast-accessibility/).
1. **Color palette**. Click one of these squares to change the color to that of the square.
1. **Gamut boundary**. This boundary is for the new color spaces and [`color()`](/articles/high-definition-css-color-guide/#the-color-function) function. They can produce both HD and non-HD colors. The boundary lets you distinguish between them at a glance.
1. **Color circle**. Drag this circle to change the display value.  
1. **Hue** slider.
1. **Opacity** slider.
1. **Display value switcher**. Pick a color space from the drop-down list. See [Conver colors](#convert-colors)
   {% Aside %}
   **Note**: Alternatively, to open the drop-down menu directly, hold down <kbd>Shift</kbd> and click on the color preview icon next to the color value.
   {% endAside %}
1. **Color palette switcher**. Toggle between the [Material Design palette][26], a custom palette,
   or a page colors palette. DevTools generates the page color palette based on the colors that it
   finds in your stylesheets.

## Convert colors {: #convert-colors }

Toggle between the [RGBA][29], [HSLA][30], [HWBA][31], and [Hex][32] representations of the current color.

## Fix contrast issues {: # }

## Sample a color anywhere with the Eyedropper {: #eyedropper }

When you open the **Color Picker**, the **Eyedropper**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WKeaXT922ot9wQjtvwcZ.svg", alt="Eyedropper.", width="20", height="20" %} is on by default.

The **Eyedropper** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WKeaXT922ot9wQjtvwcZ.svg", alt="Eyedropper.", width="20", height="20" %} can sample colors both from the page and from anywhere on the screen:

To pick a color from anywhere on the screen:

1.  Hover over the target color.
1.  Click to confirm.

    <div class="elevation--4" style="margin-top: 20px; margin-bottom: 20px;">
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8Omn8AauWoiknzjzjlGA.png", alt="Using the Eyedropper anywhere on the screen.", width="800", height="450" %}</div>

In the example above, the **Color Picker** shows a current color value of `rgb(224 255 255 / 15%)`. This color changes to pink once you click it.

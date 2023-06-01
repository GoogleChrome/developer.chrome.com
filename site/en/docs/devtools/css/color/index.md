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

The **Color Picker** provides a GUI for changing `color` and `*-color` declarations and lets you create, convert, and debug non-HD and [HD colors](/articles/high-definition-css-color-guide/) with a click.

{% YouTube id='TuR27BxCRVk' %}

{% Aside "important" %}
This video shows Chrome DevTools version earlier than 112. In later versions, the **Styles** pane supports:

- 12 new color spaces and 7 new gamuts from the [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) specification.
- The [`color-mix()`](/blog/css-color-mix) function from [CSS Color Level 5](https://www.w3.org/TR/css-color-5/#color-mix).
{% endAside %}

For a deep dive on the new color spaces, see [High Definition CSS Color Guide](/articles/high-definition-css-color-guide/).

## Open the Color Picker and change colors {: #change-colors }

Use the **Color Picker** to change color values with a click:

1. [Select an element](/docs/devtools/css/reference/#select) in the **Elements** panel.
1. In the **Styles** pane, find the `color` or `*-color` declaration you want to change.

   To the left of each `color` or `*-color` value, there is a small square icon with a preview of that color.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UbGGOVBV5ZCxcPT3JCZk.png", alt="Color preview.", width="600", height="400" %}

   {% Aside %}
   This example shows two intersected circles next to the [`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) function: {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NxzOQosIfXPQDL5gi566.png", alt="Color-mix preview.", width="24", height="24" %}. The intersection is a preview of the resulting color.

   To inspect the computed value, [use the **Computed** pane](/docs/devtools/css/issues/#computed).
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/V3DUCujgQV8OQDzR0f4h.png", alt="The computed value of color-mix().", width="400", height="204", class="screenshot", style="margin-top: 20px;" %}
   {% endAside %}

1. Click the preview square next to a color to open the **Color Picker**.
1. To change the color, use any of the UI elements of the **Color Picker**.

## Color Picker elements {: #color-picker-elements }

Here's a description of each of the UI elements of the **Color Picker**:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AzrBlIl6iPByojkmoU4y.png", alt="The Color Picker, annotated.", width="800", height="908" %}

1. **Shades**.
1. **Eyedropper**. See [Sample a color anywhere with the Eyedropper](#eyedropper).
1. **Copy to clipboard**. Copy the **Display value** to your clipboard.
1. **Display value**. Arguments of the chosen color space.
1. **Contrast ratio**. Available only for `color` values. It's the difference between `color` and `background-color`. 
1. **Color palette**. Click a square to change the color to that of the square.
1. **Gamut boundary**. This line is available only for the new color spaces and the [`color()`](/articles/high-definition-css-color-guide/#the-color-function) function. They can produce both HD and non-HD colors. The line lets you distinguish between HD and non-HD.
1. **Color circle**. Drag this circle across the shades to change the display value.
1. **Hue slider**.
1. **Opacity slider**.
1. **Display value switcher**. Pick a color space from the drop-down list. See [Convert colors](#convert-colors).
   {% Aside %}
   Alternatively, to open the drop-down menu directly, hold down <kbd>Shift</kbd> and click on the color preview icon next to the color value.
   {% endAside %}
1. **Expand contrast ratio**. Opens the corresponding section that lets you [Fix contrast](#fix-contrast).
1. **Color palette switcher**. Click it to toggle between:

   - [**Material** Design palette](https://m2.material.io/design/color/the-color-system.html#color-usage-and-palettes).
   - **Custom** palette. To manually add the current color to this palette, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add.", width="20", height="20" %}.
   - **CSS Variables** palette. Lists all custom CSS variables (appended with `--`) on your page.
   - **Page colors** palette. To generate this palette, DevTools looks for all the colors in your stylesheets.

## Choose a color space {: #choose-color-space }

To choose a color space:

1. <kbd>Shift-click</kbd> the preview icon next a color value. A drop-down list opens.

   {% Aside %}
   Alternatively, click the **Display value switcher** in the **Color Picker**.
   {% endAside %}

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VDuxFzZRnRkSWsSfTlhx.png", alt="The drop-down list with all the supported color spaces.", width="800", height="838" %}

1. Choose one of the following color spaces:

   - [`#<hex-color>`](https://developer.mozilla.org/docs/Web/CSS/hex-color)
   - [`rgb(X X X / .X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/rgb).
   - [`hsl(X X X / X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/hsl).
   - [`hwb(X X X / .X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/hwb).
   
   Or one of the new spaces:
   - [`lch(X X X / .X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/lch)
   - [`oklch(X X X / .X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/oklch)
   - [`lab(X X X / .X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/lab)
   - [`oklab(X X X / .X)`](https://developer.mozilla.org/docs/Web/CSS/color_value/oklab)

   Or a space defined by the [`color(<color_space> X X X)`](/articles/high-definition-css-color-guide/#the-color-function) function.

### Convert colors {: #convert-colors }

When you switch between color spaces with the **Display value switcher**, DevTools automatically converts the values.

{% Aside 'caution' %}
When converting from HD to non-HD, DevTools clips gamuts to fit the space and marks clipped values with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hJxGejygnlBfMvhMtcCX.svg", alt="Warning.", width="24", height="24" %} warning icons. Hover over the icon to see the original value.

{% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/gKaBwo9xmgtONghzOdZr.png", alt="A warning icon indicating a gamut clipping and a tooltip with the original value.", width="400", height="204", class="screenshot" %}
{% endAside %}

{% Video src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/wsWrvMTPYM0a5tmNdzlQ.mp4", controls="true", loop="true", muted="true", class="screenshot" %}

## Fix contrast {: #fix-contrast }

{% Aside 'important' %}
The **Color Picker** calculates contrast ratios only for the `color` values and relative to the respective `background-color` values. So, only the `color` values have **Contrast ratio** sections.
{% endAside %}

To fix a contrast issue for a `color` declaration:

1. Open the **Color Picker** next to the `color` value.
1. Expand the **Contrast ratio** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1UTR0tiSxiKD0YSwAc1g.svg", alt="Expand.", width="24", height="24" %} section.
1. Use the suggested color that complies with a guideline:

   - Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5sHRUwsqWoQHF2BiEwlm.png", alt="Use suggested color.", width="23", height="20" %} next to the guideline.
   - In the **Shades** preview at the top, drag the **Color circle** below the corresponding line.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1OBcwQNbZivVFL4vbC47.png", alt="The expanded contrast ratio section with WebAIM or APCA guidelines.", width="800", height="518" %}

{% Aside %}
By default, the **Color Picker** suggests you to follow the [WebAIM guidelines](https://webaim.org/standards/wcag/). Alternatively, you can set it to suggest values compliant with [APCA](https://web.dev/color-and-contrast-accessibility/#advanced-perceptual-contrast-algorithm-apca):

In {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Experiments**](/docs/devtools/settings/experiments/), check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable new Advanced Perceptual Contrast Algorithm (APCA)...**
{% endAside %}

To get a list of all contrast issues in one go, follow the [Make your website more readable](/docs/devtools/accessibility/contrast/) guide.

## Sample a color anywhere with the Eyedropper {: #eyedropper }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WKeaXT922ot9wQjtvwcZ.svg", alt="Eyedropper.", width="20", height="20" %} **Eyedropper** can sample colors both from the page and from anywhere on the screen.

To pick a color from anywhere on the screen:

1. [Open the **Color Picker**](#change-colors) and do one of the following:
   - Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WKeaXT922ot9wQjtvwcZ.svg", alt="Eyedropper.", width="20", height="20" %} button.
   - Press <kbd>C</kbd> to activate the **Eyedropper**. To deactivate, press <kbd>Escape</kbd>.
1. With the **Eyedropper** active, hover over the target color and click to sample.

{% Aside %}
The **Eyedropper** samples colors only in the sRGB color space. When you sample outside this space, the **Eyedropper** clips the color to the closest one. See [Convert colors](#convert-colors).
{% endAside %}

  <div class="elevation--4" style="margin-top: 20px; margin-bottom: 20px;">
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8Omn8AauWoiknzjzjlGA.png", alt="Using the Eyedropper anywhere on the screen.", width="800", height="450" %}</div>

In this example, the **Color Picker** shows a current color value of `rgb(224 255 255 / 15%)`. This color changes to pink once you click outside Chrome.

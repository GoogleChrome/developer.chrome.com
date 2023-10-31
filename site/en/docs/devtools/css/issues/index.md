---
layout: "layouts/doc-post.njk"
title: "Find invalid, overridden, inactive, and other CSS"
authors:
  - sofiayem
date: 2022-11-15
description: "Discover issues with CSS properties at a glance."
tags:
  - css
  - find-issues
---

{% YouTube id='iuZx0kHS0Xs' %}

This guide assumes that you're familiar with inspecting CSS in Chrome DevTools. See [View and change CSS][1] to learn the basics.

## Inspect the CSS you author {: #styles }

Suppose that you added some CSS to an element and want to make sure the new styles are
applied properly. When you refresh the page, the element looks the same as before. Something is wrong.

The first thing to do is [inspect the element][2] and make sure that your new CSS is actually applied to the element.

Sometimes, you'll see your new CSS in the **Elements** > **Styles** pane but your new CSS is in <span style="opacity: 60%;">pale text</span>, non-editable, crossed out, or has a warning or hint icon next to it.

## Understand CSS in the Styles pane {: #css-in-styles }

The **Styles** pane recognizes many kinds of CSS issues and highlights them in different ways.

### Matched and unmatched selectors {: #selectors }

The **Styles** pane shows matched selectors in regular text and unmatched ones in <span style="opacity: 60%;">pale text</span>.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/f1ByDQYIm6cZ04CXX69h.png", alt="Matched selector in regular text and unmatched selectors in pale text.", width="800", height="645" %}

### Invalid values and declarations {: #invalid }

The **Styles** pane crosses out and displays {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hJxGejygnlBfMvhMtcCX.svg", alt="Warning.", width="24", height="24" %} warning icons next to the following:

- An entire CSS declaration (property and value) when the CSS property is invalid or unknown.
- Just the value when the CSS property is valid but the value is invalid.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DN3BUNcp4jhpNvYgUmWD.png", alt="Invalid property name and invalid property value.", width="800", height="401" %}

### Overridden {: #overridden }

The **Styles** pane crosses out properties that are overridden by other properties according to the [Cascading order][3].

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/rFzkt37FiDQ2kaxus8HD.mp4", autoplay=false, controls=true, loop=true, class="screenshot" %}

In this example, the `width: 300px;` style attribute on the element overrides `width: 100%` on the `.youtube` class.

### Inactive {: #inactive }

The **Styles** pane displays in <span style="opacity: 60%;">pale text</span> and puts {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2OyGRodvgk9neTIEAH4g.svg", alt="Information.", width="24", height="24" %} information icons next to properties that are valid but have no effect because of other properties.

These pale properties are inactive because of CSS logic, not the [Cascading order][3].

{% Aside 'gotchas' %}
- The pale inactive properties differ from pale [non-inherited properties](#inherited-and-non-inherited). Inactive properties have icons.

- Hover over the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2OyGRodvgk9neTIEAH4g.svg", alt="Information.", width="24", height="24" %} icon to get a hint at what went wrong.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pe6BdDcVryWmOuT3YjLz.png", alt="Inactive CSS declaration with a hint.", width="800", height="498" %}

In this example, the `display: block;` property disables `justify-content` and `align-items` that control flex or grid layouts.

### Inherited and non-inherited {: #inherited-and-non-inherited }

The **Styles** pane lists properties in `Inherited from <element-name>` sections depending on their [default inheritance](https://developer.mozilla.org/docs/Web/CSS/inheritance):

- Inherited by default are in regular text.
- Non-inherited by default are in <span style="opacity: 60%;">pale text</span>.

{% Aside 'gotchas' %}
- The pale non-inherited properties differ from pale [inactive properties](#inactive). Non-inherited properties don't have icons and are in the corresponding sections.
- [Overriding default inheritance](https://developer.mozilla.org/docs/Web/CSS/inheritance#overriding_inheritance_an_example) *doesn't* affect the way the **Styles** pane displays the properties: pale or not.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pkBcVUnT1QLxEZkhq9P9.png", alt="The 'Inherited from body' section listing inherited and non-inherited CSS.", width="800", height="431" %}

### Shorthand {: #shorthand }

[Shorthand (concise) properties](https://developer.mozilla.org/docs/Web/CSS/Shorthand_properties) let you set multiple CSS properties at once and can make your stylesheet more readable. However, due to the short nature of such properties, you may miss a longhand (precise) property that overrides a property implied by the shorthand.

The **Styles** pane displays shorthand properties as {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} drop-down lists that contain all the properties that are shortened.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vzJiWOkmE0WeeZoJtdah.png", alt="The shorthand property with a drop-down list.", width="800", height="597" %}

In this example, two of four shortened properties are actually overridden.

### Non-editable {: #non-editable}

The **Styles** pane displays properties that can't be edited in *italic text*. For example, the CSS from the following sources can't be edited:

- `user agent stylesheet`—Chrome's default stylesheet.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yhDE5n8UWyu2T2CwKGOZ.png", alt="The CSS from user agent stylesheet.", width="800", height="445" %}

- Style-related HTML attributes on the element, for example, height, width, color, etc. You can edit them in the DOM tree and this updates the CSS in the **Styles** pane, but not the other way around.

  {% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/TwzSI9igPEbgELGEyAzU.mp4", autoplay=false, controls=true, loop=true, class="screenshot" %}

  In this example, the `height="48"` attribute on an `<svg>` element is set to `50`. This updates the corresponding property under `svg[Attributes Style]` in the **Styles** pane.

## Inspect an element that still isn't styled the way you think  {: #computed }

To try to find what goes wrong, you may want to check:

- [CSS documentation](/docs/devtools/css/reference/#view-docs) and [selector specificity](/docs/devtools/css/reference/#selector-specificity) in the tooltips in the **Styles** pane.
- The **Computed** pane to see the "final" [CSS applied to an element](/docs/devtools/css/reference/#computed) and compare to that you declared.

The **Elements** > **Styles** pane displays the exact set of CSS rules as they are written in various stylesheets. On the other hand, the **Elements** > **Computed** pane lists resolved CSS values that Chrome uses to render an element:

- CSS derived from [inheritance](https://developer.mozilla.org/docs/Web/CSS/inheritance)
- [Cascade](https://developer.mozilla.org/docs/Web/CSS/Cascade) winners
- Longhand properties (precise), not shorthand (concise)
- Computed values, for example, `font-size: 14px` instead of `font-size: 70%`

## Understand CSS in the Computed pane {: #css-in-computed }

The **Computed** pane also displays various properties differently.

### Declared and inherited {: #declared }

The **Computed** pane lists the properties declared in any stylesheet in regular font, both element's own and inherited. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nyctZrDPlhQ1A9VReOp9.svg", alt="Expand.", width="24", height="24" %} expand icon next to them to see their source.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Z1cxlMCpTopX5xJLQGkb.png", alt="Declared properties.", width="800", height="535" %}

To see the declaration in the **Styles** pane, hover over the expanded property and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/E8KSBR4jJbyo7OfK5fJa.svg", alt="Arrow right.", width="24", height="24" %} arrow button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zRulO8jUcl9z02rynP6K.png", alt="The arrow button next to the property.", width="800", height="559" %}

To see the declaration in the **Sources** pane, click the link to the source file.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IXWr9VSZIjjcX1jtfTDA.png", alt="The link to the source file.", width="800", height="549" %}

For properties with multiple sources, the **Computed** pane shows the [Cascade winner][3] first.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LR2zDV73KcTKTkREzKz7.png", alt="A property with multiple sources.", width="800", height="549" %}

### Runtime {: #runtime }

The **Computed** pane lists property values calculated at runtime in <span style="opacity: 60%;">pale text</span>.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NktGdwh9vgmkfHyfoJiy.png", alt="Property values calculated at runtime.", width="800", height="631" %}

In this example, Chrome calculated the following for the `<ul>` element:

- The `width` relative its parent, `<div>`
- The `height` relative to its children, the two `<li>` elements

### Non-inherited and custom {: #inherited-and-default }

To make the **Computed** pane show *all* properties and their values, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show all**. All properties include:

- [Initial values for non-inherited properties](https://developer.mozilla.org/docs/Web/CSS/inheritance) in <span style="opacity: 60%;">pale text</span>.
- [Custom properties](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties)—with a `--` prefix in regular text. Such properties are inherited by default.

{% Aside 'gotchas' %}
[Overriding default inheritance](https://developer.mozilla.org/docs/Web/CSS/inheritance#overriding_inheritance_an_example) *doesn't* affect the way the **Computed** pane displays the properties: pale or not.
{% endAside %}

To break this big list into categories, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Group**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/f7aX2rDMN5tp8FYRflcL.png", alt="All properties grouped.", width="800", height="676" %}

This example shows the initial values for non-inherited properties under **Animation** and custom properties under **CSS Variables**.

## Search for duplicates {: #filter }

To investigate a specific property and its potential duplicates, type that property name in the **Filter** textbox. You can do this both in the **Styles** and **Computed** panes.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YF2aohEStRzAOvSQfWVj.png", alt="The Filter textboxes on Styles and Computed panes.", width="800", height="339" %}

See [Search and filter an element's CSS](/docs/devtools/css/reference/#filter).

## Find unused CSS {: #coverage }

See [Coverage: Find unused JavaScript and CSS](/docs/devtools/coverage/).

[1]: /docs/devtools/css
[2]: /docs/devtools/css/reference#select
[3]: https://developer.mozilla.org/docs/Web/CSS/Cascade#cascading_order

---
title: >
  DevTools Tips: Discover and fix low contrast text
description: >
  Learn how to use Chrome DevTools to discover and fix low contrast text.
layout: 'layouts/blog-post.njk'
date: 2022-10-19
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wBe88JjzaCRFCybZu2Ia.png'
alt: >
  DevTools Tips hero logo
tags:
  - css
  - devtools
  - devtools-tips
---

Low contrast text is the top accessibility issue on the web. In February 2022, 83.9% of the top million home pages had this issue. Check out the [WebAIM Million 2022 report](https://webaim.org/projects/million/#wcag) to learn more.

Chrome DevTools lets you discover all contrast issues at a glance and fix them with a click of button.

{% YouTube id='t4pDjqhG6fE' %}

Watch the video to learn how to:

- View contrast ratios in the inspector mode's tooltip and the recommended ratio values in the **Color Picker**.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/odkqE1ed3sgVxnAypWwF.png", alt="Contrast ratios are available in a tooltip, with a Color Picker to measure the ratio of alternative colors. AA and AAA grading of the ration is available.", width="800", height="525" %}

- In the **Color Picker**, select suggested colors or pick a color below the contrast ratio lines to comply with the [WebAIM guidelines](https://webaim.org/standards/wcag/).

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tolxw3v0DlcOHGZhbJPZ.png", alt="Recommended contrast ratio lines are available in the shades preview of the Color Picker.", width="800", height="525" %}

- Discover all contrast issues in the **CSS Overview** and (preview) **Issues** panels.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/G1vFeA4jqqbuXHnW6IZK.png", alt="Contrast issues listed in the CSS Overview panel and Issues tab.", width="800", height="644" %}

- Emulate vision deficiencies to understand what your page looks like for all your users.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QdE5Gr23r68leiaVjfUI.png", alt="Blurred vision selected in the Rendering tab and emulated in the viewport.", width="800", height="500" %}

For a more hands-on learning experience, see the [Make your website more readable](/docs/devtools/accessibility/contrast/) tutorial.

To learn more, see:

- [Color and contrast accessibility](https://web.dev/color-and-contrast-accessibility/)
- [WebAIM guidelines](https://webaim.org/standards/wcag/)
- [Learn Accessibility's color and contrast module](https://web.dev/learn/accessibility/color-contrast/)
- [Learn Accessibility](https://web.dev/learn/accessibility/) in general

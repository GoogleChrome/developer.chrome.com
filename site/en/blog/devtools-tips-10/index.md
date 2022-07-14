---
title: >
  DevTools Tips: How to emulate CSS user preference media features with DevTools
description: >
  Use the Rendering tab to emulate user's preferences and test the user-adaptive behavior of your website.
layout: 'layouts/blog-post.njk'
date: 2022-07-14
authors:
  - sofiayem
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mwoHOwiWz8gtuJ40hR7x.png'
alt: >
  DevTools Tips hero logo
tags:
  - css
  - devtools
  - devtools-tips
---

[User preference media features](https://web.dev/new-responsive/#responsive-to-the-user) give you the ability to style web experiences that align with the user's own specific preferences and needs. In other words, preference media features allow you to adapt your user experiences to your user's expectations.

{% YouTube id='gOkM1L6azEI' %}

You can enhance the user experience of your website by taking the following three steps:

1. **Discover the possibilities**. Learn all the [user preference media features](https://developer.mozilla.org/docs/Web/CSS/@media#media_features).
1. **Style your web experiences**. Implement, for example, color, layout, and element size changes based on the preferences.
1. **Test the UI**. In [DevTools](/docs/devtools/), emulate the preferences and test how your website behaves.

DevTools supports a variety of emulation options. To help you avoid searching for and adjusting system and browser settings, all the emulation options reside in one place—under the **Rendering** tab in DevTools.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wqYu1jaLer1d4kcxBlDD.png", alt="The Rendering tab.", width="800", height="1006" %}

The emulation options of the user's preferences include but are not limited to:

- `prefers-color scheme`—light or dark color scheme
- `prefers-contrast`—lower or higher contrast
- `prefers-reduced-motion`—minimize motion or not
- `prefers-reduced-data`—consume less traffic or not

For a comprehensive list of all emulation options, see [Emulate CSS media features](/docs/devtools/rendering/emulate-css/).

To discover more effects you can apply using the **Rendering** tab, see the [Rendering tab overview](/docs/devtools/rendering/).

Additionally, with DevTools, your testing capabilities aren't limited to the single device you're working on. You can [Simulate mobile devices with Device Mode](/docs/devtools/device-mode/).

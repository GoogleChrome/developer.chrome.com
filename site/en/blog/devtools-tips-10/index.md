---
title: >
  DevTools Tips: How to emulate user preferences with DevTools
description: >
  Use the Rendering tab to emulate user's preferences and test the user-adaptive behavior of your website.
layout: 'layouts/blog-post.njk'
date: 2022-07-14
authors:
  - sofiayem
hero: ''
alt: >
  DevTools Tips hero logo
tags:
  - css
  - devtools
  - devtools-tips
---

User-adaptive interfaces change themselves according to the user’s preferences. 

You can enhance the user experience of your website by taking the following three steps:

1. Use [CSS media queries](https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries) to learn what the user’s preferences are.
1. Implement, for example, color, layout, and element size changes based on the preferences.
1. In DevTools, emulate the preferences and test how your website behaves.

DevTools supports a variety of emulation options. To help you avoid searching for and adjusting system and browser settings in different places, all the emulation options reside in one place—under the **Rendering** tab in DevTools.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wqYu1jaLer1d4kcxBlDD.png", alt="The Rendering tab.", width="800", height="1006" %}

The emulation options of the user’s preferences include but are not limited to:

- Light or dark color scheme
- Forced colors
- Contrast
- Reduced motion
- Reduced data

For a comprehensive list of all emulation options, see [Emulate CSS media features](/docs/devtools/rendering/emulate-css/).

To discover more effects you can apply using the **Rendering** tab, see the [Rendering tab overview](/docs/devtools/rendering/). 

Additionally, with DevTools, your testing capabilities aren't limited to the single device you're working on. You can [Simulate mobile devices with Device Mode](/docs/devtools/device-mode/).

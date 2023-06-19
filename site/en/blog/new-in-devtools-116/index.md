---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 116)"
authors:
  - sofiayem
date: 2023-06-20
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s7ZpM4wjhbRf5K6Vspk3.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-116
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='CrSmjooOEiE' %}

<!-- $contentStart -->

## Linear timing support in Elements > Styles > Easing Editor {: #linear }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Easing Editor.", width="22", height="22" %} [**Easing Editor**](/docs/devtools/css/reference/#edit-easing) in **Elements** > **Styles** lets you adjust [`transition-timing-function`](https://developer.mozilla.org/docs/Web/CSS/transition-timing-function) and [`animation-timing-function`](https://developer.mozilla.org/docs/Web/CSS/animation-timing-function) values with a click. In this version, the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Easing Editor.", width="22", height="22" %} **Easing Editor** gets the linear timing function support.

To configure linear timings, click the linear picker button. To add a control point, click anywhere on the line. To remove a control point, double-click it. You can also choose one of the presets: `linear`, `elastic`, `bounce`, or `emphasized`. Watch the video to see the linear adjustment in action.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/2KQ2gCmcR6mGKO29wCJH.mp4", width="800", height="529", loop="false", muted="true", controls="true"%}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/670222516a187b5102ad78828cff1e2d5861aeec #}

Chromium issue: [1421241](https://crbug.com/1421241).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:


<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

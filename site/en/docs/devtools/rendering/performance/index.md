---
layout: "layouts/doc-post.njk"
title: "Discover issues with rendering performance"
authors:
  - sofiayem
  - kaycebasques
date: 2022-04-13
description:
  "Spot repainting, layout shifts, layers and tiles, scrolling issues, see rendering statistics and Core Web Vitals."
tags:
  - performance
  - find-issues
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

Discover rendering performance issues with this reference of performance-related options on the **Rendering** tab.

## Highlight repainted areas with paint flashing {: #paint-flashing }

With this option switched on, Chrome flashes the screen green whenever repainting happens.

To view areas that are being repainted:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) on this [demo](https://googlechrome.github.io/devtools-samples/jank/) and check **Paint flashing**.
1. Observe the repainting highlighted in green.

<div class="elevation--2">
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kjDGMyDCCVNWxYbvRNSZ.gif", alt="Paint flashing", width="800", height="359" %}
</div>

If, on another page, you see the whole screen flash green or areas of the screen that you didn't think should be painted, consider investigating further.

## Highlight layout shift regions {: #layout-shift-regions }

[Layout shifts](https://web.dev/cls/) cause unexpected repaints and can be not only annoying but harmful.

<figure>
  <video autoplay controls loop muted
    poster="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability-poster.png"
    width="658" height="510">
    <source
      src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.mp4"
      type="video/mp4; codecs=h264">
  </video>
  <figcaption>
    A screencast illustrating how layout instability can negatively affect
    users.
  </figcaption>
</figure>

To view the location and timing of the layout shifts on a page:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and check **Layout Shift Regions**.

2. <span class="material-icons">refresh</span> Refresh the page. Areas of layout shift are briefly highlighted in purple.

<div class="elevation--2">
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/A4KvbnzAz12tXZXKCjNC.gif", alt="Layout shift", width="800", height="359" %}
</div>

## View layers and tiles with layer borders {: #layer-borders }

Use **Layer Borders** to view an overlay of [layer borders](/blog/inside-browser-part3/#what-is-compositing) and [tiles](/blog/inside-browser-part3/#raster-and-composite-off-of-the-main-thread) on top of the page.

To enable layer borders:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and check **Layer Borders**.
1. Observe layer borders in orange and olive and tiles in cyan.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/n2yaLGyuuNtF25elbJcu.png", alt="Layer borders and tiles", width="800", height="389" %}

See the comments in [`debug_colors.cc`][32] for an explanation of the color-codings.

## View frames per second in real time with frame rendering stats {: #frame-rendering-stats }

The **Frame rendering stats** is an overlay that appears in the top-right corner of your viewport.

To open the **Frame rendering stats**:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and enable the **Frame rendering stats** checkbox.
1. Observe the statistics in the top right corner of the page.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7BR4zTh9IMobaelSH0xV.png", alt="Frame rendering stats", width="300", height="358" , class="screenshot"%}

The **Frame rendering stats** overlay shows:

- Real time estimate of frames per second as the page runs.
- Frame timeline as a plot with three frame types:
   - Successfully rendered frames (blue lines)
   - Partially presented frames (yellow lines)
   - Dropped frames (red lines).
- The state of the GPU raster: on or off. For more information, see [How to get GPU rasterization][4].
- GPU memory usage: the number of used and maximum MB of memory.

## Identify scrolling performance issues {: #scrolling-performance-issues }

Use **Scrolling Performance Issues** to identify elements of the page that have event listeners related to scrolling that may harm the performance of the page.

To view the potentially problematic elements:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and check **Scrolling Performance Issues**.
1. Observe the potentially problematic elements highlighted.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GW40vR3wxrl5nh04bHzE.png", alt="Scrolling Performance Issues is indicating that there are multiple event listeners that may harm scroll performance", width="800", height="406" %}

## View Core Web Vitals

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

Core Web Vitals are the subset of Web Vitals that apply to all web pages. Each of the Core Web Vitals represents a distinct facet of the user experience, is measurable in the field, and reflects the real-world experience of a critical user-centric outcome. The Core Web Vitals are:

- **[Largest Contentful Paint (LCP)](https://web.dev/lcp/)**: measures _loading_ performance.
  To provide a good user experience, LCP should occur within **2.5 seconds** of
  when the page first starts loading.
- **[First Input Delay (FID)](https://web.dev/fid/)**: measures _interactivity_. To provide a
  good user experience, pages should have a FID of **100 milliseconds** or less.
- **[Cumulative Layout Shift (CLS)](https://web.dev/cls/)**: measures _visual stability_. To
  provide a good user experience, pages should maintain a CLS of **0.1.** or
  less.

To view the Core Web Vitals as an overlay in the top right corner of the viewport:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and check **Core Web Vitals**.
1. Scroll the page to reveal all layout shifts and perform an interaction, for example, click a button, open a tab, or enter text in a textbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HW8iWmtzvC3S0uuQdcsp.png", alt="Core Web Vitals", width="400", height="311" %}

Green Core Web Vitals indicate that your page is in good shape. Yellow or red vitals need attention.

[4]: https://www.chromium.org/developers/design-documents/chromium-graphics/how-to-get-gpu-rasterization/
[32]: https://cs.chromium.org/chromium/src/cc/debug/debug_colors.cc

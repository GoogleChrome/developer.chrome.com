---
layout: "layouts/doc-post.njk"
title: "Rendering: feature reference"
authors:
  - sofiayem
  - kaycebasques
date: 2018-12-14
updated: 2022-04-06
description:
  "Open the Rendering tab, enable print preview mode, automatic dark theme, and more."
tags:
  - emulate
  - test
  - find-issues
  - css
---

The **Rendering** tab contains a collection of options that affect web content rendering. With this tab, you can discover issues with content repainting, layout shifts, scrolling performance, different display options, and more.

To open the **Rendering** tab:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/vAwmfhwU6lLmrbEBCSsc.png", alt="The Command Menu", width="800", height="632" %}

1.  Start typing `rendering`, select **Show Rendering**, and press <kbd>Enter</kbd>.
    DevTools displays the **Rendering** tab at the bottom of your DevTools window.

## Highlight repainted areas with paint flashing {: #paint-flashing }

With this option switched on, Chrome flashes the screen green whenever repainting happens.

To highlight areas that are being repainted:

1. Open the [demo](https://googlechrome.github.io/devtools-samples/jank/), and, on the **Rendering tab**, check **Paint flashing**.

   {% Img src="image/admin/AKUsdeRRaSFncCF94ap5.gif", alt="Paint flashing", width="800", height="322" %}

1. Observe the repainting highlighted in green.

If, on your page, you see the whole screen flash green, or areas of the screen that you didn't think should be painted, consider investigating further.

## Highlight layout shift regions {: #layout-shift-regions }

Discover the location and timing of the layout shifts happening on a page.

To highlight layout shifts:

1. On the **Rendering tab**, check **Layout Shift Regions**.

2. Refresh the page. Areas of layout shift are briefly highlighted in purple.

img

### View layers with layer borders {: #layer-borders }

Use **Layer Borders** to view an overlay of layer borders and tiles on top of the page.

To enable Layer Borders:

1. On the **Rendering tab**, check **Layer Borders**.
1. Observe layer borders in orange and olive and tiles in cyan.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fNAI08rYVM3yVqEmowTt.png", alt="Layer borders and tiles", width="800", height="479" %}

See the comments in [`debug_colors.cc`][32] for an explanation of the color-codings.

## View frames per second in real time with frame rendering stats {: #frame-rendering-stats }

The **Frame rendering stats** is an overlay that appears in the top-right corner of your viewport.

To open the **Frame rendering stats**:

1. On the **Rendering** tab, enable the **Frame rendering stats** checkbox.
1. Observe the statistics in the top right corner of the page.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7BR4zTh9IMobaelSH0xV.png", alt="Frame rendering stats", width="388", height="358" %}

The **Frame rendering stats** overlay shows:

- Real time estimate of frames per second as the page runs.
- Plot of frames: rendered frames (blue), partially presented frames (yellow), dropped frames (red).
- The state of the GPU raster: on or off. For more information, see [How to get GPU rasterization][4].
- GPU memory usage: the number of used and maximum MB of memory.

## Scrolling performance issues {: #scrolling-performance-issues }

Use **Scrolling Performance Issues** to identify elements of the page that have event listeners related to scrolling that may harm the performance of the page. DevTools outlines the potentially-problematic elements in teal.

To view scroll performance issues:

1. On the **Rendering** tab, check **Scrolling Performance Issues**.
1. Observe the potentially problematic elements highlighted.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NH12bctPHXR9VD9GO7ov.png", alt="Scrolling Performance Issues is indicating that there's a mousewheel event listener encompassing the entire viewport that may harm scroll performance", width="800", height="498" %}

## Highlight ad frames

Check if frames have been tagged as ads:

1. On the **Rendering** tab, check **Highlight ad frames**.
1. Observe the ad frames highlighted in red.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UuQMD7ifcGe1n6nFdYth.png", alt="Ad highlighted in red", width="800", height="490" %}

## View Core Web Vitals

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

Core Web Vitals are the subset of Web Vitals that apply to all web pages. Each of the Core Web Vitals represents a distinct facet of the user experience, is measurable in the field, and reflects the real-world experience of a critical user-centric outcome. The Core Web Vitals are:

- **[Largest Contentful Paint (LCP)](/lcp/)**: measures _loading_ performance.
  To provide a good user experience, LCP should occur within **2.5 seconds** of
  when the page first starts loading.
- **[First Input Delay (FID)](/fid/)**: measures _interactivity_. To provide a
  good user experience, pages should have a FID of **100 milliseconds** or less.
- **[Cumulative Layout Shift (CLS)](/cls/)**: measures _visual stability_. To
  provide a good user experience, pages should maintain a CLS of **0.1.** or
  less.

To view the Core Web Vitals as an overlay in the top right corner of the viewport:

1. On the **Rendering** tab, check **Core Web Vitals**.
1. Scroll the page to reveal all layout shifts and perform an interaction, for example, click a button, open a tab, or enter text in a textbox.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HW8iWmtzvC3S0uuQdcsp.png", alt="ALT_TEXT_HERE", width="800", height="311" %}

If your Core Web Vitals are in good shape, they are green. If they need attention, they are yellow or red.

## Disable local fonts

Check if the local font alternatives work as expected by disabling `local()` sources in `@font-face` rules.

<style>
    @font-face {
      font-family: "MyFont";
      src: local("Courier New"), url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
    }
    .text-box {
      font-family: 'MyFont';
    }
</style>
<div class="text-box">Chrome displays this sentence in Courier New if it finds this font on your computer.</div>

Disable local fonts:

1. On the **Rendering** tab, check **Disable local fonts**.
1. Reload the page and observe the font of the sentence above change to Roboto.

## Emulate a focused page

## Enable automatic dark mode

## Emulate CSS media feature `prefers-color-scheme`

## Emulate CSS media type (print preview mode)

The [print media query][1] controls how your page looks when printed. To force your page into print preview mode:

1.  Under **Emulate CSS media type** select **print**.

    {% Img src="image/admin/F5e5z6N1lhwERU1TrX8c.png", alt="Print preview mode.", width="800", height="588" %}

From here, you can view and change your CSS, like any other web page. See [Get Started With Viewing And Changing CSS][2].

## Emulate CSS media feature `forced-colors`

## Emulate CSS media feature `prefers-contrast`

## Emulate CSS media feature `prefers-reduced-motion`

## Emulate CSS media feature `color-gamut`

## Emulate vision deficiencies

## Disable AVIF image format

## Disable WebP image format

[1]: https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries
[2]: /docs/devtools/css
[3]: /docs/devtools/command-menu/
[4]: https://www.chromium.org/developers/design-documents/chromium-graphics/how-to-get-gpu-rasterization/
[32]: https://cs.chromium.org/chromium/src/cc/debug/debug_colors.cc

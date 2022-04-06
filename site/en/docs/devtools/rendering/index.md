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
  - css
---



To open the **Rendering** tab:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/vAwmfhwU6lLmrbEBCSsc.png", alt="The Command Menu", width="800", height="632" %}

1.  Start typing `rendering`, and select **Show Rendering**, and then press <kbd>Enter</kbd>.
    DevTools displays the **Rendering** tab at the bottom of your DevTools window.


## Paint flashing {: #paint-flashing }

With this option switched on, Chrome flashes the screen green whenever painting happens.

To identify areas that are being painted:

1. On the **Rendering tab**, check **Paint flashing**.

   {% Img src="image/admin/AKUsdeRRaSFncCF94ap5.gif", alt="Paint flashing", width="800", height="322" %}

1. Observe the repainting highlighted in green or, if nothing changes, make an action that causes repainting, for example, drag a cursor over an element that is supposed to be highlighted with a cursor hover.

If you see the whole screen flash green, or areas of the screen that you didn't think should be painted, consider investigating further.

## Layout shift regions {: #layout-shift-regions }

Discover the location and timing of the layout shifts happening on a page.

To identify layout shifts:

1. On the **Rendering tab**, check **Layout Shift Regions**.

2. Refresh the page. Areas of layout shift are briefly highlighted in purple.

img

### View an overlay of layers with Layer Borders {: #layer-borders }

Use **Layer Borders** to view an overlay of layer borders and tiles on top of the page.

To enable Layer Borders:

1. On the **Rendering tab**, check **Layer Borders**.
1. Hover the cursor over the page to see how layer borders change.

{% Img src="image/admin/FAgzk3UUc2WZC5i28X9f.png", alt="Layer Borders", width="800", height="515" %}

See the comments in [`debug_colors.cc`][32] for an explanation of the color-codings.

## Frame rendering stats {: #frame-rendering-stats }

The **FPS meter** is an overlay that appears in the top-right corner of your viewport. It provides a real time estimate of FPS as the page runs.

To open the **FPS meter**:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][29].
2.  Enable the **FPS Meter** checkbox.

{% Img src="image/admin/ztC0PRZRr0tczy4jqrxq.png", alt="The FPS meter", width="800", height="593" %}

## Scrolling performance issues {: #scrolling-performance-issues }

Use Scrolling Performance Issues to identify elements of the page that have event listeners related to scrolling that may harm the performance of the page. DevTools outlines the potentially-problematic elements in teal.

To view scroll performance issues:

1. On the **Rendering** tab, check **Scrolling Performance Issues**.
1. Scroll your page.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NH12bctPHXR9VD9GO7ov.png", alt="Scrolling Performance Issues is indicating that there's a mousewheel event listener encompassing the entire viewport that may harm scroll performance", width="800", height="498" %}

## Highlight ad frames

## Core web vitals

## Disable local fonts

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

### View frames per second in realtime with the FPS meter {: #fps-meter }

The **FPS meter** is an overlay that appears in the top-right corner of your viewport. It provides a
realtime estimate of FPS as the page runs. To open the **FPS meter**:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][29].
2.  Enable the **FPS Meter** checkbox.

{% Img src="image/admin/ztC0PRZRr0tczy4jqrxq.png", alt="The FPS meter", width="800", height="593" %}

### Find scroll performance issues in real time

Use Scrolling Performance Issues to identify elements of the page that have event listeners related
to scrolling that may harm the performance of the page. DevTools outlines the
potentially-problematic elements in teal.

To view scroll performance issues:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][33].
2.  Enable the **Scrolling Performance Issues** checkbox.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NH12bctPHXR9VD9GO7ov.png", alt="Scrolling Performance Issues is indicating that there's a mousewheel event listener encompassing the entire viewport that may harm scroll performance", width="800", height="498" %}

[1]: https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries
[2]: /docs/devtools/css
[3]: /docs/devtools/command-menu/

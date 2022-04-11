---
layout: "layouts/doc-post.njk"
title: "Rendering: feature reference"
authors:
  - sofiayem
  - kaycebasques
date: 2018-12-14
updated: 2022-04-06
description:
  "Open the Rendering tab, find rendering issues, emulate display options, enable automatic dark mode, and more."
tags:
  - emulate
  - test
  - find-issues
  - css
  - accessibility
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

Discover a collection of options that affect web content rendering with this reference of the **Rendering** tab features in DevTools.

The **Rendering** tab helps you:

- Discover issues with content repainting, layout shifts, scrolling performance, and more.
- Test how pages render with different display options and CSS media features without manually specifying them in your code or testing environment.
    
    For example,  you can emulate light or dark mode preference without changing your system settings.

## Open the Rendering tab {: #open-rendering }

To open the **Rendering** tab: 

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/vAwmfhwU6lLmrbEBCSsc.png", alt="The Command Menu", width="800", height="632" %}

1.  Start typing `rendering`, select **Show Rendering**, and press <kbd>Enter</kbd>.
    DevTools displays the **Rendering** tab at the bottom of your DevTools window.

Alternatively, click **More Options** {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="6", height="26" %} > **More tools** > **Rendering**.

## Highlight repainted areas with paint flashing {: #paint-flashing }

With this option switched on, Chrome flashes the screen green whenever repainting happens.

To view areas that are being repainted:

1. [Open the **Rendering** tab](#open-rendering) on the [demo](https://googlechrome.github.io/devtools-samples/jank/) and check **Paint flashing**.
1. Observe the repainting highlighted in green.

<div class="elevation--2">
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kjDGMyDCCVNWxYbvRNSZ.gif", alt="Paint flashing", width="800", height="359" %}
</div>

If, on another page, you see the whole screen flash green or areas of the screen that you didn't think should be painted, consider investigating further.

## Highlight layout shift regions {: #layout-shift-regions }

[Layout shifts](https://web.dev/cls/) can be not only annoying but harmful.

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

1. [Open the **Rendering** tab](#open-rendering) and check **Layout Shift Regions**.

2. <span class="material-icons">refresh</span> Refresh the page. Areas of layout shift are briefly highlighted in purple.

<div class="elevation--2">
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/A4KvbnzAz12tXZXKCjNC.gif", alt="Layout shift", width="800", height="359" %}
</div>

## View layers with layer borders {: #layer-borders }

Use **Layer Borders** to view an overlay of layer borders and tiles on top of the page.

To enable layer borders:

1. [Open the **Rendering** tab](#open-rendering) and check **Layer Borders**.
1. Observe layer borders in orange and olive and tiles in cyan.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/n2yaLGyuuNtF25elbJcu.png", alt="Layer borders and tiles", width="800", height="389" %}

See the comments in [`debug_colors.cc`][32] for an explanation of the color-codings.

## View frames per second in real time with frame rendering stats {: #frame-rendering-stats }

The **Frame rendering stats** is an overlay that appears in the top-right corner of your viewport.

To open the **Frame rendering stats**:

1. [Open the **Rendering** tab](#open-rendering) and enable the **Frame rendering stats** checkbox.
1. Observe the statistics in the top right corner of the page.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7BR4zTh9IMobaelSH0xV.png", alt="Frame rendering stats", width="388", height="358" , class="screenshot"%}

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

1. [Open the **Rendering** tab](#open-rendering) and check **Scrolling Performance Issues**.
1. Observe the potentially problematic elements highlighted.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GW40vR3wxrl5nh04bHzE.png", alt="Scrolling Performance Issues is indicating that there are multiple event listeners that may harm scroll performance", width="800", height="406" %}

## Highlight ad frames

To check if frames have been tagged as ads:

1. [Open the **Rendering** tab](#open-rendering)  an the [demo page](https://heavy-ads.glitch.me/) and check **Highlight ad frames**.
1. Observe the ad frame highlighted in red.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UuQMD7ifcGe1n6nFdYth.png", alt="Ad highlighted in red", width="800", height="490" %}

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

1. [Open the **Rendering** tab](#open-rendering) and check **Core Web Vitals**.
1. Scroll the page to reveal all layout shifts and perform an interaction, for example, click a button, open a tab, or enter text in a textbox.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HW8iWmtzvC3S0uuQdcsp.png", alt="ALT_TEXT_HERE", width="800", height="311" %}

Green Core Web Vitals indicate that your page is in good shape. Yellow or red vitals need attention.

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

To disable local fonts:

1. [Open the **Rendering** tab](#open-rendering) and check **Disable local fonts**.
1. <span class="material-icons">refresh</span> Reload the page and observe the font of the sentence above change to Roboto.

## Emulate a focused page

If you switch focus from the current page to DevTools, some overlay elements automatically hide if they are triggered by focus. For example, dropdown lists, menus, or date pickers.

To emulate a focused page:

1. On this page, [open the **Rendering** tab](#open-rendering).
1. <p><label for="example-input-number"></label><input type="number" id="example-input-number" placeholder="Focus me."></p>
   
1. Check and uncheck **Emulate a focused page** on the **Rendering** tab.
1. Observe how up<span class="material-icons">arrow_drop_up</span> and down<span class="material-icons">arrow_drop_down</span> arrows inside the element appear and hide depending on the focus.

## Enable automatic dark mode

See what your site can look like in dark mode even if you didn't implement it.

Chrome 96 introduced an [Origin Trial](https://developer.chrome.com/blog/origin-trials/) for [Auto Dark Theme](https://developer.chrome.com/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites if the user opted into dark themes in the operating system.

To enable automatic dark mode:

1. On this page, [open the **Rendering** tab](#open-rendering) and check **Enable automatic dark mode**.
1. Observe this page in dark mode.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DWex5Vmp51B0e1MFKDjZ.png", alt="Automatic dark mode enabled", width="800", height="398" %}

{% Aside 'gotchas' %}
When the [Auto Dark Theme](https://developer.chrome.com/blog/auto-dark-theme/) is enabled, the **Emulate CSS media feature `prefers-color-scheme`** dropdown is disabled and set to `prefers-color-scheme: dark` automatically.
{% endAside %}

## Emulate CSS media feature `prefers-color-scheme`

The [`prefers-color-scheme` CSS media feature][7] indicates if the user prefers light or dark color scheme.

To emulate this condition:

1. On the [prefers-color-scheme](https://web.dev/prefers-color-scheme/) page, [open the **Rendering** tab](#open-rendering).
1. Under the **Emulate CSS media feature `prefers-color-scheme`**, select one of the following from the dropdown list:

   - No emulation
   - `prefers-color-scheme:light`
   - `prefers-color-scheme:dark`

1. <span class="material-icons">refresh</span> Reload the page. For example:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/peTdHnJJeksHISUdpJzX.png", alt="Emulated prefers-color-scheme:dark", width="800", height="487" %}

## Emulate CSS media type (Enable print preview)

The [print media query][1] controls how your page looks when printed.

To force your page into print preview mode:

1.  Open the **Rendering** tab](#open-rendering) and under **Emulate CSS media type** select **print**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1kJOAaC1vMfTmm94wIJa.png", alt="Print preview mode", width="800", height="439" %}

2. From here, you can view and change your CSS, like any other web page. See [Get Started With Viewing And Changing CSS][2].

## Emulate CSS media feature `forced-colors`

The [`forced-colors` CSS media feature][5] indicates if the user agent enabled a forced colors mode. An example of a forced colors mode is Windows High Contrast.

To emulate this condition:

1. [Open the **Rendering** tab](#open-rendering).
1. Under the **Emulate CSS media feature `forced-colors`**, select one of the following from the dropdown list:

   - No emulation
   - `forced-colors:active`
   - `forced-colors:none`

With `forced-colors:active` emulated:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ezZ8wZmzGYWvciitKSso.png", alt="forced-colors:active", width="800", height="398" %}

## Emulate CSS media feature `prefers-contrast`

The [`prefers-contrast` CSS media feature][6] indicates if the user requested the web content to present with a higher, lower, or specific contrast value.

To emulate this condition:

1. [Open the **Rendering** tab](#open-rendering).
1. Under the **Emulate CSS media feature `prefers-contrast`**, select one of the following from the dropdown list:

   - No emulation
   - `prefers-contrast:more`
   - `prefers-contrast:less`
   - `prefers-contrast:custom`

## Emulate CSS media feature `prefers-reduced-motion`

The [`prefers-reduced-motion` CSS media feature][8] indicates if the user has requested to minimize the amount of motion on a page.

To emulate this condition:

1. [Open the **Rendering** tab](#open-rendering) on the [demo page](https://prefers-reduced-motion.glitch.me/) and try scrolling to see various animations.
1. Under the **Emulate CSS media feature `prefers-reduced-motion`**, select `prefers-reduced-motion:reduce`.
1. Try scrolling again.

## Emulate CSS media feature `color-gamut`

The [`color-gamut` CSS media feature][9] indicates which range of colors the user agent and the output device support.

To emulate this condition:

1. [Open the **Rendering** tab](#open-rendering).
1. Under the **Emulate CSS media feature `color-gamut`**, select one of the following from the dropdown list:

   - No emulation
   - `color-gamut:srgb`—approximately [sRGB](https://en.wikipedia.org/wiki/SRGB) gamut or more
   - `color-gamut:p3`—approximately the gamut specified in [Display P3 Color Space](https://www.color.org/chardata/rgb/DisplayP3.xalter) or more
   - `color-gamut:rec2020`—approximately the gamut specified in [Rec. 2020](https://en.wikipedia.org/wiki/Rec._2020) or more

## Emulate vision deficiencies

Everyone should be able to access and enjoy the web. [Google is committed to making that a reality](https://www.google.com/accessibility/).

With Chrome DevTools, you can see how people with vision deficiencies see your site, so you can make it better for them.

To emulate vision deficiencies:

1. [Open the **Rendering** tab](#open-rendering).
1. Under the **Emulate CSS media feature `color-gamut`**, select one of the following from the dropdown list:

   - No emulation
   - Blurred vision
   - Protanopia—can't perceive red and green colors
   - Deuteranopia—confusion of red, green, and yellow
   - Tritanopia—can't distinguish blue and yellow
   - Achromatopsia—partial or total absence of color vision

  For example:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aj8UMMDpofn8s7UPzHTy.png", alt="Emulated blurred vision", width="800", height="481" %}

## Disable AVIF image format

To disable all AVIF images on a page:

1. [Open the **Rendering** tab](#open-rendering) and check **Disable AVIF image format**.
1. <span class="material-icons">refresh</span> Reload the page.

{% Aside 'gotchas' %}
This option disables image caching automatically. 
{% endAside %}

## Disable WebP image format

To disable all WebP images on a page:

1. [Open the **Rendering** tab](#open-rendering) and check **Disable WebP image format**.
1. <span class="material-icons">refresh</span> Reload the page.

{% Aside 'gotchas' %}
This option disables image caching automatically.
{% endAside %}

[1]: https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries
[2]: /docs/devtools/css
[3]: /docs/devtools/command-menu/
[4]: https://www.chromium.org/developers/design-documents/chromium-graphics/how-to-get-gpu-rasterization/
[32]: https://cs.chromium.org/chromium/src/cc/debug/debug_colors.cc
[5]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
[6]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
[7]: https://web.dev/prefers-color-scheme/
[8]: https://web.dev/prefers-reduced-motion/
[9]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
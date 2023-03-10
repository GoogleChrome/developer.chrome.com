---
layout: "layouts/doc-post.njk"
title: "Apply other effects: enable automatic dark theme, emulate focus, and more"
authors:
  - sofiayem
date: 2022-04-13
description:
  "Highlight ad frames, emulate focus on a page, disable local fonts and image formats, enable an automatic dark theme, and emulate vision deficiencies."
tags:
  - emulate
  - test
  - accessibility
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

Discover useful effects to apply to your page with this reference of the **Rendering** tab options.

## Highlight ad frames

To check if frames are tagged as ads:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering) on this [demo](https://heavy-ads.glitch.me/) and check **Highlight ad frames**.
1. Observe the ad frame highlighted in red.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UuQMD7ifcGe1n6nFdYth.png", alt="Ad highlighted in red", width="800", height="490" %}

## Emulate a focused page

If you switch focus from the current page to DevTools, some overlay elements automatically hide if they are triggered by focus. For example, drop-down lists, menus, or date pickers.

1. Open a page with the element to debug, for example, the [YouTube website](https://www.youtube.com/watch?v=zFVWeOKZBHs) with its search bar.
1. On the page, [open the **Rendering** tab](/docs/devtools/rendering#open-rendering), then check and uncheck **Emulate a focused page**.

<div class="elevation--2">
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nIXptxL1r7NezWQraJJ7.gif", alt="Emulate a focused page", width="800", height="454" %}
</div>

## Disable local fonts

Check if the local font alternatives work as expected by disabling `local()` sources in `@font-face` rules.

Often, developers and designers use two different copies of the same font during development:

- A local font for your design tools, and
- A web font for your code

Disabling local fonts makes it easier for you to:

- Debug and measure web fonts loading performance and optimization
- Verify correctness of your CSS `@font-face` rules
- Discover any differences between web fonts and their local versions

<style>
    @font-face {
      font-family: "Courier New";
      src: local("Courier New"), url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
    }
    .text-box {
      font-family: 'Courier New';
    }
</style>
<div class="text-box">Chrome renders this sentence in Courier New if it finds this font on your device.</div>

Emulate missing `local()` sources in `@font-face` rules:

1. [Inspect](/docs/devtools/open/#elements) the sentence above, open **Elements** > **Computed**, scroll all the way down, and, under **Rendered Fonts**, discover that Chrome found **Courier New** in local files.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/p4YVF0NsuNpOHXMMXZ4V.png", alt="Rendered fonts: local", width="800", height="610" %}

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering), check **Disable local fonts**, and <span class="material-icons">refresh</span> reload the page.
1. Observe the sentence in Roboto found on the web.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dILf4tJKLflQdKk80dQq.png", alt="Rendered fonts: network resource", width="800", height="589" %}

## Enable automatic dark mode

See what your site can look like in dark mode even if you didn't implement it.

Chrome 96 introduced an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites if the user opted into dark themes in the operating system.

To enable automatic dark mode:

1. On this page, [open the **Rendering** tab](/docs/devtools/rendering#open-rendering) and check **Enable automatic dark mode**.
1. Observe this page in dark mode.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DWex5Vmp51B0e1MFKDjZ.png", alt="Automatic dark mode enabled", width="800", height="398" %}

{% Aside 'important' %}
With [Auto Dark Theme](/blog/auto-dark-theme/) enabled, the [**Emulate CSS media feature `prefers-color-scheme`**](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) drop-down list is disabled and set to `prefers-color-scheme: dark` automatically.
{% endAside %}

## Emulate vision deficiencies

{% YouTube id='t4pDjqhG6fE', startTime=157 %}

Everyone should be able to access and enjoy the web. [Google is committed to making that a reality](https://www.google.com/accessibility/).

With Chrome DevTools, you can see how people with [vision deficiencies](https://web.dev/learn/accessibility/color-contrast/) see your site, so you can make it better for them. For more information, see [Simulating color vision deficiencies](/blog/cvd/).

To emulate vision deficiencies:

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering).
1. Under **Emulate vision deficiencies**, select one of the following from the drop-down list:

   - **No emulation**.
   - **Blurred vision**.
   - **Reduced contrast**. 
   - **Protanopia (no red)**. Low perception of red; confusion of greens, reds, and yellows.
   - **Deuteranopia (no green)**. Low perception of green; confusion of greens, reds, and yellows.
   - **Tritanopia (no blue)**. Low perception of blue; confusion of greens and blues.
   - **Achromatopsia (no color)**. Partial or total absence of color vision.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nAphCZ5U3nDoEPVRDYD0.png", alt="Selected Tritanopia (no blue).", width="800", height="577" %}

## Disable AVIF and WebP image formats

These emulations make it easier for developers to test different image loading scenarios without having to switch browsers.

Suppose you have the following HTML code to serve an image in [AVIF](https://web.dev/compress-images-avif/) and [WebP](https://web.dev/serve-images-webp/) formats for newer browsers, with a fallback PNG image for older browsers.

```html
<picture>
  <source srcset="test.avif" type="image/avif">
  <source srcset="test.webp" type="image/webp">
  <img src="test.png" alt="A test image">
</picture>
```

To disable all AVIF images on a page (or, similarly, WebP images):

1. [Open the **Rendering** tab](/docs/devtools/rendering#open-rendering), check **Disable AVIF image format**.
1. <span class="material-icons">refresh</span> Reload the page and hover over the
`img src`. The current image src (`currentSrc`) is now the fallback WebP image.

{% Img src="image/admin/WHyF0XexaaWPCp07vJRj.png", alt="Emulate image types", width="800", height="480" %}

Similarly, you can disable WebP images. 

{% Aside 'important' %}
These options disable image caching automatically. 
{% endAside %}

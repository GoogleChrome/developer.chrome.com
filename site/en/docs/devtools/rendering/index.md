---
layout: "layouts/doc-post.njk"
title: "Rendering tab overview"
authors:
  - sofiayem
date: 2022-04-13
description:
  "Discover a collection of options that affect web content rendering."
tags:
  - emulate
  - test
  - find-issues
---

Discover a collection of options that affect web content rendering with this overview of the **Rendering** tab features in DevTools.

## Overview

The **Rendering** tab helps you:

- [Discover rendering performance issues](/docs/devtools/rendering/performance). Spot repainting, layout shifts, layers and tiles, scrolling issues, see rendering statistics and Core Web Vitals.
- [Emulate CSS media features](/docs/devtools/rendering/emulate-css). Test how pages render with different CSS media features without manually specifying them in your code or testing environment.
- [Apply other useful effects](/docs/devtools/rendering/apply-effects). Highlight ad frames, emulate focus on a page, disable local fonts and image formats, enable an automatic dark theme, and emulate vision deficiencies.

## Open the Rendering tab {: #open-rendering }

To open the **Rendering** tab:

1. [Open DevTools](/docs/devtools/open/).

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS) to open the
    **Command Menu**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VH5DGkKSHnAm0tD8DJHv.png", alt="Command menu, Rendering", width="800", height="637" %}

1.  Start typing `rendering`, select **Show Rendering**, and press <kbd>Enter</kbd>.
    DevTools displays the **Rendering** tab at the bottom of your DevTools window.

{% Aside 'gotchas' %}
In addition to opening the **Rendering** tab, you can also use the Command menu to search for and enable any option. Try typing an option name, for example, `emulate`.
{% endAside %}

Alternatively, you can open the **Rendering** tab in the following ways:

- Press <kbd>Esc</kbd> to open the Drawer, and, in the top left corner, click **More Tools** {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="6", height="26" %} > **Rendering**.
- In the top right corner, click **More Options** {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="6", height="26" %} > **More Tools** > **Rendering**.

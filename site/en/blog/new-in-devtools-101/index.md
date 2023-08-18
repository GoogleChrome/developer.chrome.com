---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 101)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "Import and export user flow as JSON, support hwb() colors, view cascade layers in the Styles pane and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/B5K95d3OAmyytzJVCyr1.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}

## Import and export recorded user flows as a JSON file  {: #recorder }

The [Recorder](/docs/devtools/recorder) panel now supports importing and exporting user flow recordings as a JSON file. This addition makes it easier to share user flows and can be useful for bug reporting.

For example, download this [JSON file](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). You can import it with the import button and [replay the user flow](/docs/devtools/recorder/#replay).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

Apart from that, you can export the recording as well. After [recording a user flow](/docs/devtools/recorder/#record), click on the export button. There are 3 export options:

- **Export as a JSON file**. Download the recording as a JSON file.
- **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script. 
- **Export as a Puppeteer script** . Download the recording as [Puppeteer](https://pptr.dev/) script.

Consult [the documentation](/docs/devtools/recorder/#export-flows) to learn more about the differences between these options.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="Export options in the Recorder panel", width="800", height="556" %}

Chromium issue: [1257499](https://crbug.com/1257499)


## View cascade layers in the Styles pane {: #layer }

[Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is particularly useful for large codebases, design systems, and when managing third party styles in applications.

In this [example](https://jec.fish/demo/cascade-layer), there are 3 cascade layers defined: `page`, `component` and `base`. In the **Styles** pane, you can view each layer and its styles.

Click on the layer name to view the layer order. The `page` layer has the highest specificity, therefore the `box` background is green. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="View cascade layers in the Styles pane", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Chromium issue: [1240596](https://crbug.com/1240596)


## Support for the hwb() color function {: #hwb }

You can now view and edit [HWB color format](https://drafts.csswg.org/css-color/#the-hwb-notation) in DevTools.

In the **Styles** pane, hold the **Shift** key and click on any color preview to change the color format. The HWB color format is added.

Alternatively, you can change the color format to HWB in the [color picker](/docs/devtools/css/reference/#color-picker).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="hwb() color function", width="800", height="508" %}


## Improved the display of private properties {: #private-props }

DevTools now properly evaluates and displays private accessors. Previously, you couldn't expand classes with private accessors in the **Console** and the **Sources** panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="private properties in the Console", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Chromium issues: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:

- The [Back/forward cache](/blog/new-in-devtools-98/#bfcache) now displays the extension ID which blocked [bfcache](https://web.dev/bfcache/) when present.( [1284548](https://crbug.com/1284548))
- Fixed autocompletion support for array-like objects, CSS class names, `map.get` and HTML tags. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983))
- Fixed incorrect highlights when double-clicking on words and undoing autocomplete. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
- Fixed comment keyboard shortcut in the **Sources** panel. ([1296535](https://crbug.com/1296535))
- Re-enable support for using **Alt** (Options) key for multi selection in the **Sources** panel. ([1304070](https://crbug.com/1304070))

 
## [Experimental] New timespan and snapshot mode in the Lighthouse panel {: #lighthouse }

{% Aside %}
To enable the experiment, enable the **Use Lighthouse panel with timespan and snapshot modes** checkbox under **Settings** > **Experiments**.
{% endAside %}

Apart from the existing **navigation** mode, the **Lighthouse** panel now support two more modes on measuring user flows - **timespan** and **snapshot**.

For example, you can use the **timespan** reports to analyze user interactions. Open this [demo](https://coffee-cart.netlify.app/) page. Select the **Timespan** mode and click on **Start timespan**. On the page, click on a coffee and end the timespan. Read the report to find out the [Total Blocking Time](https://web.dev/tbt/) and [Cumulative Layout Shift](https://web.dev/cls/) that were caused by the interaction.

Each mode has its own unique use cases, benefits, and limitations. Please refer to the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) for more information.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Timespan and snapshot mode in the Lighthouse panelhouse", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Chromium issue: [772558](https://crbug.com/772558)


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 112)"
authors:
  - sofiayem
date: 2023-03-03
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KwNETHFT5o1aAv74huRF.jpg'
alt: 'CSS documentation and more'
tags:
  - new-in-devtools
  - devtools
  - chrome-112
---
<!-- image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GZr06vqTxoJGEIXVqXT9.png  -->

{% Partial 'devtools/banner.md' %}

*No video for this release.*

<!-- $contentStart -->

## CSS documentation in the Styles pane {: #css }

How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="The tooltip with documentation on a CSS property.", width="800", height="651" %}

The tooltip also contains a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this very property.

If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**.

To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Preferences** > **Elements** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**.

{% Aside %}
DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data).
{% endAside %}

## Recorder updates {: #recorder }

### Replay extensions support {: #replay-extensions }

The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension.

Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay):
1. [Create a new recording](/docs/devtools/recorder/#record), expand the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Play.", width="20", height="20" %} **Replay** options, and select the extension.
1. Provide an arbitrary name and password (`leeloo` and `multipass` will do). 

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/kfAzPxEF08zwvYYKzP4e.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension:  explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/).

### Get extensions {: #get-extensions }

Get extensions for the **Recorder** with a couple of clicks:

1. Open a recording, and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions**
1. Pick one from the [Extensions](/docs/devtools/recorder/extensions/) list and install it from the Web Store.
1. Reload DevTools.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="The Get extensions option in the Export drop-down menu.", width="800", height="649" %}

Your export extensions will be listed in the corresponding section of the same drop-down menu.

Feel free to [add your extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list!

### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse }

The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance.

Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="Export Puppeteer (including Lighthouse analysis).", width="800", height="584" %}

Run the Puppeteer script to get a Lighthouse report in a `flow.report.html` file:

```sh
# npm i puppeteer lighthouse
node your_export.js
```

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="The Lighthouse report opened in Chrome.", width="800", height="690" %}

### Record with pierce selectors {: #pierce-selectors }

In addition to custom, CSS, ARIA, text, and XPath selectors, you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots.

Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1fMy1rQd3SYKMyqS5bPi.png", alt="Setting the Recorder to use pierce selectors.", width="800", height="899" %}

Record your interaction with elements in the shadow DOM and inspect the corresponding step.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/P4JFsGHTt5yaH9hAgxc3.png", alt="Pierce selector in action.", width="800", height="711" %}

## Logpoint and conditional breakpoint improvements {: #logpoint }

Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints:

- `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?`
- [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) message with pink two dots `..`

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Changes to how the Console now displays messages triggered by breakpoints: with icons and proper source link.", width="800", height="566" %}

The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/).

Click the link next to the breakpoint message to jump directly to the breakpoint editor.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="The anchor link next to a logpoint message that opens the breakpoint editor.", width="800", height="811" %}

## Ignore irrelevant scripts during debugging {: #ignore-list }

To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. The debugger ignores all scripts added to the list. 

Right-click any script or folder and select one of the ignore-related options.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="Context menus of a folder and script with ignore-related options.", width="800", height="521" %}

Depending on the script or folder you right-clicked, you may see options to add or remove to and from the list:

- A script or a folder to or from a custom exclusion rule.
- All known third-party scripts.
- All content scripts.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="Ignore-listed scripts and folders are grayed out, you can hide them with an experimental option in the More options drop-down menu.", width="800", height="542" %}

All ignore-listed scripts and folders are grayed out in the file tree.

If you select an ignored script, the **Configure** button takes you to 
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/). You can also hide ignored sources from the file tree with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} > [**Hide ignore-listed sources**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}.

How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property.

## Emulate reduced contrast {: #reduced-contrast }

The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [list of vision deficiencies emulation options](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies)—**Reduced contrast**. With this option, you can discover how your website looks to people with low contrast sensitivity.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="The reduced contrast option on the Rendering > Emulate vision deficiencies.", width="800", height="574" %}

With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/).

## JavaScript Profiler deprecation started {: #js-profiler-deprecation }

This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **Profiler** panel now shows the corresponding warning banner.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="Deprecation banner at the top of the Profiler.", width="800", height="712" %}

Use the **Performance** panel to profile CPU:

- For **Chart**, see the [**Main** section in the **Performance** panel](/docs/devtools/performance/reference/#main).
- For **Heavy (bottom up)**, see [**Performance** > **Bottom-up**](/docs/devtools/performance/reference/#bottom-up).
- For **Call Tree**, see [**Performance** > **Call Tree**](/docs/devtools/performance/reference/#call-tree).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EkViYZ9gk6PF4dIcZBrk.png", alt="The Performance panel: Main section, Bottom-up tab, and Call Tree tab.", width="800", height="510" %}

To see the real-time total JS heap size, open the **Memory** panel.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8BI75JYUTcri7R4k6U3W.png", alt="JS heap size in the Memory panel.", width="800", height="535" %}

Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548). 

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

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

How many times a day do you look up documentation on CSS properties? With DevTools, you don't have to.

When you hover over a property in the **Elements** > **Styles** pane, it now shows you a tooltip with the property's documentation.

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

Try out our extension example:

1. Download the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay).
1. [Load the extension locally](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
1. [Create a new recording](/docs/devtools/recorder/#record).
1. Expand the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Play.", width="20", height="20" %} **Replay** options and select the extension.
1. Provide an arbitrary name and password (`leeloo` and `multipass` will do). 

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uvfeDWVEIQDpd7oZSTPC.png", alt="An replay option provided by an extension.", width="800", height="630" %}

To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension:

1. Explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/).
1. [Develop your extension](/docs/extensions/mv3/).
1. Publish it on [Chrome Web Store](/docs/webstore/about_webstore/).
1. [Add the extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/).
   
We look forward to populate the **Replay extensions** section with new entries!

### Get extensions {: #get-extensions }

Get extensions for the **Recorder** with a couple of clicks:

1. Open a recording, and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions**
1. Pick one from the [Extensions](/docs/devtools/recorder/extensions/) list and install it from the Web Store.
1. Reload DevTools.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="The Get extensions option in the Export drop-down menu.", width="800", height="649" %}

Your export extensions will be listed in the corresponding section of the same drop-down menu.

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

Building on top of the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints:

- Conditional breakpoint with a `console.*` call—by an orange question mark`?`
- Logpoint message with pink two dots `..`

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Changes to how the Console now displays messages triggered by breakpoints: with icons and proper source link.", width="800", height="566" %}

Additionally, the **Console** now gives you a proper anchor link to breakpoints in source files instead of a hidden VM script.
Click the link next to the breakpoint message to jump directly to the breakpoint editor.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="The anchor link next to a logpoint message that opens the breakpoint editor.", width="800", height="811" %}

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
